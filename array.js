if (typeof require !== "undefined") { codec = require("./index.js"); }

codec_array = function codec_array(type, length) {
	var _value, every = function(v) { return codec.is(v, _codec.type); };
	
	var _codec = {
		__: codec, type: type,
		isType: function(value) {
			var result = (
				Array.isArray(value) &&
				(!length || (value.length === length)) &&
				value.every(every)
			);
			
			return result;
		},
		
		encode: function(value) {
			if (!Array.isArray(value)) {
				console.trace();
				throw "Value not an array: " + JSON.stringify(value) + ".";
			}
			else if ((length != null) && (value.length !== length)) {
				console.trace();
				throw "Value has incorrect length: " + value.length + ".";
			}
			
			var result = [];
			
			var itemMarker = length ? "" : "1";
			for (var i = 0, l = length || value.length; i < l; i++) {
				if (_codec.type.isType(value[i])) {
					var encoded;
					try {
						encoded = _codec.type.encode(value[i]);
					} catch (e) {
						throw e + "\nCodec array encoding index: " + i;
					}
					result.push(itemMarker + encoded);
				}
				else {
					console.trace();
					throw "Codec array encoding [" + i + "] invalid item type: " + JSON.stringify(value[i]) + ".";
				}
			}
			
			if (!length) { result.push(0); }
			
			return result.join("");
		},
		decode: function(data, result) {
			if (!result) {
				console.trace();
				throw "Array codec decode :: no result object to write to";
			}
			
			var value = [];
			
			var read = 0, readItem, i = 0, r = {}, markerLength = length ? 0 : 1;
			
			while (length ? i < length : data[0] === "1") {
				r.value = null; r.length = 0;
				var input;
				try {
					input = data.substr(markerLength);
					_codec.type.decode(input, r);
				} catch (e) {
					throw e + "\nCodec array decoding " + input;
				}
				value.push(r.value);
				
				readItem = markerLength + r.length;
				read += readItem;
				
				data = data.substr(readItem);
				
				i++;
			}
			
			if (!length) { read++; data = data.substr(1); }
			
			result.value = value;
			result.length = read;
			
			return result;
		}
	};
	
	return _codec;
};

if (typeof module !== "undefined") { module.exports = codec_array; }