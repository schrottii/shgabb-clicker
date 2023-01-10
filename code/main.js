// Main JS File

var autoSaveTime = 3;
var quoteTime = 10;
var sandwichTime = 1;
var sandwichFreezeTime = 60;
var adTime = 10;
var currentNotifications = [];

var ui = {
    clickButton: document.getElementById("clickButton"),
    cooldownBar: document.getElementById("cooldownBar"),
    sandwichBar: document.getElementById("sandwichBar"),
    shgabbAmount: document.getElementById("shgabbAmount"),
    swAmount: document.getElementById("swAmount"),
    upgradesl: document.getElementById("upgradesl"),
    upgradesr: document.getElementById("upgradesr"),
    swupgradesl: document.getElementById("swupgradesl"),
    swupgradesr: document.getElementById("swupgradesr"),
    stats: document.getElementById("stats"),
    notifications: document.getElementById("notifications"),
    music: document.getElementById("music"),
    quote: document.getElementById("quote"),
}

var adHandler = document.getElementById("baldad");
var adButton = document.getElementById("adstartbutton");
var adLoaded = false;
var availableBoost = "none";
var currentBoost = "none";

const boosts = ["strongerClicks", "strongerAuto", "moreSandwiches", "fasterShgabb"];
const boostTexts = {
    strongerClicks: "Stronger Clicks: Get x1.5 shgabb from clicks for 2 minutes",
    strongerAuto: "Stronger Auto: Get x5 automatic shgabb for 10 minutes",
    moreSandwiches: "More Sandwiches: Get sandwiches 2x more often for 3 minutes",
    fasterShgabb: "You can click 5x more often for 60 seconds"
};
const adTimes = {
    strongerClicks: 120,
    strongerAuto: 600,
    moreSandwiches: 180,
    fasterShgabb: 60
};
const quotes = ["(I am always nice but whatever) - Schrottii",
    "I merge with my internal organs - K. whale",
    "how can i get this macdonald coin - Benio",
    "37 and 48 are basically the same - Topper",
    "I don't bathe - Schrottii",
    "Warning!!! I might react with tractor emoji - slowmerger",
    "im bus - Feline",
    "noooo he deleted my balls - shgabb",
    "2+3=3 you idiot - Schrottii",
    "You need 7.5k merges every second - Fishka",
    "no i'm a transexual attack helicopter - shgabb",
];

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    let amount = Math.floor(getProduction() * criticalHit() * (currentBoost == "strongerClicks" ? 1.5 : 1));
    if (game.clickCooldown <= 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.clickCooldown = (5 - shgabbUpgrades.shorterCD.currentEffect()) / (currentBoost == "fasterShgabb" ? 5 : 1);
        game.stats.clicks += 1;

        if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 2 : 1)) {
            amount = shgabbUpgrades.moreSw.currentEffect() + 1;
            game.sw += amount;
            game.stats.sw += amount;
            createNotification("+" + amount + " sandwich" + (amount > 1 ? "es" : "") + "!");
        }
    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));
    }

    sandwichFreezeTime = 60 + sandwichUpgrades.fridge.currentEffect();
}

function getProduction() {
    // Get the current shgabb production per click
    return Math.ceil((1 + shgabbUpgrades.moreShgabb.currentEffect()) * shgabbUpgrades.bomblike.currentEffect() * (game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1));
}

function criticalHit() {
    // Critical hit handler, returns multi (default 3)
    if (Math.random() * 100 < shgabbUpgrades.critChance.currentEffect()) {
        createNotification("Critical Hit!");
        return shgabbUpgrades.critBoost.currentEffect();
    }
    return 1;
}

function toggleMusic() {
    if (music.muted == true) {
        music.muted = false;
        music.currentTime = 0;
        music.play();
        createNotification("Music ON");
    }
    else {
        createNotification("Music OFF");
        music.muted = true;
    }
    
}

function toggleBG() {
    var body = document.getElementsByTagName('body')[0];
    if (body.style.backgroundImage != "none") {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
        createNotification("Background OFF");
    }
    else {
        body.style.backgroundImage = "url(images/shgabb-background.png)";
        body.style.backgroundColor = "none";
        createNotification("Background ON");
    }
}

function updateQuote() {
    ui.quote.innerHTML = quotes[Math.ceil(Math.random() * quotes.length - 1)];
}

function updateUpgrades() {
    // Update upgrades UI
    ui.upgradesl.innerHTML = shgabbUpgrades.moreShgabb.render() + shgabbUpgrades.shorterCD.render() + shgabbUpgrades.bomblike.render() + shgabbUpgrades.swChance.render();
    ui.upgradesr.innerHTML = shgabbUpgrades.critChance.render() + shgabbUpgrades.critBoost.render() + shgabbUpgrades.goodJoke.render() + shgabbUpgrades.moreSw.render();

    ui.swupgradesl.innerHTML = sandwichUpgrades.autoShgabb.render();
    ui.swupgradesr.innerHTML = sandwichUpgrades.fridge.render();
}

