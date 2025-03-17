// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.5";
const versionTitle = "This Update Is Bananas";

const currentPatchNotes = [
    "-> Bananas:",
    "- New main currency! Unlocked at 15k HMS",
    "- Added Banana Seeds, Banana Trees (and their UI) and 3 Upgrades",
    "- Added stats for Bananas, Seeds and Trees",
    "- Added Bananas Currenciary entry",
    "- Added 10 Banana Achievements (200 total)",

    "-> How Bananas work:",
    "- You can get Banana Seeds from Prestige",
    "- The chance increases up to 18% at 15 minutes since last prestige, nothing gained below 1 minute",
    "- A seed can be used to create a Banana Tree, of which you can have up to 4",
    "- Every click there is a chance for every tree to produce Bananas",
    "- The Bananas need to be claimed from the trees, but it has a chance of destroying the tree",
    "- Every day where you play the trees age, increasing their production but also their death chance",

    "-> Banana Upgrades:",
    "- Bananas can be spent on three upgrades:",
    "- Banana Chance (9 levels) - higher chance to get Bananas",
    "- More Sandwiches - a simple Sandwich boost",
    "- Wisdomnana - get more GS for every unclaimed Banana",

    "-> Other:",
    "- Hovering over the Shbook now increases its contrast rather than just brightness",
    "- (Experimental) Changed font of Shbook texts",
    "- The three bars now tell what they are for (Auto, Fridge, Prestige)",
    "- The link to SC2FMFR now links to the galaxy version if you are playing on galaxy"
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