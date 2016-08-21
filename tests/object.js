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


/*
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3  S
-----------------------------------------------
A B C D E F G H J K L M N O P R S V W X Y        5
0 1 2 3 4 5 6 7 8 9                              4
A B C D E F G H J K L M N O P R S T U V W X Y Z  5
-----------------------------------------------
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3
*/

var registration = obj({
	region: array(_enum.apply(null, "ABCDEFGHJKLMNOPRSVWXY".split("")), 2),
	age: array(_enum.apply(null, "0123456789".split("")), 2),
	id: array(_enum.apply(null, "ABCDEFGHJKLMNOPRSTUVWXYZ".split("")), 3)
});

registration.string = {
	encode: function(string) {
		var parts = string.match(/^([ABCDEFGHJKLMNOPRSVWXY]{2})(\d{2})([ABCDEFGHJKLMNOPRSTUVWXYZ]{3})$/);
		return registration.encode({ region: parts[1].split(""), age: parts[2].split(""), id: parts[3].split("") });
	},
	decode: function(data) {
		var r = { value: null, length: 0 };
		registration.decode(data, r);
		var v = r.value;
		r = "" + v.region.join("") + v.age.join("") + v.id.join("");
		return r;
	}
};

registration.string.encode("AB01KSS") ===
// age:    0      1
           "0000"+"0001"+
// id:     K       S       S
           "01001"+"10000"+"10000"+
// region: A       B
          "00000"+"00001"; ///

registration.string.decode("000000010100110000100000000000001") === "AB01KSS"; ///



console.log("obj: " + registration.string.encode("AB01KSS") + "\n  " +
	"arr: " + array(_enum.apply(null, "ABCDEFGHJKLMNOPRSTUVWXYZ0123456789".split("")), 7).encode("AB01KSS".split("")));

/*
registration.encode({ region: "AB".split(""), age: "01".split(""), id: "KSS".split("") }) ===

console.log("0000"+"0001"+
// id:     K       S       S
"01001"+"10000"+"10000"+
// region: A       B
"00000"+"00001");
*/

}) + ")()")));











