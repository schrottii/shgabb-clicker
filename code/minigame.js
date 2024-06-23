// Game made by Schrottii - editing or stealing is prohibited!
// (both the minigame and the main game, lol)

const gameCanvas = document.getElementById("minigame");
const ctx = gameCanvas.getContext("2d");

let w = 256;
let h = 256;

let mousex = 0;
let mousey = 0;

let drawStartX = w / 3;
let drawStartY = h / 3;

let pointsPlayer = 0;
let pointsHer = 0;

var canPlayTTT = false;

let minigameField =
    [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];

let hitboxes = [
    [drawStartX - (w / 8), drawStartY],
    [drawStartX + (w / 12), drawStartY],
    [drawStartX + (w / 3.6), drawStartY],
    [drawStartX - (w / 8), drawStartY + (h / 5)],
    [drawStartX + (w / 12), drawStartY + (h / 5)],
    [drawStartX + (w / 3.6), drawStartY + (h / 5)],
    [drawStartX - (w / 8), drawStartY + (h / 2.5)],
    [drawStartX + (w / 12), drawStartY + (h / 2.5)],
    [drawStartX + (w / 3.6), drawStartY + (h / 2.5)]
]

gameCanvas.addEventListener("click", ongameCanvasClick);
gameCanvas.addEventListener("mousemove", onMouseMove);

function ongameCanvasClick() {
    if (canPlayTTT) {
        for (l in hitboxes) {
            if (mousex >= hitboxes[l][0] && mousex <= hitboxes[l][0] + (w / 8)
                && mousey >= hitboxes[l][1] && mousey <= hitboxes[l][1] + (h / 8)
                && minigameField[Math.floor(l / 3)][l % 3] == 0) {
                minigameField[Math.floor(l / 3)][l % 3] = 1;

                if (minigameCheckForWinners()) {
                    minigameEnemyMove();
                }
            }
        }
    }
}

function onMouseMove(e) {
    mousex = e.clientX - gameCanvas.getBoundingClientRect().left;
    mousey = e.clientY - gameCanvas.getBoundingClientRect().top;
}

// TIME RELATED FUNCTIONS

