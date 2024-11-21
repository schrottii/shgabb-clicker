// Game made by Schrottii - editing or stealing is prohibited!

// Main JS File

// Various variables

//var doubleClick = 0;

// some timers
var autoSaveTime = 10;
var quoteTime = 0;
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
    adBar: document.getElementById("adBar"),

    sandwichBar: document.getElementById("sandwichBar"),
    autoBar: document.getElementById("autoBar"),
    prestigeBar: document.getElementById("prestigeBar"),

    sandwichBarText: document.getElementById("sandwichBarText"),
    autoBarText: document.getElementById("autoBarText"),
    prestigeBarText: document.getElementById("prestigeBarText"),

    // Cheats
    cheatCurrency: document.getElementById("cheatCurrency"),
    cheatAmount: document.getElementById("cheatAmount"),
    cheatDisplay: document.getElementById("cheatDisplay"),

    // Amount displays
    shgabbAmount: document.getElementById("shgabbAmount"),
    swAmount: document.getElementById("swAmount"),
    gsAmount: document.getElementById("gsAmount"),
    siAmount: document.getElementById("siAmount"),
    gemAmount: document.getElementById("gemAmount"),
    ameAmount: document.getElementById("ameAmount"),
    artifactScrapAmount: document.getElementById("artifactScrapAmount"),
    bagAmount: document.getElementById("bagAmount"),
    copAmount: document.getElementById("copAmount"),
    pearlAmount: document.getElementById("pearlAmount"),

    topSquareDisplay: document.getElementById("topSquareDisplay"),

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
    copupgradesrender: document.getElementById("copupgradesrender"),
    pearlupgradesrender: document.getElementById("pearlupgradesrender"),

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
    adContent: document.getElementById("adContent"),
    adButton: document.getElementById("adButton"),
    adStartButton: document.getElementById("adStartButton"),
    ameReset: document.getElementById("amereset"),
    ameReset2: document.getElementById("amereset2"),
    pearlreset: document.getElementById("pearlreset"),
    pearlreset2: document.getElementById("pearlreset2"),
    artifacts: document.getElementById("artifacts"),
    artifactamount: document.getElementById("artifactamount"),
    artifactSearch: document.getElementById("artifactSearch"),
    ameconvert: document.getElementById("ameconvert"),
    achievementsamount: document.getElementById("achievementsamount"),
    stats: document.getElementById("stats"),
    achievements: document.getElementById("achievements"),
    playerprofile: document.getElementById("playerProfileRender"),
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
    patchNotesSizeSlider: document.getElementById("patchNotesSizeSlider"),
    shbookSizeSlider: document.getElementById("shbookSizeSlider"),
    pearlSection: document.getElementById("pearlSection"),
    shbookLore: document.getElementById("shbookLore"),
    shbookLore2: document.getElementById("shbookLore2"),
    shbookCurrenciary: document.getElementById("shbookCurrenciary"),
    shbookCurrenciary2: document.getElementById("shbookCurrenciary2"),
    shbookFeaturiary: document.getElementById("shbookFeaturiary"),
    shbookFeaturiary2: document.getElementById("shbookFeaturiary2"),
    shbook: document.getElementById("shbook"),
    shbookHeader: document.getElementById("shbookHeader"),
    gemStorageContainer: document.getElementById("gemStorageContainer"),
    gemStorageDisplay: document.getElementById("gemStorageDisplay"),
    gemStorageAmount: document.getElementById("gemStorageAmount"),
}

// Quotes
const quotes = [
    "(I am always nice but whatever) - Schrottii",
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

    // 2.5 (5) & 2.5.3 (5)
    "I will lick whatever the next message says - Aloee",
    "Updates are not allowed also - Rofl",
    "im currently spacebarrinh - Barduzzi",
    "pray. - slowmerger",
    "you little sheeps, why aren't you consuming? - elmenda452",
    "obama d tier, tech and dagame f tier - elmenda452",
    "pin me to the wall - shgabb",
    "oh no, im not THAT allergic to progress - Kuitti",
    "edison intensifies - elmenda452",
    "why do i want to know how much qian, eggs and cakes i got today am i a time traveller - elmenda452",

    // 2.6 (2) & 2.7.1 (5)
    "happily :) - elmenda452",
    "grats on the cheese - Phazer",
    "More like Miner's Pray. - Slowmerger - DaGame",
    "i appreciate the troll art but in smaller quantities - Phazer",
    "this is kinda why farming spiders sucks, they dont really cooperate. - Phazer",
    "smash your record on new laptop maybe? - Barduzzi",
    "now make an x with x's - Tpot",
];

