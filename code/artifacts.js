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

	getDescription() {
		if (typeof (this.desc) == "function") return this.desc(getArtifactLevel(this.ID));
		return this.desc;
    }

	isUnlocked() {
		if (game.a.includes(this.ID)) return true;
		return false;
	}

	isEquipped() {
		if (game.aeqi.includes(this.ID)) return true;
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
				return "golden shgabb";
			case "si":
				return "silicone shgabb";
			case "clickspeed":
				return "click cooldown";
			case "gemchance":
				return "gem chance";
			case "gems":
				return "gems";
		}
	}

	render() {
		return "<button class='artifact' onclick='clickArtifact(" + this.ID + ")' style='background-color: " + (this.isEquipped() ? "rgb(240, 240, 240)" : "rgb(200, 200, 200)") + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'>" + (this.isEquipped() ? "<br><b>[EQUIPPED]</b>" : "") + "<br/>" + this.name + " (" + this.getRarity() + ")<br />Level " + getArtifactLevel(this.ID) + (this.boost == "complicated" ? "" : "<br />" + ((getArtifactEffect(this.ID) > 2 || this.noPercentage) ? (this.prefix + fn(getArtifactEffect(this.ID))) : ((this.prefix != "x" ? this.prefix : "+") + fn((getArtifactEffect(this.ID) - 1) * 100) + "%")) + " " + this.getBoostType()) + (this.getDescription() ? "<br/>" + this.getDescription() : "") + "</button>";
	}
}

var artifactMode = "select";

function artifactsUnlocked() {
	return game.stats.hms >= 1000;
}

