/*
Server-side server logic code
*/

// server version corresponding to game version -- change on update!!
// this is also why live client needs a seperate server backend running from local/online indev testing
const serverVersion = "4.7";

// imports & setup
const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '.env') }); 

const PORT = 3000;

const wss = new WebSocket.Server({ noServer: true });

const server = http.createServer((req, res) => {
    // handles accidental visits to localhost
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Game Socket Server Running');
});

const allowedOrigins = [
    'https://balnoom.com',
    'https://schrottii.github.io',
    'http://localhost:5000',
    'http://127.0.0.1:5500'
];

async function sendBrevoEmail(toEmail, subject, textContent, htmlContent) {
    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: process.env.SENDER_NAME || "Balnoom",
                    email: process.env.SENDER_EMAIL || "noreply@balnoom.com"
                },
                to: [{ email: toEmail }],
                subject: subject,
                textContent: textContent,
                htmlContent: htmlContent
            })
        });

        const resText = await response.text();
        console.log("\x1b[36m[BREVO] Status: " + response.status + ", Response: " + resText + "\x1b[0m");
        return response.ok;
    } catch (e) {
        console.error("\x1b[31m[BREVO] Request error: " + e.message + "\x1b[0m");
        return false;
    }
}

// for e mail verification
function generate6DigitCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const server_commands = {
    playercount: (ws, data) => server_playercount(ws, data),
    logincheck: (ws, data) => server_logincheck(ws, data),
    register: (ws, data) => server_register(ws, data),
    verify_email: (ws, data) => server_verify_email(ws, data),
    resend_verification: (ws, data) => server_resend_verification(ws, data),
    request_password_reset: (ws, data) => server_request_password_reset(ws, data),
    confirm_password_reset: (ws, data) => server_confirm_password_reset(ws, data),
    login: (ws, data) => server_login(ws, data),
    cloud_upload: (ws, data) => server_cloud_upload(ws, data),
    cloud_download: (ws, data) => server_cloud_download(ws, data),
    logout: (ws, data) => server_account_logout(ws, data)
};



