// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedGS() {
    return game.shgabb >= 1000000 || game.stats.pr > 0;
}

function calcGS() {
    return new Decimal(Math.max(10, (1 + Math.log(1 + game.stats_prestige.shgabb)) * (1 + Math.log(game.stats_prestige.sw + 1))))
        .mul(Math.max(1, Math.floor(shgabbUpgrades.moreShgabb.currentLevel() / 100 - 25)))
        .mul(Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 1000))
        .mul(Math.ceil((1 + shgabbUpgrades.moreShgabb.currentLevel()) / 10000))
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(ameliorerUpgrades.amegsBoost.currentEffect())
        .mul(sandwichUpgrades.twoTwoFive.currentEffect())
        .mul(1 + (getSiliconeBoost() * siliconeShgabbUpgrades.siliconeAffectsGS.currentEffect()))
        .mul(1 + bananaUpgrades.banGS.currentEffect() * calcClaimableBananas())
        .mul(getArtifactsSimpleBoost("gs"))
        .mul(game.upgradeLevels.moreShgabb >= 1000 ? (Math.max(1, Math.min(3, 3 * (game.upgradeLevels.moreShgabb / game.stats.hms)))) : 1)
        .mul(getAchievementBoost())
        .mul(getLoreBoost())
        .mul(bagUpgrades.clicksBoostGS.currentEffect())
        .mul(copperShgabbUpgrades.copGSBoost.currentEffect())
        .mul(new Decimal(1.01).pow(shgabbUpgrades.deepMiner.currentLevel()))
        .mul(eventValue("summer", 10, 1))
        .mul(pearlUpgrades.prlGS.currentEffect())
        .floor();
}

function increaseGS(multi) {
    let amount = calcGS().mul(multi).floor();
    game.gs = game.gs.add(amount);
    statIncrease("gs", amount);
    return amount;
}

function getAchievementBoost() {
    return (game.upgradeLevels.achBExpo > 0 ? (Math.pow(1.02, game.ach.length)) : (1 + (game.ach.length / 50)));
}

function getLoreBoost() {
    return (game.upgradeLevels.loreBoost > 0 ? (Math.pow(1.1, game.lore.length)) : 1 + (game.lore.length / 10));
}

function prestigeButton() {
    if (!isChallenge(0)) {
        if (game.upgradeLevels.moreShgabb < getChallenge(game.aclg).getGoal()) {
            alert("The Challenge is not completed yet! If you prestige, it will be cancelled!");
        }
    }
    if (!settings.confirm || confirm("Do you really want to prestige?")) {
        let amount = increaseGS(1 * getArtifactsSimpleBoost("prestigegs"));
        let hms = game.stats_prestige.hms;

        prestigeGems();
        prestigeBananaSeeds();

        artifactEvent("onPrestige");

        // Reset Shgabb, Sandwiches, some stat stuff
        game.shgabb = new Decimal(0 + (isChallenge(2) ? 0 : getArtifactsSimpleBoost("resetshgabb")));
        game.sw = new Decimal(0);
        hoodGoo = 0;
        //game.gemboost = 1; // 2nd Gem offer

        for (stat in game.stats_prestige) {
            if (game.stats_prestige[stat] != undefined && game.stats_prestige[stat].mantissa != undefined) {
                game.stats_prestige[stat] = new Decimal(0);
            }
            else {
                game.stats_prestige[stat] = 0;
            }
        }
        game.stats_prestige.gs = amount;

        if (game.aclg != 0 && game.upgradeLevels.moreShgabb >= getChallenge(game.aclg).getGoal()) {
            // Challenge completed
            if (game.aclg != 999) game.clg[game.aclg] += 1; // increase tier aka reward n shd
            else {
                game.dclg = [];
                game.dclp += hms;

                let gemAmount = Math.floor(hms / 150);
                game.gems += gemAmount;
                statIncrease("tgems", gemAmount);

                renderChallenges();
                createNotification("Daily Challenge complete: +" + hms + " points, +" + gemAmount + " Gems");
            }
            getNewArtifact(8000);
        }

        // Shgabb and Sandwich Upgrades
        for (let u of Object.keys(shgabbUpgrades)) {
            game.upgradeLevels[u] = 0;
        }
        let keepSWU = ["", "Better Fridge", "1. Upgrade boosts clicks", "Cheese", "Auto Shgabb", "2+2=5", "Meaning Of Life"]
        for (let u of Object.keys(sandwichUpgrades)) {
            if (ameliorerUpgrades.keepSWU.currentLevel() < keepSWU.indexOf(sandwichUpgrades[u].name)) game.upgradeLevels[u] = 0;
        }

        if (ui.ameReset.checked == true) ameReset();

        statIncrease("pr", 1);
        game.stats_prestige.hms = 0;

        game.aclg = 0;
        if (enableThisChallenge != 0) {
            game.aclg = enableThisChallenge;
            enableThisChallenge = 0;
        }

        updateBG();
        updateUpgrades();
        renderChallenges();
        createNotification("Prestiged for " + fn(amount) + " Golden Shgabb!");
    }
}