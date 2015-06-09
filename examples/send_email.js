
var sendinblue = require('../sendinblue');
var sendinObj = new sendinblue('https://api.sendinblue.com/v2.0/' , 'your_api_key');

var opts =	
{
	"text":"Hello World",
	"replyto": ["replyto@email.com","reply to"],
	"html":"<h1>Hello World</h1>",
	"to":{"example@example.net":"example"},
	"attachment":[],
	"from": ["example@example.net","from email"],
	"subject": "Test mail form sendinblue",
	"headers":{
		"Content-Type":"text/html; charset=iso-8859-1", 
		"X-param1":"value1", 
		"X-param2":"value2", 
		"X-Mailin-custom":"my custom value", 
		"X-Mailin-IP":"102.102.1.2", 
		"X-Mailin-Tag":"My tag"
	}
};

sendinObj.send_email(opts).on('complete', function(data) {
	data = JSON.parse(data);
	console.log(data);
});
