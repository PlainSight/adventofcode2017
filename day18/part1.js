var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var pc = 0;

var lastSound = null;

var registers = {};

function resolveValue(val) {
    if(/\d+/.test(val)) {
        return parseInt(val);
    }
    return registers[val] || 0;
}

while (pc >= 0 && pc < input.length) {
    var ii = input[pc];

    var instr = ii.split(' ');

    switch (instr[0]) {
        case 'snd':
            lastSound = resolveValue(instr[1]);
            pc++;
            break;
        case 'set':
            registers[instr[1]] = resolveValue(instr[2]);
            pc++;
            break;
        case 'add':
            if (!registers[instr[1]]) {
                registers[instr[1]] = 0;
            }
            registers[instr[1]] += resolveValue(instr[2]);
            pc++;
            break;
        case 'mul':
            if (!registers[instr[1]]) {
                registers[instr[1]] = 0;
            }
            registers[instr[1]] *= resolveValue(instr[2]);
            pc++;
            break;       
        case 'mod':
            if (!registers[instr[1]]) {
                registers[instr[1]] = 0;
            }
            registers[instr[1]] = registers[instr[1]] % resolveValue(instr[2]);
            pc++;
            break;        
        case 'rcv':
            var val = resolveValue([instr[1]]);
            if (val != 0) {
                console.log(lastSound);
                return;
            }
            pc++;
            break;
        case 'jgz':
            if (resolveValue([instr[1]]) > 0) {
                pc += resolveValue(instr[2]);
            } else {
                pc++;
            }
            break;
    }
}