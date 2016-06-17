// ==UserScript==
// @name         CourseraAutopauseVideo
// @namespace    https://github.com/posto/
// @version      0.2
// @description  Autopause video on focus loss in Coursera
// @author       Dumitru Postoronca
// @match        https://www.coursera.org/learn/*
// @grant        none
// @run-at       document-body
// @website      https://github.com/posto/coursera-autopause-video
// @updateURL    https://raw.githubusercontent.com/posto/coursera-autopause-video/master/coursera.org_autopause_video.user.js
// @downloadURL  https://raw.githubusercontent.com/posto/coursera-autopause-video/master/coursera.org_autopause_video.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.__courseraautopause=true;

    // add link to control this script
    document.body.insertAdjacentHTML("afterbegin", "<a href='#' id='__courseraautopausetoggler' style='position: fixed;top: 0; right: 0; z-index: 999999'>autopause [" + window.__courseraautopause + "]</a>");
    document.getElementById('__courseraautopausetoggler').onclick = function toggler() {
        window.__courseraautopause = !window.__courseraautopause;
        document.getElementById('__courseraautopausetoggler').innerHTML = "autopause [" + window.__courseraautopause + "]";
    };


    // the autopause stuff
    // Set the name of the "hidden" property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") { // Firefox up to v17
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") { // Chrome up to v32, Android up to v4.4, Blackberry up to v10
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    // If the page is hidden, pause the video;
    // if the page is shown, play the video
    function handleVisibilityChange() {
        if (!window.__courseraautopause) {
            return;
        }
        var videoElement = document.getElementById("c-video_html5_api");
        if (videoElement === null) {
            return;
        }
        if (document[hidden]) {
            // pause and rewind a bit of the video
            videoElement.pause();
            videoElement.currentTime = Math.max(videoElement.currentTime - 5, 0);
        } else {
            videoElement.play();
        }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        alert("(CourseraAutopause) Page Visibility API is not supported.");
    } else {
        // Handle page visibility change
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

})();
