console.log("[ytdate]: yt-date.js loaded");

// add event listener to make function run on every page navigation
// also without this i had problems with my /watch check even on first load
document.addEventListener("yt-navigate-finish", start);

function start() {

  console.log("[ytdate]: start function entered");
  
  // check if this is a watch page
  if (location.pathname !== "/watch") {
    console.log("[ytdate]: not a watch page, exiting...");
    return;
  } else {
    console.log("[ytdate]: ooh, it's a watch page!");
  }

  // wait a few secs before trying to run, because youtube is weird
  setTimeout(runNow, 2000);
}

function runNow() {
  
  console.log("[ytdate]: runnow function entered");

  // metadata should be a string like "31,448 views • Jan 6, 2021"
  const metadata = document.querySelector("tp-yt-paper-tooltip.ytd-watch-metadata > div").innerText;
  console.log("[ytdate]: found metadata");

  // split metadata and trim due to line break and whitespace at the start
  const splitmeta = metadata.split("•");
  const date = splitmeta[1].trim();

  // replace date with proper one
  const oldDate = document.querySelector("yt-formatted-string#info span:nth-child(3)");
  oldDate.innerText = date;

  console.log("[ytdate]: replaced date");
}