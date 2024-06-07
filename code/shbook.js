﻿// Schrottii - editing or stealing is prohibited!

var shbookSelections = [0, "Shgabb", "Shbook"]

class BookEntry{
    constructor(ID, name, unlock, lockedText, unlockedText){
        this.ID = ID;
        this.name = name;
        if (this.ID > 99) {
            this.source = unlock;
            this.amount = lockedText;
        }
        else this.unlock = unlock;
        this.lockedText = lockedText;
        this.unlockedText = unlockedText;
    }

    isUnlocked() {
        if (this.ID == 0) {
            return true;
        }
        else if (this.ID > 99) {
            return game.lore.includes(this.ID);
        }
        else {
            return this.unlock();
        }
    }

    isFound() {
        if (this.isUnlocked()) return true;
        if (game.lorepg.includes(this.ID)) return true;
        return false;
    }

    getName() {
        if (this.ID > 99) {
            return "[" + this.ID + "] " + this.name;
        }
        else {
            return this.name;
        }
    }
}

function getWispType(typeID) {
    switch (typeID) {
        case 0:
            return "Free";
        case 1:
            return "Memory Wisp"; // 1/10k chance on a click
    }
}

function getLoreByID(id){
    for (l in lore) {
        if (lore[l].ID == id) return lore[l];
    }
}

function getWisp() {
    if (game.stats.hms >= 4000 && game.loreSel != 0 && Math.random() <= 1 / 5000) {
        game.loreP += 1;

        if (game.loreP == getLoreByID(game.loreSel).amount) {
            game.lore.push(game.loreSel);
            game.lorepg.splice(game.lorepg.indexOf(game.loreSel), 1);
            game.loreSel = 0;
            game.loreP = 0;
            createNotification("Unlocked new lore!");
        }

        renderShbook();
    }
}

function getLorePage() {
    if (game.stats.hms >= 4000 && game.lorepg.length < 4 && Math.random() <= 1 / 25000) {
        let availablePages = [];
        for (l in lore) {
            if (!lore[l].isFound()) availablePages.push(lore[l].ID);
        }
        if (availablePages.length > 0) {
            createNotification("Found new lore!");
            game.lorepg.push(availablePages[availablePages.length * Math.floor(Math.random())]);
        }
        else {
            createNotification("All lore pages already found...");
        }
    }

    renderShbook();
}

// Pierre
// dr. xd (when?)

const lore = [
    new BookEntry(0, "Info", 0, 0, "Find lore pages and Memory Wisps by clicking. Select a found lore page to start collecting Wisps for it. Collect all required Memory Wisps to unlock the lore!"),

    // 100 - 199: Basic information about the lore, just rough edges
    new BookEntry(100, "Fascinating", 1, 10, `Fascinating. It's simply fascinating. I've seen many things in my life, and discovered more than Joe did - even if he says otherwise - and have seen some things you wouldn't believe... including my wife, hehe. But this thing, it's fascinating. What is this creature? It's fascinating. - Pierre`),
    new BookEntry(101, "A Shgabb", 1, 10, `This creature is fascinating. It's called "Shgabb", very weird name, it does not quite fit in with the language's usual combinations of vowels and consonants, it's like a foreign sound, but what I know for sure, is that this creature is as foreign as one can get. I haven't spectated it for long yet. This definitely needs more research. - Pierre`),
    new BookEntry(102, "The Blues", 1, 10, `I should describe this creature's appearance, this creature being, this "Shgabb" thing, the recently discovered whatever. It's round. That's the best way I can describe the shape. The color scheme is fascinating. Think of this creature as a light blue ball, with a capital S written all over its forehead in a dark blue shade, like a tattoo. A Shgabb is blotchy. Skin not very clean, but who knows about the skincare in this world? Overall a wild appearance, but also soft, and clean, like a diamond, but of a different substance. Want me to describe it in one word? Blue. - Pierre`),
    // new BookEntry(103, "", 1, 10, `Welelel`),

    // new BookEntry(100, "", 1, 10, `Welelel`),
]

