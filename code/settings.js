// Game made by Schrottii - editing or stealing is prohibited!

// SETTING CLASS
class Setting {
    constructor(category, clickFunction, title, description, currentEffect) {
        this.category = category;
        this.clickFunction = clickFunction;
        this.title = title;
        this.description = description;
        this.currentEffect = currentEffect;
    }

    getDescription() {
        return this.description;
    }

    getCurrentEffect() {
        if (typeof (this.currentEffect) == "function") return this.currentEffect();
        return this.currentEffect;
    }

    getVariable() {
        return false;
    }

    renderSlider() {
        return "";
    }

    render(count) {
        return `<button id="set` + count + `" onclick="onSettingClick('` + count + `'); ` + (this.clickFunction != false ? (this.clickFunction + `();`) : ``) + `renderSettings();" class="settingButton">` +
            `<b><u style="color: white; text-underline-offset: 4px;">` + this.title + `</u></b><br />`
            + (settings.settingDesc ? (`<span style="font-size: 16px;">` + this.getDescription() + `</span><hr />`) : ``)
            + this.renderSlider()
            + this.getCurrentEffect() + `</button>`;
    }
}

class ToggleSetting extends Setting {
    constructor(category, clickFunction, variable, title, description) {
        super(category, clickFunction, title, description);
        this.variable = variable;
    }

    getCurrentEffect() {
        return "<b><span style='color: " + (settings[this.variable] ? "green" : "red") + "'>" + (settings[this.variable] ? "Enabled" : "Disabled") + "</span></b>";
    }

    getVariable() {
        return this.variable;
    }
}

class SliderSetting extends Setting {
    constructor(category, setting, min, max, title, description) {
        super(category, "toggleNone", title, description);
        this.setting = setting;
        this.min = min;
        this.max = max;
    }

    renderSlider() {
        return "<input id='" + this.setting + "' type='range' value='" + settings[this.setting] + "' min='" + this.min + "' max='" + this.max + "' step='" + (this.max / 10) + "'"
            + "onchange='sliderChange(`" + this.setting + "`)' /> ";
    }

    getCurrentEffect() {
        return this.max == 1 ? settings[this.setting] * 100 + "%" : settings[this.setting];
    }
}

function sliderChange(setting) {
    if (document.getElementById(setting) != undefined) settings[setting] = document.getElementById(setting).value;
    renderSettings();

    if (setting == "musicVolume") audioChangeVolume("music", settings[setting]);
    if (setting == "soundVolume") audioChangeVolume("sound", settings[setting]);
}

function toggleNone() { }

// VARIABLES
const settingSections = ["gameplay", "design", "audio", "save"];
const settingSectionsDisplay = ["Gameplay", "Design", "Audio", "Savefile"];
var currentSettingSection = 0;

