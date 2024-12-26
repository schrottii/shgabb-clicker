// Game made by Schrottii - editing or stealing is prohibited!

const profileCanvas = document.getElementById("profileCanvas");
const pctx = profileCanvas.getContext("2d");

var profileCanvasWidth = 10;
var profileCanvasHeight = 10;
var profileTextSizeMulti = 1;

let pfp = new Image();
pfp.src = "images/playerprofile/pfps/shgabbicon.png";

let banner = new Image();
banner.src = "images/playerprofile/pfps/shgabbicon.png";

let pfpbg = new Image();
pfpbg.src = "images/playerprofile/bg.png";

let pfpframe = new Image();
pfpframe.src = "images/playerprofile/frames/defaultframe.png";

// PFPs

class PFP {
    constructor(ID, name, image, unlock) {
        this.ID = ID;
        this.name = name;
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
    constructor(ID, name, image, unlock) {
        this.ID = ID;
        this.name = name;
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

class Frame {
    constructor(ID, name, image, unlock) {
        this.ID = ID;
        this.name = name;
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
    ui.playerprofile.innerHTML = renderPFPsPart() + `<br /><button onclick="setRandomPFP()" class="settingButton">Random PFP</button><br />`;
}

function renderPFPsPart() {
    let render = "<h3>PFPs</h3>";

    for (p in pfps) {
        if (pfps[p].unlock()) render = render + "<button class='artifact' onclick='setPFP(" + pfps[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230); font-size: 20px'><img src='" + pfps[p].image + "' style='width: 50%'><br />" + pfps[p].name + "<br />(" + pfps[p].getType() + ")</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130); font-size: 20px'>"/*<img src='" + pfps[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + pfps[p].getType() + "</button>"
    }

    return render;
}

function renderBanners(){
    ui.playerprofile.innerHTML = renderBannersPart() + `<br /><button onclick="setRandomBanner()" class="settingButton">Random Banner</button><br />`;
}

function renderBannersPart() {
    let render = "<h3>Banners</h3>";

    for (p in banners) {
        if (banners[p].unlock()) render = render + "<button class='artifact' onclick='setBanner(" + banners[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230); font-size: 20px'><img src='" + banners[p].image + "' style='width: 50%'><br />" + banners[p].name + "<br />(" + banners[p].getType() + ")</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130); font-size: 20px'>"/*<img src='" + banners[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + banners[p].getType() + "</button>"
    }

    return render;
}

function renderFrames() {
    ui.playerprofile.innerHTML = renderFramesPart() + `<br /><button onclick="setRandomFrame()" class="settingButton">Random Frame</button><br />`;
}

function renderFramesPart() {
    let render = "<h3>Frames</h3>";

    for (p in frames) {
        if (frames[p].unlock()) render = render + "<button class='artifact' onclick='setFrame(" + frames[p].ID + ")' style='color: black; background-color: rgb(230, 230, 230); font-size: 20px'><img src='" + frames[p].image + "' style='width: 50%'><br />" + frames[p].name + "<br />(" + frames[p].getType() + ")</button>"
        else render = render + "<button class='artifact' style='color: black; background-color: rgb(130, 130, 130); font-size: 20px'>"/*<img src='" + frames[p].image + "' style='width: 25%; filter: grayscale(100);'><br />*/ + "Locked...<br />" + frames[p].getType() + "</button>"
    }

    return render;
}

function renderPlayerProfileAll() {
    let renderAll = renderPFPsPart();

    renderAll = renderAll + renderBannersPart();
    renderAll = renderAll + renderFramesPart();

    renderAll = renderAll +
        `<br /><button onclick="setRandomPFP()" class="settingButton">Random PFP</button>`
        + `<br /><button onclick="setRandomBanner()" class="settingButton">Random Banner</button>`
        + `<br /><button onclick="setRandomFrame()" class="settingButton">Random Frame</button>`
        + "<br />";

    ui.playerprofile.innerHTML = renderAll;
}

function setPFP(id) {
    game.profile.pfp = id;

    renderPlayerProfile();
}

function setBanner(id) {
    game.profile.banner = id;

    renderPlayerProfile();
}

function setFrame(id) {
    game.profile.frame = id;

    renderPlayerProfile();
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

function getFrameByID(id) {
    // Use this to get a banner
    for (a in frames) {
        if (frames[a].ID == id) return frames[a];
    }
    return frames[0];
}

var pfps = [
    // 100 - 299 | Normal/Generic/Random PFPs
    new PFP(100, "Shgabb", "images/playerprofile/pfps/shgabbicon.png", () => true),
    new PFP(101, "Winner", "images/playerprofile/pfps/winner.png", () => game.stats.hms >= 5000),
    new PFP(102, "Mobile", "images/playerprofile/pfps/phone.png", () => game.stats.hms >= 10000),

    // 300 - 399 | Currency PFPs
    new PFP(300, "Shgabb", "images/currencies/shgabb.png", () => game.ach.includes(21)),
    new PFP(301, "Sandwich", "images/currencies/sandwich.png", () => game.ach.includes(24)),
    new PFP(302, "GS", "images/currencies/gs.png", () => game.ach.includes(26)),
    new PFP(303, "Silicone", "images/currencies/silicone.png", () => game.ach.includes(25)),
    new PFP(304, "Améliorer", "images/currencies/ameliorer.png", () => game.ach.includes(58)),
    new PFP(305, "Gem", "images/currencies/gem.png", () => game.ach.includes(55)),
    new PFP(306, "Bag", "images/currencies/bag.png", () => game.ach.includes(109)),
    new PFP(307, "Copper", "images/currencies/copper.png", () => game.ach.includes(146)),

    // 400 - 599 | Event PFPs
    new PFP(400, "Gift 1", "images/currencies/gift.png", () => game.evpfps.includes(400)),
    new PFP(401, "Gift 2",  "images/playerprofile/pfps/gift2.png", () => game.evpfps.includes(401)),
    new PFP(402, "Dingle Ball", "images/playerprofile/pfps/ball.png", () => game.evpfps.includes(402)),
    new PFP(426, "Snowflake", "images/playerprofile/pfps/snowflake.png", () => game.evpfps.includes(426)),

    new PFP(403, "Party! 1", "images/playerprofile/pfps/party-pfp1.png", () => game.ach.includes(77)),
    new PFP(404, "Party! 2", "images/playerprofile/pfps/party-pfp2.png", () => game.ach.includes(78)),
    new PFP(405, "Big Cake", "images/cake.png", () => game.ach.includes(79)),

    new PFP(406, "Qian", "images/currencies/qian.png", () => game.evpfps.includes(406)),
    new PFP(407, "Chinese 1", "images/playerprofile/pfps/chinese-pfp1.png", () => game.evpfps.includes(407)),
    new PFP(408, "Chinese 2", "images/playerprofile/pfps/chinese-pfp2.png", () => game.evpfps.includes(408)),

    new PFP(409, "Egg 1", "images/playerprofile/pfps/egg1.png", () => game.evpfps.includes(409)),
    new PFP(410, "Egg 2", "images/playerprofile/pfps/egg2.png", () => game.evpfps.includes(410)),
    new PFP(411, "Egg 3", "images/playerprofile/pfps/egg3.png", () => game.evpfps.includes(411)),
    new PFP(412, "Egg 4", "images/playerprofile/pfps/egg4.png", () => game.evpfps.includes(412)),
    new PFP(413, "Hatched!", "images/playerprofile/pfps/egg5.png", () => game.evpfps.includes(413)),
    new PFP(414, "Holy Cross", "images/playerprofile/pfps/egg6.png", () => game.evpfps.includes(414)),

    new PFP(415, "Pride PFP", "images/pride/shgabb-prideflag.png", () => game.evpfps.includes(415)),
    new PFP(416, "Trans PFP", "images/pride/shgabb-transflag.png", () => game.evpfps.includes(416)),
    new PFP(417, "Loveheart", "images/pride/loveheart.png", () => game.evpfps.includes(417)),

    new PFP(418, "Shorts", "images/currencies/shorts.png", () => game.evpfps.includes(418)),
    new PFP(419, "Smiling Sun", "images/playerprofile/pfps/sun.png", () => game.evpfps.includes(419)),
    new PFP(420, "Sunglasses", "images/playerprofile/pfps/sunglasses.png", () => game.evpfps.includes(420)),

    new PFP(421, "Evil Candle", "images/playerprofile/pfps/stw-pfp1.png", () => game.evpfps.includes(421)),
    new PFP(422, "Creature of the Void", "images/playerprofile/pfps/stw-pfp2.png", () => game.evpfps.includes(422)),
    new PFP(423, "Witch Moon", "images/playerprofile/pfps/stw-pfp3.png", () => game.evpfps.includes(423)),
    new PFP(424, "Candle", "images/currencies/candle.png", () => game.evpfps.includes(424)),
    new PFP(425, "Witch Shgabb", "images/currencies/witchshgabb.png", () => game.evpfps.includes(425)),
];

var banners = [
    // 100 - 299 | Normal/Generic/Random Banners
    new Banner(0, "No Banner", "", () => true),
    new Banner(100, "Epic Banner", "images/playerprofile/banners/banner1.png", () => true),
    new Banner(101, "Blue Gradient", "images/playerprofile/banners/banner2.png", () => game.stats.hms >= 2000),
    new Banner(102, "Stretched Shgabb", "images/playerprofile/banners/shgabb-banner.png", () => game.stats.hms >= 4000),

    // 300 - 399 | Currency Banners

    // 400 - 599 | Event Banners
    new Banner(400, "Rainbow Flag", "images/pride/pride-normal.png", () => game.evbans.includes(400)),
    new Banner(401, "Trans Flag",  "images/pride/pride-trans.png", () => game.evbans.includes(401)),
    new Banner(402, "Non-Binary Flag", "images/pride/pride-nonbinary.png", () => game.evbans.includes(402)),
    new Banner(403, "Lesbian Flag", "images/pride/pride-lesbian.png", () => game.evbans.includes(403)),
    new Banner(404, "MLM Flag", "images/pride/pride-gay.png", () => game.evbans.includes(404)),
    new Banner(405, "Bi Flag", "images/pride/pride-bi.png", () => game.evbans.includes(405)),
    new Banner(406, "Pan Flag", "images/pride/pride-pan.png", () => game.evbans.includes(406)),
    new Banner(407, "Asexual Flag", "images/pride/pride-a.png", () => game.evbans.includes(407)),
    new Banner(408, "Intersex Flag", "images/pride/pride-inter.png", () => game.evbans.includes(408)),
    new Banner(409, "Shgabbsexual Flag", "images/pride/pride-shgabb.png", () => game.evbans.includes(409)),

    new Banner(410, "Heat 1", "images/playerprofile/banners/summerbanner1.png", () => game.evbans.includes(410)),
    new Banner(411, "Heat 2", "images/playerprofile/banners/summerbanner2.png", () => game.evbans.includes(411)),
    new Banner(412, "Ceiling Sun", "images/playerprofile/banners/summerbanner3.png", () => game.evbans.includes(412)),
    new Banner(413, "Summer Beach", "images/playerprofile/banners/summerbanner4.png", () => game.evbans.includes(413)),

    new Banner(414, "Shgabb the Witch", "images/playerprofile/banners/shgabb-the-witch.png", () => game.evbans.includes(414)),
    new Banner(415, "Graveyard", "images/playerprofile/banners/stw-banner1.png", () => game.evbans.includes(415)),
    new Banner(416, "Game Over Candles", "images/playerprofile/banners/stw-banner2.png", () => game.evbans.includes(416)),
    new Banner(417, "Pumpkins Are Evil", "images/playerprofile/banners/stw-banner3.png", () => game.evbans.includes(417)),

    new Banner(418, "Many Winters Ago...", "images/playerprofile/banners/christmas-idlebar.png", () => game.evbans.includes(418)),
    new Banner(419, "Falling Snow", "images/playerprofile/banners/christmas-snowing.png", () => game.evbans.includes(419)),
    new Banner(420, "Christmas Lights", "images/playerprofile/banners/christmas-lights.png", () => game.evbans.includes(420)),

    // 600 - 699 | Challenge Banners
    new Banner(600, "Challenger", "images/playerprofile/banners/challenge-banner.png", () => getHighestTier() >= 3),
    new Banner(601, "Basic Climb", "images/challenges/challenge1.png", () => game.clg[1] >= 3),
    new Banner(602, "Blue Cuts", "images/challenges/challenge2.png", () => game.clg[2] >= 3),
    new Banner(603, "Manual Grind", "images/challenges/challenge3.png", () => game.clg[3] >= 3),
    new Banner(604, "Dementia", "images/challenges/challenge4.png", () => game.clg[4] >= 3),
    new Banner(605, "Ill-lit Dwn-upg", "images/challenges/challenge5.png", () => game.clg[5] >= 3),
    new Banner(606, "Inflation", "images/challenges/challenge6.png", () => game.clg[6] >= 3),
];


var frames = [
    // 100 - 299 | Normal/Generic/Random Frames
    new Banner(0, "No Frame", "", () => true),
    new Banner(100, "Default Frame", "images/playerprofile/frames/defaultframe.png", () => true),
    new Banner(101, "Thin Frame", "images/playerprofile/frames/thin.png", () => game.stats.hms >= 6000),
    new Banner(102, "3D Frame", "images/playerprofile/frames/3d.png", () => game.stats.hms >= 8000),

    // 300 - 399 | Currency Frames

    // 400 - 599 | Event Frames
    new Banner(400, "Cold Days", "images/playerprofile/frames/christmasframe1.png", () => game.evframes.includes(400)),
    new Banner(401, "Frozen", "images/playerprofile/frames/christmasframe2.png", () => game.evframes.includes(401)),
    new Banner(402, "Winter Time", "images/playerprofile/frames/christmasframe3.png", () => game.evframes.includes(402)),
];

function calcProfileCanvasSize() {
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

        checkAchievement(87);
        renderPlayerProfile();
    }
}

function setRandomPFP() {
    let availablePFPs = [];
    for (let pfp in pfps) {
        if (pfps[pfp].unlock()) availablePFPs.push(pfp);
    }
    let chosenPFP = Math.ceil(Math.random() * (availablePFPs.length - 1));
    chosenPFP = pfps[availablePFPs[chosenPFP]];

    setPFP(chosenPFP.ID);
}

function setRandomBanner() {
    let availableBanners = [];
    for (let ban in banners) {
        if (banners[ban].unlock()) availableBanners.push(ban);
    }
    let chosenBanner = Math.ceil(Math.random() * (availableBanners.length - 1));
    chosenBanner = banners[availableBanners[chosenBanner]];

    setBanner(chosenBanner.ID);
}

function setRandomFrame() {
    let availableFrames = [];
    for (let frame in frames) {
        if (frames[frame].unlock()) availableFrames.push(frame);
    }
    let chosenFrame = Math.ceil(Math.random() * (availableFrames.length - 1));
    chosenFrame = banners[availableFrames[chosenFrame]];

    setFrame(chosenFrame.ID);
}

var selectedPlayerProfile = 0;
function setPlayerProfileSelection(no) {
    document.getElementById("playerProfileButton1").style.backgroundColor = "white";
    document.getElementById("playerProfileButton2").style.backgroundColor = "white";
    document.getElementById("playerProfileButton3").style.backgroundColor = "white";
    document.getElementById("playerProfileButton" + no).style.backgroundColor = "yellow";

    selectedPlayerProfile = no;

    renderPlayerProfile();
}

function renderPlayerProfile() {
    if (selectedPlayerProfile == 1) renderPFPs();
    if (selectedPlayerProfile == 2) renderBanners();
    if (selectedPlayerProfile == 3) renderFrames();
    if (selectedPlayerProfile == 4) renderPlayerProfileAll();

    calcProfileCanvasSize();
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
    pfp.src = getPFPByID(game.profile.pfp).image;
    pfpframe.src = getFrameByID(game.profile.frame).image;

    pctx.drawImage(pfpbg, w * 0.04, w * 0.125, w * 0.25, w * 0.25);
    pctx.drawImage(pfp, w * 0.04, w * 0.125, w * 0.25, w * 0.25);
    pctx.drawImage(pfpframe, w * 0.015, w * 0.1, w * 0.3, w * 0.3);

    // Name
    pctx.fillStyle = "black";
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