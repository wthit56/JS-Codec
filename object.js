if (typeof require !== "undefined") { codec = require("./index.js"); }

codec_object = function(template) {
	var keys = Object.keys(template).sort();
	
	return {
		__: codec,
		isType: function(value) {
			if (typeof value === "object") {
				for (var i = 0, l = keys.length; i < l; i++) {
					// console.log(keys[i]+":", template[keys[i]].name, value[keys[i]], template[keys[i]].isType(value[keys[i]]));
					if (!template[keys[i]].isType(value[keys[i]])) {
						return false;
					}
				}
				
				return true;
			}
			else {
				return false;
			}
		},
		
		encode: function(value) {
			var data = "";
			
			for (var i = 0, l = keys.length; i < l; i++) {
				data += template[keys[i]].encode(value[keys[i]]);
			}
			
			return data;
		},
		decode: function(data, result) {
			var value = {}, length = 0, r = { value: null, length: 0 };
			
			for (var i = 0, l = keys.length; i < l; i++) {
				r = template[keys[i]].decode(data, r);
				value[keys[i]] = r.value;
				length += r.length;
				data = data.substr(r.length);
				r.value = null; r.length = 0;
			}
			
			result.value = value; result.length = length;
			return result;
		}
	};
};

if (typeof module !== "undefined") { module.exports = codec_object; }