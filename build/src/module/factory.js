"use strict";

module.exports = function (module) {
  return function registerFactory(name, factory) {
    if (module.injectables[name] || module.factories[name] || module.services[name]) {
      throw new Error("Cannot register as '" + name + "', already registered");
    }

    module.factories[name] = factory();

    return module;
  };
};