import chai, {expect} from 'chai';
import {stub} from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import jedi from '../../index';

describe('jedi.bootstrap() method', function () {
  let jediModule;
  beforeEach(function () {
    jediModule = jedi.module();
  });

  it('should call the given module\'s runnable', function () {
    // Given
    jediModule.runnableMethod = stub();

    // When
    jedi.bootstrap(jediModule);

    // Then
    expect(jediModule.runnableMethod.called).to.be.true;
  });

  it('should should inject a module\'s injectables in the runnable', function () {
    // Given
    jediModule.injectables = {'anInjectable': 'foo'};
    const stubCaller = stub();
    jediModule.runnableMethod = function (anInjectable) {
      stubCaller(anInjectable);
    };

    // When
    jedi.bootstrap(jediModule);

    // Then
    expect(stubCaller).to.have.been.calledWith('foo');
  });
});
