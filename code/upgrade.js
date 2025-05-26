// Game made by Schrottii - editing or stealing is prohibited!

class Upgrade {
    constructor(ID, name, description, price, effect, config) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.currency = "shgabb";
        this.type = "shgabbUpgrades";

        this.price = price;
        this.effect = effect;
        this.effectMulti = 1;
        if (config) {
            if (config.maxLevel) this.maxLevel = config.maxLevel;
            if (config.prefix) this.prefix = config.prefix;
            if (config.suffix) this.suffix = config.suffix;
            if (config.unlock) this.unlock = config.unlock;
            if (config.effectMulti) this.effectMulti = config.effectMulti;
            if (config.current) this.current = config.current;
            if (config.ameSet) this.ameSet = config.ameSet;
            if (config.ameAmount) this.ameAmount = config.ameAmount;
        }
    }

    getMax() {
        let myMax = typeof (this.maxLevel) == "function" ? this.maxLevel() : this.maxLevel;
        return ameliorerUpgrades["AME" + this.ID] != undefined ? (myMax + ameliorerUpgrades["AME" + this.ID].currentEffect()) : myMax;
    }

    canBuy() {
        if (typeof (game[this.currency]) && statCurr.includes(this.currency)) game[this.currency] = numberLoader(game[this.currency]);
        if (this.price(1).mantissa != undefined || game[this.currency].mantissa != undefined) return game[this.currency].gte(this.currentPrice()) && (this.getMax() == undefined || this.currentLevel() < this.getMax());
        return game[this.currency] >= this.currentPrice() && (this.getMax() == undefined || this.currentLevel() < this.getMax());
    }

    buy(isBuyingMax = false) {
        if (settings.noUpgrading) return false;

        // prefer MS setting
        if (settings.preferMS && this.currency == "shgabb" && this.name != "moreShgabb") {
            if (shgabbUpgrades.moreShgabb.currentPrice().lt(this.currentPrice())) {
                shgabbUpgrades.moreShgabb.buy(isBuyingMax);
                return false;
            }
        }

        if (doesUnlevel == true) {
            doesUnlevel = false;
            return false;
        }
        
        if (this.isUnlocked()) {
            if (this.canBuy()) {
                if (game[this.currency].mantissa != undefined) game[this.currency] = game[this.currency].sub(this.currentPrice());
                else game[this.currency] -= this.currentPrice();
                game.upgradeLevels[this.ID] += 1;

                if (!isBuyingMax) artifactEvent("onUpgrade", {});

                // if (!isChallenge(5) && !isBuyingMax) createNotification("Upgrade bought successfully");
                return true;
            }
            else {
                if (!isChallenge(5)) !this.isMax() ? createNotification("Not enough " + this.currency + "!") : createNotification("Upgrade is maxed!");
                else if (!isBuyingMax) this.unlevel(true);
                return false;
            }
        }
    }

    unlevel(isMax) {
        doesUnlevel = true;
        if (isMax) {
            game.upgradeLevels[this.ID] = 0;
            createNotification("Upgrade completely unbought successfully");
        }
        else {
            game.upgradeLevels[this.ID] -= 1;
            createNotification("Upgrade unbought successfully");
        }
        return true;
    }

    currentPrice() {
        let returnPrice;
        if (this.price(1).mantissa != undefined) returnPrice = this.price(this.currentLevel() + (isChallenge(4) && this.currency == "shgabb" ? (this.ID == "moreShgabb" ? (game.stats_prestige.playTime * (getChallenge(4).getTier() + 1) * 5) : (game.stats_prestige.playTime * (getChallenge(4).getTier() + 1))) : 0));
        else returnPrice = new Decimal(this.price(this.currentLevel() + (isChallenge(4) && this.currency == "shgabb" ? (this.ID == "moreShgabb" ? (game.stats_prestige.playTime * (getChallenge(4).getTier() + 1) * 5) : (game.stats_prestige.playTime * (getChallenge(4).getTier() + 1))) : 0)));

        if (this.currency == "shgabb") returnPrice = returnPrice.div(getChallenge(6).getBoost());
        if (isChallenge(6)) returnPrice = returnPrice.mul(new Decimal((this.ID == "moreShgabb" ? 1.1 : 4) + getChallenge(6).getTier() / 10).pow(this.currentLevel()));
        return returnPrice.max(1).floor(); // let's be nice ;)
    }

    currentEffect(level = 0) {
        // 0 == current
        if (!isChallenge(0) && !this.isUnlocked()) return this.effect(0);
        return this.effect(Math.min(level == 0 ? game.upgradeLevels[this.ID] : level, this.getMax() != undefined ? this.getMax() : 9999999999999999999));
    }

    currentLevel() {
        return game.upgradeLevels[this.ID];
    }

    isUnlocked() {
        if (this.ameAmount == undefined || getTotalAme() >= this.ameAmount) {
            if (this.unlock == undefined || this.unlock()) return true;
        }
        return false;
    }

    effectDisplay(level = 0) {
        if (isChallenge(5)) return "?";

        let theEffect = this.currentEffect(level);
        if (this.currentEffect().mantissa != undefined) theEffect = theEffect.mul(this.effectMulti);
        else theEffect *= this.effectMulti;

        let current = (settings.displayCurrent && this.current != undefined) ? " (Current: " + this.current(level == 0 ? this.currentLevel() : level) + ")" : "";
        return (this.prefix != undefined ? this.prefix : "") + fn(theEffect) + (this.suffix != undefined ? (typeof(this.suffix) == "function" ? this.suffix(level) : this.suffix) : "") + current;
    }

    isMax() {
        return this.getMax() == this.currentLevel();
    }

    render() {
        if (settings.hideMaxed && this.isMax() && !isChallenge(5)) return "";

        // max button
        let maxButton = "";
        if (goldenShgabbUpgrades.unlockMax.currentEffect() == 1 && ((this.getMax() > 10 && (!this.isMax() || isChallenge(5))) || this.getMax() == undefined)) maxButton = "<div onclick='buyMax(" + this.type + "." + this.ID + ")' class='maxButton'>MAX</div>";

        // unlevel button
        let unlevelButton = "";
        if (this.type != "siliconeShgabbUpgrades" && !settings.hideUnlevel && this.type != "ameliorerUpgrades" && ameliorerUpgrades.unlockUnlevel.currentEffect() == 1 && ((this.currentLevel() > 0))) unlevelButton = "<div onclick='unlevel(" + this.type + "." + this.ID + ")' class='maxButton'>-1</div>" + (this.currentLevel() == this.getMax() ? "<div onclick='unlevel(" + this.type + "." + this.ID + ", `true`)' class='maxButton'>-MAX</div>" : "");

        // egg hunt
        let egg = "";
        if (eggUpgrade == this.ID) {
            egg = "<img src='images/playerprofile/pfps/egg" + eggNumber + ".png' onclick='clickEgg()' width=32 height=32>";
        }

        // level
        let levelDisplay = (this.isMax() ? " MAX." : " Lvl. " + this.currentLevel() + (this.getMax() != undefined ? "/" + this.getMax() : ""));
        if (isChallenge(5)) levelDisplay = "?";

        // color
        let myColor = settings.upgradeColors == "old" ? (this.canBuy() || isChallenge(5) ? "rgb(180, 255, 200)" : (this.isMax() ? "lightgray" : "whitesmoke"))
            : settings.upgradeColors == "normal" ? (this.canBuy() || isChallenge(5) ? "rgb(90, 200, 120)" : (this.isMax() ? "rgb(45, 45, 45)" : "rgb(120, 160, 255)"))
                : (this.canBuy() || isChallenge(5) ? "rgb(" + settings.customColors[0][0] + ", " + settings.customColors[0][1] + ", " + settings.customColors[0][2] + ")" : (this.isMax() ? "rgb(" + settings.customColors[2][0] + ", " + settings.customColors[2][1] + ", " + settings.customColors[2][2] + ")" : "rgb(" + settings.customColors[1][0] + ", " + settings.customColors[1][1] + ", " + settings.customColors[1][2] + ")"));
        let textColor = settings.upgradeColors == "old" ? 0
            : settings.upgradeColors == "normal" ? 255
                : (this.canBuy() || isChallenge(5) ? settings.customColors[0][3] : (this.isMax() ? settings.customColors[2][3] : settings.customColors[1][3]));

        // for ame upg
        let ameExtraText = "";
        if (this.type == "ameliorerUpgrades") ameExtraText = "[S" + this.ameSet + "/" + (this.ameAmount != undefined ? this.ameAmount : 0) + "] ";

        if (this.isUnlocked()) return "<button class='upgrade' onclick='buyUpgrade(" + this.type + "." + this.ID + ")' style='background-color: " + myColor + "; color: rgb(" + textColor + "," + textColor + "," + textColor + ")'><div class='upgradeButtons'>" + maxButton + unlevelButton + "</div><div class='upgradeHeader'>" + this.name + levelDisplay + egg + "</div>" + ameExtraText + this.description + (isChallenge(5) ? "?" : (this.isMax() ? "" : "<br /> Cost: " + fn(this.currentPrice()))) + "<br />Effect: " + this.effectDisplay(this.currentLevel()) + (this.canBuy() && !isChallenge(5) ? " → " + this.effectDisplay(this.currentLevel() + 1) : "") + "</button>";
        else if (this.type == "ameliorerUpgrades") return "<button class='upgrade' style='background-color: " + myColor + "; color: rgb(" + textColor + "," + textColor + "," + textColor + ")'>" + ameExtraText + "<br />" + getTotalAme() + "/" + this.ameAmount + "</button>";
        else return "";
    }
}

