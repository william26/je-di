'use strict';

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function resolveName(module, name) {
  var fromInjectable = module.injectables[name];
  if (fromInjectable) {
    return fromInjectable;
  }

  var fromFactory = module.factories[name];
  if (fromFactory) {
    var result = fromFactory.apply(undefined, _toConsumableArray(resolve(module, (0, _argsList2.default)(fromFactory))));
    module.injectables[name] = result;
    return result;
  }

  var fromServices = module.services[name];
  if (fromServices) {
    var result = new (Function.prototype.bind.apply(fromServices, [null].concat(_toConsumableArray(resolve(module, (0, _argsList2.default)(fromServices))))))();
    module.injectables[name] = result;
    return result;
  }

  if (module.dependencies) {
    var result = module.dependencies.reduce(function (injectable, depModule) {
      try {
        return injectable || resolveName(depModule, name);
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