var similar = require("./test.similar.js");

var result = module.exports = {
	test: function(codec, data, expectedValue, expectedLength) {
		if (!codec || !(codec.decode instanceof Function)) {
			console.log("result test failure :: no codec provided");
			return false;
		}
		else {
			var r = codec.decode(data, result.empty());
			
			if (r.value === expectedValue) { }
			else if (similar(r.value, expectedValue)) { }
			else {
				var keys = Object.keys(expectedValue);
				if (!similar(
						keys.map(function(k) { return expectedValue[k]; }), 
						keys.map(function(k) { return r.value[k]; })
					) ||
					Object.keys(r.value).length !== keys.length
				) {
					console.log("result test :: values disimilar", expectedValue, "got", r.value);
					return false;
				}
			}
			
			if (expectedLength == null) {
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