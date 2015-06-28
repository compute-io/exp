'use strict';

// MODULES //

var EXP = require( './number.js' );


// EXPONENTIAL FUNCTION //

/**
* FUNCTION: exp( out, arr )
*	Computes element-wise the exponential function for a typed array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function exp( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = EXP( x[ i ] );
	}
	return y;
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;
