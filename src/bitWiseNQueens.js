// N queens own algorithm 1.
var countNQueensSolution = function( n ) {
  var count = 0;
  var columnConflicts = 0;
  var majorDiagonalConflicts = 0;
  var minorDiagonalConflicts = 0;
  var recurseThroughSolutions = function( rowIndex ) {
    for ( var columnIndex = 0; columnIndex < n; columnIndex++ ) {
      if( !( ( columnConflicts & ( 1 << columnIndex ) ) |
             ( majorDiagonalConflicts & ( 1 << ( columnIndex - rowIndex + n - 1 ) ) ) |
             ( minorDiagonalConflicts & ( 1 << ( columnIndex + rowIndex ) ) ) ) ) {
        columnConflicts = columnConflicts ^ ( 1 << columnIndex );
        majorDiagonalConflicts = majorDiagonalConflicts ^ ( 1 << ( columnIndex - rowIndex + n - 1 ) );
        minorDiagonalConflicts = minorDiagonalConflicts ^ ( 1 << ( columnIndex + rowIndex ) );
        if ( rowIndex === n - 1 ) {
          count++;
        } else {
          recurseThroughSolutions( rowIndex + 1 );
        }
        columnConflicts = columnConflicts ^ ( 1 << columnIndex );
        majorDiagonalConflicts = majorDiagonalConflicts ^ ( 1 << ( columnIndex - rowIndex + n - 1 ) );
        minorDiagonalConflicts = minorDiagonalConflicts ^ ( 1 << ( columnIndex + rowIndex ) );
      }
    }
  };
  recurseThroughSolutions( 0 );
  return count;
};