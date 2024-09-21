// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.0.1";
const versionTitle = "Fish +2";

const currentPatchNotes = [
    "-> Pearls:",
    "- New side currency, unlocked at 12k HMS alongside Fishgang",
    "- Gained from level ups in Fishgang (gain = level)",
    "- Can be spent for a Shgabb or GS boost",
    "- Can be refunded every new level up",
    "- Shgabb Boost: Spend Pearls to get more Shgabb (x1.1 every level)",
    "- GS Boost: Spend Pearls to get more GS (x1.05 every level)",

    "-> Fishgang Gameplay:",
    "- Added Pearls: side currency gained from level ups",
    "- Reduced base XP needed for level up from 400 to 100",
    "- Doubled XP from fish",
    "- Valuable attempts can no longer end up being trash",

    "-> Fishgang Design:",
    "- Moved and increased size of the throw/reel button",
    "- Increased size of catch chance text",
    "- Made the successful click green more visible",
    "- Gave Bobby some ADHD meds",

    "-> Other:",
    "- Improved Achievements rendering and obtaining",
    "- Added Featuriary entry for Fishgang",
    "- Added Currenciary entry for Pearls",
    "- Fixed a minigame Hz issue",



    "v3.0",
    "-> Content:",
    "- New feature / minigame: Fishgang!",
    "- Reworked minigames section/display",
    "- Internal improvements",

    "-> Minigames",
    "- Integrated Shgic into the new minigames selection",
    "- New minigame: Fishgang",
    "- Reworked the entire appearance",
    "- Minigame display now scales, and is generally bigger",
    "- Added the selection screen with cool 90s CDs and a chessgabb",

    "-> Fishgang:",
    "- New feature and minigame: Fishgang",
    "- Unlocked at HMS 12k",
    "- Throw a rod and reel the fish in!",
    "- Longer distance = better fish",
    "- Hit at the right time to increase the chance of success",
    "- Missing can make the fish flee",
    "- Fish and trash can be caught",
    "- Catching fish gives XP, Gems and +1 fish",
    "- Catching trash gives XP and +1 trash",
    "- Added fishing level and XP, no effect yet",
    "- Added fishing stats and Achievements",

    "-> Achievements:",
    "- Added 10 new Fishgang Achievements (175 total)",
    "- Added Achievement pages, 50 per page",

    "-> Patch notes:",
    "- Added a slider to adjust size of patch notes",
    "- Range: 10 - 16 (default) - 40",
    "- Update title is now displayed after the number rather than below",
    "- Update version/title is now also bold",
    "- Added v to the version number",

    "-> Shbook:",
    "- Added a slider to adjust size of Shbook text",
    "- Range: 2 - 10 (default) - 30",
    "- Smoother background",

    "-> Internal improvements:",
    "- Various code and file sorting improvements",
    "- Reworked minigames rendering code (see: QuoteQuiz), including scaling",
    "- Added seperate files for: update.js and all currencies except Gems (already existed)",
    "- Added sub-folders for currencies, features and games code files",
    "- Fixed locked Ad boosts appearing (maybe)",
    "- Happy Friday the 13th everyone",
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