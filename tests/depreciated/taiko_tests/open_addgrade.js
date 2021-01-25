const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    await openBrowser();
    await goto("127.0.0.1:8080/addgrade");
    await text("Add grade").exists();
    await screenshot({path: 'screenshots\\addgrade_opened.png'})
    await closeBrowser();
})();