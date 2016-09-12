import {getArgsList} from './args-list';
import {modules} from '../module/module';

function bootstrap(moduleOrName) {
  const module = typeof moduleOrName === 'object' ? moduleOrName : modules[moduleOrName];

  module.dependencies.map(bootstrap);

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
