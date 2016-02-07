"use strict";

module.exports = function get(module, name) {
  var resolvedArray = module.resolve([name]);

  if (!resolvedArray[0]) {
    throw new Error("Impossible to inject not found module " + name);
  }

  return resolvedArray[0];
};