class Upgrade {
    constructor(ID, name, description, price, effect, config) {
        this.ID = ID;
        this.name = name;
        this.description = description;

        this.price = price;
        this.effect = effect;
        if (config) {
            if (config.maxLevel) this.maxLevel = config.maxLevel;
            if (config.suffix) this.suffix = config.suffix;
        }
    }

    buy() {
        if (game.shgabb >= this.currentPrice() && (this.maxLevel == undefined || this.currentLevel() < this.maxLevel)) {
            game.shgabb -= this.currentPrice();
            game.upgradeLevels[this.ID] += 1;
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

    render() {
        return "<button class='upgrade' onclick='buyUpgrade(shgabbUpgrades." + this.ID + ")'><div style='font-size: 20px'>" + this.name + "</div>" + this.description + "<br />Level: " + this.currentLevel() + (this.maxLevel != undefined ? " (Max: " + this.maxLevel + ")" : "") + "<br /> Cost: " + this.currentPrice() + "<br />Effect: " + this.currentEffect() + (this.suffix != undefined ? this.suffix : "") + "</button><br /><br />";
    }
}

var shgabbUpgrades = {
    moreShgabb: new Upgrade("moreShgabb", "Get More Shgabb", "Get more shgabb per click", level => level * 5 * Math.max(1, level / 25) + 5, level => level),
    critChance: new Upgrade("critChance", "Crit. Chance", "Increase the chance for a critical hit (3x)", level => level * 10 * Math.max(1, level / 12) + 25, level => 3 + (level / 10), { maxLevel: 70, suffix: "%"})
}