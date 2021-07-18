var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var pc = 0;

var registers = { a: 1 };

function resolveValue(val) {
    if(/\d+/.test(val)) {
        return parseInt(val);
    }
    return registers[val] || 0;
}

var steps = 0;
var run = {};

while (pc >= 0 && pc < input.length && steps < 10000000) {
    steps++;
    var ii = input[pc];

    var instr = ii.split(' ');

    if (run[pc]) {
        run[pc]++;
    } else {
        run[pc] = 1;
    }

    switch (instr[0]) {
        case 'set':
            registers[instr[1]] = resolveValue(instr[2]);
            pc++;
            break;
        case 'sub':
            if (!registers[instr[1]]) {
                registers[instr[1]] = 0;
            }
            registers[instr[1]] -= resolveValue(instr[2]);
            pc++;
            break;
        case 'mul':
            if (!registers[instr[1]]) {
                registers[instr[1]] = 0;
            }
            registers[instr[1]] *= resolveValue(instr[2]);
            pc++;
            break;       
        case 'jnz':
            if (resolveValue([instr[1]]) != 0) {
                pc += resolveValue(instr[2]);
            } else {
                pc++;
            }
            break;
    }
}

console.log(run);
console.log(registers);