// Game made by Schrottii - editing or stealing is prohibited!

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 10 /* CHANGE THIS TO 100 */ && !getArtifactByID(200).isEquipped()) {
        game.gems += 1;
        game.stats.tgems += 1;

        createNotification("+1 gem!");
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
            if (game.gems > 49 && game.a.length < artifacts.length) {
                game.gems -= 50;
                getArtifact(2000);
            }
            break;
    }
    updateArtifacts();
}