window.addEventListener('load', function() {
  document.addEventListener("click", function (e) {
    console.log("Clicked");
    fetch('https://www.zomato.com/partners/*')
    .then(response => {
      var res = response.text();
      return res;
    })
    .then(data => {
      console.log(data);
      this.setState({ data });
    });
        /*.then(response => console.log(response))
        let clone = response.clone();
         console.log("the reposnse", clone)*/
//    .then(res => console.log(res))
//    .then(response => console.log(response))
//    .catch(error => console.log('ERROR'))
  },{once : true});
});
/*chrome.devtools.network.onRequestFinished.addListener(request => {
  request.getContent((body) => {
    if (request.request && request.request.url) {
      if (request.request.url.includes('https://www.zomato.com/partners/onlineordering/orders/')) {
         console.log("The background script is working")
//         .then(res => console.log(res))
//         .then(response => console.log(response))
         let clone = response.clone();
         console.log("the reposnse", clone)
         //continue with custom code
//         var bodyObj = JSON.parse(body);//etc.
      }
}
});
});*/
/*chrome.webRequest.onCompleted.addListener(function (details) {
  // Process the XHR response metadata. The request body is not available
  console.log("The background script is working")
}, {urls: ['<all_urls>']});*/
/*
const constantMock = window.fetch;
 window.fetch = function() {
    return new Promise((resolve, reject) => {
        constantMock.apply(this, arguments)
            .then((response) => {
                if (response) {
                    response.clone().json() //the response body is a readablestream, which can only be read once. That's why we make a clone here and work with the clone
                    .then( (json) => {
                        console.log(json);
                        //Do whatever you want with the json
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(response);
                    })
                }
                else {
                    console.log(arguments);
                    console.log('Undefined Response!');
                    reject(response);
                }
            })
            .catch((error) => {
                console.log(error);
                reject(response);
            })
    })
}*/

//background.js
//import _, { map } from 'underscore';
/*
var currentTab;
var version = "1.0";

chrome.tabs.onActivated.addListener(activeTab => {
    currentTab&&chrome.debugger.detach({tabId:currentTab.tabId});
    currentTab = activeTab;
    chrome.debugger.attach({ //debug at current tab
        tabId: currentTab.tabId
    }, version, onAttach.bind(null, currentTab.tabId));
});

function onAttach(tabId) {
    chrome.debugger.sendCommand({ //first enable the Network
        tabId: tabId
    }, "Network.enable");
    chrome.debugger.onEvent.addListener(allEventHandler);
}

function allEventHandler(debuggeeId, message, params) {
    if (currentTab.tabId !== debuggeeId.tabId) {
        return;
    }
    if (message === "Network.responseReceived") { //response return
        chrome.debugger.sendCommand({
            tabId: debuggeeId.tabId
        }, "Network.getResponseBody", {
            "requestId": params.requestId
            //use underscore to add callback a more argument, passing params down to callback
        }, _.partial(function(response,params) {
            // you get the response body here!
            console.log(response.body,params.response.url);
                        // you can close the debugger tips by:
            // chrome.debugger.detach(debuggeeId);
        },_,params));
    }
}*/
