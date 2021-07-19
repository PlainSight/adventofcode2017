var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(x => x.split('/').map(y => parseInt(y)));

var bestPath = [];
var bestScore = 0;

function expand(used, current) {
    for(var i = 0; i < input.length; i++) {
        if (used.includes(i)) {
            continue;
        }
        var cused = JSON.parse(JSON.stringify(used));
        if (input[i][0] == current) {
            cused.push(i);
            expand(cused, input[i][1]);
            continue;
        }
        if (input[i][1] == current) {
            cused.push(i);
            expand(cused, input[i][0]);
            continue;
        }
    }
    var score = used.reduce((e, c) => e+input[c][0]+input[c][1], 0);
    if (score > bestScore) {
        bestScore = score;
        bestPath = used;
        console.log(score);
    }
}

for(var i = 0; i < input.length; i++) {
    if (input[i][0] == 0) {
        expand([i], input[i][1]);
    }
}