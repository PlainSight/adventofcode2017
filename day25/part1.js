var fs = require('fs');

var states = {
    A: {
        0: {
            val: 1,
            pos: 1,
            nextState: 'B'
        },
        1: {
            val: 0,
            pos: -1,
            nextState: 'F'
        }
    },
    B: {
        0: {
            val: 0,
            pos: 1,
            nextState: 'C'
        },
        1: {
            val: 0,
            pos: 1,
            nextState: 'D'
        }
    },
    C: {
        0: {
            val: 1,
            pos: -1,
            nextState: 'D'
        },
        1: {
            val: 1,
            pos: 1,
            nextState: 'E'
        }
    },
    D: {
        0: {
            val: 0,
            pos: -1,
            nextState: 'E'
        },
        1: {
            val: 0,
            pos: -1,
            nextState: 'D'
        }
    },
    E: {
        0: {
            val: 0,
            pos: 1,
            nextState: 'A'
        },
        1: {
            val: 1,
            pos: 1,
            nextState: 'C'
        }
    },
    F: {
        0: {
            val: 1,
            pos: -1,
            nextState: 'A'
        },
        1: {
            val: 1,
            pos: 1,
            nextState: 'A'
        }
    }
};

var tape = {};

var state = 'A';
var position = 0;

for (var s = 0; s < 12794428; s++) {
    var val = tape[position] || 0;
    var nextStuff = states[state][val];
    tape[position] = nextStuff.val;
    position += nextStuff.pos;
    state = nextStuff.nextState;
}

console.log(Object.values(tape).reduce((e, c) => e+c, 0));