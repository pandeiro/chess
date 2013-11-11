'use strict';

describe('Service: Storage', function () {

  // load the service's module
  beforeEach(module('chessApp'));

  // instantiate service
  var storage;
  beforeEach(inject(function (_storage_) {
    storage = _storage_;
  }));

  it('should do something', function () {
    expect(typeof storage.get).toBe('function');
    expect(typeof storage.set).toBe('function');
    expect(typeof storage.push).toBe('function');
  });

});
