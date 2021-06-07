chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({"Bibliography": []}, () => {
        console.log("Bibliography created");
    });
    chrome.storage.local.set({"Activated": false}, () => {
        console.log("Activated set to false");
    });
    chrome.storage.local.set({"Style": "mla"}, () => {
        console.log("Style set to MLA");
    });
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
                    cit.dateAccessed = makeDateNums([today.getFullYear(), today.getMonth()+1, today.getDate()]);
                    cit.url = url;

                    let exists = false;
                    bib.forEach((value) => {
                        if(value.url === cit.url) {
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

function makeDateNums(arr) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dateString = "";
    dateString += arr[2] + " " + months[arr[1]] + " " + arr[0];
    return arr[2] + " " + months[arr[1]] + " " + arr[0];
}

function formatBib(b) {
    let bib = "";
    if(b) {
        b.forEach((cit) => {
            if(cit.author) {
                let name = cit.author.split(' ');
                if(name.length > 1) {
                    bib += name[1] + ', ' + name[0] + '. ';
                } else {
                    bib += name[0];
                }
            }
            bib += '"' + cit.title + '." ';
            if(cit.publisher) { bib += cit.publisher + ', '; }
            if(cit.datePublished) { bib += cit.datePublished + ', '; }
            bib += cit.url + '. ';
            bib += 'Accessed ' + cit.dateAccessed + '.\n';
        }); 
    }
    return bib;
}