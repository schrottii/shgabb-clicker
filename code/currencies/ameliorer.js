// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedAmeliorer() {
    return game.stats.hms >= 2000;
}

function getAmeliorerConvertCosts(type) {
    switch (type) {
        case "shgabb":
            return new Decimal(1e12).pow(game.ameUp[0] / 8 + 1).ceil();
        case "sw":
            return new Decimal(1000).pow(game.ameUp[1] / 10 + 1).ceil();
        case "gs":
            return new Decimal(1e6).pow(game.ameUp[2] / 12 + 1).ceil();
        case "si":
            return new Decimal(1e5).pow(game.ameUp[3] / 15 + 1).ceil();
        case "gems":
            return game.ameUp[4] >= highestAmeConvert() ? 1000 : 500;
    }
}

function canAffordAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    if (type != "gems") return game[type].gte(costs);
    else {
        return game[type] >= costs && (highestAmeConvert() > game.ameUp[4] || ameliorerUpgrades.infiniteGems2ame.currentLevel() > 0);
    }
}

function highestAmeConvert() {
    let highest = game.ameUp[0];
    if (game.ameUp[1] > highest) highest = game.ameUp[1];
    if (game.ameUp[2] > highest) highest = game.ameUp[2];
    if (game.ameUp[3] > highest) highest = game.ameUp[3];
    return highest;
}

function convertAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    if (canAffordAmeliorer(type)) {
        if (type != "gems") game[type] = game[type].sub(costs);
        else game[type] -= costs;

        game.ameUp[{ "shgabb": 0, "sw": 1, "gs": 2, "si": 3, "gems": 4 }[type]] += 1;
        game.ame += 1;
        statIncrease("ame", 1);

        updateUpgrades();
        renderAmeConvert();
    }
}

function renderAmeConvert() {
    let render = "";
    for (l = 0; l < 4 + ameliorerUpgrades.gems2ame.currentLevel(); l++) {
        let thisType = ["shgabb", "sw", "gs", "si", "gems"][l];
        render = render + "<button onclick='convertAmeliorer(`" + thisType + "`)' class='ameliorerButton' style='background-color: " + (canAffordAmeliorer(thisType) ? "rgb(180, 255, 200)" : "white") + "'>[" + game.ameUp[l] + (thisType == "gems" ? ("/" + highestAmeConvert()) : "") + "] Convert " + fn(getAmeliorerConvertCosts(thisType)) + " " + ["Shgabb", "Sandwiches", "Golden Shgabb", "Silicone", "Gems"][l] + " to<br />+1 Améliorer!</button>";
    }
    ui.ameconvert.innerHTML = render;
}

function getTotalAme() {
    let amelvl = 0;
    for (let ame in ameliorerUpgrades) {
        amelvl += ameliorerUpgrades[ame].currentLevel();
    }
    return amelvl;
}

function ameReset() {
    game.ame = game.stats.ame;

    for (let a in ameliorerUpgrades) {
        game.upgradeLevels[ameliorerUpgrades[a].ID] = 0;
    }

    ui.ameReset.checked = false;
    ui.ameReset.value = "false";

    updateArtifacts();
}

var ameResetCounter = false;
function toggleAmeReset() {
    if (game.stats_prestige.playTime < 600) return false;

    if (ameResetCounter) {
        ameResetCounter = false;
    }
    else {
        if (ui.ameReset.checked) {
            ui.ameReset.checked = false;
            ui.ameReset.value = "false";
        }
        else {
            ui.ameReset.checked = true;
            ui.ameReset.value = "true";
        }
    }
}

function toggleAmeReset2() {
    if (game.stats_prestige.playTime < 600) return false;
    ameResetCounter = true;
}

function getAmeCame() {
    if (ameliorerUpgrades != undefined) return ameliorerUpgrades.AMECAME.currentEffect();
    return 0;
}