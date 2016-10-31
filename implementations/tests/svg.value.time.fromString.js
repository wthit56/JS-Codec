console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var timeTest = require("./test-svg.value.time.fromString.js");

timeTest("02:30:03", { hours: 2, minutes: 30, seconds: 3 }); ///
timeTest("50:00:10.25",
	{ hours: 50, minutes: 0, seconds: 10, milliseconds: 250 }); ///
timeTest("02:33", { minutes: 2, seconds: 33 }); ///
timeTest("00:10.5", { seconds: 10, milliseconds: 500 }); ///

timeTest("1", { seconds: 1 }); ///
timeTest("60", { minutes: 1 }); ///
timeTest("3600", { hours: 1 }); ///
timeTest("0.001", { milliseconds: 1 }); ///
timeTest("0.00199", { milliseconds: 1 }); ///
timeTest("12.467", { seconds: 12, milliseconds: 467 }); ///

timeTest("3.2h", { hours: 3, minutes: 12 }); ///
timeTest("67min", { hours: 1, minutes: 7 }); ///
timeTest("45min", { minutes: 45 }); ///
timeTest("30s", { seconds: 30 }); ///
timeTest("5ms", { milliseconds: 5 }); ///

timeTest("3.59277h",
	{ hours: 3, minutes: 35, seconds: 33, milliseconds: 972 }); ///
	// hours = 3, r = 0.59277 * 60
	// minutes = 35, r = 0.5662 * 60
	// seconds = 33, r = 0.972 * 1000
	// ms = 972

timeTest("00.5s", { milliseconds: 500 }); ///
timeTest("00:00.005", { milliseconds: 5 }); ///
timeTest("00:00:00.005", { milliseconds: 5 }); ///

timeTest("00:5", "error"); ///
timeTest("00:00", {}); ///
timeTest("00:99", "error"); ///
timeTest("99:00", "error"); ///
timeTest("99:00:00", { hours: 99 }); ///
timeTest("00:00:00.9999999", { milliseconds: 999 }); ///
timeTest("0.9999999s", { milliseconds: 999 }); ///
timeTest("00:00:00:00.005", "error"); ///

}) + ")()")));











