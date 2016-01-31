Just Enough Dependency Injection
====================

![Travis CI](https://travis-ci.org/william26/je-di.svg?branch=master)

This is yet another dependency injection module, based on ideas of Angular di.

Usage
----

```javascript
const jedi = require('jedi');

module.exports = jedi
  .module()
  // registers an injectable directly
  .register('something', 'Hello')

  // registers what's returned by the given function as an injectable
  .factory('somethingElse', function (something) {

    return `${something} world !`;
  })

  // Registers a newable as injectable (calls new on it before register)
  .service('someService', function (somethingElse) {
    this.greetings = function () {
      console.log(somethingElse);
    };
  })
  .run(function (someService) {
    someService.greetings();
  });

```

The code above will result in the following console statement:

```
Hello world !
```

Module dependency
------------

You can include all of a module's injectables into another module by giving a module array in `.module()` :

```
const module1 = jedi
  .module()
  .register('foo', 'bla');


const module2 = jedi
  .module([module1])
  .run(function (foo) {
    // here foo === 'bla'
  });
```

Contributing:
-----

All contribution, feedback, issues and PR welcome.
Just try to keep the code clean, and add tests.


License
------

MIT license
