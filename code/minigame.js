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

let minigameField =
    [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];

let hitboxes = [
    [drawStartX - (w / 8), drawStartY],
    [drawStartX + (w / 12), drawStartY],
    [drawStartX + (w / 4), drawStartY],
    [drawStartX - (w / 8), drawStartY + (h / 5)],
    [drawStartX + (w / 12), drawStartY + (h / 5)],
    [drawStartX + (w / 4), drawStartY + (h / 5)],
    [drawStartX - (w / 8), drawStartY + (h / 2.5)],
    [drawStartX + (w / 12), drawStartY + (h / 2.5)],
    [drawStartX + (w / 4), drawStartY + (h / 2.5)]
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

                let enemyMove = 0;
                while (enemyMove == 0) {
                    let randomPlaced = Math.floor(Math.random() * 9);
                    if (minigameField[Math.floor(randomPlaced / 3)][randomPlaced % 3] == 0) {
                        minigameField[Math.floor(randomPlaced / 3)][randomPlaced % 3] = 2;
                        enemyMove = 1;
                    }
                }

                minigameCheckForWinners();
            }
        }
    }
}

function onMouseMove(e) {
    mousex = e.clientX - canvas.offsetLeft;
    mousey = e.clientY - canvas.offsetTop;
}

function minigameCheckForWinners() {
    let winner = 0;

    let total = 0;
    for (x in minigameField) {
        for (y in minigameField) {
            if (minigameField[y][x] != 0) total += 1;
        }
    }
    if (total == 9) winner = 2;
    else {
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
    }

    if (winner == 1) alert("You won!");
    if (winner == 2) alert("She won!");
    if (winner != 0) {
        minigameField =
            [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
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
    ctx.font = "12px";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(text, w / 2, h / 24 + h / 64 + (h / 32), w - (w / 64 + (w / 6) * 2));
}

function minigameDrawCircle(x, y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x + (w / 16), y + (w / 16), w / 16, 0, 2 * Math.PI);
    ctx.stroke();
}

function minigameDrawX(x, y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (w / 16), y + (h / 16));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + (w / 16), y);
    ctx.lineTo(x, y + (h / 16));
    ctx.stroke();
}

function minigameRenderPos(x, y, X, Y) {
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

    minigameUpdateText("Shgic Shgac Shgoe - 0:0");
}

minigameDrawBackground();