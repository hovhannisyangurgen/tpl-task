// Initializes the `users-organizations` service on path `/users-organizations`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user-organization-xref.model');
const hooks = require('./users-organizations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users-organizations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users-organizations');

  service.hooks(hooks);
};
