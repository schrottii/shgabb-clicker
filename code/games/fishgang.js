// Game made by Schrottii - editing or stealing is prohibited!

const fishingLevelUpFormula = (level) => Math.ceil(Math.pow(400, 1 + 0.002 * (level - 1)) * level);

// name, value factor, weight factor
const fishDictionary = [
    ["Pike", 8, 5],
    ["Batfish", 1, 1],
    ["Cod", 1, 1],
    ["Buffalo", 2, 8],
    ["Catfish", 2, 3],
    ["Carp", 3, 3],
    ["Oscar", 5, 2],
    ["Skate", 5, 3],
    ["Butterfish", 1, 2],
    ["Koi", 9, 3],
    ["Baby Shark", 1, 1],
    ["Tuna", 1, 1],
    ["Salmon", 1, 4],
    ["Anchovy", 1, 1],
    ["Piranha", 2, 2],
    ["Zander", 1, 3],
    ["Swordfish", 4, 6],
    ["Leaoodandingzumn", 10, 10],
    ["Stupid Tuna", 1, 1],
];

const trashDictionary = [
    "Cigarette",
    "Plastic Bottle",
    "Plastic Straw",
    "Plastic Net",
    "Plastic Bag",
    "Your Mom",
    "Old Boot",
    "Tin Can",
    "Wood",
    "Pirate Piss",
    "Wet Dirt",
];

function unlockedFishing() {
    return game.stats.hms >= 12000;
}

function updateFishingLevel() {
    while (game.fishlvl > 0 && game.fishxp < fishingLevelUpFormula(game.fishlvl - 1)) {
        // You shouldn't be this high! Lol!
        game.fishlvl -= 1;
    }

    while (game.fishxp >= fishingLevelUpFormula(game.fishlvl + 1)) {
        // Level up! Yay!
        game.fishlvl += 1;
        createNotification("Fish level up! New level: " + game.fishlvl);
    }
}

