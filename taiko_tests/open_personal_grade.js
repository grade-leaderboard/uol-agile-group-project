const { openBrowser, goto, write, click, closeBrowser } = require('taiko');

(async () => {
    await openBrowser();
    await goto("127.0.0.1:8080/personal_grade");
    await text("Aleksandar Milosevic").exists();
    await screenshot({path: 'screenshots\\personal_grade_opened.png'})
    await closeBrowser();
})();