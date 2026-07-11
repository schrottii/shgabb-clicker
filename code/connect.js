/*
client-side code that talks to the server-side
*/

var socket;
var isLoggedIn = false;

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
    //client_account_logincheck();
}

function connectToServer() {
    //socket = new WebSocket('ws://localhost:3000');
    let socketURL = window.location.href.includes("localhost") ? 'ws://localhost:3000' : 'wss://api-shgabb-clicker.balnoom.com';

    let savedName = "Alonso2";
    let savedPassword = "Fernando";
    let savedEmail = "alonso@yahoo.com";
    socketURL += `?name=${encodeURIComponent(savedName)}&email=${encodeURIComponent(savedEmail)}&pw=${encodeURIComponent(savedPassword)}&id=${encodeURIComponent(game.profile.id)}&gamever= ${gameVersion}`;

    socket = new WebSocket(socketURL);

    socket.onopen = () => {
        console.log("Server: connection successful");
        onServerConnect();
    };

    socket.onmessage = (event) => {
        try {
            let data = JSON.parse(event.data);

            switch (data.type) {
                // request + reply
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

                // reply only
                case "old_version":
                    client_old_version_reply(data);
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
    isLoggedIn = data.isLoggedIn;
}

// 3. /register
async function client_account_register(userName = "Alonso") {
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
    //let userName = "Alonso";
    let userPassword = "Fernando";
    let userEmail = "alonso@yahoo.com";

    // validation (e.g. username already exists) is done on the server
    // using the name and password provided by the user
    callServer("register", { username: userName, password: userPassword, email: userEmail });
}

function client_account_register_reply(data) {
    // data contains: success, nameValid, pwValid
    let message;
    if (data.success) message = "Registering successful";
    else if (!data.nameValid) message = "Username is inappropriate or already exists";
    else if (!data.pwValid) message = "Password is inappropriate or too short";
    else if (!data.emailValid) message = "Email already exists";
    else message = "Registering not successful, unknown error";

    console.log("register: " + message);
    if (data.success) client_account_logincheck();

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
    let userEmail = "alonso@yahoo.com";

    // validation is done on the server
    callServer("login", { username: userName, password: userPassword, email: userEmail });
}

function client_account_login_reply(data) {
    // data contains: success, nameValid, pwValid
    let message = "";
    if (data.success) message = "Login successful";
    else if (!data.nameValid) message = "Username is incorrect / does not exist";
    else if (!data.pwValid) message = "Password is incorrect";
    else message = "Login not successful, unknown error";

    console.log("login: " + message);
    if (data.success) client_account_logincheck();

    // put it into the UI, uhh
}

// 5. old version (reply only)
function client_old_version_reply(data) {
    // reply only - no request
    // data contains: clientVer, serverVer

    let conq = confirm("There is an update avaialable! Do you want to refresh?\nYour version: v" + data.clientVer + " - server version: v" + data.serverVer)

    if (conq) {
        autoSave("manual");
        window.location.reload();
    }
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