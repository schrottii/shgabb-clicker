/*
client-side code that talks to the server-side
*/

async function sendTrackerUpdate(id) {
    // send async request
    let response = await fetch('http://localhost:3000/playercount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: id })
    });

    // the response
    let data = await response.json();
    console.log("player count: " + data.onlineLast30Days);
}

/*
what to run: 
node server.js
npx serve -l 5000
*/