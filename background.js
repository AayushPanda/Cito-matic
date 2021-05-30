chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({"Bibliography": []}, () => {
        console.log("Bibliography created");
    });
    chrome.storage.local.set({"Activated": false}, () => {});
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.storage.local.get(["Activated"], (result) => {
        if(result.Activated) {
            addCitation();
        }
    });
});

function addCitation(url) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;
        chrome.storage.local.get(["Bibliography"], (result) => {
            let bib;
            bib = result.Bibliography;
            let cit = {
                url: url,
                dateAccessed: []
            }
            let exists = false;
            bib.forEach((value) => {
                if(value.url == cit.url) {
                    exists = true;
                }
            });
            if(!exists) {
                bib.push(cit);
            }
            chrome.storage.local.set({"Bibliography": bib}, () => {});
            document.getElementById('url_disp').value = formatBib(bib);
        });
    });
}


function formatBib(b) {
    let bib = "";
    if(b) {
        b.forEach((value) => {
            bib += value.url + ".\n";
        }); 
    }
    return bib;
}