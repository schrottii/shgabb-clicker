// Game made by Schrottii - editing or stealing is prohibited!

// Main JS File

// Game version and patch notes

const gameVersion = "2.2";

const currentPatchNotes = [
    "-> Challenges:",
    "- New feature: Challenges! Unlocked at More Shgabb 6000",
    "- Added 4 Challenges, unlocked at 6000, 6000, 8000, 10k",
    "- Each Challenge have different conditions that make upgrading More Shgabb harder",
    "- After completing a Challenge, its tier is increased",
    "- Higher tiers have higher goals and are often more difficult",
    "- Challenges give boosts for each tier completed",
    "- Entering and leaving a Challenge causes a Prestige",
    "- In Challenges, Upgrades that are not unlocked are disabled",
    "-> Anniversary Event:",
    "- New event: Anniversary Event!",
    "- Active from January 6th - January 13th",
    "- During the Event, Shgabb production is tripled and Artifacts from clicks are 50% more common",
    "- Click to bake a Cake!",
    "- After 10,000 clicks, the cake is done and can be eaten",
    "- After eating a Cake, Shgabb production is x10, click speed x5, Gem chance x3 and new Ad offers appear extremely fast!",
    "- The Cake effects last for 3 minutes",
    "- 3 new event PFPs and 4 event achievements can be earned",
    "- Added Cakes eaten stat",
    "-> Balance:",
    "- Cheese is now also affected by GS boosts Shgabb 2 (as it boosts auto)",
    "- Reworked Seeds, new effect: +1%/+2%/+3% Shgabb, resets every 1k clicks",
    "- Shgabb Boost Gem Offer now permanent (stays after Prestige)",
    "- Shgabb Boost Gem Offer boost reduced from +100% to +25%",
    "- Trash Can: reworked code, reduced default boost from x1 to x0, but minimum is x1 (x1 -> x4 instead of x1 -> x5 at lvl 3)",
    "-> Player Profile:",
    "- 3 new PFPs!",
    "- Locked PFPs are now displayed (in gray, images not visible)",
    "- The types of each PFP are now displayed (Normal, Currency, Event)",
    "- The start date is now saved (on top of the start version)",
    "- The start version and start date are now visible in the Player Profile",
    "-> Design:",
    "- Removed the cooldown bar and moved it into the click button instead",
    "- The cooldown is now visible in the click button",
    "- Ad Bar now has a gray gradient background",
    "- PC: Ad Bar now has the same width as the button",
    "- Patch notes background is no longer a bit transparent, to make it more readable",
    "- Améliorer Convert Buttons are now a bit more consistent in height",
    "- Changed how the background image is displayed",
    "-> Other:",
    "- Added 5 new Artifacts (3 rare, 2 epic)",
    "- Added 5 new Achievements (80 total)",
    "- Added 5 new Quotes",
    "- The current fridge duration, auto prod and cheese prod can now be seen above the Sandwich Upgrades",
    "- Added support for formatted dates",
    "- Gift chance is no longer visible outside of the Christmas Event",
    "- Changed description of the Silicone Boosts GS Upgrade",
    '- Changed Faster Shgabb description from "You can click 5x more often" to "5x shorter click cooldown"',
    "- Some other small improvements",
    "-> Bug fixes:",
    "- Fixed Gems being called rubies in the description of Gems To Amé",
    "- Fixed missing capitalization in the More Silicone ad description",
    "- Fixed Gem Offers not appearing after importing",
    "- Fixed some notation stuff",
]

// Various variables

//var doubleClick = 0;

// some timers
var autoSaveTime = 5;
var quoteTime = 15;
var sandwichTime = 1;
var sandwichFreezeTime = 60;
var time = 0;
var oldTime = 0;

// notifications
var currentNotifications = [];
var autoNotifications = 0;

// artifacts
var knifeBoost = 1;
var trashCanBoost = 0;
var hoodGoo = 0;

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
    upgradesr: document.getElementById("upgradesr"),
    swupgradesr: document.getElementById("swupgradesr"),
    gsupgradesr: document.getElementById("gsupgradesr"),
    siupgradesr: document.getElementById("siupgradesr"),
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
    artifactSearch: document.getElementById("artifactSearch"),
    ameconvert: document.getElementById("ameconvert"),
    achievementsamount: document.getElementById("achievementsamount"),
    stats: document.getElementById("stats"),
    achievements: document.getElementById("achievements"),
    pfps: document.getElementById("pfpsSel"),
    notifications: document.getElementById("notifications"),
    newestNotification: document.getElementById("newestnotif"),
    music: document.getElementById("music"),
    quote: document.getElementById("quote"),
    prestigeButton: document.getElementById("prestigebutton"),
    topSquare: document.getElementById("topSquare"),
    settings: document.getElementById("settings"),
    eventRender: document.getElementById("eventRender"),
    challengeRender: document.getElementById("challengeRender"),
    autoInfo: document.getElementById("autoInfo"),
}

