'use strict';

var app = angular.module('chessApp');

app.controller('AppCtrl', function ($scope, boardStore, $location) {

  $scope.options = {
    showTurn:   true,
    showPieces: true
  };

  $scope.boards = _.values(boardStore.all());

  $scope.newGame = function() {
    $location.path('/board/'+boardStore.uuid());
  };

});
