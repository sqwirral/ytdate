(() => {
  /**
   * copy video info when button is clicked, and show confirmation.
   * date sucks right now, it's their rounded version, not the full date.
   * actually date IS full if you click to view it first on yt
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

    //const simpledate = document.querySelector("ytInitialData.engagementPanels[2].engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items[0].videoDescriptionHeaderRenderer.publishDate.simpleText");
    //console.log(ytInitialData);
    // ^ console days the above isn't defined. i can see it as a js var object in the youtube code but i guess i can't access that var with my script. dang. can't use it in the popup.js either.

    // you can change the date here, it works but first i need to figure out how to obtain the real date
    //const dateToChange = document.querySelector("#info span:nth-child(3)");
    //dateToChange.innerText = "hola amigo";
  }

  /**
   * Listen for messages from the background script.
   */
  browser.runtime.onMessage.addListener((message) => {
    runStuff();
  });

})();
