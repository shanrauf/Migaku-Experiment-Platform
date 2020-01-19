module.exports = {
  preset: 'ts-jest',

  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/**/*.spec.(ts)'],
  transformIgnorePatterns: ['/node_modules/'],

  // Stop running tests after the first failure
  bail: true,

  // The directory where Jest should store its cached dependency information
  cacheDirectory: '/var/folders/bw/vvybgj3d3kgb98nzjxfmpv5c0000gn/T/jest_dx',

  // Activates notifications for test results
  notify: true,
  notifyMode: 'always',

  // The root directory that Jest should scan for tests and modules within
  rootDir: 'tests'
};
