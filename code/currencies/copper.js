// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedCopper() {
    return game.stats.hms >= 10000;
}

function calcCopper() {
    return new Decimal(game.stats.copClicks * (ironUpgrades.ironCopperMiner.currentLevel() > 0 ? game.stats.mineCOP : 1))
        .mul(copperShgabbUpgrades.moreCopper.currentEffect())
        .mul(ameliorerUpgrades.copperBoost.currentEffect())
        .mul(ameliorerUpgrades.tiersBoostCopper.currentEffect())
        .mul(shgabbUpgrades.deepMiner.currentEffect())
        .mul(ironUpgrades.ironCuFe.currentEffect())
        .mul(getArtifactsSimpleBoost("cop"))
        .ceil();
}

function getCopperChance() {
    return copperShgabbUpgrades.copperClickChance.currentEffect()
        * getArtifactsSimpleBoost("copchance");
}

function getCopper(multi = 1) {
    if (typeof (game.cop) == "string") return false;

    if (Math.random() * multi * 100 < getCopperChance()) { // chance to get copper, starts at 1%
        // we get copper. increase copper clicks by 1 (starts at 0)
        statIncrease("copClicks", 1);

        // calculate how much copper we get
        let amount = calcCopper();

        // add it
        game.cop = game.cop.add(amount);
        statIncrease("cop", amount);
    }
}