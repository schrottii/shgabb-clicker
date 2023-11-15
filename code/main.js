// Game made by Schrottii - editing or stealing is prohibited!

// Main JS File

// Game version and patch notes

const gameVersion = "2.0";

const currentPatchNotes = [
    "-> Selection:",
    "- ...",
    "-> Design:",
    "- Changed the design of the game to be different on small devices (phone) than on big devices (PC) (listed under Device design)",
    "- New game font!",
    "-> Device design:",
    "- PC: The background of the currencies (top) is shorter",
    "- Mobile: The click button is much taller (and easier to click)",
    "- Mobile: Upgrade names are smaller, upgrades are longer",
    "- Mobile: Upgrade buttons (like MAX) are closer to each other",
    "-> Upgrade design:",
    "- Reworked colors of upgrades (from white/green to shades of blue/green/gray)",
    "- Added a setting to toggle between normal, old and custom colors",
    "- Custom colors: for all 3 types of upgrades (affordable, too expensive and maxed), RGB values and text color can be set",
    "- Added buttons to adjust the RGB values and text color of the custom colors",
    "- Added an export/import system for custom colors",
    "- Changed border of upgrades from white to black",
    "- Max. levels are now displayed as /x instead of (Max: x)",
    "- Upgrade levels are now displayed next to their name",
    "- Slightly increased height of buttons in upgrades (like max)",
    "-> Settings:",
    "- Moved settings into their own section",
    "- Reworked setting button code and all texts and displays",
    "- Changed setting button design",
    "- Added more notations: Scientific, Engineering and Alphabet!",
    "- Expanded normal notation",
    "- Added a setting to change the notation",
    "- Added a setting to toggle the currencies display",
    "- Added a setting to change the upgrade button colors (more info in Upgrade design above)",
    "- Added a setting to make the least watched ad appear as often as all others",
    "-> Shgic Shgac Shgoe:",
    "- O is now blue and X yellow (instead of both black)",
    "- Increased size of O and X",
    "- Slightly improved hitboxes and positioning",
    "- Increased header size",
    "-> New content:",
    "- New gem offer: Artifact Offer! Every day a semi-random artifact can be directly bought for 50 gems!",
    "- New ad boost: More Gems! 3x gem chance for 8 minutes",
    "- Added a -MAX button, to unlevel an upgrade to 0, with a confirmation dialog, unlocked with unlevel",
    "-> Artifacts:",
    "- Added 15 new artifacts (3 common, 6 rare, 6 epic)",
    "- Moved rarity from name to level",
    "- Changed text size, name is bigger, description smaller if it is long",
    "- When upgrading artifacts, the costs and effects of the next level are now displayed",
    "- Changed seconds to sec in Amulet of Slowgemming description",
    "-> Balance:",
    "- Capped click cooldown at 0.1s",
    "- Capped gem chance at 10%",
    "- Both caps are displayed in the stats once reached",
    "- Reduced costs of the Shgabb Boost gem offer from 25 to 20",
    "- Reduced costs of the Artifact Gift gem offer from 50 to 30",
    "",
    "- Ring of Productivity: x1.4/x2/x2.6 -> x1.5/x2/x2.5",
    "- Ring of Laziness: x1.2/x1.6/x2 -> x1.5/x2/x2.5",
    "- Pulsing Red Ring: x1.25/x1.5/x1.75 -> x1.5/x1.65/x1.75",
    "- Amulet of Quick Snacks: x3/x12/x24 -> , x4/x8/x12",
    "- Amulet of Fast Start: x10/x35/x60 -> x10/x30/x100",
    "- Amulet of Sluggard: x8/x16/x24 -> x12/x24/x36",
    "- Furious Knife: 2000% -> 3000%",
    "- P2W: x2/x3/x4 -> x2/x2.5/x3",
    "-> Other:",
    "- Added 5 new quotes",
    "- Huge code improvements",
    "- Reworked rendering, especially for currency amounts and images",
    "- Several performance improvements",
    "- Reduced file size of ads",
    "- Sandwiches now stay unlocked after prestige / getting them without the sandwich chance upgrade",
    "- The currencies display can now be hidden by double clicking",
    "-> Bug fixes:",
    "- Added 250 new bugs",
    "- Fixed duplicates and stats still using the old chances",
    "- Fixed the 99.9 bug",
    "- Fixed gem icon being visible before unlocking gems",
    "- Fixed ad button still being visible when an ad is playing"
]

