rawHTML = (document.documentElement.outerHTML);

rawHTML = (document.documentElement.outerHTML);

var source_title;
if(document.querySelector("meta[property='og:title']") !== null){
    source_title = document.querySelector("meta[property='og:title']").getAttribute("content");
} else {
    source_title = document.getElementsByTagName("title")[0].innerText;
}

var publisher;
if(document.querySelector("meta[property='og:site_name']") !== null){
    publisher = document.querySelector("meta[property='og:site_name']").getAttribute("content");
} else {
    publisher = document.querySelector("meta[property='al:android:app_name']").getAttribute("content");
}

var author;
if(document.querySelector("meta[name='author']") !== null){
    author = document.querySelector("meta[name='author']").getAttribute("content");
} else if(document.querySelector("meta[property='author']") !== null){
    author = document.querySelector("meta[property='author']").getAttribute("content");
}

var publishingTime = document.querySelector("meta[property='article:published_time']").getAttribute("content");

var modifiedTime = document.querySelector("meta[property='article:modified_time']").getAttribute("content");

parser = new DOMParser();
xmlDoc = parser.parseFromString(rawHTML,"text/xml");
console.log(publisher);

cit = {
    title: source_title,
    author: author,
    publisher: publisher,
    datePublished: publishingTime,
    dateModified: modifiedTime
};

chrome.runtime.sendMessage(cit, function(response) {});