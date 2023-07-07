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

		if (config) {
			if (config.trigger) this.trigger = config.trigger;
			if (config.prefix) this.prefix = config.prefix;
			if (config.desc) this.desc = config.desc;
        }
	}

	getRarity() {
		return ["ERROR", "Common", "Rare", "Epic", ""][this.rarity];
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
		}
	}

	render() {
		return "<button class='artifact' onclick='switchArtifact(" + this.ID + ")' style='background-color: " + (this.isEquipped() ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'><br>" + (this.isEquipped() ? "<b>[EQUIPPED]</b>" : "") + "<br/>" + this.name + " (" + this.getRarity() + ")<br />" + (this.boost == "complicated" ? "" : (this.amount > 2 ? (this.prefix + this.amount) : ("+" + fn((this.amount - 1) * 100) + "%")) + " " + this.getBoostType()) + (this.desc ? "<br/>" + this.desc : "") + "</button>";
	}
}

function artifactsUnlocked() {
	return game.stats.hms >= 1000;
}

function handleArtifactsFirstTime() {
	if (!game.a.includes(0)) {
		for (i = 0; i < Math.ceil(game.stats.clicks / 5); i++) {
			getArtifact();
		}
		game.a.push(0);
		createNotification("Artifacts awarded for past clicks successfully!");
    }
}

function getArtifactBoost(currency) {
	let boost = 1;
	for (a in artifacts) {
		if (artifacts[a].boost == currency && artifacts[a].isUnlocked() && artifacts[a].isEquipped() && artifacts[a].trigger()) {
			boost *= artifacts[a].amount;
		}
	}
	return boost;
}

function renderArtifacts() {
	// Render em all
	let render = "";
	for (a in artifacts) {
		if (artifacts[a].isUnlocked()) {
			render = render + artifacts[a].render();
		}
	}
	return render;
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
	if (!allArtifactsOfRarity(1) && Math.random() < 1 / 800 * multi) {
		gambleArtifact(1);
	}
	else if (!allArtifactsOfRarity(2) && Math.random() < 1 / 4000 * multi) {
		gambleArtifact(2);
	}
	else if (!allArtifactsOfRarity(3) && Math.random() < 1 / 32000 * multi) {
		gambleArtifact(3);
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
	updateArtifacts();
}

var artifacts = [
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", 1.2,),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", 1.2),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", 1.5),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", 1.3),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", 1.4),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", 1.4),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", 1.5),
	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", 5, { prefix: "/", desc: "But no shgabb and gems from clicks" }),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", 10000, {prefix: "+"}),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", 5, { trigger: () => game.sw < 3000, desc: "While less than 3000 sandwiches" }),
	new Artifact(203, 2, "Amulet of Sloth", "amulet.png", "autoshgabb", 5, { desc: "But 5x longer click cooldown" }),
	new Artifact(204, 2, "Amulet of Golden Bank", "amulet.png", "gs", 2.5, { trigger: () => game.stats.pttp > 120, desc: "If the last prestige was at least 2 minutes ago" }),
	new Artifact(300, 3, "Shgabb's handcuffs", "handcuffs.png", "complicated", 0, { desc: "Auto Shgabb gain is multiplied by the click cooldown" }),
	new Artifact(301, 3, "Furious Knife", "knife.png", "complicated", 0, { desc: "Shgabb gain increases by +25% for every well timed click up to 1000%" }),
	new Artifact(302, 3, "Shgabb Seeds", "seeds.png", "complicated", 0, { desc: "Every click in a prestige increases shgabb gain by 0.25%" }),
]