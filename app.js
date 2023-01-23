async function getSelectedTabs() {
  return browser.tabs.query({
    highlighted: true,
    currentWindow: true,
  });
}

browser.contextMenus.create({
  id: "yt2clip",
  title: "Youtube to Clipboard",
  contexts: ["tab"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  copyInfo();
});

async function copyInfo() {
  const text = tabsToText(await getSelectedTabs());
  navigator.clipboard.writeText(text);
}

function tabsToText(tabs) {
  return tabs[0].title + "\n" + tabs[0].url;
}