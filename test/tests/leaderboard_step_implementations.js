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
    highlight
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

step("Open rankings page for <module>", async function(module) {
    await goto("http://localhost:8080/module_leaderboard?module_id=" + module);
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
    await screenshot({path: `screenshot-${process.hrtime.bigint()}.png`});
});

step("Click session <session>", async function(session) {
    await click(session)
});

step("Click module <module>", async function(module) {
    await click(module)
});

step("Click <text>", async function(text) {
    await click(text)
});

step("Validate personal grade in <courseid> <module> in <session> with grade <grade>", async function(courseid, module, session, grade) {
    await assert.ok
        (await text(grade, {toRightOf: module, exactMatch: true}).exists(50000, 100)) &&
        (await text(module, {toRightOf: courseid, exactMatch: true}).exists(50000, 100)) &&
        (await text(courseid, {toRightOf: session, exactMatch: true}).exists(50000, 100))
    ;
});

step("Ensure personal grade in <courseid> <module> in <session> with grade <grade> does not exist", async function(courseid, module, session, grade) {
    await assert.ok
        (!await text(grade, {toRightOf: module, exactMatch: true}).exists(50000, 100)) &&
        (!await text(module, {toRightOf: courseid, exactMatch: true}).exists(50000, 100), true) &&
        (!await text(courseid, {toRightOf: session, exactMatch: true}).exists(50000, 100), true)
    ;
});

step("Check that a new grade of <newgrade> with rank <newrank> appears between <expectedtopuser> ranked <expectedtoprank> with <expectedtopgrade> and <expectedbottomuser> ranked <expectedbottomrank> with <expectedbottomgrade>", async function(newgrade, newrank, expectedtopuser, expectedtoprank, expectedtopgrade, expectedbottomuser, expectedbottomrank, expectedbottomgrade) {
    await highlight(expectedbottomgrade)
    await highlight(expectedbottomrank)
    await highlight(expectedbottomuser)
    await highlight(expectedtopgrade)
    await highlight(expectedtoprank)
    await highlight(expectedtopuser)
    await highlight(newrank)
    await highlight(newgrade)

    await assert.ok
    (await text(expectedbottomgrade, {toLeftOf: expectedbottomuser, exactMatch: true}).exists(50000, 100)) &&
    (await text(expectedbottomuser, {toRightOf: expectedbottomrank, exactMatch: true}).exists(50000, 100)) &&
    (await text(expectedtopgrade, {toRightOf: expectedtopuser, exactMatch: true}).exists(50000, 100)) &&
    (await text(expectedtopuser, {toRightOf: expectedtoprank, exactMatch: true}).exists(50000, 100))
    ;
});