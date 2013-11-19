'use strict';

describe('Controller: BoardCtrl', function () {

  // load the controller's module
  beforeEach(module('chessApp'));

  var BoardCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      BoardCtrl = $controller('BoardCtrl', {
        $scope: scope
      });
    })
  );

  /* TESTS */

  describe('state', function () {
    it('has a board model', function () {
      expect(scope['board']).toBeDefined();
    });
    describe('board.pos', function () {
      it('should be 8x8 nested array', function () {
        expect(scope.board.pos.length).toBe(8);
        expect(scope.board.pos.map(function(x) { return x.length })).toEqual([
          8,8,8,8,8,8,8,8
        ]);
      });
      it('should have objects as inner elements', function () {
        expect(typeof scope.board.pos[0][0]).toBe('object'); // hack
      });
    });
    describe('board.turn', function () {
      it('should be a number', function () {
        expect(typeof scope.board.turn).toBe('number');
      });
    });
    describe('board.log', function () {
      it('should be an array', function() {
        expect(typeof scope.board.log.length).toBe('number');
      });
    });
    describe('board.selected', function () {
      it('should be null or an object', function () {
        expect(typeof scope.board.selected).toBe('object'); // null returns that too
      });
    });
    describe('board.ts', function () {
      it('should be an array', function () {
        expect(typeof scope.board.ts.length).toBe('number');
      });
    });
  });

  describe('methods', function () {
    it('must have methods for', function () {
      ['selectPos', 'sameSign', 'samePos', 'mapPiece'].forEach(function(model) {
        expect(scope[model]).toBeDefined();
      });
    });

    // TODO: test methods individually
  });

});