function today() {
    // returns today's date
    // 20240615

    let today = new Date();
    return (1900 + today.getYear()) + "" + (today.getUTCMonth().toString().length == 1 ? "0" + (today.getUTCMonth() + 1) : (today.getUTCMonth() + 1)) + (today.getUTCDate().toString().length == 1 ? "0" + today.getUTCDate() : today.getUTCDate());
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

    if (isNewDay()) {
        // IMPORTANT: update time
        game.day = parseInt(today());

        // new shgic? NEW SHGIC? SHGIC REMINDER
        if (game.day > game.tttd) {
            pointsPlayer = 0;
            pointsHer = 0;
            canPlayTTT = true;
            updateMinigameUI();
        }

        // update artifact offer
        let newDailyArtifact = 100;
        let dgoRar = 3;

        while (newDailyArtifact == 100 && dgoRar > 0) {
            for (a in artifacts) {
                if (artifacts[a].rarity == dgoRar && !getArtifactByID(artifacts[a].ID).isUnlocked() && game.stats.hms >= artifacts[a].getHMSNeeded() && Math.random() > (1 - (dgoRar / 5))) newDailyArtifact = artifacts[a].ID;
            }
            dgoRar -= 1;
        }
        game.dgo = newDailyArtifact;
        updateGems();

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

function minigameEnemyMove() {
    let enemyMove = 0;
    for (y in minigameField) {
        if (minigameField[y][0] == 2 && minigameField[y][1] == 2 && minigameField[y][2] == 0) {
            minigameField[y][2] = 2;
            enemyMove = 1;
            break;
        }
        if (minigameField[y][0] == 2 && minigameField[y][1] == 0 && minigameField[y][2] == 2) {
            minigameField[y][1] = 2;
            enemyMove = 1;
            break;
        }
        if (minigameField[y][0] == 0 && minigameField[y][1] == 2 && minigameField[y][2] == 2) {
            minigameField[y][0] = 2;
            enemyMove = 1;
            break;
        }

        if (minigameField[0][y] == 2 && minigameField[1][y] == 2 && minigameField[2][y] == 0) {
            minigameField[2][y] = 2;
            enemyMove = 1;
            break;
        }
        if (minigameField[0][y] == 2 && minigameField[1][y] == 0 && minigameField[2][y] == 2) {
            minigameField[1][y] = 2;
            enemyMove = 1;
            break;
        }
        if (minigameField[0][y] == 0 && minigameField[1][y] == 2 && minigameField[2][y] == 2) {
            minigameField[0][y] = 2;
            enemyMove = 1;
            break;
        }
    }

    while (enemyMove == 0) {
        let randomPlaced = Math.floor(Math.random() * 9);
        if (minigameField[Math.floor(randomPlaced / 3)][randomPlaced % 3] == 0) {
            minigameField[Math.floor(randomPlaced / 3)][randomPlaced % 3] = 2;
            enemyMove = 1;
        }
    }

    minigameCheckForWinners();
}

function minigameCheckForWinners() {
    let winner = 0;

    // Check for 3 in a row
    for (y in minigameField) {
        if (minigameField[y][0] == minigameField[y][1] && minigameField[y][0] == minigameField[y][2] && minigameField[y][0] != 0) {
            winner = minigameField[y][0];
        }
        if (minigameField[0][y] == minigameField[1][y] && minigameField[0][y] == minigameField[2][y] && minigameField[0][y] != 0) {
            winner = minigameField[0][y];
        }
    }
    if (minigameField[0][0] == minigameField[1][1] && minigameField[1][1] == minigameField[2][2] && minigameField[0][0] != 0) {
        winner = minigameField[0][0];
    }
    if (minigameField[2][0] == minigameField[1][1] && minigameField[1][1] == minigameField[0][2] && minigameField[2][0] != 0) {
        winner = minigameField[2][0];
    }

    if (minigameField[0][0] == 0 && minigameField[0][1] != 0 && minigameField[0][2] == 0
        && minigameField[1][0] == 0 && minigameField[1][1] != 0 && minigameField[1][2] == 0
        && minigameField[2][0] != 0 && minigameField[2][1] != 0 && minigameField[2][2] != 0) {
        if (!game.ach.includes(100)) game.ach.push(100);
    }

    // Check for board full
    if (winner != 1) {
        let total = 0;
        for (x in minigameField) {
            for (y in minigameField) {
                if (minigameField[y][x] != 0) total += 1;
            }
        }
        if (total == 9) winner = 2;
    }

    // Okay, who's the winner
    if (winner == 1) {
        pointsPlayer += 1;
        statIncrease("tttpw", 1);
        createNotification("+1 point for you!");
    }
    if (winner == 2) {
        pointsHer += 1;
        statIncrease("tttpl", 1);
        createNotification("+1 point for shgabb!");
    }

    if (pointsPlayer > 2 && canPlayTTT) {
        game.ame += 2;
        statIncrease("ame", 2);
        statIncrease("tttw", 1);

        createNotification("You won!");
        createNotification("+2 Améliorer!");

        if (isEvent("christmas")) {
            game.gifts += 10;
            statIncrease("gifts", 10);
            createNotification("+10 Gifts!");
        }
        createNotification("Come back tomorrow!");

        game.tttd = game.day;
        canPlayTTT = false;
        return false;
    }
    else if (pointsHer > 2 && canPlayTTT) {
        game.tttd = game.day;
        canPlayTTT = false;

        statIncrease("tttl", 1);
        createNotification("shgabb won... no reward...");
        createNotification("Come back tomorrow!");
        return false;
    }
    else if (winner != 0) {
        resetMinigameField();
        if (Math.random() > 0.6) {
            minigameEnemyMove();
        }
        return false;
    }
    return true;
}

function resetMinigameField() {
    minigameField =
        [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
}

function minigameClear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
}

function minigameDrawBackground() {
    minigameClear();
    ctx.lineWidth = 1;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(w / 64, h / 64, w - (w / 32), h - (h / 32));
    ctx.fillStyle = "black";
    ctx.fillRect(w / 64 + (w / 64), h / 64 + (h / 64), w - (w / 16), h - (h / 16));
    ctx.fillStyle = "white";
    ctx.fillRect(w / 64 + (w / 32), h / 64 + (h / 8), w - (w / 8) + (w / 32), h - (h / 8) - (h / 16));

    ctx.fillStyle = "white";
    ctx.fillRect(w / 64 + (w / 8), h / 64 + (h / 32), w - (w / 64 + (w / 8) * 2), h / 16);
}

function minigameUpdateText(text) {
    ctx.font = "16px Times New Roman";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(text, w / 2, h / 24 + h / 64 + (h / 24), w - (w / 64 + (w / 6) * 2));
}

function minigameDrawCircle(x, y) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.arc(x + (w / 12) - 4 * Math.PI, y + (w / 12) - 2 * Math.PI, w / 16, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 1;
}

function minigameDrawX(x, y) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (w / 12), y + (h / 12));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + (w / 12), y);
    ctx.lineTo(x, y + (h / 12));
    ctx.stroke();

    ctx.lineWidth = 1;
}

function minigameDrawHitbox(x, y) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (w / 12), y + (h / 12));
    ctx.stroke();
}

function minigameRenderPos(x, y, X, Y) {
    //if (minigameField[y][x] == 0) minigameDrawHitbox(X, Y);
    if (minigameField[y][x] == 1) minigameDrawX(X, Y);
    if (minigameField[y][x] == 2) minigameDrawCircle(X, Y);
}

function minigameDrawField() {
    let drawWidth = w / 32;

    ctx.fillStyle = "black";
    ctx.fillRect(drawStartX, drawStartY, drawWidth, h / 2);
    ctx.fillRect(drawStartX + (w / 5), drawStartY, drawWidth, h / 2);
    ctx.fillRect(drawStartX - (w / 8), drawStartY + (h / 8), w / 2, drawWidth);
    ctx.fillRect(drawStartX - (w / 8), drawStartY + (h / 3), w / 2, drawWidth);

    for (l in hitboxes) {
        minigameRenderPos(l % 3, Math.floor(l / 3), hitboxes[l][0], hitboxes[l][1]);
    }
}

function updateMinigameUI() {
    if (canPlayTTT || pointsHer > 0 || pointsPlayer > 0) {
        minigameDrawBackground();
        minigameDrawField();

        if (pointsPlayer > 2) minigameUpdateText("You won!");
        else if (pointsHer > 2) minigameUpdateText("shgabb won!");
        else minigameUpdateText("Shgic Shgac Shgoe - " + pointsPlayer + ":" + pointsHer);
    }
    else {
        minigameDrawBackground();
        minigameDrawCircle(70 + (autoNotifications % 50), 128);
        minigameDrawX(255 - (70 + (autoNotifications % 50)), 132);
        minigameUpdateText(autoNotifications % 50 == 49 ? "Kiss! <3" : "Come back tomorrow!");
    }
}

minigameEnemyMove();
minigameDrawBackground();