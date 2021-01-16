# Grades Leaderboard

## Developer Setup Instructions

1.  Navigate to the repository locally and install the node modules:

        npm install

2.  [Create a new MySQL connection](https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html)
3.  Run the setup script(s) in the `db` directory to build the database.
4.  Copy `.envexample`, rename to `.env`, and update with MySQL connection credentials (host, user, password, database).
5.  From the local repository, install nodemon if necessary and start the server:

        $ npm install -g nodemon
        $ nodemon

6. Navigate to `localhost:<port>` in your browser, where `<port>` is the port defined in `.env`


# Git Flow

1. Create a new branch

        git -b checkout "my new fancy branch"

2. Make sure you are on the new branch 

3. Make your changes

4. Stage your changes

		git add .

5. Check your status

		git status

6. Commit your changes

		git commit -m "GL-XX Ticket Description"

7. Push your changes

		git push

It might be that you need to set your upstream. Git will tell you the right command to use if this is the case. Just copy-paste that command and proceed.
