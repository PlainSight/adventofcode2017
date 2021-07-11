var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

/* PLEASE NOTE this is probably the stupidest way to solve this problem */

var grid = [];

for (var row = 0; row < 128; row++) {
    var lengths = (input+'-'+row).split('').map(n => n.charCodeAt(0));

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

    grid.push(Object.values(dense).map(d => {
        var binary = d.toString(2);
        while(binary.length < 8) {
            binary = '0' + binary;
        }
        return binary;
    }).join('').split(''));
}

var stack = [];
var visited = {};
var nodeNumber = 1;

stack.push({ x: 0, y: 0, type: grid[0][0], age: 0 });
visited['0,0'] = '0';

function explore(n) {
    var x = n.x;
    var y = n.y;
    if (!visited[(x+1)+','+y] && x < 127) {
        visited[(x+1)+','+y] = n.type == '0' ? '0' : '<';
        stack.push({ x: x+1, y: y, type: grid[y][x+1], age: n.type == '1' && grid[y][x+1] == '1' ? n.age : nodeNumber });
        nodeNumber++;
    } else {
        if (x < 127 && n.type == '1') {
            visited[(x+1)+','+y] = '<';
        }
    }
    if (!visited[(x-1)+','+y] && x > 0) {
        visited[(x-1)+','+y] = n.type == '0' ? '0' : '>';
        stack.push({ x: x-1, y: y, type: grid[y][x-1], age: n.type == '1' && grid[y][x-1] == '1' ? n.age : nodeNumber });
        nodeNumber++;
    } else {
        if (x > 0 && n.type == '1') {
            visited[(x-1)+','+y] = '>';
        }
    }
    if (!visited[x+','+(y-1)] && y > 0) {
        visited[x+','+(y-1)] = n.type == '0' ? '0' : 'v';
        stack.push({ x: x, y: y-1, type: grid[y-1][x], age: n.type == '1' && grid[y-1][x] == '1' ? n.age : nodeNumber });
        nodeNumber++;
    } else {
        if (y > 0 && n.type == '1') {
            visited[x+','+(y-1)] = 'v';
        }
    }
    if (!visited[x+','+(y+1)] && y < 127) {
        visited[x+','+(y+1)] = n.type == '0' ? '0' : '^';
        stack.push({ x: x, y: y+1, type: grid[y+1][x], age: n.type == '1' && grid[y+1][x] == '1' ? n.age : nodeNumber });
        nodeNumber++;
    } else {
        if (y < 127 && n.type == '1') {
            visited[x+','+(y+1)] = '^';
        }
    }
}

var regions = 0;
var iters = 0;

var regionsInfo = [];

while(stack.length) {
    iters++;
    stack.sort((a, b) => a.type != b.type ? a.type - b.type : b.age - a.age);

    var top = stack.pop();
    if (top.type == '1') {
        var char = 0;
        if (visited[top.x+','+top.y] == '0') {
            regions++;
            char = regions;
        }
        regionsInfo.push({ x: top.x, y: top.y, v: char ? ''+(1+(regions%9)) : visited[top.x+','+top.y] /**/ });
    }
    
    explore(top);
    
}

regionsInfo.forEach(r => { grid[r.y][r.x] = r.v });

console.log(grid.map(m => m.join('')).join('\r\n').replace(/0/g, ' '));

console.log(iters, regions);