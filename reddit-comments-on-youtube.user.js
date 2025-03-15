// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     2.0.0
// @match       https://*.youtube.com/*
// @match       https://*.crunchyroll.com/*
// @match       https://animepahe.ru/*
// @match       https://*.funimation.com/*
// @match       https://dramacool.com.tw/*
// @match       https://dramacool.com.tr/*
// @match       https://hianime.to/watch/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==
"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var t;
  var u;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n3, l4) {
    for (var t6 in l4) n3[t6] = l4[t6];
    return n3;
  }
  function g(n3) {
    n3 && n3.parentNode && n3.parentNode.removeChild(n3);
  }
  function _(l4, t6, u5) {
    var i5, r4, o5, e6 = {};
    for (o5 in t6) "key" == o5 ? i5 = t6[o5] : "ref" == o5 ? r4 = t6[o5] : e6[o5] = t6[o5];
    if (arguments.length > 2 && (e6.children = arguments.length > 3 ? n.call(arguments, 2) : u5), "function" == typeof l4 && null != l4.defaultProps) for (o5 in l4.defaultProps) void 0 === e6[o5] && (e6[o5] = l4.defaultProps[o5]);
    return m(l4, e6, i5, r4, null);
  }
  function m(n3, u5, i5, r4, o5) {
    var e6 = { type: n3, props: u5, key: i5, ref: r4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o5 ? ++t : o5, __i: -1, __u: 0 };
    return null == o5 && null != l.vnode && l.vnode(e6), e6;
  }
  function k(n3) {
    return n3.children;
  }
  function x(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function S(n3, l4) {
    if (null == l4) return n3.__ ? S(n3.__, n3.__i + 1) : null;
    for (var t6; l4 < n3.__k.length; l4++) if (null != (t6 = n3.__k[l4]) && null != t6.__e) return t6.__e;
    return "function" == typeof n3.type ? S(n3) : null;
  }
  function C(n3) {
    var l4, t6;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++) if (null != (t6 = n3.__k[l4]) && null != t6.__e) {
        n3.__e = n3.__c.base = t6.__e;
        break;
      }
      return C(n3);
    }
  }
  function M(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !$.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n3, t6, u5, r4, o5, f5, c4, s4 = 1; i.length; ) i.length > s4 && i.sort(e), n3 = i.shift(), s4 = i.length, n3.__d && (u5 = void 0, o5 = (r4 = (t6 = n3).__v).__e, f5 = [], c4 = [], t6.__P && ((u5 = w({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(u5), O(t6.__P, u5, r4, t6.__n, t6.__P.namespaceURI, 32 & r4.__u ? [o5] : null, f5, null == o5 ? S(r4) : o5, !!(32 & r4.__u), c4), u5.__v = r4.__v, u5.__.__k[u5.__i] = u5, z(f5, u5, c4), u5.__e != o5 && C(u5)));
    $.__r = 0;
  }
  function I(n3, l4, t6, u5, i5, r4, o5, e6, f5, c4, s4) {
    var a4, h4, y4, d4, w3, g3, _3 = u5 && u5.__k || v, m4 = l4.length;
    for (f5 = P(t6, l4, _3, f5, m4), a4 = 0; a4 < m4; a4++) null != (y4 = t6.__k[a4]) && (h4 = -1 === y4.__i ? p : _3[y4.__i] || p, y4.__i = a4, g3 = O(n3, y4, h4, i5, r4, o5, e6, f5, c4, s4), d4 = y4.__e, y4.ref && h4.ref != y4.ref && (h4.ref && q(h4.ref, null, y4), s4.push(y4.ref, y4.__c || d4, y4)), null == w3 && null != d4 && (w3 = d4), 4 & y4.__u || h4.__k === y4.__k ? f5 = A(y4, f5, n3) : "function" == typeof y4.type && void 0 !== g3 ? f5 = g3 : d4 && (f5 = d4.nextSibling), y4.__u &= -7);
    return t6.__e = w3, f5;
  }
  function P(n3, l4, t6, u5, i5) {
    var r4, o5, e6, f5, c4, s4 = t6.length, a4 = s4, h4 = 0;
    for (n3.__k = new Array(i5), r4 = 0; r4 < i5; r4++) null != (o5 = l4[r4]) && "boolean" != typeof o5 && "function" != typeof o5 ? (f5 = r4 + h4, (o5 = n3.__k[r4] = "string" == typeof o5 || "number" == typeof o5 || "bigint" == typeof o5 || o5.constructor == String ? m(null, o5, null, null, null) : d(o5) ? m(k, { children: o5 }, null, null, null) : void 0 === o5.constructor && o5.__b > 0 ? m(o5.type, o5.props, o5.key, o5.ref ? o5.ref : null, o5.__v) : o5).__ = n3, o5.__b = n3.__b + 1, e6 = null, -1 !== (c4 = o5.__i = L(o5, t6, f5, a4)) && (a4--, (e6 = t6[c4]) && (e6.__u |= 2)), null == e6 || null === e6.__v ? (-1 == c4 && (i5 > s4 ? h4-- : i5 < s4 && h4++), "function" != typeof o5.type && (o5.__u |= 4)) : c4 != f5 && (c4 == f5 - 1 ? h4-- : c4 == f5 + 1 ? h4++ : (c4 > f5 ? h4-- : h4++, o5.__u |= 4))) : n3.__k[r4] = null;
    if (a4) for (r4 = 0; r4 < s4; r4++) null != (e6 = t6[r4]) && 0 == (2 & e6.__u) && (e6.__e == u5 && (u5 = S(e6)), B(e6, e6));
    return u5;
  }
  function A(n3, l4, t6) {
    var u5, i5;
    if ("function" == typeof n3.type) {
      for (u5 = n3.__k, i5 = 0; u5 && i5 < u5.length; i5++) u5[i5] && (u5[i5].__ = n3, l4 = A(u5[i5], l4, t6));
      return l4;
    }
    n3.__e != l4 && (l4 && n3.type && !t6.contains(l4) && (l4 = S(n3)), t6.insertBefore(n3.__e, l4 || null), l4 = n3.__e);
    do {
      l4 = l4 && l4.nextSibling;
    } while (null != l4 && 8 == l4.nodeType);
    return l4;
  }
  function L(n3, l4, t6, u5) {
    var i5, r4, o5 = n3.key, e6 = n3.type, f5 = l4[t6];
    if (null === f5 && null == n3.key || f5 && o5 == f5.key && e6 === f5.type && 0 == (2 & f5.__u)) return t6;
    if (u5 > (null != f5 && 0 == (2 & f5.__u) ? 1 : 0)) for (i5 = t6 - 1, r4 = t6 + 1; i5 >= 0 || r4 < l4.length; ) {
      if (i5 >= 0) {
        if ((f5 = l4[i5]) && 0 == (2 & f5.__u) && o5 == f5.key && e6 === f5.type) return i5;
        i5--;
      }
      if (r4 < l4.length) {
        if ((f5 = l4[r4]) && 0 == (2 & f5.__u) && o5 == f5.key && e6 === f5.type) return r4;
        r4++;
      }
    }
    return -1;
  }
  function T(n3, l4, t6) {
    "-" == l4[0] ? n3.setProperty(l4, null == t6 ? "" : t6) : n3[l4] = null == t6 ? "" : "number" != typeof t6 || y.test(l4) ? t6 : t6 + "px";
  }
  function j(n3, l4, t6, u5, i5) {
    var r4;
    n: if ("style" == l4) if ("string" == typeof t6) n3.style.cssText = t6;
    else {
      if ("string" == typeof u5 && (n3.style.cssText = u5 = ""), u5) for (l4 in u5) t6 && l4 in t6 || T(n3.style, l4, "");
      if (t6) for (l4 in t6) u5 && t6[l4] === u5[l4] || T(n3.style, l4, t6[l4]);
    }
    else if ("o" == l4[0] && "n" == l4[1]) r4 = l4 != (l4 = l4.replace(f, "$1")), l4 = l4.toLowerCase() in n3 || "onFocusOut" == l4 || "onFocusIn" == l4 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + r4] = t6, t6 ? u5 ? t6.t = u5.t : (t6.t = c, n3.addEventListener(l4, r4 ? a : s, r4)) : n3.removeEventListener(l4, r4 ? a : s, r4);
    else {
      if ("http://www.w3.org/2000/svg" == i5) l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l4 && "height" != l4 && "href" != l4 && "list" != l4 && "form" != l4 && "tabIndex" != l4 && "download" != l4 && "rowSpan" != l4 && "colSpan" != l4 && "role" != l4 && "popover" != l4 && l4 in n3) try {
        n3[l4] = null == t6 ? "" : t6;
        break n;
      } catch (n4) {
      }
      "function" == typeof t6 || (null == t6 || false === t6 && "-" != l4[4] ? n3.removeAttribute(l4) : n3.setAttribute(l4, "popover" == l4 && 1 == t6 ? "" : t6));
    }
  }
  function F(n3) {
    return function(t6) {
      if (this.l) {
        var u5 = this.l[t6.type + n3];
        if (null == t6.u) t6.u = c++;
        else if (t6.u < u5.t) return;
        return u5(l.event ? l.event(t6) : t6);
      }
    };
  }
  function O(n3, t6, u5, i5, r4, o5, e6, f5, c4, s4) {
    var a4, h4, p4, v3, y4, _3, m4, b, S2, C3, M2, $3, P2, A3, H, L2, T3, j3 = t6.type;
    if (void 0 !== t6.constructor) return null;
    128 & u5.__u && (c4 = !!(32 & u5.__u), o5 = [f5 = t6.__e = u5.__e]), (a4 = l.__b) && a4(t6);
    n: if ("function" == typeof j3) try {
      if (b = t6.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a4 = j3.contextType) && i5[a4.__c], M2 = a4 ? C3 ? C3.props.value : a4.__ : i5, u5.__c ? m4 = (h4 = t6.__c = u5.__c).__ = h4.__E : (S2 ? t6.__c = h4 = new j3(b, M2) : (t6.__c = h4 = new x(b, M2), h4.constructor = j3, h4.render = D), C3 && C3.sub(h4), h4.props = b, h4.state || (h4.state = {}), h4.context = M2, h4.__n = i5, p4 = h4.__d = true, h4.__h = [], h4._sb = []), S2 && null == h4.__s && (h4.__s = h4.state), S2 && null != j3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = w({}, h4.__s)), w(h4.__s, j3.getDerivedStateFromProps(b, h4.__s))), v3 = h4.props, y4 = h4.state, h4.__v = t6, p4) S2 && null == j3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), S2 && null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
      else {
        if (S2 && null == j3.getDerivedStateFromProps && b !== v3 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(b, M2), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(b, h4.__s, M2) || t6.__v == u5.__v)) {
          for (t6.__v != u5.__v && (h4.props = b, h4.state = h4.__s, h4.__d = false), t6.__e = u5.__e, t6.__k = u5.__k, t6.__k.some(function(n4) {
            n4 && (n4.__ = t6);
          }), $3 = 0; $3 < h4._sb.length; $3++) h4.__h.push(h4._sb[$3]);
          h4._sb = [], h4.__h.length && e6.push(h4);
          break n;
        }
        null != h4.componentWillUpdate && h4.componentWillUpdate(b, h4.__s, M2), S2 && null != h4.componentDidUpdate && h4.__h.push(function() {
          h4.componentDidUpdate(v3, y4, _3);
        });
      }
      if (h4.context = M2, h4.props = b, h4.__P = n3, h4.__e = false, P2 = l.__r, A3 = 0, S2) {
        for (h4.state = h4.__s, h4.__d = false, P2 && P2(t6), a4 = h4.render(h4.props, h4.state, h4.context), H = 0; H < h4._sb.length; H++) h4.__h.push(h4._sb[H]);
        h4._sb = [];
      } else do {
        h4.__d = false, P2 && P2(t6), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
      } while (h4.__d && ++A3 < 25);
      h4.state = h4.__s, null != h4.getChildContext && (i5 = w(w({}, i5), h4.getChildContext())), S2 && !p4 && null != h4.getSnapshotBeforeUpdate && (_3 = h4.getSnapshotBeforeUpdate(v3, y4)), L2 = a4, null != a4 && a4.type === k && null == a4.key && (L2 = N(a4.props.children)), f5 = I(n3, d(L2) ? L2 : [L2], t6, u5, i5, r4, o5, e6, f5, c4, s4), h4.base = t6.__e, t6.__u &= -161, h4.__h.length && e6.push(h4), m4 && (h4.__E = h4.__ = null);
    } catch (n4) {
      if (t6.__v = null, c4 || null != o5) if (n4.then) {
        for (t6.__u |= c4 ? 160 : 128; f5 && 8 == f5.nodeType && f5.nextSibling; ) f5 = f5.nextSibling;
        o5[o5.indexOf(f5)] = null, t6.__e = f5;
      } else for (T3 = o5.length; T3--; ) g(o5[T3]);
      else t6.__e = u5.__e, t6.__k = u5.__k;
      l.__e(n4, t6, u5);
    }
    else null == o5 && t6.__v == u5.__v ? (t6.__k = u5.__k, t6.__e = u5.__e) : f5 = t6.__e = V(u5.__e, t6, u5, i5, r4, o5, e6, c4, s4);
    return (a4 = l.diffed) && a4(t6), 128 & t6.__u ? void 0 : f5;
  }
  function z(n3, t6, u5) {
    for (var i5 = 0; i5 < u5.length; i5++) q(u5[i5], u5[++i5], u5[++i5]);
    l.__c && l.__c(t6, n3), n3.some(function(t7) {
      try {
        n3 = t7.__h, t7.__h = [], n3.some(function(n4) {
          n4.call(t7);
        });
      } catch (n4) {
        l.__e(n4, t7.__v);
      }
    });
  }
  function N(n3) {
    return "object" != typeof n3 || null == n3 ? n3 : d(n3) ? n3.map(N) : w({}, n3);
  }
  function V(t6, u5, i5, r4, o5, e6, f5, c4, s4) {
    var a4, h4, v3, y4, w3, _3, m4, b = i5.props, k3 = u5.props, x2 = u5.type;
    if ("svg" == x2 ? o5 = "http://www.w3.org/2000/svg" : "math" == x2 ? o5 = "http://www.w3.org/1998/Math/MathML" : o5 || (o5 = "http://www.w3.org/1999/xhtml"), null != e6) {
      for (a4 = 0; a4 < e6.length; a4++) if ((w3 = e6[a4]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
        t6 = w3, e6[a4] = null;
        break;
      }
    }
    if (null == t6) {
      if (null == x2) return document.createTextNode(k3);
      t6 = document.createElementNS(o5, x2, k3.is && k3), c4 && (l.__m && l.__m(u5, e6), c4 = false), e6 = null;
    }
    if (null === x2) b === k3 || c4 && t6.data === k3 || (t6.data = k3);
    else {
      if (e6 = e6 && n.call(t6.childNodes), b = i5.props || p, !c4 && null != e6) for (b = {}, a4 = 0; a4 < t6.attributes.length; a4++) b[(w3 = t6.attributes[a4]).name] = w3.value;
      for (a4 in b) if (w3 = b[a4], "children" == a4) ;
      else if ("dangerouslySetInnerHTML" == a4) v3 = w3;
      else if (!(a4 in k3)) {
        if ("value" == a4 && "defaultValue" in k3 || "checked" == a4 && "defaultChecked" in k3) continue;
        j(t6, a4, null, w3, o5);
      }
      for (a4 in k3) w3 = k3[a4], "children" == a4 ? y4 = w3 : "dangerouslySetInnerHTML" == a4 ? h4 = w3 : "value" == a4 ? _3 = w3 : "checked" == a4 ? m4 = w3 : c4 && "function" != typeof w3 || b[a4] === w3 || j(t6, a4, w3, b[a4], o5);
      if (h4) c4 || v3 && (h4.__html === v3.__html || h4.__html === t6.innerHTML) || (t6.innerHTML = h4.__html), u5.__k = [];
      else if (v3 && (t6.innerHTML = ""), I("template" === u5.type ? t6.content : t6, d(y4) ? y4 : [y4], u5, i5, r4, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o5, e6, f5, e6 ? e6[0] : i5.__k && S(i5, 0), c4, s4), null != e6) for (a4 = e6.length; a4--; ) g(e6[a4]);
      c4 || (a4 = "value", "progress" == x2 && null == _3 ? t6.removeAttribute("value") : void 0 !== _3 && (_3 !== t6[a4] || "progress" == x2 && !_3 || "option" == x2 && _3 !== b[a4]) && j(t6, a4, _3, b[a4], o5), a4 = "checked", void 0 !== m4 && m4 !== t6[a4] && j(t6, a4, m4, b[a4], o5));
    }
    return t6;
  }
  function q(n3, t6, u5) {
    try {
      if ("function" == typeof n3) {
        var i5 = "function" == typeof n3.__u;
        i5 && n3.__u(), i5 && null == t6 || (n3.__u = n3(t6));
      } else n3.current = t6;
    } catch (n4) {
      l.__e(n4, u5);
    }
  }
  function B(n3, t6, u5) {
    var i5, r4;
    if (l.unmount && l.unmount(n3), (i5 = n3.ref) && (i5.current && i5.current !== n3.__e || q(i5, null, t6)), null != (i5 = n3.__c)) {
      if (i5.componentWillUnmount) try {
        i5.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, t6);
      }
      i5.base = i5.__P = null;
    }
    if (i5 = n3.__k) for (r4 = 0; r4 < i5.length; r4++) i5[r4] && B(i5[r4], t6, u5 || "function" != typeof n3.type);
    u5 || g(n3.__e), n3.__c = n3.__ = n3.__e = void 0;
  }
  function D(n3, l4, t6) {
    return this.constructor(n3, t6);
  }
  function E(t6, u5, i5) {
    var r4, o5, e6, f5;
    u5 == document && (u5 = document.documentElement), l.__ && l.__(t6, u5), o5 = (r4 = "function" == typeof i5) ? null : i5 && i5.__k || u5.__k, e6 = [], f5 = [], O(u5, t6 = (!r4 && i5 || u5).__k = _(k, null, [t6]), o5 || p, p, u5.namespaceURI, !r4 && i5 ? [i5] : o5 ? null : u5.firstChild ? n.call(u5.childNodes) : null, e6, !r4 && i5 ? i5 : o5 ? o5.__e : u5.firstChild, r4, f5), z(e6, t6, f5);
  }
  n = v.slice, l = { __e: function(n3, l4, t6, u5) {
    for (var i5, r4, o5; l4 = l4.__; ) if ((i5 = l4.__c) && !i5.__) try {
      if ((r4 = i5.constructor) && null != r4.getDerivedStateFromError && (i5.setState(r4.getDerivedStateFromError(n3)), o5 = i5.__d), null != i5.componentDidCatch && (i5.componentDidCatch(n3, u5 || {}), o5 = i5.__d), o5) return i5.__E = i5;
    } catch (l5) {
      n3 = l5;
    }
    throw n3;
  } }, t = 0, u = function(n3) {
    return null != n3 && null == n3.constructor;
  }, x.prototype.setState = function(n3, l4) {
    var t6;
    t6 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n3 && (n3 = n3(w({}, t6), this.props)), n3 && w(t6, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), M(this));
  }, x.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n3, l4) {
    return n3.__v.__b - l4.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // src/constants.ts
  var SCRIPT_NAME = "RCOY";
  var API_URL = "https://www.reddit.com";
  var MIN_LOAD_TIME = 300;
  var APP_ID = "RCOY";

  // src/lib/util.ts
  var getById = (id) => document.getElementById(id);
  var q2 = (sel, ctx = document) => ctx.querySelector(sel);
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
      if (fallback === "date") return date.toLocaleString();
      if (fallback === "date-time")
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
      if (fallback === "time") return date.toLocaleTimeString();
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
  var filterForEp = (episode, posts) => {
    const epRegex = new RegExp(`\\bepisode ${episode}\\b`, "i");
    return posts.filter((post) => epRegex.test(post.title));
  };
  var removeExtraRegex = /[^a-z0-9 ]*/gi;
  var cleanTitle = (title) => title.replace(removeExtraRegex, "");
  var filterForTitle = (title, posts) => {
    const query = cleanTitle(title).trim().toLocaleLowerCase();
    const filtered = posts.filter((post) => cleanTitle(post.title.toLocaleLowerCase()).includes(query));
    return filtered.length ? filtered : posts;
  };
  var keepTrying = (fn, max) => new Promise((resolve, reject) => {
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if (!fn()) {
        if (tries >= max) reject(clearInterval(id));
        return;
      }
      clearInterval(id);
      resolve();
    }, 1e3);
  });

  // src/lib/wait-for-elems.ts
  var waitForElemsWithTimout = ({
    timeout,
    onTimeout,
    ...rest
  }) => {
    const id = setTimeout(() => {
      stop();
      onTimeout?.();
    }, timeout);
    const { stop } = waitForElems({
      ...rest,
      stopWaiting: true,
      onMatch: (elem) => {
        clearTimeout(id);
        rest.onMatch(elem);
      }
    });
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
        if (stopWaiting) stop();
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

  // src/lib/wait-for-url.ts
  var waitForUrl = ({ matcher = "any", stopWaiting = false, onmatch }) => {
    const isMatch = matcher === "any" ? () => true : typeof matcher === "function" ? matcher : (url) => matcher.test(url);
    let lastUrl = "";
    const check = () => {
      const url = location.href;
      if (url === lastUrl) return;
      lastUrl = url;
      if (cleanup) {
        runCleanup();
        if (stopWaiting) return stop();
      }
      if (isMatch(url)) {
        try {
          cleanup = onmatch(url);
        } finally {
          if (stopWaiting && !cleanup) stop();
        }
      }
    };
    let cleanup;
    const runCleanup = () => {
      if (!cleanup) return;
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

  // src/lib/api.ts
  var getJSON = (url) => {
    if (window.GM_xmlhttpRequest) {
      return new Promise(
        (resolve, reject) => (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          window.GM_xmlhttpRequest({
            url,
            responseType: "json",
            anonymous: true,
            onerror: (response) => reject(response.responseText),
            onload: (response) => resolve(response.response)
          })
        )
      );
    }
    return fetch(url).then((res) => res.json());
  };
  var searchPosts = async (query) => {
    const payload = await getJSON(
      API_URL + "/search.json?" + buildQuery({ q: query, limit: "50" })
    ).catch((error) => logError(null, "api.searchPosts() error", error));
    if (!payload) return [];
    return payload.data.children.map(({ data: post }) => ({
      ...post,
      title: decodeHTML(post.title)
    }));
  };
  var getComments = async ({ permalink }, parentComment) => {
    const payload = await getJSON(
      API_URL + permalink + ".json?" + buildQuery({ comment: parentComment?.data.id })
    ).catch((error) => logError(null, "api.getComments() error", error));
    if (!payload) return [];
    const comments = payload[1].data.children;
    const post = payload[0].data.children[0].data;
    if (post.selftext_html) {
      return [
        {
          kind: "t1",
          data: {
            ...post,
            is_submitter: true,
            depth: 0,
            body_html: post.selftext_html,
            parent_id: post.id,
            collapsed: false,
            replies: ""
          }
        },
        ...comments
      ];
    }
    return comments;
  };
  var getMoreComments = async (link_id, children) => {
    const payload = await getJSON(
      API_URL + "/api/morechildren.json?" + buildQuery({ api_type: "json", link_id, children: children.join(",") })
    ).catch(() => null);
    if (!payload || payload.json.errors.length > 0)
      return logError([], "api.getMoreComments() error", payload);
    const flatComments = payload.json.data.things;
    const nestedComments = flatComments.reduce((acc, cmt) => {
      const parent = flatComments.find((x2) => x2.data.name === cmt.data.parent_id);
      if (parent) {
        if (parent.data.replies) parent.data.replies.data.children.push(cmt);
        else parent.data.replies = { data: { children: [cmt] } };
      } else acc.push(cmt);
      return acc;
    }, []);
    return nestedComments;
  };

  // src/conf/crunchyroll.ts
  var crunchyroll = {
    areaSelector: ".guestbook.comments",
    isMatch: () => !!getById("showmedia_about_media"),
    getPosts: async () => {
      const animeName = getById("showmedia_about_media")?.textContent?.replace(/\s+/g, " ");
      if (!animeName) return logError([], "unable to find anime name");
      const epNum = q2("#showmedia_about_media h4:last-child")?.textContent?.split(",").pop()?.match(/[0-9]+/)?.[0];
      const posts = await searchPosts(animeName + " discussion");
      return epNum ? filterForEp(epNum, posts) : posts;
    }
  };

  // src/conf/youtube.ts
  var getVideoIdFromUrl = (url) => url.match(/v=([^&]+)/i)?.[1];
  var youtube = {
    areaSelector: "#comments",
    scrollOffset: () => q2(".ytd-masthead")?.clientHeight || 60,
    isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
    theme: {
      background: "var(--yt-spec-general-background-a)",
      text: { normal: "var(--yt-spec-text-primary)", subdued: "var(--yt-spec-text-secondary)" },
      link: { color: "var(--yt-spec-call-to-action)" },
      button: { background: "var(--yt-spec-badge-chip-background)" },
      ups: "#ffa500"
    },
    getPosts: async () => {
      const url = location.href;
      const id = getVideoIdFromUrl(url);
      if (!id) return logError([], "failed to parse video id", url);
      return searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`);
    }
  };

  // src/conf/animepahe.ts
  var currentEpisodeSel = "#episodeMenu";
  var animepahe = {
    areaSelector: ".theatre",
    dark: true,
    mode: "insert",
    waitFor: currentEpisodeSel,
    async getPosts() {
      const title = q2("h1 a")?.title;
      if (!title) return logError([], "could not find title");
      const epNum = q2(currentEpisodeSel)?.textContent?.match(/\d+(\.\d+)?/)?.[0];
      const query = epNum ? `${title} episode ${epNum}` : title;
      let posts = await searchPosts(`subreddit:anime ${query}`);
      if (posts.length <= 0) posts = await searchPosts(query);
      return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts;
    }
  };

  // src/conf/funimation.ts
  var funimation = {
    areaSelector: ".video-player-controls__aux-controls",
    mode: "modal",
    dark: true,
    isMatch: (url) => url.includes("/v/"),
    getPosts: async () => {
      const [titleElem, epInfoElem] = qq(".meta-overlay__data-block li");
      const animeName = titleElem.textContent;
      if (!animeName) return logError([], "unable to find anime name");
      const url = subURI("https://kitsu.io/api/edge/anime?filter[text]=:animeName", { animeName });
      const data = await fetch(url).then((res) => res.json());
      const goodTitle = data.data[0].attributes.canonicalTitle;
      const epInfo = epInfoElem.textContent?.replace(/\s+/g, " ").match(/Episode [0-9]+/)?.[0];
      const posts = await searchPosts(goodTitle + " " + epInfo + " discussion");
      const epNum = epInfo?.match(/[0-9]+/)?.[0];
      return epNum ? filterForEp(epNum, posts) : posts;
    }
  };

  // src/conf/dramacool.ts
  var dramacool = {
    areaSelector: ".note",
    getPosts: async () => {
      const title = q2("h1")?.textContent;
      if (!title) return logError([], "unable to find title");
      const slicedTitle = title.slice(0, title.toLowerCase().lastIndexOf("english"));
      const posts = await searchPosts(slicedTitle);
      const epNum = slicedTitle.match(/episode ([0-9]+)/i)?.[1];
      if (!epNum) return posts;
      const regex = new RegExp(`\\b${epNum}\\b`);
      const found = posts.filter((x2) => regex.test(x2.title));
      return found.length > 0 ? found : posts;
    }
  };

  // src/conf/hianime.ts
  var currentEpisodeSel2 = ".ss-list a.active";
  var hianime = {
    areaSelector: "#comment-block",
    dark: true,
    mode: "swap",
    waitFor: currentEpisodeSel2,
    async getPosts() {
      const titleElem = q2("h2 a");
      const title = titleElem?.dataset.jname ?? titleElem?.title;
      if (!title) return logError([], "could not find title");
      const epNum = q2(currentEpisodeSel2)?.dataset.number;
      const query = epNum ? `${title} episode ${epNum}` : title;
      let posts = await searchPosts(`subreddit:anime ${query}`);
      if (posts.length <= 0) posts = await searchPosts(query);
      return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts;
    }
  };

  // src/conf/index.ts
  var confs = {
    crunchyroll,
    youtube,
    animepahe,
    funimation,
    dramacool,
    hianime
  };
  var confNames = Object.keys(confs);
  var getConf = () => {
    const host = location.hostname;
    const confName2 = confNames.find((name) => host.includes(name));
    return confName2 ? { conf: confs[confName2], confName: confName2 } : {};
  };

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
  var m2 = (r4) => function(e6, ...o5) {
    try {
      return t2(e6) ? r4.call(this, ((t6, r5) => t6.reduce((t7, e7, n3) => t7 + e7 + (null == r5[n3] ? "" : String(r5[n3])), ""))(e6, o5)) : r4.call(this, e6);
    } catch (t6) {
      return n2("error `", e6, "`", o5, "\n", t6), "";
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
  var y2 = (t6 = {}) => {
    const { helpers: r4 = {}, unit: e6 = "px", id: s4 = "z" + Math.random().toString(36).slice(2) } = t6;
    let { style: c4, dot: d4 = true, debug: p4 = false } = t6, b = 0;
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
        return this.concat(B3(...t7));
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
      const o5 = g2(e7 ? ((t8) => t8.replace(/(::?)([a-z-]+)(\()?/gi, (t9, r6, e8, n3) => ("placeholder" == e8 && "moz" != i2 ? e8 = "input-" + e8 : "matches" == e8 && (e8 = "any"), "-" == e8[0] || $2(n3 ? t9 + ".f)" : t9) ? t9 : `${r6}-${i2}-${e8}${n3 || ""}`)))(t7) : t7, r5);
      if (o5) {
        c4 || (c4 = h2(), c4.id = s4);
        try {
          c4.sheet.insertRule(o5, c4.sheet.cssRules.length), p4 && (c4.textContent += o5);
        } catch (o6) {
          !e7 && t7.indexOf(":") >= 0 ? w3(t7, r5, true) : n2("insert failed", t7, r5, o6);
        }
      }
    }, x2 = (t7) => t7.replace(/^/gm, "  ") + "\n", O2 = (t7, r5, e7 = "", o5) => {
      if (!t7) return p4 && n2("missing selector", r5);
      if (/^@(media|keyframes|supports)/.test(t7)) return ((t8, r6, e8, n3) => {
        r6.t = g2("" == e8 ? ":root" : e8, r6.t), r6.o.forEach((t9) => O2(t9.i, t9, e8, r6)), n3 ? n3.t += g2(t8, x2(r6.t)) : w3(t8, x2(r6.t));
      })(t7, r5, e7, o5);
      !e7 || o5 && ((t8) => t8 && 0 == t8.indexOf("@keyframes"))(o5.i) || (t7 = ((t8, r6) => r6.split(f2).reduce((r7, e8) => r7.concat(t8.split(f2).map((t9) => t9.indexOf("&") >= 0 ? t9.replace(/&/g, e8) : e8 + (":" == t9[0] || "[" == t9[0] ? "" : " ") + t9)), []).join(",\n"))(t7, e7)), o5 ? o5.t += g2(t7, r5.t) : w3(t7, r5.t);
      const i5 = ":root" == t7 ? "" : t7;
      r5.o.forEach((t8) => O2(t8.i, t8, i5, o5));
    }, k3 = (t7, e7) => {
      const n3 = r4[t7];
      return "function" == typeof n3 ? n3(...e7 ? e7.split(" ") : []) : n3 && n3 + " " + e7;
    }, S2 = (t7, r5, o5) => {
      if (o5 && !r5 && (r5 = o5, o5 = ""), !r5) return;
      if ("$" == r5[0]) {
        if ("$name" == r5) return t7.u = o5;
        if ("$compose" == r5) return t7.l = o5;
        r5 = "--" + r5.slice(1);
      }
      const c5 = k3(r5, o5);
      if (c5) {
        const r6 = _3(c5);
        return t7.t += r6.t, void (t7.o = t7.o.concat(r6.o));
      }
      if (!o5) return p4 && n2("no value for", r5);
      if (r5 = u2[r5] || r5, !a2[r5]) {
        const t8 = `-${i2}-${r5}`;
        a2[t8] && (r5 = t8);
      }
      o5.indexOf("$") >= 0 && (o5 = o5.replace(/\$([a-z0-9-]+)/gi, "var(--$1)")), l2(r5) && (o5 = o5.split(" ").map((t8) => isNaN(t8) ? t8 : t8 + e6).join(" "));
      const d5 = `  ${r5}: ${o5};
`;
      p4 && !$2(s4, d5) && n2("invalid css", d5), t7.t += d5;
    }, _3 = o2((t7) => {
      const r5 = [{ t: "", o: [] }];
      if (!(t7 = t7 && t7.trim())) return r5[0];
      t7 += ";";
      let e7 = 1, n3 = "", o5 = 0, i5 = "", s5 = "";
      for (let c5 = 0; c5 < t7.length; c5++) {
        const a4 = t7[c5];
        "\n" != a4 && (";" != a4 && "}" != a4 || i5) ? "{" != a4 || i5 ? 1 == e7 ? " " == a4 ? (s5 = n3.trim()) && (e7 = 2, n3 = "") : n3 += a4 : 2 == e7 && (i5 ? a4 == i5 && "\\" != t7[c5 - 1] && (i5 = "") : "'" != a4 && '"' != a4 || (i5 = a4), n3 += a4) : (r5[++o5] = { i: k3(s5, n3.trim()) || (s5 + " " + n3).trim(), t: "", o: [] }, e7 = 1, s5 = n3 = "") : (S2(r5[o5], s5, n3.trim() + i5), "}" == a4 && r5[--o5].o.push(r5.pop()), e7 = 1, s5 = n3 = i5 = "");
      }
      return r5[0];
    }), A3 = o2((t7) => {
      const r5 = "anim-" + s4 + "-" + (b += 1);
      return O2("@keyframes " + r5, _3(t7)), r5;
    }), j3 = o2((t7) => {
      const r5 = _3(t7), e7 = (r5.u ? r5.u + "-" : "") + s4 + "-" + (b += 1);
      return O2("." + e7, r5), new v3(e7 + (r5.l ? " " + r5.l : ""));
    }), B3 = m2(j3);
    return B3.anim = m2(A3), B3.concat = z3, B3.getSheet = () => c4, B3.global = m2((t7) => O2(":root", _3(t7))), B3.helper = (t7) => Object.assign(r4, t7), B3.new = y2, B3.setDebug = (t7) => p4 = t7, B3.setDot = (t7) => d4 = t7, B3.style = m2((t7) => _3(t7).t), B3;
  };
  var zaftig_min_default = y2();

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
      ups: "#ffa500"
    }),
    common: zaftig_min_default`
    max-width 1400
    margin auto
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

    .md-spoiler-text {
      transition background .5s ease
      background $text-normal
      cursor pointer

      &[data-open='true'] { background $background }
    }
  `
  };
  function generateTheme(theme) {
    const getVars = (obj, parents = []) => Object.entries(obj).reduce(
      (acc, [k3, v3]) => {
        const cur = [...parents, k3];
        if (typeof v3 === "object") Object.assign(acc, getVars(v3, cur));
        else acc[cur.join("-")] = v3;
        return acc;
      },
      {}
    );
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

  // node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var r3;
  var u3;
  var i3;
  var o3 = 0;
  var f3 = [];
  var c3 = l;
  var e3 = c3.__b;
  var a3 = c3.__r;
  var v2 = c3.diffed;
  var l3 = c3.__c;
  var m3 = c3.unmount;
  var s3 = c3.__;
  function p3(n3, t6) {
    c3.__h && c3.__h(r3, n3, o3 || t6), o3 = 0;
    var u5 = r3.__H || (r3.__H = { __: [], __h: [] });
    return n3 >= u5.__.length && u5.__.push({}), u5.__[n3];
  }
  function d3(n3) {
    return o3 = 1, h3(D2, n3);
  }
  function h3(n3, u5, i5) {
    var o5 = p3(t3++, 2);
    if (o5.t = n3, !o5.__c && (o5.__ = [i5 ? i5(u5) : D2(void 0, u5), function(n4) {
      var t6 = o5.__N ? o5.__N[0] : o5.__[0], r4 = o5.t(t6, n4);
      t6 !== r4 && (o5.__N = [r4, o5.__[1]], o5.__c.setState({}));
    }], o5.__c = r3, !r3.__f)) {
      var f5 = function(n4, t6, r4) {
        if (!o5.__c.__H) return true;
        var u6 = o5.__c.__H.__.filter(function(n5) {
          return !!n5.__c;
        });
        if (u6.every(function(n5) {
          return !n5.__N;
        })) return !c4 || c4.call(this, n4, t6, r4);
        var i6 = o5.__c.props !== n4;
        return u6.forEach(function(n5) {
          if (n5.__N) {
            var t7 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t7 !== n5.__[0] && (i6 = true);
          }
        }), c4 && c4.call(this, n4, t6, r4) || i6;
      };
      r3.__f = true;
      var c4 = r3.shouldComponentUpdate, e6 = r3.componentWillUpdate;
      r3.componentWillUpdate = function(n4, t6, r4) {
        if (this.__e) {
          var u6 = c4;
          c4 = void 0, f5(n4, t6, r4), c4 = u6;
        }
        e6 && e6.call(this, n4, t6, r4);
      }, r3.shouldComponentUpdate = f5;
    }
    return o5.__N || o5.__;
  }
  function y3(n3, u5) {
    var i5 = p3(t3++, 3);
    !c3.__s && C2(i5.__H, u5) && (i5.__ = n3, i5.u = u5, r3.__H.__h.push(i5));
  }
  function _2(n3, u5) {
    var i5 = p3(t3++, 4);
    !c3.__s && C2(i5.__H, u5) && (i5.__ = n3, i5.u = u5, r3.__h.push(i5));
  }
  function A2(n3) {
    return o3 = 5, T2(function() {
      return { current: n3 };
    }, []);
  }
  function T2(n3, r4) {
    var u5 = p3(t3++, 7);
    return C2(u5.__H, r4) && (u5.__ = n3(), u5.__H = r4, u5.__h = n3), u5.__;
  }
  function q3(n3, t6) {
    return o3 = 8, T2(function() {
      return n3;
    }, t6);
  }
  function j2() {
    for (var n3; n3 = f3.shift(); ) if (n3.__P && n3.__H) try {
      n3.__H.__h.forEach(z2), n3.__H.__h.forEach(B2), n3.__H.__h = [];
    } catch (t6) {
      n3.__H.__h = [], c3.__e(t6, n3.__v);
    }
  }
  c3.__b = function(n3) {
    r3 = null, e3 && e3(n3);
  }, c3.__ = function(n3, t6) {
    n3 && t6.__k && t6.__k.__m && (n3.__m = t6.__k.__m), s3 && s3(n3, t6);
  }, c3.__r = function(n3) {
    a3 && a3(n3), t3 = 0;
    var i5 = (r3 = n3.__c).__H;
    i5 && (u3 === r3 ? (i5.__h = [], r3.__h = [], i5.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.u = n4.__N = void 0;
    })) : (i5.__h.forEach(z2), i5.__h.forEach(B2), i5.__h = [], t3 = 0)), u3 = r3;
  }, c3.diffed = function(n3) {
    v2 && v2(n3);
    var t6 = n3.__c;
    t6 && t6.__H && (t6.__H.__h.length && (1 !== f3.push(t6) && i3 === c3.requestAnimationFrame || ((i3 = c3.requestAnimationFrame) || w2)(j2)), t6.__H.__.forEach(function(n4) {
      n4.u && (n4.__H = n4.u), n4.u = void 0;
    })), u3 = r3 = null;
  }, c3.__c = function(n3, t6) {
    t6.some(function(n4) {
      try {
        n4.__h.forEach(z2), n4.__h = n4.__h.filter(function(n5) {
          return !n5.__ || B2(n5);
        });
      } catch (r4) {
        t6.some(function(n5) {
          n5.__h && (n5.__h = []);
        }), t6 = [], c3.__e(r4, n4.__v);
      }
    }), l3 && l3(n3, t6);
  }, c3.unmount = function(n3) {
    m3 && m3(n3);
    var t6, r4 = n3.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n4) {
      try {
        z2(n4);
      } catch (n5) {
        t6 = n5;
      }
    }), r4.__H = void 0, t6 && c3.__e(t6, r4.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n3) {
    var t6, r4 = function() {
      clearTimeout(u5), k2 && cancelAnimationFrame(t6), setTimeout(n3);
    }, u5 = setTimeout(r4, 100);
    k2 && (t6 = requestAnimationFrame(r4));
  }
  function z2(n3) {
    var t6 = r3, u5 = n3.__c;
    "function" == typeof u5 && (n3.__c = void 0, u5()), r3 = t6;
  }
  function B2(n3) {
    var t6 = r3;
    n3.__c = n3.__(), r3 = t6;
  }
  function C2(n3, t6) {
    return !n3 || n3.length !== t6.length || t6.some(function(t7, r4) {
      return t7 !== n3[r4];
    });
  }
  function D2(n3, t6) {
    return "function" == typeof t6 ? t6(n3) : t6;
  }

  // node_modules/staterino/dist/staterino.min.js
  var e4 = (e6, t6) => e6 === t6 || e6.length === t6.length && e6.every((e7, r4) => e7 === t6[r4]);
  var t4 = (e6) => e6;
  var staterino_min_default = ({ merge: r4, hooks: { useReducer: c4, useLayoutEffect: o5 }, state: n3 = {} }) => {
    let s4 = n3;
    const a4 = (e6) => {
      return "string" == typeof e6 ? (t6 = s4, e6.split(".").reduce((e7, t7) => e7 ? e7[t7] : void 0, t6)) : e6(s4);
      var t6;
    }, l4 = (e6) => Array.isArray(e6) ? [e6.map(a4), true] : [a4(e6), false], u5 = (t6) => {
      const [r5, c5] = l4(t6.t);
      (c5 ? e4(r5, t6.o) : r5 === t6.o) || ("function" == typeof t6.s && t6.s(), t6.s = ((e6, t7, r6) => e6[r6 ? "apply" : "call"](null, t7))(t6.l, t6.o = r5, c5));
    }, f5 = /* @__PURE__ */ new Set(), y4 = (e6) => (f5.add(e6), u5(e6), () => f5.delete(e6)), i5 = (r5 = t4) => {
      const [, n4] = c4((e6) => e6 + 1, 0), [s5] = c4(t4, { l: n4 });
      return s5.t && (Array.isArray(r5) ? e4(r5, s5.t) : r5 === s5.t) || (s5.o = l4(r5)[0], s5.t = r5), o5(() => y4(s5), []), s5.o;
    };
    return i5.get = () => s4, i5.set = (e6) => {
      s4 = r4(s4, e6), f5.forEach(u5);
    }, i5.subscribe = (e6, r5) => (r5 || ([e6, r5] = [t4, e6]), y4({ l: r5, t: e6, o: [] })), i5;
  };

  // node_modules/mergerino/dist/mergerino.min.js
  var e5 = Object.assign || ((e6, t6) => (t6 && Object.keys(t6).forEach((o5) => e6[o5] = t6[o5]), e6));
  var t5 = (e6, r4, s4) => {
    const c4 = typeof s4;
    if (s4 && "object" === c4) if (Array.isArray(s4)) for (const o5 of s4) r4 = t5(e6, r4, o5);
    else for (const c5 of Object.keys(s4)) {
      const f5 = s4[c5];
      "function" == typeof f5 ? r4[c5] = f5(r4[c5], o4) : void 0 === f5 ? e6 && !isNaN(c5) ? r4.splice(c5, 1) : delete r4[c5] : null === f5 || "object" != typeof f5 || Array.isArray(f5) ? r4[c5] = f5 : "object" == typeof r4[c5] ? r4[c5] = f5 === r4[c5] ? f5 : o4(r4[c5], f5) : r4[c5] = t5(false, {}, f5);
    }
    else "function" === c4 && (r4 = s4(r4, o4));
    return r4;
  };
  var o4 = (o5, ...r4) => {
    const s4 = Array.isArray(o5);
    return t5(s4, s4 ? o5.slice() : e5({}, o5), r4);
  };
  var mergerino_min_default = o4;

  // src/state/state.ts
  var initialState = {
    // conf will always be loaded by init()
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
    hooks: { useLayoutEffect: _2, useReducer: h3 }
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
    if (!conf2.waitFor) return loadConf(conf2);
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
  var loadComments = async (post) => {
    setCommentsLoading(true);
    const comments = await getComments(post);
    setComments(comments);
    setCommentsLoading(false);
  };

  // src/state/subs.ts
  subscribe(
    [(s4) => s4.firstLoad, (s4) => s4.commentsLoading, (s4) => s4.comments],
    (first, loading, comments) => {
      if (loading || !first) return;
      setFirstLoad(false);
      if (comments.length <= 0) setNoContent(true);
    }
  );
  subscribe([(s4) => s4.firstLoad, (s4) => s4.postsLoading, (s4) => s4.posts], (first, loading, posts) => {
    if (loading || !first) return;
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
      if (!activePost) return;
      loadComments(activePost);
    }
  );

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f4 = 0;
  var i4 = Array.isArray;
  function u4(e6, t6, n3, o5, i5, u5) {
    t6 || (t6 = {});
    var a4, c4, p4 = t6;
    if ("ref" in p4) for (c4 in p4 = {}, t6) "ref" == c4 ? a4 = t6[c4] : p4[c4] = t6[c4];
    var l4 = { type: e6, props: p4, key: n3, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f4, __i: -1, __u: 0, __source: i5, __self: u5 };
    if ("function" == typeof e6 && (a4 = e6.defaultProps)) for (c4 in a4) void 0 === p4[c4] && (p4[c4] = a4[c4]);
    return l.vnode && l.vnode(l4), l4;
  }

  // src/cmp/SwitchComments.tsx
  var SwitchComments = ({ onSwitch }) => {
    return /* @__PURE__ */ u4("button", { className: button.class, onClick: onSwitch, children: "Switch comments" });
  };
  var button = zaftig_min_default`
  cursor pointer
  border none
  background $button-background
  text-align left
  transition all 0.2s ease
  border-radius 6
  margin-top 10
  padding 12
  width 100%
  &:hover {
    opacity 0.8
  }
`;

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
    const ref = A2(null);
    const [color, setColor] = d3("currentColor");
    y3(() => {
      const update = () => {
        if (!ref.current) return;
        let newColor = getCSSVar(themeColor, ref.current).slice(1);
        if (newColor.length === 3) newColor += newColor;
        setColor(newColor);
      };
      update();
      const id = setInterval(update, 5e3);
      return () => clearInterval(id);
    }, [themeColor]);
    const cls = zaftig_min_default`vertical-align sub`.concat(spin && "spin", className).class;
    const path = subURI("/:name.svg?size=:size&color=:color", { name, color, size: String(size) });
    return /* @__PURE__ */ u4("img", { ref, className: cls, src: API + path, onClick });
  };

  // src/cmp/PostSelect.tsx
  var MAX_INITIAL_VISIBLE = 7;
  var MIN_SHIMMER_DURATION = 700;
  var PostSelect = () => {
    const [posts, activePost, commentsLoading] = useStore([
      (s4) => s4.posts,
      (s4) => s4.activePost,
      (s4) => s4.commentsLoading
    ]);
    const [showAll, setShowAll] = d3(false);
    const [isShimmering, setIsShimmering] = d3(false);
    const [shimmerVisible, setShimmerVisible] = d3(false);
    y3(() => {
      if (commentsLoading) {
        setIsShimmering(true);
        setShimmerVisible(true);
        setTimeout(() => {
          setIsShimmering(false);
          setTimeout(() => {
            setShimmerVisible(false);
          }, 300);
        }, MIN_SHIMMER_DURATION);
      }
    }, [commentsLoading]);
    const visiblePosts = posts.filter((post) => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE);
    const hiddenCount = posts.length - visiblePosts.length;
    let list = showAll ? posts : visiblePosts;
    if (activePost && list.every((post) => post.id !== activePost.id)) list = [...list, activePost];
    if (list.length <= 0) return null;
    return /* @__PURE__ */ u4("div", { className: zaftig_min_default.concat(styles.container, list.length === 1 && zaftig_min_default`gtc 1fr`).class, children: [
      list.map((post) => /* @__PURE__ */ u4(
        "button",
        {
          className: zaftig_min_default.concat(
            styles.button,
            styles.item,
            post === activePost && styles.activeItem,
            post === activePost && (commentsLoading || shimmerVisible) && styles.shimmer,
            post === activePost && !isShimmering && shimmerVisible && styles.shimmerFadeOut
          ).class,
          onClick: () => post === activePost ? loadComments(post) : setActivePost(post),
          children: [
            /* @__PURE__ */ u4("div", { className: styles.postInfo, children: [
              /* @__PURE__ */ u4("div", { className: styles.subreddit, title: post.subreddit, children: [
                "r/",
                post.subreddit
              ] }),
              /* @__PURE__ */ u4("div", { className: styles.numComments, children: [
                /* @__PURE__ */ u4(Icon, { name: "message-circle" }),
                " ",
                reduceCount(post.num_comments)
              ] })
            ] }),
            /* @__PURE__ */ u4("div", { className: styles.title, title: post.title, children: post.title })
          ]
        },
        post.name
      )),
      hiddenCount > 0 && posts.length > 1 && /* @__PURE__ */ u4(
        "button",
        {
          className: zaftig_min_default.concat(styles.button, styles.toggleEmpty).class,
          onClick: () => setShowAll(!showAll),
          children: showAll ? `Hide ${hiddenCount} posts` : `Show ${hiddenCount} hidden posts`
        }
      )
    ] });
  };
  var shimmer = zaftig_min_default.anim`
  100% {
    transform translateX(100%)
  }
`;
  var styles = createStyles({
    container: zaftig_min_default`
    display grid
    grid-template-columns 1fr 1fr
    gap 8
    padding 8 0
    background $background
    border-radius 8
  `,
    button: zaftig_min_default`
    cursor pointer
    border none
    background $button-background
    overflow hidden
    margin 0
    text-align left
    transition all 0.2s ease
    border-radius 6
    padding 6 10
    &:hover {
      opacity 0.8
    }
  `,
    item: zaftig_min_default`
    display flex
    flex-direction column
    gap 4
  `,
    activeItem: zaftig_min_default`
    outline 2px solid $ups !important
    &:hover {
      opacity 1
    }
  `,
    postInfo: zaftig_min_default`
    display flex
    justify-content space-between
    align-items center
  `,
    subreddit: zaftig_min_default`font-weight 500 color;$text-subdued`,
    numComments: zaftig_min_default`
    display flex
    align-items center
    gap 4
    color $text-subdued
    font-size 0.9em
  `,
    title: zaftig_min_default`
    font-size 1.1em
    color $text-normal
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  `,
    toggleEmpty: zaftig_min_default` color $text-subdued;text-align center`,
    shimmer: zaftig_min_default`
    position relative
    overflow hidden
    &::after {
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      transform translateX(-100%)
      background-image linear-gradient( 90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))
      animation ${shimmer} 2s infinite
      transition opacity 0.3s ease-out
    }
  `,
    shimmerFadeOut: zaftig_min_default`
    &::after {
      opacity 0
    }
  `
  });

  // src/cmp/PostComments/cmp/LoadMoreButton.tsx
  var LoadMoreButton = ({ thing, update }) => {
    const activePost = useStore((s4) => s4.activePost);
    const [loading, setLoading] = d3(false);
    const [failed, setFailed] = d3(false);
    const { count, children } = thing.data;
    if (count <= 0) return null;
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
        if (currentPosition >= 0) parent.splice(currentPosition, 1, ...results);
      });
    };
    return /* @__PURE__ */ u4("div", { className: styles2.wrapper, children: /* @__PURE__ */ u4("button", { disabled: loading || failed, className: styles2.button, onClick, children: label }) });
  };
  var styles2 = createStyles({
    wrapper: zaftig_min_default`:not(:last-child) { margin-bottom 18 }`,
    button: zaftig_min_default`padding 5 10;border none`
  });

  // src/base/CustomButton.tsx
  function CustomButton({ tag, children, ...props }) {
    const onKeyPress = (e6) => {
      props.onKeyPress?.call(e6.currentTarget, e6);
      if (!e6.defaultPrevented && props.onClick && (e6.key === " " || e6.key === "Enter")) {
        e6.preventDefault();
        props.onClick.call(e6.currentTarget, e6);
      }
    };
    return _(
      tag,
      { role: "button", tabIndex: 0, ...props, onKeyPress },
      children
    );
  }

  // src/lib/hooks.ts
  var useRedraw = () => {
    const [, redraw] = h3((c4) => c4 + 1, 0);
    return redraw;
  };
  var useUpdatingRef = (value) => {
    const ref = A2(value);
    ref.current = value;
    return ref;
  };
  var useDelayedLoadingState = (loading, minLoadTime) => {
    const [delayedLoading, setDelayedLoading] = d3(loading);
    const loadingStartTime = A2(0);
    y3(() => {
      if (loading) {
        setDelayedLoading(true);
        loadingStartTime.current = Date.now();
      } else {
        const elapsedTime = Date.now() - loadingStartTime.current;
        loadingStartTime.current = 0;
        if (elapsedTime < minLoadTime) {
          const remainingTime = Math.max(minLoadTime - elapsedTime, 0);
          const id = setTimeout(() => setDelayedLoading(false), remainingTime);
          return () => clearTimeout(id);
        } else {
          setDelayedLoading(false);
        }
      }
    }, [loading, minLoadTime]);
    return delayedLoading;
  };

  // src/cmp/PostComments/hooks.ts
  var useUpdate = (parent) => {
    const redraw = useRedraw();
    const parentRef = useUpdatingRef(parent);
    const update = q3((fn) => {
      fn(parentRef.current);
      redraw();
    }, []);
    return update;
  };

  // src/cmp/PostComments/cmp/PostComment.tsx
  var PostComment = ({ thing }) => {
    const {
      ups,
      author,
      body_html,
      replies,
      collapsed: dataCollapsed,
      created_utc,
      edited,
      permalink,
      depth
    } = thing.data;
    const html = T2(() => decodeHTML(body_html), [body_html]);
    const spoilerState = T2(() => /* @__PURE__ */ new WeakSet(), []);
    const conf2 = useStore((s4) => s4.conf);
    const ref = A2(null);
    const contentRef = A2(null);
    const lastHeight = A2(0);
    y3(() => {
      if (contentRef.current && dataCollapsed) {
        lastHeight.current = contentRef.current.scrollHeight;
        contentRef.current.style.maxHeight = "0";
      }
    }, [dataCollapsed]);
    const [collapsed, setCollapsed] = d3(dataCollapsed);
    const toggle = () => {
      const contentElem = contentRef.current;
      if (!contentElem) return;
      if (collapsed) {
        contentElem.addEventListener("transitionend", () => contentElem.style.maxHeight = "none", {
          once: true
        });
      } else {
        lastHeight.current = contentElem.scrollHeight;
        requestAnimationFrame(() => contentElem.style.maxHeight = "0");
      }
      contentElem.style.maxHeight = lastHeight.current + "px";
      setCollapsed(!collapsed);
      const offset = typeof conf2.scrollOffset === "function" ? conf2.scrollOffset() : conf2.scrollOffset;
      if (ref.current && ref.current.getBoundingClientRect().top < (offset ?? 0)) {
        ref.current.scrollIntoView();
        if (offset) window.scrollBy(0, -offset);
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
    return /* @__PURE__ */ u4("div", { className: styles3.comment, children: [
      /* @__PURE__ */ u4(CustomButton, { tag: "div", "aria-label": ariaLabel, className: borderClassName, onClick: toggle }),
      /* @__PURE__ */ u4("div", { children: [
        /* @__PURE__ */ u4("div", { ref, className: styles3.commentInfo, children: [
          /* @__PURE__ */ u4(
            "a",
            {
              className: styles3.author,
              target: "_blank",
              href: API_URL + subURI("/u/:author", { author }),
              children: author
            }
          ),
          /* @__PURE__ */ u4("span", { className: styles3.ups, children: [
            /* @__PURE__ */ u4(Icon, { name: "arrow-up", themeColor: "ups" }),
            reduceCount(ups)
          ] }),
          /* @__PURE__ */ u4("a", { className: styles3.date, target: "_blank", href: API_URL + permalink, children: [
            prettyTime(createdTime, "date-time"),
            editedTime && /* @__PURE__ */ u4(k, { children: [
              " edited ",
              prettyTime(editedTime, differentDay ? "date-time" : "time")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u4(
          "div",
          {
            className: styles3.commentContent,
            ref: contentRef,
            style: { opacity: collapsed ? 0 : 1 },
            children: [
              /* @__PURE__ */ u4("div", { style: { paddingTop: "10px" } }),
              /* @__PURE__ */ u4(
                "div",
                {
                  className: styles3.body,
                  dangerouslySetInnerHTML: { __html: html },
                  onClick: (e6) => {
                    if (e6.target instanceof HTMLAnchorElement) {
                      e6.preventDefault();
                      const url = e6.target.href;
                      window.open(url.startsWith("/") ? API_URL + url : url);
                    } else if (e6.target instanceof HTMLElement) {
                      if (e6.target.classList.contains("md-spoiler-text")) {
                        if (spoilerState.has(e6.target)) {
                          e6.target.dataset.open = "false";
                          spoilerState.delete(e6.target);
                        } else {
                          e6.target.dataset.open = "true";
                          spoilerState.add(e6.target);
                        }
                      }
                    }
                  }
                }
              ),
              replies && /* @__PURE__ */ u4("div", { className: styles3.replies, children: replies.data.children.map((child) => /* @__PURE__ */ u4(PostCommentChild, { thing: child, update }, child.data.id)) })
            ]
          }
        )
      ] })
    ] });
  };
  var styles3 = createStyles({
    comment: zaftig_min_default`
    display grid
    grid-template-columns auto 1fr
    :not(:last-child) { margin-bottom 18 }
    gap 18
  `,
    commentContent: zaftig_min_default`
    overflow hidden
    transition max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out
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
        return /* @__PURE__ */ u4(LoadMoreButton, { ...{ thing, ...rest } });
      case "t1":
        return /* @__PURE__ */ u4(PostComment, { ...{ thing, ...rest } });
      default:
        throw new Error("unknown child type");
    }
  }

  // src/cmp/PostComments/LoadingAnimation.tsx
  var spinAnim = zaftig_min_default.anim`
  0% { transform rotate(0deg) }
  100% { transform rotate(360deg) }
`;
  var styles4 = zaftig_min_default`
  width 50px
  height 50px
  animation ${spinAnim} 1s linear infinite
`;
  var LoadingAnimation = () => /* @__PURE__ */ u4("svg", { className: styles4.class, viewBox: "0 0 50 50", children: /* @__PURE__ */ u4(
    "circle",
    {
      cx: "25",
      cy: "25",
      r: "20",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "5",
      "stroke-linecap": "round",
      "stroke-dasharray": "80,200"
    }
  ) });

  // src/cmp/PostComments/NoComments.tsx
  var styles5 = zaftig_min_default`
  text-align center
  padding 20px
  svg {
    width 100px
    height 100px
    margin-bottom 10px
  }
`;
  var NoComments = () => /* @__PURE__ */ u4("div", { className: styles5.class, children: [
    /* @__PURE__ */ u4(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        children: [
          /* @__PURE__ */ u4("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ u4("line", { x1: "8", y1: "15", x2: "16", y2: "15" }),
          /* @__PURE__ */ u4("line", { x1: "9", y1: "9", x2: "9.01", y2: "9" }),
          /* @__PURE__ */ u4("line", { x1: "15", y1: "9", x2: "15.01", y2: "9" })
        ]
      }
    ),
    /* @__PURE__ */ u4("p", { children: "No comments found." })
  ] });

  // src/cmp/PostComments/PostComments.tsx
  var PostComments = () => {
    const [loading, things, activePost] = useStore([
      (s4) => s4.commentsLoading,
      (s4) => s4.comments,
      (s4) => s4.activePost
    ]);
    const update = useUpdate(things || []);
    const delayedLoading = useDelayedLoadingState(loading, MIN_LOAD_TIME);
    if (!activePost) return null;
    return /* @__PURE__ */ u4("div", { id: APP_ID + "PostComments", children: delayedLoading ? /* @__PURE__ */ u4("div", { className: styles6.centerNotice, children: [
      /* @__PURE__ */ u4(LoadingAnimation, {}),
      /* @__PURE__ */ u4("span", { className: styles6.loadingText, children: [
        "Loading comments for ",
        activePost.title.slice(0, 20),
        "\u2026"
      ] })
    ] }) : things.length <= 0 ? /* @__PURE__ */ u4("div", { className: styles6.centerNotice, children: /* @__PURE__ */ u4(NoComments, {}) }) : things.map((thing) => /* @__PURE__ */ u4(PostCommentChild, { thing, update }, thing.data.id)) });
  };
  var styles6 = createStyles({
    centerNotice: zaftig_min_default`
    display flex
    justify-content center
    align-items center
    min-height 200px
  `,
    loadingText: zaftig_min_default`margin-left 10px;font-size 16px`
  });

  // src/base/Portal.tsx
  function Portal({ parent, children }) {
    const renderFn = A2(null);
    const targetRef = A2(null);
    y3(() => {
      let target = targetRef.current;
      if (!target) {
        target = targetRef.current = document.createElement("div");
        target.className = document.getElementById(APP_ID)?.className ?? "";
      }
      const container2 = parent || document.body;
      container2.appendChild(target);
      renderFn.current = () => target && E(children, target);
      return () => {
        renderFn.current = null;
        if (target) container2.removeChild(target);
      };
    }, [parent]);
    y3(() => renderFn.current?.(children));
    return null;
  }

  // src/cmp/Modal.tsx
  function Modal({ children, open, onClose }) {
    if (!open) return null;
    return /* @__PURE__ */ u4(Portal, { children: /* @__PURE__ */ u4(
      "div",
      {
        className: overlay,
        onClick: (e6) => {
          if (e6.target === e6.currentTarget) onClose?.();
        },
        children: /* @__PURE__ */ u4("div", { className: card, children })
      }
    ) });
  }
  var overlay = zaftig_min_default`
  z-index 99999999
  position fixed
  top 0;right 0;left 0;bottom 0
  background rgba(0,0,0,0.8)
  d flex;jc center;ai center
`.class;
  var card = zaftig_min_default`
  bc $background
  p 10
  width 90%
  max-width 1400
  max-height 95vh
  min-height 30vh
  overflow-y auto
`.class;

  // src/cmp/App.tsx
  var App = ({ conf: conf2, setNativeCommentsVisible }) => {
    const [postsLoading, noPosts] = useStore([(s4) => s4.postsLoading, (s4) => s4.posts.length <= 0]);
    y3(() => {
      init(conf2);
      return subscribe([(s4) => s4.noContent], (noContent) => {
        if (noContent && visible) toggleVisible();
      });
    }, []);
    const [visible, setVisible] = d3(true);
    const toggleVisible = () => {
      setNativeCommentsVisible(visible);
      setVisible(!visible);
    };
    const message = postsLoading ? "Loading posts\u2026" : noPosts ? "No posts found\u2026" : "";
    const [open, setOpen] = d3(false);
    if (conf2.mode === "modal") {
      return /* @__PURE__ */ u4(k, { children: [
        /* @__PURE__ */ u4("button", { className: modalButton, onClick: () => setOpen(true), children: "Reddit" }),
        /* @__PURE__ */ u4(Modal, { open, onClose: () => setOpen(false), children: /* @__PURE__ */ u4(k, { children: message || /* @__PURE__ */ u4("div", { className: container, children: [
          /* @__PURE__ */ u4(PostSelect, {}),
          /* @__PURE__ */ u4(PostComments, {})
        ] }) }) })
      ] });
    }
    const isSwap = !conf2.mode || conf2.mode === "swap";
    return /* @__PURE__ */ u4("div", { className: container, children: [
      isSwap && /* @__PURE__ */ u4(SwitchComments, { onSwitch: toggleVisible }),
      visible && (message || /* @__PURE__ */ u4(k, { children: [
        /* @__PURE__ */ u4(PostSelect, {}),
        /* @__PURE__ */ u4(PostComments, {})
      ] }))
    ] });
  };
  var container = zaftig_min_default`d flex;flex-direction column;gap 5;mt 5`.class;
  var modalButton = zaftig_min_default`padding 5`.class;

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
        if (conf.isMatch ? !conf.isMatch(url) : q2(conf.areaSelector) == null) {
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
    const wrapper = document.createElement(conf2.mode === "modal" ? "span" : "div");
    wrapper.id = APP_ID;
    wrapper.className = Themes.common.concat(
      conf2.dark ? Themes.dark : Themes.light,
      conf2.theme && generateTheme(conf2.theme)
    ).class;
    switch (conf2.mode) {
      case "modal":
        area.prepend(wrapper);
        break;
      case "insert":
        area.append(wrapper);
        break;
      case "swap":
      default:
        area.style.display = "none";
        area.parentElement.insertBefore(wrapper, area);
    }
    E(
      /* @__PURE__ */ u4(
        App,
        {
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
        }
      ),
      wrapper
    );
    return () => {
      E(null, wrapper);
      wrapper.remove();
    };
  }
})();
