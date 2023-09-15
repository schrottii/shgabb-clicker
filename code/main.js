// Game made by Schrottii - editing or stealing is prohibited!

// Main JS File

// Game version and patch notes

const gameVersion = "1.8";

const currentPatchNotes = [
    "-> Minigame:",
    "- Added a minigame: Shgic Shgac Shgoe!",
    "- Unlocked together with Améliorer!",
    "- 1 attempt every day to get to 3 points before shgabb does",
    "- Get 2 Améliorer for a win",
    "-> New Upgrades:",
    "- New Sandwich upgrade: 2+2=5: Unlocked with Amé, increases gs gain",
    "- New Sandwich upgrade: Meaning Of Life: Unlocked with Amé, increases shgabb gain",
    "- New Améliorer Upgrade: More Sandwich Upgrades 2 (Max. lvl 2, fourth set)",
    "- New Améliorer Upgrade: Silicone Boost (Max. lvl 50, fourth set)",
    "-> Artifact Loadouts:",
    "- Loadouts can now be given custom names by clicking on the currently selected loadout",
    "- Added a fourth gem offer: Artifact Loadout - +1 loadout when bought, max. 8, costs increase",
    "- Reduced default loadouts from 3 to 2",
    "- Added support for loadouts 4 - 8",
    "-> Balance:",
    "- Amulet of Quick Snacks: 5k -> 10k (buff)",
    "- Amulet of Sluggard now also applies to shgabb from clicks (not just auto)",
    "-> Achievements:",
    "- Added 10 new achievements (40 -> 50)",
    "- Added images for artifact and minigame achievements",
    "- Changed the image of all unlock related achievements to the unlock image",
    "-> Design:",
    "- Gem Amount is now also displayed at the top (in a third line with Amé)",
    "- Updated all 3 social images",
    "- Changed size of social buttons",
    "- Artifacts and Achievements are now centered",
    "- Reduced min. width of Artifacts and Achievements (-> 3/row on normal phones)",
    "-> Other:",
    "- Added a setting to hide the unlevel button",
    "- Autosave notifications are now counted",
    "- Fixed weird brown squares near Artifacts and Achievements",
    "- Fixed extra line breaks in patch notes",
]

// BETA (cheating)

var BETA = {};
Object.defineProperty(BETA, 'isBeta', {
    value: true,
    writable: false,
    enumerable: true,
    configurable: false
});

// Various variables

var autoSaveTime = 3;
var quoteTime = 15;
var sandwichTime = 1;
var sandwichFreezeTime = 60;
var adTime = 10;
var adMax = 10;
var currentNotifications = [];

var time = 0;
var oldTime = 0;

var knifeBoost = 1;
var autoNotifications = 0;

var ui = {
    gameTitle: document.getElementById("gametitle"),
    patchNotes: document.getElementById("patchNotes"),

    clickButton: document.getElementById("clickButton"),
    cooldownBar: document.getElementById("cooldownBar"),
    sandwichBar: document.getElementById("sandwichBar"),
    adBar: document.getElementById("adBar"),
    adLoaded: document.getElementById("adloaded"),
    ameReset: document.getElementById("amereset"),
    ameReset2: document.getElementById("amereset2"),

    cheatCurrency: document.getElementById("cheatCurrency"),
    cheatAmount: document.getElementById("cheatAmount"),
    cheatDisplay: document.getElementById("cheatDisplay"),

    shgabbAmount: document.getElementById("shgabbAmount"),
    swAmount: document.getElementById("swAmount"),
    gsAmount: document.getElementById("gsAmount"),
    shgabbAmount2: document.getElementById("shgabbAmount2"),
    swAmount2: document.getElementById("swAmount2"),
    gsAmount2: document.getElementById("gsAmount2"),
    siAmount: document.getElementById("siAmount"),
    siAmount2: document.getElementById("siAmount2"),
    gemAmount: document.getElementById("gemAmount"),
    gemAmount2: document.getElementById("gemAmount2"),
    ameAmount: document.getElementById("ameAmount"),
    ameAmount2: document.getElementById("ameAmount2"),

    swImage: document.getElementById("swImage"),
    gsImage: document.getElementById("gsImage"),
    siImage: document.getElementById("siImage"),
    gemImage: document.getElementById("gemImage"),
    ameImage: document.getElementById("ameImage"),

    upgradesl: document.getElementById("upgradesl"),
    upgradesr: document.getElementById("upgradesr"),
    swupgradesl: document.getElementById("swupgradesl"),
    swupgradesr: document.getElementById("swupgradesr"),
    gsupgradesl: document.getElementById("gsupgradesl"),
    gsupgradesr: document.getElementById("gsupgradesr"),
    siupgradesl: document.getElementById("siupgradesl"),
    siupgradesr: document.getElementById("siupgradesr"),
    ameupgradesl: document.getElementById("ameupgradesl"),
    ameupgradesr: document.getElementById("ameupgradesr"),

    newArtifact: document.getElementById("newArtifact"),
    newArtifactImage: document.getElementById("newArtifactImage"),
    newArtifactName: document.getElementById("newArtifactName"),
    newArtifactText: document.getElementById("newArtifactText"),

    gemOffer1: document.getElementById("gemOffer1"),
    gemOffer2: document.getElementById("gemOffer2"),
    gemOffer3: document.getElementById("gemOffer3"),
    gemOffer4: document.getElementById("gemOffer4"),

    artifacts: document.getElementById("artifacts"),
    artifactamount: document.getElementById("artifactamount"),
    ameconvert: document.getElementById("ameconvert"),
    achievementsamount: document.getElementById("achievementsamount"),
    stats: document.getElementById("stats"),
    achievements: document.getElementById("achievements"),
    notifications: document.getElementById("notifications"),
    newestNotification: document.getElementById("newestnotif"),
    music: document.getElementById("music"),
    quote: document.getElementById("quote"),
    prestigeButton: document.getElementById("prestigebutton"),
}

