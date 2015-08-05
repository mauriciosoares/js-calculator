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


    keyEvents[this.options.keyCode] = this.$el;
  };

  Button.prototype.bind = function() {
    this.$el.on('click', this.options.action);
  };

  $(document).on('keyup', function(event) {
    if(keyEvents[event.keyCode]) keyEvents[event.keyCode].click();
  });

  root.Button = Button;
} (window, jQuery));