// Buy functions
function buyUpgrade(id) {
    // M hotkey
    if (doBuyMax) {
        doBuyMax = false;
        buyMaxFunction(id);
        return false;
    }

    // Buy an upgrade and update UI
    id.buy();

    if (id.ID == "moreShgabb") {
        getBags();

        game.stats.hms = Math.max(game.stats.hms, game.upgradeLevels.moreShgabb);
        game.stats_prestige.hms = Math.max(game.stats_prestige.hms, game.upgradeLevels.moreShgabb);
        game.stats_today.hms = Math.max(game.stats_today.hms, game.upgradeLevels.moreShgabb);

        renderPlayerProfile();
        renderShbook();

        if (game.stats.pr == 0 && id.currentLevel() <= 25 && game.shgabb.gte(1e6)) {
            console.log("Cheating? Really?");
            game.cheated = true;
            game.shgabb = "cheater";
        }
    }

    updateUpgrades();
    freezeTime();
}

function buyMax(id) {
    doBuyMax = true;
}

function buyMaxFunction(id) {
    // v same check to display buy max
    if (goldenShgabbUpgrades.unlockMax.currentEffect() == 1 && ((id.getMax() > 10 && !id.isMax()) || id.getMax() == undefined)) {
        // Buy an upgrade and update UI
        if (settings.noUpgrading) return false;
        let levelStart = id.currentLevel();
        if (!id.canBuy() && isChallenge(5)) id.unlevel(true);
        else {
            while (id.canBuy() && id.currentLevel() <= levelStart + 50000) {
                id.buy(true);
            }
        }

        if (id.ID == "moreShgabb") {
            getBags();

            game.stats.hms = Math.max(game.stats.hms, game.upgradeLevels.moreShgabb);
            game.stats_prestige.hms = Math.max(game.stats_prestige.hms, game.upgradeLevels.moreShgabb);
            game.stats_today.hms = Math.max(game.stats_today.hms, game.upgradeLevels.moreShgabb);
            renderShbook();
        }

        artifactEvent("onUpgrade", { "multi": id.currentLevel() - levelStart });
        createNotification("Upgrade bought max. successfully");

        updateUpgrades();
        freezeTime();
    }
    else if (id.isMax() && isChallenge(5)) id.unlevel(true);
}

