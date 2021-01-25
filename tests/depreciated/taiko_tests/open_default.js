// Open the default page and take a screenshot to confirm what was rendered

const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    await openBrowser();
    await emulateDevice('iPhone X')
    await goto("127.0.0.1:8080");
    await screenshot({path: 'screenshots\\default_page_opened.png'})
    await closeBrowser();
})();