
const imgURL = browser.runtime.getURL("icons/yt2clip-64.png");

document.addEventListener('yt-navigate-finish', process);

function process() {
  const element = document.querySelector(".add-to-collection-button-new");
  console.log("element: " + element);
  element.insertAdjacentHTML('afterend', 
      '<div id="yt2clip-but"><img src="' 
      + imgURL + '" width="16" height="16"></div>');

  const button = document.querySelector("#yt2clip-but");
  button.addEventListener('click', event => {

    alert("You clicked da ting.");

    const title = document.querySelector("#title h1").innerText;
    const url = window.location.href;
    const channel = document.querySelector("div.ytd-channel-name").innerText;
    const subs = document.querySelector("#owner-sub-count").innerText;
    const date = document.querySelector("#info span:nth-child(3)").innerText;
    const views = document.querySelector("#info span").innerText;
    const time = document.querySelector("span.ytp-time-duration").innerText;

    const text = title + "\n" + url + "\n" + channel + " (" + subs + ") - " 
                  + views + " - " + date + " - " + time;
    
    navigator.clipboard.writeText(text);

    const confirmation = document.querySelector("#title h1");
    confirmation.innerText += " [*COPIED INFO!*]";
  })
}