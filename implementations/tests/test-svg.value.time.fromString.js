var svg = require("../svg.js"), similar = require("../../tests/test.similar.js")

module.exports = function timeTest(input, expected) {
	if (typeof expected === "object") {
		if (!("hours" in expected)) { expected.hours = 0; }
		if (!("minutes" in expected)) { expected.minutes = 0; }
		if (!("seconds" in expected)) { expected.seconds = 0; }
		if (!("milliseconds" in expected)) { expected.milliseconds = 0; }
	}
	
	var got;
	try {
		got = svg.value.time.fromString(input);
	} catch (e) {
		if (expected === "error") {
			return true;
		}
		else {
			console.log("timeTest svg.value.time.fromString error from " + JSON.stringify(input) + ": " + (e.message || e), got, expected);
			return false;
		}
	}
	
	var msDiff = got.milliseconds - expected.milliseconds;
	// console.log(msDiff);
	if ((msDiff >= -1) && (msDiff <= 1)) { got.milliseconds = expected.milliseconds; }
	
	var result = similar(got, expected);
	if (!result) { console.log("timeTest failed for " + input + ":", got, expected); }
	return result;
}
