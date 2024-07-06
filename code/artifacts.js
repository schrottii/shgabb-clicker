// Game made by Schrottii - editing or stealing is prohibited!

/* TOC
 * toc_arti_class  | Artifact class - refer to its constructor and methods for more info
 * toc_arti_var    | Artifact variables
 * toc_arti_global | Global functions (getArtifact & its friends)
 * toc_arti_fun    | Artifact-section related functions
 * toc_arti_artis  | artifacts dictionary, all of the artis are there
 */

// toc_arti_class
// Artifact class, the heart of the arti
//

class Artifact {
    constructor(ID, rarity, tier, name, image, config) {
        // ID: unique identifier - commons: 100 - 199, rares: 200 - 299, epics: 300 - 399, legendaries: 400 - 499
        this.ID = ID;
        this.rarity = rarity; // 1 (common) - 4 (legendary)
        this.tier = tier; // see getHMSNeeded: tier is 1 - 4
        this.name = name;
        this.image = image; // name and file extension

        // defaults
        this.prefix = "x";

        // config is the last part, following ID, rarity, tier, name and image (which EVERY arti has)
        // this contains everything that is NOT the same for EVERY arti
        if (config) {
            // decorative stuff
            if (config.prefix) this.prefix = config.prefix; // prefix before its number
            if (config.desc) this.desc = config.desc; // custom description (most non-simple artis have this)

            // important values
            if (config.maxLevel) this.maxLevel = config.maxLevel; // set a max. level, gem and speed artis have this

            // simple boost
            if (config.simpleBoost) {
                this.boost = config.simpleBoost[0];
                this.amount = config.simpleBoost[1];
                this.simpleTrigger = config.simpleBoost[2] != undefined ? config.simpleBoost[2] : () => true;
            }

            // value
            if (config.value) {
                this.value = config.value;
                this.valueDefault = this.value[0];
                this.valueMin = this.value[1];
                this.valueMax = this.value[2];
            }

            // timer
            if (config.timer) {
                this.timer = config.timer;
                this.timerMax = this.timer[0];
                this.timerDefault = this.timer[1] != undefined ? this.timer[1] : 0;
                this.timerCondition = this.timer[2] != undefined ? this.timer[2] : () => true;
            }
            
            // artifact events
            if (config.onClick) this.onClick = config.onClick;
            if (config.onClickBefore) this.onClickBefore = config.onClickBefore;
            if (config.onAuto) this.onAuto = config.onAuto;
            if (config.onUpgrade) this.onUpgrade = config.onUpgrade;
            if (config.onDestroy) this.onDestroy = config.onDestroy;
            if (config.onAutoSave) this.onDestroy = config.onAutoSave;
            if (config.onGem) this.onGem = config.onGem;
            if (config.onTimerZero) this.onTimerZero = config.onTimerZero;
        }
    }

    // info methods (get...)
    getRarity() {
        return ["ERROR", "Common", "Rare", "Epic", "Legendary", ""][this.rarity];
    }

    getEffect(level = false) {
        if (typeof (this.amount) == "function") return level == false ? this.amount(this.getLevel()) : this.amount(level);
        return this.amount;
    }

    getLevel() {
        if (game.alvl[this.ID] == undefined) game.alvl[this.ID] = 1; // if it doesn't exist

        return game.alvl[this.ID] + (getArtifact(400).isEquipped() && (this.canIncreaseLevel() || game.alvl[this.ID] < this.getMaxLevel()) ? 1 : 0);
    }

    getMaxLevel() {
        if (this.maxLevel == undefined) return 3 + ameliorerUpgrades.fourthArtifactLevel.currentEffect();
        return this.maxLevel;
    }

    getHMSNeeded() {
        switch (this.tier) {
            case 1:
                return 0;
            case 2:
                return 2000;
            case 3:
                return 5000;
            case 4:
                return 8000;
        }
    }

    getDescription(level = false) {
        if (typeof (this.desc) == "function") return level == false ? this.desc(this.getLevel()) : this.desc(level);
        else if (this.desc != undefined) return this.desc;
        return "";
    }

    getBoostType() {
        switch (this.boost) {
            case "shgabb":
                return "Shgabb";
            case "clickshgabb":
                return "Click Shgabb";
            case "autoshgabb":
                return "Auto Shgabb";
            case "resetshgabb":
                return "Reset Shgabb";
            case "sw":
                return "Sandwiches";
            case "gs":
                return "GS";
            case "prestigegs":
                return "Prestige GS";
            case "si":
                return "Silicone Shgabb";
            case "clickspeed":
                return "click cooldown";
            case "gemchance":
                return "Gem chance";
            case "gems":
                return "Gems";
            case "artifactchance":
                return "Artifact chance";
            case "clicksi":
                return "Click Silicone";
            case "bags":
                return "Bags";
        }
    }

    // status methods (is...), return booleans
    isUnlocked() {
        // returns true if you HAVE this arti
        if (game.a.includes(this.ID)) return true;
        return false;
    }

    isEquipped() {
        // returns true if you have it CURRENTLY EQUIPPED
        if (game.aeqi.includes(this.ID)) return true;
        return false;
    }

    isUpgradable() {
        // returns true if it's below the max. level
        if (artifactMode == "upgrade" && this.getLevel() < this.getMaxLevel()) return true;
        return false;
    }

    canIncreaseLevel() {
        if (this.maxLevel == undefined) return true;
        return false;
    }

    // everything related to values and timers
    // a value can have a custom min and max, as well as a custom starting point
    // a timer can have a custom starting point and custom max, but the min is always 0 which it ticks down to
    getValue(returnIfNone = 1) {
        // get current value
        if (artifactValues[this.ID] != undefined) return artifactValues[this.ID];
        return returnIfNone;
    }

    getValueMax() {
        // get current value max
        if (typeof (this.valueMax) == "function") return this.valueMax();
        return this.valueMax;
    }

    setValue(set) {
        // set value to x (max > x > min)
        artifactValues[this.ID] = Math.max(this.valueMin, Math.min(this.getValueMax(), set));
    }

    increaseValue(add) {
        // increase value by x (max > x > min)
        artifactValues[this.ID] = Math.max(this.valueMin, Math.min(this.getValueMax(), artifactValues[this.ID] + add));
    }

    resetValue() {
        // reset value to its default value (often 0)
        artifactValues[this.ID] = this.valueDefault;
    }

    getTimer(returnIfNone = 1) {
        // get current timer
        if (artifactTimers[this.ID] != undefined) return artifactTimers[this.ID];
        return returnIfNone;
    }

