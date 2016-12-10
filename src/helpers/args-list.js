import argsList from 'function-arguments';

export function getArgsList(target) {
  if (typeof target === 'object' && target.length && typeof target[target.length - 1] === 'function') {
    return target.slice(0, target.length - 1);
  }
  if (typeof target === 'function' && !!target.$inject) {
    return target.$inject;
  }
  if (typeof target === 'function') {
    return argsList(target);
  }
}

export function getMethod(target) {
  if (typeof target === 'function') {
    return target;
  }

  if (typeof target === 'object' && target.length && typeof target[target.length - 1] === 'function') {
    return target[target.length - 1];
  }
}
