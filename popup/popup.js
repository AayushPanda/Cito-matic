//Generic error logger.
function onError(e) {
    console.error(e);
}

// Declaring UI elements
let add_cit = document.getElementById('add_cit');
let copy_bib = document.getElementById('copy_bib');
let clear_bib = document.getElementById('clear_bib');

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
    document.getElementById('url_disp').value = result.Bibliography;
});

function addCitation(url) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;
        chrome.storage.local.get(["Bibliography"], (result) => {
            let bib;
            if(result.Bibliography === undefined){
                bib = []
            } else {
                bib = result.Bibliography;
            }
            if(!bib.includes(url)){
                bib.push(url);
            }
            chrome.storage.local.set({"Bibliography": bib}, () => {});
            document.getElementById('url_disp').value = formatBib(bib);
        });
    });
}

function copyBib() {
    chrome.storage.local.get(["Bibliography"], (result) => {
        navigator.clipboard.writeText(formatBib(result.Bibliography)).then();
    });
}

function clearBib() {
    chrome.storage.local.set({"Bibliography": []}, () => {
        console.log("Bibliography cleared");
        document.getElementById('url_disp').value = "";
    });
}

function formatBib(b) {
    let bib = "";
    bib.forEach((value) => {bibliography += value + ".\n";});
    return bib;
}