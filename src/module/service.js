module.exports = function (module) {
  return function createService(name, service) {
    if (module.injectables[name] || module.factories[name] || module.services[name]) {
      throw new Error(`Cannot register as '${name}', already registered`);
    }

    module.services[name] = service;

    return module;
  };
};
