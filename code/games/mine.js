// Game made by Schrottii - editing or stealing is prohibited!
// (both the minigame and the main game, lol)

function unlockedMine() {
    return game.stats.hms >= 12000;
}

var tiles = [];
var minePosition = [7, 4];
var direction = "";
var walkTimer = 0;

function randomTile(x = minePosition[0], y = minePosition[1]) {
    if (x > 0 && x < 14 && y > -3 && y < 11) return Math.random() > 0.1 ? "floor" : "wall";
    if (Math.random() > 0.999) return "wwall";
    if (getSurroundingTiles(x, y).includes("wwall") && Math.random() > 0.25) return "wwall";
    if (getSurroundingTiles(x, y).includes("wall") && Math.random() > 0.1) return "wall";

    if (Math.random() > 0.999) return "floorgs";
    if (Math.random() > 0.998) return "floorsi";
    if (Math.random() > 0.995) return "floorcop";
    if (Math.random() > 0.999) return "flooriron";

    if (Math.random() > 0.995) return "floorweb";

    return Math.random() > 0.15 ? "floor" : "wall";
}

function getSurroundingTiles(x, y) {
    let suti = [];
    suti.push(tiles[x][y - 1]);
    suti.push(tiles[x][y + 1]);
    suti.push(tiles[x - 1][y]);
    suti.push(tiles[x + 1][y]);

    return suti;
}

const mineDir = {
    floorgs: ["Golden Shgabb", 40,
        () => { return game.stats_prestige.gs.div(10); },
        (amount) => { game.gs = game.gs.add(amount); statIncrease("gs", amount); statIncrease("mineGS", 1); }],

    floorsi: ["Silicone", 20,
        () => { return getSiliconeProduction(true).mul(40) },
        (amount) => { game.si = game.si.add(amount); statIncrease("si", amount); statIncrease("mineSI", 1); }],

    floorcop: ["Copper", 10,
        () => { return calcCopper().mul(64); },
        (amount) => { game.cop = game.cop.add(amount); statIncrease("cop", amount); statIncrease("mineCOP", 1); }],

    flooriron: ["Iron", 100,
        () => { return 1; },
        (amount) => { game.iron += amount; statIncrease("iron", amount); statIncrease("mineIRON", 1); }],
};

var mineProgress = 0;
var currentlyMining = false;
var movs = [0, 0, 0];

function gatherMineProgress() {
    if (unlockedMine() && currentlyMining) {
        mineProgress++;
        statIncrease("mineProgress", 1);
    }
}

