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
};

var mineProgress = 0;
var currentlyMining = false;

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
        createSquare("bg2", 0, 0.1, 1, 0.8, "rgb(220, 220, 220)");

        // the children yearn for the mines
        for (let tx = 0; tx < 16; tx++) {
            tiles.push([]);
            for (let ty = 0; ty < 8; ty++) {
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
            createAnimation("trans", "transition", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu")', 300);
        }, { quadratic: true, centered: true });

        // mining
        createButton("mineButton", 0.7, 0.8, 0.25, 0.1, "button", () => {

        }, { power: false });
        createText("mineButtonText", 0.7 + 0.25 / 2, 0.835, "Mine", { size: 40, power: false })
        createText("mineButtonText2", 0.7 + 0.25 / 2, 0.885, "Mine", { size: 40, power: false })






        // black overlay fade transition
        createImage("transition", 0, 0, 1, 1, "black");
        createAnimation("trans", "transition", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
    },
    (tick) => {
        // Loop
        walkTimer -= tick;

        for (let tx = -7 + minePosition[0]; tx < -7 + minePosition[0] + 16; tx++) {
            if (tiles[tx] == undefined) tiles[tx] = [];
            for (let ty = -4 + minePosition[1]; ty < -4 + minePosition[1] + 8; ty++) {
                if (tiles[tx][ty] == undefined) tiles[tx][ty] = randomTile();
                if (tiles[tx][ty + 1] != undefined && tiles[tx][ty + 1] != "wall" && tiles[tx][ty + 1] != "transwall" && tiles[tx][ty] == "wall") tiles[tx][ty] = "transwall";
                objects["tile" + (tx - minePosition[0] +7) + "." + (ty - minePosition[1] +4)].image = tiles[tx][ty];
            }
        }

        objects["up"].power = !tiles[minePosition[0]][minePosition[1] - 1].includes("wall");
        objects["down"].power = !tiles[minePosition[0]][minePosition[1] + 1].includes("wall");
        objects["left"].power = !tiles[minePosition[0] - 1][minePosition[1]].includes("wall");
        objects["right"].power = !tiles[minePosition[0] + 1][minePosition[1]].includes("wall");

        objects["up"].alpha = direction == "up" ? 1 : 0.5;
        objects["down"].alpha = direction == "down" ? 1 : 0.5;
        objects["left"].alpha = direction == "left" ? 1 : 0.5;
        objects["right"].alpha = direction == "right" ? 1 : 0.5;

        let moved = false;
        if (direction == "up"    && walkTimer < 0 && objects["up"].power)    { walkTimer = 0.4; minePosition[1] -= 1; statIncrease("mineTiles", 1); moved = true; };
        if (direction == "down"  && walkTimer < 0 && objects["down"].power)  { walkTimer = 0.4; minePosition[1] += 1; statIncrease("mineTiles", 1); moved = true; };
        if (direction == "left"  && walkTimer < 0 && objects["left"].power)  { walkTimer = 0.4; minePosition[0] -= 1; statIncrease("mineTiles", 1); moved = true; };
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
                createNotification("Mined " + fn(amount) + " " + mineDir[tiles[minePosition[0]][minePosition[1]]][0]);
                mineDir[tiles[minePosition[0]][minePosition[1]]][3](amount);

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
    }
);