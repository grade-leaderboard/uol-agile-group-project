// Open the addgrade page, click the fourth module in the list and the second session in the list, enter a grade of 72 and submit
// Then, repeat the process, which should generate an error as the course already has a grade

const { openBrowser, goto, closeBrowser, click, press, write } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("127.0.0.1:8080/addgrade");
        await text("Add grade").exists();
        await click("Choose a module...");
        await press(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'Enter']);
        await click("Choose a session...");
        await press(['ArrowDown', 'ArrowDown', 'Enter']);
        await press(['Tab']);
        await write('72');
        await click('Submit');
        await text('Your grade was successfully added', {exactMatch: false}).exists();
        await goto("127.0.0.1:8080/addgrade");
        await text("Add grade").exists();
        await click("Choose a module...");
        await press(['ArrowDown', 'ArrowDown']);
        await press(['Enter']);
        await click("Choose a session...");
        await press(['ArrowDown', 'Enter']);
        await press(['Tab']);
        await write('72');
        await screenshot({path: 'screenshots\\add_grade_twice_error_caught_filled.png'})
        await click('Submit');
        await text('You already have a grade', {exactMatch: false}).exists();
        await screenshot({path: 'screenshots\\add_grade_twice_error_caught_response.png'})
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
