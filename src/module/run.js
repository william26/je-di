import argsList from 'function-arguments';

module.exports = function run(fn) {
  this.runnableMethod = fn;
  return this;
};
