"use strict";

function resolve(names) {
  var _this = this;

  return names.map(function (name) {
    return _this.get(name);
  });
};
module.exports = resolve;