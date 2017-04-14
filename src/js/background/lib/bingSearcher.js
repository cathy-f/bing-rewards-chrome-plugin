const BING_URL = 'http://www.bing.com/search?q=';

function buildBingSearchQuery(searchString) {
	return searchString.replace(/\s+/g, '+');
}

function bingSearch(searchTerm) {
	var xhr = new XMLHttpRequest();
	const url = BING_URL + buildBingSearchQuery(searchTerm);

	xhr.open("GET", url);
	xhr.send();
}