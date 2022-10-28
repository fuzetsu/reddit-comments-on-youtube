// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     1.1.4
// @match       https://*.youtube.com/*
// @match       https://*.crunchyroll.com/*
// @match       https://animixplay.to/*
// @match       https://*.funimation.com/*
// @grant       none
// ==/UserScript==
"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f = {};
  var e = [];
  var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function s(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function a(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function h(l4, u4, i4) {
    var t6, o6, r4, f4 = {};
    for (r4 in u4)
      "key" == r4 ? t6 = u4[r4] : "ref" == r4 ? o6 = u4[r4] : f4[r4] = u4[r4];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
      for (r4 in l4.defaultProps)
        void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
    return v(l4, f4, t6, o6, null);
  }
  function v(n3, i4, t6, o6, r4) {
    var f4 = { type: n3, props: i4, key: t6, ref: o6, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
    return null == r4 && null != l.vnode && l.vnode(f4), f4;
  }
  function p(n3) {
    return n3.children;
  }
  function d(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function _(n3, l4) {
    if (null == l4)
      return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? _(n3) : null;
  }
  function k(n3) {
    var l4, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return k(n3);
    }
  }
  function b(n3) {
    (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
  }
  function g() {
    for (var n3; g.__r = t.length; )
      n3 = t.sort(function(n4, l4) {
        return n4.__v.__b - l4.__v.__b;
      }), t = [], n3.some(function(n4) {
        var l4, u4, i4, t6, o6, r4;
        n4.__d && (o6 = (t6 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = s({}, t6)).__v = t6.__v + 1, j(r4, t6, i4, l4.__n, void 0 !== r4.ownerSVGElement, null != t6.__h ? [o6] : null, u4, null == o6 ? _(t6) : o6, t6.__h), z(u4, t6), t6.__e != o6 && k(t6)));
      });
  }
  function w(n3, l4, u4, i4, t6, o6, r4, c4, s4, a4) {
    var h4, y3, d4, k3, b3, g4, w3, x = i4 && i4.__k || e, C2 = x.length;
    for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
      if (null != (k3 = u4.__k[h4] = null == (k3 = l4[h4]) || "boolean" == typeof k3 ? null : "string" == typeof k3 || "number" == typeof k3 || "bigint" == typeof k3 ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(p, { children: k3 }, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, k3.ref ? k3.ref : null, k3.__v) : k3)) {
        if (k3.__ = u4, k3.__b = u4.__b + 1, null === (d4 = x[h4]) || d4 && k3.key == d4.key && k3.type === d4.type)
          x[h4] = void 0;
        else
          for (y3 = 0; y3 < C2; y3++) {
            if ((d4 = x[y3]) && k3.key == d4.key && k3.type === d4.type) {
              x[y3] = void 0;
              break;
            }
            d4 = null;
          }
        j(n3, k3, d4 = d4 || f, t6, o6, r4, c4, s4, a4), b3 = k3.__e, (y3 = k3.ref) && d4.ref != y3 && (w3 || (w3 = []), d4.ref && w3.push(d4.ref, null, k3), w3.push(y3, k3.__c || b3, k3)), null != b3 ? (null == g4 && (g4 = b3), "function" == typeof k3.type && k3.__k === d4.__k ? k3.__d = s4 = m(k3, s4, n3) : s4 = A(n3, k3, d4, x, b3, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
      }
    for (u4.__e = g4, h4 = C2; h4--; )
      null != x[h4] && N(x[h4], x[h4]);
    if (w3)
      for (h4 = 0; h4 < w3.length; h4++)
        M(w3[h4], w3[++h4], w3[++h4]);
  }
  function m(n3, l4, u4) {
    for (var i4, t6 = n3.__k, o6 = 0; t6 && o6 < t6.length; o6++)
      (i4 = t6[o6]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t6, i4.__e, l4));
    return l4;
  }
  function A(n3, l4, u4, i4, t6, o6) {
    var r4, f4, e6;
    if (void 0 !== l4.__d)
      r4 = l4.__d, l4.__d = void 0;
    else if (null == u4 || t6 != o6 || null == t6.parentNode)
      n:
        if (null == o6 || o6.parentNode !== n3)
          n3.appendChild(t6), r4 = null;
        else {
          for (f4 = o6, e6 = 0; (f4 = f4.nextSibling) && e6 < i4.length; e6 += 2)
            if (f4 == t6)
              break n;
          n3.insertBefore(t6, o6), r4 = o6;
        }
    return void 0 !== r4 ? r4 : t6.nextSibling;
  }
  function C(n3, l4, u4, i4, t6) {
    var o6;
    for (o6 in u4)
      "children" === o6 || "key" === o6 || o6 in l4 || H(n3, o6, null, u4[o6], i4);
    for (o6 in l4)
      t6 && "function" != typeof l4[o6] || "children" === o6 || "key" === o6 || "value" === o6 || "checked" === o6 || u4[o6] === l4[o6] || H(n3, o6, l4[o6], u4[o6], i4);
  }
  function $(n3, l4, u4) {
    "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
  }
  function H(n3, l4, u4, i4, t6) {
    var o6;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || $(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o6 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o6] = u4, u4 ? i4 || n3.addEventListener(l4, o6 ? T : I, o6) : n3.removeEventListener(l4, o6 ? T : I, o6);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (t6)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
          try {
            n3[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && -1 == l4.indexOf("-") ? n3.removeAttribute(l4) : n3.setAttribute(l4, u4));
      }
  }
  function I(n3) {
    this.l[n3.type + false](l.event ? l.event(n3) : n3);
  }
  function T(n3) {
    this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function j(n3, u4, i4, t6, o6, r4, f4, e6, c4) {
    var a4, h4, v3, y3, _4, k3, b3, g4, m4, x, A2, C2, $3, H2, I2, T3 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c4 = i4.__h, e6 = u4.__e = i4.__e, u4.__h = null, r4 = [e6]), (a4 = l.__b) && a4(u4);
    try {
      n:
        if ("function" == typeof T3) {
          if (g4 = u4.props, m4 = (a4 = T3.contextType) && t6[a4.__c], x = a4 ? m4 ? m4.props.value : a4.__ : t6, i4.__c ? b3 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in T3 && T3.prototype.render ? u4.__c = h4 = new T3(g4, x) : (u4.__c = h4 = new d(g4, x), h4.constructor = T3, h4.render = O), m4 && m4.sub(h4), h4.props = g4, h4.state || (h4.state = {}), h4.context = x, h4.__n = t6, v3 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != T3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, T3.getDerivedStateFromProps(g4, h4.__s))), y3 = h4.props, _4 = h4.state, v3)
            null == T3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
          else {
            if (null == T3.getDerivedStateFromProps && g4 !== y3 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g4, x), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g4, h4.__s, x) || u4.__v === i4.__v) {
              for (h4.props = g4, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), A2 = 0; A2 < h4._sb.length; A2++)
                h4.__h.push(h4._sb[A2]);
              h4._sb = [], h4.__h.length && f4.push(h4);
              break n;
            }
            null != h4.componentWillUpdate && h4.componentWillUpdate(g4, h4.__s, x), null != h4.componentDidUpdate && h4.__h.push(function() {
              h4.componentDidUpdate(y3, _4, k3);
            });
          }
          if (h4.context = x, h4.props = g4, h4.__v = u4, h4.__P = n3, C2 = l.__r, $3 = 0, "prototype" in T3 && T3.prototype.render) {
            for (h4.state = h4.__s, h4.__d = false, C2 && C2(u4), a4 = h4.render(h4.props, h4.state, h4.context), H2 = 0; H2 < h4._sb.length; H2++)
              h4.__h.push(h4._sb[H2]);
            h4._sb = [];
          } else
            do {
              h4.__d = false, C2 && C2(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
            } while (h4.__d && ++$3 < 25);
          h4.state = h4.__s, null != h4.getChildContext && (t6 = s(s({}, t6), h4.getChildContext())), v3 || null == h4.getSnapshotBeforeUpdate || (k3 = h4.getSnapshotBeforeUpdate(y3, _4)), I2 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray(I2) ? I2 : [I2], u4, i4, t6, o6, r4, f4, e6, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b3 && (h4.__E = h4.__ = null), h4.__e = false;
        } else
          null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t6, o6, r4, f4, c4);
      (a4 = l.diffed) && a4(u4);
    } catch (n4) {
      u4.__v = null, (c4 || null != r4) && (u4.__e = e6, u4.__h = !!c4, r4[r4.indexOf(e6)] = null), l.__e(n4, u4, i4);
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
  function L(l4, u4, i4, t6, o6, r4, e6, c4) {
    var s4, h4, v3, y3 = i4.props, p4 = u4.props, d4 = u4.type, k3 = 0;
    if ("svg" === d4 && (o6 = true), null != r4) {
      for (; k3 < r4.length; k3++)
        if ((s4 = r4[k3]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
          l4 = s4, r4[k3] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === d4)
        return document.createTextNode(p4);
      l4 = o6 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r4 = null, c4 = false;
    }
    if (null === d4)
      y3 === p4 || c4 && l4.data === p4 || (l4.data = p4);
    else {
      if (r4 = r4 && n.call(l4.childNodes), h4 = (y3 = i4.props || f).dangerouslySetInnerHTML, v3 = p4.dangerouslySetInnerHTML, !c4) {
        if (null != r4)
          for (y3 = {}, k3 = 0; k3 < l4.attributes.length; k3++)
            y3[l4.attributes[k3].name] = l4.attributes[k3].value;
        (v3 || h4) && (v3 && (h4 && v3.__html == h4.__html || v3.__html === l4.innerHTML) || (l4.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l4, p4, y3, o6, c4), v3)
        u4.__k = [];
      else if (k3 = u4.props.children, w(l4, Array.isArray(k3) ? k3 : [k3], u4, i4, t6, o6 && "foreignObject" !== d4, r4, e6, r4 ? r4[0] : i4.__k && _(i4, 0), c4), null != r4)
        for (k3 = r4.length; k3--; )
          null != r4[k3] && a(r4[k3]);
      c4 || ("value" in p4 && void 0 !== (k3 = p4.value) && (k3 !== l4.value || "progress" === d4 && !k3 || "option" === d4 && k3 !== y3.value) && H(l4, "value", k3, y3.value, false), "checked" in p4 && void 0 !== (k3 = p4.checked) && k3 !== l4.checked && H(l4, "checked", k3, y3.checked, false));
    }
    return l4;
  }
  function M(n3, u4, i4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, i4);
    }
  }
  function N(n3, u4, i4) {
    var t6, o6;
    if (l.unmount && l.unmount(n3), (t6 = n3.ref) && (t6.current && t6.current !== n3.__e || M(t6, null, u4)), null != (t6 = n3.__c)) {
      if (t6.componentWillUnmount)
        try {
          t6.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      t6.base = t6.__P = null, n3.__c = void 0;
    }
    if (t6 = n3.__k)
      for (o6 = 0; o6 < t6.length; o6++)
        t6[o6] && N(t6[o6], u4, i4 || "function" != typeof n3.type);
    i4 || null == n3.__e || a(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
  }
  function O(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function P(u4, i4, t6) {
    var o6, r4, e6;
    l.__ && l.__(u4, i4), r4 = (o6 = "function" == typeof t6) ? null : t6 && t6.__k || i4.__k, e6 = [], j(i4, u4 = (!o6 && t6 || i4).__k = h(p, null, [u4]), r4 || f, f, void 0 !== i4.ownerSVGElement, !o6 && t6 ? [t6] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e6, !o6 && t6 ? t6 : r4 ? r4.__e : i4.firstChild, o6), z(e6, u4);
  }
  n = e.slice, l = { __e: function(n3, l4, u4, i4) {
    for (var t6, o6, r4; l4 = l4.__; )
      if ((t6 = l4.__c) && !t6.__)
        try {
          if ((o6 = t6.constructor) && null != o6.getDerivedStateFromError && (t6.setState(o6.getDerivedStateFromError(n3)), r4 = t6.__d), null != t6.componentDidCatch && (t6.componentDidCatch(n3, i4 || {}), r4 = t6.__d), r4)
            return t6.__E = t6;
        } catch (l5) {
          n3 = l5;
        }
    throw n3;
  } }, u = 0, i = function(n3) {
    return null != n3 && void 0 === n3.constructor;
  }, d.prototype.setState = function(n3, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), b(this));
  }, d.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
  }, d.prototype.render = p, t = [], g.__r = 0, r = 0;

  // node_modules/zaftig/dist/zaftig.min.js
  var { isArray: t2 } = Array;
  var { hasOwnProperty: r2, getPrototypeOf: e2 } = Object;
  var n2 = (...t6) => console.error("zaftig:", ...t6);
  var o2 = (t6, r4 = {}) => (e6) => e6 in r4 ? r4[e6] : r4[e6] = t6(e6);
  var i2 = document.documentMode || /Edge\//.test(navigator.userAgent) ? "ms" : navigator.vendor ? "webkit" : "moz";
  var s2 = (t6) => r2.call(t6, "width") ? t6 : s2(e2(t6));
  var c2 = Object.keys(s2(document.documentElement.style)).filter((t6) => t6.indexOf("-") < 0 && "length" != t6);
  var a2 = {};
  var u2 = {};
  c2.concat(["backgroundColor", "borderBottom", "borderRadius", "bottom", "boxShadow", "color", "display", "flexDirection", "float", "fontFamily", "fontSize", "height", "margin", "marginTop", "marginBottom", "opacity", "padding", "paddingBottom", "right", "textAlign", "textDecoration", "top", "whiteSpace", "width"].filter((t6) => c2.indexOf(t6) >= 0)).forEach((t6) => {
    let r4 = t6.replace(/[A-Z]/g, (t7) => "-" + t7.toLowerCase());
    let e6 = (n3 = t6)[0] + n3.slice(1).replace(/[a-z]/g, "").toLowerCase();
    var n3;
    0 == t6.toLowerCase().indexOf(i2) ? (e6 = e6.slice(1), r4 = "-" == r4[0] ? r4 : "-" + r4, u2[e6] || (u2[e6] = r4)) : u2[e6] = r4, a2[r4] = true;
  });
  var d2 = document.createElement("div");
  var l2 = o2((t6) => ["0", "0 0"].some((r4) => (d2.style.cssText = `${t6}: ${r4};`, "px;" == d2.style.cssText.slice(-3))), { flex: false, border: true, "border-left": true, "border-right": true, "border-top": true, "border-bottom": true });
  var f2 = /\s*,\s*/;
  var g2 = (t6, r4) => t6 && r4 ? `
${t6} {
${r4}}
` : "";
  var m2 = (r4) => function(e6, ...o6) {
    try {
      return t2(e6) ? r4.call(this, ((t6, r5) => t6.reduce((t7, e7, n3) => t7 + e7 + (null == r5[n3] ? "" : String(r5[n3])), ""))(e6, o6)) : r4.call(this, e6);
    } catch (t6) {
      return n2("error `", e6, "`", o6, "\n", t6), "";
    }
  };
  var h2 = () => document.head.appendChild(document.createElement("style"));
  var p2;
  var $2 = (t6, r4 = "") => {
    try {
      p2 && p2.sheet || (p2 = h2()), p2.sheet.insertRule(`${t6}{${r4}}`, 0);
      const e6 = r4 && p2.sheet.cssRules[0].cssText.replace(/\s/g, "");
      return p2.sheet.deleteRule(0), !e6 || e6.length > t6.length + 2;
    } catch (t7) {
      return false;
    }
  };
  var y = (t6 = {}) => {
    const { helpers: r4 = {}, unit: e6 = "px", id: s4 = "z" + Math.random().toString(36).slice(2) } = t6;
    let { style: c4, dot: d4 = true, debug: p4 = false } = t6, b3 = 0;
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
        return this.concat(B2(...t7));
      }
      concat(...t7) {
        return z3(this.class, ...t7);
      }
    }
    const z3 = (...t7) => {
      const r5 = [];
      return t7.forEach((t8) => {
        t8 && ("string" == typeof t8 ? r5.push(t8) : t8.className && r5.push(t8.className));
      }), new v3(r5.join(" "));
    }, w3 = (t7, r5, e7) => {
      const o6 = g2(e7 ? ((t8) => t8.replace(/(::?)([a-z-]+)(\()?/gi, (t9, r6, e8, n3) => ("placeholder" == e8 && "moz" != i2 ? e8 = "input-" + e8 : "matches" == e8 && (e8 = "any"), "-" == e8[0] || $2(n3 ? t9 + ".f)" : t9) ? t9 : `${r6}-${i2}-${e8}${n3 || ""}`)))(t7) : t7, r5);
      if (o6) {
        c4 || (c4 = h2(), c4.id = s4);
        try {
          c4.sheet.insertRule(o6, c4.sheet.cssRules.length), p4 && (c4.textContent += o6);
        } catch (o7) {
          !e7 && t7.indexOf(":") >= 0 ? w3(t7, r5, true) : n2("insert failed", t7, r5, o7);
        }
      }
    }, x = (t7) => t7.replace(/^/gm, "  ") + "\n", O2 = (t7, r5, e7 = "", o6) => {
      if (!t7)
        return p4 && n2("missing selector", r5);
      if (/^@(media|keyframes|supports)/.test(t7))
        return ((t8, r6, e8, n3) => {
          r6.t = g2("" == e8 ? ":root" : e8, r6.t), r6.o.forEach((t9) => O2(t9.i, t9, e8, r6)), n3 ? n3.t += g2(t8, x(r6.t)) : w3(t8, x(r6.t));
        })(t7, r5, e7, o6);
      !e7 || o6 && ((t8) => t8 && 0 == t8.indexOf("@keyframes"))(o6.i) || (t7 = ((t8, r6) => r6.split(f2).reduce((r7, e8) => r7.concat(t8.split(f2).map((t9) => t9.indexOf("&") >= 0 ? t9.replace(/&/g, e8) : e8 + (":" == t9[0] || "[" == t9[0] ? "" : " ") + t9)), []).join(",\n"))(t7, e7)), o6 ? o6.t += g2(t7, r5.t) : w3(t7, r5.t);
      const i4 = ":root" == t7 ? "" : t7;
      r5.o.forEach((t8) => O2(t8.i, t8, i4, o6));
    }, k3 = (t7, e7) => {
      const n3 = r4[t7];
      return "function" == typeof n3 ? n3(...e7 ? e7.split(" ") : []) : n3 && n3 + " " + e7;
    }, S = (t7, r5, o6) => {
      if (o6 && !r5 && (r5 = o6, o6 = ""), !r5)
        return;
      if ("$" == r5[0]) {
        if ("$name" == r5)
          return t7.u = o6;
        if ("$compose" == r5)
          return t7.l = o6;
        r5 = "--" + r5.slice(1);
      }
      const c5 = k3(r5, o6);
      if (c5) {
        const r6 = _4(c5);
        return t7.t += r6.t, void (t7.o = t7.o.concat(r6.o));
      }
      if (!o6)
        return p4 && n2("no value for", r5);
      if (r5 = u2[r5] || r5, !a2[r5]) {
        const t8 = `-${i2}-${r5}`;
        a2[t8] && (r5 = t8);
      }
      o6.indexOf("$") >= 0 && (o6 = o6.replace(/\$([a-z0-9-]+)/gi, "var(--$1)")), l2(r5) && (o6 = o6.split(" ").map((t8) => isNaN(t8) ? t8 : t8 + e6).join(" "));
      const d5 = `  ${r5}: ${o6};
`;
      p4 && !$2(s4, d5) && n2("invalid css", d5), t7.t += d5;
    }, _4 = o2((t7) => {
      const r5 = [{ t: "", o: [] }];
      if (!(t7 = t7 && t7.trim()))
        return r5[0];
      t7 += ";";
      let e7 = 1, n3 = "", o6 = 0, i4 = "", s5 = "";
      for (let c5 = 0; c5 < t7.length; c5++) {
        const a4 = t7[c5];
        "\n" != a4 && (";" != a4 && "}" != a4 || i4) ? "{" != a4 || i4 ? 1 == e7 ? " " == a4 ? (s5 = n3.trim()) && (e7 = 2, n3 = "") : n3 += a4 : 2 == e7 && (i4 ? a4 == i4 && "\\" != t7[c5 - 1] && (i4 = "") : "'" != a4 && '"' != a4 || (i4 = a4), n3 += a4) : (r5[++o6] = { i: k3(s5, n3.trim()) || (s5 + " " + n3).trim(), t: "", o: [] }, e7 = 1, s5 = n3 = "") : (S(r5[o6], s5, n3.trim() + i4), "}" == a4 && r5[--o6].o.push(r5.pop()), e7 = 1, s5 = n3 = i4 = "");
      }
      return r5[0];
    }), A2 = o2((t7) => {
      const r5 = "anim-" + s4 + "-" + (b3 += 1);
      return O2("@keyframes " + r5, _4(t7)), r5;
    }), j3 = o2((t7) => {
      const r5 = _4(t7), e7 = (r5.u ? r5.u + "-" : "") + s4 + "-" + (b3 += 1);
      return O2("." + e7, r5), new v3(e7 + (r5.l ? " " + r5.l : ""));
    }), B2 = m2(j3);
    return B2.anim = m2(A2), B2.concat = z3, B2.getSheet = () => c4, B2.global = m2((t7) => O2(":root", _4(t7))), B2.helper = (t7) => Object.assign(r4, t7), B2.new = y, B2.setDebug = (t7) => p4 = t7, B2.setDot = (t7) => d4 = t7, B2.style = m2((t7) => _4(t7).t), B2;
  };
  var zaftig_min_default = y();

  // node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var r3;
  var u3;
  var i3;
  var o3 = 0;
  var f3 = [];
  var c3 = [];
  var e3 = l.__b;
  var a3 = l.__r;
  var v2 = l.diffed;
  var l3 = l.__c;
  var m3 = l.unmount;
  function d3(t6, u4) {
    l.__h && l.__h(r3, t6, o3 || u4), o3 = 0;
    var i4 = r3.__H || (r3.__H = { __: [], __h: [] });
    return t6 >= i4.__.length && i4.__.push({ __V: c3 }), i4.__[t6];
  }
  function p3(n3) {
    return o3 = 1, y2(B, n3);
  }
  function y2(n3, u4, i4) {
    var o6 = d3(t3++, 2);
    if (o6.t = n3, !o6.__c && (o6.__ = [i4 ? i4(u4) : B(void 0, u4), function(n4) {
      var t6 = o6.__N ? o6.__N[0] : o6.__[0], r4 = o6.t(t6, n4);
      t6 !== r4 && (o6.__N = [r4, o6.__[1]], o6.__c.setState({}));
    }], o6.__c = r3, !r3.u)) {
      r3.u = true;
      var f4 = r3.shouldComponentUpdate;
      r3.shouldComponentUpdate = function(n4, t6, r4) {
        if (!o6.__c.__H)
          return true;
        var u5 = o6.__c.__H.__.filter(function(n5) {
          return n5.__c;
        });
        if (u5.every(function(n5) {
          return !n5.__N;
        }))
          return !f4 || f4.call(this, n4, t6, r4);
        var i5 = false;
        return u5.forEach(function(n5) {
          if (n5.__N) {
            var t7 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t7 !== n5.__[0] && (i5 = true);
          }
        }), !(!i5 && o6.__c.props === n4) && (!f4 || f4.call(this, n4, t6, r4));
      };
    }
    return o6.__N || o6.__;
  }
  function h3(u4, i4) {
    var o6 = d3(t3++, 3);
    !l.__s && z2(o6.__H, i4) && (o6.__ = u4, o6.i = i4, r3.__H.__h.push(o6));
  }
  function s3(u4, i4) {
    var o6 = d3(t3++, 4);
    !l.__s && z2(o6.__H, i4) && (o6.__ = u4, o6.i = i4, r3.__h.push(o6));
  }
  function _2(n3) {
    return o3 = 5, F(function() {
      return { current: n3 };
    }, []);
  }
  function F(n3, r4) {
    var u4 = d3(t3++, 7);
    return z2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
  }
  function T2(n3, t6) {
    return o3 = 8, F(function() {
      return n3;
    }, t6);
  }
  function b2() {
    for (var t6; t6 = f3.shift(); )
      if (t6.__P && t6.__H)
        try {
          t6.__H.__h.forEach(k2), t6.__H.__h.forEach(w2), t6.__H.__h = [];
        } catch (r4) {
          t6.__H.__h = [], l.__e(r4, t6.__v);
        }
  }
  l.__b = function(n3) {
    "function" != typeof n3.type || n3.__m || null === n3.__ ? n3.__m || (n3.__m = n3.__ && n3.__.__m ? n3.__.__m : "") : n3.__m = (n3.__ && n3.__.__m ? n3.__.__m : "") + (n3.__ && n3.__.__k ? n3.__.__k.indexOf(n3) : 0), r3 = null, e3 && e3(n3);
  }, l.__r = function(n3) {
    a3 && a3(n3), t3 = 0;
    var i4 = (r3 = n3.__c).__H;
    i4 && (u3 === r3 ? (i4.__h = [], r3.__h = [], i4.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.__V = c3, n4.__N = n4.i = void 0;
    })) : (i4.__h.forEach(k2), i4.__h.forEach(w2), i4.__h = [])), u3 = r3;
  }, l.diffed = function(t6) {
    v2 && v2(t6);
    var o6 = t6.__c;
    o6 && o6.__H && (o6.__H.__h.length && (1 !== f3.push(o6) && i3 === l.requestAnimationFrame || ((i3 = l.requestAnimationFrame) || j2)(b2)), o6.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c3 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c3;
    })), u3 = r3 = null;
  }, l.__c = function(t6, r4) {
    r4.some(function(t7) {
      try {
        t7.__h.forEach(k2), t7.__h = t7.__h.filter(function(n3) {
          return !n3.__ || w2(n3);
        });
      } catch (u4) {
        r4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), r4 = [], l.__e(u4, t7.__v);
      }
    }), l3 && l3(t6, r4);
  }, l.unmount = function(t6) {
    m3 && m3(t6);
    var r4, u4 = t6.__c;
    u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
      try {
        k2(n3);
      } catch (n4) {
        r4 = n4;
      }
    }), u4.__H = void 0, r4 && l.__e(r4, u4.__v));
  };
  var g3 = "function" == typeof requestAnimationFrame;
  function j2(n3) {
    var t6, r4 = function() {
      clearTimeout(u4), g3 && cancelAnimationFrame(t6), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g3 && (t6 = requestAnimationFrame(r4));
  }
  function k2(n3) {
    var t6 = r3, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r3 = t6;
  }
  function w2(n3) {
    var t6 = r3;
    n3.__c = n3.__(), r3 = t6;
  }
  function z2(n3, t6) {
    return !n3 || n3.length !== t6.length || t6.some(function(t7, r4) {
      return t7 !== n3[r4];
    });
  }
  function B(n3, t6) {
    return "function" == typeof t6 ? t6(n3) : t6;
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
  var subURI = (template, subs) => Object.entries(subs).reduce(
    (acc, [k3, v3]) => acc.replace(":" + k3, encodeURIComponent(v3)),
    template
  );
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

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _3 = 0;
  function o4(o6, e6, n3, t6, f4) {
    var l4, s4, u4 = {};
    for (s4 in e6)
      "ref" == s4 ? l4 = e6[s4] : u4[s4] = e6[s4];
    var a4 = { type: o6, props: u4, key: n3, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_3, __source: f4, __self: t6 };
    if ("function" == typeof o6 && (l4 = o6.defaultProps))
      for (s4 in l4)
        void 0 === u4[s4] && (u4[s4] = l4[s4]);
    return l.vnode && l.vnode(a4), a4;
  }

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
    const ref = _2(null);
    const [color, setColor] = p3("currentColor");
    h3(() => {
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
    return /* @__PURE__ */ o4("img", {
      ref,
      className: cls,
      src: API + path,
      onClick
    });
  };

  // src/lib/api.ts
  var getJSON = (url) => fetch(url).then((res) => res.json());
  var searchPosts = async (query, sort = true) => {
    const payload = await getJSON(
      API_URL + "/search.json?" + buildQuery({ q: query, limit: "50" })
    ).catch((error) => logError(null, "api.getPosts() error", error));
    if (!payload)
      return [];
    const results = payload.data.children.map(({ data: post }) => ({
      ...post,
      title: decodeHTML(post.title)
    }));
    return sort ? results.sort((a4, b3) => b3.num_comments - a4.num_comments) : results;
  };
  var getComments = async ({ permalink }, parentComment) => {
    const payload = await getJSON(
      API_URL + permalink + ".json?" + buildQuery({ comment: parentComment == null ? void 0 : parentComment.data.id })
    ).catch((error) => logError(null, "api.getComments() error", error));
    if (!payload)
      return [];
    return payload[1].data.children;
  };
  var getMoreComments = async (link_id, children) => {
    const payload = await getJSON(
      API_URL + "/api/morechildren.json?" + buildQuery({ api_type: "json", link_id, children: children.join(",") })
    ).catch(() => null);
    if (!payload || payload.json.errors.length > 0)
      return logError([], "api.getMoreComments() error", payload);
    const flatComments = payload.json.data.things;
    const nestedComments = flatComments.reduce((acc, cmt) => {
      const parent = flatComments.find((x) => x.data.name === cmt.data.parent_id);
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
  var staterino_min_default = ({ merge: r4, hooks: { useReducer: c4, useLayoutEffect: o6 }, state: n3 = {} }) => {
    let s4 = n3;
    const a4 = (e6) => {
      return "string" == typeof e6 ? (t6 = s4, e6.split(".").reduce((e7, t7) => e7 ? e7[t7] : void 0, t6)) : e6(s4);
      var t6;
    }, l4 = (e6) => Array.isArray(e6) ? [e6.map(a4), true] : [a4(e6), false], u4 = (t6) => {
      const [r5, c5] = l4(t6.t);
      (c5 ? e4(r5, t6.o) : r5 === t6.o) || ("function" == typeof t6.s && t6.s(), t6.s = ((e6, t7, r6) => e6[r6 ? "apply" : "call"](null, t7))(t6.l, t6.o = r5, c5));
    }, f4 = /* @__PURE__ */ new Set(), y3 = (e6) => (f4.add(e6), u4(e6), () => f4.delete(e6)), i4 = (r5 = t4) => {
      const [, n4] = c4((e6) => e6 + 1, 0), [s5] = c4(t4, { l: n4 });
      return s5.t && (Array.isArray(r5) ? e4(r5, s5.t) : r5 === s5.t) || (s5.o = l4(r5)[0], s5.t = r5), o6(() => y3(s5), []), s5.o;
    };
    return i4.get = () => s4, i4.set = (e6) => {
      s4 = r4(s4, e6), f4.forEach(u4);
    }, i4.subscribe = (e6, r5) => (r5 || ([e6, r5] = [t4, e6]), y3({ l: r5, t: e6, o: [] })), i4;
  };

  // node_modules/mergerino/dist/mergerino.min.js
  var e5 = Object.assign || ((e6, t6) => (t6 && Object.keys(t6).forEach((o6) => e6[o6] = t6[o6]), e6));
  var t5 = (e6, r4, s4) => {
    const c4 = typeof s4;
    if (s4 && "object" === c4)
      if (Array.isArray(s4))
        for (const o6 of s4)
          r4 = t5(e6, r4, o6);
      else
        for (const c5 of Object.keys(s4)) {
          const f4 = s4[c5];
          "function" == typeof f4 ? r4[c5] = f4(r4[c5], o5) : void 0 === f4 ? e6 && !isNaN(c5) ? r4.splice(c5, 1) : delete r4[c5] : null === f4 || "object" != typeof f4 || Array.isArray(f4) ? r4[c5] = f4 : "object" == typeof r4[c5] ? r4[c5] = f4 === r4[c5] ? f4 : o5(r4[c5], f4) : r4[c5] = t5(false, {}, f4);
        }
    else
      "function" === c4 && (r4 = s4(r4, o5));
    return r4;
  };
  var o5 = (o6, ...r4) => {
    const s4 = Array.isArray(o6);
    return t5(s4, s4 ? o6.slice() : e5({}, o6), r4);
  };
  var mergerino_min_default = o5;

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
    hooks: { useLayoutEffect: s3, useReducer: y2 }
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
  subscribe(
    [(s4) => s4.firstLoad, (s4) => s4.commentsLoading, (s4) => s4.comments],
    (first, loading, comments) => {
      if (loading || !first)
        return;
      setFirstLoad(false);
      if (comments.length <= 0)
        setNoContent(true);
    }
  );
  subscribe([(s4) => s4.firstLoad, (s4) => s4.postsLoading, (s4) => s4.posts], (first, loading, posts) => {
    if (loading || !first)
      return;
    if (posts.length > 0) {
      setActivePost(posts[0]);
    } else {
      setFirstLoad(false);
      setNoContent(true);
    }
  });
  subscribe(
    (s4) => s4.activePost,
    (activePost) => {
      if (!activePost)
        return;
      setCommentsLoading(true);
      getComments(activePost).then((comments) => {
        setComments(comments);
        setCommentsLoading(false);
      });
    }
  );

  // src/cmp/PostSelect.tsx
  var MAX_INITIAL_VISIBLE = 7;
  var PostSelect = () => {
    const [posts, activePost] = useStore([(s4) => s4.posts, (s4) => s4.activePost]);
    const [showAll, setShowAll] = p3(false);
    const visiblePosts = posts.filter((post) => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE);
    const hiddenCount = posts.length - visiblePosts.length;
    let list = showAll ? posts : visiblePosts;
    if (activePost && !list.includes(activePost))
      list = [...list, activePost];
    if (list.length <= 0)
      return null;
    return /* @__PURE__ */ o4("div", {
      className: styles.container,
      children: [
        list.map((post) => /* @__PURE__ */ o4("button", {
          className: styles.item,
          style: { borderBottomColor: post === activePost ? "var(--text-secondary)" : "" },
          onClick: () => setActivePost(post),
          children: [
            /* @__PURE__ */ o4("div", {
              className: styles.numComments,
              children: [
                /* @__PURE__ */ o4(Icon, {
                  name: "message-circle"
                }),
                " ",
                reduceCount(post.num_comments)
              ]
            }),
            /* @__PURE__ */ o4("div", {
              title: post.subreddit,
              children: [
                "/r/",
                post.subreddit
              ]
            }),
            /* @__PURE__ */ o4("div", {
              title: post.title,
              children: post.title
            })
          ]
        }, post.name)),
        hiddenCount > 0 && posts.length > 1 && /* @__PURE__ */ o4("button", {
          className: styles.toggleEmpty,
          onClick: () => setShowAll(!showAll),
          children: showAll ? `Hide ${hiddenCount} posts` : `Show ${hiddenCount} hidden posts`
        })
      ]
    });
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
    const activePost = useStore((s4) => s4.activePost);
    const [loading, setLoading] = p3(false);
    const [failed, setFailed] = p3(false);
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
    return /* @__PURE__ */ o4("div", {
      className: styles2.wrapper,
      children: /* @__PURE__ */ o4("button", {
        disabled: loading || failed,
        className: styles2.button,
        onClick,
        children: label
      })
    });
  };
  var styles2 = createStyles({
    wrapper: zaftig_min_default`:not(:last-child) { margin-bottom 18 }`,
    button: zaftig_min_default`padding 5 10;border none`
  });

  // src/lib/hooks.ts
  var useRedraw = () => {
    const [, redraw] = y2((c4) => c4 + 1, 0);
    return redraw;
  };
  var useUpdatingRef = (value) => {
    const ref = _2(value);
    ref.current = value;
    return ref;
  };

  // src/cmp/PostComments/hooks.ts
  var useUpdate = (parent) => {
    const redraw = useRedraw();
    const parentRef = useUpdatingRef(parent);
    const update = T2((fn) => {
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
    return h(
      tag,
      { role: "button", tabIndex: 0, ...props, onKeyPress },
      children
    );
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
    const html = F(() => decodeHTML(body_html), [body_html]);
    const conf2 = useStore((s4) => s4.conf);
    const redraw = useRedraw();
    const ref = _2(null);
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
    const borderClassName = zaftig_min_default.concat(
      styles3.border,
      zaftig_min_default`$color ${borderColors[depth % borderColors.length]}`
    ).class;
    return /* @__PURE__ */ o4("div", {
      className: styles3.comment,
      children: [
        /* @__PURE__ */ o4(CustomButton, {
          tag: "div",
          "aria-label": ariaLabel,
          className: borderClassName,
          onClick: toggle
        }),
        /* @__PURE__ */ o4("div", {
          children: [
            /* @__PURE__ */ o4("div", {
              ref,
              className: styles3.commentInfo,
              style: { marginBottom: collapsed ? "" : "10px" },
              children: [
                /* @__PURE__ */ o4("a", {
                  className: styles3.author,
                  target: "_blank",
                  href: API_URL + subURI("/u/:author", { author }),
                  children: author
                }),
                /* @__PURE__ */ o4("span", {
                  className: styles3.ups,
                  children: reduceCount(ups)
                }),
                /* @__PURE__ */ o4("a", {
                  className: styles3.date,
                  target: "_blank",
                  href: API_URL + permalink,
                  children: [
                    prettyTime(createdTime, "date-time"),
                    editedTime && /* @__PURE__ */ o4(p, {
                      children: [
                        " edited ",
                        prettyTime(editedTime, differentDay ? "date-time" : "time")
                      ]
                    })
                  ]
                })
              ]
            }),
            !collapsed && /* @__PURE__ */ o4(p, {
              children: [
                /* @__PURE__ */ o4("div", {
                  className: styles3.body,
                  dangerouslySetInnerHTML: { __html: html },
                  onClick: (e6) => {
                    if (e6.target instanceof HTMLAnchorElement) {
                      e6.preventDefault();
                      const url = e6.target.href;
                      window.open(url.startsWith("/") ? API_URL + url : url);
                    }
                  }
                }),
                replies && /* @__PURE__ */ o4("div", {
                  className: styles3.replies,
                  children: replies.data.children.map((child) => /* @__PURE__ */ o4(PostCommentChild, {
                    thing: child,
                    update
                  }, child.data.id))
                })
              ]
            })
          ]
        })
      ]
    });
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
        return /* @__PURE__ */ o4(LoadMoreButton, {
          ...{ thing, ...rest }
        });
      case "t1":
        return /* @__PURE__ */ o4(PostComment, {
          ...{ thing, ...rest }
        });
      default:
        throw new Error("unknown child type");
    }
  }

  // src/cmp/PostComments/PostComments.tsx
  var PostComments = () => {
    const [loading, things, activePost] = useStore([
      (s4) => s4.commentsLoading,
      (s4) => s4.comments,
      (s4) => s4.activePost
    ]);
    const update = useUpdate(things || []);
    if (!activePost)
      return null;
    return /* @__PURE__ */ o4("div", {
      children: loading ? `Loading comments for ${activePost.title}\u2026` : things.length <= 0 ? "No comments yet." : things.map((thing) => /* @__PURE__ */ o4(PostCommentChild, {
        thing,
        update
      }, thing.data.id))
    });
  };

  // src/cmp/SwitchComments.tsx
  var SwitchComments = ({ onSwitch }) => {
    return /* @__PURE__ */ o4("button", {
      className: buttonStyle,
      onClick: onSwitch,
      children: "Switch comments"
    });
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
    return /* @__PURE__ */ o4("div", {
      className: overlay,
      onClick: (e6) => {
        if (e6.target === e6.currentTarget)
          onClose == null ? void 0 : onClose();
      },
      children: /* @__PURE__ */ o4("div", {
        className: card,
        children
      })
    });
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
    const [postsLoading, noPosts] = useStore([(s4) => s4.postsLoading, (s4) => s4.posts.length <= 0]);
    h3(() => {
      init(conf2);
      return subscribe([(s4) => s4.noContent], (noContent) => {
        if (noContent && visible)
          toggleVisible();
      });
    }, []);
    const [visible, setVisible] = p3(true);
    const toggleVisible = () => {
      setNativeCommentsVisible(visible);
      setVisible(!visible);
    };
    const message = postsLoading ? "Loading posts\u2026" : noPosts ? "No posts found\u2026" : "";
    const [open, setOpen] = p3(false);
    if (conf2.modal) {
      return /* @__PURE__ */ o4(p, {
        children: [
          /* @__PURE__ */ o4("button", {
            className: modalButton,
            onClick: () => setOpen(true),
            children: "Reddit"
          }),
          /* @__PURE__ */ o4(Modal, {
            open,
            onClose: () => setOpen(false),
            children: /* @__PURE__ */ o4(p, {
              children: message || /* @__PURE__ */ o4("div", {
                className: container,
                children: [
                  /* @__PURE__ */ o4(PostSelect, {}),
                  /* @__PURE__ */ o4(PostComments, {})
                ]
              })
            })
          })
        ]
      });
    }
    return /* @__PURE__ */ o4("div", {
      className: container,
      children: [
        /* @__PURE__ */ o4(SwitchComments, {
          onSwitch: toggleVisible
        }),
        visible && (message || /* @__PURE__ */ o4(p, {
          children: [
            /* @__PURE__ */ o4(PostSelect, {}),
            /* @__PURE__ */ o4(PostComments, {})
          ]
        }))
      ]
    });
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
    wrapper.className = Themes.common.concat(
      conf2.dark ? Themes.dark : Themes.light,
      conf2.theme && generateTheme(conf2.theme)
    ).class;
    if (conf2.modal) {
      area.prepend(wrapper);
    } else {
      area.style.display = "none";
      area.parentElement.insertBefore(wrapper, area);
    }
    P(
      /* @__PURE__ */ o4(App, {
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
      }),
      wrapper
    );
    return () => {
      P(null, wrapper);
      wrapper.remove();
    };
  }
})();
