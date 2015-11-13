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
import mixin from 'es2015-mixin';

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
let Mixed = mixin(Foo, {
    baz: true,
    qux() {
      return 'qux';
    }
  },
  {
    foo: false,
    qux() {
      return 'not qux'; // This method will replace the previously supplied one.
    }
  }
);
let foo = new Mixed();
```

## License

MIT
