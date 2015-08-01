;(function(root, $) {
  'use strict';

  var CLASS_NAME = 'screen';

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
