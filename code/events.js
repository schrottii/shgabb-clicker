// Game made by Schrottii - editing or stealing is prohibited!

function isEvent(eventName, all=false) {
    let date = new Date();
    let today = parseInt("" + (date.getUTCMonth().toString().length == 1 ? "0" + date.getUTCMonth() + 1 : date.getUTCMonth() + 1) + (date.getUTCDate().toString().length == 1 ? "0" + date.getUTCDate() : date.getUTCDate()));
    if (all) eventName = "anniversary"; //first event whatever it is, so it goes thru all

    /*
    if (eventName == "anniversary") return true; // used to force event
    else return false;
    */

    // Events below in order (January -> December)
    switch (eventName) {
        case "anniversary":
            // Anniversary Event | Jan 6 - Jan 13
            if (today >= 0106 && today <= 0113 && game.stats.hms >= 2000) return true;
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
}

// Christmas Event

function renderChristmas() {
    let render = "<h3>Christmas Event</h3><br /><b>December 16th - December 30th</b>";
    render = render + "<br />" + cImg("gift") + game.gifts + " Gifts";
    ui.eventRender.innerHTML = render;
}

function renderAnniversary() {
    let render = "<h3>Anniversary Event</h3><br /><b>January 6th - January 13th</b>";
    render = render + "<br />x10 Shgabb production! 50% more Artifacts!";
    //render = render + "<br />" + cImg("gift") + game.gifts + " Gifts";
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

    createNotification("Opened " + amount + (amount == 1 ? " Gift" : " Gifts") + "! Content: " + (shgabbAmount != 0 ? fn(shgabbAmount) + " Shgabb, " : "") + (sandwichAmount != 0 ? fn(sandwichAmount) + " Sandwiches, " : "") + (giftContents[0] != 0 ? giftContents[0] + " Gems, " : ""));
}
