rawHTML = (document.documentElement.outerHTML);

cit = {
    title: "Hello World",
    author: "John Doe",
    publisher: "Pub Inc.",
    datePublished: [2021, 05, 29]
};

chrome.runtime.sendMessage(cit, function(response) {});