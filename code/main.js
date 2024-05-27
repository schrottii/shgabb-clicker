// Game made by Schrottii - editing or stealing is prohibited!

// Main JS File

// Game version and patch notes

const gameVersion = "2.5";

const currentPatchNotes = [
    "-> Break Infinity:",
    "- Added breakinfinity library",
    "- Expanded it to take less space in savecodes",
    "- Supports Shgabb, Sandwiches, GS, Silicone and several of their upgrades",
    "- Reworked number formatter",
    "- Capped buy max at 50k (just in case)",
    "-> Stats:",
    "- Added prestige and daily stats (on top of all time)",
    "- Added buttons to switch between the three types",
    "- Huge changes to the stats code",
    "- Left side: added labels for the sections progress, currencies and events, and other",
    "- Right side: added labels for the sections chances and progress",
    "- Added spacing between sections",
    "- Added legendary Artifact chances",
    "- Moved total Amé levels to the right side",
    "- Moved total prestiges up",
    "- Changed total cakes eaten to total cakes",
    "-> Banners / Player Profile:",
    "- Added banners",
    "- Added 3 normal banners (unlocked at 0, 2000, 4000 HMS) and 10 event banners (13 total)",
    "- Added banner selection",
    "- Added the no banner banner",
    "- The banner is displayed at the top",
    "- Moved PFP, name, version and stats down to make space for the banner",
    "- Improved quality of PFPs",
    "- Added 3 new event PFPs (26 total)",
    "- Changed started in to started",
    "-> Pride Event:",
    "- New event: Pride Event!",
    "- Active from June 1st - June 15th",
    "- 3 PFPs and 10 Banners",
    "-> Artifacts:",
    "- Artifacts now always award a new Artifact if none of this rarity are owned (thanks elmenda452)",
    "- Improved Artifact pages (when using search)",
    "-> Améliorer:",
    "- Fixed sets 5 and 6 being labeled incorrectly",
    "-> Other:",
    "- Section buttons now use images instead of text",
    "- Added 5 new Quotes",
    "- Split social section into two: info and social",
    "- The social links are now split into 2 rows (2-2) to work better on various device sizes",
]

// Various variables

//var doubleClick = 0;

// some timers
var autoSaveTime = 10;
var quoteTime = 15;
var sandwichTime = 1;
var sandwichFreezeTime = 60;
var time = 0;
var oldTime = 0;

// notifications
var currentNotifications = [];
var autoNotifications = 0;

// UI, display, render stuf
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
    bagAmount: document.getElementById("bagAmount"),
    bagAmount2: document.getElementById("bagAmount2"),

    // Images of currencies
    swImage: document.getElementById("swImage"),
    gsImage: document.getElementById("gsImage"),
    siImage: document.getElementById("siImage"),
    gemImage: document.getElementById("gemImage"),
    ameImage: document.getElementById("ameImage"),

    // Upgrades
    upgradesrender: document.getElementById("upgradesrender"),
    swupgradesrender: document.getElementById("swupgradesrender"),
    gsupgradesrender: document.getElementById("gsupgradesrender"),
    siupgradesrender: document.getElementById("siupgradesrender"),
    ameupgradesrender: document.getElementById("ameupgradesrender"),
    bagupgradesrender: document.getElementById("bagupgradesrender"),

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
    banners: document.getElementById("bannersSel"),
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

    // 2.2 (5)
    "my brain isnt mathing rn i need ciguretos - schrotttv",
    "i avoid plants - elmenda452",
    "are seeds still trash - slowmerger",
    "You hate them just because you're not an endgame player :puke: - DaGame",
    "i AGRHARH - Schrottii",

    // 2.3 (5) & 2.3.1 (5)
    "schronter you need to play more - schrotttv",
    "You won't guess my qians amount :excellent: - DaGame",
    "them fresh green rectangles - elmenda452",
    "schrottii so good we made a second schrottii - Phazer",
    "elmenda is a latin teacher irl leaked? - Barduzzi",
    "i cheated my way into your heart - schrotttv",
    "1 am... really the time ? - shgabb",
    "i slowed you in dms - elmenda452",
    "I sacrifice myself to keep this chat alive because no one will dare send anything after this - shgabb",
    "If you would add player gifts, I'd be able to send you my 168035 scraps - DaGame",

    // 2.5 (5)
    "I will lick whatever the next message says - Aloee",
    "Updates are not allowed also - Rofl",
    "im currently spacebarrinh - Barduzzi",
    "pray. - slowmerger",
    "you little sheeps, why aren't you consuming? - elmenda452"
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

function statIncrease(name, number) {
    if (game.stats[name].mantissa != undefined) {
        game.stats[name] = game.stats[name].add(number);
        game.stats_prestige[name] = game.stats_prestige[name].add(number);
        game.stats_today[name] = game.stats_today[name].add(number);
    }
    else {
        game.stats[name] += number;
        game.stats_prestige[name] += number;
        game.stats_today[name] += number;
    }
}

// ALL THE NUMBER SHIT YEE COWBOYS
function numberSaver(number) {
    // turn a break infinity object (mantissa - exponent) into a simple string, for saving
    // mantissa: 1.2, exponent: 10 -> 1.2e10
    if (number.mantissa == undefined) {
        number = number.toString();
        if (number.split("e+")[1] != undefined) number = new Decimal(number.split("e+")[0] + "e" + number.split("e+")[1]);
        else number = new Decimal(number);
    }
    return number.mantissa + "e" + number.exponent;
}

