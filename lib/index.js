export function _mixin(shouldExtend, Cls, ...mixins) {
  'use strict';

  class Mixed extends Cls {}
  let proto = Mixed.prototype;

  [].concat(mixins).forEach((mixin) => {
    Object.getOwnPropertyNames(mixin)
      .forEach((key) => {
        let isMethod = typeof mixin[key] === 'function';
        if (isMethod && shouldExtend) {
          let oldMethod = proto[key];
          let newMethod = mixin[key];
          proto[key] = function() {
            newMethod.apply(this, arguments);
            return oldMethod.apply(this, arguments);
          };
        } else {
          let descriptor = Object.getOwnPropertyDescriptor(mixin, key);
          Object.defineProperty(proto, key, descriptor);
        }
      });
  });

  return Mixed;
}

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
  return _mixin(false, Cls, ...mixins);
}

/**
 * The same functionality as 'mixin', but if the Class already contains a method it
 * encounters it will wrap it and call first the new method then the original method.
 * It will return the value from the original method.
 * @see mixin
 *
 * @param {function} Cls Class to mix functionality into.
 * @param {...Object} mixins Mixins to apply.
 * @return {function}
 */
export function mixinExtend(Cls, ...mixins) {
  return _mixin(true, Cls, ...mixins);
}
