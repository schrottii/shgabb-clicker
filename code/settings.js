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
        return `<button id="set` + count + `" onclick="onSettingClick('` + this.getVariable() + `'); ` + this.clickFunction + `(); renderSettings();" class="settingButton">` +
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
    new ToggleSetting("gameplay", "toggleConfirm", "confirm", "Confirmation Dialogs", "If this setting is disabled, most confirmation dialogs stop appearing, including Prestige and destroying Artifacts."),
    new ToggleSetting("gameplay", "toggleThreeBars", "threeBars", "Three Bars", "If this setting is disabled, the three bars at the top are hidden. Ineffective before unlocking Sandwiches."),
    new ToggleSetting("gameplay", "togglePreferMS", "preferMS", "Prefer More Shgabb", "When enabled, and trying to buy a Shgabb Upgrade, the game will buy More Shgabb instead if it's cheaper. Works with buy max too."),
    new ToggleSetting("gameplay", "toggleBoostFilters", "boostFilters", "Show Artifact Boost Filters", "When enabled, Artifact Boost Filters are visible. They can be used to quickly filter the Artifact inventory for certain types of Artifacts."),
    new ToggleSetting("gameplay", "toggleSidebar", "sidebar", "Sidebar", "The left side gets replaced with the Sidebar, offering a constant click button, currency overview and more"),
    new Setting("gameplay", "adjustSidebarWidth", "Sidebar Width", "Change size of the sidebar", () => "Current: " + settings.sidebarWidth),
    new Setting("gameplay", "startTutorial", "Tutorial", "Repeat the tutorial", () => ""),

    // design
    new ToggleSetting("design", "toggleBG", "background", "Black Background", "When enabled, the background image gets replaced by a black color. Also active during events."),
    new ToggleSetting("design", "allowEventBG", "eventBG", "Allow custom BG in events", "When enabled, the background image is different during events. When disabled, the background image is always the normal one."),
    new Setting("design", "toggleCurrenciesDisplay", "Currencies Display", "Change the Top/Currencies display. Compact mode removes their names and productions.", () => "Current: " + ["Visible", "Hidden", "Compact"][typeof (settings.topSquare) != "boolean" ? settings.topSquare : (settings.topSquare == true ? 1 : 0)]),
    new Setting("design", "topNotifs", "Top Notification Amount", "Adjust how many of the most recent notifications are shown at the top.", () => "Current: " + settings.topNotifs),
    new ToggleSetting("design", "hideMaxed", "hideMaxed", "Hide Maxed Upgrades", "When enabled, upgrades that are at max. level are hidden. When disabled, they simply appear in a different color."),
    new ToggleSetting("design", "toggleCurrent", "displayCurrent", "Current Effect Display", "When enabled, a few upgrades show more details about their boost"),
    new ToggleSetting("design", "toggleArtifactImages", "artifactImages", "Show Artifact Images", "If this is disabled, the images of Artifacts are hidden. Can make the Artifact inventory more clear."),
    new ToggleSetting("design", "toggleSettingDescriptions", "settingDesc", "Show Setting Descriptions", "When enabled, descriptions for settings are shown. Disable to achieve more compact settings."),
    new Setting("design", "toggleUpgradeColors", "Upgrade Colors", "Adjust the colors of the three types of upgrades (can afford, too expensive, maxed)!", () => "Current: " + settings.upgradeColors),
    new Setting("design", "updateEVERYTHING", "Refresh page", "Updates everything UI-related", () => "Last full update: " + timeSinceFullUIUpdate),
    new ToggleSetting("design", "togglePopups", "popups", "Toggle Popups", "The large notifications that appear when you get an Artifact or Achievement"),

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
    new Setting("save", "redeemCode", "Redeem Code", "Use this to import a special gift from Schrottii. They are given out extremely rarely.", ""),
    new Setting("save", "exportSettings", "Export Settings", "[EXPORT - SETTINGS CODE] Copy the a code for settings to the clipboard. Store it somewhere and use it to load this set of settings later.", ""),
    new Setting("save", "importSettings", "Import Settings", "[IMPORT - SETTINGS CODE] Import a settings code, obtained from the Export Settings setting.", ""),
]

// GENERAL SETTING FUNCTIONS
function onSettingClick(toggle) {
    if (toggle != "false") settings[toggle] = !settings[toggle];
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
        render = render + `<button class="grayButton" style="background-color: ` + (currentSettingSection == r ? "yellow" : "white") + `" onclick="settingsSet(` + r + `)">` + settingSectionsDisplay[r] + `</button>`;
    }

    render = render + "<br /><h3>" + settingSectionsDisplay[currentSettingSection] + "</h3><div class='upgradesContainer'>";

    for (let s in settingButtons) {
        if (settingButtons[s].category == settingSections[currentSettingSection]) {
            render = render + settingButtons[s].render(counter);
            counter++;

            if (settingButtons[s].title == "Import from file") render = render + `<br style='clear: both' /><input id="myFile" type="file"><br style='clear: both' />`;
        }
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
    createNotification("New notation: " + settings.notation);
    updateUpgrades();
}

function toggleUnlevel() {
    createNotification("Unlevel button " + (settings.hideUnlevel ? "ON" : "OFF"));
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
    createNotification("No upgrading " + (settings.noUpgrading ? "ON" : "OFF"));
    updateUpgrades();
}