    setTimer(set) {
        // set timer to x (max > x > 0)
        artifactTimers[this.ID] = Math.max(0, Math.min(this.timerMax, set));
    }

    fillTimer() {
        // fill the timer to its max (e. g. 60)
        artifactTimers[this.ID] = this.timerMax;
    }

    resetTimer() {
        // reset the timer to its default (usually 0)
        artifactTimers[this.ID] = this.timerDefault;
    }

    tickTimer(delta) {
        // tick timer down by delta (down to 0, don't go negative)

        if (this.timerCondition) {
            if (artifactTimers[this.ID] != 0 && Math.max(0, artifactTimers[this.ID] - delta) == 0) artifactEvent("onTimerZero");
            if (Math.ceil(artifactTimers[this.ID]) != Math.ceil(Math.max(0, artifactTimers[this.ID] - delta))) updateArtifacts();
            artifactTimers[this.ID] = Math.max(0, artifactTimers[this.ID] - delta);
        }
    }

    // render methods - pretty much exclusively used by the arti list
    renderBG() {
        // bg color of the arti, depending on the mode
        if (artifactMode == "select") return this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
        if (artifactMode == "upgrade") return this.isUpgradable() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
        if (artifactMode == "destroy") return this.getLevel() == 1 && !this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
        return "rgb(0, 0, 0)";
    }

    renderSimpleEffect() {
        // the effect (simple effect only)
        if (this.boost == undefined) return "";

        let render = (this.boost == undefined ? "" : "<br />" + this.prefix + fn(this.getEffect()) + " " + this.getBoostType());
        if (this.isUpgradable()) render = render + " → " + (this.boost == undefined ? "" : "<br />" + this.prefix + fn(this.getEffect(this.getLevel() + 1)) + " " + this.getBoostType());
        return render;
    }

    renderDescription() {
        // the custom description (not the whole thing)
        if (this.isUpgradable()) return (this.getDescription(this.getLevel() + 1) ? ("<span style='font-size: " + (this.getDescription(this.getLevel() + 1).length > 40 ? "10" : "12") + "px'>" + this.getDescription(this.getLevel() + 1) + "</span>") : "");
        else return (this.getDescription() ? ("<span style='font-size: " + (this.getDescription().length > 40 ? "10" : "12") + "px'>" + this.getDescription() + "</span>") : "");
    }

    innerRender() {
        // this is used for the search, it removes some keywords like "onclick" or "font-size"
        return this.ID + " " + this.image + (this.isEquipped() && !this.isUpgradable() ? "[EQUIPPED] " : " ") + this.name + " " + this.getRarity() + " Level " + getArtifact(this.ID).getLevel()
            + " " + this.renderSimpleEffect() + this.renderDescription() + " tier " + this.tier;
    }

    render(clickable = true) {
        // what you see is what you get.
        return `<button class='artifact' ` + (clickable ? `onclick='clickArtifact(` + this.ID + `)'` : "") + ` style='background-color: ` + this.renderBG() + "'>" + (settings.artifactImages ? "<image src='images/arti/" + this.image + "' width='32px' height='32px'>" : "")
            + (this.isEquipped() && !this.isUpgradable() ? "<br><b>[EQUIPPED]</b>" : "") + "<br/><span style='font-size: 14px'>" + this.name + "</span><br />"
            + (!this.isUpgradable() ? (this.getRarity() + " L" + this.getLevel()) : getScrapCost(this.getLevel(), this.rarity) + " Artifact Scrap")
            + this.renderSimpleEffect() + "<br />" + this.renderDescription()
            // + (this.value != undefined ? ("<br />Value: " + this.getValue("?") + "/" + this.getValueMax()) : "")
            + (this.timer != undefined ? ("<br />Timer: " + this.getTimer(0).toFixed(0) + "/" + this.timerMax) : "")
            + "</button>";
    }
}

// toc_arti_var
// Various Artifact variables
//

var artifactMode = "select";
var artifactPage = 1;
var selectedLoadout = 0;
var rep7 = "ey";

var artifactValues = {};
var artifactTimers = {};

var hoodGoo = 0;
var techCollection = 0;

// toc_arti_global
// Global Artifact functions, used anywhere
//

// the 3 MVPs
function getArtifact(id) {
    // Use this to get an artifact using its ID, and then get its name, effect or whatever
    for (a in artifacts) {
        if (artifacts[a].ID == id) return artifacts[a];
    }
}

function getArtifactsSimpleBoost(currency) {
    let boost = 1;
    let thisArti;

    for (let arti in game.aeqi) {
        thisArti = getArtifact(game.aeqi[arti])
        if (thisArti.boost == currency) {
            if (thisArti.isUnlocked() && thisArti.isEquipped() && (thisArti.simpleTrigger == undefined || thisArti.simpleTrigger(game.alvl[game.aeqi[arti]]))) {
                boost *= thisArti.getEffect();
            }
        }
    }
    return boost;
}

function artifactEvent(eventName, v=false) {
    for (let arti in game.aeqi) { // Only the equipped artis
        if (getArtifact(game.aeqi[arti])[eventName] != undefined) {
            if (v != false) getArtifact(game.aeqi[arti])[eventName](getArtifact(game.aeqi[arti]).getLevel(), v);
            else getArtifact(game.aeqi[arti])[eventName](getArtifact(game.aeqi[arti]).getLevel());
        }
    }
}

// the 2 unlock functions
function unlockedArtifacts() {
    // returns true if you have unlocked artifacts
    return game.stats.hms >= 1000;
}

function unlockedArtifactUpgrading() {
    // returns true if you have unlocked upgrading artifacts
    return game.stats.artifactScrap > 0 || game.artifactScrap > 0;
}

// all & any
function allArtifactsOfRarity(rarity) {
    // returns true if you have ALL artifacts of this rarity
    // 1 (common) - 4 (legendary)
    for (a in artifacts) {
        if (artifacts[a].rarity == rarity && !artifacts[a].isUnlocked()) return false;
    }
    return true;
}

function anyArtifactsOfRarity(rarity) {
    // returns true if you have more than 0 artis of this rarity
    // 1 (common) - 4 (legendary)
    for (a in artifacts) {
        if (artifacts[a].rarity == rarity && artifacts[a].isUnlocked()) return true;
    }
    return false;
}

// player & total
function getArtifactAmount(rarity = 0) {
    // returns the amount of artifacts the player has of a set rarity
    // 0 = all, 1 = common, 2 = rare, 3 = epic, 4 = legendary
    // note: 0 in game.a is the confirmation your clicks prior to the release of Artifacts were used
    if (rarity == 0) return game.a.includes(0) ? game.a.length - 1 : game.a.length;

    let amount = 0;
    for (a in game.a) {
        if (game.a[a] == 0) continue;
        if (getArtifact(game.a[a]).rarity == rarity) amount++;
    }

    return amount;
}

