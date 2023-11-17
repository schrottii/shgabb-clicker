// Game made by Schrottii - editing or stealing is prohibited!

class Artifact {
	constructor(ID, rarity, name, image, boost, amount, config) {
		this.ID = ID;
		this.rarity = rarity; // 1 2 3
		this.name = name;
		this.image = image;
		this.boost = boost;
		this.amount = amount;
		this.prefix = "x";
		this.trigger = () => true;
		this.noPercentage = false;

		if (config) {
			if (config.trigger) this.trigger = config.trigger;
			if (config.prefix) this.prefix = config.prefix;
			if (config.desc) this.desc = config.desc;
			if (config.noPercentage) this.noPercentage = config.noPercentage;
        }
	}

	getRarity() {
		return ["ERROR", "Common", "Rare", "Epic", "Legendary", ""][this.rarity];
	}

	getDescription(level = false) {
		if (typeof (this.desc) == "function") return level == false ? this.desc(getArtifactLevel(this.ID)) : this.desc(level);
		return this.desc;
	}

	getEffect(level = false) {
		if (typeof (this.amount) == "function") return level == false ? this.amount(getArtifactLevel(this.ID)) : this.amount(level);
		return this.amount;
	}

	isUnlocked() {
		if (game.a.includes(this.ID)) return true;
		return false;
	}

	isEquipped() {
		if (game.aeqi.includes(this.ID)) return true;
		return false;
	}

	isUpgradable() {
		if (artifactMode == "upgrade" && getArtifactLevel(this.ID) < 3) return true;
		return false;
	}

	getBoostType() {
		switch (this.boost) {
			case "shgabb":
				return "shgabb";
			case "clickshgabb":
				return "shgabb from clicks";
			case "autoshgabb":
				return "shgabb from auto";
			case "resetshgabb":
				return "shgabb after reset";
			case "sw":
				return "sandwiches";
			case "gs":
				return "GS";
			case "si":
				return "silicone shgabb";
			case "clickspeed":
				return "click cooldown";
			case "gemchance":
				return "gem chance";
			case "gems":
				return "gems";
			case "artifactchance":
				return "artifact chance";
		}
	}

	renderEffect() {
		let render = (this.boost == "complicated" ? "" : "<br />" + ((this.getEffect() > 2 || this.noPercentage) ? (this.prefix + fn(this.getEffect())) : ((this.prefix != "x" ? this.prefix : "+") + fn((this.getEffect() - 1) * 100) + "%")) + " " + this.getBoostType());
		if (this.isUpgradable()) render = render + " → " + (this.boost == "complicated" ? "" : "<br />" + ((this.getEffect(getArtifactLevel(this.ID) + 1) > 2 || this.noPercentage) ? (this.prefix + fn(this.getEffect(getArtifactLevel(this.ID) + 1))) : ((this.prefix != "x" ? this.prefix : "+") + fn((this.getEffect(getArtifactLevel(this.ID) + 1) - 1) * 100) + "%")) + " " + this.getBoostType());
		return render;
	}

	renderDescription() {
		if (this.isUpgradable()) return (this.getDescription(getArtifactLevel(this.ID) + 1) ? ("<br/><span style='font-size: " + (this.getDescription(getArtifactLevel(this.ID) + 1).length > 40 ? "10" : "12") + "px'>" + this.getDescription(getArtifactLevel(this.ID) + 1) + "</span>") : "");
		else return (this.getDescription() ? ("<br/><span style='font-size: " + (this.getDescription().length > 40 ? "10" : "12") + "px'>" + this.getDescription() + "</span>") : "");
	}

	render(clickable=true) {
		return `<button class='artifact' ` + (clickable ? `onclick = 'clickArtifact(` + this.ID + `)'` : "") + ` style='background-color: ` + (this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)") + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'>"
			+ (this.isEquipped() && !this.isUpgradable() ? "<br><b>[EQUIPPED]</b>" : "") + "<br/><span style='font-size: 14px'>" + this.name + "</span><br />"
			+ (!this.isUpgradable() ? (this.getRarity() + " Level " + getArtifactLevel(this.ID)) : getScrapCost(getArtifactLevel(this.ID) + 1, this.rarity) + " Artifact Scrap")
			+ this.renderEffect() + this.renderDescription() + "</button>";
	}
}

