'use strict';

var _resolve = require('../helpers/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _argsList = require('args-list');

var _argsList2 = _interopRequireDefault(_argsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function run(module, fn) {
  fn.apply(module, (0, _resolve2.default)(module, (0, _argsList2.default)(fn)));
};