// Game made by Schrottii - editing or stealing is prohibited!

function gemsUnlocked() {
    return game.stats.hms >= 500;
}

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 100 * getArtifactBoost("gemchance") && !getArtifactByID(200).isEquipped()) {
        let amount = getArtifactBoost("gems");
        if (amount % 1 != 0) {
            let bonusChance = amount % 1;
            amount = Math.floor(amount);
            if (Math.random() < bonusChance) amount += 1;
        }
        game.gems += amount;
        game.stats.tgems += amount;

        createNotification("+" + amount + " gem" + (amount > 1 ? "s" : "") + "!");
    }
}

function firstGemOfferWorth() {
    return Math.max(10000, Math.ceil(Math.min(game.shgabb / 10, game.stats.shgabb / 10)));
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
            if (game.gems > 24) {
                game.gems -= 25;
                game.gemboost += 1;
            }
            break;
        case 3:
            if (game.gems > 49 && (game.a.length - 1) < artifacts.length - 1) {
                game.gems -= 50;
                getArtifact(3000);
                autoSave();
            }
            break;
    }
    updateArtifacts();
}

function renderGemOffers() {
    ui.gemOffer1.innerHTML = "<b>Instant Shgabb</b><br />Spend 10 gems to get " + fn(firstGemOfferWorth()) + " Shgabb immediately!";
    ui.gemOffer2.innerHTML = "<b>Shgabb Boost</b><br />Spend 25 gems to get 100% more Shgabb this prestige! Current: +" + ((game.gemboost - 1) * 100) + "%";
    ui.gemOffer3.innerHTML = "<b>Artifact Gift</b><br />" + ((game.a.length - 1) == artifacts.length - 1 ? "Not available... you know too much..." : "Spend 50 gems for a high chance to get an artifact!");
}