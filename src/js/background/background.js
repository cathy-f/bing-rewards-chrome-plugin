'use strict';

let extensionEnabled = true;
let trendsSearchEnabled = false;
let googleSearchEnabled = false;

const tabCreation = chrome.tabs.onCreated;
const webRequestCompletion = chrome.webRequest.onCompleted;
const browserAction = chrome.browserAction;

function toggleTrends() {
	trendsSearchEnabled ? disableTrends() : enableTrends();
	trendsSearchEnabled = !trendsSearchEnabled;
}

function disableTrends() {
	while (tabCreation.hasListener(newTabAction)) {
		tabCreation.removeListener(newTabAction);
	}
}

function enableTrends() {
	tabCreation.addListener(newTabAction);
}

function toggleGoogleSearch() {
	googleSearchEnabled ? disableGoogleSearch() : enableGoogleSearch();
	googleSearchEnabled = !googleSearchEnabled;
}

function disableGoogleSearch() {
	while (webRequestCompletion.hasListener(googleSearchAction)) {
		webRequestCompletion.removeListener(googleSearchAction);
	}
}
function enableGoogleSearch() {
	const searchUrls = ['*://www.google.com/search?q=*', '*://www.google.com/search?*&q=*'];
	webRequestCompletion.addListener(googleSearchAction, { urls: searchUrls });
}

function toggleExtension() {
	extensionEnabled = !extensionEnabled;

	if (extensionEnabled) {
		if (trendsSearchEnabled) {
			enableTrends();
		}
		if (googleSearchEnabled) {
			enableGoogleSearch();
		}
	} else {
		disableTrends();
		disableGoogleSearch();
	}

	browserAction.setIcon({
		path: 'src/img/bing-' + (extensionEnabled ? 'enabled' : 'disabled') + '.png'
	}, function() {
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.request == 'status') {
			sendResponse({
				enabled: extensionEnabled,
				trends: trendsSearchEnabled,
				googleSearch: googleSearchEnabled
			});
		} else if (request.request == 'update') {
			const update = request.update;
			if (update.trends !== trendsSearchEnabled) {
				toggleTrends();
			}
			if (update.googleSearch !== googleSearchEnabled) {
				toggleGoogleSearch();
			}
			if (update.enabled !== extensionEnabled) {
				toggleExtension();
			}

			sendResponse({
				enabled: extensionEnabled,
				trends: trendsSearchEnabled,
				googleSearch: googleSearchEnabled
			});
		}
	});

toggleGoogleSearch();
toggleTrends();