const currenciary = [
    new BookEntry(1, "Shgabb", () => true, "...", "Shgabb is the first main currency, and is available from the very start of the game. It is primarily earned from clicking the click button and automatically every second. Its first upgrade, More Shgabb, is used as the main indicator of progress."),
    new BookEntry(2, "Sandwiches", () => unlockedSandwiches(), "Shgabb Upgrade", "Sandwiches are the second main currency, and are unlocked through the Sandwich Chance Shgabb Upgrade. They can be earned by clicking, and are primarily used for auto Shgabb production."),
    new BookEntry(3, "Golden Shgabb", () => unlockedGS(), "1M Shgabb", "Golden Shgabb is the third main currency, and it is unlocked at 1M Shgabb. It is earned from Prestiges, and can be spent on basic boosts."),
    new BookEntry(4, "Silicone Shgabb", () => unlockedSilicone(), "1B Shgabb", "Silicone Shgabb, also known as Silicone, is the fourth main currency, and is unlocked at 1B Shgabb. It is automatically produced every second and can be spent on minor boosts. Prestiging does not remove it."),
    new BookEntry(5, "Gems", () => unlockedGems(), "HMS 500", "Gems are the first side currency, unlocked at HMS 500. They can be spent on several offers, to earn Shgabb, Artifacts or more loadouts. Gems are not lost on a Prestige."),
    new BookEntry(6, "Artifact Scrap", () => unlockedArtifactUpgrading(), "Duplicate", "Artifact Scrap is the second side currency, unlocked after earning the first duplicate Artifact. Its sole purpose is upgrading Artifacts. It is earned from getting duplicates and destroying Artifacts. Artifact Scrap is kept on a Prestige."),
    new BookEntry(7, "Améliorer", () => unlockedAmeliorer(), "HMS 2000", "Améliorer, also known as Amé, is the fifth main currency, and is unlocked at HMS 2000. It can be bought with any of the first four main currencies, or later also from Shgic and Gems. It can only be earned in small amounts. It can be spent on many various upgrades. It is not lost when prestiging, unless that option is enabled, which gives a full refund."),
    new BookEntry(8, "Bags", () => unlockedBags(), "HMS 8000", "Bags are the sixth main currency, unlocked at HMS 8000, and can be earned from upgrading More Shgabb. They can be spent on a collection of upgrades."),
];

const featuriary = [
    new BookEntry(1, "Shbook", () => true, "...", "Welcome to the Shbook! Here you can find basic help for the game and explore the lore."),
    new BookEntry(2, "Prestige", () => unlockedGS(), "1M Shgabb", "Prestiging is unlocked at 1M Shgabb. Prestiging sacrifices most progress, such as Shgabb, Sandwiches and Upgrades, but gives Golden Shgabb in return."),
    new BookEntry(3, "Artifacts", () => unlockedArtifacts(), "HMS 1000", "Artifacts are unlocked at HMS 1000 and can be equipped for all kinds of effects, from simple to mind-blowing complicated. By default, up to 3 Artifacts can be equipped at the same time. Artifacts of the same type are multiplicative with each other. Artifacts can be found from clicking or bought with Gems, and the further you go, the more Artifacts you can find. Loadouts can be saved and loaded at any time."),
    new BookEntry(4, "Shgic Shgac Shgoe", () => unlockedAmeliorer(), "HMS 2000", "Shgic Shgac Shgoe (whatever that means) is unlocked along Améliorer. Every day you get the chance to win 2 Améliorer here by playing your cards right."),
    new BookEntry(5, "Challenges", () => unlockedChallenges(), "HMS 6000", "Challenges are unlocked at HMS 6000 and each offer a change to the gameplay. Starting a Challenge costs Gems and a Prestige. A Challenge can be beaten by reaching the required More Shgabb amount and then performing a Prestige. Each Challenge has a different reward, increasing with every tier: with every completion."),
];

function changeShbook(id, sel) {
    shbookSelections[id] = sel;

    renderShbook();
}

function selectLore(id) {
    game.loreSel = id;
    game.loreP = 0;
    renderLore();
}

