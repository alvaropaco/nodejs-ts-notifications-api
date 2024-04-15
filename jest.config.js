module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};