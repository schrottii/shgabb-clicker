// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.1.1";
const versionTitle = "";

const currentPatchNotes = [
    "-> Minigames:",
    "- Implemented WGGJ",
    "- Fishgang: Added info texts for: line broke, not caught",
    "- Gained XP is now shown",
    "-> Balance:",
    '- Reduced chance needed for "Overluck (water element version)" Achievement from 300% to 200%',
    "- DaGame: Added Click Shgabb boost as a secondary effect (x20/x40/x80) but Bag costs increase: 10 -> 10/20/30",
    "- Tech Collection: Added faster click speed as a secondary effect (x1.5/x1.75/x2)",
    "- Tech Collection now also affects Gems, Shorts, Power Charger (amount) and Artifacts, Copper, Wisps, Lore Pages (chance)",
    "- Tech Collection now also increases click stat every click",
    "- Power Charger: Changed boost from clicks * level to clicks^(1.1/1.2/1.3) * level * 3",
    "- Tower: Increased boost per click from 10% * level to 20% * level, but reduced cap from 99999 to 9999",
    "- Miner's Pay: x4^level -> x6^level",
    "-> Snake Oil Salesman:",
    "- Having an useless meme artifact is funny, but as a legendary it can be disappointing, so now Snake Oil Salesman was reworked to become useful, but still be suspicious!",
    "- Every auto second, there is a 20% chance of a new offer being bought",
    "- Offers cost 2/4/6 Gems (level * 2)",
    "- The offer you currently have can be re-bought, scamming you of some Gems!",
    "- There are 6 possible offers, each less common than the previous:",
    "- x20/x40/x80 Shgabb",
    "- x4/x8/x12 Sandwiches",
    "- x6/x12/x18 Gem chance",
    "- x20/x40/x80 Silicone",
    "- x2/x4/x6 Gems",
    "- x8/x64/x512 Copper amount",

    "v3.1",
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