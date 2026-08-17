// Infinite right-to-left marquee.
// Generates as many copies of the text as needed to fill the bar,
// so the message repeats across the whole width and loops seamlessly.
(function () {
    "use strict";

    var bar = document.querySelector(".marquee-bar");
    if (!bar) {
        return;
    }

    var track = document.createElement("div");
    track.className = "marquee-track";

    var text = "Download our games, completely free!   ";

    // Keep adding copies until the track is wider than the bar.
    // One extra copy guarantees no gaps while it scrolls.
    function ensureFilled() {
        while (track.scrollWidth < bar.clientWidth * 2) {
            var span = document.createElement("span");
            span.textContent = text;
            track.appendChild(span);
        }
    }

    track.appendChild(document.createElement("span"));
    bar.appendChild(track);
    ensureFilled();

    // Rebuild if the window resizes.
    window.addEventListener("resize", function () {
        track.innerHTML = "";
        track.appendChild(document.createElement("span"));
        ensureFilled();
    });

    var offset = 0;
    var speed = 1.5; // pixels per frame at 60fps

    function step() {
        var trackWidth = track.scrollWidth;
        if (trackWidth === 0) {
            requestAnimationFrame(step);
            return;
        }

        var span = track.firstElementChild;
        var spanWidth = span.offsetWidth;

        offset -= speed;
        // When the first copy has fully scrolled off the left edge,
        // shift it to the end and add a clean offset to restart.
        if (spanWidth > 0 && offset <= -spanWidth) {
            offset += spanWidth;
            track.appendChild(span);
        }
        track.style.transform = "translateX(" + offset + "px)";

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
})();