;(function(root, $) {
  'use strict';

  var CLASS_NAME = 'calculator-button';
  var keyEvents = {};

  function Button(options) {
    this.options = options;

    this.prepare();
    this.checkKeyCode();
    this.bind();
  }

  Button.prototype.prepare = function() {
    this.$el = $('<button />', {
      'data-value': this.options.value,
      class: CLASS_NAME + this.options.isNumber,
      text: this.options.value
    });
  };

  Button.prototype.checkKeyCode = function() {
    if(!this.options.keyCode) return;

    if(keyEvents[this.options.keyCode]) throw new Error('There must not be 2 equal keyCodes: ' + this.options.keyCode);

    keyEvents[this.options.keyCode] = {
      action: this.options.action,
      el: this.$el[0]
    };
  };

  Button.prototype.bind = function() {
    this.$el.on('click', this.options.action);
  };

  $(document).on('keyup', function(event) {
    console.log(event.keyCode);
    if(keyEvents[event.keyCode]) keyEvents[event.keyCode].action({
      target: keyEvents[event.keyCode].el
    });
  });

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
    buttons.push(this.getButtonConfig({
      value: 'C',
      action: this.onResetClick.bind(this),
      keyCode: 67
    }));

    Array.apply(null, {length: 10}).forEach(function(item, index) {
      // the isNumber parameter determines that this button is a number,
      // so I can differ it on the styling
      buttons.push(this.getButtonConfig({
        value: index,
        action: this.onNumberClick.bind(this),
        isNumber: true,
        keyCode: 48 + index
      }));
    }.bind(this));

    buttons.push(this.getButtonConfig({
      value: '=',
      action: this.onResultClick.bind(this),
      keyCode: 187
    }));
    buttons.push(this.getButtonConfig({
      value: '.',
      action: this.onNumberClick.bind(this),
      isNumber: false,
      keyCode: 190
    }));
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

  Calculator.prototype.getButtonConfig = function(config) {
    // console.log(isNumber);
    return {
      value: config.value,
      action: config.action,
      isNumber: config.isNumber ? ' is-number' : '',
      keyCode: config.keyCode ? config.keyCode : null
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

  Calculator.prototype.extend = function(configs) {
    if(configs.implementation.length === 1) {
      this.oneStepButton.apply(this, arguments);
    } else if(configs.implementation.length === 2) {
      this.twoStepsButton.apply(this, arguments);
    }
  };

  Calculator.prototype.oneStepButton = function(configs) {
    var buttonConfig = this.getButtonConfig({
      value: configs.name,
      action: function() {
          this.n = configs.implementation(this.n).toString();
          this.render();
      }.bind(this),
      keyCode: configs.keyCode
    })

    this.appendButton(buttonConfig);
  };

  Calculator.prototype.twoStepsButton = function(configs) {
    var buttonConfig = this.getButtonConfig({
      value: configs.name,
      action: function() {
        if(this.assignFlag) this.onResultClick();

        this.cachedN = this.n;
        this.cachedAction = configs.implementation;
        this.resultFlag = true;
        this.assignFlag = true;
      }.bind(this),
      keyCode: configs.keyCode
    });

    this.appendButton(buttonConfig);
  };


  root.Calculator = Calculator;
} (window, jQuery, Button, Screen));
