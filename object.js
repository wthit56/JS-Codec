if (typeof require !== "undefined") { codec = require("./index.js"); }

function isType(template, keys, value) {
	if (typeof value === "object") {
		for (var i = 0, l = keys.length; i < l; i++) {
			// console.log(keys[i]+":", template[keys[i]].name, value[keys[i]], codec.is(template[keys[i]].isType(value[keys[i]]));
			if ((template[keys[i]] !== value[keys[i]]) && !codec.is(value[keys[i]], template[keys[i]])) {
				return false;
			}
		}
		
		return true;
	}
	else {
		return false;
	}
}

function encode(template, keys, value) {
	var data = "";
	
	for (var i = 0, l = keys.length; i < l; i++) {
		if (codec.isType(template[keys[i]])) {
			try {
				data += template[keys[i]].encode(value[keys[i]]);
			} catch(e) {
				throw e + "\nCodec object encoding key: " + keys[i];
			}
		}
	}
	
	return data;
}

function decode(template, keys, data, result) {
	var value = {}, length = 0, r = { value: null, length: 0 };
	
	for (var i = 0, l = keys.length; i < l; i++) {
		if (codec.isType(template[keys[i]])) {
			try {
				r = template[keys[i]].decode(data, r);
			} catch (e) {
				throw e + "\nCodec object decoding key: " + keys[i];
			}

			value[keys[i]] = r.value;
			length += r.length;
			data = data.substr(r.length);
			r.value = null; r.length = 0;
		}
		else {
			value[keys[i]] = template[keys[i]];
		}
		
	}
	
	result.value = value; result.length = length;
	return result;
}

function Codec_Object(template) {
	var keys = Object.keys(template).sort();
	this.__ = codec;
	this.isType = function(value) { return isType(template, keys, value); }
	
	this.encode = function(value) { return encode(template, keys, value); };
	this.decode = function(data, result) { return decode(template, keys, data, result); };
}
Codec_Object.prototype = Object.create(codec.type.prototype);

codec_object = function(template) {
	return new Codec_Object(template);
};

if (typeof module !== "undefined") { module.exports = codec_object; }