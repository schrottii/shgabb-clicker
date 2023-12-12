// Game made by Schrottii - editing or stealing is prohibited!

const profileCanvas = document.getElementById("profileCanvas");
const pctx = profileCanvas.getContext("2d");

var profileCanvasWidth = 10;
var profileCanvasHeight = 10;
var profileTextSizeMulti = 1;

let pfp = new Image();
pfp.src = "images/arti/sosnog.png";

let pfpbg = new Image();
pfpbg.src = "images/achievements/empty.png";

// PFPs

class PFP {
    constructor(ID, image, unlock) {
        this.ID = ID;
        this.image = image;
        this.unlock = unlock;
    }
}

function renderPFPs() {
    let render = "";

    for (p in pfps) {
        if (pfps[p].unlock()) render = render + "<button class='artifact' onclick='setPFP(" + pfps[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230)'><img src='" + pfps[p].image + "'></button>"
    }
    ui.pfps.innerHTML = render;
}

function setPFP(id) {
    console.log(id);
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
    new PFP(100, "images/currencies/shgabb.png", () => true),
    new PFP(101, "images/currencies/sandwich.png", () => true),
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

    // Stats
    pctx.font = (16 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Highest More Shgabb: " + game.stats.hms, w * 0.4, w * 0.2)
    pctx.fillText("Artifacts Unlocked: " + Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1), w * 0.4, w * 0.25)
    pctx.fillText("Achievements: " + game.ach.length + "/" + achievements.length, w * 0.4, w * 0.3)
}