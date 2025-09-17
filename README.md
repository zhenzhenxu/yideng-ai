## 🤖 AI Code Review

本项目集成了智能代码审查功能：

### 功能特点
- **智能分析**: AI 分析代码变更，检测 bug、安全问题和最佳实践
- **React/TypeScript 专项**: 针对 React + TypeScript 项目的专门规则
- **安全扫描**: 检测潜在的安全漏洞
- **性能建议**: 提供性能优化建议
- **自动反馈**: 在 Pull Request 中直接提供反馈

### 如何使用
1. 创建 Pull Request 时自动触发
2. 审查结果会以评论形式出现在 PR 中
3. 本地运行 `npm run pre-commit` 可执行所有检查

### 可用脚本
- `npm run lint` - 运行 ESLint 检查
- `npm run lint:fix` - 自动修复 ESLint 问题
- `npm run format` - 使用 Prettier 格式化代码
- `npm run type-check` - 运行 TypeScript 类型检查
- `npm run pre-commit` - 运行所有质量检查