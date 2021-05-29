//Generic error logger.

function onError(e) {
    console.error(e);
}

// Declaring UI elements
let add_cit = document.getElementById('add_cit');
let copy_bib = document.getElementById('copy_bib');
let copy_cit = document.getElementById('copy_cit');
let clear_bib = document.getElementById('clear_bib');

// Adding listeners to UI elements
add_cit.addEventListener('click', function () {
    add_citation()
});
copy_bib.addEventListener('click', function () {
    paste_bibliography
});
copy_cit.addEventListener('click', function () {
    paste_citation()
});
clear_bib.addEventListener('click', function () {
    paste_bibliography()
});

// Global variables
var syncData = true;    // TODO Add switch in HTML to change this variable's value
var bibliography = "References";
var citations = [];

// Functions to interact with synced data
function getData(key="") {
    chrome.storage.sync.get([key], function(result) {
        return result.key;
    });
}

function setData(target_key="", value) {
    chrome.storage.sync.set({target_key: value}, function() {
        console.log('Value ' + target_key + ' is set to ' + value);
    });
}

// User-interacted functions
function add_citation() {   // Cite current url (where extension was activated)
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let citation = create_citation(url);
        bibliography += "\n";
        bibliography += citation;
        citations.push(citation);
    });
}

function clear_bibliography() {    // Clear all data in bibliography
    bibliography = "";
}

function paste_bibliography() {    // Copy bibliography to user clipboard
    navigator.clipboard.writeText(bibliography).then();
}

function paste_citation() {    // Copy latest citation to user clipboard
    navigator.clipboard.writeText(citations[citations.length - 1]).then();
}

function copy_link_from_clipboard() {   // Add citation to bibliography using user clipboard data
    bibliography += "\n";
    bibliography += create_citation(navigator.clipboard.readText());
}

function create_citation(link = "") {    // Function to generate citation
    document.getElementById('url_disp').value = link;   // ONLY FOR TESTING
    return link;
}