var unlocks = {
    sandwich: document.getElementById("sandwichSection"),
    goldenShgabb: document.getElementById("goldenShgabbSection"),
    siliconeShgabb: document.getElementById("siliconeShgabbSection"),
    ameliorer: document.getElementById("ameliorerSection"),
    artifacts: document.getElementById("artifactSection"),
    gems: document.getElementById("gemSection"),
    cheats: document.getElementById("cheatSection"),
    minigameSection: document.getElementById("minigameSection"),
}

// Ad variables

var adHandler = document.getElementById("baldad");
var adButton = document.getElementById("adstartbutton");
var adLoaded = false;
var availableBoost = "none";
var currentBoost = "none";

const boosts = ["strongerClicks", "strongerAuto", "moreSandwiches", "fasterShgabb", "moreCrits", "moreSilicone"];
const boostTexts = {
    strongerClicks: "Stronger Clicks: Get 3x shgabb from clicks for 5 minutes",
    strongerAuto: "Stronger Auto: Get 10x automatic shgabb for 10 minutes",
    moreSandwiches: "More Sandwiches: Get sandwiches four times as often for 3 minutes",
    fasterShgabb: "Faster Shgabb: You can click 5x more often for 60 seconds",
    moreCrits: "More Crits: 5x critical hit chance and 3x crit boost for 2 minutes",
    moreSilicone: "More Silicone: Get 10x silicone shgabb for 3 minutes"
};
const adTimes = {
    strongerClicks: 300,
    strongerAuto: 600,
    moreSandwiches: 180,
    fasterShgabb: 60,
    moreCrits: 120,
    moreSilicone: 180,
};

// Quotes

const quotes = ["(I am always nice but whatever) - Schrottii",
    "I merge with my internal organs - K. whale",
    "how can i get this macdonald coin - Benio",
    "37 and 48 are basically the same - Topper",
    "I don't bathe - Schrottii",
    "Warning!!! I might react with tractor emoji - slowmerger",
    "im bus - Feline",
    "noooo he deleted my balls - shgabb",
    "2+3=3 you idiot - Schrottii",
    "You need 7.5k merges every second - Fishka",
    "I want to kick my own ass - Brickman",
    "WHy you ping him    don 't poing peopel - Schrottii",
    "@everyone piss break - shgabb",
    "My mental psyche is degrading at dangerous speed - slowmerger",
    "I may possibly thank you for that - slowmerger",
    "This game is not a full time job. - Graeme",
    "Why I so suddenly became ignorable - slowmerger",
    "they will go brr anyway - elmenda452",
    "i'm also surprised at how high i got - shgabb",
    "Finally, some not death-threatening message - slowmerger",
    "I am teriffied of this place - slowmerger",
    "You still insulted me, human. - slowmerger",
    "love - elmenda452",
    "dong - shgabb",
    ":fire::dance: cavemen be like - shgabb",
    "Should I reinstall again because of developers utter degeneracy - slowmerger",
    "hey shgabb can you send me a cat picture pls - Barduzzi",
    "Yes, really! If you tap now to watch a short video, you'll receive 30 minutes of ad-free music. - slowmerger",
    "Bro, this sounds like contract with a satan - DaGame",
    "When next update - Gjertollinni",
    "Stop pretending I'm an hamburger - Barduzzi",
    "touch my buttons :uwu: - shgabb",
    "onions are literally a mass torture device - elmenda452",
];

// Notations

const normalNotation = ["M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "UD", "DD", "TD", "What?!?!", "What?!?!2", "What?!?!3", "What?!?!4", "You Broke The Game", "I am crying", "no!!!"];

// More beta stuff

unlocks.cheats.style.display = BETA.isBeta ? "unset" : "none";

function cheatEngine(type) {
    let toCheat;
    if (cheatCurrency.value == "stats.playTime") toCheat = game.stats.playTime;
    else toCheat = game[cheatCurrency.value];
    switch (type) {
        case "add":
            toCheat += parseInt(cheatAmount.value);
            break;
        case "set":
            toCheat = parseInt(cheatAmount.value);
            break;
        case "sub":
            toCheat -= parseInt(cheatAmount.value);
            break;
    }
    if (cheatCurrency.value == "stats.playTime") game.stats.playTime = toCheat;
    else game[cheatCurrency.value] = toCheat;
    updateUI();
    updateArtifacts();
}

ui.cheatAmount.oninput = () => {
    ui.cheatDisplay.innerHTML = fn(ui.cheatAmount.value);
}

// format number
function fn(number) {
    number = Math.round(number * 10) / 10;
    if (number.toString().split("e").length > 1) {
        if (number.toString().split("e")[0].split(".")[1] != undefined) number = number.toString().split("e")[0].split(".")[0] + number.toString().split("e")[0].split(".")[1].substr(0, 3) + "0".repeat(parseInt(number.toString().split("e")[1]) - 3);
        number = number.toString().split("e")[0] + "0".repeat(parseInt(number.toString().split("e")[1]) - 3);
    }
    let dec = number.toString().substr(number.toString().length % 3 == 0 ? 3 : number.toString().length % 3, number.toString().length % 3 == 0 ? 1 : 2);
    if (number.toString().length > 6) return number.toString().substr(0, number.toString().length % 3 == 0 ? 3 : number.toString().length % 3) + (dec != "" ? ("." + dec) : "") + normalNotation[Math.floor((number.toString().length - 1) / 3 - 1) - 1];
    return number.toFixed(1).toString().substr(-1) == "0" ? number.toFixed(0) : number.toFixed(1);

    /*
    number = number.toString();
    if (number.length < 7) return number;
    if (number.split("e").length > 1) {
        number = number.split("e")[0].split(".")[0] + "0".repeat(parseInt(number.split("e")[1]));
    }
    let dec = number.split(".")[1] != undefined ? "." + number.split(".")[1].substr(2 - number.length % 3) : "";
    return number.substr(0, number.length % 3 == 0 ? 3 : number.length % 3) + dec + normalNotation[Math.ceil(number.length / 3) - 3];
    */
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    let amount = Math.floor(getProduction() * criticalHit() * (currentBoost == "strongerClicks" ? 3 : 1) * (getArtifactByID(200).isEquipped() ? 0 : 1));
    if (game.clickCooldown <= 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.stats.shgabbtp += amount;

        if (getArtifactByID(301).isEquipped() && game.clickCooldown > -0.33) {
            knifeBoost = Math.min(knifeBoost + 0.5, 20);
        }
        else knifeBoost = 1;

        if (Math.random() * 100 < siliconeShgabbUpgrades.siliconeFromClicks.currentEffect()) {
            let amount = 3 * getSiliconeProduction();
            game.si += amount;
            game.stats.si += amount;
        }

        game.clickCooldown = getCooldown();
        game.stats.clicks += 1;
        game.stats.ctp += 1;

        if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)) {
            amount = Math.floor((shgabbUpgrades.moreSw.currentEffect() + 1) * getArtifactBoost("sw")
                * goldenShgabbUpgrades.formaggi.currentEffect());
            game.sw += amount;
            game.stats.sw += amount;
            game.stats.swtp += amount;
            createNotification("+" + amount + " sandwich" + (amount > 1 ? "es" : "") + "!");
        }

        if (gemsUnlocked()) getGem();
        if (artifactsUnlocked()) getArtifact();
        updateArtifacts();
        updateUpgrades();
    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));
    }

    freezeTime();
}

