let rawHTML = (document.documentElement.outerHTML);

let title;
let publisher;
let author;
let publishingTime;

chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
    let url = tabs[0].url;
    chrome.storage.local.get(["Bibliography"], (result) => {
        let bib;
        bib = result.Bibliography;
        let today = new Date();
        let cit = {
            url: url,
            dateAccessed: [today.getFullYear(), today.getMonth()+1, today.getDate()]
        };
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
    });
});