// Various variables

var doubleClick = 0;

var autoSaveTime = 5;
var quoteTime = 15;
var sandwichTime = 1;
var sandwichFreezeTime = 60;
var adTime = 10;
var adMax = 10;
var currentNotifications = [];

var time = 0;
var oldTime = 0;

var knifeBoost = 1;
var trashCanBoost = 0;
var autoNotifications = 0;

var ui = {
    // Bars
    cooldownBar: document.getElementById("cooldownBar"),
    sandwichBar: document.getElementById("sandwichBar"),
    adBar: document.getElementById("adBar"),

    // Cheats
    cheatCurrency: document.getElementById("cheatCurrency"),
    cheatAmount: document.getElementById("cheatAmount"),
    cheatDisplay: document.getElementById("cheatDisplay"),

    // Amount displays
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
    artifactScrapAmount: document.getElementById("artifactScrapAmount"),
    artifactScrapAmount2: document.getElementById("artifactScrapAmount2"),

    // Images of currencies
    swImage: document.getElementById("swImage"),
    gsImage: document.getElementById("gsImage"),
    siImage: document.getElementById("siImage"),
    gemImage: document.getElementById("gemImage"),
    ameImage: document.getElementById("ameImage"),

    // Upgrades
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

    // New Artifact display thing
    newArtifact: document.getElementById("newArtifact"),
    newArtifactImage: document.getElementById("newArtifactImage"),
    newArtifactName: document.getElementById("newArtifactName"),
    newArtifactText: document.getElementById("newArtifactText"),

    // Gem offers
    gemOffer1: document.getElementById("gemOffer1"),
    gemOffer2: document.getElementById("gemOffer2"),
    gemOffer3: document.getElementById("gemOffer3"),
    gemOffer4: document.getElementById("gemOffer4"),
    gemOffer5: document.getElementById("gemOffer5"),

    // Other
    gameTitle: document.getElementById("gametitle"),
    patchNotes: document.getElementById("patchNotes"),
    clickButton: document.getElementById("clickButton"),
    adLoaded: document.getElementById("adloaded"),
    ameReset: document.getElementById("amereset"),
    ameReset2: document.getElementById("amereset2"),
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
    topSquare: document.getElementById("topSquare"),
    settings: document.getElementById("settings"),
}

// Ad variables

var adHandler = document.getElementById("baldad");
var adButton = document.getElementById("adstartbutton");
var adLoaded = false;
var availableBoost = "none";
var currentBoost = "none";

