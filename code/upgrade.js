﻿// Game made by Schrottii - editing or stealing is prohibited!

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
            if (config.ameAmount) this.ameAmount = config.ameAmount;
        }
    }

    getMax() {
        return ameliorerUpgrades["AME" + this.ID] != undefined ? (this.maxLevel + ameliorerUpgrades["AME" + this.ID].currentEffect()) : this.maxLevel;
    }

    canBuy() {
        return game[this.currency] >= this.currentPrice() && (this.getMax() == undefined || this.currentLevel() < this.getMax());
    }

    buy() {
        if (doesUnlevel == true) {
            doesUnlevel = false;
            return false;
        }
        if (this.isUnlocked()) {
            if (this.canBuy()) {
                game[this.currency] -= this.currentPrice();
                game.upgradeLevels[this.ID] += 1;

                if (getArtifactByID(215).isEquipped()) increaseGS(getArtifactEffect(215) / 100);

                createNotification("Upgrade bought successfully");
                return true;
            }
            else {
                createNotification("Not enough " + this.currency + "!");
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
        return Math.floor(this.price(game.upgradeLevels[this.ID]));
    }

    currentEffect() {
        return this.effect(game.upgradeLevels[this.ID]);
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
        let current = (settings.displayCurrent && this.current != undefined) ? " (Current: " + this.current(level == 0 ? this.currentLevel() : level) + ")" : "";
        if(level == 0) return (this.prefix != undefined ? this.prefix : "") + fn(this.effectMulti * this.currentEffect()) + (this.suffix != undefined ? (typeof(this.suffix) == "function" ? this.suffix(level) : this.suffix) : "") + current;
        else return (this.prefix != undefined ? this.prefix : "") + fn(this.effectMulti * this.effect(level)) + (this.suffix != undefined ? (typeof (this.suffix) == "function" ? this.suffix(level) : this.suffix) : "") + current;
    }

    render() {
        let isMax = this.getMax() == this.currentLevel();
        if (settings.hideMaxed && isMax) return "";

        let maxButton = "";
        if (goldenShgabbUpgrades.unlockMax.currentEffect() == 1 && ((this.getMax() > 10 && this.currentLevel() != this.getMax()) || this.getMax() == undefined)) maxButton = "<div onclick='buyMax(" + this.type + "." + this.ID + ")' class='maxButton'>MAX</div>";


        let unlevelButton = "";
        if (this.type != "siliconeShgabbUpgrades" && !settings.hideUnlevel && this.type != "ameliorerUpgrades" && ameliorerUpgrades.unlockUnlevel.currentEffect() == 1 && ((this.currentLevel() > 0))) unlevelButton = "<div onclick='unlevel(" + this.type + "." + this.ID + ")' class='maxButton'>-1</div>" + (this.currentLevel() == this.getMax() ? "<div onclick='unlevel(" + this.type + "." + this.ID + ", `true`)' class='maxButton'>-MAX</div>" : "");

        let levelDisplay = (isMax ? " MAX." : " Lvl. " + this.currentLevel() + (this.getMax() != undefined ? "/" + this.getMax() : ""));
        let myColor = settings.upgradeColors == "old" ? (this.canBuy() ? "rgb(180, 255, 200)" : (this.currentLevel() == this.getMax() ? "lightgray" : "whitesmoke"))
            : settings.upgradeColors == "normal" ? (this.canBuy() ? "rgb(90, 200, 120)" : (this.currentLevel() == this.getMax() ? "rgb(45, 45, 45)" : "rgb(120, 160, 255)"))
                : (this.canBuy() ? "rgb(" + settings.customColors[0][0] + ", " + settings.customColors[0][1] + ", " + settings.customColors[0][2] + ")" : (this.currentLevel() == this.getMax() ? "rgb(" + settings.customColors[2][0] + ", " + settings.customColors[2][1] + ", " + settings.customColors[2][2] + ")" : "rgb(" + settings.customColors[1][0] + ", " + settings.customColors[1][1] + ", " + settings.customColors[1][2] + ")"));
        let textColor = settings.upgradeColors == "old" ? 0
            : settings.upgradeColors == "normal" ? 255
            : (this.canBuy() ? settings.customColors[0][3] : (this.currentLevel() == this.getMax() ? settings.customColors[2][3] : settings.customColors[1][3]));
        if (this.isUnlocked()) return "<button class='upgrade' onclick='buyUpgrade(" + this.type + "." + this.ID + ")' style='background-color: " + myColor + "; color: rgb(" + textColor + "," + textColor + "," + textColor + ")'><div class='upgradeButtons'>" + maxButton + unlevelButton + "</div><div class='upgradeHeader'>" + this.name + levelDisplay + "</div>" + this.description + (isMax ? "" : "<br /> Cost: " + fn(this.currentPrice())) + "<br />Effect: " + this.effectDisplay(this.currentLevel()) + (this.canBuy() ? " → " + this.effectDisplay(this.currentLevel() + 1) : "") + "</button>";
        else return "";
    }
}

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

var shgabbUpgrades = {
    moreShgabb: new Upgrade("moreShgabb", "More Shgabb", "Get more Shgabb per click", level => (level * 5 * Math.max(1, level / 25) + 5) * Math.max(1, Math.pow(1.01, level - 500)), level => level),
    critChance: new Upgrade("critChance", "Crit. Chance", "Increase the chance for critical hits", level => level * 10 * Math.max(1, level / 12) + 25, level => 3 + (level / 10), { maxLevel: 70, suffix: "%" }),
    critBoost: new Upgrade("critBoost", "Crit. Boost", "Increase the strength of critical hits", level => level * 25 * Math.max(1, level / 2) + 50 * (level > 19 ? Math.pow(1.75, level - 19) : 1), level => 3 + (level / 10), { maxLevel: 20, prefix: "x" }),
    shorterCD: new Upgrade("shorterCD", "Shorter Cooldown", "Reduces the click cooldown", level => level * 40 * Math.max(1, level / 4) + 60, level => (level / 20), { maxLevel: 40, prefix: "-", suffix: "s", unlock: () => game.upgradeLevels.moreShgabb > 14 }),
    goodJoke: new Upgrade("goodJoke", "Good Joke", "Every third click gives more", level => level * 5 * Math.max(1, level / 8) + 20, level => 1 + (level / 50), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 24 }),
    bomblike: new Upgrade("bomblike", "Bomblike", "Get even more Shgabb per click", level => Math.pow((level > 10 ? 3 : 5), 4 + (level * 1.5)), level => Math.max(1, level * 3), { maxLevel: 10, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 34 }),
    swChance: new Upgrade("swChance", "Sandwich Chance", "Increase the chance to make a delicious Sandwich when clicking", level => level * 50 * Math.max(1, level / 5) + 250, level => 0.1 * level, { maxLevel: 250, suffix: "%", unlock: () => game.upgradeLevels.moreShgabb > 49 }),
    moreSw: new Upgrade("moreSw", "Sandwich Amount", "Get more Sandwiches (by using more cheese)", level => 250 + Math.pow(4, 6 + level), level => level, { maxLevel: 24, unlock: () => game.upgradeLevels.swChance > 24 }),
}

