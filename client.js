/*
Generic error logger.

*/
function onError(e) {
    console.error(e);
}

var bibliography = "";
var citations = [];

function add_citation() {   // Cite current url (where extension was activated)
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let citation = create_citation(url);
        bibliography += "\n";
        bibliography += citation;
        citations.push()
    });
}

function clear_bibliography() {    // Clear all data in bibliography
    bibliography = ""
}

function paste_bibliography() {    // Copy bibliography to user clipboard
    navigator.clipboard.writeText(bibliography).then()
}

function paste_citation() {    // Copy latest citation to user clipboard
    navigator.clipboard.writeText(citations[-1]).then()
}

function copy_link_from_clipboard() {   // Add citation to bibliography using user clipboard data
    bibliography += "\n";
    bibliography += create_citation(navigator.clipboard.readText())
}

function create_citation(link="") {    // Function to generate citation
    document.getElementById('url_disp').value = link;   // ONLY FOR TESTING
    return link
}
