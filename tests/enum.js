console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var error = require("./test.error.js"),
	result = require("./test.result.js");

var codec = require("../index.js"),
	_enum = require("../enum.js");

_enum instanceof Function; ///

var numbers = _enum(1, 2, 3);
numbers.__ === codec;

numbers.isType instanceof Function; ///
numbers.isType(2); ///
!numbers.isType(4); ///
!numbers.isType("3"); ///

numbers.encode(1) === "00"; ///
numbers.encode(2) === "01"; ///
numbers.encode(3) === "10"; ///
error(function() { numbers.encode(4); }); ///

result.test(numbers, "00", /* result.value: */ 1, /* .length: */ 2); ///
result.test(numbers, "01", /* result.value: */ 2, /* .length: */ 2); ///
result.test(numbers, "10", /* result.value: */ 3, /* .length: */ 2); ///
error(function() { numbers.decode("11", stub); }); ///

// TODO: failsafe read value


var abc = _enum("a","b","c", numbers);
abc.encode("b") == "01"; ///
// console.log(abc.encode(2));
abc.encode(2) == "1101"; ///

// encode specific object

result.test(abc, "10", /* result.value: */ "c", /* .length: */ 2); ///
result.test(abc, "1100", /* result.value: */ 1, /* .length: */ 4); ///
error(function() { abc.decode("11", stub); }); ///
// console.log(abc.decode("11", stub));

var f = function() {}, o = {};
var types = _enum(1, "a", f, o, numbers, abc);
types.encode(1) === "000"; ///
types.encode("a") === "001"; ///
types.encode(f) === "010"; ///
types.encode(o) === "011"; ///

// zero-based: types > (4) numbers > (1) 2
// types > abc is skipped
types.encode(2) === "10001"; ///

result.test(types, "000", /* result.value: */ 1,   /* .length: */ 3); ///
result.test(types, "001", /* result.value: */ "a", /* .length: */ 3); ///
result.test(types, "010", /* result.value: */ f,   /* .length: */ 3); ///
result.test(types, "011", /* result.value: */ o,   /* .length: */ 3); ///

result.test(types, "10001", /* result.value: */ 2,   /* .length: */ 5); ///
result.test(types, "10110", /* result.value: */ "c",   /* .length: */ 5); ///

var types2 = _enum(1, "a", f, o, abc, numbers);
// zero-based: types2 > (4) abc > (3) numbers > (1) 2
// types2 > numbers is skipped
types2.encode(2) === "1001101"; ///
result.test(types2, "1001101", /* result.value: */ 2,   /* .length: */ 7); ///

// TODO: .fromArray()

}) + ")()")));
