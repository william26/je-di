import argsList from 'args-list';

export default function resolveName(name) {

  const fromInjectable = this.injectables[name]
  if (fromInjectable) {
    return fromInjectable;
  }

  const fromFactory = this.factories[name];
  if (fromFactory) {
    const result = fromFactory(...argsList(fromFactory).map(::this.get));
    this.injectables[name] = result;
    return result;
  }

  const fromServices = this.services[name];
  if (fromServices) {
    const result = new fromServices(...argsList(fromServices).map(::this.get));
    this.injectables[name] = result;
    return result;
  }

  if (this.dependencies[0]) {
    const result = this.dependencies.reduce(function (injectable, depModule) {
      try {
        return injectable || depModule.get(name);
      } catch (err) {
        return injectable;
      }
    }, null);
    this.injectables[name] = result;
    return result;
  }

  throw new Error(`Impossible to find module '${name}'`);
}
