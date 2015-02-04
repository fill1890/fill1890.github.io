/*global document, window, requestAnimationFrame, setTimeout, console */

function scrollToTop(scrollDuration) {
    "use strict";
    var scrollHeight = window.scrollY,
        scrollStep = Math.PI / (scrollDuration / 15),
        cosParameter = scrollHeight / 2,
        scrollCount = 0,
        scrollMargin;
    
    function step() {
        setTimeout(function () {
            if (window.scrollY !== 0) {
                requestAnimationFrame(step);
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                window.scrollTo(0, (scrollHeight - scrollMargin));
            }
        }, 15);
    }
    
    requestAnimationFrame(step);
}


(function () {
    "use strict";
    if (!window.$) {
        var $ = function (select) {
            var x = document.querySelectorAll(select);
            return x.length > 1 ? x : x[0];
        }; // $() Selector
        window.$ = $;
    }
    if (!window.height) {
        window.height = parseInt(window.getComputedStyle(window.$('.page1')).height, 10);
    }
}());

/*function scrollByY(distance, duration) {
    var step = Math.PI / (duration * 15),
        cosParam = distance / 2,
        count = 0,
        margin;
    requestAnimationFrame(move);
    
    function move() {
        setTimeout(function() {
            console.log('Animate');
            if (count < cosParam) {
                requestAnimationFrame(move);
                count += 1;
                console.log(count + ' ' + cosParam + ' ' + step);
                margin = (cosParam - cosParam * Math.abs(Math.cos(count * step))) / duration;
                console.log(margin);
                window.scrollBy(0, margin);
            }
        }, 15);
    }
}*/


// 50ms per frame, 20fps
// 2000ms (2sec) = 40 frames
// 1000ms (1sec) = 20 frames
// 100ms = 2 frames

// If step x count < π, animate
// Set margin to cosine of count
// Absolute value of margin
// Invert (x = 1 - x)
// Multiply by half of distance?? (Magic number)
// Add step to count
// Repeat


/* The cosine function is fed the x-coordinate (The step in this case), which then 
replies with the y-coordinate (How far to move from 1 to -1 in this case).
Therefore, we need to feed the cosine function <count * step>.
The cosine function will then return a representation of how far to move, on a scale of 1 to -1.*/

// Before we do anything else, we should make the number always positive. <Math.abs(margin)>

/* We can do the next step in two slightly different ways.
1. Use <1 - margin> to make 1 0, and 0 1. This means that a reply of 0 means no movement, while 1 means the most.
2. Multiply the answer by something, then subtract the answer from that something to get the value.
After the first method, the result must be mulitplied by something to use it well, whereas the second method
does this automatically.
*/

// But what do we multiply the result of the cosine by? All of the cosine steps put together must equal the distance.

/* Revised method. Use the initial scroll margin, and add to it, then use <window.scrollTo(x, y)> instead. */

function scrollByY(scrollDistance, scrollDuration) {
    "use strict";
    var scrollHeight = window.scrollY + scrollDistance,
        scrollInitial = window.scrollY,
        scrollStep = Math.PI / (scrollDuration / 15),
        cosParameter = 348,
        scrollCount = 0,
        scrollMargin;
    function step() {
        setTimeout(function () {
            if (Math.ceil(window.scrollY) - scrollInitial !== scrollDistance && Math.floor(window.scrollY) - scrollInitial !== scrollDistance) {
                requestAnimationFrame(step);
                scrollCount += 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                console.log('Margin: ' + scrollMargin);
                if (scrollDistance > 0) {
                    window.scrollTo(0, (scrollInitial + scrollMargin));
                } else if (scrollDistance < 0) {
                    window.scrollTo(0, (scrollInitial - scrollMargin));
                }
            } else if (scrollDistance > 0) {
                window.scrollTo(0, Math.ceil(window.scrollY));
            } else if (scrollDistance < 0) {
                window.scrollTo(0, Math.floor(window.scrollY));
            }
        }, 15);
    }
    
    requestAnimationFrame(step);
    
    console.log('scrollHeight: ' + scrollHeight);
    console.log('scrollInitial: ' + scrollInitial);
    console.log('scrollStep: ' + scrollStep);
    console.log('cosParameter: ' + cosParameter);

    
}

function testingY(scrollDistance) {
    "use strict";
    var increment = 1 / scrollDistance,
        x = 0,
        scroll = 0;
    console.log(increment);
    function step() {
        x = ((x * 1000) + (increment * 1000)) / 1000;
        scroll = Math.abs(Math.sin(Math.PI * x / 1000) * 1000);
        window.scrollBy(0, scroll);
        console.log("Scroll: " + scroll + "\nx: " + x);
        if (x === 1) {
            return;
        } else {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
    
}
