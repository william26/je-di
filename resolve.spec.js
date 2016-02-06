// import {expect} from 'chai';
//
// import resolve from './resolve';
//
// describe('resolve() method', function () {
//   it('should return an array of required injectables from the given module', function () {
//     // Given
//     const module = {
//       injectables: {
//         hello: 'world',
//         foo: 'baz'
//       }
//     };
//
//     // When
//     const result = resolve(module, ['hello', 'foo']);
//
//     // Then
//     expect(result).to.deep.equal(['world', 'baz']);
//   });
//
//   it('should return instanciate factories if the required name is not in injectables', function () {
//     // Given
//     const module = {
//       injectables: {
//         hello: 'world'
//       },
//       factories: {
//         foo: function (hello) {
//           return `baz${hello}`
//         }
//       }
//     };
//
//     // When
//     const result = resolve(module, ['hello', 'foo']);
//
//     // Then
//     expect(result).to.deep.equal(['world', 'bazworld']);
//   });
//
//   it('should put instanciated factories in injectables', function () {
//     // Given
//     const module = {
//       injectables: {
//         hello: 'world'
//       },
//       factories: {
//         foo: function (hello) {
//           return `baz${hello}`
//         }
//       }
//     };
//
//     // When
//     const result = resolve(module, ['hello', 'foo']);
//
//     // Then
//     expect(module.injectables.foo).to.equal('bazworld');
//   });
//
//   it('should return instanciate services if the required name is not in injectables or in factories', function () {
//     // Given
//     const module = {
//       injectables: {
//         hello: 'world'
//       },
//       factories: {
//         foo: function (hello) {
//           return `baz${hello}`;
//         }
//       },
//       services: {
//         bar: function (foo) {
//           this.bla = `bor${foo}`;
//         }
//       }
//     }
//
//     // When
//     const result = resolve(module, ['hello', 'bar']);
//
//     // Then
//     expect(result).to.deep.equal(['world', {
//       bla: 'borbazworld'
//     }]);
//   });
//
//   it('should put instanciated services in injectables', function () {
//     // Given
//     const module = {
//       injectables: {
//         hello: 'world'
//       },
//       factories: {
//         foo: function (hello) {
//           return `baz${hello}`
//         }
//       },
//       services: {
//         bar: function (foo) {
//           this.bla = `bor${foo}`;
//         }
//       }
//     };
//
//     // When
//     const result = resolve(module, ['bar']);
//
//     // Then
//     expect(module.injectables.bar.bla).to.equal('borbazworld');
//   });
//
//   it('should try to resolve from the module\'s dependencies if name is not found', function () {
//     // Given
//     const module2 = {
//       injectables: {
//         hello: 'world'
//       },
//       factories: {
//         foo: function (hello) {
//           return `baz${hello}`;
//         }
//       },
//       services: {}
//     };
//     const module1 = {
//       injectables: {},
//       factories: {},
//       services: {
//         bar: function (foo) {
//           this.bla = `bor${foo}`;
//         }
//       },
//       dependencies: [module2]
//     };
//
//     // When
//     const result = resolve(module1, ['bar']);
//
//     // Then
//     expect(result).to.deep.equal([{
//       bla: 'borbazworld'
//     }]);
//   });
//
//   it('should throw an error if the injectable is not found at all', function () {
//     // Given
//     const module = {
//       injectables: {},
//       factories: {},
//       services: {}
//     };
//
//     // When
//     try {
//       resolve(module, ['test']);
//     } catch (err) {
//       this.message = err.message;
//     }
//
//     // Then
//     expect(this.message).to.equal('Impossible to find module \'test\'');
//   });
// });
