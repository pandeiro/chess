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
    it('has models for', function () {
      ['board', 'turn', 'log', 'selected'].forEach(function(model) {
        expect(scope[model]).toBeDefined();
      });
    });
    describe('board', function () {
      it('should be 8x8 nested array', function () {
        expect(scope.board.length).toBe(8);
        expect(scope.board.map(function(x) { return x.length })).toEqual([
          8,8,8,8,8,8,8,8
        ]);
      });
      it('should have objects as inner elements', function () {
        expect(typeof scope.board[0][0]).toBe('object'); // hack
      });
    });
    describe('turn', function () {
      it('should be a number', function () {
        expect(typeof scope.turn).toBe('number');
      });
    });
    describe('log', function () {
      it('should be an array', function() {
        expect(typeof scope.log.length).toBe('number');
      });
    });
    describe('selected', function () {
      it('should be null or an object', function () {
        expect(typeof scope.selected).toBe('object'); // null returns that too
      });
    });
  });

  describe('methods', function () {
    it('must have methods for', function () {
      ['selectPos', 'getCssClasses'].forEach(function(model) {
        expect(scope[model]).toBeDefined();
      });
    });
  });

});
