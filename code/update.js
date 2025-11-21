// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.2.2";
const versionTitle = "";

const currentPatchNotes = `
-> Upgrade design:
- All upgrades in the same row now have the same height
- Currency image now is shown next to the cost
- Increased description size based on screen width
- Changed MAX/-1/-MAX design

-> Other:
- Added currency images to all currencies in the Shbook
- Fixed issue with STW event gained cosmetic text

v4.2.1
-> Shgabb the Witch:
- Event is back for Year 2 - all events have been updated now!
- Duration changed to October 24th - November 6th (21 days -> 14 days)
- Added 4 Frames
- Added images and new buttons for Push Virtue, Defensive Herbs, Hair Odor, and Cast Spell
- Made their descriptions longer
- Implemented v3.7's event cosmetic awarding system
- Buffed Herbs from 5% to 10% (5 are enough to guarantee no negative effect)
- Buffed Odor from 2% to 3%
- Reduced +2 Witch Shgabb effect to +1
- Reduced +5 Chengas effect to +3

v4.2
-> Tutorial:
- Added a tutorial with 6 parts
- The first visible character, Lucie, guides you through the beginning
- Can be freely skipped
- Ends at Shbook/Sandwich unlock (HMS 25)

-> Audio:
- Added four new songs: Shgame (Remix), Silicone Business, 0.2s, Kate Blen
- Removed old Shgame song
- Music now starts playing on first click
- Added three new audio settings (see below)
- Finally added more sounds than just the fart xd:
- Added upgrade sound
- Added unlevel sound
- Added click sound (when changing sections)
- Added tutorial talking sound
- Migrated to WGGJ's new audio system

-> Settings:
- Added a new type of setting; slider settings
- New Gameplay Setting: Tutorial (repeat tutorial)
- New Audio Setting: Music Volume
- New Audio Setting: Selected Song
- New Audio Setting: Sound Volume
- Improved height on mobile

-> Artifacts:
- Overhauled Artifact design, with image, rarity and level at the top
- Names are bold, reduced empty space
- Added rarity colors: black, green, purple, yellow
- Different border
- Also applies to Achievements and cosmetics

-> Other:
- Added Achievement for completing the tutorial
- Added Lucie PFP (unlocked by completing tutorial)
- Updated WGGJ from v1.4.1 to v1.5
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