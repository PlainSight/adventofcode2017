var fs = require('fs');

var input = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var x = 1;
var y = 0;

var vals = {'0,0':1, '1,0':1};

var stages = [1, 2, 2, 3];

var done = false;

function valsAround(x, y) {
    var sum = 0
    for (var dx = x-1; dx <= x+1; dx++) {
        for (var dy = y-1; dy <= y+1; dy++) {
            if (dx != x || dy != y) {
                if (vals[dx+','+dy]) {
                    sum += vals[dx+','+dy];
                }
            }
        }
    }
    if (sum > input && !done) {
        console.log(sum, Math.abs(x)+Math.abs(y));
        console.log(vals);
        done = true;
    }
    return sum;
}

while(!done) {
    for (var s = 0; s < 4; s++) {
        switch(s) {
            case 0:
                for(var i = 0; i < stages[s]; i++) {
                    y--;
                    vals[x+','+y] = valsAround(x, y);
                }
                break;
            case 1:
                for(var i = 0; i < stages[s]; i++) {
                    x--;
                    vals[x+','+y] = valsAround(x, y);
                }
                break;
            case 2:
                for(var i = 0; i < stages[s]; i++) {
                    y++;
                    vals[x+','+y] = valsAround(x, y);
                }
                break;
            case 3:
                for(var i = 0; i < stages[s]; i++) {
                    x++;
                    vals[x+','+y] = valsAround(x, y);
                }
                break;
        }
    }
    stages = stages.map(s => s+2);
    console.log(stages);
}