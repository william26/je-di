Just Enough Dependency Injection
====================

![Travis CI](https://travis-ci.org/william26/je-di.svg?branch=master)

This is yet another dependency injection module, based on ideas of Angular di.

Usage
----

```javascript
import jedi from 'je-di';

const jediModule = jedi
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

  jedi.bootstrap(jediModule);

  module.exports = jediModule;

```

The code above will result in the following console statement:

```sh
Hello world !
```

Module dependency
------------

You can include all of a module's injectables into another module by giving a module array in `.module()` :

```javascript
const module1 = jedi
  .module()
  .register('foo', 'bla');


const module2 = jedi
  .module([module1])
  .run(function (foo) {
    // here foo === 'bla'
  });
```

api
---

**`jedi.module()` method**

Creates a new module and returns it.

*Arguments*

- `dependencies` (Optional array): an array of modules that will be loaded. All the module's dependencies' injectables
will be available in the module, and their run methods will be run in order before the module's own run method when
bootstrapped.

**`module.register(name, injectable)` method**

Registers a given injectable under the given name, to be injected.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .register('foo', 'bar')
  .run(function (foo) {
    console.log(foo);
  });

jedi.bootstrap(jediModule);

```

Result:
```sh
$ node index.js
bar
```

**`module.factory(name, injectable)` method**

Registers a given factory under the given name. When the name is given as a dependency, the result of the factory
is inserted in the module's injectables and returned in the injected object.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .factory('foo', function () {
    return 'bar';
  })
  .run(function (foo) {
    console.log(foo);
  });

jedi.bootstrap(jediModule);
```

Result:
```sh
$ node index.js
bar
```

**`module.service(name, injectable)` method**

Registers a given service as a newable under the given name.
When the name is given as a dependency, the service is called with `new`, and the result is inserted in the module's
injectables and returned in the injected object.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .service('foo', function () {
    this.baz = 'bar';
  })
  .run(function (foo) {
    console.log(foo.baz);
  });

jedi.bootstrap(jediModule);
```

Result:
```sh
$ node index.js
bar
```

**`module.run()` method**

Registers a method to be called when the module is bootstrapped. The method's named parameters are injected with
the module's or its dependency's injectables.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .service('foo', function () {
    this.baz = 'bar';
  })
  .run(function (foo) {
    console.log(foo.baz);
  });

jedi.bootstrap(jediModule);
```
Result:
```sh
$ node index.js
bar
```

**`module.resolve()` method**

When given an array of names, this method returns an array of injectables from the module or its dependencies.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .service('foo', function () {
    this.baz = 'bar';
  });

console.log(jediModule.resolve(['foo']));
```

Result:
```sh
$ node index.js
['bar']
```

**`module.get()` method**

When given a single name, this method returns the associated injectable from the module or its dependencies.

For example:

```javascript
// index.js

import jedi from 'je-di';

const jediModule = jedi
  .module()
  .service('foo', function () {
    this.baz = 'bar';
  });

console.log(jediModule.get(['foo']));
```

Result:
```sh
$ node index.js
bar
```



Contributing:
-----

All contribution, feedback, issues and PR welcome.
Just try to keep the code clean, and add tests.


License
------

MIT license
