// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.7";
const versionTitle = "B-Cold";

const currentPatchNotes = [
    "-> Minigames:",
    "- Minigames now only run if selected, otherwise, absolutely nothing happens (improved performance)",
    "- Shgic: Added a 0.2s cooldown after clicking, to prevent accidental double clicks",
    "- Shgic: Made the grid prettier",
    "- Fishgang: Removed Your Mom and Pirate Piss, added Brick, Broken Key, Glass Shard and Fake Fish",

    "-> Minigames Selection:",
    "- If Fishgang isn't unlocked yet, it now says Locked",
    "- Added a background behind the list of minigames",
    "- Increased size of minigame names",
    "- Split Shgic's full name into two lines",
    '- Changed "Play Da Game" text to "Play Minigame"',
    "- Sped up CD animations",
    "- Fixed CD being slightly too low after being put back (Fishgang locked)",

    "-> Shbook:",
    "- Added a list of all unlocks to the Featuriary (new Unlocks entry)",
    "- Changed the Shbook entry to have its list on the left side too",
    "- Lore page 10% GS boost is now base",
    "- The upgrade turns it exponential instead",

    "-> Design:",
    "- Moved the three bars from between the click button and notifications, to between notifications and top currencies display",
    "- Added black backgrounds behind the quote and recent notifications",

    "-> Other:",
    "- The cooldown notification now shows a second decimal if the cooldown is less than 0.1s",
    "- Fixed Anniversary Event lasting too long",
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