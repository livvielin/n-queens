/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // create board
  var board = new Board ( { "n" : n } );

  var found = false;

  var recurseThroughSolutions = function ( rowIndex ) {
    var randomColIndex;
    while ( !found ) {
      // set random index to place rook
      randomColIndex = Math.floor( Math.random() * n );
      board.togglePiece( rowIndex, randomColIndex );
      if ( board.hasColConflictAt( randomColIndex ) === false ) {
        if ( rowIndex === n - 1 ) {
          // found solution
          found = true;
        } else {
          recurseThroughSolutions( rowIndex + 1 );
        }
      }
      if ( !found ) {
        board.togglePiece( rowIndex, randomColIndex );
      }
    }
  };

  recurseThroughSolutions( 0 );

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows( )));
  return board.rows( );
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create board
  var board = new Board ( { "n" : n } );
  var solutionCount = 0;

  // recursive function that takes a row index as an argument
  var recurseThroughSolutions = function ( rowIndex ) {
    // if row index equals n - 1
    if ( rowIndex === n - 1 ) {
      // one solution found
      solutionCount++;
      return;
    } else {
      // for each place where a rook could be placed
      for ( var columnIndex = 0; columnIndex < n; columnIndex++ ) {
        // place rook in column
        board.togglePiece( rowIndex, columnIndex );
        // check if there is a conflict
        if ( board.hasColConflictAt( columnIndex ) === false ) {
          // recurse over next row
          recurseThroughSolutions( rowIndex + 1 );
        }
        // remove rook
        board.togglePiece( rowIndex, columnIndex );
      }
    }
  };

  recurseThroughSolutions( 0 );

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create board
  var board = new Board ( { "n" : n } );

  var found = false;

  var conflicts;
  //recursive function that takes a rowIndex as an argument
  var recurseThroughSolutions = function( rowIndex ) {
    for( var columnIndex = 0; columnIndex < n; columnIndex++ ) {
      // place a queen
      board.togglePiece( rowIndex, columnIndex );
      // there can't be column conflicts
      conflicts = board.hasColConflictAt( columnIndex );
      // or major diagonal conflicts
      conflicts = conflicts || board.hasMajorDiagonalConflictAt( columnIndex - rowIndex );
      // or minor diagonal conflicts
      conflicts = conflicts || board.hasMinorDiagonalConflictAt( columnIndex + rowIndex );
      // we know there are no row conflicts.
      if( conflicts === false ) {
        if( rowIndex === n - 1 ) {
          // BASS CASE!
          found = true;
          return; // AKA bounce!
        } else {
          // recurse over next row
          recurseThroughSolutions( rowIndex + 1 );
        }
      }
      if( found ) {
        return;
      }
      board.togglePiece( rowIndex, columnIndex );
    }
  };

  recurseThroughSolutions( 0 );

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows( )));
  return board.rows( );
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // creating a new board
  var board = new Board( { "n" : n } );
  var solutionCount = 0;
  var conflicts;
  //recursive function that takes a rowIndex as an argument
  var recurseThroughSolutions = function( rowIndex ) {
    for( var columnIndex = 0; columnIndex < n; columnIndex++ ) {
      // place a queen
      board.togglePiece( rowIndex, columnIndex );
      // there can't be column conflicts
      conflicts = board.hasColConflictAt( columnIndex );
      // or major diagonal conflicts
      conflicts = conflicts || board.hasMajorDiagonalConflictAt( columnIndex - rowIndex );
      // or minor diagonal conflicts
      conflicts = conflicts || board.hasMinorDiagonalConflictAt( columnIndex + rowIndex );
      // we know there are no row conflicts.
      if( conflicts === false ) {
        if( rowIndex === n - 1 ) {
          // BASS CASE!
          solutionCount++;
          board.togglePiece( rowIndex, columnIndex );
          return; // AKA bounce!
        } else {
          // recurse over next row
          recurseThroughSolutions( rowIndex + 1 );
        }
      }
      board.togglePiece( rowIndex, columnIndex );
    }
  };
  recurseThroughSolutions( 0 );
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
