chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });
});

var globalBlockIndex = [ "*www.reddit.com*" ];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 

    console.log( details.url.toString() );  
    return { cancel: true };
  },
  { 
    urls: globalBlockIndex
  },
  ["blocking"]
  );
