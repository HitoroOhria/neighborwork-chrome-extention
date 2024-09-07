chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "https://sycl.neighborwork.jp/reserve/" });
});
