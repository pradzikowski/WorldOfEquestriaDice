// ==UserScript==
// @name        WoEChatDiceLoader
// @namespace   WoEDiceLoader
// @include     http://worldofequestria.pl/*
// @version     1
// @updateURL https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/wodeDiceloader.js
// @author Chiredan&Vienes
// ==/UserScript==

var $;

// Add woeDiceScript
    (function(){
        if (typeof unsafeWindow.woeDiceScript == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/woeDice.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if woeDiceScript's loaded
    function GM_wait() {
        if (typeof unsafeWindow.woeDiceScript == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.woeDiceScript.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function