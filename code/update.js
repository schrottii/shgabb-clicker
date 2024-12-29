// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "3.4.5";
const versionTitle = "The Cold Back";

const currentPatchNotes = [
    "-> Backgrounds:",
    "- Changed four backgrounds from green to blue:",
    "- Normal, Christmas, Anniversary, Easter",
    "- Now all backgrounds are blue-ish or red-ish",

    "-> Design:",
    "- Changed design of the social and patch notes squares, and they look the same now",
    "- Added lines between all four social sections and below the patch notes",
    "- Auto info and link to all patch notes are gray boxes now (better readability)",
    "- Changed gray button design",

    "-> Settings:",
    "- New setting (design): Show Setting Descriptions",
    "- Ad Music (setting) is now affected by the general Music setting, so if either is disabled, ad music won't play",
    "- Changed border color and hover effect of setting buttons",
    "- Custom colors selection is now centered",

    "-> Other:",
    "- Improved breakinfinity loading",
    "- Small joke ad related changes",
    "- Fixed not being able to unlock lore pages that had their requirements reduced if you have more than the new requirement",
    "- Fixed crash when using Sosnog in Challenge 3 (Manual Grind)",
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