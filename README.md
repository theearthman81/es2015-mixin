# Mixins for es6 Classes

[![Build Status](https://travis-ci.org/jimenglish81/es2015-mixin.svg?branch=master)](https://travis-ci.org/jimenglish81/es2015-mixin)

## Installation

```
npm i -S es2015-mixin
```

## Usage

The utility can be used to mixin both properties and methods as shown below.
A new Class will be returned, so the original class will not be mutated.

```js
import { mixin } from 'es2015-mixin';

class Foo {
  constructor() {
    this.bar = true;
  }
}

let Mixed = mixin(Foo, {
  baz: true,
  qux() {
    return 'qux';
  }
});
let foo = new Mixed();
```

You can also supply multiple mixins to add more functionality to the Class.

```js
class Foo {
  constructor() {
    this.bar = true;
  }
  qux() {
    return 'original qux';
  }
}

let Mixed = mixin(Foo, {
    baz: true,
    qux() {
      return 'qux';
    }
  },
  {
    foo: false,
    qux() {
      return 'not qux'; // This method will replace the previously supplied one and the one on the original Class.
    }
  }
);
let foo = new Mixed();
```

A more advanced usages is to use the `mixinExtend` function to allow old methods to not be replaced,
but wrapped so the mixin(s) method will be called then the original method afterwards. The return value of the
method will remain unchanged.

```js

import { mixinExtend } from 'es2015-mixin';

class Foo {
  constructor() {
    this.bar = true;
  }
  qux() {
    return 'original qux'; // this return will remain unchanged.
  }
}

let Mixed = mixin(Foo, {
    baz: true,
    qux() {
      this.baz = false;
      return 'qux'; // this return statement will be ignored.
    }
  },
  {
    foo: false,
    qux() {
      this.foo = true;
    }
  }
);
let foo = new Mixed();
foo.qux(); // this will return 'original qux'.
foo.baz === false;
foo.foo === true;

```
## License

MIT
