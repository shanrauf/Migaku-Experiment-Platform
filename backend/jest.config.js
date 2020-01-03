// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',

  // Stop running tests after the first failure
  bail: true,

  // The directory where Jest should store its cached dependency information
  cacheDirectory: '/var/folders/bw/vvybgj3d3kgb98nzjxfmpv5c0000gn/T/jest_dx',

  // Runs before test suite runs
  setupFiles: ['./setup.ts'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts'],

  // Activates notifications for test results
  notify: true,
  notifyMode: 'always',

  // The root directory that Jest should scan for tests and modules within
  rootDir: 'tests',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  testMatch: ['**/?(*.)+(spec|test).js?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest'
  }
};
