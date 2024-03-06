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
        render = render + "<button class='artifact' style='color: black; background-color: " + (game.ach.includes(achievements[a].ID) ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><img src='images/achievements/" + (game.ach.includes(achievements[a].ID) ? achievements[a].image : "empty.png") + "'><br><b>" + achievements[a].name + "</b><br>" + (typeof (achievements[a].description) == "function" ? achievements[a].description() : achievements[a].description) + "</button>"
    }
    ui.achievements.innerHTML = render;
}

function getAchievementByID(id) {
    // Use this to get a pfp
    for (a in achievements) {
        if (achievements[a].ID == id) return achievements[a];
    }
    return 1;
}

function getAchievementByName(id) {
    // Use this to get a pfp
    for (a in achievements) {
        if (achievements[a].name == id) return achievements[a];
    }
    return 1;
}

var achievements = [
    new Achievement(1, "shgabb.png", "Shgabb I", "Get 10 Shgabb", () => game.shgabb >= 10),
    new Achievement(2, "shgabb.png", "Shgabb II", "Get 1000 Shgabb", () => game.shgabb >= 1000),
    new Achievement(60, "clicks.png", "Clicker I", "Click 100 times", () => game.stats.clicks >= 100),
    new Achievement(67, "clicks2.png", "Fast Clicks I", "Reduce the click cooldown to 4s or less", () => clickCooldown <= 4),
    new Achievement(3, "unlock.png", "Can I eat this?", "Unlock Sandwiches", () => game.upgradeLevels.swChance > 0),
    new Achievement(4, "sandwich.png", "Sandwiches I", "Get 10 Sandwiches", () => game.sw >= 10),
    new Achievement(5, "unlock.png", "Back to 0!", "Unlock Prestige", () => game.shgabb >= 1000000),
    new Achievement(6, "shgabb.png", "Shgabb III", () => "Get " + fn(1e7) + " Shgabb", () => game.shgabb >= 1e7),
    new Achievement(7, "sandwich.png", "Sandwiches II", "Get 1000 Sandwiches", () => game.sw >= 1000),
    new Achievement(61, "clicks.png", "Clicker II", "Click 3000 times", () => game.stats.clicks >= 3000),
    new Achievement(8, "unlock.png", "Big sgobs", "Unlock Silicone Shgabb", () => game.shgabb >= 1000000000),
    new Achievement(9, "silicone.png", "Silicone I", "Get 1000 Silicone Shgabb", () => game.si >= 1000),
    new Achievement(10, "gs.png", "Golden Shgabb I", "Get 100 Golden Shgabb", () => game.gs >= 100),
    new Achievement(11, "silicone.png", "Silicone II", () => "Get " + fn(1e5) + " Silicone Shgabb", () => game.si >= 1e5),
    new Achievement(12, "unlock.png", "Stolen from somewhere", "Unlock Gems", () => unlockedGems()),
    new Achievement(68, "clicks2.png", "Fast Clicks II", "Reduce the click cooldown to 2.5s or less", () => clickCooldown <= 2.5),
    new Achievement(87, "shgabb.png", "This is me", "Change your name.", () => false),
    new Achievement(13, "gs.png", "Golden Shgabb II", () => "Get " + fn(25000) + " Golden Shgabb", () => game.gs >= 25000),
    new Achievement(42, "gem.png", "Shiny", "Get your first Gem!", () => game.stats.tgems > 0),
    new Achievement(62, "clicks.png", "Clicker III", "Click 25000 times", () => game.stats.clicks >= 25000),
    new Achievement(14, "shgabb.png", "Shgabb IV", () => "Get " + fn(1e12) + " Shgabb", () => game.shgabb >= 1e12),
    new Achievement(15, "sandwich.png", "Sandwiches III", () => "Get " + fn(25000) + " Sandwiches", () => game.sw >= 25000),
    new Achievement(16, "unlock.png", "Do we have dinosaurs???", "Unlock Artifacts", () => unlockedArtifacts()),
    new Achievement(95, "artifact.png", "Finite Stones", "Equip an Artifact!", () => game.aeqi.length > 0),
    new Achievement(17, "gs.png", "Golden Shgabb III", () => "Get " + fn(1e6) + " Golden Shgabb", () => game.gs >= 1e6),
    new Achievement(18, "silicone.png", "Silicone III", () => "Get " + fn(5e7) + " Silicone Shgabb", () => game.si >= 5e7),
    new Achievement(19, "sandwich.png", "Sandwiches IV", () => "Get " + fn(1e6) + " Sandwiches", () => game.sw >= 1e6),
    new Achievement(43, "gem.png", "The Red Gems I", "Get your 10th Gem!", () => game.stats.tgems >= 10),
    new Achievement(20, "artifact.png", "Indian Jones", "Get your first Artifact!", () => game.a.length > 1),
    new Achievement(21, "shgabb.png", "Shgabb V", () => "Get " + fn(1e15) + " Shgabb", () => game.shgabb >= 1e15),
    new Achievement(31, "hms.png", "Shgabb Conqueror I", "Reach More Shgabb level 1500", () => game.stats.hms >= 1500),
    new Achievement(57, "shgabb.png", "Pizza!!!!!", "Upgrade cheese to level 80 to learn how to make pizza", () => game.upgradeLevels.cheese >= 80),
    new Achievement(22, "gs.png", "Golden Shgabb IV", () => "Get " + fn(1e9) + " Golden Shgabb", () => game.gs >= 1e9),
    new Achievement(23, "silicone.png", "Silicone IV", () => "Get " + fn(2e8) + " Silicone Shgabb", () => game.si >= 2e8),
    new Achievement(36, "unlock.png", "What language is this?!", "Unlock Améliorer!", () => unlockedAmeliorer()),
    new Achievement(28, "artifact.png", "Treasure Hunter", "Get your 10th Artifact!", () => game.a.length > 10),
    new Achievement(47, "ttt.png", "Shgiccer I", "Win Shgic Shgac Shgoe once", () => game.stats.tttw > 0),
    new Achievement(39, "ameliorer.png", "Amé: Part II", "Unlock the second set of Améliorer upgrades", () => getTotalAme() >= 10),
    new Achievement(32, "hms.png", "Shgabb Conqueror II", "Reach More Shgabb level 2500", () => game.stats.hms >= 2500),
    new Achievement(37, "ameliorer.png", "Cap Bro I", "Get 50 Amélorier", () => game.stats.ame >= 50),
    new Achievement(44, "gem.png", "The Red Gems II", "Get your 100th Gem!", () => game.stats.tgems >= 100),
    new Achievement(24, "sandwich.png", "Sandwiches V", () => "Get " + fn(1e8) + " Sandwiches", () => game.sw >= 1e8),
    new Achievement(40, "ameliorer.png", "Amé: Part III", "Unlock the third set of Améliorer upgrades", () => getTotalAme() >= 25),
    new Achievement(48, "ttt.png", "Shgiccer II", "Win Shgic Shgac Shgoe 5 times", () => game.stats.tttw >= 5),
    new Achievement(35, "artifact.png", "Artifactfan", "Get your 25th Artifact!", () => game.a.length > 25),
    new Achievement(69, "clicks2.png", "Fastest Clicks", "Reduce the click cooldown to 0.1s", () => clickCooldown == 0.1),
    new Achievement(63, "clicks.png", "Clicker IV", "Click 250k times", () => game.stats.clicks >= 250000),
    new Achievement(25, "silicone.png", "Silicone V", () => "Get " + fn(1e12) + " Silicone Shgabb", () => game.si >= 1e12),
    new Achievement(26, "gs.png", "Golden Shgabb V", () => "Get " + fn(1e12) + " Golden Shgabb", () => game.gs >= 1e12),
    new Achievement(41, "ameliorer.png", "Amé: Part IV", "Unlock the fourth set of Améliorer upgrades", () => getTotalAme() >= 40),
    new Achievement(53, "artifact.png", "FOUR", "Find a way to equip 4 Artifacts at once", () => game.upgradeLevels.fourthArtifactSlot > 0),
    new Achievement(38, "ameliorer.png", "Cap Bro II", "Get 100 Améliorer", () => game.stats.ame >= 100),
    new Achievement(33, "hms.png", "Shgabb Conqueror III", "Reach More Shgabb level 5000", () => game.stats.hms >= 5000),
    new Achievement(27, "shgabb.png", "Shgabb VI", () => "Get " + fn(1e21) + " Shgabb", () => game.shgabb >= 1e21),
    new Achievement(29, "shgabb.png", "Shgabb VII", () => "Get " + fn(1e30) + " Shgabb", () => game.shgabb >= 1e30),
    new Achievement(52, "artifact.png", "My little collection", "Get your 40th Artifact!", () => game.a.length > 40),
    new Achievement(65, "shgabb.png", "Build builder I", "Buy another Artifact loadout!", () => game.al >= 3),
    new Achievement(70, "clicks2.png", "Slowest Clicks", "Increase the click cooldown to 25s or more", () => clickCooldown >= 25),
    new Achievement(45, "gem.png", "Sarah's Gems", "Have 500 Gems at the same time", () => game.gems >= 2000),
    new Achievement(80, "ameliorer.png", "Amé: Part V", "Unlock the fifth set of Améliorer upgrades", () => getTotalAme() >= 100),
    new Achievement(88, "ameliorer.png", "French equality", "Have the Améliorer currency boost upgrades on the same level", () => game.upgradeLevels.shgabbBoost > 0 && game.upgradeLevels.shgabbBoost == game.upgradeLevels.sandwichBoost),
    new Achievement(59, "shgabb.png", "eolm terrible headache", "it hurts", () => autoNotifications >= 5000),
    new Achievement(49, "ttt.png", "Shgiccer III", "Win Shgic Shgac Shgoe 14 times", () => game.stats.tttw >= 14),
    new Achievement(46, "gem.png", "The Red Gems III", "Get your 1000th Gem!", () => game.stats.tgems >= 1000),
    new Achievement(66, "shgabb.png", "Build builder II", "Buy all Artifact loadouts!", () => game.al >= 8),
    new Achievement(90, "unlock.png", "Challenge Me!", "Unlock Challenges", () => unlockedChallenges()),
    new Achievement(54, "gem.png", "The Red Gems IV", "Get your 2500th Gem!", () => game.stats.tgems >= 2500),
    new Achievement(56, "shgabb.png", "Shgabb VIII", () => "Get " + fn(1e60) + " Shgabb", () => game.shgabb >= 1e60),
    new Achievement(99, "challenge.png", "The New Playstyle", "Complete any Challenge", () => getTotalTiers() > 0),
    new Achievement(81, "challenge.png", "The Tallest Ladder", "Complete Challenge 1", () => game.clg[1] >= 1),
    new Achievement(82, "challenge.png", "Mend Me", "Complete Challenge 2", () => game.clg[2] >= 1),
    new Achievement(83, "challenge.png", "Hard Work", "Complete Challenge 3", () => game.clg[3] >= 1),
    new Achievement(84, "challenge.png", "I Forgor", "Complete Challenge 4", () => game.clg[4] >= 1),
    new Achievement(97, "unlock.png", "DaBag", "Unlock Bags", () => unlockedBags()),
    new Achievement(58, "ameliorer.png", "Cap Bro III", "Get 300 Améliorer", () => game.stats.ame >= 300),
    new Achievement(98, "bags.png", "I Bag You", "Get your first Bag!", () => game.stats.bags > 0),
    new Achievement(85, "challenge.png", "Slowchallenging", "Spend an hour inside a Challenge", () => !isChallenge(0) && game.stats.pttp >= 3600),
    new Achievement(34, "hms.png", "Shgabb Conqueror IV", "Reach More Shgabb level 10000", () => game.stats.hms >= 10000),
    new Achievement(71, "gift.png", "Gifted Kid", "Receive the rarest prize", () => game.evpfps.includes(400) || game.evpfps.includes(401)),
    new Achievement(72, "gift.png", "Merry Christmas", "Open a gift!", () => false),
    new Achievement(73, "gift.png", "Milk And Cookies I", "Get 25 Gifts total", () => game.stats.gifts >= 25),
    new Achievement(74, "gift.png", "Milk And Cookies II", "Get 1000 Gifts total", () => game.stats.gifts >= 1000),
    new Achievement(76, "shgabb.png", "Happy Birthday!", "Play during the Anniversary Event", () => isEvent("anniversary")),
    new Achievement(77, "cake.png", "Make Some Cake I", "Eat 1 Cake", () => game.stats.cakes >= 1),
    new Achievement(78, "cake.png", "Make Some Cake II", "Eat 5 Cakes", () => game.stats.cakes >= 5),
    new Achievement(79, "cake.png", "Make Some Cake III", "Eat 25 Cakes", () => game.stats.cakes >= 25),
    new Achievement(91, "chinese.png", "Happy New Year!", "Play during the Lunar New Year Event", () => isEvent("lunar")),
    new Achievement(92, "chinese.png", "You are rich", "Double Qian!", () => false),
    new Achievement(93, "chinese.png", "You are lucky", "Buy a lucky deal...", () => false),
    new Achievement(94, "chinese.png", "Dragon's Money", "Buy anything with Qian", () => false),
    new Achievement(50, "ttt.png", "Shgiccer IV", "Win Shgic Shgac Shgoe 30 times", () => game.stats.tttw >= 30),
    new Achievement(86, "sosnog.png", "My Best Friend", "Find the developer's favorite Artifact", () => game.a.includes(305)),
    new Achievement(30, "artifact.png", "Alexander Cunningham", "Get all Artifacts!", () => game.a.length - 1 == artifacts.length - 1),
    new Achievement(55, "gem.png", "The Red Gems V", "Get your 10000th Gem!", () => game.stats.tgems >= 10000),
    new Achievement(96, "ameliorer.png", "Amé: Part VI", "Unlock the sixth set of Améliorer upgrades", () => getTotalAme() >= 150),
    new Achievement(51, "hms.png", "Shgabb Conqueror V", "Reach More Shgabb level 15000", () => game.stats.hms >= 15000),
    new Achievement(100, "ttt.png", "Phallic Plays", "Win Shgic Shgac Shgoe with an interesting formation", () => false),
    new Achievement(64, "clicks.png", "Clicker V", "Click 1M times", () => game.stats.clicks >= 1000000),
    new Achievement(75, "artifact.png", "Mr. President", "Find the secret Artifact", () => game.a.includes(400)),
    new Achievement(89, "hms.png", "Shgabb Conqueror VI", "Reach More Shgabb level 20000", () => game.stats.hms >= 20000),
]