// Notations
const upgradeColors = ["normal", "old", "custom"]
const notations = ["normal", "scientific", "engineering", "alphabet"];
const normalNotation = ["M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "UD", "DD", "TD", "qD", "QD", "sD", "SD", "OD", "ND", "V", "sV", "Tr", "UTR", "QU", "TQU", "qu", "Se", "Sp", "Oc", "No", "Améliorer", "What?!?!", "What?!?!2", "You Broke The Game", "I am crying", "no!!!", "WhyDoesFranceStillExist", "GodIsWatchingYou"];
const alphabetNotation = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ")

let pre =
{
    start: ["", "K", "M", "B"],
    ones: ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
    tens: ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Og", "Ng"],
    hundreds: ["", "Ct", "DCt", "TCt", "QaCt", "QiCt", "SxCt", "SpCt", "OcCt", "NCt"],
    thousands: ["", "M", "DM", "TM", "qM", "QM", "sM", "SM", "OM", "NM"]
};

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

ui.cheatAmount.onfocus = () => {
    hotkeysEnabled = false;
}

ui.cheatAmount.onblur = () => {
    hotkeysEnabled = true;
}

ui.artifactSearch.onfocus = () => {
    hotkeysEnabled = false;
}

ui.artifactSearch.onblur = () => {
    hotkeysEnabled = true;
}

ui.artifactSearch.oninput = () => {
    updateArtifacts();
}

function statIncrease(name, number) {
    if (game.stats[name].mantissa != undefined) {
        if (isNaN(game.stats_prestige[name])) game.stats_prestige[name] = new Decimal(0);
        if (isNaN(game.stats_today[name])) game.stats_today[name] = new Decimal(0);

        game.stats[name] = game.stats[name].add(number);
        game.stats_prestige[name] = game.stats_prestige[name].add(number);
        game.stats_today[name] = game.stats_today[name].add(number);
    }
    else {
        if (isNaN(game.stats_prestige[name])) game.stats_prestige[name] = 0;
        if (isNaN(game.stats_today[name])) game.stats_today[name] = 0;

        game.stats[name] += number;
        game.stats_prestige[name] += number;
        game.stats_today[name] += number;
    }
}

// ALL THE NUMBER SHIT YEE COWBOYS

var statCurr = ["shgabb", "sw", "gs", "si", "cop", "fishvalue"];
var statTypes = ["stats", "stats_prestige", "stats_today"];

function numberSaver(number) {
    if (number == undefined) number = 0;
    // turn a break infinity object (mantissa - exponent) into a simple string, for saving
    // mantissa: 1.2, exponent: 10 -> 1.2e10
    if (number.mantissa == undefined) {
        if (number.toString().split("e+")[1] != undefined) {
            number = new Decimal(number.toString().split("e+")[0] + "e" + Math.floor(number.toString().split("e+")[1]));
        }
        else {
            number = new Decimal(number);
        }
    }
    return "" + number.mantissa + "e" + number.exponent;
}

function numberLoader(number) {
    // same thing but load the saved string
    // 1.2e10 -> mantissa: 1.2, exponent: 10
    return new Decimal("" + number);
}

function fn(number) {
    if (number == undefined) return "?";

    // return basic number if it is 0 - 999 999
    if (number < 1000000) return (number < 100) ? ((number * 1).toFixed(2).substr((number * 1).toFixed(2).length - 2, 2) == "00" ? (number * 1).toFixed(2).split(".")[0] : (number * 1).toFixed(2)) : (number * 1).toFixed(0);

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
            //notationSymbol = normalNotation[Math.floor(number.exponent / 3) - 2];

            let m = (number.mantissa * Math.pow(10, number.exponent % 3)).toFixed(2);

            if (number.lt(1e12)) {
                return m + " " + pre.start[Math.floor(number.exponent / 3)];
            }
            if (number.gt(1e303)) {
                return m + " ???";
            }

            let newE = number.exponent - 3;
            let thousand = Math.floor(newE / 3000) < 10 ? pre.thousands[Math.floor(newE / 3000)] : "[" + formatNumber(Math.floor(newE / 3000)) + "]M";
            return m + " " + thousand +
                pre.hundreds[Math.floor(newE / 300) % pre.hundreds.length] +
                pre.ones[Math.floor(newE / 3) % pre.ones.length] +
                pre.tens[Math.floor(newE / 30) % pre.tens.length];
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

    let numberDisplay = (number.mantissa * (Math.pow(10, number.exponent % 3))).toString().substr(0, 4);
    if (numberDisplay.substr(2, 4) == "00") numberDisplay = numberDisplay.substr(0, 2);
    if (numberDisplay.substr(-1) == ".") numberDisplay = numberDisplay.split(".")[0];

    return numberDisplay + notationSymbol;

}

// currency image
function cImg(imgname) {
    return '<img class="currency" src="images/currencies/' + imgname + '.png" />';
}

function clickButton() {
    // Click button handler (the button that gives you shgabb)
    if (game.clickCooldown <= 0) {
        let clickButtonMulti = 1;

        if (getArtifact(402).isEquipped()) {
            if (techCollection < getArtifact(402).getLevel() * 10) {
                techCollection += 1;

                statIncrease("clicks", 1);
                game.clickCooldown = getCooldown();
            }
            else {
                clickButtonMulti = techCollection;
                techCollection = 0;
            }
        }

        if (techCollection == 0) {
            let critMulti = criticalHit();
            let amount = calcShgabbClick().mul(critMulti).mul(clickButtonMulti).floor();

            artifactEvent("onClickBefore", { "multi": clickButtonMulti });

            if (isEvent("summer")) {
                if (heatMode) {
                    if (game.clickCooldown > -0.33) summerClicks += clickButtonMulti;
                    else if (summerClicks > 0) {
                        heatMode = false;
                        summerClicks = 0;
                    }
                    renderCurrentEvent();
                }

                if (Math.random() * 100 < 0.1 * (summerClicks >= 200 ? 100 : 1)) {
                    game.shorts += 1;
                    statIncrease("shorts", 1);
                }
            }

            game.shgabb = game.shgabb.add(amount);
            statIncrease("shgabb", amount);

            game.clickCooldown = getCooldown();
            statIncrease("clicks", 1);

            artifactEvent("onClick", { "multi": clickButtonMulti });
            if (getArtifact(314).isEquipped() && hoodGoo > amount) amount = hoodGoo;

            // EVENTS
            if (isEvent("christmas")) {
                if (Math.random() < 1 / (250 / getCooldown())) {
                    game.gifts += clickButtonMulti;
                    statIncrease("gifts", clickButtonMulti);
                    createNotification("+" + clickButtonMulti + " Gift!");
                }
            }

            if (isEvent("anniversary")) game.cakeProgress = Math.min(15000, game.cakeProgress + clickButtonMulti);

            if (lunarAntiCooldown > 0) lunarAntiCooldown -= clickButtonMulti;
            if (luck > 0) luck -= clickButtonMulti; // reduce luck

            if (isEvent("lunar")) {
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
                let amount = getSiliconeProduction(true).mul(3).mul(getArtifactsSimpleBoost("clicksi")).mul(clickButtonMulti);
                game.si = game.si.add(amount);
                statIncrease("si", amount);
                if (getArtifact(312).isEquipped() && Math.random() > 0.9 && currentGems() > 0) game.gems -= 1;
            }

            if (Math.random() * 100 < shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1) * applyLuck(100)) {
                amount = calcSandwiches(critMulti).mul(clickButtonMulti);
                game.sw = game.sw.add(amount);
                statIncrease("sw", amount);
                createNotification("+" + fn(amount) + " Sandwich" + (amount > 1 ? "es" : "") + "!");
            }

            findShgaybb();
            if (unlockedGems()) getGem(clickButtonMulti);
            if (unlockedArtifacts()) getNewArtifact(clickButtonMulti);
            if (unlockedCopper()) getCopper(clickButtonMulti);

            getLorePage(clickButtonMulti);
            if (game.loreSel != 0) getWisp(clickButtonMulti);
        }

        updateArtifacts();
        updateGems();
        updateUpgrades();
        renderCurrentEvent();

    }
    else {
        createNotification("Cooldown: " + game.clickCooldown.toFixed(1));

        if (isEvent("summer") && heatMode) {
            heatMode = false;
            summerClicks = 0;
            game.clickCooldown = 60;
        }
    }

    freezeTime();
}