const boosts = ["strongerClicks", "strongerAuto", "moreSandwiches", "fasterShgabb", "moreCrits", "moreSilicone", "moreGems"];
const boostTexts = {
    strongerClicks: "Stronger Clicks: Get 5x shgabb from clicks for 5 minutes",
    strongerAuto: "Stronger Auto: Get 5x automatic shgabb for 10 minutes",
    moreSandwiches: "More Sandwiches: Get sandwiches four times as often for 3 minutes",
    fasterShgabb: "Faster Shgabb: You can click 5x more often for 60 seconds",
    moreCrits: "More Crits: 5x critical hit chance and 3x crit boost for 2 minutes",
    moreSilicone: "More Silicone: Get 10x silicone shgabb for 3 minutes",
    moreGems: "More Gems: 3x higher gem chance for 8 minutes",
};
const adTimes = {
    strongerClicks: 300,
    strongerAuto: 600,
    moreSandwiches: 180,
    fasterShgabb: 60,
    moreCrits: 120,
    moreSilicone: 180,
    moreGems: 480,
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
    "you can just throw your oponion if you want - elmenda452",
    "Thanks redstone repeater from Minecraft - slowmerger",
    "my brain cells have disappeared a long time ago - Barduzzi",
    "My mom feeds me with petroleum - slowmerger",
    "silicone shgabb is attracting me - shgabb",
    "nice to become the grim reaper - elmenda452",
    "but eh it could help them grannies - elmenda452",
    "I heard your mental state is rotting down my man no offense - elmenda452",
    "um do we really want to get 1,000,000 sandwiches per click - elmenda452",
    "congrats on the knowledge - Phazer",
    "I will bestow my wrath upon you - elmenda452",
    "close! those are tires - Phazer",
    "my son was here earlier - Phazer",
    "you're bekommen great - Phazer",
    "schrottii those voices in your head arent real - Phazer",
    "This feels so awful without the context - slowmerger",
    "I've seen a dream where I broke SSS and got 2:11 - DaGame",
    "Quote placeholder - DaGame",
    "2021 what year was that - slowmerger",
    "lag was invented in 1855 - Schrottii",
    "im gonna outrun elken - schrotttv",
    "my brain isnt braining - schrotttv",
    "but because toilet has an o in it that could lead to infinite recursion - K. whale",
    "meh thats not the true kelp experience - Phazer",
    "finally, smoking ciguretos is economically profitable - elmenda452",
];

// Notations

const upgradeColors = ["normal", "old", "custom"]
const notations = ["normal", "scientific", "engineering", "alphabet"];
const normalNotation = ["M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "UD", "DD", "TD", "qD", "QD", "sD", "SD", "OD", "ND", "V", "sV", "Tr", "UTR", "QU", "TQU", "qu", "Se", "Sp", "Oc", "No", "Améliorer", "What?!?!", "What?!?!2", "You Broke The Game", "I am crying", "no!!!", "WhyDoesFranceStillExist", "GodIsWatchingYou"];
const alphabetNotation = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ")

// More beta stuff

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
    updateGems();
}

ui.cheatAmount.oninput = () => {
    ui.cheatDisplay.innerHTML = fn(ui.cheatAmount.value);
}

