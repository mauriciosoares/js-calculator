# JS Calculator

An extensible calculator written in Javascript.

## Usage

Call the `Calculator` constructor, and pass in the element that the calculator will appear.

Ideally, the `#calculator` div should have the `.calculator` class, to use the default style. But you can overwrite it with your own CSS.

```javascript
var calculator = new Calculator('#calculator');
```

### Extensions

By default, the calculator does not have any extension... You can easlily add any kind of operation you want using `calculator.extend`

There are 2 kind of extensions.

#### One step operations

These are the ones that the value is retrieved right after you click in the button (like cosine operators).

```javascript
var calculator = new Calculator('#calculator');

// COS is the text being printed on the button
calculator.extend('COS', function(n) {
  return Math.cos(n);
});
```

The `n` variable is the one being printed in the calculator.

#### Two steps operations

These are the ones that requires 2 numbers to work, like the tradicional *plus* or *minus* operators

```javascript
var calculator = new Calculator('#calculator');
calculator.extend('+', function(n, cachedN) {
  return cachedN + n;
});

calculator.extend('-', function(n, cachedN) {
  return cachedN - n;
});

calculator.extend('*', function(n, cachedN) {
  return cachedN * n;
});
```

The `n` variable is the one being printed in the calculator *after you click in the result button*
The `n` variable is the one being printed in the calculator *before you click in the extension operator*

Keep in mind that the `cachedN` variable, is the first number you digit in the calculator, that's why `cachedN` should always come first in your methods.

The *cool* thing here is that you can create your own kind of operators, and add it to the calculator at any time.