var clickCooldown = 5;
function getCooldown() {
    // click cooldown
    if (lunarAntiCooldown > 0) return 0;
    let CD = Math.max(0.1, (5 - shgabbUpgrades.shorterCD.currentEffect() - goldenShgabbUpgrades.shortCD.currentEffect())
        / (currentBoost == "fasterShgabb" ? 5 : 1)
        / getArtifactsSimpleBoost("clickspeed")
        / cakeValue(5, 1)
        * (getArtifact(156).isEquipped() ? getArtifact(156).getEffect() : 1)
        * (getArtifact(203).isEquipped() ? 5 : 1)
        * (getArtifact(225).isEquipped() ? 5 : 1)
        / (heatMode ? Math.max(1, Math.min(3, Math.log(summerClicks / 22.5))) : 1))
    if (isChallenge(3)) CD = 20;
    if (shgaybbMode) CD = Math.max(2, CD);
    clickCooldown = CD; // Why T_T
    return CD;
}

function getAmeCame() {
    if (ameliorerUpgrades != undefined) return ameliorerUpgrades.AMECAME.currentEffect();
    return 0;
}

function criticalHit() {
    // Critical hit handler, returns multi (default 3)
    if (Math.random() * 100 < shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1) * applyLuck(100)) {
        createNotification("Critical Hit!");
        return shgabbUpgrades.critBoost.currentEffect() * (currentBoost == "moreCrits" ? 3 : 1);
    }
    return 1;
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

// Notifications
function createNotification(text) {
    currentNotifications.push(text);
    if (currentNotifications.length > 20) currentNotifications.shift();
}

// Update functions
function updateQuote() {
    ui.quote.innerHTML = " >  " + quotes[Math.ceil(Math.random() * quotes.length - 1)] + "  < ";
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
    if (settings.topSquare != 1) {
        let render = "";

        let currencyNames = ["öö", "öö", "öö", "öö", "öö", "öö", "öö", "öö", "öö"];
        if (settings.topSquare == 2) currencyNames = [" Shgabb", " Sandwiches", " Golden Shgabb", " Silicone Shgabb", " Gems", " Améliorer", " Artifact Scrap", " Bags", " Copper"];

        render = render + " " + ui.shgabbAmount.innerHTML.split(currencyNames[0]).shift();

        if (unlockedSandwiches()) render = render + " " + ui.swAmount.innerHTML.split(currencyNames[1]).shift();

        if (unlockedGS()) render = render + " " + ui.gsAmount.innerHTML.split(currencyNames[2]).shift();

        if (unlockedSilicone()) render = render + " " + ui.siAmount.innerHTML.split(currencyNames[3]).shift();

        if (settings.topSquare == 0) render = render + "<br />";

        if (unlockedGems()) render = render + " " + ui.gemAmount.innerHTML.split(currencyNames[4]).shift();

        if (unlockedAmeliorer()) render = render + " " + ui.ameAmount.innerHTML.split(currencyNames[5]).shift();

        if (unlockedArtifactUpgrading()) render = render + " " + ui.artifactScrapAmount.innerHTML.split(currencyNames[6]).shift();

        if (unlockedBags()) render = render + " " + ui.bagAmount.innerHTML.split(currencyNames[7]).shift();

        if (unlockedCopper()) render = render + " " + ui.copAmount.innerHTML.split(currencyNames[8]).shift();

        ui.topSquareDisplay.innerHTML = render;
    }
}

function updateCurrencies() {
    if (unlockedSandwiches()) ui.shgabbAmount.innerHTML = cImg("shgabb") + fn(game.shgabb) + " Shgabb (" + fn(calcShgabbAuto()) + "/s)";
    else ui.shgabbAmount.innerHTML = cImg("shgabb") + fn(game.shgabb) + " Shgabb";

    if (unlockedSandwiches()) ui.swAmount.innerHTML = cImg("sandwich") + fn(game.sw) + " Sandwiches";
    else ui.swAmount.innerHTML = "";

    if (unlockedGS()) ui.gsAmount.innerHTML = cImg("gs") + fn(game.gs) + " Golden Shgabb";
    else ui.gsAmount.innerHTML = "";

    if (unlockedSilicone()) ui.siAmount.innerHTML = cImg("silicone") + fn(game.si) + " Silicone Shgabb (" + fn(getSiliconeProduction()) + "/s)";
    else ui.siAmount.innerHTML = "";

    if (unlockedGems()) ui.gemAmount.innerHTML = cImg("gem") + fn(game.gems) + " Gems";
    else ui.gemAmount.innerHTML = "";

    if (unlockedAmeliorer()) ui.ameAmount.innerHTML = cImg("ameliorer") + game.ame + " Améliorer";
    else ui.ameAmount.innerHTML = "";

    if (unlockedArtifactUpgrading()) ui.artifactScrapAmount.innerHTML = cImg("artifactscrap") + game.artifactScrap + " Artifact Scrap";
    else ui.artifactScrapAmount.innerHTML = "";

    if (unlockedBags()) ui.bagAmount.innerHTML = cImg("bag") + fn(game.bags) + " Bags";
    else ui.bagAmount.innerHTML = "";

    if (unlockedCopper()) ui.copAmount.innerHTML = cImg("copper") + fn(game.cop) + " Copper";
    else ui.copAmount.innerHTML = "";

    if (unlockedFishing() && ui.pearlSection.style.display != "none") ui.pearlAmount.innerHTML = cImg("pearl") + fn(game.pearls) + " Pearls";
    else ui.pearlAmount.innerHTML = "";
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
    document.getElementById("statsTime1").style.backgroundColor = "white";
    document.getElementById("statsTime2").style.backgroundColor = "white";
    document.getElementById("statsTime3").style.backgroundColor = "white";
    document.getElementById("statsTime" + no).style.backgroundColor = "yellow";

    statDisplay = no;
    updateStats();
}