function numberLoader(number) {
    // same thing but load the saved string
    // 1.2e10 -> mantissa: 1.2, exponent: 10
    return new Decimal("" + number);
}

function fn(number) {
    // return basic number if it is 0 - 999 999
    if (number < 1000000) return number * 1;

    // 1 million or more? do notation shitz
    let notationSymbol = ""; // M, :joy:, etc.

    // Breakinfinity numbers
    if (number.mantissa == undefined) {
        number = new Decimal(number);
        // note: originally (early 2.5) I was planning on doing 2 fn methods, pretty much, one for breakinf, one normal
        // but I just realized that's tons of effort when I can just force decimal you
    }

    switch (settings.notation) {
        case "normal": // 1M, 10M
            notationSymbol = normalNotation[Math.floor(number.exponent / 3) - 2];
            break;
        case "scientific": // special case: 1e6, 1e7
            return number.mantissa.toString().substr(0, 4) + "e" + number.exponent.toString();
            break;
        case "engineering": // special case: 1E6, 10E6
            return (number.mantissa * Math.pow(10, number.exponent.toString() % 3)).toString().substr(0, 4) + "E" + (Math.floor(number.exponent.toString() / 3) * 3);
            break;
        case "alphabet": // 1a, 10a
            notationSymbol = alphabetNotation[Math.floor(number.exponent / 3) - 2];
            break;
    }

    return number.mantissa.toString().substr(0, 4) + notationSymbol;

}

// currency image
function cImg(imgname) {
    return '<img class="currency" src="images/currencies/' + imgname + '.png" />';
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    if (game.clickCooldown <= 0) {
        let clickButtonMulti = 1;

        if (getArtifactByID(402).isEquipped()) {
            if (techCollection < getArtifactByID(402).getEffect()) {
                techCollection += 1;
                game.clickCooldown = getCooldown();
            }
            else {
                clickButtonMulti = techCollection;
                techCollection = 0;
            }
        }

        if (techCollection == 0) {
            let critMulti = criticalHit();
            let amount = getProduction().mul(critMulti).mul(clickButtonMulti).floor();
            if (getArtifactByID(314).isEquipped() && hoodGoo > amount) amount = hoodGoo;

            game.shgabb = game.shgabb.add(amount);
            statIncrease("shgabb", amount);

            if ((getArtifactByID(301).isEquipped() || getArtifactByID(315).isEquipped()) && (game.clickCooldown > -0.33 || lunarAntiCooldown > 0)) {
                knifeBoost = Math.min(knifeBoost + 1, 20);
            }
            else knifeBoost = 0;

            game.clickCooldown = getCooldown();
            statIncrease("clicks", 1);

            if (getArtifactByID(310).isEquipped()) {
                trashCanBoost = Math.max(0, trashCanBoost - (0.1 * clickButtonMulti));
            }
            else trashCanBoost = 0;

            if (getArtifactByID(213).isEquipped()) increaseGS(clickButtonMulti * getArtifactEffect(213) / 100);

            if (getArtifactByID(314).isEquipped()) {
                if (Math.random() * applyLuck(50) < 0.05 && hoodGoo > 0) {
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
                    game.gifts += clickButtonMulti;
                    statIncrease("gifts", clickButtonMulti);
                    createNotification("+1 Gift!");
                }
            }

            if (isEvent("anniversary")) game.cakeProgress = Math.min(15000, game.cakeProgress + clickButtonMulti);

            if (isEvent("lunar")) {
                lunarAntiCooldown -= clickButtonMulti;
                luck -= clickButtonMulti; // reduce luck

                if (game.stats.clicks % 100 == 0 && Math.random() < 0.8) {
                    // every 100th click an 80% chance, ~120 clicks per qian drop, ~50 clicks per qian
                    let amount = (game.ach.includes(92) ? 2 : 1) * clickButtonMulti;
                    if (Math.random() < (1 / 8)) amount = 8;
                    if ((game.qian + amount) % 10 == 4) amount += 1;

                    game.qian += amount;
                    statIncrease("qian", amount);
                }
            }

            if (Math.random() * 100 < siliconeShgabbUpgrades.siliconeFromClicks.currentEffect()) {
                let amount = getSiliconeProduction(true).mul(3).mul(getArtifactBoost("clicksi")).mul(clickButtonMulti);
                game.si = game.si.add(amount);
                statIncrease("si", amount);
                if (getArtifactByID(312).isEquipped() && Math.random() > 0.9 && game.gems > 0) game.gems -= 1;
            }

            if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1) * applyLuck(100)) {
                amount = getSandwich(critMulti).mul(clickButtonMulti);
                game.sw = game.sw.add(amount);
                statIncrease("sw", amount);
                createNotification("+" + fn(amount) + " Sandwich" + (amount > 1 ? "es" : "") + "!");
            }

            changeDiceAmount();
            if (unlockedGems()) getGem();
            if (unlockedArtifacts()) getArtifact();
        }

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
    let amount = getGoldenShgabb().mul(multi).floor();
    game.gs = game.gs.add(amount);
    statIncrease("gs", amount);
    return amount;
}

function getFreezeTime() {
    return getArtifactByID(210).isEquipped() ? 5 : (60 + sandwichUpgrades.fridge.currentEffect());
}

function freezeTime() {
    sandwichFreezeTime = getFreezeTime();
}

function changeDiceAmount() {
    diceAmount = Math.ceil(Math.random() * (7 - getArtifactLevel(307))) + (getArtifactLevel(307) - 1);
    if (getArtifactByID(307).isEquipped()) updateArtifacts();
}

