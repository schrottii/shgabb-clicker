// Game made by Schrottii - editing or stealing is prohibited!

///////////////////////////////////
// EVENT CLASS & LIST
///////////////////////////////////

class LimitedEvent {
    constructor(ID, name, displayName, description, startDate, endDate, renderFunction, cosmetics) {
        this.ID = ID;
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.renderFunction = renderFunction;
        this.cosmetics = cosmetics;
    }

    render() {
        eval(this.renderFunction + "()");
    }

    isActive(currentDate) {
        return parseInt(currentDate) >= this.startDate && parseInt(currentDate) <= this.endDate && game.stats.hms >= 2000;
    }
}

// Y2 Anniversary Event | Jan 6 - Jan 19
// Y2 Lunar New Year Event | Feb 4 - Feb 17
// Y2 Egg Hunt | April 2 - April 15
// Y2 Pride Event | Jun 1 - Jun 14
// Y2 Hot Hot Summer Event | Jul 28 - Aug 10
// Y1 Shgabb The Witch Event | Oct 28 - Nov 17
// Y2 Christmas Event | Dec 15 - Dec 28

var forceEvent = "none"; // cheat to test an event

const events = {
    anniversary: new LimitedEvent(1, "anniversary", "Anniversary Event",
        "Celebrate the anniversary of Shgabb Clicker! During the event, all Shgabb production is tripled, and Artifacts are 50% easier to find. Click to bake a Cake - up to 15 000 times - after 10 000 clicks it's done and can be eaten. After eating a Cake, you get x5 click speed, x10 Shgabb production and x3 Gem Chance for three minutes. Get 3 PFPs, 3 Banners and 2 Frames to celebrate!",
        106, 119, "renderAnniversary",
        {
            pfps: [404, 405],
            bans: [421, 422, 423],
            frames: [403, 404]
        }),

    lunar: new LimitedEvent(2, "lunar", "Lunar New Year Event",
        "Celebrate the Chinese New Year, or, Lunar New Year, with us. x8 Shgabb production. Earn Qian by clicking (with a chance every 100th click) and spend them on 8 different offers. You can get 3 PFPs, 3 Banners and 2 Frames, and also find 5 exclusive Lore Pages and unlock them with Red Envelopes.",
        204, 217, "renderLunar",
        {
            pfps: [406, 407, 408],
            bans: [424, 425, 426],
            frames: [405, 406]
        }),
    
    egg: new LimitedEvent(3, "egg", "Egg Hunt", 
        "The green bunnies are on the run and it's time to find their eggs! Celebrate the beginning of Spring and the joy of the hunt with this event. Find eggs that are hiding in the game, click to collect, and buy prizes! They include 6 PFPs, 2 Banners and 2 Frames.",
        402, 415, "renderEgg", 
        {
            pfps: [409, 410, 411, 412, 413, 414],
            bans: [427, 428],
            frames: [407, 408]
        }),
    
    pride: new LimitedEvent(4, "pride", "Pride Event", 
        "Happy pride month! Spread love and happiness! x10 Shgabb production during the event.",
        601, 614, "renderPride", 
        {
            pfps: [415, 416, 417],
            bans: [400, 401, 402, 403, 404, 405, 406, 407, 408, 409],
            frames: [409, 410, 411]
        }),
    
    summer: new LimitedEvent(5, "summer", "Hot Hot Summer Event", 
        "It's so hot! Don't forget your suncream! x10 Sandwiches and x10 GS! Shorts, the event currency, can be found by clicking with a low chance. Use Heat Mode for faster clicks and more Shorts.",
        728, 810, "renderSummer", 
        {
            pfps: [418, 419, 420],
            bans: [410, 411, 412, 413],
            frames: [412, 413]
        }),
    
    shgabbthewitch: new LimitedEvent(6, "shgabbthewitch", "Shgabb The Witch Event", 
        "It's time for the scary, the painful and the evil things! Find event pages and their Candles by clicking, or equip the buffed-up cursed Artifacts to gain Witch Shgabb, which can be used to create spells with over a dozen different effects! x6 lore pages, x6 page progress and x6 Bags during the event!",
        1028, 1117, "renderShgabbTheWitch", 
        {
            pfps: [421, 422, 423, 424, 425],
            bans: [414, 415, 416, 417],
            frames: []
        }),
    
    christmas: new LimitedEvent(0, "christmas", "Christmas Event", 
        "The festive season is back! Enjoy the experience of opening Gifts again, and find both old and new rewards. Get 4 PFPs, 3 Banners and 3 Frames - very cold stuff! Gifts are earned by clicking, regardless of speed (average 180s per Gift), or 10 can be earned per day from Shgic. Merry christmas and happy holidays everyone!",
        1215, 1228, "renderChristmas", 
        {
            pfps: [400, 401, 402, 426],
            bans: [418, 419, 420],
            frames: [400, 401, 402]
        }),
};

///////////////////////////////////
// ESSENTIAL FUNCTIONS
///////////////////////////////////

