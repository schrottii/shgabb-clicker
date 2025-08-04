// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.9";
const versionTitle = "";

const currentPatchNotes = `
-> Idle Mode:
- New feature unlocked from the start
- Found below Shgabb Upgrades
- Can be toggled on or off at any time
- It automatically clicks for you, as long as fridge is active
- 2x slower than manual clicking, and can't go faster than 1s
- Manual clicking gets disabled, but still refreshes Fridge
- Added separate Idle Clicks stat, changed Total Clicks to Normal Clicks, and added Total Clicks which combines both
- Idle clicks count the same for basically anything (getting Shgabb, Sandwiches, Artifact conditions, etc.)
- Its purpose is to make the game a lot more accessible for players who do not want to click buttons a lot, and prefer a more passive gameplay

-> Shbook:
- New background textures (higher resolution)
- Reworked design of the list buttons, with new colors and borders
- List is now scrollable when it gets long (Lore)
- Reduced effect when hovering over Shbook
- Changed headers for the currency/feature lists from Currenciary/Featuriary to Currencies/Features

-> Balance:
- Challenger: reduced effect slightly
- Snake Oil Salesman: boost goes away when you can't afford it anymore
- Snake Oil Salesman: Gem boost reduced from x2/x4/x6/x8 to x1.5/x3/x4.5/x6
- Tower: changed tier from 1 to 4 (as other legendaries)

-> Other:
- Fastest Clicks Achievement: can now be gotten with a cooldown below 0.2s
- Added lore chance and wisp chance (from Artifacts) to stats
- Amé converts now support break infinity
- Fixed hotkey selection not updating some stuff
- Fixed getting Dragon's Money Achievement from Hot Hot Summer Event
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