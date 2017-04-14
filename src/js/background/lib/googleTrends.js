const TRENDS_URL = 'https://trends.google.com/trends/hottrends/hotItems';

let useDate = '';
let trends = [];

Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd
	].join('');
};

function getTrendsDate(daysBack) {
	daysBack = daysBack || 0;
	var date = new Date();
	date.setDate(date.getDate() - daysBack);

	return date.yyyymmdd();
}

function getTrends(callback) {
	const yesterday = getTrendsDate(1);

	if (useDate === yesterday) {
		return callback();
	}

	useDate = yesterday;
	trends = [];

	const olderDay = getTrendsDate(4);

	appendTrends(yesterday, callback);
	appendTrends(olderDay, callback);
}

function getRandomNumber() {
	return Math.floor(Math.random() * (trends.length));
}

function appendTrends(formattedDate, callback) {
	var xhr = new XMLHttpRequest();

	const payload = 'ajax=1&pn=p1&htd=' + formattedDate + '&htv=l';

	xhr.open("POST", TRENDS_URL);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = function() {//Call a function when the state changes.
		const data = JSON.parse(xhr.responseText);
		trends.push.apply(trends, data.trendsByDateList[0].trendsList);
		callback();
	};
	xhr.addEventListener("error", function(err) {//Call a function when the state changes.
		callback('There is an error getting trends in the Bing Search plugin');
	});
	xhr.addEventListener("abort", function() {//Call a function when the state changes.
		callback('There is an abort error getting trends in the Bing Search plugin');
	});
	xhr.send(payload);
}