function getFreezeTime() {
    return getArtifactByID(210).isEquipped() ? 5 : (60 + sandwichUpgrades.fridge.currentEffect());
}

function freezeTime() {
    sandwichFreezeTime = getFreezeTime();
}

// Various production functions

function getProduction(sosnog = false) {
    // Get the current shgabb production per click
    if (getArtifactByID(305).isEquipped() && sosnog == false) return getAutoProduction(true);
    return Math.ceil((1 + shgabbUpgrades.moreShgabb.currentEffect()) * shgabbUpgrades.bomblike.currentEffect() * (game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1)
        * goldenShgabbUpgrades.divineShgabb.currentEffect()
        * goldenShgabbUpgrades.gsBoost1.currentEffect()
        * ((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.currentEffect() / 100)) + 1)
        * getSiliconeBoost()
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * getArtifactBoost("shgabb")
        * getArtifactBoost("clickshgabb")
        * knifeBoost
        * (getArtifactByID(211).isEquipped() ? 0.6 : 1)
        * (getArtifactByID(302).isEquipped() ? 1 + game.stats.ctp * 0.005 : 1)
        * game.gemboost
        * ameliorerUpgrades.shgabbBoost.currentEffect()
        * ameliorerUpgrades.gsBoostsShgabb.currentEffect()
        * sandwichUpgrades.meaningOfLife.currentEffect()
    );
}

function getAutoProduction(sosnog2 = false) {
    if (getArtifactByID(305).isEquipped() && sosnog2 == false) return getProduction(true);
    return Math.ceil((sandwichUpgrades.autoShgabb.currentEffect()
        * goldenShgabbUpgrades.divineShgabb.currentEffect()
        * goldenShgabbUpgrades.gsBoost2.currentEffect()
        * getSiliconeBoost()
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * getArtifactBoost("shgabb")
        * knifeBoost
        * (getArtifactByID(302).isEquipped() ? 1 + game.stats.ctp * 0.005 : 1)
        * game.gemboost
        * ameliorerUpgrades.shgabbBoost.currentEffect()
        * ameliorerUpgrades.gsBoostsShgabb.currentEffect()

        + (getProduction(true) * sandwichUpgrades.cheese.currentEffect())) // CHEESE
        * getArtifactBoost("autoshgabb")
        * (currentBoost == "strongerAuto" ? 10 : 1)
        * (getArtifactByID(300).isEquipped() ? Math.max(1, (3 * game.clickCooldown + 1)) : 1)
    );
}

function getSiliconeProduction() {
    return Math.ceil(siliconeShgabbUpgrades.moreSilicone.currentEffect() * (currentBoost == "moreSilicone" ? 10 : 1)
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * goldenShgabbUpgrades.moreSilicone2.currentEffect()
        * ameliorerUpgrades.siliconeBoost.currentEffect()
        * getArtifactBoost("si")
    );
}

function getSiliconeBoost(level = "current") {
    if (level == "current") level = game.upgradeLevels.strongerSilicone;
    return (1 + Math.log((game.si / 1000) + 1) * (1 + siliconeShgabbUpgrades.strongerSilicone.effect(level) * Math.sqrt(game.stats.playTime))) * (getArtifactByID(304).isEquipped() ? 3 : 1);
}

function getCooldown() {
    return (5 - shgabbUpgrades.shorterCD.currentEffect() - goldenShgabbUpgrades.shortCD.currentEffect())
        / (currentBoost == "fasterShgabb" ? 5 : 1)
        / getArtifactBoost("clickspeed")
        * (getArtifactByID(156).isEquipped() ? 1.5 : 1)
        * (getArtifactByID(203).isEquipped() ? 5 : 1)
}

function getAchievementBoost() {
    return (game.upgradeLevels.achBExpo > 0 ? (Math.pow(1.02, game.ach.length)) : (1 + (game.ach.length / 50)));
}

function getGoldenShgabb() {
    return Math.floor(Math.max(10, (1 + Math.log(1 + game.stats.shgabbtp)) * (1 + Math.log(game.stats.swtp + 1))
        * (Math.max(1, Math.floor(shgabbUpgrades.moreShgabb.currentLevel() / 100 - 25))))
        * Math.ceil(shgabbUpgrades.moreShgabb.currentLevel() / 1000)
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * sandwichUpgrades.twoTwoFive.currentEffect()
        * (1 + (getSiliconeBoost() * siliconeShgabbUpgrades.siliconeAffectsGS.currentEffect()))
        * getArtifactBoost("gs")
        * (game.upgradeLevels.moreShgabb >= 1000 ? (Math.max(1, Math.min(3, 3 * (game.upgradeLevels.moreShgabb / game.stats.hms)))) : 1)
        * getAchievementBoost()
        );
}

