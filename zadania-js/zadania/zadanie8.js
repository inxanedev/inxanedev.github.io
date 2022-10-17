let a = parseInt(prompt());
let b = parseInt(prompt());

let s = a + b;
let r = a - b;

if (s == r) {
    alert("suma równa różnicy");
} else {
    if (s > r) {
        alert("suma większa od różnicy");
    } else {
        alert("suma mniejsza od różnicy");
    }
}