scenes["mine"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "rgb(40, 40, 40)");

        // the children yearn for the mines
        for (let tx = -1; tx < 17; tx++) {
            tiles[tx] = [];
            for (let ty = -1; ty < 9; ty++) {
                tiles[tx][ty] = randomTile();
                createButton("tile" + tx + "." + ty, 1 / 16 * tx, 1 / 8 * ty, 1 / 16, 1 / 8, "floor", () => {

                });
            }
        }
        tiles[7][4] = "floor";

        createButton("shgabbPlayer", 1 / 16 * 7, 1 / 8 * 4, 1 / 16, 1 / 8, "shgabb", () => {

        });
        objects["shgabbPlayer"].onHover = () => { direction = "" }

        createButton("up", 1 / 16 * 7, 1 / 8 * 3, 1 / 16, 1 / 8, "up", () => {
            direction = "up";
        });

        createButton("down", 1 / 16 * 7, 1 / 8 * 5, 1 / 16, 1 / 8, "down", () => {
            direction = "down";
        });

        createButton("left", 1 / 16 * 6, 1 / 8 * 4, 1 / 16, 1 / 8, "left", () => {
            direction = "left";
        });

        createButton("right", 1 / 16 * 8, 1 / 8 * 4, 1 / 16, 1 / 8, "right", () => {
            direction = "right";
        });


        createSquare("colorchangertop", 0, 0, 1, 0.025, "black");
        createSquare("colorchangerbottom", 0, 1 - 0.025, 1, 0.025, "black");

        createText("title", 0.08, 0.1, "The Mine", { color: "white", size: 32, align: "left" });

        createButton("backButton", 0.025, 0, 0.1, 0.1, "cd2", () => {
            ui.ironSection.style.display = "none";
            createAnimation("trans4b", "transition4", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu")', 300);
        }, { quadratic: true, centered: true });

        // mining
        createButton("mineButton", 0.7, 0.8, 0.25, 0.1, "button", (o) => {
            let clicked = clickButton();

            if (clicked) {
                createAnimation("mineClick", o, (t, d, a) => { t.h = 0.1 * a.dur / a.maxDur; t.y = 0.85 - t.h / 2 }, 0.33);
            }
            else {
                // click unsuccessful
                objects[o].image = "rough2";
                setTimeout(() => objects[o].image = "button", 333);
            }
        }, { power: false });
        createText("mineButtonText", 0.7 + 0.25 / 2, 0.835, "Mine", { size: 40, power: false })
        createText("mineButtonText2", 0.7 + 0.25 / 2, 0.885, "Mine", { size: 40, power: false })

        for (let i = 0; i < 10; i++) {
            createImage("collecteda" + i, 0.05 + 0.1 * i, 1, 0.1, 0.1, "wall", { quadratic: true, centered: true, alpha: 0 });
        }




        // black overlay fade transition
        createImage("transition4", 0, 0, 1, 1, "black");
        createAnimation("trans4", "transition4", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
        ui.ironSection.style.display = "";
    },
    (tick) => {
        // Loop
        walkTimer -= tick;

        if (movs[2] > 0) {
            if (movs[0] > 0) movs[0] = Math.max(movs[0] - tick / movs[2], 0);
            if (movs[0] < 0) movs[0] = Math.min(movs[0] + tick / movs[2], 0);
            if (movs[1] > 0) movs[1] = Math.max(movs[1] - tick / movs[2], 0);
            if (movs[1] < 0) movs[1] = Math.min(movs[1] + tick / movs[2], 0);
            movs[2] = Math.max(movs[2] - tick, 0);
            if (movs[2] <= 0) movs = [0, 0, 0];
        }
        if (movs[2] <= 0) movs = [0, 0, 0];

        objects["up"].power = !tiles[minePosition[0]][minePosition[1] - 1].includes("wall");
        objects["down"].power = !tiles[minePosition[0]][minePosition[1] + 1].includes("wall");
        objects["left"].power = !tiles[minePosition[0] - 1][minePosition[1]].includes("wall");
        objects["right"].power = !tiles[minePosition[0] + 1][minePosition[1]].includes("wall");

        objects["up"].alpha = direction == "up" ? 1 : 0.5;
        objects["down"].alpha = direction == "down" ? 1 : 0.5;
        objects["left"].alpha = direction == "left" ? 1 : 0.5;
        objects["right"].alpha = direction == "right" ? 1 : 0.5;

        let moved = false;
        if (direction == "up" && walkTimer < 0 && objects["up"].power) { walkTimer = 0.4; minePosition[1] -= 1; statIncrease("mineTiles", 1); moved = true; };
        if (direction == "down" && walkTimer < 0 && objects["down"].power) { walkTimer = 0.4; minePosition[1] += 1; statIncrease("mineTiles", 1); moved = true; };
        if (direction == "left" && walkTimer < 0 && objects["left"].power) { walkTimer = 0.4; minePosition[0] -= 1; statIncrease("mineTiles", 1); moved = true; };
        if (direction == "right" && walkTimer < 0 && objects["right"].power) { walkTimer = 0.4; minePosition[0] += 1; statIncrease("mineTiles", 1); moved = true; };

        if (mineDir[tiles[minePosition[0]][minePosition[1]]] != undefined) {
            currentlyMining = true;
            objects["mineButtonText"].text = "Mine " + mineDir[tiles[minePosition[0]][minePosition[1]]][0];
            objects["mineButtonText2"].text = Math.min(mineProgress, mineDir[tiles[minePosition[0]][minePosition[1]]][1]) + "/" + mineDir[tiles[minePosition[0]][minePosition[1]]][1];

            objects["mineButton"].power = true;
            objects["mineButtonText"].power = true;
            objects["mineButtonText2"].power = true;

            if (mineProgress >= mineDir[tiles[minePosition[0]][minePosition[1]]][1]) {
                // mining is done
                let amount = mineDir[tiles[minePosition[0]][minePosition[1]]][2]();
                createNotification("Mined AMOUNT TILE", [["AMOUNT", fn(amount)], ["TILE", mineDir[tiles[minePosition[0]][minePosition[1]]][0]]]);
                mineDir[tiles[minePosition[0]][minePosition[1]]][3](amount);

                for (let i = 0; i < 10; i++) {
                    objects["collecteda" + i].image = tiles[minePosition[0]][minePosition[1]];
                    objects["collecteda" + i].y = 1;
                    objects["collecteda" + i].alpha = 1;
                    createAnimation("collectedone" + i, "collecteda" + i, (t, d) => { t.y -= d / 4; t.alpha -= d / 2; }, 2000);
                }

                tiles[minePosition[0]][minePosition[1]] = "floor";
            }
        }
        else {
            objects["mineButton"].power = false;
            objects["mineButtonText"].power = false;
            objects["mineButtonText2"].power = false;
            mineProgress = 0;
            currentlyMining = false;

            if (moved && tiles[minePosition[0]][minePosition[1]] == "floorweb") walkTimer = 2;
        }

        // smooth animation yahoo
        if (direction != "" && moved) {
            if (movs[2] == 0) {
                if (direction == "up") movs = [0, -1, walkTimer];
                if (direction == "down") movs = [0, 1, walkTimer];
                if (direction == "left") movs = [-1, 0, walkTimer];
                if (direction == "right") movs = [1, 0, walkTimer];
            }
        }

        for (let tx = -8 + minePosition[0]; tx < -7 + minePosition[0] + 17; tx++) {
            if (tiles[tx] == undefined) tiles[tx] = [];
            for (let ty = -5 + minePosition[1]; ty < -4 + minePosition[1] + 9; ty++) {
                if (tiles[tx][ty] == undefined) tiles[tx][ty] = randomTile();
                if (tiles[tx][ty + 1] != undefined && tiles[tx][ty + 1] != "wall" && tiles[tx][ty + 1] != "transwall" && tiles[tx][ty] == "wall") tiles[tx][ty] = "transwall";
                objects["tile" + (tx - minePosition[0] + 7) + "." + (ty - minePosition[1] + 4)].image = tiles[tx][ty];

                objects["tile" + (tx - minePosition[0] + 7) + "." + (ty - minePosition[1] + 4)].x = (1 / 16 * ((tx - minePosition[0] + 7) + movs[0]));
                objects["tile" + (tx - minePosition[0] + 7) + "." + (ty - minePosition[1] + 4)].y = (1 / 8 * ((ty - minePosition[1] + 4) + movs[1]));
            }
        }
    }
);