// Ad variables
var adHandler = document.getElementById("baldad");
var adButton = document.getElementById("adstartbutton");
var adLoaded = false;
var availableBoost = "none";
var currentBoost = "none";
var adTime = 20;
var adMax = 20;

const boosts = ["strongerClicks", "strongerAuto", "moreSandwiches", "fasterShgabb", "moreCrits", "moreSilicone", "moreGems"];
const boostTexts = {
    strongerClicks: "Stronger Clicks: Get 5x Shgabb from clicks for 5 minutes",
    strongerAuto: "Stronger Auto: Get 5x automatic Shgabb for 10 minutes",
    moreSandwiches: "More Sandwiches: Get Sandwiches four times as often for 3 minutes",
    fasterShgabb: "Faster Shgabb: 5x shorter click cooldown for 60 seconds",
    moreCrits: "More Crits: 5x critical hit chance and 3x crit boost for 3 minutes",
    moreSilicone: "More Silicone: Get 10x Silicone Shgabb for 5 minutes",
    moreGems: "More Gems: 3x higher Gem chance for 8 minutes",
};
const adTimes = {
    strongerClicks: 300,
    strongerAuto: 600,
    moreSandwiches: 180,
    fasterShgabb: 60,
    moreCrits: 180,
    moreSilicone: 300,
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
    "You caught a Bass! Weight: 1.46e73 kilos - DaGame",
    "yo fish is almost as fat as yo momma - elmenda452",
    "You caught a rare golden fish! Rain of pure gold appears! - DaGame",
    "You have 0.0001 second to click this quote and get Obama right now! Oops, you're late! - DaGame",
    "elken bad person no sharo statto - schrotttv",

    "my brain isnt mathing rn i need ciguretos - schrotttv",
    "i avoid plants - elmenda452",
    "are seeds still trash - slowmerger",
    "You hate them just because you're not an endgame player :puke: - DaGame",
    "i AGRHARH - Schrottii",
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
    game.cheated = true;
    if (cheatCurrency.value == "stats.playTime") game.stats.playTime = toCheat;
    else game[cheatCurrency.value] = toCheat;
    updateUI();
    updateArtifacts();
    updateGems();
}

ui.cheatAmount.oninput = () => {
    ui.cheatDisplay.innerHTML = fn(ui.cheatAmount.value);
}

ui.artifactSearch.oninput = () => {
    updateArtifacts();
}

