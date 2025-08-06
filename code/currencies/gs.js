// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedGS() {
    return game.shgabb >= 1000000 || game.stats.pr > 0;
}

function calcPrestigeGS() {
    return new Decimal(Math.max(10, (1 + Math.log(1 + game.stats_prestige.shgabb)) * (1 + Math.log(1 + game.stats_prestige.sw))))
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
    let amount = calcPrestigeGS().mul(multi).floor();
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
        let runDuration = game.stats_prestige.playTime;

        prestigeGems();
        prestigeBananaSeeds();

        artifactEvent("onPrestige");

        // Reset Shgabb, Sandwiches, some stat stuff
        game.shgabb = new Decimal(0 + (isChallenge(2) ? 0 : getArtifactsSimpleBoost("resetshgabb")));
        game.sw = new Decimal(0);
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
            else completedDaily(hms);
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

        // ame
        if (ui.ameReset.checked == true) {
            ameReset();
            game.amess = 0;
        }
        else if (runDuration >= 900 && ameliorerUpgrades.unstableAMESS.currentLevel() > 0) {
            game.amess += 1;
            game.ame += 1;
            statIncrease("amess", 1);
        }

        statIncrease("pr", 1);
        game.stats_prestige.hms = 0;

        // start a challenge
        game.aclg = 0;
        if (enableThisChallenge != 0) {
            game.aclg = enableThisChallenge;
            enableThisChallenge = 0;
        }

        updateBG();
        updateUpgrades();
        renderChallenges();
        createNotification("Prestiged for " + fn(amount) + " Golden Shgabb");
    }
}

function updatePrestigeButton() {
    if (game.shgabb >= 1000000 && game.stats_prestige.playTime >= 15) {
        let challengeText = "";
        if (!isChallenge(0)) {
            challengeText = "<br />Challenge Goal: " + game.upgradeLevels.moreShgabb + "/" + getChallenge(game.aclg).getGoal();
        }

        let jims = bagUpgrades.prestigeGems.currentLevel() > 0 ? Math.floor(game.stats_prestige.hms / 1000) : 0;
        if (game.aclg == 999) jims += Math.floor(game.stats_prestige.hms / 150);

        ui.prestigeButton.style.display = "inline";
        ui.prestigeButton.innerHTML = "<b>Prestige!</b><br />Lose your Shgabb and Sandwiches, as well as their upgrades, but keep stats and get Golden Shgabb!"
            + "<br />Prestige to get: "
            + fn(calcPrestigeGS().mul(getArtifactsSimpleBoost("prestigegs"))) + " GS"
            + (jims > 0 ? "<br />" + fn(jims) + " Gems" : "")
            + (unlockedBags() ? "<br />" + fn(game.stats_prestige.bags) + " Bags gained" : "")
            + challengeText;
    }
    else {
        ui.prestigeButton.style.display = "none";
    }
}