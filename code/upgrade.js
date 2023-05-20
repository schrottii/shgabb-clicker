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
        }
    }

    canBuy() {
        return game[this.currency] >= this.currentPrice() && (this.maxLevel == undefined || this.currentLevel() < this.maxLevel);
    }

    buy() {
        if (this.isUnlocked()) {
            if (this.canBuy()) {
                game[this.currency] -= this.currentPrice();
                game.upgradeLevels[this.ID] += 1;
                createNotification("Upgrade bought successfully");
                return true;
            }
            else {
                createNotification("Not enough " + this.currency + "!");
                return false;
            }
        }
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
        if (this.unlock == undefined || this.unlock()) return true;
        return false;
    }

    effectDisplay(level = 0) {
        let current = (settings.displayCurrent && this.current != undefined) ? " (Current: " + this.current(level == 0 ? this.currentLevel() : level) + ")" : "";
        if(level == 0) return (this.prefix != undefined ? this.prefix : "") + fn(this.effectMulti * this.currentEffect()) + (this.suffix != undefined ? this.suffix : "") + current;
        else return (this.prefix != undefined ? this.prefix : "") + fn(this.effectMulti * this.effect(level)) + (this.suffix != undefined ? this.suffix : "") + current;
    }

    render() {
        let isMax = this.maxLevel == this.currentLevel();
        let maxButton = "";
        if (goldenShgabbUpgrades.unlockMax.currentEffect() == 1 && ((this.maxLevel > 10 && this.currentLevel() != this.maxLevel) || this.maxLevel == undefined)) maxButton = "<div onclick='buyMax(" + this.type + "." + this.ID + ")' class='maxButton'>MAX</div>";
        if (this.isUnlocked()) return "<button class='upgrade' onclick='buyUpgrade(" + this.type + "." + this.ID + ")' style='background-color: " + (this.canBuy() ? "rgb(180, 255, 200)" : (this.currentLevel() == this.maxLevel ? "lightgray" : "whitesmoke")) + "'>" + maxButton + "<div style='font-size: 20px'>" + this.name + "</div>" + this.description + "<br />" + (isMax ? "MAX." : "Level: " + this.currentLevel() + (this.maxLevel != undefined ? " (Max: " + this.maxLevel + ")" : "")) + (isMax ? "" : "<br /> Cost: " + fn(this.currentPrice())) + "<br />Effect: " + this.effectDisplay(0) + (this.canBuy() ? " → " + this.effectDisplay(this.currentLevel() + 1) : "") + "</button><br /><br />";
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

var shgabbUpgrades = {
    moreShgabb: new Upgrade("moreShgabb", "Get More Shgabb", "Get more shgabb per click", level => (level * 5 * Math.max(1, level / 25) + 5) * Math.max(1, Math.pow(1.01, level - 500)), level => level),
    critChance: new Upgrade("critChance", "Crit. Chance", "Increase the chance for critical hits", level => level * 10 * Math.max(1, level / 12) + 25, level => 3 + (level / 10), { maxLevel: 70, suffix: "%" }),
    critBoost: new Upgrade("critBoost", "Crit. Boost", "Increase the strength of critical hits", level => level * 25 * Math.max(1, level / 2) + 50, level => 3 + (level / 10), { maxLevel: 20, prefix: "x" }),
    shorterCD: new Upgrade("shorterCD", "Shorter Cooldown", "Reduces the click cooldown", level => level * 40 * Math.max(1, level / 4) + 60, level => (level / 20), { maxLevel: 40, prefix: "-", suffix: "s", unlock: () => game.upgradeLevels.moreShgabb > 14 }),
    goodJoke: new Upgrade("goodJoke", "Good Joke", "Every third click gives more", level => level * 5 * Math.max(1, level / 8) + 20, level => 1 + (level / 50), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 24 }),
    bomblike: new Upgrade("bomblike", "Bomblike", "Get even more shgabb per click", level => Math.pow(5, 4 + (level * 1.5)), level => Math.max(1, level * 3), { maxLevel: 10, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 34 }),
    swChance: new Upgrade("swChance", "Sandwich Chance", "Increase the chance to make a delicious sandwich when clicking", level => level * 50 * Math.max(1, level / 5) + 250, level => 0.1 * level, { maxLevel: 250, suffix: "%", unlock: () => game.upgradeLevels.moreShgabb > 49 }),
    moreSw: new Upgrade("moreSw", "Sandwich Amount", "Get more sandwiches (by using more cheese)", level => 250 + Math.pow(4, 6 + level), level => level, { maxLevel: 19, unlock: () => game.upgradeLevels.swChance > 24 }),
}