var higherStatsSize = 200;
function updateStats() {
    // LEFT SIDE
    ui.stats.innerHTML = "<div style='float: left; width: 50%; min-height: " + higherStatsSize + "px' class='square2' id='statsDisplayLeft'>"
        + "<b>Progress:</b>"
        + "<br />Highest More Shgabb: " + statLoader("hms")
        + "<br />Total Clicks: " + statLoader("clicks")
        + "<br />Total Time: " + (game.stats.playTime > 18000 ? (statLoader("playTime", false) / 3600).toFixed(1) + " hours" : statLoader("playTime"))
        + "<br />Total Prestiges: " + statLoader("pr")
        + "<br />Total Ads watched: " + statLoader("ads")
        + (statDisplay == 1 ? "<br />(SC: " + game.stats.wads.sc + "/SA: " + game.stats.wads.sa + "/MSW: " + game.stats.wads.msw + "/FS: " + game.stats.wads.fs + "/MC: " + game.stats.wads.mc + "/MSI: " + game.stats.wads.msi + "/MG: " + game.stats.wads.mg + ")" : "")
        + "<br />"

        + "<br /><b>Currencies:</b>"
        + "<br />Total Shgabb: " + statLoader("shgabb")
        + "<br />Total Sandwiches: " + statLoader("sw")
        + "<br />Total Golden Shgabb: " + statLoader("gs")
        + "<br />Total Gems: " + statLoader("tgems")
        + "<br />Total Silicone Shgabb: " + statLoader("si")
        + "<br />Total Artifact Scrap: " + statLoader("artifactScrap")
        + "<br />Total Améliorer: " + statLoader("ame")
        + "<br />Total Bags: " + statLoader("bags")
        + "<br />Total Copper Shgabb: " + statLoader("cop")
        + "<br />Total Copper Clicks: " + statLoader("copClicks")
        + "<br />Total Chengas: " + statLoader("chenga")
        + "<br />"

        + "<br /><b>Fishgang:</b>"
        + "<br />Total Trash: " + statLoader("trash")
        + "<br />Total Fish: " + statLoader("fish")
        + "<br />Total Fish Weight: " + statLoader("fishweight") + " (Best: " + game.bfishweight + ")"
        + "<br />Total Fish Value: " + statLoader("fishvalue") + " (Best: " + game.bfishvalue + ")"
        + "<br />"

        + "<br /><b>Events:</b>"
        + "<br />Total Gifts: " + statLoader("gifts")
        + "<br />Total Cakes: " + statLoader("cakes")
        + "<br />Total Qian: " + statLoader("qian")
        + "<br />Total Eggs: " + statLoader("eggs")
        + "<br />Total Shorts: " + statLoader("shorts")
        + "<br />Total Witch Shgabb: " + statLoader("witchshgabb")
        + "<br />Total Event currencies: " + (new Decimal(statLoader("gifts")).add(statLoader("cakes")).add(statLoader("qian")).add(statLoader("eggs")).add(statLoader("shorts")).add(statLoader("witchshgabb")))
        + "<br />"

        + "<br /><b>Shgic Shgac Shgoe:</b>"
        + "<br />Total SSS wins: " + statLoader("tttw") + " (Points: " + statLoader("tttpw") + ")"
        + "<br />Total SSS losses: " + statLoader("tttl") + " (Points: " + statLoader("tttpl") + ")"


        + "</div><div style='float: right; width: 50%; min-height: " + higherStatsSize + "px' class='square2' id='statsDisplayRight'>"

        // RIGHT SIDE
        + "Chances:"
        + "<br />Click Cooldown: " + getCooldown().toFixed(2) + "s" + (getCooldown() == 0.1 ? " [MAX]" : "")
        + "<br />Critical Hit Chance: " + (shgabbUpgrades.critChance.currentEffect() * (currentBoost == "moreCrits" ? 5 : 1)) + "%"
        + "<br />Sandwich Chance: " + (shgabbUpgrades.swChance.currentEffect() * (currentBoost == "moreSandwiches" ? 4 : 1)).toFixed(2) + "%"
        + "<br />Gem Chance: " + fn(getGemChance()) + "%" + (getGemChance() == 10 + getArtifact(308).getValue(0) ? " [MAX]" : "") + " (+" + getArtifactsSimpleBoost("gems").toFixed(2) + ")"
        + "<br />Copper Chance: " + getCopperChance().toFixed(1) + "%"
        + "<br />Luck: " + Math.floor(luck)
        + (isEvent("christmas") ? "<br />Gift Chance: 1/" + Math.ceil(250 / getCooldown()) : "")
        + "<br />"

        + "<br />Progress:"
        + "<br />Achievements: " + game.ach.length + "/" + achievements.length
        + "<br />Améliorer Levels: " + getTotalAme()
        + "<br />Total Tiers: " + fn(getTotalTiers())
        + "<br />"

        + "<br />Artifacts: " + getArtifactAmount() + "/" + totalAmountOfArtifacts()
        + "<br />- Common: " + getArtifactAmount(1) + "/" + totalAmountOfArtifacts(1)
        + "<br />- Rare: " + getArtifactAmount(2) + "/" + totalAmountOfArtifacts(2)
        + "<br />- Epic: " + getArtifactAmount(3) + "/" + totalAmountOfArtifacts(3)
        + "<br />- Legendary: " + getArtifactAmount(4) + "/" + totalAmountOfArtifacts(4)
        + "<br />"

        + "<br />" + (unlockedArtifacts() ? "Artifact Chances:"
            + "<br />Common " + (1 / 8 * getArtifactGainBoost()).toFixed(3) + "% (1/" + Math.ceil(800 / getArtifactGainBoost()) + ")" + (allArtifactsOfRarity(1) ? " [ALL]" : "")
            + "<br />Rare " + (1 / 40 * getArtifactGainBoost()).toFixed(3) + "% (1/" + Math.ceil(4000 / getArtifactGainBoost()) + ")" + (allArtifactsOfRarity(2) ? " [ALL]" : "")
            + "<br />Epic " + (1 / 320 * getArtifactGainBoost()).toFixed(3) + "% (1/" + Math.ceil(32000 / getArtifactGainBoost()) + ")" + (allArtifactsOfRarity(3) ? " [ALL]" : "")
            + "<br />Legendary " + (1 / 10000 * getArtifactGainBoost()).toFixed(3) + "% (1/" + Math.ceil(1000000 / getArtifactGainBoost()) + ")" + (allArtifactsOfRarity(4) ? " [ALL]" : "")
            : "Artifacts locked!")
        + "<br />Total Artifact gain multi: x" + getArtifactGainBoost()
        + "<br />"

        + "<br />Artifact effects:"
        + (getArtifactsSimpleBoost("clickspeed") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("clickspeed")) + " click cooldown") : "")
        + (getArtifactsSimpleBoost("shgabb") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("shgabb")) + " Shgabb") : "")
        + (getArtifactsSimpleBoost("clickshgabb") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("clickshgabb")) + " Click Shgabb") : "")
        + (getArtifactsSimpleBoost("autoshgabb") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("autoshgabb")) + " Auto Shgabb") : "")
        + (getArtifactsSimpleBoost("resetshgabb") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("resetshgabb")) + " Reset Shgabb") : "")
        + (getArtifactsSimpleBoost("sw") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("sw")) + " Sandwiches") : "")
        + (getArtifactsSimpleBoost("gs") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("gs")) + " Golden Shgabb") : "")
        + (getArtifactsSimpleBoost("prestigegs") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("prestigegs")) + " Prestige GS") : "")
        + (getArtifactsSimpleBoost("clicksi") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("clicksi")) + " Click Silicone") : "")
        + (getArtifactsSimpleBoost("si") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("si")) + " Silicone Shgabb") : "")
        + (getArtifactsSimpleBoost("gemchance") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("gemchance")) + " Gem chance") : "")
        + (getArtifactsSimpleBoost("gems") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("gems")) + " Gem amount") : "")
        + (getArtifactsSimpleBoost("bags") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("bags")) + " Bags") : "")
        + (getArtifactsSimpleBoost("cop") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("cop")) + " Copper") : "")
        + (getArtifactsSimpleBoost("copChance") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("copChance")) + " Copper Chance") : "")
        + (getArtifactsSimpleBoost("artifactchance") > 1 ? ("<br />x" + fn(getArtifactsSimpleBoost("artifactchance")) + " Artifact chance") : "")

        + "</div>";
    
    higherStatsSize = Math.max(document.getElementById("statsDisplayLeft").offsetHeight, document.getElementById("statsDisplayRight").offsetHeight);
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
    if (game.profile.startDay.substr(-1) == "0") game.profile.startDay = game.profile.startDay.substr(0, 7) + "1";

    // Click Button
    if (game.clickCooldown > 0) {
        ui.clickButton.innerHTML = getArtifact(307).isEquipped() ? ("<img src='images/arti/dice-" + Math.ceil((game.clickCooldown % 0.6) * 10) + ".png' width='32px'>") : game.clickCooldown.toFixed(2);
        ui.clickButton.style["background-color"] = "#01f8fd";
        ui.clickButton.style.backgroundSize = 100 * (game.clickCooldown / clickCooldown) + "% 100%";
    }
    else {
        let diceRender = (getArtifact(307).isEquipped() ? ("<img src='images/arti/dice-" + getArtifact(307).getValue(0) + ".png' width='32px'>") : "");
        let gooRender = (getArtifact(314).isEquipped() && hoodGoo > 0 ? ("<img src='images/arti/hoodgoo.png' width='32px'>") : "");
        ui.clickButton.innerHTML = diceRender + gooRender + "+" + (hoodGoo != 0 ? fn(hoodGoo) : fn(calcShgabbClick().mul(currentBoost == "strongerClicks" ? 3 : 1))) + " Shgabb" + diceRender;
        ui.clickButton.style["background-color"] = "#2e269a";
        ui.clickButton.style.backgroundSize = "0% 100%";
    }
    //ui.cooldownBar.value = game.clickCooldown;
    //ui.cooldownBar.max = getCooldown();

    // Sandwiches
    if (selection("sandwich")) {
        ui.autoInfo.innerHTML = "<span class='square2'>Fridge Time: " + getFreezeTime().toFixed(0)
            + "<br />Normal Auto Prod.: " + fn(calcShgabbAuto(false, "auto"))
            + "<br />Cheese Prod.: " + fn(calcShgabbAuto(false, "cheese"))
            + "<br />Total Prod.: " + fn(calcShgabbAuto()) + "</span>";
    }

    ui.sandwichBar.value = sandwichFreezeTime;
    ui.sandwichBar.max = getFreezeTime();
    ui.sandwichBarText.innerHTML = ui.sandwichBar.value.toFixed(1) + "s/" + ui.sandwichBar.max + "s";

    // Ads
    if (unlockedAds() && !settings.noAds) {
        ui.adBar.value = (adTime / adMax) * 100;
    }
    else {
        ui.adContent.style.display = "none";
    }

    // GS
    if (game.shgabb >= 1000000 && game.stats_prestige.playTime >= 15) {
        let challengeText = "";
        if (!isChallenge(0)) {
            challengeText = "<br />Challenge Goal: " + game.upgradeLevels.moreShgabb + "/" + getChallenge(game.aclg).getGoal();
        }

        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "<b>Prestige!</b><br />Lose your Shgabb and Sandwiches, as well as their upgrades, but keep stats and get Golden Shgabb!"
            + "<br />Prestige to get: " + fn(calcGS()) + " GS!"
            + (bagUpgrades.prestigeGems.currentLevel() > 0 ? "<br />" + fn(Math.floor(game.stats_prestige.hms / 1000)) + " Gems!" : "")
            + (unlockedBags() ? "<br />" + fn(game.stats_prestige.bags) + " Bags gained!" : "")
            + challengeText
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
        else topNotifsRender = topNotifsRender + (i != settings.topNotifs ? "-<br />" : "-");
    }
    ui.newestNotification.innerHTML = topNotifsRender;
}

