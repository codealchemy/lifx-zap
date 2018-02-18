require('should');
const nock = require('nock');

const Lifx = require('../../index');

const zapier = require('zapier-platform-core');
const appTester = zapier.createAppTester(Lifx);
zapier.tools.env.inject();

// Fixtures
const setStateResponse = require('../fixtures/set-state.json');

describe('Changing light state', () => {
  it('should run creates.set_state', done => {
    const bundle = {
      inputData: {
        selector: 'all',
        power: 'on',
        color: 'red',
        brightness: 1.0,
        duration: 2
      }
    };

    nock('https://api.lifx.com')
      .put('/v1/lights/all/state')
      .reply(200, setStateResponse)

    appTester(Lifx.creates.set_state.operation.perform, bundle)
      .then(results => {
        results.should.eql(setStateResponse);
        done();
      })
      .catch(done);
  });
});
