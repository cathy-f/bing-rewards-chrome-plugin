function newTabAction() {
	getTrends(function(err) {
		if (err) {
			return alert(err);
		}

		const randomEntry = trends[getRandomNumber()];
		if (!randomEntry) {
			return console.error('Error getting a random trend. There are ' + trends.length + ' trends in the array.');
		}

		const searchTerm = randomEntry.title;

		if (searchTerm) {
			console.log('search by tabs', searchTerm)
			bingSearch(searchTerm);
		} else {
			console.error('Error extracting trends search term from', randomEntry);
		}
	});
}