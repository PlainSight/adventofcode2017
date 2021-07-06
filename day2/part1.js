var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var sum = 0;

for (var i = 0; i < input.length; i++) {
    var ii = input[i].split('\t').map(a => parseInt(a));

    sum += (Math.max(...ii) - Math.min(...ii));
}

console.log(sum);