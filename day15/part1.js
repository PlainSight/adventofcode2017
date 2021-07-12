var fs = require('fs');

//input
//Generator A starts with 277
//Generator B starts with 349

var lastA = 277;
var lastB = 349;

var mulA = 16807;
var mulB = 48271;

var div = 2147483647;

var matches = 0;

for (var i = 0; i < 40000000; i++) {
    lastA = (lastA * mulA) % div;
    lastB = (lastB * mulB) % div;
    
    matches += (lastA << 16 == lastB << 16) ? 1 : 0;
}

console.log(matches);