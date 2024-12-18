// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.3";
const versionTitle = "Earthwide Coldization";

const currentPatchNotes = [
    "-> Loading:",
    "- Changed how the game is loaded",
    "- A lot more stuff is now hidden while loading, to prevent confusion and spoilers",
    "- Added text to show the game is loading",
    "- Added notification when the game is done loading",
    "- Added error message if loading fails",
    "- Also tweaked ad loading a bit",

    "-> Améliorer:",
    "- Reset button now mentions the refund is 100%",
    "- Time until it's available again is now shown",

    "-> Stats:",
    "- Headers on the right side are now bold too",
    "- Moved Fishgang to below Shgic",

    "-> Other:",
    "- Updated WGGJ from v1.0 to v1.1",
    "- Social: changed info part a bit",
    "- Reduced the max size (slider) of patch notes and Shbook, because let's be honest, you are not THAT blind",
];

function generatePatchNotes() {
    ui.gameTitle.innerHTML = cImg("shgabb") + "   Shgabb Clicker v" + gameVersion + (BETA.isBeta ? " (BETA)" : "") + "   " + cImg("shgabb");

    let patchNotesText = "<b>Version v" + gameVersion + (versionTitle != "" ? " " + versionTitle : "") + ":</b>";
    for (p in currentPatchNotes) {
        if (currentPatchNotes[p].substr(0, 1) == "v") patchNotesText = patchNotesText + "<br /><br /><br /><b>Version v" + currentPatchNotes[p].substr(1) + ":</b>";
        else patchNotesText = patchNotesText + (p != 0 && currentPatchNotes[p - 1].substr(0, 1) != "v" && currentPatchNotes[p].substr(0, 2) == "->" ? "<br />" : "") + "<br />" + currentPatchNotes[p];
    }
    ui.patchNotes.innerHTML = patchNotesText;
}

function patchNotesSize() {
    ui.patchNotes.style.fontSize = ui.patchNotesSizeSlider.value + "px";
}