module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: false,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  ignorePatterns: [
    '/node_modules',
    '/dist',
    '/build',
    '/azure-application-insights',
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
