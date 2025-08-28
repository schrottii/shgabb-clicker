// Game made by Schrottii - editing or stealing is prohibited!

const fishingLevelUpFormula = (level) => Math.ceil(Math.pow(100, 1 + 0.002 * (level - 1)) * level);

// name, value factor, weight factor
const fishDictionary = [
    ["Pike", 8, 5, "pike"],
    ["Batfish", 1, 1, "batfish"],
    ["Cod", 1, 1, "cod"],
    ["Buffalo", 2, 8, "buffalo"],
    ["Catfish", 2, 3, "catfish"],
    ["Carp", 3, 3, "carp"],
    ["Oscar", 5, 2, "oscar"],
    ["Skate", 5, 3, "skate"],
    ["Butterfish", 1, 2, "butterfish"],
    ["Koi", 9, 3, "koi"],
    ["Baby Shark", 1, 1, "shark"],
    ["Tuna", 1, 1, "tuna"],
    ["Salmon", 1, 4, "salmon"],
    ["Anchovy", 1, 1, "anchovy"],
    ["Piranha", 2, 2, "piranha"],
    ["Zander", 1, 3, "zander"],
    ["Swordfish", 4, 6, "swordfish"],
    ["Leaoodandingzumn", 10, 10, "leaoo"],
    ["Stupid Tuna", 1, 1, "tuna"],
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
    "Brick",
    "Broken Key",
    "Glass Shard",
    "Fake Fish",
    "Wet Dirt",
];

function unlockedFishing() {
    return game.stats.hms >= 5000;
}

function updateFishingLevel() {
    while (game.fishlvl > 0 && game.fishxp < fishingLevelUpFormula(game.fishlvl - 1)) {
        // You shouldn't be this high! Lol!
        game.fishlvl -= 1;
    }

    while (game.fishxp >= fishingLevelUpFormula(game.fishlvl + 1)) {
        // Level up! Yay!
        let pearlsGained = 0;
        game.fishlvl += 1;

        if (ui.pearlreset.checked) {
            // Reset
            ui.pearlreset.checked = false;
            ui.pearlreset.value = "false";

            for (let up in pearlUpgrades) {
                game.upgradeLevels[up] = 0;
            }
            game.pearls = pearlsGained = calcPearls();
            createNotification("Pearls reset successfully!");
        }
        else {
            // get 1, 2, 3, etc.
            game.pearls += game.fishlvl;
            pearlsGained = game.fishlvl;
        }

        updateUpgrades();
        createNotification("Fish level up! New level: " + game.fishlvl + ", gained Pearls: " + pearlsGained);
    }
}

function calcPearls() {
    if (game.fishlvl == 0) return 0;

    let earnedPearls = 0;

    for (let ep = 1; ep <= game.fishlvl; ep++) {
        earnedPearls += ep;
    }

    return earnedPearls;
}

var pearlResetCounter = false;
function togglePearlReset() {
    if (pearlResetCounter) {
        pearlResetCounter = false;
    }
    else {
        if (ui.pearlreset.checked) {
            ui.pearlreset.checked = false;
            ui.pearlreset.value = "false";
        }
        else {
            ui.pearlreset.checked = true;
            ui.pearlreset.value = "true";
        }
    }
}

