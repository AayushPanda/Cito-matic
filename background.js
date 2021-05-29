// Functions to interact with synced data
function getData(key="") {
    if(syncData){
        chrome.storage.sync.get([key], function(result) {
            console.log(result.values);
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