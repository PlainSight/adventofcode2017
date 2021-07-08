var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var regex = /([a-z]+) \((\d+)\)(?: -> (.+))?/;

var programs = {};

for(var i = 0; i < input.length; i++) {
    var result = regex.exec(input[i]);
    var name = result[1];
    var weight = parseInt(result[2]);
    var children = [];
    if (result[3]) {
        children = result[3].split(', ');
    }
    programs[name] = {weight: weight, children: children };
}

function calcWeight(p) {
    return p.weight + p.children.map(c => calcWeight(programs[c])).reduce((a, b) => a+b, 0);
}

for(var p in programs) {
    var prog = programs[p];
    if (prog.children.length) {
        var weights = prog.children.map(c => calcWeight(programs[c]));
        var baseWeight = weights[0];
        var badWeight = weights.filter(w => w != baseWeight);
        if (badWeight.length > 0) {
            console.log(p, prog, weights);
        }
    }
}

// 802 - via using brain