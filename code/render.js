// Game made by Schrottii - editing or stealing is prohibited!

// sel 1: shgabb - sandwiches - gs - silicone - amé
// sel 2: gems - artifacts - shgic
// sel 3: cheats - stats - achievements - other(social, patch notes)

var sections = {
    // sel 1
    shgabb: document.getElementById("shgabbSection"),
    sandwich: document.getElementById("sandwichSection"),
    goldenShgabb: document.getElementById("goldenShgabbSection"),
    siliconeShgabb: document.getElementById("siliconeShgabbSection"),
    ameliorer: document.getElementById("ameliorerSection"),

    // sel 2
    gems: document.getElementById("gemSection"),
    artifacts: document.getElementById("artifactSection"),
    minigames: document.getElementById("minigamesSection"),

    // sel 3
    cheats: document.getElementById("cheatSection"),
    stats: document.getElementById("statsSection"),
    achievements: document.getElementById("achievementsSection"),
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
        sels = ["shgabb", "sandwich", "goldenShgabb", "siliconeShgabb", "ameliorer"];
        selsDisplay = ["Shgabb", "Sandwiches", "Golden Shgabb", "Silicone Shgabb", "Améliorer"];
    }
    if (sel == 2) {
        sels = ["gems", "artifacts", "minigames"];
        selsDisplay = ["Gems", "Artifacts", "Minigames"];
    }
    if (sel == 3) {
        sels = ["stats", "achievements", "social"];
        selsDisplay = ["Stats", "Achievements", "Social"];
        if (BETA.isBeta) {
            sels.unshift("cheats");
            selsDisplay.unshift("Cheats");
        }
    }

    for (s in sels) {
        render = render + `<button class="settingButton" style="background-color: ` + (selections[sel - 1] == sels[s] ? "yellow" : "white") + `" onclick="changeSelection(` + sel + `,'` + sels[s] + `')">` + selsDisplay[s] + `</button>`
    }
    sections["selection" + sel].innerHTML = render;

    // Selection
    sections["cheats"].style.display = "none";
    for (s in sels) {
        if (selections[sel - 1] == sels[s]) sections[sels[s]].style.display = "unset";
        else sections[sels[s]].style.display = "none";
    }
}

function renderAllSelection() {
    renderSelection(1);
    renderSelection(2);
    renderSelection(3);
}

var selections = ["shgabb", "minigames", "social"];

function changeSelection(sel, sels) {
    if (selections[sel - 1] == sels) selections[sel - 1] = "none";
    else selections[sel - 1] = sels;

    renderSelection(sel);
}




renderAllSelection();