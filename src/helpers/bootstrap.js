const argsList = require('args-list');

const resolve = require('./resolve');


function bootstrap(module) {
  module.dependencies.map(bootstrap);

  module.runnableMethod.apply(module, module.resolve(argsList(module.runnableMethod)));
};

module.exports = bootstrap;
