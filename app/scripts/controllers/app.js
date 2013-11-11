'use strict';

var app = angular.module('chessApp');

app.controller('AppCtrl', function ($scope) {

  $scope.options = {
    showTurn:   true,
    showPieces: true
  };

});