// format number
function fn(number) {
    if (number.toString().split(".").length > 1) if (number.toString().split(".")[0] == "0" && number.toString().split(".")[1].substr(0, 2) == "00") return number.toString();
    //if (number.toString().split(".").length > 1) if (number.toString().split(".")[0] == "1" && number.toString().split(".")[1].substr(0, 3) == "000") return "0." + "0".repeat(number.toString().split("e-")[1] - 1) + "1";
    if(number < 1000000) number = Math.round(number * 10) / 10;
    if (number.toString().split("e").length > 1) {
        if (number.toString().split("e")[0].split(".")[1] != undefined) number = number.toString().split("e")[0].split(".")[0] + number.toString().split("e")[0].split(".")[1].substr(0, 3) + "0".repeat(parseInt(number.toString().split("e")[1]) - 3);
        number = number.toString().split("e")[0] + "0".repeat(parseInt(number.toString().split("e")[1]));
    }
    let dec = number.toString().substr(number.toString().length % 3 == 0 ? 3 : number.toString().length % 3, number.toString().length % 3 == 0 ? 1 : 2);
    let notiePart = "";
    switch (settings.notation) {
        case "normal":
            notiePart = normalNotation[Math.floor((number.toString().length - 1) / 3 - 1) - 1];
            break;
        case "scientific":
            if (number.toString().length > 6) return number.toString().substr(0, 1) + "." + number.toString().substr(1, 2) + "e" + (number.toString().length - 1);
            break;
        case "engineering":
            notiePart = "E" + (3 * Math.floor((number.toString().length - 1) / 3));
            break;
        case "alphabet":
            notiePart = alphabetNotation[Math.floor((number.toString().length - 1) / 3 - 1) - 1];
            break;
    }
    
    if (number.toString().length > 6) return number.toString().substr(0, number.toString().length % 3 == 0 ? 3 : number.toString().length % 3) + (dec != "" ? ("." + dec) : "") + notiePart;
    return number.toFixed(1).toString().substr(-1) == "0" ? number.toFixed(0) : number.toFixed(2);

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

// currency image
function cImg(imgname) {
    return '<img class="currency" src="images/currencies/' + imgname + '.png" />';
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    let amount = Math.floor(getProduction() * criticalHit() * (currentBoost == "strongerClicks" ? 3 : 1) * (getArtifactByID(200).isEquipped() ? 0 : 1));
    if (game.clickCooldown <= 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.stats.shgabbtp += amount;

        if (getArtifactByID(301).isEquipped() && game.clickCooldown > -0.33) {
            knifeBoost = Math.min(knifeBoost + (getArtifactLevel(301) / 2), 30);
        }
        else knifeBoost = 1;

        game.clickCooldown = getCooldown();
        game.stats.clicks += 1;
        game.stats.ctp += 1;

        if (getArtifactByID(310).isEquipped() && trashCanBoost > 1) {
            trashCanBoost -= 0.1;
        }
        else trashCanBoost = 0;

        if (getArtifactByID(213).isEquipped()) increaseGS((getArtifactEffect(213) / 100) / (getArtifactByID(311).isEquipped() ? getArtifactEffect(311): 1));

        if (Math.random() * 100 < siliconeShgabbUpgrades.siliconeFromClicks.currentEffect()) {
            let amount = 3 * getSiliconeProduction();
            game.si += amount;
            game.stats.si += amount;
        }

        if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)) {
            amount = Math.floor((shgabbUpgrades.moreSw.currentEffect() + 1) * getArtifactBoost("sw")
                * goldenShgabbUpgrades.formaggi.currentEffect())
                * (getArtifactByID(307).isEquipped() ? diceAmount : 1);
            game.sw += amount;
            game.stats.sw += amount;
            game.stats.swtp += amount;
            createNotification("+" + amount + " sandwich" + (amount > 1 ? "es" : "") + "!");
        }

        changeDiceAmount();
        if (unlockedGems()) getGem();
        if (unlockedArtifacts()) getArtifact();
        updateArtifacts();
        updateGems();
        updateUpgrades();
    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));
    }

    freezeTime();
}

function increaseGS(multi) {
    let amount = getGoldenShgabb() * multi;
    game.gs += amount;
    game.stats.gs += amount;
}

function getFreezeTime() {
    return getArtifactByID(210).isEquipped() ? 5 : (60 + sandwichUpgrades.fridge.currentEffect());
}

function freezeTime() {
    sandwichFreezeTime = getFreezeTime();
}

var diceAmount = 1;
function changeDiceAmount() {
    diceAmount = Math.max(getArtifactLevel(307), Math.ceil(Math.random() * 6));
    if (getArtifactByID(307).isEquipped()) updateArtifacts();
}

var frustration = 0;

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
        * (getArtifactByID(302).isEquipped() ? 1 + game.stats.ctp * 0.001 * getArtifactLevel(302) : 1)
        * game.gemboost
        * ameliorerUpgrades.shgabbBoost.currentEffect()
        * ameliorerUpgrades.gsBoostsShgabb.currentEffect()
        * sandwichUpgrades.meaningOfLife.currentEffect()
        * (getArtifactByID(306).isEquipped() ? ((getArtifactLevel(306) * 2) * (1 / getCooldown())) : 1)
        * (getArtifactByID(307).isEquipped() ? diceAmount : 1)
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
        * (getArtifactByID(302).isEquipped() ? 1 + game.stats.ctp * 0.001 * getArtifactLevel(302) : 1)
        * game.gemboost
        * ameliorerUpgrades.shgabbBoost.currentEffect()
        * ameliorerUpgrades.gsBoostsShgabb.currentEffect()

        + (getProduction(true) * sandwichUpgrades.cheese.currentEffect())) // CHEESE
        * getArtifactBoost("autoshgabb")
        * (currentBoost == "strongerAuto" ? 5 : 1)
        * (getArtifactByID(300).isEquipped() ? Math.max(1, ((getArtifactLevel(300) * 2) * game.clickCooldown + 1)) : 1)
        * (getArtifactByID(307).isEquipped() ? diceAmount : 1)
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
    return (1 + Math.log((game.si / 1000) + 1) * (1 + siliconeShgabbUpgrades.strongerSilicone.effect(level) * Math.sqrt(game.stats.playTime))) * (getArtifactByID(304).isEquipped() ? (2 + (getArtifactLevel(304) * 1)) : 1);
}