var newArtifactDisplayTimer = 0;

// Core
function autoSave(manual=true) {
    autoNotifications += 1;

    artifactEvent("onAutoSave");

    // Le rare renderes
    renderAmeConvert();
    renderAllSelection();

    // if (!manual) adInject();

    // Every save, check if a new day has risen
    checkNewDay()

    // Auto Save
    exportGame("cache");
    localStorage.setItem("shgabbSettings", JSON.stringify(settings));

    checkForNewAchievements();

    if (!manual) createNotification("Game saved automatically " + autoNotifications);
}

function createBackup() {
    if (confirm("Are you sure you want to CREATE a backup?")) exportGame("backup");
}

function loadBackup() {
    if (confirm("Are you sure you want to LOAD a backup?")) importGame(localStorage.getItem("shgabbBackup"));
}

function importFromFile() {
    if (document.getElementById("myFile").value != "" && confirm("Do you really want to import from this file?")) {
        file = document.getElementById("myFile").files[0];
        reader = new FileReader();
        let filecontent;

        reader.addEventListener('load', function (e) {
            filecontent = e.target.result;
            if (filecontent != undefined) importGame(filecontent);
        });

        reader.readAsText(file);
    }
}

function exportToFile() {
    exportGame("file");
}

function exportGame(destination = "gimme") {
    if (game.cheated == true) {
        alert("You can't export a cheated save!");
        createNotification("Couldn't export: Cheated");
        return false;
    }
    let exporter = {};
    for (exportit in game) {
        exporter[exportit] = game[exportit];
    }

    exporter.shgabb = numberSaver(exporter.shgabb);
    exporter.sw = numberSaver(exporter.sw);
    exporter.gs = numberSaver(exporter.gs);
    exporter.si = numberSaver(exporter.si);
    exporter.fishvalue = numberSaver(exporter.fishvalue);

    for (let statHandler in statTypes) {
        exporter[statTypes[statHandler]] = {};
        for (let allStats in game.stats) {
            exporter[statTypes[statHandler]][allStats] = game[statTypes[statHandler]][allStats];
        }
        for (let currHandler in statCurr) {
            exporter[statTypes[statHandler]][statCurr[currHandler]] = numberSaver(game[statTypes[statHandler]][statCurr[currHandler]]);
        }
    }
    exporter = JSON.stringify(exporter);

    exporter = btoa(exporter);
    exporter = exporter.replace(rep7, "shgabb");
    exporter = exporter.replace("x", "pppp");
    exporter = exporter.replace("D", "dpjiopjrdopjh");

    if (destination == "gimme") {
        navigator.clipboard.writeText(exporter);
        createNotification("Game exported to clipboard!");
    }
    if (destination == "cache") {
        localStorage.setItem("shgabbClicker", exporter);
    }
    if (destination == "backup") {
        localStorage.setItem("shgabbBackup", exporter);
    }
    if (destination == "file") {
        var temporaryFile = document.createElement('a');
        temporaryFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exporter));
        temporaryFile.setAttribute('download', "shgabbSave-" + today() + ".txt");

        temporaryFile.style.display = 'none';
        document.body.appendChild(temporaryFile);

        temporaryFile.click();

        document.body.removeChild(temporaryFile);
    }
}

