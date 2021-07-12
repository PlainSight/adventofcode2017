var fs = require('fs');

//input
//Generator A starts with 277
//Generator B starts with 349

// test a: 65 b: 8921

var lastA = 277;
var lastB = 349;

var mulA = 16807;
var mulB = 48271;

var count = 0;
var mode = 'a';

// a mul 4
// b mul 8

var div = 2147483647;

var matches = 0;

while (count < 5000000) {
    if (mode == 'a') {
        do {
            lastA = (lastA * mulA) % div;
        } while(lastA % 4 != 0)
        mode = 'b';
    } else {
        do {
            lastB = (lastB * mulB) % div;
        } while(lastB % 8 != 0)
        mode = 'a';

        count++;
        matches += (lastA << 16 == lastB << 16) ? 1 : 0;
    }
    
}

console.log(matches);