// format number
function fn(number) {
    // format number function

    // this one is for very low numbers like 0.00000000001
    if (number.toString().split(".").length > 1) if (number.toString().split(".")[0] == "0" && number.toString().split(".")[1].substr(0, 2) == "00") return number.toString();

    //if (number.toString().split(".").length > 1) if (number.toString().split(".")[0] == "1" && number.toString().split(".")[1].substr(0, 3) == "000") return "0." + "0".repeat(number.toString().split("e-")[1] - 1) + "1";
    if (number < 1000000) number = Math.round(number * 10) / 10;
    else number = Math.floor(number);

    if (number.toString().split("e").length > 1) {
        if (number.toString().split("e")[0].split(".")[1] != undefined) number = number.toString().split("e")[0].split(".")[0] + number.toString().split("e")[0].split(".")[1].substr(0, 3) + "0".repeat(parseInt(number.toString().split("e")[1]) - 3);
        number = number.toString().split("e")[0] + "0".repeat(parseInt(number.toString().split("e")[1]));
    }

    // define variables for decimals (dec) and the notation part (notiePart, such as e6 or M)
    let dec = number.toString().substr(number.toString().length % 3 == 0 ? 3 : number.toString().length % 3, number.toString().length % 3 == 0 ? 1 : 2);
    let notiePart = "";
    switch (settings.notation) {
        case "normal":
            notiePart = normalNotation[Math.floor((number.toString().length - 1) / 3 - 1) - 1];
            if (notiePart == undefined) notiePart = "";
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

    // if at least one million, return it yes
    if (number.toString().length > 6) return number.toString().substr(0, number.toString().length % 3 == 0 ? 3 : number.toString().length % 3) + (dec != "" ? ("." + dec) : "") + notiePart;

    // no notation below one million
    return number.toFixed(1).toString().substr(-1) == "0" ? number.toFixed(0) : number.toFixed(2);
}

// currency image
function cImg(imgname) {
    return '<img class="currency" src="images/currencies/' + imgname + '.png" />';
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    if (game.clickCooldown <= 0) {
        let critMulti = criticalHit();
        let amount = Math.floor(getProduction() * critMulti * (currentBoost == "strongerClicks" ? 5 : 1) * (getArtifactByID(200).isEquipped() ? 0 : 1));
        if (getArtifactByID(314).isEquipped() && hoodGoo > amount) amount = hoodGoo;

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

        if (getArtifactByID(310).isEquipped()) {
            trashCanBoost -= 0.1;
        }
        else trashCanBoost = 0;

        if (getArtifactByID(213).isEquipped()) increaseGS(getArtifactEffect(213) / 100);

        if (getArtifactByID(314).isEquipped()) {
            if (Math.random() < 0.05 && hoodGoo > 0) {
                hoodGoo = 0;
                createNotification("Goo is gone...");
            }
            if (Math.random() < getArtifactLevel(314) / 10 && amount > hoodGoo) {
                hoodGoo = amount;
                createNotification("Goo: " + fn(amount));
            }
        }

        if (isEvent("christmas")) {
            if (Math.random() < 1 / (250 / getCooldown())) {
                game.gifts += 1;
                game.stats.gifts += 1;
                createNotification("+1 Gift!");
            }
        }

        if (isEvent("anniversary")) game.cakeProgress = Math.min(10000, game.cakeProgress + 1);

        if (Math.random() * 100 < siliconeShgabbUpgrades.siliconeFromClicks.currentEffect()) {
            let amount = 3 * getSiliconeProduction(true) * getArtifactBoost("clicksi");
            game.si += amount;
            game.stats.si += amount;
            if (getArtifactByID(312).isEquipped() && Math.random() > 0.9 && game.gems > 0) game.gems -= 1;
        }

        if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)) {
            amount = getSandwich(critMulti);
            game.sw += amount;
            game.stats.sw += amount;
            game.stats.swtp += amount;
            createNotification("+" + fn(amount) + " Sandwich" + (amount > 1 ? "es" : "") + "!");
        }

        changeDiceAmount();
        if (unlockedGems()) getGem();
        if (unlockedArtifacts()) getArtifact();
        updateArtifacts();
        updateGems();
        updateUpgrades();
        renderCurrentEvent();
    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));
    }

    freezeTime();
}

function increaseGS(multi) {
    let amount = Math.floor(getGoldenShgabb() * multi);
    game.gs += amount;
    game.stats.gs += amount;
    return amount;
}

function getFreezeTime() {
    return getArtifactByID(210).isEquipped() ? 5 : (60 + sandwichUpgrades.fridge.currentEffect());
}

function freezeTime() {
    sandwichFreezeTime = getFreezeTime();
}

var diceAmount = 1;
function changeDiceAmount() {
    diceAmount = Math.ceil(Math.random() * (7 - getArtifactLevel(307))) + (getArtifactLevel(307) - 1);
    if (getArtifactByID(307).isEquipped()) updateArtifacts();
}

var frustration = 0;

// Various production functions

function getProduction(sosnog = false) {
    // Get the current shgabb production per click
    if (getArtifactByID(305).isEquipped() && sosnog == false) return getAutoProduction(true);

    // things that boost Shgabb and Click Shgabb
    let prod = Math.ceil((1 + shgabbUpgrades.moreShgabb.currentEffect()) * shgabbUpgrades.bomblike.currentEffect() * (game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1)
        * goldenShgabbUpgrades.divineShgabb.currentEffect()
        * goldenShgabbUpgrades.gsBoost1.currentEffect()
        * ((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.currentEffect() / 100)) + 1)
        * getSiliconeBoost()
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * getArtifactBoost("shgabb")
        * getArtifactBoost("clickshgabb")
        * knifeBoost
        * (getArtifactByID(211).isEquipped() ? 0.6 : 1)
        * (1 + game.gemboost / 4)
        * ameliorerUpgrades.shgabbBoost.currentEffect()
        * ameliorerUpgrades.gsBoostsShgabb.currentEffect()
        * sandwichUpgrades.meaningOfLife.currentEffect()
        * (getArtifactByID(306).isEquipped() ? ((getArtifactLevel(306) * 2) * (1 / getCooldown())) : 1)
        * (getArtifactByID(307).isEquipped() ? diceAmount : 1)
        * eventValue("anniversary", 3, 1)
        * cakeValue(10, 1)
        * getChallenge(1).getBoost()
        * getChallenge(2).getBoost()
    );
    if (isChallenge(2)) prod = Math.pow(prod, 1 / (2 + 0.5 * (getChallenge(1).getTier() - 1)));
    return prod;
}

