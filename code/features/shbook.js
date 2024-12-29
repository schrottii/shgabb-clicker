// Schrottii - editing or stealing is prohibited!

var shbookSelections = [0, "Shgabb", "Shbook"];
var shbookSizeFactor = 10;

// Book Entry Class
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

// Everything Wisps and similar
function getWispType(typeID) {
    switch (typeID) {
        case 0:
            return "Free";
        case 1:
            return "Memory Wisps";
        case 2:
            return "Candles";
    }
}

function getWispRarity(typeID) {
    switch (typeID) {
        case 0:
            return 0;
        case 1:
            return 1 / 5000;
        case 2:
            return 1 / (666 * 6); // you get x6 during the event so
    }
}

function getWisp(multi = 1) {
    if (game.stats.hms >= 4000 && game.loreSel != 0 &&
        Math.random() <= getWispRarity(getLoreByID(game.loreSel).source) * multi * eventValue("shgabbthewitch", 6, 1)) {
        game.loreP += 1;

        checkCollectingLorePageCompleted();

        renderShbook();
    }
}

function checkCollectingLorePageCompleted() {
    // checks if the lore page you currently are collecting is done now (enough wisps)
    if (game.loreP >= getLoreByID(game.loreSel).amount) {
        game.lore.push(game.loreSel);
        game.lorepg.splice(game.lorepg.indexOf(game.loreSel), 1);
        game.loreSel = 0;
        game.loreP = 0;
        createNotification("Unlocked new lore!");
    }
}

// lore page functions
function getLorePage(multi = 1) {
    if (game.stats.hms >= 4000 && game.lorepg.length < 5 &&
        Math.random() <= 1 / 25000 * multi * eventValue("shgabbthewitch", 6, 1)) {
        let availablePages = [];
        for (l in lore) {
            if (!lore[l].isFound() && (lore[l].unlock != 2 || isEvent("shgabbthewitch"))) availablePages.push(lore[l].ID);
        }
        if (availablePages.length > 0) {
            createNotification("Found new lore!");
            game.lorepg.push(availablePages[Math.ceil(Math.random() * (availablePages.length - 1))]);
        }
        else {
            createNotification("All lore pages already found...");
        }
    }

    renderShbook();
}

function getLoreByID(id) {
    for (l in lore) {
        if (lore[l].ID == id) return lore[l];
    }
}

