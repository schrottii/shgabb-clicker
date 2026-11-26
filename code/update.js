// Game made by Schrottii - editing or stealing is prohibited!

// Game version and patch notes

const gameVersion  = "4.7.1";
const versionTitle = "Servant of the Clouds";

const currentPatchNotes = `
-> Cloud Save:
- Settings are now uploaded along with the save
- When downloading, you can choose to also load the settings (or only the save), using the new button "Load this save + settings"
- Added Cloud Save icon
- Fixed SQL issue where a cloud save doesn't get updated properly (the file does), leading to wrong info display

-> Server:
- If trying to redeem a Reward Code while not logged in, it will now tell you that's not possible
- Server info: if disconnected, it now shows time until next retry / currently retrying
- Various server backend improvements

-> Minigames:
- Added fullscreen support for all Minigames, toggled via button in top right
- This is especially useful on mobile
- "Play Minigame" text is now invisible until a CD is selected, to avoid confusion
- Fixed selected minigame text being outdated after leaving a minigame

-> Artifacts:
- New Tier X Epic Artifact: Gifted Tree (faster click CD after opening a Gift)
- Tech Collection now affects mining progress

-> Christmas Event:
- To prepare for its return in December... (or earlier for Etenv users!)
- Added Offer to buy the new Artifact (Gifted Tree) for 20 Gifts
- Updated event description to mention the Artifact
- New button design/texture
- Gift(s) contents text now uses images for currencies and is split into multiple rows

-> Custom Upgrade Colors:
- Buttons for text color now say Text instead of T (to avoid confusion with transparency)
- Aligned texts to the right
- Fixed browser-specific(?) issue that could prevent setting colors

-> Other:
- Added d0ktorek mention to Credits
- Added warning when trying to import a cut off save code (short and round length)
- Replaced "My Website / Games" with "Balnoom Website" and updated link

-> Bug fixes:
- Fixed issue with New Age achievement (working on accounts without any email)
- Fixed issue with Paranoid Nixonoid Achievement (guess I am the paranoid one)
- Fixed Import Settings saying "Custom colors imported"
- Fixed Genpoint Notification being able to show NaN%

v4.7
-> Server:
- Shgabb Clicker is the first Balnoom game/app to receive a server connection!
- This means: new features like cloud save, chatting, multiplayer are now possible to add
- Implemented the new Balnoom Account system (read below)
- The game remains playable offline, but certain things will require an internet connection
- If your client version is outdated, the server will make aware of the difference and refuse to connect
- The first set of server features in v4.7 are:
- 1. Player counter
- 2. Accounts
- 3. Cloud Save
- 4. Server-side Reward Codes

-> Balnoom Accounts:
- Instead of every game/app with server features requiring you to make a new account, the plan is to have one account for all.
- Access via button in the top right, it also shows server connection (red = disconnected, green = available)
- Register with an username and password (min. 6 characters).
- Email is optional, and you can attach it later. It is required for verification (and thus some extra features)
- The login is cached locally, we all hate the modern trend of websites not remembering your login :)
- To verify an account, a verification code is sent to the provided email. For now, it is only needed for password reset
- Account Management area includes: Logout button, button to open Cloud Save, button to start password reset
- If you forgot the password for your verified account, you can request a reset. A verification code will be sent via email.

-> Cloud Save:
- FINALLY! CLOUD SAVE IN A GAME! AFTER SO MANY YEARS!
- When logged in, you can backup the save at any time, and load it on another (or the same) device whenever desired
- When loading a save, it first shows the name, HMS, size and upload date (to avoid loading a wrong/outdated save)
- Then you can choose to load it or copy its savecode to the clipboard
- Added a Setting as a shortcut to the cloud save modal

-> Player count:
- How many players were active in the past 30 days is shown in the Info section
- Server connection status and login status are also shown there

-> Reward Codes:
- They are now stored in the database and handled via server
- From an user's POV, it should be the same as before

-> Modals:
- New feature: Modals - a new layer of showing information
- X button to close is located at the top right
- Added modal for returning players (showing profile card and giving the options to start, start muted, or change save)
- Added modal for new players (import save, reset save, or create save (*does not override existing save if there is one))
- Added modal for save creation (giving start options: sound, tutorial, player name)
- Added modal for account management (logging in, verifying, etc.)
- Added modal for Cloud Save
- Added modals for resetting password and entering new password
- Added modal for Import from file Setting

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
- Added Setting to disable Quotes
- The quote box is now combined with the game name above (same width)
- Long quotes get the scrolling effect (from mobile), as the width is limited now

-> Achievements:
- Added 2 new Achievements (240 -> 242)
- One for having a verified account, one for using all 5 methods of saving

-> Player Profile:
- Added 1 new PFP
- Added 1 new Banner (special)
- Both are awarded for creating and verifying an account
- Fixed issue with some cosmetics images

-> Settings:
- New Design Setting: Toggle Quotes
- New Savefile Setting: Cloud Save
- Import from file Setting now uses a modal, removed select file button from Settings area

-> Music:
- New song: Servant of the Clouds
- Music no longer starts after the first click
- Instead, it starts when using the welcome modal's Start button (Start muted or clicking the modal away do not start music)
- Improved music loading on start

-> Server (technical details): 
- Server uptime is not guaranteed (but it should be >99%)
- The server commands, database commands & more are documented (code/online/SERVER_DOC.md)
- If, for whatever reason, the official server permanently closes, community-run servers become fully permitted, and can be setup with the documentation and some experience. Stop killing games!
- schema.sql and .env.example are available

-> Other:
- Another attempt at fixing random crashes during loading
- Converted patch_notes.txt to PATCH_NOTES.md
- Fixed issue with Currencies help button
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
    value: window.location.toString().includes("localhost") && false,
    writable: false,
    enumerable: true,
    configurable: false
});