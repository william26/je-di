import {expect} from 'chai';

import jedi from '../../src';

describe('Injectable registration', function () {
  let module;
  beforeEach(function () {
    module = jedi.module('module1', []);
  });

  const testErrorsForRegistered = (method) => {
    const itShouldThrow = (containerName, originalRegisterMethod, newRegisterMethod) => {
      it(`should throw an error if the name is already registered in ${containerName}`, function () {
        // Given
        const registerable1 = 'foo';
        const registerable2 = 'baz';
        module[originalRegisterMethod]('anInjectable', registerable1);

        // When
        const methodThatShouldThrow = () => {
          module[newRegisterMethod]('anInjectable', registerable2);
        }

        // Then
        expect(methodThatShouldThrow)
          .to.throw(/Cannot register as 'anInjectable', already registered/);
      });
    };

    itShouldThrow('injectables', 'register', method);
    itShouldThrow('factories', 'factory', method);
    itShouldThrow('services', 'service', method);
  }

  const itShouldReturnTheModule = (methodName) => {
    it('should return the module', function () {
      // When
      const result = module[methodName]('anInjectable', 'foo');

      // Then
      expect(result).to.equal(module);
    });
  };

  describe('a module .register() method', function () {
    it('should register a given direct value in the module\'s injectables', function () {
      // Given
      const registerable = 'foo';

      // When
      module.register('anInjectable', registerable);

      // Then
      expect(module.injectables['anInjectable']).to.equal('foo');
    });

    testErrorsForRegistered('register');
    itShouldReturnTheModule('register');
  });

  describe('a module .service() method', function () {
    it('should register a given function in the module\'s services', function () {
      // Given
      const registerable = 'foo';

      // When
      module.service('anInjectable', registerable);

      // Then
      expect(module.services['anInjectable']).to.equal('foo');
    });

    testErrorsForRegistered('service');
    itShouldReturnTheModule('service');
  });


  describe('a module .factory() method', function () {
    it('should register a given function in the module\'s factories', function () {
      // Given
      const registerable = 'foo';

      // When
      module.factory('anInjectable', registerable);

      // Then
      expect(module.factories['anInjectable']).to.equal('foo');
    });

    testErrorsForRegistered('factory');
    itShouldReturnTheModule('factory');
  });
});
