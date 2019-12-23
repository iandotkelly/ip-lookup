module.exports = {
  'roots': [
    '<rootDir>/test'
  ],
  'testMatch': [
    '**/?(*.)+(test).+(ts|js)'
  ],
  'transform': {
    '^.+\\.(ts)$': 'ts-jest'
  },
  verbose: true
}