/*
client-side code that talks to the server-side
*/

async function callServer(body = "") {
    return await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });
}

async function client_playercount(id) {
    if (getOrigin() == "private") return;

    // send async request
    let response = await callServer(JSON.stringify({ userID: id }));

    // deal with the rate limiter
    if (!response.ok) {
        let errorText = await response.text();
        console.warn("Server error: ", errorText);
        return;
    }

    // the response
    let data = await response.json();
    console.log("player count: " + data.onlineLast30Days);
    ui.playercount.innerHTML = "Players in last 30 days: " + data.onlineLast30Days;
}

async function client_account_logincheck() {
    if (getOrigin() == "private") return;

    let response = await callServer(""); // true for logged in, false for not logged in

    if (!response.ok) {
        let errorText = await response.text();
        console.warn("Server error: ", errorText);
        return;
    }

    // the response
    let data = await response.json();
    console.log("player login info: " + (data.loggedin == false ? "not " : "") + "logged in");
}

async function client_account_register(id) {
    if (getOrigin() == "private") return;

    // okay, let me be clear: game is already some time old, so in case people shared their acc, 
    // using the pre - existing ID for login might not be the best solution
    // also, it can be edited, so what if 2 people edit their ID to be the same? all kinds of stuff like that
    // -> local, pre-existing name and ID, are important for this game, and the local save only
    // they are still saved onto the server to quickly find players

    // structure of a player looks like:
    // server ID (1, 2, 3) ~ acc_name ~ acc_password ~ extras (including: ingame_name, ingame_id & other relevant things) ~ save
    // so, upon registering (this function), we need the user to enter a name and a password, and add it to the db

    // send async request
    let response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: id })
    });

    // deal with the rate limiter
    if (!response.ok) {
        let errorText = await response.text();
        console.warn("Server error: ", errorText);
        return;
    }

    // the response
    let data = await response.json();
    console.log("player count: " + data.onlineLast30Days);
    ui.playercount.innerHTML = "Players in last 30 days: " + data.onlineLast30Days;
}



// code by d0ktorek
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
*/