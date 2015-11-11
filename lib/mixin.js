/**
 * Utility to allow functionality to mixed into the prototype of a Class.
 * @example
 * let MyNewClass = mixin(MyClass, {
 *   newMethod() ...
 * },
 * {
 *   property: true,
 *   anotherMethod() ...
 * });
 *
 * @param {function} Cls Class to mix functionality into.
 * @param {...Object} mixins Mixins to apply.
 * @return {function}
 */
export function mixin(Cls, ...mixins) {
  'use strict';

  class Mixed extends Cls {}
  let proto = Mixed.prototype;

  [].concat(mixins).forEach((mixin) => {
    Object.getOwnPropertyNames(mixin).forEach((key) => {
      let descriptor = Object.getOwnPropertyDescriptor(mixin, key);
      Object.defineProperty(proto, key, descriptor);
    });
  });

  return Mixed;
}
