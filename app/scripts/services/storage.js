'use strict';

var app = angular.module('chessApp');

app.factory('storage', function () {

  return {
    // Clojure get semantics: second arg is a default to return if k not found
    get: function (k, otherwise) {
      var result = JSON.parse(localStorage.getItem(k)) || otherwise;
    },
    set: function(k, v) {
      localStorage.setItem(k, JSON.stringify(v));
    },
    push: function(k, v) {
      var data = this.get(k, []);
      data.push(v);
      this.set(k, data);
    }
  };

});
