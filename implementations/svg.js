var codec = require("../index.js"), _enum = require("../enum.js"), array = require("../array.js"), obj = require("../object.js");

/* type = {
	__: codec // identifier
	isType: function(value) // true if uncompressed `value` is of this type
	encode: function(value) // `value` returns string of 1s and 0s representing the value in binary
	decode: function(data, result) // `data` is a string of 1s and 0s. `result` = { value, length } where `value` is the rebuilt uncompressed value, and `length` is the number of bits consumed to rebuild it.
} */

function NullOr(enum2) {
	return _enum(null, enum2);
}

var length_unit = NullOr(_enum("em", "px"));
var rotation_unit = NullOr(_enum("rad", "deg"));

var value = {};
value.float = _enum(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9.9);
value.int = function(from, to) {
	_enum(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
};
value.number = { string: array(_enum.apply(null, "0123456789".split(""))) };
value.string = array(_enum.apply(null, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&;:#-_\\/".split("")));
	value.string.fromString = function(value) {
		return value.split("");
	};

value.length = obj({ value: value.float, unit: length_unit });
value.points = array(obj({ x: value.length, y: value.length }));
value.rotation = obj({ value: value.float, unit: rotation_unit });
value.time = obj({
	hours: value.int(),
	minutes: value.int(0, 59),
	seconds: value.int(0, 59),
	milliseconds: value.int
});
	value.time.fromString = (function() {
		var parse = /^(?:(0\d|\d{2,}):)?([0-5]\d):([0-5]\d)(?!:)(?:\.(\d+))?|(\d+(?::\d+)+(?:\.\d+)?)|(\d+(?:\.\d+)?)(h|min|s|ms)?(?!:)$/,
			full_hour = 1, full_min = 2, full_sec = 3, full_ms = 4,
			invalid = 5,
			count = 6, unit = 7;
			
		return function(string) {
			if (string === "indefinite") { return string; }
			else {
				var parsed = string.match(parse);
				if (!parsed) { throw "Invalid time: " + string; }
				else {
					var h = 0, m = 0, s = 0, ms = 0;
					if (parsed[full_min]) {
						m = +parsed[full_min]; s = +parsed[full_sec];
						ms = (
							parsed[full_ms]
								? ("0." + parsed[4]) * 1000 | 0
								: 0
						);
						
						if (parsed[full_hour]) {
							h = +parsed[full_hour];
						}
					}
					else if (parsed[invalid]) { throw "Invalid time: " + string; }
					else {
						var v = +parsed[count], b;
						
						switch(parsed[unit]) {
							case "h":
								b = v % 1; h = v - b; v = b * 60;
							case "min":
								b = v % 1; m = v - b; v = b * 60;
							default:
							case "s":
								b = v % 1; s = v - b; v = b * 1000;
							case "ms":
								b = v % 1; ms = v - b;
						}
						
						if (ms > 999) { b = ms % 1000; s += (ms - b) / 1000; ms = b; }
						if (s > 59) { b = s % 60; m += (s - b) / 60; s = b; }
						if (m > 59) { b = m % 60; h += (m - b) / 60; m = b; }
					}

					/*
					if (m > 59) { throw "Invalid minutes: " + string; }
					else if (s > 59) { throw "Invalid seconds: " + string; }
					else if (ms > 999) { throw "Invalid milliseconds: " + string; }
					*/
					
					return {
						hours: h, minutes: m, seconds: s, milliseconds: ms
					};
				}
			}
		};
	})();
	value.time.toString = (function() {
		function pad(i) { if (i < 10) { return "0" + i; } }
		
		return function(input) {
			return pad(input.hours) + ":" + pad(input.minutes) + ":" + pad(input.seconds) + ":" + pad(input.milliseconds);
		};
	})();
value.attr = value.string;


var t, transform = NullOr(t = array());
t.type = NullOr(_enum(
	transform.matrix = obj({ type: "matrix", a: value.float, b: value.float, c: value.float, d: value.float, e: value.float, f: value.float }),
	transform.translate = obj({ type: "translate", x: value.float, y: NullOr(value.float) }),
	transform.rotate = obj({ type: "rotate", a: value.float, x: NullOr(value.float), y: NullOr(value.float) }),
	transform.skewX = obj({ type: "skewX", a: value.float }),
	transform.skewY = obj({ type: "skewY", a: value.float })
));

var elem = { shape: [], animation: [], description: [] };
elem.anim = elem.animation;
elem.desc = elem.description;

function s(structure) { // shape
	structure.transform = transform;
	structure.style = value.string;
	return obj(structure);
}
var shape_children = NullOr(array(_enum.apply(null, elem.animation.concat(elem.description))));
elem.shape.push(
	elem.shape.circle = s({ type:"circle", children: shape_children,
		cx: value.length, cy: value.length, r: value.length }),
	elem.shape.ellipse = s({ type: "ellipse", children: shape_children,
		cx: value.length, cy: value.length, rx: value.length, ry: value.length }),
	elem.shape.line = s({ type: "line", children: shape_children,
		x1: value.length, y1: value.length,
		x2: value.length, y2: value.length
	}),
	elem.shape.polygon = s({ type: "polygon", children: shape_children, points: value.points }),
	elem.shape.polyline = s({ type: "polyline", children: shape_children, points: value.points }),
	elem.shape.rect = s({ type: "rect", children: shape_children,
		x: value.length, y: value.length,
		width: value.length, height: value.length,
		rx: value.length, ry: value.length
	})
);

function a(structure) { // animation
	//structure.transform = transform;
	return obj(structure);
}
elem.animation.push(
	elem.animation.animate = a({
		attributeName: value.attr,
		attributeType: _enum("CSS", "XML", "auto"),
		from: value.length, to: value.length,
		dur: _enum(value.time, "indefinite"), repeatCount: _enum(value.float, "indefinite")
	})
);

"a,altGlyphDef,clipPath,color-profile,cursor,filter,font,font-face,foreignObject,image,marker,mask,pattern,script,style,switch,text,view".split(/,/g).forEach(function(v) {
	elem[v] = obj({});
});

svg = elem.svg = obj({
	version: value.float, baseProfile: "full",
	xmlns: _enum("http://www.w3.org/2000/svg", value.string),
	"xmlns:xlink": _enum("http://www.w3.org/1999/xlink", value.string),
	"xmlns:ev": _enum("http://www.w3.org/2001/xml-events", value.string),
	
	x: value.length, y: value.length,
	width: value.length, height: value.length,
	preserveAspectRatio: (function() {
		var alignment = _enum("min", "mid", "max");
		return obj({
			align: _enum(
				obj({ x: alignment, y: alignment }),
				"none"
			),
			meetOrSlice: NullOr(_enum("meet", "slice"))
		})
	})(),
	contentScriptType: value.string, contentStyleType: value.string,
	viewBox: obj({
		"min-x": value.float, "min-y": value.float,
		width: value.float, height: value.float
	}),
	
	children: array(_enum(
		_enum.fromArray(elem.shape),
		_enum.fromArray(elem.animation),
		_enum.fromArray(elem.description),
		_enum.fromArray(elem.structural),
		_enum.fromArray(elem.gradient)
	))
});

svg.elem = elem; svg.value = value; svg.transform = transform;
svg.value = value;


if (typeof module !== "undefined") { module.exports = svg; }

