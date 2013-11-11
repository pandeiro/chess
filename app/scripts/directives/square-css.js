'use strict';

angular.module('chessApp')
  .directive('squareCss', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the squareCss directive');
      }
    };
  });
