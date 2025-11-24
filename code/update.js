// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.3";
const versionTitle = "";

const currentPatchNotes = `
-> Upgrade Calculator:
- Found in the Shbook, unlocked with it (25 HMS)
- Select a group of upgrades, then the desired upgrade
- Only unlocked groups and upgrades are shown
- Selecting an upgrade shows: current level, current price, price one level higher, price to max, current effect, effect one level higherk, effect at max
- You can select a range from level x to level y:
- It shows: levels, total price for that range, effect at level x, effect at level y
- You can select a single level:
- It shows: level, price to next level, price to max, effect, effect at next level

-> Settings:
- All settings in the same row now have the same height
- New Audio Setting: Autoplay Songs
- Moved "Hide Maxed Upgrades" and "Current Effect Display" from Gameplay to Design
- Moved "Show Artifact Boost Filters" from Design to Gameplay
- Moved Ad Music setting next to the other music (not sound) ones

-> Other:
- Upgrades: moved MAX/-1/-MAX to the top, content below gets spaced out
- "Not enough ..." text now has proper currency names rather than abbreviations (sw)
- Good Joke Shgabb Upgrade now shows if it's currently active or inactive
- Basic anti cheat
- Code improvements
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