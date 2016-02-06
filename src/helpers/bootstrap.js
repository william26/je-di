const resolve = require('./resolve');

module.exports = function (module) {
  module.runnableMethod.apply(module);
};
