// Game made by Schrottii - editing or stealing is prohibited!

function gemsUnlocked() {
    return game.stats.hms >= 500;
}

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 100 * getArtifactBoost("gemchance") && !getArtifactByID(200).isEquipped()) {
        let amount = 1 * getArtifactBoost("gems");
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

function gemOffer(i) {
    switch (i) {
        case 1:
            if (game.gems > 9) {
                game.gems -= 10;
                let amount = getProduction() * 600;
                game.shgabb += amount;
                game.stats.shgabb += amount;
                game.stats.shgabbtp += amount;
            }
            break;
        case 2:
            if (game.gems > 24) {
                game.gems -= 25;
                game.gemboost += 1;
            }
            break;
        case 3:
            if (game.gems > 49 && (game.a.length - 1) < artifacts.length) {
                game.gems -= 50;
                getArtifact(3000);
                autoSave();
            }
            break;
    }
    updateArtifacts();
}