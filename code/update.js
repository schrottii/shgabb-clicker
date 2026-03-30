// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.6.2";
const versionTitle = "";

const currentPatchNotes = `
-> Egg Hunt Event:
- Added Offer to buy the new Artifact (Egg Instinct) for 50 Eggs
- New button design/texture
- Changed eggs (see below)

-> Eggs:
- Egg can no longer be clicked through (e.g. to avoid accidental purchases)
- Egg appears black for a moment after being clicked
- Egg duration: 10s -> 10s or 20s or 30s (random)
- Eggs can no longer only appear in upgrades, but also in: Gem Offers, Settings

-> Artifacts:
- New Tier X Epic Artifact: Egg Instinct (only useful during the event, makes it easier to find Eggs and becomes stronger after finding one)
- Changed design to be as space efficient as possible and be able to show all text

-> Gems:
- Updated Gem Offer design
- Added texture for Gem Offers and storage Buttons

-> Generators:
- Changed the top bit 
- Genpoints/s are now shown
- Added texture for upgrade button

-> Bug fixes:
- Improved loading (to fix rare random loading crashes)
- Fixed Chrome specific issues
- Fixed a spacebar exploit

v4.6.1
-> Black Market:
- March 20th, 2026 will have an additional Black Market for those who didn't interact with the first

-> Design:
- Added smooth slide and fade in/out animations for toggling the Sidebar
- Added smooth fade in/out animations for popups
- ? and Sidebar toggle buttons now lighten up on hover
- Artifacts show how many are currently selected (to the left of Scrap amount, while unlocked was moved to the right)
- New Shbook button design

-> Achievements:
- Added Shgabb Conqueror VII as compensation for the fake duplicate Shgabb Conqueror IV (240 total)
- Fixed issue with "I need no triplets"
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