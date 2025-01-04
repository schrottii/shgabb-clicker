// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.6";
const versionTitle = "Secolnd Birthday";

const currentPatchNotes = [
    "-> Anniversary Event:",
    "- The Anniversary Event is back for Year 2",
    "- Same duration: January 6th - January 20th",
    "- Added description (before it only was a list of boosts)",
    "- Added a bar to display Cake progress",
    "- New Achievement: It's A Celebration (Get all 8 Anniversary Event cosmetics) (183 total)",

    "-> Anniversary Event Cosmetics:",
    "- No new PFPs (still 3)",
    "- Added 3 Banners",
    "- Added 2 Frames",
    "- One of the Banners is special, and is given to everyone who plays the event this year!",
    "- This event's cosmetics are now gathered by eating Cake",
    "- PFPs were tied to the Achievements before, those who gained them that way get to keep them",

    "-> Special Cosmetics:",
    "- Special Cosmetics are PFPs, Banners or Items that have an unusually high resolution, are animated or have some other special thing",
    "- There are only two of them for now: default Shgabb PFP and Two Years of Shgabb Banner (new)",
    "- They are marked with a yellow outline",
    "- Similarly, equipped Cosmetics now have a green outline",
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