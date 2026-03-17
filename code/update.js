// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.6.1";
const versionTitle = "";

const currentPatchNotes = `
-> Black Market:
- March 20th, 2026 will have an additional Black Market for those who didn't interact with the first

-> Design:
- Added smooth slide and fade in/out animations for toggling the Sidebar
- Added smooth fade in/out animations for popups
- ? and Sidebar toggle buttons now lighten up on hover
- Artifacts show how many are currently selected (to the left of Scrap amount, while unlocked was moved to the right)
- New Shbook button design

-> Achievements:
- Added Shgabb Conqueror VII as compensation for the fake duplicate Shgabb Conqueror IV (240 total)
- Fixed issue with "I need no triplets"

v4.6:
-> Black Market:
- New feature unlocked at 13,000 HMS
- It always appears on the 13th of a month 
- Offers are random for every time, and different for every player 
- 4 exclusive tier X Artifacts 
- 4 exclusive PFPs 
- Black Tickets are used for purchase 
- Daily Challenge Points and Gems can be converted to Black Tickets, two times each

-> Scrapyard:
- New feature unlocked at 14,000 HMS
- Found at the Mine minigame
- Spend Artifact Scrap to get more Iron Shgabb 
- Every level takes multiple taps (how many is random)
- With animations

-> Missions:
- Two new missions:
- Bread for Breakfast, 1000 HMS, 8 steps, awards two PFPs and some Sandwiches
- Purple Tree Upgrades, 2000 HMS, 14 steps, awards two PFPs and 50 Gems
- Artifact Grinder: step 4 can now be auto shgabb or click shgabb, reduced step 6 from 10 Artis to 5, changed step 10 description

-> Stats:
- Added new stats for:
- Scrapyard Levels, taps, Scrap spent 
- Play time during click cooldown, active fridge, active event 
- Play time in Shgic, Fishgang, Mine 
- Critical clicks, Sandwich clicks (both not affected by Tech Collection)
- How many Banana Trees died or survived on a click (>0% death chance), days survived
- Black Tickets, total Daily Challenge Points
- All these new stats only started tracking with this update (v4.6)

-> Player Profile:
- Added 10 new PFPs (2 unlocked by using Linux (one of which is special!), 4 from the Black Market, 4 from the new Missions)
- Added button to toggle the background frame

-> Artifacts:
- Added 4 new Artifacts (2 common, 1 rare, 1 epic, 100 total)
- Added tier X, not obtainable from normal Artifact drops 
- These new Artifacts are exclusive from the Black Market
- Artifacts can now boost crit power and crit chance
- Stats now show crit power alongside crit chance

-> Shbook:
- Lore: Changed design of buttons in the list, with clear left-middle-right
- Lore: Overhauled the info area, with better readability, formatting and a list of the pages in inventory
- Lore: Changed buttons of locked (found) lore
- Calculator: Upgrade list now uses the same colors from settings
- Calculator: Added new formatting to the results
- Calculator: at level 0, effect doesn't show current effect anymore
- Featuriary: added Gem Storage and Scrapyard to the Unlocks list, added lists of unlockable Gem Offers, Artifact Tiers and Challenges
- Featuriary: added entries for Scrayard and Black Market

-> Notifications:
- Increased internal storage from 20 to 255 to avoid top/sb only and area only notifications deleting others and thus preventing them from showing up
- Changed area to go from top to bottom (same as top/sb)

-> Gem Storage:
- Gems now show the current amount here and in currencies display (so stored Gems not being counted)
- Added display for total Gems (stored and not stored)
- Added buttons for: +30, +1000, -30, -1000, +1%, +10%, -1%, -10%
- Added section background
- Expanded text
- Fixed a number display issue

-> Other:
- Added 5 new Quotes (110 total)
- Expanded info section with text explaining no AI was used, credits for Tux, Mint logo and Bags, and adding Balnoom brand name
- Added notification for gained Shgabb on a click (already existed for auto)
- Fixed Shgabb Conqueror IV Achievement existing twice (visual bug)
- Moved Shgabb Conqueror V Achievement
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