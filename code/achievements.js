class Achievement {
    constructor(ID, image, name, description, unlock) {
        this.ID = ID;
        this.image = image;
        this.name = name;
        this.description = description;
        this.unlock = unlock;
    }
}

function renderAchievements() {
    let render = "";

    for (a in achievements) {
        render = render + "<div class='artifact' style='color: black; background-color: " + (game.ach.includes(achievements[a].ID) ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><img src='images/achievements/" + (game.ach.includes(achievements[a].ID) ? achievements[a].image : "empty.png") + "'><br><b>" + achievements[a].name + "</b><br>" + (typeof (achievements[a].description) == "function" ? achievements[a].description() : achievements[a].description) + "</div>"
    }
    ui.achievements.innerHTML = render;
}

var achievements = [
    new Achievement(1, "shgabb.png", "Shgabb I", "Get 10 Shgabb", () => game.shgabb >= 10),
    new Achievement(2, "shgabb.png", "Shgabb II", "Get 1000 Shgabb", () => game.shgabb >= 1000),
    new Achievement(3, "sandwich.png", "Can I eat this?", "Unlock Sandwiches", () => game.upgradeLevels.swChance > 0),
    new Achievement(4, "sandwich.png", "Sandwiches I", "Get 10 Sandwiches", () => game.sw >= 10),
    new Achievement(5, "gs.png", "Back to 0!", "Unlock Prestige", () => game.shgabb >= 1000000),
    new Achievement(6, "shgabb.png", "Shgabb III", () => "Get " + fn(1e7) + " Shgabb", () => game.shgabb >= 1e7),
    new Achievement(7, "sandwich.png", "Sandwiches II", "Get 1000 Sandwiches", () => game.sw >= 1000),
    new Achievement(8, "silicone.png", "Big sgobs", "Unlock Silicone Shgabb", () => game.shgabb >= 1000000000),
    new Achievement(9, "silicone.png", "Silicone I", "Get 1000 Silicone Shgabb", () => game.si >= 1000),
    new Achievement(10, "gs.png", "Golden Shgabb I", "Get 100 Golden Shgabb", () => game.gs >= 100),
    new Achievement(11, "silicone.png", "Silicone II", () => "Get " + fn(1e5) + " Silicone Shgabb", () => game.si >= 1e5),
    new Achievement(12, "gem.png", "Stolen from somewhere", "Unlock Gems", () => gemsUnlocked()),
    new Achievement(13, "gs.png", "Golden Shgabb II", () => "Get " + fn(25000) + " Golden Shgabb (warning: this achievement is evil)", () => game.gs >= 25000),
    new Achievement(14, "shgabb.png", "Shgabb IV", () => "Get " + fn(1e12) + " Shgabb", () => game.shgabb >= 1e12),
    new Achievement(15, "sandwich.png", "Sandwiches III", () => "Get " + fn(25000) + " Sandwiches", () => game.sw >= 25000),
    new Achievement(16, "unlock.png", "Do we have dinosaurs???", "Unlock Artifacts", () => artifactsUnlocked()),
    new Achievement(17, "gs.png", "Golden Shgabb III", () => "Get " + fn(1e6) + " Golden Shgabb", () => game.gs >= 1e6),
    new Achievement(18, "silicone.png", "Silicone III", () => "Get " + fn(5e7) + " Silicone Shgabb", () => game.si >= 5e7),
    new Achievement(19, "sandwich.png", "Sandwiches IV", () => "Get " + fn(1e6) + " Sandwiches", () => game.sw >= 1e6),
    new Achievement(20, "unlock.png", "Indian Jones", "Get your first artifact!", () => game.a.length > 1),
    new Achievement(21, "shgabb.png", "Shgabb V", () => "Get " + fn(1e15) + " Shgabb", () => game.shgabb >= 1e15),
    new Achievement(31, "hms.png", "Shgabb Conqueror I", "Reach More Shgabb level 1500", () => game.stats.hms >= 1500),
    new Achievement(22, "gs.png", "Golden Shgabb IV", () => "Get " + fn(1e9) + " Golden Shgabb", () => game.gs >= 1e9),
    new Achievement(23, "silicone.png", "Silicone IV", () => "Get " + fn(2e8) + " Silicone Shgabb", () => game.si >= 2e8),
    new Achievement(28, "unlock.png", "Treasure Hunter", "Get your 10th artifact!", () => game.a.length > 10),
    new Achievement(32, "hms.png", "Shgabb Conqueror II", "Reach More Shgabb level 2500", () => game.stats.hms >= 2500),
    new Achievement(25, "silicone.png", "Silicone V", () => "Get " + fn(1e12) + " Silicone Shgabb", () => game.si >= 1e12),
    new Achievement(26, "gs.png", "Golden Shgabb V", () => "Get " + fn(1e12) + " Golden Shgabb", () => game.gs >= 1e12),
    new Achievement(24, "sandwich.png", "Sandwiches V", () => "Get " + fn(1e8) + " Sandwiches", () => game.sw >= 1e8),
    new Achievement(35, "unlock.png", "Artifactfan", "Get your 25th artifact!", () => game.a.length > 25),
    new Achievement(33, "hms.png", "Shgabb Conqueror III", "Reach More Shgabb level 5000", () => game.stats.hms >= 5000),
    new Achievement(27, "shgabb.png", "Shgabb VI", () => "Get " + fn(1e21) + " Shgabb", () => game.shgabb >= 1e21),
    new Achievement(29, "shgabb.png", "Shgabb VII", () => "Get " + fn(1e30) + " Shgabb", () => game.shgabb >= 1e30),
    new Achievement(30, "unlock.png", "Alexander Cunningham", "Get all artifacts!", () => game.a.length - 1 == artifacts.length - 1),
    new Achievement(34, "hms.png", "Shgabb Conqueror IV", "Reach More Shgabb level 10000", () => game.stats.hms >= 10000),
]