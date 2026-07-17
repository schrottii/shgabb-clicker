var modals = {};
var currentModal = "";
var modalContainer = document.getElementById("modals");
var modalContentContainer = document.getElementById("modalsContent");

function toggleModal(name, forcemode = "") {
    if (modals[name] == undefined && name != "") return false;

    if ((name == currentModal || forcemode == "close") && forcemode != "open") {
        // CLOSE
        // is already current
        currentModal = "";
        modalContainer.style.display = "none";
    }
    else {
        // OPEN
        // open it and set as current
        modalContentContainer.innerHTML = `<span class="modal-close" onclick="toggleModal('', 'close');">&times;</span>
        <h2>${modals[name].title}</h2>
        <hr style='clear: both;' />
        ${modals[name].content}`;

        modals[name].open();

        currentModal = name;
        modalContainer.style.opacity = "0%";
        modalContainer.style.display = "block";
    }
}

class Modal {
    constructor(title, content, tickFunction) {
        this.title = title;
        this.content = content;
        this.tickFunction = tickFunction != undefined ? tickFunction : "() => {}";

        let uiElements = content.split("id=");
        for (let e = 0; e < uiElements.length; e++) {
            if (uiElements[e][0] !== "'" && uiElements[e][0] !== '"') {
                uiElements.splice(e, 1);
                e--;
            }
            else {
                //if (uiElements[e][0] === '"') console.log(uiElements[e].split('"')[1]);
                if (uiElements[e][0] === "'") uiElements[e] = uiElements[e].split("'")[1];
                if (uiElements[e][0] === '"') uiElements[e] = uiElements[e].split('"')[1];
            }
        }
        this.uiElementsNames = uiElements;
    }

    open() {
        let uiElements = {};

        for (let e of this.uiElementsNames) {
            uiElements[e] = document.getElementById(e);
        }
        this.uiElements = uiElements;
    }

    write(element, text) {
        if (this.uiElements[element] == undefined || this.uiElements[element].innerHTML == undefined) return false;
        if (this.uiElements[element].innerHTML == text) return true;
        this.uiElements[element].innerHTML = text;
        return true;
    }
}