var artifactMode = "select";

function unlockedArtifacts() {
	return game.stats.hms >= 1000;
}

function unlockedArtifactUpgrading() {
	return game.stats.artifactScrap > 0 || game.artifactScrap > 0;
}

function handleArtifactsFirstTime() {
	if (!game.a.includes(0)) {
		for (i = 0; i < Math.ceil(game.stats.clicks / 5); i++) {
			getArtifact(0.5);
		}
		game.a.push(0);
		createNotification("Artifacts awarded for past clicks successfully!");
    }
}

function getArtifactLevel(id) {
	if (game.alvl[id] == undefined) game.alvl[id] = 1;
	return game.alvl[id];
}

function getArtifactEffect(id) {
	if (typeof (getArtifactByID(id).amount) == "function") return getArtifactByID(id).amount(getArtifactLevel(id));
	return getArtifactByID(id).amount;
}

function getArtifactBoost(currency) {
	let boost = 1;
	for (let arti in artifacts) {
		if (artifacts[arti].boost == currency) {
			if (artifacts[arti].isUnlocked() && artifacts[arti].isEquipped() && artifacts[arti].trigger(game.alvl[artifacts[arti].ID])) boost *= getArtifactEffect(artifacts[arti].ID);
		}
	}
	return boost;
}

var selectedLoadout = 0;
var rep7 = "ey";

function renderArtifacts() {
	// Render em all
	let render = "";
	for (l = 0; l < game.al; l++) {
		render = render + "<button onclick='artifactLoadout(" + l + ")' class='artifactLoadoutButton' style='background-color: " + (l == selectedLoadout ? "yellow" : "white") + "'>" + (game.alnames[l] == "" || game.alnames[l] == undefined ? "Loadout " + (l + 1) : game.alnames[l] ) + "</button>";
	}
	render = render + "<br />";

	if (unlockedArtifactUpgrading()) {
		ui.artifactScrapAmount.innerHTML = cImg("artifactscrap") + game.artifactScrap + " Artifact Scrap";

		render = render + "<button onclick='changeArtifactMode(0)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "select" ? "white" : "gray") + "'>Select</button>";
		render = render + "<button onclick='changeArtifactMode(1)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "upgrade" ? "white" : "gray") + "'>Upgrade</button>";
		render = render + "<button onclick='changeArtifactMode(2)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "destroy" ? "white" : "gray") + "'>Destroy</button>";
		render = render + "<br />";
	}
	else ui.artifactScrapAmount.innerHTML = "";

	ui.artifactScrapAmount2.innerHTML = ui.artifactScrapAmount.innerHTML;

	for (a in artifacts) {
		if (artifacts[a].isUnlocked()) {
			render = render + artifacts[a].render();
		}
	}
	return render;
}

