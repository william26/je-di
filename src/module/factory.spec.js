import {expect} from 'chai';
import {stub} from 'sinon';

describe('module.factory() method', function () {
  it('should register the given method in module.factories', function () {
    // Given
    const mod = {
      injectables: {},
      factories: {},
      services: {}
    };
    const factory = require('./factory')(mod);

    // When
    factory('foo', function () {
      return 'baz';
    });

    // Then
    expect(mod.factories['foo']).to.equal('baz');
  });

  it('should throw an exception if the name is already in the module', function () {
    // Given
    const mod = {
      injectables: {
        foo: 'baz'
      },
      factories: {},
      services: {}
    };
    const factory = require('./factory')(mod);

    // When
    try {
      factory('foo', function () {
        return 'bar';
      });
    } catch (err) {
      this.message = err.message;
    }

    // Then
    expect(this.message).to.equal(`Cannot register as 'foo', already registered`);
  });

  it('should return the module', function () {
    // Given
    const mod = {
      injectables: {
        foo: 'baz'
      },
      factories: {},
      services: {}
    };
    const factory = require('./factory')(mod);

    // When
    const result = factory('bar', function () {
      return 'hello';
    });

    // Then
    expect(result).to.equal(mod);
  });
});
