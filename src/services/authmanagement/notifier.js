module.exports = function(app) {

  function getLink(type, hash) {
    const url = 'http://localhost:9393/' + type + '?token=' + hash;
    return url;
  }

  function sendEmail(email) {
    return app.service('mailer').create(email).then(function (result) {
      console.log('Sent email', result);
    }).catch(err => {
      console.log('Error sending email', err);
    });
  }

  return {
    notifier: function(type, user) {
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Verify Signup',
          html: tokenLink
        };
        return sendEmail(email);

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Confirm Signup',
          html: `Thanks for verifying your email. This is your six-digit confirmation code 
          ${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`
        };
        return sendEmail(email);

      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return sendEmail(email);

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return sendEmail(email);

      case 'passwordChange':
        email = {};
        return sendEmail(email);

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = {};
        return sendEmail(email);

      default:
        break;
      }
    }
  };
};
