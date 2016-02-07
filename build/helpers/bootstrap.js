'use strict';

var argsList = require('args-list');

var resolve = require('./resolve');

function bootstrap(module) {
  module.dependencies.map(bootstrap);
  if (module.runnableMethod) {
    module.runnableMethod.apply(module, module.resolve(argsList(module.runnableMethod)));
  }
};

module.exports = bootstrap;