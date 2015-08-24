Exponential Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the (natural exponential function)[https://en.wikipedia.org/wiki/Exponential_function].

The (natural exponential function)[https://en.wikipedia.org/wiki/Exponential_function] is defined as

<div class="equation" align="center" data-raw-text="f(x) = e^x" data-equation="eq:exponential_function">
	<img src="https://cdn.rawgit.com/compute-io/exp/d41d867ca1b91c1d16519de507639a95fe6bae5c/docs/img/eqn.svg" alt="Equation for the exponential function.">
	<br>
</div>


## Installation

``` bash
$ npm install compute-exp
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var exp = require( 'compute-exp' );
```

#### exp( x[, opts] )

Computes the (natural exponential function)[https://en.wikipedia.org/wiki/Exponential_function]. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = exp( 1 );
// returns ~2.7183

out = exp( -3 );
// returns ~0.0498

data = [ 1, 2, 3 ];
out = exp( data );
// returns [ ~2.7183, ~7.389, ~20.0855 ]

data = new Int8Array( data );
out = exp( data );
// returns Float64Array( [~2.7183,~7.389,~20.0855] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = exp( mat );
/*
	[       1   ~2.718
	   ~7.389  ~20.086
	  ~54.598 ~148.413 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,4],
	[1,6],
	[2,15],
	[3,10],
	[4,25]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = exp( data, {
	'accessor': getValue
});
// returns [ e^4, e^6, e^15, e^10, e^25 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]}
];


var out = exp( data, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[
		{'x':[0,1]},
		{'x':[1,2.718]},
		{'x':[2,7.389]},
		{'x':[3,20.0855]},
		{'x':[4,54.598]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [1,2,3] );

out = exp( data, {
	'dtype': 'int32'
});
// returns Int32Array( [2,7,20] )

// Works for plain arrays, as well...
out = exp( [ 1,2,3 ], {
	'dtype': 'uint8'
});
// returns Uint8Array( [2,7,20] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 1, 2, 3 ];

out = exp( data, {
	'copy': false
});
// returns [ ~2.7183, ~7.389, ~20.0855 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = exp( mat, {
	'copy': false
});
/*
	[       1   ~2.718
	   ~7.389  ~20.086
	  ~54.598 ~148.413 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated principal [square root](https://en.wikipedia.org/wiki/Square_root) is `NaN`.

	``` javascript
	var data, out;

	out = exp( null );
	// returns NaN

	out = exp( true );
	// returns NaN

	out = exp( {'a':'b'} );
	// returns NaN

	out = exp( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = exp( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = exp( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = exp( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	exp = require( 'compute-exp' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 );
}
out = exp( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = exp( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = exp( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 10;
}
out = exp( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = exp( mat );

// Matrices (custom output data type)...
out = exp( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-exp.svg
[npm-url]: https://npmjs.org/package/compute-exp

[travis-image]: http://img.shields.io/travis/compute-io/exp/master.svg
[travis-url]: https://travis-ci.org/compute-io/exp

[coveralls-image]: https://img.shields.io/coveralls/compute-io/exp/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/exp?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/exp.svg
[dependencies-url]: https://david-dm.org/compute-io/exp

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/exp.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/exp

[github-issues-image]: http://img.shields.io/github/issues/compute-io/exp.svg
[github-issues-url]: https://github.com/compute-io/exp/issues
