var fs = require('fs');

var step = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var numbers = [{n:0, v:0}];

var nextSmallest = {n:1, v:1};

var pos = 1;

for (var i = 2; i <= 50000000; i++) {
    pos = 1+((pos+step)%i);

    var val = (pos/i);

    if (val < nextSmallest.v) {
        nextSmallest = { n: i, v: val };
    }
}

console.log(nextSmallest);

/*
0   0
1   1/1
2   1/2
3   2/3
4   2/4
5   1/5
6   5/6
7   2/7
8   6/8
9   1/9


*/