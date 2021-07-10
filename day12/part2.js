var fs = require('fs');
const { connect } = require('http2');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var nodes = {};

function getRoot(node) {
    if (node.parent) {
        node.parent.value += node.value;
        node.value = 0;
        node.parent = getRoot(node.parent);
        return node.parent;
    }
    return node;
}

for (var i = 0; i < input.length; i++) {
    var vals = /(\d+) <-> (.+)/.exec(input[i]);

    var element = parseInt(vals[1]);
    var connections = vals[2].split(', ').map(p => parseInt(p));

    if (!nodes[element]) {
        nodes[element] = { name: element, parent: null, value: 1 };
    }

    connections.forEach(c => {
        if (!nodes[c]) {
            nodes[c] = { name: c, parent: null, value: 1 };
        }
    });

    connections.forEach(c => {
        if (element != c) {
            //console.log('connecting', nodes[element], 'and', nodes[c]);
            
            if (getRoot(nodes[element]) != getRoot(nodes[c])) {
                if (getRoot(nodes[element]).value >= getRoot(nodes[c]).value) {
                    getRoot(nodes[c]).parent = getRoot(nodes[element]);
                    getRoot(nodes[c]);
                } else {
                    getRoot(nodes[element]).parent = getRoot(nodes[c]);
                    getRoot(nodes[element]);
                }
            }
        }

        //console.log(nodes);
    });
}

console.log(Object.values(nodes).filter(n => n.value > 0).length);
