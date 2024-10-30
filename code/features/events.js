// Game made by Schrottii - editing or stealing is prohibited!

function isEvent(eventName, all = false) {
    if (game.stats.hms < 2000) return false; // not unlocked

    let date = new Date();
    let today = parseInt("" + (date.getUTCMonth().toString().length == 1 ? ("0" + (date.getUTCMonth() + 1)) : date.getUTCMonth() + 1) + (date.getUTCDate().toString().length == 1 ? "0" + date.getUTCDate() : date.getUTCDate()));
    if (all) eventName = "anniversary"; //first event whatever it is, so it goes thru all

    /*
    if (eventName == "summer" || all) return true; // used to force event
    else return false;
    */

    // Events below in order (January -> December)
    switch (eventName) {
        case "anniversary":
            // Anniversary Event | Jan 6 - Jan 20
            if (today >= 106 && today <= 120 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "lunar";
        case "lunar":
            // Lunar New Year Event | Feb 10 - Feb 24
            if (today >= 210 && today <= 224 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "egg";
        case "egg":
            // Egg Event | Mar 29 - Apr 12
            if (today >= 329 && today <= 419 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "pride";
        case "pride":
            // Pride Event | Jun 8 - Jun 22
            if (today >= 608 && today <= 622 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "summer";
        case "summer":
            // Hot Hot Summer Event | Jul 28 - Aug 18
            if (today >= 728 && today <= 818 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "shgabbthewitch";
        case "shgabbthewitch":
            // Shgabb The Witch Event | Oct 28 - Nov 10
            if (today >= 1028 && today <= 1110 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "christmas";
        case "christmas":
            // Christmas Event | Dec 16 - Dec 30
            if (today >= 1216 && today <= 1230 && game.stats.hms >= 2000) return true;
            if (!all) return false;
            else eventName = "nextEvent";
    }
    return false; // none
}

function eventValue(eventName, trueValue, falseValue) {
    if (isEvent(eventName)) return trueValue;
    else return falseValue;
}

function renderCurrentEvent() {
    if (isEvent("christmas")) {
        renderChristmas();
    }
    else if (isEvent("anniversary")) {
        renderAnniversary();
    }
    else if (isEvent("lunar")) {
        renderLunar();
    }
    else if (isEvent("egg")) {
        renderEgg();
    }
    else if (isEvent("pride")) {
        renderPride();
    }
    else if (isEvent("summer")) {
        renderSummer();
    }
    else if (isEvent("shgabbthewitch")) {
        renderShgabbTheWitch();
    }
}

// Christmas Event

function renderChristmas() {
    let render = "<h3>Christmas Event</h3><br /><b>December 16th - December 30th</b>";
    render = render + "<br />" + cImg("gift") + game.gifts + " Gifts";
    render = render + `<br /><br />
        <button class='grayButton' style='margin-right: 20px' onclick='openGifts(1)'>Open 1 Gift</button>
        <button class='grayButton' style='margin-right: 20px' onclick='openGifts(10)'>Open 10 Gifts</button>
        <button class='grayButton' onclick='openGifts(100)'>Open 100 Gifts</button>`;
    ui.eventRender.innerHTML = render;
}

var cakeDuration = 0;

function renderAnniversary() {
    let render = "<h3>Anniversary Event</h3><br /><b>January 6th - January 20th</b>";
    render = render + "<br />x3 Shgabb production! 50% more Artifacts! Cake!";
    render = render + "<img class='cake' id='eventCake' src='images/cake.png'>";
    if (cakeDuration <= 0) render = render + "Cake Progress: " + game.cakeProgress + (game.cakeProgress >= 10000 ? "/15000" : "/10000");
    else render = render + "Cake Duration: " + cakeDuration.toFixed(0) + "s<br />x10 Shgabb! x5 Faster Clicks! x3 Gem Chance!";
    if (game.cakeProgress >= 10000) render = render + "<br /><button class='grayButton' onclick='eatCake()'>Eat Cake</button>";

    ui.eventRender.innerHTML = render;
    document.getElementById("eventCake").style.filter = "brightness(" + Math.min(100, game.cakeProgress / 100) + "%)";
}

var lunarAntiCooldown = 0;
var luck = 0;

function renderLunar() {
    let render = "<h3>Lunar New Year Event</h3><br /><b>February 10th - February 24th</b>";
    render = render + "<br />x8 Shgabb production! Qian!";
    render = render + "<br />" + cImg("qian") + game.qian + " Qian";

    if (!game.evpfps.includes(408) || !game.ach.includes(92)) render = render + "<br /><br />";
    if (!game.evpfps.includes(408)) render = render + "<button class='chineseOffer' onclick='useQian(1)'>Buy a Chinese PFP!<br/>888 " + cImg("qian") + "</button>";
    if (!game.ach.includes(92)) render = render + "<button class='chineseOffer' onclick='useQian(2)'>Permanent x2 Qian!<br/>96 " + cImg("qian") + "</button>";

    render = render + "<br /><br /><button class='chineseOffer' onclick='useQian(3)'>Instant Faster Shgabb boost! (1 minute)<br/>26 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(4)'>Instant More Crits boost! (3 minutes)<br/>8 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(5)'>Instant Stronger Auto boost! (5 minutes)<br/>8 " + cImg("qian") + "</button>";

    render = render + "<br /><br /><button class='chineseOffer' onclick='useQian(6)'>Get 3 Gems!<br/>3 " + cImg("qian") + "</buttons>";
    render = render + "<button class='chineseOffer' onclick='useQian(7)'>Reset the click cooldown and the next 8 clicks have no cooldown!<br/>6 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(8)'>Luck!<br/>36 " + cImg("qian") + "</button>";

    ui.eventRender.innerHTML = render;
}

var eggUpgrade = "";
var eggNumber = 1;
var eggTime = 10;

function renderEgg() {
    let render = "<h3>Egg Hunt Event</h3><br /><b>March 29th - April 19th</b>";
    render = render + "<br />" + cImg("egg") + game.eggs + " Eggs";

    if (!game.evpfps.includes(414)) render = render + "<br /><br /><button class='chineseOffer' onclick='useEggs(1)'>Buy an Easter PFP!<br/>100 " + cImg("egg") + "</button>";
    render = render + "<br /><br /><button class='chineseOffer' onclick='useEggs(2)'>Guaranteed Common Artifact!<br/>10 " + cImg("egg") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useEggs(3)'>Guaranteed Rare Artifact!<br/>25 " + cImg("egg") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useEggs(4)'>Guaranteed Epic Artifact!<br/>100 " + cImg("egg") + "</button>";

    ui.eventRender.innerHTML = render;
}

function refreshEgg() {
    let allUpgrades = Object.assign({}, shgabbUpgrades, sandwichUpgrades, goldenShgabbUpgrades, ameliorerUpgrades, bagUpgrades);
    let randomNumber = Math.floor(Math.random() * Object.keys(allUpgrades).length - 1);

    eggUpgrade = Object.keys(allUpgrades)[randomNumber];
    eggNumber = Math.ceil(Math.random() * 4);
}

function clickEgg() {
    doesUnlevel = true;
    eggUpgrade = "";

    createNotification("Egg found!");
    game.eggs += 1;
    statIncrease("eggs", 1);

    renderCurrentEvent();
}

function openGifts(amount) {
    if (game.gifts < amount) {
        return false;
    }
    game.gifts -= amount;
    checkAchievement(72);

    // PFP 0.5% - Gems 19.5% - SW 40% - Shgabb 40%
    let giftContents = [0, 0, 0];

    for (ogi = 0; ogi < amount; ogi++) {
        let random = Math.random();
        if (random < 0.005 && !game.evpfps.includes(400)) {
            createNotification("Received a Christmas PFP!");
            game.evpfps.push(400);
        }
        else if (random < 0.005 && !game.evpfps.includes(401)) {
            createNotification("Received a Christmas PFP!");
            game.evpfps.push(401);
        }
        else if (random < 0.005 && !game.evpfps.includes(402)) {
            createNotification("Received a Christmas PFP!");
            game.evpfps.push(402);
        }
        else if (random < 0.2) giftContents[0] += 2;
        else if (random < 0.6) giftContents[1] += 1;
        else giftContents[2] += 1;
    }

    let sandwichAmount = calcSandwiches().mul(50).ceil().mul(giftContents[1]);
    let shgabbAmount = new Decimal(firstGemOfferWorth()).mul(2).ceil().mul(giftContents[2]);

    if (sandwichAmount > 0) {
        game.sw = game.sw.add(sandwichAmount);
        statIncrease("sw", sandwichAmount);
    }
    if (shgabbAmount > 0) {
        game.shgabb = game.shgabb.add(shgabbAmount);
        //statIncrease("shgabb", shgabbAmount); DO NOT!!!
    }
    if (giftContents[0] > 0) {
        game.gems += giftContents[0];
        game.stats.gems += giftContents[0];
    }

    renderCurrentEvent();
    createNotification("Opened " + amount + (amount == 1 ? " Gift" : " Gifts") + "! Content: " + (shgabbAmount != 0 ? fn(shgabbAmount) + " Shgabb, " : "") + (sandwichAmount != 0 ? fn(sandwichAmount) + " Sandwiches, " : "") + (giftContents[0] != 0 ? giftContents[0] + " Gems, " : ""));
}

function eatCake() {
    if (game.cakeProgress < 10000) return false;
    game.cakeProgress -= 10000;
    cakeDuration = 180;
    statIncrease("cakes", 1);
    renderCurrentEvent();
}

function cakeValue(trueValue, falseValue) {
    if (cakeDuration > 0) return trueValue;
    else return falseValue;
}

function useQian(offerNR) {
    switch (offerNR) {
        case 1:
            // buy PFP
            if (game.qian < 888) {
                createNotification("Not enough Qian!");
                return false;
            }

            if (!game.evpfps.includes(406)) {
                game.evpfps.push(406);
            }
            else if (!game.evpfps.includes(407)) {
                game.evpfps.push(407);
            }
            else if (!game.evpfps.includes(408)) {
                game.evpfps.push(408);
            }
            else {
                // has all
                createNotification("You already own these PFPs!");
                return false;
            }
            // bought one of them
            game.qian -= 888;
            createNotification("Bought PFP for 888 Qian!");

            break;
        case 2:
            if (game.qian < 96) return false;

            if (game.ach.includes(92)) {
                createNotification("You already bought this!");
                return false;
            }
            else {
                game.qian -= 96;
                checkAchievement(92);

                createNotification("Double Qian!");
            }

            break;
        case 3:
            // instant faster shgabb
            if (game.qian < 26) return false;
            game.qian -= 26;

            currentBoost = "fasterShgabb"
            adTime = 60;
            adMax = 60;

            statIncrease("ads", 1);
            game.stats.wads.fs += 1;

            break;
        case 4:
            // instant more crits
            if (game.qian < 8) return false;
            game.qian -= 8;

            currentBoost = "moreCrits"
            adTime = 180;
            adMax = 180;

            statIncrease("ads", 1);
            game.stats.wads.mc += 1;

            break;
        case 5:
            // instant stronger auto
            if (game.qian < 8) return false;
            game.qian -= 8;

            currentBoost = "strongerAuto"
            adTime = 300;
            adMax = 300;

            statIncrease("ads", 1);
            game.stats.wads.sa += 1;

            break;
        case 6:
            // gems
            if (game.qian < 3) return false;
            game.qian -= 3;

            game.gems += 3;
            game.stats.gems += 3;

            break;
        case 7:
            // click cooldown thing
            if (game.qian < 6 || lunarAntiCooldown == 8) return false;
            game.qian -= 6;

            game.clickCooldown = 0;
            clickCooldown = 0;
            lunarAntiCooldown = 8;

            break;
        case 8:
            if (game.qian < 36 || luck > 0) return false;
            game.qian -= 36;

            checkAchievement(93);

            luck = 300;

            break;
    }

    checkAchievement(94);
    renderCurrentEvent();
}

function applyLuck(div) {
    if (luck < 0) return 1;
    return (luck / div) + 1;
}

function useEggs(offerNR) {
    switch (offerNR) {
        case 1:
            // buy PFP
            if (game.eggs < 100) {
                createNotification("Not enough Eggs!");
                return false;
            }

            if (!game.evpfps.includes(409)) {
                game.evpfps.push(409);
            }
            else if (!game.evpfps.includes(410)) {
                game.evpfps.push(410);
            }
            else if (!game.evpfps.includes(411)) {
                game.evpfps.push(411);
            }
            else if (!game.evpfps.includes(412)) {
                game.evpfps.push(412);
            }
            else if (!game.evpfps.includes(413)) {
                game.evpfps.push(413);
            }
            else if (!game.evpfps.includes(414)) {
                game.evpfps.push(414);
            }
            else {
                // has all
                createNotification("You already own these PFPs!");
                return false;
            }
            // bought one of them
            game.eggs -= 100;
            createNotification("Bought PFP for 100 Eggs!");

            break;
        case 2:
            if (game.eggs < 10) return false;

            game.eggs -= 10;
            if (!allArtifactsOfRarity(1)) gambleArtifact(1);
            else artifactDuplicate(1);

            break;
        case 3:
            if (game.eggs < 25) return false;

            game.eggs -= 25;
            if (!allArtifactsOfRarity(2)) gambleArtifact(2);
            else artifactDuplicate(2);

            break;
        case 4:
            if (game.eggs < 100) return false;

            game.eggs -= 100;
            if (!allArtifactsOfRarity(3)) gambleArtifact(3);
            else artifactDuplicate(3);

            break;
    }

    checkAchievement(112);
    renderCurrentEvent();
}

var shgaybbMode = false;
var shgaybbFound = "";
const shgaybbList = [
    "Asexual",
    "Bi",
    "Gay male",
    "Intersex",
    "Gay female",
    "Non-binary",
    "Supergay",
    "Pan",
    "Shgabbsexual",
    "Trans",
    "Ally",
    "Straight"
];

function toggleShgaybbMode() {
    shgaybbMode = !shgaybbMode;
    shgaybbFound = "";
    renderCurrentEvent();
}

function shgaybbID() {
    switch (shgaybbFound) {
        case "Supergay":
            return 400;
        case "Trans":
            return 401;
        case "Non-binary":
            return 402;
        case "Gay female":
            return 403;
        case "Gay male":
            return 404;
        case "Bi":
            return 405;
        case "Pan":
            return 406;
        case "Asexual":
            return 407;
        case "Intersex":
            return 408;
        case "Shgabbsexual":
            return 409;
        case "Ally":
            return 999;
        case "Straight":
            return 999;
        default:
            return 999;
    }
    return 999;
}

function findShgaybb() {
    if (!shgaybbMode) return false;

    if (Math.random() < 1 / 5) {
        let seed = Math.ceil(game.stats_today.playTime * game.stats.clicks) % shgaybbList.length;

        if (shgaybbFound == "") {
            // first of the couple
            shgaybbFound = shgaybbList[seed];
            createNotification("Found: " + shgaybbFound + " Shgabb");
        }
        else if (shgaybbFound == shgaybbList[seed] || shgaybbList[seed] == "Pan") {
            // second
            createNotification("Couple found! " + shgaybbFound + " Shgabb");

            // award the reward
            let foundID = shgaybbID();
            if (foundID != 999) {
                // one of the 10 banners
                if (!game.evbans.includes(foundID)) game.evbans.push(foundID);
                else createNotification("You already own this reward...");
            }
            else {
                // one of the 3 pfps, random
                seed = seed % 3;

                switch (seed) {
                    case 0:
                        if (!game.evpfps.includes(415)) game.evpfps.push(415);
                        else {
                            seed += 1;
                        }
                    case 1:
                        if (!game.evpfps.includes(416)) game.evpfps.push(416);
                        else {
                            seed += 1;
                        }
                    case 2:
                        if (!game.evpfps.includes(417)) game.evpfps.push(417);
                        else if (!game.evpfps.includes(415)) game.evpfps.push(415);
                        else createNotification("You already own this reward...");
                        break;
                }
            }

            renderPFPs();
            renderBanners();
            shgaybbFound = "";
            //shgaybbMode = false;
        }
        else {
            createNotification("Found: " + shgaybbList[seed] + " Shgabb. Not a couple... forever alone...");
            shgaybbFound = "";
            //shgaybbMode = false;
        }
    }
}

function renderPride() {
    let render = "<h3>Pride Event</h3><br /><b>June 8th - June 22nd</b>";
    render = render + "<br />Happy pride month! Spread love and happiness! x10 Shgabb production!";
    render = render + "<br />Press the button below to activate Shgaybb Mode. Clicking will take at least 2 seconds, and have a chance of finding semi-random Shgabbs. Find the same pair twice to gain its reward! 3 PFPs and 10 Banners. Getting Pan Shgabb second counts as a joker.";
    render = render + "<br /><button class='grayButton' onclick='toggleShgaybbMode()'>" + (shgaybbMode ? "Disable Shgaybb Mode" : "Enable Shgaybb Mode") + "</button>";

    ui.eventRender.innerHTML = render;
}

function renderSummer() {
    let render = "<h3>Hot Hot Summer</h3><br /><b>July 28th - August 18th</b>";
    render = render + "<br />It's so hot! Don't forget your suncream! x10 Sandwiches and x10 GS! Shorts, the event currency, can be found by clicking with a low chance. Use Heat Mode for faster clicks and more Shorts.";
    render = render + "<br />" + cImg("shorts") + game.shorts + " Shorts";

    render = render + "<br /><br />Press the button below to activate Heat Mode. Every perfectly timed click reduces the cooldown (up to x3 speed), but clicking too slow resets it, and clicking too fast causes you to overheat. At a high speed, you can find Shorts at a 100x higher rate.";
    render = render + "<br /><button class='grayButton' onclick='toggleHeatMode()'>" + (heatMode ? "Disable Heat Mode" : "Enable Heat Mode") + "</button>";
    render = render + "<br />" + summerClicks + " clicks";

    if (getCooldown() <= 0.5 && !game.evpfps.includes(420)) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(1)'>#1 Buy a PFP<br/>80 " + cImg("shorts") + "</button>";
    if (getCooldown() >= 25 && !game.evbans.includes(413)) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(2)'>#2 Buy a Banner<br/>100 " + cImg("shorts") + "</button>";

    if (getCooldown() <= 0.5) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(3)'>#3 Instant Faster Shgabb boost! (1 minute)<br/>60 " + cImg("shorts") + "</button>";
    if (getCooldown() >= 25) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(4)'>#4 Reset the click cooldown and the next 10 clicks have no cooldown!<br/>40 " + cImg("shorts") + "</button>";

    if (getCooldown() <= 1) render = render + "<br /><br /><button onclick='useShorts(5)'>" + getArtifact(313).render(false) + "<div class='chineseOffer'>#5<br/>200 " + cImg("shorts") + "</div></button>";
    if (getCooldown() >= 5) render = render + "<br /><br /><button onclick='useShorts(6)'>" + getArtifact(200).render(false) + "<div class='chineseOffer'>#6<br/>100 " + cImg("shorts") + "</div></button>";

    ui.eventRender.innerHTML = render;
}

var summerClicks = 0;
var heatMode = false;

function toggleHeatMode() {
    heatMode = !heatMode;
    summerClicks = 0;
    renderCurrentEvent();
}

function useShorts(offerNR) {
    switch (offerNR) {
        case 1:
            // buy PFP
            if (game.shorts < 80) {
                createNotification("Not enough Shorts!");
                return false;
            }

            if (!game.evpfps.includes(418)) {
                game.evpfps.push(418);
            }
            else if (!game.evpfps.includes(419)) {
                game.evpfps.push(419);
            }
            else if (!game.evpfps.includes(420)) {
                game.evpfps.push(420);
            }
            else {
                // has all
                createNotification("You already own these PFPs!");
                return false;
            }
            // bought one of them
            game.shorts -= 80;
            createNotification("Bought PFP for 80 Shorts!");

            break;
        case 2:
            // buy Banner
            if (game.shorts < 100) {
                createNotification("Not enough Shorts!");
                return false;
            }

            if (!game.evbans.includes(410)) {
                game.evbans.push(410);
            }
            else if (!game.evbans.includes(411)) {
                game.evbans.push(411);
            }
            else if (!game.evbans.includes(412)) {
                game.evbans.push(412);
            }
            else if (!game.evbans.includes(413)) {
                game.evbans.push(413);
            }
            else {
                // has all
                createNotification("You already own these Banners!");
                return false;
            }
            // bought one of them
            game.shorts -= 100;
            createNotification("Bought Banner for 100 Shorts!");

            break;
        case 3:
            // instant faster shgabb
            if (game.shorts < 60) return false;
            game.shorts -= 60;

            currentBoost = "fasterShgabb"
            adTime = 60;
            adMax = 60;

            statIncrease("ads", 1);
            game.stats.wads.fs += 1;

            break;
        case 4:
            // click cooldown thing
            if (game.shorts < 40 || lunarAntiCooldown == 10) return false;
            game.shorts -= 40;

            game.clickCooldown = 0;
            clickCooldown = 0;
            lunarAntiCooldown = 10;

            break;
        case 5:
            if (game.shorts < 200) return false;

            if (!game.a.includes(313)) {
                game.a.push(313)
                createNotification("New Artifact: " + getArtifact(313).name);
            }
            else {
                artifactDuplicate(313);
            }

            game.shorts -= 200;

            updateArtifacts();
            break;
        case 6:
            if (game.shorts < 100) return false;

            if (!game.a.includes(200)) {
                game.a.push(200)
                createNotification("New Artifact: " + getArtifact(200).name);
            }
            else {
                artifactDuplicate(200);
            }

            game.shorts -= 100;

            updateArtifacts();
            break;
    }

    checkAchievement(94);
    renderCurrentEvent();
}

var witchesSpent = [0, 0, 0, 0]; // total (up to 10), virtue, herbs, odor
var cursedArtifacts = [0, 0, 0]; // three

function renderShgabbTheWitch() {
    let collectedPages = 0;
    for (let lored in game.lore) {
        if (getLoreByID(game.lore[lored]).source == 2) collectedPages++;
    }

    let render = "<h3>Shgabb The Witch</h3><br /><b>October 28th - November 10th</b>";
    render = render + "<br />" + cImg("witchshgabb") + game.witchshgabb + " Witch Shgabb";
    render = render + "<br />" + cImg("candle") + game.loreP + " Candles (" + collectedPages + "/10 Pages)";

    render = render + "<br /><br /><h3>Witch Spells</h3>";
    render = render + "<br />Spell density: " + witchesSpent[0] + "/10";
    render = render + "<br /><button onclick='spendWitches(1)' class='grayButton'><b>Push Virtue (" + witchesSpent[1] + "/10)</b><br />Increases chance of receiving a more positive effect</button>";
    render = render + "<br /><button onclick='spendWitches(2)' class='grayButton'><b>Defensive Herbs (" + witchesSpent[2] + "/10)</b><br />Decreases chance of negative effect</button>";
    render = render + "<br /><button onclick='spendWitches(3)' class='grayButton'><b>Hair Odor (" + witchesSpent[3] + "/10)</b><br />Increases chance of getting cosmetics</button>";
    render = render + "<br /><button onclick='castSpell()' class='grayButton'><b>Cast Spell</b><br />Prove your witchery skills!</button>";


    ui.eventRender.innerHTML = render;
}

function spendWitches(id) {
    if (witchesSpent[0] < 10 && game.witchshgabb > witchesSpent[0]) {
        witchesSpent[0] += 1;
        witchesSpent[id] += 1;
    }
    renderCurrentEvent();
}

function castSpell() {
    if (witchesSpent[0] < 1) return false;
    game.witchshgabb -= witchesSpent[0];

    // Random effect
    if (Math.random() * 100 < witchesSpent[3] + (witchesSpent[1] / 5)) {
        // Cosmetics
        // Base chance: 0%, +1% per Odor, +0.2% per Virtue
        createNotification("The spell contains cosmetic effects:");

        let availableCosmetics = [421, 422, 423, 424, 425, 414, 415, 416, 417];
        for (let runWitch = 414; runWitch <= 417; runWitch++) {
            if (game.evbans.includes(runWitch)) availableCosmetics.splice(availableCosmetics.indexOf(runWitch), 1);
        }
        for (let runWitch = 421; runWitch <= 425; runWitch++) {
            if (game.evpfps.includes(runWitch)) availableCosmetics.splice(availableCosmetics.indexOf(runWitch), 1);
        }
        if (availableCosmetics.length == 0) {
            // You have all cosmetics
            game.gems += 30;
            statIncrease("tgems", 30);
        }
        else {
            // You don't have all of them, here, a new one
            let randomlySelected = availableCosmetics[Math.floor(Math.random() * (availableCosmetics.length - 1))];

            if (randomlySelected <= 417) {
                game.evbans.push(randomlySelected);
                createNotification("New Profile Banner unlocked!");
            }
            else {
                game.evpfps.push(randomlySelected);
                createNotification("New PFP unlocked!");
            }
        }
    }
    else if (Math.random() * 100 < (witchesSpent[1] * 2) + 5 + (witchesSpent[2] / 5)) {
        // Very good stuff
        // Base chance: 5%, +2% per Virtue, +0.2% per Herbs
        createNotification("The spell contains holy effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.2) {
            effectAmount++;
            game.gems += 80;
            statIncrease("tgems", 80);
            createNotification("+80 Gems!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            let shgabbAmount = new Decimal(firstGemOfferWorth()).mul(32).mul(witchesSpent[0] * witchesSpent[1]).mul(game.upgradeLevels.deepMiner + 1).ceil();

            game.shgabb = game.shgabb.add(shgabbAmount);
            //statIncrease("shgabb", shgabbAmount); DO NOT!!!
            createNotification("+" + fn(shgabbAmount) + " Shgabb!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.chenga += 5;
            statIncrease("chenga", 5);

            createNotification("+5 Chengas!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            cursedArtifacts = [0, 0, 0];
            createNotification("Curses have been removed from Artifacts.");
        }


        if (effectAmount == 0) {
            createNotification("Your soul has been blessed.");
        }
    }
    else if (Math.random() * 100 < 50 - (witchesSpent[2] * 5) - witchesSpent[1]) {
        // Bad stuff
        // Base chance: 50%, -5% per Herbs, -1% per Virtue
        createNotification("The spell contains evil effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.2 && game.gems >= 30) {
            effectAmount++;
            game.gems -= 30;
            createNotification("30 of your Gems were destroyed!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            game.shgabb = new Decimal(0);
            createNotification("Your Shgabb is gone!");
        }
        if (Math.random() <= 0.2 && currentBoost != "none") {
            effectAmount++;
            currentBoost = "none";
            adStatus = "loaded";
            adTime = -1;
            createNotification("Your ad is gone!");
        }
        if (Math.random() <= 0.2 && game.a.includes(155)) {
            effectAmount++;
            game.aeqi = [155];
            createNotification("That's a nice set of equipped Artifacts");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            createNotification("Horrible things are approaching...");
        }


        if (effectAmount == 0) {
            createNotification("Doom is coming closer...");
        }
    }
    else {
        // Good stuff
        createNotification("The spell contains positive effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.2) {
            effectAmount++;
            game.gems += 10;
            statIncrease("tgems", 10);
            createNotification("+10 Gems!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            let shgabbAmount = new Decimal(firstGemOfferWorth()).div(32).mul(witchesSpent[0]).ceil();

            game.shgabb = game.shgabb.add(shgabbAmount);
            //statIncrease("shgabb", shgabbAmount); DO NOT!!!
            createNotification("+" + fn(shgabbAmount) + " Shgabb!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.chenga++;
            statIncrease("chenga", 1);

            createNotification("+1 Chenga!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.witchshgabb += 2;
            statIncrease("witchshgabb", 2);
            createNotification("+2 Witch Shgabb!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.clickCooldown = 0;
            clickCooldown = 0;
            lunarAntiCooldown = 5;
            createNotification("The click cooldown has been reset and the next 5 clicks have no cooldown.");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            luck += 66;
            createNotification("+66 Luck!");
        }


        if (effectAmount == 0) {
            createNotification("You feel happy.");
        }
    }

    // Reset it
    witchesSpent = [0, 0, 0, 0];
    renderCurrentEvent();
}