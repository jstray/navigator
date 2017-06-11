(function(b, a, d, r) {
    var j, u, n, I, f = 10,
        N = "hidden",
        s = " while executing ",
        z = "function",
        D = "none",
        x = "",
        h = null,
        l = !0,
        G = 0.5,
        q = !1;
    b.Seadragon || (b.Seadragon = {});
    var v = b.Seadragon,
        e = v.Config;
    e || (e = v.Config = {
        debugMode: q,
        animationTime: 1.5,
        blendTime: G,
        alwaysBlend: q,
        autoHideControls: l,
        constrainDuringPan: l,
        immediateRender: q,
        logarithmicZoom: l,
        wrapHorizontal: q,
        wrapVertical: q,
        wrapOverlays: q,
        transformOverlays: q,
        minZoomDimension: h,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
        visibilityRatio: 0.8,
        springStiffness: 5,
        imageLoaderLimit: 2,
        clickTimeThreshold: 200,
        clickDistThreshold: 5,
        zoomPerClick: 2,
        zoomPerScroll: d.pow(2, 1 / 3),
        zoomPerSecond: 2,
        proxyUrl: h,
        imagePath: "img/"
    });
    var k = v.Strings;
    k || (k = v.Strings = {
            Errors: {
                Failure: "Sorry, but Seadragon Ajax can't run on your browser!\nPlease try using IE 8 or Firefox 3.\n",
                Dzc: "Sorry, we don't support Deep Zoom Collections!",
                Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
                Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
                Empty: "You asked us to open nothing, so we did just that.",
                ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
                Security: "It looks like a security restriction stopped us from loading this Deep Zoom Image.",
                Status: "This space unintentionally left blank ({0} {1}).",
                Unknown: "Whoops, something inexplicably went wrong. Sorry!"
            },
            Messages: {
                Loading: "Loading..."
            },
            Tooltips: {
                FullPage: "Toggle full page",
                Home: "Go home",
                ZoomIn: "Zoom in (you can also use your mouse's scroll wheel)",
                ZoomOut: "Zoom out (you can also use your mouse's scroll wheel)"
            }
        }, k.getString =
        function(g) {
            for (var a = g.split("."), c = k, J = 0; J < a.length; J++) c = c[a[J]] || {};
            "string" != typeof c && (c = x);
            var b = arguments;
            return c.replace(/\{\d+\}/g, function(g) {
                g = parseInt(g.match(/\d+/)) + 1;
                return g < b.length ? b[g] : x
            })
        }, k.setString = function(g, a) {
            for (var c = g.split("."), b = k, e = 0; e < c.length - 1; e++) b[c[e]] || (b[c[e]] = {}), b = b[c[e]];
            b[c[e]] = a
        });
    var w = function() {
            this.log = function(g, a) {
                var c = b.console || {},
                    J = e.debugMode;
                J && c.log ? c.log(g) : J && a && alert(g)
            };
            this.error = function(g, a) {
                var c = b.console || {},
                    J = e.debugMode;
                J && c.error ?
                    c.error(g) : J && alert(g);
                if (J) throw a || Error(g);
            };
            this.fail = function(g) {
                alert(k.getString("Errors.Failure"));
                throw Error(g);
            }
        },
        w = v.Debug = new w,
        oa = v.Profiler = function() {
            var g = this,
                a = q,
                c = 0,
                b = h,
                e = h,
                d = Infinity,
                f = 0,
                k = 0,
                m = Infinity,
                t = 0,
                j = 0;
            this.getAvgUpdateTime = function() {
                return f
            };
            this.getMinUpdateTime = function() {
                return d
            };
            this.getMaxUpdateTime = function() {
                return k
            };
            this.getAvgIdleTime = function() {
                return t
            };
            this.getMinIdleTime = function() {
                return m
            };
            this.getMaxIdleTime = function() {
                return j
            };
            this.isMidUpdate = function() {
                return a
            };
            this.getNumUpdates = function() {
                return c
            };
            this.beginUpdate = function() {
                a && g.endUpdate();
                a = l;
                b = (new Date).getTime();
                if (!(1 > c)) {
                    var Ka = b - e;
                    t = (t * (c - 1) + Ka) / c;
                    Ka < m && (m = Ka);
                    Ka > j && (j = Ka)
                }
            };
            this.endUpdate = function() {
                if (a) {
                    e = (new Date).getTime();
                    a = q;
                    var g = e - b;
                    c++;
                    f = (f * (c - 1) + g) / c;
                    g < d && (d = g);
                    g > k && (k = g)
                }
            };
            this.clearProfile = function() {
                a = q;
                c = 0;
                e = b = h;
                d = Infinity;
                k = f = 0;
                m = Infinity;
                j = t = 0
            }
        },
        m = v.Point;
    if (!m) {
        var m = v.Point = function(g, a) {
                this.x = "number" == typeof g ? g : 0;
                this.y = "number" == typeof a ? a : 0
            },
            E = m.prototype;
        E.plus = function(g) {
            return new m(this.x +
                g.x, this.y + g.y)
        };
        E.minus = function(g) {
            return new m(this.x - g.x, this.y - g.y)
        };
        E.times = function(g) {
            return new m(this.x * g, this.y * g)
        };
        E.divide = function(g) {
            return new m(this.x / g, this.y / g)
        };
        E.negate = function() {
            return new m(-this.x, -this.y)
        };
        E.distanceTo = function(g) {
            return d.sqrt(d.pow(this.x - g.x, 2) + d.pow(this.y - g.y, 2))
        };
        E.apply = function(g) {
            return new m(g(this.x), g(this.y))
        };
        E.equals = function(g) {
            return g instanceof m && this.x === g.x && this.y === g.y
        };
        E.toString = function() {
            return "(" + this.x + "," + this.y + ")"
        }
    }
    var y =
        v.Rect;
    y || (y = v.Rect = function(g, a, c, b) {
            this.x = "number" == typeof g ? g : 0;
            this.y = "number" == typeof a ? a : 0;
            this.width = "number" == typeof c ? c : 0;
            this.height = "number" == typeof b ? b : 0
        }, E = y.prototype, E.getAspectRatio = function() {
            return this.width / this.height
        }, E.getTopLeft = function() {
            return new m(this.x, this.y)
        }, E.getBottomRight = function() {
            return new m(this.x + this.width, this.y + this.height)
        }, E.getCenter = function() {
            return new m(this.x + this.width / 2, this.y + this.height / 2)
        }, E.getSize = function() {
            return new m(this.width, this.height)
        },
        E.equals = function(g) {
            return g instanceof y && this.x === g.x && this.y === g.y && this.width === g.width && this.height === g.height
        }, E.toString = function() {
            return "[" + this.x + "," + this.y + "," + this.width + "x" + this.height + "]"
        });
    var K = v.Spring = function(g) {
            var a = "number" == typeof g ? g : 0,
                c = a,
                b = a,
                h = (new Date).getTime(),
                f = h,
                k = h;
            this.getCurrent = function() {
                return a
            };
            this.getTarget = function() {
                return b
            };
            this.resetTo = function(g) {
                b = g;
                k = h;
                c = b;
                f = k
            };
            this.springTo = function(g) {
                c = a;
                f = h;
                b = g;
                k = f + 1E3 * e.animationTime
            };
            this.shiftBy = function(g) {
                c +=
                    g;
                b += g
            };
            this.update = function() {
                h = (new Date).getTime();
                var g;
                if (h >= k) g = b;
                else {
                    g = c;
                    var m = b - c,
                        l;
                    l = e.springStiffness;
                    l = (1 - d.exp(-((h - f) / (k - f)) * l)) / (1 - d.exp(-l));
                    g += m * l
                }
                a = g
            }
        },
        O = v.Browser = {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5
        },
        c = function() {
            var g = this,
                Ta = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"],
                f = {
                    bmp: q,
                    jpeg: l,
                    jpg: l,
                    png: l,
                    tif: q,
                    wdp: q
                },
                J = O.UNKNOWN,
                k = 0,
                t = q,
                j = {},
                B = navigator.appName,
                y = navigator.appVersion,
                aa = navigator.userAgent;
            if ("Microsoft Internet Explorer" == B && b.attachEvent &&
                b.ActiveXObject) B = aa.indexOf("MSIE"), J = O.IE, k = parseFloat(aa.substring(B + 5, aa.indexOf(";", B))), aa = a.documentMode, "undefined" !== typeof aa && (k = aa);
            else if ("Netscape" == B && b.addEventListener) {
                var n = aa.indexOf("Firefox"),
                    B = aa.indexOf("Safari"),
                    y = aa.indexOf("Chrome");
                0 <= n ? (J = O.FIREFOX, k = parseFloat(aa.substring(n + 8))) : 0 <= B && (n = aa.substring(0, B).lastIndexOf("/"), J = 0 <= y ? O.CHROME : O.SAFARI, k = parseFloat(aa.substring(n + 1, B)))
            } else "Opera" == B && (b.opera && b.attachEvent) && (J = O.OPERA, k = parseFloat(y));
            aa = b.location.search.substring(1).split("&");
            for (B = 0; B < aa.length; B++) y = aa[B], n = y.indexOf("="), 0 < n && (j[y.substring(0, n)] = decodeURIComponent(y.substring(n + 1)));
            t = J == O.IE && 9 > k || J == O.CHROME && 2 > k;
            this.getBrowser = function() {
                return J
            };
            this.getBrowserVersion = function() {
                return k
            };
            this.getElement = function(g) {
                "string" == typeof g && (g = a.getElementById(g));
                return g
            };
            this.getElementPosition = function(c) {
                for (var c = g.getElement(c), b = new m, e = "fixed" == g.getElementStyle(c).position, h = e && c != a.body ? a.body : c.offsetParent; h;) b.x += c.offsetLeft, b.y += c.offsetTop, e && (b =
                    b.plus(g.getPageScroll())), c = h, h = (e = "fixed" == g.getElementStyle(c).position) && c != a.body ? a.body : c.offsetParent;
                return b
            };
            this.getElementSize = function(a) {
                a = g.getElement(a);
                return new m(a.clientWidth, a.clientHeight)
            };
            this.getElementStyle = function(a) {
                a = g.getElement(a);
                if (a.currentStyle) return a.currentStyle;
                if (b.getComputedStyle) return b.getComputedStyle(a, x);
                w.fail("Unknown element style, no known technique.")
            };
            this.getEvent = function(g) {
                return g ? g : b.event
            };
            this.getMousePosition = function(c) {
                var c = g.getEvent(c),
                    b = new m;
                "DOMMouseScroll" == c.type && J == O.FIREFOX && 3 > k ? (b.x = c.screenX, b.y = c.screenY) : "number" == typeof c.pageX ? (b.x = c.pageX, b.y = c.pageY) : "number" == typeof c.clientX ? (b.x = c.clientX + a.body.scrollLeft + a.documentElement.scrollLeft, b.y = c.clientY + a.body.scrollTop + a.documentElement.scrollTop) : w.fail("Unknown event mouse position, no known technique.");
                return b
            };
            this.getMouseScroll = function(a) {
                var a = g.getEvent(a),
                    c = 0;
                "number" == typeof a.wheelDelta ? c = a.wheelDelta : "number" == typeof a.detail ? c = -1 * a.detail : w.fail("Unknown event mouse scroll, no known technique.");
                return c ? c / d.abs(c) : 0
            };
            this.getPageScroll = function() {
                var g = new m,
                    c = a.documentElement || {},
                    e = a.body || {};
                if ("number" == typeof b.pageXOffset) g.x = b.pageXOffset, g.y = b.pageYOffset;
                else if (e.scrollLeft || e.scrollTop) g.x = e.scrollLeft, g.y = e.scrollTop;
                else if (c.scrollLeft || c.scrollTop) g.x = c.scrollLeft, g.y = c.scrollTop;
                return g
            };
            this.getWindowSize = function() {
                var g = new m,
                    c = a.documentElement || {},
                    e = a.body || {};
                "number" == typeof b.innerWidth ? (g.x = b.innerWidth, g.y = b.innerHeight) : c.clientWidth || c.clientHeight ? (g.x = c.clientWidth,
                    g.y = c.clientHeight) : e.clientWidth || e.clientHeight ? (g.x = e.clientWidth, g.y = e.clientHeight) : w.fail("Unknown window size, no known technique.");
                return g
            };
            this.imageFormatSupported = function(g) {
                g = g ? g : x;
                return !!f[g.toLowerCase()]
            };
            this.makeCenteredNode = function(a) {
                var a = c.getElement(a),
                    b = g.makeNeutralElement("div"),
                    e = [];
                e.push('<div style="display:table; height:100%; width:100%;');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('#position:relative; overflow:hidden; text-align:left;">');
                e.push('<div style="#position:absolute; #top:50%; width:100%; ');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('display:table-cell; vertical-align:middle;">');
                e.push('<div style="#position:relative; #top:-50%; width:100%; ');
                e.push("border:none; margin:0px; padding:0px;");
                e.push('text-align:center;"></div></div></div>');
                b.innerHTML = e.join(x);
                for (var e = b = b.firstChild, h = b.getElementsByTagName("div"); 0 < h.length;) e = h[0], h = e.getElementsByTagName("div");
                e.appendChild(a);
                return b
            };
            this.makeNeutralElement = function(g) {
                var g = a.createElement(g),
                    c = g.style;
                c.background =
                    "transparent none";
                c.border = D;
                c.margin = "0px";
                c.padding = "0px";
                c.position = "static";
                return g
            };
            this.makeTransparentImage = function(c) {
                var a = g.makeNeutralElement("img"),
                    b = h;
                J == O.IE && 7 > k ? (b = g.makeNeutralElement("span"), b.style.display = "inline-block", a.onload = function() {
                    b.style.width = b.style.width || a.width + "px";
                    b.style.height = b.style.height || a.height + "px";
                    a = a.onload = h
                }, a.src = c, b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "', sizingMethod='scale')") : (b = a, b.src = c);
                return b
            };
            this.setElementOpacity =
                function(c, a, b) {
                    c = g.getElement(c);
                    b && t && (a = d.round(a));
                    c.style.opacity = 1 > a ? a : x;
                    c.style.filter = (c.style.filter || x).replace(/[\s]*alpha\(.*?\)[\s]*/g, x);
                    1 <= a || (a = " alpha(opacity=" + d.round(100 * a) + ") ", c.style.filter += a)
                };
            this.addEvent = function(c, a, b, e) {
                c = g.getElement(c);
                c.addEventListener ? ("mousewheel" == a && c.addEventListener("DOMMouseScroll", b, e), c.addEventListener(a, b, e)) : c.attachEvent ? (c.attachEvent("on" + a, b), e && c.setCapture && c.setCapture()) : w.fail("Unable to attach event handler, no known technique.")
            };
            this.removeEvent = function(c, a, b, e) {
                c = g.getElement(c);
                c.removeEventListener ? ("mousewheel" == a && c.removeEventListener("DOMMouseScroll", b, e), c.removeEventListener(a, b, e)) : c.detachEvent ? (c.detachEvent("on" + a, b), e && c.releaseCapture && c.releaseCapture()) : w.fail("Unable to detach event handler, no known technique.")
            };
            this.cancelEvent = function(c) {
                c = g.getEvent(c);
                c.preventDefault && c.preventDefault();
                c.cancel = l;
                c.returnValue = q
            };
            this.stopEvent = function(c) {
                c = g.getEvent(c);
                c.stopPropagation && c.stopPropagation();
                c.cancelBubble = l
            };
            this.createCallback = function(g, c) {
                for (var a = [], b = 2; b < arguments.length; b++) a.push(arguments[b]);
                return function() {
                    for (var b = a.concat([]), e = 0; e < arguments.length; e++) b.push(arguments[e]);
                    return c.apply(g, b)
                }
            };
            this.getUrlParameter = function(g) {
                return (g = j[g]) ? g : h
            };
            this.makeAjaxRequest = function(g, a) {
                var J = typeof a == z,
                    d = h;
                if (J) var f = a,
                    a = function() {
                        b.setTimeout(c.createCallback(h, f, d), 1)
                    };
                if (b.ActiveXObject)
                    for (var k = 0; k < Ta.length; k++) try {
                        d = new ActiveXObject(Ta[k]);
                        break
                    } catch (m) {} else b.XMLHttpRequest &&
                        (d = new XMLHttpRequest);
                !d && w.fail("Browser doesn't support XMLHttpRequest.");
                e.proxyUrl && (g = e.proxyUrl + g);
                J && (d.onreadystatechange = function() {
                    4 == d.readyState && (d.onreadystatechange = new Function, a())
                });
                try {
                    d.open("GET", g, J), d.send(h)
                } catch (l) {
                    w.log(l.name + " while making AJAX request: " + l.message), d = d.onreadystatechange = h, J && a()
                }
                return J ? h : d
            };
            this.parseXml = function(g) {
                var c = h;
                if (b.ActiveXObject) try {
                    c = new ActiveXObject("Microsoft.XMLDOM"), c.async = q, c.loadXML(g)
                } catch (a) {
                    w.log(a.name + " while parsing XML (ActiveX): " +
                        a.message)
                } else if (b.DOMParser) try {
                    c = (new DOMParser).parseFromString(g, "text/xml")
                } catch (e) {
                    w.log(e.name + " while parsing XML (DOMParser): " + e.message)
                } else w.fail("Browser doesn't support XML DOM.");
                return c
            }
        },
        c = v.Utils = new c,
        P = v.MouseTracker;
    var A = function(g, a) {
            var b = c.getMousePosition(g),
                e = c.getElementPosition(a);
            return b.minus(e)
        },
        V = function(g, c) {
            for (var b = a.body; c && g != c && b != c;) try {
                c = c.parentNode
            } catch (e) {
                return q
            }
            return g == c
        },
        E = function() {
            W = l
        },
        ea = function() {
            W = q
        },
        H = "mouseup";
    if (!P) {
        var T = c.getBrowser() ==
            O.IE && 9 > c.getBrowserVersion(),
            W = q,
            ca = q,
            fa = {},
            ga = [];
        T ? (c.addEvent(a, "mousedown", E, q), c.addEvent(a, H, ea, q)) : (c.addEvent(b, "mousedown", E, l), c.addEvent(b, H, ea, l));
        P = v.MouseTracker = function(g) {
            function f() {
                x && (T ? (c.removeEvent(g, sa, I, l), c.removeEvent(g, H, B, l), c.addEvent(g, H, j, q)) : (c.removeEvent(b, sa, p, l), c.removeEvent(b, H, y, l)), x = q)
            }

            function k(g, c) {
                var a = fa,
                    b;
                for (b in a) a.hasOwnProperty(b) && Aa != b && a[b][g](c)
            }

            function J(a) {
                a = c.getEvent(a);
                T && x && !V(a.srcElement, g) && k("onMouseOver", a);
                var b = a.relatedTarget ?
                    a.relatedTarget : a.fromElement;
                if (V(g, a.target ? a.target : a.srcElement) && !V(g, b))
                    if (u = l, typeof L.enterHandler == z) try {
                        L.enterHandler(L, A(a, g), K, W)
                    } catch (e) {
                        w.error(e.name + " while executing enter handler: " + e.message, e)
                    }
            }

            function m(a) {
                a = c.getEvent(a);
                T && x && !V(a.srcElement, g) && k("onMouseOut", a);
                var b = a.relatedTarget ? a.relatedTarget : a.toElement;
                if (V(g, a.target ? a.target : a.srcElement) && !V(g, b))
                    if (u = q, typeof L.exitHandler == z) try {
                        L.exitHandler(L, A(a, g), K, W)
                    } catch (e) {
                        w.error(e.name + " while executing exit handler: " +
                            e.message, e)
                    }
            }

            function t(a) {
                a = c.getEvent(a);
                if (2 != a.button) {
                    K = l;
                    M = r = c.getMousePosition(a);
                    N = (new Date).getTime();
                    if (typeof L.pressHandler == z) try {
                        L.pressHandler(L, A(a, g))
                    } catch (e) {
                        w.error(e.name + " while executing press handler: " + e.message, e)
                    }(L.pressHandler || L.dragHandler) && c.cancelEvent(a);
                    !T || !ca ? (x || (T ? (c.removeEvent(g, H, j, q), c.addEvent(g, H, B, l), c.addEvent(g, sa, I, l)) : (c.addEvent(b, H, y, l), c.addEvent(b, sa, p, l)), x = l), ca = l, ga = [ba]) : T && ga.push(ba)
                }
            }

            function j(a) {
                var a = c.getEvent(a),
                    b = K,
                    d = u;
                if (2 != a.button) {
                    K =
                        q;
                    if (typeof L.releaseHandler == z) try {
                        L.releaseHandler(L, A(a, g), b, d)
                    } catch (h) {
                        w.error(h.name + " while executing release handler: " + h.message, h)
                    }
                    if (b && d && (a = c.getEvent(a), 2 != a.button && (b = (new Date).getTime() - N, d = c.getMousePosition(a), d = M.distanceTo(d), b = b <= e.clickTimeThreshold && d <= e.clickDistThreshold, typeof L.clickHandler == z))) try {
                        L.clickHandler(L, A(a, g), b, a.shiftKey)
                    } catch (J) {
                        w.error(J.name + " while executing click handler: " + J.message, J)
                    }
                }
            }

            function B(g) {
                g = c.getEvent(g);
                if (2 != g.button) {
                    for (var b = 0; b <
                        ga.length; b++) {
                        var e = ga[b];
                        !e.hasMouse() && e.onMouseUp(g)
                    }
                    f();
                    ca = q;
                    g.srcElement.fireEvent("on" + g.type, a.createEventObject(g));
                    c.stopEvent(g)
                }
            }

            function y(g) {
                !u && j(g);
                f()
            }

            function n(g) {
                L.clickHandler && c.cancelEvent(g)
            }

            function p(a) {
                var a = c.getEvent(a),
                    b = c.getMousePosition(a),
                    e = b.minus(r);
                r = b;
                if (typeof L.dragHandler == z) {
                    try {
                        L.dragHandler(L, A(a, g), e, a.shiftKey)
                    } catch (d) {
                        w.error(d.name + " while executing drag handler: " + d.message, d)
                    }
                    c.cancelEvent(a)
                }
            }

            function I(g) {
                for (var a = 0; a < ga.length; a++) ga[a].onMouseMove(g);
                c.stopEvent(g)
            }

            function s(a) {
                var a = c.getEvent(a),
                    b = c.getMouseScroll(a);
                if (typeof L.scrollHandler == z) {
                    if (b) try {
                        L.scrollHandler(L, A(a, g), b, a.shiftKey)
                    } catch (e) {
                        w.error(e.name + " while executing scroll handler: " + e.message, e)
                    }
                    c.cancelEvent(a)
                }
            }
            var sa = "mousemove",
                L = this,
                ba = h,
                Aa = d.random(),
                g = c.getElement(g),
                D = q,
                x = q,
                K = q,
                u = q,
                r = h,
                N = h,
                M = h;
            this.target = g;
            this.scrollHandler = this.dragHandler = this.clickHandler = this.releaseHandler = this.pressHandler = this.exitHandler = this.enterHandler = h;
            ba = {
                hasMouse: function() {
                    return u
                },
                onMouseOver: J,
                onMouseOut: m,
                onMouseUp: j,
                onMouseMove: p
            };
            this.isTracking = function() {
                return D
            };
            this.setTracking = function(a) {
                a ? D || (c.addEvent(g, "mouseover", J, q), c.addEvent(g, "mouseout", m, q), c.addEvent(g, "mousedown", t, q), c.addEvent(g, H, j, q), c.addEvent(g, "mousewheel", s, q), c.addEvent(g, "click", n, q), D = l, fa[Aa] = ba) : D && (c.removeEvent(g, "mouseover", J, q), c.removeEvent(g, "mouseout", m, q), c.removeEvent(g, "mousedown", t, q), c.removeEvent(g, H, j, q), c.removeEvent(g, "mousewheel", s, q), c.removeEvent(g, "click", n, q), f(), D =
                    q, delete fa[Aa])
            }
        }
    }
    var pa = v.EventManager = function() {
            var g = {};
            this.addListener = function(a, c) {
                typeof c == z && (g[a] || (g[a] = []), g[a].push(c))
            };
            this.removeListener = function(a, c) {
                var b = g[a];
                if (typeof c == z && b)
                    for (var e = 0; e < b.length; e++)
                        if (c == b[e]) {
                            b.splice(e, 1);
                            break
                        }
            };
            this.clearListeners = function(a) {
                g[a] && delete g[a]
            };
            this.trigger = function(a) {
                var c = g[a],
                    e = [];
                if (c) {
                    for (var d = 1; d < arguments.length; d++) e.push(arguments[d]);
                    for (d = 0; d < c.length; d++) try {
                        c[d].apply(b, e)
                    } catch (h) {
                        w.error(h.name + s + a + " handler: " + h.message,
                            h)
                    }
                }
            }
        },
        t, M = function(g, a) {
            function c(f) {
                e.onload = h;
                e.onabort = h;
                e.onerror = h;
                d && b.clearTimeout(d);
                b.setTimeout(function() {
                    a(g, f ? e : h)
                }, 1)
            }
            var e = h,
                d = h;
            this.start = function() {
                e = new Image;
                var a = function() {
                    c(q)
                };
                e.onload = function() {
                    c(l)
                };
                e.onabort = a;
                e.onerror = a;
                d = b.setTimeout(function() {
                    w.log("Image timed out: " + g);
                    c(q)
                }, ha);
                e.src = g
            }
        },
        ha = 15E3;
    t = v.ImageLoader = function() {
        function g(g, c, b) {
            a--;
            if (typeof g == z) try {
                g(b)
            } catch (e) {
                w.error(e.name + s + c + " callback: " + e.message, e)
            }
        }
        var a = 0;
        this.loadImage = function(b, d) {
            if (a >=
                e.imageLoaderLimit) return q;
            var f = c.createCallback(h, g, d),
                f = new M(b, f);
            a++;
            f.start();
            return l
        }
    };
    j = 0;
    u = 1;
    n = 2;
    I = 3;
    v.Button = function(a, e, f, k, m, t, B, y, p, aa) {
        function w() {
            b.setTimeout(D, 20)
        }

        function D() {
            if (G) {
                var a = 1 - ((new Date).getTime() - ra) / v,
                    a = d.min(1, a),
                    a = d.max(0, a);
                c.setElementOpacity(K, a, l);
                0 < a && w()
            }
        }

        function s(a) {
            a >= u && ba == j && (G = q, c.setElementOpacity(K, 1, l), ba = u);
            a >= n && ba == u && (r.style.visibility = x, ba = n);
            a >= I && ba == n && (M.style.visibility = x, ba = I)
        }

        function sa(a) {
            a <= n && ba == I && (M.style.visibility = N, ba =
                n);
            a <= u && ba == n && (r.style.visibility = N, ba = u);
            a <= j && ba == u && (G = l, ra = (new Date).getTime() + E, b.setTimeout(w, E), ba = j)
        }
        var L = c.makeNeutralElement("span"),
            ba = u,
            Aa = new P(L),
            e = c.makeTransparentImage(e),
            K = c.makeTransparentImage(f),
            r = c.makeTransparentImage(k),
            M = c.makeTransparentImage(m),
            t = typeof t == z ? t : h,
            B = typeof B == z ? B : h,
            y = typeof y == z ? y : h,
            p = typeof p == z ? p : h,
            aa = typeof aa == z ? aa : h,
            E = 0,
            v = 2E3,
            ra = h,
            G = q;
        this.elmt = L;
        this.notifyGroupEnter = function() {
            s(u)
        };
        this.notifyGroupExit = function() {
            sa(j)
        };
        L.style.display = "inline-block";
        L.style.position = "relative";
        L.title = a;
        L.appendChild(e);
        L.appendChild(K);
        L.appendChild(r);
        L.appendChild(M);
        a = K.style;
        f = r.style;
        k = M.style;
        a.position = f.position = k.position = "absolute";
        a.top = f.top = k.top = "0px";
        a.left = f.left = k.left = "0px";
        f.visibility = k.visibility = N;
        c.getBrowser() == O.FIREFOX && 3 > c.getBrowserVersion() && (a.top = f.top = k.top = x);
        Aa.enterHandler = function(a, g, c, b) {
            c ? (s(I), p && p()) : !b && s(n)
        };
        Aa.exitHandler = function(a, g, c) {
            sa(u);
            c && aa && aa()
        };
        Aa.pressHandler = function() {
            s(I);
            t && t()
        };
        Aa.releaseHandler =
            function(a, g, c, b) {
                c && b ? (sa(n), B && B()) : c ? sa(u) : s(n)
            };
        Aa.clickHandler = function(a, g, c) {
            y && c && y()
        };
        Aa.setTracking(l);
        sa(j)
    };
    v.ButtonGroup = function(a) {
        function b() {
            for (var c = 0; c < a.length; c++) a[c].notifyGroupEnter()
        }

        function e(c, b, d) {
            if (!d)
                for (c = 0; c < a.length; c++) a[c].notifyGroupExit()
        }
        var d = c.makeNeutralElement("span"),
            a = a.concat([]),
            h = new P(d);
        this.elmt = d;
        this.emulateEnter = function() {
            b()
        };
        this.emulateExit = function() {
            e()
        };
        d.style.display = "inline-block";
        for (var f = 0; f < a.length; f++) d.appendChild(a[f].elmt);
        h.enterHandler = b;
        h.exitHandler = e;
        h.releaseHandler = function(c, b, e, d) {
            if (!d)
                for (c = 0; c < a.length; c++) a[c].notifyGroupExit()
        };
        h.setTracking(l)
    };
    var ia = v.TileSource = function(a, c, b, e, h, f) {
            var k = this,
                l = c / a;
            this.width = a;
            this.height = c;
            this.aspectRatio = a / c;
            this.dimensions = new m(a, c);
            this.minLevel = h ? h : 0;
            this.maxLevel = f ? f : d.ceil(d.log(d.max(a, c)) / d.log(2));
            this.tileSize = b ? b : 0;
            this.tileOverlap = e ? e : 0;
            this.getLevelScale = function(a) {
                return 1 / (1 << k.maxLevel - a)
            };
            this.getNumTiles = function(b) {
                var e = k.getLevelScale(b),
                    b = d.ceil(e * a / k.tileSize),
                    e = d.ceil(e * c / k.tileSize);
                return new m(b, e)
            };
            this.getPixelRatio = function(a) {
                a = k.dimensions.times(k.getLevelScale(a));
                return new m(1 / a.x, 1 / a.y)
            };
            this.getTileAtPoint = function(a, c) {
                var g = k.dimensions.times(k.getLevelScale(a)),
                    b = c.times(g.x),
                    e;
                e = 0 <= c.x && 1 >= c.x ? d.floor(b.x / k.tileSize) : d.ceil(g.x / k.tileSize) * d.floor(b.x / g.x) + d.floor((g.x + b.x % g.x) % g.x / k.tileSize);
                g = 0 <= c.y && c.y <= l ? d.floor(b.y / k.tileSize) : d.ceil(g.y / k.tileSize) * d.floor(b.y / g.y) + d.floor((g.y + b.y % g.y) % g.y / k.tileSize);
                return new m(e, g)
            };
            this.getTileBounds = function(a, c, g) {
                var b = k.dimensions.times(k.getLevelScale(a)),
                    a = 0 === c ? 0 : k.tileSize * c - k.tileOverlap,
                    e = 0 === g ? 0 : k.tileSize * g - k.tileOverlap,
                    c = k.tileSize + (0 === c ? 1 : 2) * k.tileOverlap,
                    g = k.tileSize + (0 === g ? 1 : 2) * k.tileOverlap,
                    c = d.min(c, b.x - a),
                    g = d.min(g, b.y - e),
                    b = 1 / b.x;
                return new y(a * b, e * b, c * b, g * b)
            };
            this.getTileUrl = function() {
                throw Error("Method not implemented.");
            };
            this.tileExists = function(a, c, g) {
                var b = k.getNumTiles(a);
                return a >= k.minLevel && a <= k.maxLevel && 0 <= c && 0 <= g && c < b.x &&
                    g < b.y
            }
        },
        X = v.DisplayRect = function(a, c, b, e, d, h) {
            y.apply(this, arguments);
            this.minLevel = d;
            this.maxLevel = h
        };
    X.prototype = new y;
    var Q = v.DziTileSource = function(a, c, b, e, h, k, f) {
        ia.apply(this, [a, c, b, e]);
        var m = this,
            t = {};
        this.tileFormat = this.fileFormat = k;
        this.displayRects = f;
        if (f)
            for (a = f.length - 1; 0 <= a; a--) {
                c = f[a];
                for (e = c.minLevel; e <= c.maxLevel; e++) t[e] || (t[e] = []), t[e].push(c)
            }
        this.getTileUrl = function(a, c, g) {
            return [h, a, "/", c, "_", g, ".", k].join(x)
        };
        this.tileExists = function(a, c, g) {
            var e = t[a];
            if (!e || !e.length) return l;
            for (var h = m.getLevelScale(a), k = e.length - 1; 0 <= k; k--) {
                var f = e[k];
                if (!(a < f.minLevel || a > f.maxLevel)) {
                    var J = f.x * h,
                        B = f.y * h,
                        j = J + f.width * h,
                        f = B + f.height * h,
                        J = d.floor(J / b),
                        B = d.floor(B / b),
                        j = d.ceil(j / b),
                        f = d.ceil(f / b);
                    if (J <= c && c < j && B <= g && g < f) return l
                }
            }
            return q
        }
    };
    Q.prototype = new ia;
    var C = function(a) {
            Error.apply(this, arguments);
            this.message = a
        },
        Y = function(a) {
            a instanceof C || (w.error(a.name + " while creating DZI from XML: " + a.message), a = new C(k.getString("Errors.Unknown")));
            return a
        },
        ja = function(a) {
            var a = a.split("/"),
                c = a[a.length - 1],
                b = c.lastIndexOf("."); - 1 < b && (a[a.length - 1] = c.slice(0, b));
            return a.join("/") + "_files/"
        },
        F = function(a, b) {
            if (a) {
                if (200 !== a.status && 0 !== a.status) {
                    var e = a.status;
                    throw new C(k.getString("Errors.Status", e, 404 == e ? "Not Found" : a.statusText));
                }
            } else throw new C(k.getString("Errors.Security"));
            e = h;
            a.responseXML && a.responseXML.documentElement ? e = a.responseXML : a.responseText && (e = c.parseXml(a.responseText));
            return R(e, b)
        },
        R = function(a, b) {
            if (!a || !a.documentElement) throw new C(k.getString("Errors.Xml"));
            var e = a.documentElement,
                d = e.tagName;
            if ("Image" == d) try {
                var h = e.getAttribute("Format");
                if (!c.imageFormatSupported(h)) throw new C(k.getString("Errors.ImageFormat", h.toUpperCase()));
                for (var m = e.getElementsByTagName("Size")[0], l = e.getElementsByTagName("DisplayRect"), t = parseInt(m.getAttribute("Width"), f), B = parseInt(m.getAttribute("Height"), f), j = parseInt(e.getAttribute("TileSize")), y = parseInt(e.getAttribute("Overlap")), e = [], d = 0; d < l.length; d++) {
                    var q = l[d],
                        n = q.getElementsByTagName("Rect")[0];
                    e.push(new X(parseInt(n.getAttribute("X"),
                        f), parseInt(n.getAttribute("Y"), f), parseInt(n.getAttribute("Width"), f), parseInt(n.getAttribute("Height"), f), parseInt(q.getAttribute("MinLevel"), f), parseInt(q.getAttribute("MaxLevel"), f)))
                }
                return new Q(t, B, j, y, b, h, e)
            } catch (sa) {
                throw h = k.getString("Errors.Dzi"), sa instanceof C ? sa : new C(h);
            } else {
                if ("Collection" == d) throw new C(k.getString("Errors.Dzc"));
                if ("Error" == d) throw h = e.getElementsByTagName("Message")[0].firstChild.nodeValue, new C(h);
            }
            throw new C(k.getString("Errors.Dzi"));
        };
    C.prototype = Error();
    Q.getTilesUrl = ja;
    Q.createFromJson = function(a, e) {
        var d = typeof e == z,
            f, m;
        if (!a || !a.url && !a.tilesUrl) m = new C(k.getString("Errors.Empty"));
        else try {
            var l = a.displayRects;
            if (l && l.length)
                for (var t = 0, B = l.length; t < B; t++) {
                    var j = l[t];
                    l[t] = new X(j.x || j[0], j.y || j[1], j.width || j[2], j.height || j[3], j.minLevel || j[4], j.maxLevel || j[5])
                }
            f = new Q(a.width, a.height, a.tileSize, a.tileOverlap, a.tilesUrl || ja(a.url), a.tileFormat, a.displayRects);
            f.xmlUrl = a.url
        } catch (y) {
            m = Y(y)
        }
        if (d) b.setTimeout(c.createCallback(h, e, f, m && m.message),
            1);
        else {
            if (m) throw m;
            return f
        }
    };
    Q.createFromXml = function(a, e, d) {
        function f(c, b) {
            try {
                var e = c(b, j);
                e.xmlUrl = a;
                return e
            } catch (d) {
                if (m) return l = Y(d).message, h;
                throw Y(d);
            }
        }
        var m = typeof d == z,
            l = h;
        if (!a) {
            l = k.getString("Errors.Empty");
            if (m) return b.setTimeout(function() {
                d(h, l)
            }, 1), h;
            throw new C(l);
        }
        var j = ja(a);
        return m ? (e ? b.setTimeout(function() {
            var a = f(R, c.parseXml(e));
            d(a, l)
        }, 1) : c.makeAjaxRequest(a, function(a) {
            a = f(F, a);
            d(a, l)
        }), h) : e ? f(R, c.parseXml(e)) : f(F, c.makeAjaxRequest(a))
    };
    for (var ta = v.Viewport = function(a,
            c) {
            function b(a) {
                var a = 1 / f.getZoom(a),
                    c = a / f.getAspectRatio(),
                    g = e.visibilityRatio,
                    a = (g - G) * a,
                    c = (g - G) * c,
                    g = 1 - 2 * a,
                    d = j - 2 * c;
                0 > g && (a += G * g, g = 0);
                0 > d && (c += G * d, d = 0);
                return new v.Rect(a, c, g, d)
            }
            var f = this,
                a = new m(a.x, a.y),
                k = c.x / c.y,
                j = c.y / c.x,
                t = new K(0),
                B = new K(0),
                q = new K(e.logarithmicZoom ? 0 : 1),
                n = h,
                p = new y(0, 0, 1, j),
                I = p.getCenter(),
                w = d.LN2;
            this.getHomeBounds = function() {
                var a = f.getAspectRatio(),
                    c = new y(p.x, p.y, p.width, p.height);
                k >= a ? (c.height = p.width / a, c.y = I.y - c.height / 2) : (c.width = p.height * a, c.x = I.x - c.width / 2);
                return c
            };
            this.getHomeCenter = function() {
                return I
            };
            this.getHomeZoom = function() {
                var a = k / f.getAspectRatio();
                return 1 <= a ? 1 : a
            };
            this.getMinCenter = function(a) {
                return b(a).getTopLeft()
            };
            this.getMaxCenter = function(a) {
                return b(a).getBottomRight()
            };
            this.getMinZoom = function() {
                var b = f.getHomeZoom();
                return d.min(e.minZoomDimension ? c.x <= c.y ? e.minZoomDimension / a.x : e.minZoomDimension / (a.x * j) : e.minZoomImageRatio * b, b)
            };
            this.getMaxZoom = function() {
                return d.max(c.x * e.maxZoomPixelRatio / a.x, f.getHomeZoom())
            };
            this.getAspectRatio = function() {
                return a.x /
                    a.y
            };
            this.getContainerSize = function() {
                return new m(a.x, a.y)
            };
            this.getBounds = function(a) {
                var c = f.getCenter(a),
                    a = 1 / f.getZoom(a),
                    b = a / f.getAspectRatio();
                return new y(c.x - a / 2, c.y - b / 2, a, b)
            };
            this.getCenter = function(c) {
                var b = new m(t.getCurrent(), B.getCurrent()),
                    e = new m(t.getTarget(), B.getTarget());
                if (c) return b;
                if (!n) return e;
                var c = f.getZoom(),
                    d = 1 / c,
                    h = d / f.getAspectRatio(),
                    b = new y(b.x - d / 2, b.y - h / 2, d, h),
                    d = f.pixelFromPoint(n, l),
                    c = n.minus(b.getTopLeft()).times(a.x / b.width).minus(d).divide(a.x * c);
                return e.plus(c)
            };
            this.getZoom = function(a) {
                a = a ? q.getCurrent() : q.getTarget();
                return e.logarithmicZoom ? d.pow(2, a) : a
            };
            this.applyConstraints = function(a) {
                var c = f.getZoom(),
                    g;
                g = f.getMinZoom();
                var h = f.getMaxZoom();
                g = d.min(d.max(c, g), h);
                c != g && f.zoomTo(g, n, a);
                var c = f.getCenter(),
                    k = b(),
                    h = c.x,
                    l = c.y,
                    t = d.min(d.max(h, k.x), k.x + k.width),
                    k = d.min(d.max(l, k.y), k.y + k.height),
                    h = h === t && l === k ? c : new m(t, k);
                e.wrapHorizontal && (h.x = c.x);
                e.wrapVertical && (h.y = c.y);
                c.equals(h) || (g = 1 / g, c = g / f.getAspectRatio(), f.fitBounds(new y(h.x - G * g, h.y - G * c, g,
                    c), a))
            };
            this.ensureVisible = function(a) {
                f.applyConstraints(a)
            };
            this.fitBounds = function(c, b) {
                var e = f.getAspectRatio(),
                    d = c.getCenter(),
                    k = new y(c.x, c.y, c.width, c.height);
                k.getAspectRatio() >= e ? (k.height = c.width / e, k.y = d.y - k.height / 2) : (k.width = c.height * e, k.x = d.x - k.width / 2);
                f.panTo(f.getCenter(l), l);
                f.zoomTo(f.getZoom(l), h, l);
                var m = f.getBounds(),
                    t = f.getZoom(),
                    e = 1 / k.width;
                e == t || k.width == m.width ? f.panTo(d, b) : (d = m.getTopLeft().times(a.x / m.width).minus(k.getTopLeft().times(a.x / k.width)).divide(a.x / m.width - a.x /
                    k.width), f.zoomTo(e, d, b))
            };
            this.goHome = function(a) {
                var c = f.getCenter();
                e.wrapHorizontal && (c.x = (1 + c.x % 1) % 1, t.resetTo(c.x), t.update());
                e.wrapVertical && (c.y = (j + c.y % j) % j, B.resetTo(c.y), B.update());
                f.fitBounds(p, a)
            };
            this.panBy = function(a, c) {
                f.panTo(f.getCenter().plus(a), c)
            };
            this.panTo = function(c, b) {
                if (b) t.resetTo(c.x), B.resetTo(c.y);
                else if (n) {
                    var e = f.getZoom(),
                        d = 1 / e,
                        h = d / f.getAspectRatio(),
                        d = new y(t.getCurrent() - d / 2, B.getCurrent() - h / 2, d, h),
                        h = f.pixelFromPoint(n, l),
                        e = n.minus(d.getTopLeft()).times(a.x / d.width).minus(h).divide(a.x *
                            e),
                        e = c.minus(e);
                    t.springTo(e.x);
                    B.springTo(e.y)
                } else t.springTo(c.x), B.springTo(c.y)
            };
            this.zoomBy = function(a, c, b) {
                f.zoomTo(f.getZoom() * a, c, b)
            };
            this.zoomTo = function(a, c, b) {
                b ? q.resetTo(e.logarithmicZoom ? d.log(a) / w : a) : q.springTo(e.logarithmicZoom ? d.log(a) / w : a);
                n = c instanceof m ? c : h
            };
            this.resize = function(c, b) {
                var e = f.getBounds(),
                    d = c.x / a.x;
                a = new m(c.x, c.y);
                b && (e.width *= d, e.height = e.width / f.getAspectRatio());
                f.fitBounds(e, l)
            };
            this.update = function() {
                var a = t.getCurrent(),
                    c = B.getCurrent(),
                    b = q.getCurrent();
                if (n) var e = f.pixelFromPoint(n, l);
                q.update();
                n && q.getCurrent() != b ? (e = f.pixelFromPoint(n, l).minus(e), e = f.deltaPointsFromPixels(e, l), t.shiftBy(e.x), B.shiftBy(e.y)) : n = h;
                t.update();
                B.update();
                return t.getCurrent() != a || B.getCurrent() != c || q.getCurrent() != b
            };
            this.deltaPixelsFromPoints = function(c, b) {
                return c.times(a.x * f.getZoom(b))
            };
            this.deltaPointsFromPixels = function(c, b) {
                return c.divide(a.x * f.getZoom(b))
            };
            this.pixelFromPoint = function(c, b) {
                var e = f.getBounds(b);
                return c.minus(e.getTopLeft()).times(a.x / e.width)
            };
            this.pointFromPixel = function(c, b) {
                var e = f.getBounds(b);
                return c.divide(a.x / e.width).plus(e.getTopLeft())
            };
            f.goHome(l);
            f.update()
        }, La, p, la = function(a, c, b, e, f, d) {
            this.level = a;
            this.x = c;
            this.y = b;
            this.bounds = e;
            this.exists = f;
            this.url = d;
            this.image = this.elmt = h;
            this.loading = this.loaded = q;
            this.visibility = this.distance = this.opacity = this.blendStart = this.size = this.position = this.style = h;
            this.beingDrawn = q;
            this.lastTouchTime = this.lastDrawnTime = 0
        }, ya = function(a) {
            switch (a) {
                case p.TOP_LEFT:
                    return function() {};
                case p.TOP:
                    return function(a,
                        c) {
                        a.x -= c.x / 2
                    };
                case p.TOP_RIGHT:
                    return function(a, c) {
                        a.x -= c.x
                    };
                case p.RIGHT:
                    return function(a, c) {
                        a.x -= c.x;
                        a.y -= c.y / 2
                    };
                case p.BOTTOM_RIGHT:
                    return function(a, c) {
                        a.x -= c.x;
                        a.y -= c.y
                    };
                case p.BOTTOM:
                    return function(a, c) {
                        a.x -= c.x / 2;
                        a.y -= c.y
                    };
                case p.BOTTOM_LEFT:
                    return function(a, c) {
                        a.y -= c.y
                    };
                case p.LEFT:
                    return function(a, c) {
                        a.y -= c.y / 2
                    };
                default:
                    return function(a, c) {
                        a.x -= c.x / 2;
                        a.y -= c.y / 2
                    }
            }
        }, S = function(a, c, b) {
            this.elmt = a;
            this.scales = c instanceof y;
            this.bounds = new y(c.x, c.y, c.width, c.height);
            this.adjust = ya(c instanceof m ? b : p.TOP_LEFT);
            this.position = new m(c.x, c.y);
            this.size = new m(c.width, c.height);
            this.style = a.style;
            this.naturalSize = new m(a.clientWidth, a.clientHeight)
        }, Ba = 100, za = G, B = c.getBrowser(), ea = c.getBrowserVersion(), E = !!a.createElement("canvas").getContext, ra = (a.documentElement || {}).style || {}, Z = q, da = ["msTransform", "WebkitTransform", "MozTransform"], ka, Ca; ka = da.shift();)
        if ("undefined" !== typeof ra[ka]) {
            Z = l;
            Ca = /webkit/i.test(ka);
            break
        }
    var ea = B == O.SAFARI && 4 > ea,
        Da = E && !ea,
        va = !Da && Z,
        Va = q,
        Ya = "undefined" !== typeof a.documentMode ?
        "bicubic" : "nearest-neighbor";
    la.prototype.toString = function() {
        return this.level + "/" + this.x + "_" + this.y
    };
    la.prototype.drawHTML = function(a) {
        if (this.loaded) {
            this.elmt || (this.elmt = c.makeNeutralElement("img"), this.elmt.src = this.url, this.style = this.elmt.style, this.style.position = "absolute", this.style.msInterpolationMode = Ya, va && (this.style[ka + "Origin"] = "0px 0px"));
            var b = this.elmt,
                e = this.image,
                f = this.style,
                h = this.position,
                k = this.size;
            b.parentNode != a && a.appendChild(b);
            va ? f[ka] = ["matrix(", (k.x / e.width).toFixed(8),
                ",0,0,", (k.y / e.height).toFixed(8), ",", h.x.toFixed(8), Ca ? "," : "px,", h.y.toFixed(8), Ca ? ")" : "px)"
            ].join(x) : Va ? (e = a.clientWidth, a = a.clientHeight, f.width = e + "px", f.height = a + "px", f.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (k.x / e).toFixed(8), ",M22=", (k.y / a).toFixed(8), ",Dx=", h.x.toFixed(8), ",Dy=", h.y.toFixed(8), ")"].join(x)) : (h = h.apply(d.floor), k = k.apply(d.ceil), f.left = h.x + "px", f.top = h.y + "px", f.width = k.x + "px", f.height = k.y + "px");
            c.setElementOpacity(b, this.opacity)
        } else w.error("Attempting to draw tile " +
            this.toString() + " when it's not yet loaded.")
    };
    la.prototype.drawCanvas = function(a) {
        if (this.loaded) {
            var c = this.position,
                b = this.size;
            a.globalAlpha = this.opacity;
            a.drawImage(this.image, c.x, c.y, b.x, b.y)
        } else w.error("Attempting to draw tile " + this.toString() + " when it's not yet loaded.")
    };
    la.prototype.unload = function() {
        this.elmt && this.elmt.parentNode && this.elmt.parentNode.removeChild(this.elmt);
        this.image = this.elmt = h;
        this.loading = this.loaded = q
    };
    p = v.OverlayPlacement = {
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8
    };
    S.prototype.destroy = function() {
        var a = this.elmt,
            c = this.style;
        a.parentNode && a.parentNode.removeChild(a);
        c.top = x;
        c.left = x;
        c.position = x;
        this.scales && (c.width = x, c.height = x)
    };
    S.prototype.drawHTML = function(a) {
        var c = this.elmt,
            b = this.style,
            f = this.scales,
            h = this.naturalSize;
        c.parentNode != a && (a.appendChild(c), b.position = "absolute", h.x = c.clientWidth, h.y = c.clientHeight);
        var k = this.position,
            m = this.size;
        f || (m.x = h.x = h.x || c.clientWidth, m.y = h.y = h.y || c.clientHeight);
        this.adjust(k, m);
        e.transformOverlays && Z ? (b[ka + "Origin"] = "0px 0px", b[ka] = ["translate(", k.x.toFixed(8), "px,", k.y.toFixed(8), "px)"].join(x), f && (c.clientWidth || (b.width = "100%"), c.clientHeight || (b.height = "100%"), b[ka] += [" scale(", (m.x / c.clientWidth).toFixed(8), ",", (m.y / c.clientHeight).toFixed(8), ")"].join(x))) : e.transformOverlays && Va ? (c = a.clientWidth, a = a.clientHeight, b.width = c + "px", b.height = a + "px", b.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=", (m.x / c).toFixed(8), ",M22=", (m.y / a).toFixed(8),
            ",Dx=", k.x.toFixed(8), ",Dy=", k.y.toFixed(8), ")"
        ].join(x)) : (k = k.apply(d.floor), m = m.apply(d.ceil), b.left = k.x + "px", b.top = k.y + "px", f && (b.width = m.x + "px", b.height = m.y + "px"))
    };
    S.prototype.update = function(a, c) {
        this.scales = a instanceof y;
        this.bounds = new y(a.x, a.y, a.width, a.height);
        this.adjust = ya(a instanceof m ? c : p.TOP_LEFT)
    };
    La = v.Drawer = function(a, b, f) {
        function k(c) {
            X[c] || (X[c] = a.getPixelRatio(c));
            return X[c]
        }

        function j(a, c, b) {
            a.loading = q;
            if (R) w.error("Tile load callback in middle of drawing routine.");
            else if (b)
                if (c <
                    C) w.log("Ignoring tile " + a + " loaded before reset: " + a.url);
                else {
                    a.loaded = l;
                    a.image = b;
                    c = A.length;
                    if (A.length >= Ba) {
                        for (var b = d.ceil(d.log(M) / d.log(2)), e = h, g = -1, f = A.length - 1; 0 <= f; f--) {
                            var k = A[f];
                            if (!(k.level <= b || k.beingDrawn))
                                if (e) {
                                    var m = k.lastTouchTime,
                                        t = e.lastTouchTime,
                                        B = k.level,
                                        n = e.level;
                                    if (m < t || m == t && B > n) e = k, g = f
                                } else e = k, g = f
                        }
                        e && 0 <= g && (e.unload(), c = g)
                    }
                    A[c] = a;
                    Z = l
                }
            else w.log("Tile " + a + " failed to load: " + a.url), a.exists = q
        }

        function n(a, c, b) {
            if (!ha[a]) return q;
            if (c === r || b === r) {
                var a = ha[a],
                    e;
                for (e in a)
                    if (a.hasOwnProperty(e)) {
                        var c =
                            a[e],
                            g;
                        for (g in c)
                            if (c.hasOwnProperty(g) && !c[g]) return q
                    }
                return l
            }
            return ha[a][c] === r || ha[a][c][b] === r || ha[a][c][b] === l
        }

        function y(a, c, b, e) {
            ha[a] ? (ha[a][c] || (ha[a][c] = {}), ha[a][c][b] = e) : w.error("Setting coverage for a tile before its level's coverage has been reset: " + a)
        }

        function p(a) {
            for (var c = Q.length - 1; 0 <= c; c--)
                if (Q[c].elmt == a) return c;
            return -1
        }
        var I = c.getElement(f),
            s = c.makeNeutralElement(Da ? "canvas" : "div"),
            D = Da ? s.getContext("2d") : h,
            K = new t,
            u = new oa,
            z = a.minLevel,
            N = a.maxLevel,
            M = a.tileSize,
            E = a.tileOverlap,
            v = a.height / a.width,
            ra = {},
            X = {},
            ia = {},
            A = [],
            ha = {},
            Q = [],
            F = [],
            Ua = 0,
            C = 0,
            R = q,
            Z = l;
        this.elmt = I;
        this.profiler = u;
        s.style.width = "100%";
        s.style.height = "100%";
        s.style.position = "absolute";
        I.style.textAlign = "left";
        I.appendChild(s);
        this.addOverlay = function(a, b, e) {
            a = c.getElement(a);
            0 <= p(a) || (Q.push(new S(a, b, e)), Z = l)
        };
        this.updateOverlay = function(a, b, e) {
            a = c.getElement(a);
            a = p(a);
            0 <= a && (Q[a].update(b, e), Z = l)
        };
        this.removeOverlay = function(a) {
            a = c.getElement(a);
            a = p(a);
            0 <= a && (Q[a].destroy(), Q.splice(a, 1), Z = l)
        };
        this.clearOverlays =
            function() {
                for (; 0 < Q.length;) Q.pop().destroy(), Z = l
            };
        this.needsUpdate = function() {
            return Z
        };
        this.numTilesLoaded = function() {
            return A.length
        };
        this.reset = function() {
            ia = {};
            A = [];
            C = (new Date).getTime();
            Z = l
        };
        this.update = function() {
            u.beginUpdate();
            R = l;
            for (Z = q; 0 < F.length;) {
                var f = F.pop();
                f.beingDrawn = q
            }
            var t = b.getContainerSize(),
                p = t.x,
                t = t.y;
            Da ? (s.width = p, s.height = t, D.clearRect(0, 0, p, t)) : s.innerHTML = x;
            var p = b.getBounds(l),
                w = p.getTopLeft(),
                M = p.getBottomRight();
            if (e.wrapHorizontal || !(0 > M.x || 1 < w.x))
                if (e.wrapVertical ||
                    !(0 > M.y || w.y > v)) {
                    var A = Ua,
                        X = B === O.CHROME,
                        oa = d.abs,
                        p = d.floor,
                        C = d.log,
                        P = d.max,
                        H = d.min,
                        t = b.deltaPixelsFromPoints,
                        Y = b.pixelFromPoint,
                        da = a.getTileAtPoint,
                        V = e.alwaysBlend,
                        ba = 1E3 * e.blendTime,
                        ka = e.immediateRender,
                        ja = e.minZoomDimension,
                        ta = e.wrapHorizontal,
                        Ca = e.wrapVertical,
                        ea = e.wrapOverlays;
                    ta || (w.x = P(w.x, 0), M.x = H(M.x, 1));
                    Ca || (w.y = P(w.y, 0), M.y = H(M.y, v));
                    for (var ma = h, ca = q, T = (new Date).getTime(), fa = b.getCenter(), ga = Y(fa), va = t(k(0), q).x, ka = ka ? 1 : va, P = P(z, p(C(ja || 64) / C(2))), ja = t(k(0), l).x, C = H(N, p(C(ja / za) / C(2))),
                            P = H(P, C); C >= P; C--) {
                        ja = q;
                        va = t(k(C), l).x;
                        if (!ca && va >= za || C == P) ca = ja = l;
                        else if (!ca) continue;
                        ha[C] = {};
                        var va = H(1, (va - G) / G),
                            Sa = t(k(C), q).x,
                            Sa = ka / oa(ka - Sa),
                            Wa = da(C, w),
                            Ha = da(C, M),
                            Ia, Fa = C;
                        ra[Fa] || (ra[Fa] = a.getNumTiles(Fa));
                        Ia = ra[Fa];
                        Fa = Ia.x;
                        Ia = Ia.y;
                        ta || (Ha.x = H(Ha.x, Fa - 1));
                        Ca || (Ha.y = H(Ha.y, Ia - 1));
                        for (var wa = Wa.x; wa <= Ha.x; wa++)
                            for (var xa = Wa.y; xa <= Ha.y; xa++) {
                                var U = C,
                                    na = wa,
                                    qa = xa,
                                    f = T,
                                    W = Fa,
                                    pa = Ia;
                                ia[U] || (ia[U] = {});
                                ia[U][na] || (ia[U][na] = {});
                                if (!ia[U][na][qa]) {
                                    var S = (W + na % W) % W,
                                        ua = (pa + qa % pa) % pa,
                                        Ja = a.getTileBounds(U,
                                            S, ua),
                                        ya = a.tileExists(U, S, ua),
                                        Xa = a.getTileUrl(U, S, ua);
                                    Ja.x += 1 * (na - S) / W;
                                    Ja.y += v * (qa - ua) / pa;
                                    ia[U][na][qa] = new la(U, na, qa, Ja, ya, Xa)
                                }
                                U = ia[U][na][qa];
                                U.lastTouchTime = f;
                                f = U;
                                U = ja;
                                y(C, wa, xa, q);
                                f.exists && (ca && !U && ((wa === r || xa === r ? n(C + 1) : n(C + 1, 2 * wa, 2 * xa) && n(C + 1, 2 * wa, 2 * xa + 1) && n(C + 1, 2 * wa + 1, 2 * xa) && n(C + 1, 2 * wa + 1, 2 * xa + 1)) ? y(C, wa, xa, l) : U = l), U && (W = f.bounds.getTopLeft(), qa = f.bounds.getSize(), U = Y(W, l), na = t(qa, l), E || (na = na.plus(new m(1, 1))), W = Y(W, q), qa = t(qa, q), qa = W.plus(qa.divide(2)), qa = ga.distanceTo(qa), f.position = U,
                                    f.size = na, f.distance = qa, f.visibility = Sa, f.loaded ? (f.blendStart || (f.blendStart = T), U = T - f.blendStart, na = 0 === ba ? 1 : H(1, U / ba), V && (na *= va), f.opacity = na, F.push(f), 1 <= na ? (y(C, wa, xa, l), X && f.lastDrawnTime !== A && y(C, wa, xa, q)) : U < ba && (Z = l), f.lastDrawnTime = T) : f.loading || (ma = !ma || f.visibility > ma.visibility || f.visibility == ma.visibility && f.distance < ma.distance ? f : ma)))
                            }
                        if (n(C)) break
                    }
                    for (w = F.length - 1; 0 <= w; w--) f = F[w], Da ? f.drawCanvas(D) : f.drawHTML(s), f.beingDrawn = l;
                    M = Q.length;
                    for (w = 0; w < M; w++) A = Q[w], X = A.bounds, oa = X.getTopLeft(),
                        ea && ta && (oa.x += p(fa.x)), A.position = Y(oa, l), A.size = t(X.getSize(), l), A.drawHTML(I);
                    ma && (ma.loading = K.loadImage(ma.url, c.createCallback(h, j, ma, T)), Z = l);
                    Ua = T
                }
            R = q;
            u.endUpdate()
        };
        this.idle = function() {}
    };
    var ua, Ma = function(a, b, e) {
            var f = c.makeNeutralElement("span");
            this.elmt = a;
            this.anchor = b;
            this.container = e;
            this.wrapper = f;
            f.style.display = "inline-block";
            f.appendChild(a);
            b == ua.NONE && (f.style.width = f.style.height = "100%");
            b == ua.TOP_RIGHT || b == ua.BOTTOM_RIGHT ? e.insertBefore(f, e.firstChild) : e.appendChild(f)
        },
        Za =
        c.getBrowser();
    ua = v.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4
    };
    Ma.prototype.destroy = function() {
        this.wrapper.removeChild(this.elmt);
        this.container.removeChild(this.wrapper)
    };
    Ma.prototype.isVisible = function() {
        return this.wrapper.style.display != D
    };
    Ma.prototype.setVisible = function(a) {
        this.wrapper.style.display = a ? "inline-block" : D
    };
    Ma.prototype.setOpacity = function(a) {
        this.elmt["----seadragon----"] && Za == O.IE ? c.setElementOpacity(this.elmt, a, l) : c.setElementOpacity(this.wrapper,
            a, l)
    };
    v.Viewer = function(g) {
        function t(b) {
            b = a.createTextNode(b);
            A.innerHTML = x;
            A.appendChild(c.makeCenteredNode(b));
            b = b.parentNode.style;
            b.fontFamily = "verdana";
            b.fontSize = "13px";
            b.fontSizeAdjust = D;
            b.fontStyle = "normal";
            b.fontStretch = "normal";
            b.fontVariant = "normal";
            b.fontWeight = "normal";
            b.lineHeight = "1em";
            b.textAlign = "center";
            b.textDecoration = D
        }

        function j() {
            G && n();
            la = (new Date).getTime();
            b.setTimeout(function() {
                la > ya && t(k.getString("Messages.Loading"))
            }, 2E3);
            return la
        }

        function B(a, e, d) {
            ya = (new Date).getTime();
            a < la ? (w.log("Ignoring out-of-date open."), H.trigger("ignore", v)) : e ? (A.innerHTML = x, S = c.getElementSize(g), 0 === S.x || 0 === S.y ? b.setTimeout(function() {
                B(a, e, d)
            }, f) : (G = e, F = new ta(S, G.dimensions), Z = new La(G, F, A), R = new oa, v.source = G, v.viewport = F, v.drawer = Z, v.profiler = R, Ea = q, Ba = l, p(I), H.trigger("open", v))) : (t(d), H.trigger("error", v))
        }

        function n() {
            v.source = G = h;
            v.viewport = F = h;
            v.drawer = Z = h;
            v.profiler = R = h;
            A.innerHTML = x
        }

        function p(a, c) {
            if (Ea) return b.setTimeout(a, 1);
            var e = (new Date).getTime(),
                e = d.max(1, (c ? c : e) +
                    1E3 / 60 - e);
            return b.setTimeout(a, e)
        }

        function y() {
            if (G) {
                R.beginUpdate();
                var a = c.getElementSize(g);
                !a.equals(S) && (0 < a.x && 0 < a.y) && (F.resize(a, l), S = a, H.trigger("resize", v));
                a = F.update();
                !Ea && a && (H.trigger("animationstart", v), M());
                a ? (Z.update(), H.trigger("animation", v)) : Ba || Z.needsUpdate() ? (Z.update(), Ba = q) : Z.idle();
                Ea && !a && (H.trigger("animationfinish", v), !Na && r());
                Ea = a;
                R.endUpdate()
            }
        }

        function I() {
            if (G) {
                var a = (new Date).getTime();
                y();
                p(arguments.callee, a)
            }
        }

        function s(a) {
            for (var c = da.length - 1; 0 <= c; c--)
                if (da[c].elmt ==
                    a) return c;
            return -1
        }

        function K() {
            b.setTimeout(u, 20)
        }

        function u() {
            if (ka) {
                for (var a = 1 - ((new Date).getTime() - V) / ca, a = d.min(1, a), a = d.max(0, a), c = da.length - 1; 0 <= c; c--) da[c].setOpacity(a);
                0 < a && K()
            }
        }

        function M() {
            ka = q;
            for (var a = da.length - 1; 0 <= a; a--) da[a].setOpacity(1)
        }

        function r() {
            e.autoHideControls && (ka = l, V = (new Date).getTime() + T, b.setTimeout(K, T))
        }

        function z() {
            Na = l;
            M()
        }

        function E(a, c, b) {
            b || (Na = q, !Ea && r())
        }

        function C(a) {
            a = c.getEvent(a);
            27 === a.keyCode && v.setFullPage(q)
        }
        var v = this,
            ra = c.getElement(g),
            g = c.makeNeutralElement("div"),
            A = c.makeNeutralElement("div"),
            O = c.makeNeutralElement("div"),
            X = c.makeNeutralElement("div"),
            ia = c.makeNeutralElement("div"),
            ha = c.makeNeutralElement("div"),
            G = h,
            Z = h,
            F = h,
            R = h,
            H = new pa,
            Y = new P(A),
            ja = new P(g),
            da = [],
            ka = l,
            V = h,
            W = h,
            T = 1E3,
            ca = 2E3,
            V = h,
            ka = q,
            Ca = a.body.style.width,
            va = a.body.style.height,
            ea = a.body.style.overflow,
            fa = a.documentElement.style.overflow,
            ga = new m(1, 1),
            S = h,
            la = 0,
            ya = 0,
            za = h,
            Da = h,
            Ea = q,
            Ba = q,
            Na = q;
        this.container = ra;
        this.elmt = g;
        this.profiler = this.viewport = this.drawer = this.source = h;
        this.tracker = Y;
        this.isOpen =
            function() {
                return !!G
            };
        this.openDzi = function(a, b) {
            var e = j(),
                e = c.createCallback(h, B, e);
            switch (typeof a) {
                case "string":
                    Q.createFromXml(a, b, e);
                    break;
                default:
                    Q.createFromJson(a, e)
            }
        };
        this.openTileSource = function(a) {
            var c = j();
            b.setTimeout(function() {
                B(c, a)
            }, 1)
        };
        this.close = function() {
            G && n()
        };
        this.addControl = function(a, b) {
            a = c.getElement(a);
            if (!(0 <= s(a))) {
                var e = h;
                switch (b) {
                    case ua.TOP_RIGHT:
                        e = X;
                        a.style.position = "relative";
                        break;
                    case ua.BOTTOM_RIGHT:
                        e = ia;
                        a.style.position = "relative";
                        break;
                    case ua.BOTTOM_LEFT:
                        e =
                            ha;
                        a.style.position = "relative";
                        break;
                    case ua.TOP_LEFT:
                        e = O;
                        a.style.position = "relative";
                        break;
                    default:
                        e = g, a.style.position = "absolute"
                }
                da.push(new Ma(a, b, e))
            }
        };
        this.removeControl = function(a) {
            a = c.getElement(a);
            a = s(a);
            0 <= a && (da[a].destroy(), da.splice(a, 1))
        };
        this.clearControls = function() {
            for (; 0 < da.length;) da.pop().destroy()
        };
        this.getNavControl = function() {
            return W
        };
        this.isDashboardEnabled = function() {
            for (var a = da.length - 1; 0 <= a; a--)
                if (da[a].isVisible()) return l;
            return q
        };
        this.isFullPage = function() {
            return g.parentNode ==
                a.body
        };
        this.isMouseNavEnabled = function() {
            return Y.isTracking()
        };
        this.isVisible = function() {
            return g.style.visibility != N
        };
        this.setDashboardEnabled = function(a) {
            for (var c = da.length - 1; 0 <= c; c--) da[c].setVisible(a)
        };
        this.setFullPage = function(b) {
            if (b != v.isFullPage()) {
                var e = a.body,
                    f = e.style,
                    k = a.documentElement.style,
                    t = g.style,
                    j = A.style;
                b ? (ea = f.overflow, fa = k.overflow, f.overflow = N, k.overflow = N, Ca = f.width, va = f.height, f.width = "100%", f.height = "100%", j.backgroundColor = "black", j.color = "white", t.position = "fixed",
                    t.zIndex = "99999999", e.appendChild(g), S = c.getWindowSize(), c.addEvent(a, "keydown", C), z()) : (f.overflow = ea, k.overflow = fa, f.width = Ca, f.height = va, j.backgroundColor = x, j.color = x, t.position = "relative", t.zIndex = x, ra.appendChild(g), S = c.getElementSize(ra), c.removeEvent(a, "keydown", C), E());
                F && (e = F.getBounds(), F.resize(S), f = F.getBounds(), b ? ga = new m(f.width / e.width, f.height / e.height) : (F.update(), F.zoomBy(d.max(ga.x, ga.y), h, l)), Ba = l, H.trigger("resize", v), y())
            }
        };
        this.setMouseNavEnabled = function(a) {
            Y.setTracking(a)
        };
        this.setVisible = function(a) {
            g.style.visibility = a ? x : N
        };
        this.showMessage = function(a, c) {
            c ? b.setTimeout(function() {
                !v.isOpen() && t(a)
            }, c) : t(a)
        };
        this.addEventListener = function(a, c) {
            H.addListener(a, c)
        };
        this.removeEventListener = function(a, c) {
            H.removeListener(a, c)
        };
        var ma = A.style,
            Ga = g.style,
            Oa = O.style,
            Pa = X.style,
            Qa = ia.style,
            Ra = ha.style;
        Ga.width = "100%";
        Ga.height = "100%";
        Ga.position = "relative";
        Ga.left = "0px";
        Ga.top = "0px";
        Ga.textAlign = "left";
        ma.width = "100%";
        ma.height = "100%";
        ma.overflow = N;
        ma.position = "absolute";
        ma.top = "0px";
        ma.left = "0px";
        Oa.position = Pa.position = Qa.position = Ra.position = "absolute";
        Oa.top = Pa.top = "0px";
        Oa.left = Ra.left = "0px";
        Pa.right = Qa.right = "0px";
        Ra.bottom = Qa.bottom = "0px";
        Y.clickHandler = function(a, c, b, f) {
            F && b && (a = e.zoomPerClick, F.zoomBy(f ? 1 / a : a, F.pointFromPixel(c, l)), F.applyConstraints())
        };
        Y.pressHandler = function(a, c) {
            F && (za = c, Da = F.getCenter())
        };
        Y.dragHandler = function(a, c, b) {
            F && (e.constrainDuringPan ? (a = c.minus(za), a = F.deltaPointsFromPixels(a.negate(), l), F.panTo(Da.plus(a)), F.applyConstraints()) :
                F.panBy(F.deltaPointsFromPixels(b.negate(), l)))
        };
        Y.releaseHandler = function(a, c, b) {
            b && F && F.applyConstraints()
        };
        Y.scrollHandler = function(a, c, b) {
            F && (a = d.pow(e.zoomPerScroll, b), F.zoomBy(a, F.pointFromPixel(c, l)), F.applyConstraints())
        };
        Y.setTracking(l);
        ja.enterHandler = z;
        ja.exitHandler = E;
        ja.releaseHandler = function(a, c, b, e) {
            e || (Na = q, !Ea && r())
        };
        ja.setTracking(l);
        b.setTimeout(r, 1);
        g.appendChild(A);
        g.appendChild(O);
        g.appendChild(X);
        g.appendChild(ia);
        g.appendChild(ha);
        ra.innerHTML = x;
        ra.appendChild(g)
    }
})(window,
    document, Math);
