var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split(',');

var x = 0;
var y = 0;

for (var i = 0; i < input.length; i++) {
    var dir = input[i];

    switch (dir) {
        case 'nw':
            y--;
            x--;
            break;
        case 'se':
            x++;
            y++;
            break;
        case 'n':
            y--;
            break;
        case 's':
            y++;
            break;
        case 'ne':
            x++;
            break;
        case 'sw':
            x--;
            break;
    }
}

console.log(Math.max(Math.abs(x), Math.abs(y)));