function getCooldown() {
    // click cooldown
    return Math.max(0.1, 5 - shgabbUpgrades.shorterCD.currentEffect() - goldenShgabbUpgrades.shortCD.currentEffect())
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
        * Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 1000)
        * Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 10000)
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

        if (getArtifactByID(214).isEquipped()) increaseGS((getArtifactEffect(214) / 100) / (getArtifactByID(311).isEquipped() ? getArtifactEffect(311) : 1));
    }

    updateUpgrades();
}

function silicone() {
    if (!unlockedSilicone()) return false;
    if (getArtifactByID(304).isEquipped()) return false;

    let amount = getSiliconeProduction();
    if (amount > 0) {
        game.si += amount;
        game.stats.si += amount;
    }

    updateUpgrades();
}

var upgradeColorsRender = "";

function updateUpgradeColors() {
    if (settings.upgradeColors == "custom") {
        let ihText = "";

        ihText = "<div class='settingButton2'> Custom colors: <br>";

        for (i = 0; i < 3; i++) {
            ihText = ihText + ["Affordable: ", "Too expensive: ", "Maxed: "][i]
            for (j = 0; j < 4; j++) {
                ihText = ihText + "<button class='grayButton' style='margin-left: 8px' onclick='changeCustomColor(" + i + "," + j + ")'>" + ["R", "G", "B", "T"][j] + settings.customColors[i][j] + "</button>";
            }
            ihText = ihText + "<br />";
        }
        ihText = ihText + "<br /><button class='grayButton' onclick='importCustomColors()'>Import</button>";
        ihText = ihText + "<button class='grayButton' onclick='exportCustomColors()'>Export</button></div>";

        upgradeColorsRender = ihText;
    }
    else {
        upgradeColorsRender = "";
    }
    renderSettings();
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

function unlevel(id, isMax=false) {
    // Unbuy an upgrade and update UI
    //if (id.type == "goldenShgabbUpgrades") if (!confirm("Do you really want to unlevel?")) return false;
    if(!isMax || confirm("Do you really want to unlevel this to level 0?")) id.unlevel(isMax);

    updateUpgrades();
    freezeTime();
}

function prestigeButton() {
    if (confirm("Do you really want to prestige?")) {
        game.shgabb = 0 + getArtifactBoost("resetshgabb");
        game.sw = 0;

        for (let u of Object.keys(shgabbUpgrades)) {
            game.upgradeLevels[u] = 0;
        }
        for (let u of Object.keys(sandwichUpgrades)) {
            game.upgradeLevels[u] = 0;
        }

        increaseGS(1);

        game.stats.pr += 1;

        game.stats.shgabbtp = 0;
        game.stats.swtp = 0;
        game.stats.ctp = 0;
        game.stats.pttp = 0;

        game.stats.hmstp = game.stats.hms;

        game.gemboost = 1;

        if (ui.ameReset.checked == true) ameReset();

        updateUpgrades();
        createNotification("Prestiged for " + amount + " golden shgabb!");
    }
}

function unlockedSilicone() {
    return game.shgabb >= 1000000000 || game.stats.si > 0;
}

function unlockedSandwiches() {
    return game.upgradeLevels.swChance > 0 || game.stats.sw > 0;
}

function unlockedGS() {
    return game.shgabb >= 1000000;
}

// Notifications
function createNotification(text) {
    currentNotifications.push([text, 15]);
    if (currentNotifications.length > 15) currentNotifications.shift();
}

// Ameliorer
function unlockedAmeliorer() {
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

    for (let l in game.alo) {
        while (game.alo[l].length > getMaxArtifactAmount()) {
            game.alo[l].pop();
        }
    }

    ui.ameReset.checked = false;
    ui.ameReset.value == "false";

    updateArtifacts();
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
    if (unlockedArtifacts()) {
        ui.artifacts.innerHTML = renderArtifacts();
        ui.artifactamount.innerHTML = Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1) + " Artifacts unlocked!";
    }
    else {
        ui.artifacts.innerHTML = "";
        ui.artifactamount.innerHTML = "";
    }
}

