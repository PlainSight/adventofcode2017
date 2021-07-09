var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

while (input.includes('!')) {
    var newInput = '';
    for(var i = 0; i < input.length; i++) {
        if(input[i] == '!') {
            i++;
        } else {
            newInput += input[i];
        }
    }
    input = newInput;
}

//console.log(input);

var pos = 0;
var garbageCount = 0;

function countScore(level) {
    //console.log(level, pos);
    var score = level;
    var garbage = false;
    while(!(!garbage && input[pos] == '}') && pos < input.length) {
        if (garbage) {
            if (input[pos] == '>') {
                //console.log('garbage ends at ', pos);
                garbage = false;
            } else {
                garbageCount++;
            }
        } else {
            if (input[pos] == '{') {
                //console.log('group starts at ', pos);
                pos++;
                score += countScore(level+1);
            }
            if (input[pos] == '<') {
                //console.log('garbage starts at ', pos);
                garbage = true;
            }
        }
        pos++;
    }
    //console.log('group ends at ', pos);
    return score;
}

countScore(0);

console.log(garbageCount);