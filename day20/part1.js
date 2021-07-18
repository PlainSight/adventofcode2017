var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var particles = [];

for (var i = 0; i < input.length; i++) {
    var ex = /p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/.exec(input[i]);

    particles.push({ x: parseInt(ex[1]), y: parseInt(ex[2]), z: parseInt(ex[3]),
                    dx: parseInt(ex[4]), dy: parseInt(ex[5]), dz: parseInt(ex[6]),
                    ax: parseInt(ex[7]), ay: parseInt(ex[8]), az: parseInt(ex[9])
                });
}

var closest = [];

for (var i = 0; i < 100000; i++) {
    var closestDist = Infinity;
    var closestParticle = 0

    for (var p = 0; p < particles.length; p++) {
        var pp = particles[p];

        pp.dx += pp.ax;
        pp.dy += pp.ay;
        pp.dz += pp.az;

        pp.x += pp.dx;
        pp.y += pp.dy;
        pp.z += pp.dz;

        var dist = Math.abs(pp.x) + Math.abs(pp.y) + Math.abs(pp.z);

        if (dist < closestDist) {
            closestDist = dist;
            closestParticle = p;
        }
    }
    closest.push(closestParticle);
}

console.log(closest.slice(99000));

