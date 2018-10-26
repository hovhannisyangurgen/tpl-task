const assert = require('assert');
const app = require('../../src/app');

describe('\'users-organizations\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-organizations');

    assert.ok(service, 'Registered the service');
  });
});
