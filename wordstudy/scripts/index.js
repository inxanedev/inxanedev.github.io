(() => {
    let saved_dictionary = localStorage.getItem("dictionary");
    if (saved_dictionary == null) {
        return;
    }

    let dictionary_json = JSON.parse(saved_dictionary);

    let container = document.getElementById("dictionary-container");
    container.innerHTML = "";

    for (let i = 0; i < dictionary_json["list"].length; i++) {
        let item = dictionary_json["list"][i];
        container.innerHTML +=
            `<div class="dictionary-item"><button class="removeButton" onclick="remove(${i})">X</button><input value="${item['from']}"/><span class="arrow">-></span><input value="${item['to']}"/></div>`;
    }
})();

function orderContainer(container) {
    for (let i = 0; i < container.children.length; i++) {
        let item = container.children[i];
        item.children[0].setAttribute("onclick", "remove(" + i.toString() + ")");
    }
}

document.getElementById("newWord").addEventListener("click", () => {
    let container = document.getElementById("dictionary-container");
    orderContainer(container);

    let currentNumber = container.children.length + 1;
    container.insertAdjacentHTML("beforeend",
        `<div class="dictionary-item"><button class="removeButton" onclick="remove(${currentNumber})">X</button><input type="text"><span class="arrow">-></span><input type="text"></div>`);
});

function remove(itemNumber) {
    let container = document.getElementById("dictionary-container");
    
    let node = null;
    for (let i = 0; i < container.children.length; i++) {
        let item = container.children[i];
        if (itemNumber == parseInt(item.children[0].getAttribute("onclick").slice(7, -1))) {
            node = item;
            break;
        }
    }

    if (node === null) {
        Swal.fire({
            title: "Error",
            text: "remove() call didn't find the item with the specified id. Report to developer.",
            icon: "error"
        });
        return;
    }

    container.removeChild(node);
    orderContainer(container);
}

document.getElementById("saveButton").addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "This will override your current saved word list.",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        icon: "question"
    }).then(result => {
        if (!result.isConfirmed) return;

        let json_save_data = {"list": []};

        let dictionaryContainer = document.getElementById("dictionary-container");
        for (let i = 0; i < dictionaryContainer.children.length; i++) {
            let dictionaryItem = dictionaryContainer.children[i];

            let a = dictionaryItem.children[1].value;
            let b = dictionaryItem.children[3].value;
            if (a == "" || b == "") {
                Swal.fire({
                    title: "You have an empty dictionary item.",
                    text: "Delete it or fill the empty fields.",
                    icon: "error"
                });
                return;
            }

            json_save_data["list"].push({
                "from": a,
                "to": b
            });
        }

        localStorage.setItem("dictionary", JSON.stringify(json_save_data));
    });
});

document.getElementById("loadButton").addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure",
        text: "Your current dictionary will get scrapped, and the saved one will take its place.",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        icon: "question"
    }).then(result => {
        if (!result.isConfirmed) return;

        let saved_dictionary = localStorage.getItem("dictionary");
        if (saved_dictionary == null) {
            Swal.fire({
                title: "You have no dictionary saved!",
                text: "Save one using the 'Save Dictionary' button.",
                icon: "error"
            });
            return;
        }

        let dictionary_json = JSON.parse(saved_dictionary);

        let container = document.getElementById("dictionary-container");
        container.innerHTML = "";

        for (let i = 0; i < dictionary_json["list"].length; i++) {
            let item = dictionary_json["list"][i];
            container.innerHTML +=
                `<div class="dictionary-item"><button class="removeButton" onclick="remove(${i})">X</button><input value="${item['from']}"/><span class="arrow">-></span><input value="${item['to']}"/></div>`;
        }
        });

    
});

document.getElementById("reverseButton").addEventListener("click", () => {
    let container = document.getElementById("dictionary-container");
    for (let i = 0; i < container.children.length; i++) {
        let item = container.children[i];
        let a = item.children[1].value;
        let b = item.children[3].value;

        item.children[1].value = b;
        item.children[3].value = a;
    }
});

document.getElementById("exportButton").addEventListener("click", () => {
    Swal.fire({
        title: "This is an advanced feature. Are you sure?",
        html: "This will allow you to copy your dictionary data to your clipboard. You can then paste it into the Import button on another device, to copy over your dictionary.<br/>If you mess with the copied data, you might break the app's correct behavior.",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes, copy my saved dictionary",
        denyButtonText: "Abort!"
    }).then(result => {
        if (!result.isConfirmed) return;
        
        let saved_dict = localStorage.getItem("dictionary");
        if (saved_dict == null) {
            Swal.fire({
                title: "You have no dictionary saved!",
                text: "Save one using the 'Save Dictionary' button.",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Successfully exported your saved dictionary.",
            html: `Copy it below:<br/><br/>${saved_dict}`,
            icon: "success"
        });
    });
});

document.getElementById("importButton").addEventListener("click", () => {
    Swal.fire({
        title: "This is an advanced feature. Are you sure?",
        html: "You will be prompted to paste your exported dictionary. If you messed with the exported data, you can break the app's correct behavior.",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes, prompt me to paste my data",
        denyButtonText: "Abort!"
    }).then(result => {
        if (!result.isConfirmed) return;

        let data = prompt("Paste your exported dictionary:");
        if (data == null || data == "") {
            Swal.fire({
                title: "You've done something wrong.",
                text: "You either pressed the Cancel button, or didn't paste anything. That's fine, I haven't done anything, and you can try again if you want.",
                icon: "error"
            });
            return;
        }

        localStorage.setItem("dictionary", data);

        Swal.fire({
            title: "Looks like everything went fine!",
            text: "I've imported your exported data. If you encounter any problems, contact me and I'll tell you how to reset your saved data to fix your problems.",
            icon: "success"
        }).then(result => {
            window.location = window.location;
        });
    });
});