// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.7";
const versionTitle = "";

const currentPatchNotes = `

`.split("\n");
currentPatchNotes.splice(0, 1);

const legalLinks =
    `<a href="LICENSE.md" target="_blank">License</a> - 
<a href="TOS.md" target="_blank">Terms of Service</a>- 
<a href="PRIVACY.md" target="_blank">Privacy Policy</a>
`;

const legalOwner = `©2023-2026 Balnoom / Schrottii`;

function generatePatchNotes() {
    ui.gameTitle.innerHTML = cImg("shgabb") + "   Shgabb Clicker v" + gameVersion + (BETA.isIndev ? "-dev" : "") + "   " + cImg("shgabb");

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

// BETA - easier debugging
var BETA = {};
Object.defineProperty(BETA, 'isIndev', {
    value: true,
    writable: false,
    enumerable: true,
    configurable: false
});