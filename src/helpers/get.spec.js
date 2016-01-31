import {expect} from 'chai';

import get from './get';

describe('get() method', function () {
  beforeEach(function () {
    this.module = {
      injectables: {
        foo: 'bar'
      },
      factories: {
        hello(foo) {
          return `${foo}world`
        }
      },
      services: {
        baz(hello) {
          this.bla = `${hello}bazz`;
        }
      }
    };
  })

  it('should return an injectable by name', function () {
    // When
    const result = get(this.module, 'foo');

    // Then
    expect(result).to.equal('bar');
  });

  it('should return an injected factory instance by name', function () {
    // When
    const result = get(this.module, 'hello');

    // Then
    expect(result).to.equal('barworld');
  });

  it('should return an injected service instance by name', function () {
    // When
    const result = get(this.module, 'baz');

    // Then
    expect(result.bla).to.equal('barworldbazz');
  });
});
