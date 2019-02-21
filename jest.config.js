module.exports = {
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
};
