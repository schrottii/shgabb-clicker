// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.5.3";
const versionTitle = "";

const currentPatchNotes = [
    "-> Egg Hunt Event:",
    "- The Egg Hunt Event is back for Year 2",
    "- Duration changed to April 2nd - April 15th (4 days later, 22 days -> 14 days)",
    "- 5 event lore pages can be found, and unlocked with the new lore currency Baskets",
    "- Added event description",
    "- Added 2 new Banners and 2 new Frames (still 6 PFPs)",
    "- Reduced Event Cosmetic price from 100 to 50",
    "- Added a new offer for banners and frames",
    "- (The event was active for a few days before this, and egg images weren't working)",

    "-> Other Events:",
    "- Christmas Event: Changed start date from December 14th to December 15th (15 days -> 14 days)",
    "- Anniversary Event: Changed end date from January 20th to January 19th (15 days -> 14 days)",
    "- Lunar New Year Event: Changed end date from February 18th to February 17th (15 days -> 14 days)",

    "v3.5.2",
    "-> Bananas:",
    "- Added a Banana PFP, unlocked at 10k total Bananas (third Achievement)",
    "- Moved Banana Achievements based on progression",
    "- Fixed Tree ID starting with #0, all new trees are one higher now",
    '- Tree age is now shown as "Age" instead of "Days" (starting at 1 now)',

    "-> Other:",
    "- Added 5 new Quotes (105 total)",
    "- Minigames no longer pause when a different selection is used",
    "- Fishgang: Re-added Your Mom and Pirate Piss",
    "- Achievements: Added page buttons to the top as well",
    "- Challenges: Goal, Price and Boost are now bold, and added a line above them",
    "- Expanded Featuriary text for Shgic",

    "v3.5.1",
    "-> Ads:",
    "- Reworked code of ad boosts, making it more organized and allowing for fancier things (like upgrades) in the future",
    "- Changed how locked ad boosts are treated",
    "- Shbook: Added an entry for Ads, listing all possible ad boosts",
    "- Specified the More Sandwiches boost affects the chance, not amount",
    "- Fixed click button showing 3x too much during Stronger Clicks boost",

    "-> Other:",
    "- Every fish now gives 4XP more (meaning the minimum is 6XP)",
    "- Fixed an 0 GS issue",
    "- Fixed being able to get Banana Seeds too early",

    "v3.5 This Update Is Bananas",
    "-> Bananas:",
    "- New main currency! Unlocked at 15k HMS",
    "- Added Banana Seeds, Banana Trees (and their UI) and 3 Upgrades",
    "- Added stats for Bananas, Seeds and Trees",
    "- Added Bananas Currenciary entry",
    "- Added 10 Banana Achievements (200 total)",

    "-> How Bananas work:",
    "- You can get Banana Seeds from Prestige",
    "- The chance increases up to 18% at 15 minutes since last prestige, nothing gained below 1 minute",
    "- A seed can be used to create a Banana Tree, of which you can have up to 4",
    "- Every click there is a chance for every tree to produce Bananas",
    "- The Bananas need to be claimed from the trees, but it has a chance of destroying the tree",
    "- Every day where you play the trees age, increasing their production but also their death chance",

    "-> Banana Upgrades:",
    "- Bananas can be spent on three upgrades:",
    "- Banana Chance (9 levels) - higher chance to get Bananas",
    "- More Sandwiches - a simple Sandwich boost",
    "- Wisdomnana - get more GS for every unclaimed Banana",

    "-> Other:",
    "- Hovering over the Shbook now increases its contrast rather than just brightness",
    "- (Experimental) Changed font of Shbook texts",
    "- The three bars now tell what they are for (Auto, Fridge, Prestige)",
    "- The link to SC2FMFR now links to the galaxy version if you are playing on galaxy"
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