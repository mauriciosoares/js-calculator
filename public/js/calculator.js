;(function(root, $) {
  'use strict';

  var CLASS_NAME = 'calculator-button';

  function Button(options) {
    this.options = options;

    this.prepare();
    this.bind();
  }

  Button.prototype.prepare = function() {
    this.$el = $('<button />', {
      'data-value': this.options.value,
      class: CLASS_NAME + this.options.isNumber,
      text: this.options.value
    });
  };

  Button.prototype.bind = function() {
    this.$el.on('click', this.options.action);
  };

  root.Button = Button;
} (window, jQuery));

;(function(root, $) {
  'use strict';

  var CLASS_NAME = 'calculator-screen';

  function Screen() {
    this.prepare();
  }

  Screen.prototype.prepare = function() {
    this.$el = $('<input />', {
      type: 'text',
      class: CLASS_NAME,
      disabled: true
    });
  };

  Screen.prototype.render = function(n) {
    this.$el.val(n);
  };

  root.Screen = Screen;

} (window, jQuery));

;(function(root, $, Button, Screen) {
  'use strict';

  function Calculator(content) {
    this.$content = $(content);

    this.prepare();
    this.fillContent();
    this.render();
  }

  Calculator.prototype.prepare = function() {
    this.screen = new Screen();
    this.resetValues();
  };

  Calculator.prototype.resetValues = function() {
    this.n = '0';
    // this value is the one saved when you do an operation that requires 2 numbers
    this.cachedN = false;

    // this action is the implementation of the last operation triggered
    this.cachedAction = false;

    // this flag is to identify that the screen has to be updated since
    // a 2 number operation was clicked
    this.resultFlag = false;

    // this is a trick to persist the cached value to allow the user to click
    // in the result button multiple times
    this.assignFlag = false;
  };

  /*
    This guy is kinda messy, but it was a good approach to
    dynamically render the default buttons.
    This could be replaced by a temeplating engine like
    handlebars or mustache.
   */
  Calculator.prototype.fillContent = function() {
    this.$content.append(this.screen.$el);

    var buttons = [];
    buttons.push(this.getButtonConfig('C', this.onResetClick.bind(this)));

    Array.apply(null, {length: 10}).forEach(function(item, index) {
      // the third parameter determines that this button is a number,
      // so I can differ it on the styling
      buttons.push(this.getButtonConfig(index, this.onNumberClick.bind(this), true));
    }.bind(this));

    buttons.push(this.getButtonConfig('=', this.onResultClick.bind(this)));
    buttons.push(this.getButtonConfig('.', this.onNumberClick.bind(this)));
    buttons.forEach(this.appendButton.bind(this));
  };

  Calculator.prototype.onResultClick = function() {
    if(!this.cachedN) return this.render();

    var currentN = this.n;

    // this identifies if the result button is clicked for the first time
    // after an operation that requires 2 inputs is clicked. This allows us
    // to click in the result button multiple times without loosing consistency
    // in the result
    if(this.assignFlag) {
      this.n = this.cachedAction(this.toFloat(this.n), this.toFloat(this.cachedN));
      this.cachedN = currentN;
      this.assignFlag = false;
    } else {
      this.n = this.cachedAction(this.toFloat(this.cachedN), this.toFloat(this.n));
    }

    this.n = this.n;
    this.render();
  };

  Calculator.prototype.toFloat = function(n) {
    return parseFloat(n);
  };

  Calculator.prototype.getButtonConfig = function(value, action, isNumber) {
    // console.log(isNumber);
    return {
      value: value,
      action: action,
      isNumber: isNumber ? ' is-number' : ''
    };
  };

  Calculator.prototype.appendButton = function(config) {
    this.$content.append(new Button(config).$el);
  };

  Calculator.prototype.onResetClick = function() {
    this.resetValues();
    this.render();
  };

  Calculator.prototype.onNumberClick = function(event) {
    if(this.resultFlag) {
      this.n = '0';
      this.resultFlag = false;
    }
    var value = $(event.target).data('value');

    this.n += value;
    this.render();
  };

  Calculator.prototype.parsedN = function() {
    this.n = this.n.toString();
    var nSplit = this.n.split('.');
    // this removes leading zeros
    if(this.n.length > 1 && this.n[0] === '0') this.n = this.n.substr(1);

    // this checks if the number has more than one dot.
    // If it has, this ignores the later added dots.
    if(nSplit.length > 2) this.n = this.n.substr(0, this.n.length -1);

    // little trick to add commas in the numbers in the right position.
    // I don't assign it to `this.n` because it would mess with other
    // methods
    nSplit = this.n.split('.');
    nSplit[0] = nSplit[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return nSplit.join('.');
  };

  Calculator.prototype.render = function() {
    this.screen.render(this.parsedN());
  };

  Calculator.prototype.extend = function(value, implementation) {
    if(implementation.length === 1) {
      this.oneStepButton.apply(this, arguments);
    } else if(implementation.length === 2) {
      this.twoStepsButton.apply(this, arguments);
    }
  };

  Calculator.prototype.oneStepButton = function(value, implementation) {
    var config = this.getButtonConfig(value, function() {
        this.n = implementation(this.n).toString();
        this.render();
    }.bind(this));

    this.appendButton(config);
  };

  Calculator.prototype.twoStepsButton = function(value, implementation) {
    var config = this.getButtonConfig(value, function() {
      if(this.assignFlag) this.onResultClick();

      this.cachedN = this.n;
      this.cachedAction = implementation;
      this.resultFlag = true;
      this.assignFlag = true;
    }.bind(this));

    this.appendButton(config);
  };


  root.Calculator = Calculator;
} (window, jQuery, Button, Screen));
