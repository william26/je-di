'use strict';

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function get(module, name) {
  var resolvedArray = (0, _resolve2.default)(module, [name]);

  if (!resolvedArray[0]) {
    throw new Error('Impossible to inject not found module ' + name);
  }

  return resolvedArray[0];
};