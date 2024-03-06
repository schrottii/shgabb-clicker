// Game made by Schrottii - editing or stealing is prohibited!

// sel 1: shgabb - sandwiches - gs - silicone - amé
// sel 2: gems - artifacts - shgic
// sel 3: cheats - stats - achievements - other (social, patch notes)

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

    // sels
    selection1: document.getElementById("selection1"),
    selection2: document.getElementById("selection2"),
    selection3: document.getElementById("selection3"),
}

function renderSelection(sel) {
    let render = ``;
    let sels = [];

    // Buttons
    if (sel == 1) {
        sels = ["shgabb", "sandwich", "goldenShgabb", "siliconeShgabb", "ameliorer", "bags"];
        selsDisplay = ["Shgabb", "Sandwiches", "Golden Shgabb", "Silicone Shgabb", "Améliorer", "Bags"];
    }
    if (sel == 2) {
        sels = ["gems", "artifacts", "challenges", "minigames", "events"];
        selsDisplay = ["Gems", "Artifacts", "Challenges", "Minigames", "Events"];
    }
    if (sel == 3) {
        sels = ["cheats", "playerprofile", "stats", "achievements", "settings", "social"];
        selsDisplay = ["Cheats", "Player Profile", "Stats", "Achievements", "Settings", "Social"];
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
    }
}

function renderAllSelection() {
    renderSelection(1);
    renderSelection(2);
    renderSelection(3);
}

var selections = ["shgabb", "none", "social"];

function changeSelection(sel, sels) {
    if (selections[sel - 1] == sels) selections[sel - 1] = "none";
    else selections[sel - 1] = sels;

    renderSelection(sel);
}
