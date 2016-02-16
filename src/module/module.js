import resolve from './resolve';
import get from './get';
import register from './register';
import factory from './factory';
import service from './service';
import run from './run';

module.exports = function createModule(dependencies) {
  const module = {};

  module.dependencies = dependencies || [];

  module.injectables = {};
  module.factories = {};
  module.services = {};

  module.runnableMethod = null;

  module.register = register.bind(module);
  module.factory = factory.bind(module);
  module.service = service.bind(module);
  module.run = run.bind(module);

  module.resolve = resolve.bind(module);
  module.get = get.bind(module);

  return module;
}