var doesUnlevel = false;

function unlevel(id, isMax = false) {
    // Unbuy an upgrade and update UI
    if (settings.noUpgrading) return false;
    if (!settings.confirm || !isMax || confirm("Do you really want to unlevel this to level 0?")) id.unlevel(isMax);

    updateUpgrades();
    freezeTime();
}

// render / UI
function renderUpgrades(object) {
    let render = "";
    for (o in object) {
        render = render + object[o].render();
    }
    return render;
}

function updateUpgrades() {
    // Update upgrades UI
    ui.upgradesrender.innerHTML = renderUpgrades(shgabbUpgrades);

    ui.swupgradesrender.innerHTML = renderUpgrades(sandwichUpgrades);

    ui.gsupgradesrender.innerHTML = renderUpgrades(goldenShgabbUpgrades);

    ui.siupgradesrender.innerHTML = renderUpgrades(siliconeShgabbUpgrades);

    ui.ameupgradesrender.innerHTML = renderUpgrades(ameliorerUpgrades);

    ui.bagupgradesrender.innerHTML = renderUpgrades(bagUpgrades);

    ui.copupgradesrender.innerHTML = renderUpgrades(copperShgabbUpgrades);

    ui.pearlupgradesrender.innerHTML = renderUpgrades(pearlUpgrades);

    ui.bananaupgradesrender.innerHTML = renderUpgrades(bananaUpgrades);
}

// classes for other currencies
class SandwichUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "sw";
        this.type = "sandwichUpgrades";
    }
}

class GoldenShgabbUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "gs";
        this.type = "goldenShgabbUpgrades";
    }
}

class SiliconeShgabbUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "si";
        this.type = "siliconeShgabbUpgrades";
    }
}

class AmeliorerUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "ame";
        this.type = "ameliorerUpgrades";
    }
}

class BagUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "bags";
        this.type = "bagUpgrades";
    }
}

class CopperShgabbUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "cop";
        this.type = "copperShgabbUpgrades";
    }
}

class PearlUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "pearls";
        this.type = "pearlUpgrades";
    }
}

class BananaUpgrade extends Upgrade {
    constructor(ID, name, description, price, effect, config) {
        super(ID, name, description, price, effect, config);
        this.currency = "bananas";
        this.type = "bananaUpgrades";
    }
}