var sandwichUpgrades = {
    autoShgabb: new SandwichUpgrade("autoShgabb", "Auto Shgabb", "Automatically earn shgabb without having to click", level => (2 + level) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.05) * (-1), Math.sin(level * 0.05))) / 8), level => level * 5 + Math.max(0, 5 * (level - 24)) + Math.max(0, 10 * (level - 50)) + Math.max(0, 5 * (level - 101)), { unlock: () => game.upgradeLevels.swChance > 0 }),
    fridge: new SandwichUpgrade("fridge", "Better Fridge", "Keep the Sandwiches cool for longer (More time before they stop making Shgabb)", level => (6 + level * 2) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.2) * (-1), Math.sin(level * 0.2))) / 6), level => level * 4, { maxLevel: 30, unlock: () => game.upgradeLevels.swChance > 0 }),
    firstBoostsClicks: new SandwichUpgrade("firstBoostsClicks", "1. Upgrade boosts clicks", "The first Sandwich upgrade also boosts Shgabb from clicks", level => (40 + level * 20) * (0.6 + Math.max(0.2, Math.max(Math.sin(level * 0.4) * (-1), Math.sin(level * 0.2))) / 6) * (level > 19 ? level * 45 : 1), level => level / 2, { maxLevel: 20, suffix: "%", current: level => "x" + ((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.effect(level) / 100)) + 1).toFixed(1), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 0 }),
    cheese: new SandwichUpgrade("cheese", "Cheese", "Increases auto Shgabb based on clicks", level => 10 * Math.pow(1.08, level), level => level / 200, { maxLevel: 100, suffix: "%", effectMulti: 100, current: level => "+" + fn(Math.ceil(getProduction() * sandwichUpgrades.cheese.effect(level))), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 1 }),
    twoTwoFive: new SandwichUpgrade("twoTwoFive", "2+2=5", "Increases Golden Shgabb", level => 25 * Math.pow(2.5, level), level => Math.pow(1 + (level / 100), level + 1), { maxLevel: 25, prefix: "x", unlock: () => ameliorerUpgrades.unlockMSW2.currentLevel() > 0 }),
    meaningOfLife: new SandwichUpgrade("meaningOfLife", "Meaning Of Life", "Increases Shgabb", level => Math.pow(420, level + 1), level => Math.pow(42, level), { maxLevel: 42, prefix: "x", unlock: () => ameliorerUpgrades.unlockMSW2.currentLevel() > 1 }),
}

