module.exports = function similar_array(a, b) {
	if (a.length !== b.length) {
		console.log("similar array length failure :: " + a.length + " " + b.length);
		return false;
	}
	else {
		for (var i = 0, l = a.length; i < l; i++) {
			if (a[i] !== b[i]) {
				console.log("similar array failure ::", a, b);
				return false;
			}
		}
		return true;
	}
};