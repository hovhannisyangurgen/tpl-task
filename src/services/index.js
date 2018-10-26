const users = require('./users/users.service.js');

const organizations = require('./organizations/organizations.service.js');

const usersOrganizations = require('./users-organizations/users-organizations.service.js');

const authmanagement = require('./authmanagement/authmanagement.service.js');

const mailer = require('./mailer/mailer.service.js');

module.exports = function (app) {
  app.configure(users);
  app.configure(organizations);
  app.configure(usersOrganizations);
  app.configure(authmanagement);
  app.configure(mailer);
};
