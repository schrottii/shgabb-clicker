// Game made by Schrottii - editing or stealing is prohibited!

function unlockedGems() {
    return game.stats.hms >= 500;
}

function getGemChance(cap=10) {
    if (getArtifactByID(159).isEquipped()) return 0;

    return Math.min(cap, getArtifactBoost("gemchance")
        * (getArtifactByID(200).isEquipped() ? 0.1 : 1)
        * (currentBoost == "moreGems" ? 3 : 1)
        * cakeValue(3, 1)
    ) + (getArtifactByID(308).isEquipped() ? (getArtifactEffect(308) * (getArtifactByID(200).isEquipped() ? 0.05 : 0.5) ): 0);
}

function getGem() {
    // Chance to get a gem
    if (Math.random() < 1 / 100 * getGemChance() * applyLuck(100)) {
        let amount = getArtifactBoost("gems");
        if (amount % 1 != 0) {
            let bonusChance = amount % 1;
            amount = Math.floor(amount);
            if (Math.random() < bonusChance) amount += 1;
        }
        game.gems += amount;
        statIncrease("tgems", amount);

        frustration = 0;

        createNotification("+" + amount + " Gem" + (amount > 1 ? "s" : "") + "!");
    }
    else if (getArtifactByID(308).isEquipped()) {
        frustration += 1;
    }
}

function firstGemOfferWorth() {
    return Math.max(10000, Math.ceil(Math.min(game.shgabb.div(2), game.stats.shgabb.div(5))));
}

function gemOffer(i) {
    switch (i) {
        case 1:
            if (game.gems > 9 && isChallenge(0)) {
                game.gems -= 10;
                let amount = firstGemOfferWorth();
                game.shgabb = game.shgabb.add(amount);
                // do not increase stat yousonofabittthh
            }
            break;
        case 2:
            if (game.gems > 19) {
                game.gems -= 20;
                game.gemboost += 1;
            }
            break;
        case 3:
            if (unlockedArtifacts() && game.gems > 29) {
                game.gems -= 30;
                getArtifact(3000);
                autoSave();
            }
            break;
        case 4:
            if (unlockedArtifacts() && game.gems >= game.al * 25 && game.al < 8) {
                game.gems -= game.al * 25;
                game.al += 1;
                updateArtifacts();
            }
            break;
        case 5:
            if (unlockedArtifacts() && game.gems >= 49 && !getArtifactByID(game.dgo).isUnlocked()) {
                game.gems -= 50;
                game.a.push(game.dgo)
                createNotification("New Artifact: " + getArtifactByID(game.dgo).name);

                game.nexgai[getArtifactByID(game.dgo).rarity - 1] = setNextArtifact(getArtifactByID(game.dgo).rarity - 1);
                updateArtifacts();
            }
            break;
    }
    updateGems();
}

function renderGemOffers() {
    ui.gemOffer1.innerHTML = "<b>Instant Shgabb</b><br />Spend 10 Gems to get<br>" + fn(firstGemOfferWorth()) + " Shgabb immediately!";
    ui.gemOffer2.innerHTML = "<b>Shgabb Boost</b><br />Spend 20 Gems to get 25% more Shgabb!<br>Current: +" + ((game.gemboost - 1) * 25) + "%";
    if (unlockedArtifacts()) {
        ui.gemOffer3.innerHTML = "<b>Artifact Gift</b><br />" + (getArtifactAmount() == totalAmountOfArtifacts() ? "Spend 30 Gems for some Artifact Scrap!<br />(3000x chance)" : "Spend 30 Gems for a high chance to get an Artifact!<br>(3000x chance)");
        ui.gemOffer4.innerHTML = "<b>Artifact Loadout</b><br />" + (game.al > 7 ? "Not available... you know too much...<br />..." : "Spend " + (game.al * 25) + " Gems for another Artifact loadout slot!<br>(Max. 8)");
        ui.gemOffer5.innerHTML = "<b>Artifact Offer</b><br />" + (getArtifactByID(game.dgo).isUnlocked() ? "You already own today's artifact! Check back tomorrow!" : "Spend 50 Gems to get the following Artifact:<br>" + getArtifactByID(game.dgo).render(false));
    }
    else {
        ui.gemOffer3.innerHTML = "Unlocked at 1000 More Shgabb!";
        ui.gemOffer4.innerHTML = "Unlocked at 1000 More Shgabb!";
        ui.gemOffer5.innerHTML = "Unlocked at 1000 More Shgabb!";
    }
}