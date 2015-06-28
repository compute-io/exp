/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	exp = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-exp', function tests() {

	it( 'should export a function', function test() {
		expect( exp ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				exp( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				exp( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				exp( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				exp( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( exp( values[ i ] ) ) );
		}
	});

	it( 'should compute the exponential function when provided a number', function test() {
		assert.strictEqual( exp( 6 ), Math.exp( 6 ) );
		assert.strictEqual( exp( 20 ), Math.exp( 20 ) );

		assert.isTrue( isnan( exp( NaN ) ) );
	});

	it( 'should compute the exponential function element-wise when provided a plain array', function test() {
		var data, actual, expected;

		data = [ 4, 6, 9, 15, 10, 25 ];
		expected = [ Math.exp(4), Math.exp(6), Math.exp(9), Math.exp(15), Math.exp(10), Math.exp(25) ];

		actual = exp( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = exp( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the exponential function element-wise when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );
		expected = new Float64Array( [ Math.exp(4), Math.exp(6), Math.exp(9), Math.exp(15), Math.exp(10), Math.exp(25) ] );

		actual = exp( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = exp( data, {
			'copy': false
		});
		expected = new Float64Array( [ Math.exp(4), Math.exp(6), Math.exp(9), Math.exp(15), Math.exp(10), Math.exp(25) ] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the exponential function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 4, 6, 9, 15, 10, 25 ];
		expected = new Int8Array( [ Math.exp(4), Math.exp(6), Math.exp(9), Math.exp(15), Math.exp(10), Math.exp(25) ] );

		actual = exp( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute the exponential function element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,4],
			[1,6],
			[2,15],
			[3,10],
			[4,25]
		];
		expected = [ Math.exp(4), Math.exp(6), Math.exp(15), Math.exp(10), Math.exp(25) ];

		actual = exp( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = exp( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute the exponential function element-wise and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,4]},
			{'x':[1,6]},
			{'x':[2,15]},
			{'x':[3,10]},
			{'x':[4,25]}
		];
		expected = [
			{'x':[0,Math.exp(4)]},
			{'x':[1,Math.exp(6)]},
			{'x':[2,Math.exp(15)]},
			{'x':[3,Math.exp(10)]},
			{'x':[4,Math.exp(25)]}
		];
		actual = exp( data, {

			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,4]},
			{'x':[1,6]},
			{'x':[2,15]},
			{'x':[3,10]},
			{'x':[4,25]}
		];

		actual = exp( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute the exponential function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = Math.exp( i );
			d3[ i ] = Math.exp( i );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = exp( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = exp( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should compute the exponential function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float32Array( 25 );
		d2 = new Int32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = Math.floor( Math.exp( i ) );
		}
		mat = matrix( d1, [5,5], 'float32' );
		out = exp( mat, {
			'dtype': 'int32'
		});

		assert.strictEqual( out.dtype, 'int32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( exp( [] ), [] );
		assert.deepEqual( exp( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( exp( new Int8Array() ), new Float64Array() );
	});

});
