var sendinblue = require('../sendinblue-api');
var sendinObj = new sendinblue('https://api.sendinblue.com/v2.0/' , 'your_api_key');

var opts = {"email" : "example@example.net" } ;
sendinObj.delete_user(opts).on('complete', function(data) {
    data = JSON.parse(data);
    console.log(data);
});

/*
Output Response
{ 
  code: 'success',
  message: 'Email was removed successfully from all lists',
  data: [] 
}

*/