var shgabbUpgrades = {                                                                 
    moreShgabb: new Upgrade("moreShgabb", "More Shgabb", "Get more Shgabb per click, and unlock new content.", level => new Decimal(1).max(level / 25).mul(2).mul(level).add(2).mul(new Decimal(1.01).pow(level - 500).max(1)), level => level, { prefix: "+", suffix: " Shgabb" }),
    shorterCD: new Upgrade("shorterCD", "Shorter Cooldown", "Reduces the click cooldown", level => level * 10 * Math.max(1, level / 4) + 5, level => (level / 10), { maxLevel: 20, prefix: "-", suffix: "s" }),
    bomblike: new Upgrade("bomblike", "Bomblike", "Get even more Shgabb", level => Math.pow(10, level) * 30, level => Math.max(1, level * 3), { maxLevel: 10, prefix: "x", unlock: () => game.stats.hms >= 10 && !isChallenge(1) }),
    goodJoke: new Upgrade("goodJoke", "Good Joke", "Every third click gives more Shgabb", level => level * 5 * Math.max(1, level / 8) + 20, level => 1 + (level / 50), { maxLevel: 100, prefix: "x", unlock: () => game.stats.hms >= 15 && !isChallenge(1) }),

    swChance: new Upgrade("swChance", "Sandwich Chance", "Increase the chance to make a delicious Sandwich when clicking", level => level * 50 * Math.max(1, level / 5) + 50, level => 0.5 * level, { maxLevel: 50, suffix: "%", unlock: () => game.stats.hms >= 25 && !isChallenge(1) }),
    moreSw: new Upgrade("moreSw", "Sandwich Amount", "Get more Sandwiches (by using more cheese)", level => 250 * Math.pow(4, level), level => level, { maxLevel: 24, prefix: "+", suffix: " Sandwiches/click", unlock: () => (game.upgradeLevels.swChance >= 10 || game.stats.hms >= 50) && !isChallenge(1) }),

    critChance: new Upgrade("critChance", "Crit. Chance", "Increase the chance for critical hits", level => level * 10 * Math.max(1, level / 12) + 25, level => 3 + (level / 10), { maxLevel: 70, suffix: "%", unlock: () => game.stats.hms >= 60 && !isChallenge(1) }),
    critBoost: new Upgrade("critBoost", "Crit. Boost", "Increase the strength of critical hits", level => level * 25 * Math.max(1, level / 2) + 50 * (level > 19 ? Math.pow(1.75, level - 19) : 1), level => 3 + (level / 10), { maxLevel: 20, prefix: "x", unlock: () => game.stats.hms >= 70 && !isChallenge(1) }),

    bomblike2: new Upgrade("bomblike2", "Bomblike 2", "Get even more Shgabb", level => new Decimal(1e5).pow(level).mul(1e60), level => new Decimal(3).pow(level), { maxLevel: 30, prefix: "x", unlock: () => game.stats.hms >= 10000 && !isChallenge(1) }),
    deepMiner: new Upgrade("deepMiner", "Deep Miner", "Get more Copper, as well as +1% GS per level (multiplicative). Every level takes 10 minutes.", level => game.stats_prestige.playTime / 600 >= (level + 1) ? new Decimal(1e10).pow(level).mul(1e50) : new Decimal("1e100").pow(level).mul("1e500"), level => new Decimal(4).pow(level), { maxLevel: 50, prefix: "x", unlock: () => game.stats.hms >= 12000 && !isChallenge(1), current: level => "x" + fn(new Decimal(1.01).pow(level)) + " GS" }),
}

var sandwichUpgrades = {
    autoShgabb: new SandwichUpgrade("autoShgabb", "Auto Shgabb", "Automatically earn Shgabb without having to click", level => level * Math.max(1, level / 25) * Math.max(1, Math.pow(1.001, level - 1000)), level => level * 10 + Math.max(0, 5 * (level - 25)) + Math.max(0, 10 * (level - 50)) + Math.max(0, 75 * (level - 101)), { prefix: "+", suffix: " Shgabb/s", unlock: () => (game.upgradeLevels.swChance > 0 || game.upgradeLevels.autoShgabb > 0) && !isChallenge(1) }),
    fridge: new SandwichUpgrade("fridge", "Better Fridge", "Keep the Sandwiches cool for longer (More time before they stop making Shgabb)", level => (6 + level * 2) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.2) * (-1), Math.sin(level * 0.2))) / 6), level => level * 4, { prefix: "+", suffix: "s", maxLevel: 30, unlock: () => (game.upgradeLevels.swChance > 0 || game.upgradeLevels.fridge > 0) && !isChallenge(1) }),
    firstBoostsClicks: new SandwichUpgrade("firstBoostsClicks", "1. Upgrade boosts clicks", "The first Sandwich upgrade also boosts Shgabb from clicks", level => (40 + level * 20) * (0.6 + Math.max(0.2, Math.max(Math.sin(level * 0.4) * (-1), Math.sin(level * 0.2))) / 6) * (level > 19 ? level * 45 : 1), level => level / 2, { maxLevel: 20, suffix: "%", current: level => "x" + ((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.effect(level) / 100)) + 1).toFixed(1), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 0 && !isChallenge(1) }),
    cheese: new SandwichUpgrade("cheese", "Cheese", "Increases auto Shgabb based on clicks", level => 10 * Math.pow(1.08, level), level => level / 200, { maxLevel: 100, suffix: "%", effectMulti: 100, current: level => "+" + fn(Math.ceil(calcShgabbClick() * sandwichUpgrades.cheese.effect(level))), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 1 && !isChallenge(1) }),
    twoTwoFive: new SandwichUpgrade("twoTwoFive", "2+2=5", "Get more Golden Shgabb", level => 25 * Math.pow(2.5, level), level => Math.pow(1 + (level / 100), level + 1), { maxLevel: 25, prefix: "x", unlock: () => ameliorerUpgrades.unlockMSW2.currentLevel() > 0 && !isChallenge(1) }),
    meaningOfLife: new SandwichUpgrade("meaningOfLife", "Meaning Of Life", "Get more Shgabb", level => Math.pow(420, level + 1), level => Math.pow(42, level), { maxLevel: 42, prefix: "x", unlock: () => ameliorerUpgrades.unlockMSW2.currentLevel() > 1 && !isChallenge(1) }),
}

