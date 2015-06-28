'use strict';

// MODULES //

var EXP = require( './number.js' );


// EXPONENTIAL FUNCTION //

/**
* FUNCTION: log( out, matrix )
*	Computes element-wise the exponential function for a matrix.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function exp( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'exp()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = EXP( x.data[ i ] );
	}
	return y;
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;
