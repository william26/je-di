'use strict';

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function resolve(module, names) {
  return names.map(function (name) {
    var fromInjectable = module.injectables[name];
    if (fromInjectable) {
      return fromInjectable;
    }

    var fromFactory = module.factories[name];
    if (fromFactory) {
      return fromFactory.apply(undefined, _toConsumableArray(resolve(module, (0, _argsList2.default)(fromFactory))));
    }

    var fromServices = module.services[name];
    if (fromServices) {
      return new (Function.prototype.bind.apply(fromServices, [null].concat(_toConsumableArray(resolve(module, (0, _argsList2.default)(fromServices))))))();
    }
  });
};
module.exports = resolve;