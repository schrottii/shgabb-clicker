﻿// Game made by Schrottii - editing or stealing is prohibited!

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
		else if (this.desc != undefined) return this.desc;
		return "";
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

	renderBG() {
		if (artifactMode == "select") return this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
		if (artifactMode == "upgrade") return this.isUpgradable() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
		if (artifactMode == "destroy") return getArtifactLevel(this.ID) == 1 && !this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)";
		return "rgb(0, 0, 0)";
    }

	renderEffect() {
		let render = (this.boost == "complicated" ? "" : "<br />" + ((this.getEffect() > 2 || this.noPercentage) ? (this.prefix + fn(this.getEffect())) : ((this.prefix != "x" ? this.prefix : "+") + fn((this.getEffect() - 1) * 100) + "%")) + " " + this.getBoostType());
		if (this.isUpgradable()) render = render + " → " + (this.boost == "complicated" ? "" : "<br />" + ((this.getEffect(getArtifactLevel(this.ID) + 1) > 2 || this.noPercentage) ? (this.prefix + fn(this.getEffect(getArtifactLevel(this.ID) + 1))) : ((this.prefix != "x" ? this.prefix : "+") + fn((this.getEffect(getArtifactLevel(this.ID) + 1) - 1) * 100) + "%")) + " " + this.getBoostType());
		return render;
	}

	renderDescription() {
		if (this.isUpgradable()) return (this.getDescription(getArtifactLevel(this.ID) + 1) ? ("<span style='font-size: " + (this.getDescription(getArtifactLevel(this.ID) + 1).length > 40 ? "10" : "12") + "px'>" + this.getDescription(getArtifactLevel(this.ID) + 1) + "</span>") : "");
		else return (this.getDescription() ? ("<span style='font-size: " + (this.getDescription().length > 40 ? "10" : "12") + "px'>" + this.getDescription() + "</span>") : "");
	}

	innerRender() {
		return this.ID + " " + this.image + (this.isEquipped() && !this.isUpgradable() ? "[EQUIPPED] " : " ") + this.name + " " + this.getRarity() + " Level " + getArtifactLevel(this.ID)
			+ " " + this.renderEffect() + this.renderDescription();
    }

	render(clickable=true) {
		return `<button class='artifact' ` + (clickable ? `onclick='clickArtifact(` + this.ID + `)'` : "") + ` style='background-color: ` + this.renderBG() + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'>"
			+ (this.isEquipped() && !this.isUpgradable() ? "<br><b>[EQUIPPED]</b>" : "") + "<br/><span style='font-size: 14px'>" + this.name + "</span><br />"
			+ (!this.isUpgradable() ? (this.getRarity() + " L" + getArtifactLevel(this.ID)) : getScrapCost(getArtifactLevel(this.ID), this.rarity) + " Artifact Scrap")
			+ this.renderEffect() + "<br/>" + this.renderDescription() + "</button>";
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
			if (artifacts[arti].isUnlocked() && artifacts[arti].isEquipped() && artifacts[arti].trigger(game.alvl[artifacts[arti].ID])) {
				boost *= getArtifactEffect(artifacts[arti].ID);
			}
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
		let thisLoadoutName = (game.alnames[l] == "" || game.alnames[l] == undefined ? "Loadout " + (l + 1) : game.alnames[l]);
		render = render + "<button onclick='artifactLoadout(" + l + ")' class='artifactLoadoutButton' style='background-color: " + (l == selectedLoadout ? "yellow" : "white") + "; font-size: " + (thisLoadoutName.length > 25 ? 12 : 16) + "px;'>" + thisLoadoutName + "</button>";
	}
	render = render + "<br />";

	if (unlockedArtifactUpgrading()) {
		render = render + "<button onclick='changeArtifactMode(0)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "select" ? "white" : "gray") + "'>Select</button>";
		render = render + "<button onclick='changeArtifactMode(1)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "upgrade" ? "white" : "gray") + "'>Upgrade</button>";
		render = render + "<button onclick='changeArtifactMode(2)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "destroy" ? "white" : "gray") + "'>Destroy</button>";
		render = render + "<br />";
	}

	ui.artifactScrapAmount2.innerHTML = ui.artifactScrapAmount.innerHTML;

	for (a in artifacts) {
		if (artifacts[a].isUnlocked() && artifacts[a].innerRender().toUpperCase().includes(ui.artifactSearch.value.toUpperCase())
		) {
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
		let newName = prompt("Name for this loadout?").substr(0, 40);
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

	// multi1 = gem offer. multi2 = gem artis, events
	let multi2 = 1;
	if (multi == 1) multi2 = getArtifactBoost("artifactchance") * eventValue("anniversary", 1.5, 1); // Artifact chance artifacts only work from clicks, not the gem offer

	let chance = Math.random() * applyLuck(100);

	if (chance < 1 / 10000000 * multi2) {
		if (!allArtifactsOfRarity(4) && Math.random() < 0.5 * !allArtifactsOfRarity(4)) {
			gambleArtifact(4);
		}
		else if (anyArtifactOfRarity(4)) {
			artifactDuplicate(4);
		}
	}
	else if (chance < 1 / 32000 * multi * multi2) {
		if (!allArtifactsOfRarity(3) && Math.random() < 0.5 * !allArtifactsOfRarity(3)) {
			gambleArtifact(3);
		}
		else if (anyArtifactOfRarity(3)) {
			artifactDuplicate(3);
		}
	}
	else if (chance < 1 / 4000 * multi * multi2) {
		if (!allArtifactsOfRarity(2) && Math.random() < 0.5 * !allArtifactsOfRarity(2)) {
			gambleArtifact(2);
		}
		else if (anyArtifactOfRarity(2)) {
			artifactDuplicate(2);
		}
	}
	else if (chance < 1 / 800 * multi * multi2) {
		if (!allArtifactsOfRarity(1) && Math.random() < 0.5 * !allArtifactsOfRarity(1)) {
			gambleArtifact(1);
		}
		else if (anyArtifactOfRarity(1)) {
			artifactDuplicate(1);
		}
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
	newArtifactDisplayTimer = 5;

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
	newArtifactDisplayTimer = 5;
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
		case 4:
			return 10000 * level;
	}
	return 0;
}

function upgradeArtifact(id) {
	if (game.alvl[id] == undefined) game.alvl[id] = 1;
	if (game.alvl[id] < 3 && game.artifactScrap >= getScrapCost(game.alvl[id], getArtifactByID(id).rarity) && confirm("Use " + getScrapCost(game.alvl[id], getArtifactByID(id).rarity) + " Artifact Scrap to upgrade this?")) {
		game.artifactScrap -= getScrapCost(game.alvl[id], getArtifactByID(id).rarity);
		game.alvl[id] += 1;
	}
}

function destroyArtifact(id) {
	let rarity = getArtifactByID(id).rarity;
	let level = game.alvl[id];
	let amount = Math.floor(getScrapCost(level, rarity) / 5);
	if (confirm("Do you really want to destroy this Artifact for " + amount + " Artifact Scrap?")) {

		game.a.splice(game.a.indexOf(id), 1);
		delete game.alvl[id];
		if (game.aeqi.indexOf(id) != -1) game.aeqi.splice(game.aeqi.indexOf(id), 1);

		// Unequip
		for (loadout in game.alo) {
			if (game.alo[loadout].indexOf(id)  != -1 ) game.alo[loadout].splice(game.alo[loadout].indexOf(id), 1);
		}

		if (getArtifactByID(310).isEquipped()) {
			trashCanBoost += 1 + getArtifactLevel(310);
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
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", level => 1.25 + 0.25 * level),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", level => 0.8 + 0.5 * level),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", level => 0.8 + 0.5 * level),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", level => 1.1 + 0.1 * level, { prefix: "-" }),
	new Artifact(153, 1, "Shiny Red Ring", "ring.png", "gemchance", level => 1 + 0.25 * level, { noPercentage: true, prefix: "x" }),
	new Artifact(154, 1, "Pulsing Red Ring", "ring.png", "gems", level => [1, 1.5, 1.65, 1.75][level], { noPercentage: true }),
	new Artifact(155, 1, "Ring of Depression", "ring.png", "shgabb", level => 0.1 / Math.pow(100, level), { noPercentage: true, prefix: "x" }),
	new Artifact(156, 1, "Ring of Slowing", "ring.png", "clickspeed", level => 1 + 0.5 * level, { noPercentage: true, trigger: () => false, prefix: "x" }),
	new Artifact(157, 1, "Gray Ring", "ring.png", "artifactchance", level => 1.05 + 0.15 * level, { noPercentage: true, prefix: "x" }),
	new Artifact(158, 1, "Bloody Red Ring", "ring.png", "gemchance", level => 1.25 + 0.25 * level, { desc: "But no Artifacts", noPercentage: true, prefix: "x" }),
	new Artifact(159, 1, "Bloody Gray Ring", "ring.png", "artifactchance", level => 1.1 + 0.3 * level, { desc: "But no Gems", noPercentage: true, prefix: "x" }),
	new Artifact(160, 1, "Plastic Ring", "ring.png", "clicksi", level => 1.5 + 0.5 * level),
	new Artifact(161, 1, "Bloody Plastic Ring", "ring.png", "clicksi", level => 2 + level, { desc: "But no passive Silicone", noPercentage: true, prefix: "x" }),
	new Artifact(162, 1, "Purple Ring", "ring.png", "bags", level => 1.15 + 0.05 * level, { noPercentage: true, prefix: "x" }),

	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", level => 2 + level, { prefix: "/", desc: "But no Shgabb from clicks and /10 Gem chance", noPercentage: true }),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", level => Math.pow(1000, 2 + level), { prefix: "+", noPercentage: true }),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", level => 4 * level, { trigger: level => game.sw < 10000 * Math.max(1, (level - 1) * 5), desc: level => "While less than " + (10000 * Math.max(1, (level - 1) * 5)) + " Sandwiches" }),
	new Artifact(203, 2, "Amulet of Sloth", "amulet.png", "autoshgabb", level => 2 + level, { desc: "But 5x longer click cooldown" }),
	new Artifact(204, 2, "Amulet of Golden Bank", "amulet.png", "gs", level => 2.5 + 2.5 * level, { trigger: () => game.stats.pttp >= 300, desc: "If the last prestige was at least 5 minutes ago" }),
	new Artifact(205, 2, "Amulet of Slowgemming", "amulet.png", "gemchance", level => 5 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 sec (not current)" }),
	new Artifact(206, 2, "Amulet of Passive Silicone", "amulet.png", "si", level => 1 + level, { noPercentage: true, prefix: "x", trigger: () => game.clickCooldown < 0, desc: "When not clicking" }),
	new Artifact(207, 2, "Amulet of Active Silicone", "amulet.png", "si", level => 1.4 + (level * 2.2), { prefix: "x", trigger: () => game.clickCooldown > 0, desc: "When the click cooldown is active" }),
	new Artifact(208, 2, "Amulet of Fast Start", "amulet.png", "shgabb", level => [1, 10, 30, 100][level], { noPercentage: true, prefix: "x", trigger: () => game.stats.pttp < 180, desc: "For 3 minutes after a prestige" }),
	new Artifact(209, 2, "Amulet of Tides", "amulet.png", "shgabb", level => 4 + 3 * level, { prefix: "x", trigger: () => game.stats.pttp % 20 >= 10, desc: "Active for 10 seconds, inactive for 10 seconds" }),
	new Artifact(210, 2, "Amulet of Thaw", "amulet.png", "autoshgabb", level => 5 + 5 * level, { prefix: "x", desc: "But fridge duration is reduced to 5s" }),
	new Artifact(211, 2, "Amulet of Condone", "amulet.png", "si", level => 2 * level, { prefix: "x", desc: "But x0.6 Shgabb gain" }),
	new Artifact(212, 2, "Amulet of Sluggard", "amulet.png", "shgabb", level => 12 * level, { prefix: "x", trigger: () => game.stats.ctp < 10, desc: "Before the tenth click in a prestige" }),
	new Artifact(213, 2, "Amulet of Golden Clicks", "amulet.png", "complicated", level => 0.02 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(213) + "% of your GS every click" }),
	new Artifact(214, 2, "Amulet of Golden Idle", "amulet.png", "complicated", level => 0.01 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(214) + "% of your GS every second" }),
	new Artifact(215, 2, "Amulet of Golden Upgrades", "amulet.png", "complicated", level => 0.001 * level, { prefix: "x", desc: () => "Get " + getArtifactEffect(215) + "% of your GS every upgrade" }),
	new Artifact(216, 2, "Amulet of Dinosaurs", "amulet.png", "artifactchance", level => 3 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 sec (not current)" }),
	new Artifact(217, 2, "Amulet of Well Fed Resets", "amulet.png", "gs", level => 3 * level, { prefix: "x", trigger: level => game.stats.swtp > Math.pow(10, 3 + 3 * level), desc: level => "If >" + fn(Math.pow(10, 3 + 3 * level)) + " Sandwiches this prestige" }),
	new Artifact(218, 2, "Amulet of Some Patience", "amulet.png", "gs", level => 0.7 + 0.6 * level, { trigger: () => game.clickCooldown < 0, desc: "If clicking isn't on cooldown" }),
	new Artifact(219, 2, "Amulet of Plastic Start", "amulet.png", "si", level => 1 + 3 * level, { noPercentage: true, prefix: "x", trigger: () => game.stats.pttp < 180, desc: "For 3 minutes after a prestige" }),
	new Artifact(220, 2, "Amulet of Baked Silica", "amulet.png", "clicksi", level => 3 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 sec (not current)" }),
	new Artifact(221, 2, "Amulet of Molten Food", "amulet.png", "sw", level => 6 + 2 * level, { prefix: "x", trigger: () => sandwichFreezeTime < 1 && sandwichFreezeTime > 0, desc: "If the fridge has less than 1 second remaining" }),
	new Artifact(222, 2, "Amulet of Quickgemming", "amulet.png", "gems", level => 1.2 + 0.2 * level, { noPercentage: true, trigger: () => clickCooldown == 0.1, desc: "If the click cooldown is 0.1s" }),
	new Artifact(223, 2, "Amulet of Gem Mines", "amulet.png", "gemchance", level => 1.3 + 0.1 * level, { noPercentage: true, trigger: () => game.gems < 300, desc: "If owning less than 300 Gems" }),
	new Artifact(224, 2, "Amulet of Molten Bags", "amulet.png", "bags", level => 1 + 0.2 * level, { prefix: "x", trigger: () => sandwichFreezeTime < 1 && sandwichFreezeTime > 0, desc: "If the fridge has less than 1 second remaining" }),
	new Artifact(225, 2, "Amulet of Lazy Bags", "amulet.png", "bags", level => 1 + 0.2 * level, { desc: "But 5x longer click cooldown" }),
	new Artifact(226, 2, "Amulet of Bag Bank", "amulet.png", "bags", level => 2.5 + 0.5 * level, { trigger: () => game.stats.pttp >= 900, desc: "If the last prestige was at least 15 minutes ago" }),

	new Artifact(300, 3, "Shgabb's handcuffs", "handcuffs.png", "complicated", 0, { desc: level => "Auto Shgabb gain is multiplied by the click cooldown x" + (level * 2) }),
	new Artifact(301, 3, "Furious Knife", "knife.png", "complicated", 0, { desc: level => "Shgabb gain increases by +" + (50 * level) + "% for every well timed click up to 3000%" }),
	new Artifact(302, 3, "Shgabb Seeds", "seeds.png", "shgabb", level => 1 + ((game.stats.ctp % 1000) * 0.02 * level), { desc: level => "+" + 2 * level + "% per click, resets every 1000 clicks (" + game.stats.ctp % 1000 + "/1000)" }),
	new Artifact(303, 3, "P2W", "p2w.png", "gems", level => 2.5 + level * 0.5, { noPercentage: true, trigger: () => currentBoost != "none", desc: "While an ad is active" }),
	new Artifact(304, 3, "Silicone implants", "implants.png", "complicated", 1, { desc: level => "Completely stops Silicone production, but its effects are +" + (100 + 100 * level) + "%" }),
	new Artifact(305, 3, "Sosnog", "sosnog.png", "shgabb", level => 3 + (11 * (level - 1)), { desc: "Switches Shgabb from clicks and Auto Shgabb" }),
	new Artifact(306, 3, "Shgabb's sleeves", "sleeves.png", "complicated", 0, { desc: level => "Click Shgabb gain is multiplied by inverse of click cooldown x" + (level * 2) + "<br>(Current: x" + ((level * 2) * (1 / clickCooldown)).toFixed(2) + ")" }),
	new Artifact(307, 3, "Shgabb's Dice", "dice-3.png", "complicated", 0, { desc: level => "Boosts Shgabb, Sandwiches by x" + diceAmount + " (" + level + "-6)" }),
	new Artifact(308, 3, "Gem Frustration", "frustration.png", "complicated", level => level * frustration, { desc: level => "Increases Gem chance and cap by " + (level * (getArtifactByID(200).isEquipped() ? 0.05 : 0.5)).toFixed(2) + "% for every click without gems<br>(Current: +" + getArtifactEffect(308).toFixed(2) + "%)" }),
	new Artifact(309, 3, "Sarah's Collection", "sarah.png", "gemchance", level => 1.5 + level * 0.5, { noPercentage: true, trigger: () => (game.a.length - 1 == artifacts.length - 1), desc: "If you own all Artifacts" }),
	new Artifact(310, 3, "Trash Can", "trashcan.png", "artifactchance", level => Math.max(1, Math.min(level * 4, trashCanBoost)), { noPercentage: true, desc: level => "+x" + (level + 1) + " per destroy, goes down by clicking<br>" + ((Math.max(1, trashCanBoost) > level * 4) ? ("Capped for " + Math.round(10 * trashCanBoost - level * 4) + " clicks") : ("Max: x" + (level * 4))) }),
	new Artifact(311, 3, "Surgeon's Sacrifice", "surgeonssacrifice.png", "prestigegs", level => Math.max(1, Math.log10(game.si) - 7 + level * 2), { noPercentage: true, desc: level => "Lose Silicone (not upgs) on prestige, but get more GS" }),
	new Artifact(312, 3, "Semicone", "semicone.png", "si", level => 10 + 5 * level, { trigger: () => game.gems > 0, noPercentage: true, desc: level => "10% chance of consuming a Gem every time Silicone is produced" }),
	new Artifact(313, 3, "Furious Fork", "fork.png", "clickspeed", level => 1.2 + 0.2 * level, { prefix: "-", trigger: () => game.clickCooldown >= -0.33 || lunarAntiCooldown > 0, desc: "For well timed clicks" }),
	new Artifact(314, 3, "Hood Goo", "hoodgoo.png", "complicated", 0, { desc: level => 10 * level + "% chance to save your Shgabb production after a click, 5% to stop saving it" }),
	new Artifact(315, 3, "DaGame", "dagame.png", "complicated", 0, { desc: level => 25 * level + "% chance to autoclick every second, consuming 10 Bags" }),

	new Artifact(400, 4, "Obama", "handcuffs.png", "complicated", 1, { desc: "It would give you additional slots based on your prestige playtime, but not in this universe for now" }),
]