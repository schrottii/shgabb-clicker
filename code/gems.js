// Game made by Schrottii - editing or stealing is prohibited!

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 100 && !getArtifactByID(200).isEquipped()) {
        game.gems += 1;
        game.stats.tgems += 1;

        createNotification("+1 gem!");
    }
}