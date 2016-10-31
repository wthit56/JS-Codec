var similar = module.exports = function similar_array(a, b) {
	if (a === b) { return true; }
	else if (
		(typeof a === "object") && (a !== null) &&
		(typeof b === "object") && (b !== null)
	) {
		var a_keys = Object.keys(a), b_keys = Object.keys(b), l = a_keys.length;
		if (l !== b_keys.length) {
			return false;
		}
		else {
			for (var i = 0; i < l; i++) {
				if (!similar(a[a_keys[i]], b[a_keys[i]])) { return false; }
			}
			
			return true;
		}
	}
	else { return false; }
};