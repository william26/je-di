"use strict";

module.exports = function (module) {
  /**
   * Adds the given object to the module's injectables
   * @param  {String} name   the name of the injectable
   * @param  {Object} object Object to be injected anywhere
   * @return {Object}        the module
   */
  return function register(name, object) {
    if (module.injectables[name] || module.factories[name] || module.services[name]) {
      throw new Error("Cannot register as '" + name + "', already registered");
    }

    module.injectables[name] = object;

    return module;
  };
};