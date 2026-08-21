This file provides basic documentation on how the server system works.

View the LICENSE.md and TOS.md for full legal info. Attempts at hacking the server, stealing user's data, etc. are (obviously) not allowed. 

With the code being open-to-read, it is theoretically possible to set up a community server (ran parallel to the official one), but it takes knowledge regarding coding, how servers work, databases, etc. - it's not super easy. If you have the skills and want to make one, contact Schrottii for permission (along with the "why"). Receiving help is not guaranteed.

However, in a situation where there is no future for an official server (like you see it with big titles, it just gets shut down after support for new updates ends and that's it), meaning there is not one running and there are no plans to get one up again, then community servers are fully permitted, in order to keep online features available. This is not planned to happen at all, but IF it does in the far future, this comes into effect.

# Running things
what to run: 
node server.js
npx serve -l 5000

(possibly) 
npm install ws
npm install dotenv mysql2

# Files
| Name              | Purpose
|:-----------------:|:-------
| SERVER_DOC.md     | You are here.
| server.js         | Run on the server, executes commands received by clients, handles logins, database access & more
| connect.js        | Client-side, handles connecting to the server and the general wss connection
| servercommands.js | Client-side, handles commands sent to server and replies back to the server
| schema.sql        | Example of what the SQL database looks like
| .env.example      | Example of what the .env file should look like
| .env              | Stores database name, password & more - included in .gitignore so it does not get pushed. MUST stay private & unshared

# Commands list
| NR  | Name (client_... / server_...) | Data sent by server 
|:---:|:------------------------------:|:-------------------
| 1.  | playercount                    | onlineLast30Days
| 2.  | logincheck                     | isLoggedIn
| 3.  | register                       | success, nameValid, pwValid, emailValid, name, pw, email, requiresVerification
| 4.  | verify_email                   | success, message, email
| 5.  | resend_verification            | success, message
| 6.  | request_password_reset         | success, message
| 7.  | confirm_password_reset         | success, message
| 8.  | login                          | success, nameValid, pwValid, emailValid, name, pw, email, requiresVerification
| 9.  | (CLIENT ONLY) old_version      | clientVer, serverVer
| 10. | cloud_upload                   | success
| 11. | cloud_download                 | success, savedata

# Database commands
Communication between the server.js and SQL database

| Name                           | Data received
|:------------------------------:|:-------------------
| test                           | -
| getID                          | email, name, password
| register_pending               | email, name, pw, code, expires
| getUserNameExistence           | name
| getEmailExistence              | email
| getUserByEmail                 | email
| getUserPassword                | email, password
| getVerificationData            | email
| markUserVerified               | email
| setNewVerificationCode         | code, expires, email
| setPasswordResetCode           | email
| getPasswordResetData           | email
| updateUserPassword             | password, email
| ping                           | playerID
| playercount                    | -