// THE BIG DICTIONARIES
const lore = [
    new BookEntry(0, "Info", 0, 0, "Lore pages can be found by clicking (1/25k base chance). When one is found, it is added to your inventory, which can store up to 5 pages. Found pages can be selected to start collecting progress for them. Depending on the page this can be Memory Wisps or Candles, which are both gained by simply clicking. Once a page is fully collected/researched, it is unlocked, and can be read, and can provide a GS boost. Only one page can be selected at the same time, and when there is no page selected, zero Wisps are earned."),

    // 100 - 199: Basic information about the lore, just rough edges
    new BookEntry(100, "Fascinating", 1, 4, `Fascinating. It's simply fascinating. I've seen many things in my life, and discovered more than Joe did - even if he says otherwise - and have seen some things you wouldn't believe... including my wife, hehe. But this thing, it's fascinating. What is this creature? It's fascinating. - Pierre`),
    new BookEntry(101, "A Shgabb", 1, 4, `This creature is fascinating. It's called "Shgabb", very weird name, it does not quite fit in with the language's usual combinations of vowels and consonants, it's like a foreign sound, but what I know for sure, is that this creature is as foreign as one can get. I haven't spectated it for long yet. This definitely needs more research. - Pierre`),
    new BookEntry(102, "The Blues", 1, 4, `I should describe this creature's appearance, this creature being, this "Shgabb" thing, the recently discovered whatever. It's round. That's the best way I can describe the shape. The color scheme is fascinating. Think of this creature as a light blue ball, with a capital S written all over its forehead in a dark blue shade, like a tattoo. A Shgabb is blotchy. Skin not very clean, but who knows about the skincare in this world? Overall a wild appearance, but also soft, and clean, like a diamond, but of a different substance. Want me to describe it in one word? Blue. - Pierre`),
    new BookEntry(103, "Not Alone", 1, 6, `I thought I was alone, just me and this blue blob, yes! A blob! It's a blob! Anyway - just me, and this little blob, but no. I was wrong. Yet again. Luckily the others are not here to laugh at me... whatever. There are many of them. It's not just one. This is an entire species. I have discovered something big. There is not just one Shgabb. There are many... what's the plural? Shgabbs? Shgabb? Shgabbou? What do I know. - Pierre`),
    new BookEntry(104, "Following It", 1, 10, `I've managed to follow one of these Shgabb beings, and track its path and activities. I caught it between the trees, if you can even call these things trees. Its movement is hypnotizing. Mesmerizing. Wicked. This little fella walked down the hill, very smooth, no knees hurt. Well, except mine. But that's a different story. I kept following it, trying to not get caught. These leaves are loud enough to wake a giant, but these blobs either don't hear well, or they're not paying attention. I was not sure if this thing knows where it's going. But I kept following it. We approached a river, I was afraid that I had to swim now, but was also excited in case it happens to show me how it drinks fluids. Neither happened, it took a big left turn and walked parallel to the river. Eventually we approached a less open area, with trees and other objects. A structure. The Shgabb entered the structure, it's gone. I don't fit in there. What is this thing? Regardless, this adventure was successful. I need to analyze this data. I was following it. - Pierre`),
    new BookEntry(105, "The Movement", 1, 3, `After a few days, my analysis of the recent events was complete. I am still fairly new to this place, it's a whole new type of research and exploration. I discovered a new species, The Shgabb, and while I have yet to touch one, I was successfully able to find three of them. Their movement is so interesting: they just walk, and the bottom of their body, I can't even call it feet, it just moves along. It's no rolling motion, but no actual movement either. It's like pushing an object, it just moves forward. - Pierre, analysis 1/3`),
    new BookEntry(106, "Analysis", 1, 3, `Further elements of my analysis outline the idea of what this creature might be. They are not very tall, less than a meter, a couple feet perchance. Could be a mammal or something else. It doesn't seem to be capable of flying. Unsure about swimming state. No smell discovered so far, probably hindered due to the river. Water covers your smell. The species appears to be harmless. Not a predator. Probably not. Quiet so far. More research is needed, but the current progress confirms the safety of proceeding this project. More funding would help. - Pierre, analysis 2/3`),
    new BookEntry(107, "Universal Notice", 1, 3, `For any readers of Pierre's Shgabb research project and analysis, it is important to know where the creatures were found. They are not on our home planet. I am not on our home planet. This planet, nicely referred to as "The Bluer Planet", has been observed as a possible new home for humanity, even before the war. Previous research has been done, including by survival expert Vihaan, who outlined the planet's general safety, climate and landscape. Without his great work, I wouldn't be able to dive into the planet's more specific content, to be exact, its wildlife. Mostly familiar, lots of mushrooms around here as well, but these blobs? Well, that's a new thing. - Pierre, analysis 3/3`),
    new BookEntry(108, "Funding for Finding", 1, 10, `It's been a while since the previous entry... but it has been a productive stretch of days. A new group has been created specifically for this project, the Shgabb Research Group. As the one who discovered the creature for the first time, I am the head leader of the group. Other members analyze the info that I provide, or make theories, or... art? Maybe one day they will create stuffed animals of Shgabb! I would buy a few and cuddle with them, aww! Also, the group has received major funding - overall this is essential help for the continuation of my research! I have found something great, I am working on something great, and other scientists and researchers are waiting for the next findings. Now I have a group to assist me, I have the recognition, and the money. It's a nice place here, and I am in a nice place. Time to go outside again. - Pierre`),
    new BookEntry(109, "Following It II", 1, 3, `Following the creation of the group and the funding, the time arrived to head out for another round of Shgabb research. I went outside my little research hut, and went to the same place where I have found them before. I picked some berries, interesting colors, not sure if I should eat them. Before I could make an educated decision on whether I should eat them, and by this I mean a clear NO, because I am not stupid, anyway, while I was looking at the berries in my hand, I noticed that a little Shgabb peeked up on me. Staring right at them berries. "sAww, are you hungry? Can you eat this? Do you want to eat this?"e`),
    // new BookEntry(105, "Analysis", 1, 10, ``),

    // 200 - 209 : Shgabb The Witch
    new BookEntry(200, "October Occurrence", 2, 1, `I was just doing my usual research - but something was off about this October night. I wasted all noon and just got ready for some effort, but it simply didn't feel right. I started to feel anxious. Is it just because of my research presentation? No, there was certainly something else going on... late October has never been a good time for me. Before I was able to stop myself, I was sucked into a new branch of research. - Pierre`),
    new BookEntry(201, "Nightfall", 2, 2, `I smelled the smell of an evil pumpkin, thus I promptly left through the back door and went looking for the source. Then I saw something truly terrifying. There were pumpkins on the sidewalk. Terrifying! Why are they here? And... why is it this dark... in the early evening? Did I oversleep? No, not today... this is not normal. Something cursed must be going on. This is not normal darkness. This is paranormal darkness. - Pierre`),
    new BookEntry(202, "Red Forest", 2, 3, `The evil pumpkins and strong darkness were not the only unusual thing. They did not want to be the only unusual thing. Things got worse. As I approached the very forest I know so well, the anxious feeling skyrocketed, and any process of forming thoughts was cancelled. The forest was painted in an extra-dark black with a red glow, and a terrifying presence. The voices of pumpkins got into my head, and footsteps were to be heard from behind. I had no choice but to run into darker and darker areas. Rational thinking died. Pure fear was born. All I knew was fright. My emotions were torn. - Pierre`),
    new BookEntry(203, "Shgabb The Witch", 2, 4, `I've been sitting alone in my hut for a while now, alone in the forest, no other soul around. Ít's so deep in the woods, visitors come rarely. There was only one in recent memory, I love her! But am I her love too? Until then, I remain sole. Well. Except for this bearded being that entered my range - a human man found my woodhidden hut! He is called Pierre, the one who runs from pumpkins. "sLet's collect some of them and make some stew"e, I offered, but he refused. It seemed that my appearance confused him. "sHave you never seen a magical Shgabb before?"e and he answered: "sI... well... you are a witch! You are Shgabb The Witch! Please let me live!"e Aww, he does not want to hear of my most powerful and destructive spells. But he seems to be alright. I'll give this dude a chance. - Ragobba`),
    new BookEntry(204, "New Night", 2, 5, `Normally, human men are not allowed in my area. But I made an exception for this one. So I asked, "sAre you okay?"e because he really looked anything but okay. "sNo. I am scared. My mind is playing tricks on me and the darkness is supernatural. Do you know what's going on?"e Luckily for him, I am a witch, so I know exactly what is going on here! "sOf course I know. It's Halloween, the spooky season where the spirits unleash their souls and homing horrors arise again."e "sI was a kid, too. Many years ago. I know all the childish traditions. But this is not normal. That's not just kids dressing up as ghosts or stones - something weirder is happening. I've been doing research near this forest for a good while now, sometimes I go for a walk, but I haven't made it this deep into the woods yet, and I have not seen such a night before. Please tell me any details you know. It will help my research."e I looked back and forth between the framed picture and his dirty glasses - I like being a friendly blob, though for priorities and his dull-research guts... it can't hurt more than the wait. I will help. - Ragobba`),
    new BookEntry(205, "3 Year Curse", 2, 6, `<3, the paper reads. "sYes, I haven't been here for that long. You've been here for much longer."e "sCorrect. Every 3 years, around this time, something terrifying, dark, soul-breaking happens. Or maybe it's just an illusion."e "sI don't want to believe it."e "sJust watch it for long enough and you will go crazy. I'm crazy, but I know you like that, you are just like that."e The page turns. The light goes dark. - Ragobba`),
    new BookEntry(206, "Actual Magic", 2, 7, `The man asks, "sSo you can do actual magic? It's not just make believe?"e "sCorrect, but it's not of the safe kind. It can always go wrong. There are positive spells, holy spells, negative effects and the cosmetic effects. I didn't actually buy these clothes, I created them. Do you want some?"e "sI don't think they would fit... but do any of your spells lift the dark? I really need some light."e "sGreat minds should never give up and seek for the next chance. This spell can go wrong, but I believe it should be just what's in need. Not of that type, but regardless, a safe way home."e I threw the rare flower components into the volcaneous pot and stirred a throbbing soup, albeit lightbug-licked candy give no sun until cracked wide open. I threw the wrenches to make the light emerge. - Ragobba`),
    new BookEntry(207, "Forest Observations", 2, 8, `Waiting as she was brewing her light, preparing to show me the way to make it back to where I belong, and return to the life I liked. My eyes noticed certain events occuring in the near distance, just a few trees off the windows. It's the pumpkins. Different types of love are possible. I took another sip of my fuming tea, taken from the knitted heater, oh what a cosmetic spell can do. The atmosphere can get uptight. Who are they chasing? The things that I have seen that night - sleep is only possible in the past. Why can I see if the sky is beyond any shade of black? Would I want to see more than that? I have seen enough. If this happens every third year, my next vacation is planned. There's no normal life outside - just the cold fog, the dark darkness, and the orange assassins. The air gets colder. - Pierre`),
    new BookEntry(208, "Glowing Spell", 2, 9, `Finally, the spell finished. And it's just what I wanted. Pierre asks, "sHow do I use this? And will it really protect me from the orange assassins?"e I take a closer look at the points, and emit audio: "sTake it and rub it against the trees. Take down as many as you can. Avoid other targets. Live will lead you your way."e "sGreat, I trust your words that it will work. But will we ever see again?"e "sOf course, we are officially friends now!"e (now, now, now...) ... He accepted the task, took the glowing spell and left. It has been a few hours since he left. I wonder how he feels. Maybe the roles should be the other way around, but where does any way lead anyway? Witch life can be lonely - one of the three things no legendary spell can give. I will work on another spell and wait for what comes to me later this week. - Ragobba`),
    new BookEntry(209, "5000-0", 2, 10, `I thought it was a lot of work up to that point, but it only got harder. The initial shock of the darkness broke my plans, but the duration is numbing. She gave me the glowing spell, and I went out to use it. One tree and another tree. Another tree. Another tree. Soon enough, the forest was caught in my web of light, like a star you can see from space. A 5000-0 victory. Me against the forest and its spooks. I won. I was exhausted, but there was no need to run any further. It has been illuminated. I was finally able to find a clear path, but it was not the one I came from. Not the way home, not the way to the hut: down to a river, next to which I found a shrine. Covered in candles, pictures, cheese and clothes. I think I have seen these pictures before... still not so sure. But it could be the same as I saw in the hut. It wasn't among the weirdest things I saw that night, it did not deserve more of my attention. I followed the river down to a lonely town, and getting back home was not back on my mind for the next day. This town is not the best place, but I can feel safe enough here. I'm staying here until the night ends. And it's a new place to explore, which is perfect for my research work. Maybe I can meet some people... but after everything that happened tonight, I might not want to. Too exciting. I need to get back. I need to get back. But not now. Not now. Good night. - Pierre`),


    // new BookEntry(100, "", 1, 10, `Welelel`),
]

