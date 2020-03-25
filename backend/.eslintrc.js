module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  rules: {
    'no-console': 0,
    'prettier/prettier': 2,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars-experimental': 1,
    '@typescript-eslint/interface-name-prefix': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  env: {
    'jest/globals': true,
    node: true,
    es6: true
  }
};
