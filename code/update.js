// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.1";
const versionTitle = "Global2";

const currentPatchNotes = [
    "-> Unlocking Shgabb Upgrades:",
    "- Reviewed the order and unlock requirements for Shgabb Upgrades:",
    "- More Shgabb: None",
    "- Crit. Chance: None -> HMS 60",
    "- Crit. Boost: None -> HMS 70",
    "- Shorter Cooldown: MS 15 -> None",
    "- Good Joke: MS 25 -> HMS 10",
    "- Bomblike: MS 35 -> HMS 15",
    "- Sandwich Chance: MS 50 -> HMS 25",
    "- Sandwich Amount: Sandwich Chance level 25 -> Sandwich Chance level 10 OR HMS 50",
    "- Deep Miner: MS 12k -> HMS 12k",
    "- Bomblike 2: MS 12k -> HMS 10k",
    "- Old order: More Shgabb, Crit. Chance, Crit. Boost, Shorter Cooldown, Good Joke, Bomblike, Sandwich Chance, Sandwich Amount, Deep Miner, Bomblike 2",
    "- New order: More Shgabb, Shorter Cooldown, Good Joke, Bomblike, Sandwich Chance, Sandwich Amount, Crit. Chance, Crit. Boost, Bomblike 2, Deep Miner",
    "- Changed their unlocks from current More Shgabb level to highest (HMS), this also affects midgame and lategame",

    "-> Pre-release changes:",
    "- Uploaded Shgabb Clicker to galaxy!",
    "- Made it clear that the ads are not real",
    "- Fixed incorrect Shbook text pre-unlock",



    "v3.4 Global Freeze",
    "-> Events:",
    "- Every year, the events return",
    "- Events may have a different time/duration or new/different content when they return",
    "- Event code improvements",

    "-> Christmas Event:",
    "- The Christmas Event is back for Year 2",
    "- Duration changed to December 14th - December 28th (2 days earlier)",
    "- Added description",
    "- Added 1 more PFP (3 -> 4)",
    "- Added 3 Banners",
    "- Added 3 Frames (first Event Frames ever)",
    "- The new PFP, Banners and Frames are unlocked as usual",
    "- The content of the latest Gift opening is now shown at the bottom (similar to Shgabb The Witch)",

    "-> Upgrades:",
    "- New Améliorer Upgrade: Chain Gems (Set 8, 300): Increased chance to get Gems (ignoring 10% cap) after the previous click awarded Gems",
    "- Expanded More Shgabb description to clarify that it unlocks many things",
    "- Changed descriptions of 2+2=5 and Meaning Of Life for consistency: Increases -> Get more",
    "- Changed description of More GS (Copper): GS -> Golden Shgabb",

    "-> Other:",
    '- Artifacts: Added a button to quickly clear the current loadout ("Clear")',
    "- Changed Auto info (below Sandwich Upgrades): added Auto info mini-header, removed background color, added current fridge time remaining, added normal/cheese percentages",
    "- The three bars at the top are now hidden until Sandwiches are unlocked",
    "- When unlocking Ads for the first time, they directly appear, restarting the game is no longer required",
    "- Improved Player Profile display updating",
    "- Fixed issue with receiving wrong Achievements",
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