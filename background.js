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

function addCitation() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        let url = tabs[0].url;
        chrome.storage.local.get(["Bibliography"], (result) => {
            let bib;
            bib = result.Bibliography;
            let cit;

            chrome.runtime.onMessage.addListener(
                (request, sender, sendResponse) => {
                    cit = request;
                    sendResponse({});
                    let today = new Date();
                    cit.dateAccessed = [today.getFullYear(), today.getMonth()+1, today.getDate()];
                    cit.url = url;

                    let exists = false;
                    bib.forEach((value) => {
                        if(value.title === cit.title) {
                            exists = true;
                        }
                    });
                    if(!exists) {
                        bib.push(cit);
                    }

                    chrome.storage.local.set({"Bibliography": bib}, () => {});
                    document.getElementById('url_disp').value = formatBib(bib);
                }
            );
            chrome.tabs.executeScript({
                file: 'contentScript.js'
            });
        });
    });
}

function formatBib(b) {
    let bib = "";
    if(b) {
        b.forEach((cit) => {
            let name = cit.author.split(' ');
            bib += name[1] + ', ' + name[0] + '. ';
            bib += '"' + cit.title + '." ';
            bib += cit.publisher + ', ';
            bib += cit.datePublished + ', ';
            bib += cit.url + '. ';
            bib += 'Accessed ' + cit.dateAccessed + '.\n';
        }); 
    }
    return bib;
}