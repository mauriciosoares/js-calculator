;(function(root, $, Button, Screen) {
  'use strict';

  function Calculator(content) {
    this.$content = $(content);

    this.prepare();
    this.fillContent();
    this.render();
  }

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
      buttons.push(this.getButtonConfig('=', function() {}));


    Array.apply(null, {length: 10}).forEach(function(item, index) {
      buttons.push(this.getButtonConfig(index, this.onNumberClick.bind(this)));
    }.bind(this));

    buttons.push(this.getButtonConfig('.', this.onNumberClick.bind(this)));
    buttons.forEach(this.appendButton.bind(this));
  };

  Calculator.prototype.getButtonConfig = function(value, action) {
    return {
      value: value,
      action: action
    };
  };

  Calculator.prototype.appendButton = function(config) {
    this.$content.append(new Button(config).$el);
  };

  Calculator.prototype.prepare = function() {
    this.screen = new Screen();
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
    this.screen.render(this.n);
  };

  Calculator.prototype.extend = function(name, implementation) {
    console.log(implementation.length);
    this.appendButton({
      value: name,
      action: function() {
        this.n = implementation(this.n).toString();
        this.render();
      }.bind(this)
    });
  };


  root.Calculator = Calculator;
} (window, jQuery, Button, Screen));
