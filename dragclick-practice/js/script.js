let stopped = false;
let clicks = 0;

let lock = false;

let button = document.getElementById("button");
let reset = document.getElementById("reset");
let cps = document.getElementById("cps");

function click() {
    clicks++;
    cps.textContent = clicks.toString();
}

let buttonEvent = (ev) => {
    ev.preventDefault();
    if (lock) return;
    if (!stopped) {
        stopped = true;
        setTimeout(() => {
            stopped = false;
            lock = true;
            button.textContent = "click reset";
        }, 1000);
        click();
    } else {
        click();
    }
    return false;
}

button.addEventListener("click", buttonEvent);
button.addEventListener("contextmenu", buttonEvent);

reset.addEventListener("click", () => {
    stopped = false;
    cps.textContent = "0";
    clicks = 0;
    lock = false;
    button.textContent = "";
});
