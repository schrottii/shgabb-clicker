/*
client-side code that talks to the server-side
*/

var socket;
var timeOutIntervals = [3000, 3000, 5000, 10000, 15000, 30000];
var timeOutProgress = 0;

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
    client_account_logincheck();
    //client_account_logincheck();
}

function connectToServer() {
    //socket = new WebSocket('ws://localhost:3000');
    let socketURL = window.location.href.includes("localhost") ? 'ws://localhost:3000' : 'wss://api-shgabb-clicker.balnoom.com';

    let savedName = "";
    let savedPassword = "";
    let savedEmail = "";

    // get cached login & auto-login with that
    let cachedLogin = localStorage.getItem("balnoomLogin");
    if (cachedLogin != null) {
        cachedLogin = JSON.parse(cachedLogin);
        if (cachedLogin.email != undefined && cachedLogin.email != null && cachedLogin.email != "") {
            savedName = cachedLogin.name;
            savedPassword = cachedLogin.pw;
            savedEmail = cachedLogin.email;
            console.log("Found cached login, using that");
        }
    }

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
                case "cloud_upload":
                    client_cloud_upload_reply(data);
                    break;
                case "cloud_download":
                    client_cloud_download_reply(data);
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
        let timeOutLength = timeOutIntervals[timeOutProgress];
        if (timeOutProgress < timeOutIntervals.length - 1) timeOutProgress++;

        console.log("Disconnected from server. Retrying in " + Math.round(timeOutLength / 1000) + " seconds...");
        setTimeout(connectToServer, timeOutLength);
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error: " + error);
    };
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