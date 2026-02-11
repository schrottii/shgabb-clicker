class Achievement {
    constructor(ID, image, name, description, unlock) {
        this.ID = ID;
        this.image = image;
        this.name = name;
        this.description = description;
        this.unlock = unlock;
    }
}

var achievementsPage = 0;

function renderAchievements() {
    let render = "";

    render = render + "<button class='grayButton' onclick='changeAchievementPage(0)' class='artifactLoadoutButton'>Previous Page</button>";
    render = render + "<button class='grayButton' onclick='changeAchievementPage(1)' class='artifactLoadoutButton'>Next Page</button><br />";

    for (a = achievementsPage * 50; a < achievementsPage * 50 + 50; a++) {
        if (a > achievements.length - 1) continue;
        render = render + "<button class='artifact' style='color: black; background-color: " + (game.ach.includes(achievements[a].ID) ? "rgb(230, 230, 230)" : "rgb(200, 200, 200)") + "'><img src='images/achievements/" + (game.ach.includes(achievements[a].ID) ? achievements[a].image : "empty.png") + "'><br><b>" + achievements[a].name + "</b><br>" + (typeof (achievements[a].description) == "function" ? achievements[a].description() : achievements[a].description) + "</button>"
    }

    render = render + "<br /><button class='grayButton' onclick='changeAchievementPage(0)' class='artifactLoadoutButton'>Previous Page</button>";
    render = render + "<button class='grayButton' onclick='changeAchievementPage(1)' class='artifactLoadoutButton'>Next Page</button>";

    ui.achievements.innerHTML = render;
    ui.achievementsamount.innerHTML = game.ach.length + "/" + achievements.length + " Achievements unlocked! Boost: x" + fn(getAchievementBoost()) + " GS";
}

function changeAchievementPage(change) {
    // swap between the pages
    if (change == 0 && achievementsPage > 0) achievementsPage -= 1;
    if (change == 1 && achievementsPage < Math.floor((achievements.length - 1) / 50)) achievementsPage += 1;

    renderAchievements();
}

function getAchievement(id) {
    // Use this to get a pfp
    for (a in achievements) {
        if (achievements[a].ID == id) return achievements[a];
    }
    return 1;
}

// Give the player the achievement with the id "id"
function awardAchievement(id) {
    let thisAchievement = getAchievement(id);

    game.ach.push(thisAchievement.ID);
    createNotification("New achievement: NAME", [["NAME", thisAchievement.name]]);
    createPopup("Achievement Unlocked!", thisAchievement.name, "achievements/" + thisAchievement.image);

    renderAchievements();
    renderPlayerProfile();
}

// Used for stuff like event achievements - if you have this and that then you may get this
// USE THIS ONE
function checkAchievement(id, condition = true) {
    if (condition) {
        if (!game.ach.includes(id)) {
            awardAchievement(id);
        }
    }
}

// run regularly
function checkForNewAchievements() {
    for (let achGo in achievements) {
        if (achievements[achGo].unlock() && !game.ach.includes(achievements[achGo].ID)) {
            awardAchievement(achievements[achGo].ID);
            checkForDuplicateAchievements();
            break;
        }
    }
}

function checkForDuplicateAchievements() {
    let existingAchievements = [];

    for (achievs = 0; achievs < game.ach.length; achievs++) {
        if (!existingAchievements.includes(game.ach[achievs])) {
            existingAchievements.push(game.ach[achievs]);
        }
        else {
            game.ach.splice(achievs, 1);
            achievs -= 1;
        }
    }
}

