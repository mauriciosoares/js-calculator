describe('Testing Calculator', function() {
  var calculator;
  beforeEach(function() {
    $('#calculator').remove();
    $(document.body).append($('<div />', { id: 'calculator' }));
    calculator = new Calculator('#calculator');
  });

  it('Should return a new instance of Calculator', function() {

    expect(calculator instanceof Calculator).toBeTruthy();
  });

  it('Should create a jquery instance inside the $content index of the instance', function() {
    expect(calculator.$content instanceof jQuery).toBeTruthy();
  });

  it('Should render the calculator inside the given element', function() {

    expect(calculator.$content.find('.calculator-button').length >= 1).toBeTruthy();
  });

  it('Should render by default the numbers from 0 to 9', function() {

    [0,1,2,3,4,5,6,7,8,9].forEach(function(item, index) {
      expect(calculator.$content.find('[data-value="' + index + '"]').length).toEqual(1);
    }.bind(this));
  });

  it('Should render by default the C and = button', function() {

    expect(calculator.$content.find('[data-value="="]').length).toEqual(1);
    expect(calculator.$content.find('[data-value="C"]').length).toEqual(1);
  });

  it('Should add a new button when we extend the calculator', function() {


    calculator.extend({
      name: 'COS',
      implementation: function(n) {
        return 1;
      }
    });

    expect(calculator.$content.find('[data-value="COS"]').length).toEqual(1);
  });

  it('Should display 0 as default for the calculator screen', function() {
    expect(calculator.$content.find('.calculator-screen').val()).toEqual('0');
  });

  it('Should print the numbers in the calculator once the button is clicked', function() {
    calculator.$content.find('[data-value="1"]').click();
    expect(calculator.$content.find('.calculator-screen').val()).toEqual('1');

    calculator.$content.find('[data-value="2"]').click();
    expect(calculator.$content.find('.calculator-screen').val()).toEqual('12');

    calculator.$content.find('[data-value="3"]').click();
    expect(calculator.$content.find('.calculator-screen').val()).toEqual('123');
  });

  it('Should clean the calculator once the C button is clicked', function() {
    calculator.$content.find('[data-value="C"]').click();
    expect(calculator.$content.find('.calculator-screen').val()).toEqual('0');

  });

  it('Should add commas to the number, following a currency pattern', function() {
    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="1"]').click();

    expect(calculator.$content.find('.calculator-screen').val()).toEqual('11,111');
  });

  it('Should do the sum operator with 2 numbers using the = button', function() {
    var RESULT = 1 + 4;

    calculator.extend({
      name: '+',
      implementation: function(n, cachedN) {
        return cachedN + n;
      }
    });

    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="+"]').click();
    calculator.$content.find('[data-value="4"]').click();
    calculator.$content.find('[data-value="="]').click();

    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());
  });

  it('Should do the minus operator with 2 numbers using the = button', function() {
    var RESULT = 1 - 4;
    calculator.extend({
      name: '-',
      implementation: function(n, cachedN) {
        return cachedN - n;
      }
    });

    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="-"]').click();
    calculator.$content.find('[data-value="4"]').click();
    calculator.$content.find('[data-value="="]').click();

    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());
  });

  it('Should return the COS of the given number', function() {
    var RESULT = Math.cos(55);
    calculator.extend({
      name: 'COS',
      implementation: function(n) {
        return Math.cos(n);
      }
    });

    calculator.$content.find('[data-value="5"]').click();
    calculator.$content.find('[data-value="5"]').click();
    calculator.$content.find('[data-value="COS"]').click();

    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());
  });

  it('Should repeat the last operation if the = button is clicked more than once', function() {
    var RESULT = 1 - 4;
    calculator.extend({
      name: '-',
      implementation: function(n, cachedN) {
        return cachedN - n;
      }
    });

    calculator.$content.find('[data-value="1"]').click();
    calculator.$content.find('[data-value="-"]').click();
    calculator.$content.find('[data-value="4"]').click();
    calculator.$content.find('[data-value="="]').click();

    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());

    RESULT = RESULT - 4;
    calculator.$content.find('[data-value="="]').click();
    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());
  });

  it('Should the number by using the keydown event and the given keycode', function() {
    var KEY_1 = 49;
    var KEY_2 = 50;
    var KEY_3 = 51;
    var event;

    event = jQuery.Event('keyup', { which: KEY_1 });
    $(document).trigger(event);
    event = jQuery.Event('keyup', { which: KEY_2 });
    $(document).trigger(event);
    event = jQuery.Event('keyup', { which: KEY_3 });
    $(document).trigger(event);

    expect(calculator.$content.find('.calculator-screen').val()).toEqual('123');
  });

  it('Should should trigger the extended button once the configured key is tapped', function() {
    var KEY_S = 83;
    var RESULT = Math.cos(5);

    calculator.extend({
      name: 'COS',
      implementation: function(n) {
        return Math.cos(n);
      },
      keyCode: KEY_S
    });

    calculator.$content.find('[data-value="5"]').click();
    event = jQuery.Event('keyup', { which: KEY_S });
    $(document).trigger(event);

    expect(calculator.$content.find('.calculator-screen').val()).toEqual(RESULT.toString());
  });
});
