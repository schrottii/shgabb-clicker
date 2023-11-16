// Game made by Schrottii - editing or stealing is prohibited!
// (both the minigame and the main game, lol)

const canvas = document.getElementById("minigame");
const ctx = canvas.getContext("2d");

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

canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMouseMove);

function onCanvasClick() {
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

function onMouseMove(e) {
    mousex = e.clientX - canvas.getBoundingClientRect().left;
    mousey = e.clientY - canvas.getBoundingClientRect().top;
}

function updateMinigameTime() {
    let today = new Date();
    let newTime = parseInt(today.getYear() + "" + (today.getUTCMonth().toString().length == 1 ? "0" + today.getUTCMonth() : today.getUTCMonth()) + (today.getUTCDate().toString().length == 1 ? "0" + today.getUTCDate() : today.getUTCDate()));
    game.tttd = newTime;

    // update artifact offer
    let newDailyArtifact = 100;
    let dgoRar = 3;

    while (newDailyArtifact == 100 && dgoRar > 0) {
        for (a in artifacts) {
            if (artifacts[a].rarity == dgoRar && !getArtifactByID(artifacts[a].ID).isUnlocked() && Math.random() > (1 - (dgoRar / 5))) newDailyArtifact = artifacts[a].ID;
        }
        dgoRar -= 1;
    }

    game.dgo = newDailyArtifact;
}

function compareMinigameTime() {
    let today = new Date();
    let newTime = parseInt(today.getYear() + "" + (today.getUTCMonth().toString().length == 1 ? "0" + today.getUTCMonth() : today.getUTCMonth()) + (today.getUTCDate().toString().length == 1 ? "0" + today.getUTCDate() : today.getUTCDate()));
    return newTime > game.tttd; // returns true if it's a new day
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
        game.stats.tttpw += 1;
        createNotification("+1 point for you!");
    }
    if (winner == 2) {
        pointsHer += 1;
        game.stats.tttpl += 1;
        createNotification("+1 point for shgabb!");
    }

    if (pointsPlayer > 2 && canPlayTTT) {
        game.ame += 2;
        game.stats.ame += 2;
        game.stats.tttw += 1;
        createNotification("You won!");
        createNotification("+2 Améliorer!");
        createNotification("Come back tomorrow!");

        updateMinigameTime();
        canPlayTTT = false;
    }
    if (pointsHer > 2 && canPlayTTT) {
        updateMinigameTime();
        canPlayTTT = false;

        game.stats.tttl += 1;
        createNotification("Shgabb won... no reward...");
        createNotification("Come back tomorrow!");
    }

    if (winner != 0) {
        minigameField =
            [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
        if (Math.random() > 0.6) {
            minigameEnemyMove();
        }
        return false;
    }
    return true;
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
    minigameDrawBackground();
    minigameDrawField();

    minigameUpdateText("Shgic Shgac Shgoe - " + pointsPlayer + ":" + pointsHer);
}

minigameEnemyMove();
minigameDrawBackground();