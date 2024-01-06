// Game made by Schrottii - editing or stealing is prohibited!

class Challenge {
    constructor(ID, unlock, goal, name, description, boost, boostTypeDisplay) {
        this.ID = ID;
        this.unlock = unlock;
        this.goal = goal;
        this.name = name;
        this.description = description;
        this.boost = boost;
        this.boostTypeDisplay = boostTypeDisplay;
    }

    isUnlocked() {
        return game.stats.hms >= this.unlock;
    }

    getTier() {
        while (game.clg[this.ID] == undefined) {
            game.clg.push(0);
        }
        return game.clg[this.ID];
    }

    getGoal() {
        return this.goal(this.getTier());
    }

    getPrice() {
        return 10 + 10 * this.ID * (this.getTier() + 1);
    }

    getBoost(level = -1) {
        if (level == -1) level = this.getTier();
        if (level == 0) return 1;
        return Math.max(1, Math.floor(this.boost(level)));
    }
}

// game.clg [] = array of challenge tiers
// game.aclg = active challenge (int)

function getChallenge(ID) {
    return challenges[ID];
}

function challengeValue(challengeName, trueValue, falseValue) {
    // name is 1, 2, 3, etc.
    if (game.aclg == challengeName) return trueValue;
    else return falseValue;
}

function isChallenge(ID) {
    // 0 == no challenge
    // !isChallenge(0) == some challenge, doesn't matter which
    if (game.aclg == ID) return true;
    return false;
}

function unlockedChallenges() {
    return getChallenge(1).isUnlocked();
}

var enableThisChallenge = 0;
function startChallenge(ID) {
    if (!isChallenge(0)) {
        alert("Already in a Challenge! Use Prestige to leave!");
        return false;
    }

    if (game.gems <= getChallenge(ID - 1).getPrice()) {
        alert("Not enough Gems!");
        return false;
    }

    game.gems -= getChallenge(ID - 1).getPrice();

    enableThisChallenge = ID;
    prestigeButton();
    enableThisChallenge = 0;
    renderChallenges();
}

function renderChallenges() {
    let render = "";

    for (c in challenges) {
        if (challenges[c].isUnlocked()) render = render + "<button onclick='startChallenge(" + (parseInt(c) + 1) + ")' class='challenge'><img src='images/challenge" + (parseInt(c) + 1) + ".png' style='min-width: 192px; max-width=288px'><br><b>" + getChallenge(c).name + "<br />Tier " + getChallenge(c).getTier() + "</b><br>" + getChallenge(c).description + "<br />Goal: " + getChallenge(c).getGoal() + " More Shgabb<br />" + getChallenge(c).getPrice() + " Gems to start<br />Boost: x" + getChallenge(c).getBoost() + " " + getChallenge(c).boostTypeDisplay + "</button>"
        else render = render + "<button class='challenge'><b>" + getChallenge(c).name + "</b><br>Unlocked at " + getChallenge(c).unlock + " More Shgabb</button>"
    }
    ui.challengeRender.innerHTML = render;
}

var challenges = [
    new Challenge(1, 6000, t => 4000 + 1000 * t, "Basic Climb", "Only the first two Shgabb Upgrades are available, and no Sandwich Upgrades!", t => 4 * Math.pow(1.5, t), "Sandwiches"),
    new Challenge(2, 6000, t => 1000 + 500 * t, "Blue Cuts", "Shgabb production is reduced MASSIVELY", t => 6 * Math.pow(3, t), "Shgabb"),
    new Challenge(3, 8000, t => 6000 + 2000 * t, "Manual Grind", "Click cooldown is fixed at 20s and auto is disabled", t => 5 * Math.pow(2.2, t), "Click Shgabb"),
    new Challenge(4, 10000, t => 8000 + 2000 * t, "Dementia", "Shgabb Upgrades lose levels all the time", t => 5 * Math.pow(2.2, t), "Auto Shgabb"),
];