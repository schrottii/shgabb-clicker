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

	getBoostType() {
		switch (this.boost) {
			case "shgabb":
				return "shgabb";
			case "sw":
				return "sandwiches";
			case "gs":
				return "golden shgabb";
			case "si":
				return "silicone shgabb";
		}
	}

	render() {
		return "<div style='upgrade'> " + this.name + " (" + this.getRarity() + ")<br />" + (this.amount > 2 ? ("x" + this.amount - 1) : ("+" + fn((this.amount - 1) * 100) + "%")) + " " + this.getBoostType() + "</div>";
	}
}

function getArtifactBoost(currency) {
	let boost = 1;
	for (a in artifacts) {
		if (artifacts[a].boost == currency && artifacts[a].isUnlocked()) {
			boost *= artifacts[a].amount;
		}
	}
	return boost;
}

function renderArtifacts() {
	let render = "";
	for (a in artifacts) {
		if (artifacts[a].isUnlocked()) {
			render = render + artifacts[a].render();
		}
	}
	return render;
}

var artifacts = [
	new Artifact(100, 1, "Blue Ring", "ring.png", "shgabb", 1.2, true),
	new Artifact(101, 1, "Yellow Ring", "ring.png", "gs", 1.1, true),
	new Artifact(102, 1, "White Ring", "ring.png", "sw", 1.5, true),
	new Artifact(103, 1, "Light Blue Ring", "ring.png", "si", 1.3, true),
]