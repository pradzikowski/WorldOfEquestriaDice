// ==UserScript==
// @name        WoEChatDiceLoader
// @namespace   WoEDiceLoader
// @include     http://worldofequestria.pl/*
// @version     5
// @downloadURL https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/wodeDiceloader.js
// @updateURL https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/wodeDiceloader.js
// @author Chiredan&Vienes
// ==/UserScript==

// var block
var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;

// Add woeDiceScript
    loadLibrary("woeDice");



// Simple woeLoaderFunctions

function loadLibrary(libName) {
    var GM_JQ = document.createElement('script');

    GM_JQ.src = 'https://raw.github.com/chiredan/WorldOfEquestriaDice/MainBranch/' + libName + '.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}
