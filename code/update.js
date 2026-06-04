// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.6.3";
const versionTitle = "";

const currentPatchNotes = `
-> Pride Event:
- Shgaybb Mode is now called Dating Mode 
- It still slows down clicks, but instead of finding text-only "Shgabbs", you have a chance of finding a match (20%)
- Your own character gets generated after the first click
- When a possible match has appeared (20%), you can see their info and attempt to match
- Info: name (irrelevant), age (irrelevant), gender, sexuality, possible cosmetics
- For it to work, the sexuality needs to be compatible with the other's gender (e. g. straight male + female, pan + anything, lesbian female + bi female)
- If it works, there is a 33% chance of it ultimately being a match
- This still awards 20 Gems, but the cosmetics are based on the match (+10 extra Gems for duplicates)

- Sexualities and genders are now differentiated
- Each Shgabb has a gender, a sexuality, a name and an age
- Realistic compabilities are considered (like lesbian only being for female characters)
- Straight and Ally take the opposite gender (male-female)
- Possible cosmetic rewards are tied to them (for example, the lesbian flag can come from a lesbian)
- Removed "Supergay" and "Shgabbsexual"
- Renamed "Gay male" to "Gay" and "Gay female" to "Lesbian"
- Full list:
- Sexualities: Asexual, Bi, Gay, Lesbian, Pan, Straight, Ally
- Genders: Male, Female, Non-binary, Intersex, Transmasc, Transfem

-> Other:
- Fixed issue with some cosmetics images
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