function criticalHit() {
    // Critical hit handler, returns multi (default 3)
    if (Math.random() * 100 < shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) {
        createNotification("Critical Hit!");
        return shgabbUpgrades.critBoost.currentEffect() * (currentBoost == "moreCrits" ? 3 : 1);
    }
    return 1;
}

function sandwich() {
    let amount = getAutoProduction();
    if (amount > 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.stats.shgabbtp += amount;
        //createNotification("+" + amount + " shgabb");
    }

    updateUpgrades();
}

function silicone() {
    if (game.shgabb < 1000000000 && game.stats.si < 1) return false;
    if (getArtifactByID(304).isEquipped()) return false;

    let amount = getSiliconeProduction();
    if (amount > 0) {
        game.si += amount;
        game.stats.si += amount;
    }

    updateUpgrades();
}

// Setting toggle functions

function toggleMusic() {
    settings.music = !settings.music;
    createNotification("Music " + (settings.music ? "ON" : "OFF"));
    music.muted = !settings.music;
    if (!music.muted) {
        music.currentTime = 0;
        music.play();
    }
}

function toggleAdSound() {
    settings.adMusic = !settings.adMusic;
    createNotification("Ad Music " + (settings.adMusic ? "ON" : "OFF"));
    adHandler.muted = !settings.adMusic;
}

function toggleBG() {
    var body = document.getElementsByTagName('body')[0];
    if (body.style.backgroundImage != "none") {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
        createNotification("Background OFF");
    }
    else {
        body.style.backgroundImage = "url(images/shgabb-background.png)";
        body.style.backgroundColor = "none";
        createNotification("Background ON");
    }
}

function toggleCurrent() {
    settings.displayCurrent = !settings.displayCurrent;
    createNotification("Current Effect " + (settings.displayCurrent ? "ON" : "OFF"));
    updateUpgrades();
}

function hideMaxed() {
    settings.hideMaxed = !settings.hideMaxed;
    createNotification("" + (settings.hideMaxed ? "HIDE maxed" : "SHOW maxed"));
    updateUpgrades();
}

function toggleUnlevel() {
    settings.hideUnlevel = !settings.hideUnlevel;
    createNotification("Unlevel button " + (settings.hideUnlevel ? "ON" : "OFF"));
    updateUpgrades();
}

// Buy functions

function buyUpgrade(id) {
    // Buy an upgrade and update UI
    id.buy();
    updateUpgrades();
    freezeTime();
    game.stats.hms = Math.max(game.stats.hms, game.upgradeLevels.moreShgabb);

}

function buyMax(id) {
    // Buy an upgrade and update UI
    while (id.canBuy()) {
        id.buy();
    }
    updateUpgrades();
    freezeTime();
}

var doesUnlevel = false;

function unlevel(id) {
    // Unbuy an upgrade and update UI
    if (id.type == "goldenShgabbUpgrades") if (!confirm("Do you really want to unlevel?")) return false;
    id.unlevel();

    updateUpgrades();
    freezeTime();
}

function prestigeButton() {
    if (confirm("Do you really want to prestige?")) {
        let amount = getGoldenShgabb();

        game.shgabb = 0 + getArtifactBoost("resetshgabb");
        game.sw = 0;

        for (let u of Object.keys(shgabbUpgrades)) {
            game.upgradeLevels[u] = 0;
        }
        for (let u of Object.keys(sandwichUpgrades)) {
            game.upgradeLevels[u] = 0;
        }

        game.gs += amount;

        game.stats.pr += 1;
        game.stats.gs += amount;

        game.stats.shgabbtp = 0;
        game.stats.swtp = 0;
        game.stats.ctp = 0;
        game.stats.pttp = 0;

        game.stats.hmstp = game.stats.hms;

        game.gemboost = 1;

        if (ui.ameReset.value == "true") ameReset();

        updateUpgrades();
        createNotification("Prestiged for " + amount + " golden shgabb!");
    }
}

// Notifications
function createNotification(text) {
    currentNotifications.push([text, 15]);
    if (currentNotifications.length > 15) currentNotifications.shift();
}

// Ameliorer
function ameliorerUnlocked() {
    return game.stats.hms >= 2000;
}

function getAmeliorerConvertCosts(type) {
    switch (type) {
        case "shgabb":
            return Math.ceil(Math.pow(1e12, (game.ameUp[0] / 8) + 1));
        case "sw":
            return Math.ceil(Math.pow(1000, (game.ameUp[1] / 10) + 1));
        case "gs":
            return Math.ceil(Math.pow(1e6, (game.ameUp[2] / 12) + 1));
        case "si":
            return Math.ceil(Math.pow(1e5, (game.ameUp[3] / 15) + 1));
    }
}

function canAffordAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    return game[type] >= costs;
}

function convertAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    if (canAffordAmeliorer(type)) {
        game[type] -= costs;
        game.ameUp[{ "shgabb": 0, "sw": 1, "gs": 2, "si": 3 }[type]] += 1;
        game.ame += 1;
        game.stats.ame += 1;
        updateUpgrades();
        renderAmeConvert();
    }
}

function renderAmeConvert() {
    let render = "";
    for (l = 0; l < 4; l++) {
        let thisType = ["shgabb", "sw", "gs", "si"][l];
        render = render + "<button onclick='convertAmeliorer(`" + thisType + "`)' class='ameliorerButton' style='background-color: " + (canAffordAmeliorer(thisType) ? "rgb(180, 255, 200)" : "white") +"'> Convert " + fn(getAmeliorerConvertCosts(thisType)) + " " + ["Shgabb", "Sandwiches", "Golden Shgabb", "Silicone"][l] + "<br>to +1 Améliorer!</button>";
    }
    ui.ameconvert.innerHTML = render;
}

