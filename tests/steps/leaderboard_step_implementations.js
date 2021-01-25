/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    emulateDevice,
    clear
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        // headless: headless
        headless: false
    })
});

afterSuite(async () => {
    await closeBrowser();
});

step("Change device to iPhone X", async () => {
    await emulateDevice('iPhone X')
});



step("Open default app webpage", async () => {
    await goto("127.0.0.1:8080");
    await screenshot({path: 'reports\\screenshots\\open_default_page.png'})
});

step("Open personal grades page", async () => {
    await goto("127.0.0.1:8080/personal_grade");
    await screenshot({path: 'reports\\screenshots\\open_personal_grades_page.png'})
});

step("Open addgrade page", async () => {
    await goto("127.0.0.1:8080/addgrade");
    await screenshot({path: 'reports\\screenshots\\validate_addgrade_page.png'})
});

step("Select second module", async () => {
    await click("Choose a module...");
    await press(['ArrowDown', 'ArrowDown', 'Enter']);
});

step("Select fourth module", async () => {
    await click("Choose a module...");
    await press(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'Enter']);
});

step("Select first session", async () => {
    await click("Choose a session...");
    await press(['ArrowDown', 'Enter']);
});

step("Select third session", async () => {
    await click("Choose a session...");
    await press(['ArrowDown', 'ArrowDown', 'ArrowDown', 'Enter']);
});

step("Add a valid grade", async () => {
    await clear(textBox({id:'grade'}))
    await write('72',into(textBox({id:'grade'})))
    await click('Submit');
    await screenshot({path: 'reports\\screenshots\\validate_valid_grade_entered.png'})
});

step("Add a invalid negative grade", async () => {
    await clear(textBox({id:'grade'}))
    await write('-7',into(textBox({id:'grade'})))
    await click('Submit');
    await screenshot({path: 'reports\\screenshots\\validate_negative_grade_entered.png'})
});

step("Add a invalid grade above 100", async () => {
    await clear(textBox({id:'grade'}))
    await write('107',into(textBox({id:'grade'})))
    await click('Submit');
    await screenshot({path: 'reports\\screenshots\\validate_grade_over_100_entered.png'})
});

step("Check for grade entered success message", async () => {
    await assert.ok(await text('Your grade was successfully added', {exactMatch: false}).exists());
    await screenshot({path: 'reports\\screenshots\\validate_grade_successfully_entered.png'})
});

step("Check for you already have a grade message", async () => {
    await assert.ok(await text('You already have a grade for module', {exactMatch: false}).exists());
    await screenshot({path: 'reports\\screenshots\\validate_grade_already_exists.png'})
});

step("Click submit anonymously button", async () => {
    await click('Do not reveal my identity in leaderboard. Keep this grade anonymous.')
});