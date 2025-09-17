const { Octokit } = require('@octokit/rest');

// 尝试导入 OpenAI，如果失败则使用静态分析
let OpenAI;
try {
  OpenAI = require('openai');
} catch (error) {
  console.log('OpenAI 未安装，使用静态分析模式');
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// 初始化 OpenAI (如果可用)
let openai = null;
if (OpenAI && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// React/TypeScript 特定检查规则
const codeRules = {
  react: [
    {
      pattern: /React\.FC<.*?>/g,
      message: "✅ 正确使用 React.FC 类型定义",
      severity: "good"
    },
    {
      pattern: /interface\s+\w+Props/g,
      message: "✅ 正确定义组件 Props 接口",
      severity: "good"
    },
    {
      pattern: /useState<.*?>/g,
      message: "✅ 正确使用 TypeScript 类型的 useState",
      severity: "good"
    },
    {
      pattern: /console\.log\s*\(/g,
      message: "🟡 建议在生产环境移除 console.log",
      severity: "warning"
    },
    {
      pattern: /:\s*any/g,
      message: "🔴 避免使用 any 类型",
      severity: "error"
    }
  ],
  css: [
    {
      pattern: /display:\s*flex/g,
      message: "✅ 使用 Flexbox 布局",
      severity: "good"
    },
    {
      pattern: /display:\s*grid/g,
      message: "✅ 使用 CSS Grid 布局",
      severity: "good"
    },
    {
      pattern: /!important/g,
      message: "🟡 尽量避免使用 !important",
      severity: "warning"
    }
  ]
};

// 安全检查规则
const securityRules = [
  {
    pattern: /dangerouslySetInnerHTML/g,
    message: "⚠️ dangerouslySetInnerHTML 存在 XSS 风险",
    severity: "security"
  },
  {
    pattern: /eval\s*\(/g,
    message: "⚠️ eval() 函数存在安全风险",
    severity: "security"
  }
];

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (['tsx', 'jsx'].includes(ext)) return 'react';
  if (ext === 'css') return 'css';
  return 'other';
}

function analyzeCode(content, filename) {
  const fileType = getFileType(filename);
  const issues = [];

  // 应用文件类型特定规则
  if (codeRules[fileType]) {
    codeRules[fileType].forEach(rule => {
      const matches = content.match(rule.pattern);
      if (matches) {
        issues.push({
          type: rule.severity,
          message: rule.message,
          count: matches.length
        });
      }
    });
  }

  // 应用安全检查规则
  securityRules.forEach(rule => {
    const matches = content.match(rule.pattern);
    if (matches) {
      issues.push({
        type: rule.severity,
        message: rule.message,
        count: matches.length
      });
    }
  });

  return issues;
}

async function analyzeWithAI(content, filename, patch) {
  if (!openai) return null;

  const prompt = `
作为专业的前端代码审查专家，请审查这个 React + TypeScript 项目的代码：

文件: ${filename}

代码变更:
\`\`\`
${patch || content.substring(0, 1500)}
\`\`\`

请重点关注：
1. React 组件设计和最佳实践
2. TypeScript 类型安全
3. 性能优化建议
4. 代码可读性和维护性
5. 潜在的 bug 或问题

请用中文提供具体建议。如果代码很好，请给予积极反馈。
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '你是专业的前端代码审查专家，专注于 React + TypeScript 项目。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI 分析失败:', error.message);
    return null;
  }
}

async function getChangedFiles() {
  const { data: files } = await octokit.rest.pulls.listFiles({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    pull_number: process.env.PR_NUMBER,
  });
  
  return files.filter(file => 
    file.status !== 'removed' && 
    /\.(tsx?|jsx?|css)$/.test(file.filename)
  );
}

async function performReview() {
  try {
    const files = await getChangedFiles();
    
    if (files.length === 0) {
      console.log('没有发现代码文件变更');
      return;
    }

    let reviewContent = "# 🤖 AI 代码审查报告\n\n";
    reviewContent += `> 📊 审查了 ${files.length} 个文件\n\n`;
    
    let totalIssues = 0;
    let securityIssues = 0;
    let positiveFindings = 0;

    for (const file of files) {
      console.log(`正在分析 ${file.filename}...`);
      
      let content = '';
      if (file.patch) {
        const addedLines = file.patch.split('\n')
          .filter(line => line.startsWith('+') && !line.startsWith('+++'))
          .map(line => line.substring(1))
          .join('\n');
        content = addedLines;
      }

      if (!content.trim()) continue;

      reviewContent += `## 📄 ${file.filename}\n\n`;

      // 静态分析
      const issues = analyzeCode(content, file.filename);
      
      // AI 分析 (如果可用)
      const aiAnalysis = await analyzeWithAI(content, file.filename, file.patch);

      if (issues.length > 0) {
        issues.forEach(issue => {
          const emoji = issue.type === 'security' ? '🔒' : 
                       issue.type === 'error' ? '❌' : 
                       issue.type === 'warning' ? '⚠️' : 
                       issue.type === 'good' ? '✅' : '💡';
          
          reviewContent += `${emoji} **${issue.type.toUpperCase()}**: ${issue.message}\n\n`;
          
          if (issue.type === 'security') securityIssues++;
          else if (issue.type === 'good') positiveFindings++;
          else totalIssues++;
        });
      }

      if (aiAnalysis) {
        reviewContent += `### 🧠 AI 深度分析\n\n${aiAnalysis}\n\n`;
      }

      if (issues.length === 0 && !aiAnalysis) {
        reviewContent += '✅ 没有发现明显问题\n\n';
      }

      reviewContent += '---\n\n';
    }

    // 添加总结
    reviewContent += `## 📈 审查总结\n\n`;
    reviewContent += `- 📁 文件数: ${files.length}\n`;
    reviewContent += `- ✅ 良好实践: ${positiveFindings}\n`;
    reviewContent += `- ⚠️ 需要关注: ${totalIssues}\n`;
    reviewContent += `- 🔒 安全问题: ${securityIssues}\n\n`;

    if (positiveFindings > 0) {
      reviewContent += `🎉 发现 ${positiveFindings} 个代码最佳实践！\n\n`;
    }

    reviewContent += `*由 AI 助手完成审查，建议结合人工审查*`;

    // 发布审查结果
    const reviewEvent = securityIssues > 0 ? 'REQUEST_CHANGES' : 'COMMENT';

    await octokit.rest.pulls.createReview({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      pull_number: process.env.PR_NUMBER,
      body: reviewContent,
      event: reviewEvent
    });

    console.log('✅ AI 代码审查完成');

  } catch (error) {
    console.error('代码审查出错:', error);
    
    await octokit.rest.issues.createComment({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      issue_number: process.env.PR_NUMBER,
      body: `🤖 AI 代码审查遇到错误: ${error.message}`
    });
  }
}

performReview();