// ALL THE SETTINGS
var settingButtons = [
    // gameplay
    new Setting("gameplay", "toggleNotation", "Change Notation", "Change how big numbers are displayed", () => "Current: " + settings.notation + "<br>(Examples: " + fn(1e6) + ", " + fn(1e7) + ", " + fn(1e9) + ", " + fn(1e12) + ")"),
    new ToggleSetting("gameplay", "toggleUnlevel", "hideUnlevel", "Hide Unlevel Button", "When enabled, the -1 and -MAX buttons (unlevel) are hidden. Ineffective if unlevel hasn't been bought."),
    new Setting("gameplay", "toggleLeastAd", "Least watched ad setting", "This setting can be used to make the least used joke ad boost appear more often than others, or less often, or to keep the chances equal/unchanged.", () => "Current: " + ["Appears less often", "Unchanged", "Appears more often"][typeof (settings.leastAdLess) != "boolean" ? settings.leastAdLess : (settings.leastAdLess == true ? 1 : 0)]),
    new ToggleSetting("gameplay", "toggleNoUpgrading", "noUpgrading", "Disable Upgrading", "When enabled, no upgrades can be bought."),
    new ToggleSetting("gameplay", "toggleNoAds", "noAds", "Disable Ads", "When enabled, no joke ads appear - meaning their boosts are unavailable too."),
    new ToggleSetting("gameplay", false, "confirm", "Confirmation Dialogs", "If this setting is disabled, most confirmation dialogs stop appearing, including Prestige and destroying Artifacts."),
    new ToggleSetting("gameplay", false, "threeBars", "Three Bars", "If this setting is disabled, the three bars at the top are hidden. Ineffective before unlocking Sandwiches."),
    new ToggleSetting("gameplay", false, "preferMS", "Prefer More Shgabb", "When enabled, and trying to buy a Shgabb Upgrade, the game will buy More Shgabb instead if it's cheaper. Works with buy max too."),
    new ToggleSetting("gameplay", "toggleBoostFilters", "boostFilters", "Show Artifact Boost Filters", "When enabled, Artifact Boost Filters are visible. They can be used to quickly filter the Artifact inventory for certain types of Artifacts."),
    new ToggleSetting("gameplay", "toggleSidebar", "sidebar", "Sidebar", "The left side gets replaced with the Sidebar, offering a constant click button, currency overview and more"),
    new Setting("gameplay", "adjustSidebarWidth", "Sidebar Width", "Change size of the sidebar", () => "Current: " + settings.sidebarWidth),
    new Setting("gameplay", "startTutorial", "Tutorial", "Repeat the tutorial", () => ""),

    // design
    new ToggleSetting("design", "toggleBG", "background", "Black Background", "When enabled, the background image gets replaced by a black color. Also active during events."),
    new ToggleSetting("design", "allowEventBG", "eventBG", "Allow custom BG in events", "When enabled, the background image is different during events. When disabled, the background image is always the normal one."),
    new Setting("design", "toggleCurrenciesDisplay", "Currencies Display", "Change the Top/Currencies display. Compact mode removes their names and productions.", () => "Current: " + ["Visible", "Hidden", "Compact"][typeof (settings.topSquare) != "boolean" ? settings.topSquare : (settings.topSquare == true ? 1 : 0)]),
    new Setting("design", "topNotifs", "Top Notification Amount", "Adjust how many of the most recent notifications are shown at the top.", () => "Current: " + settings.topNotifs),
    new ToggleSetting("design", "toggleHideMaxed", "hideMaxed", "Hide Maxed Upgrades", "When enabled, upgrades that are at max. level are hidden. When disabled, they simply appear in a different color."),
    new ToggleSetting("design", "toggleCurrent", "displayCurrent", "Current Effect Display", "When enabled, a few upgrades show more details about their boost"),
    new ToggleSetting("design", "toggleArtifactImages", "artifactImages", "Show Artifact Images", "If this is disabled, the images of Artifacts are hidden. Can make the Artifact inventory more clear."),
    new ToggleSetting("design", "toggleSettingDescriptions", "settingDesc", "Show Setting Descriptions", "When enabled, descriptions for settings are shown. Disable to achieve more compact settings."),
    new Setting("design", "changeUpgradeColors", "Upgrade Colors", "Adjust the colors of the three types of upgrades (can afford, too expensive, maxed)!", () => "Current: " + settings.upgradeColors),
    new Setting("design", "updateEVERYTHING", "Refresh page", "Updates everything UI-related", () => "Last full update: " + timeSinceFullUIUpdate),
    new ToggleSetting("design", false, "popups", "Toggle Popups", "The large notifications that appear when you get an Artifact or Achievement"),

    // audio
    new ToggleSetting("audio", "toggleMusic", "music", "Music", "Turn ALL music on or off."),
    new SliderSetting("audio", "musicVolume", 0, 1, "Music Volume", "Adjust volume of music"),
    new ToggleSetting("audio", "toggleAdMusic", "adMusic", "Ad Music", "Turn the music from joke ads on or off."),
    new Setting("audio", "changeSong", "Selected Song", "Select which song to play", () => songs[settings.song]),
    new ToggleSetting("audio", "toggleSounds", "sounds", "Sounds", "Turn ALL sounds on or off."),
    new SliderSetting("audio", "soundVolume", 0, 1, "Sound Volume", "Adjust volume of sound effects"),
    new ToggleSetting("audio", "toggleAutoplaySongs", "autoplaySongs", "Autoplay Songs", "After a song is finished, play the next song"),

    // save
    new Setting("save", "exportGame", "Export Game", "[EXPORT - CODE] Copy the savefile to the clipboard. Store it somewhere and use it to load your progress later.", ""),
    new Setting("save", "importButton", "Import Game", "[IMPORT - CODE] Import a savefile, obtained from the Export Game setting.", ""),
    new Setting("save", "createBackup", "Create Backup", "[EXPORT - BACKUP] Create an additional save in the cache, independent from the normal save.", ""),
    new Setting("save", "loadBackup", "Load Backup", "[IMPORT - BACKUP] Load the additional cached backup, that you created with the Create Backup setting.", () => localStorage.getItem("shgabbBackup") != null ? "Exists" : "Does not exist"),
    new Setting("save", "manualSave", "Save", "Saves the game, like auto save (cache). Does not affect the clipboard or anything else.", ""),
    new Setting("save", "deleteGame", "Delete Game", "Delete this save (HARD RESET)!", ""),
    new Setting("save", "exportToFile", "Export to file", "[EXPORT - FILE] Save to a .txt file", ""),
    new Setting("save", "importFromFile", "Import from file", `[IMPORT - FILE] Load the .txt file. Select the .txt file with the button below, then click this to load it.`, () => document.getElementById("myFile") != null && document.getElementById("myFile").value != "" ? "File selected - click to load" : "Select a file first!"),
    new Setting("save", "redeemRewardCode", "Redeem a Reward Code", "Use this to import a special gift from Schrottii. Each can be used only once and has an expiry date.", ""),
    new Setting("save", "exportSettings", "Export Settings", "[EXPORT - SETTINGS CODE] Copy the a code for settings to the clipboard. Store it somewhere and use it to load this set of settings later.", ""),
    new Setting("save", "importSettings", "Import Settings", "[IMPORT - SETTINGS CODE] Import a settings code, obtained from the Export Settings setting.", ""),
]