function getTotalAme() {
    let amelvl = 0;
    for (let ame in ameliorerUpgrades) {
        amelvl += ameliorerUpgrades[ame].currentLevel();
    }
    return amelvl;
}

function ameReset() {
    game.ame = game.stats.ame;

    for (let a in ameliorerUpgrades) {
        game.upgradeLevels[ameliorerUpgrades[a].ID] = 0;
    }

    for (let a in goldenShgabbUpgrades) {
        game.upgradeLevels[goldenShgabbUpgrades[a].ID] = Math.min((goldenShgabbUpgrades[a].getMax() != undefined ? goldenShgabbUpgrades[a].getMax() : game.upgradeLevels[goldenShgabbUpgrades[a].ID]), game.upgradeLevels[goldenShgabbUpgrades[a].ID]);
    }

    for (let a in siliconeShgabbUpgrades) {
        game.upgradeLevels[siliconeShgabbUpgrades[a].ID] = Math.min((siliconeShgabbUpgrades[a].getMax() != undefined ? siliconeShgabbUpgrades[a].getMax() : game.upgradeLevels[siliconeShgabbUpgrades[a].ID]), game.upgradeLevels[siliconeShgabbUpgrades[a].ID]);
    }

    ui.ameReset.checked = false;
    ui.ameReset.value == "false";
}

// Update functions

function updateQuote() {
    ui.quote.innerHTML = quotes[Math.ceil(Math.random() * quotes.length - 1)];
}

function updateUpgrades() {
    // Update upgrades UI
    ui.upgradesl.innerHTML = shgabbUpgrades.moreShgabb.render() + shgabbUpgrades.shorterCD.render() + shgabbUpgrades.bomblike.render() + shgabbUpgrades.swChance.render();
    ui.upgradesr.innerHTML = shgabbUpgrades.critChance.render() + shgabbUpgrades.critBoost.render() + shgabbUpgrades.goodJoke.render() + shgabbUpgrades.moreSw.render();

    ui.swupgradesl.innerHTML = sandwichUpgrades.autoShgabb.render() + sandwichUpgrades.firstBoostsClicks.render() + sandwichUpgrades.twoTwoFive.render();
    ui.swupgradesr.innerHTML = sandwichUpgrades.fridge.render() + sandwichUpgrades.cheese.render() + sandwichUpgrades.meaningOfLife.render();

    ui.gsupgradesl.innerHTML = goldenShgabbUpgrades.divineShgabb.render() + goldenShgabbUpgrades.gsBoost1.render() + goldenShgabbUpgrades.unlockMax.render() + goldenShgabbUpgrades.formaggi.render();
    ui.gsupgradesr.innerHTML = goldenShgabbUpgrades.shortCD.render() + goldenShgabbUpgrades.gsBoost2.render() + goldenShgabbUpgrades.unlockMSW.render() + goldenShgabbUpgrades.moreSilicone2.render();

    ui.siupgradesl.innerHTML = siliconeShgabbUpgrades.moreSilicone.render() + siliconeShgabbUpgrades.siliconeFromClicks.render();
    ui.siupgradesr.innerHTML = siliconeShgabbUpgrades.strongerSilicone.render() + siliconeShgabbUpgrades.siliconeAffectsGS.render();

    ui.ameupgradesl.innerHTML = ameliorerUpgrades.AMEgsBoost1.render() + ameliorerUpgrades.shgabbBoost.render() +
        ameliorerUpgrades.AMEfridge.render() + ameliorerUpgrades.AMEcritBoost.render()
        + ameliorerUpgrades.AMEfirstBoostsClicks.render() + ameliorerUpgrades.AMEbomblike.render()
        + ameliorerUpgrades.AMEformaggi.render() + ameliorerUpgrades.unlockMSW2.render();
    ui.ameupgradesr.innerHTML = ameliorerUpgrades.AMEgsBoost2.render() + ameliorerUpgrades.achBExpo.render()
        + ameliorerUpgrades.AMEmoreSw.render() + ameliorerUpgrades.unlockUnlevel.render()
        + ameliorerUpgrades.AMEsiliconeFromClicks.render() + ameliorerUpgrades.gsBoostsShgabb.render()
        + ameliorerUpgrades.siliconeBoost.render() + ameliorerUpgrades.fourthArtifactSlot.render();
}

function updateArtifacts() {
    // Artifacts
    if (artifactsUnlocked()) {
        ui.artifacts.innerHTML = renderArtifacts();
        ui.artifactamount.innerHTML = Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1) + " Artifacts unlocked!";

        unlocks.artifacts.style.display = "unset";
    }
    else {
        ui.artifacts.innerHTML = "";
        ui.artifactamount.innerHTML = "";

        unlocks.artifacts.style.display = "none";
    }
    if (gemsUnlocked()) {
        ui.gemImage.style.display = "unset";
        ui.gemAmount.innerHTML = game.gems + " Gems";

        unlocks.gems.style.display = "unset";
    }
    else {
        ui.gemImage.style.display = "unset";
        ui.gemAmount.innerHTML = "";

        unlocks.gems.style.display = "none";
    }
}

window.addEventListener('keydown', function (e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
        if (e.target.nodeName == 'BUTTON' || e.target.nodeName == 'BODY') {
            e.preventDefault();
            return false;
        }
    }
}, true);

