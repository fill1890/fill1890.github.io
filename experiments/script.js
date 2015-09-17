/*global $, document, window, setTimeout, console */

var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    pos = 0,
    scroll = 0,
    select = '',
    scroll2 = 0,
    carouselRotate = 0,
    prefixProps = {};

/*function toggleRotate() {
    "use strict";
    var elemLeft = document.querySelectorAll(".block.left");
    var elemRight = document.querySelectorAll(".block.right");
    if (elemLeft[0].style.transform == "rotateY(90deg)") {
        function loopOut(i) {
            setTimeout(function () {
                elemLeft[i].style.transform = "rotateY(0deg)";
                elemRight[i].style.transform = "rotateY(0deg)";
                i--;
                if (i >= 0) {
                    loopOut(i);
                }
            }, 150)
        }
        loopOut(elemLeft.length - 1)
    } else {
        function loopIn(i) {
            setTimeout(function () {
                elemLeft[i].style.transform = "rotateY(90deg)";
                elemRight[i].style.transform = "rotateY(-90deg)";
                i++;
                if (i < elemLeft.length) {
                    loopIn(i);
                }
            }, 150)
        }
        loopIn(0)
    }
};*/

/*function rotateTo(degrees) {
    var distOut = (window.innerWidth + Math.sqrt(2) * window.innerWidth) / 2;
    var carousel = document.querySelector(".carousel"),
        carouselParent = document.querySelector(".carouselParent");
    var rot = "0";
    carouselParent.style.transform = "translateZ(-500px)";
    setTimeout(function () {
        document.querySelector(".carousel").style.transform = "translateZ(-" + distOut.toString() + "px) rotateY(" + degrees.toString() + "deg)";
    }, 500);
    setTimeout(function () {
        carouselParent.style.transform = "translateZ(0)";
    }, 1000);
}*/

function print(text) {
    "use strict";
    console.log(text);
    return;
}

function array(data) {
    "use strict";
    var o = {},
        i = 0;
    for (i = 0; i < data.length; i = i + 1) {
        o[data[i]] = '';
    }
    return o;
}

function $$(selector) {
    "use strict";
    // Wrapper for $(selector).elems
    return $(selector).elems;
}

/* Javascript */

function analogBegin() {
    "use strict";
    var secondMarkers = $('.analogSecondMarkers circle').elems,
        loop = 0,
        hourMarkers = $('.analogHourMarkers g').elems,
        hLoop = 0,
        i = 0;
    for (i = 0; i < secondMarkers.length; i = i + 1) {
        $(secondMarkers[i]).css('transform', "rotate(" + loop + "deg)");
        loop += 30;
    }
    console.log(hourMarkers.length);
    for (i = 0; i < hourMarkers.length; i = i + 1) {
        $(hourMarkers[i]).css('transform', "rotate(" + hLoop + "deg)");
        hLoop += 30;
    }
}