function totalAmountOfArtifacts(rarity = 0) {
    // returns the amount of artifacts of a set rarity
    // 0 = all, 1 = common, 2 = rare, 3 = epic, 4 = legendary
    if (rarity == 0) return artifacts.length;

    let amount = 0;
    for (a in artifacts) {
        if (artifacts[a].rarity == rarity) amount++;
    }

    return amount;
}

// and well, these too
function getMaxArtifactAmount() {
    // how many artifacts you can equip (usually 3 or 4)
    return 3 + ameliorerUpgrades.fourthArtifactSlot.currentEffect();
}

function getScrapCost(level, rarity) {
    // how much it costs to upgrade
    // 1 common - 4 legendary
    // level = ITS CURRENT LEVEL
    switch (rarity) {
        case 1:
            return 100 * level;
        case 2:
            return 250 * level;
        case 3:
            return 1000 * level;
        case 4:
            return 10000 * level;
    }
    return 0;
}

// toc_arti_fun
// Artifact functions really only needed for the Artifact section itself
//

function renderArtifacts() {
    // used by the artifacts section, this renders all the artifacts on the current page
    let render = "";
    for (l = 0; l < game.al; l++) {
        let thisLoadoutName = (game.alnames[l] == "" || game.alnames[l] == undefined ? "Loadout " + (l + 1) : game.alnames[l]);
        render = render + "<button onclick='artifactLoadout(" + l + ", `arti`)' class='artifactLoadoutButton' style='background-color: " + (l == selectedLoadout ? "yellow" : "white") + "; font-size: " + (thisLoadoutName.length > 25 ? 12 : 16) + "px;'>" + thisLoadoutName + "</button>";
    }
    render = render + "<br />";

    // Mode buttons
    if (unlockedArtifactUpgrading()) {
        render = render + "<button onclick='changeArtifactMode(0)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "select" ? "white" : "gray") + "'>Select</button>";
        render = render + "<button onclick='changeArtifactMode(1)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "upgrade" ? "white" : "gray") + "'>Upgrade</button>";
        render = render + "<button onclick='changeArtifactMode(2)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "destroy" ? "white" : "gray") + "'>Destroy</button>";
        render = render + "<br />";
    }

    // Artifacts
    let currentArtifact;
    let renderTheseArtifacts = [];

    // Gather the Artifacts to render
    for (ara in artifacts) {
        if (artifacts[ara] == undefined) break;
        currentArtifact = getArtifact(artifacts[ara].ID);

        // only gather if you have it and it obeys the search filter
        if (currentArtifact.isUnlocked() && currentArtifact.innerRender().toUpperCase().includes(ui.artifactSearch.value.toUpperCase())
        ) {
            renderTheseArtifacts.push(currentArtifact.ID);
        }
    }

    // Render the Artifacts that were gathered
    for (ara = 0; ara < Math.min(50, renderTheseArtifacts.length); ara++) {
        if (getArtifact(renderTheseArtifacts[ara + ((artifactPage - 1) * 50)]) == undefined) break;
        render = render + getArtifact(renderTheseArtifacts[ara + ((artifactPage - 1) * 50)]).render();
    }

    // Page buttons
    if (getArtifactAmount() > 50) {
        render = render + "<br /><button class='grayButton' onclick='changeArtifactPage(0)' class='artifactLoadoutButton'>Previous Page</button>";
        render = render + "<button class='grayButton' onclick='changeArtifactPage(1)' class='artifactLoadoutButton'>Next Page</button>";
    }

    return render;
}

function changeArtifactMode(nr) {
    // swap between the modes
    switch (nr) {
        case 0:
            artifactMode = "select";
            break;
        case 1:
            artifactMode = "upgrade";
            break;
        case 2:
            artifactMode = "destroy";
            break;
    }
    updateArtifacts();
}

function changeArtifactPage(change) {
    // swap between the pages
    if (change == 0 && artifactPage > 1) artifactPage -= 1;
    if (change == 1 && artifactPage < getArtifactAmount() / 50) artifactPage += 1;
    updateArtifacts();
}

/*
function handleArtifactsFirstTime() {
    // for people who played before artis were added, now deprecated
    if (!game.a.includes(0)) {
        for (i = 0; i < Math.ceil(game.stats.clicks / 5); i++) {
            getNewArtifact(0.5);
        }
        game.a.push(0);
        createNotification("Artifacts awarded for past clicks successfully!");
    }
}
*/

function artifactLoadout(l, source = "key") {
    // select a different loadout, yeah this one looks a bit messy so let's explain it
    // game.aeqi is your currently selected artis
    // game.alo[l] is the loadout we are looking at

    if (game.al > l) { // only execute if you have bought this (gem offer)
        // if it's not in the dict yet, add it
        while (game.alo[l] == undefined) {
            game.alo.push([]);
        }

        if (game.alo[l].length > 0) {
            // if you have more artis in the loadout than you can have, pop em out (fourth artifact slot ame upgrade)
            while (game.alo[l].length > getMaxArtifactAmount()) {
                game.alo[l].pop();
            }
            let previous = game.aeqi;
            game.aeqi = game.alo[l];

            loadArtifactValues(previous);
        }
        else {
            // loadout is empty, equip nothing
            game.aeqi = [];
        }
        if (source == "arti" && selectedLoadout == l) {
            // triggers if you click the already selected loadout
            // only trigger if clicked, not from a hotkey

            // add names for loadouts if they don't exist yet
            while (game.alnames[l] == undefined) {
                game.alnames.push([""]);
            }

            // give it a new name
            let newName = prompt("Name for this loadout?");
            if (newName != null) newName = newName.substr(0, 40)
            if (newName != null) game.alnames[l] = newName != undefined && newName != "" ? newName : "";
        }
        else {
            // equip this loadout
            createNotification("Selected loadout: " + game.alnames[l]);
            selectedLoadout = l;
        }
    }

    // update artis regardless of what just happened
    updateArtifacts();
}

function loadArtifactValues(previous=[0]) {
    for (v in game.aeqi) { // values and timers
        if (getArtifact(game.aeqi[v]).value != undefined && !previous.includes(game.aeqi[v])) getArtifact(game.aeqi[v]).resetValue();
        if (getArtifact(game.aeqi[v]).timer != undefined && !previous.includes(game.aeqi[v])) getArtifact(game.aeqi[v]).resetTimer();
    }
}

