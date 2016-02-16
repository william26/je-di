module.exports = function createService(name, service) {
  if (this.injectables[name] || this.factories[name] || this.services[name]) {
    throw new Error(`Cannot register as '${name}', already registered`);
  }

  this.services[name] = service;

  return this;
};
