var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var sum = 0;

var hl = input.length/2;

for (var i = 0; i < input.length; i++) {
    if (input[i] == input[(i+hl)%input.length]) {
        sum += parseInt(input[i]);
    }
}

console.log(sum);