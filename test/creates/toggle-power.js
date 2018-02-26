require('should');
const nock = require('nock');

const Lifx = require('../../index');

const zapier = require('zapier-platform-core');
const appTester = zapier.createAppTester(Lifx);
zapier.tools.env.inject();

// Fixtures
const togglePowerResponse = require('../fixtures/toggle-power.json');

describe('Toggling power light(s)', () => {
  it('should run creates.toggle_power', done => {
    const bundle = {
      inputData: {
        selector: 'all',
        duration: 2
      }
    };

    nock('https://api.lifx.com')
      .post('/v1/lights/all/toggle')
      .reply(200, togglePowerResponse)

    appTester(Lifx.creates.toggle_power.operation.perform, bundle)
      .then(results => {
        results.should.eql(togglePowerResponse);
        done();
      })
      .catch(done);
  });
});