var achievements = [
    new Achievement(1, "shgabb.png", "Shgabb I", "Get 10 Shgabb", () => game.shgabb >= 10),
    new Achievement(210, "shgabb.png", "Idle Game", "Activate Idle Mode (found in Shgabb)", () => game.idleMode == true),
    new Achievement(211, "shgabb.png", "Teaching you a lesson", "Complete the tutorial", () => false),
    new Achievement(121, "shbook.png", "Nerd", "Unlock the Shbook by reaching HMS 25", () => game.stats.hms >= 25),
    new Achievement(3, "unlock.png", "Can I eat this?", "Unlock Sandwiches by upgrading the Sandwich Chance upgrade (HMS 25)", () => game.upgradeLevels.swChance > 0),
    new Achievement(2, "shgabb.png", "Shgabb II", "Get 1000 Shgabb", () => game.shgabb >= 1000),
    new Achievement(67, "clicks2.png", "Fast Clicks I", "Reduce the click cooldown to 4s or less", () => clickCooldown <= 4),
    new Achievement(60, "clicks.png", "Clicker I", "Click 100 times", () => game.stats.clicks >= 100),
    new Achievement(4, "sandwich.png", "Sandwiches I", "Get 10 Sandwiches", () => game.sw >= 10),
    new Achievement(181, "unlock.png", "This is home", "Unlock the Player Profile at HMS 100", () => game.stats.hms >= 100),
    new Achievement(87, "shgabb.png", "This is me", "Change your name.", () => false),
    new Achievement(5, "unlock.png", "Back to 0!", () => "Unlock Prestige by reaching " + fn(1e6) + " Shgabb", () => game.shgabb >= 1000000),
    new Achievement(7, "sandwich.png", "Sandwiches II", "Get 1000 Sandwiches", () => game.sw >= 1000),
    new Achievement(6, "shgabb.png", "Shgabb III", () => "Get " + fn(1e7) + " Shgabb", () => game.shgabb >= 1e7),
    new Achievement(61, "clicks.png", "Clicker II", "Click 3000 times", () => game.stats.clicks >= 3000),
    new Achievement(10, "gs.png", "Golden Shgabb I", "Get 100 Golden Shgabb", () => game.gs >= 100),

    // 500 +
    new Achievement(8, "unlock.png", "Big sgobs", () => "Unlock Silicone Shgabb by reaching " + fn(1000000000) + " Shgabb", () => game.shgabb >= 1000000000),
    new Achievement(9, "silicone.png", "Silicone I", "Get 1000 Silicone Shgabb", () => game.si >= 1000),
    new Achievement(11, "silicone.png", "Silicone II", () => "Get " + fn(1e5) + " Silicone Shgabb", () => game.si >= 1e5),
    new Achievement(12, "unlock.png", "Stolen from somewhere", "Unlock Gems by reaching HMS 500", () => unlockedGems()),
    new Achievement(42, "gem.png", "Shiny", "Get your first Gem", () => game.stats.tgems > 0),
    new Achievement(43, "gem.png", "The Red Gems I", "Get your 10th Gem", () => game.stats.tgems >= 10),
    new Achievement(68, "clicks2.png", "Fast Clicks II", "Reduce the click cooldown to 2.5s or less", () => clickCooldown <= 2.5),
    new Achievement(13, "gs.png", "Golden Shgabb II", () => "Get " + fn(25000) + " Golden Shgabb", () => game.gs >= 25000),
    new Achievement(14, "shgabb.png", "Shgabb IV", () => "Get " + fn(1e12) + " Shgabb", () => game.shgabb >= 1e12),
    new Achievement(15, "sandwich.png", "Sandwiches III", () => "Get " + fn(25000) + " Sandwiches", () => game.sw >= 25000),

    // 1000 +
    new Achievement(16, "unlock.png", "Do we have dinosaurs???", "Unlock Artifacts (and Missions) by reaching HMS 1000", () => unlockedArtifacts()),
    new Achievement(20, "artifact.png", "Indian Jones", "Get your first Artifact", () => getArtifactAmount() >= 1),
    new Achievement(95, "artifact.png", "Finite Stones", "Equip an Artifact", () => game.aeqi.length > 0),
    new Achievement(133, "artifact.png", "Come On", "Get a common Artifact", () => anyArtifactsOfRarity(1) == true),
    new Achievement(134, "artifact.png", "Should we raid the pyramids?", "Get a rare Artifact", () => anyArtifactsOfRarity(2) == true),
    new Achievement(212, "shgabb.png", "I'm on a mission", "Select a mission", () => game.missions.selected != 0),
    new Achievement(21, "shgabb.png", "Shgabb V", () => "Get " + fn(1e15) + " Shgabb", () => game.shgabb >= 1e15),
    new Achievement(31, "hms.png", "Shgabb Conqueror I", "Reach More Shgabb level 1500", () => game.stats.hms >= 1500),
    new Achievement(17, "gs.png", "Golden Shgabb III", () => "Get " + fn(1e6) + " Golden Shgabb", () => game.gs >= 1e6),
    new Achievement(18, "silicone.png", "Silicone III", () => "Get " + fn(5e7) + " Silicone Shgabb", () => game.si >= 5e7),
    new Achievement(19, "sandwich.png", "Sandwiches IV", () => "Get " + fn(1e6) + " Sandwiches", () => game.sw >= 1e6),
    new Achievement(62, "clicks.png", "Clicker III", "Click 25000 times", () => game.stats.clicks >= 25000),
    new Achievement(213, "shgabb.png", "Not missing on a mission", "Complete your first mission", () => game.missions.completed.length > 0),
    new Achievement(214, "artifact.png", "Hyperspeed Cooldown", "Get the powerful Paroxysm Artifact", () => game.missions.completed.length > 0),
    new Achievement(69, "clicks2.png", "Fastest Clicks", "Reduce the click cooldown to 0.2s", () => clickCooldown < 0.2),
    new Achievement(57, "shgabb.png", "Pizza!!!!!", "Reach Cheese level 80 to learn how to make pizza (unlocks a GS upgrade)", () => game.upgradeLevels.cheese >= 80),

    // 2000 +
    new Achievement(36, "unlock.png", "What language is this?!", "Unlock Améliorer by reaching HMS 2000", () => unlockedAmeliorer()),
    new Achievement(28, "artifact.png", "Treasure Hunter", "Get your 10th Artifact", () => getArtifactAmount() >= 10),
    new Achievement(47, "ttt.png", "Shgiccer I", "Win Shgic Shgac Shgoe once", () => game.stats.tttw > 0),
    new Achievement(39, "ameliorer.png", "Amé: Part II", "Unlock the second set of Améliorer upgrades (10 Amé levels)", () => getTotalAme() >= 10),
    new Achievement(32, "hms.png", "Shgabb Conqueror II", "Reach More Shgabb level 2500", () => game.stats.hms >= 2500),
    new Achievement(129, "empty.png", "Nothing", "Buy nothing", () => ameliorerUpgrades.nothing.currentLevel() > 0),
    new Achievement(37, "ameliorer.png", "Cap Bro I", "Get 50 Amélorier", () => game.stats.ame >= 50),
    new Achievement(44, "gem.png", "The Red Gems II", "Get your 100th Gem", () => game.stats.tgems >= 100),
    new Achievement(24, "sandwich.png", "Sandwiches V", () => "Get " + fn(1e8) + " Sandwiches", () => game.sw >= 1e8),
    new Achievement(22, "gs.png", "Golden Shgabb IV", () => "Get " + fn(1e9) + " Golden Shgabb", () => game.gs >= 1e9),
    new Achievement(23, "silicone.png", "Silicone IV", () => "Get " + fn(2e8) + " Silicone Shgabb", () => game.si >= 2e8),
    new Achievement(35, "artifact.png", "Artifactfan", "Get your 25th Artifact", () => getArtifactAmount() >= 25),
    new Achievement(48, "ttt.png", "Shgiccer II", "Win Shgic Shgac Shgoe 5 times", () => game.stats.tttw >= 5),
    new Achievement(40, "ameliorer.png", "Amé: Part III", "Unlock the third set of Améliorer upgrades (25 Amé levels)", () => getTotalAme() >= 25),

    // 3000 +
    new Achievement(223, "unlock.png", "Familiar Sparks", "Unlock Generators at 3000 HMS", () => game.stats.hms >= 3000),
    new Achievement(224, "generators.png", "Cheap EV", "Buy the first Generator (^0.1 boost)", () => game.generators[0] != undefined && game.generators[0][0] >= 1),
    new Achievement(225, "generators.png", "As all things should be", "Buy the second Generator (^0.2 boost)", () => game.generators[1] != undefined && game.generators[1][0] >= 1),
    new Achievement(226, "generators.png", "Boosting the Generators", "Buy the third Generator (^0.3 boost)", () => game.generators[2] != undefined && game.generators[2][0] >= 1),
    new Achievement(227, "generators.png", "Weak as ever", "Buy the fourth Generator (^0.4 boost)", () => game.generators[3] != undefined && game.generators[3][0] >= 1),
    new Achievement(228, "generators.png", "Idle Bar", "Buy the fifth Generator (^0.5 boost)", () => game.generators[4] != undefined && game.generators[4][0] >= 1),
    new Achievement(229, "generators.png", "Gen Prix I", "Reach 1000 Genpoints", () => game.genpoints.gte(1000)),
    new Achievement(230, "generators.png", "Gen Prix II", "Reach 1e6 Genpoints", () => game.genpoints.gte(1e6)),
    new Achievement(231, "generators.png", "Gen Prix III", "Reach 1e9 Genpoints", () => game.genpoints.gte(1e9)),
    new Achievement(63, "clicks.png", "Clicker IV", "Click 250k times", () => game.stats.clicks >= 250000),
    new Achievement(26, "gs.png", "Golden Shgabb V", () => "Get " + fn(1e12) + " Golden Shgabb", () => game.gs >= 1e12),
    new Achievement(25, "silicone.png", "Silicone V", () => "Get " + fn(1e12) + " Silicone Shgabb", () => game.si >= 1e12),
    new Achievement(41, "ameliorer.png", "Amé: Part IV", "Unlock the fourth set of Améliorer upgrades (40 Amé levels)", () => getTotalAme() >= 40),
    new Achievement(53, "artifact.png", "FOUR", "Find a way to equip 4 Artifacts at once", () => game.upgradeLevels.fourthArtifactSlot > 0),

    // 4000 +
    new Achievement(122, "shbook.png", "This game has lore now?!", "Unlock the Lore by reaching HMS 4000", () => game.stats.hms >= 4000),
    new Achievement(135, "artifact.png", "Epic Gamer Moment", "Get an epic Artifact", () => anyArtifactsOfRarity(3) == true),
    new Achievement(38, "ameliorer.png", "Cap Bro II", "Get 100 Améliorer", () => game.stats.ame >= 100),
    new Achievement(123, "shbook.png", "The older scrolls", "Find a lore page", () => game.lorepg.length > 0),
    new Achievement(124, "shbook.png", "I rember", "Find a Memory Wisp", () => game.loreP > 0),
    new Achievement(125, "shbook.png", "Luckily it's in English", "Collect enough Wisps and unlock a lore page", () => game.lore.length > 0),
    new Achievement(33, "hms.png", "Shgabb Conqueror III", "Reach More Shgabb level 4444", () => game.stats.hms >= 4444),
    new Achievement(232, "artifact.png", "Scrap You I", "Destroy 10 Artifacts", () => game.stats.artisDestroyed >= 10),
    new Achievement(233, "artifact.png", "Scrap You II", "Destroy 100 Artifacts", () => game.stats.artisDestroyed >= 100),
    new Achievement(234, "artifact.png", "Scrap You III", "Destroy 1000 Artifacts", () => game.stats.artisDestroyed >= 1000),
    new Achievement(235, "artifact.png", "Scrap You IV", "Destroy 10,000 Artifacts", () => game.stats.artisDestroyed >= 10000),
    new Achievement(236, "artifact.png", "Scrap You V", "Destroy a million Artifacts", () => game.stats.artisDestroyed >= 1e6),
    new Achievement(237, "artifact.png", "Destructive Breakdown", "Destroy more Artis than you get in one day, at least 50", () => game.stats_today.artisDestroyed > game.stats_today.artisFound && game.stats_today.artisDestroyed >= 50),

    // 5000 +
    new Achievement(166, "unlock.png", "Wet Gang", "Unlock Fishgang by reaching HMS 5000", () => unlockedFishing()),
    new Achievement(172, "fishing.png", "Goldy Depp", "Catch a fish", () => game.stats.fish >= 1),
    new Achievement(173, "fishing.png", "Trash Metal", "Catch trash", () => game.stats.trash >= 1),
    new Achievement(27, "shgabb.png", "Shgabb VI", () => "Get " + fn(1e21) + " Shgabb", () => game.shgabb >= 1e21),
    new Achievement(29, "shgabb.png", "Shgabb VII", () => "Get " + fn(1e30) + " Shgabb", () => game.shgabb >= 1e30),
    new Achievement(157, "chenga.png", "Adrunic Tokenic", "Get a Chenga", () => game.chenga > 0),
    new Achievement(52, "artifact.png", "My little collection", "Get your 40th Artifact", () => getArtifactAmount() >= 40),
    new Achievement(65, "shgabb.png", "Build builder I", "Buy another Artifact loadout", () => game.al >= 3),
    new Achievement(70, "clicks2.png", "Slowest Clicks", "Increase the click cooldown to 25s or more", () => clickCooldown >= 25),
    new Achievement(45, "gem.png", "Sarah's Gems", "Have 2000 Gems at the same time", () => game.gems >= 2000),
    new Achievement(80, "ameliorer.png", "Amé: Part V", "Unlock the fifth set of Améliorer upgrades (100 Amé levels)", () => getTotalAme() >= 100),
    new Achievement(88, "ameliorer.png", "French equality", "Have the Améliorer currency boost upgrades on the same level", () => game.upgradeLevels.shgabbBoost > 0 && game.upgradeLevels.shgabbBoost == game.upgradeLevels.sandwichBoost),
    new Achievement(59, "shgabb.png", "eolm terrible headache", "it hurts", () => autoNotifications >= 3000),
    new Achievement(49, "ttt.png", "Shgiccer III", "Win Shgic Shgac Shgoe 14 times", () => game.stats.tttw >= 14),
    new Achievement(46, "gem.png", "The Red Gems III", "Get your 1000th Gem", () => game.stats.tgems >= 1000),
    new Achievement(66, "shgabb.png", "Build builder II", "Buy all Artifact loadouts", () => game.al >= 8),
    new Achievement(127, "gem.png", "Dirty Gemmer", "Unlock Gems To Amé (Améliorer Upgrade)", () => ameliorerUpgrades.gems2ame.currentLevel() > 0),
    new Achievement(215, "artifact.png", "My medium collection", "Get your 50th Artifact", () => getArtifactAmount() >= 50),
    new Achievement(167, "fishlvl.png", "Cod of Dedication I", "Reach Fish Level 10", () => game.fishlvl >= 10),
    new Achievement(168, "fishlvl.png", "Cod of Dedication II", "Reach Fish Level 25", () => game.fishlvl >= 25),
    new Achievement(188, "fishing.png", "Pearly I", "Get a Pearl upgrade to level 1", () => pearlUpgrades.prlShgabb.currentLevel() >= 1 || pearlUpgrades.prlGS.currentLevel() >= 1),
    new Achievement(189, "fishing.png", "Pearly II", "Get a Pearl upgrade to level 10", () => pearlUpgrades.prlShgabb.currentLevel() >= 10 || pearlUpgrades.prlGS.currentLevel() >= 10),
    new Achievement(190, "fishing.png", "Pearly III", "Get a Pearl upgrade to level 25", () => pearlUpgrades.prlShgabb.currentLevel() >= 25 || pearlUpgrades.prlGS.currentLevel() >= 25),

    // 6000 +
    new Achievement(90, "unlock.png", "Challenge Me!", "Unlock Challenges by reaching HMS 6000", () => unlockedChallenges()),
    new Achievement(54, "gem.png", "The Red Gems IV", "Get your 2500th Gem", () => game.stats.tgems >= 2500),
    new Achievement(56, "shgabb.png", "Shgabb VIII", () => "Get " + fn(1e60) + " Shgabb", () => game.shgabb >= 1e60),
    new Achievement(99, "challenge.png", "The New Playstyle", "Complete any Challenge", () => getTotalTiers() > 0),
    new Achievement(81, "challenge.png", "The Tallest Ladder", "Complete Challenge 1", () => game.clg[1] >= 1),
    new Achievement(58, "ameliorer.png", "Cap Bro III", "Get 300 Améliorer", () => game.stats.ame >= 300),
    new Achievement(82, "challenge.png", "Mend Me", "Complete Challenge 2", () => game.clg[2] >= 1),
    new Achievement(137, "challenge.png", "Challenger I", "Complete Challenges 3 times", () => getTotalTiers() >= 3),
    new Achievement(218, "shgabb.png", "I tell you what to tell me", "Change config for a notification", () => false),
    new Achievement(85, "challenge.png", "Slowchallenging", "Spend an hour inside a Challenge", () => !isChallenge(0) && game.stats_prestige.playTime >= 3600),
    new Achievement(86, "sosnog.png", "My Best Friend", "Find the developer's favorite Artifact", () => game.a.includes(305)),
    new Achievement(162, "artifact.png", "Paro-Brained", "No, you can't use Paroxysm for that...", () => getArtifact(200).isEquipped() && (getArtifactsSimpleBoost("gems") >= 10 || getArtifactsSimpleBoost("gemchance") >= 10)),
    new Achievement(163, "artifact.png", "Fatal Fury", "Why are you so angry?", () => getArtifact(301).isEquipped() && getArtifact(313).isEquipped() && getArtifact(315).isEquipped()),
    new Achievement(164, "artifact.png", "high seeds yes goo", "Oh my god. Why. No. No. Why are you doing this.", () => getArtifact(314).isEquipped() && getArtifact(302).isEquipped() && getClicks("stats_prestige") % 1000 >= 900 && hoodGoo > 0),
    new Achievement(165, "artifact.png", "Artifacts in Paris", "Who was in Paris?", () => getArtifact(400).isEquipped() && getArtifact(405).isEquipped()),
    new Achievement(219, "shgabb.png", "Free stuffing", "Redeem a Reward Code", () => game.red_rew.length >= 1),
    new Achievement(220, "shgabb.png", "Redemption arc", "Have 3 (not expired yet) Reward Codes redeemed at once", () => game.red_rew.length >= 3),
    new Achievement(222, "shgabb.png", "Secret Formula", "Use the Upgrade Calculator", () => selections[3] == "shbook5"),

    // 7000 +
    new Achievement(156, "unlock.png", "The Ads Are Changing", "Unlock Chengas by reaching HMS 7000", () => unlockedChengas()),
    new Achievement(158, "chenga.png", "I Cheng-ya", "Use a Chenga", () => false),

    // 8000 +
    new Achievement(97, "unlock.png", "DaBag", "Unlock Bags by reaching HMS 8000", () => unlockedBags()),
    new Achievement(98, "bags.png", "I Bag You", "Get your first Bag", () => game.stats.bags > 0),
    new Achievement(83, "challenge.png", "Hard Work", "Complete Challenge 3", () => game.clg[3] >= 1),
    new Achievement(105, "bags.png", "Playing DaGame I", "Get 100 Bags (total)", () => game.stats.bags >= 100),
    new Achievement(159, "chenga.png", "Collecta I", "Get 25 Chengas (total)", () => game.stats.chenga >= 25),
    new Achievement(34, "hms.png", "Shgabb Conqueror IV", "Reach More Shgabb level 9001", () => game.stats.hms >= 9001),
    new Achievement(34, "hms.png", "Shgabb Conqueror IV", "Reach More Shgabb level 9001", () => game.stats.hms >= 9001),
    new Achievement(106, "bags.png", "Playing DaGame II", () => "Get 1000 Bags (total)", () => game.stats.bags >= 1000),

    // 10,000 +
    new Achievement(141, "unlock.png", "Not Bronze!", "Unlock Copper Shgabb by reaching HMS 10000", () => unlockedCopper()),
    new Achievement(142, "copper.png", "Shcopper 2", "Get 100 Copper Shgabb", () => game.stats.cop.gte(100)),
    new Achievement(143, "copper.png", "Shcopper 4", () => "Get " + fn(1e4) + " Copper Shgabb", () => game.stats.cop.gte(1e4)),
    new Achievement(144, "copper.png", "Shcopper 8", () => "Get " + fn(1e8) + " Copper Shgabb", () => game.stats.cop.gte(1e8)),
    new Achievement(145, "copper.png", "Shcopper 16", () => "Get " + fn(1e16) + " Copper Shgabb", () => game.stats.cop.gte(1e16)),
    new Achievement(146, "copper.png", "Shcopper 32", () => "Get " + fn(1e32) + " Copper Shgabb", () => game.stats.cop.gte(1e32)),
    new Achievement(147, "copper.png", "Shcopper 64", () => "Get " + fn(1e64) + " Copper Shgabb", () => game.stats.cop.gte(1e64)),
    new Achievement(136, "artifact.png", "Rarity Surge", "Get a legendary Artifact", () => anyArtifactsOfRarity(4) == true),
    new Achievement(84, "challenge.png", "I Forgor", "Complete Challenge 4", () => game.clg[4] >= 1),
    new Achievement(138, "challenge.png", "Challenger II", "Complete Challenges 10 times", () => getTotalTiers() >= 10),
    new Achievement(107, "bags.png", "Playing DaGame III", () => "Get " + fn(50000) + " Bags (total)", () => game.stats.bags >= 50000),
    new Achievement(185, "shbook.png", "Librarian I", "Unlock 5 lore pages", () => game.lore.length >= 5),
    new Achievement(148, "ameliorer.png", "Cap Bro IV", "Get 800 Améliorer", () => game.stats.ame >= 800),
    new Achievement(50, "ttt.png", "Shgiccer IV", "Win Shgic Shgac Shgoe 30 times", () => game.stats.tttw >= 30),
    new Achievement(108, "bags.png", "Playing DaGame IV", () => "Get " + fn(250000) + " Bags (total)", () => game.stats.bags >= 250000),
    new Achievement(30, "artifact.png", "Alexander Cunningham", "Get all Artifacts!", () => getArtifactAmount() == totalAmountOfArtifacts()),
    new Achievement(221, "gem.png", "I need no triplets", "Already own all 3 Artifact Offers", () => !game.dgo.includes(0) && getArtifact(game.dgo[0]).isUnlocked() && getArtifact(game.dgo[1]).isUnlocked() && getArtifact(game.dgo[2]).isUnlocked()),
    new Achievement(55, "gem.png", "The Red Gems V", "Get your 10000th Gem", () => game.stats.tgems >= 10000),
    new Achievement(131, "challenge.png", "How upgrades disappear completely", "Complete Challenge 5", () => game.clg[5] >= 1),
    new Achievement(132, "challenge.png", "Welcome to Capitalism", "Complete Challenge 6", () => game.clg[6] >= 1),
    new Achievement(96, "ameliorer.png", "Amé: Part VI", "Unlock the sixth set of Améliorer upgrades (150 Amé levels)", () => getTotalAme() >= 150),
    new Achievement(109, "bags.png", "Playing DaGame V", () => "Get " + fn(1000000) + " Bags (total)", () => game.stats.bags >= 1000000),
    new Achievement(160, "chenga.png", "Collecta II", "Get 100 Chengas (total)", () => game.stats.chenga >= 100),
    new Achievement(186, "shbook.png", "Librarian II", "Unlock 10 lore pages", () => game.lore.length >= 10),

    // 15,000 +
    new Achievement(51, "hms.png", "Shgabb Conqueror V", "Reach More Shgabb level 16000", () => game.stats.hms >= 16000),
    new Achievement(191, "unlock.png", "The Republic", "Unlock Bananas (15 000 HMS)", () => unlockedBananas()),
    new Achievement(198, "bananatree.png", "Bananensamen", "Find your first Banana Seed", () => game.stats.bananaseeds > 0),
    new Achievement(199, "bananatree.png", "Beautiful Palms", "Get your first Banana Tree", () => game.stats.bananatrees > 0),
    new Achievement(192, "banana.png", "This is Bananas!", "Get your first Banana", () => game.bananas >= 1),
    new Achievement(169, "fishlvl.png", "Cod of Dedication III", "Reach Fish Level 50", () => game.fishlvl >= 50),
    new Achievement(170, "fishlvl.png", "Cod of Dedication IV", "Reach Fish Level 75", () => game.fishlvl >= 75),
    new Achievement(171, "fishlvl.png", "Cod of Dedication V", "Reach Fish Level 100", () => game.fishlvl >= 100),
    new Achievement(193, "banana.png", "Long Fruit I", "Get 100 Bananas (total)", () => game.stats.bananas >= 100),
    new Achievement(194, "banana.png", "Long Fruit II", "Get 1000 Bananas (total)", () => game.stats.bananas >= 1000),
    new Achievement(208, "shbook.png", "Librarian III", "Unlock 20 lore pages", () => game.lore.length >= 20),
    new Achievement(100, "ttt.png", "Phallic Plays", "Win Shgic Shgac Shgoe with an interesting formation", () => false),
    new Achievement(110, "bags.png", "Beating DaGame", () => "Have " + fn(1000000) + " Bags at the same time", () => game.bags >= 1000000),
    new Achievement(126, "ameliorer.png", "Amé: Part VII", "Unlock the seventh set of Améliorer upgrades (225 Amé levels)", () => getTotalAme() >= 225),
    new Achievement(128, "gem.png", "The Whale", "Unlock Infinite Gems To Amé (Améliorer Upgrade)", () => ameliorerUpgrades.infiniteGems2ame.currentLevel() > 0),
    new Achievement(195, "banana.png", "Long Fruit III", "Get 10k Bananas (total)", () => game.stats.bananas >= 10000),
    new Achievement(200, "bananatree.png", "Beautiful Palms", "Have four Banana Trees at once", () => getBananaTreeAmount() == 4),
    new Achievement(64, "clicks.png", "Clicker V", "Click 1M times", () => game.stats.clicks >= 1000000),
    new Achievement(75, "artifact.png", "Mr. President", "Find the secret Artifact", () => game.a.includes(400)),
    new Achievement(139, "challenge.png", "Challenger III", "Complete Challenges 25 times", () => getTotalTiers() >= 25),
    new Achievement(206, "ameliorer.png", "Amé: Part VIII", "Unlock the eighth set of Améliorer upgrades (300 Amé levels)", () => getTotalAme() >= 300),
    new Achievement(130, "ameliorer.png", "Vaméni, Vamidi, Vamici", "Increase max. levels of Améliorer upgrades... what?!", () => ameliorerUpgrades.AMECAME.currentLevel() > 0),
    new Achievement(150, "shgabb.png", "Shgabb IX", () => "Get " + fn(1e75) + " Shgabb", () => game.shgabb >= 1e75),
    new Achievement(174, "fishing.png", "Overluck (water element version)", "Have a very good chance of catching a fish", () => false),
    new Achievement(175, "fishing.png", "Legend of Leao", "Catch the legendary fish", () => false),
    new Achievement(149, "ameliorer.png", "Cap Bro V", "Get 2500 Améliorer", () => game.stats.ame >= 2500),
    new Achievement(161, "chenga.png", "Collecta III", "Get 1000 Chengas (total)", () => game.stats.chenga >= 1000),
    new Achievement(196, "banana.png", "Long Fruit IV", "Get 100k Bananas (total)", () => game.stats.bananas >= 100000),
    new Achievement(209, "shbook.png", "Librarian IV", "Unlock 40 lore pages", () => game.lore.length >= 40),
    new Achievement(217, "challenge.png", "Challenger IV", "Complete Challenges 50 times", () => getTotalTiers() >= 50),
    new Achievement(207, "ameliorer.png", "Amé: Part IX", "Unlock the ninth set of Améliorer upgrades (400 Amé levels)", () => getTotalAme() >= 400),
    new Achievement(238, "ameliorer.png", "Making a mess I", "Get 10 Amess", () => game.amess >= 10),
    new Achievement(239, "ameliorer.png", "Making a mess II", "Get 100 Amess", () => game.amess >= 100),
    new Achievement(240, "ameliorer.png", "Making a mess III", "Get 420 Amess", () => game.amess >= 420),
    new Achievement(197, "banana.png", "Long Fruit V", "Get 1M Bananas (total)", () => game.stats.bananas >= 1e6),
    new Achievement(187, "shbook.png", "Library of Babel", "Unlock all lore pages", () => game.lore.length == lore.length - 1),
    new Achievement(140, "clicks.png", "Clicker VI", "Click 5M times", () => game.stats.clicks >= 5000000),
    new Achievement(89, "hms.png", "Shgabb Conqueror VI", "Reach More Shgabb level 21,400", () => game.stats.hms >= 21400),

    // Achievements
    new Achievement(101, "achievement.png", "Achiever I", "Get 10 Achievements", () => game.ach.length >= 10),
    new Achievement(102, "achievement.png", "Achiever II", "Get 25 Achievements", () => game.ach.length >= 25),
    new Achievement(103, "achievement.png", "Achiever III", "Get 50 Achievements", () => game.ach.length >= 50),
    new Achievement(104, "achievement.png", "Achiever IV", "Get 75 Achievements", () => game.ach.length >= 75),
    new Achievement(201, "achievement.png", "Achiever V", "Get 100 Achievements", () => game.ach.length >= 100),
    new Achievement(202, "achievement.png", "Achiever VI", "Get 125 Achievements", () => game.ach.length >= 125),
    new Achievement(203, "achievement.png", "Achiever VII", "Get 150 Achievements", () => game.ach.length >= 150),
    new Achievement(204, "achievement.png", "Achiever VIII", "Get 175 Achievements", () => game.ach.length >= 175),
    new Achievement(205, "achievement.png", "Achiever IX", "Get 200 Achievements", () => game.ach.length >= 200),
    //new Achievement(, "achievement.png", "Achiever X", "Get 250 Achievements", () => game.ach.length >= 250),

    // Events
    new Achievement(182, "gift.png", "Shgannta Claubb", "Play during the Christmas Event", () => isEvent("christmas")),
    new Achievement(71, "gift.png", "Gifted Kid", "Receive the rarest prize", () => game.evpfps.includes(400) || game.evpfps.includes(401)),
    new Achievement(72, "gift.png", "Merry Christmas", "Open a gift", () => false),
    new Achievement(73, "gift.png", "Milk And Cookies I", "Get 25 Gifts total", () => game.stats.gifts >= 25),
    new Achievement(74, "gift.png", "Milk And Cookies II", "Get 1000 Gifts total", () => game.stats.gifts >= 1000),

    new Achievement(76, "shgabb.png", "Happy Birthday!", "Play during the Anniversary Event", () => isEvent("anniversary")),
    new Achievement(77, "cake.png", "Make Some Cake I", "Eat 1 Cake", () => game.stats.cakes >= 1),
    new Achievement(78, "cake.png", "Make Some Cake II", "Eat 5 Cakes", () => game.stats.cakes >= 5),
    new Achievement(79, "cake.png", "Make Some Cake III", "Eat 25 Cakes", () => game.stats.cakes >= 25),
    new Achievement(183, "cake.png", "It's A Celebration", "Get all 8 Anniversary Event cosmetics", () => game.evpfps.includes(403) && game.evpfps.includes(404) && game.evpfps.includes(405) && game.evbans.includes(421) && game.evbans.includes(422) && game.evbans.includes(423) && game.evframes.includes(403) && game.evframes.includes(404)),

    new Achievement(91, "chinese.png", "Happy New Year!", "Play during the Lunar New Year Event", () => isEvent("lunar")),
    new Achievement(92, "chinese.png", "You are rich", "Double Qian!", () => false),
    new Achievement(93, "chinese.png", "You are lucky", "Buy a lucky deal...", () => false),
    new Achievement(94, "chinese.png", "Dragon's Money", "Buy anything with Qian", () => false),
    new Achievement(184, "chinese.png", "Lucky Number 8", "Get all 8 Lunar New Year Event cosmetics", () => false),

    new Achievement(111, "eggs.png", "Easter Grass", "Play during the Egg Hunt Event", () => isEvent("egg")),
    new Achievement(112, "eggs.png", "Smashing Eggs", "Buy anything with Eggs", () => false),
    new Achievement(113, "eggs.png", "Hatching a friend I", "Find 100 Eggs total", () => game.stats.eggs >= 100),
    new Achievement(114, "eggs.png", "Hatching a friend II", "Find 1000 Eggs total", () => game.stats.eggs >= 1000),
    new Achievement(115, "eggs.png", "I'm an Egg", "Get all Easter PFPs", () => game.evpfps.includes(414)),

    new Achievement(116, "pride.png", "Love is love", "Play during the Pride Event", () => isEvent("pride")),
    new Achievement(117, "pride.png", "United against loneliness", "Get all Pride Event PFPs", () => game.evpfps.includes(415) && game.evpfps.includes(416) && game.evpfps.includes(417)),
    new Achievement(118, "pride.png", "United Love", "Get all Pride Event Frames", () => game.evframes.includes(409) && game.evframes.includes(410) && game.evframes.includes(411)),
    new Achievement(119, "pride.png", "Who do I love", "Get a Pride Event Banner", () => game.evbans.includes(400) || game.evbans.includes(401) || game.evbans.includes(402) || game.evbans.includes(403) || game.evbans.includes(404) || game.evbans.includes(405) || game.evbans.includes(406) || game.evbans.includes(407) || game.evbans.includes(408) || game.evbans.includes(409)),
    new Achievement(120, "pride.png", "I love all of you", "Get all Pride Event Banners", () => game.evbans.includes(400) && game.evbans.includes(401) && game.evbans.includes(402) && game.evbans.includes(403) && game.evbans.includes(404) && game.evbans.includes(405) && game.evbans.includes(406) && game.evbans.includes(407) && game.evbans.includes(408) && game.evbans.includes(409)),

    new Achievement(151, "summer.png", "California", "Play during the Hot Hot Summer Event", () => isEvent("summer")),
    new Achievement(152, "summer.png", "No Pants I", "Get 10 Shorts", () => game.stats.shorts >= 10),
    new Achievement(153, "summer.png", "No Pants II", "Get 100 Shorts", () => game.stats.shorts >= 100),
    new Achievement(154, "summer.png", "No Pants III", "Get 1000 Shorts", () => game.stats.shorts >= 1000),
    new Achievement(155, "summer.png", "Hate No Heat", "Get all Hot Hot Summer PFPs and Banners", () => game.evpfps.includes(420) && game.evbans.includes(413)),

    new Achievement(176, "stw.png", "Hallowitch Shgabbhain", "Play during the Shgabb The Witch Event", () => isEvent("shgabbthewitch")),
    new Achievement(177, "stw.png", "Poison of the Pot", "Get all Shgabb The Witch PFPs", () => game.evpfps.includes(421) && game.evpfps.includes(422) && game.evpfps.includes(423) && game.evpfps.includes(424) && game.evpfps.includes(425)),
    new Achievement(178, "stw.png", "Bane of the Witch", "Get all Shgabb The Witch Banners", () => game.evbans.includes(414) && game.evbans.includes(415) && game.evbans.includes(416) && game.evbans.includes(417)),
    new Achievement(179, "stw.png", "Scary Noodles", "Get all Shgabb The Witch lore pages", () => game.lore.includes(200) && game.lore.includes(201) && game.lore.includes(202) && game.lore.includes(203) && game.lore.includes(204) && game.lore.includes(205) && game.lore.includes(206) && game.lore.includes(207) && game.lore.includes(208) && game.lore.includes(209)),
    new Achievement(180, "stw.png", "Shgummon Demobbn", "Get 666 Witch Shgabb", () => game.witchshgabb >= 666),
]