const currenciary = [
    new BookEntry(1, "Shgabb", () => true, "...", "Shgabb is the first main currency, and is available from the very start of the game. It is primarily earned from clicking the click button, but later on it can also be earned automatically, or immediately after a Prestige. Its first upgrade, More Shgabb, is used as the main indicator of progress. It unlocks the majority of content in the game, including the Shbook at 25, Player Profile at 100, most other Shgabb Upgrades, and more. Automatic Shgabb production becomes available with Sandwiches, the second currency."),
    new BookEntry(2, "Sandwiches", () => unlockedSandwiches(), "Sandwich Chance (Shgabb Upgrade)", "Sandwiches are the second main currency, and are unlocked through the Sandwich Chance Shgabb Upgrade. They can be earned by clicking, and are primarily used for auto Shgabb production. The first upgrade, Auto Shgabb, adds a flat amount of Shgabb that gets produced every second. It is affected by many boosts. Later, the Cheese upgrade can increase auto production by a percentage of the click production.<br /><br />It is important to note that Sandwiches are stored in the fridge. The fridge has a duration of 60 seconds, by default, until it stops cooling them. When the fridge is off, auto boosts stop working (to prevent going completely AFK for a long time). With upgrades the duration can be extended to 5 minutes. The fridge can be refreshed by most acts of clicking, including upgrading - even if the upgrade is already maxed or too expensive."),
    new BookEntry(3, "Golden Shgabb", () => unlockedGS(), "1M Shgabb", "Golden Shgabb is the third main currency, and it is unlocked at 1M Shgabb. It is earned from Prestiges, and can be spent on basic boosts."),
    new BookEntry(4, "Silicone Shgabb", () => unlockedSilicone(), "1B Shgabb", "Silicone Shgabb, also known as Silicone, is the fourth main currency, and is unlocked at 1B Shgabb. It is automatically produced every second and can be spent on minor boosts. Silicone automatically boosts Shgabb from clicks and auto! The boost is based on current Silicone, total play time (up to 3M) and Upgrades that increase it. It is not reset when doing a Prestige."),
    new BookEntry(5, "Gems", () => unlockedGems(), "HMS 500", "Gems are the first side currency, unlocked at HMS 500. They can be spent on several offers, to earn Shgabb, Artifacts or more loadouts. Gems are not lost on a Prestige."),
    new BookEntry(6, "Artifact Scrap", () => unlockedArtifactUpgrading(), "Duplicate Artifact", "Artifact Scrap is the second side currency, unlocked after earning the first duplicate Artifact. Its sole purpose is upgrading Artifacts. It is earned from getting duplicates and destroying Artifacts. Artifact Scrap is kept on a Prestige."),
    new BookEntry(7, "Améliorer", () => unlockedAmeliorer(), "HMS 2000", "Améliorer, also known as Amé, is the fifth main currency, and is unlocked at HMS 2000. It can be bought with any of the first four main currencies, or later also from Shgic and Gems. It can only be earned in small amounts. It can be spent on many various upgrades. It is not lost when prestiging, unless that option is enabled, which gives a full refund."),
    new BookEntry(8, "Chengas", () => unlockedChengas(), "HMS 5000", "Chengas are the third side currency. They can be used to change the ad boost that's being offered. Doing so consumes 1 Chenga, and then the offer does not expire, and can be changed infinite times without consuming more. There is a 10% chance to get a Chenga after watching any ad."),
    new BookEntry(9, "Bags", () => unlockedBags(), "HMS 8000", "Bags are the sixth main currency, unlocked at HMS 8000, and can be earned from upgrading More Shgabb. They can be spent on a collection of upgrades."),
    new BookEntry(10, "Copper Shgabb", () => unlockedCopper(), "HMS 10 000", "Copper is the seventh main currency, unlocked at HMS 10 000. It can be earned by clicking, starting with a 1% chance. Its value inflates quickly."),
    new BookEntry(11, "Pearls", () => unlockedFishing(), "HMS 12 000", "Pearls are the fourth side currency, earned from Fishgang level ups. They can be spent on minor boosts. It is possible to reset and refund all Pearls every new level up."),
];

