'use strict';

var app = angular.module('chessApp');

app.directive('showTurn', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var turn = scope.sameSign(scope.square.piece, scope.turn) &&
        scope.options.showTurn;

      if (turn) element.addClass('turn');

      scope.$watch('selected', function(selected) {
        if (!selected && turn)
          element.addClass('turn');
        else
          element.removeClass('turn');
      });
    }
  };
});

app.directive('showSelected', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var position = {x: scope.$index, y: scope.rowIndex};
      scope.$watch('selected', function (selected) {
        if (selected && scope.samePos(selected, position))
          element.addClass('selected');
        else
          element.removeClass('selected');
      });
    }
  };
});

app.directive('showPiece', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var piece = scope.mapPiece(scope.square.piece);
      if (scope.options.showPieces) {
        element.addClass(piece.color);
        element.addClass(piece.rank);
      }
    }
  };
});
