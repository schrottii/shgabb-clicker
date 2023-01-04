// Main JS File

var autoSaveTime = 3;

var ui = {
    clickButton: document.getElementById("clickButton"),
    cooldownBar: document.getElementById("cooldownBar"),
    shgabbAmount: document.getElementById("shgabbAmount"),
    upgrades: document.getElementById("upgrades"),
}

function clickButton() {
    if (game.clickCooldown <= 0) {
        game.shgabb += getProduction() * criticalHit();
        game.clickCooldown = 5;
    }
}

function getProduction() {
    return 1 + shgabbUpgrades.moreShgabb.currentEffect();
}

function criticalHit() {
    if (Math.random() * 100 < shgabbUpgrades.critChance.currentEffect()) {
        return 3;
    }
    return 1;
}

function updateUpgrades() {
    ui.upgrades.innerHTML = shgabbUpgrades.moreShgabb.render() + shgabbUpgrades.critChance.render();
}

function updateUI() {
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
}


function buyUpgrade(id) {
    id.buy();

    updateUpgrades();
}

function autoSave() {
    localStorage.setItem("shgabbClicker", JSON.stringify(game));
}

function loop() {
    updateUI();
    game.clickCooldown -= 30 / 1000;
    autoSaveTime -= 30 / 1000;
    if (autoSaveTime <= 0) {
        autoSaveTime = 3;
        autoSave();
    }
}

// Load
if (localStorage.getItem("shgabbClicker") != undefined) {
    let cache = game;
    game = Object.assign({}, game, JSON.parse(localStorage.getItem("shgabbClicker")));
    game.upgradeLevels = Object.assign({}, cache.upgradeLevels, JSON.parse(localStorage.getItem("shgabbClicker")).upgradeLevels);
}

// Update upgrades UI
updateUpgrades();

// Start game loop (30 FPS)
setInterval("loop()", 1000 / 30); // 30 FPS