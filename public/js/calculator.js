(function(root, $) {
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
      class: CLASS_NAME,
      text: this.options.value
    });
  };

  Button.prototype.bind = function() {
    this.$el.on('click', this.options.action);
  };

  root.Button = Button;
} (window, jQuery));

(function(root, $, Button) {
  'use strict';

  function Calculator(content) {
    this.$content = $(content);
    this.fillContent();

    this.prepare();
    this.render();
  }

  Calculator.prototype.fillContent = function() {
    this.$content.append($('<input type="text" class="screen" data-calculator-screen disabled>'));

    var buttons = [];
      buttons.push(this.getButtonConfig('C', this.onResetClick.bind(this)));
      buttons.push(this.getButtonConfig('=', function() {}));


    Array.apply(null, {length: 10}).forEach(function(item, index) {
      buttons.push(this.getButtonConfig(index, this.onNumberClick.bind(this)));
    }.bind(this));

    buttons.push(this.getButtonConfig('.', this.onNumberClick.bind(this)));
    buttons.forEach(this.appendButtons.bind(this));
  };

  Calculator.prototype.getButtonConfig = function(value, action) {
    return {
      value: value,
      action: action
    };
  };

  Calculator.prototype.appendButtons = function(config) {
    this.$content.append(new Button(config).$el);
  };

  Calculator.prototype.prepare = function() {
    this.$screen = this.$content.find('[data-calculator-screen]');
    this.n = '0';
  };

  Calculator.prototype.onResetClick = function() {
    this.n = '0';
    this.render();
  };

  Calculator.prototype.onNumberClick = function(event) {
    var value = $(event.target).data('value');

    this.n += value;
    this.render();
  };

  Calculator.prototype.parseN = function() {
    var nSplit;
    // this removes leading zeros
    if(this.n.length > 1 && this.n[0] === '0') this.n = this.n.substr(1);

    // this checks if the number has more than one dot.
    // If it has, this ignores the later added dots.
    if(this.n.split('.').length > 2) this.n = this.n.substr(0, this.n.length -1);
  };

  Calculator.prototype.render = function() {
    this.parseN();
    this.$screen.val(this.n);
  };


  root.Calculator = Calculator;
} (window, jQuery, Button));
