var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var rules = [];

for(var i = 0; i < input.length; i++) {
    var ex = /(.+) => (.+)/.exec(input[i]);

    rules.push({ pat: ex[1], output: ex[2] });
}

//var image = '#..#/..../..../#..#'.split('/').map(l => l.split(''));
var image = '.#./..#/###'.split('/').map(l => l.split(''));

function permute(section) {
    var permutations = [];
    permutations.push(section);
    var sp = section.split('/');
    if (sp.length == 3) {
        // flips
        // vert
        permutations.push(sp[2]+'/'+sp[1]+'/'+sp[0]);
        // horizontal
        permutations.push(sp[0][2]+sp[0][1]+sp[0][0]+'/'+sp[1][2]+sp[1][1]+sp[1][0]+'/'+sp[2][2]+sp[2][1]+sp[2][0]);
        // rotations
        for (var i = 0; i < 3; i++) {
            sp = permutations[i].split('/');
            // 90
            permutations.push(sp[2][0]+sp[1][0]+sp[0][0]+'/'+sp[2][1]+sp[1][1]+sp[0][1]+'/'+sp[2][2]+sp[1][2]+sp[0][2]);
            // 180
            permutations.push(sp[2][2]+sp[2][1]+sp[2][0]+'/'+sp[1][2]+sp[1][1]+sp[1][0]+'/'+sp[0][2]+sp[0][1]+sp[0][0]);
            // 270
            permutations.push(sp[0][2]+sp[1][2]+sp[2][2]+'/'+sp[0][1]+sp[1][1]+sp[2][1]+'/'+sp[0][0]+sp[1][0]+sp[2][0]);
        }
    } else {
        // flips
        // vert
        permutations.push(sp[1]+'/'+sp[0]);
        // horizontal
        permutations.push(sp[0][1]+sp[0][0]+'/'+sp[1][1]+sp[1][0]);
        // rotations
        for (var i = 0; i < 3; i++) {
            sp = permutations[i].split('/');
            // 90
            permutations.push(sp[1][0]+sp[0][0]+'/'+sp[1][1]+sp[0][1]);
            // 180
            permutations.push(sp[1][1]+sp[1][0]+'/'+sp[0][0]+sp[0][1]);
            // 270
            permutations.push(sp[0][1]+sp[1][1]+'/'+sp[0][0]+sp[1][0]);
        }
    }
    return permutations;
}

for(var i = 0; i < 18; i++) {
    if (image.length % 2 == 0) {
        var newImage = [];
        for(var y = 0; y < (image.length/2)*3; y++) {
            var newRow = [];
            for(var x = 0; x < (image.length/2)*3; x++) {
                newRow.push('.');
            }
            newImage.push(newRow);
        }

        for(var y = 0; y < image.length; y += 2) {
            for(var x = 0; x < image[0].length; x += 2) {
                var ny = 3*(y/2);
                var nx = 3*(x/2);
                var string = image[y][x] + image[y][x+1] + '/' + 
                    image[y+1][x] + image[y+1][x+1];

                var perms = permute(string);

                var foundRule = rules.find(r => perms.includes(r.pat));

                for(var ty = 0; ty < 3; ty++) {
                    for(var tx = 0; tx < 3; tx++) {
                        newImage[ny+ty][nx+tx] = foundRule.output.split('/')[ty][tx];
                    }
                }
            }
        }
    } else {
        var newImage = [];
        for(var y = 0; y < (image.length/3)*4; y++) {
            var newRow = [];
            for(var x = 0; x < (image.length/3)*4; x++) {
                newRow.push('.');
            }
            newImage.push(newRow);
        }

        for(var y = 0; y < image.length; y += 3) {
            for(var x = 0; x < image[0].length; x += 3) {
                var ny = 4*(y/3);
                var nx = 4*(x/3);
                var string = image[y][x] + image[y][x+1] + image[y][x+2] + '/' + 
                    image[y+1][x] + image[y+1][x+1] + image[y+1][x+2] + '/' + 
                    image[y+2][x] + image[y+2][x+1] + image[y+2][x+2];

                var perms = permute(string);

                var foundRule = rules.find(r => perms.includes(r.pat));

                for(var ty = 0; ty < 4; ty++) {
                    for(var tx = 0; tx < 4; tx++) {
                        newImage[ny+ty][nx+tx] = foundRule.output.split('/')[ty][tx];
                    }
                }
            }
        }
    }
    image = newImage;
}

console.log(image.reduce((p, c) => p + c.filter(x => x == '#').length, 0));