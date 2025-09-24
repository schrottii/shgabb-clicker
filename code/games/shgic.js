// Game made by Schrottii - editing or stealing is prohibited!
// (both the minigame and the main game, lol)

let shgicPointsPlayer = 0;
let shgicPointsEnemy = 0;

var canPlayTTT = false;
var completedTTT = false;
var shicTimeSinceLastMove = 0;
var turn = "player";

let shgicField =
    [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];

// TIME RELATED FUNCTIONS

function today() {
    // returns today's date
    // 20240615

    let today = new Date();
    return (1900 + today.getYear()) + "" + ((today.getUTCMonth() + 1).toString().length == 1 ? "0" + (today.getUTCMonth() + 1) : (today.getUTCMonth() + 1)) + (today.getUTCDate().toString().length == 1 ? "0" + today.getUTCDate() : today.getUTCDate());
}

function formatDate(date) {
    // formats a date
    // June 15th 2024

    date = date.toString();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let postDay = "th";

    if (date.substr(6, 1) != "1") { // <-- 11, 12, 13
        if (date.substr(7, 1) == "1") postDay = "st";
        if (date.substr(7, 1) == "2") postDay = "nd";
        if (date.substr(7, 1) == "3") postDay = "rd";
    }

    return months[date.substr(4, 2) - 1] + " " + date.substr(6, 2) + postDay + " " + date.substr(0, 4);
}

function isNewDay() {
    // returns true if it's a new day
    return parseInt(today()) > parseInt(game.day);
}

function checkNewDay() {
    // checks if it's a new day, and if it is, do whatever is needed
    // 20240615 > 20240614

    if (game.day.toString().substr(0, 7) == "2024010") game.day = "0";
    if (game.tttd.toString().substr(0, 7) == "2024010") game.tttd = "0";

    // new shgic? NEW SHGIC? SHGIC REMINDER
    // it's outside so that you get a new one UNTIL you do it... not just once
    if (game.day > game.tttd && canPlayTTT == false) {
        shgicPointsPlayer = 0;
        shgicPointsEnemy = 0;
        canPlayTTT = true;
        turn = "player";
        shgicResetField();
    }

    if (isNewDay()) {
        // IMPORTANT: update time
        game.day = parseInt(today());

        // update artifact offer
        let newDailyArtifact = 100;
        let dgoRar = 3;

        while (newDailyArtifact == 100 && dgoRar > 0) {
            for (a in artifacts) {
                if (artifacts[a].rarity == dgoRar && !getArtifact(artifacts[a].ID).isUnlocked() && game.stats.hms >= artifacts[a].getHMSNeeded() && Math.random() > (1 - (dgoRar / 5))) newDailyArtifact = artifacts[a].ID;
            }
            dgoRar -= 1;
        }
        game.dgo = newDailyArtifact;
        updateGems();

        // update bananas
        if (unlockedBananas()) {
            for (let tree in game.bananatrees) {
                game.bananatrees[tree].days++;
            }
        }

        // amess
        if (ameliorerUpgrades.unstableAMESS.currentLevel() > 0) {
            game.amess += 1;
            game.ame += 1;
            statIncrease("amess", 1);
        }

        // get etenv
        if (game.etenvev != getCurrentEvent() && getCurrentEvent() != "none" && unlockedEtenvs() && game.event == "") {
            // you get one per event, if you unlocked the feature, and it's a REAL event
            game.etenvev = getCurrentEvent();
            game.etenvs += 1;
            statIncrease("etenvs", 1);
        }

        // daily challenge
        refreshDailyChallenge();

        // daily stats reset
        for (stat in game.stats_today) {
            if (game.stats_today[stat] != undefined && game.stats_today[stat].mantissa != undefined) {
                game.stats_today[stat] = new Decimal(0);
            }
            else {
                game.stats_today[stat] = 0;
            }
        }
    }
}

function shgicClickField(x, y) {
    if (shgicField[x][y] == 0 && canPlayTTT && shicTimeSinceLastMove > 0.2 && turn == "player") {
        shgicField[x][y] = 1;
        // shgicLastMovePlayer = [x, y, 0];
        shicTimeSinceLastMove = 0;

        objects["i" + x + "." + y].image = "sssx";
        createAnimation("shgic" + x + "." + y, "i" + x + "." + y, (t, d, a) => { t.alpha = a.dur * 2; }, 0.5, false);
        turn = "enemy";

        if (shgicFindWinners()) {
            setTimeout("shgicEnemyMove()", Math.ceil(400 * Math.random()) + 100);
        }
    }
}

