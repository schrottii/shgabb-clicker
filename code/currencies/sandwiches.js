// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedSandwiches() {
    return game.upgradeLevels.swChance > 0 || game.stats.sw > 0;
}

function calcSandwiches(critMulti = 1) {
    return new Decimal((shgabbUpgrades.moreSw.currentEffect() + 1))
        .mul(getArtifactsSimpleBoost("sw"))
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(ameliorerUpgrades.sandwichBoost.currentEffect())
        .mul(Math.ceil(1 + (critMulti * ameliorerUpgrades.critsAffectSW.currentEffect())))
        .mul(getArtifact(307).isEquipped() ? getArtifact(307).getValue(0) : 1)
        .mul(getChallenge(1).getBoost())
        .mul(eventValue("summer", 10, 1))
        .floor();
}

function getFreezeTime() {
    return getArtifact(210).isEquipped() ? 5 : (60 + sandwichUpgrades.fridge.currentEffect());
}

function freezeTime() {
    sandwichFreezeTime = getFreezeTime();
}

function sandwich() {
    let amount = calcShgabbAuto();
    if (getArtifact(314).isEquipped()) {
        if (hoodGoo > amount) amount = hoodGoo;
        if (Math.random() < 0.05) {
            hoodGoo = 0;
            createNotification("Goo is gone...");
        }
    }

    if (amount > 0) {
        game.shgabb = game.shgabb.add(amount);
        statIncrease("shgabb", amount);
        //createNotification("+" + amount + " shgabb");
    }

    updateUpgrades();
}