// connection handler
server.on('upgrade', (request, socket, head) => {
    let origin = request.headers.origin;
    let isAllowed = allowedOrigins.some(allowed => origin && origin.startsWith(allowed));

    if (!isAllowed) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

wss.on('connection', async (ws, req) => {
    // set alive on initial connection
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.refer = "???"; // displaying the user in logs, set below

    // get info from url header: 
    // username, user email, ingame ID (for guests), client game version
    let queryObject = url.parse(req.url, true).query;

    let clientName = queryObject.name || "";
    let clientPW = queryObject.pw || "";
    let clientEmail = queryObject.email || "";
    let clientIngameID = queryObject.id || "";

    if (clientIngameID === "" || clientIngameID == undefined) clientIngameID = Math.random().toString(16).slice(2);
    ws.clientIngameID = clientIngameID;
    let clientVer = (queryObject.gamever || "").trim(); // without v, i.e. 4.7 , and we *want* to compare them as strings (i.e. "4.7.1" > "4.7")

    // get IP (just in case) and the in-DB ID
    let realPlayerIP = req.headers["cf-connecting-ip"] || req.socket.remoteAddress;
    let loadingPlayerID = await database_command("getID", { name: clientName, password: clientPW, email: clientEmail }); // the server MUST handle this, do not give the user the power to check any ID

    if (serverVersion > clientVer) {
        // client has outdated version
        ws.refer = "(old_version)";
        callClient("old_version", ws, { clientVer: clientVer, serverVer: serverVersion });

        setTimeout(() => {
            ws.terminate();
        }, 100);
    }
    else if (loadingPlayerID && loadingPlayerID[0] && loadingPlayerID[0].id/* && loadingPlayerID[0].is_verified === 1 */&& clientName !== "" && clientPW !== ""/* && clientEmail !== ""*/) {
        // registered player with ID in database
        ws.playerID = loadingPlayerID[0].id;

        ws.isGuest = false;
        ws.refer = clientName + " (" + ws.playerID + ")";
        console.log("\x1b[0m[USR] New client connected: " + realPlayerIP + ", " + clientName + ", " + clientEmail);
    }
    else {
        // a guest - allowed to partially participate

        //console.log("[USR] WARNING: no player ID found");
        //ws.terminate();

        ws.isGuest = true;
        ws.refer = ws.clientIngameID + " (Guest)";
        console.log("\x1b[0m[USR] New guest connected: " + clientIngameID);
    }

    // logic when a message is received from the client
    ws.on('message', (data) => {
        let message = data.toString();
        if (message.length > 250) message = message.substr(0, 50) + "... (Too long)";

        ws.isAlive = true;
        console.log(`\x1b[0m[CMD] Received: ${message} from ${ws.refer}`); // shown on server

        try {
            data = JSON.parse(data); // command, body
            data.playerID = ws.playerID;

            if (data.command !== undefined && server_commands[data.command] !== undefined) {
                // message contains command and we offer that one
                //if (ws.isGuest === false || data.command === "register")
                server_commands[data.command](ws, data); // provide current ws connection and parsed data (possible here)
                console.log("\x1b[0m  [CMD] Executing command: " + data.command + ", " + ws.refer);
            }
            else {
                if (server_commands[data.command] == undefined) console.log("  [CMD] Command does not exist: " + data.command);
                else console.log("\x1b[31m  [CMD] Failed to start command: " + data.command + ", " + ws.refer);
            }
        }
        catch (e) {
            console.log("\x1b[31m  [CMD] Failed to parse or execute command: " + data.command + ", " + ws.refer);
        }
    });

    // logic when client disconnects
    ws.on('close', (ws) => {
        console.log("\x1b[0m[USR] Client " + (ws.refer ? ws.refer : "") + " disconnected");
    });
}); 

const serverLoop = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log("\x1b[31m[USR] inactive or broken connection: " + ws.refer + "; terminating...");
            return ws.terminate();
        }

        if (!ws.isGuest) database_command("ping", { playerID: ws.playerID });

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

function callClient(command, ws, payload) {
    // send a result back to the client
    // payload format: {}, includes stuff like: onlineLast30Days: visitors.size
    payload.type = command; // adds the command bit to payload

    payload = JSON.stringify(payload);
    let payloadText = payload.length > 250 ? "(Too long)" : payload;
    console.log("\x1b[0m  [CMD] Returning to client " + ws.refer + ": " + payloadText);
    ws.send(payload); // sends to client
}

wss.on('close', () => clearInterval(serverLoop));

server.listen(PORT, () => {
    console.log(`\x1b[32m[INF] Server running on port ${PORT}`);
    console.log(`\x1b[32m[INF] Server game version: v${serverVersion}`);
    console.log(`\x1b[35m[INF] Brevo Sender: ${process.env.SENDER_EMAIL || "none"}, API Key set: ${Boolean(process.env.BREVO_API_KEY)}\x1b[0m`);
});



// 1. server function: playercount
// tracks how many have been online
// /playercount is basically the function, the interface, to communicate between client and server. 
async function server_playercount(ws, data) {
    // ws = connection,
    // data is what the client sends

    let ID = ws.isGuest ? ws.clientIngameID : ws.playerID;

    if (ID == undefined) {
        return ws.send(JSON.stringify({ type: "error", message: "Invalid ID provided by client" }));
    }

    if (!ws.isGuest) database_command("ping", { playerID: ID });

    let playercount = await database_command("playercount");
    if (playercount) {
        callClient("playercount", ws, { onlineLast30Days: playercount[0].pcount });
    }
    else {
        callClient("playercount", ws, { onlineLast30Days: 0 });
    }
}

// 2. logincheck
// simply tells the player if they are logged in to their cloud save acc
// after registering or logging in
function server_logincheck(ws, data) {
    let isLoggedIn = ws.playerID != undefined;

    callClient("logincheck", ws, { isLoggedIn: isLoggedIn });
}

// swear words, slurs, sexual terms, etc.
// based on the list from Idle Bar, but with some (like "gay") removed
const forbiddenWords = ["fuck", "shit", "bitch", "nigg", "fag", "nibb", "hitler", "nazi", "trump", "niglet", "scrotum", "penis", "cock", "hentai", "futa", "porn", "sex", "nude", "naked", "NSFW", "boob", "breast", "dick", "anus", "CBT", "retard",
    //"ilf", "ass", "tit",
    "ahegao", "cunt", "genital", "dick", "prick", "DDOS", "racis", "hack", "swastika", "hentia", "pussy", "kys",
    "eval", "function"];

// 3. register
async function server_register(ws, data) {
    let name = data.body.username;
    let pw = data.body.password;
    let email = data.body.email;

    let nameValid = true;
    let pwValid = true;
    let emailValid = true;

    // existing email validation
    let emailExists = await database_command("getEmailExistence", { email: email });
    if (emailExists && emailExists.length > 0) {
        emailValid = false;
    }

    // existing username validation
    let nameExists = await database_command("getUserNameExistence", { name: name });
    if (nameExists && nameExists.length > 0) {
        nameValid = false;
    }

    let success = false;
    if (nameValid && pwValid && emailValid) {
        let code = generate6DigitCode();
        let expires = new Date(Date.now() + 15 * 60 * 1000);

        success = await database_command("register_pending", {
            name: name,
            pw: pw,
            email: email,
            code: code,
            expires: expires
        });

        if (success) {
            let subject = "balnoom verification code";
            let text = `test ${code}`;
            let html = `<p>test ${code}</p>`;
            await sendBrevoEmail(email, subject, text, html);
        }
    }

    callClient("register", ws, {
        success: success,
        nameValid: nameValid,
        pwValid: pwValid,
        emailValid: emailValid,
        name: name,
        pw: pw,
        email: email,
        requiresVerification: true
    }); 
}

// 4. verify email
async function server_verify_email(ws, data) {
    let email = data.body.email;
    let code = String(data.body.code || "").trim();

    let check = await database_command("getVerificationData", { email: email });
    let success = false;
    let message = "";

    if (!check || check.length === 0) {
        message = "Account not found.";
    } else if (check[0].is_verified === 1) {
        success = true;
        message = "Account is already verified.";
    } else if (check[0].verify_code !== code) {
        message = "Invalid verification code.";
    } else if (new Date(check[0].verify_expires) < new Date()) {
        message = "Verification code has expired.";
    } else {
        await database_command("markUserVerified", { email: email });
        success = true;
        message = "Email successfully verified.";
    }

    callClient("verify_email", ws, { success: success, message: message, email: email });
}

// 5. resend verification
async function server_resend_verification(ws, data) {
    let email = data.body.email;
    let user = await database_command("getUserByEmail", { email: email });

    let success = false;
    let message = "";

    if (!user || user.length === 0) {
        message = "Account with this email does not exist.";
    } else if (user[0].is_verified === 1) {
        message = "Account is already verified.";
    } else {
        let code = generate6DigitCode();
        let expires = new Date(Date.now() + 15 * 60 * 1000);

        await database_command("setNewVerificationCode", { email: email, code: code, expires: expires });

        let subject = "balnoom verification code";
        let text = `test ${code}`;
        let html = `<p>test ${code}</p>`;

        await sendBrevoEmail(email, subject, text, html);
        success = true;
        message = "Verification code resent.";
    }

    callClient("resend_verification", ws, { success: success, message: message });
}

// 6. request password reset
async function server_request_password_reset(ws, data) {
    let email = data.body.email;
    let user = await database_command("getUserByEmail", { email: email });

    let success = false;
    let message = "";

    if (!user || user.length === 0) {
        message = "No account found with this email.";
    } else {
        let code = generate6DigitCode();
        let expires = new Date(Date.now() + 15 * 60 * 1000);

        await database_command("setPasswordResetCode", { email: email, code: code, expires: expires });

        let subject = "balnoom Password reset code";
        let text = `test ${code}`;
        let html = `<p>test ${code}</p>`;

        await sendBrevoEmail(email, subject, text, html);
        success = true;
        message = "Password reset code sent.";
    }

    callClient("request_password_reset", ws, { success: success, message: message });
}

// 7. confirm password reset
async function server_confirm_password_reset(ws, data) {
    let email = data.body.email;
    let code = String(data.body.code || "").trim();
    let newPassword = data.body.newPassword || "";

    let user = await database_command("getPasswordResetData", { email: email });
    let success = false;
    let message = "";

    if (!user || user.length === 0) message = "Account not found.";
    else if (user[0].reset_code !== code) message = "Invalid reset code.";
    else if (new Date(user[0].reset_expires) < new Date()) message = "Reset code has expired.";
    else {
        await database_command("updateUserPassword", { email: email, password: newPassword });
        success = true;
        message = "Password updated successfully.";
    }

    callClient("confirm_password_reset", ws, { success: success, message: message });
}

// 8. login
async function server_login(ws, data) {
    let name = data.body.username;
    let pw = data.body.password;
    let email = data.body.email;

    let nameValid = true;
    let pwValid = true;
    let emailValid = true;

    // existing email validation
    let emailExists = await database_command("getEmailExistence", { email: email });
    if (!emailExists || emailExists.length == 0) {
        emailValid = false;
    }

    // existing username validation
    let nameExists = await database_command("getUserNameExistence", { name: name });
    if (!nameExists || nameExists.length == 0) {
        nameValid = false;
    }

    // existing password for that user validation
    let passwordIsMine = await database_command("getUserPassword", { email: email, password: pw });
    if (!passwordIsMine || passwordIsMine.length == 0) {
        pwValid = false;
    }

    /*
    let isVerified = false;
    let userData = await database_command("getUserByEmail", { email: email });
    if (userData && userData.length > 0 && userData[0].is_verified === 1) {
        isVerified = true;
    }*/

    let success = nameValid && pwValid && emailValid;

    if (success) {
        let loadingPlayerID = await database_command("getID", { name: name, password: pw, email: email });
        console.log("loadingPlayerID: " + loadingPlayerID);
        if (loadingPlayerID && loadingPlayerID.length > 0) {
            ws.playerID = loadingPlayerID[0].id;
            server_logincheck(ws);
        }
        else {
            success = false;
        }
    }

    callClient("login", ws, {
        success: success,
        nameValid: nameValid,
        pwValid: pwValid,
        emailValid: emailValid,
        //isVerified: isVerified,
        name: name,
        pw: pw,
        email: email
    });
}

// 10. cloud upload
async function server_cloud_upload(ws, data) {
    let success = false;
    let filename = ws.playerID + ".txt";

    function createFile() {
        // file only contains the stringified JSON of the savefile
        console.log("writing into: " + filename);
        fs.writeFileSync("./savefiles/" + filename, data.body.saveData, "utf8");
        success = true;
        end();
    }

    function end() {
        callClient("cloud_upload", ws, { success: success });
    }

    if (!ws.isGuest && ws.playerID != undefined) {
        // writes into /savefiles/ dir
        fs.exists("savefiles", (e) => {
            if (e == false) {
                console.log("savefiles dir does not exist");
                fs.mkdir("savefiles", (e) => {
                    if (e) {
                        console.log("error creating savefiles dir");
                        end();
                    }
                    else {
                        console.log("created savefiles dir");
                        createFile();
                    }
                });
            }
            else {
                console.log("savefiles dir exists");
                createFile();
            }
        });
    }
}

// 11. cloud download
async function server_cloud_download(ws, data) {
    let filename = ws.playerID + ".txt";
    let savedata = "";

    if (!ws.isGuest && ws.playerID != undefined) {
        fs.exists("savefiles/" + filename, (e) => {
            if (e) {
                // file exists, load it
                savedata = fs.readFileSync("savefiles/" + filename, "utf-8");
            }

            callClient("cloud_download", ws, { success: e, savedata: savedata });
        });
    }
}

// 12. logout
async function server_account_logout(ws, data) {
    ws.playerID = undefined;
    callClient("logout", ws, {});
}



// database fun
var db_connection;
var db_connected = false;

async function database_connect() {
    try {
        db_connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("\x1b[32m[INF] Connection to DB successful");
        db_connected = true;

        //database_command("test");

    } catch (error) {
        console.error("\x1b[31m[INF] Connection to DB failed: " + error.message);
        db_connected = false;
    }
}

async function database_command(cmdname = "", data = {}) {
    if (db_connected == false) {
        console.log("\x1b[31m  [DBC] command " + cmdname + " cannot be executed: no DB connection");
    }

    try {
        let results;
        switch (cmdname) {
            case "test":
                [results] = await db_connection.query(
                    "SELECT CURRENT_TIMESTAMP"
                    //'SELECT * FROM `tbl_users` WHERE `name` = ? AND `age` > ?',
                    //['Olaf', 45]
                );
                break;



            case "getID":
                [results] = await db_connection.query(
                    "SELECT tbl_users.id, tbl_users.is_verified FROM tbl_users WHERE tbl_users.acc_email = ? AND tbl_users.acc_name = ? AND tbl_users.acc_password = ? LIMIT 1",
                    [data.email, data.name, data.password]
                );
                break;
            case "register_pending":
                [results] = await db_connection.query(
                    "INSERT INTO tbl_users (acc_email, acc_name, acc_password, is_verified, verify_code, verify_expires) VALUES (?, ?, ?, 0, ?, ?)",
                    [data.email, data.name, data.pw, data.code, data.expires]
                );
                break;
            case "getUserNameExistence":
                [results] = await db_connection.query(
                    "SELECT tbl_users.acc_name FROM tbl_users WHERE tbl_users.acc_name = ? LIMIT 1;",
                    [data.name]
                );
                break;
            case "getEmailExistence":
                //console.log(data.email, JSON.stringify(data));
                [results] = await db_connection.query(
                    "SELECT tbl_users.acc_email FROM tbl_users WHERE tbl_users.acc_email = ? LIMIT 1;",
                    [data.email]
                );
                //console.log(results, results[0]);
                break;
            case "getUserByEmail":
                [results] = await db_connection.query(
                    "SELECT * FROM tbl_users WHERE tbl_users.acc_email = ? LIMIT 1;",
                    [data.email]
                );
                break;
            /*
            case "getUserByName":
                [results] = await db_connection.query(
                    "SELECT * FROM tbl_users WHERE tbl_users.acc_name = ? LIMIT 1;",
                    [data.name]
                );
                break;
                */
            case "getUserPassword":
                [results] = await db_connection.query(
                    "SELECT tbl_users.acc_name FROM tbl_users WHERE tbl_users.acc_email = ? AND tbl_users.acc_password = ? LIMIT 1;",
                    [data.email, data.password]
                );
                break;
            case "getVerificationData":
                [results] = await db_connection.query(
                    "SELECT tbl_users.is_verified, tbl_users.verify_code, tbl_users.verify_expires FROM tbl_users WHERE tbl_users.acc_email = ? LIMIT 1;",
                    [data.email]
                );
                break;
            case "markUserVerified":
                [results] = await db_connection.query(
                    "UPDATE tbl_users SET is_verified = 1, verify_code = NULL, verify_expires = NULL WHERE acc_email = ?",
                    [data.email]
                );
                break;
            case "setNewVerificationCode":
                [results] = await db_connection.query(
                    "UPDATE tbl_users SET verify_code = ?, verify_expires = ? WHERE acc_email = ?",
                    [data.code, data.expires, data.email]
                );
                break;
            case "setPasswordResetCode":
                [results] = await db_connection.query(
                    "UPDATE tbl_users SET reset_code = ?, reset_expires = ? WHERE acc_email = ?",
                    [data.code, data.expires, data.email]
                );
                break;
            case "getPasswordResetData":
                [results] = await db_connection.query(
                    "SELECT tbl_users.reset_code, tbl_users.reset_expires FROM tbl_users WHERE tbl_users.acc_email = ? LIMIT 1;",
                    [data.email]
                );
                break;
            case "updateUserPassword":
                [results] = await db_connection.query(
                    "UPDATE tbl_users SET acc_password = ?, reset_code = NULL, reset_expires = NULL WHERE acc_email = ?",
                    [data.password, data.email]
                );
                break;
            case "ping":
                [results] = await db_connection.query(
                    "INSERT INTO shg_user_activity (user_id) VALUES (?) ON DUPLICATE KEY UPDATE shg_user_activity.last_activity = CURRENT_TIMESTAMP",
                    [data.playerID]
                );
                break;
            case "playercount":
                [results] = await db_connection.query(
                    "SELECT COUNT(shg_user_activity.user_id) AS 'pcount' FROM shg_user_activity",
                    []
                );
                break;
        }

        if (results && results.warningStatus === undefined) console.log("\x1b[0m  [DBC] command " + cmdname + " success: " + JSON.stringify(results));
        else if (results && results.warningStatus !== undefined) console.log("\x1b[31m  [DBC] command " + cmdname + " is ResultSetHeader");
        return results;
    } catch (err) {
        console.log("\x1b[31m  [DBC] command " + cmdname + " error: " + err);
        return false;
    }
}

database_connect();