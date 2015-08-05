describe('Testing Screen', function() {
  it('Should return a new instance of Screen', function() {
    var screen = new Screen();
    expect(screen instanceof Screen).toBeTruthy();
  });
  it('Should create a jquery instance inside the $el index of the instance', function() {
    var screen = new Screen();
    expect(screen.$el instanceof jQuery).toBeTruthy();
  });
  it('Should render the given number inside the calculator whe using the render method', function() {
    var screen = new Screen();
    screen.render('1234');
    expect(screen.$el.val()).toEqual('1234');
  });
});
