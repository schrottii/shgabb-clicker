// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedBags() {
    return game.stats.hms >= 8000;
}

function calcBags(hmsBefore = game.stats_prestige.hms, hmsAfter = game.upgradeLevels.moreShgabb) {
    // usage: calcBags(before, after)

    return Math.ceil((ameliorerUpgrades.tiersBoostBags.currentEffect() > 0 ? getTotalTiers() : 1)
        * (Math.floor(hmsAfter / 1000) - Math.floor(hmsBefore / 1000))
        * getArtifactsSimpleBoost("bags"))
        * eventValue("shgabbthewitch", 6, 1);
}

function getBags() {
    let bagAmount = calcBags();

    if (game.upgradeLevels.moreShgabb > game.stats_prestige.hms) {
        if (game.upgradeLevels.moreShgabb > game.stats_prestige.hms) game.stats_prestige.hms = game.upgradeLevels.moreShgabb;

        if (unlockedBags()) {
            if (bagAmount > 0) {
                game.bags += bagAmount;
                statIncrease("bags", bagAmount);
                createNotification("+" + bagAmount + " Bags");
            }
        }
    }
}