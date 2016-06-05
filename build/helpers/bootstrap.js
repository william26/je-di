'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _argsList = require('./args-list');

function bootstrap(module) {
  module.dependencies.map(bootstrap);
  if (module.runnableMethod) {

    var runnableMethod = undefined;
    var args = undefined;

    if (typeof module.runnableMethod === 'function') {
      args = (0, _argsList.getArgsList)(module.runnableMethod);
      runnableMethod = module.runnableMethod;
    }

    if (_typeof(module.runnableMethod) === 'object' && module.runnableMethod.length) {
      runnableMethod = module.runnableMethod[module.runnableMethod.length - 1];
      args = (0, _argsList.getArgsList)(module.runnableMethod);
    }

    runnableMethod.apply(module, module.resolve(args));
  }
};

module.exports = bootstrap;