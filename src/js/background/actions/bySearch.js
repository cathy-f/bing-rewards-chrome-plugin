function googleSearchAction(details) {
	const searchTerm = getSearchTerm(details.url);

	if (searchTerm) {
		bingSearch(searchTerm);
	} else {
		console.error('Error extracting Google search term from ' + details.url);
	}
}

function getSearchTerm(url) {
	const urlObj = getUrlObject(url);
	const queryParams = getQueryParams(urlObj.search);

	let searchTerm = queryParams.get('q');

	if (!searchTerm) {
		const queryParams = getQueryParams(urlObj.hash);
		searchTerm = queryParams.get('q');
	}

	return searchTerm;
}

function getQueryParams(queryString) {
	return new URLSearchParams(queryString);
}

function getUrlObject(url) {
	var parser = document.createElement('a');
	parser.href = url;

	return parser;
}