const featuriary = [
    new BookEntry(1, "Shbook", () => true, "...", "Welcome to the Shbook! Here you can find basic help for the game and explore the lore. The Shbook consists of three parts: the Currenciary, Featuriary, and the Lore (unlocked at HMS 4000). Navigate between the three parts at the top, and their individual contents with the list on the left side.<br /><br />Lore: Once unlocked, pages can be found and selected, to unlock the lore of the game.<br />Currenciary: A list of currencies in the game with short descriptions of how to get them and what they do.<br />Featuriary: A list of features in the game with explanations.<br /><br />Content in the Currenciary and Featuriary can only be read after unlocking it, but if you are too curious, the link to the corresponding wiki article at the bottom is always available!"),
    new BookEntry(2, "Prestige", () => unlockedGS(), "1M Shgabb", "Prestiging is unlocked at 1M Shgabb. Prestiging sacrifices most progress, such as Shgabb, Sandwiches and Upgrades, but gives Golden Shgabb in return."),
    new BookEntry(3, "Artifacts", () => unlockedArtifacts(), "HMS 1000", "Artifacts are unlocked at HMS 1000 and can be equipped for all kinds of effects, from simple to mind-blowing complicated. By default, up to 3 Artifacts can be equipped at the same time. Artifacts of the same type are multiplicative with each other. Artifacts can be found from clicking or bought with Gems, and the further you go, the more Artifacts you can find. Loadouts can be saved and loaded at any time."),
    new BookEntry(4, "Shgic Shgac Shgoe", () => unlockedAmeliorer(), "HMS 2000", "Shgic Shgac Shgoe (whatever that means) is unlocked along Améliorer. Every day you get the chance to win 2 Améliorer here by playing your cards right."),
    new BookEntry(5, "Challenges", () => unlockedChallenges(), "HMS 6000", "Challenges are unlocked at HMS 6000 and each offer a change to the gameplay. Starting a Challenge costs Gems and a Prestige. A Challenge can be beaten by reaching the required More Shgabb amount and then performing a Prestige. Each Challenge has a different reward, increasing with every tier: with every completion."),
    new BookEntry(6, "Fishgang", () => unlockedFishing(), "HMS 12 000", "Fishgang (also known as Fishing) is the second minigame, unlocked at HMS 12000. It is rather complex. The player can choose how far to throw the rod, further distances are more difficult, but also more valuable. The player can catch trash or fish, which award XP that contribute to level ups which award Pearls."),
];

