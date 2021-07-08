var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var regex = /([a-z]+) \((\d+)\)(?: -> (.+))?/;

var programs = [];
var allChildren = [];

for(var i = 0; i < input.length; i++) {
    var result = regex.exec(input[i]);
    var name = result[1];
    var weight = parseInt(result[2]);
    var children = [];
    if (result[3]) {
        children = result[3].split(', ');
    }
    programs.push({ name: name, weight: weight, children: children });
    allChildren.push(...children);
}

console.log(programs.filter(p => !allChildren.includes(p.name)));