function updateGems() {
    if (unlockedGems()) {
        renderGemOffers();
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

function updateTopSquare() {
    if (settings.topSquare) {
        ui.shgabbAmount2.innerHTML = ui.shgabbAmount.innerHTML;

        if (unlockedSandwiches()) ui.swAmount2.innerHTML = ui.swAmount.innerHTML;
        else ui.swAmount2.innerHTML = "";

        if (unlockedGS()) ui.gsAmount2.innerHTML = ui.gsAmount.innerHTML;
        else ui.gsAmount2.innerHTML = "";

        if (unlockedSilicone()) ui.siAmount2.innerHTML = ui.siAmount.innerHTML;
        else ui.siAmount2.innerHTML = "";

        if (unlockedGems()) ui.gemAmount2.innerHTML = ui.gemAmount.innerHTML;
        else ui.gemAmount2.innerHTML = "";

        if (unlockedAmeliorer()) ui.ameAmount2.innerHTML = ui.ameAmount.innerHTML;
        else ui.ameAmount2.innerHTML = "";
    }
}

function updateCurrencies() {
    if (unlockedSandwiches()) ui.shgabbAmount.innerHTML = cImg("shgabb") + fn(game.shgabb) + " Shgabb (" + fn(getAutoProduction()) + "/s)";
    else ui.shgabbAmount.innerHTML = fn(game.shgabb) + " Shgabb";

    if (unlockedSandwiches()) ui.swAmount.innerHTML = cImg("sandwich") + fn(game.sw) + " Sandwiches";
    else ui.swAmount.innerHTML = "";

    if (unlockedGS()) ui.gsAmount.innerHTML = cImg("gs") + fn(game.gs) + " Golden Shgabb";
    else ui.gsAmount.innerHTML = "";

    if (unlockedSilicone()) ui.siAmount.innerHTML = cImg("silicone") + fn(game.si) + " Silicone Shgabb (" + fn(getSiliconeProduction()) + "/s)";
    else ui.siAmount.innerHTML = "";

    if (unlockedGems()) ui.gemAmount.innerHTML = cImg("gem") + game.gems + " Gems";
    else ui.gemAmount.innerHTML = "";

    if (unlockedAmeliorer()) ui.ameAmount.innerHTML = cImg("ameliorer") + game.ame + " Améliorer";
    else ui.ameAmount.innerHTML = "";
}

function updateStats() {
    ui.stats.innerHTML = "<div style='float: left; width: 50%;' class='square2'>"
        + "Highest More Shgabb: " + fn(game.stats.hms)
        + "<br />Total Clicks: " + game.stats.clicks
        + "<br />Total Time: " + game.stats.playTime.toFixed(1)
        + "<br />Total Shgabb: " + fn(game.stats.shgabb)
        + "<br />Total Sandwiches: " + fn(game.stats.sw)
        + "<br />Total Ads watched: " + game.stats.ads + " (SC: " + game.stats.wads.sc + "/SA: " + game.stats.wads.sa + "/MSW: " + game.stats.wads.msw + "/FS: " + game.stats.wads.fs + "/MC: " + game.stats.wads.mc + "/MSI: " + game.stats.wads.msi + "/MG: " + game.stats.wads.mg + ")"
        + "<br />Total Golden Shgabb: " + fn(game.stats.gs)
        + "<br />Total Prestiges: " + game.stats.pr
        + "<br />Total Silicone Shgabb: " + fn(game.stats.si)
        + "<br />Total Améliorer: " + fn(game.stats.ame)
        + "<br />Total Gems: " + fn(game.stats.tgems)
        + "<br />Total Artifact Scrap: " + fn(game.stats.artifactScrap)
        + "<br />Total SSS wins: " + fn(game.stats.tttw) + " (Points: " + fn(game.stats.tttpw) + ")"
        + "<br />Total SSS losses: " + fn(game.stats.tttl) + " (Points: " + fn(game.stats.tttpl) + ")"
        + "</div><div style='float: right; width: 50%;' class='square2'>"
        + "Click Cooldown: " + getCooldown().toFixed(2) + "s" + (getCooldown() == 0.1 ? " [MAX]" : "")
        + "<br />Critical Hit Chance: " + (shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) + "%"
        + "<br />Sandwich Chance: " + (shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)).toFixed(2) + "%"
        + "<br />Gem Chance: " + getGemChance().toFixed(2) + "%" + (getGemChance() == 10 + frustration ? " [MAX]" : "") + " (+" + getArtifactBoost("gems").toFixed(1) + ")"

        + "<br />" + (unlockedArtifacts() ? "Artifact Chances:"
        + "<br />Common " + (1 / 8 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance") + "/800)" + (allArtifactsOfRarity(0) ? " ALL" : "")
        + "<br />Rare " + (1 / 40 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance") + "/4000)" + (allArtifactsOfRarity(1) ? " ALL" : "")
        + "<br />Epic " + (1 / 320 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance") + "/32000)" + (allArtifactsOfRarity(2) ? " ALL" : "")
            : "Artifacts locked!")

        + "<br />Achievements: " + game.ach.length + "/" + achievements.length
        + "<br />Artifacts: " + Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1)
        + "<br />Améliorer Levels: " + getTotalAme()
        + "</div>";
}

