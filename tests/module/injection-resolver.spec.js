import {expect} from 'chai';

import jedi from '../../src';


describe('Injection resolver', function () {
  describe('a module .resolve() method', function () {
    it('should return an array of injected injectables given their names', function () {
      // Given
      const jediModule = jedi
        .module()
        .register('foo', 'bar')
        .factory('baz', function (foo) {
          return `${foo}qux`;
        })
        .service('quz', function (baz) {
          this.bla = `${baz}blu`;
        });

      // When
      const result = jediModule.resolve(['quz']);

      // Then
      expect(result).to.deep.equal([{
        bla: 'barquxblu'
      }]);
    });
  })
});
