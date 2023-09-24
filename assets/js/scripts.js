(()=>{
    var Tt = typeof window != "undefined"
      , ai = Tt ? window : null
      , Nt = Tt ? document : null
      , Xe = {
        normal: 1,
        reverse: -1,
        alternate: 2,
        "alternate-reverse": -2
    }
      , ci = {
        replace: -1,
        none: 0,
        add: 1
    }
      , Ye = Symbol()
      , ge = Symbol()
      , ve = Symbol()
      , ie = Symbol()
      , at = 1e-12
      , se = 1e3
      , ye = 120
      , pt = ""
      , We = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"]
      , He = We.reduce((t,e)=>({
        ...t,
        [e]: e + "("
    }), {})
      , xt = ()=>{}
      , li = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i
      , ui = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
      , di = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i
      , fi = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i
      , hi = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i
      , Ue = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g
      , Ke = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i
      , pi = /([a-z])([A-Z])/g
      , mi = /(\w+)(\([^)]+\)+)/g
      , Ge = /(\*=|\+=|-=)/
      , gi = /(<<|>>)/
      , _e = Date.now
      , Qe = _e()
      , it = {
        id: null,
        targets: null,
        keyframes: null,
        playbackRate: 1,
        frameRate: ye,
        loop: 0,
        direction: 1,
        autoplay: !0,
        duration: se,
        beginOffset: 0,
        delay: 0,
        endDelay: 0,
        easing: "outQuad",
        composition: -1,
        modifier: t=>t,
        onBegin: xt,
        onUpdate: xt,
        onTick: xt,
        onRender: xt,
        onLoop: xt,
        onComplete: xt
    }
      , J = {
        _fps: ye,
        _speed: 1,
        _hasChildren: !1,
        _startTickTime: Qe,
        _elapsedTickTime: Qe,
        _nextTickTime: 0,
        _frameDuration: se / ye,
        _head: null,
        _tail: null
    }
      , Ze = t=>{
        try {
            return Nt.querySelectorAll(t)
        } catch {
            return
        }
    }
      , vi = t=>t.replace(pi, "$1-$2").toLowerCase()
      , Et = (t,e)=>t.indexOf(e) === 0
      , jt = Math.pow
      , Je = Math.sqrt
      , yi = Math.sin
      , _i = Math.cos
      , tn = Math.abs;
    var be = Math.floor
      , bi = Math.asin
      , Ti = Math.max
      , xi = Math.atan2
      , Te = Math.PI
      , lt = (t,e,n)=>t < e ? e : t > n ? n : t
      , vt = (t,e=1)=>Math.round(t * e) / e
      , wi = (t,e)=>be(Math.random() * (e - t + 1)) + t
      , wt = (t,e,n)=>t + (e - t) * n
      , Si = (t,e,n)=>(1 - n) * t + n * e
      , Rt = t=>Array.isArray(t)
      , Wt = t=>t && t.constructor === Object
      , oe = t=>typeof t == "number"
      , Ot = t=>typeof t == "string"
      , xe = t=>typeof t == "function"
      , tt = t=>typeof t == "undefined"
      , re = t=>tt(t) || t === null
      , ae = t=>Tt && t instanceof SVGElement
      , en = t=>li.test(t)
      , nn = t=>Et(t, "rgb")
      , sn = t=>Et(t, "hsl")
      , ki = t=>en(t) || nn(t) || sn(t)
      , we = t=>!it.hasOwnProperty(t)
      , on = t=>Tt ? (Ot(t) && (t = Ze(t) || t),
    t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]) : [t]
      , dt = t=>Rt(t) ? [...t] : t
      , Ei = (t,e)=>{
        let n = {
            ...t
        };
        for (let i in e)
            n[i] = tt(t[i]) ? e[i] : t[i];
        return n
    }
      , Li = ()=>Tt && Nt.hidden
      , Ci = t=>new Promise(e=>t.completed ? e(t) : t._resolve = e)
      , ct = (t,e,n,i="_prev",s="_next")=>{
        let o = t._head
          , r = s;
        for (n && (o = t._tail,
        r = i); o; ) {
            let l = o[r];
            e(o),
            o = l
        }
    }
      , Ht = (t,e,n="_prev",i="_next")=>{
        let s = e[n]
          , o = e[i];
        s ? s[i] = o : t._head = o,
        o ? o[n] = s : t._tail = s,
        e[n] = null,
        e[i] = null
    }
      , Lt = (t,e,n,i="_prev",s="_next")=>{
        let o = t._tail;
        if (n)
            for (; o && n(o, e); o = o[i])
                ;
        let r = o ? o[s] : t._head;
        o ? o[s] = e : t._head = e,
        r ? r[i] = e : t._tail = e,
        e[i] = o,
        e[s] = r
    }
    ;
    var ls = new Map;
    var Ai = Te / 2
      , rn = Te * 2
      , Ut = t=>t
      , Kt = (t=1.675)=>e=>jt(e, +t)
      , an = {
        [pt]: Kt,
        Quad: Kt(2),
        Cubic: Kt(3),
        Quart: Kt(4),
        Quint: Kt(5),
        Sine: t=>1 - _i(t * Ai),
        Circ: t=>1 - Je(1 - t * t),
        Expo: t=>t ? jt(2, 10 * t - 10) : 0,
        Bounce: t=>{
            let e, n = 4;
            for (; t < ((e = jt(2, --n)) - 1) / 11; )
                ;
            return 1 / jt(4, 3 - n) - 7.5625 * jt((e * 3 - 2) / 22 - t, 2)
        }
        ,
        Back: (t=1.70158)=>e=>(+t + 1) * e * e * e - +t * e * e,
        Elastic: (t=1,e=.3)=>{
            let n = lt(+t, 1, 10)
              , i = lt(+e, at, 2)
              , s = i / rn * bi(1 / n)
              , o = rn / i;
            return r=>r === 0 || r === 1 ? r : -n * jt(2, -10 * (1 - r)) * yi((1 - r - s) * o)
        }
    }
      , cn = {
        in: t=>e=>t(e),
        out: t=>e=>1 - t(1 - e),
        inOut: t=>e=>e < .5 ? t(e * 2) / 2 : 1 - t(e * -2 + 2) / 2,
        outIn: t=>e=>e < .5 ? (1 - t(1 - e * 2)) / 2 : (t(e * 2 - 1) + 1) / 2
    }
      , ln = {
        linear: Ut
    }
      , ce = {
        linear: Ut
    };
    for (let t in cn)
        for (let e in an) {
            let n = an[e]
              , i = cn[t]
              , s = e === pt || e === "Back" || e === "Elastic"
              , o = s ? (l,d)=>i(n(l, d)) : i(n)
              , r = t + e;
            ln[r] = o,
            ce[r] = s ? o() : o
        }
    var Di = t=>{
        if (t.indexOf("(") <= -1)
            return Ut;
        let e = t.slice(0, -1).split("(")
          , n = ln[e[0]];
        return n ? ce[t] = n(...e[1].split(",")) : Ut
    }
      , un = t=>xe(t) ? t : Ot(t) ? ce[t] ? ce[t] : Di(t) : Ut
      , dn = ["", "deg", "rad", "turn"]
      , fn = t=>(t.offsetWidth || 0) / 100
      , hn = {}
      , Se = (t,e,n)=>{
        if (dn[0] = n,
        e.t === 1 && dn.includes(e.u))
            return e;
        let i = e.n
          , s = e.u
          , o = hn[i + s + n];
        if (!tt(o))
            e.n = o;
        else {
            let r = 100
              , l = Nt.createElement(t.tagName)
              , d = l.style
              , u = t.parentNode
              , h = u && u !== Nt ? u : Nt.body;
            h.appendChild(l),
            d.position = "absolute",
            d.width = r + s;
            let A = fn(l);
            d.width = r + n;
            let w = fn(l)
              , v = A / w;
            h.removeChild(l);
            let b = v * i;
            e.n = b,
            hn[i + s + n] = b
        }
        return e.t,
        e.u = n,
        e
    }
      , Mi = (t,e,n)=>{
        let i = t.style.transform, s;
        if (i) {
            let o = t[ie], r;
            for (; r = mi.exec(i); ) {
                let l = r[1]
                  , d = r[2].slice(1, -1);
                o[l] = d,
                l === e && (s = d,
                n && (n[e] = d))
            }
        }
        return i && !tt(s) ? s : Et(e, "scale") ? 1 : Et(e, "rotate") || Et(e, "skew") ? "0deg" : "0px"
    }
      , ke = t=>{
        if (!re(t))
            if (Rt(t)) {
                let e = [].concat(...t.map(on));
                return e.filter((n,i)=>e.indexOf(n) === i)
            } else
                return on(t)
    }
      , pn = t=>{
        if (re(t))
            return;
        let e = ke(t);
        for (let n = 0, i = e.length; n < i; n++) {
            let s = e[n];
            if (!s[Ye]) {
                s[Ye] = !0;
                let o = ae(s);
                (s.nodeType || o) && (s[ge] = !0,
                s[ve] = o,
                s[ie] = {})
            }
        }
        return e
    }
      , mn = (t,e)=>{
        let n = 0;
        return ct(e, i=>{
            t.includes(i.target) && (Ht(e, i),
            n++)
        }
        , !0),
        n
    }
      , gn = (t,e)=>{
        let n = ke(t)
          , i = e || J;
        ct(i, o=>{
            mn(n, o) && !o._head && Ht(i, o),
            o._head && gn(t, o)
        }
        , !0),
        mn(n, i) && !i._head && i.pause()
    }
      , $i = t=>{
        let e = t.getTotalLength();
        return t.setAttribute("stroke-dasharray", e),
        e
    }
      , vn = (t,e)=>{
        let n = e || {}
          , i = n.el || t.parentNode;
        for (; ae(i); ) {
            let u = i.parentNode;
            if (!ae(u))
                break;
            i = u
        }
        let s = i.getBoundingClientRect()
          , o = i.getAttribute("viewBox")
          , r = s.width
          , l = s.height
          , d = n.viewBox || (o ? o.split(" ") : [0, 0, r, l]);
        return {
            x: d[0] / 1,
            y: d[1] / 1,
            w: r,
            h: l,
            vW: d[2],
            vH: d[3]
        }
    }
      , Ee = (t,e,n=0)=>t.getPointAtLength(e + n >= 1 ? e + n : 0)
      , Ii = (t,e)=>{
        let n = Ot(t) ? Ze(t)[0] : t
          , i = vn(n, vn(n))
          , s = e || 1;
        return o=>({
            inSvg: !1,
            n: +n.getTotalLength() * s,
            p: function(r) {
                let l = Ee(n, r, 0)
                  , d = Ee(n, r, -1)
                  , u = Ee(n, r, 1)
                  , h = this.inSvg ? 1 : i.w / i.vW
                  , A = this.inSvg ? 1 : i.h / i.vH;
                return o === "x" ? (l.x - i.x) * h : o === "y" ? (l.y - i.y) * A : o === "angle" ? xi(u.y - d.y, u.x - d.x) * 180 / Te : 0
            }
        })
    }
      , Pi = (t,e)=>{
        if (e !== "opacity" && (e in t.style || e in t)) {
            if (e === "scale") {
                let n = t.parentNode;
                return n && n.tagName === "filter"
            }
            return !0
        }
    }
      , Ni = t=>{
        let e = ui.exec(t) || di.exec(t);
        return [+e[1], +e[2], +e[3], +e[4] || 1]
    }
      , ji = t=>{
        let e = t.length
          , n = e === 4 || e === 5;
        return [+("0x" + t[1] + t[n ? 1 : 2]), +("0x" + t[n ? 2 : 3] + t[n ? 2 : 4]), +("0x" + t[n ? 3 : 5] + t[n ? 3 : 6]), e === 5 || e === 9 ? +(("0x" + t[n ? 4 : 7] + t[n ? 4 : 8]) / 255).toFixed(3) : 1]
    }
      , Le = (t,e,n)=>(n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t)
      , Ri = t=>{
        let e = fi.exec(t) || hi.exec(t), n = e[1] / 360, i = e[2] / 100, s = e[3] / 100, o = +e[4] || 1, r, l, d;
        if (i === 0)
            r = l = d = s;
        else {
            let u = s < .5 ? s * (1 + i) : s + i - s * i
              , h = 2 * s - u;
            r = vt(Le(h, u, n + 1 / 3) * 255, 1),
            l = vt(Le(h, u, n) * 255, 1),
            d = vt(Le(h, u, n - 1 / 3) * 255, 1)
        }
        return [r, l, d, o]
    }
      , Oi = t=>nn(t) ? Ni(t) : en(t) ? ji(t) : sn(t) ? Ri(t) : [0, 0, 0, 1]
      , st = (t,e)=>tt(t) ? e : t
      , Ct = (t,e,n,i)=>{
        let s = (r,l,d,u)=>xe(r) ? r(l, d, u) || 0 : r
          , o = s(t, e, n, i);
        return Rt(o) && (o = o.map(r=>s(r, e, n, i)),
        o.length === 1 && (o = o[0])),
        o
    }
      , yn = (t,e)=>t[ge] ? t[ve] && Pi(t, e) ? 1 : We.includes(e) ? 3 : Et(e, "--") ? 4 : e in t.style ? 2 : re(t.getAttribute(e)) ? tt(t[e]) ? console.warn(`Can't find property '${e}' on target '${t}'.`) : 0 : 1 : 0
      , _n = (t,e,n)=>{
        let i = t.style[e];
        i && n && (n[e] = i);
        let s = i || getComputedStyle(t).getPropertyValue(e);
        return s === "auto" ? 0 : s
    }
      , le = (t,e,n,i)=>{
        let s = oe(n) ? n : yn(t, e);
        return s === 0 ? t[e] || 0 : s === 1 ? t.getAttribute(e) : s === 3 ? Mi(t, e, i) : s === 4 ? _n(t, e, i).trimStart() : _n(t, e, i)
    }
      , Ce = (t,e,n)=>n === "-" ? t - e : n === "+" ? t + e : t * e
      , St = t=>{
        let e = {
            t: 0,
            n: 0,
            u: null,
            o: null,
            d: null,
            s: null,
            p: null
        };
        if (!t)
            return e;
        let n = t
          , i = +n;
        if (isNaN(i))
            if (tt(t.inSvg)) {
                let s = Ge.exec(n);
                s && (n = n.slice(2),
                e.o = s[0][0]);
                let o = Ke.exec(n);
                if (o)
                    return e.t = 1,
                    e.n = +o[1],
                    e.u = o[2],
                    e;
                if (e.o)
                    return e.n = +n,
                    e;
                if (ki(n))
                    return e.t = 2,
                    e.d = Oi(n),
                    e;
                {
                    let r = n + pt
                      , l = r.match(Ue);
                    return e.t = 4,
                    e.d = l ? l.map(Number) : [],
                    e.s = r.split(Ue) || [],
                    e
                }
            } else
                return e.t = 3,
                e.n = t.n,
                e.u = pt,
                e.p = t,
                e;
        else
            return e.n = i,
            e
    }
      , bn = t=>({
        t: t._valueType,
        n: t._toNumber,
        u: t._unit,
        o: t.o,
        d: dt(t._toNumbers),
        s: dt(t.s),
        p: t.p
    })
      , qi = (t,e,n)=>{
        let[i] = pn(t);
        if (i) {
            let s = le(i, e);
            if (n) {
                let o = St(s);
                if (o.t === 0 || o.t === 1) {
                    let r = Se(i, o, n);
                    s = r.n + r.u
                }
            }
            return s
        }
    }
      , kt = (t,e,n,i,s)=>{
        let {duration: o, currentTime: r, _startOffset: l, _currentIteration: d, _iterationChangeStartTime: u, _iterationChangeEndTime: h, _iterationDuration: A, _direction: w, _hasChildren: v} = t
          , b = e - l
          , T = lt(vt(b, 1e4), 0, o)
          , $ = s < 0
          , m = e < r
          , x = T - r
          , L = $ || (x < 0 ? x * -1 : x) >= 200
          , I = 0
          , D = T;
        t._iterationCount > 1 && (t._currentIteration = ~~(T / A),
        T >= o && t._currentIteration--,
        I = t._currentIteration % 2,
        D = T % A);
        let O = w !== 1 && (w === -1 || w === 2 && I || w === -2 && !I)
          , X = L ? m ? 2 : 1 : 0
          , y = T >= o ? O ? 0 : o : O ? A - D : D;
        t._internalTime = b,
        !n && !t.began && b > 0 && (t.began = !0,
        t.onBegin(t));
        let P = 0;
        if (v) {
            let q = i ? e : y;
            ct(t, N=>{
                P += kt(N, q - N._timelineOffset, n, i, s)
            }
            , !(!m || m && O))
        }
        if (t.currentTime = T,
        n || t.onUpdate(t),
        ($ || !s && (e >= u && e <= h || e <= u && r !== 0 || e >= h && r !== o) || y >= h && r !== o || y <= u && r !== 0 || e <= r && r === o && t.completed) && (n || t.onTick(t),
        !v)) {
            let q = t._timelineOffset + y, g = t._head, N, M, _, E = 0;
            for (; g; ) {
                let p = g._composition
                  , k = g._currentTime
                  , S = g._changeDuration
                  , C = p === 1;
                if (!(!X && (k === S && q > g._absoluteChangeEndTime || k === 0 && q < g._absoluteChangeStartTime) || p !== 0 && (g._isOverridden || g._isOverlapped && q > g._absoluteChangeEndTime || g._nextRep && !g._nextRep._isOverridden && q > g._nextRep._absoluteStartTime || g._prevRep && !g._prevRep._isOverridden && q < g._prevRep._absoluteChangeEndTime))) {
                    let z = g._currentTime = lt(y - g._changeStartTime, 0, S), j = g._easing(z / g._updateDuration), F = g._modifier, G = g._valueType, Q, ot;
                    if (G === 0)
                        Q = ot = F(wt(g._fromNumber, g._toNumber, j));
                    else if (G === 1)
                        ot = F(wt(g._fromNumber, g._toNumber, j)),
                        Q = `${ot}${g._unit}`;
                    else if (G === 2) {
                        let W = g._fromNumbers
                          , a = g._toNumbers
                          , c = vt(lt(F(wt(W[0], a[0], j), 0, 255)), 1)
                          , f = vt(lt(F(wt(W[1], a[1], j), 0, 255)), 1)
                          , B = vt(lt(F(wt(W[2], a[2], j), 0, 255)), 1)
                          , H = lt(F(wt(W[3], a[3], j), 0, 1));
                        Q = `rgba(${c},${f},${B},${H})`
                    } else if (G === 3)
                        ot = F(g._path.p(j * g._toNumber)),
                        Q = ot + g._unit;
                    else if (G === 4) {
                        Q = g._strings[0];
                        for (let W = 0, a = g._toNumbers.length; W < a; W++) {
                            let c = F(wt(g._fromNumbers[W], g._toNumbers[W], j))
                              , f = g._strings[W + 1];
                            f ? Q += `${c}${f}` : Q += `${c}`,
                            C && (g._numbers[W] = c)
                        }
                    }
                    if (i)
                        g._value = Q;
                    else {
                        if (C)
                            g._number = ot;
                        else {
                            N = g.target;
                            let W = g.property
                              , a = g._tweenType;
                            a === 0 ? N[W] = Q : a === 3 ? (N !== M && (M = N,
                            _ = N[ie]),
                            _[W] = Q,
                            E = 1) : a === 2 ? N.style[W] = Q : a === 1 ? N.setAttribute(W, Q) : a === 4 && N.style.setProperty(W, Q)
                        }
                        P = 1
                    }
                }
                if (E && g._renderTransforms) {
                    let z = pt;
                    for (let j in _)
                        z += `${He[j]}${_[j]}) `;
                    N.style.transform = z,
                    E = 0
                }
                g = g._next
            }
        }
        return t.began && P && t.onRender(t),
        t.began && (b >= o ? (t._lastCurrentTime = 0,
        t._iterationCount !== 1 / 0 && t._currentIteration >= t._iterationCount - 1 && (t.paused = !0,
        t.completed || (t.completed = !0,
        t.onComplete(t),
        t._resolve(t)))) : t._currentIteration !== d && t.onLoop(t)),
        P
    }
      , Gt = {
        animation: null,
        render: xt
    }
      , Vi = t=>{
        let e = Gt.animation;
        return e || (e = {
            duration: at,
            _startOffset: 0,
            _head: null,
            _tail: null
        },
        Gt.animation = e,
        Gt.render = ()=>{
            t.forEach(n=>{
                for (let i in n) {
                    let s = n[i]
                      , o = s._head
                      , r = o._valueType === 4 ? dt(o._fromNumbers) : null
                      , l = o._fromNumber
                      , d = s._tail;
                    for (; d && d !== o; )
                        r ? d._numbers.forEach((u,h)=>r[h] += u) : l += d._number,
                        d = d._prevAdd;
                    o._toNumber = l,
                    o._toNumbers = r
                }
            }
            ),
            kt(e, 1, 1, 0, -1)
        }
        ),
        e
    }
      , Tn = Tt ? requestAnimationFrame : setImmediate
      , zi = Tt ? cancelAnimationFrame : clearImmediate
      , xn = (t,e)=>{
        let {_elapsedTickTime: n, _nextTickTime: i, _frameDuration: s} = t
          , o = e - n
          , r = n - J._startTickTime;
        if (t._elapsedTickTime += o,
        r >= i) {
            let l = r - i;
            return t._nextTickTime += l < s ? s : l
        }
    }
      , wn = ()=>{
        let t = _e();
        if (xn(J, t)) {
            let e = J._head;
            for (; e; ) {
                let n = e._next;
                if (e.paused)
                    Ht(J, e),
                    J._hasChildren = !!J._tail,
                    e._running = !1,
                    e.completed && !e._killed && e.kill();
                else {
                    e._currentTickTime = t;
                    let i = (t + (e._lastCurrentTime - e._startTickTime)) * e._speed * J._speed
                      , s = e._fps < J._fps ? ~~!xn(e, t) : 0;
                    kt(e, i, 0, 0, s)
                }
                e = n
            }
            Gt.render()
        }
    }
      , qt = 0
      , Sn = ()=>{
        J._head ? (qt = Tn(Sn),
        wn()) : qt = 0
    }
      , ue = t=>(t._startTickTime = _e(),
    t._elapsedStartOffsetTime = lt(t._internalTime + t._startOffset, 0, t._startOffset),
    t._lastCurrentTime = t._elapsedStartOffsetTime + t.currentTime * (1 / t._speed) * (1 / J._speed),
    t)
      , kn = (t,e)=>{
        let n = t._frameDuration
          , i = lt(e, 1, e)
          , s = se / i;
        t._fps = i,
        t._frameDuration = s,
        t._nextTickTime += s - n
    }
      , Qt = {
        useDefaultMainLoop: !0,
        pauseWhenHidden: !0,
        tick: wn,
        start: function() {
            return this.useDefaultMainLoop && !qt ? qt = Tn(Sn) : 0
        },
        resume: function() {
            return ct(J, ue),
            this.start()
        },
        pause: ()=>qt = zi(qt),
        get frameRate() {
            return J._fps
        },
        set frameRate(t) {
            kn(J, t)
        },
        get playbackRate() {
            return J._speed
        },
        set playbackRate(t) {
            J._speed = lt(t, at, t),
            this.resume(),
            J._lastCurrentTime += J._frameDuration
        }
    }
      , Bi = t=>{
        let e = {}
          , n = [].concat(...t.map(i=>Object.keys(i))).filter(we);
        for (let i = 0, s = n.length; i < s; i++) {
            let o = n[i];
            e[o] = t.map(r=>{
                let l = {};
                for (let d in r)
                    we(d) ? d === o && (l.to = r[d]) : l[d] = r[d];
                return l
            }
            )
        }
        return e
    }
      , En = {}
      , Fi = (t,e,n)=>{
        if (n === 2 || n === 1 && ae(e) && t in e.style) {
            let i = En[t];
            if (i)
                return i;
            {
                let s = vi(t);
                return En[t] = s,
                s
            }
        } else
            return t
    }
      , Ln = {
        _rep: new WeakMap,
        _add: new Map
    }
      , Zt = (t,e,n="_rep")=>{
        let i = Ln[n]
          , s = i.get(t);
        return s || (s = {},
        i.set(t, s)),
        s[e] ? s[e] : s[e] = {
            _head: null,
            _tail: null
        }
    }
      , Xi = (t,e)=>t._isOverridden || t._absoluteStartTime >= e._absoluteStartTime
      , Cn = (t,e)=>{
        let n = t._composition;
        if (n === -1) {
            let i = t._absoluteStartTime;
            Lt(e, t, Xi, "_prevRep", "_nextRep");
            let s = t._prevRep;
            if (s && s._absoluteChangeEndTime >= i) {
                let r = s._changeStartTime
                  , l = s._absoluteChangeEndTime - (r + s._updateDuration);
                s._absoluteChangeEndTime = i,
                s._changeDuration = i - l - r,
                s._currentTime = s._changeDuration,
                s._isOverlapped = 1,
                s._changeDuration < at && (s._changeDuration = at,
                s._currentTime = at)
            }
            let o = t._nextRep;
            if (o && o._absoluteStartTime >= i)
                for (; o; )
                    o._changeDuration = at,
                    o._currentTime = at,
                    o._isOverlapped = 1,
                    o._isOverridden = 1,
                    o = o._nextRep
        } else if (n === 1) {
            let i = Zt(t.target, t.property, "_add")
              , s = Vi(Ln._add)
              , o = i._head;
            o || (o = {
                ...t
            },
            o._composition = -1,
            o._updateDuration = at,
            o._changeStartTime = 0,
            o._numbers = dt(t._fromNumbers),
            o._number = 0,
            o._next = null,
            o._prev = null,
            Lt(i, o),
            Lt(s, o));
            let r = t._toNumber;
            if (t._fromNumber = o._fromNumber - r,
            t._toNumber = 0,
            t._numbers = dt(t._fromNumbers),
            t._number = 0,
            o._fromNumber = r,
            t._toNumbers) {
                let l = dt(t._toNumbers);
                l && l.forEach((d,u)=>{
                    t._fromNumbers[u] = o._fromNumbers[u] - d,
                    t._toNumbers[u] = 0
                }
                ),
                o._fromNumbers = l
            }
            Lt(i, t, null, "_prevAdd", "_nextAdd")
        }
    }
      , Yi = 0
      , Wi = (t,e,n,i,s,o,r,l,d,u)=>{
        let h = t._timelineOffset
          , A = 0
          , w = NaN
          , v = 0
          , b = 0;
        for (let T = 0, $ = e.length; T < $; T++) {
            let m = e[T]
              , x = NaN
              , L = NaN;
            for (let I in n)
                if (we(I)) {
                    let D = yn(m, I);
                    if (oe(D)) {
                        let O = Fi(I, m, D)
                          , X = n[I]
                          , y = Rt(X) ? X.length === 2 && !Wt(X[0]) ? [{
                            to: X
                        }] : X : [X]
                          , P = null
                          , q = null
                          , g = NaN
                          , N = 0
                          , M = 0
                          , _ = 0;
                        for (let E = y.length; _ < E; _++) {
                            let p = q ? M : 0
                              , k = h + p
                              , S = y[_]
                              , C = Wt(S) && tt(S.inSvg) ? S : {
                                to: S
                            }
                              , z = C.easing
                              , j = Ct(C.to, m, T, $)
                              , F = Ct(C.from, m, T, $)
                              , G = !tt(z) && Wt(z)
                              , Q = G ? z.solver : z || l
                              , ot = G ? z.duration : Ct(st(C.duration, E > 1 ? Ct(s, m, T, $) / E : s), m, T, $)
                              , W = Ct(st(C.delay, _ ? 0 : o), m, T, $)
                              , a = Ct(st(C.endDelay, _ === E - 1 ? r : 0), m, T, $)
                              , c = Ct(st(C.composition, u), m, T, $)
                              , f = C.modifier || d
                              , B = Rt(j)
                              , H = B || !tt(F) && !tt(j)
                              , Y = t._inlineStyles
                              , Z = q;
                            if (c !== 0) {
                                P || (P = Zt(m, O));
                                let K = P._head;
                                for (; K && !K._isOverridden && K._absoluteStartTime < k; )
                                    Z = K,
                                    K = K._nextRep
                            }
                            let R, V;
                            if (H) {
                                if (R = St(B ? j[0] : F),
                                V = St(B ? j[1] : j),
                                R.t === 0)
                                    if (Z)
                                        Z._valueType === 1 && (R.t = 1,
                                        R.u = Z._unit);
                                    else {
                                        let K = St(le(m, O, D, Y));
                                        K.t === 1 && (R.t = 1,
                                        R.u = K.u)
                                    }
                            } else {
                                let K = St(i && Z ? Z._value : le(m, O, D, Y));
                                tt(j) ? V = q ? bn(q) : K : V = St(j),
                                tt(F) ? R = q ? bn(q) : K : R = St(F)
                            }
                            if (H && R.o && (R.n = Ce(Z ? Z._toNumber : St(le(m, O, D, Y)).n, R.n, R.o)),
                            V.o && (V.n = Ce(R.n, V.n, V.o)),
                            R.t !== V.t) {
                                if (R.t === 4 || V.t === 4) {
                                    let K = R.t === 4 ? R : V
                                      , et = R.t === 4 ? V : R;
                                    et.t = 4,
                                    et.s = dt(K.s),
                                    et.d = K.d.map(()=>et.n)
                                } else if (R.t === 1 && V.t === 3)
                                    V.u = R.u;
                                else if (R.t === 1 || V.t === 1) {
                                    let K = R.t === 1 ? R : V
                                      , et = R.t === 1 ? V : R;
                                    et.t = 1,
                                    et.u = K.u
                                } else if (R.t === 2 || V.t === 2) {
                                    let K = R.t === 2 ? R : V
                                      , et = R.t === 2 ? V : R;
                                    et.t = 2,
                                    et.s = K.s,
                                    et.d = [0, 0, 0, 0]
                                }
                            }
                            if (R.u !== V.u) {
                                let K = V.u ? R : V;
                                K = Se(m, K, V.u ? V.u : R.u)
                            }
                            if (V.d && R.d && V.d.length != R.d.length) {
                                let K = R.d.length > V.d.length ? R : V
                                  , et = K === R ? V : R;
                                et.d = K.d.map((Yt,ne)=>tt(et.d[ne]) ? Yt : et.d[ne]),
                                et.s = dt(K.s)
                            }
                            V.t === 3 && m[ve] && (V.p.inSvG = !0),
                            D === 3 && Et(O, "scale") && (R.t,
                            V.t = 1,
                            R.u,
                            V.u = pt);
                            let mt = V.t
                              , ht = +ot || at
                              , bt = p + W + ht
                              , gt = {
                                id: Yi++,
                                property: O,
                                target: m,
                                _value: null,
                                _delay: +W,
                                _endDelay: +a,
                                _easing: un(Q),
                                _fromNumbers: dt(R.d),
                                _toNumbers: dt(V.d),
                                _strings: dt(V.s),
                                _fromNumber: R.n,
                                _toNumber: V.n,
                                _numbers: null,
                                _number: 0,
                                _unit: V.u,
                                _path: V.p,
                                _tweenType: D,
                                _valueType: mt,
                                _modifier: f,
                                _composition: c,
                                _currentTime: 0,
                                _updateDuration: ht,
                                _changeStartTime: p + W,
                                _changeDuration: ht,
                                _absoluteStartTime: k,
                                _absoluteChangeStartTime: k + W,
                                _absoluteChangeEndTime: h + bt,
                                _isOverlapped: 0,
                                _isOverridden: 0,
                                _renderTransforms: 0,
                                _prevRep: null,
                                _nextRep: null,
                                _prevAdd: null,
                                _nextAdd: null,
                                _prev: null,
                                _next: null
                            };
                            c !== 0 && Cn(gt, P),
                            isNaN(g) && (g = gt._changeStartTime),
                            N = bt,
                            M = bt + a,
                            q = gt,
                            b++,
                            Lt(t, gt)
                        }
                        (isNaN(w) || g < w) && (w = g),
                        M > A && (A = M),
                        N > v && (v = N),
                        D === 3 && (x = b - _,
                        L = b)
                    }
                }
            if (!isNaN(x)) {
                let I = 0;
                ct(t, D=>{
                    I >= x && I < L && (D._renderTransforms = 1,
                    D._composition === 1 && ct(Gt.animation, O=>{
                        O.id === D.id && (O._renderTransforms = 1)
                    }
                    )),
                    I++
                }
                )
            }
            t.duration = A * t._iterationCount,
            t._iterationDuration = A,
            t._iterationChangeStartTime = w,
            t._iterationChangeEndTime = v
        }
    }
      , An = t=>(t.paused = !0,
    t.began = !1,
    t.completed = !1,
    t._elapsedStartOffsetTime = 0,
    t)
      , Ae = t=>(t._killed && (t._hasChildren ? ct(t, Ae) : ct(t, e=>{
        e._composition !== 0 && Cn(e, Zt(e.target, e.property))
    }
    ),
    t._killed = 0),
    t)
      , De = (t=J)=>(t._hasChildren ? ct(t, De, !0) : (t.pause(),
    ct(t, e=>{
        let n = e.property
          , i = e.target;
        if (i[ge]) {
            let s = i.style
              , o = t._inlineStyles[n];
            if (e._tweenType === 3) {
                let r = i[ie];
                if (tt(o) || o === pt ? delete r[n] : r[n] = o,
                e._renderTransforms)
                    if (!Object.keys(r).length)
                        s.removeProperty("transform");
                    else {
                        let l = pt;
                        for (let d in r)
                            l += He[d] + r[d] + ") ";
                        s.transform = l
                    }
            } else
                tt(o) || o === pt ? s.removeProperty(n) : s[n] = o;
            t._tail === e && t.targets.forEach(r=>{
                r.getAttribute("style") === pt && r.removeAttribute("style")
            }
            )
        }
    }
    )),
    t)
      , Hi = 0
      , Vt = class {
        constructor(e={}, n, i, s) {
            let o = e.keyframes ? Ei(Bi(e.keyframes), e) : e
              , {autoplay: r, composition: l, delay: d, direction: u, duration: h, easing: A, endDelay: w, frameRate: v, id: b, loop: T, onComplete: $, onLoop: m, onRender: x, onBegin: L, onUpdate: I, onTick: D, playbackRate: O, modifier: X, beginOffset: y} = o
              , P = pn(o.targets || i)
              , q = !tt(A) && Wt(A)
              , g = q ? A.solver : st(A, it.easing)
              , N = q ? A.duration : st(h, it.duration)
              , M = st(d, it.delay)
              , _ = st(w, it.endDelay)
              , E = X || it.modifier
              , p = tt(l) && P && P.length >= se ? 0 : Ot(l) ? ci[l] : st(l, it.composition)
              , k = st(T, it.loop)
              , S = st(y, it.beginOffset)
              , C = M + N + _
              , z = k === !0 || k === 1 / 0 || k < 0 ? 1 / 0 : k + 1
              , j = ~~!!n
              , F = j ? 0 : J._elapsedTickTime
              , G = j ? 0 : S;
            this.id = b || Hi++,
            this.targets = P,
            this.duration = C * z,
            this.currentTime = 0,
            this.paused = !0,
            this.began = !1,
            this.completed = !1,
            this.onBegin = L || it.onBegin,
            this.onUpdate = I || it.onUpdate,
            this.onTick = D || it.onTick,
            this.onRender = x || it.onRender,
            this.onLoop = m || it.onLoop,
            this.onComplete = $ || it.onComplete,
            this._params = e,
            this._hasChildren = !1,
            this._running = !1,
            this._autoplay = st(r, it.autoplay),
            this._startOffset = G,
            this._elapsedStartOffsetTime = 0,
            this._timelineOffset = S + (j ? 0 : J._elapsedTickTime - J._startTickTime),
            this._internalTime = -G,
            this._lastCurrentTime = 0,
            this._startTickTime = 0,
            this._elapsedTickTime = F,
            this._currentTickTime = F,
            this._nextTickTime = 0,
            this._frameDuration = 0,
            this._iterationDuration = C,
            this._iterationChangeStartTime = M,
            this._iterationChangeEndTime = M + N,
            this._iterationCount = z,
            this._currentIteration = 0,
            this._direction = oe(u) ? u : Ot(u) ? Xe[u] : it.direction,
            this._inlineStyles = {},
            this._killed = 0,
            this._resolve = xt,
            this._fps = st(v, it.frameRate),
            this._speed = st(O, it.playbackRate),
            this._head = null,
            this._tail = null,
            this._prev = null,
            this._next = null,
            P && Wi(this, P, o, j, N, M, _, g, E, p),
            s || (this.frameRate = this._fps,
            this.playbackRate = this._speed,
            this.reset(j)),
            !j && this._autoplay && this.play()
        }
        pause() {
            return this.paused ? this : (this.paused = !0,
            this)
        }
        play() {
            return this.paused ? ((this.completed || this._killed) && this.reset(0),
            this.paused = !1,
            this.duration === at ? kt(this, 1, 0, 0, -1) : (this._running || (Lt(J, this),
            J._hasChildren = !0,
            this._running = !0),
            ue(this),
            Qt.start()),
            this) : this
        }
        kill(e) {
            return e && (kt(this, 0, 1, 0, -1),
            De(this)),
            this._hasChildren ? ct(this, n=>n.kill(e), !0) : ct(this, n=>{
                let i = n._composition;
                if (i !== 0) {
                    let s = n.target
                      , o = n.property
                      , r = Zt(s, o);
                    if (Ht(r, n, "_prevRep", "_nextRep"),
                    i === 1) {
                        let l = Zt(s, o, "_add");
                        Ht(l, n, "_prevAdd", "_nextAdd")
                    }
                }
            }
            ),
            this._killed = 1,
            this.pause()
        }
        reset(e) {
            return Ae(this),
            kt(this, 0, 1, e, -1),
            An(this),
            this._hasChildren && ct(this, An),
            this
        }
        seek(e, n) {
            return Ae(this),
            kt(this, e, ~~n, 0, 0),
            this
        }
        reverse() {
            let e = this._direction
              , n = this._currentIteration
              , i = n + ((e === 2 || e === -2) && n % 2 ? 1 : 0)
              , s = this._iterationDuration;
            return this._direction = e === 1 ? -1 : e === -1 ? 1 : e === 2 ? -2 : 2,
            this._currentIteration = i - n,
            this.currentTime = this._currentIteration * s + (s - this.currentTime % s),
            ue(this)
        }
        restart() {
            return this.reset(0).play()
        }
        get progress() {
            return this.currentTime / this.duration
        }
        set progress(e) {
            this.seek(this.duration * +e)
        }
        get frameRate() {
            return this._fps
        }
        set frameRate(e) {
            kn(this, +e)
        }
        get playbackRate() {
            return this._speed
        }
        set playbackRate(e) {
            this._speed = lt(e, at, e),
            ue(this),
            this._lastCurrentTime += this._frameDuration
        }
    }
      , Ui = (t,e)=>{
        let n = gi.exec(e);
        if (n) {
            let i = n[0] === "<<"
              , s = t._tail
              , o = s ? s._timelineOffset : 0;
            return i ? o : o + s.duration
        }
    }
      , de = (t,e)=>{
        let n = t._iterationDuration;
        if (n === at && (n = 0),
        tt(e))
            return n;
        if (oe(e) || !isNaN(+e))
            return +e;
        let i = t ? t._labels : null
          , s = !re(i)
          , o = Ui(t, e)
          , r = !tt(o)
          , l = Ge.exec(e);
        if (l) {
            let d = l[0]
              , u = e.split(d)
              , h = s && u[0] ? i[u[0]] : n
              , A = r ? o : s ? h : n
              , w = +u[1];
            return Ce(A, w, d[0])
        } else
            return r ? o : s ? tt(i[e]) ? n : i[e] : n
    }
      , Me = (t,e,n)=>{
        t.beginOffset = st(t.beginOffset, n),
        t.autoplay = !1,
        kt(e, n, 1, 1, 0);
        let i = new Vt(t,e);
        return Lt(e, i),
        ct(e, s=>{
            let o = s._timelineOffset
              , r = o + s._iterationChangeStartTime;
            (isNaN(e._iterationChangeStartTime) || r < e._iterationChangeStartTime) && (e._iterationChangeStartTime = r);
            let l = o + s.duration;
            l > e._iterationDuration && (e._iterationDuration = l);
            let d = o + (s.duration - (s._iterationDuration - s._iterationChangeEndTime));
            d > e._iterationChangeEndTime && (e._iterationChangeEndTime = d)
        }
        ),
        e.duration = e._iterationDuration * e._iterationCount,
        i
    }
      , Dn = class extends Vt {
        constructor(e) {
            super(e);
            this.duration = 0,
            this.labels = {},
            this._iterationDuration = 0,
            this._iterationChangeStartTime = NaN,
            this._iterationChangeEndTime = 0
        }
        addLabel(e, n) {
            return this.labels[e] = de(this, n),
            this
        }
        addTicker(e={}, n) {
            return e.duration = e.duration || 1 / 0,
            Me(e, this, de(this, n)),
            this
        }
        add(e, n, i) {
            this._hasChildren = !0;
            let s = {
                ...n
            }
              , {frameRate: o, delay: r, endDelay: l, duration: d, easing: u, modifier: h, composition: A} = this._params;
            if (s.targets = e,
            s.frameRate = st(s.frameRate, o),
            s.delay = st(s.delay, r),
            s.endDelay = st(s.endDelay, l),
            s.duration = st(s.duration, d),
            s.composition = st(s.composition, A),
            s.easing = s.easing || u,
            s.modifier = s.modifier || h,
            xe(i)) {
                let w = ke(s.targets)
                  , v = this.duration
                  , b = this._iterationDuration
                  , T = s.id
                  , $ = 0;
                w.forEach(m=>{
                    let x = {
                        ...s
                    };
                    x.targets = m,
                    this.duration = v,
                    this._iterationDuration = b,
                    tt(T) || (x.id = T + "-" + $),
                    Me(x, this, i(m, $++, w.length, this))
                }
                )
            } else
                Me(s, this, de(this, i));
            return this.reset(1),
            this._autoplay ? this.play() : this
        }
    }
      , Mn = (t,e={})=>{
        let n = e.from || 0
          , i = []
          , s = 0
          , o = Ot(e.direction) ? Xe[e.direction] : it.direction
          , r = e.easing
          , l = !tt(r)
          , u = (l ? Wt(r) : !1) ? r.solver : l ? un(r) : null
          , h = e.grid
          , A = e.axis
          , w = n === "first"
          , v = n === "center"
          , b = n === "last"
          , T = Rt(t)
          , $ = parseFloat(T ? t[0] : t)
          , m = T ? parseFloat(t[1]) : 0
          , x = Ke.exec(T ? t[1] : t)
          , L = x ? x[2] : 0
          , I = e.start || 0 + (T ? $ : 0);
        return (D,O,X,y)=>{
            if (w && (n = 0),
            v && (n = (X - 1) / 2),
            b && (n = X - 1),
            !i.length) {
                for (let N = 0; N < X; N++) {
                    if (!h)
                        i.push(tn(n - N));
                    else {
                        let M = v ? (h[0] - 1) / 2 : n % h[0]
                          , _ = v ? (h[1] - 1) / 2 : be(n / h[0])
                          , E = N % h[0]
                          , p = be(N / h[0])
                          , k = M - E
                          , S = _ - p
                          , C = Je(k * k + S * S);
                        A === "x" && (C = -k),
                        A === "y" && (C = -S),
                        i.push(C)
                    }
                    s = Ti(...i)
                }
                u && (i = i.map(N=>u(N / s) * s)),
                o === -1 && (i = i.map(N=>A ? N < 0 ? N * -1 : -N : tn(s - N)))
            }
            let P = T ? (m - $) / s : $
              , g = (y ? de(y, tt(e.start) ? y.duration : I) : I) + (P * vt(i[O], 100) || 0);
            return e.modifier && (g = e.modifier(g)),
            L && (g = `${g}${L}`),
            g
        }
    }
      , At = (t,e,n)=>new Vt(e,n,t)
      , zt = (t,e)=>new Dn(t,e)
      , Bt = (t={},e)=>(tt(t.duration) && (t.duration = 1 / 0),
    new Vt(t,e))
      , Ki = (t,e={})=>(e.duration = at,
    e.composition = e.composition || 0,
    new Vt(e,null,t,!0))
      , nt = {
        get: qi,
        set: Ki,
        remove: gn,
        convertUnit: Se,
        cleanupInlineStyles: De,
        getPath: Ii,
        setDashoffset: $i,
        clamp: lt,
        random: wi,
        round: vt,
        interpolate: wt,
        lerp: Si,
        promisify: Ci
    };
    Tt && (ai.AnimeJS = {
        version: "4.0.0",
        engine: Qt,
        globalTimeline: J
    },
    Nt.addEventListener("visibilitychange", ()=>Qt.pauseWhenHidden ? Li() ? Qt.pause() : Qt.resume() : 0));
    var Dt = document.querySelector("#easter-egg"), $n = 0, In = !1, $e = Date.now(), Pn = $e, Ie, yt;
    function Pe(t) {
        yt && yt.kill();
        let e = zt({
            autoplay: !1
        })
          , n = t.querySelectorAll(".media-wrapper");
        return Array.from(n).sort(()=>Math.random() > .5 ? 1 : -1).forEach((i,s)=>{
            e.add(i, {
                opacity: [0, 1],
                left: ["-9999vw", `${nt.random(-2, 102)}vw`],
                top: ["-9999vh", `${nt.random(-2, 102)}vh`],
                duration: 0,
                pointerEvents: "auto",
                onBegin: o=>{
                    let r = o.targets[0].querySelector("img");
                    if (!i.classList.contains("is-loaded")) {
                        let l = r.getAttribute("data-src");
                        r.src = l,
                        i.classList.add("is-loaded")
                    }
                }
            }, s * 1e3)
        }
        ),
        e
    }
    function Ne() {
        Ie && (clearTimeout(Ie),
        yt && yt.pause())
    }
    function Mt() {
        Ne(),
        Ie = setTimeout(()=>{
            document.body.classList.add("has-easter-egg"),
            yt = Pe(Dt),
            yt.play()
        }
        , 9e4)
    }
    function Nn() {
        !Dt || Dt && Dt.classList.contains("is-init") || (Dt.classList.add("is-init"),
        yt = Pe(Dt),
        Mt(),
        document.addEventListener("mousemove", t=>{
            Mt();
            let n = t.target.closest("#easter-egg .media-wrapper");
            n && nt.set(n, {
                opacity: 0,
                pointerEvents: "none"
            })
        }
        ),
        document.addEventListener("touchstart", ()=>{
            Mt(),
            document.body.classList.contains("has-easter-egg") && (document.body.classList.remove("has-easter-egg"),
            At("#easter-egg .media-wrapper", {
                opacity: 0,
                pointerEvents: "none",
                duration: 0,
                delay: Mn(35)
            }))
        }
        ),
        document.addEventListener("visibilitychange", ()=>{
            Pn = Date.now(),
            document.hidden ? (In = !0,
            $e = Date.now()) : In ? (document.body.classList.add("has-easter-egg"),
            $n = Pn - $e,
            Mt(),
            yt.seek($n),
            yt = Pe(Dt)) : Mt()
        }
        ))
    }
    function Ft(t) {
        t.style.width = "auto",
        t.style.height = "auto";
        let e = t.parentNode.parentNode
          , n = t.offsetWidth
          , i = t.offsetHeight
          , s = e.offsetWidth
          , o = e.offsetHeight
          , r = n / i
          , l = s / o;
        r > l ? (t.style.width = "100%",
        t.style.height = "auto") : (t.style.width = "auto",
        t.style.height = "100%")
    }
    function jn(t) {
        return !!(t.src && t.currentTime > 0 && !t.paused && !t.ended && t.readyState > 2)
    }
    function $t(t) {
        jn(t) && t.pause()
    }
    function Rn(t) {
        let e = t.src
          , n = t.currentTime;
        t.src = "",
        t.preload = "none",
        t.load(),
        t.src = e,
        t.currentTime = n,
        $t(t)
    }
    function _t(t) {
        jn(t) || t.play()
    }
    function It(t) {
        t.muted = !0,
        t.volume = 0
    }
    function On(t) {
        t.muted = !1,
        t.volume = 1
    }
    var qn = t=>t.tagName === "VIDEO" ? "loadedmetadata" : "load";
    function Vn() {
        this.removeAttribute("data-srcset"),
        this.removeAttribute("data-src"),
        this.classList.add("is-loaded"),
        this.parentNode.classList.add("has-loaded-media"),
        this.removeEventListener(qn(this), Vn)
    }
    function je(t, e) {
        let n = t.getAttribute("data-src")
          , i = t.getAttribute("data-bgsrc")
          , s = t.getAttribute("data-srcset")
          , o = t.getAttribute("data-poster");
        i ? (t.style.backgroundImage = `url(${i})`,
        t.removeAttribute("data-bgsrc"),
        t.classList.add("is-loaded")) : (n || s) && (t.addEventListener(qn(t), Vn),
        o && (t.poster = o,
        t.removeAttribute("data-poster")),
        s && (t.srcset = s),
        t.src = n),
        e && e.unobserve(t)
    }
    function Re(t, e) {
        t.forEach(n=>{
            let i = n.target;
            !i.classList.contains("is-loaded") && n.isIntersecting && je(i, e)
        }
        )
    }
    function fe(t={}) {
        let {root: e, rootMargin: n, threshold: i, onIntersect: s} = t;
        return {
            observer: new IntersectionObserver(s,{
                root: e || null,
                rootMargin: n || "0%",
                threshold: i || 0
            }),
            observed: new Set
        }
    }
    function he(t, e) {
        return t.observed.has(e) || (t.observer.observe(e),
        t.observed.add(e)),
        e
    }
    function Gi(t) {
        var e = Math.floor(t / 60)
          , n = Math.floor(t % 60);
        return (e < 10 ? "0" : "") + e + ":" + (n < 10 ? "0" : "") + n
    }
    var Oe = class {
        constructor(e) {
            this.$el = e,
            this.$video = null,
            this.$progress = e.querySelector(".video-progress"),
            this.$time = e.querySelector(".video-time"),
            this.$togglePlay = e.querySelector(".video-toggle-play"),
            this.$toggleAudio = e.querySelector(".video-toggle-audio"),
            this.ticker = Bt({
                autoplay: !1,
                onUpdate: this._syncProgress.bind(this)
            }),
            this.$togglePlay.addEventListener("click", this.togglePlay.bind(this), !1),
            this.$toggleAudio.addEventListener("click", this.toggleAudio.bind(this), !1),
            this.$progress.addEventListener("input", this._onInputProgress.bind(this), !1),
            this.$progress.addEventListener("touchstart", this._updateInputsRange.bind(this), !1),
            this.$progress.addEventListener("touchmove", this._updateInputsRange.bind(this), !1),
            this.$progress.addEventListener("touchend", this._endUpdateInputsRange.bind(this), !1),
            document.addEventListener("keydown", n=>{
                (n.key === " " || n.code == "Space") && (n.preventDefault(),
                this.togglePlay())
            }
            , !1),
            this._updateTime(0)
        }
        _updateInputsRange(e) {
            this.ticker.pause();
            let {left: n, right: i} = this.$progress.getBoundingClientRect()
              , s = (e.pageX - n) / (i - n)
              , o = +this.$progress.getAttribute("min") || 0
              , r = +this.$progress.getAttribute("max") || 1
              , l = r - o
              , d = o + s * l
              , u = this.$video.duration
              , h = nt.clamp(u * (d / r), 0, u);
            this.ticker.pause(),
            this.$progress.value = d,
            this.$video.currentTime = h,
            this._updateTime(h)
        }
        _startUpdateInputsRange(e) {
            this.ticker.pause(),
            this._updateInputsRange(e)
        }
        _moveUpdateInputsRange(e) {
            this.ticker.pause(),
            this._updateInputsRange(e)
        }
        _endUpdateInputsRange(e) {
            this.$video.currentTime = this.$progress.value,
            this.ticker.play()
        }
        _updateTime(e) {
            let n = this.$video && !isNaN(this.$video.duration) ? this.$video.duration : 0;
            this.$time.textContent = Gi(e),
            n && (this.$progress.max = n,
            nt.set(this.$progress, {
                "--video-progress": e / n
            }))
        }
        _syncProgress() {
            let e = this.$video
              , n = 0;
            e && !isNaN(e.duration) && (n = e.currentTime),
            this._updateTime(n),
            this.$progress.value = n,
            Ne()
        }
        _onInputProgress() {
            this.$video.currentTime = this.$progress.value,
            this._updateTime(this.$video.currentTime)
        }
        play() {
            this.$video && (this.$el.classList.add("is-playing"),
            _t(this.$video),
            this.ticker.play())
        }
        pause() {
            this.$el.classList.remove("is-playing"),
            this.$video && $t(this.$video),
            this.ticker.pause()
        }
        togglePlay() {
            this.$el.classList.contains("is-playing") ? this.pause() : this.play()
        }
        mute() {
            this.$el.classList.add("is-muted"),
            It(this.$video)
        }
        unmute() {
            this.$el.classList.remove("is-muted"),
            On(this.$video)
        }
        toggleAudio() {
            this.$el.classList.contains("is-muted") ? this.unmute() : this.mute()
        }
        attachVideo(e) {
            this.$el.classList.remove("show-player"),
            this.$video = e,
            this.$video.muted ? this.mute() : this.unmute(),
            this.play(),
            this.$el.classList.add("has-video")
        }
        detachVideo() {
            this.pause(),
            this.$video = null,
            this.$progress.max = 0,
            this.$el.classList.remove("is-muted"),
            this.$el.classList.remove("is-playing"),
            this.$el.classList.remove("has-video"),
            this._syncProgress(),
            Mt()
        }
    }
    ;
    var U = {
        videoPlayer: new Oe(document.querySelector("#video-player-container")),
        sliders: new Map,
        activeSlider: null,
        $sliderCounter: document.querySelector(".slider-counter"),
        isTouch: window.matchMedia("(hover: none), (pointer: coarse)").matches
    };
    var Xt = function() {
        return Xt = Object.assign || function(t) {
            for (var e, n = 1, i = arguments.length; n < i; n++)
                for (var s in e = arguments[n])
                    Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            return t
        }
        ,
        Xt.apply(this, arguments)
    };
    function zn(t, e, n) {
        if (n || arguments.length === 2)
            for (var i, s = 0, o = e.length; s < o; s++)
                !i && s in e || (i || (i = Array.prototype.slice.call(e, 0, s)),
                i[s] = e[s]);
        return t.concat(i || Array.prototype.slice.call(e))
    }
    function Bn(t) {
        return Array.prototype.slice.call(t)
    }
    function Fn(t, e) {
        var n = Math.floor(t);
        return n === e || n + 1 === e ? t : e
    }
    function Xn() {
        return Date.now()
    }
    function qe(t, e, n) {
        if (e = "data-keen-slider-" + e,
        n === null)
            return t.removeAttribute(e);
        t.setAttribute(e, n || "")
    }
    function pe(t, e) {
        return e = e || document,
        typeof t == "function" && (t = t(e)),
        Array.isArray(t) ? t : typeof t == "string" ? Bn(e.querySelectorAll(t)) : t instanceof HTMLElement ? [t] : t instanceof NodeList ? Bn(t) : []
    }
    function Jt(t) {
        t.raw && (t = t.raw),
        t.cancelable && !t.defaultPrevented && t.preventDefault()
    }
    function te(t) {
        t.raw && (t = t.raw),
        t.stopPropagation && t.stopPropagation()
    }
    function Yn() {
        var t = [];
        return {
            add: function(e, n, i, s) {
                e.addListener ? e.addListener(i) : e.addEventListener(n, i, s),
                t.push([e, n, i, s])
            },
            input: function(e, n, i, s) {
                this.add(e, n, function(o) {
                    return function(r) {
                        r.nativeEvent && (r = r.nativeEvent);
                        var l = r.changedTouches || []
                          , d = r.targetTouches || []
                          , u = r.detail && r.detail.x ? r.detail : null;
                        return o({
                            id: u ? u.identifier ? u.identifier : "i" : d[0] ? d[0] ? d[0].identifier : "e" : "d",
                            idChanged: u ? u.identifier ? u.identifier : "i" : l[0] ? l[0] ? l[0].identifier : "e" : "d",
                            raw: r,
                            x: u && u.x ? u.x : d[0] ? d[0].screenX : u ? u.x : r.pageX,
                            y: u && u.y ? u.y : d[0] ? d[0].screenY : u ? u.y : r.pageY
                        })
                    }
                }(i), s)
            },
            purge: function() {
                t.forEach(function(e) {
                    e[0].removeListener ? e[0].removeListener(e[2]) : e[0].removeEventListener(e[1], e[2], e[3])
                }),
                t = []
            }
        }
    }
    function Ve(t, e, n) {
        return Math.min(Math.max(t, e), n)
    }
    function ft(t) {
        return (t > 0 ? 1 : 0) - (t < 0 ? 1 : 0) || +t
    }
    function Wn(t) {
        var e = t.getBoundingClientRect();
        return {
            height: Fn(e.height, t.offsetHeight),
            width: Fn(e.width, t.offsetWidth)
        }
    }
    function rt(t, e, n, i) {
        var s = t && t[e];
        return s == null ? n : i && typeof s == "function" ? s() : s
    }
    function ut(t) {
        return Math.round(1e6 * t) / 1e6
    }
    function Qi(t) {
        var e, n, i, s, o, r;
        function l(w) {
            r || (r = w),
            d(!0);
            var v = w - r;
            v > i && (v = i);
            var b = s[n];
            if (b[3] < v)
                return n++,
                l(w);
            var T = b[2]
              , $ = b[4]
              , m = b[0]
              , x = b[1] * (0,
            b[5])($ === 0 ? 1 : (v - T) / $);
            if (x && t.track.to(m + x),
            v < i)
                return h();
            r = null,
            d(!1),
            u(null),
            t.emit("animationEnded")
        }
        function d(w) {
            e.active = w
        }
        function u(w) {
            e.targetIdx = w
        }
        function h() {
            var w;
            w = l,
            o = window.requestAnimationFrame(w)
        }
        function A() {
            var w;
            w = o,
            window.cancelAnimationFrame(w),
            d(!1),
            u(null),
            r && t.emit("animationStopped"),
            r = null
        }
        return e = {
            active: !1,
            start: function(w) {
                if (A(),
                t.track.details) {
                    var v = 0
                      , b = t.track.details.position;
                    n = 0,
                    i = 0,
                    s = w.map(function(T) {
                        var $, m = Number(b), x = ($ = T.earlyExit) !== null && $ !== void 0 ? $ : T.duration, L = T.easing, I = T.distance * L(x / T.duration) || 0;
                        b += I;
                        var D = i;
                        return i += x,
                        v += I,
                        [m, T.distance, D, i, T.duration, L]
                    }),
                    u(t.track.distToIdx(v)),
                    h(),
                    t.emit("animationStarted")
                }
            },
            stop: A,
            targetIdx: null
        }
    }
    function Zi(t) {
        var e, n, i, s, o, r, l, d, u, h, A, w, v, b, T = 1 / 0, $ = [], m = null, x = 0;
        function L(_) {
            N(x + _)
        }
        function I(_) {
            var E = D(x + _).abs;
            return y(E) ? E : null
        }
        function D(_) {
            var E = Math.floor(Math.abs(ut(_ / n)))
              , p = ut((_ % n + n) % n);
            p === n && (p = 0);
            var k = ft(_)
              , S = l.indexOf(zn([], l, !0).reduce(function(z, j) {
                return Math.abs(j - p) < Math.abs(z - p) ? j : z
            }))
              , C = S;
            return k < 0 && E++,
            S === r && (C = 0,
            E += k > 0 ? 1 : -1),
            {
                abs: C + E * r * k,
                origin: S,
                rel: C
            }
        }
        function O(_, E, p) {
            var k;
            if (E || !q())
                return X(_, p);
            if (!y(_))
                return null;
            var S = D(p ?? x)
              , C = S.abs
              , z = _ - S.rel
              , j = C + z;
            k = X(j);
            var F = X(j - r * ft(z));
            return (F !== null && Math.abs(F) < Math.abs(k) || k === null) && (k = F),
            ut(k)
        }
        function X(_, E) {
            if (E == null && (E = ut(x)),
            !y(_) || _ === null)
                return null;
            _ = Math.round(_);
            var p = D(E)
              , k = p.abs
              , S = p.rel
              , C = p.origin
              , z = g(_)
              , j = (E % n + n) % n
              , F = l[C]
              , G = Math.floor((_ - (k - S)) / r) * n;
            return ut(F - j - F + l[z] + G + (C === r ? n : 0))
        }
        function y(_) {
            return P(_) === _
        }
        function P(_) {
            return Ve(_, u, h)
        }
        function q() {
            return s.loop
        }
        function g(_) {
            return (_ % r + r) % r
        }
        function N(_) {
            var E;
            E = _ - x,
            $.push({
                distance: E,
                timestamp: Xn()
            }),
            $.length > 6 && ($ = $.slice(-6)),
            x = ut(_);
            var p = M().abs;
            if (p !== m) {
                var k = m !== null;
                m = p,
                k && t.emit("slideChanged")
            }
        }
        function M(_) {
            var E = _ ? null : function() {
                if (r) {
                    var p = q()
                      , k = p ? (x % n + n) % n : x
                      , S = (p ? x % n : x) - o[0][2]
                      , C = 0 - (S < 0 && p ? n - Math.abs(S) : S)
                      , z = 0
                      , j = D(x)
                      , F = j.abs
                      , G = j.rel
                      , Q = o[G][2]
                      , ot = o.map(function(W, a) {
                        var c = C + z;
                        (c < 0 - W[0] || c > 1) && (c += (Math.abs(c) > n - 1 && p ? n : 0) * ft(-c));
                        var f = a - G
                          , B = ft(f)
                          , H = f + F;
                        p && (B === -1 && c > Q && (H += r),
                        B === 1 && c < Q && (H -= r),
                        A !== null && H < A && (c += n),
                        w !== null && H > w && (c -= n));
                        var Y = c + W[0] + W[1]
                          , Z = Math.max(c >= 0 && Y <= 1 ? 1 : Y < 0 || c > 1 ? 0 : c < 0 ? Math.min(1, (W[0] + c) / W[0]) : (1 - c) / W[0], 0);
                        return z += W[0] + W[1],
                        {
                            abs: H,
                            distance: s.rtl ? -1 * c + 1 - W[0] : c,
                            portion: Z,
                            size: W[0]
                        }
                    });
                    return F = P(F),
                    G = g(F),
                    {
                        abs: P(F),
                        length: i,
                        max: b,
                        maxIdx: h,
                        min: v,
                        minIdx: u,
                        position: x,
                        progress: p ? k / n : x / i,
                        rel: G,
                        slides: ot,
                        slidesLength: n
                    }
                }
            }();
            return e.details = E,
            t.emit("detailsChanged"),
            E
        }
        return e = {
            absToRel: g,
            add: L,
            details: null,
            distToIdx: I,
            idxToDist: O,
            init: function(_) {
                if (function() {
                    if (s = t.options,
                    o = (s.trackConfig || []).map(function(S) {
                        return [rt(S, "size", 1), rt(S, "spacing", 0), rt(S, "origin", 0)]
                    }),
                    r = o.length) {
                        n = ut(o.reduce(function(S, C) {
                            return S + C[0] + C[1]
                        }, 0));
                        var p, k = r - 1;
                        i = ut(n + o[0][2] - o[k][0] - o[k][2] - o[k][1]),
                        l = o.reduce(function(S, C) {
                            if (!S)
                                return [0];
                            var z = o[S.length - 1]
                              , j = S[S.length - 1] + (z[0] + z[2]) + z[1];
                            return j -= C[2],
                            S[S.length - 1] > j && (j = S[S.length - 1]),
                            j = ut(j),
                            S.push(j),
                            (!p || p < j) && (d = S.length - 1),
                            p = j,
                            S
                        }, null),
                        i === 0 && (d = 0),
                        l.push(ut(n))
                    }
                }(),
                !r)
                    return M(!0);
                var E;
                (function() {
                    var p = t.options.range
                      , k = t.options.loop;
                    A = u = k ? rt(k, "min", -1 / 0) : 0,
                    w = h = k ? rt(k, "max", T) : d;
                    var S = rt(p, "min", null)
                      , C = rt(p, "max", null);
                    S && (u = S),
                    C && (h = C),
                    v = u === -1 / 0 ? u : t.track.idxToDist(u || 0, !0, 0),
                    b = h === T ? h : O(h, !0, 0),
                    C === null && (w = h),
                    rt(p, "align", !1) && h !== T && o[g(h)][2] === 0 && (b -= 1 - o[g(h)][0],
                    h = I(b - x)),
                    v = ut(v),
                    b = ut(b)
                }
                )(),
                E = _,
                Number(E) === E ? L(X(P(_))) : M()
            },
            to: N,
            velocity: function() {
                var _ = Xn()
                  , E = $.reduce(function(p, k) {
                    var S = k.distance
                      , C = k.timestamp;
                    return _ - C > 200 || (ft(S) !== ft(p.distance) && p.distance && (p = {
                        distance: 0,
                        lastTimestamp: 0,
                        time: 0
                    }),
                    p.time && (p.distance += S),
                    p.lastTimestamp && (p.time += C - p.lastTimestamp),
                    p.lastTimestamp = C),
                    p
                }, {
                    distance: 0,
                    lastTimestamp: 0,
                    time: 0
                });
                return E.distance / E.time || 0
            }
        }
    }
    function Ji(t) {
        var e, n, i, s, o, r, l, d;
        function u(m) {
            return 2 * m
        }
        function h(m) {
            return Ve(m, l, d)
        }
        function A(m) {
            return 1 - Math.pow(1 - m, 3)
        }
        function w() {
            return i ? t.track.velocity() : 0
        }
        function v() {
            $();
            var m = t.options.mode === "free-snap"
              , x = t.track
              , L = w();
            s = ft(L);
            var I = t.track.details
              , D = [];
            if (L || !m) {
                var O = b(L)
                  , X = O.dist
                  , y = O.dur;
                if (y = u(y),
                X *= s,
                m) {
                    var P = x.idxToDist(x.distToIdx(X), !0);
                    P && (X = P)
                }
                D.push({
                    distance: X,
                    duration: y,
                    easing: A
                });
                var q = I.position
                  , g = q + X;
                if (g < o || g > r) {
                    var N = g < o ? o - q : r - q
                      , M = 0
                      , _ = L;
                    if (ft(N) === s) {
                        var E = Math.min(Math.abs(N) / Math.abs(X), 1)
                          , p = function(C) {
                            return 1 - Math.pow(1 - C, 1 / 3)
                        }(E) * y;
                        D[0].earlyExit = p,
                        _ = L * (1 - E)
                    } else
                        D[0].earlyExit = 0,
                        M += N;
                    var k = b(_, 100)
                      , S = k.dist * s;
                    t.options.rubberband && (D.push({
                        distance: S,
                        duration: u(k.dur),
                        easing: A
                    }),
                    D.push({
                        distance: -S + M,
                        duration: 500,
                        easing: A
                    }))
                }
                t.animator.start(D)
            } else
                t.moveToIdx(h(I.abs), !0, {
                    duration: 500,
                    easing: function(C) {
                        return 1 + --C * C * C * C * C
                    }
                })
        }
        function b(m, x) {
            x === void 0 && (x = 1e3);
            var L = 147e-9 + (m = Math.abs(m)) / x;
            return {
                dist: Math.pow(m, 2) / L,
                dur: m / L
            }
        }
        function T() {
            var m = t.track.details;
            m && (o = m.min,
            r = m.max,
            l = m.minIdx,
            d = m.maxIdx)
        }
        function $() {
            t.animator.stop()
        }
        t.on("updated", T),
        t.on("optionsChanged", T),
        t.on("created", T),
        t.on("dragStarted", function() {
            i = !1,
            $(),
            e = n = t.track.details.abs
        }),
        t.on("dragChecked", function() {
            i = !0
        }),
        t.on("dragEnded", function() {
            var m = t.options.mode;
            m === "snap" && function() {
                var x = t.track
                  , L = t.track.details
                  , I = L.position
                  , D = ft(w());
                (I > r || I < o) && (D = 0);
                var O = e + D;
                L.slides[x.absToRel(O)].portion === 0 && (O -= D),
                e !== n && (O = n),
                ft(x.idxToDist(O, !0)) !== D && (O += D),
                O = h(O);
                var X = x.idxToDist(O, !0);
                t.animator.start([{
                    distance: X,
                    duration: 500,
                    easing: function(y) {
                        return 1 + --y * y * y * y * y
                    }
                }])
            }(),
            m !== "free" && m !== "free-snap" || v()
        }),
        t.on("dragged", function() {
            n = t.track.details.abs
        })
    }
    function ts(t) {
        var e, n, i, s, o, r, l, d, u, h, A, w, v, b, T, $, m, x, L = Yn();
        function I(M) {
            if (r && d === M.id) {
                var _ = y(M);
                if (u) {
                    if (!X(M))
                        return O(M);
                    h = _,
                    u = !1,
                    t.emit("dragChecked")
                }
                if ($)
                    return h = _;
                Jt(M);
                var E = function(k) {
                    if (m === -1 / 0 && x === 1 / 0)
                        return k;
                    var S = t.track.details
                      , C = S.length
                      , z = S.position
                      , j = Ve(k, m - z, x - z);
                    if (C === 0)
                        return 0;
                    if (!t.options.rubberband)
                        return j;
                    if (z <= x && z >= m || z < m && n > 0 || z > x && n < 0)
                        return k;
                    var F = (z < m ? z - m : z - x) / C
                      , G = s * C
                      , Q = Math.abs(F * G)
                      , ot = Math.max(0, 1 - Q / o * 2);
                    return ot * ot * k
                }(l(h - _) / s * i);
                n = ft(E);
                var p = t.track.details.position;
                (p > m && p < x || p === m && n > 0 || p === x && n < 0) && te(M),
                A += E,
                !w && Math.abs(A * s) > 5 && (w = !0),
                t.track.add(E),
                h = _,
                t.emit("dragged")
            }
        }
        function D(M) {
            !r && t.track.details && t.track.details.length && (A = 0,
            r = !0,
            w = !1,
            u = !0,
            d = M.id,
            X(M),
            h = y(M),
            t.emit("dragStarted"))
        }
        function O(M) {
            r && d === M.idChanged && (r = !1,
            t.emit("dragEnded"))
        }
        function X(M) {
            var _ = P()
              , E = _ ? M.y : M.x
              , p = _ ? M.x : M.y
              , k = v !== void 0 && b !== void 0 && Math.abs(b - p) <= Math.abs(v - E);
            return v = E,
            b = p,
            k
        }
        function y(M) {
            return P() ? M.y : M.x
        }
        function P() {
            return t.options.vertical
        }
        function q() {
            s = t.size,
            o = P() ? window.innerHeight : window.innerWidth;
            var M = t.track.details;
            M && (m = M.min,
            x = M.max)
        }
        function g(M) {
            w && (te(M),
            Jt(M))
        }
        function N() {
            if (L.purge(),
            t.options.drag && !t.options.disabled) {
                var M;
                M = t.options.dragSpeed || 1,
                l = typeof M == "function" ? M : function(E) {
                    return E * M
                }
                ,
                i = t.options.rtl ? -1 : 1,
                q(),
                e = t.container,
                function() {
                    var E = "data-keen-slider-clickable";
                    pe("[".concat(E, "]:not([").concat(E, "=false])"), e).map(function(p) {
                        L.add(p, "dragstart", te),
                        L.add(p, "mousedown", te),
                        L.add(p, "touchstart", te)
                    })
                }(),
                L.add(e, "dragstart", function(E) {
                    Jt(E)
                }),
                L.add(e, "click", g, {
                    capture: !0
                }),
                L.input(e, "ksDragStart", D),
                L.input(e, "ksDrag", I),
                L.input(e, "ksDragEnd", O),
                L.input(e, "mousedown", D),
                L.input(e, "mousemove", I),
                L.input(e, "mouseleave", O),
                L.input(e, "mouseup", O),
                L.input(e, "touchstart", D, {
                    passive: !0
                }),
                L.input(e, "touchmove", I, {
                    passive: !1
                }),
                L.input(e, "touchend", O),
                L.input(e, "touchcancel", O),
                L.add(window, "wheel", function(E) {
                    r && Jt(E)
                });
                var _ = "data-keen-slider-scrollable";
                pe("[".concat(_, "]:not([").concat(_, "=false])"), t.container).map(function(E) {
                    return function(p) {
                        var k;
                        L.input(p, "touchstart", function(S) {
                            k = y(S),
                            $ = !0,
                            T = !0
                        }, {
                            passive: !0
                        }),
                        L.input(p, "touchmove", function(S) {
                            var C = P()
                              , z = C ? p.scrollHeight - p.clientHeight : p.scrollWidth - p.clientWidth
                              , j = k - y(S)
                              , F = C ? p.scrollTop : p.scrollLeft
                              , G = C && p.style.overflowY === "scroll" || !C && p.style.overflowX === "scroll";
                            if (k = y(S),
                            (j < 0 && F > 0 || j > 0 && F < z) && T && G)
                                return $ = !0;
                            T = !1,
                            Jt(S),
                            $ = !1
                        }),
                        L.input(p, "touchend", function() {
                            $ = !1
                        })
                    }(E)
                })
            }
        }
        t.on("updated", q),
        t.on("optionsChanged", N),
        t.on("created", N),
        t.on("destroyed", L.purge)
    }
    function es(t) {
        var e, n, i = null;
        function s(v, b, T) {
            t.animator.active ? r(v, b, T) : requestAnimationFrame(function() {
                return r(v, b, T)
            })
        }
        function o() {
            s(!1, !1, n)
        }
        function r(v, b, T) {
            var $ = 0
              , m = t.size
              , x = t.track.details;
            if (x && e) {
                var L = x.slides;
                e.forEach(function(I, D) {
                    if (v)
                        !i && b && d(I, null, T),
                        u(I, null, T);
                    else {
                        if (!L[D])
                            return;
                        var O = L[D].size * m;
                        !i && b && d(I, O, T),
                        u(I, L[D].distance * m - $, T),
                        $ += O
                    }
                })
            }
        }
        function l(v) {
            return t.options.renderMode === "performance" ? Math.round(v) : v
        }
        function d(v, b, T) {
            var $ = T ? "height" : "width";
            b !== null && (b = l(b) + "px"),
            v.style["min-" + $] = b,
            v.style["max-" + $] = b
        }
        function u(v, b, T) {
            if (b !== null) {
                b = l(b);
                var $ = T ? b : 0;
                b = "translate3d(".concat(T ? 0 : b, "px, ").concat($, "px, 0)")
            }
            v.style.transform = b,
            v.style["-webkit-transform"] = b
        }
        function h() {
            e && (r(!0, !0, n),
            e = null),
            t.on("detailsChanged", o, !0)
        }
        function A() {
            s(!1, !0, n)
        }
        function w() {
            h(),
            n = t.options.vertical,
            t.options.disabled || t.options.renderMode === "custom" || (i = rt(t.options.slides, "perView", null) === "auto",
            t.on("detailsChanged", o),
            (e = t.slides).length && A())
        }
        t.on("created", w),
        t.on("optionsChanged", w),
        t.on("beforeOptionsChanged", function() {
            h()
        }),
        t.on("updated", A),
        t.on("destroyed", h)
    }
    function ns(t, e) {
        return function(n) {
            var i, s, o, r, l, d, u = Yn();
            function h(y) {
                var P;
                qe(n.container, "reverse", (P = n.container,
                window.getComputedStyle(P, null).getPropertyValue("direction") !== "rtl" || y ? null : "")),
                qe(n.container, "v", n.options.vertical && !y ? "" : null),
                qe(n.container, "disabled", n.options.disabled && !y ? "" : null)
            }
            function A() {
                w() && m()
            }
            function w() {
                var y = null;
                if (r.forEach(function(q) {
                    q.matches && (y = q.__media)
                }),
                y === i)
                    return !1;
                i || n.emit("beforeOptionsChanged"),
                i = y;
                var P = y ? o.breakpoints[y] : o;
                return n.options = Xt(Xt({}, o), P),
                h(),
                O(),
                X(),
                L(),
                !0
            }
            function v(y) {
                var P = Wn(y);
                return (n.options.vertical ? P.height : P.width) / n.size || 1
            }
            function b() {
                return n.options.trackConfig.length
            }
            function T(y) {
                for (var P in i = !1,
                o = Xt(Xt({}, e), y),
                u.purge(),
                s = n.size,
                r = [],
                o.breakpoints || []) {
                    var q = window.matchMedia(P);
                    q.__media = P,
                    r.push(q),
                    u.add(q, "change", A)
                }
                u.add(window, "orientationchange", D),
                u.add(window, "resize", I),
                w()
            }
            function $(y) {
                n.animator.stop();
                var P = n.track.details;
                n.track.init(y ?? (P ? P.abs : 0))
            }
            function m(y) {
                $(y),
                n.emit("optionsChanged")
            }
            function x(y, P) {
                if (y)
                    return T(y),
                    void m(P);
                O(),
                X();
                var q = b();
                L(),
                b() !== q ? m(P) : $(P),
                n.emit("updated")
            }
            function L() {
                var y = n.options.slides;
                if (typeof y == "function")
                    return n.options.trackConfig = y(n.size, n.slides);
                for (var P = n.slides, q = P.length, g = typeof y == "number" ? y : rt(y, "number", q, !0), N = [], M = rt(y, "perView", 1, !0), _ = rt(y, "spacing", 0, !0) / n.size || 0, E = M === "auto" ? _ : _ / M, p = rt(y, "origin", "auto"), k = 0, S = 0; S < g; S++) {
                    var C = M === "auto" ? v(P[S]) : 1 / M - _ + E
                      , z = p === "center" ? .5 - C / 2 : p === "auto" ? 0 : p;
                    N.push({
                        origin: z,
                        size: C,
                        spacing: _
                    }),
                    k += C
                }
                if (k += _ * (g - 1),
                p === "auto" && !n.options.loop && M !== 1) {
                    var j = 0;
                    N.map(function(F) {
                        var G = k - j;
                        return j += F.size + _,
                        G >= 1 || (F.origin = 1 - G - (k > 1 ? 0 : 1 - k)),
                        F
                    })
                }
                n.options.trackConfig = N
            }
            function I() {
                O();
                var y = n.size;
                n.options.disabled || y === s || (s = y,
                x())
            }
            function D() {
                I(),
                setTimeout(I, 500),
                setTimeout(I, 2e3)
            }
            function O() {
                var y = Wn(n.container);
                n.size = (n.options.vertical ? y.height : y.width) || 1
            }
            function X() {
                n.slides = pe(n.options.selector, n.container)
            }
            n.container = (d = pe(t, l || document)).length ? d[0] : null,
            n.destroy = function() {
                u.purge(),
                n.emit("destroyed"),
                h(!0)
            }
            ,
            n.prev = function() {
                n.moveToIdx(n.track.details.abs - 1, !0)
            }
            ,
            n.next = function() {
                n.moveToIdx(n.track.details.abs + 1, !0)
            }
            ,
            n.update = x,
            T(n.options)
        }
    }
    var Hn = function(t, e, n) {
        try {
            return function(i, s) {
                var o, r = {};
                return o = {
                    emit: function(l) {
                        r[l] && r[l].forEach(function(u) {
                            u(o)
                        });
                        var d = o.options && o.options[l];
                        d && d(o)
                    },
                    moveToIdx: function(l, d, u) {
                        var h = o.track.idxToDist(l, d);
                        if (h) {
                            var A = o.options.defaultAnimation;
                            o.animator.start([{
                                distance: h,
                                duration: rt(u || A, "duration", 500),
                                easing: rt(u || A, "easing", function(w) {
                                    return 1 + --w * w * w * w * w
                                })
                            }])
                        }
                    },
                    on: function(l, d, u) {
                        u === void 0 && (u = !1),
                        r[l] || (r[l] = []);
                        var h = r[l].indexOf(d);
                        h > -1 ? u && delete r[l][h] : u || r[l].push(d)
                    },
                    options: i
                },
                function() {
                    if (o.track = Zi(o),
                    o.animator = Qi(o),
                    s)
                        for (var l = 0, d = s; l < d.length; l++)
                            (0,
                            d[l])(o);
                    o.track.init(o.options.initial || 0),
                    o.emit("created")
                }(),
                o
            }(e, zn([ns(t, {
                drag: !0,
                mode: "snap",
                renderMode: "precision",
                rubberband: !0,
                selector: ".keen-slider__slide"
            }), es, ts, Ji], n || [], !0))
        } catch (i) {
            console.error(i)
        }
    };
    function is(t) {
        let n = t.container.parentNode
          , i = t.track.details.slides;
        t.slides.forEach((s,o)=>{
            let r = Math.round(i[o].portion)
              , l = s.querySelector("video")
              , d = s.querySelector(".media-image-wrapper:not(.project-loader) img");
            if (s.classList.toggle("is-active", r),
            r) {
                let u = i.length;
                U.$sliderCounter.textContent = `${o + 1}/${u}`
            }
            l && (r ? (_t(l),
            n.classList.contains("is-active") && U.videoPlayer.attachVideo(l),
            Ft(l)) : (It(l),
            $t(l))),
            r && d && (Ft(d),
            n.classList.contains("is-active") && U.videoPlayer.detachVideo())
        }
        )
    }
    var Pt = {
        loop: !0,
        selector: ".slide",
        dragSpeed: 5,
        drag: !1,
        defaultAnimation: {
            duration: 0
        },
        breakpoints: {
            "(hover: none), (pointer: coarse)": {
                drag: !1
            }
        },
        detailsChanged: is,
        renderMode: "custom"
    };
    function Un(t) {
        Pt.drag = !1,
        Pt.breakpoints["(hover: none), (pointer: coarse)"] = {
            drag: !1
        },
        t.update(Pt)
    }
    function Kn(t) {
        Pt.drag = !1,
        Pt.breakpoints["(hover: none), (pointer: coarse)"] = {
            drag: !0
        },
        t.update(Pt)
    }
    function ss(t) {
        if (t.classList.contains("is-init"))
            return;
        t.classList.add("is-init");
        let e = new Hn(t,Pt);
        U.sliders.set(t, e)
    }
    function Gn(t) {
        t.querySelectorAll(".slider:not(.is-init)").forEach(ss)
    }
    var os = /[^\d,]/g;
    function Qn() {
        let e = nt.get(document.documentElement, "--color-background").replace(os, "").split(",")
          , n = +e[0] / 255
          , i = +e[1] / 255
          , s = +e[2] / 255
          , o = .2126 * n + .7152 * i + .0722 * s
          , r = o >= .5 ? "black" : "white";
        nt.set(document.documentElement, {
            "--color-foreground": r
        }),
        document.body.classList.toggle("is-dark", o >= .5)
    }
    function Zn() {
        let t = document.querySelector("#color-picker");
        if (!t || t && t.classList.contains("is-init"))
            return;
        let e = document.querySelector("#color-picker-input"), n = At(document.documentElement, {
            "--color-background": [{
                to: "#790DCB"
            }, {
                to: "#344DBA"
            }, {
                to: "#7FA137"
            }, {
                to: "#E6C40E"
            }, {
                to: "#DD5754"
            }, {
                to: "#FFFFFF"
            }],
            easing: "linear",
            autoplay: !1,
            onRender: Qn
        }), i;
        function s() {
            i && clearTimeout(i),
            i = setTimeout(()=>{
                let h = +e.value;
                n.progress = h / 1e3,
                window.history.replaceState(null, null, `?c=${h}`)
            }
            , 12)
        }
        function o() {
            t.classList.add("is-open")
        }
        function r() {
            t.classList.remove("is-open")
        }
        function l(h) {
            h.target.closest("#color-picker") || (r(),
            document.removeEventListener("click", l))
        }
        function d(h) {
            let {top: A, bottom: w} = e.getBoundingClientRect()
              , v = (h.pageY + A) / (w - A)
              , b = +e.getAttribute("min") || 0
              , T = +e.getAttribute("max") || 1
              , $ = T - b
              , m = b + v * $;
            e.value = T - m,
            s()
        }
        e.addEventListener("input", s, !1),
        t.addEventListener("touchstart", ()=>{
            o(),
            document.addEventListener("click", l)
        }
        , !1),
        e.addEventListener("touchstart", d, !1),
        e.addEventListener("touchmove", d, !1),
        t.addEventListener("mouseenter", o, !1),
        t.addEventListener("mouseleave", r, !1);
        let u = window.location.search;
        if (u) {
            let A = new URLSearchParams(u).get("c");
            n.progress = A / 1e3,
            e.value = A
        } else
            n.progress = 1,
            e.value = 1e3;
        Qn(),
        t.classList.add("is-init")
    }
    function ze() {
        let t = document.querySelector("#color-picker");
        !t || t.classList.add("is-active")
    }
    function Jn() {
        let t = document.querySelector("#color-picker");
        !t || t.classList.remove("is-active")
    }
    function rs(t, e, n) {
        let i = n && n.state;
        i && (typeof i == "object" && e.copy(i, e),
        t.state = ()=>e.copy(e, {}))
    }
    function Be(t, e) {
        let n = new ti(t)
          , i = ()=>n.next();
        return i.double = ()=>i() + (i() * 2097152 | 0) * 11102230246251565e-32,
        i.int32 = ()=>n.next() * 4294967296 | 0,
        i.quick = i,
        rs(i, n, e),
        i
    }
    var ti = class {
        constructor(e) {
            e == null && (e = +new Date);
            let n = 4022871197;
            this.c = 1,
            this.s0 = i(" "),
            this.s1 = i(" "),
            this.s2 = i(" "),
            this.s0 -= i(e),
            this.s0 < 0 && (this.s0 += 1),
            this.s1 -= i(e),
            this.s1 < 0 && (this.s1 += 1),
            this.s2 -= i(e),
            this.s2 < 0 && (this.s2 += 1);
            function i(s) {
                s = String(s);
                for (let o = 0; o < s.length; o++) {
                    n += s.charCodeAt(o);
                    let r = .02519603282416938 * n;
                    n = r >>> 0,
                    r -= n,
                    r *= n,
                    n = r >>> 0,
                    r -= n,
                    n += r * 4294967296
                }
                return (n >>> 0) * 23283064365386963e-26
            }
        }
        next() {
            let {c: e, s0: n, s1: i, s2: s} = this
              , o = 2091639 * n + e * 23283064365386963e-26;
            return this.s0 = i,
            this.s1 = s,
            this.s2 = o - (this.c = o | 0)
        }
        copy(e, n) {
            return n.c = e.c,
            n.s0 = e.s0,
            n.s1 = e.s1,
            n.s2 = e.s2,
            n
        }
    }
    ;
    var ei = .3
      , ni = .04
      , ii = .11;
    window.addEventListener("touchmove", function() {});
    var me = class {
        constructor({source: e=document, update: n, multiplier: i=1, friction: s=.92, initialValues: o, boundX: r, boundY: l, bounce: d=!0}) {
            var u, h, A, w, v, b, T, $, m, x, L, I = 0, D = 0, O = ei * i, X = !1, y = !1, P = !1, q = !1, g = [];
            (function() {
                if (e = typeof e == "string" ? document.querySelector(e) : e,
                !e)
                    throw new Error("IMPETUS: source not found.");
                if (!n)
                    throw new Error("IMPETUS: update function not defined.");
                o && (o[0] && (I = o[0]),
                o[1] && (D = o[1]),
                _()),
                r && (u = r[0],
                h = r[1]),
                l && (A = l[0],
                w = l[1]),
                e.addEventListener("touchstart", p),
                e.addEventListener("mousedown", p)
            }
            )(),
            this.destroy = function() {
                return e.removeEventListener("touchstart", p),
                e.removeEventListener("mousedown", p),
                N(),
                null
            }
            ,
            this.pause = function() {
                N(),
                y = !1,
                P = !0
            }
            ,
            this.resume = function() {
                P = !1
            }
            ,
            this.setValues = function(a, c) {
                typeof a == "number" && (I = a),
                typeof c == "number" && (D = c)
            }
            ,
            this.setMultiplier = function(a) {
                i = a,
                O = ei * i
            }
            ,
            this.setBoundX = function(a) {
                u = a[0],
                h = a[1]
            }
            ,
            this.setBoundY = function(a) {
                A = a[0],
                w = a[1]
            }
            ;
            function N() {
                document.removeEventListener("touchmove", k, ee() ? {
                    passive: !1
                } : !1),
                document.removeEventListener("touchend", S),
                document.removeEventListener("touchcancel", C),
                document.removeEventListener("mousemove", k, ee() ? {
                    passive: !1
                } : !1),
                document.removeEventListener("mouseup", S)
            }
            function M() {
                N(),
                document.addEventListener("touchmove", k, ee() ? {
                    passive: !1
                } : !1),
                document.addEventListener("touchend", S),
                document.addEventListener("touchcancel", C),
                document.addEventListener("mousemove", k, ee() ? {
                    passive: !1
                } : !1),
                document.addEventListener("mouseup", S)
            }
            function _() {
                n.call(e, I, D)
            }
            function E(a) {
                if (a.type === "touchmove" || a.type === "touchstart" || a.type === "touchend") {
                    var c = a.targetTouches[0] || a.changedTouches[0];
                    return {
                        x: c.clientX,
                        y: c.clientY,
                        id: c.identifier
                    }
                } else
                    return {
                        x: a.clientX,
                        y: a.clientY,
                        id: null
                    }
            }
            function p(a) {
                var c = E(a);
                !y && !P && (y = !0,
                q = !1,
                m = c.id,
                v = T = c.x,
                b = $ = c.y,
                g = [],
                z(v, b),
                M())
            }
            function k(a) {
                a.preventDefault();
                var c = E(a);
                y && c.id === m && (T = c.x,
                $ = c.y,
                z(v, b),
                G())
            }
            function S(a) {
                var c = E(a);
                y && c.id === m && C()
            }
            function C() {
                y = !1,
                z(v, b),
                ot(),
                N()
            }
            function z(a, c) {
                for (var f = Date.now(); g.length > 0 && !(f - g[0].time <= 100); )
                    g.shift();
                g.push({
                    x: a,
                    y: c,
                    time: f
                })
            }
            function j() {
                var a = T - v
                  , c = $ - b;
                if (I += a * i,
                D += c * i,
                d) {
                    let f = Q();
                    f.x !== 0 && (I -= a * F(f.x) * i),
                    f.y !== 0 && (D -= c * F(f.y) * i)
                } else
                    Q(!0);
                _(),
                v = T,
                b = $,
                X = !1
            }
            function F(a) {
                return 5e-6 * Math.pow(a, 2) + 1e-4 * a + .55
            }
            function G() {
                X || Fe(j),
                X = !0
            }
            function Q(a) {
                var c = 0
                  , f = 0;
                return u !== void 0 && I < u ? c = u - I : h !== void 0 && I > h && (c = h - I),
                A !== void 0 && D < A ? f = A - D : w !== void 0 && D > w && (f = w - D),
                a && (c !== 0 && (I = c > 0 ? u : h),
                f !== 0 && (D = f > 0 ? A : w)),
                {
                    x: c,
                    y: f,
                    inBounds: c === 0 && f === 0
                }
            }
            function ot() {
                var a = g[0]
                  , c = g[g.length - 1]
                  , f = c.x - a.x
                  , B = c.y - a.y
                  , H = c.time - a.time
                  , Y = H / 15 / i;
                x = f / Y || 0,
                L = B / Y || 0;
                var Z = Q();
                (Math.abs(x) > 1 || Math.abs(L) > 1 || !Z.inBounds) && (q = !0,
                Fe(W))
            }
            function W() {
                if (!!q) {
                    x *= s,
                    L *= s,
                    I += x,
                    D += L;
                    var a = Q();
                    if (Math.abs(x) > O || Math.abs(L) > O || !a.inBounds) {
                        if (d) {
                            let c = 2.5;
                            if (a.x !== 0)
                                if (a.x * x <= 0)
                                    x += a.x * ni;
                                else {
                                    let f = a.x > 0 ? c : -c;
                                    x = (a.x + f) * ii
                                }
                            if (a.y !== 0)
                                if (a.y * L <= 0)
                                    L += a.y * ni;
                                else {
                                    let f = a.y > 0 ? c : -c;
                                    L = (a.y + f) * ii
                                }
                        } else
                            a.x !== 0 && (a.x > 0 ? I = u : I = h,
                            x = 0),
                            a.y !== 0 && (a.y > 0 ? D = A : D = w,
                            L = 0);
                        _(),
                        Fe(W)
                    } else
                        q = !1
                }
            }
        }
    }
      , Fe = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
    }();
    function ee() {
        let t = !1;
        try {
            var e = Object.defineProperty({}, "passive", {
                get: function() {
                    t = !0
                }
            });
            window.addEventListener("test", null, e)
        } catch {}
        return ee = ()=>t,
        t
    }
    function si(t=450, e=750) {
        return At(document.body, {
            opacity: [0, 1],
            delay: t,
            duration: e,
            onBegin: ()=>{
                document.body.classList.add("is-ready")
            }
            ,
            onComplete: nt.cleanupInlineStyles
        })
    }
    function oi() {
        let t = document.querySelector("#project-title")
          , e = document.querySelector("#project-info")
          , n = document.querySelectorAll(".project")
          , i = document.querySelector("#projects-animation")
          , s = document.querySelectorAll(".slider-button")
          , o = !1
          , r = fe({
            root: i,
            rootMargin: "20%",
            onIntersect: Re
        })
          , l = fe({
            root: i,
            onIntersect: a=>{
                a.forEach(c=>{
                    let f = c.target
                      , B = f.parentNode.parentNode;
                    B.parentNode.parentNode.classList.contains("is-active") || B.classList.contains("is-active") && (c.isIntersecting ? _t(f) : Rn(f))
                }
                )
            }
        });
        n.forEach(a=>{
            $projectMedia = a.querySelectorAll(".media"),
            $projectMedia.forEach(c=>{
                c.classList.contains("media-video") && he(l, c),
                he(r, c)
            }
            )
        }
        );
        let d = fe({
            onIntersect: Re
        });
        document.querySelectorAll("#index .media").forEach(a=>{
            he(d, a)
        }
        );
        let h = {
            tl: null
        }
          , A = {
            s: .5,
            m: .75,
            l: .9
        }
          , w = {
            width: null,
            height: null
        }
          , v = {
            prevX: 0,
            prevY: 0,
            y: 0,
            wheelSpeed: 1,
            touchSpeed: 3,
            autoSpeed: .05,
            maxAutoSpeed: .05
        };
        function b(a, c, f) {
            let B = a.dataset.name
              , H = Be(B)
              , Y = c % 2 ? 100 : -100
              , Z = Y * -1
              , R = (H() + H() - H() - .5) * 150
              , V = R * -1
              , mt = nt.clamp(2e3 + R * 50, 3e3, 4e3)
              , ht = f ? 0 : mt * .8;
            return {
                params: {
                    translateX: [`${Y}vw`, Z],
                    translateY: [`${R}vh`, V],
                    easing: "linear",
                    duration: mt
                },
                interval: `-=${ht}`
            }
        }
        function T() {
            if (!n)
                return;
            let a = zt({
                easing: "out(2)",
                autoplay: !1
            })
              , c = nt.clamp(Math.ceil(n.length * .25), 0, 6);
            return n.forEach((f,B)=>{
                let {params: H, interval: Y} = b(f, B, !B);
                nt.set(f, {
                    translateX: "0vw",
                    translateY: "0vh",
                    scale: A[f.dataset.size]
                }),
                a.add(f, H, Y),
                a.addLabel(f.dataset.name, "<<+=" + H.duration * .5),
                B >= c && (a.labels.loopStart || a.addLabel("loopStart", "<<"))
            }
            ),
            n.forEach((f,B)=>{
                if (B >= c + 1)
                    return;
                let {params: H, interval: Y} = b(f, B);
                a.add(f, H, Y),
                B < c - 1 && a.addLabel(f.dataset.name, "<<+=" + H.duration * .5),
                B >= c && !a.labels.loopEnd && a.addLabel("loopEnd", "<<")
            }
            ),
            a
        }
        function $() {
            Gn(document.body),
            h.tl = T(document)
        }
        function m(a) {
            let {loopStart: c, loopEnd: f} = h.tl.labels;
            v.y += a,
            v.y < c && (v.y = f - 10),
            v.y > f && (v.y = c + (v.y - f))
        }
        function x(a, c=0, f) {
            h.tl.seek(h.tl.duration);
            let B = h.tl.labels[a]
              , H = v.y
              , Y = B - H
              , Z = Y
              , R = {
                from: H
            }
              , V = c;
            V < 0 && (Z = H > B ? Y + 500 : Y - 500,
            V *= -1,
            R = {
                to: B
            }),
            m(Z),
            At(v, {
                y: R,
                duration: V,
                easing: "inOut(2.5)",
                onComplete: f && (()=>f())
            })
        }
        function L(a) {
            m(a._frameDuration * v.autoSpeed),
            h.tl.seek(v.y)
        }
        function I(a) {
            a.preventDefault(),
            m(a.deltaY * v.wheelSpeed)
        }
        function D(a, c) {
            let f = a - v.prevX
              , B = c - v.prevY;
            v.prevX = a,
            v.prevY = c,
            m(f * v.touchSpeed * -1),
            m(B * v.touchSpeed * -1)
        }
        let O = Bt({
            onTick: L
        });
        U.touchInput = new me({
            source: i,
            update: D
        }),
        U.touchInput.pause();
        function X() {
            window.addEventListener("wheel", I, {
                passive: !1
            }),
            U.touchInput.resume()
        }
        function y() {
            window.removeEventListener("wheel", I),
            U.touchInput.pause()
        }
        function P(a) {
            let c = a.dataset.title
              , f = window.location.search
              , B = a.href;
            f !== "" && (B += f),
            document.title = c,
            history.pushState({
                id: c
            }, "", B)
        }
        function q(a) {
            let c = document.querySelector(`.project[data-name="${a}"]`);
            if (c.classList.contains("is-active"))
                return;
            c.classList.add("is-active"),
            t.textContent = a,
            e.innerHTML = c.dataset.info;
            let f = document.querySelectorAll(".project:not(.is-active) video")
              , B = c.querySelectorAll(".slide:not(.is-active) video");
            c.querySelectorAll(".media:not(.is-loaded)").forEach(Y=>{
                je(Y)
            }
            ),
            U.activeSlider = U.sliders.get(c.querySelector(".slider")),
            U.activeSlider.emit("detailsChanged"),
            Kn(U.activeSlider),
            U.activeSlider.slides.length > 1 ? s.forEach(Y=>Y.style.display = "block") : s.forEach(Y=>Y.style.display = "none"),
            zt().add(v, {
                autoSpeed: 0,
                duration: 350,
                easing: "out(3)",
                onBegin: ()=>{
                    c.dataset.scale = nt.get(c, "scale")
                }
                ,
                onComplete: ()=>{
                    O.pause(),
                    c.dataset.x = nt.get(c, "translateX"),
                    c.dataset.y = nt.get(c, "translateY")
                }
            }).add(c, {
                zIndex: 3,
                duration: 350,
                modifier: nt.round,
                easing: "linear"
            }, 0).addTicker({
                duration: 500,
                onComplete: ()=>{
                    document.body.classList.add("show-project-ui");
                    let Y = c.querySelector(".slide.is-active video");
                    Y && U.videoPlayer.attachVideo(Y)
                }
            }, 0).add(c, {
                translateX: 0,
                translateY: 0,
                scale: 1,
                composition: 0,
                duration: 750,
                easing: "inOut(3)",
                onComplete: ()=>{
                    document.body.classList.add("has-open-project")
                }
            }, 0).add(".project:not(.is-active) .slider", {
                translateX: Y=>parseFloat(nt.get(Y.parentNode, "translateX")) < 0 ? "-150vw" : "150vw",
                translateY: Y=>parseFloat(nt.get(Y.parentNode, "translateY")) < 0 ? "-150vh" : "150vh",
                composition: 0,
                duration: 850,
                easing: "inOut(3)"
            }, 0),
            Jn(),
            y()
        }
        function g(a) {
            U.videoPlayer.$el.removeAttribute("style"),
            document.body.classList.remove("has-open-project"),
            document.body.classList.remove("show-project-ui"),
            Un(U.activeSlider),
            X(),
            U.activeSlider = null,
            zt().add(a, {
                translateX: a.dataset.x,
                translateY: a.dataset.y,
                scale: a.dataset.scale,
                composition: 0,
                duration: 750,
                easing: "inOut(3)"
            }, 0).add(".project:not(.is-active) .slider", {
                translateX: 0,
                translateY: 0,
                composition: 0,
                duration: 750,
                easing: "inOut(3)"
            }, 0).add(v, {
                autoSpeed: v.maxAutoSpeed,
                duration: 750,
                easing: "out(3)",
                onBegin: ()=>{
                    O.play()
                }
            }).add(a, {
                zIndex: 1,
                duration: 350,
                modifier: nt.round,
                easing: "linear"
            }, 500),
            a.classList.remove("is-active"),
            ze(),
            n.forEach(c=>{
                let f = c.querySelector(".slide.is-active video");
                f && (It(f),
                _t(f))
            }
            )
        }
        function N() {
            document.querySelectorAll(".project.is-active").forEach(g),
            E("home-header"),
            o && Bt({
                duration: 250,
                onComplete: ()=>{
                    _("index"),
                    o = !1
                }
            })
        }
        function M() {
            let a = 14;
            document.querySelectorAll(".index-link").forEach(f=>{
                let B = f.querySelector(".index-link-number")
                  , H = f.querySelector(".index-link-separator")
                  , Y = f.querySelector(".index-link-title")
                  , Z = f.offsetWidth
                  , R = B.offsetWidth
                  , V = H.offsetWidth
                  , mt = Y.offsetWidth
                  , ht = Z - R
                  , bt = mt / ht
                  , gt = Math.round(Z / window.innerWidth * 100);
                if (bt < .8) {
                    let et = Be(Y.textContent)
                      , Yt = (1 - (bt + .2)) * et() * .75;
                    Y.style.paddingLeft = `${Yt * gt}vw`;
                    let ne = Y.offsetWidth
                      , ri = (Z - (ne + R + V)) / Z;
                    f.style.paddingLeft = `${ri * et() * .9 * gt}vw`
                }
                let K = f.querySelector("video");
                K && (It(K),
                _t(K))
            }
            )
        }
        function _(a) {
            let c = document.getElementById(a);
            if (!!c)
                if (c.classList.add("is-active"),
                a === "home-header") {
                    let f = document.querySelector('#mobile-nav button[data-open="home-header"]');
                    if (f) {
                        let B = document.querySelector('#mobile-nav button[data-open="index"]');
                        f.removeAttribute("data-open"),
                        f.dataset.close = "home-header",
                        f.textContent = "Close",
                        B.style.display = "none"
                    }
                } else
                    y(),
                    a === "index" && (window.location.hash = "index")
        }
        function E(a) {
            let c = document.getElementById(a);
            if (!!c)
                if (c.classList.remove("is-active"),
                a === "home-header") {
                    let f = document.querySelector('#mobile-nav button[data-close="home-header"]');
                    if (f) {
                        let B = document.querySelector('#mobile-nav button[data-open="index"]');
                        f.removeAttribute("data-close"),
                        f.dataset.open = "home-header",
                        f.textContent = "Info",
                        B.removeAttribute("style")
                    }
                } else
                    X(),
                    a === "index" && window.history.replaceState(window.history.state, document.title, location.pathname + location.search)
        }
        function p(a) {
            let c = document.querySelector(".project.is-active");
            a.key === "Escape" && (c && P(document.querySelector("#site-title")),
            E("index"),
            N()),
            U.activeSlider ? (a.key === "ArrowLeft" && U.activeSlider.prev(),
            a.key === "ArrowRight" && U.activeSlider.next(),
            a.key === "Tab" && (a.preventDefault(),
            c.focus(),
            U.activeSlider.next())) : a.key === "Tab" && (a.preventDefault(),
            document.querySelector("#home-header").focus())
        }
        function k() {
            let a = window.innerWidth;
            if (a === w.width)
                return;
            w.width = a,
            w.height = window.innerHeight,
            document.querySelectorAll(".project .media").forEach(Ft)
        }
        function S() {
            let a = document.querySelector(".project.is-active");
            if (a) {
                P(a),
                a.classList.remove("is-active");
                let f = a.dataset.name;
                x(f, -100, ()=>{
                    si(850, 350),
                    q(f)
                }
                )
            } else
                si();
            window.location.hash === "#index" && _("index"),
            document.querySelectorAll(".project .media").forEach(Ft),
            U.videoPlayer.detachVideo()
        }
        function C(a) {
            let c = a.innerText
              , f = atob(a.dataset.email);
            navigator.clipboard.writeText(f),
            a.innerText = "Link copied",
            a.dataset.copied = !0,
            setTimeout(()=>{
                a.innerText = c,
                a.dataset.copied = !1,
                a.blur()
            }
            , 2e3)
        }
        function z(a) {
            let c = a.dataset.filter.split(":")
              , f = document.querySelector(c[0]);
            f && (f.dataset.show = c[1])
        }
        function j(a) {
            document.querySelectorAll(`[data-toggle="${a.dataset.toggle}"]`).forEach(f=>f.classList.remove("is-active")),
            a.classList.add("is-active")
        }
        function F(a) {
            if (a.metaKey)
                return;
            let c = a.target
              , f = c.closest(".ajax-link")
              , B = c.closest(".index-link")
              , H = c.closest(".project:not(.is-active)")
              , Y = c.closest(".close-all-projects")
              , Z = c.closest("[data-open]")
              , R = c.closest("[data-close]")
              , V = c.closest("button[data-email]")
              , mt = c.closest("[data-toggle]")
              , ht = c.closest("[data-filter]")
              , bt = c.closest("#mobile-toggle-index-media")
              , gt = c.closest(".slider-button-prev")
              , K = c.closest(".slider-button-next");
            if (f && (a.preventDefault(),
            P(f)),
            H && (a.preventDefault(),
            N(),
            q(H.dataset.name)),
            B) {
                a.preventDefault(),
                N(),
                B.classList.add("is-visited");
                let et = B.dataset.projectName
                  , Yt = document.querySelector(`.project[data-name="${et}"] .slider`);
                U.activeSlider = U.sliders.get(Yt),
                U.activeSlider.moveToIdx(+B.dataset.slideIndex),
                o = !0,
                x(et, -1e3, ()=>{
                    q(et)
                }
                )
            }
            Y && N(),
            Z && _(Z.dataset.open),
            R && E(R.dataset.close),
            V && C(V),
            mt && j(mt),
            ht && z(ht),
            bt && ($indexPage = document.querySelector("#index"),
            $indexPage.classList.toggle("show-media")),
            U.activeSlider && (gt && U.activeSlider.prev(),
            K && U.activeSlider.next())
        }
        function G(a) {
            a.classList.toggle("is-active");
            let c = a.querySelector("video");
            c && (a.classList.contains("is-active") ? _t(c) : $t(c))
        }
        let Q;
        function ot(a) {
            if (U.isTouch)
                return;
            let f = a.target.closest(".index-link");
            f && f !== Q && G(f),
            Q = f
        }
        function W(a) {
            a.target.closest("video") && U.videoPlayer.$video && U.videoPlayer.$el.classList.toggle("show-player")
        }
        document.addEventListener("click", F),
        document.addEventListener("mousemove", ot),
        document.addEventListener("keyup", p),
        document.addEventListener("touchstart", W),
        window.addEventListener("resize", k),
        window.onpopstate = function(a) {
            let {state: c} = a;
            window.location.hash === "#index" ? Bt({
                duration: 250,
                onComplete: ()=>{
                    _("index")
                }
            }) : E("index"),
            c && document.querySelector(`.project[data-name="${c.id}"]`) ? x(c.id, 500, ()=>{
                q(c.id)
            }
            ) : N()
        }
        ,
        $(),
        ze(),
        X(),
        M(),
        k(),
        S()
    }
    function as() {
        let t = document.body.dataset.template;
        Zn(),
        (t === "home" || t === "project") && oi(),
        Nn()
    }
    window.onload = as;
    console.log("\xA9 Design www.dvtk.us");
    console.log("\xA9 Code www.juliangarnier.com");
}
)();
