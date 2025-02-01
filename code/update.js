// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.8";
const versionTitle = "Winter Lunar";

const currentPatchNotes = [
    "-> Lunar New Year Event:",
    "- The Lunar New Year Event is back for Year 2",
    "- Duration changed to February 4th - February 18th (6 days earlier)",
    "- This chosen duration is based on an average (since it shifts by up to a month every time)",
    "- 5 event lore pages can be found, and unlocked with Red Envelopes",
    "- Added 3 new Banners and 2 new Frames (still 3 PFPs)",
    "- Reduced cosmetic cost from 888 to 188 (total: 2664 to 1504)",
    "- Cosmetics are now given out randomly rather than in order",
    "- Added a new Achievement for getting all 8 cosmetics",
    "- Extended event description",

    "-> Lore:",
    "- Added 15 new lore pages (35 total)",
    "- 5 belated pages for the Christmas Event",
    "- 5 belated pages for the Anniversary Event",
    "- 5 pages for the Lunar New Year Event",
    "- Added 3 new lore currencies: Memory Snowflakes, Birthday Candles & Red Envelopes",
    "- Their chances: 1/1200, 1/1000 & 1/888",
    "- Lore currency is now shown next to the name/not found/locked",
    "- Integrated these new pages and lore currencies into their events",

    "-> Other:",
    "- Added 5 new Quotes (80 total)",
    "- Added 7 new Achievements (190 total)",
    "- Fixed description of Luckily it's in English Achievement",
    "- Luck now also affects the base Fishgang chance, but also gets reduced every reel (5x if missed)",
    "- Updated WGGJ from v1.1 to v1.2.1"
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