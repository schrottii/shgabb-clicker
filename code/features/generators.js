class Generator {
    constructor(ID, name, price, effect) {
        this.ID = ID;
        this.name = name;
        this.price = price;
        this.effect = effect;
        // saved as [level, prod, ++]
    }

    getLevel() {
        if (!isValid(game.generators[this.ID])) game.generators[this.ID] = [0, new Decimal(0), 0];
        return game.generators[this.ID][0];
    }

    currentPrice() {
        return this.price(this.getLevel());
    }

    currentEffect() {
        return this.getLevel() > 0 ? this.effect(this.getLevel()) : new Decimal(0);
    }

    currentProd() {
        return game.generators[this.ID][1].add(1);
    }

    tick(t) {
        if (!isValid(game.generators[this.ID])) game.generators[this.ID] = [0, new Decimal(0), 0];
        if (this.getLevel() == 0) return false;
        game.generators[this.ID][1] = game.generators[this.ID][1].add(this.currentEffect().mul(t));
        game.genpoints = game.genpoints.add(this.currentProd().mul(t));
    }

    upgrade() {
        if (game.gs.gte(this.currentPrice())) {
            game.gs = game.gs.sub(this.currentPrice());
            game.generators[this.ID][0] += 1;
            renderGenerators();
        }
    }

    isVisible() {
        if (this.ID == 0) return true;
        return generators[this.ID - 1].getLevel() > 0;
    }

    render() {
        let render = `<div class='generatorButton' style='width: 45%;'>`
        render = render + "<b>" + '<img class="currency" src="images/generators.png" />' + this.name + '<img class="currency" src="images/generators.png" />' + "</b>";
        render = render + "<br />Level: " + this.getLevel();
        render = render + "<br />Effect: +" + fn(this.currentEffect()) + " prod/s";
        render = render + "<br />Prod: x" + fn(this.currentProd()) + " Genpoints/s";

        render = render + "<br /><button class='grayButton' onclick='upgradeGenerator(" + this.ID + ")'>"
            + "Upgrade: " + fn(this.currentPrice()) + cImg("gs")
            + "</button>";

        render = render + "</div>";
        return render;
    }
}

function unlockedGenerators() {
    return game.stats.hms >= 3000;
}

function calcGenPointsProd() {
    if (!unlockedGenerators()) return new Decimal(0);
    return new Decimal(1)
        .mul(generators[0].currentProd())
        .mul(generators[1].currentProd())
        .mul(generators[2].currentProd())
        .mul(generators[3].currentProd())
        .mul(generators[4].currentProd());
}

function updateGenerators(tick) {
    // tick
    for (let g in generators) {
        generators[g].tick(Math.min(tick * 60, 6));
    }

    // render
    renderGenerators();
}

function renderGenerators() {
    let ren = "<h2>Generators</h2>";
    ren = ren + "<br />Genpoints: " + fn(game.genpoints.toFixed(2)) + "<br />x" + fn(getGenpointBoost()) + " (^" + (getGeneratorsPurchased() * 0.1) + ") " + cImg("shgabb");
    ren = ren + "<hr style='clear: both;' /><div  class='upgradesContainer'>";
    for (let g in generators) {
        if (generators[g].isVisible()) ren = ren + generators[g].render();
    }

    ui.generatorsRender.innerHTML = "</div>" + ren;
}

function upgradeGenerator(ID) {
    generators[ID].upgrade();
}

function getGenpointBoost() {
    return game.genpoints.pow(0 + 0.1 * getGeneratorsPurchased());
}

function getGeneratorsPurchased() {
    let generatorsPurchased = 0;
    for (let g in generators) {
        if (generators[g].getLevel() > 0) generatorsPurchased++;
    }
    return generatorsPurchased;
}

const generators = [
    new Generator(0, "Cheap Generator", (l) => new Decimal(1e2).pow(l + 1), (l) => new Decimal(1.20).pow(l).sub(1)),
    new Generator(1, "Balanced Generator", (l) => new Decimal(1e4).pow(l + 1), (l) => new Decimal(1.30).pow(l).sub(1)),
    new Generator(2, "Boost Generator", (l) => new Decimal(1e10).pow(l + 1), (l) => new Decimal(2).pow(l)),
    new Generator(3, "Weak Generator", (l) => new Decimal(1e15).pow(l + 1), (l) => new Decimal(1.20).pow(l).sub(1)),
    new Generator(4, "Powerful Generator", (l) => new Decimal(1e25).pow(l + 1), (l) => new Decimal(3).pow(l)),
];