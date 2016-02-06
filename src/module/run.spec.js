import {expect} from 'chai';
import run from './run';

// describe('module.run() method', function () {
//   beforeEach(function () {
//     this.module = {
//       injectables: {
//         foo: 'bar'
//       },
//       factories: {
//         hello(foo) {
//           return `${foo}world`
//         }
//       },
//       services: {
//         baz(hello) {
//           this.bla = `${hello}bazz`;
//         }
//       }
//     };
//   });
//
//   it('should run the given method, correctly injected', function () {
//     // Given
//     let result = null;
//     function runnable(foo, hello, baz) {
//       result = [foo, hello, baz.bla];
//     };
//
//     // When
//     run(this.module, runnable);
//
//     // Then
//     expect(result).to.deep.equal(['bar', 'barworld', 'barworldbazz']);
//   });
//
//   it('should return the module', function () {
//     // When
//     const result = run(this.module, function () {
//
//     });
//
//     // Then
//     expect(result).to.equal(this.module);
//   });
// });
