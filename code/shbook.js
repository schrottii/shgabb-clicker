// Schrottii - editing or stealing is prohibited!

var shbookSelections = ["?", "Shgabb", "Shbook"]

class BookEntry{
    constructor(name, unlock, lockedText, unlockedText){
        this.name = name;
        this.unlock = unlock;
        this.lockedText = lockedText;
        this.unlockedText = unlockedText;
    }
}

const currenciary = [
    new BookEntry("Shgabb", () => true, "...", "Shgabb is the first main currency, and is available from the very start of the game. It is primarily earned from clicking the click button and automatically every second. Its first upgrade, More Shgabb, is used as the main indicator of progress."),
    new BookEntry("Sandwiches", () => unlockedSandwiches(), "Shgabb Upgrade", "Sandwiches are the second main currency, and are unlocked through the Sandwich Chance Shgabb Upgrade. They can be earned by clicking, and are primarily used for auto Shgabb production."),
    new BookEntry("Golden Shgabb", () => unlockedGS(), "1M Shgabb", "Golden Shgabb is the third main currency, and it is unlocked at 1M Shgabb. It is earned from Prestiges, and can be spent on basic boosts."),
    new BookEntry("Silicone Shgabb", () => unlockedSilicone(), "1B Shgabb", "Silicone Shgabb, also known as Silicone, is the fourth main currency, and is unlocked at 1000000000 Shgabb. It is automatically produced every second and can be spent on minor boosts. Prestiging does not remove it."),
    new BookEntry("Gems", () => unlockedGems(), "HMS 500", "Gems are the first side currency, unlocked at HMS 500. They can be spent on several offers, to earn Shgabb, Artifacts or more loadouts. Gems are not lost on a Prestige."),
    new BookEntry("Artifact Scrap", () => unlockedArtifactUpgrading(), "Duplicate", "Artifact Scrap is the second side currency, unlocked after earning the first duplicate Artifact. Its sole purpose is upgrading Artifacts. It is earned from getting duplicates and destroying Artifacts. Artifact Scrap is kept on a Prestige."),
    new BookEntry("Améliorer", () => unlockedAmeliorer(), "HMS 2000", "Améliorer, also known as Amé, is the fifth main currency, and is unlocked at HMS 2000. It can be bought with any of the first four main currencies, or later also from Shgic and Gems. It can only be earned in small amounts. It can be spent on many various upgrades. It is not lost when prestiging, unless that option is enabled, which gives a full refund."),
    new BookEntry("Bags", () => unlockedBags(), "HMS 8000", "Bags are the sixth main currency, unlocked at HMS 8000, and can be earned from upgrading More Shgabb. They can be spent on a collection of upgrades."),
];

const featuriary = [
    new BookEntry("Shbook", () => true, "...", "Welcome to the Shbook! Here you can find basic help for the game and explore the lore."),
    new BookEntry("Prestige", () => unlockedGS(), "1M Shgabb", "Prestiging is unlocked at 1M Shgabb. Prestiging sacrifices most progress, such as Shgabb, Sandwiches and Upgrades, but gives Golden Shgabb in return."),
    new BookEntry("Artifacts", () => unlockedArtifacts(), "HMS 1000", "Artifacts are unlocked at HMS 1000 and can be equipped for all kinds of effects, from simple to mind-blowing complicated. By default, up to 3 Artifacts can be equipped at the same time. Artifacts of the same type are multiplicative with each other. Artifacts can be found from clicking or bought with Gems, and the further you go, the more Artifacts you can find. Loadouts can be saved and loaded at any time."),
    new BookEntry("Shgic Shgac Shgoe", () => unlockedAmeliorer(), "HMS 2000", "Shgic Shgac Shgoe (whatever that means) is unlocked along Améliorer. Every day you get the chance to win 2 Améliorer here by playing your cards right."),
    new BookEntry("Challenges", () => unlockedChallenges(), "HMS 6000", "Challenges are unlocked at HMS 6000 and each offer a change to the gameplay. Starting a Challenge costs Gems and a Prestige. A Challenge can be beaten by reaching the required More Shgabb amount and then performing a Prestige. Each Challenge has a different reward, increasing with every tier: with every completion."),
];

function changeShbook(i, sel) {
    shbookSelections[i] = sel;
    renderCurrenciary();
    renderFeaturiary();
}

function renderCurrenciary() {
    let render = "<div style='font-size: 40px'>Currencies</div><hr>";

    for (s in currenciary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: 24px; background-color: ` + (shbookSelections[1] == currenciary[s].name ? "yellow" : "white") + `" onclick="changeShbook(1, '` + currenciary[s].name + `')">` + (currenciary[s].unlock() ? currenciary[s].name : "Locked [" + currenciary[s].lockedText + "]") + `</button>`
    }

    let thisCurrency = "";
    for (s in currenciary) {
        if (currenciary[s].name == shbookSelections[1]) thisCurrency = currenciary[s];
    }

    ui.shbookCurrenciary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisCurrency.unlock() ? thisCurrency.name : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: 20px'>" + (thisCurrency.unlock() ? thisCurrency.unlockedText : "Locked [" + thisCurrency.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[1] + "'>" + "Learn more (Wiki)" + "</a></button>";

    ui.shbookCurrenciary2.innerHTML = render;
}

function renderFeaturiary() {
    let render = "<div style='font-size: 40px'>Features</div><hr>";

    for (s in featuriary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: 24px; background-color: ` + (shbookSelections[2] == featuriary[s].name ? "yellow" : "white") + `" onclick="changeShbook(2, '` + featuriary[s].name + `')">` + (featuriary[s].unlock() ? featuriary[s].name : "Locked [" + featuriary[s].lockedText + "]") + `</button>`
    }

    let thisFeature = "";
    for (s in featuriary) {
        if (featuriary[s].name == shbookSelections[2]) thisFeature = featuriary[s];
    }

    ui.shbookFeaturiary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisFeature.unlock() ? thisFeature.name : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: 20px'>" + (thisFeature.unlock() ? thisFeature.unlockedText : "Locked [" + thisFeature.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[2] + "'>" + "Learn more (Wiki)" + "</a></button>";

    ui.shbookFeaturiary2.innerHTML = render;
}