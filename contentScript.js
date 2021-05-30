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

var publishingTime = document.querySelector("meta[property='article:published_time']").getAttribute("content").toString();

var modifiedTime = document.querySelector("meta[property='article:modified_time']").getAttribute("content").toString();

parser = new DOMParser();
xmlDoc = parser.parseFromString(rawHTML,"text/xml");

function makeDate(datestring){  // Only works with format like: 2021-05-29T09:00:00-04:00
    let dateString = new Date(publishingTime.slice(0,4), publishingTime.slice(5,7), publishingTime.slice(8,10)).toDateString().slice(4,15);
    return dateString.slice(4,7) + dateString.slice(0,4) + dateString.slice(7,13) + ".";
}

publishingTime = makeDate(publishingTime);
modifiedTime = makeDate(modifiedTime);

console.log(publishingTime);

cit = {
    title: source_title,
    author: author,
    publisher: publisher,
    datePublished: publishingTime,
    dateModified: modifiedTime
};

chrome.runtime.sendMessage(cit, function(response) {});