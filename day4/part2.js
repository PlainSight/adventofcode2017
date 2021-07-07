var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var valid = 0;

for (var i = 0; i < input.length; i++) {
    var set = {};
    var parts = input[i].split(' ');
    parts.forEach(p => { set[p.split('').sort().join('')] = true; })
    if (Object.keys(set).length == parts.length) {
        valid++;
    }
}

console.log(valid);