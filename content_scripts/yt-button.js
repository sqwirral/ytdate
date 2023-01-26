console.log("[yt2clip]: yt-buttons.js loaded");

// declare global vars
let imgURL = browser.runtime.getURL("icons/yt2clip-64.png");
let hasRun = false;
let metadata;

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

  // replace date
  // metadata should be a string like "31,448 views • Jan 6, 2021"
  // needs to be trimmed due to line break and whitespace at the start
  metadata = document.querySelector("tp-yt-paper-tooltip.ytd-watch-metadata > div").innerText.trim();
  console.log("[yt2clip]: found metadata");
  const info = document.querySelector("yt-formatted-string#info");
  console.log("[yt2clip]: found info");
  info.innerHTML = '<span class="style-scope yt-formatted-string bold" dir="auto" style-target="bold">' 
                  + metadata + '</span';
  console.log("[yt2clip]: replaced info with metadata");

  // find an element on the page to add our html next to
  const element = document.querySelector("#notification-preference-button");

  console.log("[yt2clip]: found element " + element);

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

  // add event listener to button
  const button = document.querySelector("#yt2clip-but");
  button.addEventListener('click', event => {

    console.log("[yt2clip]: button clicked!");

    // grab all the video info
    const title = document.querySelector("#title h1").innerText;
    const url = window.location.href;
    const channel = document.querySelector("div.ytd-channel-name").innerText;
    const subs = document.querySelector("#owner-sub-count").innerText;
    const views = document.querySelector("#info span").innerText;
    const time = document.querySelector("span.ytp-time-duration").innerText;

    // new date attempt
    //let metadata = document.querySelector("tp-yt-paper-tooltip.ytd-watch-metadata > div").innerText;
    const dateSplit = metadata.split(" ");
    const date = dateSplit[3] + " " + dateSplit[4] + " " + dateSplit[5];

    // build text
    const text = title + "\n" + url + "\n" + channel + " (" + subs + ") - " 
                  + views + " - " + date + " - " + time;
    
    // write text to clipboard
    navigator.clipboard.writeText(text);

    console.log("[yt2clip]: text copied to clipboard:");
    console.log(text);
  });

  console.log("[yt2clip]: button now created");
}