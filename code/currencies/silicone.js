// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function getSiliconeProduction(isClicks = false) {
    return new Decimal(siliconeShgabbUpgrades.moreSilicone.currentEffect())
        .mul(ads.moreSilicone.getCurrentBoost())
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(goldenShgabbUpgrades.moreSilicone2.currentEffect())
        .mul(bagUpgrades.moreSilicone3.currentEffect())
        .mul(ameliorerUpgrades.siliconeBoost.currentEffect())
        .mul(getArtifactsSimpleBoost("si"))
        .mul(getArtifact(161).isEquipped() && !isClicks ? 0 : 1)
        .ceil();
}

function getSiliconeBoost(level = "current") {
    if (level == "current") level = game.upgradeLevels.strongerSilicone;

    return new Decimal(game.si.div(1000).add(1).ln())
        .mul(1 + siliconeShgabbUpgrades.strongerSilicone.effect(level))
        .mul(Math.sqrt(Math.min(game.stats.playTime, 3000000)))
        .mul(getArtifact(304).isEquipped() ? (2 + (getArtifact(304).getLevel() * 1)) : 1)
        .add(1);
}

function renderSiliconeBoost() {
    ui.siliconeBoost.innerHTML = "x" + fn(getSiliconeBoost()) + " Shgabb<br />Playtime boost: " + (game.stats.playTime >= 3000000 ? "MAXED" : (game.stats.playTime / 3000000 * 100).toFixed(1) + "%");
}

function silicone() {
    if (!unlockedSilicone()) return false;
    if (getArtifact(304).isEquipped()) return false;

    let amount = getSiliconeProduction();
    if (amount > 0) {
        game.si = game.si.add(amount);
        statIncrease("si", amount);
        if (getArtifact(312).isEquipped() && Math.random() * applyLuck(100) > 0.9 && currentGems() > 0) game.gems -= 1;
    }

    renderSiliconeBoost();
    updateUpgrades();
}

function unlockedSilicone() {
    return game.shgabb >= 1000000000 || game.stats.si > 0;
}