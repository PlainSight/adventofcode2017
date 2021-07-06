var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var sum = 0;

for (var i = 0; i < input.length; i++) {
    var ii = input[i].split('\t').map(a => parseInt(a));

    for (var x = 0; x < ii.length; x++) {
        for (var y = 0; y < ii.length; y++) {
            if (x != y && (ii[x] % ii[y]) == 0) {
                sum += (ii[x] / ii[y]);
            }
        }
    }
}

console.log(sum);