function updateUI() {
    // Update UI

    // Sandwiches
    if (game.upgradeLevels.swChance > 0) {
        ui.shgabbAmount.innerHTML = fn(game.shgabb) + " Shgabb (" + fn(getAutoProduction()) + "/s)";
        ui.swAmount.innerHTML = fn(game.sw) + " Sandwiches";
        unlocks.sandwich.style.display = "unset";
        ui.swImage.style.display = "unset";
        ui.sandwichBar.value = sandwichFreezeTime;
        ui.sandwichBar.max = getFreezeTime();
    }
    else {
        ui.shgabbAmount.innerHTML = fn(game.shgabb) + " Shgabb";
        unlocks.sandwich.style.display = "none";
        ui.swImage.style.display = "none";
        ui.swAmount.innerHTML = "";
    }

    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
    }
    else {
        ui.clickButton.innerHTML = "+" + fn(getProduction() * (currentBoost == "strongerClicks" ? 3 : 1)) + " Shgabb";
        ui.clickButton.style["background-color"] = "blue";
    }
    ui.cooldownBar.value = game.clickCooldown;
    ui.cooldownBar.max = getCooldown();

    // Ads
    if (game.stats.sw > 9 && adTime > 0) {
        ui.adBar.style.display = "inline";
        ui.adBar.value = (adTime / adMax) * 100;
    }
    else {
        ui.adBar.style.display = "none";
    }

    // GS
    if (game.gs > 0) {
        unlocks.goldenShgabb.style.display = "unset";
        ui.gsImage.style.display = "unset";
        ui.gsAmount.innerHTML = fn(game.gs) + " Golden Shgabb";
    }
    else {
        unlocks.goldenShgabb.style.display = "none";
        ui.gsImage.style.display = "none";
        ui.gsAmount.innerHTML = "";
    }
    if (game.shgabb >= 1000000) {
        unlocks.goldenShgabb.style.display = "unset";
        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "Prestige!<br />Lose your shgabb and sandwiches, as well as their upgrades, but keep stats and get golden shgabb!<br />Prestige to get: " + fn(getGoldenShgabb()) + " golden shgabb!";
    }
    else {
        ui.prestigeButton.style.display = "none";
    }

    // Silicone
    if (game.shgabb >= 1000000000 || game.stats.si > 0) {
        unlocks.siliconeShgabb.style.display = "unset";
        ui.siImage.style.display = "unset";
        ui.siAmount.innerHTML = fn(game.si) + " Silicone Shgabb (" + fn(getSiliconeProduction()) + "/s)";
    }
    else {
        unlocks.siliconeShgabb.style.display = "none";
        ui.siImage.style.display = "none";
    }

    // Ameliorer
    if (ameliorerUnlocked()) {
        ui.ameAmount.innerHTML = game.ame + " Améliorer";
        unlocks.ameliorer.style.display = "unset";
        ui.ameImage.style.display = "unset";

        if (game.stats.pttp >= 600) ui.ameReset.style.display = "unset";
        else ui.ameReset.style.display = "none";
    }
    else {
        unlocks.ameliorer.style.display = "none";
        ui.ameImage.style.display = "none";
        ui.ameReset.style.display = "none";
    }
    ui.ameReset2.style.display = ui.ameReset.style.display;

    renderGemOffers();

    ui.stats.innerHTML = "<div style='float: left; width: 50%;' class='square2'>"
        + "Highest More Shgabb: " + fn(game.stats.hms)
        + "<br />Total Clicks: " + game.stats.clicks
        + "<br />Total Time: " + game.stats.playTime.toFixed(1)
        + "<br />Total Shgabb: " + fn(game.stats.shgabb)
        + "<br />Total Sandwiches: " + fn(game.stats.sw)
        + "<br />Total Ads watched: " + game.stats.ads + " (SC: " + game.stats.wads.sc + "/SA: " + game.stats.wads.sa + "/MSW: " + game.stats.wads.msw + "/FS: " + game.stats.wads.fs + "/MC: " + game.stats.wads.mc + "/MSI: " + game.stats.wads.msi + ")"
        + "<br />Total Golden Shgabb: " + fn(game.stats.gs)
        + "<br />Total Prestiges: " + game.stats.pr
        + "<br />Total Silicone Shgabb: " + fn(game.stats.si)
        + "<br />Total Améliorer: " + fn(game.stats.ame)
        + "<br />Total Gems: " + fn(game.stats.tgems)
        + "</div><div style='float: right; width: 50%;' class='square2'>"
        + "Click Cooldown: " + getCooldown().toFixed(2) + "s"
        + "<br />Critical Hit Chance: " + (shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) + "%"
        + "<br />Sandwich Chance: " + (shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)).toFixed(2) + "%"
        + "<br />Gem Chance: " + getGemChance().toFixed(2) + "% (+" + getArtifactBoost("gems").toFixed(1) + ")"
        + "<br />" + (artifactsUnlocked() ? "Artifact Chances:<br />Common " + (allArtifactsOfRarity(0) ? "0%" : "0.08% (1/1200)") + "<br />Rare " + (allArtifactsOfRarity(1) ? "0%" : "0.01% (1/6000)") + "<br />Epic " + (allArtifactsOfRarity(2) ? "0%" : "0.003% (1/32000)") : "Artifacts locked!")
        + "<br />Achievements: " + game.ach.length + "/" + achievements.length
        + "<br />Artifacts: " + Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1)
        + "<br />Améliorer Levels: " + getTotalAme()
        + "</div>";


    ui.shgabbAmount2.innerHTML = ui.shgabbAmount.innerHTML;
    ui.swAmount2.innerHTML = ui.swAmount.innerHTML;
    ui.gsAmount2.innerHTML = ui.gsAmount.innerHTML;
    ui.siAmount2.innerHTML = ui.siAmount.innerHTML;
    ui.gemAmount2.innerHTML = ui.gemAmount.innerHTML;
    ui.ameAmount2.innerHTML = ui.ameAmount.innerHTML;

    // Achievements
    renderAchievements();
    ui.achievementsamount.innerHTML = game.ach.length + "/" + achievements.length + " Achievements unlocked! Boost: +" + (100 * (getAchievementBoost() - 1)).toFixed(2) + "% GS!";

    // Minigame
    if (ameliorerUnlocked() && canPlayTTT) {
        unlocks.minigameSection.style.display = "unset";
        updateMinigameUI();
    }
    else {
        unlocks.minigameSection.style.display = "none";
    }

    // Notifications
    ui.notifications.innerHTML = "";
    let n2 = 15;
    for (n in currentNotifications) {
        if (n == currentNotifications.length - 1) ui.notifications.innerHTML = ui.notifications.innerHTML + "<b>" + currentNotifications[n][0] + "</b><br />";
        else ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n][0] + "<br />";
        n2 -= 1;
    }
    while (n2 > 0) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + "<br />";
        n2 -= 1;
    }
    if (currentNotifications[(Object.keys(currentNotifications).length - 1)] != undefined) {
        if (currentNotifications[Object.keys(currentNotifications).length - 1][1] > 12
            && currentNotifications[Object.keys(currentNotifications).length - 1][0] != "Game saved automatically") ui.newestNotification.innerHTML = currentNotifications[Object.keys(currentNotifications).length - 1][0]
        else if (currentNotifications[(Object.keys(currentNotifications).length - 2)] != undefined) {
            if (currentNotifications[Object.keys(currentNotifications).length - 2][1] > 12
                && currentNotifications[Object.keys(currentNotifications).length - 2][0] != "Game saved automatically") ui.newestNotification.innerHTML = currentNotifications[Object.keys(currentNotifications).length - 2][0]
            else ui.newestNotification.innerHTML = "";
        }
        else ui.newestNotification.innerHTML = "";
    }
}