function renderCurrenciary() {
    let render = "<div style='font-size: 40px'>Currencies</div><hr>";

    for (s in currenciary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: 24px; background-color: ` + (shbookSelections[1] == currenciary[s].getName() ? "yellow" : "white") + `" onclick="changeShbook(1, '` + currenciary[s].getName() + `')">` + (currenciary[s].isUnlocked() ? currenciary[s].getName() : "Locked [" + currenciary[s].lockedText + "]") + `</button>`
    }

    let thisCurrency = "";
    for (s in currenciary) {
        if (currenciary[s].getName() == shbookSelections[1]) thisCurrency = currenciary[s];
    }

    ui.shbookCurrenciary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisCurrency.isUnlocked() ? thisCurrency.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: 20px'>" + (thisCurrency.isUnlocked() ? thisCurrency.unlockedText : "Locked [" + thisCurrency.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[1] + "'>" + "Learn more (Wiki)" + "</a></button>";

    ui.shbookCurrenciary2.innerHTML = render;
}

function renderFeaturiary() {
    let render = "<div style='font-size: 40px'>Features</div><hr>";

    for (s in featuriary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: 24px; background-color: ` + (shbookSelections[2] == featuriary[s].getName() ? "yellow" : "white") + `" onclick="changeShbook(2, '` + featuriary[s].getName() + `')">` + (featuriary[s].isUnlocked() ? featuriary[s].getName() : "Locked [" + featuriary[s].lockedText + "]") + `</button>`
    }

    let thisFeature = "";
    for (s in featuriary) {
        if (featuriary[s].getName() == shbookSelections[2]) thisFeature = featuriary[s];
    }

    ui.shbookFeaturiary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisFeature.isUnlocked() ? thisFeature.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: 20px'>" + (thisFeature.isUnlocked() ? thisFeature.unlockedText : "Locked [" + thisFeature.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[2] + "'>" + "Learn more (Wiki)" + "</a></button>";

    ui.shbookFeaturiary2.innerHTML = render;
}

function renderLore() {
    let render = "<div style='font-size: 40px'>Lore</div><hr>";

    for (s in lore) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: 24px; background-color: ` + (shbookSelections[0] == lore[s].ID ? "yellow" : "white") + `" onclick="changeShbook(0, '` + lore[s].ID + `')">` + (lore[s].isUnlocked() ? lore[s].getName() : (lore[s].isFound() ? "Locked [#" + lore[s].ID + ", " + (lore[s].ID == game.loreSel ? game.loreP : "0") + "/" + lore[s].amount + "]" : "Not found")) + `</button>`
    }

    let thisLore = "";
    for (s in lore) {
        if (lore[s].ID == shbookSelections[0]) thisLore = lore[s];
    }
    
    ui.shbookLore.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisLore.isUnlocked() ? thisLore.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: 20px'>" + (thisLore.isUnlocked() ? thisLore.unlockedText : (thisLore.isFound() ? "Locked [#" + thisLore.ID + ", " + (thisLore.ID == game.loreSel ? game.loreP : "0") + "/" + thisLore.amount + "]" : "???")) + "</div>";
    if (thisLore.ID == 0) render = render + "<br />" + cImg("memoryWisp") + game.loreP + (game.loreSel != 0 ? ("<br /><br /> Currently collecting: #" + getLoreByID(game.loreSel).ID + "<br />" + game.loreP + "/" + getLoreByID(game.loreSel).amount) : "");
    else if (!thisLore.isUnlocked() && thisLore.isFound() && thisLore.ID != game.loreSel) render = render + "<br />" + "<button class='grayButton' onclick=selectLore(" + thisLore.ID + ") style='font-size: 40px'>Start collecting</button>";

    ui.shbookLore2.innerHTML = render;
}

function renderShbook() {
    if (game.stats.hms >= 25) {
        ui.shbookHeader.innerHTML = "Shbook";
        ui.shbook.style.display = "";
        renderLore();
        renderCurrenciary();
        renderFeaturiary();
    }
    else {
        ui.shbookHeader.innerHTML = "<div class='grayubtton'>Upgrade More Shgabb to level 100 to unlock the Shbook!</div>";
        ui.shbook.style.display = "none";
    }
}