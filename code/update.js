// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.5.2";
const versionTitle = "elshgabb452";

const currentPatchNotes = `
-> Artifacts:
- New Epic Tier II Artifact: Root
- (Nerf) Trash Can: reduced max. boost from x4/x8/x12 to x3/x6/x9
- Artifact search now supports "[rarity] L[level]" combination and "tier [roman numerals]"
- Changes to tiers, see below

-> Artifact tiers:
- An Artifact's tier is now displayed next to the rarity and level
- Changed tier III from 5000 HMS to 4000
- Added tier V at 10,000 HMS
- Added list of tiers to Featuriary (1000 / 2000 / 4000 / 8000 / 10,000)
- Artis per tier: 43 / 16 / 21 / 5 / 11
- Some Artifacts had their tier changed:
- Tier III: Golden Past (I), Golden Day (I)
- Tier IV: Buying Bags (II)
- Tier V: Orange Ring (IV), Orange Ring (IV), Ore Rush (IV), Ore Vein (IV), all legendaries (IV)

-> Achievements:
- Changed HMS amount in "Challenge Me!", "Wet Gang" and "The Ads Are Changing" (Challenges, Fishgang and Chenga unlocks) and moved them accordingly
- Moved lots of Achievements, particularly in earlygame
- Changed Conqueror Achievements: 1500/2500/5000/10,000/15,000/20,000 -> 1500/2500/4444/9001/16,000/21,400 (to avoid conflicts with unlocks)

-> Fishgang:
- Adjusted slider speed, slower at less distance (1x, 2x, 3x, 4x multi depending on color, instead of always 4x)
- Quality is now displayed alongside chance (1-10, decides what fish you can get)
- Added floating text showing chance increase/decrease after reeling
- Added background behind chance/quality on the right (for symmetry and better readability)
- Moved throwing animation to clicking throw, from when the fish appears
- New fish: Shark (new image), Stupid Tuna
- New trash: Wet dirt, Broken vape, AI slop, AI trash, Broken slot machine
- Fixed trash capitalization

-> Other:
- Custom colors setting: new formatting and buttons preview the colors
- Fixed Genpoint boost display issue

v4.5.1
-> Events:
- New Event info UI, for all seven Events
- For consistent design and better readability

-> Auto:
- Fridge time gets reduced to max. if it's above it (ie opening game while having Thaw equipped)
- Auto info: aligned its texts to a new type of layout
- Auto info: Fridge time can no longer go below 0

-> Other:
- Joke ad names are now bold
- Shgabb image in click button can now be clicked through

-> Bug fixes:
- Fixed music and sounds not being properly muted when starting the game
- Fixed Gem Shgabb Boost visual issue
- Fixed Genpoints notification before unlock
- Fixed texts for export/import Settings
- Fixed issue with Setting sections that aren't Gameplay
- Fixed Qian offer issue
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