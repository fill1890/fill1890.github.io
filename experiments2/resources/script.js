/*global $, document, window, setTimeout, console */

var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    pos = 0,
    scroll = 0,
    select = '',
    scroll2 = 0;

/* Custom Shortcut Functions */

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
        var select = document.querySelectorAll(selector);
        this.elem = select[0];
        this.elems = select;
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
            value = value || false;
            if (value !== false) {
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

function toggleCss(params, select) {
    for (var i = 0; i < params.length; i++) {
        var props = params[i].split(":"),
            currentStyle = $$(select)[0].getAttribute('style') || "";
            stylePos = currentStyle.indexOf(props[1]);
        if (stylePos === -1) {
            $$(select)[0].style[props[0]] = props[1];
        } else {
            $$(select)[0].style[props[0]] = props[2];
        }
        return;

    }
    return;

}

function menuScale() {
    print("Move");
    var shiftUp = new Array(
            'transform:translate(0px, -100%):translate(0,0)'
        ),
        shiftUp2 = new Array(
            'transform:translate(0px, -200%):translate(0,0)'
        ),
        shiftAway = new Array(
            'transform:translate3d(25%, 0px, -1000px):translate3d(0,0,0)'
        ),
        overflow = new Array('overflow:hidden:visible');
    toggleCss(shiftAway, '.carouselMain');
    toggleCss(shiftUp, '.weatherPage');
    toggleCss(shiftUp2, '.thirdPage');
    return;
}

/*(function () {
    var $ = function (selector) {
        var select = document.querySelectorAll(selector),
            i = 0;
        if (select.length == 1) {
            select = document.querySelector(selector);
        }
        this.css = function () {
            print('CSS');
        };
        return select;
    };
    $.fn = $.prototype = {
        css: function () {
            print('CSS');
        }
    };
    if (!window.$) {
        window.$ = $;
    }
})();*/



/*$.fn.scrollPage = function (op) {
    if (scroll === 0) {
        scroll = 1;
        if (op == '-') {
            pos -= 100;
        }
        if (op == '+') {
            pos += 100;
        }
        if (pos == 100) {
            pos = 0;
        }
        $('.scrolling section').css({
            '-webkit-transform': 'translateY(' + pos + '%)',
            '-ms-transform': 'translateY(' + pos + '%)',
            'transform': 'translateY(' + pos + '%)'
        });
        setTimeout(function () {
            scroll = 0;
        }, 1000);
    }
    / / console.log("Down");
//eval('change ' + op + '= 100')
};

$(document).bind('mousewheel DOMMouseScroll', function (event) {
    if (scroll2 === 0) {
        event.preventDefault();
        var delta = event.originalEvent.wheelDelta; //|| -event.originalEvent.detail;
        scroll2 = 1;
        if (delta < 0) {
            $('.scrolling section').scrollPage('-');
        } else {
            $('.scrolling section').scrollPage('+');
        }
        setTimeout(function () {
            scroll2 = 0;
        }, 1500);
    }
});

/*$(document).keydown(function (e) {
    switch (e.which) {
    case 37: // left
        break;

    case 38: // up
        $('.scrolling section').scrollPage('+');
        break;

    case 39: // right
        break;

    case 40: // down
        $('.scrolling section').scrollPage('-');
        break;

    default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
}); */


/* Swipe Events */

/* $.fn.swipeEvents = function () {
    return this.each(function () {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
            var touches = event.originalEvent.touches;
            if (touches && touches.length) {
                startX = touches[0].pageX;
                startY = touches[0].pageY;
                $this.bind('touchmove', touchmove);
            }
        }

        function touchmove(event) {
            var touches = event.originalEvent.touches;
            if (touches && touches.length) {
                var deltaX = startX - touches[0].pageX;
                var deltaY = startY - touches[0].pageY;

                if (deltaX >= 50) {
                    $this.trigger('swipeLeft');
                }
                if (deltaX <= -50) {
                    $this.trigger('swipeRight');
                }
                if (deltaY >= 50) {
                    $this.trigger('swipeUp');
                }
                if (deltaY <= -50) {
                    $this.trigger('swipeDown');
                }
                if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
                    $this.unbind('touchmove', touchmove);
                }
            }
        }

    });
}; */