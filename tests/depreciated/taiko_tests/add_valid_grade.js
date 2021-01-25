// Open the addgrade page, click the second module in the list and the first session in the list, enter a grade of 72 and submit

const { openBrowser, goto, closeBrowser, click, press, write } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("127.0.0.1:8080/addgrade");
        await text("Add grade").exists();
        await click("Choose a module...");
        await press(['ArrowDown', 'ArrowDown', 'Enter']);
        await click("Choose a session...");
        await press(['ArrowDown', 'Enter']);
        await press(['Tab']);
        await write('72');
        await screenshot({path: 'screenshots\\add_valid_grade_filled.png'})
        await click('Submit');
        await text('Your grade was successfully added', {exactMatch: false}).exists();
        await screenshot({path: 'screenshots\\add_valid_grade_response.png'})
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
