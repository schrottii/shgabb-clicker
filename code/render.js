// Game made by Schrottii - editing or stealing is prohibited!

// sel 1: shgabb - sandwiches - gs - silicone - amé - bags - copper - bananas
// sel 2: gems - artifacts - shgic
// sel 3: cheats - stats - achievements - other (social, patch notes)
// sel 4: shbook: lore - currencies - features - events

var selectedSelection = 1;

var sections = {
    // sel 1
    shgabb: document.getElementById("shgabbSection"),
    sandwich: document.getElementById("sandwichSection"),
    goldenShgabb: document.getElementById("goldenShgabbSection"),
    siliconeShgabb: document.getElementById("siliconeShgabbSection"),
    ameliorer: document.getElementById("ameliorerSection"),
    bags: document.getElementById("bagSection"),
    copper: document.getElementById("copperShgabbSection"),
    bananas: document.getElementById("bananaSection"),

    // sel 2
    gems: document.getElementById("gemSection"),
    artifacts: document.getElementById("artifactSection"),
    challenges: document.getElementById("challengeSection"),
    minigames: document.getElementById("minigamesSection"),
    events: document.getElementById("eventsSection"),

    // sel 3
    cheats: document.getElementById("cheatSection"),
    playerprofile: document.getElementById("playerprofileSection"),
    stats: document.getElementById("statsSection"),
    achievements: document.getElementById("achievementsSection"),
    settings: document.getElementById("settingsSection"),
    social: document.getElementById("socialSection"),

    // sel 4
    shbook1: document.getElementById("shbookSection"),
    shbook2: document.getElementById("shbookSection"),
    shbook3: document.getElementById("shbookSection"),
    shbook4: document.getElementById("shbookSection"),
    shbook5: document.getElementById("shbookSection"),

    // sels
    selection1: document.getElementById("selection1"),
    selection2: document.getElementById("selection2"),
    selection3: document.getElementById("selection3"),
    selection4: document.getElementById("selection4"),
}

var selections = ["shgabb", "none", "social", "shbook2"];
var selectionTypes = [
    ["shgabb", "sandwich", "goldenShgabb", "siliconeShgabb", "ameliorer", "bags", "copper", "bananas"],
    ["gems", "artifacts", "challenges", "minigames", "events"],
    ["cheats", "playerprofile", "stats", "achievements", "settings", "social"],
    ["shbook1", "shbook2", "shbook3", "shbook4", "shbook5"]
    ];

function renderSelection(sel) {
    let render = ``;
    let sels = [];

    // Buttons
    sels = selectionTypes[sel - 1];
    if (sel == 1) {
        selsDisplay = [cImg("shgabb"), cImg("sandwich"), cImg("gs"), cImg("silicone"), cImg("ameliorer"), cImg("bag"), cImg("copper"), cImg("banana")];
    }
    if (sel == 2) {
        selsDisplay = [cImg("gem"), '<img class="currency" src="images/arti/ring.png" />', '<img class="currency" src="images/challenges/challenge1.png" />', '<img class="currency" src="images/achievements/ttt.png" />', '<img class="currency" src="images/currencies/gift.png" />'];
    }
    if (sel == 3) {
        selsDisplay = ["Cheats", '<img class="currency" src="images/playerprofile/icon.png" />', '<img class="currency" src="images/stats.png" />', '<img class="currency" src="images/achievements/achievement.png" />', '<img class="currency" src="images/settings.png" />', '<img class="currency" src="images/social/schrottii.png" />'];
    }
    if (sel == 4) {
        selsDisplay = ["Lore", "Currenciary", "Featuriary", "Upgrade Calculator", "Events"];
    }

    // render le area
    let bgColor = "white";
    for (s in sels) {
        bgColor = selections[sel - 1] == sels[s] ? "rgb(186, 186, 48)" : "rgb(225, 225, 225)";
        if (sels[s] == "challenges" && game.dclg.length > 0 && game.stats.hms >= 10000) bgColor = "rgb(255, 78, 78)";
        if (sels[s] == "minigames" && canPlayTTT) bgColor = "rgb(255, 78, 78)";

        if (isSelectionUnlocked(sels[s], selsDisplay)) render = render + `<button class="grayButton sectionSelection" style="border-color: ` + (selectedSelection == sel ? "darkorange" : rgbManipulator(bgColor, 0.75)) + `; background-color: ` + bgColor + `" onclick="changeSelection(` + sel + `,'` + sels[s] + `')">` + selsDisplay[s] + `</button>`
    }
    sections["selection" + sel].innerHTML = render;

    // Selection
    sections["cheats"].style.display = "none";
    for (s in sels) {
        if (selections[sel - 1] == sels[s]) sections[sels[s]].style.display = "unset";
        else if (sel != 4) sections[sels[s]].style.display = "none";
    }
}

function selection(name) {
    if (selections[0] == name || selections[1] == name || selections[2] == name) return true;
    return false;
}

function isSelectionUnlocked(name, name2 = "") {
    switch (name) {
        case "shgabb":
            return true;
        case "sandwich":
            return unlockedSandwiches();
        case "goldenShgabb":
            return unlockedGS();
        case "siliconeShgabb":
            return unlockedSilicone();
        case "ameliorer":
            return unlockedAmeliorer();
        case "bags":
            return unlockedBags();
        case "copper":
            return unlockedCopper();
        case "bananas":
            return unlockedBananas();

        case "gems":
            return unlockedGems();
        case "artifacts":
            return unlockedArtifacts();
        case "challenges":
            return unlockedChallenges();
        case "minigames":
            return unlockedAmeliorer();
        case "events":
            return isEvent("any");

        case "cheats":
            return BETA.isBeta;
        case "playerprofile":
            return game.stats.hms >= 100;
        case "stats":
            return true;
        case "achievements":
            return true;
        case "settings":
            return true;
        case "social":
            return true;

        case "shbook1":
            return game.stats.hms >= 4000;
        case "shbook2":
            return game.stats.hms >= 25;
        case "shbook3":
            return game.stats.hms >= 25;
        case "shbook4":
            return game.stats.hms >= 25;
        case "shbook5":
            return game.stats.hms >= 2000;

        case "none":
            return true;
    }
}

function renderAllSelection(auto = false) {
    renderSelection(1);
    renderSelection(2);
    renderSelection(3);
    renderSelection(4);

    // custom onclicks
    if (selections[2] == "playerprofile") renderPlayerProfile();
    renderShbook(auto);
    if (selections[0] == "shgabb") renderIdleMode();
    if (selections[2] == "settings") renderSettings();

    if (selections[1] == "minigames") {
        if (!wggj.time.running) {
            let ww = settings.sidebar ? 0.95 : 1;
            wggj.canvas.quadratic = true;
            wggj.canvas.mobileWidthMulti = 0.96 * ww;
            wggj.canvas.mobileHeightMulti = 0.96 * ww / 1.7777777777777777777777777777778;
            wggj.canvas.pcWidthMulti = 0.8 * ww;
            wggj.canvas.pcHeightMulti = 0.8 * ww / 1.7777777777777777777777777777778;

            wggj.time.running = true;
            wggjLoop();
        }
    }
    else if (wggj.time.running) {
        wggj.time.running = false;
    }
}

function changeSelection(sel, sels) {
    if (selections[sel - 1] == sels) selections[sel - 1] = "none";
    else selections[sel - 1] = sels;

    selectedSelection = sel;

    audioPlaySound("click");
    renderAllSelection();
}