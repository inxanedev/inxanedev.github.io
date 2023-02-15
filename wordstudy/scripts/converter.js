const hyphenReplacement = "=[!]=HYPHEN=[!]=";

function unescapeHyphenReplacements(text) {
    return text.replaceAll(hyphenReplacement, "-");
}

document.getElementById("convertButton").addEventListener("click", () => {
    let text = document.getElementById("textarea").value;

    let jsonData = {"list": []};

    let splitText = text.split("\n");

    let error = false;

    splitText.every(entry => {
        if (entry.trim().length == 0) return true;

        entry = entry.replaceAll("\\-", hyphenReplacement);

        let splitEntry = entry.split("-");
        
        if (splitEntry.length != 2) {
            Swal.fire({
                title: "Error",
                text: "An entry had more than one, or no hyphens, which breaks the converter. Please read the IMPORTANT note!",
                icon: "error"
            });
            error = true;
            return false;
        }

        splitEntry = splitEntry.map(t => t.trim());

        jsonData.list.push({
            "from": unescapeHyphenReplacements(splitEntry[0]),
            "to": unescapeHyphenReplacements(splitEntry[1])
        });

        return true;
    });

    if (!error) {
        Swal.fire({
            title: "Successfully converted your dictionary!",
            html: `Copy it below:<br/><br/>${JSON.stringify(jsonData)}`,
            icon: "success"
        });
    }
});