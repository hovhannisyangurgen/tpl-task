const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { 
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const { 
  addVerification, removeVerification 
} = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ 
      hashPassword(),
      addVerification(),
    ],
    update: [ 
      commonHooks.disallow('external')
    ],
    patch: [ 
      commonHooks.iff(
        commonHooks.isProvider('external'),    
        commonHooks.preventChanges(
          true,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ))
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => accountService(context.app).notifier('resendVerifySignup', context.result),
      removeVerification()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
