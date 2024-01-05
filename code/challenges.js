// Game made by Schrottii - editing or stealing is prohibited!

class Challenge {
    constructor(ID, unlock, goal, name, description) {
        this.ID = ID;
        this.unlock = unlock;
        this.goal = goal;
        this.name = name;
        this.description = description;
    }

    isUnlocked() {
        return game.stats.hms >= this.unlock;
    }

    getTier() {
        while (game.clg[this.ID] == undefined) {
            game.clg.push(0);
        }
        return game.clg[this.ID] + 1;
    }

    getGoal() {
        return this.goal(this.getTier());
    }

    getPrice() {
        return 10 + 10 * this.ID * this.getTier();
    }
}

// game.clg [] = array of challenge tiers
// game.aclg = active challenge (int)

function getChallenge(ID) {
    return challenges[ID];
}

function challengeValue(challengeName, trueValue, falseValue) {
    if (game.aclg == challengeName) return trueValue;
    else return falseValue;
}

function unlockedChallenges() {
    return getChallenge(1).isUnlocked();
}

function renderChallenges() {
    let render = "";

    for (c in challenges) {
        render = render + "<button class='challenge'><img src='images/achievements/empty.png'><br><b>" + getChallenge(c).name + "<br />Tier " + getChallenge(c).getTier() + "</b><br>" + getChallenge(c).description + "<br />Goal: " + getChallenge(c).getGoal() + " More Shgabb<br />" + getChallenge(c).getPrice() + " Gems to start" + "</button>"
    }
    ui.challengeRender.innerHTML = render;
}

var challenges = [
    new Challenge(1, 6000, t => 3000 + 1000 * t, "Basic Climb", "Only the first two Shgabb and Sandwich Upgrades are available!"),
    new Challenge(2, 6000, t => 1000 + 500 * t, "Blue Cuts", "Shgabb production is reduced MASSIVELY"),
];