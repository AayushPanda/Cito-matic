/*
Generic error logger.

*/
function onError(e) {
    console.error(e);
}

var bibliography = "";

function add_citation() {   // Cite current url (where extension was activated)
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        bibliography += "\n";
        bibliography += create_citation(tabs[0].url);
    });
}

function clear_bibliography() {    // Clear all data in bibliography
    bibliography = ""
}

function paste_bibliography() {    // Copy bibliography to clipboard
    navigator.clipboard.writeText(bibliography).then()
}

function copy_link_from_clipboard() {   // Add citation to bibliography using clipboard data
    bibliography += "\n";
    bibliography += create_citation(navigator.clipboard.readText())
}

function create_citation(link="") {    // Function to generate citation

}
