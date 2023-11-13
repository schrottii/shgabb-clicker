// Game made by Schrottii - editing or stealing is prohibited!

class Setting {
    constructor(category, clickFunction, title, description) {
        this.category = category;
        this.clickFunction = clickFunction;
        this.title = title;
        this.description = description;
    }

    getDescription() {
        if (typeof (this.description) == "function") return this.description();
        return this.description;
    }

    getVariable() {
        return false;
    }

    render() {
        return `<button onclick="onSettingClick('` + this.getVariable() + `'); ` + this.clickFunction + `(); renderSettings();" class="settingButton">` + this.title + `<br />` + this.getDescription() + `</button>`;
    }
}

class ToggleSetting extends Setting {
    constructor(category, clickFunction, variable, title) {
        super(category, clickFunction, title);
        this.variable = variable;
    }

    getDescription() {
        return settings[this.variable] ? "Enabled" : "Disabled";
    }

    getVariable() {
        return this.variable;
    }
}

const settingSections = ["gameplay", "design", "audio", "save"];
const settingSectionsDisplay = ["Gameplay", "Design", "Audio", "Savefile"];

var settingButtons = [
    new ToggleSetting("audio", "toggleMusic", "music", "Music"),
    new ToggleSetting("audio", "toggleAdMusic", "adMusic", "Ad Music"),
    new Setting("save", "exportGame", "Export Game", "Copy the savefile to clipboard"),
    new Setting("save", "importGame", "Import Game", "Import a savefile"),
    new ToggleSetting("design", "toggleBG", "background", "No Background"),
    new ToggleSetting("design", "toggleCurrent", "displayCurrent", "Current Effect Display"),
    new ToggleSetting("gameplay", "hideMaxed", "hideMaxed", "Hide Maxed Upgrades"),
    new ToggleSetting("gameplay", "toggleUnlevel", "hideUnlevel", "Hide Unlevel Button"),
    new Setting("gameplay", "toggleNotation", "Change Notation", () => "Current: " + settings.notation),
    new ToggleSetting("design", "toggleCurrenciesDisplay", "topSquare", "Toggle Currencies Display"),
    new ToggleSetting("gameplay", "toggleLeastAd", "leastAdLess", "Least watched ad appears less often"),
    new Setting("design", "toggleUpgradeColors", "Upgrade Colors", () => "Current: " + settings.upgradeColors),
]

function onSettingClick(toggle) {
    if(toggle != "false") settings[toggle] = !settings[toggle];
}

function renderSettings() {
    let render = "";

    for (se in settingSections) {
        render = render + "<h3>" + settingSectionsDisplay[se] + "</h3>";

        for (b in settingButtons) {
            if (settingButtons[b].category == settingSections[se]) render = render + settingButtons[b].render();
        }

        if (settingSections[se] == "design") render = render + "<br />" + upgradeColorsRender;
    }

    ui.settings.innerHTML = render;
}

// Functions for settings

function toggleMusic() {
    createNotification("Music " + (settings.music ? "ON" : "OFF"));
    music.muted = !settings.music;
    if (!music.muted) {
        music.currentTime = 0;
        music.play();
    }
}

function toggleAdMusic() {
    createNotification("Ad Music " + (settings.adMusic ? "ON" : "OFF"));
    adHandler.muted = !settings.adMusic;
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

function toggleCurrent() {
    createNotification("Current Effect " + (settings.displayCurrent ? "ON" : "OFF"));
    updateUpgrades();
}

function hideMaxed() {
    createNotification("" + (settings.hideMaxed ? "HIDE maxed" : "SHOW maxed"));
    updateUpgrades();
}

function toggleUnlevel() {
    createNotification("Unlevel button " + (settings.hideUnlevel ? "ON" : "OFF"));
    updateUpgrades();
}

function toggleNotation() {
    settings.notation = (notations[notations.indexOf(settings.notation) + 1] != undefined ? notations[notations.indexOf(settings.notation) + 1] : notations[0]);
    createNotification("New notation: " + settings.notation);
    updateUpgrades();
}

function toggleCurrenciesDisplay(directlyDo = true) {
    if (directlyDo || doubleClick > 0) {
        if (!directlyDo) settings.topSquare = !settings.topSquare;
        createNotification("Currencies Display " + (settings.topSquare ? "ON" : "OFF"));
        ui.topSquare.style.display = (settings.topSquare ? "" : "none");

        updateTopSquare();
    }
    else {
        doubleClick = 0.3;
    }
}

function toggleLeastAd() {
    createNotification("Least watched ad appears less often " + (settings.leastAdLess ? "ON" : "OFF"));
    updateUpgrades();
}

// eh

function toggleUpgradeColors() {
    settings.upgradeColors = (upgradeColors[upgradeColors.indexOf(settings.upgradeColors) + 1] != undefined ? upgradeColors[upgradeColors.indexOf(settings.upgradeColors) + 1] : upgradeColors[0]);
    createNotification("Upgrade Colors: " + settings.upgradeColors);

    updateUpgradeColors();

    updateUpgrades();
}

function changeCustomColor(i, j) {
    let amount = prompt("New RGB value? (0-255)");
    if (parseInt(amount) > -1 && parseInt(amount) < 256) {
        settings.customColors[i][j] = parseInt(amount);
    }

    updateUpgradeColors();
    updateUpgrades();
}

function importCustomColors() {
    let importGame = prompt("Import custom colors...");

    importGame = importGame.replace("colorshgabb", "W1");
    importGame = atob(importGame);
    importGame = JSON.parse(importGame);
    settings.customColors = importGame;
    updateUpgradeColors();

    createNotification("Custom colors imported!");
}

function exportCustomColors() {
    let exportGame = JSON.stringify(settings.customColors);
    exportGame = btoa(exportGame);
    exportGame = exportGame.replace("W1", "colorshgabb");

    navigator.clipboard.writeText(exportGame);
    createNotification("Custom colors exported to clipboard!");
}