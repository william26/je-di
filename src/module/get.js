import {getArgsList, getMethod} from '../helpers/args-list';
import {modules} from './module';

export default function resolveName(name) {
  try {
    const fromInjectable = this.injectables[name]
    if (fromInjectable) {
      return fromInjectable;
    }

    const fromFactory = this.factories[name];
    if (fromFactory) {
      const result = getMethod(fromFactory)(...getArgsList(fromFactory).map(arg => this.get(arg)));
      this.injectables[name] = result;
      return result;
    }

    const fromServices = this.services[name];
    if (fromServices) {
      const result = new (getMethod(fromServices))(...getArgsList(fromServices).map(arg => this.get(arg)));
      this.injectables[name] = result;
      return result;
    }

    if (this.dependencies[0]) {
      const result = this.dependencies.reduce(function (injectable, depModuleName) {
        try {
          return injectable || modules[depModuleName].get(name);
        } catch (err) {
          return injectable;
        }
      }, null);
      this.injectables[name] = result;
      return result;
    }
    throw new Error(`Impossible to find module '${name}'`);

  } catch (err) {
    throw err;
  }
}
