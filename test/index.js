require('should');
const nock = require('nock');

const Lifx = require('../index');

const zapier = require('zapier-platform-core');
const appTester = zapier.createAppTester(Lifx);

// Fixtures
const listLightsResponse = require('./fixtures/list-lights.json');

describe('Lifx', () => {

  it('has auth details added to every request', (done) => {
    const bundle = {
      authData: {
        accessToken: 'secret'
      }
    };

    nock('https://api.lifx.com')
      .get('/v1/lights/all')
      .reply(200, listLightsResponse)

    appTester(Lifx.authentication.test, bundle)
      .then(response => {
        response.status.should.eql(200);
        response.request.headers.Authorization.should.eql("Bearer secret")
        done();
      })
      .catch(done);
  });
});
