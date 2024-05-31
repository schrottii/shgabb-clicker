// Game made by Schrottii - editing or stealing is prohibited!

// sel 1: shgabb - sandwiches - gs - silicone - amé
// sel 2: gems - artifacts - shgic
// sel 3: cheats - stats - achievements - other (social, patch notes)
// sel 4: shbook: lore - currencies - features

var sections = {
    // sel 1
    shgabb: document.getElementById("shgabbSection"),
    sandwich: document.getElementById("sandwichSection"),
    goldenShgabb: document.getElementById("goldenShgabbSection"),
    siliconeShgabb: document.getElementById("siliconeShgabbSection"),
    ameliorer: document.getElementById("ameliorerSection"),
    bags: document.getElementById("bagSection"),

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
    lore: document.getElementById("loreSection"),
    currencies: document.getElementById("currenciesSection"),
    features: document.getElementById("featuresSection"),

    // sels
    selection1: document.getElementById("selection1"),
    selection2: document.getElementById("selection2"),
    selection3: document.getElementById("selection3"),
    selection4: document.getElementById("selection4"),
}

function renderSelection(sel) {
    let render = ``;
    let sels = [];

    // Buttons
    if (sel == 1) {
        sels = ["shgabb", "sandwich", "goldenShgabb", "siliconeShgabb", "ameliorer", "bags"];
        selsDisplay = [cImg("shgabb"), cImg("sandwich"), cImg("gs"), cImg("silicone"), cImg("ameliorer"), cImg("bag")];
    }
    if (sel == 2) {
        sels = ["gems", "artifacts", "challenges", "minigames", "events"];
        selsDisplay = [cImg("gem"), '<img class="currency" src="images/arti/ring.png" />', '<img class="currency" src="images/challenge1.png" />', '<img class="currency" src="images/achievements/ttt.png" />', '<img class="currency" src="images/currencies/gift.png" />'];
    }
    if (sel == 3) {
        sels = ["cheats", "playerprofile", "stats", "achievements", "settings", "social"];
        selsDisplay = ["Cheats", '<img class="currency" src="images/shgabbicon.png" />', '<img class="currency" src="images/currencies/qian.png" />', '<img class="currency" src="images/achievements/achievement.png" />', '<img class="currency" src="images/prestige.png" />', '<img class="currency" src="images/social/schrottii.png" />'];
    }
    if (sel == 4) {
        sels = ["lore", "currencies", "features"];
        selsDisplay = ["Lore", "Currenciary", "Featuriary"];
    }

    for (s in sels) {
        if (isSelectionUnlocked(sels[s])) render = render + `<button class="grayButton" style="background-color: ` + (selections[sel - 1] == sels[s] ? "yellow" : "white") + `" onclick="changeSelection(` + sel + `,'` + sels[s] + `')">` + selsDisplay[s] + `</button>`
    }
    sections["selection" + sel].innerHTML = render;

    // Selection
    sections["cheats"].style.display = "none";
    for (s in sels) {
        if (selections[sel - 1] == sels[s]) sections[sels[s]].style.display = "unset";
        else sections[sels[s]].style.display = "none";
    }
}

function selection(name) {
    if (selections[0] == name || selections[1] == name || selections[2] == name) return true;
    return false;
}

function isSelectionUnlocked(name) {
    if (typeof (knifeBoost) == "undefined") return false;
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

        case "gems":
            return unlockedGems();
        case "artifacts":
            return unlockedArtifacts();
        case "challenges":
            return unlockedChallenges();
        case "minigames":
            return unlockedAmeliorer();
        case "events":
            return isEvent("", true);

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

        case "lore":
            return true;
        case "currencies":
            return true;
        case "features":
            return true;
    }
}

function renderAllSelection() {
    renderSelection(1);
    renderSelection(2);
    renderSelection(3);
    renderSelection(4);
}

var selections = ["shgabb", "none", "social", "lore"];

function changeSelection(sel, sels) {
    if (selections[sel - 1] == sels) selections[sel - 1] = "none";
    else selections[sel - 1] = sels;

    renderSelection(sel);
}
