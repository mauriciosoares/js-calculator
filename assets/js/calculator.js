(function(root, $) {
  'use strict';

  /*
    this could easily be replaced by a template engine
    like mustache or handlebars, but since the tests says
    js + jquery only, that's a good approach for dealing with
    dynamically generated content
  */

  var CALCULATOR_BASE = '<input type="text" class="screen" data-calculator-screen disabled>' +
    '<button data-calculator-reset class="calculator-button">C</button>' +
    '<button data-calculator-result class="calculator-button">=</button>' +
    '<button data-calculator-button="1" class="calculator-button">1</button>' +
    '<button data-calculator-button="2" class="calculator-button">2</button>' +
    '<button data-calculator-button="3" class="calculator-button">3</button>' +
    '<button data-calculator-button="4" class="calculator-button">4</button>' +
    '<button data-calculator-button="5" class="calculator-button">5</button>' +
    '<button data-calculator-button="6" class="calculator-button">6</button>' +
    '<button data-calculator-button="7" class="calculator-button">7</button>' +
    '<button data-calculator-button="8" class="calculator-button">8</button>' +
    '<button data-calculator-button="9" class="calculator-button">9</button>' +
    '<button data-calculator-button="0" class="calculator-button">0</button>' +
    '<button data-calculator-button="." class="calculator-button">.</button>';

  function Calculator(content) {
    this.$content = $(content);
    this.fillContent();

    this.prepare();
    this.bind();
    this.render();
  }

  Calculator.prototype.fillContent = function() {
    this.$content.append(CALCULATOR_BASE);
  };

  Calculator.prototype.prepare = function() {
    this.$screen = this.$content.find('[data-calculator-screen]');
    this.n = '0';
  };

  Calculator.prototype.bind = function() {
    this.$content.find('[data-calculator-button]').on('click', this.onNumberClick.bind(this));
  };

  Calculator.prototype.onNumberClick = function(event) {
    var value = $(event.target).data('calculator-button');

    this.n += value;
    this.render();
  };

  Calculator.prototype.render = function() {
    if(this.n.length > 1 && this.n[0] === '0') this.n = this.n.substr(1);

    this.$screen.val(parseFloat(this.n));
  };


  root.Calculator = Calculator;
} (window, jQuery));
