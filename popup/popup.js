//Generic error logger.
function onError(e) {
    console.error(e);
}

// Declaring UI elements
let add_cit = document.getElementById('add_cit');
let copy_bib = document.getElementById('copy_bib');
let clear_bib = document.getElementById('clear_bib');
bibliography = "References \n";

// Adding listeners to UI elements
add_cit.addEventListener('click', () => {
    addCitation();
});
copy_bib.addEventListener('click', () => {
    copyBib();
});
clear_bib.addEventListener('click', () => {
    clearBib();
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({"Bibliography": []}, () => {
        console.log("Bibliography created");
    });
});

chrome.storage.local.get(["Bibliography"], (result) => {
    bib = result.Bibliography;

    bib.forEach(function (value) {
        bibliography += value;
        bibliography += " \n";
    });

    document.getElementById('url_disp').value = bibliography;
});

function addCitation(url) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;
        chrome.storage.local.get(["Bibliography"], (result) => {
            if(result.Bibliography === undefined){
                bib = ["References"];

            } else {
                bib = result.Bibliography;
            }
            if(!bib.includes(url)){
                bib.push(url);
                bibliography += (url + " \n");
            }
            chrome.storage.local.set({"Bibliography": bib}, () => {});
            document.getElementById('url_disp').value = bibliography;
        });
    });
}

function copyBib() {
    navigator.clipboard.writeText(bibliography).then();
}

function clearBib() {
    chrome.storage.local.set({"Bibliography": []}, () => {
        console.log("Bibliography cleared");
        bib = ["References"];
        bibliography = "References \n";
        document.getElementById('url_disp').value = bibliography;
    });
}