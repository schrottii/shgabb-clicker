function unlockedBlackMarket() {
    return game.stats.hms >= 13000;
}

function isBlackMarket() {
    if (!unlockedBlackMarket()) return false;

    if (("" + game.day).substr(-2) == "13") return true;
    else return false;
}


function generateBlackMarket() {
    game.blackMarketContents = [];
    game.blackTicketSources = ["dclp", "dclp", "gems", "gems"];

    // 2 artifacts
    generateBlackMarketPart("arti");

    // 2 pfps
    generateBlackMarketPart("pfp");
}

function generateBlackMarketPart(type) {
    let possible; // available things of a part (ie pfps)
    let added = 0; // how many of a type have been added
    let ID; // ID we lookin at rn

    possible = generateBlackMarketFilter(type);
    let attempts = 0;

    while (added < 2 && possible.length > 0 && attempts < 100) {
        ID = possible[Math.floor(Math.random() * possible.length)];
        if (!game.blackMarketContents.includes(ID) && blackMarketOffers[ID].weight >= Math.random()) {
            game.blackMarketContents.push(ID);
            added++;
        }
        attempts++;
    }
}

function generateBlackMarketFilter(type) {
    let contents = [];
    for (let item in blackMarketOffers) {
        if (blackMarketOffers[item].type == type) contents.push(item); // push the ID
    }
    return contents;
}

function buyBlackTicket(source) {
    if (game.blackTicketSources.includes(source)) {
        let index = game.blackTicketSources.indexOf(source);
        let success = false;

        if (source == "dclp") {
            if (game.dclp >= 100000) {
                game.dclp -= 100000;
                success = true;
            }
        }

        if (source == "gems") {
            if (game.gems >= 10000) {
                game.gems -= 10000;
                success = true;
            }
        }

        if (success) {
            game.blackTickets++;
            statIncrease("blackTickets", 1);
            game.blackTicketSources.splice(index, 1);
            renderBlackMarket();
        }
    }
}

function renderBlackMarket() {
    if (!isBlackMarket()) {
        ui.blackMarketRender.innerHTML = "";
        return false;
    }

    let render = "<h3>Black Market</h3>";

    render += "<h2>Get Black Tickets</h2>";
    render += "Black Tickets: " + game.blackTickets + cImg("blackticket") + "<br />";

    if (game.blackTicketSources.includes("dclp")) render += "<button class='chineseOffer' onclick=buyBlackTicket('dclp')>Buy for 100,000 Daily Challenge Points</button>";
    if (game.blackTicketSources.includes("gems")) render += "<button class='chineseOffer' onclick=buyBlackTicket('gems')>Buy for 10,000 Gems</button>";

    render += "<h2>Spend Tickets</h2>";
    if (game.blackMarketContents.length > 0) {
        for (let ID of game.blackMarketContents) {
            render += blackMarketOffers[ID].render() + "<br />";
        }
    }

    ui.blackMarketRender.innerHTML = render;
    return true;
}

class BlackMarketOffer {
    constructor(ID, weight, cost, type, typeID) {
        this.ID = ID;
        this.weight = weight; // 0.0... - 1
        this.cost = cost;
        this.type = type; // pfp
        this.typeID = typeID;
    }

    render() {
        switch (this.type) {
            case "arti":
                return "<div style='color: black; text-align: center; width: 600px; margin: auto;'>" + getArtifact(this.typeID).render(false) 
                + "<br /> <button onclick=blackMarketOffers[" + this.ID + "].buy()>Buy for " + this.cost + cImg("blackticket") + "</button>"
                + "</div>";
            case "pfp":
                return "<div style='color: black; text-align: center; min-width: 600px;'>" + getPFPByID(this.typeID).render(false)
                + "<br /> <button onclick=blackMarketOffers[" + this.ID + "].buy()>Buy for " + this.cost + cImg("blackticket") + "</button>"
                + "</div>";
        }
    }

    buy() {
        if (game.blackTickets >= this.cost) {
            game.blackTickets -= this.cost;
            game.blackMarketContents.splice(game.blackMarketContents.indexOf("" + this.ID), 1);

            if (this.type == "arti") {
                awardArtifact(this.typeID);
            }
            if (this.type == "pfp") {
                getPFPByID(this.typeID).eventAward();
            }
        }
        renderBlackMarket();
    }
}

const blackMarketOffers = {
    1: new BlackMarketOffer(1, 1, 1, "arti", 113),
    2: new BlackMarketOffer(2, 1, 1, "arti", 114),
    3: new BlackMarketOffer(3, 0.5, 1, "arti", 237),
    4: new BlackMarketOffer(4, 0.2, 2, "arti", 322),

    200: new BlackMarketOffer(200, 1, 2, "pfp", 800),
    201: new BlackMarketOffer(201, 0.5, 3, "pfp", 801),
    202: new BlackMarketOffer(202, 0.8, 2, "pfp", 802),
    203: new BlackMarketOffer(203, 0.3, 2, "pfp", 803),
};