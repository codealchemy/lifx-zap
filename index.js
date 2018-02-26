const TogglePowerCreate = require('./creates/toggle-power');
const SetStateCreate = require('./creates/set-state');
const authentication = require('./authentication');

// This runs before each request is sent out
const includeAuthorizationHeader = (request, z, bundle) => {
  if (bundle.authData.accessToken) {
    request.headers['Authorization'] = `Bearer ${bundle.authData.accessToken}`;
  }
  return request;
};

const Lifx = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [
    includeAuthorizationHeader
  ],

  afterResponse: [
  ],

  resources: {
  },

  triggers: {
  },

  searches: {
  },

  creates: {
    [TogglePowerCreate.key]: TogglePowerCreate,
    [SetStateCreate.key]: SetStateCreate,
  }
};

// Finally, export the app.
module.exports = Lifx;
