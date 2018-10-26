const hooks = require('./mailer.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {
  const { gmail, gmailPassword } = app.get('mailer');
  app.use('/mailer', Mailer(smtpTransport({
    service: 'gmail',
    auth: {
      user: gmail,
      pass: gmailPassword
    }
  })));

  const service = app.service('mailer');
  service.hooks(hooks);
};