// Game made by Schrottii - editing or stealing is prohibited!
// This file contains (almost) everything regarding ads - the funny ingame ones made by Barduzzi (no real ads)
// view main.js for AdButton, AdStartButton and AdHandler inside the ui variable



// Some ad variables
var adHandler = document.getElementById("baldad");
var adStatus = "loading";

var chengaUsed = false;
var availableBoost = "none";
var currentBoost = "none";

var adTime = 20;
var adMax = 20;

// Class and definition
class Ad {
    constructor(name, title, description, length, effect, unlock) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.length = length;
        this.effect = effect;
        this.unlock = unlock;
    }

    getLength() {
        return this.length;
    }

    getBoost() {
        return this.effect();
    }

    getCurrentBoost() {
        // only applies when active
        if (currentBoost == this.name) return this.getBoost();
        else return this.name == "moreCrits" ? [1, 1] : 1;
    }

    isAvailable() {
        return this.unlock();
    }
}

const ads = {
    strongerClicks: new Ad("strongerClicks", "Stronger Clicks", "5x click Shgabb (5:00)",
        5 * 60, () => 5, () => true),
    strongerAuto: new Ad("strongerAuto", "Stronger Auto", "5x auto Shgabb (10:00)",
        10 * 60, () => 5, () => true),
    moreSandwiches: new Ad("moreSandwiches", "More Sandwiches", "4x Sandwich chance (3:00)",
        3 * 60, () => 4, () => true),
    fasterShgabb: new Ad("fasterShgabb", "Faster Shgabb", "5x shorter click CD (1:00)",
        1 * 60, () => 5, () => true),
    moreCrits: new Ad("moreCrits", "More Crits", "5x chance and 3x boost (3:00)",
        3 * 60, () => [5, 3], () => true),
    moreSilicone: new Ad("moreSilicone", "More Silicone", "10x Silicone Shgabb (5:00)",
        5 * 60, () => 10, () => unlockedSilicone()),
    moreGems: new Ad("moreGems", "More Gems", "3x Gem chance (8:00)",
        8 * 60, () => 3, () => unlockedGems())
};

// unlocked functions
function unlockedAds() {
    return game.stats.sw >= 10;
}

function unlockedChengas() {
    return game.stats.hms >= 7000;
}



// functions
function renderAllAdTexts() {
    let adTextRender = "";

    for (let ad in ads) {
        if (ads[ad].isAvailable()) adTextRender = adTextRender + "- " + ads[ad].title + ": " + ads[ad].description + " [Unlocked]<br />";
        else adTextRender = adTextRender + "- Locked<br />";
    }

    return adTextRender;
}

function setRandomAd() {
    let possibleBoosts = [];
    for (let potentialAd in ads) {
        if (ads[potentialAd].isAvailable()) possibleBoosts.push(ads[potentialAd].name);
    }

    availableBoost = possibleBoosts[Math.floor(possibleBoosts.length * Math.random())];

    // least watched ad setting
    if (settings.leastAdLess == 0 && availableBoost == determineLeastUsedBoost()) availableBoost = possibleBoosts[Math.floor(possibleBoosts.length * Math.random())];
    if (settings.leastAdLess == 2 && Math.random() < 1 / possibleBoosts.length) availableBoost = determineLeastUsedBoost();
}

function adStartButtonHandler() {
    if (adStatus == "possible") {
        selectVideo();

        adHandler.style.display = "inline";
        adHandler.play();

        chengaUsed = false;
        currentBoost = "wait";
        adStatus = "watching";

        ui.adContent.style.display = "none";
        ui.adButton.innerHTML = "";
        ui.adStartButton.style.display = "none";
        ui.adBar.style.display = "inline";
    }
}

function adButtonHandler() {
    switch (adStatus) {
        case "possible":
            if ((game.chenga < 1 && !chengaUsed) || !unlockedChengas()) break;

            // use chenga
            if (!chengaUsed) {
                chengaUsed = true;
                game.chenga -= 1;

                checkAchievement(158);
            }

            setRandomAd();

            ui.adStartButton.innerHTML = "Watch a joke ad to get: " + ads[availableBoost].title + ": " + ads[availableBoost].description;
            ui.adButton.innerHTML = cImg("chenga");

            break;

        case "boosted":
            // cancel ad
            adTime = 5;
            adMax = 5;

            currentBoost = "none";
            adStatus = "loaded";

            ui.sandwichBar.classList.remove("buffedProgress");
            ui.clickButton.classList.remove("buffedProgress");
            ui.clickButton2.classList.remove("buffedProgress");
            ui.adButton.innerHTML = "";
            break;
    }
}

