var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());	

app.get('/', function (req, res) {
	res.sendfile('form.html');
});

app.post('/post', function (req, res) {
	fs.readFile('data.json', function (err, data) {
		var to_store = JSON.parse(data);
		if (to_store[req.body.block] === undefined) {
			to_store[req.body.block] = {};
		}
		(to_store[req.body.block])[req.body.flat] = [req.body.tel1, req.body.tel2, req.body.tel3];

		fs.writeFile('data.json',  JSON.stringify(to_store), function (err) {
		  if (err) throw err;
		});
		
	});
	res.sendfile('confirm.html');
});


app.get('/get', function (req, res) {
	res.sendfile('data.json');
});


app.listen(3000);