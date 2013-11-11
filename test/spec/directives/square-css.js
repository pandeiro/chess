'use strict';

describe('Directive: squareCss', function () {

  // load the directive's module
  beforeEach(module('chessApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should be testable somehow, but dunno how', inject(function ($compile) {
    expect(element).toBeUndefined();
  }));
});
