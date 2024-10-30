﻿// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.2";
const versionTitle = "";

const currentPatchNotes = [
    "-> Shgabb The Witch:",
    "- New event: Shgabb The Witch!",
    "- Active from October 28th - November 10th",
    "- x6 lore pages, x6 page progress and x6 Bags during the event",
    "- 10 new event lore pages, 5 event PFPs, 4 Banners and 5 Achievements can be earned",
    "- Two event currencies: Witch Shgabb and Candles",
    "- Added Shgabb The Witch background image",

    "-> Lore / Candles",
    "- Candles can be randomly earned from clicking, just like Memory Wisps",
    "- 1/666 chance (including the x6 event boost)",
    "- Added 10 new event lore pages, unlocked with Candles",
    "- Discover the story of Shgabb The Witch!",

    "-> Witch Shgabb:",
    "- Every 10 seconds, 3 random Artifacts can get cursed",
    "- Cursed Artifacts have their level increased by one, and using them can award Witch Shgabb",
    "- Witch Shgabb can be used to cast a witch spell",
    "- Up to 10 Witch Shgabb can be allocated for: Push Virtue, Defensive Herbs, Hair Odor",
    "- Push Virtue: Increases chance of receiving a more positive effect",
    "- Defensive Herbs: Decreases chance of negative effect",
    "- Hair Odor: Increases chance of getting cosmetics",
    "- Spells can give the new PFPs, Banners, boosts",

    "-> Other:",
    "- Shbook can now render conversations",
    "- Shgabb's sleeves now give a fixed x1000 boost if the cooldown is exactly 0",
    '- "Prestige!" in the prestige button is now bold',
    "- Happy Halloween!",
];

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