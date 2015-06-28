/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	exp = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor exp', function tests() {

	it( 'should export a function', function test() {
		expect( exp ).to.be.a( 'function' );
	});

	it( 'should compute the exponential function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': 4 },
			{'x': 6 },
			{'x': 9 },
			{'x': 15 },
			{'x': 10 },
			{'x': 25 }
		];
		actual = new Array( data.length );

		actual = exp( actual, data, getValue );
		expected = [
			Math.exp( 4 ),
			Math.exp( 6 ),
			Math.exp( 9 ),
			Math.exp( 15 ),
			Math.exp( 10 ),
			Math.exp( 25 )
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( exp( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = exp( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