// Core
function autoSave() {
    // Should this even be here?
    if (game.clickCooldown < -0.33) knifeBoost = 1;
    renderAmeConvert();

    // Auto Save
    localStorage.setItem("shgabbClicker", JSON.stringify(game));
    localStorage.setItem("shgabbSettings", JSON.stringify(settings));

    let newAch = false;
    for (a in achievements) {
        if (achievements[a].unlock() && !game.ach.includes(achievements[a].ID)) {
            game.ach.push(achievements[a].ID);
            newAch = true;
            createNotification("New achievement: " + achievements[a].name);

            ui.newArtifactText = "Achievement Unlocked!";
            ui.newArtifactImage.src = "images/achievements/" + achievements[a].image;
            ui.newArtifactName.innerHTML = achievements[a].name;
            ui.newArtifact.style.display = "block";

            setTimeout(() => {
                ui.newArtifact.style.display = "none";
            }, 5000)
            break;
        }
    }
    autoNotifications += 1;
    if (!newAch) createNotification("Game saved automatically " + autoNotifications);
}

function exportGame() {
    if (BETA.isBeta) {        alert("You can't export in a beta!");        createNotification("Couldn't export: Beta version");        return false;    }    let exportGame = JSON.stringify(game);    exportGame = btoa(exportGame);    exportGame = exportGame.replace(rep7, "shgabb");    exportGame = exportGame.replace("x", "pppp");    exportGame = exportGame.replace("D", "dpjiopjrdopjh");    navigator.clipboard.writeText(exportGame);    createNotification("Game exported to clipboard!");}function importGame() {    let importGame = prompt("Code?");  if(importGame == "resetmytic" && BETA.isBeta) { pointsPlayer = 0; pointsHer = 0; game.tttd = 1; canPlayTTT = true; }  importGame = importGame.replace("shgabb", rep7);    importGame = importGame.replace("dpjiopjrdopjh", "D");    importGame = importGame.replace("pppp", "x");    importGame = atob(importGame);    importGame = JSON.parse(importGame);


    emptyGame.a = [];
    game = { };
    game = Object.assign({}, emptyGame, importGame);
    game.upgradeLevels = Object.assign({}, emptyGame.upgradeLevels, importGame.upgradeLevels);
    game.stats = Object.assign({}, emptyGame.stats, importGame.stats);
    game.ameUp = Object.assign({}, emptyGame.ameUp, importGame.ameUp);
    handleArtifactsFirstTime();

    updateUI();
    updateUpgrades();
    updateArtifacts();

    createNotification("Game imported successfully!");
}

function showAd() {
    adHandler.style.display = "inline";
    adHandler.play();
    currentBoost = "wait";
}

function loop(tick) {
    // Main Game Loop
    let time = (tick - oldTime) / 1000;
    oldTime = tick;


    game.clickCooldown -= time;
    autoSaveTime -= time;
    quoteTime -= time;
    sandwichTime -= time;
    sandwichFreezeTime -= time;
    game.stats.playTime += time;
    game.stats.pttp += time;
    if (adLoaded && game.stats.sw > 9) adTime -= time;

    for (n in currentNotifications) {
        currentNotifications[n][1] -= time;
        if (currentNotifications[n][1] < 0) currentNotifications.splice(n, 1);
    }

    if (autoSaveTime <= 0) {
        autoSaveTime = 3;
        autoSave();
    }
    if (quoteTime <= 0) {
        quoteTime = 10;
        updateQuote();
    }
    if (sandwichTime <= 0 && sandwichFreezeTime > 0) {
        sandwichTime = 1;
        sandwich();
        silicone();
    }

    if (adTime <= 0 && adButton.style.display == "none" && currentBoost == "none") {
        availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        if (availableBoost == determineLeastUsedBoost()) availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        adButton.style.display = "inline";
        adButton.innerHTML = "Watch an ad to get a boost!<br />" + boostTexts[availableBoost];

        selectVideo();
    }
    else if (adTime <= 0 && adButton.style.display == "none") {
        adTime = 10;
        adMax = 10;

        if (currentBoost == "strongerclicks" || currentBoost == "fastershgabb") {
            ui.cooldownBar.classList.remove("buffedProgress")
        }
        if (currentBoost == "moreSandwiches" || currentBoost == "moreCrits") {
            ui.cooldownBar.classList.remove("buffedProgress")
        }

        currentBoost = "none";
    }
    else if (currentBoost == "none" && adTime <= -15) {
        adButton.style.display = "none";
        adTime = 5;
        adMax = 5;
    }

    updateUI();
    window.requestAnimationFrame(loop);
}