var org;
if (org) {
    if ("object" != typeof org) {
        var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
        alert(orgExistsMessage);
        throw Error(orgExistsMessage);
    }
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) {
        var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
        alert(orgGigapanExistsMessage);
        throw Error(orgGigapanExistsMessage);
    }
} else org.gigapan = {};
if (org.gigapan.utils) {
    if ("object" != typeof org.gigapan.utils) {
        var orgGigapanUtilsExistsMessage = "Error: failed to create org.gigapan.utils namespace: org.gigapan.utils already exists and is not an object";
        alert(orgGigapanUtilsExistsMessage);
        throw Error(orgGigapanUtilsExistsMessage);
    }
} else org.gigapan.utils = {};
org.gigapan.utils.GigapanTiles = function() {
    return {
        getTileServerDomainName: function(b) {
            b = Math.floor(b / 1E3);
            return "tile" + (10 > b ? "0" : "") + b + ".gigapan.org"
        },
        getTilesPath: function(b, a) {
            return org.gigapan.utils.GigapanTiles.getTileServerDomainName(b) + ("/gigapans0/" + b + "/tiles" + (null == a ? "" : "." + a) + "/")
        }
    }
}();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.seadragon) {
    if ("object" != typeof org.gigapan.seadragon) {
        var orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object";
        alert(orgGigapanSeadragonExistsMessage);
        throw Error(orgGigapanSeadragonExistsMessage);
    }
} else org.gigapan.seadragon = {};
if (!window.Seadragon) {
    var noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.GigapanTileSource.js";
    alert(noSeadragonMsg);
    throw Error(noSeadragonMsg);
}
(function() {
    org.gigapan.seadragon.GigapanTileSource = function(b, a, d, r, j) {
        Seadragon.TileSource.call(this, r, j, 256, 0, 8);
        var u = "http://" + b + "/gigapans0/" + a + "/tiles",
            n = ["0", "1", "2", "3"];
        null != d && 0 < d.length && (u += "." + d);
        this.getTileUrl = function(a, b, d) {
            8 > a ? a = 0 : 8 <= a && (a -= 8);
            for (var j = "r", a = 1 << a >> 1; a;) j += n[(b & a ? 1 : 0) + (d & a ? 2 : 0)], a >>= 1;
            b = u;
            for (d = 0; d < j.length - 3;) b += "/" + j.substr(d, 3), d += 3;
            return b + "/" + j + ".jpg"
        };
        this.getTileBounds = function(a, b, d) {
            a = 1 / this.dimensions.times(this.getLevelScale(a)).x;
            return new Seadragon.Rect((0 ===
                b ? 0 : this.tileSize * b - this.tileOverlap) * a, (0 === d ? 0 : this.tileSize * d - this.tileOverlap) * a, (this.tileSize + (0 === b ? 1 : 2) * this.tileOverlap) * a, (this.tileSize + (0 === d ? 1 : 2) * this.tileOverlap) * a)
        };
        org.gigapan.seadragon.GigapanTileSource.prototype = new Seadragon.TileSource;
        org.gigapan.seadragon.GigapanTileSource.prototype.constructor = org.gigapan.seadragon.GigapanTileSource
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.seadragon) {
    if ("object" != typeof org.gigapan.seadragon) throw orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object", alert(orgGigapanSeadragonExistsMessage), Error(orgGigapanSeadragonExistsMessage);
} else org.gigapan.seadragon = {};
if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
(function() {
    org.gigapan.seadragon.SeadragonUtils = function() {};
    org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect = function(b, a, d, r, j) {
        b /= j;
        a /= j;
        return new Seadragon.Rect(b, a, d / j - b, r / j - a)
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect = function(b, a, d, r, j) {
        return {
            xmin: b * j,
            ymin: a * j,
            xmax: d * j,
            ymax: r * j
        }
    };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonPointToGigapanPoint = function(b, a) {
        return new Seadragon.Point(b.x * a, b.y * a)
    };
    org.gigapan.seadragon.SeadragonUtils.convertGigapanPointToSeadragonPoint =
        function(b, a, d) {
            return new Seadragon.Point(b / d, a / d)
        };
    org.gigapan.seadragon.SeadragonUtils.convertSeadragonViewerCoordsToSeadragonCoords = function(b, a) {
        return a.viewport.pointFromPixel(b)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonViewerCoords = function(b, a) {
        var d = Seadragon.Utils.getElementPosition(a.elmt);
        return b.minus(d)
    };
    org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonCoords = function(b, a) {
        var d = this.convertPageCoordsToSeadragonViewerCoords(b, a);
        return this.convertSeadragonViewerCoordsToSeadragonCoords(d,
            a)
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.events) {
    if ("object" != typeof org.gigapan.events) {
        var orgGigapanEventsExistsMessage = "Error: failed to create org.gigapan.events namespace: org.gigapan.events already exists and is not an object";
        alert(orgGigapanEventsExistsMessage);
        throw Error(orgGigapanEventsExistsMessage);
    }
} else org.gigapan.events = {};
(function() {
    org.gigapan.events.EventManager = function() {
        var b = {};
        this.addEventListener = function(a, d) {
            a && (d && "function" == typeof d) && (b[a] || (b[a] = []), b[a].push(d))
        };
        this.removeEventListener = function(a, d) {
            if (a && b[a] && d && "function" == typeof d)
                for (var r = 0; r < b[a].length; r++)
                    if (d == b[a][r]) {
                        b[a].splice(r, 1);
                        break
                    }
        };
        this.publishEvent = function(a, d) {
            if (a) {
                var r = b[a];
                if (r)
                    for (var j = 0; j < r.length; j++) try {
                        if ("function" === typeof d) d(r[j]);
                        else if ("undefined" === typeof d) r[j]();
                        else console.log("EVENTS_MANAGER.publishEvent(): unexpected argument [" +
                            d + "]")
                    } catch (u) {
                        console.log(u.name + " while publishing event '" + a + "': " + u.message, u)
                    }
            }
        }
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.multitouch) {
    if ("object" != typeof org.gigapan.multitouch) {
        var orgGigapanMultitouchExistsMessage = "Error: failed to create org.gigapan.multitouch namespace: org.gigapan.multitouch already exists and is not an object";
        alert(orgGigapanMultitouchExistsMessage);
        throw Error(orgGigapanMultitouchExistsMessage);
    }
} else org.gigapan.multitouch = {};
if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.multitouch.Touch.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
(function() {
    org.gigapan.multitouch.Touch = function(b) {
        var a = (new Date).getTime(),
            d = b.identifier,
            r = new Seadragon.Point(b.pageX, b.pageY),
            j = new Seadragon.Point(b.pageX, b.pageY),
            u = !0;
        this.update = function(a) {
            r.x = j.x;
            r.y = j.y;
            j.x = a.pageX;
            j.y = a.pageY
        };
        this.getIdentifier = function() {
            return d
        };
        this.getCurrentPoint = function() {
            return j
        };
        this.getPreviousPoint = function() {
            return r
        };
        this.getDeltaFromPrevious = function() {
            return r.minus(j)
        };
        this.getStartingTimestamp = function() {
            return a
        };
        this.flagThisTouchAsNotBeingTheOnlyOne =
            function() {
                u = !1
            };
        this.isThisTheOnlyTouch = function() {
            return u
        }
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.multitouch) {
    if ("object" != typeof org.gigapan.multitouch) throw orgGigapanMultitouchExistsMessage = "Error: failed to create org.gigapan.multitouch namespace: org.gigapan.multitouch already exists and is not an object", alert(orgGigapanMultitouchExistsMessage), Error(orgGigapanMultitouchExistsMessage);
} else org.gigapan.multitouch = {};
if (!org.gigapan.multitouch.Touch) {
    var noTouchMsg = "The org.gigapan.multitouch.Touch library is required by org.gigapan.multitouch.TouchManager.js";
    alert(noTouchMsg);
    throw Error(noTouchMsg);
}
if (!org.gigapan.events.EventManager) {
    var noEventManagerMsg = "The org.gigapan.events.EventManager library is required by org.gigapan.multitouch.TouchManager.js";
    alert(noEventManagerMsg);
    throw Error(noEventManagerMsg);
}
(function() {
    org.gigapan.multitouch.TouchManager = function() {
        var b = new org.gigapan.events.EventManager,
            a = 0,
            d = [],
            r = [],
            j = 1,
            u = null,
            n = !1,
            I = function(b) {
                var f = b.getIdentifier();
                d["t" + f] = b;
                a++;
                if (1 < a)
                    for (var h in d)(b = d[h]) && b.flagThisTouchAsNotBeingTheOnlyOne();
                n = !n && 1 == a
            },
            f = function(a) {
                if (a) {
                    console.log("registerTouch(" + a.identifier + ")");
                    var b = d["t" + a.identifier];
                    if (b) b.update(a);
                    else {
                        var f = "t" + a.identifier;
                        (b = r[f]) ? (delete r[f], I(b), n = !1) : I(new org.gigapan.multitouch.Touch(a))
                    }
                }
            },
            N = function(a) {
                n = !1;
                if (a) {
                    var b =
                        d["t" + a.identifier];
                    b ? b.update(a) : I(new org.gigapan.multitouch.Touch(a))
                }
            },
            s = function(e, f) {
                if (e) {
                    var h = d["t" + e.identifier];
                    if (h) {
                        var j = "t" + e.identifier;
                        f && (r[j] = d[j]);
                        delete d[j];
                        a--;
                        console.log("unregisterTouch(" + h.getIdentifier() + "): size=[" + a + "]");
                        if (0 == a && n && h.isThisTheOnlyTouch()) {
                            var m = (new Date).getTime() - h.getStartingTimestamp(),
                                h = h.getCurrentPoint(),
                                l = new Seadragon.Point(h.x, h.y);
                            b.publishEvent("tap", function(a) {
                                a(l, m)
                            })
                        }
                    }
                }
                n = !1
            },
            z = function() {
                var a = [],
                    b;
                for (b in d) a[a.length] = d[b];
                return a
            },
            D = function(a) {
                if (a) {
                    console.log("_onTouchStart(" + a + ")");
                    a.preventDefault();
                    for (var a = a.changedTouches, b = 0; b < a.length; b++) f(a.item(b))
                }
            };
        this.onTouchStart = D;
        this.onTouchStartMozilla = function(a) {
            a && (G(a), a.preventDefault(), f(a), x())
        };
        this.onTouchStartChrome = function(b) {
            b && (D(b), console.log("onTouchStartChrome(" + b + ") size=" + a), x())
        };
        var x = function() {
            if (2 == a) {
                j = 1;
                u = null;
                var b = z();
                if (b[0] && b[1]) {
                    var f = b[0].getCurrentPoint().distanceTo(b[1].getCurrentPoint());
                    b[0].distance = f;
                    b[1].distance = f;
                    b[0].scale =
                        1;
                    b[1].scale = 1
                }
            }
        };
        this.onTouchMove = function(b) {
            if (b) {
                b.preventDefault();
                n = !1;
                for (var b = b.changedTouches, f = 0; f < b.length; f++) N(b.item(f));
                1 == a && h(b.item(0).identifier)
            }
        };
        this.onTouchMoveMozilla = function(b) {
            if (b) {
                G(b);
                var f = d["t" + b.identifier];
                if ("undefined" !== typeof f && null != f && (f.getCurrentPoint().x != b.pageX || f.getCurrentPoint().y != b.pageY)) b.preventDefault(), n = !1, b.pageX = b.layerX, b.pageY = b.layerY, b.identifier = b.streamId, N(b), 1 == a ? h(b.identifier) : 2 == a && l()
            }
        };
        this.onTouchMoveChrome = function(b) {
            if (b) {
                b.preventDefault();
                n = !1;
                for (var b = b.changedTouches, f = 0; f < b.length; f++) N(b.item(f));
                1 == a ? h(b.item(0).identifier) : 2 == a ? l() : console.log("!!!!!!!!!!!!!!!onTouchMoveChrome(): size = " + a)
            }
        };
        var h = function(e) {
                if (1 == a && (e = d["t" + e])) {
                    var f = e.getDeltaFromPrevious();
                    b.publishEvent("pan", function(a) {
                        a(f)
                    })
                }
            },
            l = function() {
                if (2 == a) {
                    var b = z();
                    if (b[0] && b[1]) {
                        var f = b[0].distance,
                            d = b[0].getCurrentPoint().distanceTo(b[1].getCurrentPoint());
                        console.log("prev [" + f + "] new [" + d + "]");
                        f = d / f;
                        b[0].scale = f;
                        b[1].scale = f;
                        v(f)
                    } else console.log("AAAHHHH!!! theTouches.length=[" +
                        b.length + "]")
                }
            },
            G = function(a) {
                a && (a.pageX = a.layerX, a.pageY = a.layerY, a.identifier = a.streamId)
            },
            q = function(a) {
                if (a) {
                    var a = a.changedTouches,
                        b = 1 < a.length;
                    b && (n = !1);
                    for (var f = 0; f < a.length; f++) s(a.item(f), b)
                }
            };
        this.onTouchEndMozilla = function(a) {
            a && (G(a), s(a, !1))
        };
        this.onTouchEnd = function(a) {
            q(a)
        };
        this.onTouchCancel = function(a) {
            q(a)
        };
        this.onGestureStart = function(b) {
            b && (n = !1, b.preventDefault(), 2 == a && (j = 1, u = null))
        };
        this.onGestureChange = function(a) {
            a && (n = !1, a.preventDefault(), v(a.scale))
        };
        var v = function(f) {
            if (2 ==
                a) {
                var d = z();
                if (d[0] && d[1]) {
                    var h = Math.max(0.8, Math.min(1.2, 1 + f - j));
                    null == u && (u = d[0].getCurrentPoint().plus(d[1].getCurrentPoint()).divide(2));
                    b.publishEvent("pinch", function(a) {
                        a(h, d[0], d[1], u)
                    })
                }
                j = f
            }
        };
        this.onGestureEnd = function(b) {
            b && (n = !1, 2 == a && (j = 1, u = null))
        };
        this.addEventListener = b.addEventListener;
        this.removeEventListener = b.removeEventListener;
        this.publishEvent = b.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewers) {
    if ("object" != typeof org.gigapan.viewers) {
        var orgGigapanViewersExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
        alert(orgGigapanViewersExistsMessage);
        throw Error(orgGigapanViewersExistsMessage);
    }
} else org.gigapan.viewers = {};
if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
if (!org.gigapan.utils.GigapanTiles) {
    var noGigapanTilesMsg = "The org.gigapan.urils.GigapanTiles library is required by org.gigapan.viewers.AS3Viewer.js";
    alert(noGigapanTilesMsg);
    throw Error(noGigapanTilesMsg);
}
(function() {
    org.gigapan.viewers.SeadragonViewer = function(b, a, d) {
        function r() {
            S = (new Date).getTime();
            ya = Seadragon.Config.zoomPerSecond;
            la = !0;
            window.setTimeout(n, 10)
        }

        function j() {
            S = (new Date).getTime();
            ya = 1 / Seadragon.Config.zoomPerSecond;
            la = !0;
            window.setTimeout(n, 10)
        }

        function u() {
            la = !1
        }

        function n() {
            if (la && c.viewport) {
                var a = (new Date).getTime(),
                    b = Math.pow(ya, (a - S) / 1E3);
                c.viewport.zoomBy(b);
                c.viewport.applyConstraints();
                S = a;
                window.setTimeout(n, 10)
            }
        }

        function I() {
            c.viewport && (la = !1, c.viewport.zoomBy(Seadragon.Config.zoomPerClick /
                1), c.viewport.applyConstraints())
        }

        function f() {
            c.viewport && (la = !1, c.viewport.zoomBy(1 / Seadragon.Config.zoomPerClick), c.viewport.applyConstraints())
        }

        function N() {
            p.FooterControl.updateSize();
            M && p.SnapshotBrowser.updateSize()
        }

        function s() {
            var a = c.viewport.getCenter();
            fullScreenApi.supportsFullScreen && !isMobileDeviceUserAgent ? fullScreenApi.isFullScreen() ? (fa && !ca && z(!1), document.getElementById(b).style.height = K, document.getElementById(b).style.width = y, fullScreenApi.cancelFullScreen(document.getElementById(b),
                origWidth, origHeight), $("#take-snapshot-button").show()) : (origWidth = document.getElementById(b).style.width, origHeight = document.getElementById(b).style.height, fullScreenApi.requestFullScreen(document.getElementById(b)), $("#take-snapshot-button").hide(), fa && !ca && z(!0)) : c.isFullPage() ? (z(!1), c.setFullPage(!1), $("#take-snapshot-button").show()) : (c.setFullPage(!0), fa && !ca && (z(!0), $("#take-snapshot-button").hide()));
            window.setTimeout(function() {
                c.viewport.panTo(a)
            }, 1500)
        }

        function z(a) {
            a ? (p.GigapanWatermarkControl =
                new org.gigapan.viewer.GigapanWatermarkControl, c.addControl(p.GigapanWatermarkControl.getElement(), p.GigapanWatermarkControl.getSeadragonControlAnchor()), p.GigapanWatermarkControl.initialize()) : !ca && fa ? c.removeControl(p.GigapanWatermarkControl.getElement()) : ""
        }

        function D() {
            FB.ui({
                method: "feed",
                link: "http://www.gigapan.com/gigapans/" + ta,
                display: "popup"
            }, function() {})
        }

        function x() {
            window.open("http://twitter.com/intent/tweet?source=webclient&text=" + encodeURIComponent("http://www.gigapan.com/gigapans/" +
                ta), "Twitter", "height=400,width=500")
        }

        function h() {
            window.open("http://www.linkedin.com/cws/share?summary=" + gigapan.name + "&url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + ta) + "&title=" + gigapan.name, "LinkedIn", "height=400,width=500")
        }

        function l() {
            window.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + ta) + "&media=" + encodeURIComponent("http://api.gigapan.org/beta/gigapans/" + ta + "-600x400.jpg") + "&description=" + gigapan.name, "Pinterest",
                "height=400,width=500")
        }

        function G() {
            window.open("https://plus.google.com/share?url=" + encodeURIComponent("http://www.gigapan.com/gigapans/" + ta), "Google+", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500")
        }

        function q() {
            try {
                _gaq.push(["_trackEvent", "Viewer-Order-Print", this.href, document.location.pathname])
            } catch (c) {}
            parent !== window ? window.open("http://www.gigapan.com/gigapans/" + a.id + "/prints/new") : window.location = "/gigapans/" + a.id + "/prints/new"
        }

        function v() {
            Q && p.GigapanRelatedControl.isVisible() &&
                p.GigapanRelatedControl.toggleVisibility();
            R && R.isVisible() && R.setVisible(!1);
            p.SnapshotBrowser.toggleVisibility()
        }

        function e() {
            M && p.SnapshotBrowser.isVisible() && p.SnapshotBrowser.toggleVisibility();
            R && R.isVisible() && R.setVisible(!1);
            p.GigapanRelatedControl.toggleVisibility()
        }

        function k() {
            user && null != user && (!1 != user.logged_in || user.login && 0 < user.login.length) ? ($(".save-snapshot").unbind("click"), $(".cancel-snapshot").unbind("click"), $("#close-snapshot").unbind("click"), za || (R.setGigapanDimensions(a.width,
                a.height), M && p.SnapshotBrowser.isVisible() && p.SnapshotBrowser.toggleVisibility()), w(), za = !za) : showLoginWindow("takeSnapshot")
        }

        function w() {
            R.setVisible(!R.isVisible());
            R.isVisible() ? (jQuery("#close-snapshot").unbind("click"), jQuery("#close-snapshot").click(function() {
                    E()
                }), $("#snapshot_tool_dialog_window .save-snapshot").click(oa), $("#snapshot_tool_dialog_window .cancel-snapshot").click(E), M && p.SnapshotBrowser.isVisible() && p.SnapshotBrowser.toggleVisibility(), Q && p.GigapanRelatedControl.isVisible() &&
                p.GigapanRelatedControl.toggleVisibility()) : jQuery("#close-snapshot").unbind("click")
        }

        function oa() {
            var c = $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_name").val(),
                b = $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_description").val();
            if ("" != c && "" != b) {
                $("#saving_snapshot_spinner").css("display", "block");
                $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_name").val("");
                $("#snapshot_tool_dialog_window .snapshot_tool_dialog_form_field_description").val("");
                var f = R.getToolBoundsInGigapanCoords(),
                    e = f.getTopLeft(),
                    f = f.getBottomRight();
                $.ajax({
                    url: "/snapshots",
                    data: {
                        "snapshot[user_id]": user.id,
                        "snapshot[gigapan_id]": null == a.auth_key ? a.id : a.auth_key,
                        "snapshot[name]": c,
                        "snapshot[description]": b,
                        "snapshot[xmin]": e.x,
                        "snapshot[ymin]": e.y,
                        "snapshot[xmax]": f.x,
                        "snapshot[ymax]": f.y
                    },
                    type: "POST",
                    dataType: "json",
                    timeout: 15E3
                }).success(function() {
                    $(".save-snapshot").unbind("click");
                    $(".cancel-snapshot").unbind("click");
                    $("#close-snapshot").unbind("click")
                }).error(function() {
                    alert("Error creating snapshot")
                }).always(function() {
                    $("#loading_spinner").css("display",
                        "none");
                    w();
                    window.setTimeout(function() {
                        m();
                        v()
                    }, 100)
                })
            } else alert("Please add a Name and description for your snapshot.")
        }

        function m() {
            c.removeControl(p.SnapshotBrowser.getElement());
            p.SnapshotBrowser = new org.gigapan.viewer.SnapshotBrowser(b);
            c.addControl(p.SnapshotBrowser.getElement(), p.SnapshotBrowser.getSeadragonControlAnchor());
            p.SnapshotBrowser.initialize();
            p.SnapshotBrowser.addSnapshots(a.id, a.auth_key);
            p.SnapshotBrowser.addEventListener("take-snapshot-button-click", k)
        }

        function E() {
            $(".save-snapshot").unbind("click");
            $(".cancel-snapshot").unbind("click");
            $("#close-snapshot").unbind("click");
            w();
            za = !za
        }
        var y = "100%",
            K = "400",
            O, c = null,
            P = !1,
            A = new org.gigapan.multitouch.TouchManager,
            V = org.gigapan.seadragon.SeadragonUtils,
            ea = null,
            H = null,
            T = isMobileDeviceUserAgent && !0,
            W = !isMobileDeviceUserAgent && !0,
            ca = !0,
            fa = !1,
            ga = !1,
            pa = !0,
            t = !1,
            M = !1,
            ha = !1,
            ia = !0,
            X = !0,
            Q = !0,
            C = !0,
            Y = !0,
            ja = !1,
            F = !1,
            R = null,
            ta = "",
            La = !1;
        "undefined" != typeof a.is_private && (La = a.is_private);
        "undefined" != typeof a.printable && (F = a.printable);
        "undefined" != typeof a.snapshottable &&
            (ia = a.snapshottable);
        "undefined" != typeof a.related && (related = a.related);
        ta = null == a.auth_key ? a.id : a.auth_key;
        "undefined" != typeof a.options && ("undefined" != typeof a.options.showGigapanWatermarkOnFullscreen && (fa = a.options.showGigapanWatermarkOnFullscreen ? !0 : !1), "undefined" != typeof a.options.showGigapanWatermarkByDefault && (ca = a.options.showGigapanWatermarkByDefault ? !0 : !1), "undefined" != typeof a.options.showPrintButton && (ga = a.options.showPrintButton ? !0 : !1), "undefined" != typeof a.options.showResetButton &&
            (pa = a.options.showResetButton ? !0 : !1), "undefined" != typeof a.options.showFullScreenButton && (t = a.options.showFullScreenButton ? !0 : !1), "undefined" != typeof a.options.showSnapshotBrowser && (M = a.options.showSnapshotBrowser ? !0 : !1), "undefined" != typeof a.options.showSnapshotByDefault && (ha = a.options.showSnapshotByDefault ? !0 : !1), "undefined" != typeof a.options.showRelatedGigapans && (Q = a.options.showRelatedGigapans ? !0 : !1), "undefined" != typeof a.options.showThumbnailNavigation && (Y = a.options.showThumbnailNavigation ? !0 :
                !1), "undefined" != typeof a.options.showNavigationControl && (C = a.options.showNavigationControl ? !0 : !1), "undefined" != typeof a.options.showSocialSharing && (ja = a.options.showSocialSharing ? !0 : !1), "undefined" != typeof a.options.canCommentOnSnapshots && (X = a.options.canCommentOnSnapshots ? !0 : !1));
        var p = {},
            la = !1,
            ya = null,
            S = null,
            Ba;
        $(window).resize(function() {
            clearTimeout(Ba);
            Ba = setTimeout(N, 100)
        });
        document.onkeydown = function(a) {
            a = a || window.event;
            if (!$("#comment_comment").is(":focus") && !$(".snapshot_tool_dialog_form_field_name").is(":focus") &&
                !$(".snapshot_tool_dialog_form_field_description").is(":focus")) switch (a.keyCode) {
                case 107:
                case 187:
                    I();
                    break;
                case 109:
                case 189:
                    f();
                    break;
                case 37:
                    c.viewport && (c.viewport.panBy(new Seadragon.Point(-0.025, 0)), c.viewport.applyConstraints());
                    break;
                case 38:
                    c.viewport && (c.viewport.panBy(new Seadragon.Point(0, -0.025)), c.viewport.applyConstraints());
                    break;
                case 39:
                    c.viewport && (c.viewport.panBy(new Seadragon.Point(0.025, 0)), c.viewport.applyConstraints());
                    break;
                case 40:
                    c.viewport && (c.viewport.panBy(new Seadragon.Point(0,
                        0.025)), c.viewport.applyConstraints())
            }
        };

        // Expose viewport to gigapan-emu.html so we get pan and zoom functions
        this.getViewport = function() {
            return c ? c.viewport : null;
        }

        this.setViewBounds = function(b, f, e, d, h) {
            var k = c.viewport.getBounds(),
                m = c.viewport.getHomeBounds(),
                t = org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(f, e, d, h, a.width),
                f = !1;
            k.x < t.x && (k.y < t.y && k.x + k.width > t.x + t.width && k.y + k.height > t.y + t.height) && (f = !0);
            k.equals(m) || k.equals(t) || f ? c.viewport.fitBounds(t) : (c.viewport.fitBounds(m, !1), window.setTimeout(function() {
                c.viewport.fitBounds(t)
            }, 1E3 * Seadragon.Config.animationTime));
            if ("undefined" != typeof window[b]) return window[b]()
        };
        this.showNavigationControls = function() {
            c.addControl(p.GigapanNavigationControl.getElement(), p.GigapanNavigationControl.getSeadragonControlAnchor())
        };
        this.hideNavigationControls = function() {
            c.removeControl(p.GigapanNavigationControl.getElement())
        };
        this.addHotspot = function(b, f, e, d) {
            var h = document.createElement("div"),
                e = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(e.xmin, e.ymin, e.xmax, e.ymax, a.width);
            h.id = b;
            h.className = f;
            "undefined" != typeof d && (h.onclick = d.click, h.onmousedown =
                d.mousedown, h.ontouchstart = d.touchstart);
            c.drawer.addOverlay(h, e)
        };
        this.showSnapInclusion = function(b, f, e, d, h) {
            var k = document.createElement("div"),
                f = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(f, e, d, h, a.width);
            k.id = "overlay_" + b;
            k.className = "overlay";
            c.drawer.addOverlay(k, f)
        };
        this.hideSnapInclusion = function(a) {
            a = document.getElementById("overlay_" + a);
            c.drawer.removeOverlay(a)
        };
        var za = !1;
        this.takeSnapshotFromLogin = function() {
            k()
        };
        this.deleteSnapshot = function(a) {
            $.ajax({
                url: "/snapshots/" +
                    a,
                data: {
                    id: a
                },
                type: "DELETE",
                dataType: "json",
                timeout: 15E3
            }).success(function() {
                alert("Snapshot successfully deleted.")
            }).error(function() {
                alert("Error deleting snapshot")
            }).always(function() {
                m();
                v()
            })
        };
        this.getViewBounds = function(b) {
            var f = c.viewport.getBounds(),
                f = new org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(f.x, f.y, f.x + f.width, f.y + f.height, a.width);
            return window[b](f.xmin, f.ymin, f.xmax, f.ymax)
        };
        this.zoomToFillContainer = function() {
            var b = V.convertGigapanRectToSeadragonRect(0,
                    0, a.width, a.height, a.width),
                f = c.viewport.pixelFromPoint(b.getTopLeft()),
                e = c.viewport.pixelFromPoint(b.getBottomRight()),
                b = new Seadragon.Rect(0, 0),
                d = c.viewport.getContainerSize(),
                b = new Seadragon.Point(Math.max(f.x, b.x), Math.max(f.y, b.y)),
                e = new Seadragon.Point(Math.min(e.x, d.x), Math.min(e.y, d.y)),
                d = f = null;
            e.x > b.x && e.y > b.y && (b = new Seadragon.Rect(b.x, b.y, e.x - b.x, e.y - b.y), f = b.getCenter(), b.width > b.height ? (b = 0.8 * b.height, d = new Seadragon.Point(1.5 * b, b)) : (b = 0.8 * b.width, d = new Seadragon.Point(b, 2 / 3 * b)));
            b =
                c.viewport.deltaPointsFromPixels(d);
            e = b.divide(2);
            f = c.viewport.pointFromPixel(f).minus(e);
            f = new Seadragon.Rect(f.x, f.y, b.x, b.y);
            c.viewport.fitBounds(f, !1)
        };
        A.addEventListener("tap", function(a) {
            if (c.isOpen() && c.viewport) {
                var b = Seadragon.Utils.getElementPosition(c.elmt),
                    a = a.minus(b);
                V.convertPageCoordsToSeadragonCoords(a, c)
            }
        });
        A.addEventListener("pan", function(a) {
            c.isOpen() && c.viewport && (a = c.viewport.deltaPointsFromPixels(a), c.viewport.panBy(a), c.viewport.applyConstraints())
        });
        A.addEventListener("pinch",
            function(a, b, f, e) {
                c.isOpen() && c.viewport && (b = V.convertPageCoordsToSeadragonCoords(e, c), c.viewport.zoomBy(a, b), c.viewport.applyConstraints())
            });
        "undefined" != typeof a.viewport && (ea = new org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(a.viewport.xmin, a.viewport.ymin, a.viewport.xmax, a.viewport.ymax, a.width));
        "undefined" != typeof a.embed && ("undefined" != typeof a.embed.width && (y = a.embed.width), "undefined" != typeof a.embed.height && (K = a.embed.height));
        O = org.gigapan.utils.GigapanTiles.getTileServerDomainName(a.id);
        O = new org.gigapan.seadragon.GigapanTileSource(O, a.id, a.auth_key, a.width, a.height);
        Seadragon.Config.visibilityRatio = 0.5;
        Seadragon.Config.minZoomImageRatio = 0.5;
        Seadragon.Config.autoHideControls = !1;
        Seadragon.Config.imagePath = "/embed_api/img/";
        Seadragon.Config.zoomPerScroll = 1.075;
        Seadragon.Config.animationTime = 2;
        c = new Seadragon.Viewer(b);
        c.addEventListener("open", function() {
            var a = c.drawer.elmt;
            if (!P && (H = c.viewport.getCenter(), P = !0, -1 != navigator.userAgent.indexOf("Chrome") && -1 != navigator.userAgent.indexOf("Android") ?
                    (Seadragon.Utils.addEvent(a, "touchstart", A.onTouchStartChrome), Seadragon.Utils.addEvent(a, "touchmove", A.onTouchMoveChrome), Seadragon.Utils.addEvent(a, "touchend", A.onTouchEnd), Seadragon.Utils.addEvent(a, "touchcancel", A.onTouchEnd)) : (Seadragon.Utils.addEvent(a, "MozTouchDown", A.onTouchStartMozilla), Seadragon.Utils.addEvent(a, "MozTouchMove", A.onTouchMoveMozilla), Seadragon.Utils.addEvent(a, "MozTouchUp", A.onTouchEndMozilla), Seadragon.Utils.addEvent(a, "touchstart", A.onTouchStart), Seadragon.Utils.addEvent(a,
                        "touchmove", A.onTouchMove), Seadragon.Utils.addEvent(a, "touchend", A.onTouchEnd), Seadragon.Utils.addEvent(a, "touchcancel", A.onTouchCancel), Seadragon.Utils.addEvent(a, "gesturestart", A.onGestureStart), Seadragon.Utils.addEvent(a, "gesturechange", A.onGestureChange), Seadragon.Utils.addEvent(a, "gestureend", A.onGestureEnd)), null != ea && c.viewport.fitBounds(ea, !0), ga && F && p.FooterControl.addEventListener("buy-print-click", q), ja && (p.FooterControl.addEventListener("show-share-button-click", p.FooterControl.toggleSocial),
                        p.FooterControl.addEventListener("post-to-facebook-click", D), p.FooterControl.addEventListener("post-to-twitter-click", x), p.FooterControl.addEventListener("post-to-linkedin-click", h), p.FooterControl.addEventListener("post-to-pinterest-click", l), p.FooterControl.addEventListener("post-to-gplus-click", G)), M && (p.FooterControl.addEventListener("show-snapshots-button-click", v), ia ? p.SnapshotBrowser.addEventListener("take-snapshot-button-click", k) : $("#take-snapshot-button").remove()), Q && p.FooterControl.addEventListener("show-explore-button-click",
                        e), C && (T && (p.GigapanMobileNavigationControl.addEventListener("zoom-plus-click", I), p.GigapanMobileNavigationControl.addEventListener("zoom-plus-mousedown", r), p.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseup", u), p.GigapanMobileNavigationControl.addEventListener("zoom-plus-mouseout", u), p.GigapanMobileNavigationControl.addEventListener("zoom-minus-click", f), p.GigapanMobileNavigationControl.addEventListener("zoom-minus-mousedown", j), p.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseup",
                        u), p.GigapanMobileNavigationControl.addEventListener("zoom-minus-mouseout", u), pa && p.GigapanMobileNavigationControl.addEventListener("view-all-click", function() {
                        c.viewport.goHome()
                    }), t && p.GigapanMobileNavigationControl.addEventListener("full-screen-click", s)), W && (p.GigapanNavigationControl.addEventListener("zoom-plus-click", I), p.GigapanNavigationControl.addEventListener("zoom-plus-mousedown", r), p.GigapanNavigationControl.addEventListener("zoom-plus-mouseup", u), p.GigapanNavigationControl.addEventListener("zoom-plus-mouseout",
                        u), p.GigapanNavigationControl.addEventListener("zoom-minus-click", f), p.GigapanNavigationControl.addEventListener("zoom-minus-mousedown", j), p.GigapanNavigationControl.addEventListener("zoom-minus-mouseup", u), p.GigapanNavigationControl.addEventListener("zoom-minus-mouseout", u), pa && p.GigapanNavigationControl.addEventListener("view-all-click", function() {
                        c.viewport.goHome()
                    }), t && p.GigapanNavigationControl.addEventListener("full-screen-click", s))), ha && ia && (v(), window.setTimeout(v, 2E3)), "undefined" != window[d])) return window[d]()
        });
        c.addEventListener("resize", function() {
            if (isMobileDeviceUserAgent) {
                var b = c.viewport.getBounds();
                new org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(b.x, b.y, b.x + b.width, b.y + b.height, a.width);
                c.viewport.panTo(H)
            }
            fullScreenApi.supportsFullScreen && (!isMobileDeviceUserAgent && !fullScreenApi.isFullScreen()) && (fa && !ca) && (z(!1), $("#take-snapshot-button").show())
        });
        c.addEventListener("animationfinish", function() {
            H = c.viewport.getCenter()
        });
        c.addEventListener("animation", function() {
            if (c &&
                c.viewport && c.isOpen() && Y) {
                var a = c.viewport.getBounds(!0);
                p.ThumbnailNavigationControl.updateCurrentViewOutline(a)
            }
        });
        c.setDashboardEnabled(!1);
        c.openTileSource(O);
        "undefined" != typeof a.events && "undefined" != typeof a.events.animation && c.addEventListener("animation", a.events.animation);
        p.FooterControl = new org.gigapan.viewer.FooterControl({
            showPrintButton: ga && F,
            showSnapshotsButton: M,
            showShareButton: ja,
            autoExpandSocial: !1,
            showExploreButton: Q
        });
        M && (p.SnapshotBrowser = new org.gigapan.viewer.SnapshotBrowser(b,
            X), p.SnapshotBrowser.addSnapshots(a.id, a.auth_key), R = new org.gigapan.viewer.SnapshotTool("snapshot_tool_dialog_window_template", "dialog_title_bar", c, 1.5));
        C && (X = {
            showViewAllButton: pa,
            showFullScreenButton: t
        }, W && (p.GigapanNavigationControl = new org.gigapan.viewer.GigapanNavigationControl(X)), T && (p.GigapanMobileNavigationControl = new org.gigapan.viewer.GigapanMobileNavigationControl(X)));
        ca && (p.GigapanWatermarkControl = new org.gigapan.viewer.GigapanWatermarkControl({
            id: !1 == La ? a.id : a.auth_key
        }));
        Q && (p.GigapanRelatedControl =
            new org.gigapan.viewer.GigapanRelatedControl(related));
        Y && (p.ThumbnailNavigationControl = new org.gigapan.viewer.ThumbnailNavigationControl({
            id: a.id,
            width: a.width,
            height: a.height
        }));
        for (key in p) c.addControl(p[key].getElement(), p[key].getSeadragonControlAnchor());
        for (key in p) p[key].initialize();
        setTimeout(this.zoomToFillContainer, 10)
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) {
        var orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object";
        alert(orgGigapanViewerExistsMessage);
        throw Error(orgGigapanViewerExistsMessage);
    }
} else org.gigapan.viewer = {};
(function() {
    org.gigapan.viewer.GigapanWatermarkControl = function(b) {
        var a = Seadragon.ControlAnchor.BOTTOM_RIGHT,
            d = "http://www.gigapan.com",
            r = "/images/viewer/GigaPanLogo.png",
            j = "GigaPan - See More",
            u = document.createElement("div");
        u.id = "gigapan-watermark";
        this.getSeadragonControlAnchor = function() {
            return a
        };
        this.getElement = function() {
            return u
        };
        this.initialize = function() {
            b && ("undefined" != typeof b.logoPath && "undefined" != typeof b.baseUrl && null != b.logoPath && null != b.baseUrl ? (j = b.baseUrl, r = b.logoPath, d = b.baseUrl) :
                ("undefined" != typeof b.baseUrl && (d = b.baseUrl), "undefined" == typeof b.auth_key && "undefined" != b.id && (d += "/gigapans/" + b.id)));
            u.innerHTML = '<a href="' + d + '" target="_blank"><img alt="' + j + '" title="' + j + '" src="' + r + '"></a>'
        }
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function() {
    org.gigapan.viewer.GigapanNavigationControl = function(b) {
        function a(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            d.publishEvent(b)
        }
        var d = new org.gigapan.events.EventManager,
            r = !0,
            j = !0,
            u = Seadragon.ControlAnchor.NONE,
            n = document.createElement("div");
        n.id = "gigapan-navigation";
        b && ("undefined" != typeof b.showViewAllButton && (r = b.showViewAllButton ? !0 : !1), "undefined" != typeof b.showFullScreenButton && (j = b.showFullScreenButton ?
            !0 : !1));
        this.getSeadragonControlAnchor = function() {
            return u
        };
        this.getElement = function() {
            return n
        };
        this.initialize = function() {
            n.innerHTML = '<div id="zoom-plus-button" class="zoom-plus-button navigation-element"></div><div id="zoom-minus-button" class="zoom-minus-button navigation-element"></div>';
            r ? n.innerHTML += '<div id="view-all-button" class="view-all-button navigation-element"></div>' : "";
            j ? n.innerHTML += '<div id="full-screen-button" class="full-screen-button navigation-element"></div>' : "";
            document.getElementById("zoom-plus-button").onclick =
                function(b) {
                    a(b, "zoom-plus-click")
                };
            document.getElementById("zoom-plus-button").onmousedown = function(b) {
                a(b, "zoom-plus-mousedown")
            };
            document.getElementById("zoom-plus-button").onmouseout = function(b) {
                a(b, "zoom-plus-mouseout")
            };
            document.getElementById("zoom-plus-button").onmouseup = function(b) {
                a(b, "zoom-plus-mouseup")
            };
            document.getElementById("zoom-minus-button").onclick = function(b) {
                a(b, "zoom-minus-click")
            };
            document.getElementById("zoom-minus-button").onmousedown = function(b) {
                a(b, "zoom-minus-mousedown")
            };
            document.getElementById("zoom-minus-button").onmouseup = function(b) {
                a(b, "zoom-minus-mouseup")
            };
            document.getElementById("zoom-minus-button").onmouseout = function(b) {
                a(b, "zoom-minus-mouseout")
            };
            document.onmousemove = function(a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("slider-handle-mousemove", function(b) {
                    b(a)
                })
            };
            document.onmouseup = function(a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ?
                    (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("slider-handle-mouseup", function(b) {
                    b(a)
                })
            };
            r && (document.getElementById("view-all-button").onclick = function(a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("view-all-click", function(b) {
                    b(a)
                })
            });
            j && (document.getElementById("full-screen-button").onclick = function(a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ?
                    (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                d.publishEvent("full-screen-click", function(b) {
                    b(a)
                })
            });
            jQuery("#gigapan-navigation").parent().css("height", "0px");
            var b = 50;
            $(".navigation-element").each(function() {
                b += $(this).height()
            });
            jQuery("#gigapan-navigation").css("height", b + "px");
            j || $("#view-all-button").css("top", parseFloat($("#view-all-button").css("top")) - 25 + "px")
        };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent =
            d.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function() {
    org.gigapan.viewer.GigapanMobileNavigationControl = function(b) {
        function a(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            d.publishEvent(b)
        }
        var d = new org.gigapan.events.EventManager,
            r = !0,
            j = !0,
            u = Seadragon.ControlAnchor.TOP_RIGHT,
            n = document.createElement("div");
        n.id = "gigapan-mobile-navigation";
        b && ("undefined" != typeof b.showViewAllButton && (r = b.showViewAllButton ? !0 : !1), "undefined" != typeof b.showFullScreenButton &&
            (j = b.showFullScreenButton ? !0 : !1));
        this.getSeadragonControlAnchor = function() {
            return u
        };
        this.getElement = function() {
            return n
        };
        this.initialize = function() {
            n.innerHTML = '<div id="mobile-zoom-plus-button" class="mobile-zoom-plus-button"><span class="clickable-nav-item"></span></div><div id="mobile-zoom-minus-button" class="mobile-zoom-minus-button"><span class="clickable-nav-item"></span></div>';
            j ? n.innerHTML += '<div id="mobile-full-screen-button" class="mobile-full-screen-button"><span class="clickable-nav-item"></span></div>' :
                "";
            r ? n.innerHTML += '<div id="mobile-view-all-button" class="mobile-view-all-button"><span class="clickable-nav-item"></span></div>' : "";
            document.getElementById("mobile-zoom-plus-button").onclick = function(b) {
                a(b, "zoom-plus-click")
            };
            document.getElementById("mobile-zoom-plus-button").onmousedown = function(b) {
                a(b, "zoom-plus-mousedown")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseout = function(b) {
                a(b, "zoom-plus-mouseout")
            };
            document.getElementById("mobile-zoom-plus-button").onmouseup = function(b) {
                a(b,
                    "zoom-plus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onclick = function(b) {
                a(b, "zoom-minus-click")
            };
            document.getElementById("mobile-zoom-minus-button").onmousedown = function(b) {
                a(b, "zoom-minus-mousedown")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseup = function(b) {
                a(b, "zoom-minus-mouseup")
            };
            document.getElementById("mobile-zoom-minus-button").onmouseout = function(b) {
                a(b, "zoom-minus-mouseout")
            };
            r && (document.getElementById("mobile-view-all-button").onclick = function(b) {
                a(b,
                    "view-all-click")
            });
            j && (document.getElementById("mobile-full-screen-button").onclick = function(b) {
                a(b, "full-screen-click")
            });
            var b = 0;
            $("#gigapan-mobile-navigation div").each(function() {
                b += $(this).height()
            });
            jQuery("#gigapan-mobile-navigation").css("height", b + "px");
            j || $("#view-all-button").css("top", parseFloat($("#view-all-button").css("top")) - 28 + "px")
        };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent = d.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
if (!window.$) {
    var nojQueryMsg = "The jQuery library is required by org.gigapan.viewer.ControlPanel.js";
    alert(nojQueryMsg);
    throw Error(nojQueryMsg);
}
(function() {
    var b = window.$;
    org.gigapan.viewer.FooterControl = function(a) {
        function d(a, b) {
            a = a || window.event;
            "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            r.publishEvent(b)
        }
        var r = new org.gigapan.events.EventManager,
            j = Seadragon.ControlAnchor.NONE,
            u = !0,
            n = !0,
            I = !0,
            f = !1,
            N = !0,
            s = document.createElement("div");
        s.id = "footer-panel";
        s.className = "footer-panel";
        a && ("undefined" != typeof a.showPrintButton && (u = a.showPrintButton ? !0 : !1), "undefined" != typeof a.showSnapshotsButton &&
            (n = a.showSnapshotsButton ? !0 : !1), "undefined" != typeof a.showShareButton && (I = a.showShareButton ? !0 : !1), "undefined" != typeof a.showExploreButton && (N = a.showExploreButton ? !0 : !1));
        var a = '<div id="social-container"><div id="gp-facebook" class="social-button" title="Post to Facebook"></div><div id="gp-twitter" class="social-button" title="Tweet"></div><div id="gp-gplus" class="social-button" title="Share on Google+"></div><div id="gp-linkedin" class="social-button" title="Share on LinkedIn"></div><div id="gp-pinterest" class="social-button" title="Pin it!"></div></div>',
            z = "";
        n && (z += '<div id="show-snapshots-button" class="footer-panel-button show-snapshots-button-on" title="Snapshots"></div>');
        u && (z += '<div id="buy-print-button" class="footer-panel-button buy-print-button-on" title="Buy a Print"></div>');
        N && (z += '<div id="show-explore-button" class="footer-panel-action-button explore-button" title="Explore More"></div>');
        I && (z += '<div id="show-share-button" class="footer-panel-button share-button" title="Share this Gigapan"></div>' + a);
        b(s).html(z);
        this.getElement = function() {
            return s
        };
        this.getSeadragonControlAnchor = function() {
            return j
        };
        this.initialize = function() {
            u && (document.getElementById("buy-print-button").onclick = function(a) {
                d(a, "buy-print-click")
            });
            n && (document.getElementById("show-snapshots-button").onclick = function(a) {
                d(a, "show-snapshots-button-click")
            });
            N && (document.getElementById("show-explore-button").onclick = function(a) {
                d(a, "show-explore-button-click")
            });
            I && (document.getElementById("show-share-button").onclick = function(a) {
                    d(a, "show-share-button-click")
                }, document.getElementById("gp-facebook").onclick =
                function(a) {
                    d(a, "post-to-facebook-click")
                }, document.getElementById("gp-twitter").onclick = function(a) {
                    d(a, "post-to-twitter-click")
                }, document.getElementById("gp-linkedin").onclick = function(a) {
                    d(a, "post-to-linkedin-click")
                }, document.getElementById("gp-pinterest").onclick = function(a) {
                    d(a, "post-to-pinterest-click")
                }, document.getElementById("gp-gplus").onclick = function(a) {
                    d(a, "post-to-gplus-click")
                }, x());
            D();
            $("#footer-panel").parent().css("height", "0px")
        };
        this.isVisible = function() {
            return !0
        };
        this.toggleSocial =
            function() {
                f ? $("#social-container").css("display", "none") : $("#social-container").css("display", "block");
                f = !f;
                setTimeout(x, 100)
            };
        this.toggleVisibility = function() {
            b(s).animate({
                bottom: "-44px"
            }, 500);
            isControlPanelVisible = !isControlPanelVisible
        };
        var D = function() {
                b(s).width(b(window).width());
                x()
            },
            x = function() {
                if (I) {
                    var a = 0;
                    $(".footer-panel-button").each(function() {
                        a += $(this).width()
                    });
                    $(".footer-panel-action-button").each(function() {
                        a += $(this).width()
                    });
                    b("#social-container").css("left", a + "px");
                    b("#gplus div").css({
                        "padding-left": "13px",
                        "padding-top": "17px"
                    })
                }
            };
        this.handleOrientationChange = function() {
            D();
            x()
        };
        this.updateSize = function() {
            D()
        };
        this.addEventListener = r.addEventListener;
        this.removeEventListener = r.removeEventListener;
        this.publishEvent = r.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
if (!window.$) throw nojQueryMsg = "The jQuery library is required by org.gigapan.viewer.SnapshotBrowser.js", alert(nojQueryMsg), Error(nojQueryMsg);
(function() {
    var b = window.$;
    b.ajaxSetup({
        type: "GET",
        dataType: "jsonp",
        timeout: 3E4,
        cache: !1,
        global: !1
    });
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone OS/i.test(navigator.userAgent);
    var a = 102,
        d = 5,
        r = !1,
        j = 0;
    org.gigapan.viewer.SnapshotBrowser = function(u, n) {
        function I(a) {
            return a.replace(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(a) {
                return '<a href="' + a + '" target="_blank" class="snapshot_comment_link">' + a + "</a>"
            })
        }

        function f(a) {
            a = a || window.event;
            "function" === typeof a.preventDefault ?
                (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            var c = a.currentTarget ? a.currentTarget : a.srcElement;
            null == a || null == c ? K = selectedSnapshot : (c = c.id, c = c.slice(c.lastIndexOf("_") + 1, c.length), K = m[c]);
            "touchstart" == a.type && (W = window.setTimeout(function() {
                s(K)
            }, 1E3));
            "touchend" == a.type && (window.clearTimeout(W), N(K));
            "click" == a.type && (N(K), b(".snapshot").each(function() {
                $(this).removeClass("selected")
            }), b(a.currentTarget).addClass("selected"));
            "mouseover" == a.type && s(K);
            "mouseout" ==
            a.type && (b(".overlay").each(function() {
                var a = $(this).attr("id"),
                    a = a.slice(a.lastIndexOf("_") + 1, a.length);
                SDViewer.viewer.hideSnapInclusion(a)
            }), y || h());
            return !1
        }

        function N(a) {
            !0 == user.logged_in && null == user.login && (O || (O = !0, $.ajax({
                url: "/sessions/whoami",
                type: "GET",
                async: !0,
                dataType: "json",
                timeout: 2E4
            }).done(function(a) {
                user = a.user;
                O = !1
            })));
            selectedSnapshot = a;
            $(".bx-viewport").css("height", "62px");
            var b = 0.1 * (a.bounds.ymax - a.bounds.ymin);
            SDViewer.viewer.setViewBounds(null, a.bounds.xmin - b, a.bounds.ymin -
                b, a.bounds.xmax + b, a.bounds.ymax + b);
            y ? x(a) : y = !0;
            b = document.getElementById("snapshot-info-overlay");
            b || (b = document.createElement("div"), b.id = "snapshot-info-overlay", document.getElementById(P.id).parentNode.appendChild(b), b.style.display = "block");
            b.innerHTML = "";
            var e = document.createElement("div");
            e.className = "close_button";
            e.onclick = function() {
                y = !1;
                h()
            };
            var f = document.createElement("div");
            f.id = "snapshot_comments_container";
            var d = document.createElement("div");
            d.id = "snapshots_description";
            d.className =
                "snapshots_description";
            d.innerHTML = I(a.description);
            f.appendChild(d);
            if (null != a.comment_set)
                for (d = 0; d < a.comment_set.available; d++) {
                    var k = a.comment_set.items[d];
                    if (k) {
                        var j = k[0],
                            n = k[1],
                            k = document.createElement("div");
                        k.className = "snap_comment";
                        k.innerHTML = I(n.message);
                        var q = "",
                            q = "<br> by: <a class='white_link' href='/profiles/" + n.user.username + "'>" + n.user.username + "</a>";
                        k.innerHTML += q;
                        if (user.id == n.user.id || gigapan.gigapan.user_id == user.id) n = document.createElement("a"), n.id = "delete_snapshot_comment_" +
                            j, n.className = "delete_snapshot_comments_button", n.innerHTML = "delete", n.onclick = function() {
                                l(this.id);
                                return !1
                            }, k.appendChild(n);
                        f.appendChild(k)
                    }
                } else d = document.createElement("div"), d.className = "no_snapshot_comments", d.id = "no_snapshot_comments", d.innerHTML = "No Comments", f.appendChild(d);
            b.appendChild(e);
            b.appendChild(f);
            c ? (e = document.createElement("div"), e.id = "add_snapshot_comments_container", e.className = "add_snapshot_comments_container", user && null != user && (!1 != user.logged_in || user.login && 0 < user.login.length) ?
                (f = document.createElement("form"), f.id = "add-snapshot-comment-form", f.className = "add-snapshot-comment-form", f.action = "/comments", d = document.createElement("textarea"), d.id = "comment_comment", d.name = "comment[comment]", j = document.createElement("button"), j.id = "add_snapshot_comments_button", j.className = "add_snapshot_comments_button", j.innerHTML = "", j.onclick = function() {
                        5 > $("#comment_comment").val().length ? alert("Comments must be at least 5 characters long") : ($("#saving_comment_spinner").css("display", "block"),
                            $.ajax({
                                url: "/comments",
                                data: $("#add-snapshot-comment-form").serialize(),
                                type: "POST",
                                dataType: "json",
                                timeout: 25E3
                            }).success(function(a) {
                                var b = [];
                                b[0] = a.comment.id;
                                b[1] = {
                                    id: a.comment.id,
                                    message: a.comment.comment,
                                    user: {
                                        id: a.comment.user_id,
                                        login: user.login,
                                        username: user.login
                                    }
                                };
                                m[a.comment.commentable_id].comment_set && m[a.comment.commentable_id].comment_set.items ? (m[a.comment.commentable_id].comment_set.items.unshift(b), m[a.comment.commentable_id].comment_set.available += 1) : (m[a.comment.commentable_id].comment_set = {}, m[a.comment.commentable_id].comment_set.items = [], m[a.comment.commentable_id].comment_set.items.push(b), m[a.comment.commentable_id].comment_set.available = 1, (b = document.getElementById("no_snapshot_comments")) && b.parentNode.removeChild(b), $("#snapshot_" + a.comment.commentable_id).before('<span class="has_comments"></span>'));
                                b = document.createElement("div");
                                b.className = "snap_comment";
                                b.innerHTML = I(a.comment.comment);
                                var c = "",
                                    c = "<br> by: <a class='white_link' href='/profiles/" + user.login + "'>" + user.login +
                                    "</a>";
                                b.innerHTML += c;
                                c = document.createElement("a");
                                c.id = "delete_snapshot_comment_" + a.comment.id;
                                c.className = "delete_snapshot_comments_button";
                                c.innerHTML = "delete";
                                c.onclick = function() {
                                    l(this.id);
                                    return !1
                                };
                                b.appendChild(c);
                                document.getElementById("snapshot_comments_container").insertBefore(b, document.getElementById("snapshots_description").nextSibling);
                                $("#comment_comment").val("")
                            }).error(function() {
                                alert("There was an error creating your comment.")
                            }).always(function(a) {
                                $("#saving_comment_spinner").css("display",
                                    "none");
                                a.redirect && alert("There was an error creating your comment. Please make sure you are signed in and reload the page.")
                            }));
                        return !1
                    }, a = "<input id='comment_commentable_id' name='comment[commentable_id]' type='hidden' value='" + a.id + "'>", a = a + "<input id='comment_commentable_type' name='comment[commentable_type]' type='hidden' value='Snapshot'>" + ("<input id='comment_user_id' name='comment[user_id]' type='hidden' value='" + user.id + "'>"), a += "<input id='auth_key' name='comment[auth_key]' type='hidden' value='" +
                    $("#authenticity_token").val() + "'>", f.innerHTML = a, f.appendChild(d), f.appendChild(j), $(f).append("<img id='saving_comment_spinner' style='display:none;float:left;width:15px;height:15px;' class='loading' src='/images/spinner_small.gif' />"), e.appendChild(f)) : (a = document.createElement("button"), a.id = "login_to_comment_button", a.className = "login_to_comment_button", a.onclick = function() {
                    showLoginWindow("commentOnSnapshot")
                }, e.appendChild(a)), b.appendChild(e)) : $("#snapshot-info-overlay").css("height", "190px")
        }

        function s(a) {
            SDViewer.viewer.showSnapInclusion(a.id, a.bounds.xmin, a.bounds.ymin, a.bounds.xmax, a.bounds.ymax);
            y || x(a)
        }

        function z(b, c, e) {
            j = e;
            b = Math.floor($(".bx-viewport").width() / a);
            e * d + b > E.getSlideCount() - d && !r && ca(e)
        }

        function D() {}

        function x(a) {
            var b = document.createElement("div");
            b.className = "snapshot_name";
            b.innerHTML = a.name;
            var c = document.createElement("div");
            c.className = "snap_taken_by";
            var e = "",
                e = "<a class='white_link' href='/profiles/" + a.owner.username + "'>" + a.owner.username + "</a>";
            c.innerHTML =
                "Snapped by: " + e;
            if (user.id == a.owner.id || gigapan.gigapan.user_id == user.id) e = document.createElement("a"), e.id = "delete_snapshot_" + a.id, e.className = "delete_snapshot_comments_button", e.innerHTML = "delete", e.onclick = function() {
                var a = this.id,
                    a = a.slice(a.lastIndexOf("_") + 1, a.length);
                confirm("Are you sure you want to delete this snapshot") && SDViewer.viewer.deleteSnapshot(a);
                return !1
            }, c.appendChild(e);
            H.innerHTML = "";
            H.appendChild(b);
            H.appendChild(c)
        }

        function h() {
            var a = document.getElementById("snapshot-info-overlay");
            !y && a && a.parentNode.removeChild(a);
            H.innerHTML = "";
            (a = document.getElementById("view_add_comments")) && a.parentNode.removeChild(a);
            b(".snapshot").each(function() {
                $(this).removeClass("selected")
            })
        }

        function l(a) {
            var b = a.slice(a.lastIndexOf("_") + 1, a.length);
            confirm("Are you sure you want to delete this comment") && ($("#" + a).parent().append('<img style="float:right;padding-right: 10px;" class="loading" src="/images/spinner_small.gif">'), $.ajax({
                url: "/comments/" + b,
                data: {
                    id: b
                },
                type: "DELETE",
                dataType: "json",
                timeout: 25E3
            }).success(function() {
                alert("Comment successfully deleted.");
                if (m[selectedSnapshot.id].comment_set && m[selectedSnapshot.id].comment_set.items) {
                    for (i = 0; i < m[selectedSnapshot.id].comment_set.available; i++) m[selectedSnapshot.id].comment_set.items[i][0] == b && (m[selectedSnapshot.id].comment_set.items.splice(i, 1), m[selectedSnapshot.id].comment_set.available -= 1);
                    0 == m[selectedSnapshot.id].comment_set.available && ($("#snapshot_" + selectedSnapshot.id).siblings(".has_comments").remove(), $("#" + a).parent().parent().append("<div class='no_snapshot_comments' id='no_snapshot_comments'>No Comments</div>"),
                        m[selectedSnapshot.id].comment_set = null)
                }
                $("#" + a).parent().remove()
            }).error(function() {
                $("#" + a).parent().remove(".loading");
                alert("There was an error deleting the comment.")
            }))
        }
        var G = new org.gigapan.events.EventManager,
            q = !1,
            v = Seadragon.ControlAnchor.NONE,
            e = null,
            k = null,
            w = 1,
            oa = 0,
            m = [],
            E = null,
            y = !1,
            K = null,
            O = !1,
            c = "undefined" != n && null != n ? n : !0,
            P = document.createElement("div");
        P.id = "snapshot_browser";
        var A = document.createElement("div");
        A.id = "snapshot_scroller_container";
        var V = document.createElement("div");
        V.id = "take_snapshot_container";
        var ea = document.createElement("div");
        ea.id = "take-snapshot-button";
        ea.className = "take-snapshot-button";
        var H = document.createElement("div");
        H.id = "snapshot-details";
        H.className = "snapshot-details";
        b(V).append(ea);
        b(V).append(H);
        b(P).append(V);
        b(P).append(A);
        var T = function() {
            k = e = null;
            w = 1;
            oa = 0;
            m = [];
            K = null;
            if (E) {
                E.destroySlider();
                var a = document.getElementById("bxslider-snapshots");
                a.parentNode.removeChild(a)
            }
        };
        this.getSeadragonControlAnchor = function() {
            return v
        };
        var W;
        this.loadInitialSnapshots =
            function(a, b, c) {
                T();
                e = a;
                k = b;
                fa(c, !1, 0)
            };
        this.addSnapshots = function(a, b) {
            T();
            e = a;
            k = b;
            ca(0)
        };
        var ca = function(a) {
                b.ajax({
                    url: "/beta/gigapans/" + (null != k ? k : e) + "/snapshots/page/" + w + "/per_page/25/most_recent.json",
                    success: function(b) {
                        0 < b.count ? fa(b, 0 == a ? !1 : !0, a) : r = !0;
                        b.count < b.per_page && (r = !0)
                    },
                    error: function() {}
                })
            },
            fa = function(a, c, h) {
                if (a && a.count && a.items) {
                    w++;
                    if (c) var j = document.getElementById("bxslider-snapshots");
                    else j = document.createElement("ul"), j.className = "bxslider-snapshots", j.id = "bxslider-snapshots",
                        A.appendChild(j);
                    for (var l = 0; l < a.count; l++) {
                        var n = a.items[l];
                        if (n) {
                            var q = n[0];
                            if ((n = n[1]) && q) {
                                var y = document.createElement("li"),
                                    s = document.createElement("img");
                                s.id = "snapshot_" + q;
                                s.className = "snapshot";
                                var K = -1 != window.location.hostname.indexOf("staging") ? "staging/" : "";
                                b(s).attr("src", "http://static.gigapan.org/snapshots0/" + K + e + "/images" + (null != k ? "." + k : "") + "/" + q + "-90x60.jpg");
                                s.onclick = f;
                                s.onmouseout = f;
                                s.onmouseover = f;
                                s.oncontextmenu = f;
                                null != n.comment_set && (K = document.createElement("span"), K.className =
                                    "has_comments", y.appendChild(K));
                                y.appendChild(s);
                                j.appendChild(y);
                                m[q] = n;
                                oa++
                            }
                        }
                    }
                }
                c ? E.reloadSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: z,
                    onSlidePrev: D,
                    startSlide: h,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                }) : E || (E = $("#bxslider-snapshots").bxSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: z,
                    onSlidePrev: D,
                    startSlide: 0,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                }))
            },
            ga = function() {
                E && E.reloadSlider({
                    infiniteLoop: !1,
                    adaptiveHeight: !1,
                    captions: !1,
                    onSlideNext: z,
                    onSlidePrev: D,
                    startSlide: j,
                    hideControlOnEnd: !0,
                    minSlides: 5,
                    maxSlides: 20,
                    slideMargin: 3,
                    responsive: !1,
                    slideWidth: 87,
                    moveSlides: d,
                    pager: !1
                })
            };
        this.isVisible = function() {
            return q
        };
        this.toggleVisibility = function() {
            q ? (b(P).fadeOut("fast"), y = !1, h()) : (ga(), b(P).fadeIn("slow"));
            q = !q
        };
        var pa = function() {
            b(P).width(b(window).width());
            b(A).width(b(window).width() - b(V).width());
            ga()
        };
        this.handleOrientationChange =
            function() {
                pa()
            };
        this.getElement = function() {
            return P
        };
        this.updateSize = function() {
            pa()
        };
        this.initialize = function() {
            document.getElementById("take-snapshot-button").onclick = function(a) {
                a = a || window.event;
                "function" === typeof a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
                G.publishEvent("take-snapshot-button-click")
            };
            pa();
            $("#snapshot_browser").parent().css("height", "0px")
        };
        this.addEventListener = G.addEventListener;
        this.removeEventListener = G.removeEventListener;
        this.publishEvent = G.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.snapshot) {
    if ("object" != typeof org.gigapan.snapshot) {
        var orgGigapanSnapshotExistsMessage = "Error: failed to create org.gigapan.snapshot namespace: org.gigapan.snapshot already exists and is not an object";
        alert(orgGigapanSnapshotExistsMessage);
        throw Error(orgGigapanSnapshotExistsMessage);
    }
} else org.gigapan.snapshot = {};
if (!window.Seadragon) throw noSeadragonMsg = "The Seadragon library is required by org.gigapan.snapshot.SnapshotTool.js", alert(noSeadragonMsg), Error(noSeadragonMsg);
if (!window.$) throw nojQueryMsg = "The jQuery library is required by org.gigapan.snapshot.SnapshotTool.js", alert(nojQueryMsg), Error(nojQueryMsg);
if (!window.org.gigapan.seadragon.SeadragonUtils) {
    var noSeadragonUtilsMsg = "The org.gigapan.seadragon.SeadragonUtils library is required by org.gigapan.snapshot.SnapshotTool.js";
    alert(noSeadragonUtilsMsg);
    throw Error(noSeadragonUtilsMsg);
}
(function() {
    function b(a, b, d) {
        Seadragon.MouseTracker.call(this, b);
        var n = null;
        this.pressHandler = function() {
            n = new Seadragon.Point(j(a).outerWidth(), j(a).outerHeight());
            d.setMouseNavEnabled(!1)
        };
        this.dragHandler = function(b, u, h) {
            b = j(a).position();
            h = new Seadragon.Point(b.left + h.x, b.top + h.y);
            b = d.viewport.getContainerSize().minus(n);
            0 > h.x ? h.x = 0 : h.x > b.x && (h.x = b.x);
            0 > h.y ? h.y = 0 : h.y > b.y && (h.y = b.y);
            j(a).css("left", h.x + "px");
            j(a).css("top", h.y + "px")
        };
        this.releaseHandler = function(a, b, f) {
            f && d.setMouseNavEnabled(!0)
        }
    }

    function a(a, b) {
        Seadragon.MouseTracker.call(this, a);
        this.viewer = b;
        this.theElement = a;
        this.pointsCoordinatesRangeRect = null;
        this.getCenterPointInPixelCoords = function(a) {
            var b = Seadragon.Utils.getElementSize(a).divide(2);
            return Seadragon.Utils.getElementPosition(a).minus(Seadragon.Utils.getElementPosition(this.viewer.elmt)).plus(b)
        };
        this.pressHandler = function() {
            this.viewer.setMouseNavEnabled(!1);
            this.elementLocationInPixelCoords = this.getCenterPointInPixelCoords(this.theElement)
        };
        this.dragHandler = function(a,
            b, f) {
            this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(f);
            this.viewer.drawer.updateOverlay(this.theElement, this.viewer.viewport.pointFromPixel(this.elementLocationInPixelCoords), Seadragon.OverlayPlacement.CENTER)
        };
        this.releaseHandler = function(a, b, f) {
            f && (this.elementLocationInPixelCoords = null, this.viewer.setMouseNavEnabled(!0))
        };
        this.setPointsCoordinatesRangeRect = function(a) {
            this.pointsCoordinatesRangeRect = a
        };
        this.getPointsCoordinatesRangeRect = function() {
            return this.pointsCoordinatesRangeRect
        };
        this.getPixelCoordinatesRangeRect = function() {
            var a = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getTopLeft()),
                b = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getBottomRight());
            return new Seadragon.Rect(a.x, a.y, b.x - a.x, b.y - a.y)
        }
    }

    function d(b, d, j, n) {
        a.call(this, b, d);
        this.theElement = b;
        this.handles = j;
        this.handlePositionListener = n;
        this.pressHandlerSuper = this.pressHandler;
        this.pressHandler = function(a, b) {
            this.pressHandlerSuper.apply(this, arguments);
            this.theElement.className =
                "snapshot_tool_bounds_selector_active"
        };
        this.dragHandler = function(a, b, f) {
            this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(f);
            f = d.viewport.pointFromPixel(this.elementLocationInPixelCoords);
            b = Seadragon.Utils.getElementSize(this.theElement);
            a = d.viewport.deltaPointsFromPixels(b);
            b = b.divide(2);
            b = d.viewport.deltaPointsFromPixels(b);
            f = f.minus(b);
            if (this.getPointsCoordinatesRangeRect()) {
                var l = this.getPointsCoordinatesRangeRect().getTopLeft(),
                    n = this.getPointsCoordinatesRangeRect().getBottomRight();
                f.x < l.x && (f.x = l.x);
                f.x + a.x > n.x && (f.x = n.x - a.x);
                f.y < l.y && (f.y = l.y);
                f.y + a.y > n.y && (f.y = n.y - a.y)
            }
            l = new Seadragon.Rect(f.x, f.y, a.x, a.y);
            this.viewer.drawer.updateOverlay(this.theElement, l);
            l = Array(8);
            l[0] = f;
            l[1] = f.plus(new Seadragon.Point(b.x, 0));
            l[2] = f.plus(new Seadragon.Point(a.x, 0));
            l[3] = f.plus(new Seadragon.Point(a.x, b.y));
            l[4] = f.plus(a);
            l[5] = f.plus(new Seadragon.Point(b.x, a.y));
            l[6] = f.plus(new Seadragon.Point(0, a.y));
            l[7] = f.plus(new Seadragon.Point(0, b.y));
            for (a = 0; a < j.length; a++) this.viewer.drawer.updateOverlay(this.handles[a],
                l[a], Seadragon.OverlayPlacement.CENTER);
            this.handlePositionListener && this.handlePositionListener(l)
        };
        this.releaseHandlerSuper = this.releaseHandler;
        this.releaseHandler = function(a, b, f, d) {
            this.releaseHandlerSuper.apply(this, arguments);
            this.theElement.className = "snapshot_tool_bounds_selector"
        }
    }

    function r(b, d, j, r, D, x, h, l) {
        a.call(this, j[b], r);
        this.activeHandleIndex = b;
        this.oppositeHandleIndex = d;
        this.handleElements = j;
        this.activeHandleElement = j[b];
        this.oppositeHandleElement = j[d];
        this.bounds = D;
        this.handlePositionListener =
            x;
        this.willConstrainSnapshotAspectRatio = h;
        this.snapshotAspectRatio = l;
        this.boundRectMinHeightInPixels = this.boundRectMinWidthInPixels = 20;
        this.cumulativeDelta = null;
        this.xSign = [-1, 0, 1, 1, 1, 0, -1, -1][b];
        this.ySign = [-1, -1, -1, 0, 1, 1, 1, 0][b];
        this.isDraggingTopOrBottomEdge = 0 == this.xSign;
        this.isDraggingLeftOrRightEdge = 0 == this.ySign;
        this.willConstrainSnapshotAspectRatio && (1 <= this.snapshotAspectRatio ? this.boundRectMinWidthInPixels = this.snapshotAspectRatio * this.boundRectMinHeightInPixels : this.boundRectMinHeightInPixels /=
            this.snapshotAspectRatio);
        this.computeSign = function(a, b) {
            return 0 > a - b ? -1 : 0 < a - b ? 1 : 0
        };
        this.pressHandlerSuper = this.pressHandler;
        this.pressHandler = function(a, b) {
            this.pressHandlerSuper.apply(this, arguments);
            this.activeHandleElement.className = "snapshot_tool_bounds_handle_active";
            this.activeHandleElementInPixelCoords = this.getCenterPointInPixelCoords(this.activeHandleElement);
            this.oppositeHandleElementInPixelCoords = this.getCenterPointInPixelCoords(this.oppositeHandleElement);
            this.cumulativeDelta = new Seadragon.Point(0,
                0);
            this.originalActiveHandleElementPositionInPixelCoords = new Seadragon.Point(this.activeHandleElementInPixelCoords.x, this.activeHandleElementInPixelCoords.y);
            this.mousePositionInPixelCoords = new Seadragon.Point(this.originalActiveHandleElementPositionInPixelCoords.x, this.originalActiveHandleElementPositionInPixelCoords.y)
        };
        this.dragHandlerSuper = this.dragHandler;
        this.dragHandler = function(a, b, f, e) {
            this.cumulativeDelta = this.cumulativeDelta.plus(f);
            this.mousePositionInPixelCoords = this.originalActiveHandleElementPositionInPixelCoords.plus(this.cumulativeDelta);
            var d = u.convertGigapanRectToSeadragonRect(0, 0, n, I, n),
                j = r.viewport.pixelFromPoint(d.getTopLeft()),
                l = r.viewport.pixelFromPoint(d.getBottomRight()),
                m = r.viewport.pixelFromPoint(d.getTopLeft()),
                d = r.viewport.pixelFromPoint(d.getBottomRight());
            if (h)
                if (this.isDraggingTopOrBottomEdge) {
                    var s = Math.min(this.oppositeHandleElementInPixelCoords.x - m.x, d.x - this.oppositeHandleElementInPixelCoords.x),
                        s = 2 * (s / this.snapshotAspectRatio);
                    m.y = Math.max(m.y, this.oppositeHandleElementInPixelCoords.y - s);
                    d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y +
                        s)
                } else this.isDraggingLeftOrRightEdge ? (s = Math.min(this.oppositeHandleElementInPixelCoords.y - m.y, d.y - this.oppositeHandleElementInPixelCoords.y), s = 2 * s * this.snapshotAspectRatio, m.x = Math.max(m.x, this.oppositeHandleElementInPixelCoords.x - s), d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x + s)) : (this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x ? (d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y + (l.x - this.oppositeHandleElementInPixelCoords.x) /
                        this.snapshotAspectRatio), m.y = Math.max(m.y, this.oppositeHandleElementInPixelCoords.y - (l.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio)) : (d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y - (j.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio), m.y = Math.max(m.y, this.oppositeHandleElementInPixelCoords.y + (j.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio)), this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y ?
                    (d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x + (l.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio), m.x = Math.max(m.x, this.oppositeHandleElementInPixelCoords.x - (l.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio)) : (d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x - (j.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio), m.x = Math.max(m.x, this.oppositeHandleElementInPixelCoords.x + (j.y - this.oppositeHandleElementInPixelCoords.y) *
                        this.snapshotAspectRatio)));
            this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x ? m.x = Math.max(m.x, this.oppositeHandleElementInPixelCoords.x) : d.x = Math.min(d.x, this.oppositeHandleElementInPixelCoords.x);
            this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y ? m.y = Math.max(m.y, this.oppositeHandleElementInPixelCoords.y) : d.y = Math.min(d.y, this.oppositeHandleElementInPixelCoords.y);
            m = new Seadragon.Point(Math.min(Math.max(this.mousePositionInPixelCoords.x,
                m.x), d.x), Math.min(Math.max(this.mousePositionInPixelCoords.y, m.y), d.y));
            d = Seadragon.Utils.getElementSize(D);
            m = this.oppositeHandleElementInPixelCoords.minus(m).apply(Math.abs);
            this.isDraggingTopOrBottomEdge ? m.x = d.x : this.isDraggingLeftOrRightEdge && (m.y = d.y);
            this.willConstrainSnapshotAspectRatio && (this.isDraggingTopOrBottomEdge ? m.x = m.y * this.snapshotAspectRatio : this.isDraggingLeftOrRightEdge ? m.y = m.x / this.snapshotAspectRatio : (d = new Seadragon.Point(m.x, m.x / this.snapshotAspectRatio), s = new Seadragon.Point(m.y *
                this.snapshotAspectRatio, m.y), m = d.y >= m.y ? d : s));
            m.x = Math.max(this.boundRectMinWidthInPixels, m.x);
            m.y = Math.max(this.boundRectMinHeightInPixels, m.y);
            s = d = null;
            this.isDraggingTopOrBottomEdge ? (this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * m.y, m = m.x / 2, d = new Seadragon.Point(this.oppositeHandleElementInPixelCoords.x - m, Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)), s = new Seadragon.Point(this.oppositeHandleElementInPixelCoords.x +
                m, Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y))) : this.isDraggingLeftOrRightEdge ? (this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * m.x, m = m.y / 2, d = new Seadragon.Point(Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x), this.oppositeHandleElementInPixelCoords.y - m), s = new Seadragon.Point(Math.max(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                this.oppositeHandleElementInPixelCoords.y + m)) : (this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * m.x, this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * m.y, d = new Seadragon.Point(Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x), Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)), s = new Seadragon.Point(Math.max(this.activeHandleElementInPixelCoords.x,
                this.oppositeHandleElementInPixelCoords.x), Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)));
            if (!(this.activeHandleElementInPixelCoords.x < j.x || this.activeHandleElementInPixelCoords.y < j.y || this.activeHandleElementInPixelCoords.x > l.x || this.activeHandleElementInPixelCoords.y > l.y)) {
                this.dragHandlerSuper.apply(this, arguments);
                j = this.viewer.viewport.pointFromPixel(d);
                l = r.viewport.deltaPointsFromPixels(s.minus(d));
                m = new Seadragon.Rect(j.x, j.y, l.x, l.y);
                this.viewer.drawer.updateOverlay(this.bounds,
                    m);
                m = l.divide(2);
                d = j.plus(m);
                l = Array(8);
                l[0] = j;
                l[1] = d.minus(new Seadragon.Point(0, m.y));
                l[2] = d.plus(new Seadragon.Point(m.x, -m.y));
                l[3] = d.plus(new Seadragon.Point(m.x, 0));
                l[4] = d.plus(m);
                l[5] = d.plus(new Seadragon.Point(0, m.y));
                l[6] = d.plus(new Seadragon.Point(-m.x, m.y));
                l[7] = d.minus(new Seadragon.Point(m.x, 0));
                for (j = 0; j < this.handleElements.length; j++) this.viewer.drawer.updateOverlay(this.handleElements[j], l[j], Seadragon.OverlayPlacement.CENTER);
                this.handlePositionListener && this.handlePositionListener(l)
            }
        };
        this.releaseHandlerSuper = this.releaseHandler;
        this.releaseHandler = function(a, b, d, e) {
            this.releaseHandlerSuper.apply(this, arguments);
            this.activeHandleElement.className = "snapshot_tool_bounds_handle";
            this.cumulativeDelta = new Seadragon.Point(0, 0)
        }
    }
    var j = window.$,
        u = org.gigapan.seadragon.SeadragonUtils,
        n = null,
        I = null;
    org.gigapan.viewer.SnapshotTool = function(a, N, s, z) {
        var D = null,
            x = null,
            h = Array(8),
            l = Array(h.length),
            G = Array(h.length),
            q = null,
            v = null,
            e = !1,
            k = void 0 !== z,
            w = k ? Math.abs(z) : 1.5,
            oa = Seadragon.ControlAnchor.NONE,
            D = document.createElement("div");
        D.id = "snapshot_tool_dialog_window";
        D.className = "snapshot_tool_dialog_window";
        j("#" + a).contents().clone().appendTo(D);
        x = document.createElement("div");
        x.id = "snapshot_tool_bounds_selector";
        x.className = "snapshot_tool_bounds_selector";
        j.each(h, function(a) {
            h[a] = document.createElement("div");
            h[a].id = "snapshot_tool_bounds_handle_" + a;
            h[a].className = "snapshot_tool_bounds_handle"
        });
        var m = function(a) {
            if (a)
                for (var b = 0; b < a.length; b++) l[b] = a[b]
        };
        (a = j(D).find("." + N).get()[0]) || (a =
            D);
        q = new b(D, a, s);
        q.setTracking(!0);
        s.addEventListener("resize", function() {
            var a = new Seadragon.Point(j(D).outerWidth(), j(D).outerHeight()),
                b = j(D).position(),
                b = new Seadragon.Point(b.left, b.top),
                d = new Seadragon.Point(0, 0),
                a = s.viewport.getContainerSize().minus(a);
            b.x < d.x ? b.x = d.x : b.x > a.x && (b.x = a.x);
            b.y < d.y ? b.y = d.y : b.y > a.y && (b.y = a.y)
        });
        v = new d(x, s, h, m);
        v.setTracking(!0);
        j.each(h, function(a) {
            G[a] = new r(a, 8 <= a + 4 ? a - 4 : a + 4, h, s, x, m, k, w);
            G[a].setTracking(!0)
        });
        var E = function(a) {
            v.setTracking(!a);
            j.each(h, function(b) {
                G[b].setTracking(!a)
            });
            var b = a ? "snapshot_tool_bounds_handle_disabled" : "snapshot_tool_bounds_handle";
            x.className = a ? "snapshot_tool_bounds_selector_disabled" : "snapshot_tool_bounds_selector";
            j.each(h, function(a) {
                h[a].className = b
            })
        };
        s.addEventListener("animationstart", function() {
            E(!0)
        });
        s.addEventListener("animationfinish", function() {
            E(!1)
        });
        this.initialize = function() {};
        this.getElement = function() {
            return D
        };
        this.getSeadragonControlAnchor = function() {
            return oa
        };
        this.setGigapanDimensions = function(a, b) {
            n = a;
            I = b;
            var d = new Seadragon.Rect(0,
                0, 1, b / a);
            v.setPointsCoordinatesRangeRect(d);
            j.each(G, function(a) {
                G[a].setPointsCoordinatesRangeRect(d)
            })
        };
        this.getToolBoundsInGigapanCoords = function() {
            var a = u.convertSeadragonPointToGigapanPoint(l[0], n),
                b = u.convertSeadragonPointToGigapanPoint(l[4], n);
            return new Seadragon.Rect(a.x, a.y, b.x - a.x, b.y - a.y)
        };
        this.isVisible = function() {
            return e
        };
        this.setVisible = function(a) {
            if (a && !e) {
                var a = u.convertGigapanRectToSeadragonRect(0, 0, n, I, n),
                    b = s.viewport.pixelFromPoint(a.getTopLeft()),
                    d = s.viewport.pixelFromPoint(a.getBottomRight()),
                    c = new Seadragon.Rect(0, 0),
                    a = s.viewport.getContainerSize(),
                    c = new Seadragon.Point(Math.max(b.x, c.x), Math.max(b.y, c.y)),
                    f = new Seadragon.Point(Math.min(d.x, a.x), Math.min(d.y, a.y)),
                    k = a = null;
                f.x > c.x && f.y > c.y ? (b = new Seadragon.Rect(c.x, c.y, f.x - c.x, f.y - c.y), a = b.getCenter(), b.width > b.height ? (b = 0.75 * b.height, k = new Seadragon.Point(w * b, b)) : (b = 0.75 * b.width, k = new Seadragon.Point(b, 2 / 3 * b))) : (b = d.minus(b), a = b.divide(2), k = new Seadragon.Point(0.75 * b.x, 0.75 * b.y));
                d = s.viewport.deltaPointsFromPixels(k);
                b = d.divide(2);
                a =
                    s.viewport.pointFromPixel(a);
                c = a.minus(b);
                d = new Seadragon.Rect(c.x, c.y, d.x, d.y);
                s.drawer.addOverlay(x, d);
                l[0] = c;
                l[1] = a.minus(new Seadragon.Point(0, b.y));
                l[2] = a.plus(new Seadragon.Point(b.x, -b.y));
                l[3] = a.plus(new Seadragon.Point(b.x, 0));
                l[4] = a.plus(b);
                l[5] = a.plus(new Seadragon.Point(0, b.y));
                l[6] = a.plus(new Seadragon.Point(-b.x, b.y));
                l[7] = a.minus(new Seadragon.Point(b.x, 0));
                j.each(h, function(a) {
                    s.drawer.addOverlay(h[a], l[a], Seadragon.OverlayPlacement.CENTER)
                });
                s.addControl(D, Seadragon.ControlAnchor.NONE);
                e = !0
            } else !a && e && (s.removeControl(D), s.drawer.removeOverlay(x), j.each(h, function(a) {
                s.drawer.removeOverlay(h[a])
            }), e = !1)
        }
    };
    b.prototype = new Seadragon.MouseTracker;
    b.prototype.constructor = b;
    a.prototype = new Seadragon.MouseTracker;
    a.prototype.constructor = a;
    d.prototype = new a(null, null);
    d.prototype.constructor = d;
    r.prototype = new a(null, null);
    r.prototype.constructor = r
})();
(function() {
    var b = {
            supportsFullScreen: !1,
            isFullScreen: function() {
                return !1
            },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: "",
            prefix: ""
        },
        a = ["webkit", "moz", "o", "ms", "khtml"];
    if ("undefined" != typeof document.cancelFullScreen) b.supportsFullScreen = !0;
    else
        for (var d = 0, r = a.length; d < r; d++)
            if (b.prefix = a[d], "undefined" != typeof document[b.prefix + "CancelFullScreen"]) {
                b.supportsFullScreen = !0;
                break
            }
    b.supportsFullScreen && (b.fullScreenEventName = b.prefix + "fullscreenchange", b.isFullScreen =
        function() {
            switch (this.prefix) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + "FullScreen"]
            }
        }, b.requestFullScreen = function(a) {
            a.style.height = "100%";
            a.style.width = "100%";
            return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
        }, b.cancelFullScreen = function(a, b, d) {
            a.style.height = d;
            a.style.width = b;
            return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        });
    "undefined" !=
    typeof jQuery && (jQuery.fn.requestFullScreen = function() {
        return this.each(function() {
            b.supportsFullScreen && b.requestFullScreen(this)
        })
    });
    window.fullScreenApi = b
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function() {
    org.gigapan.viewer.GigapanRelatedControl = function(b) {
        function a() {
            j ? jQuery(u).css({
                display: "none"
            }) : jQuery(u).css({
                display: "block"
            });
            j = !j
        }
        var d = new org.gigapan.events.EventManager,
            r = Seadragon.ControlAnchor.NONE,
            j = !1,
            u = document.createElement("div");
        u.id = "related-screen-overlay";
        u.innerHTML = "<h2>Explore More</h2>";
        this.getSeadragonControlAnchor = function() {
            return r
        };
        this.getElement = function() {
            return u
        };
        this.toggleVisibility = function() {
            a()
        };
        this.isVisible = function() {
            return j
        };
        this.initialize =
            function() {
                if (b)
                    for (var d = 8 < b.length ? 8 : b.length, j = 0; j < d; j++) {
                        var f = b[j],
                            r = document.createElement("div"),
                            s = document.createElement("span");
                        s.className = "related-title";
                        var z = "",
                            z = 20 < f.name.length ? f.name.substr(0, 18) + "..." : f.name;
                        s.innerHTML = z;
                        r.className = "related-gigapan";
                        r.id = "gigapan_" + f.id;
                        z = document.createElement("img");
                        z.id = "image_" + f.id;
                        z.className = "related-image";
                        z.src = f.thumbnail_url;
                        r.appendChild(z);
                        r.appendChild(s);
                        r.onclick = function() {
                            var a = this.id,
                                a = a.substr(a.indexOf("_") + 1, a.length - 1);
                            window.location = "/gigapans/" + a
                        };
                        u.appendChild(r)
                    }
                d = document.createElement("div");
                d.className = "close_button";
                d.onclick = function() {
                    a()
                };
                u.appendChild(d);
                $("#related-screen-overlay").parent().css("height", "0px")
            };
        this.addEventListener = d.addEventListener;
        this.removeEventListener = d.removeEventListener;
        this.publishEvent = d.publishEvent
    }
})();
if (org) {
    if ("object" != typeof org) throw orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object", alert(orgExistsMessage), Error(orgExistsMessage);
} else org = {};
if (org.gigapan) {
    if ("object" != typeof org.gigapan) throw orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object", alert(orgGigapanExistsMessage), Error(orgGigapanExistsMessage);
} else org.gigapan = {};
if (org.gigapan.viewer) {
    if ("object" != typeof org.gigapan.viewer) throw orgGigapanViewerExistsMessage = "Error: failed to create org.gigapan.viewer namespace: org.gigapan.viewer already exists and is not an object", alert(orgGigapanViewerExistsMessage), Error(orgGigapanViewerExistsMessage);
} else org.gigapan.viewer = {};
(function() {
    org.gigapan.viewer.ThumbnailNavigationControl = function(b) {
        var a = new org.gigapan.events.EventManager,
            d = document.createElement("div");
        d.id = "thumbnail-navigation";
        var r = Seadragon.ControlAnchor.NONE,
            j = null;
        this.getSeadragonControlAnchor = function() {
            return r
        };
        this.getElement = function() {
            return d
        };
        this.initialize = function() {
            d = document.getElementById("thumbnail-navigation");
            d.innerHTML = '<div id="thumbnail-navigation-area"><div id="thumbnail-navigation-area-image"></div><div id="thumbnail-navigation-area-current-view-outline"></div><div id="thumbnail-navigation-area-shadow"></div></div>';
            var a = b.width / b.height,
                r = 250,
                f = Math.floor(1 / a * r);
            250 < f && (f = 250, r = Math.floor(f * a));
            j = {
                width: r,
                height: f
            };
            a = "";
            null != b.auth_key && (a = "." + b.auth_key);
            a = ("undefined" == typeof b.baseThumbnailUrl ? "http://static.gigapan.org" : b.baseThumbnailUrl) + "/gigapans0/" + b.id + "/images" + a + "/" + b.id + "-" + j.width + "x" + j.height + ".jpg";
            b && (d = document.getElementById("thumbnail-navigation-area-image"), d.setAttribute("style", "width: " + j.width + "px; height: " + j.height + 'px; background: url("' + a + '") no-repeat;'), d = document.getElementById("thumbnail-navigation-area"),
                d.setAttribute("style", "width: " + j.width + "px; height: " + j.height + "px;"), d = document.getElementById("thumbnail-navigation-area-current-view-outline"), d.setAttribute("style", "width: " + j.width + "px; height: " + j.height + "px;"), d = document.getElementById("thumbnail-navigation-area-shadow"), d.setAttribute("style", "width: " + (j.width - 2) + "px; height: " + (j.height - 2) + "px;"));
            jQuery("#thumbnail-navigation").parent().css("height", "0px")
        };
        this.isVisible = function() {
            return panel.is(":visible")
        };
        this.toggleVisibility =
            function() {
                this.isVisible() ? this.hide() : this.show()
            };
        this.show = function() {
            panel.show()
        };
        this.hide = function() {
            panel.hide()
        };
        this.fadeIn = function() {
            panel.fadeIn(u)
        };
        this.fadeOut = function() {
            panel.fadeOut()
        };
        var u = function() {};
        this.handleOrientationChange = function() {};
        this.updateSize = function() {};
        this.updateCurrentViewOutline = function(a) {
            var b = j.width,
                d = j.height,
                r = b / d,
                s = jQuery("#thumbnail-navigation-area-current-view-outline");
            s.css("left", Math.round(Math.min(b, b * a.x)) + "px");
            s.css("top", Math.round(Math.min(d,
                d * a.y * r)) + "px");
            s.css("width", Math.round(Math.max(0, b * a.width)) + "px");
            s.css("height", Math.round(Math.max(0, d * a.height * r)) + "px")
        };
        this.addEventListener = a.addEventListener;
        this.removeEventListener = a.removeEventListener;
        this.publishEvent = a.publishEvent
    }
})();