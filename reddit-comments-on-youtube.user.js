// ==UserScript==
// @name        Reddit Comments on Youtube
// @description show reddit comments on youtube (and crunchyroll) videos
// @namespace   RCOY
// @version     0.2.9
// @match       https://*.youtube.com/*
// @match       https://*.crunchyroll.com/*
// @match       https://www14.9anime.to/watch/*
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
  var r = {};
  var f = [];
  var e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function c(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function s(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function a(n3, l4, u4) {
    var i4, t4, o4, r4 = arguments, f4 = {};
    for (o4 in l4)
      o4 == "key" ? i4 = l4[o4] : o4 == "ref" ? t4 = l4[o4] : f4[o4] = l4[o4];
    if (arguments.length > 3)
      for (u4 = [u4], o4 = 3; o4 < arguments.length; o4++)
        u4.push(r4[o4]);
    if (u4 != null && (f4.children = u4), typeof n3 == "function" && n3.defaultProps != null)
      for (o4 in n3.defaultProps)
        f4[o4] === void 0 && (f4[o4] = n3.defaultProps[o4]);
    return v(n3, f4, i4, t4, null);
  }
  function v(l4, u4, i4, t4, o4) {
    var r4 = { type: l4, props: u4, key: i4, ref: t4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o4 == null ? ++n.__v : o4 };
    return n.vnode != null && n.vnode(r4), r4;
  }
  function y(n3) {
    return n3.children;
  }
  function p(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function d(n3, l4) {
    if (l4 == null)
      return n3.__ ? d(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if ((u4 = n3.__k[l4]) != null && u4.__e != null)
        return u4.__e;
    return typeof n3.type == "function" ? d(n3) : null;
  }
  function _(n3) {
    var l4, u4;
    if ((n3 = n3.__) != null && n3.__c != null) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if ((u4 = n3.__k[l4]) != null && u4.__e != null) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return _(n3);
    }
  }
  function k(l4) {
    (!l4.__d && (l4.__d = true) && u.push(l4) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
  }
  function b() {
    for (var n3; b.__r = u.length; )
      n3 = u.sort(function(n4, l4) {
        return n4.__v.__b - l4.__v.__b;
      }), u = [], n3.some(function(n4) {
        var l4, u4, i4, t4, o4, r4;
        n4.__d && (o4 = (t4 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = c({}, t4)).__v = t4.__v + 1, I(r4, t4, i4, l4.__n, r4.ownerSVGElement !== void 0, t4.__h != null ? [o4] : null, u4, o4 == null ? d(t4) : o4, t4.__h), T(u4, t4), t4.__e != o4 && _(t4)));
      });
  }
  function m(n3, l4, u4, i4, t4, o4, e4, c4, s3, a4) {
    var h2, p4, _2, k3, b3, m4, w2, A2 = i4 && i4.__k || f, P2 = A2.length;
    for (u4.__k = [], h2 = 0; h2 < l4.length; h2++)
      if ((k3 = u4.__k[h2] = (k3 = l4[h2]) == null || typeof k3 == "boolean" ? null : typeof k3 == "string" || typeof k3 == "number" || typeof k3 == "bigint" ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(y, { children: k3 }, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, null, k3.__v) : k3) != null) {
        if (k3.__ = u4, k3.__b = u4.__b + 1, (_2 = A2[h2]) === null || _2 && k3.key == _2.key && k3.type === _2.type)
          A2[h2] = void 0;
        else
          for (p4 = 0; p4 < P2; p4++) {
            if ((_2 = A2[p4]) && k3.key == _2.key && k3.type === _2.type) {
              A2[p4] = void 0;
              break;
            }
            _2 = null;
          }
        I(n3, k3, _2 = _2 || r, t4, o4, e4, c4, s3, a4), b3 = k3.__e, (p4 = k3.ref) && _2.ref != p4 && (w2 || (w2 = []), _2.ref && w2.push(_2.ref, null, k3), w2.push(p4, k3.__c || b3, k3)), b3 != null ? (m4 == null && (m4 = b3), typeof k3.type == "function" && k3.__k != null && k3.__k === _2.__k ? k3.__d = s3 = g(k3, s3, n3) : s3 = x(n3, k3, _2, A2, b3, s3), a4 || u4.type !== "option" ? typeof u4.type == "function" && (u4.__d = s3) : n3.value = "") : s3 && _2.__e == s3 && s3.parentNode != n3 && (s3 = d(_2));
      }
    for (u4.__e = m4, h2 = P2; h2--; )
      A2[h2] != null && (typeof u4.type == "function" && A2[h2].__e != null && A2[h2].__e == u4.__d && (u4.__d = d(i4, h2 + 1)), L(A2[h2], A2[h2]));
    if (w2)
      for (h2 = 0; h2 < w2.length; h2++)
        z(w2[h2], w2[++h2], w2[++h2]);
  }
  function g(n3, l4, u4) {
    var i4, t4;
    for (i4 = 0; i4 < n3.__k.length; i4++)
      (t4 = n3.__k[i4]) && (t4.__ = n3, l4 = typeof t4.type == "function" ? g(t4, l4, u4) : x(u4, t4, t4, n3.__k, t4.__e, l4));
    return l4;
  }
  function x(n3, l4, u4, i4, t4, o4) {
    var r4, f4, e4;
    if (l4.__d !== void 0)
      r4 = l4.__d, l4.__d = void 0;
    else if (u4 == null || t4 != o4 || t4.parentNode == null)
      n:
        if (o4 == null || o4.parentNode !== n3)
          n3.appendChild(t4), r4 = null;
        else {
          for (f4 = o4, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
            if (f4 == t4)
              break n;
          n3.insertBefore(t4, o4), r4 = o4;
        }
    return r4 !== void 0 ? r4 : t4.nextSibling;
  }
  function A(n3, l4, u4, i4, t4) {
    var o4;
    for (o4 in u4)
      o4 === "children" || o4 === "key" || o4 in l4 || C(n3, o4, null, u4[o4], i4);
    for (o4 in l4)
      t4 && typeof l4[o4] != "function" || o4 === "children" || o4 === "key" || o4 === "value" || o4 === "checked" || u4[o4] === l4[o4] || C(n3, o4, l4[o4], u4[o4], i4);
  }
  function P(n3, l4, u4) {
    l4[0] === "-" ? n3.setProperty(l4, u4) : n3[l4] = u4 == null ? "" : typeof u4 != "number" || e.test(l4) ? u4 : u4 + "px";
  }
  function C(n3, l4, u4, i4, t4) {
    var o4;
    n:
      if (l4 === "style")
        if (typeof u4 == "string")
          n3.style.cssText = u4;
        else {
          if (typeof i4 == "string" && (n3.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || P(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || P(n3.style, l4, u4[l4]);
        }
      else if (l4[0] === "o" && l4[1] === "n")
        o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o4] = u4, u4 ? i4 || n3.addEventListener(l4, o4 ? H : $, o4) : n3.removeEventListener(l4, o4 ? H : $, o4);
      else if (l4 !== "dangerouslySetInnerHTML") {
        if (t4)
          l4 = l4.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l4 !== "href" && l4 !== "list" && l4 !== "form" && l4 !== "tabIndex" && l4 !== "download" && l4 in n3)
          try {
            n3[l4] = u4 == null ? "" : u4;
            break n;
          } catch (n4) {
          }
        typeof u4 == "function" || (u4 != null && (u4 !== false || l4[0] === "a" && l4[1] === "r") ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
      }
  }
  function $(l4) {
    this.l[l4.type + false](n.event ? n.event(l4) : l4);
  }
  function H(l4) {
    this.l[l4.type + true](n.event ? n.event(l4) : l4);
  }
  function I(l4, u4, i4, t4, o4, r4, f4, e4, s3) {
    var a4, v3, h2, d4, _2, k3, b3, g4, w2, x3, A2, P2 = u4.type;
    if (u4.constructor !== void 0)
      return null;
    i4.__h != null && (s3 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, r4 = [e4]), (a4 = n.__b) && a4(u4);
    try {
      n:
        if (typeof P2 == "function") {
          if (g4 = u4.props, w2 = (a4 = P2.contextType) && t4[a4.__c], x3 = a4 ? w2 ? w2.props.value : a4.__ : t4, i4.__c ? b3 = (v3 = u4.__c = i4.__c).__ = v3.__E : ("prototype" in P2 && P2.prototype.render ? u4.__c = v3 = new P2(g4, x3) : (u4.__c = v3 = new p(g4, x3), v3.constructor = P2, v3.render = M), w2 && w2.sub(v3), v3.props = g4, v3.state || (v3.state = {}), v3.context = x3, v3.__n = t4, h2 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P2.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = c({}, v3.__s)), c(v3.__s, P2.getDerivedStateFromProps(g4, v3.__s))), d4 = v3.props, _2 = v3.state, h2)
            P2.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g4 !== d4 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g4, x3), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g4, v3.__s, x3) === false || u4.__v === i4.__v) {
              v3.props = g4, v3.state = v3.__s, u4.__v !== i4.__v && (v3.__d = false), v3.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n3) {
                n3 && (n3.__ = u4);
              }), v3.__h.length && f4.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g4, v3.__s, x3), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(d4, _2, k3);
            });
          }
          v3.context = x3, v3.props = g4, v3.state = v3.__s, (a4 = n.__r) && a4(u4), v3.__d = false, v3.__v = u4, v3.__P = l4, a4 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t4 = c(c({}, t4), v3.getChildContext())), h2 || v3.getSnapshotBeforeUpdate == null || (k3 = v3.getSnapshotBeforeUpdate(d4, _2)), A2 = a4 != null && a4.type === y && a4.key == null ? a4.props.children : a4, m(l4, Array.isArray(A2) ? A2 : [A2], u4, i4, t4, o4, r4, f4, e4, s3), v3.base = u4.__e, u4.__h = null, v3.__h.length && f4.push(v3), b3 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r4 == null && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = j(i4.__e, u4, i4, t4, o4, r4, f4, s3);
      (a4 = n.diffed) && a4(u4);
    } catch (l5) {
      u4.__v = null, (s3 || r4 != null) && (u4.__e = e4, u4.__h = !!s3, r4[r4.indexOf(e4)] = null), n.__e(l5, u4, i4);
    }
  }
  function T(l4, u4) {
    n.__c && n.__c(u4, l4), l4.some(function(u5) {
      try {
        l4 = u5.__h, u5.__h = [], l4.some(function(n3) {
          n3.call(u5);
        });
      } catch (l5) {
        n.__e(l5, u5.__v);
      }
    });
  }
  function j(n3, l4, u4, i4, t4, o4, e4, c4) {
    var a4, v3, h2, y4, p4 = u4.props, d4 = l4.props, _2 = l4.type, k3 = 0;
    if (_2 === "svg" && (t4 = true), o4 != null) {
      for (; k3 < o4.length; k3++)
        if ((a4 = o4[k3]) && (a4 === n3 || (_2 ? a4.localName == _2 : a4.nodeType == 3))) {
          n3 = a4, o4[k3] = null;
          break;
        }
    }
    if (n3 == null) {
      if (_2 === null)
        return document.createTextNode(d4);
      n3 = t4 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d4.is && d4), o4 = null, c4 = false;
    }
    if (_2 === null)
      p4 === d4 || c4 && n3.data === d4 || (n3.data = d4);
    else {
      if (o4 = o4 && f.slice.call(n3.childNodes), v3 = (p4 = u4.props || r).dangerouslySetInnerHTML, h2 = d4.dangerouslySetInnerHTML, !c4) {
        if (o4 != null)
          for (p4 = {}, y4 = 0; y4 < n3.attributes.length; y4++)
            p4[n3.attributes[y4].name] = n3.attributes[y4].value;
        (h2 || v3) && (h2 && (v3 && h2.__html == v3.__html || h2.__html === n3.innerHTML) || (n3.innerHTML = h2 && h2.__html || ""));
      }
      if (A(n3, d4, p4, t4, c4), h2)
        l4.__k = [];
      else if (k3 = l4.props.children, m(n3, Array.isArray(k3) ? k3 : [k3], l4, u4, i4, t4 && _2 !== "foreignObject", o4, e4, n3.firstChild, c4), o4 != null)
        for (k3 = o4.length; k3--; )
          o4[k3] != null && s(o4[k3]);
      c4 || ("value" in d4 && (k3 = d4.value) !== void 0 && (k3 !== n3.value || _2 === "progress" && !k3) && C(n3, "value", k3, p4.value, false), "checked" in d4 && (k3 = d4.checked) !== void 0 && k3 !== n3.checked && C(n3, "checked", k3, p4.checked, false));
    }
    return n3;
  }
  function z(l4, u4, i4) {
    try {
      typeof l4 == "function" ? l4(u4) : l4.current = u4;
    } catch (l5) {
      n.__e(l5, i4);
    }
  }
  function L(l4, u4, i4) {
    var t4, o4, r4;
    if (n.unmount && n.unmount(l4), (t4 = l4.ref) && (t4.current && t4.current !== l4.__e || z(t4, null, u4)), i4 || typeof l4.type == "function" || (i4 = (o4 = l4.__e) != null), l4.__e = l4.__d = void 0, (t4 = l4.__c) != null) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (l5) {
          n.__e(l5, u4);
        }
      t4.base = t4.__P = null;
    }
    if (t4 = l4.__k)
      for (r4 = 0; r4 < t4.length; r4++)
        t4[r4] && L(t4[r4], u4, i4);
    o4 != null && s(o4);
  }
  function M(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function N(l4, u4, i4) {
    var t4, o4, e4;
    n.__ && n.__(l4, u4), o4 = (t4 = typeof i4 == "function") ? null : i4 && i4.__k || u4.__k, e4 = [], I(u4, l4 = (!t4 && i4 || u4).__k = a(y, null, [l4]), o4 || r, r, u4.ownerSVGElement !== void 0, !t4 && i4 ? [i4] : o4 ? null : u4.firstChild ? f.slice.call(u4.childNodes) : null, e4, !t4 && i4 ? i4 : o4 ? o4.__e : u4.firstChild, t4), T(e4, l4);
  }
  n = { __e: function(n3, l4) {
    for (var u4, i4, t4; l4 = l4.__; )
      if ((u4 = l4.__c) && !u4.__)
        try {
          if ((i4 = u4.constructor) && i4.getDerivedStateFromError != null && (u4.setState(i4.getDerivedStateFromError(n3)), t4 = u4.__d), u4.componentDidCatch != null && (u4.componentDidCatch(n3), t4 = u4.__d), t4)
            return u4.__E = u4;
        } catch (l5) {
          n3 = l5;
        }
    throw n3;
  }, __v: 0 }, l = function(n3) {
    return n3 != null && n3.constructor === void 0;
  }, p.prototype.setState = function(n3, l4) {
    var u4;
    u4 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), typeof n3 == "function" && (n3 = n3(c({}, u4), this.props)), n3 && c(u4, n3), n3 != null && this.__v && (l4 && this.__h.push(l4), k(this));
  }, p.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), k(this));
  }, p.prototype.render = y, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = n.__b;
  var f2 = n.__r;
  var e2 = n.diffed;
  var a2 = n.__c;
  var v2 = n.unmount;
  function m2(t4, r4) {
    n.__h && n.__h(u2, t4, o2 || r4), o2 = 0;
    var i4 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t4 >= i4.__.length && i4.__.push({}), i4.__[t4];
  }
  function l2(n3) {
    return o2 = 1, p2(w, n3);
  }
  function p2(n3, r4, o4) {
    var i4 = m2(t2++, 2);
    return i4.t = n3, i4.__c || (i4.__ = [o4 ? o4(r4) : w(void 0, r4), function(n4) {
      var t4 = i4.t(i4.__[0], n4);
      i4.__[0] !== t4 && (i4.__ = [t4, i4.__[1]], i4.__c.setState({}));
    }], i4.__c = u2), i4.__;
  }
  function y2(r4, o4) {
    var i4 = m2(t2++, 3);
    !n.__s && k2(i4.__H, o4) && (i4.__ = r4, i4.__H = o4, u2.__H.__h.push(i4));
  }
  function d2(n3, u4) {
    var r4 = m2(t2++, 7);
    return k2(r4.__H, u4) && (r4.__ = n3(), r4.__H = u4, r4.__h = n3), r4.__;
  }
  function x2() {
    i2.forEach(function(t4) {
      if (t4.__P)
        try {
          t4.__H.__h.forEach(g2), t4.__H.__h.forEach(j2), t4.__H.__h = [];
        } catch (u4) {
          t4.__H.__h = [], n.__e(u4, t4.__v);
        }
    }), i2 = [];
  }
  n.__b = function(n3) {
    u2 = null, c2 && c2(n3);
  }, n.__r = function(n3) {
    f2 && f2(n3), t2 = 0;
    var r4 = (u2 = n3.__c).__H;
    r4 && (r4.__h.forEach(g2), r4.__h.forEach(j2), r4.__h = []);
  }, n.diffed = function(t4) {
    e2 && e2(t4);
    var o4 = t4.__c;
    o4 && o4.__H && o4.__H.__h.length && (i2.push(o4) !== 1 && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n3) {
      var t5, u4 = function() {
        clearTimeout(r4), b2 && cancelAnimationFrame(t5), setTimeout(n3);
      }, r4 = setTimeout(u4, 100);
      b2 && (t5 = requestAnimationFrame(u4));
    })(x2)), u2 = void 0;
  }, n.__c = function(t4, u4) {
    u4.some(function(t5) {
      try {
        t5.__h.forEach(g2), t5.__h = t5.__h.filter(function(n3) {
          return !n3.__ || j2(n3);
        });
      } catch (r4) {
        u4.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), u4 = [], n.__e(r4, t5.__v);
      }
    }), a2 && a2(t4, u4);
  }, n.unmount = function(t4) {
    v2 && v2(t4);
    var u4 = t4.__c;
    if (u4 && u4.__H)
      try {
        u4.__H.__.forEach(g2);
      } catch (t5) {
        n.__e(t5, u4.__v);
      }
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n3) {
    var t4 = u2;
    typeof n3.__c == "function" && n3.__c(), u2 = t4;
  }
  function j2(n3) {
    var t4 = u2;
    n3.__c = n3.__(), u2 = t4;
  }
  function k2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, u4) {
      return t5 !== n3[u4];
    });
  }
  function w(n3, t4) {
    return typeof t4 == "function" ? t4(n3) : t4;
  }

  // node_modules/zaftig/dist/zaftig.min.js
  var { isArray: t3 } = Array;
  var { hasOwnProperty: r3, getPrototypeOf: e3 } = Object;
  var n2 = (...t4) => console.error("zaftig:", ...t4);
  var o3 = (t4, r4 = {}) => (e4) => e4 in r4 ? r4[e4] : r4[e4] = t4(e4);
  var i3 = document.documentMode || /Edge\//.test(navigator.userAgent) ? "ms" : navigator.vendor ? "webkit" : "moz";
  var s2 = (t4) => r3.call(t4, "width") ? t4 : s2(e3(t4));
  var c3 = Object.keys(s2(document.documentElement.style)).filter((t4) => t4.indexOf("-") < 0 && t4 != "length");
  var a3 = {};
  var u3 = {};
  c3.concat(["backgroundColor", "borderBottom", "borderRadius", "bottom", "boxShadow", "color", "display", "flexDirection", "float", "fontFamily", "fontSize", "height", "margin", "marginTop", "marginBottom", "opacity", "padding", "paddingBottom", "right", "textAlign", "textDecoration", "top", "whiteSpace", "width"].filter((t4) => c3.indexOf(t4) >= 0)).forEach((t4) => {
    let r4 = t4.replace(/[A-Z]/g, (t5) => "-" + t5.toLowerCase());
    let e4 = (n3 = t4)[0] + n3.slice(1).replace(/[a-z]/g, "").toLowerCase();
    var n3;
    t4.toLowerCase().indexOf(i3) == 0 ? (e4 = e4.slice(1), r4 = r4[0] == "-" ? r4 : "-" + r4, u3[e4] || (u3[e4] = r4)) : u3[e4] = r4, a3[r4] = true;
  });
  var d3 = document.createElement("div");
  var l3 = o3((t4) => ["0", "0 0"].some((r4) => (d3.style.cssText = `${t4}: ${r4};`, d3.style.cssText.slice(-3) == "px;")), { flex: false, border: true, "border-left": true, "border-right": true, "border-top": true, "border-bottom": true });
  var f3 = /\s*,\s*/;
  var g3 = (t4, r4) => t4 && r4 ? `
${t4} {
${r4}}
` : "";
  var m3 = (r4) => function(e4, ...o4) {
    try {
      return t3(e4) ? r4.call(this, ((t4, r5) => t4.reduce((t5, e5, n3) => t5 + e5 + (r5[n3] == null ? "" : String(r5[n3])), ""))(e4, o4)) : r4.call(this, e4);
    } catch (t4) {
      return n2("error `", e4, "`", o4, "\n", t4), "";
    }
  };
  var h = () => document.head.appendChild(document.createElement("style"));
  var p3;
  var $2 = (t4, r4 = "") => {
    try {
      p3 && p3.sheet || (p3 = h()), p3.sheet.insertRule(`${t4}{${r4}}`, 0);
      const e4 = r4 && p3.sheet.cssRules[0].cssText.replace(/\s/g, "");
      return p3.sheet.deleteRule(0), !e4 || e4.length > t4.length + 2;
    } catch (t5) {
      return false;
    }
  };
  var y3 = (t4 = {}) => {
    const { helpers: r4 = {}, unit: e4 = "px", id: s3 = "z" + Math.random().toString(36).slice(2) } = t4;
    let { style: c4, dot: d4 = true, debug: p4 = false } = t4, b3 = 0;
    class v3 {
      constructor(t5) {
        this.class = t5, this.className = t5;
      }
      toString() {
        return this.class;
      }
      valueOf() {
        return d4 ? "." + this.class : this.class;
      }
      z(...t5) {
        return this.concat(B(...t5));
      }
      concat(...t5) {
        return z2(this.class, ...t5);
      }
    }
    const z2 = (...t5) => {
      const r5 = [];
      return t5.forEach((t6) => {
        t6 && (typeof t6 == "string" ? r5.push(t6) : t6.className && r5.push(t6.className));
      }), new v3(r5.join(" "));
    }, w2 = (t5, r5, e5) => {
      const o4 = g3(e5 ? ((t6) => t6.replace(/(::?)([a-z-]+)(\()?/gi, (t7, r6, e6, n3) => (e6 == "placeholder" && i3 != "moz" ? e6 = "input-" + e6 : e6 == "matches" && (e6 = "any"), e6[0] == "-" || $2(n3 ? t7 + ".f)" : t7) ? t7 : `${r6}-${i3}-${e6}${n3 || ""}`)))(t5) : t5, r5);
      if (o4) {
        c4 || (c4 = h(), c4.id = s3);
        try {
          c4.sheet.insertRule(o4, c4.sheet.cssRules.length), p4 && (c4.textContent += o4);
        } catch (o5) {
          !e5 && t5.indexOf(":") >= 0 ? w2(t5, r5, true) : n2("insert failed", t5, r5, o5);
        }
      }
    }, x3 = (t5) => t5.replace(/^/gm, "  ") + "\n", O = (t5, r5, e5 = "", o4) => {
      if (!t5)
        return p4 && n2("missing selector", r5);
      if (/^@(media|keyframes|supports)/.test(t5))
        return ((t6, r6, e6, n3) => {
          r6.t = g3(e6 == "" ? ":root" : e6, r6.t), r6.o.forEach((t7) => O(t7.i, t7, e6, r6)), n3 ? n3.t += g3(t6, x3(r6.t)) : w2(t6, x3(r6.t));
        })(t5, r5, e5, o4);
      !e5 || o4 && ((t6) => t6 && t6.indexOf("@keyframes") == 0)(o4.i) || (t5 = ((t6, r6) => r6.split(f3).reduce((r7, e6) => r7.concat(t6.split(f3).map((t7) => t7.indexOf("&") >= 0 ? t7.replace(/&/g, e6) : e6 + (t7[0] == ":" || t7[0] == "[" ? "" : " ") + t7)), []).join(",\n"))(t5, e5)), o4 ? o4.t += g3(t5, r5.t) : w2(t5, r5.t);
      const i4 = t5 == ":root" ? "" : t5;
      r5.o.forEach((t6) => O(t6.i, t6, i4, o4));
    }, k3 = (t5, e5) => {
      const n3 = r4[t5];
      return typeof n3 == "function" ? n3(...e5 ? e5.split(" ") : []) : n3 && n3 + " " + e5;
    }, S = (t5, r5, o4) => {
      if (o4 && !r5 && (r5 = o4, o4 = ""), !r5)
        return;
      if (r5[0] == "$") {
        if (r5 == "$name")
          return t5.u = o4;
        if (r5 == "$compose")
          return t5.l = o4;
        r5 = "--" + r5.slice(1);
      }
      const c5 = k3(r5, o4);
      if (c5) {
        const r6 = _2(c5);
        return t5.t += r6.t, void (t5.o = t5.o.concat(r6.o));
      }
      if (!o4)
        return p4 && n2("no value for", r5);
      if (r5 = u3[r5] || r5, !a3[r5]) {
        const t6 = `-${i3}-${r5}`;
        a3[t6] && (r5 = t6);
      }
      o4.indexOf("$") >= 0 && (o4 = o4.replace(/\$([a-z0-9-]+)/gi, "var(--$1)")), l3(r5) && (o4 = o4.split(" ").map((t6) => isNaN(t6) ? t6 : t6 + e4).join(" "));
      const d5 = `  ${r5}: ${o4};
`;
      p4 && !$2(s3, d5) && n2("invalid css", d5), t5.t += d5;
    }, _2 = o3((t5) => {
      const r5 = [{ t: "", o: [] }];
      if (!(t5 = t5 && t5.trim()))
        return r5[0];
      t5 += ";";
      let e5 = 1, n3 = "", o4 = 0, i4 = "", s4 = "";
      for (let c5 = 0; c5 < t5.length; c5++) {
        const a4 = t5[c5];
        a4 != "\n" && (a4 != ";" && a4 != "}" || i4) ? a4 != "{" || i4 ? e5 == 1 ? a4 == " " ? (s4 = n3.trim()) && (e5 = 2, n3 = "") : n3 += a4 : e5 == 2 && (i4 ? a4 == i4 && t5[c5 - 1] != "\\" && (i4 = "") : a4 != "'" && a4 != '"' || (i4 = a4), n3 += a4) : (r5[++o4] = { i: k3(s4, n3.trim()) || (s4 + " " + n3).trim(), t: "", o: [] }, e5 = 1, s4 = n3 = "") : (S(r5[o4], s4, n3.trim() + i4), a4 == "}" && r5[--o4].o.push(r5.pop()), e5 = 1, s4 = n3 = i4 = "");
      }
      return r5[0];
    }), A2 = o3((t5) => {
      const r5 = "anim-" + s3 + "-" + (b3 += 1);
      return O("@keyframes " + r5, _2(t5)), r5;
    }), j3 = o3((t5) => {
      const r5 = _2(t5), e5 = (r5.u ? r5.u + "-" : "") + s3 + "-" + (b3 += 1);
      return O("." + e5, r5), new v3(e5 + (r5.l ? " " + r5.l : ""));
    }), B = m3(j3);
    return B.anim = m3(A2), B.concat = z2, B.getSheet = () => c4, B.global = m3((t5) => O(":root", _2(t5))), B.helper = (t5) => Object.assign(r4, t5), B.new = y3, B.setDebug = (t5) => p4 = t5, B.setDot = (t5) => d4 = t5, B.style = m3((t5) => _2(t5).t), B;
  };
  var zaftig_min_default = y3();

  // src/cmp/PostSelect.tsx
  var PostSelect = ({ posts, selected, onSelect }) => {
    const [showEmpty, setShowEmpty] = l2(false);
    const postsWithComments = posts.filter((post) => post.num_comments > 0);
    const emptyCount = posts.length - postsWithComments.length;
    const list = showEmpty ? posts : postsWithComments;
    return /* @__PURE__ */ a("div", {
      className: styles.container
    }, list.map((post) => /* @__PURE__ */ a("button", {
      className: styles.item,
      style: { borderBottomColor: post === selected ? "#777" : "" },
      onClick: () => onSelect(post)
    }, /* @__PURE__ */ a("div", {
      className: styles.numComments
    }, post.num_comments), /* @__PURE__ */ a("div", {
      title: post.subreddit,
      className: styles.subreddit
    }, "/r/", post.subreddit), /* @__PURE__ */ a("div", {
      title: post.title
    }, post.title))), emptyCount > 0 && /* @__PURE__ */ a("button", {
      className: styles.toggleEmpty,
      onClick: () => setShowEmpty(!showEmpty)
    }, showEmpty ? "Hide" : `Show`, " ", emptyCount, " posts without comments"));
  };
  var buttonBase = zaftig_min_default`
  cursor pointer
  border none
  margin 0
  padding 0
  border-bottom 4px solid $button-bg
`;
  var styles = {
    container: zaftig_min_default`display grid;grid-template-columns 1fr 1fr;gap 4`.class,
    toggleEmpty: buttonBase.class,
    item: buttonBase.concat(zaftig_min_default`
    text-align left
  
    display grid
    grid-template-columns minmax(min-content, 1fr) 2fr 7fr
    > div {
      padding 10
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    }
  `).class,
    numComments: zaftig_min_default`
    && { padding 10 3 }
    font-weight bold
    text-align center
    opacity 0.7
  `.class,
    subreddit: zaftig_min_default`opacity 0.9`.class
  };

  // src/constants.ts
  var SCRIPT_NAME = "RCOY";
  var API_URL = "https://www.reddit.com";

  // src/lib/util.ts
  var getById = (id) => document.getElementById(id);
  var q = (sel, ctx = document) => ctx.querySelector(sel);
  var qq = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  var decodeHTML = (input) => {
    const e4 = document.createElement("textarea");
    e4.innerHTML = input;
    return e4.value;
  };
  var namePart = [`%c${SCRIPT_NAME}:`, "color:#ddd"];
  var log = (first, ...rest) => (console.log(...namePart, first, ...rest), first);
  var logError = (...rest) => console.log(...namePart, ...rest);
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
        id = setTimeout(throttled, delta - ms + 5);
        return;
      }
      lastCall = now;
      cb(...args);
    };
    return throttled;
  };

  // src/lib/api.ts
  var getJSON = (url) => fetch(url).then((res) => res.json());
  var searchPosts = async (query, sort = true) => {
    const payload = await getJSON(API_URL + "/search.json?" + buildQuery({ q: query }));
    const results = payload.data.children.map(({ data: post }) => ({
      ...post,
      title: decodeHTML(post.title)
    }));
    return sort ? results.sort((a4, b3) => a4.num_comments > b3.num_comments ? -1 : 1) : results;
  };
  var getComments = async ({ permalink }, parentComment) => {
    const payload = await getJSON(API_URL + permalink + ".json?" + buildQuery({ comment: parentComment == null ? void 0 : parentComment.data.id }));
    return payload[1].data.children;
  };
  var getMoreComments = async (link_id, children) => {
    const payload = await getJSON(API_URL + "/api/morechildren.json?" + buildQuery({ api_type: "json", link_id, children: children.join(",") }));
    if (payload.json.errors.length > 0) {
      logError("no comments to load", payload.json.errors);
      return [];
    }
    return payload.json.data.things;
  };

  // src/lib/hooks.ts
  var useRedraw = () => {
    const [, redraw] = p2((c4) => c4 + 1, 0);
    return redraw;
  };

  // src/cmp/PostComments.tsx
  var useUpdate = (parent) => {
    const redraw = useRedraw();
    const update = (fn) => {
      fn(parent);
      redraw();
    };
    return update;
  };
  var PostComments = ({ post }) => {
    const [things, setThings] = l2(null);
    y2(() => {
      setThings(null);
      getComments(post).then(setThings);
    }, [post.name]);
    const update = useUpdate(things || []);
    return /* @__PURE__ */ a("section", {
      className: zaftig_min_default`mt 10`.class
    }, !things ? /* @__PURE__ */ a("div", null, "Loading ", post.name, "...") : things.map((thing) => /* @__PURE__ */ a(PostCommentChild, {
      key: thing.data.id,
      thing,
      post,
      update
    })));
  };
  function PostCommentChild({ thing, ...rest }) {
    switch (thing.kind) {
      case "more":
        return /* @__PURE__ */ a(LoadMoreButton, {
          ...{ thing, ...rest }
        });
      case "t1":
        return /* @__PURE__ */ a(PostComment, {
          ...{ thing, ...rest }
        });
      default:
        throw new Error("unknown child type");
    }
  }
  var LoadMoreButton = ({ thing, update, post }) => {
    const [loading, setLoading] = l2(false);
    return /* @__PURE__ */ a("button", {
      disabled: loading,
      className: zaftig_min_default`mt 10`.class,
      onClick: async () => {
        setLoading(true);
        const results = await getMoreComments(post.name, thing.data.children);
        update((parent) => {
          const currentPosition = parent.indexOf(thing);
          if (currentPosition >= 0)
            parent.splice(currentPosition, 1, ...results);
        });
      }
    }, loading ? "Loading" : "Load", " ", thing.data.count, " more comments");
  };
  var PostComment = ({ thing, post }) => {
    const { ups, author, body_html, replies, collapsed } = thing.data;
    const html = d2(() => decodeHTML(body_html), [body_html]);
    const redraw = useRedraw();
    const toggle = () => {
      thing.data.collapsed = !collapsed;
      redraw();
    };
    const collapseButton = /* @__PURE__ */ a("code", {
      role: "button",
      "aria-label": "toggle collapse comment",
      tabIndex: 0,
      onKeyPress: (e4) => {
        if (e4.key === "Enter" || e4.key === " ") {
          e4.preventDefault();
          toggle();
        }
      },
      className: styles2.collapse,
      onClick: toggle
    }, "[", collapsed ? "+" : "-", "]");
    const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : []);
    return /* @__PURE__ */ a("div", {
      className: styles2.comment
    }, /* @__PURE__ */ a("div", {
      className: styles2.author,
      style: { marginBottom: collapsed ? "" : "5px" }
    }, collapseButton, " ", author, " ", ups), !collapsed && /* @__PURE__ */ a(y, null, /* @__PURE__ */ a("div", {
      dangerouslySetInnerHTML: { __html: html }
    }), replies && /* @__PURE__ */ a("div", {
      className: styles2.replies
    }, replies.data.children.map((child) => /* @__PURE__ */ a(PostCommentChild, {
      key: child.data.id,
      thing: child,
      post,
      update
    })))));
  };
  var styles2 = {
    comment: zaftig_min_default`
    color $text-primary
    padding 10
    border-left 1 solid #999
    border-bottom 1 solid #999
    border-right 1 solid #999
    :first-child { border-top 1 solid #999 }
  `.class,
    author: zaftig_min_default`font-weight bold`.class,
    replies: zaftig_min_default`margin-top 10`.class,
    collapse: zaftig_min_default`cursor pointer;user-select none`.class
  };

  // src/cmp/App.tsx
  var App = ({ posts }) => {
    const [post, setPost] = l2(posts[0]);
    return /* @__PURE__ */ a("section", null, /* @__PURE__ */ a(PostSelect, {
      posts,
      selected: post,
      onSelect: setPost
    }), /* @__PURE__ */ a(PostComments, {
      post
    }));
  };

  // src/cmp/SwitchComments.tsx
  var SwitchComments = ({ onSwitch }) => {
    return /* @__PURE__ */ a("button", {
      className: styles3.button,
      onClick: onSwitch
    }, "Switch comments");
  };
  var styles3 = {
    button: zaftig_min_default`
    cursor pointer
    border none
    padding 10
    width 100%
    margin-bottom 10
  `.class
  };

  // src/conf/crunchyroll.ts
  var filterForEp = (posts, episode) => {
    const epRegex = new RegExp(`\\bepisode ${episode}\\b`, "i");
    return posts.filter((post) => epRegex.test(post.title));
  };
  var crunchyroll = {
    commentSelector: ".guestbook.comments",
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
    commentSelector: "#comments",
    isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
    theme: zaftig_min_default`
    $text-primary var(--yt-spec-text-primary, black)
    $text-secondary var(--yt-spec-text-secondary, #666)
    $link-color var(--yt-spec-call-to-action, #1b3e92)
    $button-bg var(--yt-spec-badge-chip-background, #555)
  `,
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

  // src/conf/index.ts
  var confs = {
    crunchyroll,
    youtube
  };
  var confNames = Object.keys(confs);

  // src/lib/wait-for-elems.ts
  var waitForElems = ({
    selector,
    onmatch,
    stopWaiting = false,
    container = document.body,
    mutationConfig
  }) => {
    const seen = new WeakSet();
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
    const observer = new MutationObserver(throttle(300, check));
    const start = () => observer.observe(container, {
      subtree: true,
      childList: true,
      ...mutationConfig
    });
    const stop = () => observer.disconnect();
    start();
    return { start, stop };
  };

  // src/lib/wait-for-url.ts
  var waitForUrl = ({ matcher = "any", stopWaiting = false, onmatch }) => {
    const isMatch = matcher === "any" ? () => true : typeof matcher === "function" ? matcher : (url) => matcher.test(url);
    let lastUrl = "";
    let cleanup;
    const check = () => {
      const url = location.href;
      if (url === lastUrl)
        return;
      lastUrl = url;
      if (cleanup) {
        cleanup();
        cleanup = void 0;
      }
      if (isMatch(url)) {
        if (stopWaiting)
          stop();
        cleanup = onmatch(url);
      }
    };
    const id = setInterval(check, 500);
    const stop = () => clearInterval(id);
    return { stop };
  };

  // src/theme.ts
  var theme = {
    light: zaftig_min_default`
    $text-primary #444
    $text-secondary #666
    $link-color #1b3e92
    $button-bg #eee
  `,
    dark: zaftig_min_default`
    $text-primary #fff
    $text-secondary #ddd
    $link-color #1b3e92
    $button-bg #555
  `,
    common: zaftig_min_default`
    font-size 16
    color $text-primary
    button { color $text-primary; background $button-bg }
    a { color $link-color }
  `
  };

  // src/index.tsx
  log("started!");
  var host = location.hostname;
  var mode = confNames.find((name) => host.includes(name));
  if (!mode) {
    logError("encountered unknown host", host);
  } else {
    const conf = confs[mode];
    waitForUrl({
      matcher: "any",
      onmatch: (url) => {
        log("url changed", url);
        if (!conf.isMatch()) {
          log("but its not a match...");
          return;
        }
        log("its a match! looking for reddit posts");
        let stale = false;
        let cleanup = [];
        conf.getPosts().then((posts) => {
          if (stale) {
            log("loaded too late, url already changed...");
            return;
          }
          if (!posts.length) {
            log("loaded, but found no posts...", posts);
            return;
          }
          log("loaded, found", posts);
          const wait = waitForElems({
            selector: conf.commentSelector,
            stopWaiting: true,
            onmatch: (comments) => {
              log("comments found", comments);
              cleanup.push(mount(conf, posts, comments));
            }
          });
          cleanup.push(wait.stop);
        });
        return () => {
          log("leaving page cleaning up", cleanup);
          stale = true;
          cleanup.forEach((fn) => fn());
        };
      }
    });
  }
  var mount = (conf, posts, comments) => {
    comments.style.display = "none";
    const main = comments.parentElement;
    const className = theme.common.concat(conf.dark ? theme.dark : theme.light).class;
    const elem = () => {
      const wrapper = document.createElement("div");
      wrapper.className = className;
      if (conf.theme) {
        const themeLayer = document.createElement("div");
        themeLayer.className = conf.theme.class;
        wrapper.appendChild(themeLayer);
      }
      return wrapper;
    };
    const appContainer = elem();
    main.insertBefore(appContainer, comments);
    N(/* @__PURE__ */ a(App, {
      posts
    }), appContainer.firstElementChild || appContainer);
    const switchContainer = elem();
    main.insertBefore(switchContainer, appContainer);
    let hideReddit = false;
    const switchComments = () => {
      hideReddit = !hideReddit;
      comments.style.display = hideReddit ? "" : "none";
      appContainer.style.display = hideReddit ? "none" : "";
    };
    N(/* @__PURE__ */ a(SwitchComments, {
      onSwitch: switchComments
    }), switchContainer.firstElementChild || switchContainer);
    return () => {
      appContainer.remove();
      switchContainer.remove();
    };
  };
})();
