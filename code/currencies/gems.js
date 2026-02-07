// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

var previousClickAwardedGem = false;

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

function firstGemOfferWorth() {
    return Math.max(10000, Math.ceil(Math.min(game.shgabb.div(2), game.stats.shgabb.div(5))));
}

function gemOffer(i) {
    switch (i) {
        case 1:
            if (currentGems() >= 10 && isChallenge(0)) {
                game.gems -= 10;
                game.shgabb = game.shgabb.add(firstGemOfferWorth());
                // do not increase stat yousonofabittthh
            }
            break;
        case 2:
            if (!doBuyMax) {
                if (currentGems() >= 20) {
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
            break;
        case 3:
            if (unlockedArtifacts() && currentGems() >= 30) {
                game.gems -= 30;
                getNewArtifact(3000, true);
                autoSave();
            }
            break;
        case 4:
            if (unlockedArtifacts() && currentGems() >= game.al * 25 * (game.al >= 8 ? game.al : 1) && game.al < 8 + ameliorerUpgrades.moreLoadouts.currentLevel()) {
                game.gems -= game.al * 25 * (game.al >= 8 ? game.al : 1);
                game.al += 1;
                updateArtifacts();
            }
            break;
        case 5:
            if (game.dgo[0] > 0 && game.stats.hms >= 1000 && currentGems() >= 10 && !getArtifact(game.dgo[0]).isUnlocked()) {
                game.gems -= 10;
                awardArtifact(game.dgo[0]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[0]).name]]);

                //game.nexgai[getArtifact(game.dgo).rarity - 1] = setNextArtifact(getArtifact(game.dgo).rarity - 1);
                updateArtifacts();
            }
            break;
        case 6:
            if (game.dgo[1] > 0 && game.stats.hms >= 1100 && currentGems() >= 20 && !getArtifact(game.dgo[1]).isUnlocked()) {
                game.gems -= 20;
                awardArtifact(game.dgo[1]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[1]).name]]);

                updateArtifacts();
            }
            break;
        case 7:
            if (game.dgo[2] > 0 && game.stats.hms >= 1200 && currentGems() >= 50 && !getArtifact(game.dgo[2]).isUnlocked()) {
                game.gems -= 50;
                awardArtifact(game.dgo[2]);
                createNotification("New Artifact: NAME", [["NAME", getArtifact(game.dgo[2]).name]]);

                updateArtifacts();
            }
            break;
    }
    updateGems();
}

function renderGemOffers() {
    ui.gemOffer1.innerHTML = "<b>Instant Shgabb</b><br />Spend 10 Gems to get<br>" + fn(firstGemOfferWorth()) + " Shgabb immediately";
    ui.gemOffer2.innerHTML = "<b>Shgabb Boost</b><br />Spend 20 Gems to get 25% more Shgabb!<br>Current: +" + fn(game.gemboost * 25) + "%";

    ui.gemOffer3.innerHTML = "Unlocked at 1500 More Shgabb or 300 total Gems";
    ui.gemOffer4.innerHTML = "Unlocked at 1500 More Shgabb or 300 total Gems";

    ui.gemOffer5.innerHTML = "Unlocked at 1000 More Shgabb";
    ui.gemOffer6.innerHTML = "Unlocked at 1100 More Shgabb";
    ui.gemOffer7.innerHTML = "Unlocked at 1200 More Shgabb";

    if (unlockedArtifacts()) {
        if (game.stats.hms >= 1500 || game.stats.tgems >= 300) {
            ui.gemOffer3.innerHTML = "<b>Artifact Gift</b><br />" + (getArtifactAmount() == totalAmountOfArtifacts() ? "Spend 30 Gems for some Artifact Scrap!<br />(3000x chance)" : "Spend 30 Gems for a high chance to get an Artifact!<br>(3000x chance)");
            ui.gemOffer4.innerHTML = "<b>Artifact Loadout</b><br />" + (game.al >= 8 + ameliorerUpgrades.moreLoadouts.currentLevel() ? "Not available... you know too much...<br />..." : "Spend " + (game.al * 25 * (game.al >= 8 ? game.al : 1)) + " Gems for another Artifact loadout slot!<br>(Max. 12)");
        }

        if (game.dgo.length == undefined) newArtifactOffers();
        for (let g = 0; g < 3; g++) {
            if (game.stats.hms >= 1000 + (parseInt(g) * 100)) ui["gemOffer" + (parseInt(g) + 5)].innerHTML = "<b>Artifact Offer</b><br />" + ((game.dgo[g] < 1 || getArtifact(game.dgo[g]).isUnlocked()) ? "You already own this Artifact. Check back tomorrow!" : ("Spend " + [10, 20, 50][g] + " Gems to get the following Artifact:<br><div style='display: flex; align-items: center; justify-content: center;'>" + getArtifact(game.dgo[g]).render(false)) + "</div>");
        }
    }

    if (unlockedBags()) {
        ui.gemStorageContainer.style.display = "";
        ui.gemStorageDisplay.innerHTML = "Gem Storage: " + cImg("gem") + game.gemb + " (" + Math.floor(game.gemb / game.gems * 100) + "%)   ";
    }
    else ui.gemStorageContainer.style.display = "none";
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

function gemStorage() {
    let newStorage = ui.gemStorageAmount.value;

    if (isNaN(newStorage) || newStorage < 0) {
        ui.gemStorageAmount.value = game.gemb = 0;
    }
    else if (newStorage < game.gems) {
        game.gemb = newStorage;
    }
    else {
        ui.gemStorageAmount.value = game.gemb = game.gems;
    }
    renderGemOffers();
}

function currentGems() {
    // Ignore stored / banked!
    return game.gems - game.gemb;
}

function updateGems() {
    if (unlockedGems()) {
        renderGemOffers();
    }
}

function prestigeGems() {
    if (bagUpgrades.prestigeGems.currentLevel() > 0) {
        let gemAmount = Math.floor(game.stats_prestige.hms / 1000);
        game.gems += gemAmount;
        statIncrease("tgems", gemAmount);
        createNotification("+AMOUNT Gems", [["AMOUNT", gemAmount], ["s", (gemAmount > 1 ? "s" : "")]]);
    }
}