// Various production functions
function getGlobalProduction() {
    // these will be applied to auto AND clicks

    let prod = new Decimal(1)
        .mul(game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1)
        .mul(shgabbUpgrades.bomblike.currentEffect())
        .mul(goldenShgabbUpgrades.divineShgabb.currentEffect())
        .mul(getSiliconeBoost())
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(getArtifactBoost("shgabb"))
        .mul(1 + game.gemboost / 4)
        .mul(ameliorerUpgrades.shgabbBoost.currentEffect())
        .mul(ameliorerUpgrades.gsBoostsShgabb.currentEffect())
        .mul(getArtifactByID(307).isEquipped() ? diceAmount : 1)
        .mul(sandwichUpgrades.meaningOfLife.currentEffect())
        .mul(cakeValue(10, 1))
        .mul(getChallenge(2).getBoost())
        .mul(bagUpgrades.gemsBoostShgabb.currentEffect())
        .mul(isChallenge(0) ? 1 : bagUpgrades.challengeShgabb.currentEffect())
        .mul(eventValue("anniversary", 3, 1))
        .mul(eventValue("lunar", 8, 1));

    return prod;
}

function getProduction(sosnog = false) {
    // Get the current shgabb production per click
    if (getArtifactByID(305).isEquipped() && sosnog == false) return getAutoProduction(true);

    // things that boost Shgabb and Click Shgabb
    let prod = new Decimal(1 + shgabbUpgrades.moreShgabb.currentEffect())
        .mul(getGlobalProduction())

        .mul(goldenShgabbUpgrades.gsBoost1.currentEffect())
        .mul(((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.currentEffect() / 100)) + 1))
        .mul(getArtifactBoost("clickshgabb"))
        .mul((getArtifactByID(211).isEquipped() ? 0.6 : 1))
        .mul((getArtifactByID(306).isEquipped() ? ((getArtifactLevel(306) * 2) * (1 / getCooldown())) : 1))
        .mul(getChallenge(3).getBoost())
        .mul((currentBoost == "strongerClicks" ? 5 : 1))
        .mul((getArtifactByID(200).isEquipped() ? 0 : 1))
        .ceil();

    if (isChallenge(2)) prod = prod.pow(1 / (2 + 0.5 * getChallenge(2).getTier()));
    return prod;
}

function getAutoProduction(sosnog2 = false, returnType = "all") {
    // Get auto prod

    if (isChallenge(3)) return 0;
    if (getArtifactByID(305).isEquipped() && sosnog2 == false && returnType != "cheese") return getProduction(true);

    if (returnType == "cheese") {
        if (getArtifactByID(305).isEquipped()) return 0;
    }

    // NORMAL AUTO PROD, things that boost Shgabb in general
    let prod = new Decimal(0);
    if (returnType != "cheese") {
        prod = new Decimal(sandwichUpgrades.autoShgabb.currentEffect())
            .mul(getGlobalProduction())

            .mul(goldenShgabbUpgrades.gsBoost2.currentEffect())
            .mul(getArtifactBoost("autoshgabb"))
            .mul(getChallenge(4).getBoost())
            .mul(getArtifactByID(300).isEquipped() ? Math.max(1, ((getArtifactLevel(300) * 2) * game.clickCooldown + 1)) : 1)
            .mul(currentBoost == "strongerAuto" ? 5 : 1)
            .ceil();

        if (isChallenge(2)) prod = prod.pow(1 / (2 + 0.5 * getChallenge(2).getTier()));
        if (returnType == "auto") return prod;
    }

    // CHEESE
    if (sandwichUpgrades.cheese.currentLevel() > 0) {
        prod = prod.add(getProduction(true).mul(sandwichUpgrades.cheese.currentEffect()).ceil());
    }

    return prod;
}

function getSiliconeProduction(isClicks = false) {
    return new Decimal(siliconeShgabbUpgrades.moreSilicone.currentEffect())
        .mul(currentBoost == "moreSilicone" ? 10 : 1)
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(goldenShgabbUpgrades.moreSilicone2.currentEffect())
        .mul(bagUpgrades.moreSilicone3.currentEffect())
        .mul(ameliorerUpgrades.siliconeBoost.currentEffect())
        .mul(getArtifactBoost("si"))
        .mul(getArtifactByID(161).isEquipped() && !isClicks ? 0 : 1)
        .ceil();
}

function getSiliconeBoost(level = "current") {
    if (level == "current") level = game.upgradeLevels.strongerSilicone;

    return new Decimal(game.si.div(1000).add(1).ln())
        .mul(1 + siliconeShgabbUpgrades.strongerSilicone.effect(level))
        .mul(Math.sqrt(Math.min(game.stats.playTime, 3000000)))
        .mul(getArtifactByID(304).isEquipped() ? (2 + (getArtifactLevel(304) * 1)) : 1)
        .add(1);
}

var clickCooldown = 5;
function getCooldown() {
    // click cooldown
    if (lunarAntiCooldown > 0) return 0;
    let CD = Math.max(0.2, (5 - shgabbUpgrades.shorterCD.currentEffect() - goldenShgabbUpgrades.shortCD.currentEffect())
        / (currentBoost == "fasterShgabb" ? 5 : 1)
        / getArtifactBoost("clickspeed")
        / cakeValue(5, 1)
        * (getArtifactByID(156).isEquipped() ? getArtifactByID(156).getEffect() : 1)
        * (getArtifactByID(203).isEquipped() ? 5 : 1)
        * (getArtifactByID(225).isEquipped() ? 5 : 1))
    if (isChallenge(3)) CD = 20;
    clickCooldown = CD; // Why T_T
    return CD;
}