modals = {
    "default": new Modal("This is an example modal",
        ` 
        My favorite food is: <span id="modal-text1"></span> <br />
        Shgabb amount: <span id='shgabbAmount69'>0</span> <br />
        <img src='images/arti/sosnog.png' style='height: 50%;' />
        `,
        (m, tick) => {
            if (Math.random() >= 0.99) m.write("modal-text1", ["cheese", "pizza", "casserole"][Math.floor(Math.random() * 3)]);
            m.write("shgabbAmount69", game.shgabb);
        }
    ),
    "welcomeback": new Modal("Welcome back to Shgabb Clicker v" + gameVersion,
        ` 
        <h3>Welcome back, <span id="modal-playername"></span></h3>
        <br />
        
        <canvas style="display: none;" id="profileCanvas2" class="playerProfile"></canvas><br />

        <br /> <br />

        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="toggleModal('welcomeback', 'close'); toggleModal('welcomenew');">Not you? / Wrong savefile?</button>
        <br /><br />

        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="startMusic(); toggleModal('welcomeback', 'close');">Start</button>
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="startMusic(true); toggleModal('welcomeback', 'close');">Start muted</button>

        <br /><br />
        <br /><sub><span style='float: left; margin-top: -48px;'><img src='images/bananatree.png' /></span><span style='float: center; position:absolute;'>${legalLinks}</span><span style='float: right;'>${legalOwner}</span></sub>
        `,
        (m, tick) => {
            m.write("modal-playername", game.profile.name + "<br />HMS: " + game.stats.hms + "<br />Play time: " + (game.stats.playTime > 18000 ? (statLoader("playTime", false) / 3600).toFixed(1) + " hours" : statLoader("playTime")));

            if (game.stats.hms >= 100) {
                profileCanvas = document.getElementById("profileCanvas2");
                pctx = profileCanvas.getContext("2d");

                profileCanvas.style.display = "";
                renderPlayerProfile();
            }
        }
    ),
    "welcomenew": new Modal("Welcome to Shgabb Clicker",
        ` 
        <h3>Returning player?</h3>
        If you are a returning player: <br />
        
        <button class="shbookButton" style="vertical-align: middle; width: 20%; height: 64px;" onclick="let result = importButton(); if (result === true) { toggleModal('welcomenew', 'close'); toggleModal('welcomeback'); }">Import</button>
        ` + (isSaveExisting() ? `<button class="shbookButton" style="vertical-align: middle; width: 20%; height: 64px;" onclick="toggleModal('welcomenew', 'close'); toggleModal('welcomeback');">Go to "Welcome back" screen</button>` : "")
        //<button class="shbookButton" style="width: 20%; height: 64px;" onclick="deleteGame();">Delete existing save</button>
        + `
        <br /><br />

        <h3>New player?</h3>
        <span id="modal-newsavetext" /></span> <br />
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="if (game.stats.hms > 0) { deleteGame(); } toggleModal('welcomeback', 'close'); toggleModal('welcomenewsave');">Create new save</button>

        <br /><br />
        <br /><sub><span style='float: left; margin-top: -48px; position: absolute; left: 12%;'><img src='images/welcome.png' /></span><span style='float: center; position:absolute;'>${legalLinks}</span><span style='float: right;'>${legalOwner}</span></sub>
        `,
        (m, tick) => {
            m.write("modal-newsavetext", !isSaveExisting() ? "If you are ready to start your journey:" : "Pressing this will create a new save and DELETE the one you currently have. (" + game.stats.hms + " HMS)")
        }
    ),
    "welcomenewsave": new Modal("Welcome: creating new save",
        ` 
        <h3>Start settings</h3>
        All of these are optional and can be changed later. In the game you will have a lot more settings! <br />
        <table align='center' style="background-color: rgb(150, 150, 255);">
        <tr><td><input style='transform: scaleX(400%) scaleY(150%)' type="checkbox" id="welcomenewsave-sound"></td><td>Start with sound</td></tr>
        <tr><td><input style='transform: scaleX(400%) scaleY(150%)' type="checkbox" id="welcomenewsave-tutorial"></td><td>Start tutorial</td></tr>
        <tr><td><input type="text" maxlength="16" size="16" id="welcomenewsave-username"></td><td>Username</td></tr>
        </table>

        <h3>Your start data</h3>
        <ul style="margin-left: 30%; width: 40%; text-align: left;">
        <li>Game version: v${gameVersion}</li>
        <li>Start date: ${formatDate(today())}</li>
        </ul>
        <br />

        <h3>Create the new save</h3>
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="createNewSave();">Start</button>
        `,
        (m, tick) => {
        }
    ),
    "accountmanagement": new Modal("Account management",
        `
        <table align='center' style="background-color: rgb(150, 150, 255); font-size: 24px;">
        <tr><td><input id="cloudSave-username" type="text" maxlength="32" size="32" style="font-size: 24px;"></td><td>Username</td></tr>
        <tr><td><input id="cloudSave-password" type="password" maxlength="64" size="32" style="font-size: 24px;"></td><td>Password</td></tr>
        <tr><td><input id="cloudSave-email" type="text" maxlength="64" size="32" style="font-size: 24px;"></td><td>E-Mail</td></tr>
        </table>

        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="client_account_register();">Register</button>
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="client_account_login();">Login</button>
        <br />

        <span id="accountLoginStatus"></span>
        <br />

        <div id="cloudSaveButton"></div>
        `,
        (m, tick) => {
            if (isLoggedIn) {
                m.write("cloudSaveButton", `
        <h3>Cloud save</h3>
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="toggleModal('accountmanagement', 'close'); toggleModal('cloudsave');">Cloud Save</button>`);
            }
            else {
                m.write("cloudSaveButton", "Log in to access cloud save");
            }
        }
    ),
    "cloudsave": new Modal("Cloud Save",
        `
        <table align='center' style="background-color: rgb(150, 150, 255); font-size: 24px;">
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="client_cloud_upload();">Upload save</button>
        <button class="shbookButton" style="width: 20%; height: 64px;" onclick="client_cloud_download();">Download save</button>
        </table>
        <br />

        <span id="cloudSaveStatus"></span>
        `,
        (m, tick) => {
        }
    )
};