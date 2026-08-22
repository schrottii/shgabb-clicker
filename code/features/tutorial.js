///////////////////////////////////
// Tutorial   #6D61696E736563
///////////////////////////////////

// tutorial
//var tutorialProgress = -1;
var tutorialInterval = -1; // the interval gets created

// title, text, req for next button to appear
const tutorialTexts = [
    ["Welcome to Shgabb Clicker (Tutorial)", "Welcome, I am Lucie, and here to guide you through the basics of Shgabb Clicker! This tutorial is optional, but if you complete it, you get a cosmetic and Achievement.",
        () => true, ""],
    ["Progression", "The primary goal is to earn Shgabb, and later other currencies. Most new things are unlocked by the first upgrade. (More Shgabb, also known as HMS)",
        () => true, ""],
    ["Let's make progress", "Either click the button at the top to earn some well-earned Shgabb... or enable Idle Mode, which is slower, but does it automatically, and lean back and watch the numbers go up.",
        () => game.shgabb.gte(shgabbUpgrades.moreShgabb.price(0)), () => "Goal: Get " + shgabbUpgrades.moreShgabb.price(0) + cImg("shgabb")],
    ["Upgrades", "You can afford the first level! Buy it and keep going for a while~",
        () => shgabbUpgrades.moreShgabb.currentLevel() >= 10, () => "Goal: Buy 10 levels (" + shgabbUpgrades.moreShgabb.currentLevel() + "/10)"],
    ["New unlocks", "You're making good progress! At HMS 25, you will unlock the Shbook (a guidebook, list of unlocks & later more), and an upgrade to get your second currency: Sandwiches.",
        () => shgabbUpgrades.moreShgabb.currentLevel() >= 25, () => "Goal: Buy 25 levels (" + shgabbUpgrades.moreShgabb.currentLevel() + "/25)"],
    ["Make your journey comfortable", "There are many Settings where you may prefer one option or the other. I recommend checking out the Sidebar, notations, and currency display.",
        () => selectedSelection == 3 && selections[2] == "settings", "Goal: Visit the Settings"],
    ["Have fun", "You have completed the tutorial. Keep unlocking new things, and maybe look at the Shbook or Achievements if you get a bit bored, cyaa",
        () => true, ""],
];

function startTutorial(setProgress = 0) {
    game.tutorialProgress = setProgress;
    ui.tutorial.container.style.display = "";
    audioPlaySound("voice");

    tutorialInterval = setInterval(() => {
        if (game.tutorialProgress == -1) {
            endTutorial();
            return false;
        }
        let isComplete = tutorialTexts[game.tutorialProgress][2]() == true;

        // animate lucie :3
        if (ui.tutorial.image.src.includes("images/slimegirl.png")) ui.tutorial.image.src = "images/slimegirl2.png";
        else ui.tutorial.image.src = "images/slimegirl.png";

        // toggle appearance of the "Next" button
        if (isComplete) {
            if (game.tutorialProgress + 1 > tutorialTexts.length - 1) ui.tutorial.next.innerHTML = "Finish";
            else ui.tutorial.next.innerHTML = "Next";

            ui.tutorial.next.style.display = "";
        }
        else ui.tutorial.next.style.display = "none";

        // text (header + main text + goal)
        ui.tutorial.text.innerHTML = "<h2>" + tutorialTexts[game.tutorialProgress][0] + "</h2>"
            + "<p>" + tutorialTexts[game.tutorialProgress][1]
            + "<br />" + "<span style='color: " + (isComplete ? "lime" : "orange") + "'>" + (typeof (tutorialTexts[game.tutorialProgress][3]) == "function" ? tutorialTexts[game.tutorialProgress][3]() : tutorialTexts[game.tutorialProgress][3]) + "</span></p>";
    }, 250);
}

function continueTutorial() {
    if (game.tutorialProgress + 1 > tutorialTexts.length - 1) endTutorial();
    else {
        game.tutorialProgress++;
        audioPlaySound("voice");
    }
}

function endTutorial() {
    // guys... it's over
    game.tutorialProgress = -1;
    ui.tutorial.container.style.display = "none";
    clearInterval(tutorialInterval);

    checkAchievement(211);
    delete game.tutorialProgress;
}

function checkTutorial() {
    if (game.tutorialProgress != undefined) {
        startTutorial(game.tutorialProgress);
    }
}