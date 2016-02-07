import {expect} from 'chai';

import jedi from '../../src';

describe('Module runnable registration', function () {
  describe('a module .run() method', function () {
    let jediModule;
    beforeEach(function () {
      jediModule = jedi.module();
    });

    it('should register a given method into the module\'s runnableMethod field', function () {
      // Given
      function runnable() {

      };

      // When
      jediModule.run(runnable);

      // Then
      expect(jediModule.runnableMethod).to.equal(runnable);
    });

    it('should return the module', function () {
      // Given
      const runnable = 'foo';

      // When
      const result = jediModule.run(runnable);

      // Then
      expect(result).to.equal(jediModule);
    });
  });
});
