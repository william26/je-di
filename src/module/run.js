import resolve from '../helpers/resolve';
import argsList from 'args-list';

module.exports = function run(module, fn) {
  fn.apply(module, resolve(module, argsList(fn)));
  return module;
};
