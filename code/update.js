// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.6";
const versionTitle = "";

const currentPatchNotes = `
-> Daily Challenge:
- New feature: Daily Challenge (10k HMS)
- Every day, random Artifacts are chosen (same for everyone)
- Get as far as you can with those Artifacts
- Artifacts can't be changed at all during the Challenge to prevent exploiting
- Costs 10 Gems to enter, no HMS requirement
- Rewards 1 Daily Challenge Point for every HMS
- Rewards 1 Gem for every 150 HMS
- Daily Challenge Points serve no use yet, but soon they will

-> Pride Event:
- The Pride Event is back for Year 2
- Duration changed to June 1st - June 14th (7 days earlier, 15 days -> 14 days)
- Added 3 Frames, gathered like the PFPs
- Finding a couple now gives 20 Gems (previously no gameplay rewards)
- Added Found couples stat (sorry those who grinded last year!)
- Increased chance to find someone from 20% to 33.3%
- Changed "United against loneliness" from 1 PFP to all PFPs
- Changed "United Love" from all PFPs to all Frames
- Updated event description

-> Other:
- Changed setting button colors
- New image for Player Profile section
- Changed generation of patch notes
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