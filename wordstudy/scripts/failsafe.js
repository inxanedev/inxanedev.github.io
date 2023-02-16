document.getElementById("resetButton").addEventListener("click", () => {
    Swal.fire({
        title: "This will reset everything!",
        text: "This should only be used if the site is completely broken, for example after importing a dictionary incorrectly. It will reset everything, you will lose your current saved dictionary!",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: "No, go back",
        confirmButtonText: "Yes, reset everything"
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.setItem("dictionary", JSON.stringify({"list": []}));
            localStorage.setItem("randomlyReverse", "false");

            Swal.fire({
                title: "Reset successfully!",
                text: "All settings have been erased, which should fix most problems. If not, contact the developer!",
                icon: "success"
            }).then(result => {
                window.location = "index.html";
            });
        }
    });
});