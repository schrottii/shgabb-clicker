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
		return "<button class='artifact' onclick='switchArtifact(" + this.ID + ")' style='background-color: " + (this.isEquipped() ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'>" + (this.isEquipped() ? "<br><b>[EQUIPPED]</b>" : "") + "<br/>" + this.name + " (" + this.getRarity() + ")" + (this.boost == "complicated" ? "" : "<br />" + ((this.amount > 2 || this.noPercentage) ? (this.prefix + this.amount) : ((this.prefix != "x" ? this.prefix : "+") + fn((this.amount - 1) * 100) + "%")) + " " + this.getBoostType()) + (this.desc ? "<br/>" + this.desc : "") + "</button>";
	}
}

function artifactsUnlocked() {
	return game.stats.hms >= 1000;
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

function getArtifactBoost(currency) {
	let boost = 1;
	for (let arti in artifacts) {
		if (artifacts[arti].boost == currency) {
			if (artifacts[arti].isUnlocked() && artifacts[arti].isEquipped() && artifacts[arti].trigger()) boost *= artifacts[arti].amount;
		}
	}
	return boost;
}

var selectedLoadout = 0;
var rep7 = "ey";

function renderArtifacts() {
	// Render em all
	let render = "";
	for (l = 0; l < 3; l++) {
		render = render + "<button onclick='artifactLoadout(" + l + ")' style='width: 15%; min-width: 128px; height: 32px; background-color: " + (l == selectedLoadout ? "yellow" : "white") + "'>Loadout " + (l + 1) + "</button>";
	}
	render = render + "<br /><br />";

	for (a in artifacts) {
		if (artifacts[a].isUnlocked()) {
			render = render + artifacts[a].render();
		}
	}
	return render;
}

function artifactLoadout(l) {
	if (game.alo[l].length > 0) {
		game.aeqi = game.alo[l];
	}
	else {
		game.aeqi = [];
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

function getArtifact(multi = 1) {
	// (Chance TO GET)
	// Chance to get an artifact
	if (!allArtifactsOfRarity(1) && Math.random() < 1 / 1200 * multi) {
		gambleArtifact(1);
	}
	else if (!allArtifactsOfRarity(2) && Math.random() < 1 / 6000 * multi) {
		gambleArtifact(2);
	}
	else if (!allArtifactsOfRarity(3) && Math.random() < 1 / 32000 * multi) {
		gambleArtifact(3);
	}
	else if (!allArtifactsOfRarity(4) && Math.random() < 1 / 10000000 && multi == 1) {
		gambleArtifact(4);
	}
}

function gambleArtifact(r) {
	// Used by getArtifact - which one will we get of this rarity?
	let possibleArtifacts = [];
	for (a in artifacts) {
		if (artifacts[a].rarity == r && !artifacts[a].isUnlocked()) {
			possibleArtifacts.push(artifacts[a].ID);
		}
	}
	if (possibleArtifacts.length > 0) {
		let gainedID = possibleArtifacts[Math.floor(Math.random() * possibleArtifacts.length)];
		game.a.push(gainedID);
		createNotification("New Artifact: " + getArtifactByID(gainedID).name);
		updateArtifacts();

		ui.newArtifactText = "New Artifact!";
		ui.newArtifactImage.src = "images/arti/" + getArtifactByID(gainedID).image;
		ui.newArtifactName.innerHTML = getArtifactByID(gainedID).name + " (" + getArtifactByID(gainedID).getRarity() + ")";
		ui.newArtifact.style.display = "block";

		setTimeout(() => {
			ui.newArtifact.style.display = "none";
        }, 5000)
	}
}

function getArtifactByID(id) {
	// Use this to get an artifact using its ID, and then get its name, effect or whatever
	for (a in artifacts) {
		if (artifacts[a].ID == id) return artifacts[a];
	}
}

function switchArtifact(id) {
	if (getArtifactByID(id).isEquipped()) game.aeqi.splice(game.aeqi.indexOf(id), 1);
	else if (game.aeqi.length < 3) game.aeqi.push(id);
	game.alo[selectedLoadout] = game.aeqi;

	freezeTime();
	updateArtifacts();
}

var artifacts = [
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", 1.4,),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", 1.2),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", 1.5),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", 1.5),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", 1.4),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", 1.6),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", 1.3, { prefix: "-" }),
	new Artifact(153, 1, "Shiny Red Ring", "ring.png", "gemchance", 1.5, { noPercentage: true, prefix: "x" }),
	new Artifact(154, 1, "Pulsing Red Ring", "ring.png", "gems", 1.5),
	new Artifact(155, 1, "Ring of Depression", "ring.png", "shgabb", 0.001, { noPercentage: true, prefix: "x" }),
	new Artifact(156, 1, "Ring of Slowing", "ring.png", "clickspeed", 1.5, { trigger: () => false, prefix: "+" }),

	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", 3, { prefix: "/", desc: "But no shgabb and gems from clicks" }),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", 1e9, {prefix: "+"}),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", 3, { trigger: () => game.sw < 5000, desc: "While less than 5000 sandwiches" }),
	new Artifact(203, 2, "Amulet of Sloth", "amulet.png", "autoshgabb", 5, { desc: "But 5x longer click cooldown" }),
	new Artifact(204, 2, "Amulet of Golden Bank", "amulet.png", "gs", 5, { trigger: () => game.stats.pttp >= 300, desc: "If the last prestige was at least 5 minutes ago" }),
	new Artifact(205, 2, "Amulet of Slowgemming", "amulet.png", "gemchance", 5, { prefix: "x", trigger: () => getCooldown() >= 3, desc: "If the cooldown is more than 3 seconds (not current)" }),
	new Artifact(206, 2, "Amulet of Passive Silicone", "amulet.png", "si", 2, { prefix: "x", trigger: () => game.clickCooldown < 0, desc: "When not clicking" }),
	new Artifact(207, 2, "Amulet of Active Silicone", "amulet.png", "si", 3, { prefix: "x", trigger: () => game.clickCooldown > 0, desc: "When the click cooldown is active" }),
	new Artifact(208, 2, "Amulet of Fast Start", "amulet.png", "shgabb", 10, { prefix: "x", trigger: () => game.stats.pttp < 180, desc: "For 3 minutes after a prestige" }),
	new Artifact(209, 2, "Amulet of Tides", "amulet.png", "shgabb", 7, { prefix: "x", trigger: () => game.stats.pttp % 20 >= 10, desc: "Active for 10 seconds, inactive for 10 seconds" }),
	new Artifact(210, 2, "Amulet of Thaw", "amulet.png", "autoshgabb", 10, { prefix: "x", desc: "But fridge duration is reduced to 5s" }),
	new Artifact(211, 2, "Amulet of Condone", "amulet.png", "si", 2, { prefix: "x", desc: "But x0.6 shgabb gain" }),
	new Artifact(212, 2, "Amulet of Sluggard", "amulet.png", "autoshgabb", 8, { prefix: "x", trigger: () => game.stats.ctp < 5, desc: "Before the fifth click in a prestige" }),

	new Artifact(300, 3, "Shgabb's handcuffs", "handcuffs.png", "complicated", 0, { desc: "Auto Shgabb gain is multiplied by the click cooldown" }),
	new Artifact(301, 3, "Furious Knife", "knife.png", "complicated", 0, { desc: "Shgabb gain increases by +50% for every well timed click up to 2000%" }),
	new Artifact(302, 3, "Shgabb Seeds", "seeds.png", "complicated", 0, { desc: "Every click in a prestige increases shgabb gain by 0.5%" }),
	new Artifact(303, 3, "P2W", "p2w.png", "gems", 3, { trigger: () => currentBoost != "none", desc: "While an ad is active" }),
	new Artifact(304, 3, "Silicone implants", "implants.png", "complicated", 1, { desc: "Completely stops passive silicone production, but its effects are tripled" }),
	new Artifact(305, 3, "Sosnog", "sosnog.png", "complicated", 1, { desc: "Switches Shgabb from clicks and Auto Shgabb" }),

	new Artifact(400, 4, "Obama", "handcuffs.png", "complicated", 1, { desc: "It would give you additional slots based on your prestige playtime, but not in this universe for now" }),
]