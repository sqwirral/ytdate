async function getSelectedTabs() {
  return browser.tabs.query({
    highlighted: true,
    currentWindow: true,
  });
}

browser.browserAction.onClicked.addListener(copyTitleAndUrl);

const copyTitleAndUrlsMenuId = "copy-selected-tab-info";
browser.contextMenus.create({
  id: copyTitleAndUrlsMenuId,
  title: "Send to Twitch",
  contexts: ["tab"],
});

const copyAsMarkdownMenuID = "copy-markdown";
browser.contextMenus.create({
  id: copyAsMarkdownMenuID,
  title: "Send to Markdown",
  contexts: ["tab"],
});

function tabsToMarkdown(tabs, returnAsList = false, separator = " ") {
  return tabs
    .map((tab) => `${returnAsList ? "* " : ""}[${tab.title}](${tab.url})`)
    .join(separator);
}

async function copyMarkdown() {
  const markdown = tabsToMarkdown(await getSelectedTabs());
  navigator.clipboard.writeText(markdown);
}

function tabsToText(tabs, options) {
  function setMissingOptionsToDefault(options) {
    const defaultOptions = {
      includeTitle: true,
      titleUrlSeparator: " - ",
      tabStringSeparator: "\n",
    };
    return Object.assign({}, defaultOptions, options);
  }
  options = setMissingOptionsToDefault(options);
  return tabs
    .map((tab) => tabToString(tab, options))
    .join(options.tabStringSeparator);
}

function tabToString(tab, option) {
  let result = "";
  if (options.includeTitle) {
    result += tab.title;
    result += options.titleUrlSeparator;
  }
  result += tab.url;
  return result;
}

async function copyTitleAndUrl() {
  const titlesAndUrlsString = tabsToText(await getSelectedTabs());
  navigator.clipboard.writeText(titlesAndUrlsString);
  var params = "title=" + titlesAndUrlsString;
}

async function copyMarkdown() {
  const markdown = tabsToMarkdown(await getSelectedTabs());
  navigator.clipboard.writeText(markdown);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case copyTitleAndUrlsMenuId:
      copyTitleAndUrl();
      break;
    case copyAsMarkdownMenuID:
      copyMarkdown();
      break;
  }
});