function getNewArtifact(multi = 1) {
    // (Chance TO GET)
    // Chance to get an artifact

    if (getArtifact(158).isEquipped()) return 0; // the no artifacts artifact

    // multi1 = gem offer. multi2 = gem artis, events
    let multi2 = 1;
    if (multi == 1) multi2 = getArtifactsSimpleBoost("artifactchance") * eventValue("anniversary", 1.5, 1) * getChallenge(5).getBoost(); // Artifact chance artifacts only work from clicks, not the gem offer

    let chance = Math.random() * applyLuck(100);

    if (chance < 1 / 1000000 * multi * multi2) {
        if (Math.random() < 0.5 * !allArtifactsOfRarity(4) || !anyArtifactsOfRarity(4)) {
            gambleArtifact(4);
        }
        else if (anyArtifactsOfRarity(4)) {
            artifactDuplicate(4);
        }
    }
    else if (chance < 1 / 32000 * multi * multi2) {
        if (Math.random() < 0.5 * !allArtifactsOfRarity(3) || !anyArtifactsOfRarity(3)) {
            gambleArtifact(3);
        }
        else if (anyArtifactsOfRarity(3)) {
            artifactDuplicate(3);
        }
    }
    else if (chance < 1 / 4000 * multi * multi2) {
        if (Math.random() < 0.5 * !allArtifactsOfRarity(2) || !anyArtifactsOfRarity(2)) {
            gambleArtifact(2);
        }
        else if (anyArtifactsOfRarity(2)) {
            artifactDuplicate(2);
        }
    }
    else if (chance < 1 / 800 * multi * multi2) {
        if (Math.random() < 0.5 * !allArtifactsOfRarity(1) || !anyArtifactsOfRarity(1)) {
            gambleArtifact(1);
        }
        else if (anyArtifactsOfRarity(1)) {
            artifactDuplicate(1);
        }
    }
}

function setNextArtifact(r) {
    // Used by getNewArtifact - which one will we get of this rarity?
    let possibleArtifacts = [];
    for (a in artifacts) {
        if (artifacts[a].rarity == r && !artifacts[a].isUnlocked() && game.stats.hms >= artifacts[a].getHMSNeeded()) {
            possibleArtifacts.push(artifacts[a].ID);
        }
    }
    if (possibleArtifacts.length == 0) return 0;
    return gainedID = possibleArtifacts[Math.floor(Math.random() * possibleArtifacts.length)];
}

function checkForZeroNext() {
    for (i in game.nexgai) {
        if (game.nexgai[i] == 0) game.nexgai[i] = setNextArtifact(parseInt(i) + 1);
    }
}

function gambleArtifact(r) {
    if (game.nexgai[r - 1] == 0 || (getArtifact(game.nexgai[r - 1]) != undefined && getArtifact(game.nexgai[r - 1]).isUnlocked())) game.nexgai[r - 1] = setNextArtifact(r);
    r -= 1;
    // New artifact!
    game.a.push(game.nexgai[r]);
    createNotification("New Artifact: " + getArtifact(game.nexgai[r]).name);
    updateArtifacts();

    ui.newArtifactText = "New Artifact!";
    ui.newArtifactImage.src = "images/arti/" + getArtifact(game.nexgai[r]).image;
    ui.newArtifactName.innerHTML = getArtifact(game.nexgai[r]).name + " (" + getArtifact(game.nexgai[r]).getRarity() + ")";
    ui.newArtifact.style.display = "block";
    newArtifactDisplayTimer = 5;

    game.nexgai[r] = setNextArtifact(r);
}

function artifactDuplicate(rarity) {
    // this is triggered if we *know* that we are getting a duplicate, so let's see which one it is
    let possibleArtifacts = [];
    for (a in artifacts) {
        if (artifacts[a].rarity == rarity && artifacts[a].isUnlocked()) {
            possibleArtifacts.push(artifacts[a].ID);
        }
    }
    let gainedID = possibleArtifacts[Math.floor(Math.random() * possibleArtifacts.length)];

    // Duplicate...
    let amount = (allArtifactsOfRarity(rarity) ? 2 : 1) * (getScrapCost(1, rarity) / 10);
    createNotification("+" + amount + " Artifact Scrap for a duplicate " + getArtifact(gainedID).name + "!");
    game.artifactScrap += amount;
    statIncrease("artifactScrap", amount);

    ui.newArtifactText = "Duplicate!";
    ui.newArtifactImage.src = "images/currencies/artifactscrap.png";
    ui.newArtifactName.innerHTML = getArtifact(gainedID).name + " (" + getArtifact(gainedID).getRarity() + ")";
    ui.newArtifact.style.display = "block";
    newArtifactDisplayTimer = 5;
}

function clickArtifact(id) {
    // apply the arti mode depending on which one is selected
    // these three functions are below, in order
    switch (artifactMode) {
        case "select":
            switchArtifact(id);
            break;
        case "upgrade":
            upgradeArtifact(id);
            break;
        case "destroy":
            destroyArtifact(id);
            break;
    }
    updateArtifacts();
}

function switchArtifact(id) {
    if (getArtifact(id).isEquipped()) game.aeqi.splice(game.aeqi.indexOf(id), 1);
    else if (game.aeqi.length < getMaxArtifactAmount()) game.aeqi.push(id);
    game.alo[selectedLoadout] = game.aeqi;

    // value and timer
    if (getArtifact(id).value != undefined) getArtifact(id).resetValue();
    if (getArtifact(id).timer != undefined) getArtifact(id).resetTimer();

    freezeTime();
    updateArtifacts();
}

function upgradeArtifact(id) {
    if (game.alvl[id] == undefined) game.alvl[id] = 1;
    if (game.alvl[id] < getArtifact(id).getMaxLevel() && game.artifactScrap >= getScrapCost(game.alvl[id], getArtifact(id).rarity) && confirm("Use " + getScrapCost(game.alvl[id], getArtifact(id).rarity) + " Artifact Scrap to upgrade this?")) {
        game.artifactScrap -= getScrapCost(game.alvl[id], getArtifact(id).rarity);
        game.alvl[id] += 1;
    }
}