function toggleNoAds() {
    createNotification("No ads " + (settings.noAds ? "ON" : "OFF"));
    currentBoost = "none";
    adTime = 15;
}

function toggleConfirm() {
    createNotification("Confirmation dialogs " + (settings.confirm ? "ON" : "OFF"));
}

function toggleThreeBars() {
    createNotification("Three Bars " + (settings.threeBars ? "ON" : "OFF"));
}

function togglePreferMS() {
    createNotification("Prefer More Shgabb " + (settings.preferMS ? "ON" : "OFF"));
}

function toggleBoostFilters() {
    createNotification("Artifact Boost Filters " + (settings.boostFilters ? "ON" : "OFF"));

    updateArtifacts();
}

function toggleSidebar() {
    createNotification("Sidebar " + (settings.sidebar ? "ON" : "OFF"));

    if (settings.sidebar) {
        ui.SIDEBAR.style.display = "";
        ui.SIDEBAR.style.width = settings.sidebarWidth + "%";
        changeSidebarWidth();
    }
    else {
        ui.SIDEBAR.style.display = "none";
        ui.GAMECONTENT.style.width = "100%";
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
    createNotification("Black Background " + (settings.background ? "ON" : "OFF"));
    updateBG();
}

function allowEventBG() {
    createNotification("Custom background in events " + (settings.eventBG ? "ON" : "OFF"));

    updateBG();
}

function toggleCurrenciesDisplay() {
    if (settings.topSquare == false || settings.topSquare == 0) {
        // Change to 1 - hide
        settings.topSquare = 1;
        createNotification("Currencies Display Hidden");
    }
    else if (settings.topSquare == true || settings.topSquare == 1) {
        // Change to 2 - compact
        settings.topSquare = 2;
        createNotification("Currencies Display Compact");
    }
    else if (settings.topSquare == 2) {
        // Change to 0 - show full
        settings.topSquare = 0;
        createNotification("Currencies Display Visible");
    }

    ui.topSquare.style.display = ["", "none", ""][settings.topSquare];
    ui.topSquareDisplay2.style.display = ["", "none", ""][settings.topSquare];

    updateTopSquare();
}

function topNotifs() {
    settings.topNotifs = (settings.topNotifs + 1) % 6;
    createNotification("Amount of notifications shown: " + settings.topNotifs);
}

function hideMaxed() {
    createNotification("" + (settings.hideMaxed ? "HIDE maxed" : "SHOW maxed"));
    updateUpgrades();
}

function toggleCurrent() {
    createNotification("Current Effect " + (settings.displayCurrent ? "ON" : "OFF"));
    updateUpgrades();
}

function toggleArtifactImages() {
    createNotification("Artifact images " + (settings.artifactImages ? "ON" : "OFF"));

    updateArtifacts();
}

function toggleSettingDescriptions() {
    createNotification("Setting Descriptions " + (settings.settingDesc ? "ON" : "OFF"));

    renderSettings();
}

function togglePopups() {
    createNotification("Popups " + (settings.popups ? "ON" : "OFF"));
}

// these five below are all for the Upgrade Colors setting
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
    createNotification("Music " + (settings.music ? "ON" : "OFF"));
    wggj.audio.musicMuted = !settings.music;
    wggj.audio.musicPlayer.muted = wggj.audio.musicMuted;
    if (!wggj.audio.musicMuted) {
        //audioPlayMusic();
    }
}

function toggleAdMusic() {
    createNotification("Ad Music " + (settings.adMusic ? "ON" : "OFF"));
    adHandler.muted = !(settings.music && settings.adMusic);
}

function toggleSounds() {
    createNotification("Sounds " + (settings.sounds ? "ON" : "OFF"));
    wggj.audio.soundMuted = !settings.sounds;
}

function changeSong() {
    settings.song = (settings.song + 1) % songs.length;
    audioPlayMusic(songs[settings.song]);
}

function toggleAutoplaySongs() {
    wggjAudio.loop = !settings.autoplaySongs;
    createNotification("Autoplay Songs " + (settings.autoplaySongs ? "ON" : "OFF"));
}

///////////////////////////////////
// SAVEFILE FUNCTIONS
// (some are in main.js)
///////////////////////////////////
function manualSave() {
    autoSaveTime = 0.15;
}

function redeemCode() {
    let importGame = prompt("Import code...");

    importGame = importGame.replace("RED-", "ey");
    importGame = atob(importGame);
    importGame = JSON.parse(importGame);

    if (importGame.for == game.profile.id.substr(0, 6)) {
        switch (importGame.type) {
            case "startVer":
                game.profile.startVer = importGame.data;
                break;
            case "startDay":
                game.profile.startDay = importGame.data;
                break;
        }
        createNotification("Redeemed successfully");
    }
    else {
        createNotification("This is not for you!");
    }
}

function createRedeemCode() {
    // please do not use this if you are not schrottii
    // you dirty cheater :'(
    var redeemCode = {};
    redeemCode.for = prompt("123456");
    redeemCode.type = prompt("type");
    redeemCode.data = prompt("data 20230106");
    redeemCode = JSON.stringify(redeemCode);
    redeemCode = btoa(redeemCode);
    redeemCode = redeemCode.replace("ey", "RED-");

    return redeemCode;
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