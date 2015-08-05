# JS Calculator

An extendable calculator written in Javascript.

## Idea

To create a calculator that's easy to extend and as similar as possible to a real one.

Keep in mind that Javascript has some weird bugs when handling calculaltions, and that might happen some times when you are playing around with it.

## Usage

Call the `Calculator` constructor, and pass in the element that the calculator will appear.

Ideally, the `#calculator` div should have the `.calculator` class, to use the default style. But you can overwrite it with your own CSS.

```javascript
var calculator = new Calculator('#calculator');
```

### Extensions

By default, the calculator does not have any operator... You can easlily add any kind of operation you want using `calculator.extend`

There are 2 kind of extensions.

#### One step operations

These are the ones that the value is retrieved right after you click in the button (like cosine operators).

```javascript
var calculator = new Calculator('#calculator');

// COS is the text being printed on the button
calculator.extend({
  name: 'COS',
  implementation: function(n) {
    return Math.cos(n);
  },
  keyCode: 1
});
```

The `n` variable is the one currently printed on the calculator.

#### Two steps operations

These are the ones that requires 2 numbers to work, like the tradicional *plus* or *minus* operators

```javascript
var calculator = new Calculator('#calculator');
calculator.extend({
  name: '+',
  implementation: function(n, cachedN) {
    return cachedN + n;
  },
  keyCode: 80
});

calculator.extend({
  name: '-',
  implementation: function(n, cachedN) {
    return cachedN - n;
  },
  keyCode: 42
});

calculator.extend({
  name: '*',
  implementation: function(n, cachedN) {
    return cachedN / n;
  },
  keyCode: 41
});
```

The `n` variable is the one currently printed in the calculator *after you click in the result button*

The `cachedN` variable is the one currently printed in the calculator *after you click in the extension operator*

Keep in mind that the `cachedN` variable, is the first number you digit in the calculator, that's why `cachedN` should always come first in your methods.

#### Notes

* All extensions **MUST** return a valid number.

* The **number of arguments** differs a one step operation from a two steps operation

* The keyCode parameter is optional, if you pass it, then when the corresponding key gets pressed, the button will be automatically pressed. **This does not supports 2 steps keys like "shift + T"**

* You can create your own kind of operators, and add it to the calculator at any time.

```javascript
var calculator = new Calculator('#calculator');

setTimeout(function() {
  calculator.extend(':D', function(n, cachedN) {
    return ((cachedN * n) - (cachedN + n)) * 1000;
  });
}, 15 * 60 * 1000);
```

The `:D` button will be added after 15 minutes your application is running... And will do some crazy math on it.
