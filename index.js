var codec = (function() {
	var codec = {
		is: function(value, comparison) {
			if (typeof comparison === "object") { return comparison.isType && comparison.isType instanceof Function && comparison.isType(value); }
			else { return value === comparison; }
		},
	};
	
	return codec;
})();

if (typeof module !== "undefined") { module.exports = codec; }