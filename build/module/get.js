'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveName;

var _argsList = require('../helpers/args-list');

var _module = require('./module');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var injectables = {};

function resolveName(name) {
  var _this = this;

  try {
    var fromGlobalInjectable = injectables[name];
    if (fromGlobalInjectable) {
      return fromGlobalInjectable;
    }

    var fromModuleInjectable = this.injectables[name];
    if (fromModuleInjectable) {
      return fromModuleInjectable;
    }

    var fromFactory = this.factories[name];
    if (fromFactory) {
      var result = (0, _argsList.getMethod)(fromFactory).apply(undefined, _toConsumableArray((0, _argsList.getArgsList)(fromFactory).map(function (arg) {
        return _this.get(arg);
      })));
      injectables[name] = result;
      return result;
    }

    var fromServices = this.services[name];
    if (fromServices) {
      var _result = new (Function.prototype.bind.apply((0, _argsList.getMethod)(fromServices), [null].concat(_toConsumableArray((0, _argsList.getArgsList)(fromServices).map(function (arg) {
        return _this.get(arg);
      })))))();
      injectables[name] = _result;
      return _result;
    }

    if (this.dependencies[0]) {
      var _result2 = this.dependencies.reduce(function (injectable, depModuleName) {
        try {
          return injectable || _module.modules[depModuleName].get(name);
        } catch (err) {
          return injectable;
        }
      }, null);
      injectables[name] = _result2;
      return _result2;
    }

    throw new Error('Impossible to find module \'' + name + '\'');
  } catch (err) {
    throw err;
  }
}