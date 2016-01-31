import {expect} from 'chai';
import {stub} from 'sinon';

const di = require('../index');

describe('jedi.module() method', function () {
  it('should return an object containing .injectables, .factories and .services', function () {
    // When
    const module = di.module([]);

    // Then
    expect(module.injectables).to.deep.equal({});
    expect(module.factories).to.deep.equal({});
    expect(module.services).to.deep.equal({});
  });

  it('should return an object containing .register() method', function () {
    // When
    const module = di.module([]);

    // Then
    expect(module.register).to.be.a('function');
  });

  it('should return an object containing .factory() method', function () {
    // When
    const module = di.module([]);

    // Then
    expect(module.factory).to.be.a('function');
  });

  it('should return an object containing .service() method', function () {
    // When
    const module = di.module([]);

    // Then
    expect(module.service).to.be.a('function');
  });

  it('should contain a dependencies array if given', function () {
    // When
    const module = di.module(['foo']);

    // Then
    expect(module.dependencies).to.deep.equal(['foo']);
  });
});