function togglePearlReset2() {
    pearlResetCounter = true;
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

        createText("title", 0.08, 0.1, "Fishgang", { color: "white", size: 32, align: "left" });

        createButton("backButton", 0.025, 0, 0.1, 0.1, "cd2", () => {
            ui.pearlSection.style.display = "none";
            createAnimation("trans3b", "transition3", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu")', 300);
        }, { quadratic: true, centered: true });

        // player info
        createImage("fishlvl_FishyPic", 0.3, 0, 0.1, 0.1, "fishlvl", { quadratic: true, centered: true });
        createImage("fishlvl_PFP", 0.3, 0.02, 0.06, 0.06, "fishlvl", { quadratic: true, centered: true });
        
        createImage("fishlvl_FishyPic2", 0.325, 0.035, 0.14, 0.06, "fishlvl");
        createSquare("fishlvl_LvlBg", 0.33, 0.05, 0.02, 0.03, "#6F8A69");
        createSquare("fishlvl_LvlBg2", 0.33 + 0.001, 0.05 + 0.003, 0.018, 0.024, "#2C312B");
        createText("fishlvl_Level", 0.34, 0.0775, "?", { color: "#01f8fd", size: 20 });

        createSquare("fishlvl_BarBg", 0.35, 0.05, 0.1, 0.03, "black");
        createSquare("fishlvl_BarFill", 0.3525, 0.05, 0.1, 0.03, "#2e269a");
        createText("fishlvl_BarText", 0.4, 0.0775, "?", { color: "white", size: 20 });

        let img = new Image();
        img.src = getPFPByID(game.profile.pfp).image;
        img.onload = () => {
            console.log("loaded")
            objects["fishlvl_PFP"].image = "pfp";
        }
        images["pfp"] = img;

        // stats
        createText("trashamount", 0.6, 0.075, "Trash: 0", { color: "white", size: 24, align: "left" });
        createText("fishamount", 0.7, 0.075, "Fish: 0", { color: "white", size: 24, align: "left" });
        createText("value", 0.8, 0.075, "(Value: 0)", { color: "white", size: 24, align: "left" });

        createText("infotext", 0.03, 0.95, "", { color: "white", size: 24, align: "left" });;
        createImage("recentfish", 0.5, 0.5, 0.2, 0.2, "button", { quadratic: true, centered: true, alpha: 0 });
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

        createImage("bobby", 0.5, 0.75, 0.05, 0.05, "bobby", { quadratic: true, centered: true });
        objects["bobby"].mode = 0; // 0 is throw it out, 1 is wait, 2 is reel it in, 3 is cooldown
        objects["bobby"].distance = 0; // 0 - 100
        objects["bobby"].cooldown = 3; // 0 - 3 (in seconds)
        objects["bobby"].quality = 0; // 1 - 10
        objects["bobby"].chance = 0; // 0 - 100
        objects["bobby"].reelCD = 0;

        createButton("slideButton", 0, 0.75, 0.3, 0.15, "button", () => {
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
                        objects["sliderbg"].color = "rgb(10, 60, 10)";
                        if (luck > 0) luck -= 1; // reduce luck
                    }
                    else {
                        // Miss
                        objects["bobby"].chance -= 5;
                        objects["bobby"].reelCD = 0.2;
                        objects["sliderbg"].color = "rgb(160, 0, 0)";
                        if (luck > 0) luck -= 5; // reduce luck

                        if (Math.random() * 80 >= (objects["bobby"].chance + 20)) {
                            objects["bobby"].mode = 3;
                            objects["bobby"].y = 0.75;

                            objects["bobby"].distance = 0;
                            objects["bobby"].cooldown = 3;

                            objects["infotext"].text = "The line broke! Be more careful!";
                        }
                    }
                }
            }
        })
        createText("slideButtonText", 0.15, 0.85, "", { size: 48 });

        createText("catchQuality", 0.7, 0.775, "", { size: 40, align: "left" });
        createText("catchChance", 0.7, 0.85, "", { size: 40, align: "left" });

        ui.pearlSection.style.display = "";

        // black overlay fade transition
        createImage("transition3", 0, 0, 1, 1, "black");
        createAnimation("trans3", "transition3", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
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
        objects["fishlvl_Level"].text = game.fishlvl;
        objects["fishlvl_BarFill"].w = Math.min(0.095, 0.095 * ((game.fishxp - fishingLevelUpFormula(game.fishlvl)) / (fishingLevelUpFormula(game.fishlvl + 1) - fishingLevelUpFormula(game.fishlvl))));
        objects["fishlvl_BarText"].text = game.fishxp + "/" + fishingLevelUpFormula(game.fishlvl + 1);

        objects["trashamount"].text = "Trash: " + game.trash;
        objects["fishamount"].text = "Fish: " + game.fish;
        objects["value"].text = "(Value: " + fn(game.fishvalue) + ")";

        // Slider
        if (objects["slider"].sliderDirection == 0) {
            if (objects["slider"].sliderMove >= 100) objects["slider"].sliderDirection = 1;
            else objects["slider"].sliderMove = Math.min(100, objects["slider"].sliderMove + objects["slider"].sliderSpeed * tick * 60);
        }
        else if (objects["slider"].sliderDirection == 1) {
            if (objects["slider"].sliderMove <= 0) objects["slider"].sliderDirection = 0;
            else objects["slider"].sliderMove = Math.max(0, objects["slider"].sliderMove - objects["slider"].sliderSpeed * tick * 60);
        }

        if (objects["bobby"].mode == 0) {
            if (objects["slider"].sliderMove < 25) objects["slider"].color = "yellow";
            else if (objects["slider"].sliderMove < 50) objects["slider"].color = "orange";
            else if (objects["slider"].sliderMove < 75) objects["slider"].color = "red";
            else objects["slider"].color = "blue";
        }
        else objects["slider"].color = "orange";

        if (objects["bobby"].mode == 0 || objects["bobby"].mode == 2) {
            objects["slider"].w = Math.min(0.3, 0.3 * (objects["slider"].sliderSize / 100));
            objects["slider"].x = 0.35 + Math.min(0.3 - objects["slider"].w, (0.3 - objects["slider"].w) * (objects["slider"].sliderMove / 100));
            if (objects["bobby"].mode == 0) objects["slideButtonText"].text = "Throw";
        }
        else if (objects["bobby"].mode == 3) {
            objects["slider"].w = objects["bobby"].cooldown * 0.1;
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
        if (Math.random() >= 0.98) {
            createAnimation("bobbyX", "bobby", (t, d, a) => { a.dur < 0.5 ? t.x -= d / 200 : t.x += d / 200 }, 1, true);
        }
        if (Math.random() >= 0.98) {
            createAnimation("bobbyX", "bobby", (t, d, a) => { a.dur < 0.5 ? t.x += d / 200 : t.x -= d / 200 }, 1, true);
        }
        if (Math.random() >= 0.98) {
            createAnimation("bobbyY", "bobby", (t, d, a) => { a.dur < 0.5 ? t.y -= d / 200 : t.y += d / 200 }, 1, true);
        }
        if (Math.random() >= 0.98) {
            createAnimation("bobbyY", "bobby", (t, d, a) => { a.dur < 0.5 ? t.y += d / 200 : t.y -= d / 200 }, 1, true);
        }
        objects["bobby"].x = Math.max(0.4, Math.min(0.6, objects["bobby"].x));

        //objects["bobby"].y = 0.75 - 0.5 * (objects["bobby"].distance / 100);

        // Bobby waiting for fish
        if (objects["bobby"].mode == 1) {
            if (Math.random() > 0.99) {
                objects["bobby"].mode = 2;

                // got a fish!
                objects["slider"].sliderSize = Math.max(2, (objects["bobby"].distance >= 50 ? 20 : 40) * Math.random());
                objects["slider"].sliderSpeed = Math.round(Math.max((objects["bobby"].distance >= 75 ? 2 : 1), 4 * Math.random()));
                objects["bobby"].quality = Math.min(10, Math.ceil(10 * objects["slider"].sliderSpeed / objects["slider"].sliderSize)); // 1 - 20 (capped at 10)
                if (objects["bobby"].distance < 25) objects["bobby"].quality = Math.min(3, objects["bobby"].quality);
                objects["bobby"].chance = 30 - (objects["bobby"].distance / 2) + applyLuck(60);

                createAnimation("bobbyThrow", "bobby", (t, d, a) => { t.y = 0.75 - (0.5 * (objects["bobby"].distance / 100) * a.dur * 4) }, 0.25, true);
            }
        }

        // Bobby reel it in
        if (objects["bobby"].mode == 2) {
            objects["bobby"].distance -= 0.1 * tick * 60; // come closer baby
            objects["bobby"].y += 0.1 * tick * 60 / 100 / 2; // come closer baby
            objects["bobby"].chance -= objects["slider"].sliderSpeed * tick; // keep reducing the chance to make it exciting

            if (objects["bobby"].reelCD > 0) objects["bobby"].reelCD -= 1 / 60; // reduce cd that comes from hitting/missing
            else {
                objects["bobby"].reelCD = 0;
                objects["sliderbg"].color = "black";
            }

            if (objects["bobby"].distance < -5) {
                objects["bobby"].y = 0.75;
                objects["bobby"].mode = 3;

                objects["bobby"].distance = 0;
                objects["bobby"].cooldown = 3;
                objects["sliderbg"].color = "black";

                // Get fish
                checkAchievement(174, objects["bobby"].chance >= 200);

                if (Math.random() * 100 < objects["bobby"].chance) {
                    if (Math.random() >= 0.75 || objects["bobby"].quality >= 5) {
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
                        let caughtXP = (caughtValue * 2) + 4;

                        game.fishxp += caughtXP;
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

                        checkAchievement(175, thisFish[0] == "Leaoodandingzumn");

                        objects["infotext"].text = "You caught a " + thisFish[0] + "! (Weight: " + caughtWeight + "kg, Value: " + fn(caughtValue) + ") +" + caughtGems + " Gems +" + caughtXP + "XP";

                        objects["recentfish"].image = thisFish[3];
                        createAnimation("fishPopup", "recentfish", (t, d) => { t.alpha += d }, 1, true);
                    }
                    else {
                        // got a trash
                        let caughtTrash = trashDictionary[Math.floor(Math.random() * (trashDictionary.length - 1))];

                        game.fishxp += 3;
                        game.trash += 1;
                        statIncrease("trash", 1);

                        updateFishingLevel();

                        objects["infotext"].text = "You caught " + caughtTrash + "! +3XP";

                        objects["recentfish"].image = "trash";
                        createAnimation("fishPopup", "recentfish", (t, d) => { t.alpha += d }, 1, true);
                    }
                }
                else {
                    // no fish
                    objects["infotext"].text = "Unlucky! Nothing was caught (Chance: " + Math.floor(objects["bobby"].chance) + "%)";
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

                createAnimation("fishPopup", "recentfish", (t, d) => { t.alpha -= d * 2 }, 0.5, true);
            }
        }
    }
);