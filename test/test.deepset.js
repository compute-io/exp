/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	exp = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset exp', function tests() {

	it( 'should export a function', function test() {
		expect( exp ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root and deep set', function test() {
		var data, expected;

		data = [
			{'x': 4 },
			{'x': 6 },
			{'x': 9 },
			{'x': 15 },
			{'x': 10 },
			{'x': 25 }
		];

		data = exp( data, 'x' );
		expected = [
			{'x':Math.exp(4)},
			{'x':Math.exp(6)},
			{'x':Math.exp(9)},
			{'x':Math.exp(15)},
			{'x':Math.exp(10)},
			{'x':Math.exp(25)}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,9]},
			{'x':[9,15]},
			{'x':[9,10]},
			{'x':[9,25]}
		];

		data = exp( data, 'x/1', '/' );
		expected = [
			{'x':[9,Math.exp(4)]},
			{'x':[9,Math.exp(6)]},
			{'x':[9,Math.exp(9)]},
			{'x':[9,Math.exp(15)]},
			{'x':[9,Math.exp(10)]},
			{'x':[9,Math.exp(25)]}
		];
		
		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( exp( [], 'x' ), [] );
		assert.deepEqual( exp( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = exp( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