var goldenShgabbUpgrades = {
    divineShgabb: new GoldenShgabbUpgrade("divineShgabb", "Divine Shgabb", "Get even more Shgabb - from clicks and auto!", level => new Decimal(1.02).pow(level).mul(10 + level * 2), level => 1 + level * 0.2 + (0.1 * Math.max(level - 50, 0)) + (0.2 * Math.max(level - 100, 0)), { prefix: "x" }),
    shortCD: new GoldenShgabbUpgrade("shortCD", "Even Shorter Cooldown", "Reduces the click cooldown", level => 100 * level + 100, level => level * 0.1, { maxLevel: 5, prefix: "-", suffix: "s" }),
    gsBoost1: new GoldenShgabbUpgrade("gsBoost1", "GS boosts Shgabb 1", "Get more Shgabb from clicks based on current Golden Shgabb", level => (20 + level * 5) * Math.pow(1.06, level), level => new Decimal(game.gs.add(1).ln()).ceil().mul(level).add(1), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.shortCD > 4 || game.upgradeLevels.gsBoost1 > 0}),
    gsBoost2: new GoldenShgabbUpgrade("gsBoost2", "GS boosts Shgabb 2", "Get more auto Shgabb based on total Golden Shgabb", level => (20 + level * 5) * Math.pow(1.04, level), level => 1 + level * Math.ceil(1.6 * Math.log(game.stats.gs.add(1))), { maxLevel: 100, prefix: "x", unlock: () => game.stats.gs > 2999 }),
    unlockMax: new GoldenShgabbUpgrade("unlockMax", "Unlock Buy Max", "Unlock buy max buttons for most upgrades", level => 10, level => level, { maxLevel: 1, unlock: () => game.stats.gs >= 10 }),
    unlockMSW: new GoldenShgabbUpgrade("unlockMSW", "Unlock More Sandwich Upgrades", "Unlock two new Sandwich upgrades", level => 2500, level => level, { maxLevel: 2, unlock: () => sandwichUpgrades.autoShgabb.currentLevel() > 79 || game.upgradeLevels.unlockMSW > 0 }),
    formaggi: new GoldenShgabbUpgrade("formaggi", "Pizza quattro formaggi", "Get more Shgabb, Sandwiches, Golden Shgabb and Silicone", level => 5000 * Math.pow(level + 1, level + 1), level => 1 + ((level * level) * 1.2 + (level > 6 ? 0.2 : 0)), { maxLevel: 8, unlock: () => sandwichUpgrades.cheese.currentLevel() > 79 || game.upgradeLevels.formaggi > 0, prefix: "x" }),
    moreSilicone2: new GoldenShgabbUpgrade("moreSilicone2", "More Silicone 2", "Get more Silicone Shgabb", level => new Decimal(12000).pow(1 + (level / 12)).add(88000), level => new Decimal(1.2).pow(level), { unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 999 || game.upgradeLevels.moreSilicone2 > 0, prefix: "x" }),
}

var siliconeShgabbUpgrades = {
    moreSilicone: new SiliconeShgabbUpgrade("moreSilicone", "More Silicone", "Get even more Silicone", level => new Decimal(1.005).pow(level).mul(8 + level * 2), level => 1 + level, { suffix: () => "/s (x" + fn(getSiliconeBoost()) + ")" }),
    strongerSilicone: new SiliconeShgabbUpgrade("strongerSilicone", "Stronger Silicone", "Increase the Silicone boost", level => (60 + level * 24) * Math.pow(1.05, level), level => level * 0.005, { maxLevel: 100, current: level => "x" + fn(getSiliconeBoost(level)) + " Shgabb", effectMulti: 100, prefix: "+", suffix: "%" }),
    siliconeFromClicks: new SiliconeShgabbUpgrade("siliconeFromClicks", "Silicone From Clicks", "Chance to get Silicone shgabb from clicks (3x)", level => 10000 * (level + 1), level => 0.1 * level, { maxLevel: 100, suffix: "% chance", unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 499 }),
    siliconeAffectsGS: new SiliconeShgabbUpgrade("siliconeAffectsGS", "Silicone Affects GS", "Silicone also boosts GS", level => Math.pow(15000, (1 + level) / 26), level => 0.001 * level, { effectMulti: 100, maxLevel: 100, suffix: (level) => "% (x" + fn(getSiliconeBoost() * level * 0.001) + ")", unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 999 }),
}

