let questionPrompt = document.getElementById("question-prompt");

let dictionary = localStorage.getItem("dictionary");
let randomlyReverse = localStorage.getItem("randomlyReverse") === "true";

if (randomlyReverse == null) {
    randomlyReverse = false;
}

let currentQuestion = 0;
let questionsRight = 0;

let reversed = false;

function setupQuestion(currentQuestion) {
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
        html: `${dictionary["list"][currentQuestion][(reversed ? "from" : "to")]}!<br><br><h2 style="color: black">Did you get it right?</h2>`,
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Yes",
        icon: "info"
    }).then(result => {
        currentQuestion++;

        if (result.isConfirmed) {
            questionsRight++;
        }

        if (dictionary["list"].length == currentQuestion) {
            Swal.fire({
                title: "You've completed every question!",
                text: `You got ${questionsRight} out of ${dictionary["list"].length} correct! That's ${(questionsRight / dictionary["list"].length) * 100}% correct.`,
                icon: "success"
            }).then(result => {
                window.location = "index.html";
            });
        }

        reverse();

        setupQuestion(currentQuestion);
    });
}