function getAutoProduction(sosnog2 = false, returnType = "all") {
    if (isChallenge(3)) return 0;
    if (getArtifactByID(305).isEquipped() && sosnog2 == false && returnType != "cheese") return getProduction(true);
    if (returnType == "cheese") {
        if (getArtifactByID(305).isEquipped()) return 0;
    }
    // NORMAL AUTO PROD, things that boost Shgabb in general (do not add these to Cheese then it would be boosted twice)
    let prod = 0;
    if (returnType != "cheese") {
        prod = Math.ceil(sandwichUpgrades.autoShgabb.currentEffect()
            * goldenShgabbUpgrades.divineShgabb.currentEffect()
            * getSiliconeBoost()
            * goldenShgabbUpgrades.formaggi.currentEffect()
            * getArtifactBoost("shgabb")
            * knifeBoost
            * (1 + game.gemboost / 4)
            * ameliorerUpgrades.shgabbBoost.currentEffect()
            * ameliorerUpgrades.gsBoostsShgabb.currentEffect()
            * (getArtifactByID(307).isEquipped() ? diceAmount : 1)
            * eventValue("anniversary", 3, 1)
            * cakeValue(10, 1)
            * getChallenge(1).getBoost()
        );
        if (isChallenge(2)) prod = Math.pow(prod, 1 / (2 + 0.5 * (getChallenge(2).getTier() - 1)));
        if (returnType == "auto") return prod;
    }

    // CHEESE
    if (sandwichUpgrades.cheese.currentLevel() > 0) {
        prod = prod + Math.ceil((getProduction(true) * sandwichUpgrades.cheese.currentEffect()));
    }

    // things that boost auto shgabb (-> normal auto AND cheese)
    prod = prod
        * goldenShgabbUpgrades.gsBoost2.currentEffect()
        * getChallenge(3).getBoost()
        * getArtifactBoost("autoshgabb")
        * (getArtifactByID(300).isEquipped() ? Math.max(1, ((getArtifactLevel(300) * 2) * game.clickCooldown + 1)) : 1)
        * (currentBoost == "strongerAuto" ? 5 : 1);
    return prod;
}

function getSiliconeProduction(isClicks = false) {
    return Math.ceil(siliconeShgabbUpgrades.moreSilicone.currentEffect() * (currentBoost == "moreSilicone" ? 10 : 1)
        * goldenShgabbUpgrades.formaggi.currentEffect()
        * goldenShgabbUpgrades.moreSilicone2.currentEffect()
        * ameliorerUpgrades.siliconeBoost.currentEffect()
        * getArtifactBoost("si"))
        * (getArtifactByID(161).isEquipped() && !isClicks ? 0 : 1);
}

function getSiliconeBoost(level = "current") {
    if (level == "current") level = game.upgradeLevels.strongerSilicone;
    return (1 + Math.log((game.si / 1000) + 1) * (1 + siliconeShgabbUpgrades.strongerSilicone.effect(level) * Math.sqrt(Math.min(game.stats.playTime, 3000000)))) * (getArtifactByID(304).isEquipped() ? (2 + (getArtifactLevel(304) * 1)) : 1);
}

