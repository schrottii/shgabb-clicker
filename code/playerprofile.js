// Game made by Schrottii - editing or stealing is prohibited!

const profileCanvas = document.getElementById("profileCanvas");
const pctx = profileCanvas.getContext("2d");

var profileCanvasWidth = 10;
var profileCanvasHeight = 10;
var profileTextSizeMulti = 1;

let pfp = new Image();
pfp.src = "images/shgabbicon.png";

let banner = new Image();
banner.src = "images/shgabbicon.png";

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

class Banner {
    constructor(ID, image, unlock) {
        this.ID = ID;
        this.image = image;
        this.unlock = unlock;
    }

    getType() {
        if (this.ID >= 600) return "Challenge";
        if (this.ID >= 400) return "Event";
        if (this.ID >= 300) return "Currency";
        if (this.ID >= 100) return "Normal";
        return "None";
    }
}

function renderPFPs() {
    let render = "";

    for (p in pfps) {
        if (pfps[p].unlock()) render = render + "<button class='artifact' onclick='setPFP(" + pfps[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230); font-size: 20px'><img src='" + pfps[p].image + "' style='width: 50%'><br />" + pfps[p].getType() + "</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130); font-size: 20px'>"/*<img src='" + pfps[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + pfps[p].getType() + "</button>"
    }
    ui.pfps.innerHTML = render;
}

function renderBanners() {
    let render = "";

    for (p in banners) {
        if (banners[p].unlock()) render = render + "<button class='artifact' onclick='setBanner(" + banners[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230); font-size: 20px'><img src='" + banners[p].image + "' style='width: 50%'><br />" + banners[p].getType() + "</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130); font-size: 20px'>"/*<img src='" + banners[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + banners[p].getType() + "</button>"
    }
    ui.banners.innerHTML = render;
}

function setPFP(id) {
    game.profile.pfp = id;
}

function setBanner(id) {
    game.profile.banner = id;
}

function getPFPByID(id) {
    // Use this to get a pfp
    for (a in pfps) {
        if (pfps[a].ID == id) return pfps[a];
    }
    return pfps[0];
}

function getBannerByID(id) {
    // Use this to get a banner
    for (a in banners) {
        if (banners[a].ID == id) return banners[a];
    }
    return banners[0];
}

var pfps = [
    // 100 - 299 | Normal/Generic/Random PFPs
    new PFP(100, "images/playerprofile/shgabbicon.png", () => true),
    new PFP(101, "images/playerprofile/winner.png", () => game.stats.hms >= 5000),
    new PFP(102, "images/playerprofile/phone.png", () => game.stats.hms >= 10000),

    // 300 - 399 | Currency PFPs
    new PFP(300, "images/currencies/shgabb.png", () => game.ach.includes(21)),
    new PFP(301, "images/currencies/sandwich.png", () => game.ach.includes(24)),
    new PFP(302, "images/currencies/gs.png", () => game.ach.includes(26)),
    new PFP(303, "images/currencies/silicone.png", () => game.ach.includes(25)),
    new PFP(304, "images/currencies/ameliorer.png", () => game.ach.includes(58)),
    new PFP(305, "images/currencies/gem.png", () => game.ach.includes(55)),
    new PFP(306, "images/currencies/bag.png", () => game.ach.includes(109)),
    new PFP(307, "images/currencies/copper.png", () => game.ach.includes(146)),

    // 400 - 599 | Event PFPs
    new PFP(400, "images/currencies/gift.png", () => game.evpfps.includes(400)),
    new PFP(401, "images/playerprofile/gift2.png", () => game.evpfps.includes(401)),
    new PFP(402, "images/playerprofile/ball.png", () => game.evpfps.includes(402)),

    new PFP(403, "images/playerprofile/party-pfp1.png", () => game.ach.includes(77)),
    new PFP(404, "images/playerprofile/party-pfp2.png", () => game.ach.includes(78)),
    new PFP(405, "images/cake.png", () => game.ach.includes(79)),

    new PFP(406, "images/currencies/qian.png", () => game.evpfps.includes(406)),
    new PFP(407, "images/playerprofile/chinese-pfp1.png", () => game.evpfps.includes(407)),
    new PFP(408, "images/playerprofile/chinese-pfp2.png", () => game.evpfps.includes(408)),

    new PFP(409, "images/eggs/egg1.png", () => game.evpfps.includes(409)),
    new PFP(410, "images/eggs/egg2.png", () => game.evpfps.includes(410)),
    new PFP(411, "images/eggs/egg3.png", () => game.evpfps.includes(411)),
    new PFP(412, "images/eggs/egg4.png", () => game.evpfps.includes(412)),
    new PFP(413, "images/eggs/egg5.png", () => game.evpfps.includes(413)),
    new PFP(414, "images/eggs/egg6.png", () => game.evpfps.includes(414)),

    new PFP(415, "images/pride/shgabb-prideflag.png", () => game.evpfps.includes(415)),
    new PFP(416, "images/pride/shgabb-transflag.png", () => game.evpfps.includes(416)),
    new PFP(417, "images/pride/loveheart.png", () => game.evpfps.includes(417)),
];

var banners = [
    // 100 - 299 | Normal/Generic/Random Banners
    new Banner(0, "", () => true),
    new Banner(100, "images/playerprofile/banner1.png", () => true),
    new Banner(101, "images/playerprofile/banner2.png", () => game.stats.hms >= 2000),
    new Banner(102, "images/playerprofile/shgabb-banner.png", () => game.stats.hms >= 4000),

    // 300 - 399 | Currency Banners

    // 400 - 599 | Event Banners
    new Banner(400, "images/pride/pride-normal.png", () => game.evbans.includes(400)),
    new Banner(401, "images/pride/pride-trans.png", () => game.evbans.includes(401)),
    new Banner(402, "images/pride/pride-nonbinary.png", () => game.evbans.includes(402)),
    new Banner(403, "images/pride/pride-lesbian.png", () => game.evbans.includes(403)),
    new Banner(404, "images/pride/pride-gay.png", () => game.evbans.includes(404)),
    new Banner(405, "images/pride/pride-bi.png", () => game.evbans.includes(405)),
    new Banner(406, "images/pride/pride-pan.png", () => game.evbans.includes(406)),
    new Banner(407, "images/pride/pride-a.png", () => game.evbans.includes(407)),
    new Banner(408, "images/pride/pride-inter.png", () => game.evbans.includes(408)),
    new Banner(409, "images/pride/pride-shgabb.png", () => game.evbans.includes(409)),

    // 600 - 699 | Challenge Banners
    new Banner(600, "images/playerprofile/challenge-banner.png", () => getHighestTier() >= 3),
    new Banner(601, "images/challenges/challenge1.png", () => game.clg[1] >= 3),
    new Banner(602, "images/challenges/challenge2.png", () => game.clg[2] >= 3),
    new Banner(603, "images/challenges/challenge3.png", () => game.clg[3] >= 3),
    new Banner(604, "images/challenges/challenge4.png", () => game.clg[4] >= 3),
    new Banner(605, "images/challenges/challenge5.png", () => game.clg[5] >= 3),
    new Banner(606, "images/challenges/challenge6.png", () => game.clg[6] >= 3),
];

function calculateProfileCanvasSize() {
    profileCanvasWidth = window.innerWidth;
    profileCanvasHeight = profileCanvasWidth / 2;
    profileTextSizeMulti = Math.max(1, (window.innerWidth - 312) / 312);

    profileCanvas.width = profileCanvasWidth;
    profileCanvas.height = profileCanvasHeight;

    pctx.imageSmoothingEnabled = false;
}

function changePlayerName() {
    let newName = prompt("New name? (Max. 16 characters)");
    if (newName != "" && newName != undefined && newName != false) {
        game.profile.name = newName.substr(0, 16);
        if (!game.ach.includes(87)) game.ach.push(87);
    }
}

function renderPlayerProfile() {
    calculateProfileCanvasSize();
    let w = profileCanvasWidth;
    let h = profileCanvasHeight;

    // Background
    pctx.fillStyle = "darkgray";
    pctx.fillRect(0, 0, w, h);

    // Banner
    if (game.profile.banner != 0) {
        banner.src = getBannerByID(game.profile.banner).image;
        pctx.drawImage(banner, 0, 0, w, w * 0.1);
    }

    // PFP
    pctx.fillStyle = "black";
    pctx.fillRect(w * 0.05, w * 0.1, w * 0.3, w * 0.3);
    pfp.src = getPFPByID(game.profile.pfp).image;
    pctx.drawImage(pfpbg, w * 0.075, w * 0.125, w * 0.25, w * 0.25);
    pctx.drawImage(pfp, w * 0.075, w * 0.125, w * 0.25, w * 0.25);

    // Name
    pctx.font = (20 * profileTextSizeMulti) + "px Times New Roman";
    pctx.textAlign = "left";
    pctx.fillText(game.profile.name, w * 0.4, w * 0.15)

    // Start
    pctx.font = (12 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Start: v" + game.profile.startVer + " / " + formatDate(game.profile.startDay), w * 0.025, w * 0.475)

    // ID
    pctx.textAlign = "right";
    pctx.fillText("#" + game.profile.id.substr(0, 6), w * 0.975, w * 0.475)

    // Current version
    pctx.fillText("v" + gameVersion, w * 0.975, w * 0.125)

    // Stats
    pctx.textAlign = "left";
    pctx.font = (16 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Highest More Shgabb: " + game.stats.hms, w * 0.4, w * 0.25)
    pctx.fillText("Artifacts Unlocked: " + getArtifactAmount() + "/" + totalAmountOfArtifacts(), w * 0.4, w * 0.3)
    pctx.fillText("Achievements: " + game.ach.length + "/" + achievements.length, w * 0.4, w * 0.35)
}