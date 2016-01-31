import resolve from './resolve';

module.exports = function get(module, name) {
  const resolvedArray = resolve(module, [name]);

  if (!resolvedArray[0]) {
    throw new Error(`Impossible to inject not found module ${name}`);
  }

  return resolvedArray[0];
};
