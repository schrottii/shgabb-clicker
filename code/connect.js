/*
client-side code that talks to the server-side
*/

var socket;

// generalized functions
function isConnectedToServer() {
    return socket && socket.readyState === WebSocket.OPEN;
}

async function callServer(command, body = "") {
    if (isConnectedToServer()) {
        let payload = {
            command: command,
            body: body
        };
        socket.send(JSON.stringify(payload));
    }
    else {
        console.log("Can't communicate with server: socket not ready");
    }
}

function onServerConnect() {
    client_playercount(game.profile.id);
    client_account_logincheck();
}

function connectToServer() {
    //socket = new WebSocket('ws://localhost:3000');
    let socketURL = window.location.href.includes("localhost") ? 'ws://localhost:3000' : 'wss://api-shgabb-clicker.balnoom.com';

    let savedName = "Alonso";
    let savedEmail = "";
    socketURL += `?name=${encodeURIComponent(savedName)}&email=${encodeURIComponent(savedEmail)}&id=${encodeURIComponent(game.profile.id) }`;

    socket = new WebSocket(socketURL);

    socket.onopen = () => {
        console.log("Server: connection successful");
        onServerConnect();
    };

    socket.onmessage = (event) => {
        try {
            let data = JSON.parse(event.data);

            switch (data.type) {
                case "playercount":
                    client_playercount_reply(data);
                    break;
                case "logincheck":
                    client_account_logincheck_reply(data);
                    break;
                case "register":
                    client_account_register_reply(data);
                    break;
                case "login":
                    client_account_login_reply(data);
                    break;
                default:
                    console.error("Server error: " + data.message);
                    break;
            }
        } catch (e) {
            console.log("Invalid JSON: " + event.data);
        }
    };

    socket.onclose = () => {
        console.log("Disconnected from server. Retrying in 3 seconds...");
        setTimeout(connectToServer, 3000);
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error: " + error);
    };
}



// server commands :3
// 1. /playercount
async function client_playercount(id) {
    // simply asks for the player count (last 30 days)

    //if (getOrigin() == "private") return;
    console.log("/playercount: " + id);

    callServer("playercount", { userID: id });
}

function client_playercount_reply(data) {
    console.log("player count: " + data.onlineLast30Days);
    ui.playercount.innerHTML = "Players in last 30 days: " + data.onlineLast30Days;
}

// 2. /logincheck
async function client_account_logincheck() {
    // checks if we are logged in

    //if (getOrigin() == "private") return;
    console.log("/logincheck");

    callServer("logincheck");
}

function client_account_logincheck_reply(data) {
    let prettyFormat = "Login info: " + (data.isLoggedIn == false ? "not " : "") + "logged in";
    console.log(prettyFormat);
    ui.server_loggedin.innerHTML = prettyFormat;
}

// 3. /register
async function client_account_register() {
    // create new cloud save account

    //if (getOrigin() == "private") return;
    console.log("/register");

    // okay, let me be clear: game is already some time old, so in case people shared their acc,
    // using the pre - existing ID for login might not be the best solution
    // also, it can be edited, so what if 2 people edit their ID to be the same? all kinds of stuff like that
    // -> the local & pre-existing "name" and "ID", are important for this game, and the local save only
    // they are still saved onto the server to quickly find players

    // structure of a player looks like:
    // server ID (1, 2, 3) ~ acc_name ~ acc_password ~ extras (including: ingame_name, ingame_id & other relevant things) ~ save
    // so, upon registering (this function), we need the user to enter a name and a password, and add it to the db

    // who do we want to be?
    // (placeholder)
    let userName = "Alonso";
    let userPassword = "Fernando";

    // validation (e.g. username already exists) is done on the server
    // using the name and password provided by the user
    callServer("register", { username: userName, password: userPassword });
}

function client_account_register_reply(data) {
    // data contains: success, nameValid, pwValid
    let message;
    if (data.success) message = "Registering successful";
    else if (!data.nameValid) message = "Username is inappropriate or already exists";
    else if (!data.pwValid) message = "Password is inappropriate or too short";
    else message = "Registering not successful, unknown error";

    // put it into the UI, uhh
}

// 4. /login
async function client_account_login() {

    //if (getOrigin() == "private") return;
    console.log("/login");

    // who do we log in as?
    // (placeholder)
    let userName = "Alonso";
    let userPassword = "Fernando";

    // validation is done on the server
    callServer("login", { username: userName, password: userPassword });
}

function client_account_login_reply(data) {
    // data contains: success, nameValid, pwValid
    let message;
    if (data.success) message = "Login successful";
    else if (!data.nameValid) message = "Username is incorrect / does not exist";
    else if (!data.pwValid) message = "Password is incorrect";
    else message = "Login not successful, unknown error";

    // put it into the UI, uhh
}



// extra code by d0ktorek
async function reportAntiCheatViolation(reason = 'console-activity', source = 'client-console') {
    try {
        /*
        if (antiCheatReportedThisSession) return;
        if (!isBackendAvailable()) return;
        antiCheatReportedThisSession = true;
        const stored = getStoredNick();
        const resolved = resolveActiveUsername({ allowAuto: true });
        const username = (resolved && resolved.username) || stored || `unknown-${String(getClientId()).slice(0, 8)}`;
        const payload = {
            username,
            clientId: getClientId(),
            reason: String(reason || 'console-activity').slice(0, 120),
            source: String(source || 'client-console').slice(0, 64),
            detectedAt: new Date().toISOString()
        };
        await fetch('/api/player/anticheat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        */
        console.log("no no no");
        report("eval", 10);

        // something to block online access here
    } catch { }
}

// extra code by d0ktorek
function initConsoleAntiCheatDetector() {
    try {
        if (window.__SM_AC_INIT) return;
        window.__SM_AC_INIT = true;

        const originalEval = window.eval;
        if (typeof originalEval === 'function') {
            window.eval = function (...args) {
                // Trigger only when executable code is evaluated, not when DevTools is merely opened.
                reportAntiCheatViolation('console-command-eval', 'runtime-hook');
                return originalEval.apply(this, args);
            };
        }

        const OriginalFunction = window.Function;
        if (typeof OriginalFunction === 'function') {
            const WrappedFunction = function (...args) {
                reportAntiCheatViolation('console-command-function', 'runtime-hook');
                return OriginalFunction(...args);
            };
            WrappedFunction.prototype = OriginalFunction.prototype;
            window.Function = WrappedFunction;
        }
    } catch { }
}
initConsoleAntiCheatDetector();



/*
what to run: 
node server.js
npx serve -l 5000

(possibly) 
npm install ws
npm install dotenv mysql2
*/