function importButton() {
    // handle the import button
    // normal imports and rescue codes
    // loading from cache is done elsewhere

    let source = prompt("Code?");

    if (source.substr(0, 6) == "faCoDe") {
        source = source.substr(10);
    }

    importGame(source);
}

function importGame(source) {
    /*
    if (importGame == "resetmytic" && BETA.isBeta) {
        shgicPointsPlayer = 0;
        shgicPointsEnemy = 0;
        game.tttd = 1;
        canPlayTTT = true;
    }
    */

    if (source == null || source == undefined) source = Object.assign({}, emptyGame);
    else {
        try {
            if (source.toString().substr(0, 4) == "shga") {
                source = source.replace("shgabb", rep7);
                source = source.replace("dpjiopjrdopjh", "D");
                source = source.replace("pppp", "x");
                source = atob(source);
            }
            source = JSON.parse(source);
        }
        catch (e) {
            alert("Something went wrong while unpacking the save!");
        }
    }

    // Empty the game first. Make it completely empty
    emptyGame.a = [];
    game = {};

    // Now import. it's done this way to support old saves
    game = Object.assign({}, emptyGame, source);

    // Take care of arrays
    game.upgradeLevels = Object.assign({}, emptyGame.upgradeLevels, source.upgradeLevels);
    game.ameUp = Object.assign({}, emptyGame.ameUp, source.ameUp);
    game.profile = Object.assign({}, emptyGame.profile, source.profile);

    game.stats = Object.assign({}, emptyGame.stats, source.stats);
    game.stats_prestige = Object.assign({}, emptyGame.stats, source.stats_prestige);
    game.stats_today = Object.assign({}, emptyGame.stats, source.stats_today);

    for (let statHandler in statTypes) {
        for (let currHandler in statCurr) {
            game[statTypes[statHandler]][statCurr[currHandler]] = numberLoader(game[statTypes[statHandler]][statCurr[currHandler]]);
        }
    }

    // break infinity stuff
    game.shgabb = numberLoader(game.shgabb);
    game.sw = numberLoader(game.sw);
    game.gs = numberLoader(game.gs);
    game.si = numberLoader(game.si);
    game.fishvalue = numberLoader(game.fishvalue);

    // Some adjustments
    shgicPointsPlayer = 0;
    shgicPointsEnemy = 0;
    canPlayTTT = false;
    shgicResetField();

    if (currentBoost != "none") {
        currentBoost = "none";
        adStatus = "loaded";
        adTime = 10;
        adMax = 10;
    }

    loadArtifactValues();
    checkNewDay();

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

    if (game.stats.shgabb == "-Infinity") game.stats.shgabb = new Decimal(0);
    if (game.stats_prestige.shgabb == "-Infinity") game.stats_prestige.shgabb = new Decimal(0);
    if (game.stats_prestige.hms == 0) game.stats_prestige.hms = game.stats.hms;
    if (game.stats.gems != undefined) {
        game.stats.tgems += game.stats.gems;
        delete game.stats.gems;
    }
    /*
    if (sandwichUpgrades.autoShgabb.currentPrice() > game.stats.sw.mul(10)) {
        // Auto Shgabb was reworked
        game.sw = game.sw.add(Math.pow(game.upgradeLevels.autoShgabb, 2) / 2);
        game.upgradeLevels.autoShgabb = 0;
    } */

    for (l in game.alo) {
        if (JSON.stringify(game.alo[l]) == JSON.stringify(game.aeqi)) selectedLoadout = l;
    }

    let ownedArtisList = [];
    for (let ownedArtis = 0; ownedArtis < game.a.length; ownedArtis++) {
        if (ownedArtisList.includes(game.a[ownedArtis])) {
            // duplicate detected! remove it & refund
            console.log("Duplicate Artifact detected! Loc: " + ownedArtis + ", ID: " + game.a[ownedArtis]);
            game.a.splice(ownedArtis, 1);
            game.gems += 30;
            ownedArtis -= 1;
        }
        else ownedArtisList.push(game.a[ownedArtis]);
    }

    // Execute some stuff
    //handleArtifactsFirstTime(); // it's safe to say nobody needs this anymore lol
    checkForZeroNext();

    updateEVERYTHING();

    createNotification("Game imported successfully!");
}

