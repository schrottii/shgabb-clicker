// Game made by Schrottii - editing or stealing is prohibited!

class Artifact {
	constructor(ID, rarity, name, image, boost, amount, trigger) {
		this.ID = ID;
		this.rarity = rarity; // 1 2 3
		this.name = name;
		this.image = image;
		this.boost = boost;
		this.amount = amount;
		this.trigger = trigger;
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
		return "<button class='artifact' onclick='switchArtifact(" + this.ID + ")' style='background-color: " + (this.isEquipped() ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><image src='images/arti/" + this.image + "' width='32px' height='32px'><br>" + (this.isEquipped() ? "<b>[EQUIPPED]</b>" : "") + "<br/>" + this.name + " (" + this.getRarity() + ")<br />" + (this.amount > 2 ? ("x" + this.amount) : ("+" + fn((this.amount - 1) * 100) + "%")) + " " + this.getBoostType() + "</button>";
	}
}

function handleArtifactsFirstTime() {
	if (!game.a.includes(0)) {
		for (i = 0; i < game.stats.clicks; i++) {
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

function getArtifact() {
	// (Chance TO GET)
	// Chance to get an artifact
	if (Math.random() < 1 / 1000) {
		gambleArtifact(1);
	}
	else if (Math.random() < 1 / 8000) {
		gambleArtifact(2);
	}
	else if (Math.random() < 1 / 32000) {
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
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", 1.2, () => true),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", 1.1, () => true),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", 1.5, () => true),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", 1.3, () => true),
	new Artifact(150, 1, "Ring of Productivity", "ring.png", "clickshgabb", 1.4, () => true),
	new Artifact(151, 1, "Ring of Laziness", "ring.png", "autoshgabb", 1.4, () => true),
	new Artifact(152, 1, "Ring of Speed", "ring.png", "clickspeed", 1.5, () => true),
	new Artifact(200, 2, "Amulet of Paroxysm", "amulet.png", "clickspeed", 5, () => true),
	new Artifact(201, 2, "Amulet of Saving", "amulet.png", "resetshgabb", 10000, () => true),
	new Artifact(202, 2, "Amulet of Quick Snacks", "amulet.png", "sw", 5, () => game.sw < 1000),
]