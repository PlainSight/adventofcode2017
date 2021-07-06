var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var sum = 0;

for (var i = 0; i < input.length; i++) {
    if (input[i] == input[(i+1)%input.length]) {
        sum += parseInt(input[i]);
    }
}

console.log(sum);