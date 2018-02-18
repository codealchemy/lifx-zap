const testAuth = (z /*, bundle*/) => {
  return z.request({
      // Since Lifx doesn't have a specific endpoint for validating a token, use
      // the url for finding all lights associated with an account
      url: 'https://api.lifx.com/v1/lights/all',
    }).then(response => {
      if (response.status === 401) {
        throw new Error('The API Access Token you supplied is invalid');
      }
      return response;
    });
};

module.exports = {
  type: 'custom',
  // The user will be prompted to enter this info to connect their account.
  fields: [
    {
      key: 'accessToken',
      label: 'Access Token',
      helpText: 'An access token is used to access lights via the Lifx API - a personal token can be obtained at https://cloud.lifx.com/settings',
      required: true,
      type: 'string'
    }
  ],
  connectionLabel: 'Lifx light(s)',
  // This will be executed whenever a user connects their account for the first time.
  test: testAuth
};
