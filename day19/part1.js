var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var y = 0;
var x = 0;

for (x = 0; x < input[0].length; x++) {
    if (input[0][x] == '|') {
        break;
    }
}

var dx = 0;
var dy = 1;

var seen = [];

while(input[y][x] != ' ') {
    switch (input[y][x]) {
        case '+':
            if (dy != 0) {
                dy = 0;
                // look left and right
                if (input[y][x+1] != ' ') {
                    dx = 1;
                } else {
                    dx = -1;
                }
            } else {
                dx = 0;
                // look up and down
                if (input[y+1][x] != ' ') {
                    dy = 1;
                } else {
                    dy = -1;
                }
            }
        case '|':
        case '-':
            x += dx;
            y += dy;
            break;
        default:
            seen.push(input[y][x]);
            x += dx;
            y += dy;
    }
}

console.log(seen.join(''));