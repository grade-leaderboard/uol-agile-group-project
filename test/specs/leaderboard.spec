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

 Add a valid grade anonymously
 Open addgrade page
 Select fourth module
 Select third session
 Click submit anonymously button
 Add a valid grade
 Check for grade entered success message

