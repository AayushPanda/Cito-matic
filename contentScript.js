var rawHTML = (document.documentElement.outerHTML);
chrome.storage.local.set({"rawHTML": rawHTML}, () => {});
