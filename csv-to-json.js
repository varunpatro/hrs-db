var fs = require('fs');

fs.readFile('data.csv', function (err, data) {
    var cols = data.toString().split('\r\n');
    var header = cols.shift();
    for (var flat_entry = "", final = {}; cols.length > 0 ; ) {
        flat_entry = cols.shift().split(',');
        if (flat_entry[0] !== "") {
            if (final[flat_entry[0]] === undefined) {
                final[flat_entry[0]] = {};
            }
            (final[flat_entry.shift()])[flat_entry.shift()] = flat_entry;    
        }
    }

	fs.writeFile('data.json', JSON.stringify(final), function (err) {
	  if (err) throw err;
	});
	
});