function getAchievementBoost() {
    return (game.upgradeLevels.achBExpo > 0 ? (Math.pow(1.02, game.ach.length)) : (1 + (game.ach.length / 50)));
}

function getGoldenShgabb() {
    return new Decimal(Math.max(10, (1 + Math.log(1 + game.stats_prestige.shgabb)) * (1 + Math.log(game.stats_prestige.sw + 1))))
        .mul(Math.max(1, Math.floor(shgabbUpgrades.moreShgabb.currentLevel() / 100 - 25)))
        .mul(Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 1000))
        .mul(Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 10000))
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(ameliorerUpgrades.amegsBoost.currentEffect())
        .mul(sandwichUpgrades.twoTwoFive.currentEffect())
        .mul(1 + (getSiliconeBoost() * siliconeShgabbUpgrades.siliconeAffectsGS.currentEffect()))
        .mul(getArtifactBoost("gs"))
        .mul(game.upgradeLevels.moreShgabb >= 1000 ? (Math.max(1, Math.min(3, 3 * (game.upgradeLevels.moreShgabb / game.stats.hms)))) : 1)
        .mul(getAchievementBoost())
        .floor();
}

function getSandwich(critMulti = 1) {
    return new Decimal(((shgabbUpgrades.moreSw.currentEffect() + 1))
        .mul(getArtifactBoost("sw"))
        .mul(goldenShgabbUpgrades.formaggi.currentEffect()))
        .mul(ameliorerUpgrades.sandwichBoost.currentEffect())
        .mul(Math.ceil(1 + (critMulti * ameliorerUpgrades.critsAffectSW.currentEffect())))
        .mul(getArtifactByID(307).isEquipped() ? diceAmount : 1)
        .mul(getChallenge(1).getBoost())
        .floor();
}

function criticalHit() {
    // Critical hit handler, returns multi (default 3)
    if (Math.random() * 100 < shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1) * applyLuck(100)) {
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
        game.shgabb = game.shgabb.add(amount);
        statIncrease("shgabb", amount);
        //createNotification("+" + amount + " shgabb");

        if (getArtifactByID(214).isEquipped()) increaseGS(getArtifactEffect(214) / 100);
    }

    if (getArtifactByID(315).isEquipped() && game.bags >= 10 && game.clickCooldown <= 0) {
        // DaGame
        if (Math.random() * 100 <= 25 * getArtifactLevel(315)) {
            game.bags -= 10;
            createNotification("DaGame clicked!");

            clickButton();
        }
    }

    updateUpgrades();
}

