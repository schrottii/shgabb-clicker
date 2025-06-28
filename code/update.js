// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.7";
const versionTitle = "";

const currentPatchNotes = `
2025/06/28 v3.7:
-> Events and Etenvs:
- Added Events section to Shbook, showing all Events, with their descriptions and cosmetics!
- Added Etenvs, new token currency unlocked at HMS 10 000
- Gain one Etenv during every event
- Everyone who plays now also gets one Etenv for free, to try it! (if unlocked)
- Spend one Etenv and 10 000 Gems to summon an Event for 24 hours
- Summoning is done in the Shbook, on the Event's page
- Summoned Events are the same as real ones, with their boosts, cosmetics, Achievements and everything else
- Note: Hot Hot Summer and Shgabb the Witch do not have their Year 2 versions yet
- Added Shbook entry and stats for Etenvs and Events summoned

-> Fishgang:
- Now framerate independent
- Improved design for player level/bar, including your PFP
- Bar fill is now based on progress to next level, rather than total

-> Design:
- Cut down exclamation mark usage
- Removed hearty wording from the info section

-> Other:
- Sections for Challenges and Minigames get a red background when their daily isn't complete yet
- Added Setting to disable Popups (new Artifacts, duplicates, Achievements)
- Finding or unlocking a lore page shows its name
- Code and file organization improvements
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