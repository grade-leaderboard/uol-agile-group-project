# Test Public Pages
Remember to reset the database prior to the tests

## View default page 
* Open default app webpage

## View personal grades page
* Open personal grades page

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

## Try to add invalid grades to Discrete Mathematics in October 2021 and verify they were not accepted
* Open addgrade page
* Click Choose a module
* Click module "CM1020"
* Click Choose a session
* Click session "October 2021"
* Add a grade of "-7"
* Click submit
* Open personal grades page
* Ensure personal grade in "CM1020" "Discrete Mathematics" in "October 2021" with grade "-7" does not exist
* Open addgrade page
* Click Choose a module
* Click module "CM1020"
* Click Choose a session
* Click session "October 2021"
* Add a grade of "107"
* Click submit
* Open personal grades page
* Ensure personal grade in "CM1020" "Discrete Mathematics" in "October 2021" with grade "107" does not exist

 ## Add a valid grade where one was already entered and verify the error message was displayed
* Open addgrade page
* Click Choose a module
* Click module "CM3005"
* Click Choose a session
* Click session "October 2021"
* Add a grade of "72"
* Click submit
* Open personal grades page
* Validate personal grade in "CM3005" "Data Science" in "October 2021" with grade "72"
* Open addgrade page
* Click Choose a module
* Click module "CM3005"
* Click Choose a session
* Click session "October 2021"
* Add a grade of "72"
* Click submit
* Check for you already have a grade message

## Check that grades are sorted by timestamp when tied
These tests are done on CM3070.
This relies on the database being manually reset so that Bob's grade is entered at 70% when the DB is refreshed.
Alice's grade of 71 is manually reset so it was entered in December 2019.
A new grade of 71 should be ranked as a tie with Alice and appear between Alice and Bob on the list.
 Open addgrade page
 Click Choose a module
 Click module "CM3070"
 Click Choose a session
 Click session "October 2021"
 Add a grade of "71"
 Click submit
 Check for grade entered success message
 Open rankings page for "CM3070"
 Click "Name"
 Click "Grade"
 Click "Grade"
This will ensure the rows are sorted by grade in descending order.
 Check that a new grade of "71" with rank "1" appears between "Alice" ranked "1" with "71" and "Bob" ranked "3" with "70"
 Take a screenshot

 Add a valid grade anonymously
 Open addgrade page
 Select fourth module
 Select third session
 Click submit anonymously button
 Add a valid grade
 Check for grade entered success message

