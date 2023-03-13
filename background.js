chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse("Recieved data");
  if(message.type === "today") {
    chrome.storage.local.remove("today_data");
    chrome.storage.local.set({ today_data: message.data });
  } else {
    chrome.storage.local.remove("next_day_data");
    chrome.storage.local.set({ next_day_data: message.data });
  }
});
