(() => {
  /**
   * 
   */
  function runStuff(text) {
    const createdThing = document.createElement("h1");
    createdThing.style.height = "100vh";
    createdThing.className = "omg wat lol";
    createdThing.textContent = "hellloooo woooorrrrld112222!";
    createdThing.innerText = text;
    document.body.appendChild(createdThing);
  }

  /**
   * Listen for messages from the background script.
   */
  browser.runtime.onMessage.addListener((message) => {
    runStuff(message.blahblah);
  });
})();