function deleteGame() {
    if (confirm("Do you REALLY want to do this? EVERYTHING will be gone, you gain NOTHING")) {
        if (confirm("Make sure to save your progress before doing this!!! Everything will be lost!")) {
            if (confirm("If you press Yes again, everything will be gone!")) {
                for (let currHandler in statCurr) {
                    emptyGame[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats_prestige[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats_prestige[statCurr[currHandler]] = new Decimal(0);
                }

                game = emptyGame;
                createNotification("Game deleted successfully!");
                autoSave();
                updateEVERYTHING();
            }
        }
    }
}

function loop(tick) {
    // Main Game Loop
    let time = (tick - oldTime) / 1000;
    oldTime = tick;

    //doubleClick -= time;
    game.clickCooldown -= time;
    autoSaveTime -= time;
    quoteTime += time;
    sandwichTime -= time;
    sandwichFreezeTime -= time;
    newArtifactDisplayTimer -= time;
    cakeDuration -= time;
    statIncrease("playTime", time);
    eggTime -= time;

    for (aqq in game.aeqi) {
        if (getArtifact(game.aeqi[aqq]).timer != undefined) getArtifact(game.aeqi[aqq]).tickTimer(time);
    }

    /* Minigame
    if (selection("minigames")) {
        gamesLoop(tick);
    } */

    ui.autoBar.value = sandwichTime;
    ui.autoBarText.innerHTML = ui.autoBar.value.toFixed(1) + "s/" + ui.autoBar.max + "s";

    ui.prestigeBar.value = game.stats_prestige.playTime;
    ui.prestigeBar.max = game.stats_prestige.playTime > 5 * 60 ? 15 * 60 : (game.stats_prestige.playTime > 3 * 60 ? 5 * 60 : (game.stats_prestige.playTime > 15 ? 3 * 60 : 15));
    ui.prestigeBarText.innerHTML = ui.prestigeBar.value.toFixed(0) + "s/" + ui.prestigeBar.max + "s";

    // Egg Hunt
    if (isEvent("egg")) {
        if (eggTime <= 0) {
            eggTime = 10;
            refreshEgg();
        }
    }

    if (adStatus != "loading" && unlockedAds()) adTime -= time;

    if (newArtifactDisplayTimer <= 0 && newArtifactDisplayTimer > -15) {
        ui.newArtifact.style.display = "none";
    }
    if (autoSaveTime <= 0) {
        autoSaveTime = 10;
        autoSave(false);
    }
    if (quoteTime >= 18) {
        quoteTime = 0;
        updateQuote();
    }
    if (ui.quote.offsetWidth > window.innerWidth) ui.quote.style["margin-left"] = "-" + (quoteTime % 6 < 1 ? 0 : (ui.quote.offsetWidth - window.innerWidth) * Math.min(0.25, (quoteTime % 6 - 1) * 0.2)) + "%";
    else ui.quote.style["margin-left"] = "-0%";

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
        artifactEvent("onAuto", {});

        if (isEvent("shgabbthewitch")) {
            for (let witchArtis = 0; witchArtis <= 5; witchArtis++) {
                let witchesEarned = 0;
                if (game.aeqi.includes(cursedArtifacts[witchArtis]) && Math.random() <= 0.03) {
                    witchesEarned += 1;
                }

                if (witchesEarned > 0) {
                    game.witchshgabb += witchesEarned;
                    statIncrease("witchshgabb", witchesEarned);

                    createNotification("+" + witchesEarned + " Witch Shgabb!");
                    renderCurrentEvent();
                }

                if (Math.random() <= 0.003 || cursedArtifacts[witchArtis] == 0) {
                    cursedArtifacts[witchArtis] = artifacts[Math.floor(Math.random() * (artifacts.length - 1))].ID;
                    createNotification(getArtifact(cursedArtifacts[witchArtis]).name + " has been cursed!");
                }
            }

            updateArtifacts();
        }
    }

    adSwitcher();

    updateUI();
    window.requestAnimationFrame(loop);
}

// Load
importGame(localStorage.getItem("shgabbClicker"));
if (localStorage.getItem("shgabbSettings") != undefined) {
    settings = Object.assign({}, settings, JSON.parse(localStorage.getItem("shgabbSettings")));

    music.muted = !settings.music;
    adHandler.muted = !settings.adMusic;
    }

function updateBG() {
    var body = document.getElementsByTagName('body')[0];
    if (settings.background || isChallenge(5)) {
        // No background (-> black)
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
    }
    else {
        // Background is enabled
        body.style.backgroundColor = "none";
        
        if (settings.eventBG && isEvent("", true)) {
            if (isEvent("christmas") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-christmas.png)";
            else if (isEvent("anniversary") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-anniversary.png)";
            else if (isEvent("lunar") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-lunar.png)";
            else if (isEvent("egg") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-easter.png)";
            else if (isEvent("pride") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-pride.png)";
            else if (isEvent("summer") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-summer.png)";
            else if (isEvent("shgabbthewitch") && settings.eventBG) body.style.backgroundImage = "url(images/backgrounds/bg-stw.png)";
        }
        else {
            body.style.backgroundImage = "url(images/backgrounds/bg-normal.png)";
        }
    }
}

ui.topSquare.style.display = ["", "none", ""][settings.topSquare];

// Update UI
function updateEVERYTHING() {
    updateArtifacts();
    updateBG();
    updateCurrencies();
    updateGems();
    updateQuote();
    updateStats();
    updateTopSquare();
    updateUI();
    updateUpgradeColors();
    updateUpgrades();

    renderAmeConvert();
    renderUpgrades();
    renderAchievements();
    renderAllSelection();
    renderArtifacts();
    renderChallenges();
    renderCurrentEvent();
    renderGemOffers();
    renderPlayerProfile();
    renderSettings();
    renderShbook();
}

updateEVERYTHING();
checkNewDay();

// Generate Patch Notes
generatePatchNotes();

// Start game loop (30 FPS)
window.requestAnimationFrame(loop);

// hotkey stuff
var hotkeysEnabled = true;
var doBuyMax = false;

function hotkeyNextSelection() {
    let nextOne = selectionTypes[selectedSelection - 1][selectionTypes[selectedSelection - 1].indexOf(selections[selectedSelection - 1]) - 1];
    if (nextOne != undefined) {
        selections[selectedSelection - 1] = nextOne;
    }
    else if (selections[selectedSelection - 1] == "none") {
        selections[selectedSelection - 1] = selectionTypes[selectedSelection - 1][selectionTypes[selectedSelection - 1].length - 1];
    }
    else {
        selections[selectedSelection - 1] = "none";
    }
}

function hotkeyPreviousSelection() {
    let nextOne = selectionTypes[selectedSelection - 1][selectionTypes[selectedSelection - 1].indexOf(selections[selectedSelection - 1]) + 1];
    if (nextOne != undefined) {
        selections[selectedSelection - 1] = nextOne;
    }
    else if (selections[selectedSelection - 1] == "none") {
        selections[selectedSelection - 1] = selectionTypes[selectedSelection - 1][0];
    }
    else {
        selections[selectedSelection - 1] = "none";
    }
}

document.addEventListener('keypress', function (e) {
    if (!hotkeysEnabled) return false;
    if (unlockedArtifacts()) {
        if (e.key == '1') artifactLoadout(0);
        if (e.key == '2') artifactLoadout(1);
        if (e.key == '3') artifactLoadout(2);
        if (e.key == '4') artifactLoadout(3);
        if (e.key == '5') artifactLoadout(4);
        if (e.key == '6') artifactLoadout(5);
        if (e.key == '7') artifactLoadout(6);
        if (e.key == '8') artifactLoadout(7);
    }
    if (game.shgabb >= 1000000 && game.stats_prestige.playTime >= 15) {
        if (e.key == 'p') prestigeButton();
    }

    if (e.key == 'w' && selectedSelection > 1) {
        selectedSelection -= 1;
        renderAllSelection();
    }
    if (e.key == 's' && selectedSelection < 4) {
        selectedSelection += 1;
        renderAllSelection();
    }
    if (e.key == 'a') {
        hotkeyNextSelection();
        while (!isSelectionUnlocked(selections[selectedSelection - 1])) hotkeyNextSelection(); // these two are in case you don't have it (like event)
        renderAllSelection();
    }
    if (e.key == 'd') {
        hotkeyPreviousSelection();
        while (!isSelectionUnlocked(selections[selectedSelection - 1])) hotkeyPreviousSelection();
        renderAllSelection();
    }
    if (e.key == 'c') {
        selections[selectedSelection - 1] = "none";
        renderAllSelection();
    }
    
}, false);

document.addEventListener('keydown', function (e) {
    if (e.key == "m") doBuyMax = true;
}, false);

document.addEventListener('keyup', function (e) {
    if (e.key == "m") doBuyMax = false;
}, false);

if (!BETA.isBeta) console.log("%cA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nA\nAAAAAAAAAAAAAAAAAAAAAAA ", 'background: red; color: red');
console.log("%cYou shouldn't be here.\nExcept if you're Schrottii. ", 'background: #000000; color: red');

// minigames setup WGGJ
images = {
    button: "rough.png",
    empty: "empty.png",

    minigames: "minigames/selection/minigames.png",
    minigames2: "minigames/selection/minigames2.png",
    cd1: "minigames/selection/cd1.png",
    cd2: "minigames/selection/cd2.png",
    cd3: "minigames/selection/cd3.png",

    sssx: "minigames/shgic/sss-x.png",
    ssso: "minigames/shgic/sss-o.png",
    sssn: "minigames/shgic/sss-n.png",

    waves: "minigames/fishgang/waves.png",
    waves2: "minigames/fishgang/waves2.png",
    water: "minigames/fishgang/water.png",
    water2: "minigames/fishgang/water2.png",
    fishlvl: "minigames/fishgang/fishlvl.png",
    bobby: "minigames/fishgang/bobby.png",

    anchovy: "minigames/fishgang/fish/anchovy.png",
    batfish: "minigames/fishgang/fish/batfish.png",
    buffalo: "minigames/fishgang/fish/buffalo.png",
    butterfish: "minigames/fishgang/fish/butterfish.png",
    carp: "minigames/fishgang/fish/carp.png",
    catfish: "minigames/fishgang/fish/catfish.png",
    cod: "minigames/fishgang/fish/cod.png",
    koi: "minigames/fishgang/fish/koi.png",
    leaoo: "minigames/fishgang/fish/leaoo.png",
    oscar: "minigames/fishgang/fish/oscar.png",
    pike: "minigames/fishgang/fish/pike.png",
    piranha: "minigames/fishgang/fish/piranha.png",
    salmon: "minigames/fishgang/fish/salmon.png",
    shark: "minigames/fishgang/fish/shark.png",
    skate: "minigames/fishgang/fish/skate.png",
    swordfish: "minigames/fishgang/fish/swordfish.png",
    tuna: "minigames/fishgang/fish/tuna.png",
    zander: "minigames/fishgang/fish/zander.png",
    trash: "currencies/artifactscrap.png",
}
GAMENAME = "Minigames";
FONT = "Rw";
wggjLoadImages();
wggjLoop();