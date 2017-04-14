const sendMessage = chrome.runtime.sendMessage;
let trendsCheckbox;
let googleSearchCheckbox;
let activationButton;

const ACTIVATE_KEY = 'Activate';
const DEACTIVATE_KEY = 'Dectivate';

document.addEventListener('DOMContentLoaded', function() {
	trendsCheckbox = document.getElementById('trends');
	googleSearchCheckbox = document.getElementById('googleSearch');
	activationButton = document.getElementById('activate');

	activationButton.addEventListener('click', toggleExtension);
	trendsCheckbox.addEventListener('change', updateSettings);
	googleSearchCheckbox.addEventListener('change', updateSettings);

	loadSettings();
});

function toggleExtension() {
	getIsEnabled() ?
		disableExtension() : enableExtension();

	updateSettings();
}

function disableExtension() {
	activationButton.innerHTML = ACTIVATE_KEY;
	trendsCheckbox.disabled = true;
	googleSearchCheckbox.disabled = true;
}

function enableExtension() {
	activationButton.innerHTML = DEACTIVATE_KEY;
	trendsCheckbox.disabled = false;
	googleSearchCheckbox.disabled = false;
}

function setSettings(data) {
	trendsCheckbox.checked = data.trends;
	googleSearchCheckbox.checked = data.googleSearch;

	data.enabled ? enableExtension() : disableExtension();
}

function getIsEnabled() {
	return activationButton.innerHTML === DEACTIVATE_KEY;
}
function loadSettings() {
	sendMessage({ request: 'status' }, setSettings);
}

function updateSettings() {
	const update = {
		enabled: getIsEnabled(),
		trends: trendsCheckbox.checked,
		googleSearch: googleSearchCheckbox.checked
	};
	sendMessage({ request: 'update', update: update }, setSettings);
}