function checkTime(i) {
    "use strict";
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkTimeH(i) {
    "use strict";
    if (i > 12) {
        i = i - 12;
    }
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkAnalog(h, m, s) {
    "use strict";
    if (s === 0) {
        if (($('.analogSecond').css("transform")) === 'rotate(354deg)') {
            $('.analogSecond').css("transform", "rotate(360deg)");
            setTimeout(function () {
                $('.analogSecond').css("transition", "none");
                $('.analogSecond').css("transform", "rotate(0deg)");
                setTimeout(function () {
                    $('.analogSecond').css("transition", "all 0.45s");
                }, 50);
            }, 450);
        }
    } else {
        $('.analogSecond').css("transform", "rotate(" + (s * 6) + "deg)");
    }

    if (m === 0) {
        if (($('.analogMinute').css("transform")) === 'rotate(354deg)') {
            $('.analogMinute').css("transform", "rotate(360deg)");
            setTimeout(function () {
                $('.analogMinute').css("transition", "none");
                $('.analogMinute').css("transform", "rotate(0deg)");
                setTimeout(function () {
                    $('.analogMinute').css("transition", "all 0.45s");
                }, 50);
            }, 450);
        }
    } else {
        $('.analogMinute').css("transform", "rotate(" + (m * 6) + "deg)");
    }
    if (h === 12) {
        if (($('.analogHour').css("transform") === 'rotate(330deg)')) {
            $('.analogHour').css("transform", "rotate(360deg");
            setTimeout(function () {
                $('.analogHour').css("transition", "none");
                $('.analogHour').css("transform", "rotate(0deg)");
                setTimeout(function () {
                    $('.analogHour').css("transition", "all 0.45s");
                }, 50);
            }, 450);
        }
    } else {
        $('.analogHour').css("transform", "rotate(" + (h * 30) + "deg)");
    }
}

function time() {
    "use strict";
    var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();
    h = checkTimeH(h);
    checkAnalog(h, m, s);
    m = checkTime(m);
    s = checkTime(s);
    $$(".time .hours")[0].innerHTML = h;
    $$(".time .minutes")[0].innerHTML = m;
    $$(".time .seconds")[0].innerHTML = s;
    setTimeout(function () {
        time();
    }, 100);
}


function date() {
    "use strict";
    var today = new Date(),
        d = today.getDay(),
        mo = today.getMonth(),
        dt = today.getDate();
    d = day[d];
    mo = month[mo];
    $$(".date")[0].innerHTML = d + ", " + mo + " " + dt;
}

/* Custom Library Functions */

(function () {
    "use strict";
    var Library = function (selector) {
            // Set selection to specified selector
            if (selector !== null && typeof (selector) === "string") {
                var select = document.querySelectorAll(selector);
                this.elem = select[0];
                this.elems = select;
            } else if (selector !== null && typeof (selector) === "object") {
                this.elem = selector;
                this.elems = [selector];
            } else {
                this.elem = null;
                this.elems = null;
            }
            this.version = '0.0.5';
            return this;

        },
        $ = function (selector) {
            // Get library and functions
            var libs = new Library(selector);
            return libs;
        };
    $.fn = Library.prototype = {
        hide: function () {
            this.elem.style.visibility = 'hidden';
            return this;
        },

        show: function () {
            this.elem.style.visibility = 'visible';

            return this;
        },
        css: function (property, value) {
            var prop = prefixProps[property] || getPrefix(property),
                i = 0;
            this.elems = this.elems || [this.elem];
            if (value) {
                for (i = 0; i < this.elems.length; i = i + 1) {
                    this.elems[i].style[prop] = value;
                }
            } else {
                return this.elem.style[prop];
            }
            /*
            var i = 0,
                prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''],
                required = ['transform', 'transform-origin', 'transition'];
            value = value || '';
            if (value !== '') {
                var newProps = [],
                    newVals = [],
                    newPropReq = false,
                    newValReq = false;
                if (property in array(required)) {
                    for (i = 0; i < prefixes.length; i++) {
                        newProps[i] = prefixes[i] + property;
                        newPropReq = true;
                    }
                }
                if (value in array(required)) {
                    for (i = 0; i < prefixes.length; i++) {
                        newVals[i] = prefixes[i] + value;
                        newValReq = true;
                    }
                }
                if (newValReq === true && newPropReq === true) {
                    for (i = 0; i < newProps.length; i++) {
                        this.elem.style[newProps[i]] = newVals[i];
                    }
                } else if (newValReq === true && newPropReq === false) {
                    for (i = 0; i < newVals.length; i++) {
                        this.elem.style[property] = newVals[i];
                    }
                } else if (newPropReq === true && newValReq === false) {
                    for (i = 0; i < newProps.length; i++) {
                        this.elem.style[newProps[i]] = value;
                    }
                } else {
                    this.elem.style[property] = value;
                }
            } else {
                if (property in array(required)) {
                    for (i = 0; i < prefixes.length; i++) {
                        var newProp = prefixes[i] + property;
                        if (newProp !== undefined) {
                            return this.elem.style[newProp];
                        }
                    }
                } else {
                    return this.elem.style[property];
                }

            }*/
        }
    };
    if (!window.$) {
        window.$ = $;
    }
}());

(function () {
    "use strict";
    var tileNodes = document.querySelectorAll('.tile'),
        tiles = Array.prototype.slice.call(tileNodes),
        pageNodes = document.querySelectorAll('.page'),
        pages = Array.prototype.slice.call(pageNodes),
        i = 0;
    /*for (i = 0; i < tiles.length; i = i + 1) {
        tiles[i].addEventListener('click', function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                rotate = target.getAttribute("data-rotate");
            rotateCarousel(rotate);
        });
        pages[i].addEventListener('click', function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                style = target.getAttribute("style"),
                transform = style.substring(style.indexOf('transform:'), style.length);
            transform = transform.substring(0, transform.indexOf(";"));
            var rotate = transform.substring(transform.indexOf('rotateY(') + 8, transform.indexOf('deg)'));
            rotateCarousel(rotate);
        });
    }*/
    tiles.forEach(function (tile) {
        tile.addEventListener('click', function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                rotate = target.getAttribute("data-rotate");
            rotateCarousel(rotate);
        });
    });
    pages.forEach(function (page) {
        page.addEventListener('click', function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                transform = $(target).css('transform'),
                pos = transform.indexOf('rotateY('),
                rotateStr = transform.substr(pos + 8, 3),
                rotate = parseInt(rotateStr, 10);
            console.log(pos);
            console.log(rotateStr);
            console.log(rotate);
            rotateCarousel(rotate);
        });
    });
    setTimeout(function () {
        analogBegin();
        time();
        date();
    }, 50);
}());

