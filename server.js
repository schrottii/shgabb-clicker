/*
Server-side server logic code
*/

// imports & setup
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors({
    origin: [
        'https://schrottii.github.io/shgabb-clicker/', // live
        'http://localhost:3000', // local
        'http://127.0.0.1:5500' // visual studio
    ]
}));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Rate limit reached: please try again later, unless you are malicious, then do not"
});

app.use('/playercount', limiter);



// own vars
let visitors = new Map();



// 1. server function: playercount
// tracks how many have been online
// /playercount is basically the function, the interface, to communicate between client and server. 
app.post('/playercount', (req, res) => {
    // req = request, res = response
    // req.body is what the client sends

    // grabs the user ID that the client gives us
    let { userID } = req.body;
    if (!userID) return res.status(400).send("No ID provided by client");

    // basic verification if the ID can be legit
    if (userID.length < 8 || userID.length > 16) {
        return res.status(400).send("Invalid player ID");
    }

    // adds our dear user friend into our list + date
    visitors.set(userID, Date.now());

    // remove old grandpas
    let thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    for (let [id, time] of visitors) {
        if (time < thirtyDaysAgo) visitors.delete(id);
    }

    /*
    send data back to the client, it can be used like this: 
    let data = await response.json();
    console.log("player count: " + data.onlineLast30Days);
    */
    res.json({ onlineLast30Days: visitors.size });
});

// 2. check if player is logged in
app.post('/account_logincheck', (req, res) => {
    let { userID } = req.body;

    // uhhh..............

    res.json({ onlineLast30Days: visitors.size });
});


// register server
app.listen(3000, () => console.log("running on port 3000"));
