var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var regex = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) (<|>|>=|<=|==|!=) (-?\d+)/;

var registers = {};

var highestEver = 0;

for(var i = 0; i < input.length; i++) {
    var inst = regex.exec(input[i]);
    var reg = inst[1];
    var iod = inst[2];
    var amount = parseInt(inst[3]);
    var condreg = inst[4];
    var condop = inst[5];
    var condval = parseInt(inst[6]);

    var condRegValue = registers[condreg] || 0;

    var condTrue = eval(condRegValue + condop + condval);

    if (condTrue) {
        registers[reg] = (registers[reg] || 0) + (iod == 'inc' ? amount : -amount);

        var max = Math.max(...Object.values(registers))
        highestEver = max > highestEver ? max : highestEver;
    }
}

console.log(highestEver);
