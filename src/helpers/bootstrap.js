const argsList = require('args-list');

const resolve = require('./resolve');


module.exports = function (module) {
  module.runnableMethod.apply(module, module.resolve(argsList(module.runnableMethod)));
};
