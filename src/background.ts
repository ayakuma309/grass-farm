
if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log("Chrome extension APIs available");

  chrome.runtime.onInstalled.addListener(() => {
    console.log("Grass Farm extension installed!");
  });

  // chrome.action が存在するか確認
  if (chrome.action && chrome.action.onClicked) {
    chrome.action.onClicked.addListener((tab) => {
      console.log("Extension icon clicked on tab:", tab);
      if (typeof tab.id !== "number") {
        console.warn("No valid tab id available");
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          alert("Grass Farm extension activated!");
        }
      });
    });
  } else {
    console.error("chrome.action.onClicked is not available");
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);
    if (message.action === "getGreeting") {
      sendResponse({ greeting: "Hello from the background!" });
    }
    return true; // 非同期レスポンスのため
  });
} else {
  console.error("Chrome extension APIs not available");
}
