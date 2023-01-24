(() => {
  /**
   * copy video info when button is clicked, and show confirmation.
   * date sucks right now, it's their rounded version, not the full date.
   */
  function runStuff() {
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
  }

  /**
   * Listen for messages from the background script.
   */
  browser.runtime.onMessage.addListener((message) => {
    runStuff();
  });

})();
