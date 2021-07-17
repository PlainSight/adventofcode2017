var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var program = function(id) {
    this.id = id;
    this.pc = 0;

    this.registers = { p: id };

    this.resolveValue = function(val) {
        if(/\-?\d+/.test(val)) {
            return parseInt(val);
        }
        return this.registers[val] || 0;
    }

    this.run = function(received) {
        var outbound = [];
        while (this.pc >= 0 && this.pc < input.length) {
            var ii = input[this.pc];
    
            var instr = ii.split(' ');

            switch (instr[0]) {
                case 'snd':
                    outbound.unshift(this.resolveValue(instr[1]));
                    this.pc++;
                    break;
                case 'set':
                    this.registers[instr[1]] = this.resolveValue(instr[2]);
                    this.pc++;
                    break;
                case 'add':
                    if (!this.registers[instr[1]]) {
                        this.registers[instr[1]] = 0;
                    }
                    this.registers[instr[1]] += this.resolveValue(instr[2]);
                    this.pc++;
                    break;
                case 'mul':
                    if (!this.registers[instr[1]]) {
                        this.registers[instr[1]] = 0;
                    }
                    this.registers[instr[1]] *= this.resolveValue(instr[2]);
                    this.pc++;
                    break;       
                case 'mod':
                    if (!this.registers[instr[1]]) {
                        this.registers[instr[1]] = 0;
                    }
                    this.registers[instr[1]] = this.registers[instr[1]] % this.resolveValue(instr[2]);
                    this.pc++;
                    break;        
                case 'rcv':
                    if (received) {
                        this.registers[instr[1]] = received;
                        received = null;
                        this.pc++;
                    } else {
                        return outbound;
                    }
                    break;
                case 'jgz':
                    if (this.resolveValue([instr[1]]) > 0) {
                        this.pc += this.resolveValue(instr[2]);
                    } else {
                        this.pc++;
                    }
                    break;
            }
        }
    }
}

var program0 = new program(0);
var program1 = new program(1);

var out0 = [];
var out1 = [];

var valCount0 = 0;
var valCount1 = 0;

var mode = 0;

do {
    if (mode == 0) {
        do {
            var res = program0.run(out1.pop());
            valCount0 += res.length;
            out0.unshift(...res);
        } while(out1.length > 0);
        mode = 1;
    } else {
        do {
            var res = program1.run(out0.pop());
            valCount1 += res.length;
            out1.unshift(...res);
        } while(out0.length  > 0);
        mode = 0;
    }
} while(out0.length > 0 || out1.length > 0);

console.log(valCount1);