var goldenShgabbUpgrades = {
    divineShgabb: new GoldenShgabbUpgrade("divineShgabb", "Divine Shgabb", "Get even more Shgabb - from clicks and auto!", level => (10 + level * 2) * Math.pow(1.02, level), level => 1 + level * 0.2 + (0.1 * Math.max(level - 50, 0)) + (0.2 * Math.max(level - 100, 0)), { prefix: "x" }),
    shortCD: new GoldenShgabbUpgrade("shortCD", "Even Shorter Cooldown", "Reduces the click cooldown", level => 100 * level + 100, level => level * 0.1, { maxLevel: 5, prefix: "-", suffix: "s" }),
    gsBoost1: new GoldenShgabbUpgrade("gsBoost1", "GS boosts Shgabb 1", "Get more Shgabb from clicks based on current Golden Shgabb", level => (20 + level * 5) * Math.pow(1.06, level), level => 1 + level * Math.ceil(Math.log(game.gs + 1)), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.shortCD > 4 }),
    gsBoost2: new GoldenShgabbUpgrade("gsBoost2", "GS boosts Shgabb 2", "Get more auto Shgabb based on total Golden Shgabb", level => (20 + level * 5) * Math.pow(1.04, level), level => 1 + level * Math.ceil(1.3 * Math.log(game.stats.gs + 1)), { maxLevel: 100, prefix: "x", unlock: () => game.stats.gs > 2999 }),
    unlockMax: new GoldenShgabbUpgrade("unlockMax", "Unlock Buy Max", "Unlock buy max buttons for most upgrades", level => 500, level => level, { maxLevel: 1, unlock: () => game.stats.gs > 999 }),
    unlockMSW: new GoldenShgabbUpgrade("unlockMSW", "Unlock More Sandwich Upgrades", "Unlock two new Sandwich upgrades", level => 2500, level => level, { maxLevel: 2, unlock: () => sandwichUpgrades.autoShgabb.currentLevel() > 79 || game.upgradeLevels.unlockMSW > 0 }),
    formaggi: new GoldenShgabbUpgrade("formaggi", "Pizza quattro formaggi", "Get more Shgabb, Sandwiches, Golden Shgabb and Silicone", level => 5000 * Math.pow(level + 1, level + 1), level => 1 + ((level * level) * 1.2 + (level > 6 ? 0.2 : 0)), { maxLevel: 8, unlock: () => sandwichUpgrades.cheese.currentLevel() > 79 || game.upgradeLevels.formaggi > 0, prefix: "x" }),
    moreSilicone2: new GoldenShgabbUpgrade("moreSilicone2", "More Silicone 2", "Get more Silicone Shgabb", level => 88000 + (Math.pow(12000, 1 + (level / 12))), level => Math.pow(1.2, level), { unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 999 || game.upgradeLevels.moreSilicone2 > 0, prefix: "x" }),
}

var siliconeShgabbUpgrades = {
    moreSilicone: new SiliconeShgabbUpgrade("moreSilicone", "More Silicone", "Get even more Silicone", level => (8 + level * 2) * Math.pow(1.005, level), level => 1 + level, { suffix: () => "/s (x" + fn(getSiliconeBoost()) + ")" }),
    strongerSilicone: new SiliconeShgabbUpgrade("strongerSilicone", "Stronger Silicone", "Increase the Silicone boost", level => (60 + level * 24) * Math.pow(1.05, level), level => level * 0.005, { maxLevel: 100, current: level => "x" + fn(getSiliconeBoost(level)) + " shgabb", effectMulti: 100, prefix: "+", suffix: "%" }),
    siliconeFromClicks: new SiliconeShgabbUpgrade("siliconeFromClicks", "Silicone From Clicks", "Chance to get Silicone shgabb from clicks (3x)", level => 10000 * (level + 1), level => 0.1 * level, { maxLevel: 100, suffix: "% chance", unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 499 }),
    siliconeAffectsGS: new SiliconeShgabbUpgrade("siliconeAffectsGS", "Silicone Affects GS", "Silicone also boosts GS on prestige a bit", level => Math.pow(15000, (1 + level) / 26), level => 0.001 * level, { effectMulti: 100, maxLevel: 100, suffix: (level) => "% (x" + fn(getSiliconeBoost() * level * 0.001) + ")", unlock: () => siliconeShgabbUpgrades.moreSilicone.currentLevel() > 999 }),
}

