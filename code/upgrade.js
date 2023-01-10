class Upgrade {
    constructor(ID, name, description, price, effect, config) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.currency = "shgabb";
        this.type = "shgabbUpgrades";

        this.price = price;
        this.effect = effect;
        if (config) {
            if (config.maxLevel) this.maxLevel = config.maxLevel;
            if (config.prefix) this.prefix = config.prefix;
            if (config.suffix) this.suffix = config.suffix;
            if (config.unlock) this.unlock = config.unlock;
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
            }
            else {
                createNotification("Not enough " + this.currency + "!");
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

    render() {
        let isMax = this.maxLevel == this.currentLevel();
        if (this.isUnlocked()) return "<button class='upgrade' onclick='buyUpgrade(" + this.type + "." + this.ID + ")' style='background-color: " + (this.canBuy() ? "rgb(180, 255, 200)" : "whitesmoke") + "'><div style='font-size: 20px'>" + this.name + "</div>" + this.description + "<br />" + (isMax ? "MAX." : "Level: " + this.currentLevel() + (this.maxLevel != undefined ? " (Max: " + this.maxLevel + ")" : "")) + (isMax ? "" : "<br /> Cost: " + this.currentPrice()) + "<br />Effect: " + (this.prefix != undefined ? this.prefix : "") + this.currentEffect().toFixed(1) + (this.suffix != undefined ? this.suffix : "") + "</button><br /><br />";
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

var shgabbUpgrades = {
    moreShgabb: new Upgrade("moreShgabb", "Get More Shgabb", "Get more shgabb per click", level => level * 5 * Math.max(1, level / 25) + 5, level => level),
    critChance: new Upgrade("critChance", "Crit. Chance", "Increase the chance for critical hits", level => level * 10 * Math.max(1, level / 12) + 25, level => 3 + (level / 10), { maxLevel: 70, suffix: "%" }),
    critBoost: new Upgrade("critBoost", "Crit. Boost", "Increase the strength of critical hits", level => level * 25 * Math.max(1, level / 2) + 50, level => 3 + (level / 10), { maxLevel: 20, prefix: "x" }),
    shorterCD: new Upgrade("shorterCD", "Shorter Cooldown", "Reduces the click cooldown", level => level * 40 * Math.max(1, level / 4) + 60, level => (level / 20), { maxLevel: 40, prefix: "-", suffix: "s", unlock: () => game.upgradeLevels.moreShgabb > 14 }),
    goodJoke: new Upgrade("goodJoke", "Good Joke", "Every third click gives more", level => level * 5 * Math.max(1, level / 8) + 20, level => 1 + (level / 50), { maxLevel: 100, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 24 }),
    bomblike: new Upgrade("bomblike", "Bomblike", "Get even more shgabb per click", level => Math.pow(5, 4 + (level * 2)), level => Math.max(1, level * 3), { maxLevel: 10, prefix: "x", unlock: () => game.upgradeLevels.moreShgabb > 34 }),
    swChance: new Upgrade("swChance", "Sandwich Chance", "Increase the chance to make a delicious sandwich when clicking", level => level * 50 * Math.max(1, level / 5) + 250, level => 0.1 * level, { maxLevel: 250, suffix: "%", unlock: () => game.upgradeLevels.moreShgabb > 49 }),
    moreSw: new Upgrade("moreSw", "Sandwich Chance", "Get more sandwiches (by using more cheese)", level => 250 + Math.pow(4, 6 + level), level => level, { maxLevel: 9, unlock: () => game.upgradeLevels.swChance > 24 }),
}

var sandwichUpgrades = {
    autoShgabb: new SandwichUpgrade("autoShgabb", "Get Shgabb Automatically", "Automatically earn shgabb without having to click", level => (2 + level) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.05) * (-1), Math.sin(level * 0.05))) / 8), level => level * 5 + Math.max(0, 5 * (level - 24)) + Math.max(0, 10 * (level - 50)), { unlock: () => game.upgradeLevels.swChance > 0 }),
    fridge: new SandwichUpgrade("fridge", "Better Fridge", "Keep the sandwiches cool for longer (More time before they stop making shgabb)", level => (6 + level * 2) * (0.8 + Math.max(0.2, Math.max(Math.sin(level * 0.2) * (-1), Math.sin(level * 0.2))) / 6), level => level * 2, { maxLevel: 60, unlock: () => game.upgradeLevels.swChance > 0 }),
}