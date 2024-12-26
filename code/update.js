// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.4";
const versionTitle = "Set Cold";

const currentPatchNotes = [
    "-> Settings:",
    "- Added descriptions for settings!",
    "- Changed design of settings",
    "- Sorted and re-arranged lots of settings",
    "- Whether toggle options are currently Enabled or Disabled is now green/red",
    "- Changed category of Current Effect Display from design to gameplay, and Refresh page from savefile to design",
    "- Custom Colors: swapped position of export and import",

    "-> New settings:",
    "- (Gameplay:) Three Bars",
    "- (Gameplay:) Prefer More Shgabb",
    "- (Audio:) Sounds",
    "- (Savefile:) Export Settings",
    "- (Savefile:) Import Settings",

    "-> Christmas Event:",
    "- Changed average time per Gift from 250s to 180s",
    "- Increased cosmetic chance from 0.5% to 2%, reduced Gem chance from 19.5% to 18%",
    "- This changes the average time to collect all 10 cosmetics from 138 hours to 25 hours, 2000 Gifts to 500 Gifts",
    "- Latest Gift content now includes cosmetics",
    "- Event description now mentions Gifts from Shgic (still 10/day)",
    "- Fixed render issue",

    "-> Other:",
    "- Gave the loading/crash text a black background for better readability, and gave names to the loading steps",
    "- Some smaller improvements",
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