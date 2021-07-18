
var h = 0;

var val = 107900;

function isPrime(v) {
    var root = Math.ceil(Math.sqrt(v));
    for(var i = 2; i < root; i++) {
        if (v % i == 0) {
            return false;
        }
    }
    return true;
}

while(val <= 124900) {
    if (!isPrime(val)) {
        h++;
    }
    val += 17;
}

console.log(h);