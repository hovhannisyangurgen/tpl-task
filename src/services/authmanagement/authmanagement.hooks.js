module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (hook) => {        
        if (hook.data.action === 'verifySignupLong') {
          const user = await hook.app.get('sequelizeClient').models.user.findById(hook.result.id, { raw: true });
          const { accessToken } = await hook.app.service('authentication').create({}, { 
            user,
            payload: { userId: hook.result.id }
          });
          hook.result = {
            accessToken,
            user: hook.result
          };
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  }
};