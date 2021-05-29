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
    add_citation();
});
copy_bib.addEventListener('click', function () {
    paste_bibliography();
});
copy_cit.addEventListener('click', function () {
    paste_citation();
});
clear_bib.addEventListener('click', function () {
    clear_bibliography();
});

// Global variables
let syncData = true;    // TODO Add switch in HTML to change this variable's value

data = {
    "Bibliography":"",
    "Citations":[]
};

// Getting saved citation data
if(getData("Bibliography") === undefined){
    data["Bibliography"] = "References \n";
    setData(data["Bibliography"]);
} else {
    data["Bibliography"] = getData("Bibliography");
}

if(getData("Citations") === undefined){
    data["Citations"] = ["No Citations"];
    setData(data["Citations"]);
} else {
    data["Citations"] = getData("Citations");
}


// Functions to interact with synced data
function getData(key="") {
    if(syncData){
        chrome.storage.sync.get([key], function(result) {
            console.log(result.values);
            return result.values;
        });
    } else {
        chrome.storage.local.get([key], function(result) {
            return result.values;
        });
    }
}

function setData(data_ob) {
    if(syncData){
        chrome.storage.sync.set(data_ob, function() {
            //console.log('Value ' + target_key + ' is set to ' + value);
        });
    } else {
        chrome.storage.local.set(data_ob, function() {
            //console.log('Value ' + target_key + ' is set to ' + value);
        });
    }
}


// User-interacted functions
function add_citation() {   // Cite current url (where extension was activated)
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let citation = create_citation(url);
        data["Bibliography"] += citation;
        data["Bibliography"] += "\n";
        data["Citations"].push(citation);
        setData(data["Bibliography"]);
        setData(data["Citations"]);
    });
}

function clear_bibliography() {    // Clear all data in bibliography
    data["Bibliography"] = "References";
    data["Citations"] = ["\n"];
    setData(data["Bibliography"]);
    setData(data["Citations"]);
}

function paste_bibliography() {    // Copy bibliography to user clipboard
    navigator.clipboard.writeText(data["Bibliography"]).then();
}

function paste_citation() {    // Copy latest citation to user clipboard
    navigator.clipboard.writeText(data["Citations"][data["Citations"].length - 1]).then();
}

function copy_link_from_clipboard() {   // Add citation to bibliography using user clipboard data
    bibliography += "\n";
    bibliography += create_citation(navigator.clipboard.readText());
}

function create_citation(link = "") {    // Function to generate citation
    document.getElementById('url_disp').value = link;   // ONLY FOR TESTING
    return link;
}
