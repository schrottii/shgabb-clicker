// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.1.1";
const versionTitle = "";

const currentPatchNotes = `
- Reduced costs of Iron upgrades (except CuFe)
- Total Pearls, Total Iron and Mined Iron stats are now displayed
- Moved Chengas and Etenvs stats
- Added Gem Storage section header
- Updated WGGJ from v1.4 to v1.4.1 (fixing a mobile tap issue)

v4.1
-> The Mine:
- Added new currency and tile Iron Shgabb, about as common as GS, takes 100 to finish
- Added smooth moving
- Mine button is now clickable (acts like the click button), with animations
- Added animation when mining is complete

-> Iron Shgabb:
- New currency, unlocked along The Mine (like Pearls)
- Can be found in The Mine (similar to Pearls in Fishgang)
- Can be spent on four upgrades:
- Speed Miner: flat reduces time of Deep Miner (max lvl. 500, as after that it would do nothing)
- CuFe: get more Copper based on how much Iron Shgabb you have
- Pickaxes: faster cooldown while mining something (max lvl. 5, x1.5 speed)
- Copper Miner: base Copper gains get multiplied by how many Copper tiles you mined (max lvl. 1)
- Added Currenciary entry

-> Settings:
- Added sections (like with stats or player profile)
- Reworked design of buttons, with new colors (blue -> dark gray/white) and round border
- All Settings in a row now have the same height
- New Setting: Sidebar Width (19%, 24%, 29%, 34%, 4%, 9%, 14%)
- Reworked Setting rendering code

-> Sidebar:
- It is no longer considered experimental
- Popups disappear after the usual amount of time
- Removed "Sidebar" text from the top
- Its width can be adjusted with the new Setting (default is still 19%)
- Reduced empty space

-> Artifacts:
- Stabilized Boost Filters for Artifacts that change what they boost
- Fixed Snake Oil Salesman issue

-> Other:
- New colors for Améliorer convert buttons
- Increased size of Player Profile
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