var ameliorerUpgrades = {
    AMEgsBoost1: new AmeliorerUpgrade("AMEgsBoost1", "GS boosts Shgabb 1", "Increases max. level of that GS Upgrade", level => 1, level => level * 25, { maxLevel: 16 }),
    AMEgsBoost2: new AmeliorerUpgrade("AMEgsBoost2", "GS boosts Shgabb 2", "Increases max. level of that GS Upgrade", level => 1, level => level * 25, { maxLevel: 16 }),
    shgabbBoost: new AmeliorerUpgrade("shgabbBoost", "Shgabb Boost", "Get more Shgabb (clicks and auto)", level => 1, level => 1 + (level * 0.5), { maxLevel: 30 }),
    achBExpo: new AmeliorerUpgrade("achBExpo", "Achievements Become Exponential", "Turns the GS boost from Achievements exponential", level => 5, level => level, { maxLevel: 1, ameAmount: 3 }),

    AMEfridge: new AmeliorerUpgrade("AMEfridge", "Better Fridge", "Increases max. level of that Sandwich Upgrade", level => 2, level => level * 5, { maxLevel: 6, ameAmount: 10 }),
    AMEmoreSw: new AmeliorerUpgrade("AMEmoreSw", "Sandwich Amount", "Increases max. level of that Shgabb Upgrade", level => level + 1, level => level * 5, { maxLevel: 15, ameAmount: 10 }),
    AMEcritBoost: new AmeliorerUpgrade("AMEcritBoost", "Crit. Boost", "Increases max. level of that Shgabb Upgrade", level => 1, level => level * 10, { maxLevel: 15, ameAmount: 10 }),
    unlockUnlevel: new AmeliorerUpgrade("unlockUnlevel", "Unlock Unlevel Button", "Getting more levels is good, but less levels is better", level => 10, level => level, { maxLevel: 1, ameAmount: 15 }),

    AMEfirstBoostsClicks: new AmeliorerUpgrade("AMEfirstBoostsClicks", "1. Upgrade boosts clicks", "Increases max. level of that Sandwich Upgrade", level => 2, level => level, { maxLevel: 30, ameAmount: 25 }),
    AMEsiliconeFromClicks: new AmeliorerUpgrade("AMEsiliconeFromClicks", "Silicone From Clicks", "Increases max. level of that Silicone Upgrade", level => 3, level => level * 10, { maxLevel: 15, ameAmount: 25 }),
    AMEbomblike: new AmeliorerUpgrade("AMEbomblike", "Bomblike", "Increases max. level of that Shgabb Upgrade", level => 3 * Math.ceil((1 + level) / 10), level => level * 3, { maxLevel: 30, ameAmount: 25 }),
    gsBoostsShgabb: new AmeliorerUpgrade("gsBoostsShgabb", "GS Boosts Shgabb", "Increases Shgabb production based on GS (^0.5)", level => 10, level => level == 1 ? (Math.pow(game.gs, 0.5) + 1) : 1, { prefix: "x", maxLevel: 1, ameAmount: 30 }),

    AMEformaggi: new AmeliorerUpgrade("AMEformaggi", "Pizza quattro formaggi", "Increases max. level of that Golden Shgabb Upgrade", level => 8 * (level + 1), level => level * 8, { maxLevel: 7, ameAmount: 40 }),
    unlockMSW2: new AmeliorerUpgrade("unlockMSW2", "Unlock More Sandwich Upgrades 2", "Unlock two new Sandwich upgrades", level => 10, level => level, { maxLevel: 2, ameAmount: 40 }),
    siliconeBoost: new AmeliorerUpgrade("siliconeBoost", "Silicone Boost", "Get more Silicone Shgabb", level => 1, level => 1 + (level * 0.2), { maxLevel: 50, ameAmount: 40 }),
    fourthArtifactSlot: new AmeliorerUpgrade("fourthArtifactSlot", "Fourth Artifact Slot", "Makes it possible to equip 4 Artifacts at once", level => 10, level => level, { maxLevel: 1, ameAmount: 50 }),

    sandwichBoost: new AmeliorerUpgrade("sandwichBoost", "Sandwich Boost", "Get more Sandwiches", level => 2, level => 1 + (level * 0.1), { maxLevel: 20, ameAmount: 100 }),
    critsAffectSW: new AmeliorerUpgrade("critsAffectSW", "Crits Affect Sandwiches", "Get more Sandwiches on critical hits", level => 5, level => (level * 0.1), { maxLevel: 10, ameAmount: 100 }),
    gems2ame: new AmeliorerUpgrade("gems2ame", "Gems To Amé", "Makes it possible to convert 500 rubies to 1 Améliorer", level => 10, level => level, { maxLevel: 1, ameAmount: 100 }),
    keepSWU: new AmeliorerUpgrade("keepSWU", "Keep Sandwich Upgrades", "Keep Sandwich Upgrades after a prestige", level => 10, level => level, { maxLevel: 6, ameAmount: 120, current: level => ["None", "Better Fridge", "1. Upgrade boosts clicks", "Cheese", "Auto Shgabb", "2+2=5", "Meaning Of Life"][level] }),
}