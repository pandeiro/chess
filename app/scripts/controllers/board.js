'use strict';

var app = angular.module('chessApp');

app.controller('BoardCtrl', function ($scope) {

  var init = [
    [ 2, 3, 4, 5, 6, 4, 3, 2],
    [ 1, 1, 1, 1, 1, 1, 1, 1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-2,-3,-4,-5,-6,-4,-3,-2]
  ];

  $scope.board    = mapBoard(init); // [[{piece: 2}, ... ], ...]
  $scope.turn     = -1;
  $scope.log      = [];
  $scope.selected = null;           // null || {piece: -2, x: 0, y: 7}

  $scope.options = {
    showTurn:     true,
    showSelected: true,
    showPieces:   true
  };

  /**
   * $scope.selectPos(x, y)
   *
   * Handles user clicks on the chessboard. Called in ng-click.
   */
  $scope.selectPos = function (x, y) {
    var piece = find(x, y), turn = $scope.turn, selected = $scope.selected,
        pos = {x: x, y: y};

    // Click handler logic:
    //
    // - no piece selected?               : select the piece
    //  `- same piece already selected?   : deselect the piece
    //    `- same team already selected?  : select the piece
    //      `---------------------------> : otherwise: treat as a move

    if (!$scope.selected) {
      if (sameSign(piece, turn)) $scope.selected = {x: x, y: y, piece: piece};
    } else if (samePos(selected, pos)) {
      $scope.selected = null;
    } else if ($scope.selected.piece * piece > 0) {
      $scope.selected = {x: x, y: y, piece: piece};
    } else {
      tryMove(x, y);
    }
  }

  /**
   * $scope.getCssClasses(x, y)
   *
   * Uses the controller's models to compute the proper css classes
   * for each square on the board. Called from ng-class directive.
   */
  $scope.getCssClasses = function(x, y) {
    var piece = find(x, y), pos = {x: x, y: y},

        options = $scope.options, turn = $scope.turn,
        selected = $scope.selected;

    var cssClasses = {};

    if (options.showPieces) {
      var color = mapPiece(piece).color, rank = mapPiece(piece).rank;
      cssClasses[color] = true;
      cssClasses[rank] = rank && true;
    }
    if (options.showTurn && !selected) {
      cssClasses.turn = sameSign(turn, piece);
    }
    if (options.showSelected && selected) {
      cssClasses.selected = samePos(selected, pos);
    }

    return cssClasses;
  };


  // Private methods dependent on $scope

  function toggleTurn () {
    $scope.turn = $scope.turn * -1;
  };

  function tryMove(x, y) {
    var result = chessEngine(
      $scope.board,                             // given this board
      $scope.log,                               // and this history
      [$scope.selected.x, $scope.selected.y],   // move this piece
      [x, y]                                    // here
    );

    if (result.valid) {
      $scope.log.push($scope.board);
      $scope.board = result.board;
      $scope.selected = null;

      if (result.mate) {/* TODO needs a chess engine first */ } else {
        toggleTurn();
      }
    } /* TODO else { showInvalidReason() } */
  };

  function find(x, y) {
    return $scope.board[y][x].piece;
  }

  // Utility functions (pure)

  function sameSign(piece, turn) {
    return piece * turn > 0;
  }

  function samePos(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function mapBoard(arr) {
    return arr.map(function(r){ return r.map(function(x){ return {piece: x}})});
  }

  function mapPiece(n) { // returns color and rank as array of strings
    var ranks = [null, 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'],
        rank = ranks[Math.abs(n)],
        color = (n > 0) ? 'black' : 'white';

    return {color: color, rank: rank};
  }

  // Mock validator

  var chessEngine = {

    // Validation and computation of new board state
    // are coupled to for efficiency; maybe this isn't a good
    // idea? Not sure.
    checkMove: function(board, log, from, to) {
      var state = angular.copy(board),
          valid,
          mate,
          check,
          piece = find(from[0], from[1]);

      // Validation
      valid = true;

      // Computation
      state[from[1]][from[0]] = {piece: 0};
      state[to[1]][to[0]] = {piece: piece};
      check = false;
      mate = false;

      return {
        board: state,
        valid: valid,
        mate:  false,
        check: false
      };
    }
  };

});