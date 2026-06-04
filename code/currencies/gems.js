// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

var previousClickAwardedGem = false;

// GENERAL GEM FUNCTIONS
function unlockedGems() {
    return game.stats.hms >= 500;
}

function getGemChance(cap = 10) {
    if (getArtifact(159).isEquipped()) return 0;

    return (Math.min(cap, getArtifactsSimpleBoost("gemchance")
        * (getArtifact(200).isEquipped() ? 0.1 : 1)
        * ads.moreGems.getCurrentBoost()
        * cakeValue(3, 1)
    ) + (getArtifact(308).isEquipped() ? (getArtifact(308).getEffect() * (getArtifact(200).isEquipped() ? 0.1 : 1)) : 0)) * (previousClickAwardedGem ? ameliorerUpgrades.chainGems.currentEffect() : 1);
}

function getGem(chanceMulti = 1) {
    let amount = 0;

    // Chance to get a gem
    if (Math.random() < 1 / 100 * getGemChance() * applyLuck(100) * chanceMulti) {
        previousClickAwardedGem = true;
        amount = getArtifactsSimpleBoost("gems")
            * Math.ceil(Math.random() * 3); // x1 or x2 or x3 random

        if (amount % 1 != 0) {
            let bonusChance = amount % 1;
            amount = Math.floor(amount);
            if (Math.random() < bonusChance) amount += 1;
        }
        awardGems(amount);
    }
    else {
        // No Gem
        previousClickAwardedGem = false;
    }

    artifactEvent("onGem", { "amount": amount });
}

function awardGems(amount) {
    game.gems += amount;
    statIncrease("tgems", amount);
    createNotification("+AMOUNT Gems", [["AMOUNT", amount], ["s", (amount > 1 ? "s" : "")]]);
}

// GEM OFFERS
class GemOffer {
    constructor(ID, name, description, lockedDesc, unlock, buyreq, price, onClick) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.lockedDesc = lockedDesc;
        this.unlock = unlock;
        this.buyreq = buyreq;
        this.price = price;
        this.onClick = onClick;
    }

    isUnlocked() {
        return this.unlock();
    }

    getDescription() {
        if (this.isUnlocked()) return typeof (this.description) == "function" ? this.description() : this.description;
        return typeof (this.lockedDesc) == "function" ? this.lockedDesc() : this.lockedDesc;
    }

    artifactOfferDescription(g = 0) {
        return (game.dgo[g] < 1 || getArtifact(game.dgo[g]).isUnlocked()) ? "You already own this Artifact. Check back tomorrow!" : ("Spend " + [10, 20, 50][g] + " Gems to get the following Artifact:<br><div style='display: flex; align-items: center; justify-content: center;'>" + getArtifact(game.dgo[g]).render(false));
    }

    getPrice() {
        return typeof (this.price) == "function" ? this.price() : this.price;
    }

    canAfford() {
        return currentGems() >= this.getPrice() && this.buyreq();
    }

    click() {
        this.onClick(this.canAfford()); // needed to re-verify the canAfford
        updateGems();
    }

    render() {
        let affordable = this.canAfford();
        let ren = `<button class="upgrade gemTexture" style="margin: 4px 8px 4px 8px;" onclick="gemOffers[` + (this.ID - 1) + `].click()" id="gemOffer1">`;

        ren += "<b>" + this.name + "</b><br />";
        ren += renderEgg("gemoffers", this.ID) + this.getDescription();
        if (this.isUnlocked() && this.buyreq()) ren += "<br /><div style='width: 60%; text-align: left; background-color: " + (affordable ? "rgb(240, 0, 0, 0.5)" : "rgb(185, 185, 185, 0.3)") + ";'>Cost: " + this.getPrice() + cImg("gem") + "</div>";

        ren += "</button>";
        return ren;
    }
}

