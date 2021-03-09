var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", mousemove);

let rectWidth = 50;
let x = 200 - rectWidth / 2;
let y = 200 - rectWidth / 2;
let speed = 10;

let gradient = ctx.createLinearGradient(0, 0, 400, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.25, "green");
gradient.addColorStop(0.5, "purple");
gradient.addColorStop(0.75, "yellow");
gradient.addColorStop(1, "pink");

ctx.fillStyle = gradient;
ctx.strokeStyle = "#000000";

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillRect(x, y, rectWidth, rectWidth);
    ctx.stroke();
}

function clamp(x, from, to) {
    if (x >= from && x <= to) return x;
    if (x < from) return from;
    if (x > to) return to;
}

function mousemove(event) {
    x = clamp(event.offsetX - rectWidth / 2, 0, canvas.width - rectWidth);
    y = clamp(event.offsetY - rectWidth / 2, 0, canvas.height - rectWidth);
    draw();
}

draw();