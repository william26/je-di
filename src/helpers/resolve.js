import argsList from 'args-list';

function resolve(module, names) {
  return names.map(function (name) {
    const fromInjectable = module.injectables[name]
    if (fromInjectable) {
      return fromInjectable;
    }

    const fromFactory = module.factories[name];
    if (fromFactory) {
      return fromFactory(...resolve(module, argsList(fromFactory)));
    }

    const fromServices = module.services[name];
    if (fromServices) {
      return new fromServices(...resolve(module, argsList(fromServices)));
    }
  })
};
module.exports = resolve;
