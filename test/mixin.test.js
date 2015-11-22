var chai = require('chai');
var mixin = require('../lib').mixin;
var mixinExtend = require('../lib').mixinExtend;

class Foo {
  constructor() {
    this.bar = true;
  }
  existingMethod() {
    return 'existing';
  }
}

describe('mixin', () => {
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

  it('ignores \'constructor\' property if present', () => {
    let Mixed = mixin(Foo, {
      constructor: true
    });
    let foo = new Mixed();

    chai.assert.notEqual(foo.constructor, true);
  });

  it('mixes in multiple functionality', () => {
    let Mixed = mixin(Foo, {
        baz: true,
        existingMethod() {
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

  it('can handle no mixins being supplied', () => {
    let Mixed = mixin(Foo);
    let foo = new Mixed();

    chai.assert.equal(foo.bar, true);
    chai.assert.equal(foo.existingMethod(), 'existing');
  });
});

describe('mixinExtend', () => {
  it('wraps existing method to run new and old while returning old', () => {
    let Mixed = mixinExtend(Foo, {
      bar: true,
      existingMethod() {
        this.bar = false;
      }
    });
    let foo = new Mixed();

    chai.assert.equal(foo.bar, true);
    chai.assert.equal(foo.existingMethod(), 'existing');
    chai.assert.equal(foo.bar, false);
  });

  it('wraps existing method when mutliple mixins used', () => {
    let Mixed = mixinExtend(Foo, {
        bar: true,
        existingMethod() {
          this.bar = false;
        }
      },
      {
        qux: true,
        existingMethod() {
          this.qux = false;
        }
      }
    );
    let foo = new Mixed();

    chai.assert.equal(foo.bar, true);
    chai.assert.equal(foo.qux, true);
    chai.assert.equal(foo.existingMethod(), 'existing');
    chai.assert.equal(foo.bar, false);
    chai.assert.equal(foo.qux, false);
  });
});
