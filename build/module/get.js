'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveName;

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function resolveName(name) {

  var fromInjectable = this.injectables[name];
  if (fromInjectable) {
    return fromInjectable;
  }

  var fromFactory = this.factories[name];
  if (fromFactory) {
    var result = fromFactory.apply(undefined, _toConsumableArray((0, _argsList2.default)(fromFactory).map(this.get.bind(this))));
    this.injectables[name] = result;
    return result;
  }

  var fromServices = this.services[name];
  if (fromServices) {
    var result = new (Function.prototype.bind.apply(fromServices, [null].concat(_toConsumableArray((0, _argsList2.default)(fromServices).map(this.get.bind(this))))))();
    this.injectables[name] = result;
    return result;
  }

  if (this.dependencies[0]) {
    var result = this.dependencies.reduce(function (injectable, depModule) {
      try {
        return injectable || depModule.get(name);
      } catch (err) {
        return injectable;
      }
    }, null);
    this.injectables[name] = result;
    return result;
  }

  throw new Error('Impossible to find module \'' + name + '\'');
}