// general shbook functions
function shbookSize() {
    shbookSizeFactor = ui.shbookSizeSlider.value;
    renderShbook();
}

function changeShbook(id, sel) {
    // id: 0 lore 1 currenciary 2 featuriary
    shbookSelections[id] = sel;

    if (id == 0 && sel == game.loreSel) checkCollectingLorePageCompleted();

    renderShbook();
}

function selectLore(id) {
    game.loreSel = id;
    game.loreP = 0;
    renderLore();
}

// the 4 renders: currenciary, featuriary, lore and shbook in general
function renderCurrenciary() {
    let render = "<div style='font-size: " + (innerWidth >= 768 ? 40 : 20) + "px'>Currencies</div><hr>";

    for (s in currenciary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: ` + (innerWidth >= 768 ? 24 : 16) + `px; background-color: ` + (shbookSelections[1] == currenciary[s].getName() ? "yellow" : "white") + `" onclick="changeShbook(1, '` + currenciary[s].getName() + `')">` + (currenciary[s].isUnlocked() ? currenciary[s].getName() : "Locked [" + currenciary[s].lockedText + "]") + `</button>`
    }

    let thisCurrency = "";
    for (s in currenciary) {
        if (currenciary[s].getName() == shbookSelections[1]) thisCurrency = currenciary[s];
    }

    ui.shbookCurrenciary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisCurrency.isUnlocked() ? thisCurrency.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisCurrency.isUnlocked() ? thisCurrency.unlockedText : "Locked [" + thisCurrency.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[1] + "'>" + (thisCurrency.isUnlocked() ? "Learn more (Wiki)" : "Wiki (Spoilers)") + "</a></button>";

    ui.shbookCurrenciary2.innerHTML = render;
}

