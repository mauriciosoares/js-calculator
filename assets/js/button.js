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
    keyEvents[this.options.keyCode] = this.$el;
  };

  Button.prototype.bind = function() {
    this.$el.on('click', this.options.action);
  };

  $(document).on('keyup', function(event) {
    if(keyEvents[event.which]) keyEvents[event.which].click();
  });

  root.Button = Button;
} (window, jQuery));
