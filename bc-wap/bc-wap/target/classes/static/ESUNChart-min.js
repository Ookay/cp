msg = function(a) {
	if(!msg.stop) {
		msg.stop = confirm("\u5a34\u5b2d\u762f\u934a\u95f4\u8d1f: " + a + "\n\n\u7455\u4f7a\u6237\u7f01\ue15f\u7161\u942a\u5b29\u7b05\u6d93\ufffd\u6d93\ue044\ufffd\u714e\u60a7?")
	}
};
ESUNChart = {};
ESUNChart.ini = {
	default_has_line: true,
	map: [],
	initShow: ""
};
ESUNChart.CSS = function(d, b) {
	var a = d.style;
	if(a[b]) {
		return a[b]
	}
	if(d.currentStyle) {
		return d.currentStyle[b]
	}
	if(document.defaultView && document.defaultView.getComputedStyle) {
		b = b.replace(/([A-Z])/g, "-$1").toLowerCase();
		var c = document.defaultView.getComputedStyle(d, "");
		return c && c.getPropertyValue(b)
	}
	return null
};
ESUNChart.insertAfter = function(c, a) {
	var b = a.parentNode;
	if(b.lastChild == a) {
		return b.appendChild(c)
	} else {
		return b.insertBefore(c, a.nextSibling)
	}
};
SG = function(A, w, u, q, s, c) {
	this.cloner = false;
	this.ballKey = "chartBall";
	this.isBall = /chartBall|cbg/i;
	this.ylKey = "yl";
	this.isHiddenYL = false;
	this.onlySplaceLine = false;
	this.defCSS = "chartBall01";
	this.gYLCSS = "yl01";
	this.gHCSS = "chartBall05";
	this.gH3CSS = "chartBall06";
	this.gVCSS = "chartBall03";
	this.gV3CSS = "chartBall04";
	this.gXCSS = "chartBall04";
	this.gX3CSS = "chartBall08";
	this.gXLCSS = "hot";
	this.gXL3CSS = "yhot";
	this.gXRCSS = "hot";
	this.gXR3CSS = "yhot";
	this.gTBCSS = "chartBall02";
	this.gDefaultShowCSS = "chartBall07";
	this.gpaceLineCSS = "ldh";
	this.gV = [];
	this.gV3 = [];
	this.gH = [];
	this.gH3 = [];
	this.gXL = [];
	this.gXL3 = [];
	this.gXR = [];
	this.gXR3 = [];
	this.gX = [];
	this.gX3 = [];
	this.gYL = [];
	this.gAll = [];
	this.gTB = [];
	this.gDefaultShow = [];
	this.gCustom = [];
	this.spaceLine = [];
	this.notEnd = [];
	this.hasBollLine = [];
	var m = document.getElementById(A).rows;
	var b = {
		x: w || 0,
		y: u || 0,
		w: q || 0,
		oh: s || 0
	};
	var f = b.y < 0 ? (m.length + b.y) : b.y;
	var o = m.length - b.oh;
	var e = b.x < 0 ? (m[f].cells.length + b.x) : b.x;
	var r = e + b.w;
	if(r > m[f].cells.length) {
		r = m[f].cells.length
	}
	if(b.w <= 0) {
		r = m[f].cells.length + b.w
	}
	this.check = c || function() {};
	for(var v = f; v < o; v++) {
		var a = m[v].cells;
		if(m[v].className == "tdbck") {
			this.spaceLine.push(m[v])
		}
		for(var t = e; t < r; t++) {
			var d = a[t];
			if(d === undefined) {
				continue
			}
			if(this.check(d, t, v) === false) {
				continue
			}
			if(this.check(d, t, v) == "onlyNullLine") {
				this.onlySplaceLine = true
			}
			if(null != d.getAttribute("tb")) {
				this.gTB.push(d)
			}
			if(this.onlySplaceLine) {
				var p = 0,
					k = t,
					g = v;
				while((--k) >= e && a[k].className.indexOf("yl0") != -1) {
					p++
				}
				k = t;
				while((++k) < r && a[k].className.indexOf("yl0") != -1) {
					p++
				}
				if(p == q - 1 && d.className.indexOf("yl0") != -1) {
					this.notEnd.push(d);
					continue
				} else {
					this.hasBollLine.push(d)
				}
			}
			if(!this.isBall.test(d.className)) {
				this.gYL.push(d);
				d._bgColor = ESUNChart.CSS(d, "backgroundColor");
				if(d._bgColor == "transparent") {
					d._bgColor = "#F3F2F2"
				}
				d._color = ESUNChart.CSS(d, "color");
				d.value = d.innerHTML;
				continue
			}
			this.gAll.push(d);
			var k = t,
				g = v,
				h = 0,
				l = 0;
			while((--g) >= f) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						h++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						continue
					} else {
						break
					}
				}
			}
			g = v;
			while((++g) < o) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						l++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						continue
					} else {
						break
					}
				}
			}
			var z = h + l;
			if(h + l == 2) {
				this.gV3.push(d)
			}
			if(h + l > 0) {
				this.gV.push(d)
			}
			k = t, g = v, h = 0, l = 0;
			while((--k) >= e && this.isBall.test(m[g].cells[k].className)) {
				h++
			}
			k = t;
			while((++k) < r && this.isBall.test(m[g].cells[k].className)) {
				l++
			}
			if(h + l == 1) {
				this.gH3.push(d)
			}
			if(h + l > 0) {
				this.gH.push(d)
			}
			k = t, g = v, h = 0, l = 0;
			while((--g) >= f && (--k) >= e) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						h++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						k++;
						continue
					} else {
						break
					}
				}
			}
			k = t;
			g = v;
			while((++g) < o && (++k) < r) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						l++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						k--;
						continue
					} else {
						break
					}
				}
			}
			if(h + l > 1) {
				this.gXL3.push(d)
			}
			if(h > 0) {
				this.gXL.push(d)
			}
			k = t, g = v, h = 0, l = 0;
			while((--g) >= f && (++k) < r) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						h++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						k--;
						continue
					} else {
						break
					}
				}
			}
			k = t;
			g = v;
			while((++g) < o && (--k) >= e) {
				if(m[g].cells[k]) {
					if(this.isBall.test(m[g].cells[k].className)) {
						l++
					} else {
						break
					}
				} else {
					if(m[g].cells[0] && m[g].cells[0].parentNode.className == "tdbck") {
						k++;
						continue
					} else {
						break
					}
				}
			}
			if(h + l > 1) {
				this.gXR3.push(d)
			}
			if(h > 0) {
				this.gXR.push(d)
			}
			this.gX = this.gXL.concat(this.gXR);
			this.gX3 = this.gXL3.concat(this.gXR3)
		}
	}
	this.gDefaultShow = this.gDefaultShow.concat(this.gV3, this.gH3, this.gX3)
};
SG.prototype = {
	show: function(type, yes) {
		if(!this[type]) {
			return
		}
		var fLen = this[type].length;
		for(var i = 0; i < fLen; i++) {
			var _this = this[type][i];
			switch(type) {
				case "gYL":
					if(yes) {
						if(_this.className.indexOf(this.gTBCSS) == -1) {
							_this.style.color = _this._bgColor
						}
					} else {
						if(_this.className.indexOf(this.gTBCSS) == -1) {
							_this.style.color = _this._color
						}
					}
					this.isHiddenYL = yes;
					break;
				case "gTB":
					if(yes) {
						_this.className += " " + this.gTBCSS;
						_this.innerHTML = _this.getAttribute("tb")
					} else {
						_this.className = _this.className.replace(eval("/" + this.gTBCSS + " | " + this.gTBCSS + "$/"), "");
						_this.innerHTML = !this.isHiddenYL ? _this.value : "<span style='visibility:hidden'>" + _this.value + "</span>"
					}
					break;
				case "spaceLine":
					_this.style.display = yes ? "" : "none";
					break;
				default:
					if(yes) {
						_this.className += " " + this[type + "CSS"]
					} else {
						_this.className = _this.className.replace(eval("/" + this[type + "CSS"] + " | " + this[type + "CSS"] + "$/"), "")
					}
			}
		}
	},
	addClick: function(b, a) {
		b.style.cursor = "pointer";
		if(typeof(a) == "function") {
			return(b.onclick = a)
		}
		b.onclick = function() {
			if(this.innerHTML == this.number) {
				this.innerHTML = "&nbsp;";
				this.className = this.className.replace(new RegExp(" ?" + a), "")
			} else {
				this.innerHTML = this.number;
				this.className += " " + a
			}
		}
	},
	set_on_off: function(a, f) {
		var e = a.split(",");
		var c = f.split(",");
		var d = this;
		for(var b = 0; b < e.length; b++) {
			(function(g) {
				document.getElementById(e[g]).onclick = function() {
					d.show(c[g], this.checked)
				}
			})(b)
		}
	}
};
oNullLine = {
	fg: [],
	defaultArray: "notEnd",
	table: false,
	color: "#D16630",
	bgColor: "#FDD2C6",
	selector: function() {
		return "onlyNullLine"
	},
	setSrc: function(a) {
		this.defaultArray = a;
		return this
	},
	setColor: function(a, b) {
		if(a) {
			this.bgColor = a
		}
		if(b) {
			this.color = b
		}
		return this
	},
	add: function(a, e, b, d) {
		var c = (new SG(this.table, a, e, b, d, this.selector))[this.defaultArray];
		c.bg = this.bgColor;
		c.color = this.color;
		this.fg.push(c);
		return this
	},
	bind: function(b, a) {
		this.table = b;
		if(a !== true) {
			document.getElementById(a).onclick = oNullLine.show
		}
		return this
	},
	show: function(b) {
		var a = oNullLine.fg;
		for(var d = 0; d < a.length; d++) {
			var e = a[d];
			for(var c = 0; c < e.length; c++) {
				if(this.checked || b == true) {
					e[c].style.backgroundColor = e.bg;
					if(!/^chartBall/i.test(e[c].className)) {
						e[c].style.color = e.color
					}
				} else {
					e[c].removeAttribute("style")
				}
			}
		}
	}
};
oDFZ = {
	vg: [],
	fg: [],
	table: false,
	add: function(a, d, b, c) {
		this.fg.push(new SG(this.table, a, d, b, c));
		return this
	},
	about: function(a) {
		this.table = a;
		return this
	},
	bind: function(b, h) {
		var g = b.split(",");
		var e = h.split(",");
		var f = this;
		for(var d = 0; d < g.length; d++) {
			var a = document.getElementById(g[d]);
			(function(j) {
				document.getElementById(g[j]).onclick = function() {
					for(var i = 0; i < f.fg.length; i++) {
						f.fg[i].show(e[j], this.checked)
					}
					oDFZ.onChange && oDFZ.onChange(e[j])
				}
			})(d);
			if(ESUNChart.ini.initShow.indexOf(String(a.id)) != -1) {
				a.checked = true;
				for(var c = 0; c < f.fg.length; c++) {
					f.fg[c].show(e[d], true)
				}
			}
		}
		return this
	},
	showDefault: function(b) {
		for(var a = 0; a < this.fg.length; a++) {
			this.fg[a].show(b, true)
		}
	}
};
JoinLine = function(a, b) {
	this.color = a || "#000000";
	this.size = 1;
	this.lines = [];
	this.tmpDom = null;
	this.visible = true
};
JoinLine.prototype = {
	show: function(b) {
		for(var a = 0; a < this.lines.length; a++) {
			this.lines[a].style.visibility = b ? "visible" : "hidden"
		}
	},
	remove: function() {
		for(var a = 0; a < this.lines.length; a++) {
			this.lines[a].parentNode.removeChild(this.lines[a])
		}
		this.lines = []
	},
	join: function(h, f, g) {
		this.remove();
		this.visible = f ? "visible" : "hidden";
		this.tmpDom = document.createDocumentFragment();
		for(var e = 0; e < h.length - 1; e++) {
			var d = this.pos(h[e]);
			var c = this.pos(h[e + 1]);
			if(g && g(d, c) === false) {
				continue
			}
			if(document.all) {
				this.IELine(d.x, d.y, c.x, c.y)
			} else {
				this.FFLine(d.x, d.y, c.x, c.y)
			}
		}
		document.body.appendChild(this.tmpDom)
	},
	pos: function(c) {
		var d = {
				x: 0,
				y: 0
			},
			b = c;
		for(; b; b = b.offsetParent) {
			d.x += b.offsetLeft;
			d.y += b.offsetTop
		}
		d.x += parseInt(c.offsetWidth / 2);
		d.y += parseInt(c.offsetHeight / 2);
		return d
	},
	_oldDot: function(a, e, c, d) {
		var b = document.createElement("DIV");
		b.style.cssText = "position: absolute; left: " + a + "px; top: " + e + "px;background: " + c + ";width:" + d + "px;height:" + d + "px;font-size:1px;overflow:hidden";
		b.style.visibility = this.visible;
		this.lines.push(this.tmpDom.appendChild(b))
	},
	_oldLine: function(c, g, b, f) {
		var a = Math.floor(Math.sqrt((b - c) * (b - c) + (f - g) * (f - g)));
		var d = Math.atan((b - c) / (f - g));
		if(((f - g) < 0 && (b - c) > 0) || ((f - g) < 0 && (b - c) < 0)) {
			d = Math.PI + d
		}
		var j = Math.sin(d),
			h = Math.cos(d),
			e = 0;
		do {
			this.FFDot(c + e * j, g + e * h, this.color, this.size)
		} while (e++ < a)
	},
	FFLine: function(c, g, b, f) {
		var h = this.nPos(c, g, b, f, JoinLine.indent);
		c = h[0];
		g = h[1];
		b = h[2];
		f = h[3];
		var d = document.createElement("canvas");
		d.style.position = "absolute";
		d.style.visibility = this.visible;
		d.width = Math.abs(c - b) || this.size;
		d.height = Math.abs(g - f);
		var i = Math.min(g, f);
		var a = Math.min(c, b);
		d.style.top = i + "px";
		d.style.left = a + "px";
		var e = d.getContext("2d");
		e.save();
		e.strokeStyle = this.color;
		e.lineWidth = this.size;
		e.beginPath();
		e.moveTo(c - a, g - i);
		e.lineTo(b - a, f - i);
		e.closePath();
		e.stroke();
		e.restore();
		this.lines.push(d);
		this.tmpDom.appendChild(d)
	},
	IELine: function(c, f, b, d) {
		if(Math.abs(f - d) < (JoinLine.indent * 2) && c == b) {
			return
		}
		try {
			var h = this.nPos(c, f, b, d, JoinLine.indent);
			c = h[0];
			f = h[1];
			b = h[2];
			d = h[3];
			var a = document.createElement("esun:line");
			this.lines.push(a);
			this.tmpDom.appendChild(a);
			a.style.cssText = "z-index:99;position:absolute;left:0;top:0";
			a.style.behavior = "url(#default#VML)";
			a.style.visibility = this.visible;
			a.from = c + "," + f;
			a.to = b + "," + d;
			a.strokeColor = this.color;
			a.strokeWeight = this.size + "px";
			a.coordOrigin = "0,0"
		} catch(g) {}
	},
	nPos: function(g, o, f, m, e) {
		var p = g - f,
			n = o - m;
		var k = Math.round(Math.sqrt(Math.pow(p, 2) + Math.pow(n, 2)));
		var d, j, q, h;
		var l = Math.round((p * e) / k);
		var i = Math.round((n * e) / k);
		return [f + l, m + i, g - l, o - i]
	}
};
JoinLine.indent = 8;
LG = function(r, o, m, b, p, h) {
	var n = {
		x: o || 0,
		y: m || 0,
		w: b || 0,
		oh: p || 0
	};
	var g = document.getElementById(r).rows;
	var c = n.y < 0 ? (g.length + n.y) : n.y;
	var a = g.length - n.oh;
	var l = n.x < 0 ? (g[c].cells.length + n.x) : n.x;
	var q = l + n.w;
	if(q > g[c].cells.length) {
		q = g[c].cells.length
	}
	if(n.w == 0) {
		q = g[c].cells.length
	}
	this.g = [];
	for(var f = c; f < a; f++) {
		var k = g[f].cells;
		for(var e = l; e < q; e++) {
			var d = k[e];
			if(d) {
				if(h(d, e, f) === true) {
					this.g.push(d)
				}
			}
		}
	}
	if(LG.autoDraw) {
		this.draw()
	}
};
LG.color = "#E4A8A8";
LG.size = 2;
LG.autoDraw = true;
LG.isShow = true;
LG.filter = function() {};
LG.prototype = {
	draw: function(a, b, c) {
		this.line = new JoinLine(a || LG.color, b || LG.size);
		if(!c) {
			c = LG.filter
		}
		this.line.join(this.g, LG.isShow, c)
	},
	clear: function() {
		this.line.remove()
	},
	show: function(a) {
		this.line.show(a)
	}
};
oZXZ = {
	vg: [],
	lg: [],
	_vg: [],
	_lg: [],
	table: false,
	check: function(a) {
		return /^(chartBall|cbg)/i.test(a.className)
	},
	on_off: true,
	_on: true,
	novl: false,
	bind: function(b, a) {
		this.table = b;
		this.on_off = a;
		return this
	},
	color: function(a) {
		LG.color = a;
		return this
	},
	newCheck: function(a) {
		this.check = a;
		return this
	},
	draw: function(d) {
		if(!this.table) {
			return
		}
		if(d) {
			var c = this.vg.length;
			for(var a = 0; a < c; a++) {
				var b = this.vg[a];
				LG.color = b.color;
				JoinLine.indent = b.indent;
				this.novl = b.novl;
				if(this.novl) {
					LG.filter = function(g, f) {
						return !(g.x == f.x)
					}
				}
				this.lg.push(new LG(this.table, b[0], b[1], b[2], b[3], this.check))
			}
		}
		if(this.on_off) {
			var e = this;
			obj = document.getElementById(this.on_off);
			if(obj) {
				obj.onclick = function() {
					var f = e._on ? this.checked : !this.checked;
					e.show(f)
				}
			}
		}
		this._vg = this._vg.concat(this.vg);
		this.vg = [];
		this._lg = this._lg.concat(this.lg);
		this.lg = [];
		return this
	},
	show: function(c) {
		if(this._lg.length == 0) {
			this.redraw()
		}
		var b = this._lg.length;
		for(var a = 0; a < b; a++) {
			this._lg[a].show(c)
		}
	},
	add: function(a, d, b, c) {
		this.vg.push([a, d, b, c]);
		this.vg[this.vg.length - 1].color = LG.color;
		this.vg[this.vg.length - 1].indent = JoinLine.indent;
		this.vg[this.vg.length - 1].novl = this.novl;
		return this
	},
	clear: function() {
		for(var a = 0; a < this._lg.length; a++) {
			this._lg[a].clear()
		}
		return this
	},
	redraw: function() {
		this.clear();
		this.vg = this.vg.concat(this._vg);
		this._vg = [];
		this.draw(true)
	},
	newCheck: function(a) {
		this.check = a;
		return this
	},
	setvl: function(a) {
		this.novl = a;
		return this
	},
	indent: function(a) {
		JoinLine.indent = a;
		return this
	}
};
oYL = {
	oSG: [],
	table: false,
	check: function(c, a, b) {
		if(c && c.className.indexOf("yl0") != -1) {
			this.gYL.push(c);
			c._bgColor = ESUNChart.CSS(c, "backgroundColor");
			if(c._bgColor == "transparent") {
				c._bgColor = "#F3F2F2"
			}
			c._color = ESUNChart.CSS(c, "color");
			c.value = c.innerHTML
		}
		return false
	},
	on_off: false,
	bind: function(b, a) {
		this.table = b;
		this.on_off = a;
		return this
	},
	newCheck: function(a) {
		this.check = a;
		return this
	},
	add: function(a, d, b, c) {
		this.oSG.push(new SG(this.table, a, d, b, c, this.check));
		(function(e, f) {
			document.getElementById(e).onclick = function() {
				for(var g = 0; g < f.length; g++) {
					f[g].show("gYL", this.checked)
				}
			}
		})(this.on_off, this.oSG);
		return this
	}
};
oPV = {
	oSG: false,
	table: false,
	offset: 0,
	map: [],
	css: "chartBall01",
	check: function(d, a, c) {
		d.number = a - oPV.offset;
		var b = d.number;
		if(oPV.wxCss) {
			oPV.css = oPV.wxCss[b]
		}
		if(ESUNChart.ini.map.length > 0) {
			d.number = ESUNChart.ini.map[d.number]
		}
		this.addClick(d, oPV.css);
		return false
	},
	setMap: function(a) {
		ESUNChart.ini.map = a || [];
		return this
	},
	bind: function(a) {
		this.table = a;
		return this
	},
	add: function(a, e, b, d, c) {
		this.offset = c || 0;
		this.oSG = new SG(this.table, a, e, b, d, this.check);
		return this
	},
	newCSS: function(a) {
		this.css = a;
		return this
	}
};
BSort = function(e, b, a, d, c) {
	this.map = [];
	this.w = 0;
	this.h = 0;
	this.newSort = [];
	this.init(e, b, a, d, c)
};
BSort.prototype = {
	init: function(r, n, l, b, o) {
		var m = {
			x: n || 0,
			y: l || 0,
			w: b || 0,
			oh: o || 0
		};
		var g = document.getElementById(r).rows;
		var c = m.y < 0 ? (g.length + m.y) : m.y;
		var a = g.length - m.oh;
		var k = m.x < 0 ? (g[c].cells.length + m.x) : m.x;
		var q = k + m.w;
		if(q > g[c].cells.length - 1) {
			q = g[c].cells.length - 1
		}
		if(m.w == 0) {
			q = g[c].cells.length
		}
		var n = l = 0;
		for(var f = c; f < a; f++) {
			var h = g[f].cells;
			this.map[l] = [];
			n = 0;
			for(var e = k; e <= q; e++) {
				if(!h[e]) {
					continue
				}
				this.map[l][n] = h[e];
				h[e].index = n++
			}
			l++
		}
		this.w = n;
		this.h = l;
		var s = [];
		for(var f = 0; f < this.w; f++) {
			s.push(this.map[this.h - 1][f])
		}
		s.sort(function(j, i) {
			if(j.className.indexOf("chartBall") != -1) {
				return -1
			}
			if(i.className.indexOf("chartBall") != -1) {
				return -1
			}
			return parseInt(j.innerHTML) > parseInt(i.innerHTML) ? -1 : 1
		});
		var p = [],
			d = [];
		for(var f = 0; f < s.length; f++) {
			if(s[f].className.indexOf("chartBall") == -1) {
				p.push(s[f])
			} else {
				d.push(s[f])
			}
		}
		p = p.concat(d);
		for(var f = 0; f < p.length; f++) {
			this.newSort.push(p[f].index)
		}
	},
	sort: function(e) {
		var c = e ? this.newSort : [];
		for(var b = 0; b < this.h; b++) {
			this.map.lastCell = this.map[b][this.w - 1];
			for(var a = 0; a < this.w; a++) {
				var f = this.map[b][a];
				var d = c.length > 0 ? c[a] : a;
				this.map.lastCell = ESUNChart.insertAfter(this.map[b][d], this.map.lastCell)
			}
		}
	}
};
yl_Histogram = {
	list: [],
	ini: {
		table: null,
		checkBox: null,
		expect: 0,
		sort: 0,
		left: 1,
		right: 0,
		beginLine: 3,
		defaultShow: false
	},
	bind: function(b) {
		for(var a in b || {}) {
			this.ini[a] = b[a]
		}
		var c = document.getElementById(this.ini.checkBox);
		if(c) {
			this.ini.defaultShow = !!c.checked;
			c.onclick = function() {
				yl_Histogram.hide(!this.checked)
			}
		}
		this.show(this.ini)
	},
	show: function(b) {
		if(!b) {
			return this.hide(false)
		}
		if(!b.expect) {
			return
		}
		this.Map = document.getElementById(b.table);
		var a = b.beginLine;
		for(var c = 0; c < this.Map.rows.length; c++) {
			if(this.Map.rows[c].cells[0].innerHTML == b.expect) {
				a = c;
				break
			}
		}
		cells = this.Map.rows[a].cells;
		for(var c = b.left; c < cells.length - b.right; c++) {
			if(cells[c].className.indexOf("yl") != -1) {
				this.setColor(cells[c], b.sort || -1)
			}
		}
	},
	hide: function(b) {
		for(var a = 0; a < this.list.length; a++) {
			var c = this.list[a];
			c.className = b === false ? c.newClass : c.oldClass
		}
	},
	getVCell: function(d, a, b) {
		try {
			var c = d.rows[a.parentNode.rowIndex + b].cells[a.cellIndex];
			if(undefined == c) {
				return this.getVCell(d, a, b * 2)
			}
			return d.rows[a.parentNode.rowIndex + b].cells[a.cellIndex]
		} catch(f) {
			return null
		}
	},
	getClassName: function(a) {
		var b = parseInt(a.innerHTML);
		if(b > 10) {
			return " cbg7"
		}
		if(b > 5) {
			return " cbg6"
		}
		return " cbg5"
	},
	setColor: function(a, b) {
		var d = this.getClassName(a),
			c = a;
		try {
			do {
				if(c.innerHTML != "") {
					c.oldClass = c.className;
					c.newClass = c.oldClass + d;
					if(this.ini.defaultShow) {
						c.className = c.newClass
					}
				}
				this.list.push(c);
				c = this.getVCell(this.Map, c, b)
			} while (!/chartBall/i.test(c.className) && (/yl|tdbck/.test(c.className)))
		} catch(f) {}
	}
};
SplitLine = {
	bind: function(a) {}
};
userLine = {
	stop: true,
	color: "red",
	init: function(checkBox, colorList) {
		this.draw = this[
			/*@cc_on 'IE'||@*/
			"FF"];
		this.lines = [];
		var Canvas = document.body;
		if(colorList) {
			this.colorList = document.getElementById(colorList);
			this.colorList.onmousedown = function(e) {
				e = e || event;
				if(
					/*@cc_on !@*/
					0) {
					this.setCapture();
					e.cancelBubble = true;
					e.returnValue = false
				} else {
					e.preventDefault();
					e.stopPropagation()
				}
			}
		}
		Canvas.onmousedown = function() {
			if(userLine.stop) {
				return
			}
			userLine.begin = true;
			this.style.cursor = "crosshair";
			var d = document.body,
				oX = d.scrollLeft,
				oY = Math.max(d.scrollTop, document.documentElement.scrollTop);
			userLine.x = event.clientX + oX;
			userLine.y = event.clientY + oY
		};
		Canvas.onmouseup = function() {
			userLine.Line = userLine.begin = false;
			if(
				/*@cc_on !@*/
				0) {
				this.onlosecapture = null;
				this.releaseCapture()
			} else {
				window.onblur = null
			}
			this.style.cursor = ""
		};
		Canvas.onmousemove = function(e) {
			if(!userLine.begin) {
				return
			}
			var d = document.body,
				oX = d.scrollLeft,
				oY = Math.max(d.scrollTop, document.documentElement.scrollTop);
			var x = event.clientX + oX;
			var y = event.clientY + oY;
			if(!userLine.Line) {
				userLine.draw(userLine.x, userLine.y, x, y)
			}
			e = e || event;
			userLine.Line.to = x + "px," + y + "px";
			if(
				/*@cc_on !@*/
				false) {
				this.setCapture();
				e.cancelBubble = true;
				e.returnValue = false
			} else {
				e.preventDefault();
				e.stopPropagation()
			}
			window.getSelection && window.getSelection().removeAllRanges()
		};
		Canvas.ondblclick = function() {
			event.ctrlKey ? userLine.clear() : userLine.back();
			userLine.stop = false
		}
	},
	IE: function(x1, y1, x2, y2) {
		var D = document,
			Line = D.body.appendChild(D.createElement('<esun:line style="z-index:99;position:absolute;left:0;top:0"><esun:Stroke dashstyle="shortdot" endarrow="classic" /></esun:line>'));
		with(this.Line = Line) {
			from = x1 + "," + y1;
			to = x2 + "," + y2;
			strokeColor = this.color;
			strokeWeight = 2
		}
		this.lines.push(Line)
	},
	FF: function() {},
	clear: function() {
		for(var a = 0; a < this.lines.length; a++) {
			this.lines[a].parentNode.removeChild(this.lines[a])
		}
	},
	back: function() {
		var a = this.lines.pop();
		if(a != undefined) {
			a.parentNode.removeChild(a)
		}
	}
};
if(window.attachEvent) {
	window.attachEvent("onload", function() {
		userLine.init()
	});
	document.attachEvent("onkeyup", function() {
		var a = event.keyCode;
		if(a < 49 || a > 56) {
			return
		}
		userLine.color = ["#FF0000", "#FF6600", "#BD5151", "#499495", "#91ABE1", "#1C74AA", "#FF00FF", "#666666"][a - 49]
	})
}
ESUNChart.init = function() {
	var b = document.getElementsByTagName("INPUT");
	for(var c = 0; c < b.length; c++) {
		var d = b[c];
		if(d.type.toLowerCase() == "checkbox") {
			d.checked = false
		}
	}
	if(!ESUNChart.ini.default_has_line) {
		return
	}
	var a = document.getElementById("has_line");
	if(!a) {
		return
	}
	a.checked = "checked"
};
