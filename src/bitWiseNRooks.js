var countNRooksSolution = function( n ) {
  var count = 0;
  var columnConflicts = 0;
  var recurseThroughSolutions = function( rowIndex ) {
    for ( var columnIndex = 0; columnIndex < n; columnIndex++ ) {
      if( !( columnConflicts & ( 1 << columnIndex ) ) ) {
        columnConflicts = columnConflicts ^ ( 1 << columnIndex );
        if ( rowIndex === n - 1 ) {
          count++;
        } else {
          recurseThroughSolutions( rowIndex + 1 );
        }
        columnConflicts = columnConflicts ^ ( 1 << columnIndex );
      }
    }
  };
  recurseThroughSolutions( 0 );
  return count;
};