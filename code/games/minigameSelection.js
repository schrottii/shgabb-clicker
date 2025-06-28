var selectedMinigame = 0;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "darkblue");
        createSquare("bg2", 0, 0.1, 1, 0.8, "rgb(0, 0, 255)");
        objects["bg2"].blue = 255;

        createSquare("gamesBg", 0, 0.1, 0.3, 0.8, "rgb(64, 64, 120)");

        createText("title", 0.08, 0.1, "Minigames Selection", { color: "white", size: 32, align: "left" });
        createText("selgam", 0.92, 0.975, "Select a game", { color: "white", size: 32, align: "right" });

        createImage("aniImage1", 0.75, 0.5, 0.2, 0.2, "minigames", { quadratic: true, centered: true });
        createImage("aniImage2", 0.72, 0.55, 0.05, 0.05, "minigames2", { quadratic: true, centered: true });

        createImage("aniImage3", -0.2, 0.85, 0.05, 0.05, "minigames2", { quadratic: true, centered: true });
        createImage("aniImage4", 0.5, 0.85, 0.05, 0.05, "minigames2", { quadratic: true, centered: true });

        objects["aniImage2"].dir = 1; // right
        createSquare("CDPlayer2", 0.6, 0.65, 0.05, 0.05, "rgb(10, 10, 10)");

        // Buttons
        createImage("gameCD1", 0.05, 0.4, 0.1, 0.1, "cd2", { quadratic: true, centered: true });
        createImage("gameCD2", 0.05, 0.55, 0.1, 0.1, "cd2", { quadratic: true, centered: true });

        createButton("gameSel1", 0.05, 0.4, 0.1, 0.1, "cd1", () => {
            selectedMinigame = 1;
            objects["selgam"].text = "Selected: Shgic Shgac Shgoe";
        }, { quadratic: true, centered: true })

        createButton("gameSel2", 0.05, 0.55, 0.1, 0.1, "cd1", () => {
            selectedMinigame = 2;
            objects["selgam"].text = unlockedFishing() ? "Selected: Fishgang" : "Locked";
        }, { quadratic: true, centered: true })

        createText("gameText1", 0.08, 0.475 - 0.02, "Shgic", { color: "white", size: 32, align: "left" });
        createText("gameText1b", 0.08, 0.475 + 0.02, "Shgac Shgoe", { color: "white", size: 32, align: "left" });
        createText("gameText2", 0.08, 0.625, "Fishgang", { color: "white", size: 32, align: "left" });



        createImage("gameCDStart", 0.625, 2, 0.1, 0.1, "cd2", { quadratic: true, centered: true });
        objects["gameCDStart"].status = "none";
        createButton("pressStart", 0.65, 0.75, 0.2, 0.1, "button", () => {
            if (selectedMinigame != 0) objects["gameCDStart"].status = "move";
        })
        createText("startText", 0.75, 0.825, "Play Minigame", { size: 32 });

        createSquare("CDPlayer1", 0.6, 0.55, 0.05, 0.12, "black");
        createImage("CDPlayer3", 0.6, 0.55, 0.05, 0.17, "cd3");
    },
    (tick) => {
        // Loop
        if (objects["aniImage2"].dir == 0) {
            objects["aniImage2"].x = Math.min(0.75, objects["aniImage2"].x + 0.0004);

            if (objects["aniImage2"].x == 0.75) {
                objects["aniImage2"].dir = 1;
            }
        }
        else {
            objects["aniImage2"].x = Math.max(0.72, objects["aniImage2"].x - 0.0004);

            if (objects["aniImage2"].x == 0.72) {
                objects["aniImage2"].dir = 0;
            }
        }

        objects["gameText2"].text = unlockedFishing() ? "Fishgang" : "Locked (12 000 HMS)";

        objects["aniImage3"].x += 0.001;
        if (objects["aniImage3"].x > 1.2) objects["aniImage3"].x = -0.2;
        objects["aniImage4"].x += 0.001;
        if (objects["aniImage4"].x > 1.2) objects["aniImage4"].x = -0.2;

        objects["bg2"].blue -= 0.1;
        if (objects["bg2"].blue < 200) objects["bg2"].blue = 255;
        objects["bg2"].color = "rgb(" + (255 - objects["bg2"].blue) + ", " + (255 - objects["bg2"].blue) + ", " + objects["bg2"].blue + ")";

        // CD disc stuff
        if (objects["gameCDStart"].status == "none") {
            // Move CD from the case to the right side of the minigame's name
            for (let i = 1; i < 3; i++) {
                if (selectedMinigame == i) {
                    if (objects["gameCD" + i].x != 0.25) {
                        objects["gameCD" + i].x = Math.min(0.35, objects["gameCD" + i].x + 0.012);
                    }
                }
                else {
                    if (objects["gameCD" + i].x != 0.05) {
                        objects["gameCD" + i].x = Math.max(0.05, objects["gameCD" + i].x - 0.020);
                        objects["gameCD" + i].y = Math.max(0.4 + 0.15 * (i - 1), objects["gameCD" + i].y - 0.020);
                    }
                }
            }
        }
        if (objects["gameCDStart"].status == "move") {
            // Move it down...
            objects["gameCD" + selectedMinigame].x = Math.min(0.625, objects["gameCD" + selectedMinigame].x + 0.01);
            objects["gameCD" + selectedMinigame].y = Math.min(0.75, objects["gameCD" + selectedMinigame].y + 0.02);

            if (objects["gameCD" + selectedMinigame].x == 0.625 && objects["gameCD" + selectedMinigame].y == 0.75) {
                objects["gameCDStart"].status = "insert";
            }
        }
        if (objects["gameCDStart"].status == "insert") {
            // ...then up!
            if (objects["gameCD" + selectedMinigame].y == 0.56) {
                objects["gameCD" + selectedMinigame].status = "done";

                // START THE MINIGAME
                if (selectedMinigame == 1 && unlockedAmeliorer()) loadScene("shgic");
                else if (selectedMinigame == 2 && unlockedFishing()) loadScene("fishgang");
                else {
                    objects["gameCD" + selectedMinigame].x == 0.05
                    objects["gameCDStart"].status = "none";
                    selectedMinigame = 0;

                    objects["selgam"].text = "Can't read CD! :(";
                }
            }
            else {
                objects["gameCD" + selectedMinigame].y = Math.max(0.56, objects["gameCD" + selectedMinigame].y - 0.008);
            }
        }
    }
);