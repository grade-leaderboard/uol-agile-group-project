# Test Grade Leaderboard
Remember to reset the database prior to the tests

## View default page 
* Open default app webpage

## Sign in with Slack
* Open default app webpage
* Click Slack sign in
* Enter workspace and continue
* Enter Slack email and password and continue
* Click "Allow"
* Validate user is logged in

## View personal grades page
* Open personal grades page

## Try to add invalid grades to Final Project in October 2021 and verify they were not accepted
* Open addgrade page
* Select "Module" "CM2030"
* Select "Session" "October 2021"
* Enter a grade of "-7"
* Click "Submit"
* Open personal grades page
* Ensure personal grade in "CM2030" "Final Project" in "October 2021" with grade "-7" does not exist
* Open addgrade page
* Select "Module" "CM2030"
* Select "Session" "October 2021"
* Enter a grade of "107"
* Click "Submit"
* Open personal grades page
* Ensure personal grade in "CM2030" "Final Project" in "October 2021" with grade "107" does not exist

## Try to add grade that was already entered and verify that module is not available in list
* Open addgrade page
* Click Choose a module
* Click module "CM2030"
* Click Choose a session
* Click session "October 2021"
* Add a grade of "90"
* Click submit
* Check for grade entered success message
* Click Choose a module
* Verify that module "CM2030" is not available anymore
* Click Choose a module

## Add a valid grade of 72 to Agile Software Projects in April 2019
* Open addgrade page
* Click Choose a module
* Click module "CM2020"
* Click Choose a session
* Click session "April 2019"
* Add a grade of "72"
* Click submit
* Check for grade entered success message
* Open personal grades page
* Validate personal grade in "CM2020" "Agile Software Projects" in "April 2019" with grade "72"

## Tied grades are sorted by timestamp
This relies on the database having two users with the same grade and different timestamps.
Must refer to db to know which user should come before the other.
 * Open rankings page for "CM3070"
 * "Bob" is above "Alice"

// ## Add a valid grade anonymously
// * Open addgrade page
// * Select fourth module
// * Select third session
// * Click submit anonymously button
// * Add a valid grade
// * Check for grade entered success message