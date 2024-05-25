chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i].value += ' Electron/'
            break
        }
    }    
    return {requestHeaders: details.requestHeaders}
},
    {urls: ["*://discord.com/*"]},
    ["blocking", "requestHeaders"]
)