scenes["fishgang"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "rgb(40, 40, 40)");
        // createSquare("bg2", 0, 0.1, 1, 0.8, "rgb(220, 220, 220)");
        createImage("bg3", 0, 0.1, 1, 0.8, "water");

        createImage("wavestop", 0, 0, 1, 0.025, "waves");
        createImage("wavesbottom", 0, 1 - 0.025, 1, 0.025, "waves");
        objects["wavestop"].time = 0;

        createText("title", 0.08, 0.1, "Fishgang", "white", 32, "left");

        createButton("backButton", 0.025, 0, 0.1, 0.1, "cd2", () => {
            loadScene("minigameSelection");
        }, true);

        // player info
        createImage("fishlvl1", 0.3, 0, 0.1, 0.1, "fishlvl", true);
        createText("fishlvl2", 0.3, 0.0725, "?", "darkblue", 20, "center");
        createImage("fishlvl5", 0.3125, 0, 0.175, 0.1, "fishlvl");
        createSquare("fishlvl3", 0.325, 0.02, 0.15, 0.06, "black");
        createSquare("fishlvl4", 0.3275, 0.02, 0.145, 0.06, "blue");

        createText("trashamount", 0.6, 0.075, "Trash: 0", "white", 16, "left");
        createText("fishamount", 0.7, 0.075, "Fish: 0", "white", 16, "left");
        createText("value", 0.8, 0.075, "(Value: 0)", "white", 16, "left");

        createText("infotext", 0.03, 0.95, "", "white", 24, "left");
        // You caught a rare Leaoodandingzumn (Weight: 50kg, Value: 80M)



        createSquare("sliderbg", 0.35, 0.8, 0.3, 0.05, "black");
        createSquare("slider", 0.35, 0.8, 0.01, 0.05, "orange");
        objects["slider"].sliderSize = 10; // 0.000001 or so - 100
        objects["slider"].sliderMove = 0; // 0 - 100
        objects["slider"].sliderDirection = 0; // 0 or 1
        objects["slider"].sliderSpeed = 1; // multi, 1 is default, more is faster

        createSquare("sliderMiddle", 0.495, 0.8, 0.01, 0.05, "white");
        createSquare("sliderMiddle2", 0.495, 0.8, 0.001, 0.05, "red");
        createSquare("sliderMiddle3", 0.505 - 0.001, 0.8, 0.001, 0.05, "red");

        createImage("bobby", 0.5, 0.75, 0.05, 0.05, "bobby", true);
        objects["bobby"].mode = 0; // 0 is throw it out, 1 is wait, 2 is reel it in, 3 is cooldown
        objects["bobby"].distance = 0; // 0 - 100
        objects["bobby"].cooldown = 3; // 0 - 3 (in seconds)
        objects["bobby"].quality = 0; // 1 - 10
        objects["bobby"].chance = 0; // 0 - 100
        objects["bobby"].reelCD = 0;

        createButton("slideButton", 0.4, 0.85, 0.2, 0.05, "button", () => {
            if (objects["bobby"].mode == 0) {
                objects["bobby"].distance = Math.max(10, objects["slider"].sliderMove);
                objects["bobby"].mode = 1;
            }
            if (objects["bobby"].mode == 2) {
                // reel it in
                if (objects["bobby"].reelCD <= 0) {
                    if (objects["slider"].x + objects["slider"].w >= objects["sliderMiddle"].x && objects["slider"].x < objects["sliderMiddle"].x + objects["sliderMiddle"].w) {
                        // Hit
                        objects["bobby"].chance += 5 + objects["bobby"].quality; // +6% - +15%
                        objects["bobby"].reelCD = 0.1;
                        objects["sliderbg"].color = "rgb(0, 30, 0)";
                    }
                    else {
                        // Miss
                        objects["bobby"].chance -= 5;
                        objects["bobby"].reelCD = 0.2;
                        objects["sliderbg"].color = "rgb(160, 0, 0)";

                        if (Math.random() * 80 >= (objects["bobby"].chance + 20)) {
                            objects["bobby"].mode = 3;

                            objects["bobby"].distance = 0;
                            objects["bobby"].cooldown = 3;
                        }
                    }
                }
            }
        })
        createText("slideButtonText", 0.5, 0.9, "", "black", 24, "center");

        createText("catchQuality", 0.7, 0.8, "", "black", 24, "left");
        createText("catchChance", 0.7, 0.9, "", "black", 24, "left");
    },
    (tick) => {
        // Loop

        // Blue animations
        objects["wavestop"].time += tick;
        if (objects["wavestop"].time >= 1) {
            objects["wavestop"].time = 0;
            objects["wavestop"].image = objects["wavesbottom"].image = (objects["wavestop"].image == "waves" ? "waves2" : "waves");
            objects["bg3"].image = (objects["wavestop"].image == "waves" ? "water2" : "water");
        }

        // Value / info
        objects["fishlvl2"].text = game.fishlvl;
        objects["fishlvl4"].w = Math.min(0.145, 0.145 * (game.fishxp / fishingLevelUpFormula(game.fishlvl + 1)));

        objects["trashamount"].text = "Trash: " + game.trash;
        objects["fishamount"].text = "Fish: " + game.fish;
        objects["value"].text = "(Value: " + fn(game.fishvalue) + ")";

        // Slider
        if (objects["slider"].sliderDirection == 0) {
            if (objects["slider"].sliderMove >= 100) objects["slider"].sliderDirection = 1;
            else objects["slider"].sliderMove += objects["slider"].sliderSpeed;
        }
        else if (objects["slider"].sliderDirection == 1) {
            if (objects["slider"].sliderMove <= 0) objects["slider"].sliderDirection = 0;
            else objects["slider"].sliderMove -= objects["slider"].sliderSpeed;
        }

        if (objects["bobby"].mode == 0 || objects["bobby"].mode == 2) {
            objects["slider"].w = Math.min(0.3, 0.3 * (objects["slider"].sliderSize / 100));
            objects["slider"].x = 0.35 + Math.min(0.3 - objects["slider"].w, (0.3 - objects["slider"].w) * (objects["slider"].sliderMove / 100));
            if (objects["bobby"].mode == 0) objects["slideButtonText"].text = "Throw";
        }
        else if (objects["bobby"].mode == 3) {
            objects["slider"].w = 0.1 * objects["bobby"].cooldown;
            objects["slider"].x = 0.35;
            objects["slideButtonText"].text = "Cooldown";
        }
        else {
            objects["slider"].w = 0;
            objects["slider"].x = 0.35;
            objects["slideButtonText"].text = "";
        }

        if (objects["bobby"].mode == 2) {
            objects["slideButtonText"].text = "Reel";

            // objects["catchQuality"].text = "Quality: " + objects["bobby"].quality + "/10";
            objects["catchChance"].text = "Chance: " + Math.floor(objects["bobby"].chance) + "%";
        }
        else {
            objects["catchQuality"].text = "";
            objects["catchChance"].text = "";
        }

        // Animate Bobby
        objects["bobby"].x = 0.5 + 0.003 * Math.random();
        objects["bobby"].y = 0.75 - 0.5 * (objects["bobby"].distance / 100) + 0.003 * Math.random();

        // Bobby waiting for fish
        if (objects["bobby"].mode == 1) {
            if (Math.random() > 0.99) {
                objects["bobby"].mode = 2;

                objects["slider"].sliderSize = Math.max(2, (objects["bobby"].distance >= 50 ? 20 : 40) * Math.random());
                objects["slider"].sliderSpeed = Math.round(Math.max((objects["bobby"].distance >= 75 ? 2 : 1), 4 * Math.random()));
                objects["bobby"].quality = Math.min(10, Math.ceil(10 * objects["slider"].sliderSpeed / objects["slider"].sliderSize)); // 1 - 20 (capped at 10)
                if (objects["bobby"].distance < 25) objects["bobby"].quality = Math.min(3, objects["bobby"].quality);
                objects["bobby"].chance = 30 - (objects["bobby"].distance / 2);
            }
        }

        // Bobby reel it in
        if (objects["bobby"].mode == 2) {
            objects["bobby"].distance -= 0.1; // come closer baby
            objects["bobby"].chance -= objects["slider"].sliderSpeed / 60; // keep reducing the chance to make it exciting

            if (objects["bobby"].reelCD > 0) objects["bobby"].reelCD -= 1 / 60; // reduce cd that comes from hitting/missing
            else {
                objects["bobby"].reelCD = 0;
                objects["sliderbg"].color = "black";
            }

            if (objects["bobby"].distance < -5) {
                objects["bobby"].mode = 3;

                objects["bobby"].distance = 0;
                objects["bobby"].cooldown = 3;
                objects["sliderbg"].color = "black";

                // Get fish
                if (objects["bobby"].chance >= 300) {
                    if (!game.ach.includes(174)) game.ach.push(174);
                }

                if (Math.random() * 100 < objects["bobby"].chance) {
                    if (Math.random() >= 0.75) {
                        // got a fish

                        let caughtFish = -1;

                        while (caughtFish == -1) {
                            caughtFish = Math.floor(Math.random() * (fishDictionary.length - 1));
                            if (fishDictionary[caughtFish][1] > objects["bobby"].quality) caughtFish = -1;
                        }

                        let thisFish = fishDictionary[caughtFish];

                        let caughtGems = Math.floor(objects["bobby"].quality);

                        let caughtValue = Math.ceil(thisFish[1] * thisFish[2] * Math.random());
                        let caughtWeight = "" + (thisFish[2] * Math.random()).toPrecision(2);

                        game.fishxp += caughtValue;
                        game.gems += caughtGems;
                        statIncrease("tgems", caughtGems);

                        game.fish += 1;
                        statIncrease("fish", 1);

                        game.fishvalue = game.fishvalue.add(caughtValue);
                        statIncrease("fishvalue", caughtValue);
                        statIncrease("fishweight", parseFloat(caughtWeight));

                        if (caughtValue > game.bfishvalue) game.bfishvalue = caughtValue;
                        if (parseFloat(caughtWeight) > game.bfishweight) game.bfishweight = parseFloat(caughtWeight);

                        updateFishingLevel();

                        if (thisFish[0] == "Leaoodandingzumn") {
                            if (!game.ach.includes(175)) game.ach.push(175);
                        }

                        objects["infotext"].text = "You caught a " + thisFish[0] + "! (Weight: " + caughtWeight + "kg, Value: " + fn(caughtValue) + ") +" + caughtGems + " Gems";
                    }
                    else {
                        // got a trash

                        let caughtTrash = trashDictionary[Math.floor(Math.random() * (trashDictionary.length - 1))];

                        game.fishxp += 3;
                        game.trash += 1;
                        statIncrease("trash", 1);

                        updateFishingLevel();

                        objects["infotext"].text = "You caught " + caughtTrash + "!";
                    }
                }
                else if (false) {
                    // trash
                }
                else {
                    // no fish
                }
            }
        }

        // Bobby cool ya down
        if (objects["bobby"].mode == 3) {
            objects["bobby"].cooldown -= 1 / 60;
            if (objects["bobby"].cooldown <= 0) {
                objects["bobby"].mode = 0;

                objects["slider"].sliderSize = 10;
                objects["slider"].sliderSpeed = 1;
            }
        }
    }
);