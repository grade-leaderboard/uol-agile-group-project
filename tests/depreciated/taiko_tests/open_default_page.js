const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    await openBrowser();
    await goto("127.0.0.1:8080");
    // await write("taiko test automation");
    // await press("Enter");
    await closeBrowser();
})();