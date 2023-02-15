let questionPrompt = document.getElementById("question-prompt");
let questionInput = document.getElementById("question-input");

questionInput.addEventListener("keypress", event => {
    if (event.key == "Enter") {
        document.getElementById("submit-button").click();
    }
})

let dictionary = localStorage.getItem("dictionary");
let randomlyReverse = localStorage.getItem("randomlyReverse") === "true";

if (randomlyReverse == null) {
    randomlyReverse = false;
}

let currentQuestion = 0;

let reversed = false;

function setupQuestion(currentQuestion) {
    questionInput.value = "";
    questionPrompt.textContent = `What is ${dictionary["list"][currentQuestion][(reversed ? "to" : "from")]}?`;
}

function reverse() {
    if (randomlyReverse) {
        // https://stackoverflow.com/a/36756480
        reversed = Math.random() < 0.5;
    }
}


if (dictionary == null) {
    Swal.fire({
        title: "No dictionary found!",
        text: "Save one in the main page before entering this webpage!",
        icon: "error"
    }).then(result => {
        window.location = "index.html";
    });
} else {
    dictionary = JSON.parse(dictionary);
    dictionary["list"] = _.shuffle(dictionary["list"]);
    console.log(dictionary["list"]);

    reverse();

    setupQuestion(currentQuestion);
}

function submit() {
    Swal.fire({
        title: "The correct answer was...",
        text: `${dictionary["list"][currentQuestion][(reversed ? "from" : "to")]}!`,
        icon: "info"
    }).then(result => {
        currentQuestion++;
        if (dictionary["list"].length == currentQuestion) {
            Swal.fire({
                title: "You've completed every question!",
                text: "Going back to main page...",
                icon: "success"
            }).then(result => {
                window.location = "index.html";
            });
        }
        setupQuestion(currentQuestion);
    });
}