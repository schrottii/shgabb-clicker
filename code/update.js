// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.5.1";
const versionTitle = "";

const currentPatchNotes = `
-> Events:
- New Event info UI, for all seven Events
- For consistent design and better readability

-> Auto:
- Fridge time gets reduced to max. if it's above it (ie opening game while having Thaw equipped)
- Auto info: aligned its texts to a new type of layout
- Auto info: Fridge time can no longer go below 0

-> Other:
- Joke ad names are now bold
- Shgabb image in click button can now be clicked through

-> Bug fixes:
- Fixed music and sounds not being properly muted when starting the game
- Fixed Gem Shgabb Boost visual issue
- Fixed Genpoints notification before unlock
- Fixed texts for export/import Settings
- Fixed issue with Setting sections that aren't Gameplay
- Fixed Qian offer issue
`.split("\n");
currentPatchNotes.splice(0, 1);

function generatePatchNotes() {
    ui.gameTitle.innerHTML = cImg("shgabb") + "   Shgabb Clicker v" + gameVersion + (BETA.isBeta ? " (BETA)" : "") + "   " + cImg("shgabb");

    let patchNotesText = "<b>Version v" + gameVersion + (versionTitle != "" ? " " + versionTitle : "") + ":</b>";
    for (p in currentPatchNotes) {
        if (currentPatchNotes[p].substr(0, 1) == "v") patchNotesText = patchNotesText + "<br /><br /><br /><b>Version v" + currentPatchNotes[p].substr(1) + ":</b>";
        else patchNotesText = patchNotesText + "<br />" + currentPatchNotes[p];
    }
    ui.patchNotes.innerHTML = patchNotesText;
}

function patchNotesSize() {
    ui.patchNotes.style.fontSize = ui.patchNotesSizeSlider.value + "px";
}