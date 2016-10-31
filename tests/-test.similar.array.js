var similar = module.exports = function similar_array(a, b) {
	// console.log("similar array ::", a, b);
	
	if (!a || !b) {
		return false;
	}
	else if (!(a instanceof Array) || !(b instanceof Array)) {
		return false;
	}
	else if (a.length !== b.length) {
		return false;
	}
	else {
		for (var i = 0, l = a.length; i < l; i++) {
			if ((a[i] !== b[i]) && !similar(a[i], b[i])) {
				return false;
			}
		}
		return true;
	}
};