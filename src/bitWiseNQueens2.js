// N queencounter own algorithm # 2
var Q = function( n ) {
  var a = 0;
  var motherload = Math.pow( 2, n ) - 1;
  var recurse = function ( C, R, M, m ) {
    var next;
    var c = C;
    M = M << 1;
    m = m >>> 1;
    while ( !(c === motherload) ) {
      next = 1;
      while( (next & ~c) === 0 ) {
        next = next << 1;
      }
      if ( (M & next) === 0 && (m & next) === 0) {
        if( R === n - 1 ) {
          a++;
          return;
        }
        recurse( C ^ next, R + 1, M ^ next, m ^ next );
      }
      c = c | next;
    }
  };
  recurse ( 0, 0, 0, 0 );
  return a;
};
// N queens from Martin Richards! The man.
var countNQueensSolution = function(n) {
  var a = 0;
  var lim = Math.pow(2,n)-1;
  var r = function(C,R,M,m) {
    var next;
    var p;
    M = M << 1;
    m = m >>> 1;
    p = (~( C | M | m )) & lim;
    while( p !== 0 ) {
      if(R===n-1) {
        a++;
        return;
      }
      next = 1;
      while((next & p) === 0) {
        next = next << 1;
      }
      r(C^next,R+1,M^next,m^next);
      p = p & ~next;
    }
  };
  r(0,0,0,0);
  return a;
};

// N queens tweet Ruan
function N(n,M,C,m,counter,openSpots,next){
  counter = 0;
  n = M ? n : (1<<n)-1;
  openSpots = ~(M|C|m) & n;
  while(openSpots) {
    openSpots ^= next = -openSpots & openSpots;
    counter += N(n, (M|next)<<1, C|next, (m|next)>>1);
  }
  return counter += C==n;
};