var ameliorerUpgrades = {
    shgabbBoost: new AmeliorerUpgrade("shgabbBoost", "Shgabb Boost", "Get more Shgabb (clicks and auto)", level => 1, level => 1 + (level * 0.5), { maxLevel: () => 30 + getAmeCame(), prefix: "x", ameSet: 1, ameAmount: 0 }),
    AMEgsBoost1: new AmeliorerUpgrade("AMEgsBoost1", "GS boosts Shgabb 1", "Increases max. level of that GS Upgrade", level => 1, level => level * 25, { maxLevel: 16, prefix: "+", ameSet: 1, ameAmount: 0 }),
    AMEgsBoost2: new AmeliorerUpgrade("AMEgsBoost2", "GS boosts Shgabb 2", "Increases max. level of that GS Upgrade", level => 1, level => level * 25, { maxLevel: 16, prefix: "+", ameSet: 1, ameAmount: 0 }),
    achBExpo: new AmeliorerUpgrade("achBExpo", "Achievements Become Exponential", "Turns the GS boost from Achievements exponential", level => 5, level => level, { maxLevel: 1, ameSet: 1, ameAmount: 3 }),

    nothing: new AmeliorerUpgrade("nothing", "Nothing", "This does nothing", level => 2, level => 0, { maxLevel: 100, prefix: "x", ameSet: 2, ameAmount: 10 }),
    AMEfridge: new AmeliorerUpgrade("AMEfridge", "Better Fridge", "Increases max. level of that Sandwich Upgrade", level => 2, level => level * 5, { maxLevel: 6, prefix: "+", ameSet: 2, ameAmount: 10 }),
    AMEcritBoost: new AmeliorerUpgrade("AMEcritBoost", "Crit. Boost", "Increases max. level of that Shgabb Upgrade", level => 1, level => level * 10, { maxLevel: 15, prefix: "+", ameSet: 2, ameAmount: 10 }),
    unlockUnlevel: new AmeliorerUpgrade("unlockUnlevel", "Unlock Unlevel Button", "Getting more levels is good, but less levels is better", level => 10, level => level, { maxLevel: 1, ameSet: 2, ameAmount: 15 }),

    AMEfirstBoostsClicks: new AmeliorerUpgrade("AMEfirstBoostsClicks", "1. Upgrade boosts clicks", "Increases max. level of that Sandwich Upgrade", level => 2, level => level, { maxLevel: 30, prefix: "+", ameSet: 3, ameAmount: 25 }),
    AMEsiliconeFromClicks: new AmeliorerUpgrade("AMEsiliconeFromClicks", "Silicone From Clicks", "Increases max. level of that Silicone Upgrade", level => 3, level => level * 10, { maxLevel: 15, prefix: "+", ameSet: 3, ameAmount: 25 }),
    AMEbomblike: new AmeliorerUpgrade("AMEbomblike", "Bomblike", "Increases max. level of that Shgabb Upgrade", level => 3 * Math.ceil((1 + level) / 10), level => level * 3, { maxLevel: 30, prefix: "+", ameSet: 3, ameAmount: 25 }),
    gsBoostsShgabb: new AmeliorerUpgrade("gsBoostsShgabb", "GS Boosts Shgabb", "Increases Shgabb production based on GS (^0.5)", level => 10, level => level == 1 ?  game.gs.pow(0.5).add(1) : 1, { prefix: "x", maxLevel: 1, ameSet: 3, ameAmount: 30 }),

    siliconeBoost: new AmeliorerUpgrade("siliconeBoost", "Silicone Boost", "Get more Silicone Shgabb", level => 1, level => 1 + (level * 0.2), { maxLevel: () => 30 + getAmeCame(), prefix: "x", ameSet: 4, ameAmount: 40 }),
    AMEformaggi: new AmeliorerUpgrade("AMEformaggi", "Pizza quattro formaggi", "Increases max. level of that Golden Shgabb Upgrade", level => 8 * (level + 1), level => level * 8, { maxLevel: 7, prefix: "+", ameSet: 4, ameAmount: 40 }),
    unlockMSW2: new AmeliorerUpgrade("unlockMSW2", "Unlock More Sandwich Upgrades 2", "Unlock two new Sandwich Upgrades", level => 10, level => level, { maxLevel: 2, ameSet: 4, ameAmount: 40 }),
    fourthArtifactSlot: new AmeliorerUpgrade("fourthArtifactSlot", "Fourth Artifact Slot", "Makes it possible to equip 4 Artifacts at once", level => 10, level => level, { maxLevel: 1, prefix: "+", ameSet: 4, ameAmount: 50 }),

    sandwichBoost: new AmeliorerUpgrade("sandwichBoost", "Sandwich Boost", "Get more Sandwiches", level => 2, level => 1 + (level * 0.1), { maxLevel: () => 30 + getAmeCame(), prefix: "x", ameSet: 5, ameAmount: 100 }),
    critsAffectSW: new AmeliorerUpgrade("critsAffectSW", "Crits Affect Sandwiches", "Get more Sandwiches on critical hits", level => 5, level => (level * 0.1), { maxLevel: 10, ameSet: 5, ameAmount: 100 }),
    gems2ame: new AmeliorerUpgrade("gems2ame", "Gems To Amé", "Makes it possible to convert 500 Gems to 1 Améliorer", level => 10, level => level, { maxLevel: 1, ameSet: 5, ameAmount: 100 }),
    keepSWU: new AmeliorerUpgrade("keepSWU", "Keep Sandwich Upgrades", "Keep Sandwich Upgrades after a prestige", level => level >= 3 ? 10 : 2, level => level, { maxLevel: 6, ameSet: 5, ameAmount: 120, current: level => ["None", "Better Fridge", "1. Upgrade boosts clicks", "Cheese", "Auto Shgabb", "2+2=5", "Meaning Of Life"][level] }),

    amegsBoost: new AmeliorerUpgrade("amegsBoost", "Golden Shgabb Boost", "Get more Golden Shgabb", level => 3, level => 1 + (level * 0.1), { maxLevel: () => 30 + getAmeCame(), prefix: "x", ameSet: 6, ameAmount: 150 }),
    loreBoost: new AmeliorerUpgrade("loreBoost", "Lore Boost", "Turns the GS boost from Lore pages exponential", level => 10, level => level, { maxLevel: 1, ameSet: 6, ameAmount: 150 }),
    tiersBoostBags: new AmeliorerUpgrade("tiersBoostBags", "Tiers Boost Bags", "Get more Bags for each Challenge tier completed", level => 25, level => level, { maxLevel: 1, ameSet: 6, ameAmount: 150 }),
    fourthArtifactLevel: new AmeliorerUpgrade("fourthArtifactLevel", "Fourth Artifact Level", "Increases max. level of most Artifacts by 1", level => 25, level => level, { maxLevel: 1, ameSet: 6, ameAmount: 175 }),

    AMEmoreSw: new AmeliorerUpgrade("AMEmoreSw", "Sandwich Amount", "Increases max. level of that Shgabb Upgrade", level => level + 1, level => level * 5, { maxLevel: 15, prefix: "+", ameSet: 7, ameAmount: 225 }),
    unlockMBU: new AmeliorerUpgrade("unlockMBU", "Unlock More Bag Upgrades", "Unlock a new Bag upgrade", level => 18, level => level, { maxLevel: 2, ameSet: 7, ameAmount: 225 }),
    infiniteGems2ame: new AmeliorerUpgrade("infiniteGems2ame", "Infinite Gems To Amé", "Gems to Amé can be used past its normal limit, but at twice the cost", level => 10, level => level, { maxLevel: 1, ameSet: 7, ameAmount: 225 }),
    AMECAME: new AmeliorerUpgrade("AMECAME", "Amé Came", "Increases the levels (by +2) of all Amé upgrades that give a simple boost to a currency", level => 2, level => level * 2, { maxLevel: 85, prefix: "+", ameSet: 7, ameAmount: 250 }),

    copperBoost: new AmeliorerUpgrade("copperBoost", "Copper Boost", "Get more Copper Shgabb", level => 4, level => new Decimal(2).pow(level), { maxLevel: () => 30 + getAmeCame(), prefix: "x", ameSet: 8, ameAmount: 300 }),
    tiersBoostCopper: new AmeliorerUpgrade("tiersBoostCopper", "Tiers Boost Copper", "Get more Copper Shgabb for each Challenge tier completed", level => 10, level => new Decimal(Math.max(1, 2 * level)).pow(getTotalTiers()), { maxLevel: 2, prefix: "x", ameSet: 8, ameAmount: 300 }),
    chainGems: new AmeliorerUpgrade("chainGems", "Chain Gems", "Increased chance to get Gems (ignoring 10% cap) after the previous click awarded Gems", level => Math.ceil(level / 2) + 1, level => 1 + Math.floor((level * 0.1) * 10) / 10, { prefix: "x", maxLevel: 30, ameSet: 8, ameAmount: 300 }),
    moreLoadouts: new AmeliorerUpgrade("moreLoadouts", "More Loadouts", "Be able to buy more Artifact loadouts, and get a Bags boost for every loadout you own", level => 4 * (level + 1), level => 1 + (game.al * level) / 100, { maxLevel: 4, prefix: "x", suffix: " Bags", ameSet: 8, ameAmount: 320 }),

    // insert upgrade that gives boost based on time since last amé reset
    // insert shgabb(?) boost for every arti you own
    // efficientDestruction: new AmeliorerUpgrade("efficientDestruction", "Efficient Destruction", "Get more Artifact Scrap from destroying Artifacts", level => 2, level => 1 + level * 0.01, { prefix: "x", maxLevel: 400, ameSet: 9, ameAmount: 400 }),
}

