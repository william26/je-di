'use strict';

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function run(fn) {
  this.runnableMethod = fn;
  return this;
};