function shgicEnemyMove() {
    let enemyMove = 0;
    let px, py;

    for (let y in shgicField) {
        px = y;

        if (shgicField[y][0] == 2 && shgicField[y][1] == 2 && shgicField[y][2] == 0) {
            shgicField[y][2] = 2;
            py = 2;
            enemyMove = 1;
            break;
        }
        if (shgicField[y][0] == 2 && shgicField[y][1] == 0 && shgicField[y][2] == 2) {
            shgicField[y][1] = 2;
            py = 1;
            enemyMove = 1;
            break;
        }
        if (shgicField[y][0] == 0 && shgicField[y][1] == 2 && shgicField[y][2] == 2) {
            shgicField[y][0] = 2;
            py = 0;
            enemyMove = 1;
            break;
        }

        py = y;
        if (shgicField[0][y] == 2 && shgicField[1][y] == 2 && shgicField[2][y] == 0) {
            shgicField[2][y] = 2;
            px = 2;
            enemyMove = 1;
            break;
        }
        if (shgicField[0][y] == 2 && shgicField[1][y] == 0 && shgicField[2][y] == 2) {
            shgicField[1][y] = 2;
            px = 1;
            enemyMove = 1;
            break;
        }
        if (shgicField[0][y] == 0 && shgicField[1][y] == 2 && shgicField[2][y] == 2) {
            shgicField[0][y] = 2;
            px = 0;
            enemyMove = 1;
            break;
        }
    }

    while (enemyMove == 0) {
        let randomPlaced = Math.floor(Math.random() * 9);
        if (shgicField[Math.floor(randomPlaced / 3)][randomPlaced % 3] == 0) {
            shgicField[Math.floor(randomPlaced / 3)][randomPlaced % 3] = 2;
            px = Math.floor(randomPlaced / 3);
            py = randomPlaced % 3;
            enemyMove = 1;
        }
    }

    objects["i" + px + "." + py].image = "ssso";
    createAnimation("shgic" + px + "." + py, "i" + px + "." + py, (t, d, a) => { t.alpha = a.dur * 2 }, 0.5, false);

    turn = "player";
    shgicFindWinners();
}

function shgicFindWinners() {
    let winner = 0;

    // Check for 3 in a row
    for (y in shgicField) {
        if (shgicField[y][0] == shgicField[y][1] && shgicField[y][0] == shgicField[y][2] && shgicField[y][0] != 0) {
            winner = shgicField[y][0];
        }
        if (shgicField[0][y] == shgicField[1][y] && shgicField[0][y] == shgicField[2][y] && shgicField[0][y] != 0) {
            winner = shgicField[0][y];
        }
    }
    if (shgicField[0][0] == shgicField[1][1] && shgicField[1][1] == shgicField[2][2] && shgicField[0][0] != 0) {
        winner = shgicField[0][0];
    }
    if (shgicField[2][0] == shgicField[1][1] && shgicField[1][1] == shgicField[0][2] && shgicField[2][0] != 0) {
        winner = shgicField[2][0];
    }

    if (shgicField[0][0] == 0 && shgicField[0][1] != 0 && shgicField[0][2] == 0
        && shgicField[1][0] == 0 && shgicField[1][1] != 0 && shgicField[1][2] == 0
        && shgicField[2][0] != 0 && shgicField[2][1] != 0 && shgicField[2][2] != 0) {
        checkAchievement(100);
    }

    // Check for board full
    if (winner != 1) {
        let total = 0;
        for (x in shgicField) {
            for (y in shgicField) {
                if (shgicField[y][x] != 0) total += 1;
            }
        }
        if (total == 9) winner = 2;
    }

    // Okay, who's the winner
    if (winner == 1) {
        shgicPointsPlayer += 1;
        statIncrease("tttpw", 1);
        createNotification("+1 point for you");
    }
    if (winner == 2) {
        shgicPointsEnemy += 1;
        statIncrease("tttpl", 1);
        createNotification("+1 point for shgabb");
    }

    if (shgicPointsPlayer > 2 && canPlayTTT) {
        turn = "none";

        game.ame += 2;
        statIncrease("ame", 2);
        statIncrease("tttw", 1);

        createNotification("You won!");
        createNotification("+2 Améliorer");

        if (isEvent("christmas")) {
            game.gifts += 10;
            statIncrease("gifts", 10);
            createNotification("+10 Gifts");
            renderCurrentEvent();
        }
        createNotification("Come back tomorrow!");

        game.tttd = game.day;
        completedTTT = true;
        canPlayTTT = false;

        autoSave(false);
        return false;
    }
    else if (shgicPointsEnemy > 2 && canPlayTTT) {
        turn = "none";

        game.tttd = game.day;
        completedTTT = true;
        canPlayTTT = false;

        statIncrease("tttl", 1);
        createNotification("shgabb won... no reward...");
        createNotification("Come back tomorrow!");
        autoSave(false);
        return false;
    }
    else if (winner != 0) {
        // board is full, but nobody won
        // clear board for the next round
        turn = "none";

        setTimeout(() => {
            shgicResetField();
            if (Math.random() > 0.6) {
                setTimeout("shgicEnemyMove()", Math.ceil(400 * Math.random()) + 100);
            }
            else turn = "player";
        }, 500);

        return false;
    }
    return true;
}

