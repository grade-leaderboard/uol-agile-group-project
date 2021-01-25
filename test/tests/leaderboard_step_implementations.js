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
        headless: true
    })
});

afterSuite(async () => {
    await closeBrowser();
});

step("Change device to iPhone X portrait", async () => {
    await emulateDevice('iPhone X')
});

step("Change device to iPhone X landscape", async () => {
    await emulateDevice('iPhone X landscape')
});

step("Open default app webpage", async () => {
    await goto("127.0.0.1:8080");
});

step("Open personal grades page", async () => {
    await goto("127.0.0.1:8080/personal_grade");
});

step("Open addgrade page", async () => {
    await goto("127.0.0.1:8080/addgrade");
});

step("Click submit", async () => {
    await click('Submit')
});

step("Click Choose a module", async () => {
    await click('Choose a module')
});

step("Click Choose a session", async () => {
    await click('Choose a session')
});

step("Press arrowdown", async () => {
    await press(['ArrowDown']);
});

step("Press enter", async () => {
    await press(['Enter']);
});

step("Add a grade of <grade>", async function(grade) {
    await clear(textBox({id:'grade'}))
    await write(grade,into(textBox({id:'grade'})))
});

step("Check for grade entered success message", async () => {
    await assert.ok(await text('Your grade was successfully added', {exactMatch: false}).exists());
});

step("Check for you already have a grade message", async () => {
    await assert.ok(await text('You already have a grade for module', {exactMatch: false}).exists());
});

step("Click submit anonymously button", async () => {
    await click('Do not reveal my identity in leaderboard. Keep this grade anonymous.')
});

step("Take a screenshot", async () => {
    await screenshot({path: 'reports\\screenshots\\validate_grade_already_exists.png'})
});

step("Click session <session>", async function(session) {
    await click(session)
});

step("Click module <module>", async function(module) {
    await click(module)
});

step("Validate personal grade in <courseid> <module> in <session> with grade <grade>", async function(grade, module, session, courseid) {
    await assert.ok(await text(grade, {toRightOf: module}).exists());
    await assert.ok(await text(module, {toRightOf: courseid}).exists());
    await assert.ok(await text(courseid, {toRightOf: session}).exists());
});