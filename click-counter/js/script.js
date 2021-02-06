let clicks = 0;
let clickDisplay = document.querySelector("#clicks");

let clickCallback = (ev) => {
	ev.preventDefault();
	clicks++;

	clickDisplay.textContent = clicks.toString();
	return false;
}

document.addEventListener("click", clickCallback);
document.addEventListener("contextmenu", clickCallback);
window.addEventListener("wheel", clickCallback);