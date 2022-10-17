let a = parseInt(prompt());
let b = parseInt(prompt());

while (a != b) {
    if (a > b) {
        a -= b;
    } else {
        b -= a;
    }
}

alert(a);