function destroyArtifact(id) {
    let rarity = getArtifact(id).rarity;
    let level = game.alvl[id];
    let amount = Math.floor(getScrapCost(level, rarity) / 5);
    if (confirm("Do you really want to destroy this Artifact for " + amount + " Artifact Scrap?")) {

        game.a.splice(game.a.indexOf(id), 1);
        delete game.alvl[id];
        if (game.aeqi.indexOf(id) != -1) game.aeqi.splice(game.aeqi.indexOf(id), 1);

        // Unequip
        for (loadout in game.alo) {
            if (game.alo[loadout].indexOf(id) != -1) game.alo[loadout].splice(game.alo[loadout].indexOf(id), 1);
        }

        artifactEvent("onDestroy");

        game.artifactScrap += amount;
        statIncrease("artifactScrap", amount);

        checkForZeroNext();

        createNotification("Received +" + amount + " Artifact Scrap for destroying " + getArtifact(id).name + "!");
    }
}





// toc_arti_artis
// List of all Artifacts, the dictionairy, my bible
//

var artifacts = [
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // COMMON ARTIFACTS
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    new Artifact(100, 1, 1, "Blue Ring", "ring.png",
        {
            simpleBoost: ["shgabb", level => 1 + 0.4 * level]
        }),

    new Artifact(101, 1, 1, "Yellow Ring", "ring.png",
        {
            simpleBoost: ["gs", level => 0.8 + 0.4 * level]
        }),

    new Artifact(102, 1, 1, "White Ring", "ring.png",
        {
            simpleBoost: ["sw", level => 1.25 + 0.25 * level]
        }),

    new Artifact(103, 1, 2, "Light Blue Ring", "ring.png",
        {
            simpleBoost: ["si", level => 1.25 + 0.25 * level]
        }),

    new Artifact(104, 1, 2, "Fading Blue Ring", "ring.png",
        {
            desc: "For 15s after a click",
            simpleBoost: ["shgabb", level => 2 + 0.5 * level, () => getArtifact(104).getTimer(0) > 0],
            timer: [15, 0],
            onClick: () => {
                getArtifact(104).fillTimer();
            }
        }),

    new Artifact(105, 1, 2, "Fading Yellow Ring", "ring.png",
        {
            desc: "For 15s after a click",
            simpleBoost: ["gs", level => 1.5 + 0.5 * level, () => getArtifact(105).getTimer(0) > 0],
            timer: [15, 0],
            onClick: () => {
                getArtifact(105).fillTimer();
            }
        }),

    new Artifact(106, 1, 2, "Fading White Ring", "ring.png",
        {
            desc: "For 15s after a click",
            simpleBoost: ["sw", level => 1.75 + 0.25 * level, () => getArtifact(106).getTimer(0) > 0],
            timer: [15, 0],
            onClick: () => {
                getArtifact(106).fillTimer();
            }
        }),

    new Artifact(107, 1, 2, "Fading Light Blue Ring", "ring.png",
        {
            desc: "For 15s after a click",
            simpleBoost: ["si", level => 1.75 + 0.25 * level, () => getArtifact(107).getTimer(0) > 0],
            timer: [15, 0],
            onClick: () => {
                getArtifact(107).fillTimer();
            }
        }),

    new Artifact(150, 1, 1, "Ring of Productivity", "ring.png",
        {
            simpleBoost: ["clickshgabb", level => 0.8 + 0.5 * level]
        }),

    new Artifact(151, 1, 1, "Ring of Laziness", "ring.png",
        {
            simpleBoost: ["autoshgabb", level => 0.8 + 0.5 * level]
        }),

    new Artifact(152, 1, 1, "Ring of Speed", "ring.png",
        {
            prefix: "/", maxLevel: 3,
            simpleBoost: ["clickspeed", level => 1.1 + 0.1 * level]
        }),

    new Artifact(153, 1, 1, "Shiny Red Ring", "ring.png",
        {
            prefix: "x", maxLevel: 3,
            simpleBoost: ["gemchance", level => 1 + 0.25 * level]
        }),

    new Artifact(154, 1, 1, "Pulsing Red Ring", "ring.png",
        {
            maxLevel: 3,
            simpleBoost: ["gems", level => [1, 1.5, 1.65, 1.75, 1.85, 2][level]]
        }),

    new Artifact(155, 1, 1, "Ring of Depression", "ring.png",
        {
            prefix: "x",
            simpleBoost: ["shgabb", level => 0.1 / Math.pow(100, level)]
        }),

    new Artifact(156, 1, 1, "Ring of Slowing", "ring.png",
        {
            prefix: "x",
            simpleBoost: ["clickspeed", level => 1 + 0.5 * level, () => false]
        }),

    new Artifact(157, 1, 2, "Gray Ring", "ring.png",
        {
            prefix: "x", maxLevel: 3,
            simpleBoost: ["artifactchance", level => 1.05 + 0.15 * level]
        }),

    new Artifact(158, 1, 1, "Bloody Red Ring", "ring.png",
        {
            desc: "But no Artifacts", prefix: "x", maxLevel: 3,
            simpleBoost: ["gemchance", level => 1.25 + 0.25 * level]
        }),

    new Artifact(159, 1, 2, "Bloody Gray Ring", "ring.png",
        {
            desc: "But no Gems", prefix: "x", maxLevel: 3,
            simpleBoost: ["artifactchance", level => 1.1 + 0.3 * level]
        }),

    new Artifact(160, 1, 3, "Plastic Ring", "ring.png",
        {
            simpleBoost: ["clicksi", level => 1.5 + 0.5 * level]
        }),

    new Artifact(161, 1, 3, "Bloody Plastic Ring", "ring.png",
        {
            desc: "But no passive Silicone", prefix: "x",
            simpleBoost: ["clicksi", level => 2 + level]
        }),

    new Artifact(162, 1, 4, "Purple Ring", "ring.png",
        {
            prefix: "x",
            simpleBoost: ["bags", level => 1.15 + 0.05 * level]
        }),





    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // RARE ARTIFACTS
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    new Artifact(200, 2, 1, "Amulet of Paroxysm", "amulet.png",
        {
            prefix: "/", desc: "But no Shgabb from clicks and /10 Gem chance", maxLevel: 3,
            simpleBoost: ["clickspeed", level => 2 + level]
        }),

    new Artifact(201, 2, 1, "Amulet of Saving", "amulet.png",
        {
            prefix: "+",
            simpleBoost: ["resetshgabb", level => Math.pow(1000, 2 + level)]
        }),

    new Artifact(202, 2, 1, "Amulet of Quick Snacks", "amulet.png",
        {
            desc: level => "While less than " + (10000 * Math.max(1, (level - 1) * 5)) + " Sandwiches",
            simpleBoost: ["sw", level => 4 * level, level => game.sw < 10000 * Math.max(1, (level - 1) * 5)]
        }),

    new Artifact(203, 2, 1, "Amulet of Sloth", "amulet.png",
        {
            desc: "But 5x longer click cooldown",
            simpleBoost: ["autoshgabb", level => 2 + level]
        }),

    new Artifact(204, 2, 1, "Amulet of Golden Bank", "amulet.png",
        {
            desc: "If the last prestige was at least 5 minutes ago",
            simpleBoost: ["gs", level => 2.5 + 2.5 * level, () => game.stats_prestige.playTime >= 300]
        }),

    new Artifact(205, 2, 1, "Amulet of Slowgemming", "amulet.png",
        {
            prefix: "x", desc: "If the cooldown is more than 3 sec (not current)", maxLevel: 3,
            simpleBoost: ["gemchance", level => 5 + level, () => getCooldown() >= 3]
        }),

    new Artifact(206, 2, 2, "Amulet of Passive Silicone", "amulet.png",
        {
            prefix: "x", desc: "When not clicking",
            simpleBoost: ["si", level => 1 + level, () => game.clickCooldown < 0]
        }),

    new Artifact(207, 2, 2, "Amulet of Active Silicone", "amulet.png",
        {
            prefix: "x", desc: "When the click cooldown is active",
            simpleBoost: ["si", level => 1.4 + (level * 2.2), () => game.clickCooldown > 0]
        }),

    new Artifact(208, 2, 1, "Amulet of Fast Start", "amulet.png",
        {
            prefix: "x", desc: "For 3 minutes after a prestige",
            simpleBoost: ["shgabb", level => [1, 10, 30, 100, 300, 1500][level], () => game.stats_prestige.playTime < 180]
        }),

    new Artifact(209, 2, 1, "Amulet of Tides", "amulet.png",
        {
            prefix: "x", desc: "Active for 10 seconds, inactive for 10 seconds",
            simpleBoost: ["shgabb", level => 4 + 3 * level, () => game.stats_prestige.playTime % 20 >= 10]
        }),

    new Artifact(210, 2, 1, "Amulet of Thaw", "amulet.png",
        {
            prefix: "x", desc: "But fridge duration is reduced to 5s",
            simpleBoost: ["autoshgabb", level => 5 + 5 * level]
        }),

    new Artifact(211, 2, 2, "Amulet of Condone", "amulet.png",
        {
            prefix: "x", desc: "But x0.6 Shgabb gain",
            simpleBoost: ["si", level => 2 * level]
        }),

    new Artifact(212, 2, 1, "Amulet of Sluggard", "amulet.png",
        {
            prefix: "x", desc: "Before the tenth click in a prestige",
            simpleBoost: ["shgabb", level => 12 * level, () => game.stats_prestige.clicks < 10]
        }),

    new Artifact(213, 2, 3, "Amulet of Golden Clicks", "amulet.png",
        {
            prefix: "x", desc: level => "Get " + 0.02 * level + "% of your GS every click",
            onClick: (level, v) => { increaseGS(v.multi * (0.02 * level) / 100) }
        }),

    new Artifact(214, 2, 3, "Amulet of Golden Idle", "amulet.png",
        {
            prefix: "x", desc: level => "Get " + 0.01 * level + "% of your GS every second",
            onAuto: (level, v) => { increaseGS((0.01 * level) / 100) }
        }),

    new Artifact(215, 2, 3, "Amulet of Golden Upgrades", "amulet.png",
        {
            prefix: "x", desc: level => "Get " + 0.001 * level + "% of your GS every upgrade",
            onUpgrade: (level, v) => { increaseGS(v.multi * (0.001 * level) / 100) }
        }),

    new Artifact(216, 2, 3, "Amulet of Dinosaurs", "amulet.png",
        {
            prefix: "x", desc: "If the cooldown is more than 3 sec (not current)", maxLevel: 3,
            simpleBoost: ["artifactchance", level => 3 + level, () => getCooldown() >= 3]
        }),

    new Artifact(217, 2, 1, "Amulet of Well Fed Resets", "amulet.png",
        {
            prefix: "x", desc: level => "If >" + fn(Math.pow(10, 3 + 3 * level)) + " Sandwiches this prestige",
            simpleBoost: ["gs", level => 3 * level, level => game.stats_prestige.sw > Math.pow(10, 3 + 3 * level)]
        }),

    new Artifact(218, 2, 1, "Amulet of Some Patience", "amulet.png", 
        {
            desc: "If clicking isn't on cooldown",
            simpleBoost: ["gs", level => 0.7 + 0.6 * level, () => game.clickCooldown < 0]
        }),

    new Artifact(219, 2, 2, "Amulet of Plastic Start", "amulet.png",
        {
            prefix: "x", desc: "For 3 minutes after a prestige",
            simpleBoost: ["si", level => 1 + 3 * level, () => game.stats_prestige.playTime < 180]
        }),

    new Artifact(220, 2, 2, "Amulet of Baked Silica", "amulet.png",
        {
            prefix: "x", desc: "If the cooldown is more than 3 sec (not current)",
            simpleBoost: ["clicksi", level => 3 + level, () => getCooldown() >= 3]
        }),

    new Artifact(221, 2, 1, "Amulet of Molten Food", "amulet.png",
        {
            prefix: "x", desc: "If the fridge has less than 1 second remaining (and isn't empty)",
            simpleBoost: ["sw", level => 6 + 2 * level, () => sandwichFreezeTime < 1 && sandwichFreezeTime > 0]
        }),

    new Artifact(222, 2, 1, "Amulet of Quickgemming", "amulet.png",
        {
            desc: "If the click cooldown is 0.2s", maxLevel: 3,
            simpleBoost: ["gems", level => 1.2 + 0.2 * level, () => clickCooldown == 0.2]
        }),

    new Artifact(223, 2, 1, "Amulet of Gem Mines", "amulet.png",
        {
            desc: "If owning less than 300 Gems", maxLevel: 3,
            simpleBoost: ["gemchance", level => 1.2 + 0.2 * level, () => game.gems < 300]
        }),

    new Artifact(224, 2, 4, "Amulet of Molten Bags", "amulet.png",
        {
            prefix: "x", desc: "If the fridge has less than 1 second remaining (and isn't empty)",
            simpleBoost: ["bags", level => 1 + 0.5 * level, () => sandwichFreezeTime < 1 && sandwichFreezeTime > 0]
        }),

    new Artifact(225, 2, 4, "Amulet of Lazy Bags", "amulet.png",
        {
            desc: "But 5x longer click cooldown",
            simpleBoost: ["bags", level => 1 + 0.2 * level]
        }),

    new Artifact(226, 2, 4, "Amulet of Bag Bank", "amulet.png",
        {
            desc: "If the last prestige was at least 15 minutes ago",
            simpleBoost: ["bags", level => 3 + 1 * level, () => game.stats_prestige.playTime >= 900]
        }),

    new Artifact(227, 2, 1, "Amulet of Eating Bread", "amulet.png",
        {
            prefix: "+",
            simpleBoost: ["resetshgabb", level => game.sw * level]
        }),

    new Artifact(228, 2, 2, "Amulet of Eject", "amulet.png",
        {
            desc: "Boost turns auto for 30s after clicking",
            simpleBoost: ["clickshgabb", level => 11 * level],
            timer: [30, 0],
            onClick: () => {
                getArtifact(228).boost = "autoshgabb";
                getArtifact(228).fillTimer();
            },
            onTimerZero: () => {
                getArtifact(228).boost = "clickshgabb";
            }
        }),





    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // EPIC ARTIFACTS
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    new Artifact(300, 3, 1, "Shgabb's handcuffs", "handcuffs.png",
        {
            desc: level => "Auto Shgabb gain is multiplied by the click cooldown x" + (level * 2),
            simpleBoost: ["autoshgabb", level => Math.max(1, ((level * 2) * game.clickCooldown + 1))]
        }),

    new Artifact(301, 3, 1, "Furious Knife", "knife.png",
        {
            desc: level => "Shgabb gain increases by +" + (50 * level) + "% for every well timed click up to 30x",
            simpleBoost: ["shgabb", level => Math.min(30, 1 + (getArtifact(301).getValue(0) * 0.5 * level))],
            value: [0, 0, () => Math.floor(60 / getArtifact(301).getLevel())],
            onClickBefore: level => {
                if (game.clickCooldown > -0.33 || lunarAntiCooldown > 0) getArtifact(301).increaseValue(1);
                else getArtifact(301).resetValue();
            },
            onAutoSave: level => {
                if (game.clickCooldown < -0.33 || lunarAntiCooldown > 0) getArtifact(301).resetValue();
            }
        }),

    new Artifact(302, 3, 1, "Shgabb Seeds", "seeds.png",
        {
            desc: level => "+" + 2 * level + "% per click, resets every 1000 clicks (" + game.stats_prestige.clicks % 1000 + "/1000)",
            simpleBoost: ["shgabb", level => 1 + ((game.stats_prestige.clicks % 1000) * 0.02 * level)]
        }),

    new Artifact(303, 3, 1, "P2W", "p2w.png",
        {
            desc: "While an ad is active", maxLevel: 3,
            simpleBoost: ["gems", level => 2.5 + level * 0.5, () => currentBoost != "none"]
        }),

    new Artifact(304, 3, 2, "Silicone implants", "implants.png",
        { // has outside GetArtifact
            desc: level => "Completely stops Silicone production, but its effects are +" + (100 + 100 * level) + "%",
            simpleBoost: ["si", level => 0]
        }),

    new Artifact(305, 3, 1, "Sosnog", "sosnog.png",
        { // has outside GetArtifact
            desc: "Switches Shgabb from clicks and Auto Shgabb",
            simpleBoost: ["shgabb", level => 3 + (11 * (level - 1))]
        }),

    new Artifact(306, 3, 1, "Shgabb's sleeves", "sleeves.png",
        {
            desc: level => "Click Shgabb gain is multiplied by inverse of click cooldown x" + (level * 6) + "<br>(Current: x" + Math.max(1, ((level * 6) * (1 / getCooldown()))).toFixed(2) + ")",
            simpleBoost: ["clickshgabb", level => Math.max(1, (level * 6) * (1 / getCooldown()))]
        }),

    new Artifact(307, 3, 1, "Shgabb's Dice", "dice-3.png",
        {
            desc: level => "Boosts Shgabb, Sandwiches by x" + getArtifact(307).getValue(0) + " (" + level + "-6)",
            value: [1, 1, 6],
            onClick: () => {
                getArtifact(307).setValue(Math.ceil(Math.random() * (7 - getArtifact(307).getLevel())) + (getArtifact(307).getLevel() - 1));
                updateArtifacts();
            }
        }),

    new Artifact(308, 3, 1, "Gem Frustration", "frustration.png",
        {
            prefix: "+", desc: level => "Increases Gem chance and cap by " + (level * (getArtifact(200).isEquipped() ? 0.05 : 0.5)).toFixed(2) + "% for every click without gems<br>(Current: +" + (level * 0.5 * getArtifact(308).getValue(0)).toFixed(2) + "%)", maxLevel: 3,
            simpleBoost: ["gemchance", level => level * 0.5 * getArtifact(308).getValue(0)],
            value: [0, 0, 300],
            onGem: (level, v) => {
                if (v.amount == 0) getArtifact(308).increaseValue(1);
                else getArtifact(308).resetValue();
            }
        }),

    new Artifact(309, 3, 3, "Sarah's Collection", "sarah.png",
        {
            desc: "If you own all common, rare and epic Artifacts", maxLevel: 3,
            simpleBoost: ["gemchance", level => 1.5 + level * 0.5, () => ((getArtifactAmount() - getArtifactAmount(4)) == (totalAmountOfArtifacts() - totalAmountOfArtifacts(4)))]
        }),

    new Artifact(310, 3, 3, "Trash Can", "trashcan.png",
        {
            desc: level => "+x" + (level + 1) + " per destroy, goes down by clicking<br>" + ((Math.max(1, getArtifact(310).getValue(0)) > level * 4) ? ("Capped for " + Math.round(10 * getArtifact(310).getValue(0) - level * 4) + " clicks") : ("Max: x" + (level * 4))), maxLevel: 3,
            simpleBoost: ["artifactchance", level => Math.max(1, Math.min(level * 4, getArtifact(310).getValue(0)))],
            value: [0, 0, 9999],
            onDestroy: level => getArtifact(310).increaseValue(1 + level),
            onClick: (level, v) => getArtifact(310).increaseValue(-0.1)
        }),

    new Artifact(311, 3, 3, "Surgeon's Sacrifice", "surgeonssacrifice.png",
        { // has outside GetArtifact
            desc: level => "Lose Silicone (not upgs) on prestige, but get more GS",
            simpleBoost: ["prestigegs", level => new Decimal(game.si.log10()).sub(7).add(level * 2).max(1)]
        }),

    new Artifact(312, 3, 3, "Semicone", "semicone.png",
        { // has outside GetArtifact?
            desc: level => "10% chance of consuming a Gem every time Silicone is produced",
            simpleBoost: ["si", level => 10 + 5 * level, () => game.gems > 0]
        }),

    new Artifact(313, 3, 1, "Furious Fork", "fork.png",
        {
            prefix: "/", desc: "For well timed clicks", maxLevel: 3,
            simpleBoost: ["clickspeed", level => 1.2 + 0.2 * level, () => game.clickCooldown >= -0.33 || lunarAntiCooldown > 0],
        }),

    new Artifact(314, 3, 3, "Hood Goo", "hoodgoo.png",
        { // TAKE A LOOK AT THIS ONE
            desc: level => 10 * level + "% chance to save your Shgabb production after a click, 5% to stop saving it",
            onClick: (level, v) => {
                if (Math.random() * applyLuck(50) < 0.05 && hoodGoo > 0) {
                    hoodGoo = 0;
                    createNotification("Goo is gone...");
                }
                if (Math.random() < level / 10 && v.amount > hoodGoo) {
                    hoodGoo = v.amount;
                    createNotification("Goo: " + fn(v.amount));
                }
            }
        }),

    new Artifact(315, 3, 1, "Furious Spoon", "spoon.png",
        {
            desc: level => "Sandwich gain increases by +" + (5 * level) + "% for every well timed click up to 4x",
            simpleBoost: ["sw", level => 1 + (getArtifact(315).getValue(0) * 0.05 * level)],
            value: [0, 0, () => Math.floor(60 / getArtifact(315).getLevel())],
            onClickBefore: level => {
                if (game.clickCooldown > -0.33 || lunarAntiCooldown > 0) getArtifact(315).increaseValue(1);
                else getArtifact(315).resetValue();
            },
            onAutoSave: level => {
                if (game.clickCooldown < -0.33 || lunarAntiCooldown > 0) getArtifact(315).resetValue();
            }
        }),

    new Artifact(316, 3, 3, "Overluck", "overluck.png",
        {
            desc: "Based on chance above the 10% cap", maxLevel: 3,
            simpleBoost: ["gems", level => Math.max(1, (getGemChance(100) - 10 - (getArtifact(308).isEquipped() ? getArtifact(308).getLevel() * getArtifact(308).getValue(0) : 0)) * (0.05 + (level / 20)))]
        }),

    new Artifact(317, 3, 2, "Back And Forth", "backandforth.png",
        {
            desc: "Switches between Silicone and Sandwiches",
            simpleBoost: ["si", level => level * getArtifact(317).getValue(1) * (getArtifact(317).boost == "si" ? 2 : 1)],
            value: [1, 1, 7],
            onClick: (level) => {
                if (getArtifact(317).boost == "si") getArtifact(317).boost = "sw";
                else getArtifact(317).boost = "si";
            },
            onAuto: (level) => {
                getArtifact(317).increaseValue(1);
                if (getArtifact(317).getValue() >= 7) getArtifact(317).resetValue();
                updateArtifacts();
            }
        }),

    new Artifact(318, 4, 1, "Shgabb's Fart", "fart.png",
        {
            desc: level => "Nice sounds + " + (10 * level) + "% of current Shgabb or 0.1% of highest, whichever is lower",
            onClick: (level) => {
                if (isChallenge(0) && !getArtifact(200).isEquipped()) {
                    game.shgabb = game.shgabb.add(Math.max(10000, Math.ceil(Math.min(game.shgabb.div(10).mul(level), game.stats.shgabb.div(1000)))));
                }
                document.getElementById("fart").currentTime = 0.1;
                document.getElementById("fart").play();
            }
        }),





    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // LEGENDARY ARTIFACTS
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    new Artifact(400, 4, 4, "Obama", "obama.png",
        { // has outside GetArtifact
            desc: "Increases the levels of your other equipped Artifacts by 1", maxLevel: 1,
        }),

    new Artifact(401, 4, 4, "DaGame", "dagame.png",
        {
            desc: level => 25 * level + "% chance to autoclick every second, consuming 10 Bags",
            onAuto: level => {
                if (game.bags >= 10 && game.clickCooldown <= 0) {
                    if (Math.random() * 100 <= 25 * level) {
                        game.bags -= 10;
                        createNotification("DaGame clicked!");

                        clickButton();
                    }
                }
            }
        }),

    new Artifact(402, 4, 4, "Tech Collection", "techcollection.png",
        { // TAKE A LOOK AT THIS ONE
            desc: level => techCollection + "/" + (10 * level) + " clicks saved. Unleashes their effects when the limit is reached",
        }),

    new Artifact(403, 4, 4, "Power Charger", "powercharger.png",
        {
            prefix: "/", desc: "Multi for 50s based on clicks in 10s",
            simpleBoost: ["clickspeed", level => 1.25],
            value: [1, 1, 500],
            timer: [60, 0],
            onClick: (level) => {
                if (getArtifact(403).boost == "clickspeed") {
                    if (getArtifact(403).amount(0) == 1.25) {
                        // Start 10s trial
                        getArtifact(403).setTimer(10);
                        getArtifact(403).amount = (level) => 1.5;
                    }
                    else {
                        getArtifact(403).increaseValue(1);
                    }
                }
            },
            onTimerZero: (level) => {
                if (getArtifact(403).boost == "clickspeed" && getArtifact(403).amount(0) == 1.5) {
                    // 10s trial over
                    getArtifact(403).setTimer(50);
                    getArtifact(403).boost = "shgabb";
                    getArtifact(403).prefix = "x";
                    getArtifact(403).amount = (level) => getArtifact(403).getValue() * level;
                }
                else if (getArtifact(403).boost == "shgabb") {
                    getArtifact(403).setValue(0);
                    getArtifact(403).boost = "clickspeed";
                    getArtifact(403).prefix = "/";
                    getArtifact(403).amount = (level) => 1.25;
                }
            }
        }),

    new Artifact(404, 4, 4, "Snake Oil Salesman", "snakeoilsalesman.png",
        {
            maxLevel: 1, desc: level => "Buy my amazing products for 100 Gems/second!",
            onAuto: (level) => {
                if (game.gems >= 100) game.gems -= 100;
            }
        }),

    new Artifact(405, 4, 1, "Tower", "tower.png",
        {
            desc: level => "Builds up auto boost, released after 5s of no clicks",
            simpleBoost: ["autoshgabb", level => 1 + (level * getArtifact(405).getValue(1) / 10), () => getArtifact(405).getTimer() == 0],
            value: [0, 0, 99999],
            timer: [5, 0],
            onClick: (level) => {
                getArtifact(405).fillTimer();
                getArtifact(405).increaseValue(1);
            },
            onAuto: (level) => {
                if (getArtifact(405).getTimer() == 0) {
                    getArtifact(405).increaseValue(-10);
                    updateArtifacts();
                }
            }
        }),
]