const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes() {
  return [
    {
      path: '/',
      indexRoute: [{
        getComponent(nextState, cb) {
          System.import('web/containers/HomePage')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      }],
      childRoutes: [{
        path: '/login',
        getComponent(nextState, cb) {
          System.import('web/containers/LoginPage')
            .then(loadModule(cb))
            .catch(errorLoading);
        }
      }, {
        path: '*',
        getComponent(nextState, cb) {
          System.import('web/containers/NotFoundPage')
            .then(loadModule(cb))
            .catch(errorLoading);
        }
      }]
    }
  ];
}