// GENERAL SETTING FUNCTIONS
function onSettingClick(count) {
    let setting = settingButtons[count];
    if (setting.getVariable() != false) {
        // if it's a toggle setting
        settings[setting.getVariable()] = !settings[setting.getVariable()];
        if (settings[setting.getVariable()] === true || settings[setting.getVariable()] === false) {
            createNotification("SETTINGNAME is now TOGGLESTATE", [["SETTINGNAME", setting.title], ["TOGGLESTATE", settings[setting.getVariable()] === true ? "ENABLED" : "DISABLED"]]);
        }
    }
    //renderSettings(); no!!
}

function settingsSet(r) {
    currentSettingSection = r;
    renderSettings();
}

function renderSettings() {
    let render = "";
    let counter = 0;

    for (let r in settingSections) {
        render = render + `<button class="grayButton" style="width: 24%; background-color: ` + (currentSettingSection == r ? "yellow" : "white") + `" onclick="settingsSet(` + r + `)">` + settingSectionsDisplay[r] + `</button>`;
    }

    render = render + "<br /><h3>" + settingSectionsDisplay[currentSettingSection] + "</h3><div class='upgradesContainer'>";

    for (let s in settingButtons) {
        if (settingButtons[s].category == settingSections[currentSettingSection]) {
            render = render + settingButtons[s].render(counter);

            if (settingButtons[s].title == "Import from file") render = render + `<br style='clear: both' /><input id="myFile" type="file"><br style='clear: both' />`;
        }
        counter++;
    }
    if (settingSections[currentSettingSection] == "design") render = render + "<br style='clear: both' />" + upgradeColorsRender;

    ui.settings.innerHTML = "</div>" + render;

    /*
    let sCount = 0;
    let height = 0;
    for (let s = 0; s < counter; s++) {
        height = Math.max(height, document.getElementById("set" + s).clientHeight);
        sCount = sCount + 1;

        if (sCount == (document.body.clientWidth >= 768 ? 2 : 4) || s == counter - 1) {
            for (let ss = s; ss > s - sCount; ss--) {
                document.getElementById("set" + ss).style.height = height + "px";
            }

            sCount = 0;
            height = 0;
        }
    }
    */
}

///////////////////////////////////
// FUNCTIONS FOR SETTINGS
///////////////////////////////////

///////////////////////////////////
// GAMEPLAY FUNCTIONS
///////////////////////////////////
function toggleNotation() {
    settings.notation = (notations[notations.indexOf(settings.notation) + 1] != undefined ? notations[notations.indexOf(settings.notation) + 1] : notations[0]);

    createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Notation"], ["SETTINGSTATE", settings.notation]]);
    updateUpgrades();
}

function toggleUnlevel() {
    updateUpgrades();
}

function toggleLeastAd() {
    if (settings.leastAdLess == false || settings.leastAdLess == 0) {
        // Change to 1 - normal
        settings.leastAdLess = 1;
        createNotification("Least watched ad appears as often as others");
    }
    else if (settings.leastAdLess == true || settings.leastAdLess == 1) {
        // Change to 2 - more
        settings.leastAdLess = 2;
        createNotification("Least watched ad appears more often");
    }
    else if (settings.leastAdLess == 2) {
        // Change to 0 - less
        settings.leastAdLess = 0;
        createNotification("Least watched ad appears more often");
    }

    updateUpgrades();
}

