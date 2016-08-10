console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var error = require("./test.error.js"),
	similar = require("./test.similar.array.js");

var codec = require("../index.js"),
	_enum = require("../enum.js"),
	array = require("../array.js");

array instanceof Function; ///

var type = _enum(1, 2, 3);
var typedArray = array(type, 1);

typedArray.type === type; ///

error(function() { typedArray.encode(1); }); ///
typedArray.encode([1]) === "00"; ///
typedArray.encode([2]) === "01"; ///
typedArray.encode([3]) === "10"; ///

error(function() { typedArray.encode([1,2]); }); /// incorrect length
error(function() { typedArray.encode([0]); }); /// invalid item

typedArray.isType([1]); ///
!typedArray.isType([1,3]); ///


// length = 2
array(type, 2).encode([3, 2]) === "1001"; ///

// length = 3
array(type, 3).encode([1, 2, 3]) === "000110"; ///

// variable length
var talv = array(type);
talv.encode([1, 2, 3]) === "1001011100"; ///

talv.isType([1, 3]); ///
!talv.isType([0]); ///

// variable length
array(type, 0).encode([1, 2, 3]) === "1001011100"; ///
array(type, +"NaN").encode([1, 2, 3]) === "1001011100"; ///

similar(talv.decode("1001011100"), [1, 2, 3]); ///
similar(talv.decode("1101011101000"), [3, 2, 3, 1]); ///


var nested = array(null, 2);
nested.type = _enum(0, 1, nested);

nested.encode([0, [1, 0]]) === "00100100"; ///
nested.encode([[1, 1], [0, 1]]) === "100101100001"; ///
nested.encode([0,0]) === "0000"; ///

// TODO: decode

}) + ")()")));