function updateUI() {
    // Update UI

    // Click Button
    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = getArtifactByID(307).isEquipped() ? ("<img src='images/arti/dice-" + Math.ceil((game.clickCooldown % 0.6) * 10) + ".png' width='32px'>") : game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
    }
    else {
        let diceRender = (getArtifactByID(307).isEquipped() ? ("<img src='images/arti/dice-" + diceAmount + ".png' width='32px'>") : "");
        ui.clickButton.innerHTML = diceRender + "+" + fn(getProduction() * (currentBoost == "strongerClicks" ? 3 : 1)) + " Shgabb" + diceRender;
        ui.clickButton.style["background-color"] = "blue";
    }
    ui.cooldownBar.value = game.clickCooldown;
    ui.cooldownBar.max = getCooldown();

    // Sandwiches
    if (selection("sandwich")) {
        ui.sandwichBar.value = sandwichFreezeTime;
        ui.sandwichBar.max = getFreezeTime();
    }

    // Ads
    if (game.stats.sw > 9 && adTime > 0) {
        ui.adBar.style.display = "inline";
        ui.adBar.value = (adTime / adMax) * 100;
    }
    else {
        ui.adBar.style.display = "none";
    }

    // GS
    if (unlockedGS()) {
        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "Prestige!<br />Lose your shgabb and sandwiches, as well as their upgrades, but keep stats and get golden shgabb!<br />Prestige to get: " + fn(getGoldenShgabb()) + " golden shgabb!";
    }
    else {
        ui.prestigeButton.style.display = "none";
    }

    // Ameliorer
    if (unlockedAmeliorer()) {
        if (game.stats.pttp >= 600) ui.ameReset.style.display = "unset";
        else ui.ameReset.style.display = "none";
        ui.ameReset2.style.display = ui.ameReset.style.display;
    }
    else {
        ui.ameReset.style.display = "none";
    }

    updateTopSquare();
    updateCurrencies();

    if (selection("stats")) updateStats();

    // Achievements
    if (selection("achievements")) {
        renderAchievements();
        ui.achievementsamount.innerHTML = game.ach.length + "/" + achievements.length + " Achievements unlocked! Boost: +" + (100 * (getAchievementBoost() - 1)).toFixed(2) + "% GS!";
    }

    // Minigame
    if (selection("minigames") && canPlayTTT) {
        updateMinigameUI();
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
    // wtf is this below, help
    if (currentNotifications[(Object.keys(currentNotifications).length - 1)] != undefined) {
        if (currentNotifications[Object.keys(currentNotifications).length - 1][1] > 12
            && currentNotifications[Object.keys(currentNotifications).length - 1][0].substr(0, 10) != "Game saved") ui.newestNotification.innerHTML = currentNotifications[Object.keys(currentNotifications).length - 1][0]
        else if (currentNotifications[(Object.keys(currentNotifications).length - 2)] != undefined) {
            if (currentNotifications[Object.keys(currentNotifications).length - 2][1] > 12
                && currentNotifications[Object.keys(currentNotifications).length - 2][0].substr(0, 10) != "Game saved") ui.newestNotification.innerHTML = currentNotifications[Object.keys(currentNotifications).length - 2][0]
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
    adButton.style.display = "none";
    adHandler.style.display = "inline";
    adHandler.play();
    currentBoost = "wait";
}

function loop(tick) {
    // Main Game Loop
    let time = (tick - oldTime) / 1000;
    oldTime = tick;

    doubleClick -= time;
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
        autoSaveTime = 5;
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

    if (adTime <= 0 && adButton.style.display == "none" && adHandler.style.display == "none" && currentBoost == "none") {
        // Hey1 You can get this!
        availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        if (settings.leastAdLess && availableBoost == determineLeastUsedBoost()) availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        while (!unlockedGems() && availableBoost == "moreGems") availableBoost = boosts[Math.floor(boosts.length * Math.random())];
        while (!unlockedSilicone() && availableBoost == "moreSilicone") availableBoost = boosts[Math.floor(boosts.length * Math.random())];

        adButton.style.display = "inline";
        adButton.innerHTML = "Watch an ad to get a boost!<br />" + boostTexts[availableBoost];

        selectVideo();
    }
    else if (adTime <= 0 && adButton.style.display == "none" && adHandler.style.display == "none") {
        // Ad is over! (as in, the boost is over. not the video. for that, scroll down to the onended)
        adTime = 10;
        adMax = 10;

        ui.cooldownBar.classList.remove("buffedProgress")
        ui.sandwichBar.classList.remove("buffedProgress")

        currentBoost = "none";
    }
    else if (currentBoost == "none" && adTime <= -15) {
        // Hm, let's wait for next ad (you didn't accept this one)
        adButton.style.display = "none";
        adTime = 5;
        adMax = 5;
    }

    updateUI();
    window.requestAnimationFrame(loop);
}

function determineLeastUsedBoost() {
    let least = ["", 1000000000000000000000000];
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
        case "mg":
            return "moreGems";
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

    checkForZeroNext();
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
    adHandler.volume = 0.2;
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
            case "moreGems":
                game.stats.wads.mg += 1;
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
        if (currentBoost == "moreSandwiches") {
            ui.sandwichBar.classList.add("buffedProgress")
        }
    }
}
catch (e) {
    console.trace(e);
}

//let lastAdTimer = 0;
adHandler.ontimeupdate = () => {
    if (adHandler.controls == true) { //((adHandler.currentTime > lastAdTimer + 2 && adHandler.currentTime < adHandler.duration) || adHandler.playbackRate > 1) {
        adHandler.onended();

        adTime = -50000000000;
        currentBoost = "screwyou";
        availableBoost = "noneeeeeee";
    }
    /*else {
        lastAdTimer = adHandler.currentTime;
    }*/
}

ui.topSquare.style.display = (settings.topSquare ? "" : "none");

// Update upgrades UI
updateUpgrades();
updateArtifacts();
updateGems();
updateTopSquare();
updateCurrencies();
renderAmeConvert();
updateUpgradeColors();

renderSettings();

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

if (!BETA.isBeta) console.log("%cA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nAAAAAAAAAAAAAAAAAAAAAAA ", 'background: red; color: red');
console.log("%cYou shouldn't be here.\nExcept if you're Schrottii. ", 'background: #000000; color: red');