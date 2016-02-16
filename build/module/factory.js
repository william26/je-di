"use strict";

module.exports = function registerFactory(name, factory) {
  if (this.injectables[name] || this.factories[name] || this.services[name]) {
    throw new Error("Cannot register as '" + name + "', already registered");
  }

  this.factories[name] = factory;

  return this;
};