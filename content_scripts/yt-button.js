console.log("[yt2clip]: yt-buttons.js started!");

// get url to the image in our extension
const imgURL = browser.runtime.getURL("icons/yt2clip-64.png");

// add event listener to make function run on every page navigation
document.addEventListener('yt-navigate-finish', process);

// browser.runtime.onMessage.addListener((message) => {
//   console.log("[yt2clip]: message received! " + message);
// });

setTimeout(process, 2000);

function process() {
  
  console.log("[yt2clip]: process function entered!");

  // check if this is a watch page
  if ('/watch' === location.pathname) {
    console.log("[yt2clip]: hey, it's a watch page!");
  } else {
    console.log("[yt2clip]: not a watch page, exiting...");
    return;
  }

  // find an element on the page to add our html next to
  const element = document.querySelector("#notification-preference-button");

  console.log("[yt2clip]: element is " + element);

  console.log("[yt2clip]: simple date - " + window.wrappedJSObject.ytInitialData.engagementPanels[3].engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items[0].videoDescriptionHeaderRenderer.publishDate.simpleText);

  // only continue if element is found
  // this is the case sometimes, eg on first page load, so we don't want
  // to carry on and set hasRun to true in that case.
  // also only continue if we haven't already made a button, eg hasRun is set,
  // otherwise we end up with lots of buttons.
  if (window.hasRun || element == null) {
    console.log("[yt2clip]: exiting...");
    return;
  }
  window.hasRun = true;

  // go ahead and make the button

  console.log("[yt2clip]: creating button");

  element.insertAdjacentHTML('afterend', 
      '<div id="yt2clip-but"><img src="' 
      + imgURL + '" width="16" height="16"></div>');

  const button = document.querySelector("#yt2clip-but");
  button.addEventListener('click', event => {

    console.log("[yt2clip]: you clicked da ting");

    const title = document.querySelector("#title h1").innerText;
    const url = window.location.href;
    const channel = document.querySelector("div.ytd-channel-name").innerText;
    const subs = document.querySelector("#owner-sub-count").innerText;
    const date = document.querySelector("#info span:nth-child(3)").innerText;
    // let date = document
    //     .querySelector("#watch7-content > meta[itemprop=datePublished")
    //     .getAttribute('content');
    const views = document.querySelector("#info span").innerText;
    const time = document.querySelector("span.ytp-time-duration").innerText;

    const text = title + "\n" + url + "\n" + channel + " (" + subs + ") - " 
                  + views + " - " + date + " - " + time;
    
    navigator.clipboard.writeText(text);

    // const confirmation = document.querySelector("#title h1");
    // confirmation.innerText += " [*COPIED INFO!*]";
  })
}