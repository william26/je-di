"use strict";

/**
 * Adds the given object to the module's injectables
 * @param  {String} name   the name of the injectable
 * @param  {Object} object Object to be injected anywhere
 * @return {Object}        the module
 */
module.exports = function register(name, object) {
  if (this.injectables[name] || this.factories[name] || this.services[name]) {
    throw new Error("Cannot register as '" + name + "', already registered");
  }

  this.injectables[name] = object;

  return this;
};