Just Enough Dependency Injection
====================

This is yet another dependency injection module, based on ideas of Angular di.

Usage
----

```
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

Next steps
------

I plan to add in the near future:

- Module dependency, allowing the current module to use all the other modules' injections.


Contributing:
-----

All contribution, feedback, issues and PR welcome.
Just try to keep the code clean, and add tests.


License
------

MIT license
