if (typeof require !== "undefined") { codec = require("./index.js"); }

array = function codec_array(type, length) {
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
			if (!Array.isArray(value)) { throw "Invalid value: " + JSON.stringify(value) + "."; }
			else if (length && (value.length !== length)) { throw "Value has incorrect length: " + value.length + "."; }
			
			var result = [];
			
			var itemMarker = length ? "" : "1";
			for (var i = 0, l = length || value.length; i < l; i++) {
				if (_codec.type.isType(value[i])) {
					result.push(itemMarker + _codec.type.encode(value[i]));
				}
				else { throw "Invalid item [" + i + "] within value: " + JSON.stringify(value[i]) + "."; }
			}
			
			if (!length) { result.push(0); }
			
			return result.join("");
		},
		decode: function(data, result) {
			var value = [];
			
			var read = 0, readItem, i = 0, r = {}, markerLength = length ? 0 : 1;
			
			while (length ? i < l : data[0] === "1") {
				r.value = null; r.length = 0;
				_codec.type.decode(data.substr(markerLength), r);
				value.push(r.value);
				
				readItem = markerLength + r.length;
				read += readItem;
				
				data = data.substr(readItem);
				
				i++;
			}
			
			if (length) { read++; data = data.substr(1); }
			
			return value;
		}
	};
	
	return _codec;
};

if (typeof module !== "undefined") { module.exports = array; }