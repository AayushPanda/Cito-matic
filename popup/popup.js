//Generic error logger.
function onError(e) {
    console.error(e);
}

// Adding listeners to UI elements
document.getElementById('add_cit').addEventListener('click', () => {
    addCitation();
});
document.getElementById('copy_bib').addEventListener('click', () => {
    copyBib();
});
document.getElementById('clear_bib').addEventListener('click', () => {
    clearBib();
});
document.getElementById('switch').addEventListener('click', () => {
    chrome.storage.local.get(["Activated"], (result) => {
        chrome.storage.local.set({"Activated": !result.Activated}, () => {});
    });
});

chrome.storage.local.get(["Activated"], (result) => {
    document.getElementById('switch').checked = result.Activated;
});

chrome.storage.local.get(["Bibliography"], (result) => {
    document.getElementById('url_disp').value = formatBib(result.Bibliography);
});

function addCitation(url) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;
        chrome.storage.local.get(["Bibliography"], (result) => {
            let bib;
            bib = result.Bibliography;
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
    if(b) { b.forEach((value) => {bib += value + ".\n";}); }
    return bib;
}