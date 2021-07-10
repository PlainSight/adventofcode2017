var fs = require('fs');

var lengths = fs.readFileSync('./input.txt', 'utf8').split(',').map(n => parseInt(n));

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

for(var i = 0; i < lengths.length; i++) {
    reverse(curPos, lengths[i]);
    curPos += (lengths[i]+skipSize);
    curPos = curPos % list.length;
    skipSize++;
}

console.log(list);

console.log(list[0]*list[1]);