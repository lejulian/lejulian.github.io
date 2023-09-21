(this["webpackJsonplofi-atc"] = this["webpackJsonplofi-atc"] || []).push([[0], {
    25: function(e, t, c) {},
    26: function(e, t, c) {},
    28: function(e, t, c) {},
    29: function(e, t, c) {},
    30: function(e, t, c) {},
    49: function(e, t, c) {},
    50: function(e, t, c) {},
    51: function(e, t, c) {},
    52: function(e, t, c) {},
    53: function(e, t, c) {
        "use strict";
        c.r(t);
        var n = c(1)
          , a = c.n(n)
          , s = c(18)
          , o = c.n(s)
          , u = c(9)
          , i = (c(25),
        c(2))
          , r = "LOADING"
          , l = "PLAYING"
          , m = "BROKEN"
          , d = "PAUSED"
          , b = "CHANGING_SOURCE";
        function w(e) {
            return Math.floor(Math.random() * e)
        }
        function h(e) {
            return "/assets/music/".concat(encodeURIComponent(e), ".mp3")
        }
        function j(e) {
            var t = Object(n.useState)(e)
              , c = Object(i.a)(t, 2)
              , a = c[0]
              , s = c[1]
              , o = Object(n.useRef)(a);
            return [a, function(e) {
                s(e),
                o.current = e
            }
            , o]
        }
        function p(e, t) {
            var c = Object(n.useState)(function(e) {
                if ("undefined" !== typeof localStorage) {
                    var t = localStorage.getItem(e);
                    return JSON.parse(t)
                }
                return null
            }(e) || t)
              , a = Object(i.a)(c, 2)
              , s = a[0]
              , o = a[1];
            return Object(n.useEffect)((function() {
                !function(e, t) {
                    "undefined" !== typeof localStorage && localStorage.setItem(e, JSON.stringify(t))
                }(e, s)
            }
            ), [s]),
            [s, o]
        }
        c(26);
        var f = c(0)
          , v = w(4) + 1;
        var y = function(e) {
            var t = e.isPlaying;
            return Object(f.jsxs)("div", {
                className: "background",
                children: [Object(f.jsx)("div", {
                    className: "background-wrapper",
                    style: {
                        backgroundImage: "url('/assets/background".concat(v, ".png')")
                    }
                }), Object(f.jsx)("div", {
                    className: "background-color-overlay ".concat(t ? "" : "hide-transition")
                })]
            })
        };
        c(28);
        var O = function(e) {
            var t = e.isPlaying
              , c = e.togglePlayPause
              , a = (e.randomizeMusic,
            e.musicAudioStatus)
              , s = e.atcAudioStatus
              , o = e.selectedAirport;
            return Object(n.useEffect)((function() {
                document.addEventListener("keyup", (function(e) {
                    "Space" === e.code && c()
                }
                ))
            }
            ), []),
            s === m ? Object(f.jsxs)("div", {
                className: "feed-down-msg",
                children: [Object(f.jsx)("a", {
                    href: o.feedUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Airport feed"
                }), " is currently not available. Refresh to try again or choose another airport."]
            }) : Object(f.jsx)("div", {
                className: "audio-controls ".concat(a === b || a === r || s === r ? "disable" : ""),
                children: Object(f.jsx)("div", {
                    className: "audio-toggle-button",
                    onClick: c,
                    children: Object(f.jsx)("img", {
                        className: "audio-toggle-icon",
                        src: t ? "/assets/icons/pause-black.svg" : "/assets/icons/play-black.svg"
                    })
                })
            })
        };
        c(29);
        function x(e) {
            var t = e.selectedMusic
              , c = e.musicAudioStatus;
            return Object(f.jsxs)("a", {
                className: "music-credit-link ".concat(c === r ? "loading" : ""),
                href: t.youtube,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [c === m && Object(f.jsx)("h5", {
                    className: "music-name",
                    children: "Music could not load. Try refreshing."
                }), (c === l || c === d || c === r) && Object(f.jsxs)("h5", {
                    className: "music-name",
                    children: [Object(f.jsx)("img", {
                        src: "/assets/icons/music-note-white.svg"
                    }), t.name]
                })]
            })
        }
        function g(e) {
            var t = e.selectedMusic
              , c = e.musicAudioStatus;
            return Object(f.jsxs)(f.Fragment, {
                children: [Object(f.jsx)("div", {
                    className: "audio-info-box",
                    children: "No airport selected"
                }), Object(f.jsx)(x, {
                    selectedMusic: t,
                    musicAudioStatus: c
                })]
            })
        }
        function S(e) {
            var t, c, a = e.atcAudioStatus, s = e.musicAudioStatus, o = e.selectedAirport, u = e.selectedAirportExternalUrl, d = e.selectedMusic, b = Object(n.useState)(0), w = Object(i.a)(b, 2), h = w[0], j = w[1];
            a === l ? t = Object(f.jsxs)("div", {
                className: "live-indicator status-indicator",
                children: [Object(f.jsx)("span", {
                    className: "blinking-circle",
                    children: "\u2022 "
                }), "LIVE"]
            }) : a === r ? t = Object(f.jsx)("div", {
                className: "down-indicator status-indicator",
                children: "LOADING"
            }) : a === m && (t = Object(f.jsx)("div", {
                className: "down-indicator status-indicator",
                children: "FEED DOWN"
            }));
            var p = Object.keys(o.feedFrequencies).length;
            if (o.feedFrequencies && 0 !== Object.keys(o.feedFrequencies).length) {
                var v = Object.keys(o.feedFrequencies)[h];
                c = Object(f.jsxs)("div", {
                    className: "audio-floating-info",
                    onClick: function() {
                        var e = Object.keys(o.feedFrequencies).length;
                        j((h + 1) % e)
                    },
                    children: [Object(f.jsx)("h2", {
                        className: "atc-frequency",
                        children: o.feedFrequencies[v]
                    }), Object(f.jsx)("h4", {
                        className: "atc-frequency-type",
                        children: "".concat(v, " (").concat(h + 1, "/").concat(p, ")")
                    })]
                })
            } else
                c = null;
            return Object(f.jsxs)(f.Fragment, {
                children: [c, Object(f.jsxs)("div", {
                    className: "audio-info-box",
                    children: [t, Object(f.jsx)("div", {
                        className: "action-icons",
                        children: u && Object(f.jsx)("a", {
                            className: "action-icon",
                            href: u,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: Object(f.jsx)("img", {
                                src: "/assets/icons/broadcast-white.svg"
                            })
                        })
                    }), Object(f.jsx)("h2", {
                        className: "airport-code",
                        children: o.icao
                    }), Object(f.jsx)("h4", {
                        className: "airport-name",
                        children: o.name
                    })]
                }), a !== m && Object(f.jsx)(x, {
                    selectedMusic: d,
                    musicAudioStatus: s
                })]
            })
        }
        var N = function(e) {
            var t = e.isPlaying
              , c = e.togglePlayPause
              , n = e.atcAudioStatus
              , a = e.musicAudioStatus
              , s = e.selectedMusic
              , o = e.selectedAirport
              , u = e.randomizeMusic
              , i = o ? "https://www.liveatc.net/search/?icao=".concat(o.icao) : null;
            return Object(f.jsxs)("div", {
                className: "main-audio-section",
                children: [o ? Object(f.jsx)(S, {
                    atcAudioStatus: n,
                    musicAudioStatus: a,
                    selectedAirport: o,
                    selectedAirportExternalUrl: i,
                    selectedMusic: s
                }) : Object(f.jsx)(g, {
                    selectedMusic: s,
                    musicAudioStatus: a
                }), Object(f.jsx)(O, {
                    isPlaying: t,
                    togglePlayPause: c,
                    randomizeMusic: u,
                    musicAudioStatus: a,
                    atcAudioStatus: n,
                    selectedAirport: o
                })]
            })
        }
          , A = (c(30),
        Object(n.createContext)())
          , k = function(e) {
            var t = e.children
              , c = Object(n.useRef)()
              , a = Object(n.useRef)()
              , s = p("atc-volume", .5)
              , o = Object(i.a)(s, 2)
              , u = o[0]
              , r = o[1]
              , l = function(e, t) {
                var c = p(e, t)
                  , a = Object(i.a)(c, 2)
                  , s = a[0]
                  , o = a[1]
                  , u = Object(n.useRef)(s);
                return [s, function(e) {
                    o(e),
                    u.current = e
                }
                , u]
            }("music-volume", .5)
              , m = Object(i.a)(l, 3)
              , d = (m[0],
            m[1])
              , b = {
                atcAudio: c,
                musicAudio: a,
                atcVolume: u,
                setAtcVolume: r,
                musicVolumeRef: m[2],
                setMusicVolume: d
            };
            return Object(f.jsx)(A.Provider, {
                value: b,
                children: t
            })
        }
          , C = (A.Consumer,
        "music-audio-player")
          , E = "music-audio-player-loading"
          , P = "atc-audio-player";
        var M = function(e) {
            var t = e.selectedMusicIndex
              , c = e.setSelectedMusicIndex
              , a = e.musicOptions
              , s = e.selectedAirport
              , o = e.showAudioPlayer
              , u = e.randomizeMusic
              , w = Object(n.useContext)(A)
              , p = w.atcAudio
              , v = w.atcVolume
              , O = w.musicAudio
              , x = w.musicVolumeRef
              , g = j(!1)
              , S = Object(i.a)(g, 3)
              , k = S[0]
              , M = S[1]
              , R = S[2]
              , I = j(d)
              , F = Object(i.a)(I, 3)
              , L = F[0]
              , U = F[1]
              , T = F[2]
              , D = j(d)
              , K = Object(i.a)(D, 3)
              , V = K[0]
              , B = K[1]
              , G = K[2]
              , z = Object(n.useRef)()
              , W = a[t];
            Object(n.useEffect)((function() {
                if (W && !O.current) {
                    var e = h(W.name);
                    O.current = _(e, C, V, B)
                }
            }
            ), [O, W]),
            Object(n.useEffect)((function() {
                s && !p.current && (p.current = _(s.audioUrl, P, L, U))
            }
            ), [p, s]);
            var q = function(e, t, c) {
                var n;
                return function() {
                    var a = this
                      , s = arguments
                      , o = function() {
                        n = null,
                        c || e.apply(a, s)
                    }
                      , u = c && !n;
                    clearTimeout(n),
                    n = setTimeout(o, t),
                    u && e.apply(a, s)
                }
            }((function() {
                G.current !== b && G.current !== r && T.current !== r && (R.current ? (p.current.pause(),
                O.current.pause(),
                M(!1)) : (p.current.play(),
                O.current.play(),
                M(!0)))
            }
            ), 250);
            function _(e, c, n, a) {
                var s = J(e, c);
                return Q(s, n, a),
                c === C && X(s, t),
                s
            }
            function J(e, t) {
                var c = new window.Audio(e);
                return c.preload = "metadata",
                c.setAttribute("id", t),
                c.controls = !1,
                c.volume = t === C || t === E ? x.current : v,
                document.querySelector(".audio-wrapper").appendChild(c),
                c
            }
            function Q(e, t, c) {
                e.addEventListener("play", (function() {
                    t === d && c(r);
                    var n = setInterval((function() {
                        e.currentTime > 0 && (c(l),
                        clearInterval(n))
                    }
                    ), 200)
                }
                )),
                e.addEventListener("pause", (function() {
                    c(d)
                }
                )),
                e.addEventListener("error", (function(e) {
                    c(m)
                }
                ));
                var n = setInterval((function() {
                    3 === e.networkState && (c(m),
                    clearInterval(n))
                }
                ), 1e3)
            }
            function X(e, t) {
                var n = (t + 1) % a.length
                  , s = a[n]
                  , o = setInterval((function() {
                    if (e.currentTime + 10 >= e.duration) {
                        var t = h(s.name);
                        z.current = J(t, E),
                        clearInterval(o)
                    }
                }
                ), 1e3);
                e.addEventListener("ended", (function() {
                    B(b),
                    O.current.remove(),
                    O.current = z.current,
                    O.current.id = C,
                    O.current.volume = x.current,
                    O.current.play(),
                    c(n),
                    z.current = null,
                    Q(O.current, V, B),
                    X(O.current, n),
                    B(l)
                }
                ))
            }
            return Object(f.jsxs)(f.Fragment, {
                children: [Object(f.jsx)(y, {
                    isPlaying: k
                }), Object(f.jsx)("div", {
                    className: "audio-wrapper",
                    children: o && Object(f.jsx)(N, {
                        isPlaying: k,
                        togglePlayPause: q,
                        atcAudioStatus: L,
                        musicAudioStatus: V,
                        selectedMusic: W,
                        selectedAirport: s,
                        randomizeMusic: u
                    })
                })]
            })
        }
          , R = c(7)
          , I = c.n(R);
        c(49);
        var F = function(e) {
            var t = e.show
              , c = e.goBackFn
              , a = Object(n.useState)([])
              , s = Object(i.a)(a, 2)
              , o = s[0]
              , u = s[1]
              , r = Object(n.useState)("")
              , l = Object(i.a)(r, 2)
              , m = l[0]
              , d = l[1]
              , b = Object(n.useState)(null)
              , w = Object(i.a)(b, 2)
              , h = w[0]
              , j = w[1]
              , p = Object(n.useRef)();
            function v(e) {
                window.location.href = "/?icao=".concat(e)
            }
            function y(e) {
                var t = e.toUpperCase()
                  , c = m.toUpperCase()
                  , n = t.split(c);
                return Object(f.jsxs)(f.Fragment, {
                    children: [Object(f.jsx)("span", {
                        className: "autocomplete-nonhighlight",
                        children: n[0]
                    }), Object(f.jsx)("span", {
                        className: "autocomplete-highlight",
                        children: c
                    }), Object(f.jsx)("span", {
                        className: "autocomplete-nonhighlight",
                        children: n[1]
                    })]
                })
            }
            return Object(n.useEffect)((function() {
                var e;
                j(null),
                t && (m ? (e = m,
                e.length > 4 ? Promise.resolve([]) : I()("/autocomplete/".concat(e))).then((function(e) {
                    200 === e.status && u(e.data.codes)
                }
                )) : u([]))
            }
            ), [m]),
            Object(n.useEffect)((function() {
                t && p.current && p.current.focus()
            }
            ), [t]),
            t ? Object(f.jsxs)("div", {
                className: "change-airport-screen screen",
                children: [Object(f.jsx)("div", {
                    className: "go-back-btn",
                    onClick: function() {
                        d(""),
                        u([]),
                        c()
                    },
                    children: "Go Back"
                }), Object(f.jsxs)("div", {
                    className: "autocomplete-wrapper",
                    children: [Object(f.jsx)("input", {
                        className: "input-text",
                        type: "text",
                        placeholder: "KJFK, KSFO, KLAX...",
                        value: m,
                        onChange: function(e) {
                            return d(e.target.value)
                        },
                        onKeyPress: function(e) {
                            "Enter" === e.key && v(m)
                        },
                        maxlength: "4",
                        ref: p
                    }), h && Object(f.jsx)("div", {
                        className: "error-message",
                        children: h
                    }), Object(f.jsx)("div", {
                        className: "autocomplete-box",
                        children: o.slice(0, 10).map((function(e) {
                            return Object(f.jsx)("div", {
                                className: "autocomplete-item",
                                onClick: function() {
                                    return v(e)
                                },
                                children: y(e)
                            })
                        }
                        ))
                    }), 0 === o.length && Object(f.jsxs)("div", {
                        children: [Object(f.jsx)("div", {
                            className: "or",
                            children: "OR"
                        }), Object(f.jsx)("a", {
                            href: "/",
                            className: "pick-btn",
                            children: "Random airport"
                        })]
                    })]
                })]
            }) : null
        };
        c(50);
        function L(e) {
            var t = e.value
              , c = e.setValue
              , a = j(!1)
              , s = Object(i.a)(a, 3)
              , o = (s[0],
            s[1])
              , u = s[2]
              , r = Object(n.useRef)();
            function l(e) {
                var t = ((e.pageX ? e.pageX : e.touches[0].pageX) - r.current.getBoundingClientRect().left) / r.current.offsetWidth;
                c(t >= 0 && t <= 1 ? t : t < 0 ? 0 : 1)
            }
            function m(e) {
                l(e),
                o(!0)
            }
            function d(e) {
                l(e),
                o(!0)
            }
            return Object(n.useEffect)((function() {
                ["mousemove", "touchmove"].forEach((function(e) {
                    document.addEventListener(e, (function(e) {
                        u.current && l(e)
                    }
                    ))
                }
                )),
                ["mouseup", "touchend"].forEach((function(e) {
                    document.addEventListener(e, (function(e) {
                        o(!1)
                    }
                    ))
                }
                ))
            }
            ), []),
            Object(f.jsxs)("div", {
                className: "slider-input",
                onMouseDown: m,
                onTouchStart: d,
                children: [Object(f.jsx)("div", {
                    className: "slider-input-line",
                    ref: r
                }), Object(f.jsx)("div", {
                    className: "slider-input-line-solid",
                    style: {
                        width: "".concat(100 * t, "%")
                    }
                }), Object(f.jsx)("div", {
                    className: "slider-input-btn",
                    style: {
                        left: "".concat(100 * t, "%")
                    },
                    onMouseDown: m,
                    onTouchStart: d
                })]
            })
        }
        var U = function(e) {
            var t = e.show
              , c = e.goBackFn
              , a = Object(n.useContext)(A)
              , s = a.atcAudio
              , o = a.musicAudio
              , u = a.atcVolume
              , i = a.setAtcVolume
              , r = a.musicVolumeRef
              , l = a.setMusicVolume;
            return Object(n.useEffect)((function() {
                s.current && (s.current.volume = u)
            }
            ), [u]),
            Object(n.useEffect)((function() {
                o.current && (o.current.volume = r.current)
            }
            ), [r.current]),
            t ? Object(f.jsxs)("div", {
                className: "audio-settings-screen screen",
                children: [Object(f.jsx)("div", {
                    className: "go-back-btn",
                    onClick: c,
                    children: "Go Back"
                }), Object(f.jsx)("div", {
                    className: "settings-wrapper",
                    children: Object(f.jsxs)("div", {
                        className: "settings-content-wrapper",
                        children: [Object(f.jsxs)("div", {
                            className: "settings-item",
                            children: [Object(f.jsx)("h3", {
                                className: "settings-item-label",
                                children: "ATC Volume"
                            }), Object(f.jsx)(L, {
                                value: u,
                                setValue: i
                            })]
                        }), Object(f.jsxs)("div", {
                            className: "settings-item",
                            children: [Object(f.jsx)("h3", {
                                className: "settings-item-label",
                                children: "Music Volume"
                            }), Object(f.jsx)(L, {
                                value: r.current,
                                setValue: l
                            })]
                        })]
                    })
                })]
            }) : null
        }
          , T = [{
            name: "WYS - Snowman",
            youtube: "https://www.youtube.com/watch?v=j9ziXYpFs1I"
        }, {
            name: "Fatb - Cotton Cloud",
            youtube: "https://www.youtube.com/watch?v=7p9ydzEpePA"
        }, {
            name: "rook1e x tender spring - the places we used to walk",
            youtube: "https://www.youtube.com/watch?v=61NMgMEMWLg"
        }, {
            name: "imagiro - wool gloves",
            youtube: "https://www.youtube.com/watch?v=3GOylOK4e18"
        }, {
            name: "Glimlip x Yasper - I'm sorry",
            youtube: "https://www.youtube.com/watch?v=FnZiSWohkHA"
        }, {
            name: "mell-\xf8 - Nova",
            youtube: "https://www.youtube.com/watch?v=oN_r557ouD8"
        }, {
            name: "goosetaf x the fields tape x francis - carried away",
            youtube: "https://www.youtube.com/watch?v=Tz7MeFIILng"
        }, {
            name: "j'san x epektase - snow & sand",
            youtube: "https://www.youtube.com/watch?v=5V2nGGbUE6c"
        }, {
            name: "HM Surf - Single Phial",
            youtube: "https://www.youtube.com/watch?v=eR0XbyA3gYc"
        }, {
            name: "cocabona x Glimlip - Drops",
            youtube: "https://www.youtube.com/watch?v=ciRuNl7PtGs"
        }, {
            name: "Aso - espresso",
            youtube: "https://www.youtube.com/watch?v=Y4sbNEc94EE"
        }, {
            name: "Ambulo x mell-\xf8 - Luminescence",
            youtube: "https://www.youtube.com/watch?v=OpfHoK9VXys"
        }, {
            name: "DLJ x BID\xd8 - Explorers",
            youtube: "https://www.youtube.com/watch?v=TJLmyD6Feuo"
        }, {
            name: "Sarcastic Sounds - Wish You Were Mine",
            youtube: "https://www.youtube.com/watch?v=0Rqte6TTkHs"
        }, {
            name: "BluntOne - Reflections",
            youtube: "https://www.youtube.com/watch?v=PhxFvu2yEI0"
        }, {
            name: "Purrple Cat - Alone Time",
            youtube: "https://www.youtube.com/watch?v=eqmKCRU9rV8"
        }, {
            name: "Kupla - Owls of the Night",
            youtube: "https://www.youtube.com/watch?v=S7u5XMV8WFY"
        }, {
            name: "dryhope - Steps",
            youtube: "https://www.youtube.com/watch?v=0WWOLMcCWv4"
        }, {
            name: "ENRA - amber",
            youtube: "https://www.youtube.com/watch?v=aU4qUCpeQAk"
        }, {
            name: "Psalm Trees - fever",
            youtube: "https://www.youtube.com/watch?v=h5DVCtBD_YA"
        }, {
            name: "H.1 - Circle",
            youtube: "https://www.youtube.com/watch?v=96b26qRUFcQ"
        }, {
            name: "Pandrezz - Cuddlin",
            youtube: "https://www.youtube.com/watch?v=nSZlRU2EPYA"
        }, {
            name: "Jordy Chandra - Late Night Call",
            youtube: "https://www.youtube.com/watch?v=bzmM_CXAnxQ"
        }, {
            name: "less.people - Gyoza",
            youtube: "https://www.youtube.com/watch?v=FcvRGhG2FnI"
        }, {
            name: "G Mills - Keyframe",
            youtube: "https://www.youtube.com/watch?v=EejMDX4E7yU"
        }, {
            name: "mvdb - breeze",
            youtube: "https://www.youtube.com/watch?v=iPUUU1QPKro"
        }, {
            name: "Mondo Loops - Lunar Drive",
            youtube: "https://www.youtube.com/watch?v=ydgz6cXaA8c"
        }, {
            name: "Pollux Terminus - Clouded Thoughts",
            youtube: "https://open.spotify.com/album/6nakNRC332lsQ7nbDWC76b?si=pjjaWyCZQUm2AIV0OmurEA&nd=1"
        }, {
            name: "Pollux Terminus - Elsewhere",
            youtube: "https://open.spotify.com/album/6nakNRC332lsQ7nbDWC76b?si=pjjaWyCZQUm2AIV0OmurEA&nd=1"
        }, {
            name: "Flovry x tender spring - Channel 12",
            youtube: "https://www.youtube.com/watch?v=wJ5k63qazng"
        }, {
            name: "Kurt Stewart x Lomme \u2013 Window Seat",
            youtube: "https://www.youtube.com/watch?v=9DsLlsWuD_4"
        }, {
            name: "Kurt Stewart x Lomme \u2013 Daydreams",
            youtube: "https://www.youtube.com/watch?v=l_j1PWVzpNM"
        }, {
            name: "Living Room \u2013 Consciousness",
            youtube: "https://www.youtube.com/watch?v=ezORl9JOqkk"
        }, {
            name: "Living Room x Rudy Raw \u2013 Sleepmodee",
            youtube: "https://www.youtube.com/watch?v=BJHC7ZBFi-I"
        }, {
            name: "Trxxshed \u2013 Lost In Between",
            youtube: "https://www.youtube.com/watch?v=m_qQg3gQyD8"
        }, {
            name: "Trxxshed \u2013 Reminiscence",
            youtube: "https://www.youtube.com/watch?v=2C1nrfpqdPg"
        }, {
            name: "Trxxshed x Clangon \u2013 Synesthesia",
            youtube: "https://www.youtube.com/watch?v=pzvBkRE-SRo"
        }, {
            name: "Kainbeats x kudo \u2013 Wanderer",
            youtube: "https://www.youtube.com/watch?v=Dh6DghQZpUk"
        }, {
            name: "Casiio x Sleepermane \u2013 Afterglow",
            youtube: "https://www.youtube.com/watch?v=NjDLja4ob1w"
        }, {
            name: "Casiio x Sleepermane \u2013 Bamboo",
            youtube: "https://www.youtube.com/watch?v=7aW4OPzGvuE"
        }, {
            name: "Casiio x Sleepermane \u2013 Cycles",
            youtube: "https://www.youtube.com/watch?v=xjceqbdXUB4"
        }, {
            name: "Casiio x Sleepermane x \xd8DYSSEE \u2013 Suntai",
            youtube: "https://www.youtube.com/watch?v=EkoamWXpKbI"
        }, {
            name: "Casiio x Sleepermane \u2013 Maya",
            youtube: "https://www.youtube.com/watch?v=1Ox6_gvTx5s"
        }, {
            name: "Casiio x Sleepermane \u2013 Particles",
            youtube: "https://www.youtube.com/watch?v=PsA7p0Fc9mQ"
        }, {
            name: "Casiio x Sleepermane \u2013 Magenta",
            youtube: "https://www.youtube.com/watch?v=-i-3STX7QSs"
        }, {
            name: "Casiio x Sleepermane \u2013 Returnal",
            youtube: "https://www.youtube.com/watch?v=Jg7uJj8aEOA"
        }, {
            name: "Casiio x Sleepermane \u2013 Distant Blue",
            youtube: "https://www.youtube.com/watch?v=kKekTf8Ljvo"
        }, {
            name: "Casiio x Sleepermane \u2013 Mockingbird",
            youtube: "https://www.youtube.com/watch?v=V-0rAbrUb_8"
        }, {
            name: "Casiio x Sleepermane \u2013 Atoms",
            youtube: "https://www.youtube.com/watch?v=cd1q9EWGlUI"
        }, {
            name: "Kainbeats x Towerz \u2013 Glass Spire",
            youtube: "https://www.youtube.com/watch?v=SmioVk2rVEY"
        }, {
            name: "Kainbeats x cxlt. \u2013 Palace in The Sky",
            youtube: "https://www.youtube.com/watch?v=76JG1KJyqGI"
        }, {
            name: "Kainbeats x Kurt Stewart \u2013 Respite",
            youtube: "https://www.youtube.com/watch?v=3yZonj6gdt0"
        }, {
            name: "Kainbeats x softy \u2013 Cloudy Springs",
            youtube: "https://www.youtube.com/watch?v=K7EUBOYmuyE"
        }, {
            name: "Kainbeats x S N U G \u2013 Hillside Tree",
            youtube: "https://www.youtube.com/watch?v=c58j1P6DFXE"
        }]
          , D = (c(51),
        c(52),
        "AUDIO_PLAYER")
          , K = "AIRPORT_SELECT"
          , V = "AUDIO_SETTINGS";
        var B = function() {
            var e = Object(n.useState)(D)
              , t = Object(i.a)(e, 2)
              , c = t[0]
              , a = t[1]
              , s = Object(n.useState)(null)
              , o = Object(i.a)(s, 2)
              , u = o[0]
              , r = o[1]
              , l = Object(n.useState)(null)
              , m = Object(i.a)(l, 2)
              , d = m[0]
              , b = m[1];
            function h() {
                I()("/airport/random").then((function(e) {
                    if (200 === e.status) {
                        r(e.data);
                        var t = new URLSearchParams(window.location.search);
                        t.set("icao", e.data.icao.toLowerCase()),
                        window.history.replaceState(null, null, "?" + t.toString())
                    }
                }
                )).catch((function() {
                    r({
                        icao: "KJFK",
                        feedUrl: "https://www.liveatc.net/hlisten.php?mount=kjfk_twr&icao=kjfk",
                        feedLabel: "KJFK Tower",
                        name: "John F Kennedy International Airport",
                        feedFrequencies: {
                            "Boston Center (HTO31 Sector)": "124.525",
                            "Boston Center (SOUTHIE49 Sector)": "132.300"
                        },
                        audioUrl: "s1-bos.liveatc.net/kjfk_twr"
                    })
                }
                ))
            }
            function j() {
                b(w(T.length))
            }
            return Object(n.useEffect)((function() {
                var e = new URLSearchParams(window.location.search)
                  , t = e.get("icao");
                t ? function(e) {
                    return I()("/airport/".concat(e))
                }(t).then((function(e) {
                    200 === e.status && r(e.data)
                }
                )).catch((function() {
                    h()
                }
                )) : h();
                var c = e.get("music") ? Number(e.get("music")) : isNaN;
                !isNaN(c) && c >= 0 && c < T.length ? b(c) : (j(),
                e.delete("music"),
                window.history.replaceState({}, document.title, "?" + e.toString()))
            }
            ), []),
            Object(f.jsxs)("div", {
                className: "App",
                children: [null !== d && Object(f.jsx)(M, {
                    selectedMusicIndex: d,
                    setSelectedMusicIndex: b,
                    musicOptions: T,
                    selectedAirport: u,
                    showAudioPlayer: c == D,
                    randomizeMusic: j
                }), Object(f.jsx)(F, {
                    show: c == K,
                    goBackFn: function() {
                        a(D)
                    }
                }), Object(f.jsx)(U, {
                    show: c == V,
                    goBackFn: function() {
                        a(D)
                    }
                }), c == D && Object(f.jsxs)("div", {
                    className: "sidebar-actions",
                    children: [Object(f.jsxs)("div", {
                        className: "sidebar-action",
                        onClick: function() {
                            return a(K)
                        },
                        children: [Object(f.jsx)("img", {
                            src: "/assets/icons/airport-white.svg"
                        }), Object(f.jsx)("p", {
                            className: "desktop-only",
                            children: "Airport"
                        })]
                    }), Object(f.jsxs)("div", {
                        className: "sidebar-action desktop-only",
                        onClick: function() {
                            return a(V)
                        },
                        children: [Object(f.jsx)("img", {
                            src: "/assets/icons/volume-white.svg"
                        }), Object(f.jsx)("p", {
                            className: "desktop-only",
                            children: "Settings"
                        })]
                    })]
                }), Object(f.jsxs)("div", {
                    className: "links",
                    children: [Object(f.jsx)("a", {
                        className: "feedback-link",
                        href: "https://docs.google.com/forms/d/e/1FAIpQLSfuAQ-fy0ZmQUX2uYRbAzIlHSyCVA1Ad_AOwuWtq1HU2-_Anw/viewform",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "\ud83d\udcac Share feedback"
                    }), Object(f.jsx)("span", {
                        children: "  |  "
                    }), Object(f.jsx)("a", {
                        className: "feedback-link",
                        href: "https://www.buymeacoffee.com/lofiatc",
                        target: "_blank",
                        children: "\u2615 Buy me a coffee"
                    })]
                })]
            })
        }
          , G = function(e) {
            e && e instanceof Function && c.e(3).then(c.bind(null, 54)).then((function(t) {
                var c = t.getCLS
                  , n = t.getFID
                  , a = t.getFCP
                  , s = t.getLCP
                  , o = t.getTTFB;
                c(e),
                n(e),
                a(e),
                s(e),
                o(e)
            }
            ))
        };
        u.a.initialize("UA-210940156-1"),
        u.a.pageview(window.location.pathname + window.location.search),
        o.a.hydrate(Object(f.jsx)(a.a.StrictMode, {
            children: Object(f.jsx)(k, {
                children: Object(f.jsx)(B, {})
            })
        }), document.getElementById("root")),
        G()
    }
}, [[53, 1, 2]]]);
//# sourceMappingURL=main.23950fea.chunk.js.map
