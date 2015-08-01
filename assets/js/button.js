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