var sandwichUpgrades = {
    autoShgabb: new SandwichUpgrade("autoShgabb", "Get Shgabb Automatically", "Automatically earn shgabb without having to click", level => (2 + level) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.05) * (-1), Math.sin(level * 0.05))) / 8), level => level * 5 + Math.max(0, 5 * (level - 24)) + Math.max(0, 10 * (level - 50)) + Math.max(0, 5 * (level - 101)), { unlock: () => game.upgradeLevels.swChance > 0 }),
    fridge: new SandwichUpgrade("fridge", "Better Fridge", "Keep the sandwiches cool for longer (More time before they stop making shgabb)", level => (6 + level * 2) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.2) * (-1), Math.sin(level * 0.2))) / 6), level => level * 4, { maxLevel: 60, unlock: () => game.upgradeLevels.swChance > 0 }),
    firstBoostsClicks: new SandwichUpgrade("firstBoostsClicks", "1. Upgrade boosts clicks", "The first sandwich upgrade also boosts shgabb from clicks", level => (40 + level * 20) * (0.6 + Math.max(0.2, Math.max(Math.sin(level * 0.4) * (-1), Math.sin(level * 0.2))) / 6), level => level / 2, { maxLevel: 20, suffix: "%", current: level => "x" + ((sandwichUpgrades.autoShgabb.currentLevel() * (sandwichUpgrades.firstBoostsClicks.effect(level) / 100)) + 1).toFixed(1), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 0 }),
    cheese: new SandwichUpgrade("cheese", "Cheese", "Increases auto shgabb based on clicks", level => 10 * Math.pow(1.13, level), level => level / 200, { maxLevel: 100, suffix: "%", effectMulti: 100, current: level => "+" + fn(Math.ceil(getProduction() * sandwichUpgrades.cheese.effect(level))), unlock: () => goldenShgabbUpgrades.unlockMSW.currentLevel() > 1 }),
}

var goldenShgabbUpgrades = {
    divineShgabb: new GoldenShgabbUpgrade("divineShgabb", "Divine Shgabb", "Get even more shgabb - from clicks and auto!", level => (10 + level * 2) * Math.pow(1.02, level), level => 1 + level * 0.2 + (0.1 * Math.max(level - 50, 0)) + (0.2 * Math.max(level - 100, 0)), { prefix: "x" }),
    shortCD: new GoldenShgabbUpgrade("shortCD", "Even Shorter Cooldown", "Reduces the click cooldown", level => 100 * level + 100, level => level * 0.1, { maxLevel: 5, prefix: "-", suffix: "s" }),
    gsBoost1: new GoldenShgabbUpgrade("gsBoost1", "GS boosts shgabb 1", "Get more shgabb from clicks based on current golden shgabb", level => (20 + level * 5) * Math.pow(1.09, level), level => 1 + level * Math.ceil(Math.log(game.gs + 1)), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.shortCD > 4 }),
    gsBoost2: new GoldenShgabbUpgrade("gsBoost2", "GS boosts shgabb 2", "Get more auto shgabb based on total golden shgabb", level => (20 + level * 5) * Math.pow(1.04, level), level => 1 + level * Math.ceil(1.3 * Math.log(game.stats.gs + 1)), { maxLevel: 100, prefix: "x", unlock: () => game.stats.gs > 999 }),
    unlockMax: new GoldenShgabbUpgrade("unlockMax", "Unlock Buy Max", "Unlock buy max buttons for most upgrades", level => 3000, level => level, { maxLevel: 1, unlock: () => game.stats.gs > 2999 }),
    unlockMSW: new GoldenShgabbUpgrade("unlockMSW", "Unlock More Sandwich Upgrades", "Unlock two new sandwich upgrades", level => 2500, level => level, { maxLevel: 2, unlock: () => sandwichUpgrades.autoShgabb.currentLevel() > 79 }),
}

var siliconeShgabbUpgrades = {
    moreSilicone: new SiliconeShgabbUpgrade("moreSilicone", "More Silicone", "Get even more silicone", level => (8 + level * 2) * Math.pow(1.025, level), level => 1 + level, { suffix: "/sec" }),
    strongerSilicone: new SiliconeShgabbUpgrade("strongerSilicone", "Stronger Silicone", "Increase the silicone boost, based on √play time", level => (60 + level * 24) * Math.pow(1.25, level), level => level * 0.001, { maxLevel: 100, current: level => "x" + fn(Math.log10(10 + game.si * (1 + siliconeShgabbUpgrades.strongerSilicone.effect(level) * Math.sqrt(game.stats.playTime)))) + " shgabb", effectMulti: 100, suffix: "%" }),
}