function toggleNoUpgrading() {
    updateUpgrades();
}

function toggleNoAds() {
    currentBoost = "none";
    adTime = 15;
}

function toggleBoostFilters() {
    updateArtifacts();
}

function toggleSidebar() {
    ui.sosobar.style.display = "none";
    if (settings.sidebar == true) {
        ui.SIDEBAR.style.display = "";
        ui.SIDEBAR.style.width = settings.sidebarWidth + "%";
        changeSidebarWidth();
    }
    else {
        ui.SIDEBAR.style.display = "none";
        ui.GAMECONTENT.style.width = "100%";

        if (settings.sidebar == "so-so") {
            ui.sosobar.style.display = "";
        }
    }
}

function adjustSidebarWidth() {
    switch (settings.sidebarWidth) {
        case 19:
            settings.sidebarWidth = 24;
            break;
        case 24:
            settings.sidebarWidth = 29;
            break;
        case 29:
            settings.sidebarWidth = 34;
            break;
        case 34:
            settings.sidebarWidth = 4;
            break;
        case 4:
            settings.sidebarWidth = 9;
            break;
        case 9:
            settings.sidebarWidth = 14;
            break;
        case 14:
            settings.sidebarWidth = 19;
            break;
    }
    ui.SIDEBAR.style.width = settings.sidebarWidth + "%";

    changeSidebarWidth();
}

function changeSidebarWidth() {
    if (settings.sidebar) {
        ui.GAMECONTENT.style.width = (99 - settings.sidebarWidth) + "%";
    }
}

///////////////////////////////////
// DESIGN FUNCTIONS
///////////////////////////////////
function toggleBG() {
    updateBG();
}

function allowEventBG() {
    updateBG();
}

function toggleCurrenciesDisplay() {
    if (settings.topSquare == false || settings.topSquare == 0) {
        // Change to 1 - hide
        settings.topSquare = 1;
        createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Currencies Display"], ["SETTINGSTATE", "Hidden"]]);
    }
    else if (settings.topSquare == true || settings.topSquare == 1) {
        // Change to 2 - compact
        settings.topSquare = 2;
        createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Currencies Display"], ["SETTINGSTATE", "Compact"]]);
    }
    else if (settings.topSquare == 2) {
        // Change to 0 - show full
        settings.topSquare = 0;
        createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Currencies Display"], ["SETTINGSTATE", "Visible"]]);
    }

    ui.topSquare.style.display = ["", "none", ""][settings.topSquare];
    ui.topSquareDisplay2.style.display = ["", "none", ""][settings.topSquare];

    updateTopSquare();
}

function topNotifs() {
    settings.topNotifs = (settings.topNotifs + 1) % 6;
    createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Amount of notifications shown"], ["SETTINGSTATE", settings.topNotifs]]);
}

function toggleHideMaxed() {
    updateUpgrades();
}

function toggleCurrent() {
    updateUpgrades();
}

function toggleArtifactImages() {
    updateArtifacts();
}

function toggleSettingDescriptions() {
    renderSettings();
}

