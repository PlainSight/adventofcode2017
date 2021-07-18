var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var particles = [];

for (var i = 0; i < input.length; i++) {
    var ex = /p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/.exec(input[i]);

    particles.push({ x: parseInt(ex[1]), y: parseInt(ex[2]), z: parseInt(ex[3]),
                    dx: parseInt(ex[4]), dy: parseInt(ex[5]), dz: parseInt(ex[6]),
                    ax: parseInt(ex[7]), ay: parseInt(ex[8]), az: parseInt(ex[9]),
                    alive: true
                });
}

for (var i = 0; i < 10000; i++) {
    var positions = {};

    for (var p = 0; p < particles.length; p++) {
        var pp = particles[p];
        if (!pp.alive) {
            continue;
        }

        pp.dx += pp.ax;
        pp.dy += pp.ay;
        pp.dz += pp.az;

        pp.x += pp.dx;
        pp.y += pp.dy;
        pp.z += pp.dz;

        var posString = pp.x+','+pp.y+','+pp.z;

        if (positions[posString]) {
            pp.alive = false;
            positions[posString].parent.alive = false;
        } else {
            positions[posString] = { parent: pp };
        }
    }
}

console.log(particles.filter(p => p.alive).length);

