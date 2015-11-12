var chai = require('chai');
var mixin = require('../lib').mixin;

class Foo {
  constructor() {
    this.bar = true;
  }
}

describe('Mixin', () => {
  it('mixes in functionality', () => {
    let Mixed = mixin(Foo, {
      baz: true,
      qux() {
        return 'qux';
      }
    });
    let foo = new Mixed();

    chai.assert.equal(foo.bar, true);
    chai.assert.equal(foo.baz, true);
    chai.assert.equal(foo.qux(), 'qux');
  });

  it('mixes in multiple functionality', () => {
    let Mixed = mixin(Foo, {
        baz: true,
        qux() {
          return 'qux';
        }
      },
      {
        foo: false,
        qux() {
          return 'not qux';
        }
      }
    );
    let foo = new Mixed();

    chai.assert.equal(foo.bar, true);
    chai.assert.equal(foo.baz, true);
    chai.assert.equal(foo.foo, false);
    chai.assert.equal(foo.qux(), 'not qux');
  });
});
