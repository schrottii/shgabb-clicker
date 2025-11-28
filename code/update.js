// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.4";
const versionTitle = "";

const currentPatchNotes = `
-> Generators:
- New feature, unlocked at 3000 HMS
- Spend GS to upgrade Generators
- The higher the level, the more their Genpoint prod boost increases
- Every Generator multiplies the Genpoint/s gain
- Genpoints boost Shgabb (^0.1~^0.5 depending on Generators at level 1+)
- Added 5 Generators:
- Cheap: e2^L, x1.20^L
- Balanced: e4^L, x1.30^L
- Boost: e10^L, x2^L
- Weak: e15^L, x1.20^L
- Powerful: e25^L, x3^L

-> Events:
- Added new cosmetic reward system to: 
- Christmas Event (10x2% chance -> 8% chance per Gift)
- Anniversary Event (7x33% chance -> 60% chance per Cake), no free Banner anymore, first PFP still guaranteed
- Lunar New Year Event (same as before)
- Egg Hunt Event (not in order anymore, split Banners/Frames into 2 separate offers)
- Pride Event (same as before, Banners still tied to couples)
- Hot Hot Summer and Shgabb the Witch already have this system

-> Notifications:
- Popups can now be clicked away
- Auto save notifs no longer mess with the top/sidebar notif display (- or pushing other notifs away)

-> Other:
- Added Pearls, Etenvs and Iron Shgabb to Unlocks list in Shbook
- Fixed issue that cleared selected file (for loading a save)
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