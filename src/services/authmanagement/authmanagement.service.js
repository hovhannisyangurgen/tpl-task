const authManagement = require('feathers-authentication-management');
const hooks = require('./authmanagement.hooks');
const notifier = require('./notifier');

module.exports = function(app) {
  // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));

  const service = app.service('authManagement');

  service.hooks(hooks);
};