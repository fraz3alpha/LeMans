<!doctype html>
<html>
  <head>
    <title>Background Page</title>    
  </head>
  <body>
    <script>
        chrome.browserAction.onClicked.addListener(function(tab) 
        {
            chrome.tabs.executeScript(null, {file:"content.js"});
        });
    </script>
  </body>
</html>
