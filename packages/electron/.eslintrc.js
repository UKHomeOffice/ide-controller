module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: false,
  },
  extends: ['standard', 'prettier', 'plugin:testcafe/recommended'],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  plugins: ['prettier', 'testcafe'],
  ignorePatterns: [
    '/node_modules',
    '/dist',
    '/build',
    '/azure-application-insights',
    '/output',
  ],
  rules: {
    quotes: ['error', 'single'],
    eqeqeq: 'error',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
      },
    ],
  },
};