function changeArtifactMode(nr) {
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

function artifactLoadout(l) {
	while (game.alo[l] == undefined) {
		game.alo.push([]);
    }
	if (game.alo[l].length > 0) {
		while (game.alo[l].length > getMaxArtifactAmount()) {
			game.alo[l].pop();
        }
		game.aeqi = game.alo[l];
	}
	else {
		game.aeqi = [];
	}
	if (selectedLoadout == l) {
		while (game.alnames[l] == undefined) {
			game.alnames.push([""]);
		}
		let newName = prompt("Name for this loadout?");
		game.alnames[l] = newName != undefined && newName != "" ? newName : "";
    }
	selectedLoadout = l;
	updateArtifacts();
}

function allArtifactsOfRarity(rarity) {
	for (a in artifacts) {
		if (artifacts[a].rarity == rarity && !artifacts[a].isUnlocked()) return false;
	}
	return true;
}

function anyArtifactOfRarity(rarity) {
	for (a in artifacts) {
		if (artifacts[a].rarity == rarity && artifacts[a].isUnlocked()) return true;
	}
	return false;
}

function getArtifact(multi = 1) {
	// (Chance TO GET)
	// Chance to get an artifact

	if (getArtifactByID(158).isEquipped()) return 0; // the no artifacts artifact

	let multi2 = 1;
	if (multi == 1) multi2 = getArtifactBoost("artifactchance"); // Artifact chance artifacts only work from clicks, not the gem offer

	// legendary, epic, rare, common arti
	if (!allArtifactsOfRarity(4) && Math.random() < 1 / 10000000 * multi2 && multi == 1) {
		gambleArtifact(4);
	}
	else if (!allArtifactsOfRarity(3) && Math.random() < 1 / 32000 * multi * multi2) {
		gambleArtifact(3);
	}
	else if (!allArtifactsOfRarity(2) && Math.random() < 1 / 4000 * multi * multi2) {
		gambleArtifact(2);
	}
	else if (!allArtifactsOfRarity(1) && Math.random() < 1 / 800 * multi * multi2) {
		gambleArtifact(1);
	}
	// epic, rare, common arti dupli
	else if (anyArtifactOfRarity(3) && Math.random() < 1 / 32000 * multi) {
		artifactDuplicate(3);
	}
	else if (anyArtifactOfRarity(2) && Math.random() < 1 / 4000 * multi) {
		artifactDuplicate(2);
	}
	else if (anyArtifactOfRarity(1) && Math.random() < 1 / 800 * multi) {
		artifactDuplicate(1);
	}
}

function setNextArtifact(r) {
	// Used by getArtifact - which one will we get of this rarity?
	let possibleArtifacts = [];
	for (a in artifacts) {
		if (artifacts[a].rarity == r && !artifacts[a].isUnlocked()) {
			possibleArtifacts.push(artifacts[a].ID);
		}
	}
	if (possibleArtifacts.length == 0) return 0;
	return gainedID = possibleArtifacts[Math.floor(Math.random() * possibleArtifacts.length)];
}

function checkForZeroNext() {
	for (i in game.nexgai) {
		if (game.nexgai[i] == 0) game.nexgai[i] = setNextArtifact(i + 1);
	}
}

function gambleArtifact(r) {
	if (game.nexgai[r - 1] == 0 || (getArtifactByID(game.nexgai[r - 1]) != undefined && getArtifactByID(game.nexgai[r - 1]).isUnlocked())) game.nexgai[r - 1] = setNextArtifact(r);
	r -= 1;
    // New artifact!
    game.a.push(game.nexgai[r]);
	createNotification("New Artifact: " + getArtifactByID(game.nexgai[r]).name);
    updateArtifacts();

    ui.newArtifactText = "New Artifact!";
	ui.newArtifactImage.src = "images/arti/" + getArtifactByID(game.nexgai[r]).image;
	ui.newArtifactName.innerHTML = getArtifactByID(game.nexgai[r]).name + " (" + getArtifactByID(game.nexgai[r]).getRarity() + ")";
    ui.newArtifact.style.display = "block";

    setTimeout(() => {
        ui.newArtifact.style.display = "none";
	}, 5000)

	game.nexgai[r] = setNextArtifact(r);
}

function artifactDuplicate(rarity) {
	let possibleArtifacts = [];
	for (a in artifacts) {
		if (artifacts[a].rarity == rarity && artifacts[a].isUnlocked()) {
			possibleArtifacts.push(artifacts[a].ID);
		}
	}
	let gainedID = possibleArtifacts[Math.floor(Math.random() * possibleArtifacts.length)];

	// Duplicate...
	let amount = (allArtifactsOfRarity(rarity) ? 2 : 1) * (getScrapCost(1, rarity) / 10);
	createNotification("+" + amount + " Artifact Scrap for a duplicate " + getArtifactByID(gainedID).name + "!");
	game.artifactScrap += amount;
	game.stats.artifactScrap += amount;

	ui.newArtifactText = "Duplicate!";
	ui.newArtifactImage.src = "images/currencies/artifactscrap.png";
	ui.newArtifactName.innerHTML = getArtifactByID(gainedID).name + " (" + getArtifactByID(gainedID).getRarity() + ")";
	ui.newArtifact.style.display = "block";

	setTimeout(() => {
		ui.newArtifact.style.display = "none";
	}, 5000)
}

function getArtifactByID(id) {
	// Use this to get an artifact using its ID, and then get its name, effect or whatever
	for (a in artifacts) {
		if (artifacts[a].ID == id) return artifacts[a];
	}
}

function getMaxArtifactAmount() {
	return 3 + ameliorerUpgrades.fourthArtifactSlot.currentEffect();
}

function clickArtifact(id) {
	switch (artifactMode) {
		case "select":
			switchArtifact(id);
			break;
		case "upgrade":
			upgradeArtifact(id);
			updateArtifacts();
			break;
		case "destroy":
			destroyArtifact(id);
			updateArtifacts();
			break;
    }
}

function switchArtifact(id) {
	if (getArtifactByID(id).isEquipped()) game.aeqi.splice(game.aeqi.indexOf(id), 1);
	else if (game.aeqi.length < getMaxArtifactAmount()) game.aeqi.push(id);
	game.alo[selectedLoadout] = game.aeqi;

	freezeTime();
	updateArtifacts();
}

function getScrapCost(level, rarity) {
	switch (rarity) {
		case 1:
			return 100 * level;
		case 2:
			return 250 * level;
		case 3:
			return 1000 * level;
	}
	return 0;
}

function upgradeArtifact(id) {
	if (game.alvl[id] == undefined) game.alvl[id] = 1;
	if (game.alvl[id] < 3 && game.artifactScrap >= getScrapCost(game.alvl[id], getArtifactByID(id).rarity) && confirm("Use " + getScrapCost(game.alvl[id], getArtifactByID(id).rarity) + " artifact scrap to upgrade this?")) {
		game.artifactScrap -= getScrapCost(game.alvl[id], getArtifactByID(id).rarity);
		game.alvl[id] += 1;
	}
}

function destroyArtifact(id) {
	let rarity = getArtifactByID(id).rarity;
	let level = game.alvl[id];
	let amount = Math.floor(getScrapCost(level, rarity) / 5);
	if (confirm("Do you really want to destroy this artifact for " + amount + " Artifact Scrap?")) {

		game.a.splice(game.a.indexOf(id), 1);
		delete game.alvl[id];
		if (game.aeqi.indexOf(id) != -1) game.aeqi.splice(game.aeqi.indexOf(id), 1);

		// Unequip
		for (loadout in game.alo) {
			if (game.alo[loadout].indexOf(id)  != -1 ) game.alo[loadout].splice(game.alo[loadout].indexOf(id), 1);
		}

		if (getArtifactByID(310).isEquipped()) {
			trashCanBoost += 2 * getArtifactLevel(308);
        }

		game.artifactScrap += amount;
		game.stats.artifactScrap += amount;

		checkForZeroNext();

		createNotification("Received +" + amount + " Artifact Scrap for destroying " + getArtifactByID(id).name + "!");
    }
}

var artifacts = [
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", level => 1 + 0.4 * level),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", level => 0.8 + 0.4 * level),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", level => 1.25 + 0.25 * level),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", level => 1 + 0.5 * level),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", level => 0.8 + 0.5 * level),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", level => 0.8 + 0.5 * level),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", level => 1.1 + 0.1 * level, { prefix: "-" }),
	new Artifact(153, 1, "Shiny Red Ring", "ring.png", "gemchance", level => 1 + 0.25 * level, { noPercentage: true, prefix: "x" }),
	new Artifact(154, 1, "Pulsing Red Ring", "ring.png", "gems", level => [1, 1.5, 1.65, 1.75][level], { noPercentage: true }),
	new Artifact(155, 1, "Ring of Depression", "ring.png", "shgabb", level => 0.1 / Math.pow(100, level), { noPercentage: true, prefix: "x" }),
	new Artifact(156, 1, "Ring of Slowing", "ring.png", "clickspeed", level => 1 + 0.5 * level, { noPercentage: true, trigger: () => false, prefix: "x" }),
	new Artifact(157, 1, "Gray Ring", "ring.png", "artifactchance", level => 1.05 + 0.15 * level, { noPercentage: true, prefix: "x" }),
	new Artifact(158, 1, "Bloody Red Ring", "ring.png", "gemchance", level => 1.25 + 0.25 * level, { desc: "But no artifacts", noPercentage: true, prefix: "x" }),
	new Artifact(159, 1, "Bloody Gray Ring", "ring.png", "artifactchance", level => 1.1 + 0.3 * level, { desc: "But no gems", noPercentage: true, prefix: "x" }),

	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", level => 2 + level, { prefix: "/", desc: "But no shgabb from clicks and /10 gem chance", noPercentage: true }),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", level => Math.pow(1000, 2 + level), { prefix: "+", noPercentage: true }),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", level => 4 * level, { trigger: level => game.sw < 10000 * Math.max(1, (level - 1) * 5), desc: level => "While less than " + (10000 * Math.max(1, (level - 1) * 5)) + " sandwiches" }),
	new Artifact(203, 2, "Amulet of Sloth", "amulet.png", "autoshgabb", level => 2 + level, { desc: "But 5x longer click cooldown" }),
	new Artifact(204, 2, "Amulet of Golden Bank", "amulet.png", "gs", level => 2.5 + 2.5 * level, { trigger: () => game.stats.pttp >= 300, desc: "If the last prestige was at least 5 minutes ago" }),
	new Artifact(205, 2, "Amulet of Slowgemming", "amulet.png", "gemchance", level => 3 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 sec (not current)" }),
	new Artifact(206, 2, "Amulet of Passive Silicone", "amulet.png", "si", level => 1 + level, { noPercentage: true, prefix: "x", trigger: () => game.clickCooldown < 0, desc: "When not clicking" }),
	new Artifact(207, 2, "Amulet of Active Silicone", "amulet.png", "si", level => 1.4 + (level * 2.2), { prefix: "x", trigger: () => game.clickCooldown > 0, desc: "When the click cooldown is active" }),
	new Artifact(208, 2, "Amulet of Fast Start", "amulet.png", "shgabb", level => [1, 10, 30, 100][level], { noPercentage: true, prefix: "x", trigger: () => game.stats.pttp < 180, desc: "For 3 minutes after a prestige" }),
	new Artifact(209, 2, "Amulet of Tides", "amulet.png", "shgabb", level => 4 + 3 * level, { prefix: "x", trigger: () => game.stats.pttp % 20 >= 10, desc: "Active for 10 seconds, inactive for 10 seconds" }),
	new Artifact(210, 2, "Amulet of Thaw", "amulet.png", "autoshgabb", level => 5 + 5 * level, { prefix: "x", desc: "But fridge duration is reduced to 5s" }),
	new Artifact(211, 2, "Amulet of Condone", "amulet.png", "si", level => 2 * level, { prefix: "x", desc: "But x0.6 shgabb gain" }),
	new Artifact(212, 2, "Amulet of Sluggard", "amulet.png", "shgabb", level => 12 * level, { prefix: "x", trigger: () => game.stats.ctp < 5, desc: "Before the fifth click in a prestige" }),
	new Artifact(213, 2, "Amulet of Golden Clicks", "amulet.png", "complicated", level => 0.01 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(213) + "% of your GS every click" }),
	new Artifact(214, 2, "Amulet of Golden Idle", "amulet.png", "complicated", level => 0.01 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(214) + "% of your GS every second" }),
	new Artifact(215, 2, "Amulet of Golden Upgrades", "amulet.png", "complicated", level => 0.001 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(215) + "% of your GS every upgrade" }),
	new Artifact(216, 2, "Amulet of Dinosaurs", "amulet.png", "artifactchance", level => 2 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 sec (not current)" }),
	new Artifact(217, 2, "Amulet of Well Fed Resets", "amulet.png", "gs", level => 3 * level, { prefix: "x", trigger: () => game.stats.swtp > Math.pow(10, 3 + 3 * level), desc: level => "If >" + fn(Math.pow(10, 3 + 3 * level)) + " sandwiches this prestige" }),
	new Artifact(218, 1, "Amulet of Some Patience", "amulet.png", "gs", level => 0.7 + 0.6 * level, { trigger: () => game.clickCooldown < 0, desc: "If clicking isn't on cooldown"}),

	new Artifact(300, 3, "Shgabb's handcuffs", "handcuffs.png", "complicated", 0, { desc: level => "Auto Shgabb gain is multiplied by the click cooldown x" + (level * 2) }),
	new Artifact(301, 3, "Furious Knife", "knife.png", "complicated", 0, { desc: level => "Shgabb gain increases by +" + (50 * level) + "% for every well timed click up to 3000%" }),
	new Artifact(302, 3, "Shgabb Seeds", "seeds.png", "complicated", 0, { desc: level => "Every click in a prestige increases shgabb gain by " + (0.1 * level).toFixed(1) + "% (Current: x" + fn(1 + game.stats.ctp * 0.001 * getArtifactLevel(302)) + ")" }),
	new Artifact(303, 3, "P2W", "p2w.png", "gems", level => 1.5 + level * 0.5, { noPercentage: true, trigger: () => currentBoost != "none", desc: "While an ad is active" }),
	new Artifact(304, 3, "Silicone implants", "implants.png", "complicated", 1, { desc: level => "Completely stops silicone production, but its effects are +" + (100 + 100 * level) + "%" }),
	new Artifact(305, 3, "Sosnog", "sosnog.png", "shgabb", level => 3 + (11 * (level - 1)), { desc: "Switches Shgabb from clicks and Auto Shgabb" }),
	new Artifact(306, 3, "Shgabb's sleeves", "sleeves.png", "complicated", 0, { desc: level => "Click Shgabb gain is multiplied by inverse of click cooldown x" + (level * 2) + "<br>(Current: x" + ((level * 2) * (1 / getCooldown())).toFixed(2) + ")" }),
	new Artifact(307, 3, "Shgabb's Dice", "dice-3.png", "complicated", 0, { desc: level => "Boosts shgabb, sandwiches by x" + diceAmount + " (" + level + "-6)" }),
	new Artifact(308, 3, "Gem Frustration", "frustration.png", "complicated", level => level * frustration * (getArtifactByID(200).isEquipped() ? 0.05 : 0.5), { desc: level => "Increases gem chance and cap by " + (level * (getArtifactByID(200).isEquipped() ? 0.05 : 0.5)) + "% for every click without gems<br>(Current: +" + getArtifactEffect(308) + "%)" }),
	new Artifact(309, 3, "Sarah's Collection", "sarah.png", "gemchance", level => 1.5 + level * 0.5, { noPercentage: true, trigger: () => (game.a.length - 1 == artifacts.length - 1), desc: "If you own all artifacts" }),
	new Artifact(310, 3, "Trash Can", "trashcan.png", "artifactchance", level => Math.min(4 * level, (1 + trashCanBoost * (level / 2 + 0.5))), { noPercentage: true, desc: level => "Increases after destroying, goes down by clicking<br>" + ((1 + trashCanBoost * (level / 2 + 0.5)) > 4 * level ? ("Capped for " + Math.round(5 + ((1 + trashCanBoost * (level / 2 + 0.5)) - 4 * level) * 5) + " clicks") : ("Max: x" + 4 * level)) }),
	new Artifact(311, 3, "Surgeon's Sacrifice", "surgeonssacrifice.png", "gs", level => Math.max(1, Math.log10(game.si) - 7 + level * 2), { noPercentage: true, desc: level => "Lose silicone (not upgs) on prestige, but get more GS" }),

	new Artifact(400, 4, "Obama", "handcuffs.png", "complicated", 1, { desc: "It would give you additional slots based on your prestige playtime, but not in this universe for now" }),
]