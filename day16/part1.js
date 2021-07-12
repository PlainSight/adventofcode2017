var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split(',');

var progs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

for (var i = 0; i < input.length; i++) {
    var ii = input[i];

    var cap = /(s(\d+)|x(\d+)\/(\d+)|p([a-p])\/([a-p]))/.exec(ii);


    switch(cap[1][0]) {
        case 's':
            var end = progs.splice(16-parseInt(cap[2]));
            progs.splice(0, 0, ...end);
            break;
        case 'x':
            var a = parseInt(cap[3]);
            var b = parseInt(cap[4]);
            var tmp = progs[a];
            progs[a] = progs[b];
            progs[b] = tmp;
            break;
        case 'p':
            var a = cap[5];
            var b = cap[6];
            for(var l = 0; l < progs.length; l++) {
                if (progs[l] == a) {
                    progs[l] = b;
                } else {
                    if (progs[l] == b) {
                        progs[l] = a;
                    }
                }
            }
            break;
    }

}

console.log(progs.join(''));
