import {getArgsList} from './args-list';

function bootstrap(module) {
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