var bagUpgrades = {
    challengeShgabb: new BagUpgrade("challengeShgabb", "Challenge Shgabb", "Get even more Shgabb - in Challenges", level => 10 * Math.floor(1 + level / 10), level => Math.pow(1 + level, 1.25), { prefix: "x" }),
    moreSilicone3: new BagUpgrade("moreSilicone3", "More Silicone 3", "Get even more Silicone Shgabb", level => 20 * Math.floor(1 + level / 3), level => Math.pow(1 + (level / 10), 1.15), { prefix: "x" }),
    prestigeGems: new BagUpgrade("prestigeGems", "Prestige Gems", "Get 1 Gem for every 1000 More Shgabb on Prestige", level => 1000, level => level, { prefix: "+", maxLevel: 1 }),
    gemsBoostShgabb: new BagUpgrade("gemsBoostShgabb", "Gems Boost Shgabb", "Boosts Shgabb based on current Gems", level => 1000 * (level + 1), level => 1 + Math.floor((level * game.gems) / 100), { prefix: "x", maxLevel: 10 }),
    adsWatchedBoostShgabb: new BagUpgrade("adsWatchedBoostShgabb", "Ads Watched Boost Shgabb", "Get more Shgabb based on all Ads watched. Costs are reduced by total Ads watched.", level => Math.max(1000, Math.floor(Math.pow(level, 3.75) * 5000 / game.stats.ads)), level => level > 0 ? Math.pow(game.stats.wads.sc * game.stats.wads.sa * game.stats.wads.msw * game.stats.wads.fs * game.stats.wads.mc * game.stats.wads.msi * game.stats.wads.mg, 0.1 + (level / 1000)) : 1, { unlock: () => game.upgradeLevels.unlockMBU >= 1, prefix: "x", maxLevel: 100 }),
    clicksBoostGS: new BagUpgrade("clicksBoostGS", "Clicks Boost GS", "Get more Golden Shgabb based on all time, daily and prestige clicks. Costs are reduced by total Prestiges.", level => Math.max(1000, Math.floor(Math.pow(level, 3.75) * 5000 / game.stats.pr)), level => level > 0 ? Math.pow((game.stats.clicks + 1) * (game.stats_today.clicks + 1) * (game.stats_prestige.clicks + 1), 0.1 + (level / 1000)) : 1, { unlock: () => game.upgradeLevels.unlockMBU >= 2, prefix: "x", maxLevel: 100 }),
}

