/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	exp = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array exp', function tests() {

	it( 'should export a function', function test() {
		expect( exp ).to.be.a( 'function' );
	});

	it( 'should compute the exponential function', function test() {
		var data, actual, expected;

		data = [ 4, 6, 9, 15, 10, 25 ];
		actual = new Array( data.length );

		actual = exp( actual, data );
		expected = [ Math.exp(4), Math.exp(6), Math.exp(9), Math.exp(15), Math.exp(10), Math.exp(25) ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( exp( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = exp( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
