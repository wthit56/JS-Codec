console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var error = require("./test.error.js"),
	similar = require("./test.similar.array.js");
var result = require("./test.result.js");
// .empty() == { value: null, length: 0 }
// .test(codec, data, expecedValue, expectedLength (default = data.length)) == (true | false)

var codec = require("../index.js"), _enum = require("../enum.js"), array = require("../array.js");

array instanceof Function; ///

var type = _enum(1, 2, 3);
var typedArray = array(type, 1);

typedArray.__ === codec;

typedArray.encode instanceof Function; ///
typedArray.decode instanceof Function; ///

typedArray.type === type; ///

error(function() { typedArray.encode(1); }); ///
typedArray.encode([1]) === "00"; ///
typedArray.encode([2]) === "01"; ///
typedArray.encode([3]) === "10"; ///

result.test(typedArray, "00", [1]); ///
result.test(typedArray, "01", [2]); ///
result.test(typedArray, "10", [3]); ///
result.test(typedArray, "000101", [1], 2); /// too long is fine

error(function() { typedArray.encode([1,2]); }); /// incorrect length
error(function() { typedArray.encode([0]); }); /// invalid item
error(function() { typedArray.decode("1", result.empty()); }); /// not enough data
!error(function() { typedArray.decode("1000101", result.empty()); }); /// too long is fine

typedArray.isType([1]); ///
!typedArray.isType([1,3]); ///


// length = 2
array(type, 2).encode([3, 2]) === "1001"; ///
result.test(array(type, 2), "1001", [3, 2]); ///

// length = 3
array(type, 3).encode([1, 2, 3]) === "000110"; ///
result.test(array(type, 3), "000110", [1, 2, 3]); ///


// variable length
var talv = array(type);
talv.isType([1, 3]); ///
!talv.isType([0]); ///

talv.encode([1, 2, 3]) === "1001011100"; ///
result.test(talv, "1001011100", [1, 2, 3]); ///
result.test(talv, "1001011100101", [1, 2, 3], 10); ///

talv.encode([3, 2, 3, 1]) === "1101011101000"; ///
result.test(talv, "1101011101000", [3, 2, 3, 1]); ///


// variable length
array(type, 0).encode([1, 2, 3]) === "1001011100"; ///
result.test(array(type, 0), "1001011100", [1, 2, 3]); ///

array(type, +"NaN").encode([1, 2, 3]) === "1001011100"; ///
result.test(array(type, +"NaN"), "1001011100", [1, 2, 3]); ///

var nested = array(null, 2);
nested.type = _enum(0, 1, nested);

nested.encode([0, [1, 0]]) === "00100100"; ///
nested.encode([[1, 1], [0, 1]]) === "100101100001"; ///
nested.encode([0,0]) === "0000"; ///

result.test(nested, "00100100", [0, [1, 0]]); ///
result.test(nested, "100101100001", [[1, 1], [0, 1]]); ///
result.test(nested, "0000", [0,0]); ///

}) + ")()")));
