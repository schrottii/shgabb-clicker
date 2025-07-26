// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.8";
const versionTitle = "";

const currentPatchNotes = `
-> Améliorer:
- Added the 9th set of Améliorer Upgrades (400 Amé)
- New Améliorer Upgrade: Bag Boost (Set 9, 400): Get more Bags
- New Améliorer Upgrade: Efficient Destruction (Set 9, 400): Get more Artifact Scrap from destroying Artifacts
- New Améliorer Upgrade: Challenger (Set 9, 400): Reduce goals for Challenges based on Daily Challenge Points
- New Améliorer Upgrade: Unstable AMESS (Set 9, 420): Get +1 Amé for every 15min+ Prestige or new day. They are lost when you reset Amé Upgrades.
- Added Amess stat

-> Hot Hot Summer Event:
- This Event is back for Year 2
- Duration changed to July 28th - August 10th (22 days -> 14 days)
- Added 2 Frames, can be bought for 80 Shorts from 3rd Offer, if click speed is 5s
- Reduced Banner price from 100 to 80 (same as others)
- Shorts chance now increases every click (base still 0.1%, increase +0.01%/click, 2.1% at 200)
- Reduced boost at 200 clicks from 100x to 10x (before: 0.1% -> 10%, after: 2.1% -> 21%)
- Shorts chance is now displayed
- Implemented v3.7's event cosmetic awarding system, which gives the cosmetics randomly, to replace the own inconsistent (and often going in order) awarding systems of events (the other events will follow)

-> Design:
- Sections: added rounded transparent backgrounds, covering the whole area, for all 3 sections
- Selections: increased width and spacing (more on PC than on mobile), round border
- Upgrade buttons: rounded and colored borders (black -> darker)
- Upgrade buttons: slightly changed colors (new)
- Gray buttons: changed colors and border
- Click button: changed click animation's colors and border
- Quote: changed font (and bigger on PC), background and round edges
- Game title: round edges and bigger size on PC
- Banana Trees: completely changed button design
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