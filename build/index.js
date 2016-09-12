'use strict';

var _module = require('./module/module');

var _module2 = _interopRequireDefault(_module);

var _bootstrap = require('./helpers/bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  module: _module2.default,
  modules: _module.modules,
  bootstrap: _bootstrap2.default
};