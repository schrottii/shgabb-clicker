/*
Server-side server logic code
*/

// imports & setup
const http = require('http');
const WebSocket = require('ws');

const mysql = require('mysql2/promise');
require('dotenv/config'); 

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

const server_commands = {
    playercount: (ws, data) => server_playercount(ws, data),
    logincheck: (ws) => server_logincheck(ws),
    register: (ws, data) => server_register(ws, data),
    login: (ws, data) => server_login(ws, data)
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

    let realPlayerIP = req.headers["cf-connecting-ip"] || req.socket.remoteAddress;
    console.log("[USR] New client connected: " + realPlayerIP);

    let loadingPlayerID = await database_command("getID", { name: "Alonso" });

    if (loadingPlayerID) {
        ws.playerID = loadingPlayerID[0].id;
    }
    else {
        console.log("[USR] WARNING: no player ID found");
        ws.terminate();
    }

    // Message event handler
    ws.on('message', (data) => {
        let message = data.toString();

        ws.isAlive = true;
        console.log(`[CMD] Received: ${message} from ${ws.playerID}`); // shown on server
        //ws.send(`Server received: ${message}`); // shown on client

        try {
            data = JSON.parse(data); // command, body
            data.playerID = ws.playerID;
            if (data.command !== undefined && server_commands[data.command] !== undefined) {
                // message contains command and we offer that one
                server_commands[data.command](ws, data); // provide current ws connection and parsed data (possible here)
                console.log("[CMD] Executing command: " + data + ", " + data.playerID);
            }
            else {
                if (server_commands[data.command] == undefined) console.log("[CMD] Command does not exist: " + data.command);
                else console.log("[CMD] Failed to start command: " + data + ", " + data.playerID);
            }
        }
        catch (e) {
            console.log("[CMD] Failed to parse or execute command: " + data + ", " + data.playerID);
        }
    });

    // Close event handler
    ws.on('close', () => {
        console.log("[USR] Client disconnected");
    });
}); 

const serverLoop = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log("[USR] inactive or broken connection; terminating...");
            return ws.terminate();
        }

        database_command("ping", { playerID: ws.playerID });

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

function callClient(command, ws, payload) {
    // payload format: {}, includes stuff like: onlineLast30Days: visitors.size
    payload.type = command; // adds the command bit to payload

    payload = JSON.stringify(payload);
    console.log("[CMD] Sending to " + ws.playerID + ": " + payload);
    ws.send(payload); // sends to client
}

wss.on('close', () => clearInterval(serverLoop));



// 1. server function: playercount
// tracks how many have been online
// /playercount is basically the function, the interface, to communicate between client and server. 
async function server_playercount(ws, data) {
    // ws = connection,
    // data is what the client sends

    if (data.playerID == undefined) {
        return ws.send(JSON.stringify({ type: "error", message: "Invalid ID provided by client" }));
    }

    database_command("ping", { userID: data.userID });

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
    let isLoggedIn = data.playerID != undefined;

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

    let nameValid = true;
    let pwValid = true;

    // existing username validation

    // password validation
    if (pw.length < 6) pwValid = false;

    // bad word validation for BOTH
    // username AND password
    for (let word of forbiddenWords) {
        if (pw.toLowerCase().includes(word)) {
            pwValid = false;
            break;
        }
        if (name.toLowerCase().includes(word)) {
            nameValid = false;
            break;
        }
    }

    let success = false;
    if (nameValid && pwValid) {
        success = await database_command("register", { name: name, pw: pw });
    }

    callClient("register", ws, { success: success, nameValid: nameValid, pwValid: pwValid });
}

// 4. login
function server_login(ws, data) {
    let name = data.username;
    let pw = data.password;

    let nameValid = true;
    let pwValid = true;

    // existing username validation

    // existing password for that user validation

    let success = nameValid && pwValid;
    callClient("register", ws, { success: success, nameValid: nameValid, pwValid: pwValid });
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



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

        console.log("Connection to DB successful");
        db_connected = true;

        database_command("test");

    } catch (error) {
        console.error("Connection to DB failed: " + error.message);
        db_connected = false;
    }
}

async function database_command(cmdname = "", data = {}) {
    if (db_connected == false) {
        console.log("command " + cmdname + " cannot be executed: no DB connection");
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
                    "SELECT tbl_users.id FROM tbl_users WHERE tbl_users.acc_email = ? AND tbl_users.acc_name = ? LIMIT 1",
                    ["", data.name]
                );
                break;
            case "register":
                [results] = await db_connection.query(
                    "INSERT INTO tbl_users (acc_email, acc_name, acc_password) VALUES (?, ?, ?)",
                    ["", data.name, data.pw]
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

        if (results.warningStatus === undefined) console.log("[DBC] command " + cmdname + " success: " + results);
        else console.log("[DBC] command " + cmdname + " is ResultSetHeader");
        return results;
    } catch (err) {
        console.log("[DBC] command " + cmdname + " error: " + err);
        return false;
    }
    return false;
}

database_connect();