function updateUI() {
    // Update UI
    ui.shgabbAmount.innerHTML = game.shgabb + " Shgabb";
    if (game.upgradeLevels.swChance > 0) ui.swAmount.innerHTML = game.sw + " Sandwiches";
    else ui.swAmount.innerHTML = "";

    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
    }
    else {
        ui.clickButton.innerHTML = "+" + getProduction() + " Shgabb";
        ui.clickButton.style["background-color"] = "blue";
    }
    cooldownBar.value = game.clickCooldown;
    sandwichBar.value = sandwichFreezeTime;

    ui.stats.innerHTML = "Total Shgabb: " + game.stats.shgabb
        + "<br />Total Sandwiches: " + game.stats.sw
        + "<br />Total Clicks: " + game.stats.clicks
        + "<br />Total Time: " + game.stats.playTime.toFixed(1);

    ui.notifications.innerHTML = "";
    for (n in currentNotifications) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n][0] + "<br />";
    }
}

function sandwich() {
    let amount = Math.ceil(sandwichUpgrades.autoShgabb.currentEffect() * (currentBoost == "strongerAuto" ? 5 : 1));
    game.shgabb += amount;
    game.stats.shgabb += amount;
    createNotification("+" + amount + " shgabb");
}

function buyUpgrade(id) {
    // Buy an upgrade and update UI
    id.buy();
    updateUpgrades();
    sandwichFreezeTime = 60 + sandwichUpgrades.fridge.currentEffect();
}

// Notifications
function createNotification(text) {
    currentNotifications.push([text, 5]);
    if (currentNotifications.length > 5) currentNotifications.shift();
}

// Core
function autoSave() {
    // Auto Save
    localStorage.setItem("shgabbClicker", JSON.stringify(game));
    createNotification("Game saved automatically");
}

function exportGame() {
    let exportGame = JSON.stringify(game);
    exportGame = btoa(exportGame);
    exportGame = exportGame.replace("ey", "shgabb");
    exportGame = exportGame.replace("x", "pppp");
    exportGame = exportGame.replace("D", "dpjiopjrdopjh");
    navigator.clipboard.writeText(exportGame);
    createNotification("Game exported to clipboard!");
}

function importGame() {
    let importGame = prompt("Code?");
    importGame = importGame.replace("shgabb", "ey");
    importGame = importGame.replace("dpjiopjrdopjh", "D");
    importGame = importGame.replace("pppp", "x");
    importGame = atob(importGame);
    importGame = JSON.parse(importGame);

    let cache = game;
    game = Object.assign({}, game, importGame);
    game.upgradeLevels = Object.assign({}, cache.upgradeLevels, importGame.upgradeLevels);
    game.stats = Object.assign({}, cache.stats, importGame.stats);

    createNotification("Game imported successfully!");
}

function showAd() {
    adHandler.style.display = "inline";
    adHandler.play();
}

function loop() {
    // Main Game Loop
    game.clickCooldown -= 30 / 1000;
    autoSaveTime -= 30 / 1000;
    quoteTime -= 30 / 1000;
    sandwichTime -= 30 / 1000;
    sandwichFreezeTime -= 30 / 1000;
    game.stats.playTime += 30 / 1000;
    if(adLoaded) adTime -= 30 / 1000;

    for (n in currentNotifications) {
        currentNotifications[n][1] -= 30 / 1000;
        if (currentNotifications[n][1] < 0) currentNotifications.splice(n, 1);
    }

    if (autoSaveTime <= 0) {
        autoSaveTime = 3;
        autoSave();
    }
    if (quoteTime <= 0) {
        quoteTime = 10;
        updateQuote();
    }
    if (sandwichTime <= 0 && sandwichFreezeTime > 0) {
        sandwichTime = 1;
        sandwich();
    }

    if (adTime <= 0 && adButton.style.display == "none" && currentBoost == "none") {
        availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        adButton.style.display = "inline";
        adButton.innerHTML = "Watch an ad to get a boost!<br />" + boostTexts[availableBoost];
    }
    else if (adTime <= 0 && adButton.style.display == "none") {
        adTime = 10;
        currentBoost = "none";
    }
    else if (currentBoost == "none" && adTime <= -25) {
        adButton.style.display = "none";
        adTime = 5;
    }

    updateUI();
}

// Load
if (localStorage.getItem("shgabbClicker") != undefined) {
    let cache = game;
    game = Object.assign({}, game, JSON.parse(localStorage.getItem("shgabbClicker")));
    game.upgradeLevels = Object.assign({}, cache.upgradeLevels, JSON.parse(localStorage.getItem("shgabbClicker")).upgradeLevels);
    game.stats = Object.assign({}, cache.stats, JSON.parse(localStorage.getItem("shgabbClicker")).stats);
    game.shgabb = Math.ceil(game.shgabb);
    game.stats.shgabb = Math.ceil(game.stats.shgabb);
}

// Ad init
adHandler.oncanplay = () => {
    adLoaded = true;
}

adHandler.onended = () => {
    currentBoost = availableBoost;
    availableBoost = "none";
    adTime = adTimes[currentBoost];
    adHandler.style.display = "none";
    adButton.style.display = "none";
}

// Update upgrades UI
updateUpgrades();

// Start game loop (30 FPS)
setInterval("loop()", 1000 / 30); // 30 FPS