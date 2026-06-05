/*
client-side code that talks to the server-side
*/

async function sendTrackerUpdate(id) {
    if (getOrigin() == "private") return;

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