'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import argsList from 'args-list';
var argsList = require('args-list');

function resolveName(module, name) {
  var fromInjectable = module.injectables[name];
  if (fromInjectable) {
    return fromInjectable;
  }

  var fromFactory = module.factories[name];
  if (fromFactory) {
    var result = fromFactory.apply(undefined, _toConsumableArray(module.resolve(argsList(fromFactory))));
    module.injectables[name] = result;
    return result;
  }

  var fromServices = module.services[name];
  if (fromServices) {
    var result = new (Function.prototype.bind.apply(fromServices, [null].concat(_toConsumableArray(module.resolve(argsList(fromServices))))))();
    module.injectables[name] = result;
    return result;
  }

  if (module.dependencies[0]) {
    var result = module.dependencies.reduce(function (injectable, depModule) {
      try {
        return injectable || depModule.get(name);
      } catch (err) {
        return injectable;
      }
    }, null);
    module.injectables[name] = result;
    return result;
  }

  throw new Error('Impossible to find module \'' + name + '\'');
}

function resolve(module, names) {
  return names.map(function (name) {
    return resolveName(module, name);
  });
};
module.exports = resolve;