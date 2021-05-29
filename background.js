function getData(key="") {
    if(syncData){
        chrome.storage.sync.get([key], function(result) {
            return result.values;
        });
    } else {
        chrome.storage.local.get([key], function(result) {
            return result.values;
        });
    }
}

function setData(target_key="", value) {
    if(syncData){
        chrome.storage.sync.set({target_key: value}, function() {
            console.log('Value ' + target_key + ' is set to ' + value);
        });
    } else {
        chrome.storage.local.set({target_key: value}, function() {
            console.log('Value ' + target_key + ' is set to ' + value);
        });
    }
}

if(getData("Bibliography") === undefined){
    bibliography = "References \n";
    setData("Bibliography", bibliography);
} else {
    bibliography = getData("Bibliography");
}

if(getData("Citations") === undefined){
    citations = ["No Citations"];
    setData("Citations",citations);
} else {
    citations = getData("Citations");
}
