var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var dirs = [{ dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }];
var dir = 0;
var x = Math.floor(input[0].length / 2);
var y = Math.floor(input.length / 2);

var infected = {};

for(var ty = 0; ty < input.length; ty++) {
    for(var tx = 0; tx < input[0].length; tx++) {
        if (input[ty][tx] == '#') {
            infected[tx+','+ty] = true;
        }
    }
}

var infections = 0;

for(var i = 0; i < 10000; i++) {
    if (infected[x+','+y]) {
        dir = (dir+1) % 4;
        infected[x+','+y] = false;
    } else {
        dir = (dir+3) % 4;
        infected[x+','+y] = true;
        infections++;
    }
    x += dirs[dir].dx;
    y += dirs[dir].dy;
}

console.log(infections);