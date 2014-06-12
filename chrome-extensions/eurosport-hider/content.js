console.log("Testing!")
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
//  chrome.tabs.executeScript({
//    code: 'document.body.style.backgroundColor="red"'
//  });
  //chrome.tabs.executeScript(null, {file: "dom-modifier.js"});
  chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
    chrome.tabs.executeScript(null, { file: "dom-modifier.js" });
  });
});
