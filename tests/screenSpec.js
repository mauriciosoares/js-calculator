describe('Testing Screen', function() {
  var screen;
  beforeEach(function() {
    screen = new Screen();
  });

  it('Should return a new instance of Screen', function() {
    expect(screen instanceof Screen).toBeTruthy();
  });

  it('Should create a jquery instance inside the $el index of the instance', function() {
    expect(screen.$el instanceof jQuery).toBeTruthy();
  });

  it('Should render the given number inside the calculator whe using the render method', function() {
    screen.render('1234');
    expect(screen.$el.val()).toEqual('1234');
  });
});
