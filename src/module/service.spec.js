import {expect} from 'chai';
import {stub} from 'sinon';

describe('module.service() method', function () {
  beforeEach(function () {
    this.module = {
      injectables: {},
      factories: {},
      services: {}
    };

    this.service = require('./service')(this.module);
  });

  it('should add the given object to the module\'s services', function() {
    // Given
    const newable = function () {
      this.hi = 'world';
    };


    // When
    this.service('foo', newable);

    // Then
    expect(new this.module.services.foo().hi).to.deep.equal('world');
  });

  it('should throw an exception if the name is already in the module', function () {
    // Given
    this.service('foo', {
      hello: 'world'
    });

    // When
    try {
      this.service('foo', {
        hello: 'world'
      });
    } catch(err) {
      this.err = err;
    }

    // Then
    expect(this.err.message).to.equal('Cannot register as \'foo\', already registered');
  });

  it('should return the module', function () {
    // When
    const result = this.service('foo', function () {
      this.hello = 'bla';
    });

    // Then
    expect(result).to.equal(this.module);
  });
});
