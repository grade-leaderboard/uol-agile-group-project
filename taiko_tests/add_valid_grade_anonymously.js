// Open the addgrade page, click the second module in the list and the third session in the list, enter a grade of 72, select anonymous, and submit

const { openBrowser, goto, closeBrowser, click, press, write } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("127.0.0.1:8080/addgrade");
        await text("Add grade").exists();
        await click("Choose a module...");
        await press(['ArrowDown', 'ArrowDown', 'Enter']);
        await click("Choose a session...");
        await press(['ArrowDown', 'ArrowDown', 'ArrowDown', 'Enter']);
        await press(['Tab']);
        await write('72');
        await click('Do not reveal my identity in leaderboard. Keep this grade anonymous.')
        await screenshot({path: 'screenshots\\add_valid_grade_anonymously_filled.png'})
        await click('Submit');
        await text('Your grade was successfully added', {exactMatch: false}).exists();
        await screenshot({path: 'screenshots\\add_valid_grade_anonymously_response.png'})
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
