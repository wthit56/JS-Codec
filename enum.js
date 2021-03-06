if (typeof require !== "undefined") { codec = require("./index.js"); }

function createFiller(length) {
	var buffer = "";
	while (buffer.length < length) {
		buffer += (0).toPrecision(Math.min(21, length - buffer.length + 1)).substr(2);
	}
	
	return function filler(value) {
		value = value.toString();
		if (value.length < length) { return buffer.substr(0, length - value.length) + value; }
		else { return value; }
	};
}

codec_enum = function codec_enum(/* options... */) {
	var options = Array.prototype.slice.call(arguments);
	var _value, some = function(option) {
		return codec.is(_value, option);
	};
	
	var size = (options.length - 1).toString(2).length, fill = createFiller(size);
	
	return {
		__: codec,
		isType: function(value) {
			_value = value;
			var result = options.some(some);
			_value = null;
			return result;
		},
		
		encode: function(value) {
			for (var i = 0, l = options.length; i < l; i++) {
				if (value === options[i]) {
					return fill(i.toString(2));
				}
				else if (codec.is(value, options[i])) {
					return fill(i.toString(2)) + options[i].encode(value);
				}
			}
			
			console.trace();
			throw "Codec enum could not encode, no options available for value: " + JSON.stringify(value) + ".";
		},
		decode: function(data, result) {
			if (data.length < size) {
				console.trace();
				throw "Not enough data to decode: " + data + "; needs " + size + " bits.";
			}
			
			result.length += size;
			
			var part = parseInt(data.substr(0, size), 2);
			if (part >= options.length) {
				console.trace();
				throw "Invalid data: " + part + ".";
			}
			
			var value = options[part];
			if (codec.isType(value)) {
				var r, input;
				try {
					input = data.substr(result.length);
					r = value.decode(input, { value: null, length: 0 });
				} catch (e) {
					throw e + "\nCodec enum decoding " + input;
				}
				result.value = r.value;
				result.length += r.length;
			}
			else {
				result.value = value;
			}
			
			return result;
		}
	};
};

codec_enum.fromArray = function(arr) { // TODO: test
	return codec_enum.apply(null, arr);
};

if (typeof module !== "undefined") { module.exports = codec_enum; }

/*

var numbers = codec(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
numbers.isType(1) == true
numbers.isType("a") == false
numbers.encode(3) == "1000"
numbers.decode("0001") == 9

var oddeven = codec(codec(1,3,5,7,9), codec(0,2,4,6,8), 321);
oddeven.isType(1) == true
oddeven.isType(2) == true
oddeven.encode(3) == "00001"
oddeven.encode("00001") == 3
//                    00          001
//                    option 1    sub-option 2
oddeven.encode(8) == "01100"
oddeven.decode("01100") == 8
//                    01         100
//                    option 2   sub-option 5
oddeven.encode(321) == "10"
oddeven.decode("10") == 321
//                    option 3

*/