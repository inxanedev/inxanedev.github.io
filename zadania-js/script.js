let buttons = document.getElementById("exercise-grid").children;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("onclick", `execute(${i + 1})`);
}

function execute(n) {
    let script = document.createElement("script");
    script.src = `zadania/zadanie${n}.js`;
    
    let node = document.head.appendChild(script);
    node.onload = () => {
        document.head.removeChild(node);
    };
}