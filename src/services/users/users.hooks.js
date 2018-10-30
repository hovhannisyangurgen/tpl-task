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
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      async (context) => {
        accountService(context.app).notifier('resendVerifySignup', context.result);
        const { organizationName } = context.arguments[0];
        const sequelizeClient = context.app.get('sequelizeClient');
        const { organizations, user_organization_xref } = sequelizeClient.models;
        let organization = await organizations.find({ 
          where: { name: organizationName }
        });
        if (!organization.id) {
          organization = await organizations.create({ name: organizationName });
        }
        await user_organization_xref.create({
          userId: context.result.id,
          organizationId: organization.id
        });
      },
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
