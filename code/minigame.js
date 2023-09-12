// Game made by Schrottii - editing or stealing is prohibited!
// (both the minigame and the main game, lol)

const canvas = document.getElementById("minigame");
const ctx = canvas.getContext("2d");

let w = 256;
let h = 256;

let minigameField =
    [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];

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

function minigameRenderPos(x, y, drawX, drawY) {
    if (minigameField[y][x] == 1) minigameDrawX(drawX, drawY);
    if (minigameField[y][x] == 2) minigameDrawCircle(drawX, drawY);
}

function minigameDrawField() {
    let drawStartX = w / 3;
    let drawStartY = h / 3;
    let drawWidth = w / 32;

    ctx.fillStyle = "black";
    ctx.fillRect(drawStartX, drawStartY, drawWidth, h / 2);
    ctx.fillRect(drawStartX + (w / 5), drawStartY, drawWidth, h / 2);
    ctx.fillRect(drawStartX - (w / 8), drawStartY + (h / 8), w / 2, drawWidth);
    ctx.fillRect(drawStartX - (w / 8), drawStartY + (h / 3), w / 2, drawWidth);

    minigameRenderPos(0, 0, drawStartX - (w / 8), drawStartY);
    minigameRenderPos(1, 0, drawStartX + (w / 12), drawStartY);
    minigameRenderPos(2, 0, drawStartX + (w / 4), drawStartY);
    minigameRenderPos(0, 1, drawStartX - (w / 8), drawStartY + (h / 5));
    minigameRenderPos(1, 1, drawStartX + (w / 12), drawStartY + (h / 5));
    minigameRenderPos(2, 1, drawStartX + (w / 4), drawStartY + (h / 5));
    minigameRenderPos(0, 2, drawStartX - (w / 8), drawStartY + (h / 2.5));
    minigameRenderPos(1, 2, drawStartX + (w / 12), drawStartY + (h / 2.5));
    minigameRenderPos(2, 2, drawStartX + (w / 4), drawStartY + (h / 2.5));

    if (Math.random() > 0.95) {
        for (i in minigameField) {
            for (j in minigameField) {
                minigameField[i][j] = Math.floor(Math.random() * 3);
            }
        }
    }
}

function updateMinigameUI() {
    minigameDrawBackground();
    minigameDrawField();

    minigameUpdateText("Shgic Shgac Shgoe - 0:0");
}

minigameDrawBackground();