function isEvent(eventName) {
    // eventName can be "any" to look if there is *any* event active at all
    // or: directly the name of an event (e. g. christmas)

    if (game.stats.hms < 2000) return false; // not unlocked

    let currentDate = today().substr(4);

    // force cheat
    if (forceEvent != "none") {
        game.sus += 3;
        currentDate = events[forceEvent].startDate;
    }

    // etenv active
    if (game.event != "") {
        stopEtenv();
        if (eventName == "any") return true;
        return game.event == eventName;
    }

    if (eventName != "any") {
        // We are looking for one specific event
        return events[eventName].isActive(currentDate);
    }
    else {
        // Look if there is *any* event
        for (let checkEvent in events) {
            if (events[checkEvent].isActive(currentDate)) return true;
        }
    }

    return false; // none
}

function getCurrentEvent(currentDate = today().substr(4)) {
    // what is the current event?
    // force cheat
    if (forceEvent != "none") {
        game.sus += 3;
        return forceEvent;
    }

    // etenv active
    if (game.event != "") {
        stopEtenv();
        return game.event;
    }

    // look through events
    for (let checkEvent in events) {
        if (events[checkEvent].isActive(currentDate)) return checkEvent;
    }
    return "none";
}

function eventValue(eventName, trueValue, falseValue) {
    if (isEvent(eventName)) return trueValue;
    else return falseValue;
}

function renderCurrentEvent() {
    if (getCurrentEvent() == "none") return false;
    events[getCurrentEvent()].render();
}

function unlockedEtenvs() {
    return game.stats.hms >= 10000;
}

function useEtenv(choice) {
    if (unlockedEtenvs() && game.event == "" && game.etenvs > 0 && game.gems >= 10000) {
        game.event = choice;

        game.eventd = today();
        game.eventh = new Date().getUTCHours(); // to make it 24h

        game.etenvs -= 1;
        game.gems -= 10000;

        statIncrease("events", 1);

        updateUI();
        renderShbookEvent();
        updateBG();
    }
}

function stopEtenv() {
    // end etenv fake event
    if (game.event != "" && 
        (parseInt(today()) > parseInt(game.eventd + 1) || // it's been a while
        (parseInt(today()) > parseInt(game.eventd) && new Date().getUTCHours() > parseInt(game.eventh)))) { // same day
        game.event = ""; // you only get to have fun for 24 hours

        updateUI();
        renderShbookEvent();
        updateBG();
    }
}

function getCosmetic(typeID) {
    // v3.7's new, random, consistent system
    // typeID = type and ID, like b409
    if (typeID.substr(0, 1) == "p") return getPFPByID(typeID.substr(1));
    if (typeID.substr(0, 1) == "b") return getBannerByID(typeID.substr(1));
    if (typeID.substr(0, 1) == "f") return getFrameByID(typeID.substr(1));
}

function getEventRewards(event, type = "all") {
    // v3.7's new, random, consistent system
    // grabs rewards (of a type or all) for an event, does not give
    let eventRewards = [];
    let types = ["pfps", "bans", "frames"];

    for (let t in types) {
        if (type == "all" || type == types[t]) {
            for (let r in events[event].cosmetics[types[t]]) {
                eventRewards.push(["p", "b", "f"][t] + events[event].cosmetics[types[t]][r]);
            }
        }
    }

    return eventRewards;
}

function hasEventRewards(event, type = "all") {
    // v3.7's new, random, consistent system
    // see if you have ALL the possible rewards
    let rew = getEventRewards(event, type);
    for (let t in rew) {
        if (!getCosmetic(rew[t]).isUnlocked()) return false;
    }
    return true;
}

function awardEventReward(event, type = "all") {
    // v3.7's new, random, consistent system
    // gets you a cosmetic that you don't have yet from an event
    // before they all had their own functions and it was messy and different for every event

    // get the rewards that exist
    let possibleRewards = getEventRewards(event, type);
    let unownedRewards = [];

    for (let r in possibleRewards) {
        if (!getCosmetic(possibleRewards[r]).isUnlocked()) unownedRewards.push(possibleRewards[r]);
    }

    // got all?
    if (unownedRewards.length == 0) {
        createNotification("You already have all possible rewards");
        return false;
    }

    // grab a random reward from the array
    let selectedReward = unownedRewards[Math.floor(Math.random() * unownedRewards.length)];
    
    // award it
    selectedReward = getCosmetic(selectedReward);
    selectedReward.eventAward();
}

///////////////////////////////////
// ALL THE EVENTS
///////////////////////////////////

////////////////////////////////////////////////////////////// event functions below
// Christmas Event
///////////////////////////////////
var previousGiftText = "";

function renderChristmas() {
    let collectedPages = calcCollectedPages(3);

    let render = "<h3>Christmas Event (Year 2)</h3><br /><b>December 15th - December 28th</b>";
    render = render + "<br />" + events.christmas.description;


    render = render + "<br />" + cImg("gift") + game.gifts + " Gifts";
    render = render + "<br />" + cImg("memorySnowflake") + (getLoreByID(game.loreSel).source == 3 ? game.loreP : 0) + " Memory Snowflakes (" + collectedPages + "/5 Pages)";

    render = render + `<br /><br />
        <button class='grayButton' style='margin-right: 20px' onclick='openGifts(1)'>Open 1 Gift</button>
        <button class='grayButton' style='margin-right: 20px' onclick='openGifts(10)'>Open 10 Gifts</button>
        <button class='grayButton' onclick='openGifts(100)'>Open 100 Gifts</button>`;

    render = render + "<br /><br />" + previousGiftText;

    ui.eventRender.innerHTML = render;
}

