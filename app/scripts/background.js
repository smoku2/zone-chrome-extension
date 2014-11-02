(function() {
  'use strict';
  chrome.runtime.onInstalled.addListener(function(details) {
    return console.log('previousVersion', details.previousVersion);
  });

  chrome.browserAction.setBadgeText({
    text: '\'Allo'
  });

  chrome.browserAction.onClicked.addListener(function(tabs) {
    return console.log('opened');
  });

  console.log('\'Allo \'Allo! Event Page for Browser Action');

}).call(this);
