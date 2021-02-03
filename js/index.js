var button = document.querySelector("#btn");

button.addEventListener("click", () => {
    let elem = document.createElement("span");

    elem.textContent = "pop";

    elem.style.position = "fixed";
    elem.style.left = `${Math.floor(Math.random() * $(window).width())}px`;
    elem.style.top = `${Math.floor(Math.random() * $(window).height())}px`;
    elem.style.color = "rgb(151, 129, 235)";

    document.body.appendChild(elem);
});