function toggleCss(params, select, delay) {
    "use strict";
    delay = delay || 0;
    var selectedElems = document.querySelectorAll(select);

    function toggle(j, selectedElems) {
        var i = 0;
        params.forEach(function (param, i, params) {
            var props = params[i].split(":"),
                currentStyle = selectedElems[j].getAttribute('style') || "",
                stylePos = currentStyle.indexOf(props[1]),
                elem;
            if (stylePos < 0) {
                elem = $(null);
                elem.elem = selectedElems[j];
                elem.css(props[0], props[1]);
            } else {
                elem = $(null);
                elem.elem = selectedElems[j];
                elem.css(props[0], props[2]);
            }
            if (j < selectedElems.length - 1) {
                setTimeout(function () {
                    toggle(j + 1, selectedElems);
                }, delay);
            }

        });
    }
    setTimeout(function () {
        toggle(0, selectedElems);
    }, delay);
    return;

}

function menuScale() {
    "use strict";
    var shiftAway = ['transform:translate3d(25%, 0px, -150vw):translate3d(0,0,0)'],
        changeColor = ['fill:#ffffff:#000000'],
        overflow = ['overflow:hidden:visible'],
        scale = ['transform:scale(1, 1):scale(0, 0)'];
    toggleCss(shiftAway, '.carouselMain');
    toggleCss(changeColor, '.menuButton rect');
    toggleCss(scale, '.tileContainer');
    return;
}

function rotateCarousel(deg) {
    "use strict";
    var distOut = (window.innerWidth + Math.sqrt(2) * window.innerWidth) / 2;
    deg = sanitizeDeg(parseInt(deg, 10));
    if (Math.abs(carouselRotate - deg) > 180) {
        var oldTransition = $('.carousel').css('transition'),
            rotateOne = carouselRotate - 360,
            rotateTwo = carouselRotate + 360,
            newRotate = Math.abs(rotateOne - deg) < Math.abs(rotateTwo - deg) ? rotateOne : rotateTwo;
        $('.carousel').css('transition', 'all 0s');
        setTimeout(function () {
            $('.carousel').css('transform', 'translateZ(-' + distOut + 'px) rotateY(' + newRotate.toString() + 'deg)');
        }, 5);
        setTimeout(function () {
            $('.carousel').css('transition', oldTransition);
        }, 10);
    }
    carouselRotate = deg;
    setTimeout(function () {
        $('.carousel').css('transform', 'translateZ(-' + distOut + 'px) rotateY(' + deg.toString() + 'deg)');
    }, 15);
}

function sanitizeDeg(deg) {
    "use strict";
    var pairs = {
        0: 0,
        45: 315,
        90: 270,
        135: 225,
        180: 180,
        225: 135,
        270: 90,
        315: 45,
        360: 360
    };
    console.log(deg);
    console.log(pairs[deg]);
    return pairs[deg];
}

function getPrefix(prop) {
    "use strict";
    var prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'],
        found = false,
        i = 0;
    while (found === false && i < prefixes.length) {
        if (document.body.style.hasOwnProperty(prefixes[i] + prop)) {
            prefixProps[prop] = prefixes[i] + prop;
            found = true;
        }
        i = i + 1;
    }
    if (found === true) {
        return prefixes[i - 1] + prop;
    } else {
        return null;
    }
}