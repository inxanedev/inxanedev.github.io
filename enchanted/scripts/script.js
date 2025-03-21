var list;
fetch("./assets/enchanted.json").then(resp => {
    resp.json().then(words => {
        list = words;
    });
});

function capitalize(s)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}


document.getElementsByTagName("button")[0].addEventListener("click", () => {
    document.getElementsByTagName("h1")[0].textContent = `Cherax ${capitalize(list[Math.floor(Math.random()*list.length)])} Edition`;
});