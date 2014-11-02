'use strict';

chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)

chrome.browserAction.setBadgeText({text: '\'Allo'})

chrome.browserAction.onClicked.addListener (tabs) ->
  console.log 'opened'

console.log('\'Allo \'Allo! Event Page for Browser Action')
