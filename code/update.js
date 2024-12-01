// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.3.1";
const versionTitle = "";

const currentPatchNotes = [
    "-> Artifacts:",
    "- Added 5 new Artifacts (2 common, 3 rare, 85 total)",
    "- Added Boost Filters (see section below)",
    "- Artifact Search now supports / as an OR-operator",
    "- Changed names of Artifact loadout export and import buttons from E and I to Exp. and Imp.",
    "- Fixed Surgeon bug, and its boost is now displayed in the Prestige text",

    "-> Boost Filters:",
    "- Added Boost Filters to Artifacts / search",
    "- These allow simple and direct filtering for the 16 simple boost and special Artifacts",
    "- Shgabb, Click Shgabb, Auto Shgabb, Reset Shgabb, Sandwiches, GS, Prestige GS, Silicone, Cooldown, Gem chance, Gem amount, Artifacts, Click Silicone, Bags, Copper, Copper chance and special Artifacts",
    "- Special Artifacts include Obama, Hood Goo, Fart and others",
    "- Added images for them",
    "- Boost Filters can be combined with the search (AND-operator)",
    "- Added a setting to hide Boost Filters",

    "-> Other:",
    "- Added 2 new lore pages (20 total)",
    "- The GS earned in a Prestige is now added to the GS this Prestige stat",



    "v3.3 Framed Pages",
    "-> Player Profile:",
    "- Added Frames, a new type of decoration!",
    "- Added 3 normal Frames (unlocked at 0, 6000, 8000 HMS) + No Frame",
    "- Added a selection: PFPs, Banners, Frames or All",
    "- Added names for ALL PFPs, Banners and Frames",
    "- Added new buttons: Random PFP, Random Banner and Random Frame",
    "- Moved PFP a bit more to the left",

    "-> Lore:",
    "- Lore pages are now found randomly, rather than in order",
    "- Increased page storage from 4 to 5",
    "- Re-wrote lore info text",
    "- Added more info to the info page",
    "- Added 3 new lore pages (18 total)",
    "- Reduced Memory Wisps needed from a flat 10 for every page to: 4, 4, 4, 6, 10 (and 3, 3, 3 for the new ones)",

    "-> Other:",
    "- Changed images for Ring and Amulet Artifacts",
    "- Improved minigame performance after switching to a different selection",
    "- Re-organized some image files"
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