'use strict';

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createModule(dependencies) {
  var module = {};

  module.dependencies = dependencies || [];

  module.injectables = {};
  module.factories = {};
  module.services = {};

  module.runnableMethod = null;

  module.register = _register2.default.bind(module);
  module.factory = _factory2.default.bind(module);
  module.service = _service2.default.bind(module);
  module.run = _run2.default.bind(module);

  module.resolve = _resolve2.default.bind(module);
  module.get = _get2.default.bind(module);

  return module;
};