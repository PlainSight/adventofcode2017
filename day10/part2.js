var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lengths = input.split('').map(n => n.charCodeAt(0));

lengths.push(...[17, 31, 73, 47, 23]);

var list = [];

for (var i = 0; i < 256; i++) {
    list.push(i);
}

var curPos = 0;
var skipSize = 0;

function reverse(pos, len) {
    var j = 0;
    var toReverse = [];
    for (var i = pos; j < len; i = ((i+1)%list.length)) {
        j++;
        toReverse.push(list[i]);
    }
    j = 0;
    for (var i = pos; j < len; i = ((i+1)%list.length)) {
        j++;
        list[i] = toReverse.pop();
    }
}

for (var r = 0; r < 64; r++) {
    for(var i = 0; i < lengths.length; i++) {
        reverse(curPos, lengths[i]);
        curPos += (lengths[i]+skipSize);
        curPos = curPos % list.length;
        skipSize++;
    }
}

var dense = list.reduce((pv, cv, ci) => { 
    pv[Math.floor(ci/16)] = (pv[Math.floor(ci/16)] || 0) ^ cv;
    return pv;
}, {});

console.log(Object.values(dense).map(d => {
    var hex = d.toString(16);
    return hex.length == 2 ? hex : '0' + hex;
}).join(''));

//toString(16)