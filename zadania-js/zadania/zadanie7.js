let a = parseInt(prompt());
let b = parseInt(prompt());

if (a == b) {
    alert("liczby są równe");
} else {
    if (a > b) {
        alert(`${a} ${b}`);
    } else {
        alert(`${b} ${a}`);
    }
}