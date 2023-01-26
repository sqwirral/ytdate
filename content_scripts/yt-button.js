console.log("[yt2clip]: yt-buttons.js loaded");

// declare global vars
let imgURL = browser.runtime.getURL("icons/yt2clip-64.png");
let hasRun = false;

// add event listener to make function run on every page navigation
// also without this i had problems with my /watch check even on first load
document.addEventListener('yt-navigate-finish', start);

function start() {

  console.log("[yt2clip]: start function entered");
  
  // check if this is a watch page
  if ('/watch' === location.pathname) {
    console.log("[yt2clip]: ooh, it's a watch page!");
  } else {
    console.log("[yt2clip]: not a watch page, exiting...");
    return;
  }

  // remove button if it already exists
  const oldButton = document.querySelector("#yt2clip-but");
  if (oldButton != null) {
    console.log("[yt2clip]: old button found, removing...");
    oldButton.remove();
  }

  // wait a few secs before trying to create button, because youtube is weird
  setTimeout(createButton, 2000);
}

function createButton() {
  
  console.log("[yt2clip]: create button function entered");

  // metadata should be a string like "31,448 views • Jan 6, 2021"
  const metadata = document.querySelector("tp-yt-paper-tooltip.ytd-watch-metadata > div").innerText;
  console.log("[yt2clip]: found metadata");

  // split metadata and trim due to line break and whitespace at the start
  const splitmeta = metadata.split("•");
  const views = splitmeta[0].trim();
  const date = splitmeta[1].trim();

  // replace date with proper one
  const oldDate = document.querySelector("yt-formatted-string#info span:nth-child(3)");
  oldDate.innerText = date;

  // save old style views (1 year ago, etc) in case we want it
  const oldViews = document.querySelector("yt-formatted-string#info span").innerText;

  console.log("[yt2clip]: replaced date");

  // find an element on the page to add our html next to
  const element = document.querySelector("#notification-preference-button");

  // only continue if element is found
  if (element == null) {
    console.log("[yt2clip]: element is null, exiting...");
    return;
  }

  console.log("[yt2clip]: creating button");

  // create button
  element.insertAdjacentHTML('afterend', 
      '<div id="yt2clip-but"><img src="' 
      + imgURL + '" width="16" height="16"></div>');

  // sanitized version, working but button is in the wrong place
  // html = '<div id="yt2clip-but"><img src="' 
  //     + imgURL + '" width="16" height="16"></div>';
  // console.log("[yt2clip]: 1");
  // parsed = parser.parseFromString(html, 'text/html');
  // console.log("[yt2clip]: 2");
  // element.appendChild(parsed.body.firstChild);
  // console.log("[yt2clip]: 3");

  // add event listener to button
  const button = document.querySelector("#yt2clip-but");
  button.addEventListener('click', event => {

    console.log("[yt2clip]: button clicked!");

    // grab all the video info
    const title = document.querySelector("#title h1").innerText;
    const url = window.location.href;
    const channel = document.querySelector("div.ytd-channel-name").innerText;
    const subs = document.querySelector("#owner-sub-count").innerText;
    const time = document.querySelector("span.ytp-time-duration").innerText;

    // build text
    const text = title + "\n" + url + "\n" + channel + " (" + subs + ") - " 
                  + oldViews + " - " + date + " - " + time;
    
    // write text to clipboard
    navigator.clipboard.writeText(text);

    console.log("[yt2clip]: text copied to clipboard:");
    console.log(text);
  });

  console.log("[yt2clip]: button now created");
}