function determineLeastUsedBoost() {
    let least = ["", 1000000000000000000];
    for (s in game.stats.wads) {
        if (game.stats.wads[s] < least[1]) {
            least[0] = s;
            least[1] = game.stats.wads[s];
        }
    }

    switch (least[0]) {
        case "sc":
            return "strongerClicks";
        case "sa":
            return "strongerAuto";
        case "msw":
            return "moreSandwiches";
        case "fs":
            return "fasterShgabb";
        case "mc":
            return "moreCrits";
        case "msi":
            return "moreSilicone";
    }
}

function selectVideo() {
    // Select which video you will see
    let adVideoPicker = Math.ceil(Math.random() * 6)
    switch (adVideoPicker) {
        case 1:
            adHandler.src = "videos/elmenda_bad_as_always.mp4";
            break;
        case 2:
            adHandler.src = "videos/elm_ad_2.mp4";
            break;
        case 3:
            adHandler.src = "videos/Helmet452_Trailer.mp4";
            break;
        case 4:
            adHandler.src = "videos/Drunk_elmenda_savage.mp4";
            break;
        case 5:
            adHandler.src = "videos/shgabb_flame.mp4";
            break;
        case 6:
            adHandler.src = "videos/Mend_car_crashing_vid.mp4";
            break;
    }
}

// Load
if (localStorage.getItem("shgabbClicker") != undefined) {
    let cache = game;
    game = Object.assign({}, game, JSON.parse(localStorage.getItem("shgabbClicker")));
    game.upgradeLevels = Object.assign({}, cache.upgradeLevels, JSON.parse(localStorage.getItem("shgabbClicker")).upgradeLevels);
    game.stats = Object.assign({}, cache.stats, JSON.parse(localStorage.getItem("shgabbClicker")).stats);
    let allAdsZero = true;
    for (a in game.stats.wads) {
        if (game.stats.wads[a] != 0) allAdsZero = false;
    }
    if (allAdsZero) {
        allAdsZero = game.stats.ads;
        while (allAdsZero > 0) {
            allAdsZero -= 1;
            game.stats.wads[Object.keys(game.stats.wads)[Math.floor(Math.random() * Object.keys(game.stats.wads).length)]] += 1;
        }
    }

    game.shgabb = Math.ceil(game.shgabb);
    if (game.shgabb == "-Infinity") game.shgabb = 0;
    if (game.stats.shgabb == "-Infinity") game.stats.shgabb = 0;
    if (game.stats.shgabbtp == "-Infinity") game.stats.shgabbtp = 0;
    game.stats.shgabb = Math.ceil(game.stats.shgabb);
    game.gs = Math.ceil(game.gs);
    if (game.stats.hmstp == 0) game.stats.hmstp = game.stats.hms;
    canPlayTTT = compareMinigameTime();
    handleArtifactsFirstTime();
}
if (localStorage.getItem("shgabbSettings") != undefined) {
    settings = Object.assign({}, settings, JSON.parse(localStorage.getItem("shgabbSettings")));

    music.muted = !settings.music;
    adHandler.muted = !settings.adMusic;
    }

// Ad init
try {
adHandler.oncanplay = () => {
    if (!adLoaded) createNotification("Ads loaded!");
    adLoaded = true;
    ui.adLoaded.style.display = "block";
}

adHandler.onended = () => {
    currentBoost = availableBoost;
    game.stats.ads += 1;
    switch (currentBoost) {
        case "strongerClicks":
            game.stats.wads.sc += 1;
            break;
        case "strongerAuto":
            game.stats.wads.sa += 1;
            break;
        case "moreSandwiches":
            game.stats.wads.msw += 1;
            break;
        case "fasterShgabb":
            game.stats.wads.fs += 1;
            break;
        case "moreCrits":
            game.stats.wads.mc += 1;
            break;
        case "moreSilicone":
            game.stats.wads.msi += 1;
            break;
    }

    lastAdTimer = 0;
    availableBoost = "none"; 
    adTime = adTimes[currentBoost];
    adMax = adTimes[currentBoost];
    adHandler.style.display = "none";
    adButton.style.display = "none";

    if (currentBoost == "strongerClicks" || currentBoost == "fasterShgabb") {
        ui.cooldownBar.classList.add("buffedProgress")
    }
    if (currentBoost == "moreSandwiches" || currentBoost == "moreCrits") {
        ui.sandwichBar.classList.add("buffedProgress")
    }
    }
}
catch (e) {
    console.trace(e);
}

let lastAdTimer = 0;
adHandler.ontimeupdate = () => {
    if ((adHandler.currentTime > lastAdTimer + 2 && adHandler.currentTime < adHandler.duration) || adHandler.playbackRate > 1) {
        adHandler.onended();
        adTime = -50000000000;
        currentBoost = "screwyou";
        availableBoost = "noneeeeeee";
    }
    else {
        lastAdTimer = adHandler.currentTime;
    }
} 

// Update upgrades UI
updateUpgrades();
updateArtifacts();
renderAmeConvert();

// Generate Patch Notes
ui.gameTitle.innerHTML = "Shgabb Clicker " + gameVersion + (BETA.isBeta ? " (BETA)" : "");

let patchNotesText = "Version " + gameVersion + ":";
for (p in currentPatchNotes) {
    if (currentPatchNotes[p].substr(0, 1) == "v") patchNotesText = patchNotesText + "<br /><br /><br />Version " + currentPatchNotes[p].substr(1)  + ":";
    else patchNotesText = patchNotesText + (p != 0 && currentPatchNotes[p - 1].substr(0, 1) != "v" && currentPatchNotes[p].substr(0, 2) == "->" ? "<br />" : "") + "<br />" + currentPatchNotes[p];
}
ui.patchNotes.innerHTML = patchNotesText;

// Start game loop (30 FPS)
window.requestAnimationFrame(loop);

console.log("%cA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nAAAAAAAAAAAAAAAAAAAAAAA ", 'background: red; color: red');
console.log("%cYou shouldn't be here.\nExcept if you're Schrottii. ", 'background: #000000; color: red');