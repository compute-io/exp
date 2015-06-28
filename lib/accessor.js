'use strict';

// MODULES //

var EXP = require( './number.js' );


// EXPONENTIAL FUNCTION //

/**
* FUNCTION: exp( out, arr, accessor )
*	Computes element-wise for an array the exponential function using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function exp( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = EXP( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;
