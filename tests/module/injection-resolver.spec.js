import {expect} from 'chai';

import jedi from '../../src';


describe('Injection resolver', function () {
  describe('a module .get() method', function () {
    it('should return an array of injected injectables given their names', function () {
      // Given
      const jediModule = jedi
        .module('jediModule', [])
        .register('foo', 'bar')
        .factory('baz', function (foo) {
          return `${foo}qux`;
        })
        .service('quz', function (baz) {
          this.bla = `${baz}blu`;
        });

      // When
      const result = jediModule.get('quz');

      // Then
      expect(result).to.deep.equal({
        bla: 'barquxblu'
      });
    });

    it('should be able to support ng-annotate style injections', function () {
      // Given
      const jediModule = jedi
        .module('jediModule', [])
        .register('foo', 'bar')
        .factory('baz', ['foo', function (foo) {
          return `${foo}qux`;
        }])
        .service('quz', ['baz', function (baz) {
          this.bla = `${baz}blu`;
        }]);

      // When
      const result = jediModule.get('quz');

      // Then
      expect(result).to.deep.equal({
        bla: 'barquxblu'
      });
    });

    it('should throw an error when the module is not found', function () {
      const jediModule = jedi.module('jediModule', []);

      // When
      function thrower() {
        const result = jediModule.get('foo');
      }

      // Then
      expect(thrower).to.throw(/Impossible to find module 'foo'/);
    });
  });
});
