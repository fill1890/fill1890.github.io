/* ===========================================================
 * jquery-onepage-scroll.js v1.2
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

! function ($) {

    var defaults = {
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        keyboard: true,
        beforeMove: null,
        afterMove: null,
        loop: false,
        responsiveFallback: false
    };

    $.fn.onepage_scroll = function (options) {
        var settings = $.extend({}, defaults, options),
            el = $(this),
            sections = $(settings.sectionContainer),
            total = sections.length,
            status = "off",
            topPos = 0,
            lastAnimation = 0,
            quietPeriod = 500,
            paginationList = "";

        $.fn.transformPage = function (settings, pos, index) {
            $(this).css({
                "-webkit-transform": "translate3d(0, " + pos + "%, 0)",
                "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-moz-transform": "translate3d(0, " + pos + "%, 0)",
                "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-ms-transform": "translate3d(0, " + pos + "%, 0)",
                "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "transform": "translate3d(0, " + pos + "%, 0)",
                "transition": "all " + settings.animationTime + "ms " + settings.easing
            });
            $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                if (typeof settings.afterMove == 'function') settings.afterMove(index);
            });
        };

        function init_scroll(event, delta) {
            deltaOfInterest = delta;
            if (deltaOfInterest < 0) {
                el.moveDown();
            } else {
                el.moveUp();
            }
            lastAnimation = timeNow;
        }

        $(document).bind('mousewheel DOMMouseScroll', function (event) {
            event.preventDefault();
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            if (delta < 0) {
                el.moveDown();
            } else {
                el.moveUp();
            }
        });


        if (settings.responsiveFallback != false) {
            $(window).resize(function () {
                responsive();
            });

            responsive();
        }

        if (settings.keyboard == true) {
            $(document).keydown(function (e) {
                var tag = e.target.tagName.toLowerCase();

                if (!$("body").hasClass("disabled-onepage-scroll")) {
                    switch (e.which) {
                    case 38:
                        if (tag != 'input' && tag != 'textarea') el.moveUp()
                        break;
                    case 40:
                        if (tag != 'input' && tag != 'textarea') el.moveDown()
                        break;
                    default:
                        return;
                    }
                }

                e.preventDefault();
            });
        }
        return false;
    }


}(window.jQuery);