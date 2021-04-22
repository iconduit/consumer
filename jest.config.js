export default {
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageDirectory: 'artifacts/coverage/jest',
  testEnvironment: 'node',
  testMatch: [
    '**/test/suite/**/*.spec.js',
  ],
  transform: {
    '.js': 'jest-esm-transformer',
  },
}
