import chai, {expect} from 'chai';
import {spy, stub} from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import jedi from '../../src';

describe('Module bootstraping', function () {
  let jediModule;
  beforeEach(function () {
    jediModule = jedi.module();
  });

  describe('jedi.bootstrap() method', function () {
    it('should call the given module\'s runnable', function () {
      // Given
      jediModule.runnableMethod = stub();

      // When
      jedi.bootstrap(jediModule);

      // Then
      expect(jediModule.runnableMethod.called).to.be.true;
    });

    it('should inject a module\'s injectables in the runnable using the module\'s resolve method', function () {
      // Given
      const stubCaller = stub();
      jediModule.runnableMethod = function (foo, bar, baz) {
        stubCaller(foo, bar, baz);
      };
      stub(jediModule, 'resolve').withArgs(['foo', 'bar', 'baz']).returns(['yo', 'bla', 'quz']);

      // When
      jedi.bootstrap(jediModule);

      // Then
      expect(stubCaller).to.have.been.calledWith('yo', 'bla', 'quz');
    });
  });
});
