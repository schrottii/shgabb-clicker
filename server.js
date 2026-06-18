/*
Server-side server logic code
*/

// imports & setup
const http = require('http');
const WebSocket = require('ws');
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



// own vars
var visitors = new Map();

const server_commands = {
    playercount: (ws, data) => server_playercount(ws, data),
    logincheck: (ws) => server_logincheck(ws),
    register: (ws, data) => server_register(ws, data)
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

wss.on('connection', (ws, req) => {
    // set alive on initial connection
    ws.isAlive = true; 
    ws.on('pong', () => {
        ws.isAlive = true;
    });

    let realPlayerIP = req.headers["cf-connecting-ip"] || req.socket.remoteAddress;
    console.log("New client connected: " + realPlayerIP);

    // Send a welcome message to the client
    //ws.send('Welcome to the WebSocket server!');

    // Message event handler
    ws.on('message', (data) => {
        let message = data.toString();

        ws.isAlive = true;
        console.log(`Received: ${message}`); // shown on server
        //ws.send(`Server received: ${message}`); // shown on client

        try {
            let data = JSON.parse(message); // command, body
            if (data.command !== undefined && server_commands[data.command] !== undefined) {
                // message contains command and we offer that one
                server_commands[data.command](ws, data); // provide current ws connection and parsed data (possible here)
            }
        }
        catch (e) {
            console.log("Failed to parse command");
        }
    });

    // Close event handler
    ws.on('close', () => {
        console.log("Client disconnected");
    });
}); 

const serverLoop = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log("inactive or broken connection; terminating...");
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

function callClient(command, ws, payload) {
    // payload format: {}, includes stuff like: onlineLast30Days: visitors.size
    payload.type = command; // adds the command bit to payload
    ws.send(JSON.stringify(payload)); // sends to client
}

wss.on('close', () => clearInterval(serverLoop));



// 1. server function: playercount
// tracks how many have been online
// /playercount is basically the function, the interface, to communicate between client and server. 
function server_playercount(ws, data) {
    // ws = connection, 
    // data is what the client sends

    // grabs the user ID that the client gives us
    let userID = data.body.userID;
    if (!userID) return ws.send(JSON.stringify({ type: "error", message: "No ID provided by client" }));

    // basic verification if the ID can be legit
    if (userID.length < 8 || userID.length > 16) {
        return ws.send(JSON.stringify({ type: "error", message: "Invalid ID provided by client" }));
    }

    // adds our dear user friend into our list + date
    visitors.set(userID, Date.now());

    // remove old grandpas (does not need to be run every single time - move elsewhere later for scaling)
    let thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    for (let [id, time] of visitors) {
        if (time < thirtyDaysAgo) visitors.delete(id);
    }

    callClient("playercount", ws, { onlineLast30Days: visitors.size });
}

// 2. logincheck
// simply tells the player if they are logged in to their cloud save acc
// after registering or logging in
function server_logincheck(ws, data) {
    let isLoggedIn = true; // let's just lie for now

    callClient("logincheck", ws, { isLoggedIn: isLoggedIn });
}

// swear words, slurs, sexual terms, etc.
// based on the list from Idle Bar, but with some (like "gay") removed
const forbiddenWords = ["fuck", "shit", "bitch", "nigg", "fag", "nibb", "hitler", "nazi", "trump", "niglet", "scrotum", "penis", "cock", "hentai", "futa", "porn", "sex", "nude", "naked", "NSFW", "boob", "breast", "dick", "anus", "CBT", "retard",
    "ilf", "ass", "tit",
    "ahegao", "cunt", "genital", "dick", "prick", "DDOS", "racis", "hack", "swastika", "hentia", "pussy", "kys",
    "eval", "function"];

// 3. register
function server_register(ws, data) {
    let name = data.username;
    let pw = data.password;

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

    let success = nameValid && pwValid;
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