/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	exp = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number exp', function tests() {

	it( 'should export a function', function test() {
		expect( exp ).to.be.a( 'function' );
	});

	it( 'should compute the exponential function', function test() {
		assert.strictEqual( exp( 7 ), Math.exp( 7 ) );
		assert.strictEqual( exp( 90 ), Math.exp( 90 ) );
		assert.strictEqual( exp( 300 ), Math.exp( 300 ) );
		assert.strictEqual( exp( 0 ), 1 );
	});

});