function artifactUpgradingUnlocked() {
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
			if (artifacts[arti].isUnlocked() && artifacts[arti].isEquipped() && artifacts[arti].trigger()) boost *= getArtifactEffect(artifacts[arti].ID);
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

	if (artifactUpgradingUnlocked()) {
		ui.artifactScrapAmount.innerHTML = `<img class="currency" src="images/currencies/artifactscrap.png" />` + game.artifactScrap + " Artifact Scrap";

		render = render + "<button onclick='changeArtifactMode(0)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "select" ? "white" : "gray") + "'>Select</button>";
		render = render + "<button onclick='changeArtifactMode(1)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "upgrade" ? "white" : "gray") + "'>Upgrade</button>";
		render = render + "<button onclick='changeArtifactMode(2)' class='artifactLoadoutButton' style='background-color:" + (artifactMode != "destroy" ? "white" : "gray") + "'>Destroy</button>";
		render = render + "<br />";
	}
	else ui.artifactScrapAmount.innerHTML = "";

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
	if (!allArtifactsOfRarity(4) && Math.random() < 1 / 10000000 && multi == 1) {
		gambleArtifact(4);
	}
	else if (!allArtifactsOfRarity(3) && Math.random() < 1 / 32000 * multi) {
		gambleArtifact(3);
	}
	else if (!allArtifactsOfRarity(2) && Math.random() < 1 / 4000 * multi) {
		gambleArtifact(2);
	}
	else if (!allArtifactsOfRarity(1) && Math.random() < 1 / 800 * multi) {
		gambleArtifact(1);
	}
	else if (anyArtifactOfRarity(3) && Math.random() < 1 / 32000 * multi) {
		artifactDuplicate(3);
	}
	else if (anyArtifactOfRarity(2) && Math.random() < 1 / 6000 * multi) {
		artifactDuplicate(2);
	}
	else if (anyArtifactOfRarity(1) && Math.random() < 1 / 1200 * multi) {
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

function gambleArtifact(r) {
	if (game.nexgai[r - 1] == 0 || (getArtifactByID(game.nexgai[r - 1]) != undefined && getArtifactByID(game.nexgai[r - 1]).isEquipped())) game.nexgai[r - 1] = setNextArtifact(r);
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

	game.nexgai[r - 1] = setNextArtifact(r);
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

		game.artifactScrap += amount;
		game.stats.artifactScrap += amount;

		createNotification("Received +" + amount + " Artifact Scrap for destroying " + getArtifactByID(id).name + "!");
    }
}

var artifacts = [
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", level => 1 + 0.4 * level),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", level => 0.8 + 0.4 * level),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", level => 1.25 + 0.25 * level),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", level => 1 + 0.5 * level),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", level => 0.8 + 0.6 * level),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", level => 0.8 + 0.4 * level),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", level => 1.1 + 0.1 * level, { prefix: "-" }),
	new Artifact(153, 1, "Shiny Red Ring", "ring.png", "gemchance", level => 1 + 0.25 * level, { noPercentage: true, prefix: "x" }),
	new Artifact(154, 1, "Pulsing Red Ring", "ring.png", "gems", level => 1 + 0.25 * level, { noPercentage: true }),
	new Artifact(155, 1, "Ring of Depression", "ring.png", "shgabb", level => 0.1 / Math.pow(100, level), { noPercentage: true, prefix: "x" }),
	new Artifact(156, 1, "Ring of Slowing", "ring.png", "clickspeed", level => 1 + 0.5 * level, { noPercentage: true, trigger: () => false, prefix: "x" }),

	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", level => 2 + level, { prefix: "/", desc: "But no shgabb from clicks and /10 gem chance", noPercentage: true }),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", level => Math.pow(1000, 2 + level), { prefix: "+", noPercentage: true }),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", level => 3 * Math.max(1, (level - 1) * 4), { trigger: level => game.sw < 10000 * Math.max(1, (level - 1) * 5), desc: level => "While less than " + (10000 * Math.max(1, (level - 1) * 5)) + " sandwiches" }),
	new Artifact(203, 2, "Amulet of Sloth", "amulet.png", "autoshgabb", level => 2 + level, { desc: "But 5x longer click cooldown" }),
	new Artifact(204, 2, "Amulet of Golden Bank", "amulet.png", "gs", level => 2.5 + 2.5 * level, { trigger: () => game.stats.pttp >= 300, desc: "If the last prestige was at least 5 minutes ago" }),
	new Artifact(205, 2, "Amulet of Slowgemming", "amulet.png", "gemchance", level => 3 + level, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 seconds (not current)" }),
	new Artifact(206, 2, "Amulet of Passive Silicone", "amulet.png", "si", level => 1 + level, { noPercentage: true, prefix: "x", trigger: () => game.clickCooldown < 0, desc: "When not clicking" }),
	new Artifact(207, 2, "Amulet of Active Silicone", "amulet.png", "si", level => 1.4 + (level * 2.2), { prefix: "x", trigger: () => game.clickCooldown > 0, desc: "When the click cooldown is active" }),
	new Artifact(208, 2, "Amulet of Fast Start", "amulet.png", "shgabb", level => 10 * (1 + (level - 1) * 2.5), { noPercentage: true, prefix: "x", trigger: () => game.stats.pttp < 180, desc: "For 3 minutes after a prestige" }),
	new Artifact(209, 2, "Amulet of Tides", "amulet.png", "shgabb", level => 4 + 3 * level, { prefix: "x", trigger: () => game.stats.pttp % 20 >= 10, desc: "Active for 10 seconds, inactive for 10 seconds" }),
	new Artifact(210, 2, "Amulet of Thaw", "amulet.png", "autoshgabb", level => 5 + 5 * level, { prefix: "x", desc: "But fridge duration is reduced to 5s" }),
	new Artifact(211, 2, "Amulet of Condone", "amulet.png", "si", level => 2 * level, { prefix: "x", desc: "But x0.6 shgabb gain" }),
	new Artifact(212, 2, "Amulet of Sluggard", "amulet.png", "shgabb", level => 8 * level, { prefix: "x", trigger: () => game.stats.ctp < 5, desc: "Before the fifth click in a prestige" }),

	new Artifact(300, 3, "Shgabb's handcuffs", "handcuffs.png", "complicated", 0, { desc: level => "Auto Shgabb gain is multiplied by the click cooldown x" + (level * 2) }),
	new Artifact(301, 3, "Furious Knife", "knife.png", "complicated", 0, { desc: level => "Shgabb gain increases by +" + (50 * level) + "% for every well timed click up to 2000%" }),
	new Artifact(302, 3, "Shgabb Seeds", "seeds.png", "complicated", 0, { desc: level => "Every click in a prestige increases shgabb gain by " + (0.1 * level).toFixed(1) + "% (Current: x" + fn(1 + game.stats.ctp * 0.001 * getArtifactLevel(302)) + ")" }),
	new Artifact(303, 3, "P2W", "p2w.png", "gems", level => 1 + level, { noPercentage: true, trigger: () => currentBoost != "none", desc: "While an ad is active" }),
	new Artifact(304, 3, "Silicone implants", "implants.png", "complicated", 1, { desc: level => "Completely stops silicone production, but its effects are +" + (100 + 100 * level) + "%" }),
	new Artifact(305, 3, "Sosnog", "sosnog.png", "shgabb", level => 3 + (11 * (level - 1)), { desc: "Switches Shgabb from clicks and Auto Shgabb" }),

	new Artifact(400, 4, "Obama", "handcuffs.png", "complicated", 1, { desc: "It would give you additional slots based on your prestige playtime, but not in this universe for now" }),
]