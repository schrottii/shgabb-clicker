/*
client-side code that talks to the server-side
*/

async function sendTrackerUpdate(id) {
    // send async request
    let response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: id })
    });

    // deal with the rate limiter
    if (!response.ok) {
        let errorText = await response.text();
        console.warn("Server notice: ", errorText);
        return;
    }

    // the response
    let data = await response.json();
    console.log("player count: " + data.onlineLast30Days);
    ui.playercount.innerHTML = "Players in last 30 days: " + data.onlineLast30Days;
}

/*
what to run: 
node server.js
npx serve -l 5000
*/
