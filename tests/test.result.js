var similar = require("./test.similar.array.js");

var result = module.exports = {
	test: function(codec, data, expectedValue, expectedLength) {
		if (!codec || !(codec.decode instanceof Function)) {
			console.log("result test failure :: no codec provided");
			return false;
		}
		else {
			var r = codec.decode(data, result.empty());
			
			if ((r.value !== expectedValue) && !similar(r.value, expectedValue)) {
				console.log("result test :: values disimilar", expectedValue, "got", r.value);
				return false;
			}
			else if (expectedLength == null) {
				if (r.length !== data.length) {
					console.log("result test :: length not matching (defaulted to " + data.length + ", got " + r.length + ")");
					return false;
				}
			}
			else if (r.length !== expectedLength) {
				console.log("result test :: length not matching (expected " + expectedLength + ", got " + r.length + ")");
				return false;
			}
			
			return true;
		}
	},
	empty: function() { 
		return { value: null, length: 0 };
	}
};