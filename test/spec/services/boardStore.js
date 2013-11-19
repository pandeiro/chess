'use strict';

describe('Service: boardStore', function () {

  // load the service's module
  beforeEach(module('chessApp'));

  // instantiate service
  var boardStore;
  beforeEach(inject(function (_boardStore_) {
    boardStore = _boardStore_;
  }));

  it('should expose these methods as API', function () {
    expect(typeof boardStore.all).toBe('function');
    expect(typeof boardStore.get).toBe('function');
    expect(typeof boardStore.put).toBe('function');
    expect(typeof boardStore.uuid).toBe('function');
  });

});
