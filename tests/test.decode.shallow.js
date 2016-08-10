function testdec(codec, data, exVal, exLen) {
	var r = { value: null, length: 0 };
	codec.decode(data, r);
	
	if (r.value === exVal && r.length === exLen) { return true; }
	else { console.log("testdec fail :: " + JSON.stringify(r)); return false; }
}
testdec.stub = { value: null, length: 0 };

module.exports = testdec;