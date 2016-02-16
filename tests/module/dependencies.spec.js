import {expect} from 'chai';
import {stub} from 'sinon';
import jedi from '../../src';

describe('Module dependencies', function () {

  describe('a module .module() method', function () {
    it('can register an array of dependencies if given', function () {
      // Given
      const module1 = jedi.module();

      // When
      const module2 = jedi.module([module1]);

      // Then
      expect(module2.dependencies).to.include(module1);
    });

    it('should set its dependencies to an empty array if none are given', function () {
      // When
      const module1 = jedi.module();;

      // Then
      expect(module1.dependencies).to.deep.equal([]);
    });
  });

  describe('a module .resolve() method', function () {
    it('should look up injectables in dependencies if not found in the module', function () {
      // Given
      const module1 = jedi
        .module()
        .register('foo', 'bar')
        .factory('baz', function (foo) {
          return `${foo}qux`;
        })
        .service('quz', function (baz) {
          this.bla = `${baz}blu`;
        });

      const module2 = jedi
        .module([module1]);

      // When
      const result = module2.resolve(['quz']);

      // Then
      expect(result).to.deep.equal([{
        bla: 'barquxblu'
      }]);
    });

    it('should add injectables resolved from a dependency to the module\'s own injectables', function () {
      const module1 = jedi.module();

      module1.get = stub().withArgs('foo').returns('bar');

      const module2 = jedi.module([module1]);

      module2.resolve(['foo']);

      // Then
      expect(module2.injectables.foo).to.equal('bar')
    });
  });
});
