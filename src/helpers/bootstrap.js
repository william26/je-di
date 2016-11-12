import {getArgsList} from './args-list';
import {modules} from '../module/module';

function bootstrap(moduleOrName) {
  const module = typeof moduleOrName === 'object' ? moduleOrName : modules[moduleOrName];

  if (!module) {
    throw new Error(`Module not found ${moduleOrName}`);
  }

  module.dependencies.map(dependency =>{
    bootstrap(dependency);
    module.injectables = Object.assign(module.injectables, modules[dependency].injectables);
    module.factories = Object.assign(module.factories, modules[dependency].factories);
    module.services = Object.assign(module.services, modules[dependency].services);
  });

  if (module.runnableMethod) {
    let runnableMethod;
    let args;

    if (typeof module.runnableMethod === 'function') {
      args = getArgsList(module.runnableMethod);
      runnableMethod = module.runnableMethod;
    }

    if(typeof module.runnableMethod === 'object' && module.runnableMethod.length) {
      runnableMethod = module.runnableMethod[module.runnableMethod.length - 1];
      args = getArgsList(module.runnableMethod);
    }

    runnableMethod.apply(module, module.resolve(args));
  }
};

module.exports = bootstrap;
