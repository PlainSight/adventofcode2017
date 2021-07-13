var fs = require('fs');

var step = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var curr = { val: 0, next: null };
curr.next = curr;

for (var i = 1; i < 2018; i++) {
    for(var s = 0; s < step; s++) {
        curr = curr.next;
    }
    var tmp = { val: i, next: curr.next };
    curr.next = tmp;
    curr = curr.next;
}

console.log(curr.next.val);