function shgicResetField() {
    shgicField =
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

    if (objects["i0.0"] != undefined) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                killAnimation("shgic" + j + "." + i);
                objects["i" + j + "." + i].image = "sssn";
            }
        }
    }
}

function shgicUpdateText(text) {
    if (objects["scoreText"] != undefined) objects["scoreText"].text = text;
}

scenes["shgic"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "rgb(40, 40, 40)");
        createSquare("bg2", 0, 0.1, 1, 0.8, "rgb(220, 220, 220)");

        createSquare("colorchangertop", 0, 0, 1, 0.025, "white");
        createSquare("colorchangerbottom", 0, 1 - 0.025, 1, 0.025, "white");

        createText("title", 0.08, 0.1, "Shgic Shgac Shgoe", { color: "white", size: 32, align: "left" });

        createButton("backButton", 0.025, 0, 0.1, 0.1, "cd2", () => {
            createAnimation("trans2b", "transition2", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu")', 300);
        }, { quadratic: true, centered: true });

        let ignoreW = 1 / wggj.canvas.w * wggj.canvas.h;
        createSquare("verticalA", 0.433, 0.25, 0.02 * ignoreW, 0.55, "black");
        createSquare("verticalB", 0.566, 0.25, 0.02 * ignoreW, 0.55, "black");

        createSquare("horizontalA", 0.3, 0.4, 0.4, 0.02, "black");
        createSquare("horizontalB", 0.3, 0.6, 0.4, 0.02, "black");

        createSquare("scoreBG", 0.35, 0.05, 0.3, 0.1, "white");
        createText("scoreText", 0.5, 0.125, "-", { size: 32 });

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                createButton("f" + j + "." + i, 0.3875 + 0.2 * i * ignoreW, 0.2675 + 0.2 * j, 0.125, 0.125, "empty", () => { shgicClickField(j, i) }, { quadratic: true, centered: true });
                createImage("i" + j + "." + i, 0.3875 + 0.2 * i * ignoreW, 0.2675 + 0.2 * j, 0.125, 0.125, "sssn", { quadratic: true, centered: true });
            }
        }

        createImage("gay", 0.3, 0.45, 0.1, 0.1, "sssx", { power: false, centered: true });
        createImage("gay2", 0.7, 0.45, 0.1, 0.1, "ssso", { power: false, centered: true });

        // black overlay fade transition
        createImage("transition2", 0, 0, 1, 1, "black");
        createAnimation("trans2", "transition2", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
    },
    (tick) => {
        // Loop
        if (objects["gay"].x == 0.48) {
            shgicUpdateText("Kiss! <3");
        }
        else if (canPlayTTT || completedTTT) {
            // can play / currently playing
            if (shgicPointsPlayer > 2) shgicUpdateText("You won!");
            else if (shgicPointsEnemy > 2) shgicUpdateText("shgabb won!");
            else shgicUpdateText(shgicPointsPlayer + ":" + shgicPointsEnemy);
        }
        else {
            // the kiss thing (finished playing)
            shgicUpdateText("Come back tomorrow!");
        }

        // hide/show
        if (objects["gay"].power == canPlayTTT) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    killAnimation("shgic" + j + "." + i);
                    objects["i" + j + "." + i].power = canPlayTTT;
                }
            }
            objects["verticalA"].power = objects["verticalB"].power = canPlayTTT;
            objects["horizontalA"].power = objects["horizontalB"].power = canPlayTTT;

            objects["gay"].power = objects["gay2"].power = !canPlayTTT;
            createAnimation("gaysex", "gay", (t, d, a) => { t.x = Math.min(0.48, 0.3 + a.dur / 25) }, 10, true);
            createAnimation("2gay2sex", "gay2", (t, d, a) => { t.x = Math.max(0.52, 0.7 - a.dur / 25) }, 10, true);
        }

        // other
        shicTimeSinceLastMove += tick;
        if (shicTimeSinceLastMove < 0.5) objects["colorchangertop"].color = "lightblue";
        else {
            let becomeWhite = Math.floor(((game.stats.playTime * 10) % 255) / 1.5);
            objects["colorchangertop"].color = "rgb(" + becomeWhite + ", " + becomeWhite + ", " + Math.max(160, Math.floor((game.stats.playTime * 5) % 255)) + ")";
        }
        objects["colorchangerbottom"].color = objects["colorchangertop"].color;
    }
);