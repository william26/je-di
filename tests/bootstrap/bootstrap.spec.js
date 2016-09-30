import chai, {expect} from 'chai';
import sinon, {spy, stub} from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import jedi from '../../src';

describe('Module bootstraping', function () {
  let jediModule;
  beforeEach(function () {
    jediModule = jedi.module('somemodule', []);
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

    it('should accept a module string name as argument', function () {
      // Given
      jediModule.runnableMethod = stub();

      // When
      jedi.bootstrap('somemodule');

      // Then
      expect(jediModule.runnableMethod.called).to.be.true;
    });

    it('should be able to take an ng-annotate style dependency array as runnable', function () {
      // Given
      const actualMethod = stub();
      stub(jediModule, 'get')
        .withArgs('dep1').returns('dep1value')
        .withArgs('dep2').returns('dep2value');
      jediModule.runnableMethod = ['dep1', 'dep2', actualMethod];

      // When
      jedi.bootstrap(jediModule);

      // Then
      expect(actualMethod.calledWith('dep1value', 'dep2value')).to.equal(true);
    });

    it('should do nothing if the runnable is not set', function () {
      // When
      function shouldNotThrow() {
        jedi.bootstrap(jediModule);
      }

      // Then
      expect(shouldNotThrow).not.to.throw();
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

    it('should run a module\'s dependencies\' runnables in ordre before its own runnable', function () {
      // Given
      const runnable1 = stub();
      const module1 = jedi.module('module1', []).run(runnable1);

      const runnable2 = stub();
      const module2 = jedi.module('module2', []).run(runnable2);

      const finalRunnable = stub();
      const finalModule = jedi.module('module3', [module1, module2]).run(finalRunnable);

      // When
      jedi.bootstrap(finalModule);

      // Then
      sinon.assert.callOrder(runnable1, runnable2, finalRunnable);
    });

    it('should throw an error when a module\'s dependency is not found', function () {
      // Given
      const module = jedi.module('modulename', [
        'someinexistant-module'
      ]);

      // Then
      expect(jedi.bootstrap.bind(null, module)).to.throw('Module not found someinexistant-module')
    });
  });
});