function openGifts(amount) {
    if (game.gifts < amount) {
        return false;
    }
    game.gifts -= amount;
    checkAchievement(72);

    // Cosmetic 2% - Gems 18% - SW 40% - Shgabb 40%
    // giftContents: gems / sw / shgabb / cosmetic
    let giftContents = [0, 0, 0, 0];

    for (ogi = 0; ogi < amount; ogi++) {
        let random = Math.random();
        if (random < 0.02 && !game.evpfps.includes(400)) {
            createNotification("Received a Christmas PFP");
            giftContents[3] += 1;
            game.evpfps.push(400);
        }
        else if (random < 0.02 && !game.evpfps.includes(401)) {
            createNotification("Received a Christmas PFP");
            giftContents[3] += 1;
            game.evpfps.push(401);
        }
        else if (random < 0.02 && !game.evpfps.includes(402)) {
            createNotification("Received a Christmas PFP");
            giftContents[3] += 1;
            game.evpfps.push(402);
        }
        else if (random < 0.02 && !game.evpfps.includes(426)) {
            createNotification("Received a Christmas PFP");
            giftContents[3] += 1;
            game.evpfps.push(426);
        }
        else if (random < 0.02 && !game.evbans.includes(418)) {
            createNotification("Received a Christmas Banner");
            giftContents[3] += 1;
            game.evbans.push(418);
        }
        else if (random < 0.02 && !game.evbans.includes(419)) {
            createNotification("Received a Christmas Banner");
            giftContents[3] += 1;
            game.evbans.push(419);
        }
        else if (random < 0.02 && !game.evbans.includes(420)) {
            createNotification("Received a Christmas Banner");
            giftContents[3] += 1;
            game.evbans.push(420);
        }
        else if (random < 0.02 && !game.evframes.includes(400)) {
            createNotification("Received a Christmas Frame");
            giftContents[3] += 1;
            game.evframes.push(400);
        }
        else if (random < 0.02 && !game.evframes.includes(401)) {
            createNotification("Received a Christmas Frame");
            giftContents[3] += 1;
            game.evframes.push(401);
        }
        else if (random < 0.02 && !game.evframes.includes(402)) {
            createNotification("Received a Christmas Frame");
            giftContents[3] += 1;
            game.evframes.push(402);
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

    previousGiftText = "Opened " + amount + (amount == 1 ? " Gift" : " Gifts") + "! Content: " + (shgabbAmount != 0 ? fn(shgabbAmount) + " Shgabb" : "") + (sandwichAmount != 0 ? ", " + fn(sandwichAmount) + " Sandwiches" : "") + (giftContents[0] != 0 ? ", " + giftContents[0] + " Gems" : "") + (giftContents[3] != 0 ? ", " + giftContents[3] + " Cosmetics" : "");
    createNotification(previousGiftText);

    renderCurrentEvent();
}

////////////////////////////////////////////////////////////// event functions below
// Anniversary Event
///////////////////////////////////
var cakeDuration = 0;

function renderAnniversary() {
    let collectedPages = calcCollectedPages(4);

    // SAVE EDITING
    if (!game.evbans.includes(423) && new Date().getYear() + 1900 == 2025 && isEvent("anniversary")) game.evbans.push(423); // free banner for everyone in the second year
    if (!game.evpfps.includes(403)) { // give PFPs to those who played in the first year
        if (game.ach.includes(77)) game.evpfps.push(403);
        if (game.ach.includes(78)) game.evpfps.push(404);
        if (game.ach.includes(79)) game.evpfps.push(405);
    }

    // HEADER AND DESCRIPTION
    let render = "<h3>Anniversary Event (Year 2)</h3><b>January 6th - January 19th</b>";
    render = render + "<br />" + events.anniversary.description;
    render = render + "<br />" + cImg("birthdayCandle") + (getLoreByID(game.loreSel).source == 4 ? game.loreP : 0) + " Birthday Candles (" + collectedPages + "/5 Pages)";

    // CAKE
    render = render + "<br /><h3>Cake</h3>";
    render = render + "<img class='cake' id='eventCake' src='images/cake.png'>";
    render = render + "<progress id='cakeBar' min='0' max='100' value='0'></progress> <br />";

    if (cakeDuration <= 0) render = render + "Cake Progress: " + game.cakeProgress + (game.cakeProgress >= 10000 ? "/15000" : "/10000");
    else render = render + "Cake Duration: " + cakeDuration.toFixed(0) + "s<br />x10 Shgabb! x5 Faster Clicks! x3 Gem Chance!";
    if (game.cakeProgress >= 10000) render = render + "<br /><button class='grayButton' onclick='eatCake()'>Eat Cake</button>";

    // FINISH
    ui.eventRender.innerHTML = render;

    document.getElementById("eventCake").style.filter = "brightness(" + Math.min(100, game.cakeProgress / 100) + "%)";
    document.getElementById("cakeBar").value = Math.min(100, game.cakeProgress / 100);
}

function eatCake() {
    if (game.cakeProgress < 10000) return false;

    game.cakeProgress -= 10000;
    cakeDuration = 180;
    statIncrease("cakes", 1);

    if (game.evpfps.includes(403)) {
        // first cake is guaranteed to give the first PFP, after that, this happens:
        if (Math.random() < 0.33 && !game.evpfps.includes(404)) game.evpfps.push(404);
        else if (Math.random() < 0.33 && !game.evpfps.includes(405)) game.evpfps.push(405);
        else if (Math.random() < 0.33 && !game.evbans.includes(421)) game.evbans.push(421);
        else if (Math.random() < 0.33 && !game.evbans.includes(422)) game.evbans.push(422);
        else if (Math.random() < 0.33 && !game.evbans.includes(423)) game.evbans.push(423);
        else if (Math.random() < 0.33 && !game.evframes.includes(403)) game.evframes.push(403);
        else if (Math.random() < 0.33 && !game.evframes.includes(404)) game.evframes.push(404);
    }
    
    renderCurrentEvent();
}

function cakeValue(trueValue, falseValue) {
    if (cakeDuration > 0) return trueValue;
    else return falseValue;
}

////////////////////////////////////////////////////////////// event functions below
// Lunar New Year Event
///////////////////////////////////
var lunarAntiCooldown = 0;
var luck = 0;

function renderLunar() {
    let collectedPages = calcCollectedPages(5);

    let render = "<h3>Lunar New Year Event (Year 2)</h3><br /><b>February 4th - February 17th</b>";
    render = render + "<br />" + events.lunar.description;
    render = render + "<br />" + cImg("qian") + game.qian + " Qian";
    render = render + "<br />" + cImg("redEnvelope") + (getLoreByID(game.loreSel).source == 5 ? game.loreP : 0) + " Red Envelopes (" + collectedPages + "/5 Pages)<br /><br />";

    if (!(game.evpfps.includes(406) && game.evpfps.includes(407) && game.evpfps.includes(408)
        && game.evbans.includes(424) && game.evbans.includes(425) && game.evbans.includes(426)
        && game.evframes.includes(405) && game.evframes.includes(406))) {
        render = render + "<button class='chineseOffer' onclick='useQian(1)'>Buy a Cosmetic!<br/>188 " + cImg("qian") + "</button>";
    }
    else checkAchievement(184);;

    if (!game.ach.includes(92)) render = render + "<button class='chineseOffer' onclick='useQian(2)'>Permanent x2 Qian!<br/>96 " + cImg("qian") + "</button>";

    render = render + "<br /><br /><button class='chineseOffer' onclick='useQian(3)'>Instant Faster Shgabb boost! (1 minute)<br/>26 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(4)'>Instant More Crits boost! (3 minutes)<br/>8 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(5)'>Instant Stronger Auto boost! (5 minutes)<br/>8 " + cImg("qian") + "</button>";

    render = render + "<br /><br /><button class='chineseOffer' onclick='useQian(6)'>Get 3 Gems!<br/>3 " + cImg("qian") + "</buttons>";
    render = render + "<button class='chineseOffer' onclick='useQian(7)'>Reset the click cooldown and the next 8 clicks have no cooldown!<br/>6 " + cImg("qian") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useQian(8)'>Luck!<br/>36 " + cImg("qian") + "</button>";

    ui.eventRender.innerHTML = render;
}

function useQian(offerNR) {
    switch (offerNR) {
        case 1:
            // buy PFP
            if (game.qian < 188) {
                createNotification("Not enough Qian!");
                return false;
            }

            let availableCosmetics = [];
            if (!game.evpfps.includes(406)) availableCosmetics.push("pfp406");
            if (!game.evpfps.includes(407)) availableCosmetics.push("pfp407");
            if (!game.evpfps.includes(408)) availableCosmetics.push("pfp408");
            if (!game.evbans.includes(424)) availableCosmetics.push("ban424");
            if (!game.evbans.includes(425)) availableCosmetics.push("ban425");
            if (!game.evbans.includes(426)) availableCosmetics.push("ban426");
            if (!game.evframes.includes(405)) availableCosmetics.push("fra405");
            if (!game.evframes.includes(406)) availableCosmetics.push("fra406");

            if (availableCosmetics.length == 0) {
                // has all
                createNotification("You already own all of these cosmetics");
                checkAchievement(184);
                return false;
            }

            let selectedCosmetic = availableCosmetics[Math.floor(availableCosmetics.length * Math.random())]

            if (selectedCosmetic == "pfp406") game.evpfps.push(406);
            else if (selectedCosmetic == "pfp407") game.evpfps.push(407);
            else if (selectedCosmetic == "pfp408") game.evpfps.push(408);
            else if (selectedCosmetic == "ban424") game.evbans.push(424);
            else if (selectedCosmetic == "ban425") game.evbans.push(425);
            else if (selectedCosmetic == "ban426") game.evbans.push(426);
            else if (selectedCosmetic == "fra405") game.evframes.push(405);
            else if (selectedCosmetic == "fra406") game.evframes.push(406);
            else return false; // this shouldn't happen, but just in case

            // bought one of them
            game.qian -= 888;
            createNotification("Bought Cosmetic for 888 Qian");

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

function clickLunar(clickButtonMulti) {
    if (isEvent("lunar")) {
        if (game.stats.clicks % 100 == 0 && Math.random() < 0.8) {
            // every 100th click an 80% chance, ~120 clicks per qian drop, ~50 clicks per qian (if you bought the upgrade)
            let amount = (game.ach.includes(92) ? 2 : 1) * clickButtonMulti;
            if (Math.random() < (1 / 8)) amount = 8;
            if ((game.qian + amount) % 10 == 4) amount += 1;

            game.qian += amount;
            statIncrease("qian", amount);
        }
    } }

function applyLuck(div) {
    if (luck < 0) return 1;
    return (luck / div) + 1;
}

////////////////////////////////////////////////////////////// event functions below
// Egg Hunt Event
///////////////////////////////////
var eggUpgrade = "";
var eggNumber = 1;
var eggTime = 10;

function renderEgg() {
    let collectedPages = calcCollectedPages(6);

    let render = "<h3>Egg Hunt Event (Year 2)</h3><br /><b>April 2nd - April 15th</b>";
    render = render + "<br />" + events.egg.description;
    render = render + "<br />" + cImg("egg") + game.eggs + " Eggs";
    render = render + "<br />" + cImg("basket") + (getLoreByID(game.loreSel).source == 6 ? game.loreP : 0) + " Baskets (" + collectedPages + "/5 Pages)<br /><br />";


    if (!game.evpfps.includes(414)) render = render + "<br /><br /><button class='chineseOffer' onclick='useEggs(1)'>Buy an Easter PFP!<br/>50 " + cImg("egg") + "</button>";
    if (!game.evframes.includes(408)) render = render + "<button class='chineseOffer' onclick='useEggs(5)'>Buy an Easter Banner or Frame!<br/>50 " + cImg("egg") + "</button>";
    render = render + "<br /><br /><button class='chineseOffer' onclick='useEggs(2)'>Guaranteed Common Artifact!<br/>10 " + cImg("egg") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useEggs(3)'>Guaranteed Rare Artifact!<br/>25 " + cImg("egg") + "</button>";
    render = render + "<button class='chineseOffer' onclick='useEggs(4)'>Guaranteed Epic Artifact!<br/>100 " + cImg("egg") + "</button>";

    ui.eventRender.innerHTML = render;
}

function refreshEgg() {
    let allUpgrades = Object.assign({}, shgabbUpgrades, sandwichUpgrades, goldenShgabbUpgrades, ameliorerUpgrades, bagUpgrades, copperShgabbUpgrades, bananaUpgrades);
    let randomNumber = Math.floor(Math.random() * Object.keys(allUpgrades).length - 1);

    eggUpgrade = Object.keys(allUpgrades)[randomNumber];
    eggNumber = Math.ceil(Math.random() * 4);
}

function clickEgg() {
    doesUnlevel = true;
    eggUpgrade = "";

    createNotification("Egg found");
    game.eggs += 1;
    statIncrease("eggs", 1);

    renderCurrentEvent();
}

function useEggs(offerNR) {
    switch (offerNR) {
        case 1:
            // buy PFP
            if (game.eggs < 50) {
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
            game.eggs -= 50;
            createNotification("Bought PFP for 50 Eggs");

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
        case 5:
            // buy banner or frame
            if (game.eggs < 50) {
                createNotification("Not enough Eggs!");
                return false;
            }

            if (!game.evbans.includes(427)) {
                game.evbans.push(427);
            }
            else if (!game.evframes.includes(407)) {
                game.evframes.push(407);
            }
            else if (!game.evbans.includes(428)) {
                game.evbans.push(428);
            }
            else if (!game.evframes.includes(408)) {
                game.evframes.push(408);
            }
            else {
                // has all
                createNotification("You already own these Cosmetics!");
                return false;
            }
            // bought one of them
            game.eggs -= 50;
            createNotification("Bought Cosmetic for 50 Eggs");

            break;
    }

    checkAchievement(112);
    renderCurrentEvent();
}

////////////////////////////////////////////////////////////// event functions below
// Pride Event
///////////////////////////////////
var shgaybbMode = false;
var shgaybbFound = "";

function renderPride() {
    let render = "<h3>Pride Event (Year 2)</h3><br /><b>June 1st - June 14th</b>";
    render = render + "<br />" + events.pride.description;
    render = render + "<br />Press the button below to activate Shgaybb Mode. Clicking will take at least 2 seconds, and have a chance of finding semi-random Shgabbs. Find the same pair twice to gain its reward: one of 10 Banners. 3 PFPs and 3 Banners can also be found. Getting Pan Shgabb second counts as a joker, it works with anyone. Every couple found gives 20 Gems.";
    render = render + "<br /><button class='grayButton' onclick='toggleShgaybbMode()'>" + (shgaybbMode ? "Disable Shgaybb Mode" : "Enable Shgaybb Mode") + "</button>";

    ui.eventRender.innerHTML = render;
}

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

    if (Math.random() < 1 / 3) {
        let seed = Math.ceil(game.stats_today.playTime * game.stats.clicks) % shgaybbList.length;

        if (shgaybbFound == "") {
            // first of the couple
            shgaybbFound = shgaybbList[seed];
            createNotification("Found: " + shgaybbFound + " Shgabb");
        }
        else if (shgaybbFound == shgaybbList[seed] || shgaybbList[seed] == "Pan") {
            // second -> couple found
            createNotification("Couple found! " + shgaybbFound + " Shgabb");
            statIncrease("couples", 1);

            game.gems += 20;
            statIncrease("tgems", 20);

            // award the reward
            let foundID = shgaybbID();
            if (foundID != 999) {
                // one of the 10 banners
                if (!game.evbans.includes(foundID)) game.evbans.push(foundID);
                else createNotification("You already own this reward...");
            }
            else {
                // give reward
                awardPrideReward(seed);
            }

            shgaybbFound = "";
            //shgaybbMode = false;
        }
        else {
            // second, but not fitting
            createNotification("Found: " + shgaybbList[seed] + " Shgabb. Not a couple... forever alone...");
            shgaybbFound = "";
            //shgaybbMode = false;
        }
    }
}

function awardPrideReward(seed, repeat = false) {
    // one of the 3 pfps or 3 frames, random
    seed = seed % 6;

    switch (seed) {
        case 0:
            if (!game.evpfps.includes(415)) {
                game.evpfps.push(415);
                break;
            }
            else seed += 1;
        case 1:
            if (!game.evpfps.includes(416)) {
                game.evpfps.push(416);
                break;
            }
            else seed += 1;
        case 2:
            if (!game.evpfps.includes(417)) {
                game.evpfps.push(417);
                break;
            }
            else seed += 1;
        case 3:
            if (!game.evframes.includes(409)) {
                game.evframes.push(409);
                break;
            }
            else seed += 1;
        case 4:
            if (!game.evframes.includes(410)) {
                game.evframes.push(410);
                break;
            }
            else seed += 1;
        case 5:
            if (!game.evframes.includes(411)) {
                game.evframes.push(411);
                break;
            }
            else if (!repeat) {
                // got this one? try again from the start
                awardPrideReward(0, true);
            }
            else {
                createNotification("You already own this reward...");
                break;
            }
    }
}

////////////////////////////////////////////////////////////// event functions below
// Hot Hot Summer Event
///////////////////////////////////
var summerClicks = 0;
var heatMode = false;

function renderSummer() {
    let render = "<h3>Hot Hot Summer</h3><br /><b>July 28th - August 10th</b>";
    render = render + "<br />" + events.summer.description;
    render = render + "<br />" + cImg("shorts") + game.shorts + " Shorts";

    render = render + "<br /><br />Press the button below to activate Heat Mode.<br>Every perfectly timed click reduces the cooldown (up to x3 speed), but clicking too slow resets it, and clicking too fast causes you to overheat.<br>At a high speed, you can find Shorts at a 10x higher rate.";
    render = render + "<br /><button class='grayButton' onclick='toggleHeatMode()'>" + (heatMode ? "Disable Heat Mode" : "Enable Heat Mode") + "</button>";
    render = render + "<br />" + summerClicks + " clicks<br />" + calcShortsChance().toFixed(2) + "% Shorts chance";

    if (getCooldown() <= 0.5 && !hasEventRewards("summer", "pfps")) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(1)'>#1 Buy a PFP<br/>80 " + cImg("shorts") + "</button>";
    if (getCooldown() >= 25 && !hasEventRewards("summer", "bans")) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(2)'>#2 Buy a Banner<br/>80 " + cImg("shorts") + "</button>";
    if (getCooldown() == 5 && !hasEventRewards("summer", "frames")) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(3)'>#3 Buy a Frame<br/>80 " + cImg("shorts") + "</button>";

    if (getCooldown() <= 0.5) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(4)'>#4 Instant Faster Shgabb boost! (1 minute)<br/>60 " + cImg("shorts") + "</button>";
    if (getCooldown() >= 25) render = render + "<br /><br /><button class='chineseOffer' onclick='useShorts(5)'>#5 Reset the click cooldown and the next 10 clicks have no cooldown!<br/>40 " + cImg("shorts") + "</button>";

    if (getCooldown() <= 1) render = render + "<br /><br /><button onclick='useShorts(6)'>" + getArtifact(313).render(false) + "<div class='chineseOffer'>#6<br/>200 " + cImg("shorts") + "</div></button>";
    if (getCooldown() >= 5) render = render + "<br /><br /><button onclick='useShorts(7)'>" + getArtifact(200).render(false) + "<div class='chineseOffer'>#7<br/>100 " + cImg("shorts") + "</div></button>";

    ui.eventRender.innerHTML = render;
}

function calcShortsChance() {
    return (0.1 + (summerClicks * 0.01)) * (summerClicks >= 200 ? 10 : 1);
}

function toggleHeatMode() {
    heatMode = !heatMode;
    summerClicks = 0;
    renderCurrentEvent();
}

function useShorts(offerNR) {
    switch (offerNR) {
        case 1:
            // PFP offer
            if (game.shorts < 80) {
                createNotification("Not enough Shorts!");
                return false;
            }
            if (hasEventRewards("summer", "pfps")) {
                // has all
                createNotification("You already own these PFPs!");
                return false;
            }
            // buy one
            awardEventReward("summer", "pfps");
            game.shorts -= 80;
            createNotification("Bought PFP for 80 Shorts");
            break;
        case 2:
            // Banner offer
            if (game.shorts < 80) {
                createNotification("Not enough Shorts!");
                return false;
            }
            if (hasEventRewards("summer", "bans")) {
                // has all
                createNotification("You already own these Banners!");
                return false;
            }
            // buy one
            awardEventReward("summer", "bans");
            game.shorts -= 80;
            createNotification("Bought Banner for 80 Shorts");
            break;
        case 3:
            // Frame offer
            if (game.shorts < 80) {
                createNotification("Not enough Shorts!");
                return false;
            }
            if (hasEventRewards("summer", "frames")) {
                // has all
                createNotification("You already own these Frames!");
                return false;
            }
            // buy one
            awardEventReward("summer", "frames");
            game.shorts -= 80;
            createNotification("Bought Frame for 80 Shorts");
            break;
        case 4:
            // instant faster shgabb
            if (game.shorts < 60) return false;
            game.shorts -= 60;

            currentBoost = "fasterShgabb"
            adTime = 60;
            adMax = 60;

            statIncrease("ads", 1);
            game.stats.wads.fs += 1;

            break;
        case 5:
            // click cooldown thing
            if (game.shorts < 40 || lunarAntiCooldown == 10) return false;
            game.shorts -= 40;

            game.clickCooldown = 0;
            clickCooldown = 0;
            lunarAntiCooldown = 10;

            break;
        case 6:
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
        case 7:
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

////////////////////////////////////////////////////////////// event functions below
// Shgabb The Witch Event
///////////////////////////////////
var witchesSpent = [0, 0, 0, 0]; // total (up to 10), virtue, herbs, odor
var cursedArtifacts = [0, 0, 0, 0, 0, 0]; // six
var recentSpellText = "";

function calcCollectedPages(type) {
    let collectedPages = 0;
    for (let lored in game.lore) {
        if (getLoreByID(game.lore[lored]).source == type) collectedPages++;
    }
    return collectedPages;
}

function renderShgabbTheWitch() {
    let collectedPages = calcCollectedPages(2);

    let render = "<h3>Shgabb The Witch</h3><br /><b>October 28th - November 17th</b>";
    render = render + "<br />" + events.shgabbthewitch.description;

    render = render + "<br />" + cImg("witchshgabb") + game.witchshgabb + " Witch Shgabb";
    render = render + "<br />" + cImg("candle") + (getLoreByID(game.loreSel).source == 2 ? game.loreP : 0) + " Candles (" + collectedPages + "/10 Pages)";

    render = render + "<br /><br /><h3>Witch Spells</h3>";
    render = render + "<br />Every spell needs at least one ingredient, and can have up to 10. Every added ingredient costs 1 Witch Shgabb. Select the ingredient(s) you want, then cast the spell.";
    render = render + "<br />Spell density: " + witchesSpent[0] + "/10";

    render = render + "<br /><button onclick='spendWitches(1)' class='grayButton'><b>Push Virtue (" + witchesSpent[1] + "/10)</b><br />Increases chance of receiving a more positive effect</button>";
    render = render + "<br /><button onclick='spendWitches(2)' class='grayButton'><b>Defensive Herbs (" + witchesSpent[2] + "/10)</b><br />Decreases chance of negative effect</button>";
    render = render + "<br /><button onclick='spendWitches(3)' class='grayButton'><b>Hair Odor (" + witchesSpent[3] + "/10)</b><br />Increases chance of getting cosmetics</button>";
    render = render + "<br /><button onclick='castSpell()' class='grayButton'><b>Cast Spell</b><br />Prove your witchery skills!</button>";

    render = render + "<br /><br />" + recentSpellText;


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

    recentSpellText = "";

    // Random effect
    if (Math.random() * 100 < (witchesSpent[3] * 2) + (witchesSpent[1] / 2.5)) {
        // Cosmetics
        // Base chance: 0%, +2% per Odor, +0.4% per Virtue
        recentSpellText = recentSpellText + "The spell contains cosmetic effects:" + "<br />";
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

                recentSpellText = recentSpellText + "New Profile Banner unlocked!" + "<br />";
                createNotification("New Profile Banner unlocked!");
            }
            else {
                game.evpfps.push(randomlySelected);

                recentSpellText = recentSpellText + "New PFP unlocked!" + "<br />";
                createNotification("New PFP unlocked!");
            }
        }
    }
    else if (Math.random() * 100 < (witchesSpent[1] * 2) + 5 + (witchesSpent[2] / 5)) {
        // Very good stuff
        // Base chance: 5%, +2% per Virtue, +0.2% per Herbs
        recentSpellText = recentSpellText + "The spell contains holy effects:" + "<br />";
        createNotification("The spell contains holy effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.2) {
            effectAmount++;
            game.gems += 80;
            statIncrease("tgems", 80);

            recentSpellText = recentSpellText + "+80 Gems" + "<br />";
            createNotification("+80 Gems");
        }
        if (Math.random() <= 0.3) {
            effectAmount++;
            let shgabbAmount = new Decimal(firstGemOfferWorth()).mul(32).mul(witchesSpent[0] * witchesSpent[1]).mul(game.upgradeLevels.deepMiner + 1).ceil();

            game.shgabb = game.shgabb.add(shgabbAmount);
            //statIncrease("shgabb", shgabbAmount); DO NOT!!!

            recentSpellText = recentSpellText + "+" + fn(shgabbAmount) + " Shgabb" + "<br />";
            createNotification("+" + fn(shgabbAmount) + " Shgabb");
        }
        if (Math.random() <= 0.05) {
            effectAmount++;

            game.chenga += 5;
            statIncrease("chenga", 5);

            recentSpellText = recentSpellText + "+5 Chengas" + "<br />";
            createNotification("+5 Chengas");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            cursedArtifacts = [0, 0, 0, 0, 0, 0];

            recentSpellText = recentSpellText + "Curses have been removed from Artifacts." + "<br />";
            createNotification("Curses have been removed from Artifacts.");
        }
        if (Math.random() <= 0.3 && game.loreP < getLoreByID(game.loreSel).amount) {
            effectAmount++;

            game.loreP++;

            recentSpellText = recentSpellText + "+1 lore page progress" + "<br />";
            createNotification("+1 lore page progress");
        }

        if (effectAmount == 0) {
            recentSpellText = recentSpellText + "Your soul has been blessed." + "<br />";
            createNotification("Your soul has been blessed.");
        }
    }
    else if (Math.random() * 100 < 50 - (witchesSpent[2] * 5) - witchesSpent[1] - (witchesSpent[2] > 0 ? 15 : 0)) {
        // Bad stuff
        // Base chance: 50%, -5% per Herbs, -1% per Virtue
        createNotification("The spell contains evil effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.1 && game.gems >= 30) {
            effectAmount++;
            game.gems -= 30;

            recentSpellText = recentSpellText + "30 of your Gems were destroyed!" + "<br />";
            createNotification("30 of your Gems were destroyed!");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            game.shgabb = new Decimal(0);

            recentSpellText = recentSpellText + "Your Shgabb is gone!" + "<br />";
            createNotification("Your Shgabb is gone!");
        }
        if (Math.random() <= 0.2 && currentBoost != "none") {
            effectAmount++;
            currentBoost = "none";
            adStatus = "loaded";
            adTime = -1;

            recentSpellText = recentSpellText + "Your ad is gone!" + "<br />";
            createNotification("Your ad is gone!");
        }
        if (Math.random() <= 0.2 && game.a.includes(155)) {
            effectAmount++;
            game.aeqi = [155];

            recentSpellText = recentSpellText + "That's a nice set of equipped Artifacts" + "<br />";
            createNotification("That's a nice set of equipped Artifacts");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            recentSpellText = recentSpellText + "Horrible things are approaching..." + "<br />";
            createNotification("Horrible things are approaching...");
        }


        if (effectAmount == 0) {
            recentSpellText = recentSpellText + "Doom is coming closer..." + "<br />";
            createNotification("Doom is coming closer...");
        }
    }
    else {
        // Good stuff
        recentSpellText = recentSpellText + "The spell contains positive effects:" + "<br />";
        createNotification("The spell contains positive effects:");
        let effectAmount = 0;

        if (Math.random() <= 0.2) {
            effectAmount++;
            game.gems += 10;
            statIncrease("tgems", 10);

            recentSpellText = recentSpellText + "+10 Gems" + "<br />";
            createNotification("+10 Gems");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;
            let shgabbAmount = new Decimal(firstGemOfferWorth()).div(32).mul(witchesSpent[0]).ceil();

            game.shgabb = game.shgabb.add(shgabbAmount);
            //statIncrease("shgabb", shgabbAmount); DO NOT!!!

            recentSpellText = recentSpellText + "+" + fn(shgabbAmount) + " Shgabb" + "<br />";
            createNotification("+" + fn(shgabbAmount) + " Shgabb");
        }
        if (Math.random() <= 0.05) {
            effectAmount++;

            game.chenga++;
            statIncrease("chenga", 1);

            recentSpellText = recentSpellText + "+1 Chenga" + "<br />";
            createNotification("+1 Chenga");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.witchshgabb += 2;
            statIncrease("witchshgabb", 2);

            recentSpellText = recentSpellText + "+2 Witch Shgabb" + "<br />";
            createNotification("+2 Witch Shgabb");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            game.clickCooldown = 0;
            clickCooldown = 0;
            lunarAntiCooldown = 5;

            recentSpellText = recentSpellText + "The click cooldown has been reset and the next 5 clicks have no cooldown." + "<br />";
            createNotification("The click cooldown has been reset and the next 5 clicks have no cooldown.");
        }
        if (Math.random() <= 0.2) {
            effectAmount++;

            luck += 66;

            recentSpellText = recentSpellText + "+66 Luck" + "<br />";
            createNotification("+66 Luck");
        }


        if (effectAmount == 0) {
            recentSpellText = recentSpellText + "You feel happy." + "<br />";
            createNotification("You feel happy.");
        }
    }

    // Reset it
    witchesSpent = [0, 0, 0, 0];
    renderCurrentEvent();
}

/////////////////////////////////// end of event functions