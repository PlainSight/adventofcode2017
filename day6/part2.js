var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\t').map(p => parseInt(p));

var seen = {};
var redistributions = 0;

while(!seen[input.join(',')]) {
    seen[input.join(',')] = redistributions;
    redistributions++;

    var maxIndex = 0
    var maxVal = 0;
    for(var b = 0; b < input.length; b++) {
        if (input[b] > maxVal) {
            maxIndex = b;
            maxVal = input[b];
        }
    }
    var toDistribute = maxVal;
    input[maxIndex] = 0;
    for(var b = (maxIndex+1) % input.length; toDistribute > 0; b = ((b+1)%input.length)) {
        input[b]++;
        toDistribute--;
    }
}

console.log(redistributions - seen[input.join(',')]);