var clickCooldown = 5;
function getCooldown() {
    // click cooldown
    let CD = Math.max(0.1, (5 - shgabbUpgrades.shorterCD.currentEffect() - goldenShgabbUpgrades.shortCD.currentEffect())
        / (currentBoost == "fasterShgabb" ? 5 : 1)
        / getArtifactBoost("clickspeed")
        / cakeValue(5, 1)
        * (getArtifactByID(156).isEquipped() ? getArtifactByID(156).getEffect() : 1)
        * (getArtifactByID(203).isEquipped() ? 5 : 1))
    if (isChallenge(3)) CD = 20;
    clickCooldown = CD; // Why T_T
    return CD;
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

function getSandwich(critMulti = 1) {
    return Math.floor(((shgabbUpgrades.moreSw.currentEffect() + 1) * getArtifactBoost("sw")
        * goldenShgabbUpgrades.formaggi.currentEffect())
        * ameliorerUpgrades.sandwichBoost.currentEffect()
        * Math.ceil(1 + (critMulti * ameliorerUpgrades.critsAffectSW.currentEffect()))
        * (getArtifactByID(307).isEquipped() ? diceAmount : 1)
        * getChallenge(0).getBoost()
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
    if (getArtifactByID(314).isEquipped()) {
        if (hoodGoo > amount) amount = hoodGoo;
        if (Math.random() < 0.05) {
            hoodGoo = 0;
            createNotification("Goo is gone...");
        }
    }

    if (amount > 0) {
        game.shgabb += amount;
        game.stats.shgabb += amount;
        game.stats.shgabbtp += amount;
        //createNotification("+" + amount + " shgabb");

        if (getArtifactByID(214).isEquipped()) increaseGS(getArtifactEffect(214) / 100);
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
        if (getArtifactByID(312).isEquipped() && Math.random() > 0.9 && game.gems > 0) game.gems -= 1;
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
    if (!isChallenge(0)) {
        if (game.upgradeLevels.moreShgabb < getChallenge(game.aclg - 1).getGoal()) {
            alert("The Challenge is not completed yet! If you prestige, it will be cancelled!");
        }
    }
    if (confirm("Do you really want to prestige?")) {
        let amount = increaseGS(1 * getArtifactBoost("prestigegs"));

        // Reset Shgabb, Sandwiches, some stat stuff
        game.shgabb = 0 + getArtifactBoost("resetshgabb");
        game.sw = 0;
        //game.gemboost = 1; // 2nd Gem offer
        game.stats.shgabbtp = 0;
        game.stats.swtp = 0;
        game.stats.ctp = 0;
        game.stats.pttp = 0;
        hoodGoo = 0;

        if (game.aclg != 0 && game.upgradeLevels.moreShgabb >= getChallenge(game.aclg - 1).getGoal()) {
            // Challenge completed
            game.clg[game.aclg] += 1; // increase tier aka reward n shd
        }

        // Shgabb and Sandwich Upgrades
        for (let u of Object.keys(shgabbUpgrades)) {
            game.upgradeLevels[u] = 0;
        }
        let keepSWU = ["", "Better Fridge", "1. Upgrade boosts clicks", "Cheese", "Auto Shgabb", "2+2=5", "Meaning Of Life"]
        for (let u of Object.keys(sandwichUpgrades)) {
            if (ameliorerUpgrades.keepSWU.currentLevel() < keepSWU.indexOf(sandwichUpgrades[u].name)) game.upgradeLevels[u] = 0;
        }

        if (ui.ameReset.checked == true) ameReset();

        game.stats.pr += 1;
        game.stats.hmstp = game.stats.hms;

        game.aclg = 0;
        if (enableThisChallenge != 0) {
            game.aclg = enableThisChallenge;
            enableThisChallenge = 0;
        }

        updateUpgrades();
        renderChallenges();
        createNotification("Prestiged for " + amount + " Golden Shgabb!");
    }
}

function unlockedSilicone() {
    return game.shgabb >= 1000000000 || game.stats.si > 0;
}

function unlockedSandwiches() {
    return game.upgradeLevels.swChance > 0 || game.stats.sw > 0;
}

function unlockedGS() {
    return game.shgabb >= 1000000 || game.stats.pr > 0;
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
        case "gems":
            return 500;
    }
}

function canAffordAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    if (type != "gems") return game[type] >= costs;
    else {
        return game[type] >= costs && highestAmeConvert() > game.ameUp[4];
    }
}

function highestAmeConvert() {
    let highest = game.ameUp[0];
    if (game.ameUp[1] > highest) highest = game.ameUp[1];
    if (game.ameUp[2] > highest) highest = game.ameUp[2];
    if (game.ameUp[3] > highest) highest = game.ameUp[3];
    return highest;
}

function convertAmeliorer(type) {
    let costs = getAmeliorerConvertCosts(type);
    if (canAffordAmeliorer(type)) {
        game[type] -= costs;
        game.ameUp[{ "shgabb": 0, "sw": 1, "gs": 2, "si": 3, "gems": 4 }[type]] += 1;
        game.ame += 1;
        game.stats.ame += 1;
        updateUpgrades();
        renderAmeConvert();
    }
}

function renderAmeConvert() {
    let render = "";
    for (l = 0; l < 4 + ameliorerUpgrades.gems2ame.currentLevel(); l++) {
        let thisType = ["shgabb", "sw", "gs", "si", "gems"][l];
        render = render + "<button onclick='convertAmeliorer(`" + thisType + "`)' class='ameliorerButton' style='background-color: " + (canAffordAmeliorer(thisType) ? "rgb(180, 255, 200)" : "white") + "'>[" + game.ameUp[l] + (thisType == "gems" ? ("/" + highestAmeConvert()) : "") + "] Convert " + fn(getAmeliorerConvertCosts(thisType)) + " " + ["Shgabb", "Sandwiches", "Golden Shgabb", "Silicone", "Gems"][l] + " to<br />+1 Améliorer!</button>";
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

function renderUpgrades(object){
    let render = "";
    for (o in object) {
        render = render + object[o].render();
    }
    return render;
}

function updateUpgrades() {
    // Update upgrades UI
    ui.upgradesr.innerHTML = renderUpgrades(shgabbUpgrades);

    ui.swupgradesr.innerHTML = renderUpgrades(sandwichUpgrades);

    ui.gsupgradesr.innerHTML = renderUpgrades(goldenShgabbUpgrades);

    ui.siupgradesr.innerHTML = renderUpgrades(siliconeShgabbUpgrades);

    ui.ameupgradesr.innerHTML = renderUpgrades(ameliorerUpgrades);
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

        if (unlockedArtifactUpgrading()) ui.artifactScrapAmount2.innerHTML = ui.artifactScrapAmount.innerHTML;
        else ui.artifactScrapAmount2.innerHTML = "";
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

    if (unlockedArtifactUpgrading()) ui.artifactScrapAmount.innerHTML = cImg("artifactscrap") + game.artifactScrap + " Artifact Scrap";
    else ui.artifactScrapAmount.innerHTML = "";
}

function updateStats() {
    ui.stats.innerHTML = "<div style='float: left; width: 50%;' class='square2'>"
        + "Highest More Shgabb: " + fn(game.stats.hms)
        + "<br />Total Clicks: " + fn(game.stats.clicks)
        + "<br />Total Time: " + (game.stats.playTime > 18000 ? (game.stats.playTime / 3600).toFixed(1) + " hours" : game.stats.playTime.toFixed(1))
        + "<br />Total Shgabb: " + fn(game.stats.shgabb)
        + "<br />Total Sandwiches: " + fn(game.stats.sw)
        + "<br />Total Ads watched: " + game.stats.ads + " (SC: " + game.stats.wads.sc + "/SA: " + game.stats.wads.sa + "/MSW: " + game.stats.wads.msw + "/FS: " + game.stats.wads.fs + "/MC: " + game.stats.wads.mc + "/MSI: " + game.stats.wads.msi + "/MG: " + game.stats.wads.mg + ")"
        + "<br />Total Golden Shgabb: " + fn(game.stats.gs)
        + "<br />Total Prestiges: " + game.stats.pr
        + "<br />Total Silicone Shgabb: " + fn(game.stats.si)
        + "<br />Total Améliorer: " + fn(game.stats.ame)
        + "<br />Total Gems: " + fn(game.stats.tgems)
        + "<br />Total Gifts: " + fn(game.stats.gifts)
        + "<br />Total Cakes eaten: " + fn(game.stats.cakes)
        + "<br />Total Artifact Scrap: " + fn(game.stats.artifactScrap)
        + "<br />Total SSS wins: " + fn(game.stats.tttw) + " (Points: " + fn(game.stats.tttpw) + ")"
        + "<br />Total SSS losses: " + fn(game.stats.tttl) + " (Points: " + fn(game.stats.tttpl) + ")"
        + "</div><div style='float: right; width: 50%;' class='square2'>"
        + "Click Cooldown: " + getCooldown().toFixed(2) + "s" + (getCooldown() == 0.1 ? " [MAX]" : "")
        + "<br />Critical Hit Chance: " + (shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) + "%"
        + "<br />Sandwich Chance: " + (shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)).toFixed(2) + "%"
        + "<br />Gem Chance: " + getGemChance().toFixed(2) + "%" + (getGemChance() == 10 + frustration ? " [MAX]" : "") + " (+" + getArtifactBoost("gems").toFixed(1) + ")"
        + (isEvent("christmas") ? "<br />Gift Chance: 1/" + Math.ceil(250 / getCooldown()) : "")

        + "<br />" + (unlockedArtifacts() ? "Artifact Chances:"
        + "<br />Common " + (1 / 8 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance").toFixed(3) + "/800)" + (allArtifactsOfRarity(1) ? " ALL" : "")
        + "<br />Rare " + (1 / 40 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance").toFixed(3) + "/4000)" + (allArtifactsOfRarity(2) ? " ALL" : "")
        + "<br />Epic " + (1 / 320 * getArtifactBoost("artifactchance")).toFixed(3) + "% (" + getArtifactBoost("artifactchance").toFixed(3) + "/32000)" + (allArtifactsOfRarity(3) ? " ALL" : "")
            : "Artifacts locked!")

        + "<br />Achievements: " + game.ach.length + "/" + achievements.length
        + "<br />Artifacts: " + Math.max(0, game.a.length - 1) + "/" + (artifacts.length - 1)
        + "<br />Améliorer Levels: " + getTotalAme()
        + "</div>";
}

function updateUI() {
    // Update UI
    if (game.profile.id == "") {
        game.profile.id = Math.random().toString(16).slice(2);
        game.profile.startVer = gameVersion;
        game.profile.startDay = today();
        game.profile.name = "Name";
    }
    if (game.profile.startVer == "") game.profile.startVer = gameVersion;
    if (game.profile.startDay == "") game.profile.startDay = today();

    // Click Button
    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = getArtifactByID(307).isEquipped() ? ("<img src='images/arti/dice-" + Math.ceil((game.clickCooldown % 0.6) * 10) + ".png' width='32px'>") : game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "lightblue";
        ui.clickButton.style.backgroundSize = 100 * (game.clickCooldown / clickCooldown) + "% 100%";
    }
    else {
        let diceRender = (getArtifactByID(307).isEquipped() ? ("<img src='images/arti/dice-" + diceAmount + ".png' width='32px'>") : "");
        let gooRender = (getArtifactByID(314).isEquipped() && hoodGoo > 0 ? ("<img src='images/arti/hoodgoo.png' width='32px'>") : "");
        ui.clickButton.innerHTML = diceRender + gooRender + "+" + (hoodGoo != 0 ? fn(hoodGoo) : fn(getProduction() * (currentBoost == "strongerClicks" ? 3 : 1))) + " Shgabb" + diceRender;
        ui.clickButton.style["background-color"] = "blue";
        ui.clickButton.style.backgroundSize = "0% 100%";
    }
    //ui.cooldownBar.value = game.clickCooldown;
    //ui.cooldownBar.max = getCooldown();

    // Sandwiches
    if (selection("sandwich")) {
        ui.sandwichBar.value = sandwichFreezeTime;
        ui.sandwichBar.max = getFreezeTime();

        ui.autoInfo.innerHTML = "Fridge Time: " + getFreezeTime().toFixed(0)
            + "<br />Normal Auto Prod.: " + fn(getAutoProduction(false, "auto"))
            + "<br />Cheese Prod.: " + fn(getAutoProduction(false, "cheese"))
            + "<br />Total Prod.: " + fn(getAutoProduction());
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
    if (game.shgabb >= 1000000 && game.stats.pttp >= 15) {
        let challengeText = "";
        if (!isChallenge(0)) {
            challengeText = "<br />Challenge Goal: " + game.upgradeLevels.moreShgabb + "/" + getChallenge(game.aclg - 1).getGoal();
        }

        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "Prestige!<br />Lose your Shgabb and Sandwiches, as well as their upgrades, but keep stats and get Golden Shgabb!<br />Prestige to get: " + fn(getGoldenShgabb()) + " GS!" + challengeText;
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
    if (selection("minigames")) {
        updateMinigameUI();
    }

    // Plaj Provif
    if (selection("playerprofile")) {
        renderPlayerProfile();
    }

    // Eventzzz
    //if (selection("events")) {
        //renderCurrentEvent();
    //}


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

var newArtifactDisplayTimer = 0;

// Core
function autoSave() {
    autoNotifications += 1;

    // Kill knife if yo slow
    if (game.clickCooldown < -0.33) knifeBoost = 1;

    // Le rare renderes
    renderAmeConvert();
    renderAllSelection();
    renderPFPs();

    // Every 50 saves, check for shgic
    if (autoNotifications % 50 == 0) {
        canPlayTTT = compareMinigameTime();
    }

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
            newArtifactDisplayTimer = 5;
            break;
        }
    }

    if (!newAch) createNotification("Game saved automatically " + autoNotifications);
}

function exportGame() {
    if (game.cheated == true) { alert("You can't export a cheated save!"); createNotification("Couldn't export: Cheated"); return false; } let exportGame = JSON.stringify(game); exportGame = btoa(exportGame); exportGame = exportGame.replace(rep7, "shgabb"); exportGame = exportGame.replace("x", "pppp"); exportGame = exportGame.replace("D", "dpjiopjrdopjh"); navigator.clipboard.writeText(exportGame); createNotification("Game exported to clipboard!"); } function importGame() { let importGame = prompt("Code?"); if (importGame == "resetmytic" && BETA.isBeta) { pointsPlayer = 0; pointsHer = 0; game.tttd = 1; canPlayTTT = true; } trashCanBoost = 0; knifeBoost = 0; resetMinigameField(); if (importGame.substr(0, 6) == "faCoDe") { importGame = importGame.substr(10); } else { importGame = importGame.replace("shgabb", rep7); importGame = importGame.replace("dpjiopjrdopjh", "D"); importGame = importGame.replace("pppp", "x"); } importGame = atob(importGame); importGame = JSON.parse(importGame);

    // Empty the game first. Make it completely empty
    emptyGame.a = [];
    game = {};
    // Now import. it's done this way to support old saves
    game = Object.assign({}, emptyGame, importGame);

    // Take care of arrays
    game.upgradeLevels = Object.assign({}, emptyGame.upgradeLevels, importGame.upgradeLevels);
    game.stats = Object.assign({}, emptyGame.stats, importGame.stats);
    game.ameUp = Object.assign({}, emptyGame.ameUp, importGame.ameUp);
    game.profile = Object.assign({}, emptyGame.profile, importGame.profile);

    // Some adjustments
    canPlayTTT = compareMinigameTime();
    pointsPlayer = 0;
    pointsHer = 0;

    // Execute some stuff
    handleArtifactsFirstTime();
    updateUI();
    updateUpgrades();
    updateArtifacts();
    updateBG();
    renderGemOffers();

    createNotification("Game imported successfully!");
}

function showAd() {
    selectVideo();

    adButton.style.display = "none";
    adHandler.style.display = "inline";
    adHandler.play();
    currentBoost = "wait";
}

function loop(tick) {
    // Main Game Loop
    let time = (tick - oldTime) / 1000;
    oldTime = tick;

    //doubleClick -= time;
    game.clickCooldown -= time;
    autoSaveTime -= time;
    quoteTime -= time;
    sandwichTime -= time;
    sandwichFreezeTime -= time;
    newArtifactDisplayTimer -= time;
    cakeDuration -= time;
    game.stats.playTime += time;
    game.stats.pttp += time;
    if (adLoaded && game.stats.sw > 9) adTime -= time;

    for (n in currentNotifications) {
        currentNotifications[n][1] -= time;
        if (currentNotifications[n][1] < 0) currentNotifications.splice(n, 1);
    }

    if (newArtifactDisplayTimer <= 0 && newArtifactDisplayTimer > -15) {
        ui.newArtifact.style.display = "none";
    }
    if (autoSaveTime <= 0) {
        autoSaveTime = 5;
        autoSave();
    }
    if (quoteTime <= 0) {
        quoteTime = 10;
        updateQuote();
    }
    if (sandwichTime <= 0) {
        if (isChallenge(4)) {
            for (u in shgabbUpgrades) {
                game.upgradeLevels[shgabbUpgrades[u].ID] = Math.max(0, game.upgradeLevels[shgabbUpgrades[u].ID] - (getChallenge(3).getTier() + 1));
            }
            game.upgradeLevels.moreShgabb = Math.max(0, game.upgradeLevels.moreShgabb - (4 * (getChallenge(3).getTier() + 1)));
            if (sandwichFreezeTime < 0) {
                sandwichTime = 1;
                updateUpgrades();
            }
        }
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
    }
    else if (adTime <= 0 && adButton.style.display == "none" && adHandler.style.display == "none") {
        // Ad is over! (as in, the boost is over. not the video. for that, scroll down to the onended)
        adTime = cakeValue(1, 5);
        adMax = 5;

        //ui.cooldownBar.classList.remove("buffedProgress")
        ui.sandwichBar.classList.remove("buffedProgress")

        currentBoost = "none";
    }
    else if (currentBoost == "none" && adTime <= cakeValue(-4, -15)) {
        // Hm, let's wait for next ad (you didn't accept this one)
        adButton.style.display = "none";
        adTime = cakeValue(1, 5);
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
    game.ameUp = Object.assign({}, cache.ameUp, JSON.parse(localStorage.getItem("shgabbClicker")).ameUp);
    game.profile = Object.assign({}, cache.profile, JSON.parse(localStorage.getItem("shgabbClicker")).profile);

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

    try {
        if (typeof (game.stats.wads.mg) == "undefined") game.stats.wads.mg = 0;
        else if (game.stats.wads.mg != undefined && game.stats.wads.mg.toString() == "NaN") game.stats.wads.mg = 1;
    }
    catch (e) {
        console.trace(e);
    }
    
    for (l in game.alo) {
        if (JSON.stringify(game.alo[l]) == JSON.stringify(game.aeqi)) selectedLoadout = l;
    }

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
            //ui.cooldownBar.classList.add("buffedProgress")
        }
        if (currentBoost == "moreSandwiches") {
            ui.sandwichBar.classList.add("buffedProgress")
        }
    }
}
catch (e) {
    console.trace(e);
}

function updateBG() {
    if (isEvent("christmas") && settings.eventBG) document.getElementsByTagName('body')[0].style.backgroundImage = "url(images/shgabb-background-christmas.png)";
    else if (isEvent("anniversary") && settings.eventBG) document.getElementsByTagName('body')[0].style.backgroundImage = "url(images/anniversary-background.png)";
    else document.getElementsByTagName('body')[0].style.backgroundImage = "url(images/shgabb-background.png)";
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

// Update UI
updateUpgrades();
updateArtifacts();
updateGems();
updateTopSquare();
updateCurrencies();
renderAmeConvert();
updateUpgradeColors();
renderAllSelection();
renderPFPs();
updateBG();
renderCurrentEvent();
renderChallenges();

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
