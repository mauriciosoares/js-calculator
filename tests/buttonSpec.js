describe('Testing Button', function() {
  it('Should return a new instance of Button', function() {
    var button = new Button({});
    expect(button instanceof Button).toBeTruthy();
  });

  it('Should create a jquery instance inside the $el index of the instance', function() {
    var button = new Button({});
    expect(button.$el instanceof jQuery).toBeTruthy();
  });

  it('Should have the correct data-value and text passed as a parameter', function() {
    var button = new Button({
      value: '+'
    });
    expect(button.$el.data('value')).toEqual('+');
    expect(button.$el.text()).toEqual('+');
  });
  it('Should have the "calculator-button" class if it\'s defined as a number', function() {
    var button = new Button({
      isNumber: ' is-number'
    });


    expect(button.$el.hasClass('is-number')).toBeTruthy();
  });
});
