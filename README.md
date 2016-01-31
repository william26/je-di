Just Enough Dependency Injection
====================

This is yet another dependency injection module, based on ideas of Angular di.

Here's the main components I plan to add:

Modules
----

```
const jedi = require('jedi');

module.exports = jedi
  .module('moduleName', otherModules)
  .register('something', {hello: 'world'}) // registers an injectable directly
  .factory('somethingElse', function () { // registers what's returned by the given function as an injectable
    function Newable() {
      this.sayHello = function () {
        console.log('Hello !');
      };
    };
    return new Newable();
  })
  .service('someService', function () { // Registers a newable as injectable (calls new on it before register)

  });

```
