import argsList from 'args-list';


function resolveName(module, name) {
  const fromInjectable = module.injectables[name]
  if (fromInjectable) {
    return fromInjectable;
  }

  const fromFactory = module.factories[name];
  if (fromFactory) {
    const result = fromFactory(...resolve(module, argsList(fromFactory)));
    module.injectables[name] = result;
    return result;
  }

  const fromServices = module.services[name];
  if (fromServices) {
    const result = new fromServices(...resolve(module, argsList(fromServices)));
    module.injectables[name] = result;
    return result;
  }

  if (module.dependencies) {
    const result = module.dependencies.reduce(function (injectable, depModule) {
      try {
        return injectable || resolveName(depModule, name);
      } catch (err) {
        return injectable;
      }
    }, null);
    module.injectables[name] = result;
    return result;
  }

  throw new Error(`Impossible to find module '${name}'`);
}

function resolve(module, names) {
  return names.map((name) => resolveName(module, name));
};
module.exports = resolve;
