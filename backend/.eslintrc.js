module.exports = {
  extends: ['airbnb', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'import/no-unresolved': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/indent': [2, 2],
    'comma-dangle': 0,
    'operator-linebreak': 0
  },
  overrides: [
    {
      files: ['bin/*.js', 'lib/*.js'],
      excludedFiles: '*.d.ts',
      rules: {
        quotes: ['error', 'single']
      }
    }
  ]
};
