'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.getArgsList = getArgsList;
exports.getMethod = getMethod;

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getArgsList(target) {
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.length && typeof target[target.length - 1] === 'function') {
    return target.slice(0, target.length - 1);
  }
  if (typeof target === 'function') {
    return (0, _argsList2.default)(target);
  }
}

function getMethod(target) {
  if (typeof target === 'function') {
    return target;
  }

  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.length && typeof target[target.length - 1] === 'function') {
    return target[target.length - 1];
  }
}