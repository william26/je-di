import argsList from 'args-list';

module.exports = function run(fn) {
  this.runnableMethod = fn;
  return this;
};
