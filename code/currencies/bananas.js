// Game made by Schrottii - editing or stealing is prohibited!
// Currency file

function unlockedBananas() {
    return game.stats.hms >= 15000;
}

function prestigeBananaSeeds() {
    if (!unlockedBananas()) return false;

    let time = Math.min(15 * 60, game.stats_prestige.playTime);

    // no banana seeds below 1 minute
    if (time < 60) return false;

    // up to 18% chance
    if (Math.random() * 100 > time / 50) {
        game.bananaseeds += 1;
        statIncrease("bananaseeds", 1);
        return true;
    }

    return false;
}

function getBananaTreeAmount() {
    let amount = 0;

    for (let possibleTree in game.bananatrees) {
        if (game.bananatrees[possibleTree].active != undefined && game.bananatrees[possibleTree].active == true) {
            amount++;
        }
    }

    return amount;
}

function bananaTreePlant() {
    if (game.bananaseeds > 0 && getBananaTreeAmount() < 4) {
        game.bananatrees.push({
            id: game.stats.bananatrees,
            active: true,
            date: today(),
            days: 0,
            bananas: 0,
        });

        statIncrease("bananatrees", 1); // 1 new tree planted
        game.bananaseeds -= 1;
    }

    renderBananaTrees();
}

function getTreeByID(id) {
    for (let tree in game.bananatrees) {
        if (game.bananatrees[tree].id == id) {
            return tree;
        }
    }

    return -1;
}

function calcTreeDeathChance(thisTree) {
    // chance of a banana tree getting destroyed when you collect its bananas
    // returns in %

    return 10 + thisTree.days * 5;
}

function clickBananaTree(thisTree) {
    let amount = game.bananatrees[thisTree].bananas;

    game.bananas += amount;
    statIncrease("bananas", amount);

    game.bananatrees[thisTree].bananas = 0;
    if (Math.random() * 100 < calcTreeDeathChance(game.bananatrees[thisTree])) {
        game.bananatrees.splice(getTreeByID(game.bananatrees[thisTree].id), 1);
    }

    renderBananaTrees();
}

function increaseBananas(multi) {
    // every click gives you a 10% chance of increasing the bananas of a tree
    // so with 4 trees it's a 40% chance for some increase

    for (let tree in game.bananatrees) {
        if (Math.random() < bananaUpgrades.bananaChance.currentEffect() / 100 * multi) {
            game.bananatrees[tree].bananas += game.bananatrees[tree].days + 1;
        }
    }

    renderBananaTrees();
}

function calcClaimableBananas() {
    let amount = 0;

    for (let tree in game.bananatrees) {
        amount += game.bananatrees[tree].bananas;
    }

    return amount;
}

function renderBananaTrees() {
    let render = "";
    let t;

    for (let tree in game.bananatrees) {
        t = game.bananatrees[tree];
        render = render + '<button class="grayButton" onclick="clickBananaTree(' + getTreeByID(t.id) + ')"><img src="images/' + (t.bananas > 0 ? "bananatree" : "bananatree-empty") + '.png" /><br />Banana Tree #' + t.id
            + '<br />Days: ' + t.days + ' (Planted: ' + formatDate(t.date) + ')'
            + '<br />Click to earn ' + t.bananas + cImg("banana") + '! (' + calcTreeDeathChance(t) + '% chance of destroying the tree)'
            + '</button>';
    }

    ui.bananatreesrender.innerHTML = render;
}