var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var tools = require('./tools.js');

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename + '_' + Date.now();
  }
}));
app.use(bodyParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
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

app.post('/upload', function(req, res) {
	if (path.extname(req.files.file.path) !== '.csv') {
        res.send("Incorrect file uploaded. Please upload a CSV file.");
    } else {
    	tools.update_data(req.files.file.path);
	    res.sendfile('confirm.html');
    }
	
});

app.post('/call_log', function(req, res) {
	res.send(req.body);
	fs.writeFile('call_log.json', req.body.toString(), function(err){
		if (err) throw err;
		console.log('call logs saved');

	});
});

app.get('/call_log', function(req, res) {
res.sendfile('call_log.json');
});
app.listen(5000);
