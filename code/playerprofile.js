// Game made by Schrottii - editing or stealing is prohibited!

const profileCanvas = document.getElementById("profileCanvas");
const pctx = profileCanvas.getContext("2d");

var profileCanvasWidth = 10;
var profileCanvasHeight = 10;
var profileTextSizeMulti = 1;

let pfp = new Image();
pfp.src = "images/shgabbicon.png";

let pfpbg = new Image();
pfpbg.src = "images/achievements/empty.png";

// PFPs

class PFP {
    constructor(ID, image, unlock) {
        this.ID = ID;
        this.image = image;
        this.unlock = unlock;
    }

    getType() {
        if (this.ID >= 400) return "Event";
        if (this.ID >= 300) return "Currency";
        if (this.ID >= 100) return "Normal";
    }
}

function renderPFPs() {
    let render = "";

    for (p in pfps) {
        if (pfps[p].unlock()) render = render + "<button class='artifact' onclick='setPFP(" + pfps[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230)'><img src='" + pfps[p].image + "' style='width: 50%'><br />" + pfps[p].getType() + "</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130)'>"/*<img src='" + pfps[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + pfps[p].getType() + "</button>"
    }
    ui.pfps.innerHTML = render;
}

function setPFP(id) {
    game.profile.pfp = id;
}

function getPFPByID(id) {
    // Use this to get a pfp
    for (a in pfps) {
        if (pfps[a].ID == id) return pfps[a];
    }
    return 100;
}

var pfps = [
    // 100 - 299 | Normal/Generic/Random PFPs
    new PFP(100, "images/shgabbicon.png", () => true),

    // 300 - 399 | Currency PFPs
    new PFP(300, "images/currencies/shgabb.png", () => game.ach.includes(21)),
    new PFP(301, "images/currencies/sandwich.png", () => game.ach.includes(24)),
    new PFP(302, "images/currencies/gs.png", () => game.ach.includes(26)),
    new PFP(303, "images/currencies/silicone.png", () => game.ach.includes(25)),
    new PFP(304, "images/currencies/ameliorer.png", () => game.ach.includes(58)),
    new PFP(305, "images/currencies/gem.png", () => game.ach.includes(55)),

    // 400 - 599 | Event PFPs
    new PFP(400, "images/currencies/gift.png", () => game.evpfps.includes(400)),
    new PFP(401, "images/gift2.png", () => game.evpfps.includes(401)),
    new PFP(402, "images/ball.png", () => game.evpfps.includes(402)),
]

function calculateProfileCanvasSize() {
    profileCanvasWidth = window.innerWidth;
    profileCanvasHeight = profileCanvasWidth / 2;
    profileTextSizeMulti = Math.max(1, (window.innerWidth - 312) / 312);

    profileCanvas.width = profileCanvasWidth;
    profileCanvas.height = profileCanvasHeight;
}

function changePlayerName() {
    let newName = prompt("New name? (Max. 16 characters)");
    if (newName != "" && newName != undefined && newName != false) {
        game.profile.name = newName.substr(0, 16);
    }
}

function renderPlayerProfile() {
    calculateProfileCanvasSize();
    let w = profileCanvasWidth ;
    let h = profileCanvasHeight ;

    // Background
    pctx.fillStyle = "darkgray";
    pctx.fillRect(0, 0, w, h);

    // PFP
    pctx.fillStyle = "black";
    pctx.fillRect(w * 0.05, w * 0.05, w * 0.3, w * 0.3);
    pfp.src = getPFPByID(game.profile.pfp).image;
    pctx.drawImage(pfpbg, w * 0.075, w * 0.075, w * 0.25, w * 0.25);
    pctx.drawImage(pfp, w * 0.075, w * 0.075, w * 0.25, w * 0.25);

    // Name
    pctx.font = (20 * profileTextSizeMulti) + "px Times New Roman";
    ctx.textAlign = "left";
    pctx.fillText(game.profile.name, w * 0.4, w * 0.1)

    // Start
    pctx.font = (12 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Started in: v" + game.profile.startVer + " / "+ formatDate(game.profile.startDay), w * 0.025, w * 0.475)

    // Stats
    pctx.font = (16 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Highest More Shgabb: " + game.stats.hms, w * 0.4, w * 0.2)
    pctx.fillText("Artifacts Unlocked: " + Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1), w * 0.4, w * 0.25)
    pctx.fillText("Achievements: " + game.ach.length + "/" + achievements.length, w * 0.4, w * 0.3)
}