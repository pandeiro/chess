'use strict';

angular.module('chessApp')
  .factory('boardStore', function (storage) {

    var key = 'boardStore';

    var keyLength = 4;

    return {
      all: function () {
	return storage.get(key, {});
      },
      get: function (id) {
	return this.all()[id];
      },
      put: function (model) {
	var store = this.all(),
	    board = _.extend({}, model), // to ditch reference; angular is $watch'ing
	    id = board.id;
	store[id] = board;
	store[id].ts.push(Date.now());
	storage.set(key, store);
      },
      uuid: function () {
        var store = this.all(), uuid = randStr(keyLength);
	return (!store[uuid]) ? uuid : this.uuid(); // til one day...
      }
    };

    function randStr(n) {
      var chars = '0123456789abcdefghijklmnopqrstuvwxyz',
	  r = function() { return chars[Math.floor(Math.random()*chars.length)]; },
	  seq = '';
      while (seq.length < n) { seq += r(); }
      return seq;
    }

  });


