// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     1.1.3
// @match       https://*.youtube.com/*
// @match       https://*.crunchyroll.com/*
// @match       https://animixplay.to/*
// @match       https://*.funimation.com/*
// @grant       none
// ==/UserScript==
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f;
  var e = {};
  var c = [];
  var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function a(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function h(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function v(l4, u4, i4) {
    var t6, o5, r4, f4 = {};
    for (r4 in u4)
      r4 == "key" ? t6 = u4[r4] : r4 == "ref" ? o5 = u4[r4] : f4[r4] = u4[r4];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), typeof l4 == "function" && l4.defaultProps != null)
      for (r4 in l4.defaultProps)
        f4[r4] === void 0 && (f4[r4] = l4.defaultProps[r4]);
    return y(l4, f4, t6, o5, null);
  }
  function y(n3, i4, t6, o5, r4) {
    var f4 = { type: n3, props: i4, key: t6, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r4 == null ? ++u : r4 };
    return r4 == null && l.vnode != null && l.vnode(f4), f4;
  }
  function d(n3) {
    return n3.children;
  }
  function _(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function k(n3, l4) {
    if (l4 == null)
      return n3.__ ? k(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if ((u4 = n3.__k[l4]) != null && u4.__e != null)
        return u4.__e;
    return typeof n3.type == "function" ? k(n3) : null;
  }
  function b(n3) {
    var l4, u4;
    if ((n3 = n3.__) != null && n3.__c != null) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if ((u4 = n3.__k[l4]) != null && u4.__e != null) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return b(n3);
    }
  }
  function m(n3) {
    (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
  }
  function g() {
    for (var n3; g.__r = t.length; )
      n3 = t.sort(function(n4, l4) {
        return n4.__v.__b - l4.__v.__b;
      }), t = [], n3.some(function(n4) {
        var l4, u4, i4, t6, o5, r4;
        n4.__d && (o5 = (t6 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = a({}, t6)).__v = t6.__v + 1, j(r4, t6, i4, l4.__n, r4.ownerSVGElement !== void 0, t6.__h != null ? [o5] : null, u4, o5 == null ? k(t6) : o5, t6.__h), z(u4, t6), t6.__e != o5 && b(t6)));
      });
  }
  function w(n3, l4, u4, i4, t6, o5, r4, f4, s3, a4) {
    var h4, v3, p3, _3, b3, m4, g4, w3 = i4 && i4.__k || c, A2 = w3.length;
    for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
      if ((_3 = u4.__k[h4] = (_3 = l4[h4]) == null || typeof _3 == "boolean" ? null : typeof _3 == "string" || typeof _3 == "number" || typeof _3 == "bigint" ? y(null, _3, null, null, _3) : Array.isArray(_3) ? y(d, { children: _3 }, null, null, null) : _3.__b > 0 ? y(_3.type, _3.props, _3.key, null, _3.__v) : _3) != null) {
        if (_3.__ = u4, _3.__b = u4.__b + 1, (p3 = w3[h4]) === null || p3 && _3.key == p3.key && _3.type === p3.type)
          w3[h4] = void 0;
        else
          for (v3 = 0; v3 < A2; v3++) {
            if ((p3 = w3[v3]) && _3.key == p3.key && _3.type === p3.type) {
              w3[v3] = void 0;
              break;
            }
            p3 = null;
          }
        j(n3, _3, p3 = p3 || e, t6, o5, r4, f4, s3, a4), b3 = _3.__e, (v3 = _3.ref) && p3.ref != v3 && (g4 || (g4 = []), p3.ref && g4.push(p3.ref, null, _3), g4.push(v3, _3.__c || b3, _3)), b3 != null ? (m4 == null && (m4 = b3), typeof _3.type == "function" && _3.__k === p3.__k ? _3.__d = s3 = x(_3, s3, n3) : s3 = P(n3, _3, p3, w3, b3, s3), typeof u4.type == "function" && (u4.__d = s3)) : s3 && p3.__e == s3 && s3.parentNode != n3 && (s3 = k(p3));
      }
    for (u4.__e = m4, h4 = A2; h4--; )
      w3[h4] != null && (typeof u4.type == "function" && w3[h4].__e != null && w3[h4].__e == u4.__d && (u4.__d = k(i4, h4 + 1)), N(w3[h4], w3[h4]));
    if (g4)
      for (h4 = 0; h4 < g4.length; h4++)
        M(g4[h4], g4[++h4], g4[++h4]);
  }
  function x(n3, l4, u4) {
    for (var i4, t6 = n3.__k, o5 = 0; t6 && o5 < t6.length; o5++)
      (i4 = t6[o5]) && (i4.__ = n3, l4 = typeof i4.type == "function" ? x(i4, l4, u4) : P(u4, i4, i4, t6, i4.__e, l4));
    return l4;
  }
  function P(n3, l4, u4, i4, t6, o5) {
    var r4, f4, e6;
    if (l4.__d !== void 0)
      r4 = l4.__d, l4.__d = void 0;
    else if (u4 == null || t6 != o5 || t6.parentNode == null)
      n:
        if (o5 == null || o5.parentNode !== n3)
          n3.appendChild(t6), r4 = null;
        else {
          for (f4 = o5, e6 = 0; (f4 = f4.nextSibling) && e6 < i4.length; e6 += 2)
            if (f4 == t6)
              break n;
          n3.insertBefore(t6, o5), r4 = o5;
        }
    return r4 !== void 0 ? r4 : t6.nextSibling;
  }
  function C(n3, l4, u4, i4, t6) {
    var o5;
    for (o5 in u4)
      o5 === "children" || o5 === "key" || o5 in l4 || H(n3, o5, null, u4[o5], i4);
    for (o5 in l4)
      t6 && typeof l4[o5] != "function" || o5 === "children" || o5 === "key" || o5 === "value" || o5 === "checked" || u4[o5] === l4[o5] || H(n3, o5, l4[o5], u4[o5], i4);
  }
  function $(n3, l4, u4) {
    l4[0] === "-" ? n3.setProperty(l4, u4) : n3[l4] = u4 == null ? "" : typeof u4 != "number" || s.test(l4) ? u4 : u4 + "px";
  }
  function H(n3, l4, u4, i4, t6) {
    var o5;
    n:
      if (l4 === "style")
        if (typeof u4 == "string")
          n3.style.cssText = u4;
        else {
          if (typeof i4 == "string" && (n3.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || $(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
        }
      else if (l4[0] === "o" && l4[1] === "n")
        o5 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o5] = u4, u4 ? i4 || n3.addEventListener(l4, o5 ? T : I, o5) : n3.removeEventListener(l4, o5 ? T : I, o5);
      else if (l4 !== "dangerouslySetInnerHTML") {
        if (t6)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (l4 !== "href" && l4 !== "list" && l4 !== "form" && l4 !== "tabIndex" && l4 !== "download" && l4 in n3)
          try {
            n3[l4] = u4 == null ? "" : u4;
            break n;
          } catch (n4) {
          }
        typeof u4 == "function" || (u4 != null && (u4 !== false || l4[0] === "a" && l4[1] === "r") ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
      }
  }
  function I(n3) {
    this.l[n3.type + false](l.event ? l.event(n3) : n3);
  }
  function T(n3) {
    this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function j(n3, u4, i4, t6, o5, r4, f4, e6, c4) {
    var s3, h4, v3, y4, p3, k3, b3, m4, g4, x3, A2, P2 = u4.type;
    if (u4.constructor !== void 0)
      return null;
    i4.__h != null && (c4 = i4.__h, e6 = u4.__e = i4.__e, u4.__h = null, r4 = [e6]), (s3 = l.__b) && s3(u4);
    try {
      n:
        if (typeof P2 == "function") {
          if (m4 = u4.props, g4 = (s3 = P2.contextType) && t6[s3.__c], x3 = s3 ? g4 ? g4.props.value : s3.__ : t6, i4.__c ? b3 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in P2 && P2.prototype.render ? u4.__c = h4 = new P2(m4, x3) : (u4.__c = h4 = new _(m4, x3), h4.constructor = P2, h4.render = O), g4 && g4.sub(h4), h4.props = m4, h4.state || (h4.state = {}), h4.context = x3, h4.__n = t6, v3 = h4.__d = true, h4.__h = []), h4.__s == null && (h4.__s = h4.state), P2.getDerivedStateFromProps != null && (h4.__s == h4.state && (h4.__s = a({}, h4.__s)), a(h4.__s, P2.getDerivedStateFromProps(m4, h4.__s))), y4 = h4.props, p3 = h4.state, v3)
            P2.getDerivedStateFromProps == null && h4.componentWillMount != null && h4.componentWillMount(), h4.componentDidMount != null && h4.__h.push(h4.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && m4 !== y4 && h4.componentWillReceiveProps != null && h4.componentWillReceiveProps(m4, x3), !h4.__e && h4.shouldComponentUpdate != null && h4.shouldComponentUpdate(m4, h4.__s, x3) === false || u4.__v === i4.__v) {
              h4.props = m4, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), h4.__h.length && f4.push(h4);
              break n;
            }
            h4.componentWillUpdate != null && h4.componentWillUpdate(m4, h4.__s, x3), h4.componentDidUpdate != null && h4.__h.push(function() {
              h4.componentDidUpdate(y4, p3, k3);
            });
          }
          h4.context = x3, h4.props = m4, h4.state = h4.__s, (s3 = l.__r) && s3(u4), h4.__d = false, h4.__v = u4, h4.__P = n3, s3 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s, h4.getChildContext != null && (t6 = a(a({}, t6), h4.getChildContext())), v3 || h4.getSnapshotBeforeUpdate == null || (k3 = h4.getSnapshotBeforeUpdate(y4, p3)), A2 = s3 != null && s3.type === d && s3.key == null ? s3.props.children : s3, w(n3, Array.isArray(A2) ? A2 : [A2], u4, i4, t6, o5, r4, f4, e6, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b3 && (h4.__E = h4.__ = null), h4.__e = false;
        } else
          r4 == null && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t6, o5, r4, f4, c4);
      (s3 = l.diffed) && s3(u4);
    } catch (n4) {
      u4.__v = null, (c4 || r4 != null) && (u4.__e = e6, u4.__h = !!c4, r4[r4.indexOf(e6)] = null), l.__e(n4, u4, i4);
    }
  }
  function z(n3, u4) {
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function L(l4, u4, i4, t6, o5, r4, f4, c4) {
    var s3, a4, v3, y4 = i4.props, p3 = u4.props, d4 = u4.type, _3 = 0;
    if (d4 === "svg" && (o5 = true), r4 != null) {
      for (; _3 < r4.length; _3++)
        if ((s3 = r4[_3]) && "setAttribute" in s3 == !!d4 && (d4 ? s3.localName === d4 : s3.nodeType === 3)) {
          l4 = s3, r4[_3] = null;
          break;
        }
    }
    if (l4 == null) {
      if (d4 === null)
        return document.createTextNode(p3);
      l4 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p3.is && p3), r4 = null, c4 = false;
    }
    if (d4 === null)
      y4 === p3 || c4 && l4.data === p3 || (l4.data = p3);
    else {
      if (r4 = r4 && n.call(l4.childNodes), a4 = (y4 = i4.props || e).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c4) {
        if (r4 != null)
          for (y4 = {}, _3 = 0; _3 < l4.attributes.length; _3++)
            y4[l4.attributes[_3].name] = l4.attributes[_3].value;
        (v3 || a4) && (v3 && (a4 && v3.__html == a4.__html || v3.__html === l4.innerHTML) || (l4.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l4, p3, y4, o5, c4), v3)
        u4.__k = [];
      else if (_3 = u4.props.children, w(l4, Array.isArray(_3) ? _3 : [_3], u4, i4, t6, o5 && d4 !== "foreignObject", r4, f4, r4 ? r4[0] : i4.__k && k(i4, 0), c4), r4 != null)
        for (_3 = r4.length; _3--; )
          r4[_3] != null && h(r4[_3]);
      c4 || ("value" in p3 && (_3 = p3.value) !== void 0 && (_3 !== l4.value || d4 === "progress" && !_3 || d4 === "option" && _3 !== y4.value) && H(l4, "value", _3, y4.value, false), "checked" in p3 && (_3 = p3.checked) !== void 0 && _3 !== l4.checked && H(l4, "checked", _3, y4.checked, false));
    }
    return l4;
  }
  function M(n3, u4, i4) {
    try {
      typeof n3 == "function" ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, i4);
    }
  }
  function N(n3, u4, i4) {
    var t6, o5;
    if (l.unmount && l.unmount(n3), (t6 = n3.ref) && (t6.current && t6.current !== n3.__e || M(t6, null, u4)), (t6 = n3.__c) != null) {
      if (t6.componentWillUnmount)
        try {
          t6.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      t6.base = t6.__P = null;
    }
    if (t6 = n3.__k)
      for (o5 = 0; o5 < t6.length; o5++)
        t6[o5] && N(t6[o5], u4, typeof n3.type != "function");
    i4 || n3.__e == null || h(n3.__e), n3.__e = n3.__d = void 0;
  }
  function O(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function S(u4, i4, t6) {
    var o5, r4, f4;
    l.__ && l.__(u4, i4), r4 = (o5 = typeof t6 == "function") ? null : t6 && t6.__k || i4.__k, f4 = [], j(i4, u4 = (!o5 && t6 || i4).__k = v(d, null, [u4]), r4 || e, e, i4.ownerSVGElement !== void 0, !o5 && t6 ? [t6] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f4, !o5 && t6 ? t6 : r4 ? r4.__e : i4.firstChild, o5), z(f4, u4);
  }
  n = c.slice, l = { __e: function(n3, l4, u4, i4) {
    for (var t6, o5, r4; l4 = l4.__; )
      if ((t6 = l4.__c) && !t6.__)
        try {
          if ((o5 = t6.constructor) && o5.getDerivedStateFromError != null && (t6.setState(o5.getDerivedStateFromError(n3)), r4 = t6.__d), t6.componentDidCatch != null && (t6.componentDidCatch(n3, i4 || {}), r4 = t6.__d), r4)
            return t6.__E = t6;
        } catch (l5) {
          n3 = l5;
        }
    throw n3;
  } }, u = 0, i = function(n3) {
    return n3 != null && n3.constructor === void 0;
  }, _.prototype.setState = function(n3, l4) {
    var u4;
    u4 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n3 == "function" && (n3 = n3(a({}, u4), this.props)), n3 && a(u4, n3), n3 != null && this.__v && (l4 && this.__h.push(l4), m(this));
  }, _.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), m(this));
  }, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

  // node_modules/zaftig/dist/zaftig.min.js
  var { isArray: t2 } = Array;
  var { hasOwnProperty: r2, getPrototypeOf: e2 } = Object;
  var n2 = (...t6) => console.error("zaftig:", ...t6);
  var o2 = (t6, r4 = {}) => (e6) => e6 in r4 ? r4[e6] : r4[e6] = t6(e6);
  var i2 = document.documentMode || /Edge\//.test(navigator.userAgent) ? "ms" : navigator.vendor ? "webkit" : "moz";
  var s2 = (t6) => r2.call(t6, "width") ? t6 : s2(e2(t6));
  var c2 = Object.keys(s2(document.documentElement.style)).filter((t6) => t6.indexOf("-") < 0 && t6 != "length");
  var a2 = {};
  var u2 = {};
  c2.concat(["backgroundColor", "borderBottom", "borderRadius", "bottom", "boxShadow", "color", "display", "flexDirection", "float", "fontFamily", "fontSize", "height", "margin", "marginTop", "marginBottom", "opacity", "padding", "paddingBottom", "right", "textAlign", "textDecoration", "top", "whiteSpace", "width"].filter((t6) => c2.indexOf(t6) >= 0)).forEach((t6) => {
    let r4 = t6.replace(/[A-Z]/g, (t7) => "-" + t7.toLowerCase());
    let e6 = (n3 = t6)[0] + n3.slice(1).replace(/[a-z]/g, "").toLowerCase();
    var n3;
    t6.toLowerCase().indexOf(i2) == 0 ? (e6 = e6.slice(1), r4 = r4[0] == "-" ? r4 : "-" + r4, u2[e6] || (u2[e6] = r4)) : u2[e6] = r4, a2[r4] = true;
  });
  var d2 = document.createElement("div");
  var l2 = o2((t6) => ["0", "0 0"].some((r4) => (d2.style.cssText = `${t6}: ${r4};`, d2.style.cssText.slice(-3) == "px;")), { flex: false, border: true, "border-left": true, "border-right": true, "border-top": true, "border-bottom": true });
  var f2 = /\s*,\s*/;
  var g2 = (t6, r4) => t6 && r4 ? `
${t6} {
${r4}}
` : "";
  var m2 = (r4) => function(e6, ...o5) {
    try {
      return t2(e6) ? r4.call(this, ((t6, r5) => t6.reduce((t7, e7, n3) => t7 + e7 + (r5[n3] == null ? "" : String(r5[n3])), ""))(e6, o5)) : r4.call(this, e6);
    } catch (t6) {
      return n2("error `", e6, "`", o5, "\n", t6), "";
    }
  };
  var h2 = () => document.head.appendChild(document.createElement("style"));
  var p;
  var $2 = (t6, r4 = "") => {
    try {
      p && p.sheet || (p = h2()), p.sheet.insertRule(`${t6}{${r4}}`, 0);
      const e6 = r4 && p.sheet.cssRules[0].cssText.replace(/\s/g, "");
      return p.sheet.deleteRule(0), !e6 || e6.length > t6.length + 2;
    } catch (t7) {
      return false;
    }
  };
  var y2 = (t6 = {}) => {
    const { helpers: r4 = {}, unit: e6 = "px", id: s3 = "z" + Math.random().toString(36).slice(2) } = t6;
    let { style: c4, dot: d4 = true, debug: p3 = false } = t6, b3 = 0;
    class v3 {
      constructor(t7) {
        this.class = t7, this.className = t7;
      }
      toString() {
        return this.class;
      }
      valueOf() {
        return d4 ? "." + this.class : this.class;
      }
      z(...t7) {
        return this.concat(B(...t7));
      }
      concat(...t7) {
        return z2(this.class, ...t7);
      }
    }
    const z2 = (...t7) => {
      const r5 = [];
      return t7.forEach((t8) => {
        t8 && (typeof t8 == "string" ? r5.push(t8) : t8.className && r5.push(t8.className));
      }), new v3(r5.join(" "));
    }, w3 = (t7, r5, e7) => {
      const o5 = g2(e7 ? ((t8) => t8.replace(/(::?)([a-z-]+)(\()?/gi, (t9, r6, e8, n3) => (e8 == "placeholder" && i2 != "moz" ? e8 = "input-" + e8 : e8 == "matches" && (e8 = "any"), e8[0] == "-" || $2(n3 ? t9 + ".f)" : t9) ? t9 : `${r6}-${i2}-${e8}${n3 || ""}`)))(t7) : t7, r5);
      if (o5) {
        c4 || (c4 = h2(), c4.id = s3);
        try {
          c4.sheet.insertRule(o5, c4.sheet.cssRules.length), p3 && (c4.textContent += o5);
        } catch (o6) {
          !e7 && t7.indexOf(":") >= 0 ? w3(t7, r5, true) : n2("insert failed", t7, r5, o6);
        }
      }
    }, x3 = (t7) => t7.replace(/^/gm, "  ") + "\n", O2 = (t7, r5, e7 = "", o5) => {
      if (!t7)
        return p3 && n2("missing selector", r5);
      if (/^@(media|keyframes|supports)/.test(t7))
        return ((t8, r6, e8, n3) => {
          r6.t = g2(e8 == "" ? ":root" : e8, r6.t), r6.o.forEach((t9) => O2(t9.i, t9, e8, r6)), n3 ? n3.t += g2(t8, x3(r6.t)) : w3(t8, x3(r6.t));
        })(t7, r5, e7, o5);
      !e7 || o5 && ((t8) => t8 && t8.indexOf("@keyframes") == 0)(o5.i) || (t7 = ((t8, r6) => r6.split(f2).reduce((r7, e8) => r7.concat(t8.split(f2).map((t9) => t9.indexOf("&") >= 0 ? t9.replace(/&/g, e8) : e8 + (t9[0] == ":" || t9[0] == "[" ? "" : " ") + t9)), []).join(",\n"))(t7, e7)), o5 ? o5.t += g2(t7, r5.t) : w3(t7, r5.t);
      const i4 = t7 == ":root" ? "" : t7;
      r5.o.forEach((t8) => O2(t8.i, t8, i4, o5));
    }, k3 = (t7, e7) => {
      const n3 = r4[t7];
      return typeof n3 == "function" ? n3(...e7 ? e7.split(" ") : []) : n3 && n3 + " " + e7;
    }, S2 = (t7, r5, o5) => {
      if (o5 && !r5 && (r5 = o5, o5 = ""), !r5)
        return;
      if (r5[0] == "$") {
        if (r5 == "$name")
          return t7.u = o5;
        if (r5 == "$compose")
          return t7.l = o5;
        r5 = "--" + r5.slice(1);
      }
      const c5 = k3(r5, o5);
      if (c5) {
        const r6 = _3(c5);
        return t7.t += r6.t, void (t7.o = t7.o.concat(r6.o));
      }
      if (!o5)
        return p3 && n2("no value for", r5);
      if (r5 = u2[r5] || r5, !a2[r5]) {
        const t8 = `-${i2}-${r5}`;
        a2[t8] && (r5 = t8);
      }
      o5.indexOf("$") >= 0 && (o5 = o5.replace(/\$([a-z0-9-]+)/gi, "var(--$1)")), l2(r5) && (o5 = o5.split(" ").map((t8) => isNaN(t8) ? t8 : t8 + e6).join(" "));
      const d5 = `  ${r5}: ${o5};
`;
      p3 && !$2(s3, d5) && n2("invalid css", d5), t7.t += d5;
    }, _3 = o2((t7) => {
      const r5 = [{ t: "", o: [] }];
      if (!(t7 = t7 && t7.trim()))
        return r5[0];
      t7 += ";";
      let e7 = 1, n3 = "", o5 = 0, i4 = "", s4 = "";
      for (let c5 = 0; c5 < t7.length; c5++) {
        const a4 = t7[c5];
        a4 != "\n" && (a4 != ";" && a4 != "}" || i4) ? a4 != "{" || i4 ? e7 == 1 ? a4 == " " ? (s4 = n3.trim()) && (e7 = 2, n3 = "") : n3 += a4 : e7 == 2 && (i4 ? a4 == i4 && t7[c5 - 1] != "\\" && (i4 = "") : a4 != "'" && a4 != '"' || (i4 = a4), n3 += a4) : (r5[++o5] = { i: k3(s4, n3.trim()) || (s4 + " " + n3).trim(), t: "", o: [] }, e7 = 1, s4 = n3 = "") : (S2(r5[o5], s4, n3.trim() + i4), a4 == "}" && r5[--o5].o.push(r5.pop()), e7 = 1, s4 = n3 = i4 = "");
      }
      return r5[0];
    }), A2 = o2((t7) => {
      const r5 = "anim-" + s3 + "-" + (b3 += 1);
      return O2("@keyframes " + r5, _3(t7)), r5;
    }), j3 = o2((t7) => {
      const r5 = _3(t7), e7 = (r5.u ? r5.u + "-" : "") + s3 + "-" + (b3 += 1);
      return O2("." + e7, r5), new v3(e7 + (r5.l ? " " + r5.l : ""));
    }), B = m2(j3);
    return B.anim = m2(A2), B.concat = z2, B.getSheet = () => c4, B.global = m2((t7) => O2(":root", _3(t7))), B.helper = (t7) => Object.assign(r4, t7), B.new = y2, B.setDebug = (t7) => p3 = t7, B.setDot = (t7) => d4 = t7, B.style = m2((t7) => _3(t7).t), B;
  };
  var zaftig_min_default = y2();

  // node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var u3;
  var r3;
  var o3 = 0;
  var i3 = [];
  var c3 = l.__b;
  var f3 = l.__r;
  var e3 = l.diffed;
  var a3 = l.__c;
  var v2 = l.unmount;
  function l3(t6, r4) {
    l.__h && l.__h(u3, t6, o3 || r4), o3 = 0;
    var i4 = u3.__H || (u3.__H = { __: [], __h: [] });
    return t6 >= i4.__.length && i4.__.push({}), i4.__[t6];
  }
  function m3(n3) {
    return o3 = 1, p2(w2, n3);
  }
  function p2(n3, r4, o5) {
    var i4 = l3(t3++, 2);
    return i4.t = n3, i4.__c || (i4.__ = [o5 ? o5(r4) : w2(void 0, r4), function(n4) {
      var t6 = i4.t(i4.__[0], n4);
      i4.__[0] !== t6 && (i4.__ = [t6, i4.__[1]], i4.__c.setState({}));
    }], i4.__c = u3), i4.__;
  }
  function y3(r4, o5) {
    var i4 = l3(t3++, 3);
    !l.__s && k2(i4.__H, o5) && (i4.__ = r4, i4.__H = o5, u3.__H.__h.push(i4));
  }
  function d3(r4, o5) {
    var i4 = l3(t3++, 4);
    !l.__s && k2(i4.__H, o5) && (i4.__ = r4, i4.__H = o5, u3.__h.push(i4));
  }
  function h3(n3) {
    return o3 = 5, _2(function() {
      return { current: n3 };
    }, []);
  }
  function _2(n3, u4) {
    var r4 = l3(t3++, 7);
    return k2(r4.__H, u4) && (r4.__ = n3(), r4.__H = u4, r4.__h = n3), r4.__;
  }
  function A(n3, t6) {
    return o3 = 8, _2(function() {
      return n3;
    }, t6);
  }
  function x2() {
    for (var t6; t6 = i3.shift(); )
      if (t6.__P)
        try {
          t6.__H.__h.forEach(g3), t6.__H.__h.forEach(j2), t6.__H.__h = [];
        } catch (u4) {
          t6.__H.__h = [], l.__e(u4, t6.__v);
        }
  }
  l.__b = function(n3) {
    u3 = null, c3 && c3(n3);
  }, l.__r = function(n3) {
    f3 && f3(n3), t3 = 0;
    var r4 = (u3 = n3.__c).__H;
    r4 && (r4.__h.forEach(g3), r4.__h.forEach(j2), r4.__h = []);
  }, l.diffed = function(t6) {
    e3 && e3(t6);
    var o5 = t6.__c;
    o5 && o5.__H && o5.__H.__h.length && (i3.push(o5) !== 1 && r3 === l.requestAnimationFrame || ((r3 = l.requestAnimationFrame) || function(n3) {
      var t7, u4 = function() {
        clearTimeout(r4), b2 && cancelAnimationFrame(t7), setTimeout(n3);
      }, r4 = setTimeout(u4, 100);
      b2 && (t7 = requestAnimationFrame(u4));
    })(x2)), u3 = null;
  }, l.__c = function(t6, u4) {
    u4.some(function(t7) {
      try {
        t7.__h.forEach(g3), t7.__h = t7.__h.filter(function(n3) {
          return !n3.__ || j2(n3);
        });
      } catch (r4) {
        u4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), u4 = [], l.__e(r4, t7.__v);
      }
    }), a3 && a3(t6, u4);
  }, l.unmount = function(t6) {
    v2 && v2(t6);
    var u4, r4 = t6.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
      try {
        g3(n3);
      } catch (n4) {
        u4 = n4;
      }
    }), u4 && l.__e(u4, r4.__v));
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g3(n3) {
    var t6 = u3, r4 = n3.__c;
    typeof r4 == "function" && (n3.__c = void 0, r4()), u3 = t6;
  }
  function j2(n3) {
    var t6 = u3;
    n3.__c = n3.__(), u3 = t6;
  }
  function k2(n3, t6) {
    return !n3 || n3.length !== t6.length || t6.some(function(t7, u4) {
      return t7 !== n3[u4];
    });
  }
  function w2(n3, t6) {
    return typeof t6 == "function" ? t6(n3) : t6;
  }

  // src/constants.ts
  var SCRIPT_NAME = "RCOY";
  var API_URL = "https://www.reddit.com";

  // src/lib/util.ts
  var getById = (id) => document.getElementById(id);
  var q = (sel, ctx = document) => ctx.querySelector(sel);
  var qq = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  var decodeHTML = (input) => {
    const e6 = document.createElement("textarea");
    e6.innerHTML = input;
    return e6.value;
  };
  var prettyTime = (date, fallback) => {
    date = new Date(date);
    const diff = (Date.now() - date.getTime()) / 1e3;
    const day_diff = Math.floor(diff / 86400);
    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
      if (fallback === "date")
        return date.toLocaleString();
      if (fallback === "date-time")
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
      if (fallback === "time")
        return date.toLocaleTimeString();
      return;
    }
    return day_diff == 0 && (diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
  };
  var namePart = [`%c${SCRIPT_NAME}:`, "color:orange"];
  var makeLog = (type) => (first, ...rest) => {
    console[type](...namePart, first, ...rest);
    return first;
  };
  var log = makeLog("log");
  var logError = makeLog("error");
  var subURI = (template, subs) => Object.entries(subs).reduce((acc, [k3, v3]) => acc.replace(":" + k3, encodeURIComponent(v3)), template);
  var buildQuery = (params) => {
    const data = new URLSearchParams();
    Object.entries(params).forEach(([k3, v3]) => v3 && data.append(k3, v3));
    return data.toString();
  };
  var throttle = (ms, cb) => {
    let lastCall = 0;
    let id = -1;
    const throttled = (...args) => {
      clearTimeout(id);
      const now = Date.now();
      const delta = now - lastCall;
      if (delta < ms) {
        id = setTimeout(throttled, ms - delta);
        return;
      }
      lastCall = now;
      cb(...args);
    };
    throttled.stop = () => clearTimeout(id);
    return throttled;
  };
  var sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  var reduceCount = (count, digits = 1) => {
    let indicator, divisor;
    if (count > 999999) {
      indicator = "M";
      divisor = 1e6;
    } else if (count > 999) {
      indicator = "k";
      divisor = 1e3;
    }
    return divisor ? (count / divisor).toFixed(digits) + indicator : count;
  };
  var getCSSVar = (varName, context) => getComputedStyle(context).getPropertyValue("--" + varName).trim();
  var createStyles = (spec) => {
    return Object.entries(spec).reduce((acc, [name, style]) => {
      acc[name] = style.class;
      return acc;
    }, {});
  };
  var filterForEp = (posts, episode) => {
    const epRegex = new RegExp(`\\bepisode ${episode}\\b`, "i");
    return posts.filter((post) => epRegex.test(post.title));
  };
  var keepTrying = (fn, max) => new Promise((resolve, reject) => {
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if (!fn()) {
        if (tries >= max)
          reject(clearInterval(id));
        return;
      }
      clearInterval(id);
      resolve();
    }, 1e3);
  });

  // src/base/Icon.tsx
  var API = "https://icongr.am/feather";
  var Icon = ({
    name,
    className,
    onClick,
    size = 18,
    spin = false,
    themeColor = "text-normal"
  }) => {
    const ref = h3(null);
    const [color, setColor] = m3("currentColor");
    y3(() => {
      const update = () => {
        if (!ref.current)
          return;
        let newColor = getCSSVar(themeColor, ref.current).slice(1);
        if (newColor.length === 3)
          newColor += newColor;
        setColor(newColor);
      };
      update();
      const id = setInterval(update, 5e3);
      return () => clearInterval(id);
    }, [themeColor]);
    const cls = zaftig_min_default`vertical-align sub`.concat(spin && "spin", className).class;
    const path = subURI("/:name.svg?size=:size&color=:color", { name, color, size: String(size) });
    return /* @__PURE__ */ v("img", {
      ref,
      className: cls,
      src: API + path,
      onClick
    });
  };

  // src/lib/api.ts
  var getJSON = (url) => fetch(url).then((res) => res.json());
  var searchPosts = async (query, sort = true) => {
    const payload = await getJSON(API_URL + "/search.json?" + buildQuery({ q: query })).catch((error) => logError(null, "api.getPosts() error", error));
    if (!payload)
      return [];
    const results = payload.data.children.map(({ data: post }) => ({
      ...post,
      title: decodeHTML(post.title)
    }));
    return sort ? results.sort((a4, b3) => b3.num_comments - a4.num_comments) : results;
  };
  var getComments = async ({ permalink }, parentComment) => {
    const payload = await getJSON(API_URL + permalink + ".json?" + buildQuery({ comment: parentComment == null ? void 0 : parentComment.data.id })).catch((error) => logError(null, "api.getComments() error", error));
    if (!payload)
      return [];
    return payload[1].data.children;
  };
  var getMoreComments = async (link_id, children) => {
    const payload = await getJSON(API_URL + "/api/morechildren.json?" + buildQuery({ api_type: "json", link_id, children: children.join(",") })).catch(() => null);
    if (!payload || payload.json.errors.length > 0)
      return logError([], "api.getMoreComments() error", payload);
    const flatComments = payload.json.data.things;
    const nestedComments = flatComments.reduce((acc, cmt) => {
      const parent = flatComments.find((x3) => x3.data.name === cmt.data.parent_id);
      if (parent) {
        if (parent.data.replies)
          parent.data.replies.data.children.push(cmt);
        else
          parent.data.replies = { data: { children: [cmt] } };
      } else
        acc.push(cmt);
      return acc;
    }, []);
    return nestedComments;
  };

  // src/lib/wait-for-elems.ts
  var waitForElemsWithTimout = ({
    timeout,
    onTimeout,
    ...rest
  }) => {
    let id = -1;
    const { stop } = waitForElems({
      ...rest,
      stopWaiting: true,
      onMatch: (elem) => {
        clearTimeout(id);
        rest.onMatch(elem);
      }
    });
    id = setTimeout(() => {
      stop();
      onTimeout == null ? void 0 : onTimeout();
    }, timeout);
    return {
      stop: () => {
        clearTimeout(id);
        stop();
      }
    };
  };
  var waitForElems = ({
    selector,
    onMatch: onmatch,
    stopWaiting = false,
    container: container2 = document.body,
    mutationConfig
  }) => {
    const seen = /* @__PURE__ */ new WeakSet();
    const check = () => {
      const found = qq(selector).filter((elem) => !seen.has(elem));
      if (found.length > 0) {
        if (stopWaiting)
          stop();
        found.forEach((elem) => {
          seen.add(elem);
          onmatch(elem);
        });
      }
    };
    const throttledCheck = throttle(300, check);
    const observer = new MutationObserver(throttledCheck);
    const start = () => {
      check();
      observer.observe(container2, {
        subtree: true,
        childList: true,
        ...mutationConfig
      });
    };
    const stop = () => {
      throttledCheck.stop();
      observer.disconnect();
    };
    start();
    return { start, stop };
  };

  // node_modules/staterino/dist/staterino.min.js
  var e4 = (e6, t6) => e6 === t6 || e6.length === t6.length && e6.every((e7, r4) => e7 === t6[r4]);
  var t4 = (e6) => e6;
  var staterino_min_default = ({ merge: r4, hooks: { useReducer: c4, useLayoutEffect: o5 }, state: n3 = {} }) => {
    let s3 = n3;
    const a4 = (e6) => {
      return typeof e6 == "string" ? (t6 = s3, e6.split(".").reduce((e7, t7) => e7 ? e7[t7] : void 0, t6)) : e6(s3);
      var t6;
    }, l4 = (e6) => Array.isArray(e6) ? [e6.map(a4), true] : [a4(e6), false], u4 = (t6) => {
      const [r5, c5] = l4(t6.t);
      (c5 ? e4(r5, t6.o) : r5 === t6.o) || (typeof t6.s == "function" && t6.s(), t6.s = ((e6, t7, r6) => e6[r6 ? "apply" : "call"](null, t7))(t6.l, t6.o = r5, c5));
    }, f4 = /* @__PURE__ */ new Set(), y4 = (e6) => (f4.add(e6), u4(e6), () => f4.delete(e6)), i4 = (r5 = t4) => {
      const [, n4] = c4((e6) => e6 + 1, 0), [s4] = c4(t4, { l: n4 });
      return s4.t && (Array.isArray(r5) ? e4(r5, s4.t) : r5 === s4.t) || (s4.o = l4(r5)[0], s4.t = r5), o5(() => y4(s4), []), s4.o;
    };
    return i4.get = () => s3, i4.set = (e6) => {
      s3 = r4(s3, e6), f4.forEach(u4);
    }, i4.subscribe = (e6, r5) => (r5 || ([e6, r5] = [t4, e6]), y4({ l: r5, t: e6, o: [] })), i4;
  };

  // node_modules/mergerino/dist/mergerino.min.js
  var e5 = Object.assign || ((e6, t6) => (t6 && Object.keys(t6).forEach((o5) => e6[o5] = t6[o5]), e6));
  var t5 = (e6, r4, s3) => {
    const c4 = typeof s3;
    if (s3 && c4 === "object")
      if (Array.isArray(s3))
        for (const o5 of s3)
          r4 = t5(e6, r4, o5);
      else
        for (const c5 of Object.keys(s3)) {
          const f4 = s3[c5];
          typeof f4 == "function" ? r4[c5] = f4(r4[c5], o4) : f4 === void 0 ? e6 && !isNaN(c5) ? r4.splice(c5, 1) : delete r4[c5] : f4 === null || typeof f4 != "object" || Array.isArray(f4) ? r4[c5] = f4 : typeof r4[c5] == "object" ? r4[c5] = f4 === r4[c5] ? f4 : o4(r4[c5], f4) : r4[c5] = t5(false, {}, f4);
        }
    else
      c4 === "function" && (r4 = s3(r4, o4));
    return r4;
  };
  var o4 = (o5, ...r4) => {
    const s3 = Array.isArray(o5);
    return t5(s3, s3 ? o5.slice() : e5({}, o5), r4);
  };
  var mergerino_min_default = o4;

  // src/state/state.ts
  var initialState = {
    conf: null,
    firstLoad: true,
    postsLoading: true,
    posts: [],
    commentsLoading: true,
    comments: [],
    noContent: false
  };
  var useStore = staterino_min_default({
    state: initialState,
    merge: mergerino_min_default,
    hooks: { useLayoutEffect: d3, useReducer: p2 }
  });
  var { get: getState, set: setState, subscribe } = useStore;

  // src/state/actions.ts
  var setter = (key) => (value) => setState({ [key]: value });
  var setActivePost = (post) => setState({ activePost: () => post });
  var setPostsLoading = setter("postsLoading");
  var setPosts = setter("posts");
  var setCommentsLoading = setter("commentsLoading");
  var setComments = setter("comments");
  var setNoContent = setter("noContent");
  var setFirstLoad = setter("firstLoad");
  var loadConf = (conf2) => {
    conf2.getPosts().catch((error) => logError([], conf2, "conf.getPosts() threw", error)).then(setPosts).finally(() => setPostsLoading(false));
  };
  var SEC_TIMEOUT = 5;
  var init = (conf2) => {
    setState([() => initialState, { conf: () => conf2 }]);
    if (!conf2.waitFor)
      return loadConf(conf2);
    log("conf has waitFor configured", conf2.waitFor);
    const handleDone = () => {
      loadConf(conf2);
      log("finished waiting", conf2.waitFor);
    };
    const handleTimeout = () => logError("timed out waiting for", conf2.waitFor);
    if (typeof conf2.waitFor === "string") {
      waitForElemsWithTimout({
        selector: conf2.waitFor,
        onMatch: handleDone,
        timeout: SEC_TIMEOUT * 1e3,
        onTimeout: handleTimeout
      });
      return;
    }
    keepTrying(conf2.waitFor, SEC_TIMEOUT).then(handleDone).catch(handleTimeout);
  };

  // src/state/subs.ts
  subscribe([(s3) => s3.firstLoad, (s3) => s3.commentsLoading, (s3) => s3.comments], (first, loading, comments) => {
    if (loading || !first)
      return;
    setFirstLoad(false);
    if (comments.length <= 0)
      setNoContent(true);
  });
  subscribe([(s3) => s3.firstLoad, (s3) => s3.postsLoading, (s3) => s3.posts], (first, loading, posts) => {
    if (loading || !first)
      return;
    if (posts.length > 0) {
      setActivePost(posts[0]);
    } else {
      setFirstLoad(false);
      setNoContent(true);
    }
  });
  subscribe((s3) => s3.activePost, (activePost) => {
    if (!activePost)
      return;
    setCommentsLoading(true);
    getComments(activePost).then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  });

  // src/cmp/PostSelect.tsx
  var MAX_INITIAL_VISIBLE = 7;
  var PostSelect = () => {
    const [posts, activePost] = useStore([(s3) => s3.posts, (s3) => s3.activePost]);
    const [showAll, setShowAll] = m3(false);
    const visiblePosts = posts.filter((post) => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE);
    const hiddenCount = posts.length - visiblePosts.length;
    let list = showAll ? posts : visiblePosts;
    if (activePost && !list.includes(activePost))
      list = [...list, activePost];
    if (list.length <= 0)
      return null;
    return /* @__PURE__ */ v("div", {
      className: styles.container
    }, list.map((post) => /* @__PURE__ */ v("button", {
      key: post.name,
      className: styles.item,
      style: { borderBottomColor: post === activePost ? "var(--text-secondary)" : "" },
      onClick: () => setActivePost(post)
    }, /* @__PURE__ */ v("div", {
      className: styles.numComments
    }, /* @__PURE__ */ v(Icon, {
      name: "message-circle"
    }), " ", reduceCount(post.num_comments)), /* @__PURE__ */ v("div", {
      title: post.subreddit
    }, "/r/", post.subreddit), /* @__PURE__ */ v("div", {
      title: post.title
    }, post.title))), hiddenCount > 0 && posts.length > 1 && /* @__PURE__ */ v("button", {
      className: styles.toggleEmpty,
      onClick: () => setShowAll(!showAll)
    }, showAll ? `Hide ${hiddenCount} posts` : `Show ${hiddenCount} hidden posts`));
  };
  var buttonBase = zaftig_min_default`
  cursor pointer
  border none
  margin 0
  padding 0
  border-bottom 4px solid $button-background
`;
  var styles = createStyles({
    container: zaftig_min_default`display grid;grid-template-columns 1fr 1fr;gap 4`,
    toggleEmpty: buttonBase.concat(zaftig_min_default`padding 10`),
    item: buttonBase.concat(zaftig_min_default`
    text-align left
    display grid
    grid-template-columns minmax(min-content, 65px) 2fr 6fr
    > div {
      padding 10 5
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    }
  `),
    numComments: zaftig_min_default`font-weight bold`
  });

  // src/cmp/PostComments/cmp/LoadMoreButton.tsx
  var LoadMoreButton = ({ thing, update }) => {
    const activePost = useStore((s3) => s3.activePost);
    const [loading, setLoading] = m3(false);
    const [failed, setFailed] = m3(false);
    const { count, children } = thing.data;
    if (count <= 0)
      return null;
    const label = failed ? "Can't find those dang comments" : `${loading ? "Loading" : "Load"} ${count} more comments`;
    const onClick = async () => {
      setLoading(true);
      const results = await getMoreComments(activePost.name, children);
      setLoading(false);
      if (results.length <= 0) {
        setFailed(true);
        await sleep(1200);
      }
      update((parent) => {
        const currentPosition = parent.indexOf(thing);
        if (currentPosition >= 0)
          parent.splice(currentPosition, 1, ...results);
      });
    };
    return /* @__PURE__ */ v("div", {
      className: styles2.wrapper
    }, /* @__PURE__ */ v("button", {
      disabled: loading || failed,
      className: styles2.button,
      onClick
    }, label));
  };
  var styles2 = createStyles({
    wrapper: zaftig_min_default`:not(:last-child) { margin-bottom 18 }`,
    button: zaftig_min_default`padding 5 10;border none`
  });

  // src/lib/hooks.ts
  var useRedraw = () => {
    const [, redraw] = p2((c4) => c4 + 1, 0);
    return redraw;
  };
  var useUpdatingRef = (value) => {
    const ref = h3(value);
    ref.current = value;
    return ref;
  };

  // src/cmp/PostComments/hooks.ts
  var useUpdate = (parent) => {
    const redraw = useRedraw();
    const parentRef = useUpdatingRef(parent);
    const update = A((fn) => {
      fn(parentRef.current);
      redraw();
    }, []);
    return update;
  };

  // src/base/CustomButton.tsx
  function CustomButton({ tag, children, ...props }) {
    const onKeyPress = (e6) => {
      var _a;
      (_a = props.onKeyPress) == null ? void 0 : _a.call(e6.currentTarget, e6);
      if (!e6.defaultPrevented && props.onClick && (e6.key === " " || e6.key === "Enter")) {
        e6.preventDefault();
        props.onClick.call(e6.currentTarget, e6);
      }
    };
    return v(tag, { role: "button", tabIndex: 0, ...props, onKeyPress }, children);
  }

  // src/theme.ts
  var Themes = {
    light: generateTheme({
      background: "#fefefe",
      text: { normal: "#444", subdued: "#666" },
      link: { color: "#1b3e92" },
      button: { background: "#eee" },
      ups: "#ff8300"
    }),
    dark: generateTheme({
      background: "#191919",
      text: { normal: "#fff", subdued: "#b2b2b2" },
      link: { color: "#6e96b7" },
      button: { background: "#303030" },
      ups: "orange"
    }),
    common: zaftig_min_default`
    font-size 16
    color $text-normal
    background $background
    text-align left

    button { font-size 16; color $text-normal; background $button-background }
    a {
      color $link-color
      text-decoration none
      :hover { text-decoration underline }
    }
  `
  };
  function generateTheme(theme) {
    const getVars = (obj, parents = []) => Object.entries(obj).reduce((acc, [k3, v3]) => {
      const cur = [...parents, k3];
      if (typeof v3 === "object")
        Object.assign(acc, getVars(v3, cur));
      else
        acc[cur.join("-")] = v3;
      return acc;
    }, {});
    return zaftig_min_default(Object.entries(getVars(theme)).reduce((acc, [k3, v3]) => `${acc}$${k3} ${v3};`, ""));
  }
  var CommentBorderColors = {
    day: [
      "rgb(226, 26, 25)",
      "rgb(243, 146, 51)",
      "rgb(249, 231, 49)",
      "rgb(84, 166, 76)",
      "rgb(54, 141, 238)"
    ],
    night: [
      "rgb(226, 26, 25)",
      "rgb(243, 146, 51)",
      "rgb(249, 231, 49)",
      "rgb(84, 166, 76)",
      "rgb(54, 141, 238)"
    ]
  };

  // src/cmp/PostComments/cmp/PostComment.tsx
  var PostComment = ({ thing }) => {
    const { ups, author, body_html, replies, collapsed, created_utc, edited, permalink, depth } = thing.data;
    const html = _2(() => decodeHTML(body_html), [body_html]);
    const conf2 = useStore((s3) => s3.conf);
    const redraw = useRedraw();
    const ref = h3(null);
    const toggle = () => {
      thing.data.collapsed = !collapsed;
      redraw();
      const offset = typeof conf2.scrollOffset === "function" ? conf2.scrollOffset() : conf2.scrollOffset;
      if (ref.current && ref.current.getBoundingClientRect().top < (offset != null ? offset : 0)) {
        ref.current.scrollIntoView();
        if (offset)
          window.scrollBy(0, -offset);
      }
    };
    const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : []);
    const createdTime = new Date(created_utc * 1e3);
    const editedTime = edited && new Date(edited * 1e3);
    const differentDay = editedTime && createdTime.getDate() !== editedTime.getDate();
    const ariaLabel = (collapsed ? "expand" : "collapse") + " comment";
    const borderColors = CommentBorderColors[conf2.dark ? "night" : "day"];
    const borderClassName = zaftig_min_default.concat(styles3.border, zaftig_min_default`$color ${borderColors[depth % borderColors.length]}`).class;
    return /* @__PURE__ */ v("div", {
      className: styles3.comment
    }, /* @__PURE__ */ v(CustomButton, {
      tag: "div",
      "aria-label": ariaLabel,
      className: borderClassName,
      onClick: toggle
    }), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("div", {
      ref,
      className: styles3.commentInfo,
      style: { marginBottom: collapsed ? "" : "10px" }
    }, /* @__PURE__ */ v("a", {
      className: styles3.author,
      target: "_blank",
      href: API_URL + subURI("/u/:author", { author })
    }, author), /* @__PURE__ */ v("span", {
      className: styles3.ups
    }, reduceCount(ups)), /* @__PURE__ */ v("a", {
      className: styles3.date,
      target: "_blank",
      href: API_URL + permalink
    }, prettyTime(createdTime, "date-time"), editedTime && /* @__PURE__ */ v(d, null, " edited ", prettyTime(editedTime, differentDay ? "date-time" : "time")))), !collapsed && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
      className: styles3.body,
      dangerouslySetInnerHTML: { __html: html },
      onClick: (e6) => {
        if (e6.target instanceof HTMLAnchorElement) {
          e6.preventDefault();
          const url = e6.target.href;
          window.open(url.startsWith("/") ? API_URL + url : url);
        }
      }
    }), replies && /* @__PURE__ */ v("div", {
      className: styles3.replies
    }, replies.data.children.map((child) => /* @__PURE__ */ v(PostCommentChild, {
      key: child.data.id,
      thing: child,
      update
    }))))));
  };
  var styles3 = createStyles({
    comment: zaftig_min_default`
    display grid
    grid-template-columns auto 1fr
    :not(:last-child) { margin-bottom 18 }
    gap 18
  `,
    replies: zaftig_min_default`margin-top 18`,
    border: zaftig_min_default`
    position relative
    padding 9
    margin -9
    user-select none
    cursor pointer

    :hover,:focus { opacity 0.5 }
    ::after {
      display block
      content ' '
      background $color
      height 100%
      width 4
    }
  `,
    body: zaftig_min_default`
    blockquote {
      border-left 3 solid $text-subdued
      padding 5 10
      margin 10 0
      color $text-subdued
    }
    p { margin 0;padding 0 }
    p:not(:last-child) { margin-bottom 18 }
    table {
      th { ta left }
      tr { border-top 1 solid $text-secondary }
      th, td { padding 10 5 }
    }
    ul, ol { margin 18 0; padding-left 30 }
    a { color $link-color !important }
  `,
    ups: zaftig_min_default`color $ups;font-weight bold`,
    date: zaftig_min_default`&& { color $text-subdued }`,
    commentInfo: zaftig_min_default`display flex;gap 10`,
    author: zaftig_min_default`font-weight bold;&& { color $text-primary }`
  });

  // src/cmp/PostComments/cmp/PostCommentChild.tsx
  function PostCommentChild({ thing, ...rest }) {
    switch (thing.kind) {
      case "more":
        return /* @__PURE__ */ v(LoadMoreButton, {
          ...{ thing, ...rest }
        });
      case "t1":
        return /* @__PURE__ */ v(PostComment, {
          ...{ thing, ...rest }
        });
      default:
        throw new Error("unknown child type");
    }
  }

  // src/cmp/PostComments/PostComments.tsx
  var PostComments = () => {
    const [loading, things, activePost] = useStore([
      (s3) => s3.commentsLoading,
      (s3) => s3.comments,
      (s3) => s3.activePost
    ]);
    const update = useUpdate(things || []);
    if (!activePost)
      return null;
    return /* @__PURE__ */ v("div", null, loading ? `Loading comments for ${activePost.title}\u2026` : things.length <= 0 ? "No comments yet." : things.map((thing) => /* @__PURE__ */ v(PostCommentChild, {
      key: thing.data.id,
      thing,
      update
    })));
  };

  // src/cmp/SwitchComments.tsx
  var SwitchComments = ({ onSwitch }) => {
    return /* @__PURE__ */ v("button", {
      className: buttonStyle,
      onClick: onSwitch
    }, "Switch comments");
  };
  var buttonStyle = zaftig_min_default`
  cursor pointer
  border none
  padding 10
  width 100%
`.class;

  // src/cmp/Modal.tsx
  function Modal({ children, open, onClose }) {
    if (!open)
      return null;
    return /* @__PURE__ */ v("div", {
      className: overlay,
      onClick: (e6) => {
        if (e6.target === e6.currentTarget)
          onClose == null ? void 0 : onClose();
      }
    }, /* @__PURE__ */ v("div", {
      className: card
    }, children));
  }
  var overlay = zaftig_min_default`
  position fixed
  top 0;right 0;left 0;bottom 0
  background rgba(0,0,0,0.8)
  d flex;jc center;ai center
`.class;
  var card = zaftig_min_default`
  bc $background
  p 35
  width 90%
  max-width 1200
  max-height 95vh
  min-height 30vh
  overflow-y auto
`.class;

  // src/cmp/App.tsx
  var App = ({ conf: conf2, setNativeCommentsVisible }) => {
    const [postsLoading, noPosts] = useStore([(s3) => s3.postsLoading, (s3) => s3.posts.length <= 0]);
    y3(() => {
      init(conf2);
      return subscribe([(s3) => s3.noContent], (noContent) => {
        if (noContent && visible)
          toggleVisible();
      });
    }, []);
    const [visible, setVisible] = m3(true);
    const toggleVisible = () => {
      setNativeCommentsVisible(visible);
      setVisible(!visible);
    };
    const message = postsLoading ? "Loading posts\u2026" : noPosts ? "No posts found\u2026" : "";
    const [open, setOpen] = m3(false);
    if (conf2.modal) {
      return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("button", {
        className: modalButton,
        onClick: () => setOpen(true)
      }, "Reddit"), /* @__PURE__ */ v(Modal, {
        open,
        onClose: () => setOpen(false)
      }, /* @__PURE__ */ v(d, null, message || /* @__PURE__ */ v("div", {
        className: container
      }, /* @__PURE__ */ v(PostSelect, null), /* @__PURE__ */ v(PostComments, null)))));
    }
    return /* @__PURE__ */ v("div", {
      className: container
    }, /* @__PURE__ */ v(SwitchComments, {
      onSwitch: toggleVisible
    }), visible && (message || /* @__PURE__ */ v(d, null, /* @__PURE__ */ v(PostSelect, null), /* @__PURE__ */ v(PostComments, null))));
  };
  var container = zaftig_min_default`d flex;flex-direction column;gap 10`.class;
  var modalButton = zaftig_min_default`padding 5`.class;

  // src/conf/crunchyroll.ts
  var crunchyroll = {
    areaSelector: ".guestbook.comments",
    isMatch: () => !!getById("showmedia_about_media"),
    getPosts: async () => {
      var _a, _b, _c, _d, _e, _f;
      const animeName = (_b = (_a = getById("showmedia_about_media")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.replace(/\s+/g, " ");
      if (!animeName) {
        logError("unable to find anime name");
        return [];
      }
      const epNum = (_f = (_e = (_d = (_c = q("#showmedia_about_media h4:last-child")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.split(",").pop()) == null ? void 0 : _e.match(/[0-9]+/)) == null ? void 0 : _f[0];
      const posts = await searchPosts(animeName + " discussion");
      return epNum ? filterForEp(posts, epNum) : posts;
    }
  };

  // src/conf/youtube.ts
  var getVideoIdFromUrl = (url) => {
    var _a;
    return (_a = url.match(/v=([^&]+)/i)) == null ? void 0 : _a[1];
  };
  var youtube = {
    areaSelector: "#comments",
    scrollOffset: () => {
      var _a;
      return ((_a = q(".ytd-masthead")) == null ? void 0 : _a.clientHeight) || 60;
    },
    isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
    theme: {
      background: "var(--yt-spec-general-background-a)",
      text: { normal: "var(--yt-spec-text-primary)", subdued: "var(--yt-spec-text-secondary)" },
      link: { color: "var(--yt-spec-call-to-action)" },
      button: { background: "var(--yt-spec-badge-chip-background)" },
      ups: "orange"
    },
    getPosts: async () => {
      const url = location.href;
      const id = getVideoIdFromUrl(url);
      if (!id) {
        logError("failed to parse video id", url);
        return [];
      }
      return searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`);
    }
  };

  // src/conf/animixplay.ts
  var animixplay = {
    areaSelector: "#disqus_thread",
    isMatch: () => Boolean(q(".playerpage")),
    dark: true,
    waitFor: "#epslistplace button[disabled]",
    async getPosts() {
      var _a, _b;
      const title = (_a = q(".animetitle")) == null ? void 0 : _a.textContent;
      const epNum = (_b = q("#epslistplace button[disabled]")) == null ? void 0 : _b.textContent;
      const posts = await searchPosts(`${title} episode ${epNum}`);
      return epNum ? filterForEp(posts, epNum) : posts;
    }
  };

  // src/conf/funimation.ts
  var funimation = {
    areaSelector: ".video-player-controls__aux-controls",
    modal: true,
    dark: true,
    isMatch: (url) => url.includes("/v/"),
    getPosts: async () => {
      var _a, _b, _c;
      const [titleElem, epInfoElem] = qq(".meta-overlay__data-block li");
      const animeName = titleElem.textContent;
      if (!animeName) {
        logError("unable to find anime name");
        return [];
      }
      const url = subURI("https://kitsu.io/api/edge/anime?filter[text]=:animeName", { animeName });
      const data = await fetch(url).then((res) => res.json());
      const goodTitle = data.data[0].attributes.canonicalTitle;
      const epInfo = (_b = (_a = epInfoElem.textContent) == null ? void 0 : _a.replace(/\s+/g, " ").match(/Episode [0-9]+/)) == null ? void 0 : _b[0];
      const posts = await searchPosts(goodTitle + " " + epInfo + " discussion");
      const epNum = (_c = epInfo == null ? void 0 : epInfo.match(/[0-9]+/)) == null ? void 0 : _c[0];
      return epNum ? filterForEp(posts, epNum) : posts;
    }
  };

  // src/conf/index.ts
  var confs = {
    crunchyroll,
    youtube,
    animixplay,
    funimation
  };
  var confNames = Object.keys(confs);
  var getConf = () => {
    const host = location.hostname;
    const confName2 = confNames.find((name) => host.includes(name));
    return confName2 ? { conf: confs[confName2], confName: confName2 } : {};
  };

  // src/lib/wait-for-url.ts
  var waitForUrl = ({ matcher = "any", stopWaiting = false, onmatch }) => {
    const isMatch = matcher === "any" ? () => true : typeof matcher === "function" ? matcher : (url) => matcher.test(url);
    let lastUrl = "";
    const check = () => {
      const url = location.href;
      if (url === lastUrl)
        return;
      lastUrl = url;
      if (cleanup) {
        runCleanup();
        if (stopWaiting)
          return stop();
      }
      if (isMatch(url)) {
        try {
          cleanup = onmatch(url);
        } finally {
          if (stopWaiting && !cleanup)
            stop();
        }
      }
    };
    let cleanup;
    const runCleanup = () => {
      if (!cleanup)
        return;
      cleanup();
      cleanup = void 0;
    };
    let id;
    const start = () => {
      stop();
      id = setInterval(check, 500);
      check();
    };
    const stop = () => {
      clearInterval(id);
      runCleanup();
    };
    start();
    return { stop, start };
  };

  // src/index.tsx
  log("started!");
  var { conf, confName } = getConf();
  if (!conf) {
    logError("encountered unknown host", location.hostname);
  } else {
    waitForUrl({
      matcher: "any",
      onmatch: (url) => {
        log("url changed", url);
        if (!conf.isMatch(url)) {
          log("but it's not a match...");
          return;
        }
        log("its a match! looking for area");
        const cleanup = [];
        const wait = waitForElems({
          selector: conf.areaSelector,
          stopWaiting: true,
          onMatch: (area) => {
            log("area found", area);
            cleanup.push(mountApp(conf, area));
          }
        });
        cleanup.push(wait.stop);
        return () => {
          log("leaving page cleaning up");
          cleanup.forEach((fn) => fn());
        };
      }
    });
  }
  function mountApp(conf2, area) {
    const wrapper = document.createElement("div");
    wrapper.className = Themes.common.concat(conf2.dark ? Themes.dark : Themes.light, conf2.theme && generateTheme(conf2.theme)).class;
    if (conf2.modal) {
      area.prepend(wrapper);
    } else {
      area.style.display = "none";
      area.parentElement.insertBefore(wrapper, area);
    }
    S(/* @__PURE__ */ v(App, {
      conf: conf2,
      setNativeCommentsVisible: (visible) => {
        area.style.display = visible ? "" : "none";
        if (visible && confName === "youtube") {
          if (area.clientHeight < 100) {
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
          }
        }
      }
    }), wrapper);
    return () => {
      S(null, wrapper);
      wrapper.remove();
    };
  }
})();