const gemOffers = [
    new GemOffer(1, "Instant Shgabb", () => "Spend 10 Gems to get<br>" + fn(firstGemOfferWorth()) + " Shgabb immediately",
        "Unlocked at 1000 More Shgabb",
        () => game.stats.hms >= 1000,
        () => isChallenge(0), 10,
        (afford) => {
            if (afford) {
                game.gems -= 10;
                game.shgabb = game.shgabb.add(firstGemOfferWorth());
                // do not increase stat
            }
        }),
    new GemOffer(2, "Shgabb Boost", () => "Spend 20 Gems to get 25% more Shgabb!<br>Current: +" + fn(game.gemboost * 25) + "%",
        "Unlocked at 1000 More Shgabb",
        () => game.stats.hms >= 1000,
        () => true, 20,
        (afford) => {
            if (!doBuyMax) {
                if (afford) {
                    game.gems -= 20;
                    game.gemboost += 1;
                }
            }
            else {
                // buy max
                let amount = Math.floor(currentGems() / 20);
                game.gems -= 20 * amount;
                game.gemboost += amount;
            }
        }),
    new GemOffer(3, "Artifact Gift", () => (getArtifactAmount() == totalAmountOfArtifacts() ? "Spend 30 Gems for some Artifact Scrap!<br />(3000x chance)" : "Spend 30 Gems for a high chance to get an Artifact!<br>(3000x chance)"),
        "Unlocked at 1500 More Shgabb or 300 total Gems",
        () => game.stats.hms >= 1500 || game.stats.tgems >= 300,
        () => unlockedArtifacts(), 30,
        (afford) => {
            console.log(afford);
            if (afford) {
                game.gems -= 30;
                getNewArtifact(3000, true);
                autoSave();
            }
        }),
    new GemOffer(4, "Artifact Loadout", () => (game.al >= 8 + ameliorerUpgrades.moreLoadouts.currentLevel() ? "Not available... you know too much...<br />..." : "Spend " + (game.al * 25 * (game.al >= 8 ? game.al : 1)) + " Gems for another Artifact loadout slot!<br>(Max. 12)"),
        "Unlocked at 1500 More Shgabb or 300 total Gems",
        () => game.stats.hms >= 1500  || game.stats.tgems >= 300,
        () => unlockedArtifacts() && game.al < 8 + ameliorerUpgrades.moreLoadouts.currentLevel(), () => game.al * 25 * (game.al >= 8 ? game.al : 1),
        (afford) => {
            if (afford) {
                game.gems -= game.al * 25 * (game.al >= 8 ? game.al : 1);
                game.al += 1;
                updateArtifacts();
            }
        }),
    new GemOffer(5, "Artifact Offer", () => gemOffers[4].artifactOfferDescription(0),
        "Unlocked at 1000 More Shgabb",
        () => game.stats.hms >= 1000,
        () => game.dgo[0] > 0 && game.stats.hms >= 1000 && !getArtifact(game.dgo[0]).isUnlocked(), 10,
        (afford) => {
            if (afford) {
                game.gems -= 10;
                awardArtifact(game.dgo[0]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[0]).name]]);

                //game.nexgai[getArtifact(game.dgo).rarity - 1] = setNextArtifact(getArtifact(game.dgo).rarity - 1);
                updateArtifacts();
            }
        }),
    new GemOffer(6, "Artifact Offer", () => gemOffers[5].artifactOfferDescription(1),
        "Unlocked at 1100 More Shgabb",
        () => game.stats.hms >= 1100,
        () => game.dgo[1] > 0 && game.stats.hms >= 1100 && !getArtifact(game.dgo[1]).isUnlocked(), 20,
        (afford) => {
            if (afford) {
                game.gems -= 20;
                awardArtifact(game.dgo[1]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[1]).name]]);

                updateArtifacts();
            }
        }),
    new GemOffer(7, "Artifact Offer", () => gemOffers[6].artifactOfferDescription(2),
        "Unlocked at 1200 More Shgabb",
        () => game.stats.hms >= 1200,
        () => game.dgo[2] > 0 && game.stats.hms >= 1200 && !getArtifact(game.dgo[2]).isUnlocked(), 50,
        (afford) => {
            if (afford ) {
                game.gems -= 50;
                awardArtifact(game.dgo[2]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[2]).name]]);

                updateArtifacts();
            }
        }),
];

function firstGemOfferWorth() {
    return Math.max(10000, Math.ceil(Math.min(game.shgabb.div(2), game.stats.shgabb.div(5))));
}

function gemOffer(i) {
    gemOffers[i].onClick();
    updateGems();
}

function newArtifactOffers() {
    // update artifact offer
    let newDailyArtifact = 100;
    let dgoRar = 3;

    while (newDailyArtifact == 100 && dgoRar > 0) {
        for (a in artifacts) {
            if (artifacts[a].rarity == dgoRar && !getArtifact(artifacts[a].ID).isUnlocked() && game.stats.hms >= artifacts[a].getHMSNeeded() && Math.random() > (1 - (dgoRar / 5))) newDailyArtifact = artifacts[a].ID;
        }
        dgoRar -= 1;
    }
    // common, rare, common-rare-epic random
    game.dgo = [setNextArtifact(1), setNextArtifact(2), newDailyArtifact];
    updateGems();
}

// UPDATE
function renderGemOffers() {
    if (unlockedArtifacts() && game.dgo.length == undefined) newArtifactOffers();

    // gem offers
    let ren = "";
    for (let offer of gemOffers) {
        ren += offer.render();
    }
    ui.gemOffers.innerHTML = ren;
}

function updateGems() {
    if (!unlockedGems()) return false;
    
    ui.gemAmountTotal.innerHTML = cImg("gem") + fn(game.gems) + " Gems (total)";

    // gem storage
    if (unlockedBags()) {
        ui.gemStorageContainer.style.display = "";
        ui.gemStorageDisplay.innerHTML = "Gem Storage: " + cImg("gem") + game.gemb + (game.gems > 0 ? " (" + Math.floor(game.gemb / game.gems * 100) + "%)" : "");
    }
    else ui.gemStorageContainer.style.display = "none";
    
    renderGemOffers();
}

// GEM STORAGE
function gemStorage(type = "grab", amount = 0) {
    game.gemb = parseInt(game.gemb);
    amount = parseInt(amount);

    let newStorage;
    if (type == "grab") newStorage = parseInt(ui.gemStorageAmount.value);

    if (type == "add") newStorage = game.gemb + amount;
    if (type == "sub") newStorage = game.gemb - amount;
    if (type == "addpct") newStorage = game.gemb + Math.floor(game.gems * amount / 100);
    if (type == "subpct") newStorage = game.gemb - Math.floor(game.gems * amount / 100);

    if (isNaN(newStorage) || newStorage < 0) {
        if (type == "grab") ui.gemStorageAmount.value = game.gemb = 0;
    }
    else if (newStorage <= game.gems) {
        game.gemb = newStorage;
    }
    else {
        if (type == "grab") ui.gemStorageAmount.value = game.gemb = game.gems;
    }
    updateGems();
}

function currentGems() {
    // Ignore stored / banked!
    return game.gems - game.gemb;
}

// OTHER
function prestigeGems() {
    if (bagUpgrades.prestigeGems.currentLevel() > 0) {
        let gemAmount = Math.floor(game.stats_prestige.hms / 1000);
        game.gems += gemAmount;
        statIncrease("tgems", gemAmount);
        createNotification("+AMOUNT Gems", [["AMOUNT", gemAmount], ["s", (gemAmount > 1 ? "s" : "")]]);
    }
}