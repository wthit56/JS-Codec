console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var codec = require("../index.js");

codec.is instanceof Function; ///
codec.is(1, 1); ///
!codec.is(1, 2); ///
!codec.is(1, "1"); ///

!codec.is(1, {}); ///
!codec.is(1, { isType: null }); ///
!codec.is(1, { isType: true }); ///
!codec.is(1, { isType: function() {} }); ///
!codec.is(1, { isType: function() { return false; } }); ///
codec.is(1, { isType: function() { return true; } }); ///
codec.is(1, { isType: function(v) { return v === 1; } }); ///

}) + ")()")));