function adSwitcher() {
    if (!settings.noAds) {
        if (adTime <= 0 && adTime >= cakeValue(-4, -15) && adStatus == "loaded") {
            // Hey, you can get this!
            setRandomAd();

            ui.adStartButton.style.display = "";
            ui.adBar.style.display = "none";

            adStatus = "possible";
            ui.adStartButton.innerHTML = "Watch a joke ad to get: " + ads[availableBoost].title + ": " + ads[availableBoost].description;
            if (unlockedChengas()) ui.adButton.innerHTML = cImg("chenga") + game.chenga;
            else ui.adButton.innerHTML = "HMS 7000";
        }
        else if (adTime <= 0 && adStatus == "boosted") {
            // Ad is over! (as in, the boost is over. not the video. for that, scroll down to the onended)
            adTime = cakeValue(1, 5);
            adMax = 5;

            ui.sandwichBar.classList.remove("buffedProgress");
            ui.clickButton.classList.remove("buffedProgress");
            ui.clickButton2.classList.remove("buffedProgress");

            adStatus = "loaded";
            currentBoost = "none";
            ui.adButton.innerHTML = "";
        }
        else if (currentBoost == "none" && adTime <= cakeValue(-4, -15) && (adStatus == "possible" || adStatus == "loaded") && !chengaUsed) {
            // Hm, let's wait for next ad (you didn't accept this one)
            adTime = cakeValue(1, 5);
            adMax = 5;
            adStatus = "loaded";
            ui.adButton.innerHTML = "";
            ui.adStartButton.style.display = "none";
            ui.adBar.style.display = "inline";
        }
    }
    else {
        // Ads disabled
        adHandler.style.display = "none";
        ui.adContent.style.display = "none";
    }
}



// Ad init
function canPlayAds() {
    if (adStatus == "loading") {
        if (createNotification != undefined && unlockedAds()) createNotification("Joke ads loaded");
        adStatus = "loaded";

        ui.adContent.style.display = "";
        adHandler.volume = 0.2;
    }
}

function onAdEnded() {
    currentBoost = availableBoost;
    adStatus = "boosted";

    ui.adContent.style.display = "";
    ui.adButton.innerHTML = "Cancel<br />" + ads[currentBoost].title;
    adHandler.style.display = "none";

    statIncrease("ads", 1);
    switch (currentBoost) {
        case "strongerClicks":
            game.stats.wads.sc += 1;
            break;
        case "strongerAuto":
            game.stats.wads.sa += 1;
            break;
        case "moreSandwiches":
            game.stats.wads.msw += 1;
            break;
        case "fasterShgabb":
            game.stats.wads.fs += 1;
            break;
        case "moreCrits":
            game.stats.wads.mc += 1;
            break;
        case "moreSilicone":
            game.stats.wads.msi += 1;
            break;
        case "moreGems":
            game.stats.wads.mg += 1;
            break;
    }

    lastAdTimer = 0;
    availableBoost = "none";
    adTime = adMax = ads[currentBoost].getLength();
    console.log(adTime + "==" + adMax)

    if (currentBoost == "strongerClicks" || currentBoost == "fasterShgabb") {
        ui.clickButton.classList.add("buffedProgress")
        ui.clickButton2.classList.add("buffedProgress")
    }
    if (currentBoost == "moreSandwiches") {
        ui.sandwichBar.classList.add("buffedProgress")
    }

    // chenga
    if (unlockedChengas()) {
        if (Math.random() < 0.10) {
            game.chenga += 1;
            statIncrease("chenga", 1);
        }
    }
}

function onAdTimeUpdate() {
    if (adHandler.controls == true) {
        adHandler.onended();

        adTime = -50000000000;
        currentBoost = "screwyou";
        availableBoost = "noneeeeeee";
    }
}

function determineLeastUsedBoost() {
    let least = ["", 1000000000000000000000000];
    for (s in game.stats.wads) {
        if (game.stats.wads[s] < least[1]) {
            least[0] = s;
            least[1] = game.stats.wads[s];
        }
    }

    switch (least[0]) {
        case "sc":
            return "strongerClicks";
        case "sa":
            return "strongerAuto";
        case "msw":
            return "moreSandwiches";
        case "fs":
            return "fasterShgabb";
        case "mc":
            return "moreCrits";
        case "msi":
            return "moreSilicone";
        case "mg":
            return "moreGems";
    }
}

function selectVideo() {
    // Select which video you will see
    let adVideoPicker = Math.ceil(Math.random() * 6)
    switch (adVideoPicker) {
        case 1:
            adHandler.src = "videos/elmenda_bad_as_always.mp4";
            break;
        case 2:
            adHandler.src = "videos/elm_ad_2.mp4";
            break;
        case 3:
            adHandler.src = "videos/Helmet452_Trailer.mp4";
            break;
        case 4:
            adHandler.src = "videos/Drunk_elmenda_savage.mp4";
            break;
        case 5:
            adHandler.src = "videos/shgabb_flame.mp4";
            break;
        case 6:
            adHandler.src = "videos/Mend_car_crashing_vid.mp4";
            break;
    }
}