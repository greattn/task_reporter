let port = null;

chrome.runtime.onConnect.addListener(function (incomingPort) {
  if (incomingPort.name === "popup") {
    port = incomingPort;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse("Recieved data");

  if (port) {
    port.postMessage({ data: message });
  }
});

