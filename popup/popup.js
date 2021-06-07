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
document.getElementById('style').addEventListener('change', () => {
    changeStyle(document.getElementById('style').value);
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

chrome.storage.local.get(["Style"], (result) => {
    document.getElementById('style').value = result.Style;
});

function changeStyle(style) {
    chrome.storage.local.set({"Style": style}, () => {});
}

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