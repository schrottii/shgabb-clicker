// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.5";
const versionTitle = "Update with a mission";

const currentPatchNotes = `
-> Content:
- New feature Missions
- Gem/Artifact gains rebalanced
- Notifications topic
- New Reward Codes system
- Better loading with crash reporting
- and more!

-> Missions:
- New feature unlocked at 1000 HMS
- Found in the Shbook
- Every Mission consists of steps and gives rewards, and can have an unlock
- You can only select one Mission at a time, and have to do the steps in order
- Selecting a different Mission cancels progress
- Requirement step: requires something once (having a certain ad boost, being at a certain number, ...)
- Progress step: based on stats, makes you do something a certain amount of times (can be counted as what you get or only as one, and can have an extra requirement)
- Any step can give a reward, but usually the last step gives the main reward and completes the mission
- Every Mission and every step has a description
- Added the first two Missions:
- Paroxysm, 1000 HMS, 8 steps, basic Mission to introduce the new feature and not overwhelm new players, awards an Artifact and the powerful Paroxysm
- Artifact Grinder, 1000 HMS, 10 steps, awards 50 Gems and an Artifact

-> Gems:
- Gems and Artifacts have been rebalanced to make them more fair in earlygame-midgame, and less broken in lategame
- (Buff) When you get Gems, they are randomly multiplied by x1, x2 or x3 (~ x2 average)
- (Buff) Amulet of Gem Mines: x2/x2.5/x3 -> x3/x3.5/x4
- (Nerf) P2W: x3/x3.5/x4 -> x2.5/x3/x3.5
- (Nerf) Tech Collection: now multiplies Gem chance, instead of Gem amount
- (Nerf) Snake Oil Salesman: equipping it resets boost now

-> Gem Offers:
- There are now 3 Artifact Offers instead of just one:
- 1. unlocked at 1000 HMS, contains a random Common, costs 10 Gems
- 2. unlocked at 1100 HMS, contains a random Rare, costs 20 Gems
- 3. unlocked at 1200 HMS, works same as the old one, costs 50 Gems
- (Buff) All three are updated daily, this way new players have a lot more to choose from, and get lower rarities cheaper
- (Buff) Changed unlock for Artifact Gift and Artifact Loadout from 1000 HMS to 1500 HMS OR 300 total Gems

-> Artifacts:
- Added 5 new stats (sadly not tracked before) for total Artifacts found, duplicates found, Artifacts upgraded, Artifacts destroyed, Artifacts equipped
- (Nerf) Reduced Challenge 5 boost from +x0.25/lvl to +x0.2/lvl
- (Nerf) Nerfed Challenger (at 1M points and max. level: /2.10 -> /1.48)
- Added slight coloring to the top, green if the Artifact is active, red if it's inactive
- Level is now bold

-> Notifications:
- Added config button to the notifications area, toggling the area to let you configure notifications instead of showing recent ones
- Here, the different notifications you received during this session (or configured before) are shown
- Each one of them can be toggled:
- "Show all" (default, meaning it is shown everywhere)
- "Hide" (this type is not shown at all)
- "Top/SB only" (only shown at the top, or Sidebar, depending on settings, but not in the area)
- "Area only" (only shows in the big notification area, not at the top/Sidebar - this was previously applied to auto save notifications)
- Simplified notifications from Settings to not spam the new feature
- Time is now shown next to a notification, in the area
- Brought back notification for gaining Shgabb
- Added new notifications for: Generator upgraded, Genpoints produced, notification configured
- Fun fact: before this update, there were ~151 notifications

-> Reward Codes:
- Redeem Codes are now called Reward Codes and more powerful
- An external tool is now used to create them, and new rewards can be added without a game update (as advanced as it can go without an actual server)
- They can contain rewards such as Gems
- Most codes can be redeemed by anyone, some may be for a specific player (as compensation for a bug or progress loss)
- There can still be codes to fix a player's start version or start date, and those are still player-specific.
- Codes can show a message after redeeming
- Each code can be used only once
- Added a button to the Gems area for faster access, Setting button still exists
- Here is the first code, available through February 6th, giving 300 Gems: 
- eyJJRCI6IlRIUllSU1NDIiwiRVhQSVJZIjoiMDcuMDIuMjAyNiIsIkRJU1BMQVlURVhUIjoiSGFwcHkgMyB5ZWFycyBvZiBTaGdhYmIgQ2xpY2tlciEgSG9wZSB5b3UgZW5qb3kgdGhlIG5ldyB1cGRhdGUiLCJnZW1zIjoiMzAwIn0=

-> Loading:
- If the game crashes while loading, you can now report it with just one button click
- This sends relevant data to me on Discord (where it crashed, rough account progress, game version)
- Please do not abuse this
- Improved game loading

-> Achievements:
- Added 29 new Achievements (211 -> 240, more than any other update)
- Missions related (2): I'm on a mission, Not missing on a mission
- Other v4.5 features related (4): I tell you what to tell me, Free stuffing, Redemption arc, I need no triplets
- Recent features related (13): Secret Formula, Familiar Sparks, Cheap EV, As all things should be, Boosting the Generators, Weak as ever, Idle Bar, Gen Prix I, II, II, Making a mess I, II, III
- Artifact related (9): Hyperspeed Cooldown, My medium collection, My big collection, Scrap You I, II, III, IV, V, Destructive Breakdown
- Other (1): Challenger IV
- Changed descriptions of "Do we have dinosaurs???" and "Pizza!!!!!"
- Moved "Finite Stones" and some lategame Achievements

-> Design:
- Increased width of Setting sections, cosmetic buttons and stat buttons
- Click button: changed Shgabb text to image
- Upgrades: Cost and Effect are now on the left
- Upgrades: Reduced currency image size
- Social Section: Centered all headers
- Social: Remade the four images and changed button design

-> Other:
- Added "?" button to currency sections (Shgabb, Sandwiches, ...) to directly open the Shbook
- Added "X" button to the right of the Sidebar to hide it, that will show ">" to bring it back
- Removed (Year 2) texts from Events (Christmas and Anniversary got no changes, and it's not needed for now)
- Turning off popups now immediately terminates the currently displayed popup
- Re-organized code files or added HEX-based navigation for: main, events, shbook and artifacts

-> Fixes:
- Having the daily loadout selected (from quick equip) is now remembered instead of half-loading the first
- Fixed issue with Gift Artifacts in daily challenge
- Fixed Sarah's Gems Achievement saying 500 Gems when it is 2000 Gems
- Fixed excessive Genpoint gains when turning off the phone screen
- Fixed UTC issue at end of year
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