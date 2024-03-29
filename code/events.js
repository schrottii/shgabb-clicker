// Game made by Schrottii - editing or stealing is prohibited!

function isEvent(eventName, all = false) {
    if (game.stats.hms < 2000) return false; // not unlocked

    let date = new Date();
    let today = parseInt("" + (date.getUTCMonth().toString().length == 1 ? ("0" + (date.getUTCMonth() + 1)) : date.getUTCMonth() + 1) + (date.getUTCDate().toString().length == 1 ? "0" + date.getUTCDate() : date.getUTCDate()));
    if (all) eventName = "anniversary"; //first event whatever it is, so it goes thru all
    
    /*
    if (eventName == "anniversary") return true; // used to force event
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

function openGifts(amount) {
    if (game.gifts < amount) {
        return false;
    }
    game.gifts -= amount;
    if (!game.ach.includes(72)) game.ach.push(72);

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

    let sandwichAmount = giftContents[1] * Math.ceil((getSandwich()) * 50);
    let shgabbAmount = giftContents[2] * Math.ceil(firstGemOfferWorth() * 2);

    if (sandwichAmount > 0) {
        game.sw += sandwichAmount;
        game.stats.sw += sandwichAmount;
        game.stats.swtp += sandwichAmount;
    }
    if (shgabbAmount > 0) {
        game.shgabb += shgabbAmount;
        game.stats.shgabbtp += shgabbAmount;
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
    game.stats.cakes += 1;
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
                game.ach.push(92);

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

            game.stats.ads += 1;
            game.stats.wads.fs += 1;

            break;
        case 4:
            // instant more crits
            if (game.qian < 8) return false;
            game.qian -= 8;

            currentBoost = "moreCrits"
            adTime = 180;
            adMax = 180;

            game.stats.ads += 1;
            game.stats.wads.mc += 1;

            break;
        case 5:
            // instant stronger auto
            if (game.qian < 8) return false;
            game.qian -= 8;

            currentBoost = "strongerAuto"
            adTime = 300;
            adMax = 300;

            game.stats.ads += 1;
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

            if (!game.ach.includes(93)) game.ach.push(93);

            luck = 300;

            break;
    }

    if (!game.ach.includes(94)) game.ach.push(94);
    renderCurrentEvent();
}

function applyLuck(div) {
    if (luck < 0) return 1;
    return (luck / div) + 1;
}