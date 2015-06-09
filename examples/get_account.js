
var sendinblue = require('../sendinblue-api');
var sendinObj = new sendinblue('https://api.sendinblue.com/v2.0/' , 'your_api_key');

sendinObj.get_account().on('complete', function(data) {
	data = JSON.parse(data);
	console.log(data);
});
