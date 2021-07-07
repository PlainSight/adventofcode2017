var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(p => parseInt(p));

var pc = 0;
var steps = 0;

while (pc >= 0 && pc < input.length) {
    var jv = input[pc];
    input[pc]++;
    pc += jv;
    steps++;
}

console.log(steps);