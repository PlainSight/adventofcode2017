var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var layers = {};

for (var i = 0; i < input.length; i++) {
    var res = /(\d+): (\d+)/.exec(input[i]);
    layers[parseInt(res[1])] = parseInt(res[2]);
}

var found = -1;
outer: for(var o = 0; found < 0; o++) {
    for (var layer in layers) {
        var cantPass = ((parseInt(layer) + o) % (2*(layers[layer] -1))) == 0;
        if (cantPass) {
            continue outer;
        }
    }
    found = o;
}

console.log(found);