var copperShgabbUpgrades = {
    moreCopper: new CopperShgabbUpgrade("moreCopper", "More Copper", "Get more Copper every time a click gives Copper", level => new Decimal(1000).mul(level + 1).mul(new Decimal(1.01).pow(level)), level => 1 + level, { prefix: "x", unlock: () => game.upgradeLevels.copperClickChance >= 2 }),
    copperClickChance: new CopperShgabbUpgrade("copperClickChance", "Copper Click Chance", "Increases the chance to get Copper from clicking", level => new Decimal(10).pow(level + 1), level => 1 + level, { suffix: "%", maxLevel: 49 }),
    copShgabbBoost: new CopperShgabbUpgrade("copShgabbBoost", "Shgabb Boost", "Get more Shgabb", level => new Decimal(1000).pow(level + 2), level => new Decimal(2).pow(level), { prefix: "x", unlock: () => game.upgradeLevels.moreCopper >= 32 }),
    copGSBoost: new CopperShgabbUpgrade("copGSBoost", "GS Boost", "Get more Golden Shgabb", level => new Decimal(1000).pow(level + 3), level => new Decimal(2).pow(level), { prefix: "x", unlock: () => game.upgradeLevels.moreCopper >= 256 }),
}

var pearlUpgrades = {
    prlShgabb: new PearlUpgrade("prlShgabb", "Shgabb Boost", "Spend Pearls to get more Shgabb (x1.1 every level)", level => level + 1, level => new Decimal(1.1).pow(level), { prefix: "x" }),
    prlGS: new PearlUpgrade("prlGS", "GS Boost", "Spend Pearls to get more GS (x1.05 every level)", level => level + 1, level => new Decimal(1.05).pow(level), { prefix: "x" }),
}

var bananaUpgrades = {
    bananaChance: new BananaUpgrade("bananaChance", "Banana Chance", "Every click, there is a chance for every tree to produce Bananas. This upgrade increases that chance.", level => Math.pow(2, level + 4), level => level + 1, { maxLevel: 9, suffix: "% chance" }),
    banSw: new BananaUpgrade("banSw", "More Sandwiches", "Get more Sandwiches", level => 10 * Math.pow(level + 1, 1.08), level => 1 + (level / 10), { prefix: "x" }),
    banGS: new BananaUpgrade("banGS", "Wisdomnana", "Increases GS gain for every Banana that can be claimed", level => 100 * level + 200, level => 0.01 * level, { prefix: "x", suffix: "/Banana", current: level => "x" + fn(0.01 * level * calcClaimableBananas()) })
}