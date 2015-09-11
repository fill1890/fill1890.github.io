/*global $, document, window, setTimeout, console */

var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    pos = 0,
    scroll = 0,
    select = '',
    scroll2 = 0;

function toggleRotate() {
    console.log("Fired");
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
};

function rotateTo(degrees) {
    var distOut = (window.innerWidth + Math.sqrt(2) * window.innerWidth) / 2;
    var carousel = document.querySelector(".carousel"),
        carouselParent = document.querySelector(".carouselParent");
    var rot = "0";
    carouselParent.style.transform = "translateZ(-500px)";
    console.log(distOut);
    console.log(carousel);
    console.log(carouselParent);
    setTimeout(function () {
        document.querySelector(".carousel").style.transform = "translateZ(-" + distOut.toString() + "px) rotateY(" + degrees.toString() + "deg)";
    }, 500);
    setTimeout(function () {
        console.log("Stage 2");
        carouselParent.style.transform = "translateZ(0)";
        console.log("Complete");
    }, 1000);
}

function print(text) {
    console.log(text);
    return;
}

function array(data) {
    var o = {},
        i = 0;
    for (i = 0; i < data.length; i = i + 1) {
        o[data[i]] = '';
    }
    return o;
}

function $$(selector) {
    // Wrapper for $(selector).elems
    return $(selector).elems;
}

/* Javascript */

function analogBegin() {
    var secondMarkers = $$('.analogSecondMarkers circle'),
        loop = 0,
        hourMarkers = $$('.analogHourMarkers g'),
        hLoop = 0,
        i = 0;
    for (i = 0; i < secondMarkers.length; i = i + 1) {
        secondMarkers[i].style['-webkit-transform'] = "rotate(" + loop + "deg)";
        secondMarkers[i].style['-moz-transform'] = "rotate(" + loop + "deg)";
        secondMarkers[i].style['-ms-transform'] = "rotate(" + loop + "deg)";
        secondMarkers[i].style['-o-transform'] = "rotate(" + loop + "deg)";
        secondMarkers[i].style.transform = "rotate(" + loop + "deg)";
        loop += 30;
    }
    for (i = 0; i < secondMarkers.length; i = i + 1) {
        hourMarkers[i].style['-webkit-transform'] = "rotate(" + hLoop + "deg)";
        hourMarkers[i].style['-moz-transform'] = "rotate(" + hLoop + "deg)";
        hourMarkers[i].style['-ms-transform'] = "rotate(" + hLoop + "deg)";
        hourMarkers[i].style['-o-transform'] = "rotate(" + hLoop + "deg)";
        hourMarkers[i].style.transform = "rotate(" + hLoop + "deg)";
        hLoop += 30;
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkTimeH(i) {
    if (i > 12) {
        i = i - 12;
    }
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkAnalog(h, m, s) {
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
        $('.analogMinute').css("-webkit-transform", "rotate(" + (m * 6) + "deg)");
    }
    if (h === 12) {
        if (($('.analogHour').css("transform") === 'rotate(330deg)')) {
            $('.analogHour').css("-webkit-transform", "rotate(360deg");
            setTimeout(function () {
                $('.analogHour').css("-webkit-transition", "none");
                $('.analogHour').css("-webkit-transform", "rotate(0deg)");
                setTimeout(function () {
                    $('.analogHour').css("-webkit-transition", "all 0.45s");
                }, 50);
            }, 450);
        }
    } else {
        $('.analogHour').css("-webkit-transform", "rotate(" + (h * 30) + "deg)");
    }
}

function time() {
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
    var Library = function (selector) {
            // Set selection to specified selector
            if (selector != null) {
            var select = document.querySelectorAll(selector);
            this.elem = select[0];
            this.elems = select;
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

            }
        }
    };
    if (!window.$) {
        window.$ = $;
    }
})();

(function () {
    setTimeout(function () {
        analogBegin();
        time();
        date();
    }, 50);
})();

function toggleCss(params, select, delay) {
    delay = delay || 0;
    var selectedElems = document.querySelectorAll(select);
    function toggle(j, selectedElems) {
        for (var i = 0; i < params.length; i++) {
            var props = params[i].split(":"),
                currentStyle = selectedElems[j].getAttribute('style') || "",
                stylePos = currentStyle.indexOf(props[1]);
            if (stylePos < 0) {
                elem = $(null);
                elem.elem = selectedElems[j];
                elem.css(props[0], props[1])
            } else {
                elem = $(null);
                elem.elem = selectedElems[j];
                elem.css(props[0], props[2])
            }
            if (j < selectedElems.length - 1) {
                setTimeout(function () {
                    toggle(j + 1, selectedElems);
                }, delay);
            }

        }
    }
    setTimeout(function () {
        toggle(0, selectedElems);
    }, delay)
    return;

}

function menuScale() {
    print("Move");3
    var shiftUp = new Array(
            'transform:translate(0px, -100%):translate(0,0)'
        ),
        shiftUp2 = new Array(
            'transform:translate(0px, -200%):translate(0,0)'
        ),
        shiftAway = new Array(
            'transform:translate3d(25%, 0px, -150vw):translate3d(0,0,0)'
        ),
        changeColor = new Array(
            'fill:#ffffff:#000000'
        ),
        overflow = new Array('overflow:hidden:visible');
    toggleCss(shiftAway, '.carouselMain');
    toggleCss(shiftUp, '.weatherPage');
    toggleCss(shiftUp2, '.thirdPage');
    toggleCss(changeColor, '.menuButton rect');
    return;
}