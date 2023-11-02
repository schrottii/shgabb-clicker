// Game made by Schrottii - editing or stealing is prohibited!

function gemsUnlocked() {
    return game.stats.hms >= 500;
}

function getGemChance() {
    return Math.min(10, getArtifactBoost("gemchance")
        * (getArtifactByID(200).isEquipped() ? 0.1 : 1)
        * (currentBoost == "moreGems" ? 3 : 1)
    ) + (getArtifactByID(308).isEquipped() ? getArtifactEffect(308) : 0);
}

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 100 * getGemChance()) {
        let amount = getArtifactBoost("gems");
        if (amount % 1 != 0) {
            let bonusChance = amount % 1;
            amount = Math.floor(amount);
            if (Math.random() < bonusChance) amount += 1;
        }
        game.gems += amount;
        game.stats.tgems += amount;

        frustration = 0;

        createNotification("+" + amount + " gem" + (amount > 1 ? "s" : "") + "!");
    }
    else if (getArtifactByID(308).isEquipped()) {
        frustration += 1;
    }
}

function firstGemOfferWorth() {
    return Math.max(10000, Math.ceil(Math.min(game.shgabb / 2, game.stats.shgabb / 5)));
}

function gemOffer(i) {
    switch (i) {
        case 1:
            if (game.gems > 9) {
                game.gems -= 10;
                let amount = firstGemOfferWorth();
                game.shgabb += amount;
                //game.stats.shgabb += amount;
                //game.stats.shgabbtp += amount;
            }
            break;
        case 2:
            if (game.gems > 19) {
                game.gems -= 20;
                game.gemboost += 1;
            }
            break;
        case 3:
            if (game.gems > 29 /*&& (game.a.length - 1) < artifacts.length - 1*/) {
                game.gems -= 30;
                getArtifact(3000);
                autoSave();
            }
            break;
        case 4:
            if (game.gems >= game.al * 25 && game.al < 8) {
                game.gems -= game.al * 25;
                game.al += 1;
            }
            break;
        case 5:
            if (game.gems >= 49 && !getArtifactByID(game.dgo).isUnlocked()) {
                game.gems -= 50;
                game.a.push(game.dgo)
                createNotification("New Artifact: " + getArtifactByID(game.dgo).name);
                updateArtifacts();

                game.nexgai[getArtifactByID(game.dgo).rarity - 1] = setNextArtifact(getArtifactByID(game.dgo).rarity - 1);
            }
            break;
    }
    updateArtifacts();
}

function renderGemOffers() {
    ui.gemOffer1.innerHTML = "<b>Instant Shgabb</b><br />Spend 10 gems to get<br>" + fn(firstGemOfferWorth()) + " Shgabb immediately!";
    ui.gemOffer2.innerHTML = "<b>Shgabb Boost</b><br />Spend 20 gems to get 100% more Shgabb this prestige!<br>Current: +" + ((game.gemboost - 1) * 100) + "%";
    ui.gemOffer3.innerHTML = "<b>Artifact Gift</b><br />" + ((game.a.length - 1) == artifacts.length - 1 ? "Spend 30 gems for some artifact scrap!<br />(3000x chance)" : "Spend 30 gems for a high chance to get an artifact!<br>(3000x chance)");
    ui.gemOffer4.innerHTML = "<b>Artifact Loadout</b><br />" + (game.al > 7 ? "Not available... you know too much...<br />..." : "Spend " + (game.al * 25) + " gems for another artifact loadout slot!<br>(Max. 8)");
    ui.gemOffer5.innerHTML = "<b>Artifact Offer</b><br />" + (getArtifactByID(game.dgo).isUnlocked() ? "You already own today's artifact! Check back tomorrow!" : "Spend 50 gems to get the following artifact:<br>" + getArtifactByID(game.dgo).render(false));
}