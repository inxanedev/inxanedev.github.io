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
let questionsRight = 0;

let reversed = false;

function setupQuestion(currentQuestion) {
    questionInput.value = "";
    questionPrompt.innerHTML = `(${currentQuestion + 1}/${dictionary["list"].length})<br/><br/>${_.escape(dictionary["list"][currentQuestion][(reversed ? "to" : "from")])}?`;
}

function reverse() {
    if (randomlyReverse) {
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
        html: `${_.escape(dictionary["list"][currentQuestion][(reversed ? "from" : "to")])}!<br><br><h2 style="color: black">Did you get it right?</h2>`,
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
                text: `You got ${questionsRight} out of ${dictionary["list"].length} correct! That's ${((questionsRight / dictionary["list"].length) * 100).toFixed(2)}% correct.`,
                icon: "success"
            }).then(result => {
                window.location = "index.html";
            });
        }

        reverse();

        setupQuestion(currentQuestion);
    });
}