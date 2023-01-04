// Main JS File

var autoSaveTime = 3;

var ui = {
    clickButton: document.getElementById("clickButton"),
    cooldownBar: document.getElementById("cooldownBar"),
    shgabbAmount: document.getElementById("shgabbAmount"),
}

function clickButton() {
    if (game.clickCooldown <= 0) {
        game.shgabb += 1;
        game.clickCooldown = 5;
    }
}

function updateUI() {
    ui.shgabbAmount.innerHTML = game.shgabb + " Shgabb";

    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
    }
    else {
        ui.clickButton.innerHTML = "+1 Shgabb";
        ui.clickButton.style["background-color"] = "blue";
    }
    cooldownBar.value = game.clickCooldown;
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

if (localStorage.getItem("shgabbClicker") != undefined) game = JSON.parse(localStorage.getItem("shgabbClicker"));

setInterval("loop()", 1000 / 30); // 30 FPS