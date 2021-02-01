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
    clear,
    button,
    waitFor,
    image
} = require('taiko');
const assert = require("assert");

beforeSuite(async () => {
    await openBrowser(
        {headless: false}
    )
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
    await click("My grade")
});

step("Open addgrade page", async () => {
    await click("Add grade")
});

step("Click <text>", async (text) => {
    await click(text)
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

step("Write <text>", async function(text) {
    await write(text);
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

step("Validate personal grade in <courseid> <module> in <session> with grade <grade>", async function(courseid, module, session, grade) {
    await assert.ok
        (await text(grade, {toRightOf: module, exactMatch: true}).exists()) &&
        (await text(module, {toRightOf: courseid, exactMatch: true}).exists()) &&
        (await text(courseid, {toRightOf: session, exactMatch: true}).exists())
    ;
});

step("Ensure personal grade in <courseid> <module> in <session> with grade <grade> does not exist", async function(courseid, module, session, grade) {
    await assert.ok
        (!await text(grade, {toRightOf: module, exactMatch: true}).exists(50000, 100)) &&
        (!await text(module, {toRightOf: courseid, exactMatch: true}).exists(50000, 100), true) &&
        (!await text(courseid, {toRightOf: session, exactMatch: true}).exists(50000, 100), true)
    ;
});

step("Click Slack sign in", async () => {
    // await click(button({id: "navbar-toggler"})) // modal
    await click(image({id:'slack-sign-in'}));
});

step("Enter workspace and continue", async () => {
    await write("londoncs");
    press(['Enter']);
});

step("Enter Slack email and password and continue", async () => {
    require("dotenv").config();
    await write(process.env.SLACK_EMAIL);
    await press(['Tab']);
    await write(process.env.SLACK_PASSWORD);
    await click('Sign in');
});

step("Validate user is logged in", async () => {
    await link("Logout").exists();
});

step("Verify that module <moduleId> is not available anymore", async(moduleId) => {
    await assert.ok(text(moduleId).exists);
})