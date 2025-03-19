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
        return Math.max(1, this.boost(level));
    }
}

var enableThisChallenge = 0;

// game.clg [] = array of challenge tiers
// game.aclg = active challenge (int)

function getChallenge(ID) {
    // 1 is the first one
    return challenges[ID - 1];
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

function startChallenge(ID) {
    if (game.stats_prestige.playTime < 15) {
        alert("Can't prestige yet! " + game.stats_prestige.playTime.toFixed(0) + "/15");
        return false;
    }
    if (!isChallenge(0)) {
        alert("Already in a Challenge! Use Prestige to leave!");
        return false;
    }

    if (currentGems() <= getChallenge(ID).getPrice()) {
        alert("Not enough Gems!");
        return false;
    }

    game.gems -= getChallenge(ID).getPrice();

    enableThisChallenge = ID;
    prestigeButton();
    enableThisChallenge = 0;
    renderChallenges();
}

function renderChallenges() {
    let render = "";

    for (c in challenges) {
        let cha = getChallenge(parseInt(c) + 1);
        if (challenges[c].isUnlocked()) render = render + "<button onclick='startChallenge(" + (parseInt(c) + 1) + ")' class='challenge' style='" + (game.aclg == cha.ID ? "background-color: rgb(225, 225, 225); " : "") + "background-image: url(images/challenges/challenge" + (parseInt(c) + 1) + ".png); background-size: cover; background-blend-mode: lighten;" + "'><img src='images/challenges/challenge" + (parseInt(c) + 1) + ".png' style='min-width: 160px; max-width: 288px'><br><b>" + cha.name
            + "<br />Tier " + cha.getTier()
            + "</b><br>" + cha.description
            + "<hr /><b>Goal:</b> " + cha.getGoal() + " More Shgabb"
            + "<br /><b>Price:</b> " + cha.getPrice() + " Gems to start"
            + "<br /><b>Boost:</b> x" + fn(cha.getBoost()) + " " + cha.boostTypeDisplay
            + "</button>"

        else render = render + "<button class='challenge'><b>" + cha.name + "</b><br>Unlocked at " + cha.unlock + " More Shgabb</button>"
    }
    ui.challengeRender.innerHTML = render;
}

function getTotalTiers() {
    let totalTiers = 0;
    for (c in challenges) {
        totalTiers += challenges[c].getTier();
    }
    return totalTiers;
}

function getHighestTier() {
    let highestTier = 0;
    for (c in challenges) {
        if (challenges[c].getTier() > highestTier) highestTier = challenges[c].getTier();
    }
    return highestTier;
}

var challenges = [
    new Challenge(1, 6000, t => 4000 + 1000 * t, "Basic Climb", "Only the first two Shgabb Upgrades are available, and no Sandwich Upgrades!", t => Math.floor(4 * Math.pow(1.5, t)), "Sandwiches"),
    new Challenge(2, 6000, t => 1500 + 500 * t, "Blue Cuts", "Shgabb production is reduced MASSIVELY", t =>  Math.floor(6 * Math.pow(6, t)), "Shgabb"),
    new Challenge(3, 8000, t => 6000 + 2000 * t, "Manual Grind", "Click cooldown is fixed at 20s and auto is disabled", t =>  Math.floor(5 * Math.pow(2.2, t)), "Click Shgabb"),
    new Challenge(4, 10000, t => 6000 + 2000 * t, "Dementia", "Shgabb Upgrades lose levels all the time", t =>  Math.floor(5 * Math.pow(2.2, t)), "Auto Shgabb"),
    new Challenge(5, 12000, t => 8000 + 2000 * t, "Ill-lit Dwn-upg", "Upgrade costs and levels are invisible. Buy one that's too expensive and its level gets reset!", t => 1 + 0.25 * t, "Artifact drop rate"),
    new Challenge(6, 12000, t => 400 + 100 * t, "Inflation", "Upgrades are far more expensive", t => 2 * Math.pow(1.25, t), "cheaper Shgabb upgrades"),
];