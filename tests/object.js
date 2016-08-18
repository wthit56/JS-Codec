console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var error = require("./test.error.js"),
	result = require("./test.result.js");

var codec = require("../index.js"), _enum = require("../enum.js"), array = require("../array.js"), obj = require("../object.js");

obj instanceof Function; ///

/*
var car = obj({
	registration: registration,
	colour: colour,
	manufacturer: manufacturer
});

var manufacturer = _enum(
	_enum("Ferrari", "Mercedes"), // common
	_enum("Red Bull", "Renault", "Subaru", "Motorola", "KFC", "Sparky's", "") // rare
);
var colour = _enum("reddish", "greenish", "bluish", "darkish", "lightish");
*/

/*
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3  S
-----------------------------------------------
A B C D E F G H J K L M N O P R S V W X Y        5
0 1 2 3 4 5 6 7 8 9                              4
A B C D E F G H J K L M N O P R S T U V W X Y Z  5
-----------------------------------------------
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3
*/

/*
var registration = obj({
	region: array(_enum.apply(null, "ABCDEFGHJKLMNOPRSVWXY".split("")), 2),
	age: array(_enum.apply(null, "0123456789".split("")), 2),
	id: array(_enum.apply(null, "ABCDEFGHJKLMNOPRSTUVWXYZ".split("")), 2)
});

registration.encode instanceof Function; ///
registration.encode({ region: "A"+    "B", age: "0"+   "1", id: "K"+   "S"+     "S" }) ===
                              "00000"+"00001"+  "0000"+"0001"+  "01001"+"10000"+"10000";
*/

var number = _enum(1, 2, 3), letter = _enum.apply(null, "ABC".split(""));
number.name = "123";
letter.name = "ABC";

// sorted keys: grade, numA, numB
var simple = obj({
	numA: number, numB: number,
	grade: letter
});

simple.isType instanceof Function; ///
simple.isType({ numA: 1, numB: 1, grade: "A" }); ///
!simple.isType({}); ///
!simple.isType({ numA: 1, numB: 1, grade: "F" }); ///
!simple.isType({ numB: 1, grade: "B" }); ///
simple.isType({ numB: 1, grade: "B", numA: 3 }); ///
simple.isType({ numA: 3, numB: 1, numC: 2, grade: "B" }); ///

simple.encode instanceof Function; ///
simple.encode({ numA: 3, numB: 2, grade: "A" }) === "001001"; ///
result.test(simple, "001001", { numA: 3, numB: 2, grade: "A" }); ///

simple.encode({ numA: 1, numB: 1, grade: "C" }) === "100000"; ///
result.test(simple, "100000", { numA: 1, numB: 1, grade: "C" }); ///

// TODO: further testing

}) + ")()")));











