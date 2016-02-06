'use strict';

const jedi = {};
jedi.module = require('./module/module');
jedi.resolve = require('./helpers/resolve');
jedi.bootstrap = require('./helpers/bootstrap');

module.exports = jedi;