function silicone() {
    if (!unlockedSilicone()) return false;
    if (getArtifactByID(304).isEquipped()) return false;

    let amount = getSiliconeProduction();
    if (amount > 0) {
        game.si = game.si.add(amount);
        statIncrease("si", amount);
        if (getArtifactByID(312).isEquipped() && Math.random() * applyLuck(100) > 0.9 && game.gems > 0) game.gems -= 1;
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

    if (id.ID == "moreShgabb") {
        game.stats.hms = Math.max(game.stats.hms, game.upgradeLevels.moreShgabb);
        game.stats_prestige.hms = Math.max(game.stats_prestige.hms, game.upgradeLevels.moreShgabb);
        game.stats_today.hms = Math.max(game.stats_today.hms, game.upgradeLevels.moreShgabb);

        if (game.upgradeLevels.moreShgabb > game.stats_prestige.hms) {
            let previousHms = game.stats_prestige.hms;
            if (game.upgradeLevels.moreShgabb > game.stats_prestige.hms) game.stats_prestige.hms = game.upgradeLevels.moreShgabb;

            if (unlockedBags()) {
                let bagi = Math.ceil((ameliorerUpgrades.tiersBoostBags.currentEffect() > 0 ? getTotalTiers() : 1) * (Math.floor(game.stats_prestige.hms / 1000) - Math.floor(previousHms / 1000))
                    * getArtifactBoost("bags"));

                if (bagi > 0) {
                    game.bags += bagi;
                    statIncrease("bags", bagi);
                    createNotification("+" + bagi + " Bags!");
                }
            }
        }
    }
}

function buyMax(id) {
    // Buy an upgrade and update UI
    if (settings.noUpgrading) return false;
    let levelStart = id.currentLevel();
    while (id.canBuy() && id.currentLevel() <= levelStart + 50000) {
        id.buy();
    }
    updateUpgrades();
    freezeTime();
}

var doesUnlevel = false;

function unlevel(id, isMax=false) {
    // Unbuy an upgrade and update UI
    //if (id.type == "goldenShgabbUpgrades") if (!confirm("Do you really want to unlevel?")) return false;
    if (settings.noUpgrading) return false;
    if(!isMax || confirm("Do you really want to unlevel this to level 0?")) id.unlevel(isMax);

    updateUpgrades();
    freezeTime();
}

function prestigeButton() {
    if (!isChallenge(0)) {
        if (game.upgradeLevels.moreShgabb < getChallenge(game.aclg).getGoal()) {
            alert("The Challenge is not completed yet! If you prestige, it will be cancelled!");
        }
    }
    if (confirm("Do you really want to prestige?")) {
        let amount = increaseGS(1 * getArtifactBoost("prestigegs"));

        // Reset Shgabb, Sandwiches, some stat stuff
        game.shgabb = new Decimal(0 + (isChallenge(2) ? 0 : getArtifactBoost("resetshgabb")));
        game.sw = new Decimal(0);
        hoodGoo = 0;
        //game.gemboost = 1; // 2nd Gem offer

        for (stat in game.stats_prestige) {
            if (game.stats_prestige[stat] != undefined && game.stats_prestige[stat].mantissa != undefined) {
                game.stats_prestige[stat] = new Decimal(0);
            }
            else {
                game.stats_prestige[stat] = 0;
            }
        }

        if (game.aclg != 0 && game.upgradeLevels.moreShgabb >= getChallenge(game.aclg).getGoal()) {
            // Challenge completed
            game.clg[game.aclg] += 1; // increase tier aka reward n shd
            getArtifact(8000);
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

        if (bagUpgrades.prestigeGems.currentLevel() > 0) {
            let amount = Math.floor(game.stats_prestige.hms / 1000);
            game.gems += amount;
            statIncrease("tgems", amount);
            createNotification("+" + amount + " Gems!");
        }

        statIncrease("pr", 1);
        game.stats_prestige.hms = 0;

        game.aclg = 0;
        if (enableThisChallenge != 0) {
            game.aclg = enableThisChallenge;
            enableThisChallenge = 0;
        }

        updateUpgrades();
        renderChallenges();
        createNotification("Prestiged for " + fn(amount) + " Golden Shgabb!");
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

function unlockedBags() {
    return game.stats.hms >= 8000;
}

// Notifications
function createNotification(text) {
    currentNotifications.push(text);
    if (currentNotifications.length > 20) currentNotifications.shift();
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
        statIncrease("ame", 1);

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
    ui.upgradesrender.innerHTML = renderUpgrades(shgabbUpgrades);

    ui.swupgradesrender.innerHTML = renderUpgrades(sandwichUpgrades);

    ui.gsupgradesrender.innerHTML = renderUpgrades(goldenShgabbUpgrades);

    ui.siupgradesrender.innerHTML = renderUpgrades(siliconeShgabbUpgrades);

    ui.ameupgradesrender.innerHTML = renderUpgrades(ameliorerUpgrades);

    ui.bagupgradesrender.innerHTML = renderUpgrades(bagUpgrades);
}

function updateArtifacts() {
    // Artifacts
    if (unlockedArtifacts()) {
        ui.artifacts.innerHTML = renderArtifacts();
        ui.artifactamount.innerHTML = getArtifactAmount() + "/" + artifacts.length + " Artifacts unlocked!";
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

        if (unlockedBags()) ui.bagAmount2.innerHTML = ui.bagAmount.innerHTML;
        else ui.bagAmount2.innerHTML = "";
    }
}

function updateCurrencies() {
    if (unlockedSandwiches()) ui.shgabbAmount.innerHTML = cImg("shgabb") + fn(game.shgabb) + " Shgabb (" + fn(getAutoProduction()) + "/s)";
    else ui.shgabbAmount.innerHTML = cImg("shgabb") + fn(game.shgabb) + " Shgabb";

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

    if (unlockedBags()) ui.bagAmount.innerHTML = cImg("bag") + game.bags + " Bags";
    else ui.bagAmount.innerHTML = "";
}

// stats stuff
var statDisplay = 1;
function statLoader(title, format=true) {
    switch (statDisplay) {
        case 1:
            return format ? fn(game.stats[title]) : game.stats[title];
        case 2:
            return format ? fn(game.stats_prestige[title]) : game.stats_prestige[title];
        case 3:
            return format ? fn(game.stats_today[title]) : game.stats_today[title];
    }
}

function statsSet(no) {
    statDisplay = no;
    updateStats();
}

function updateStats() {
    // LEFT SIDE
    ui.stats.innerHTML = "<div style='float: left; width: 50%;' class='square2'>"
        + "Progress:"
        + "<br />Highest More Shgabb: " + statLoader("hms")
        + "<br />Total Clicks: " + statLoader("clicks")
        + "<br />Total Time: " + (game.stats.playTime > 18000 ? (statLoader("playTime", false) / 3600).toFixed(1) + " hours" : statLoader("playTime"))
        + "<br />Total Prestiges: " + statLoader("pr")
        + "<br />Total Ads watched: " + statLoader("ads")
        + "<br />(SC: " + game.stats.wads.sc + "/SA: " + game.stats.wads.sa + "/MSW: " + game.stats.wads.msw + "/FS: " + game.stats.wads.fs + "/MC: " + game.stats.wads.mc + "/MSI: " + game.stats.wads.msi + "/MG: " + game.stats.wads.mg + ")"
        + "<br />"

        + "<br />Currencies and Events:"
        + "<br />Total Shgabb: " + statLoader("shgabb")
        + "<br />Total Sandwiches: " + statLoader("sw")
        + "<br />Total Golden Shgabb: " + statLoader("gs")
        + "<br />Total Gems: " + statLoader("tgems")
        + "<br />Total Silicone Shgabb: " + statLoader("si")
        + "<br />Total Artifact Scrap: " + statLoader("artifactScrap")
        + "<br />Total Améliorer: " + statLoader("ame")
        + "<br />Total Bags: " + statLoader("bags")
        + "<br />Total Gifts: " + statLoader("gifts")
        + "<br />Total Cakes: " + statLoader("cakes")
        + "<br />Total Qian: " + statLoader("qian")
        + "<br />Total Eggs: " + statLoader("eggs")
        + "<br />"

        + "<br />Other:"
        + "<br />Total Tiers: " + fn(getTotalTiers())
        + "<br />Total SSS wins: " + statLoader("tttw") + " (Points: " + statLoader("tttpw") + ")"
        + "<br />Total SSS losses: " + statLoader("tttl") + " (Points: " + statLoader("tttpl") + ")"


        + "</div><div style='float: right; width: 50%;' class='square2'>"

        // RIGHT SIDE
        + "Chances:"
        + "<br />Click Cooldown: " + getCooldown().toFixed(2) + "s" + (getCooldown() == 0.2 ? " [MAX]" : "")
        + "<br />Critical Hit Chance: " + (shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) + "%"
        + "<br />Sandwich Chance: " + (shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)).toFixed(2) + "%"
        + "<br />Gem Chance: " + fn(getGemChance()) + "%" + (getGemChance() == 10 + frustration ? " [MAX]" : "") + " (+" + getArtifactBoost("gems").toFixed(1) + ")"
        + "<br />Luck: " + Math.floor(luck)
        + (isEvent("christmas") ? "<br />Gift Chance: 1/" + Math.ceil(250 / getCooldown()) : "")
        + "<br />"

        + "<br />" + (unlockedArtifacts() ? "Artifact Chances:"
            + "<br />Common " + (1 / 8 * getArtifactBoost("artifactchance")).toFixed(3) + "% (1/" + Math.ceil(800 / getArtifactBoost("artifactchance")) + ")" + (allArtifactsOfRarity(1) ? " ALL" : "")
            + "<br />Rare " + (1 / 40 * getArtifactBoost("artifactchance")).toFixed(3) + "% (1/" + Math.ceil(4000 / getArtifactBoost("artifactchance")) + ")" + (allArtifactsOfRarity(2) ? " ALL" : "")
            + "<br />Epic " + (1 / 320 * getArtifactBoost("artifactchance")).toFixed(3) + "% (1/" + Math.ceil(32000 / getArtifactBoost("artifactchance")) + ")" + (allArtifactsOfRarity(3) ? " ALL" : "")
            + "<br />Legendary " + (1 / 10000 * getArtifactBoost("artifactchance")).toFixed(3) + "% (1/" + Math.ceil(1000000 / getArtifactBoost("artifactchance")) + ")" + (allArtifactsOfRarity(4) ? " ALL" : "")
            : "Artifacts locked!")

        + (getArtifactBoost("shgabb") > 1 ? ("<br />x" + fn(getArtifactBoost("shgabb")) + " Shgabb") : "")
        + (getArtifactBoost("clickshgabb") > 1 ? ("<br />x" + fn(getArtifactBoost("clickshgabb")) + " Click Shgabb") : "")
        + (getArtifactBoost("autoshgabb") > 1 ? ("<br />x" + fn(getArtifactBoost("autoshgabb")) + " Auto Shgabb") : "")
        + (getArtifactBoost("resetshgabb") > 1 ? ("<br />x" + fn(getArtifactBoost("resetshgabb")) + " Reset Shgabb") : "")
        + (getArtifactBoost("sw") > 1 ? ("<br />x" + fn(getArtifactBoost("sw")) + " Sandwiches") : "")
        + (getArtifactBoost("gs") > 1 ? ("<br />x" + fn(getArtifactBoost("gs")) + " Golden Shgabb") : "")
        + (getArtifactBoost("prestigegs") > 1 ? ("<br />x" + fn(getArtifactBoost("prestigegs")) + " Prestige GS") : "")
        + (getArtifactBoost("si") > 1 ? ("<br />x" + fn(getArtifactBoost("si")) + " Silicone Shgabb") : "")
        + (getArtifactBoost("clicksi") > 1 ? ("<br />x" + fn(getArtifactBoost("clicksi")) + " Click Silicone") : "")
        + (getArtifactBoost("clickspeed") > 1 ? ("<br />x" + fn(getArtifactBoost("clickspeed")) + " click cooldown") : "")
        + (getArtifactBoost("gemchance") > 1 ? ("<br />x" + fn(getArtifactBoost("gemchance")) + " Gem chance") : "")
        + (getArtifactBoost("gems") > 1 ? ("<br />x" + fn(getArtifactBoost("gems")) + " Gem amount") : "")
        + (getArtifactBoost("artifactchance") > 1 ? ("<br />x" + fn(getArtifactBoost("artifactchance")) + " Artifact chance") : "")
        + "<br />"

        + "<br />Progress:"
        + "<br />Artifacts: " + getArtifactAmount() + "/" + artifacts.length
        + "<br />Achievements: " + game.ach.length + "/" + achievements.length
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
        ui.clickButton.style["background-color"] = "#01f8fd";
        ui.clickButton.style.backgroundSize = 100 * (game.clickCooldown / clickCooldown) + "% 100%";
    }
    else {
        let diceRender = (getArtifactByID(307).isEquipped() ? ("<img src='images/arti/dice-" + diceAmount + ".png' width='32px'>") : "");
        let gooRender = (getArtifactByID(314).isEquipped() && hoodGoo > 0 ? ("<img src='images/arti/hoodgoo.png' width='32px'>") : "");
        ui.clickButton.innerHTML = diceRender + gooRender + "+" + (hoodGoo != 0 ? fn(hoodGoo) : fn(getProduction().mul(currentBoost == "strongerClicks" ? 3 : 1))) + " Shgabb" + diceRender;
        ui.clickButton.style["background-color"] = "#2e269a";
        ui.clickButton.style.backgroundSize = "0% 100%";
    }
    //ui.cooldownBar.value = game.clickCooldown;
    //ui.cooldownBar.max = getCooldown();

    // Sandwiches
    if (selection("sandwich")) {
        ui.sandwichBar.value = sandwichFreezeTime;
        ui.sandwichBar.max = getFreezeTime();

        ui.autoInfo.innerHTML = "<span class='square2'>Fridge Time: " + getFreezeTime().toFixed(0)
            + "<br />Normal Auto Prod.: " + fn(getAutoProduction(false, "auto"))
            + "<br />Cheese Prod.: " + fn(getAutoProduction(false, "cheese"))
            + "<br />Total Prod.: " + fn(getAutoProduction()) + "</span>";
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
    if (game.shgabb >= 1000000 && game.stats_prestige.playTime >= 15) {
        let challengeText = "";
        if (!isChallenge(0)) {
            challengeText = "<br />Challenge Goal: " + game.upgradeLevels.moreShgabb + "/" + getChallenge(game.aclg).getGoal();
        }

        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "Prestige!<br />Lose your Shgabb and Sandwiches, as well as their upgrades, but keep stats and get Golden Shgabb!<br />Prestige to get: " + fn(getGoldenShgabb()) + " GS!" + challengeText;
    }
    else {
        ui.prestigeButton.style.display = "none";
    }

    // Ameliorer
    if (unlockedAmeliorer()) {
        if (game.stats_prestige.playTime >= 600) ui.ameReset.style.display = "unset";
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
        if (n == currentNotifications.length - 1) ui.notifications.innerHTML = ui.notifications.innerHTML + "<b>" + currentNotifications[n] + "</b><br />";
        else ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n] + "<br />";
        n2 -= 1;
    }
    while (n2 > 0) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + "<br />";
        n2 -= 1;
    }

    let topNotifsRender = "";
    for (i = 1; i < settings.topNotifs + 1; i++) {
        if (currentNotifications[(Object.keys(currentNotifications).length - i)] != undefined && currentNotifications[Object.keys(currentNotifications).length - i].substr(0, 10) != "Game saved") {
            topNotifsRender = topNotifsRender + currentNotifications[Object.keys(currentNotifications).length - i] + (i != settings.topNotifs ? "<br />" : "");
        }
    }
    ui.newestNotification.innerHTML = topNotifsRender;
}

var newArtifactDisplayTimer = 0;

// Core
function autoSave() {
    autoNotifications += 1;

    // Kill knife if yo slow
    if (game.clickCooldown < -0.33 || lunarAntiCooldown > 0) knifeBoost = 0;

    // Le rare renderes
    renderAmeConvert();
    renderAllSelection();
    renderPFPs();
    renderBanners();

    // Every 50 saves, check for shgic
    if (autoNotifications % 50 == 0) {
        checkCanPlayTTT();
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
    if (game.cheated == true) { alert("You can't export a cheated save!"); createNotification("Couldn't export: Cheated"); return false; }
    let exportGame = Object.assign({}, game);

    exportGame.shgabb = numberSaver(exportGame.shgabb);
    exportGame.sw = numberSaver(exportGame.sw);
    exportGame.gs = numberSaver(exportGame.gs);
    exportGame.si = numberSaver(exportGame.si);

    let statTypes = ["stats", "stats_prestige", "stats_today"];
    for (let statHandler in statTypes) {
        exportGame[statTypes[statHandler]].shgabb = numberSaver(exportGame[statTypes[statHandler]].shgabb);
        exportGame[statTypes[statHandler]].sw = numberSaver(exportGame[statTypes[statHandler]].sw);
        exportGame[statTypes[statHandler]].gs = numberSaver(exportGame[statTypes[statHandler]].gs);
        exportGame[statTypes[statHandler]].si = numberSaver(exportGame[statTypes[statHandler]].si);
    }

    exportGame = JSON.stringify(exportGame);

    exportGame = btoa(exportGame); exportGame = exportGame.replace(rep7, "shgabb");
    exportGame = exportGame.replace("x", "pppp");
    exportGame = exportGame.replace("D", "dpjiopjrdopjh");
    navigator.clipboard.writeText(exportGame);
    createNotification("Game exported to clipboard!");
}

function importGame() {
    let importGame = prompt("Code?"); if (importGame == "resetmytic" && BETA.isBeta) { pointsPlayer = 0; pointsHer = 0; game.tttd = 1; canPlayTTT = true; } trashCanBoost = 0; knifeBoost = 0; resetMinigameField(); if (importGame.substr(0, 6) == "faCoDe") { importGame = importGame.substr(10); } else { importGame = importGame.replace("shgabb", rep7); importGame = importGame.replace("dpjiopjrdopjh", "D"); importGame = importGame.replace("pppp", "x"); } importGame = atob(importGame); importGame = JSON.parse(importGame);

    // Empty the game first. Make it completely empty
    emptyGame.a = [];
    game = {};
    // Now import. it's done this way to support old saves
    game = Object.assign({}, emptyGame, importGame);

    // Take care of arrays
    game.upgradeLevels = Object.assign({}, emptyGame.upgradeLevels, importGame.upgradeLevels);
    game.stats = Object.assign({}, emptyGame.stats, importGame.stats);
    game.stats_prestige = Object.assign({}, emptyGame.stats, importGame.stats_prestige);
    game.stats_today = Object.assign({}, emptyGame.stats, importGame.stats_today);
    game.ameUp = Object.assign({}, emptyGame.ameUp, importGame.ameUp);
    game.profile = Object.assign({}, emptyGame.profile, importGame.profile);

    // on the television
    game.shgabb = numberLoader(game.shgabb);
    game.sw = numberLoader(game.sw);
    game.gs = numberLoader(game.gs);
    game.si = numberLoader(game.si);

    let statTypes = ["stats", "stats_prestige", "stats_today"];
    for (let statHandler in statTypes) {
        game[statTypes[statHandler]].shgabb = numberLoader(game[statTypes[statHandler]].shgabb);
        game[statTypes[statHandler]].sw = numberLoader(game[statTypes[statHandler]].sw);
        game[statTypes[statHandler]].gs = numberLoader(game[statTypes[statHandler]].gs);
        game[statTypes[statHandler]].si = numberLoader(game[statTypes[statHandler]].si);
    }

    // Some adjustments
    checkCanPlayTTT();
    pointsPlayer = 0;
    pointsHer = 0;

    if (sandwichUpgrades.autoShgabb.currentPrice() > game.stats.sw * 10) {
        // Auto Shgabb was reworked
        game.sw = game.sw.add(Math.pow(game.upgradeLevels.autoShgabb, 2) / 2);
        game.upgradeLevels.autoShgabb = 0;
    }

    // Execute some stuff
    handleArtifactsFirstTime();
    updateUI();
    updateUpgrades();
    updateArtifacts();
    updateBG();
    renderGemOffers();

    createNotification("Game imported successfully!");
}

function deleteGame() {
    if (confirm("Do you REALLY want to do this? EVERYTHING will be gone, you gain NOTHING")) {
        if (confirm("Make sure to save your progress before doing this!!! Everything will be lost!")) {
            if (confirm("If you press Yes again, everything will be gone!")) {
                game = emptyGame;
                createNotification("Game deleted successfully!");
                autoSave();
                updateUI();
            }
        }
    }
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
    statIncrease("playTime", time);
    eggTime -= time;

    // Egg Hunt
    if (isEvent("egg")) {
        if (eggTime <= 0) {
            eggTime = 10;
            refreshEgg();
        }
    }

    if (adLoaded && game.stats.sw > 9) adTime -= time;

    if (newArtifactDisplayTimer <= 0 && newArtifactDisplayTimer > -15) {
        ui.newArtifact.style.display = "none";
    }
    if (autoSaveTime <= 0) {
        autoSaveTime = 10;
        autoSave();
    }
    if (quoteTime <= 0) {
        quoteTime = 10;
        updateQuote();
    }
    if (sandwichTime <= 0) {
        if (isChallenge(4)) {
            for (u in shgabbUpgrades) {
                game.upgradeLevels[shgabbUpgrades[u].ID] = Math.max(0, game.upgradeLevels[shgabbUpgrades[u].ID] - (getChallenge(4).getTier() + 1));
            }
            game.upgradeLevels.moreShgabb = Math.max(0, game.upgradeLevels.moreShgabb - (4 * (getChallenge(4).getTier() + 1)));
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
    game.stats_prestige = Object.assign({}, cache.stats_prestige, JSON.parse(localStorage.getItem("shgabbClicker")).stats_prestige);
    game.stats_today = Object.assign({}, cache.stats_prestige, JSON.parse(localStorage.getItem("shgabbClicker")).stats_today);
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

    // on the television
    game.shgabb = numberLoader(game.shgabb);
    game.sw = numberLoader(game.sw);
    game.gs = numberLoader(game.gs);
    game.si = numberLoader(game.si);

    let statTypes = ["stats", "stats_prestige", "stats_today"];
    for (let statHandler in statTypes) {
        game[statTypes[statHandler]].shgabb = numberLoader(game[statTypes[statHandler]].shgabb);
        game[statTypes[statHandler]].sw = numberLoader(game[statTypes[statHandler]].sw);
        game[statTypes[statHandler]].gs = numberLoader(game[statTypes[statHandler]].gs);
        game[statTypes[statHandler]].si = numberLoader(game[statTypes[statHandler]].si);
    }

    // ergh
    if (game.stats.shgabb == "-Infinity") game.stats.shgabb = 0;
    if (game.stats_prestige.shgabb == "-Infinity") game.stats_prestige.shgabb = 0;
    if (game.stats_prestige.hms == 0) game.stats_prestige.hms = game.stats.hms;
    if (game.stats.gems != undefined) {
        game.stats.tgems += game.stats.gems;
        delete game.stats.gems;
    }
    checkCanPlayTTT();
    handleArtifactsFirstTime();

    if (sandwichUpgrades.autoShgabb.currentPrice() > game.stats.sw * 10) {
        // Auto Shgabb was reworked
        game.sw = game.sw.add(Math.pow(game.upgradeLevels.autoShgabb, 2) / 2);
        game.upgradeLevels.autoShgabb = 0;
    }

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
        statIncrease("ads", 1);
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
    else if (isEvent("lunar") && settings.eventBG) document.getElementsByTagName('body')[0].style.backgroundImage = "url(images/shgabb-background-chinese.png)";
    else if (isEvent("egg") && settings.eventBG) document.getElementsByTagName('body')[0].style.backgroundImage = "url(images/shgabb-background-easter.png)";
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
renderBanners();
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
