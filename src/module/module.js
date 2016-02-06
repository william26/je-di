module.exports = function createModule(dependencies) {
  const module = {};

  module.dependencies = dependencies;

  module.injectables = {};
  module.factories = {};
  module.services = {};

  module.runnableMethod = null;

  module.register = require('./register')(module);
  module.factory = require('./factory')(module);
  module.service = require('./service')(module);
  module.run = require('./run').bind(module, module);

  module.resolve = require('../helpers/resolve').bind(module, module);
  module.get = require('../helpers/get').bind(module, module);

  return module;
}
