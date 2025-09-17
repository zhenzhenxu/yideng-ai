module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'react-app',
      'react-app/jest',
      '@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      // React 规则
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      
      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      
      // 通用规则
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };