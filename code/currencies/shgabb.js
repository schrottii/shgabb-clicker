// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

// Various production functions
function calcShgabbGlobal() {
    // these will be applied to auto AND clicks

    let prod = new Decimal(1)
        .mul(game.stats.clicks % 3 == 0 ? shgabbUpgrades.goodJoke.currentEffect() : 1)
        .mul(shgabbUpgrades.bomblike.currentEffect())
        .mul(shgabbUpgrades.bomblike2.currentEffect())
        .mul(goldenShgabbUpgrades.divineShgabb.currentEffect())
        .mul(getSiliconeBoost())
        .mul(goldenShgabbUpgrades.formaggi.currentEffect())
        .mul(getArtifactsSimpleBoost("shgabb"))
        .mul(1 + game.gemboost / 4)
        .mul(ameliorerUpgrades.shgabbBoost.currentEffect())
        .mul(ameliorerUpgrades.gsBoostsShgabb.currentEffect())
        .mul(getArtifact(307).isEquipped() ? getArtifact(307).getValue(0) : 1)
        .mul(sandwichUpgrades.meaningOfLife.currentEffect())
        .mul(cakeValue(10, 1))
        .mul(getChallenge(2).getBoost())
        .mul(bagUpgrades.gemsBoostShgabb.currentEffect())
        .mul(isChallenge(0) ? 1 : bagUpgrades.challengeShgabb.currentEffect())
        .mul(eventValue("anniversary", 3, 1))
        .mul(eventValue("lunar", 8, 1))
        .mul(eventValue("pride", 10, 1))
        .mul(bagUpgrades.adsWatchedBoostShgabb.currentEffect())
        .mul(copperShgabbUpgrades.copShgabbBoost.currentEffect())
        .mul(pearlUpgrades.prlShgabb.currentEffect());

    return prod;
}

function calcShgabbClick(sosnog = false) {
    // Get the current shgabb production per click
    if (getArtifact(305).isEquipped() && sosnog == false) return calcShgabbAuto(true);

    // things that boost Shgabb and Click Shgabb
    let prod = new Decimal(1 + shgabbUpgrades.moreShgabb.currentEffect())
        .mul(calcShgabbGlobal())

        .mul(goldenShgabbUpgrades.gsBoost1.currentEffect())
        .mul(((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.currentEffect() / 100)) + 1))
        .mul(getArtifactsSimpleBoost("clickshgabb"))
        .mul((getArtifact(211).isEquipped() ? 0.6 : 1))
        .mul(getChallenge(3).getBoost())
        .mul(ads.strongerClicks.getCurrentBoost())
        .mul((getArtifact(200).isEquipped() ? 0 : 1))
        .ceil();

    if (isChallenge(2)) prod = prod.pow(1 / (2 + 0.5 * getChallenge(2).getTier()));
    return prod;
}

function calcShgabbAuto(sosnog2 = false, returnType = "all") {
    // Get auto prod

    if (isChallenge(3)) return new Decimal(0);
    if (getArtifact(305).isEquipped() && sosnog2 == false && returnType != "cheese") return calcShgabbClick(true);

    if (returnType == "cheese") {
        if (getArtifact(305).isEquipped()) return 0;
    }

    // NORMAL AUTO PROD, things that boost Shgabb in general
    let prod = new Decimal(0);
    if (returnType != "cheese") {
        prod = new Decimal(sandwichUpgrades.autoShgabb.currentEffect())
            .mul(calcShgabbGlobal())

            .mul(goldenShgabbUpgrades.gsBoost2.currentEffect())
            .mul(getArtifactsSimpleBoost("autoshgabb"))
            .mul(getChallenge(4).getBoost())
            .mul(ads.strongerAuto.getCurrentBoost())
            .ceil();

        if (isChallenge(2)) prod = prod.pow(1 / (2 + 0.5 * getChallenge(2).getTier()));
        if (returnType == "auto") return prod;
    }

    // CHEESE
    if (sandwichUpgrades.cheese.currentLevel() > 0) {
        prod = prod.add(calcShgabbClick(true).mul(sandwichUpgrades.cheese.currentEffect()).ceil());
    }

    return prod;
}

function renderIdleMode() {
    let render = "<br style='clear:both' /> <button class='clickButton' style='background-color: rgb(0, 0, 80)' onclick='toggleIdleMode()'>";

    render = render + "<b>Idle Mode: " + (game.idleMode == true ? "Enabled" : "Disabled") + "</b>";
    render = render + "<br />Click to toggle:";
    render = render + "<br />Speed: " + getCooldown(game.idleMode).toFixed(2) + "s -> " + getCooldown(!game.idleMode).toFixed(2) + "s";
    if (game.idleMode) render = render + "<br />Time remaining: " + sandwichFreezeTime.toFixed(0) + "s / " + getFreezeTime().toFixed(0) + "s";

    render = render + "</button>";

    ui.idleModeRender.innerHTML = render;
}

function toggleIdleMode() {
    game.idleModeTime = 0;
    game.idleMode = !game.idleMode;

    //clickButton("idlemode");
    freezeTime();
    renderIdleMode();
}