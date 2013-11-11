'use strict';

angular.module('chessApp', []).config(function ($routeProvider) {

  $routeProvider.when(
    '/', {
      templateUrl: 'views/board.html',
      controller: 'BoardCtrl'
    })

  .otherwise({
    redirectTo: '/'
  });
});