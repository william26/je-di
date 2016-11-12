'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _argsList = require('./args-list');

var _module = require('../module/module');

function bootstrap(moduleOrName) {
  var module = (typeof moduleOrName === 'undefined' ? 'undefined' : _typeof(moduleOrName)) === 'object' ? moduleOrName : _module.modules[moduleOrName];

  if (!module) {
    throw new Error('Module not found ' + moduleOrName);
  }

  module.dependencies.map(function (dependency) {
    bootstrap(dependency);
    module.injectables = Object.assign(module.injectables, _module.modules[dependency].injectables);
    module.factories = Object.assign(module.factories, _module.modules[dependency].factories);
    module.services = Object.assign(module.services, _module.modules[dependency].services);
  });

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