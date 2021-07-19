var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(x => x.split('/').map(y => parseInt(y)));

var longestPath = [];
var longestScore = 0;

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
    if (used.length > longestPath.length || (used.length == longestPath.length && score > longestScore)) {
        longestScore = score;
        longestPath = used;
        console.log(longestPath.length, score);
    }
}

for(var i = 0; i < input.length; i++) {
    if (input[i][0] == 0) {
        expand([i], input[i][1]);
    }
}