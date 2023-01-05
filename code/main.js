// Main JS File

var autoSaveTime = 3;
var currentNotifications = [];

var ui = {
    clickButton: document.getElementById("clickButton"),
    cooldownBar: document.getElementById("cooldownBar"),
    shgabbAmount: document.getElementById("shgabbAmount"),
    upgradesl: document.getElementById("upgradesl"),
    upgradesr: document.getElementById("upgradesr"),
    stats: document.getElementById("stats"),
    notifications: document.getElementById("notifications"),
    music: document.getElementById("music"),
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    let amount = getProduction() * criticalHit();
    if (game.clickCooldown <= 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.clickCooldown = 5 - shgabbUpgrades.shorterCD.currentEffect();
        game.stats.clicks += 1;
    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));
    }
}

function getProduction() {
    // Get the current shgabb production per click
    return (1 + shgabbUpgrades.moreShgabb.currentEffect()) * shgabbUpgrades.bomblike.currentEffect() * (game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1);
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
        music.play();
        createNotification("Music ON");
    }
    else {
        createNotification("Music OFF");
        music.muted = true;
    }
    
}

function updateUpgrades() {
    // Update upgrades UI
    ui.upgradesl.innerHTML = shgabbUpgrades.moreShgabb.render() + shgabbUpgrades.shorterCD.render() + shgabbUpgrades.bomblike.render();
    ui.upgradesr.innerHTML = shgabbUpgrades.critChance.render() + shgabbUpgrades.critBoost.render() + shgabbUpgrades.goodJoke.render();
}

function updateUI() {
    // Update UI
    ui.shgabbAmount.innerHTML = game.shgabb + " Shgabb";

    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
    }
    else {
        ui.clickButton.innerHTML = "+" + getProduction() + " Shgabb";
        ui.clickButton.style["background-color"] = "blue";
    }
    cooldownBar.value = game.clickCooldown;

    ui.stats.innerHTML = "Total Shgabb: " + game.stats.shgabb
        + "<br />Total Clicks: " + game.stats.clicks
        + "<br />Total Time: " + game.stats.playTime.toFixed(1);

    ui.notifications.innerHTML = "";
    for (n in currentNotifications) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n][0] + "<br />";
    }
}


function buyUpgrade(id) {
    // Buy an upgrade and update UI
    id.buy();
    updateUpgrades();
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

function loop() {
    // Main Game Loop
    game.clickCooldown -= 30 / 1000;
    autoSaveTime -= 30 / 1000;
    game.stats.playTime += 30 / 1000;

    for (n in currentNotifications) {
        currentNotifications[n][1] -= 30 / 1000;
        if (currentNotifications[n][1] < 0) currentNotifications.splice(n, 1);
    }

    if (autoSaveTime <= 0) {
        autoSaveTime = 3;
        autoSave();
    }

    updateUI();
}

// Load
if (localStorage.getItem("shgabbClicker") != undefined) {
    let cache = game;
    game = Object.assign({}, game, JSON.parse(localStorage.getItem("shgabbClicker")));
    game.upgradeLevels = Object.assign({}, cache.upgradeLevels, JSON.parse(localStorage.getItem("shgabbClicker")).upgradeLevels);
    game.stats = Object.assign({}, cache.stats, JSON.parse(localStorage.getItem("shgabbClicker")).stats);
}

// Update upgrades UI
updateUpgrades();

// Start game loop (30 FPS)
setInterval("loop()", 1000 / 30); // 30 FPS