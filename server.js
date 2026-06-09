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
    'http://localhost:3000',
    'http://127.0.0.1:5500'
];



// own vars
let visitors = new Map();

const server_commands = {
    playercount: (ws, data) => server_playercount(ws, data)
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
    console.log("New client connected");

    // set alive on initial connection
    ws.isAlive = true; 
    ws.on('pong', () => {
        ws.isAlive = true;
    });

    let realPlayerIP = req.headers["cf-connecting-ip"] || req.socket.remoteAddress;

    // Send a welcome message to the client
    //ws.send('Welcome to the WebSocket server!');

    // Message event handler
    ws.on('message', (message) => {
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
            console.log("Failed to parse");
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

    // send data back to the client (re-usable function?)
    let replyPayload = {
        type: "playercount",
        onlineLast30Days: visitors.size
    };
    ws.send(JSON.stringify(replyPayload));
}

/*
// 2. check if player is logged in
app.post('/account_logincheck', (req, res) => {
    let { userID } = req.body;

    // uhhh..............

    res.json({ onlineLast30Days: visitors.size });
});


// register server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/