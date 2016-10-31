var codec = (function() {
	var codec = {
		is: function(value, comparison) {
			if (value === comparison) { return true; }
			else if ((comparison !== null) && (typeof comparison === "object")) { return comparison.isType && comparison.isType instanceof Function && comparison.isType(value); }
			else { return false; }
		},
		isType: function(type) {
			return (
				type !== null &&
				typeof type === "object" &&
				type.__ === codec
			);
		},
		
		type: function Codec_Type() {}
	};
	
	return codec;
})();

/* type = {
	__: codec // identifier
	isType: function(value) // true if uncompressed `value` is of this type
	encode: function(value) // `value` returns string of 1s and 0s representing the value in binary
	decode: function(data, result) // `data` is a string of 1s and 0s. `result` = { value, length } where `value` is the rebuilt uncompressed value, and `length` is the number of bits consumed to rebuild it.
} */

if (typeof module !== "undefined") { module.exports = codec; }