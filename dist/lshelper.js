var h = Object.defineProperty;
var g = (t, e, o) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var i = (t, e, o) => g(t, typeof e != "symbol" ? e + "" : e, o);
class f {
  constructor() {
    i(this, "cache", {});
    this.cache = {};
  }
  save() {
    this.cache = { ...localStorage };
  }
  clear() {
    localStorage.clear();
  }
  saveAndClear() {
    this.save(), this.clear();
  }
  restore() {
    for (const e in this.cache)
      localStorage.setItem(e, this.cache[e]);
  }
}
function c(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++)
    t.charCodeAt(o) <= 65535 ? e += 2 : e += 4;
  return e;
}
const u = new Array(1024).fill("-").join(""), s = new Array(64).fill(u).join(""), a = "t";
function S() {
  let t = 0, e = s.slice(a.length);
  function o() {
    try {
      e += s, localStorage.setItem(a, e), o();
    } catch {
      localStorage.removeItem(a), t = c(e.slice(s.length) + a), console.log(`Local storage overflow, max size: ${t / 1024 / 1024}Mb`);
    }
  }
  const l = new f();
  return l.saveAndClear(), o(), l.restore(), t;
}
function y() {
  let t = 0;
  return Object.keys(localStorage).forEach((e) => {
    t += c(e), t += c(localStorage.getItem(e) || "");
  }), t;
}
function d() {
  let t = S(), e = y(), o = t - e, l = 0, r = 0;
  return Object.keys(localStorage).forEach((n) => {
    l += c(n), r += c(localStorage.getItem(n) || "");
  }), {
    total: t,
    used: e,
    free: o,
    usedKey: l,
    usedContent: r
  };
}
export {
  y as curSize,
  S as size,
  d as stat
};
