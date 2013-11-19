'use strict';

var app = angular.module('chessApp');

app.controller('BoardCtrl', function ($scope, boardStore, $routeParams) {

  /**
   * $scope.board
   *
   * Board model holds piece positions, turn, log and selected piece. Attached
   * to the 'selected' property is a $watch that persists the board state to
   * localStorage.
   */
  $scope.board = boardStore.get($routeParams.boardId) || (function() {
    var initialPos = [
      [ 2, 3, 4, 5, 6, 4, 3, 2],
      [ 1, 1, 1, 1, 1, 1, 1, 1],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [-2,-3,-4,-5,-6,-4,-3,-2]
    ];
    var board = {
      id:       $routeParams.boardId || boardStore.uuid(),
      pos:      initialPos.map(toPieces),
      turn:     -1,
      log:      [],
      selected: null, // null || {piece: -2, x: 0, y: 7}
      ts:       []
    };
    return board;
  }());

  $scope.$watch('board.selected', function(newVal, oldVal) {
    boardStore.put($scope.board);
  });


  /**
   * $scope.selectPos(x, y)
   *
   * Handles user clicks on the chessboard. Called in ng-click.
   */
  $scope.selectPos = function (x, y) {
    var piece = find(x, y), turn = $scope.board.turn, selected = $scope.board.selected,
        pos = {x: x, y: y};

    // Click handler logic:
    //
    // - no piece selected?               : select the piece
    //  `- same piece already selected?   : deselect the piece
    //    `- same team already selected?  : select the piece
    //      `---------------------------> : otherwise: treat as a move

    if (!selected) {
      if (sameSign(piece, turn)) $scope.board.selected = {x: x, y: y, piece: piece};
    } else if (samePos(selected, pos)) {
      $scope.board.selected = null;
    } else if ($scope.board.selected.piece * piece > 0) {
      $scope.board.selected = {x: x, y: y, piece: piece};
    } else {
      tryMove(x, y);
    }
  };

  /**
   * $scope.sameSign(piece, turn)
   *
   * Returns whether the piece belongs to the side indicated in turn. Used by
   * selectPos and by the showTurn directive to highlight the pices of whoever's
   * turn it is.
   */
  $scope.sameSign = sameSign;

  /**
   * $scope.samePos(posX, posY)
   *
   * Returns whether two position objects represent the same position. Used
   * by the selectPos and the showSelected directive.
   */
  $scope.samePos = samePos;

  /**
   * $scope.mapPiece(n)
   *
   * Takes a piece number and returns an object with rank and color keys. Used
   * by the showPiece directive for getting chess piece background images.
   */
  $scope.mapPiece = mapPiece;

  // Private methods dependent on $scope

  function toggleTurn () {
    $scope.board.turn = $scope.board.turn * -1;
  };

  function tryMove(x, y) {
    var result = chessEngine.checkMove(
      $scope.board.pos,                                     // given this board
      $scope.board.log,                                     // and this history
      [$scope.board.selected.x, $scope.board.selected.y],   // move this piece
      [x, y]                                                // here
    );

    if (result.valid) {
      $scope.board.log.push($scope.board.pos);
      $scope.board.pos = result.board;
      $scope.board.selected = null;

      if (result.mate) {/* TODO needs a chess engine first */ } else {
        toggleTurn();
      }
    } /* TODO else { showInvalidReason() } */
  };

  function find(x, y) {
    return $scope.board.pos[y][x].piece;
  }

  // Utility functions (pure)

  function sameSign(piece, turn) {
    return piece * turn > 0;
  }

  function samePos(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function toPieces(rows) {
    return rows.map(function(x){ return {piece: x}; });
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
    checkMove: function(positions, log, from, to) {
      var now = angular.copy(positions),
          valid,
          mate,
          check,
          piece = find(from[0], from[1]);

      // Validation
      valid = true;

      // Computation
      now[from[1]][from[0]] = {piece: 0};
      now[to[1]][to[0]] = {piece: piece};
      check = false;
      mate = false;

      return {
        board: now,
        valid: valid,
        mate:  mate,
        check: check
      };
    }
  };

});
