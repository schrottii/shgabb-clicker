// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.1";
const versionTitle = "Grateful Gems";

const currentPatchNotes = [
    "-> Gems:",
    "- New Gems image!",
    "- Added the Gem Storage (see section below)",
    "- Gem amount/chance Artifacts can now go beyond level 3 and were re-balanced (see section below)",
    '- "Artifact Loadout" max. level can now be increased from 8 to 12 with Améliorer',
    "-> Gem Storage:",
    "- Unlocked at HMS 8000",
    "- Some Gems can be stored, locking them from being spent",
    "- The amount of Gems stored can be changed at any time without a fee",
    "-> Gem Artifacts:",
    "- Removed level 3 limitation from Gem amount and Gem chance Artifacts",
    "- Shiny Red Ring: x1.25/x1.5/x1.75 -> x1.2/x1.4/x1.6/x1.8/x2.0 chance (+0.2/lvl)",
    "- Pulsing Red Ring: x1.5/x1.65/x1.75 -> x1.6/x1.7/x1.8/x1.9/x2.0 amount (+0.1/lvl)",
    "- Bloody Red Ring: (unchanged) x1.5/x1.75/x2/x2.25/x2.5 chance (+0.25/lvl)",
    "- Amulet of Slowgemming: x6/x7/x8 -> x8/x8.5/x9/x9.5/x10 chance (+0.5/lvl)",
    "- Amulet of Quickgemming: (unchanged) x1.4/x1.6/x1.8/x2/x2.2 amount (+0.2/lvl)",
    "- Amulet of Gem Mines: x1.4/x1.6/x1.8 -> x1.5/x1.75/x2/x2.25/x2.5 chance (+0.25/lvl)",
    "- P2W: x3/x3.5/x4 -> x3/x3.3/x3.6/x3.9/x4.2 amount (+0.3/lvl)",
    "- Gem Frustration: (unchanged) +0.5%/+1%/+1.5%/2%/2.5% (0.5/lvl)",
    "- Sarah's Collection: (unchanged) x2/x2.5/x3/x3.5/x4 chance (+0.5/lvl)",
    "- Overluck: cap removed but idk how it works",
    "-> Fishgang:",
    "- Added 18 beautiful fish images",
    "- When a fish is caught, its image appears for a brief moment",
    "- Similarly, catching trash shows Artifact Scrap",
    "-> Other:",
    "- New Améliorer Upgrade: More Loadouts (Set 8, 320)",
    "- Added Donate button (between Info and Social)",
]

function generatePatchNotes() {
    ui.gameTitle.innerHTML = cImg("shgabb") + "   Shgabb Clicker v" + gameVersion + (BETA.isBeta ? " (BETA)" : "") + "   " + cImg("shgabb");

    let patchNotesText = "<b>Version v" + gameVersion + (versionTitle != "" ? " " + versionTitle : "") + ":</b>";
    for (p in currentPatchNotes) {
        if (currentPatchNotes[p].substr(0, 1) == "v") patchNotesText = patchNotesText + "<br /><br /><br /><b>Version v" + currentPatchNotes[p].substr(1) + ":</b>";
        else patchNotesText = patchNotesText + (p != 0 && currentPatchNotes[p - 1].substr(0, 1) != "v" && currentPatchNotes[p].substr(0, 2) == "->" ? "<br />" : "") + "<br />" + currentPatchNotes[p];
    }
    ui.patchNotes.innerHTML = patchNotesText;
}

function patchNotesSize() {
    ui.patchNotes.style.fontSize = ui.patchNotesSizeSlider.value + "px";
}