// these five below are all for the Upgrade Colors setting
function changeUpgradeColors() {
    settings.upgradeColors = (upgradeColors[upgradeColors.indexOf(settings.upgradeColors) + 1] != undefined ? upgradeColors[upgradeColors.indexOf(settings.upgradeColors) + 1] : upgradeColors[0]);

    createNotification("SETTINGNAME is now SETTINGSTATE", [["SETTINGNAME", "Upgrade Colors "], ["SETTINGSTATE", settings.upgradeColors]]);

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

function exportCustomColors() {
    let exporter = JSON.stringify(settings.customColors);
    exporter = btoa(exporter);
    exporter = exporter.replace("W1", "colorshgabb");

    navigator.clipboard.writeText(exporter);
    createNotification("Custom colors exported to clipboard");
}

function importCustomColors() {
    let importGame = prompt("Import custom colors...");

    importGame = importGame.replace("colorshgabb", "W1");
    importGame = atob(importGame);
    importGame = JSON.parse(importGame);
    settings.customColors = importGame;
    updateUpgradeColors();

    createNotification("Custom colors imported");
}

var upgradeColorsRender = "";
function updateUpgradeColors() {
    if (settings.upgradeColors == "custom") {
        let ihText = "";

        ihText = "<div class='settingButton2' style='margin: 0 auto;'> <b>Custom colors: </b><br />";

        for (i = 0; i < 3; i++) {
            ihText = ihText + ["Affordable: ", "Too expensive: ", "Maxed: "][i]
            for (j = 0; j < 4; j++) {
                ihText = ihText + "<button class='grayButton' style='margin-left: 8px' onclick='changeCustomColor(" + i + "," + j + ")'>" + ["R", "G", "B", "T"][j] + settings.customColors[i][j] + "</button>";
            }
            ihText = ihText + "<br />";
        }
        ihText = ihText + "<br /><button class='grayButton' onclick='exportCustomColors()'>Export</button>";
        ihText = ihText + "<button class='grayButton' onclick='importCustomColors()'>Import</button></div>";

        upgradeColorsRender = ihText;
    }
    else {
        upgradeColorsRender = "";
    }
    if (currentSettingSection == 1) renderSettings();
}

///////////////////////////////////
// AUDIO FUNCTIONS
///////////////////////////////////
function toggleMusic() {
    wggj.audio.musicMuted = !settings.music;
    wggj.audio.musicPlayer.muted = wggj.audio.musicMuted;
    if (!wggj.audio.musicMuted) {
        //audioPlayMusic();
    }
}

function toggleAdMusic() {
    adHandler.muted = !(settings.music && settings.adMusic);
}

function toggleSounds() {
    wggj.audio.soundMuted = !settings.sounds;
}

function changeSong() {
    settings.song = (settings.song + 1) % songs.length;
    audioPlayMusic(songs[settings.song]);
}

function toggleAutoplaySongs() {
    wggjAudio.loop = !settings.autoplaySongs;
}

///////////////////////////////////
// SAVEFILE FUNCTIONS
// (some are in main.js)
///////////////////////////////////
function manualSave() {
    autoSaveTime = 0.15;
}

function redeemRewardCode() {
    let importRewardCode = prompt("Enter a valid Reward Code:");

    //importRewardCode = importRewardCode.replace("RED-", "ey");
    importRewardCode = atob(importRewardCode);
    importRewardCode = JSON.parse(importRewardCode);

    let rawExpiryDate = importRewardCode.EXPIRY.split("."); // format ie 07.02.2026
    let expiryDate = rawExpiryDate[2] + rawExpiryDate[1] + rawExpiryDate[0];

    // expired ?
    if (today() >= expiryDate) {
        alert("This code expired on: " + formatDate(expiryDate));
        return false;
    }

    // not for you ?
    if (importRewardCode.for != undefined && importRewardCode.for != ""
        && importRewardCode.for != game.profile.id.substr(0, importRewardCode.for.length)) {
        alert("This code is not for you!");
        return false;
    }

    // already used ?
    for (let rr of game.red_rew) {
        if (rr[0] == importRewardCode.ID) {
            alert("This code has already been redeemed!");
            return false;
        }
    }



    // take care of startVer and startDate
    let protectedRews = ["ID", "EXPIRY", "DISPLAYTEXT",
        "for", "startVer", "startDate"];

    if (importRewardCode.starVer != "") game.profile.startVer = importRewardCode.startVer;
    if (importRewardCode.starDate != "") game.profile.startVer = importRewardCode.startDate;

    // take care of other rewards
    for (rew in importRewardCode) {
        console.log(rew, importRewardCode[rew])
        if (rew == "") continue;
        if (protectedRews.includes(rew)) continue;
        if (typeof (game[rew]) == "object") game[rew] = game[rew].add(parseInt(importRewardCode[rew]));
        else game[rew] = game[rew] + parseInt(importRewardCode[rew]);
    }

    // display text
    if (importRewardCode.DISPLAYTEXT != "") alert(importRewardCode.DISPLAYTEXT);
    createNotification("Redeemed Reward Code successfully");

    // register as redeemed
    if (game.red_rew == undefined) game.red_rew == [];
    game.red_rew.push([importRewardCode.ID, importRewardCode.EXPIRY]);
    return true;
}

function exportSettings() {
    let exporter = JSON.stringify(settings);
    exporter = btoa(exporter);
    exporter = "shgabbSettings3x0vb" + exporter;

    navigator.clipboard.writeText(exporter);
    createNotification("Custom colors exported to clipboard!");
}

function importSettings() {
    let importGame = prompt("Import custom colors...");

    importGame = importGame.replace("shgabbSettings3x0vb", "");
    importGame = atob(importGame);
    importGame = JSON.parse(importGame);
    settings = importGame;

    updateEVERYTHING();
    createNotification("Custom colors imported");
}