// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.0";
const versionTitle = "";

const currentPatchNotes = `
-> The Mine:
- New minigame/feature, unlocked at HMS 12k
- Explore the mine and collect resources
- Move into the four directions by clicking-hovering
- There can be walls and water
- To mine something, walk on it, and then click the click button or get auto prod x times
- Golden Shgabb: 40, previous Prestige GS / 10
- Silicone Shgabb: 20, click Silicone * 10
- Copper Shgabb: 10, Copper worth one click
- Added stats: time, tiles walked, total progress, GS, Silicone, Copper

-> Minigames:
- New Minigame (12k): The Mine
- Graphical improvements for Shgic and Fishgang (see below)
- Added black fade transitions between the minigames

-> Shgic:
- Added a fade in animation when placing Xs and Os
- Added a delay before the enemy plays (no longer instant)
- Added a delay before board gets cleared
- Re-added the infamous kiss animation, now auto save independent, much faster and smoother
- Fixed top and bottom bar color change being inverted (light blue when idle, rather than after clicking)

-> Fishgang:
- Moved Fishgang unlock from 12k to 5k
- Added fade in/out animation for fish/trash images
- Gave Bobby more meds and animations
- Slider now changes color according to the 4 quarters (yellow, orange, red, blue)
- Increased size of Throw, Trash, Fish and Value texts
- Reduced PFP size
- Level up bar: light blue -> dark blue
- Level up text: dark blue -> white
- Added time stat (sadly not retroactive)

-> Sidebar:
- Experimental new feature (must be enabled by Setting)
- Takes up the left 20% of the screen, the rest gets reduced to 80%
- Always on the screen, no scrolling
- Contains click button, Idle Mode, currencies and notifications

-> Other:
- Moved Chengas unlock from 5k to 7k
- New Setting: (Experimental) Sidebar
- Updated WGGJ from v1.2.1 to v1.4
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