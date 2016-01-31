import {expect} from 'chai';
import {stub} from 'sinon';

describe('module.register() method', function () {
  beforeEach(function () {
    this.module = {
      injectables: {},
      factories: {},
      services: {}
    };

    this.register = require('./register')(this.module);
  });

  it('should add the given object to the module\'s injectables', function() {
    // When
    this.register('foo', {
      hello: 'world'
    });

    // Then
    expect(this.module.injectables['foo']).to.deep.equal({
      hello: 'world'
    });
  });

  it('should throw an exception if the name is already in the module', function () {
    // Given
    this.register('foo', {
      hello: 'world'
    });

    // When
    try {
      this.register('foo', {
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
    const result =  this.register('foo', 'bla');

    // Then
    expect(result).to.equal(this.module);
  });
});