function renderFeaturiary() {
    let render = "<div style='font-size: " + (innerWidth >= 768 ? 40 : 20) + "px'>Features</div><hr>";

    for (s in featuriary) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: ` + (innerWidth >= 768 ? 24 : 16) + `px; background-color: ` + (shbookSelections[2] == featuriary[s].getName() ? "yellow" : "white") + `" onclick="changeShbook(2, '` + featuriary[s].getName() + `')">` + (featuriary[s].isUnlocked() ? featuriary[s].getName() : "Locked [" + featuriary[s].lockedText + "]") + `</button>`
    }

    let thisFeature = "";
    for (s in featuriary) {
        if (featuriary[s].getName() == shbookSelections[2]) thisFeature = featuriary[s];
    }

    ui.shbookFeaturiary.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisFeature.isUnlocked() ? thisFeature.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisFeature.isUnlocked() ? thisFeature.unlockedText : "Locked [" + thisFeature.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + shbookSelections[2] + "'>" + (thisFeature.isUnlocked() ? "Learn more (Wiki)" : "Wiki (Spoilers)") + "</a></button>";

    ui.shbookFeaturiary2.innerHTML = render;
}

function renderLore() {
    let render = "<div style='font-size: " + (innerWidth >= 768 ? 40 : 20) + "px'>Lore</div><hr>";

    for (s in lore) {
        render = render + `<br /><button class="grayButton" style="width: 100%; font-size: ` + (innerWidth >= 768 ? 24 : 16) + `px; background-color: ` + (shbookSelections[0] == lore[s].ID ? "yellow" : "white") + `" onclick="changeShbook(0, '` + lore[s].ID + `')">` + (lore[s].isUnlocked() ? lore[s].getName() : (lore[s].isFound() ? "Locked [#" + lore[s].ID + ", " + (lore[s].ID == game.loreSel ? game.loreP : "0") + "/" + lore[s].amount + "]" : "Not found")) + `</button>`
    }

    let thisLore = "";
    for (s in lore) {
        if (lore[s].ID == shbookSelections[0]) thisLore = lore[s];
    }

    ui.shbookLore.innerHTML = render;
    render = "<div style='font-size: 40px'>" + (thisLore.isUnlocked() ? thisLore.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisLore.isUnlocked() ? thisLore.unlockedText.replace(new RegExp('"s', 'g'), `<br>>>"`).replace(new RegExp('"e', 'g'), `"<<`) : (thisLore.isFound() ? "Locked [#" + thisLore.ID + ", " + (thisLore.ID == game.loreSel ? game.loreP : "0") + "/" + thisLore.amount + "]" : "???")) + "</div>";

    if (thisLore.ID == 0) {
        // info page
        render = render + "<br /><br /><div style='font-size: " + (1.6 * shbookSizeFactor) + "px'>Current page progress:<br />" +
            cImg(getLoreByID(game.loreSel).source == 1 || getLoreByID(game.loreSel).name == "Info" ? "memoryWisp" : "candle") + game.loreP + (getLoreByID(game.loreSel).name == "Info" ? "" : "/" + getLoreByID(game.loreSel).amount)
            + (game.loreSel != 0 ? ("<br /><br /> Currently collecting: #" + getLoreByID(game.loreSel).ID + "<br />" + (game.loreP / getLoreByID(game.loreSel).amount * 100)) + "%" : "<br />Currently not collecting progress for any page! Select one to start collecting!")
            + "<br /><br />Lore pages currently in inventory (" + game.lorepg.length + "/5): " + game.lorepg + "."
            + "<br /><br />" + game.lore.length + "/" + (lore.length - 1) + " lore pages unlocked! Boost: x" + fn(getLoreBoost()) + " GS!</div>";
    }
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
        ui.shbookHeader.innerHTML = "<div class='grayubtton'>Upgrade More Shgabb to level 25 to unlock the Shbook!</div>";
        ui.shbook.style.display = "none";
    }
}