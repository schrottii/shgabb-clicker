// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.7";
const versionTitle = "";

const currentPatchNotes = `
-> Server:
- Shgabb Clicker is the first Balnoom game/app to receive a server connection!
- This means: new features like cloud save, chatting, multiplayer are now possible to add
- Implemented the new Balnoom Account system (read below)
- The game remains playable offline, but certain things will require an internet connection
- The first set of server features are:
- A player counter 
- Accounts 
- Cloud Save 

-> Server (technical details): 
- Server uptime is not guaranteed (but it should be >99%)
- The server commands, database commands & more are documented (code/online/SERVER_DOC.md)
- If, for whatever reason, the official server permanently closes, community-run servers become fully permitted, and can be setup with the documentation and some experience. Stop killing games!

-> Balnoom Accounts:
- Instead of every game/app with server features requiring you to make a new account, the plan is to have one account for all. 
- Register with an username and password (min. 6 characters).
- ?? Email is optional, and can be added later. It is required for verification (and thus some extra features)
- The login is cached
- Logout button...
- To verify an account, a verification code is sent to the provided email.
- If you are not logged in and forgot the password for your verified account, you can request a reset. A verification code will be sent via email.

-> Cloud Save:
- FINALLY! CLOUD SAVE IN A GAME! AFTER SO MANY YEARS!
- When logged in to your verified account, you can backup your save at any time, and load it on another device
- When loading a save, it first shows the name and HMS (to avoid loading a wrong/outdated save)
- Then you can choose to load it or copy its savecode to the clipboard

-> Player count:
- How many players were active in the past 30 days is shown in the Info section

-> Modals:
- Added modals: a new layer of showing information
- X button to close is located at the top right
- New modal for returning players (showing profile card and giving the options to start, start muted, or change save)
- New modal for new players (import save, reset save, or create save (*does not override existing save if there is one))
- New modal for save creation (giving start options: sound, tutorial, player name)
- New modal for account management (logging in, verifying, etc.)
- New modal for Cloud Save
- New modals for resetting password and entering new password

-> Tutorial:
- If not finished/skipped, the tutorial will appear again when re-opening the game (progress is saved)
- Added a new step to make the player visit the Settings
- Changed texts of most steps
- Added Goal texts (lime if completed, orange if incomplete)
- Changed background color from black to very dark blue
- Aligned text to the left
- Changed "Skip" to "Skip tutorial"
- Moved things into an own tutorial.js file

-> Quotes:
- Added 5 new Quotes (110 -> 115)
- New Design Setting: Toggle Quotes

-> Achievements:
- Added 1 new Achievement (240 -> 241)

-> Player Profile:
- Added 1 new PFP (awarded for creating and email linking an account)
- Fixed issue with some cosmetics images

-> Other:
- Improved music loading on start
- Another attempt at fixing random crashes during loading
- Converted patch_notes.txt to PATCH_NOTES.md
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
    value: window.location.toString().includes("localhost") && true,
    writable: false,
    enumerable: true,
    configurable: false
});