'use strict';

var _functionArguments = require('function-arguments');

var _functionArguments2 = _interopRequireDefault(_functionArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function run(fn) {
  this.runnableMethod = fn;
  return this;
};