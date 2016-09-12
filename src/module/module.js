import resolve from './resolve';
import get from './get';
import register from './register';
import factory from './factory';
import service from './service';
import run from './run';

export const modules = {};

export default function createModule(name, dependencies) {
  const module = {};

  module.name = name;
  module.dependencies = dependencies && dependencies.map(d => typeof d === 'string' ? d : d.name) || [];

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

  modules[name] = module;

  return module;
}
