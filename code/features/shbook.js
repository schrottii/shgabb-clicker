// Schrottii - editing or stealing is prohibited!

///////////////////////////////////
// Variables and essentials   #7368626F6F6B
///////////////////////////////////

var shbookSelections = {
    "lore": 0,
    "missions": "2601",
    "currenciary": 1,
    "featuriary": 1,
    "upgcalc": 0,
    "events": 1
};

var shbookSelectionsNames = ["lore", "missions", "currenciary", "featuriary", "upgcalc", "events"];
var shbookSizeFactor = 10;
var currentYear = new Date().getUTCFullYear();

function shbookSize() {
    shbookSizeFactor = ui.shbookSizeSlider.value;
    renderShbook();
}

function changeShbook(id, sel) {
    // id: 0 lore 1 currenciary 2 featuriary 3 calculator 4 events
    selectedCalcUpg = "";
    shbookSelections[id] = sel;

    if (id == "lore" && sel == game.loreSel) checkCollectingLorePageCompleted();
    renderShbook();
}

function renderGetShbookTitle(title) {
    ui.shbookSectionTitle.innerHTML = title;
}

function renderGetShbookLeft(index, title, list, sName) {
    let scrollBefore = document.getElementById("shbookList") != null ? document.getElementById("shbookList").scrollTop : 0;
    let render = "<div style='font-size: " + (innerWidth >= 768 ? 40 : 20) + "px;'>" + title + "</div><hr>";

    render = render + "<div id='shbookList' style='text-align: center; max-height: 640px; width: 100%; overflow-y: scroll; overflow-x: none'>";

    let bgColor;
    for (let s in list) {
        bgColor = (shbookSelections[index] == (index == "upgcalc" ? s : list[s].ID) ? "rgb(80, 160, 20)" : "rgb(40, 40, 40)");
        render = render + `<button class="grayButton" 
        style="width: 95%; margin-bottom: 2px; color: white; font-size: ` + (innerWidth >= 768 ? 24 : 16) + `px; 
        background-color: ` + bgColor + `; border-radius: 8px; border-color: ` + rgbManipulator(bgColor, 0.75)
            + `" onclick="changeShbook('` + index + `', '` + (index == "upgcalc" ? s : list[s].ID) + `')">`
            + sName(s) + `</button>`
    }

    render = render + "</div>";
    ui.shbookLeft.innerHTML = render;
    document.getElementById("shbookList").scrollTop = scrollBefore;
}

function theShbookIsDead() {
    sections.shbook1.style.display = "none";
}

function renderShbook(auto = false) {
    if (game.stats.hms >= 25) {
        sections.shbook1.style.display = "";
        ui.shbookHeader.innerHTML = "Shbook";
        ui.shbookArea.style.display = "";

        switch (selections[3]) {
            case "none":
                theShbookIsDead();
                break;
            case "shbook1":
                renderLore();
                break;
            case "shbook2":
                renderMissions();
                break;
            case "shbook3":
                renderCurrenciary();
                break;
            case "shbook4":
                renderFeaturiary();
                break;
            case "shbook5":
                if (!auto) renderUpgradeCalculator();
                break;
            case "shbook6":
                renderShbookEvent();
                break;
        }
    }
    else {
        ui.shbookHeader.innerHTML = "<div class='graybutton'>Upgrade More Shgabb to level 25 to unlock the Shbook!</div>";
        ui.shbookArea.style.display = "none";
    }
}

function helpSection1() {
    if (game.stats.hms < 25) return false;
    let tbl = {
        "shgabb": 1,
        "sandwich": 2,
        "goldenShgabb": 3,
        "siliconeShgabb": 4,
        "ameliorer": 7,
        "bags": 10,
        "copper": 11,
        "bananas": 14
    };
    shbookSelections.currenciary = tbl[selections[0]];
    selections[3] = "shbook2";

    location.href = '#shbookArea';
    renderShbook();
}

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
        else if (this.ID > 99 && this.ID < 1000) {
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

    getName(raw = false) {
        if (this.ID > 99 && this.ID < 1000) {
            return cImg(getWispImage(this.source))
                + "[" + this.ID + "] "
                + this.name;
        }
        else {
            if (raw) return this.name().split("/>")[1];
            return typeof (this.name) == "function" ? this.name() : this.name;
        }
    }

    getLoreLocked() {
        return cImg(getWispImage(this.source))  + " Locked [#" + this.ID + ", " + (this.ID == game.loreSel ? game.loreP : "0") + "/" + this.amount + "]";
    }

    getLockedName() {
        if (this.ID > 99 && this.ID < 1000) {
            return cImg(getWispImage(this.source))
                + " Not found";
        }
        else {
            return "Locked";
        }
    }
}

///////////////////////////////////
// LORE RELATED   #7368626F6F6B
///////////////////////////////////

const lore = [
    new BookEntry(0, "Info", 0, 0, "Lore pages can be found by clicking (1/7k base chance). When one is found, it is added to your inventory, which can store up to 5 pages. Found pages can be selected to start collecting progress for them. Depending on the page this can be Memory Wisps or Candles, which are both gained by simply clicking. Once a page is fully collected/researched, it is unlocked, and can be read, and can provide a GS boost. Only one page can be selected at the same time, and when there is no page selected, zero Wisps are earned."),

    // 100 - 199: Basic information about the lore, just rough edges
    new BookEntry(100, "Fascinating", 1, 4, `Fascinating. It's simply fascinating. I've seen many things in my life, and discovered more than Joe did - even if he says otherwise - and have seen some things you wouldn't believe... including my wife, hehe. But this thing, it's fascinating. What is this creature? It's fascinating. - Pierre`),
    new BookEntry(101, "A Shgabb", 1, 4, `This creature is fascinating. It's called "shgabb", very weird name, it does not quite fit in with the language's usual combinations of vowels and consonants, it's like a foreign sound, but what I know for sure, is that this creature is as foreign as one can get. I haven't spectated it for long yet. This definitely needs more research. - Pierre`),
    new BookEntry(102, "The Blues", 1, 4, `I should describe this creature's appearance, this creature being, this @shgabb" thing, the recently discovered whatever. It's round. That's the best way I can describe the shape. The color scheme is fascinating. Think of this creature as a light blue ball, with a capital S written all over its forehead in a dark blue shade, like a tattoo. A Shgabb is blotchy. Skin not very clean, but who knows about the skincare in this world? Overall a wild appearance, but also soft, and clean, like a diamond, but of a different substance. Want me to describe it in one word? Blue. - Pierre`),
    new BookEntry(103, "Not Alone", 1, 6, `I thought I was alone, just me and this blue blob, yes! A blob! It's a blob! Anyway - just me, and this little blob, but no. I was wrong. Yet again. Luckily the others are not here to laugh at me... whatever. There are many of them. It's not just one. This is an entire species. I have discovered something big. There is not just one Shgabb. There are many... what's the plural? Shgabbs? Shgabb? Shgabbou? What do I know. - Pierre`),
    new BookEntry(104, "Following It", 1, 10, `I've managed to follow one of these Shgabb beings, and track its path and activities. I caught it between the trees, if you can even call these things trees. Its movement is hypnotizing. Mesmerizing. Wicked. This little fella walked down the hill, very smooth, no knees hurt. Well, except mine. But that's a different story. I kept following it, trying to not get caught. These leaves are loud enough to wake a giant, but these blobs either don't hear well, or they're not paying attention. I was not sure if this thing knows where it's going. But I kept following it. We approached a river, I was afraid that I had to swim now, but was also excited in case it happens to show me how it drinks fluids. Neither happened, it took a big left turn and walked parallel to the river. Eventually we approached a less open area, with trees and other objects. A structure. The Shgabb entered the structure, it's gone. I don't fit in there. What is this thing? Regardless, this adventure was successful. I need to analyze this data. I was following it. - Pierre`),
    new BookEntry(105, "The Movement", 1, 3, `After a few days, my analysis of the recent events was complete. I am still fairly new to this place, it's a whole new type of research and exploration. I discovered a new species, The Shgabb, and while I have yet to touch one, I was successfully able to find three of them. Their movement is so interesting: they just walk, and the bottom of their body, I can't even call it feet, it just moves along. It's no rolling motion, but no actual movement either. It's like pushing an object, it just moves forward. - Pierre, analysis 1/3`),
    new BookEntry(106, "Analysis", 1, 3, `Further elements of my analysis outline the idea of what this creature might be. They are not very tall, less than a meter, a couple feet perchance. Could be a mammal or something else. It doesn't seem to be capable of flying. Unsure about swimming state. No smell discovered so far, probably hindered due to the river. Water covers your smell. The species appears to be harmless. Not a predator. Probably not. Quiet so far. More research is needed, but the current progress confirms the safety of proceeding this project. More funding would help. - Pierre, analysis 2/3`),
    new BookEntry(107, "Universal Notice", 1, 3, `For any readers of Pierre's Shgabb research project and analysis, it is important to know where the creatures were found. They are not on our home planet. I am not on our home planet. This planet, nicely referred to as "The Bluer Planet", has been observed as a possible new home for humanity, even before the war. Previous research has been done, including by survival expert Vihaan, who outlined the planet's general safety, climate and landscape. Without his great work, I wouldn't be able to dive into the planet's more specific content, to be exact, its wildlife. Mostly familiar, lots of mushrooms around here as well, but these blobs? Well, that's a new thing. - Pierre, analysis 3/3`),
    new BookEntry(108, "Funding for Finding", 1, 10, `It's been a while since the previous entry... but it has been a productive stretch of days. A new group has been created specifically for this project, the Shgabb Research Group. As the one who discovered the creature for the first time, I am the head leader of the group. Other members analyze the info that I provide, or make theories, or... art? Maybe one day they will create stuffed animals of Shgabb! I would buy a few and cuddle with them, aww! Also, the group has received major funding - overall this is essential help for the continuation of my research! I have found something great, I am working on something great, and other scientists and researchers are waiting for the next findings. Now I have a group to assist me, I have the recognition, and the money. It's a nice place here, and I am in a nice place. Time to go outside again. - Pierre`),
    new BookEntry(109, "Following It II", 1, 3, `Following the creation of the group and the funding, the time arrived to head out for another round of Shgabb research. I went outside my little research hut, and went to the same place where I have found them before. I picked some berries, interesting colors, not sure if I should eat them. Before I could make an educated decision on whether I should eat them, and by this I mean a clear NO, because I am not stupid, anyway, while I was looking at the berries in my hand, I noticed that a little Shgabb peeked up on me. Staring right at them berries. @sAww, are you hungry? Can you eat this? Do you want to eat this?@e`),

    // 200 - 209: Shgabb The Witch
    new BookEntry(200, "October Occurrence", 2, 1, `I was just doing my usual research - but something was off about this October night. I wasted all noon and just got ready for some effort, but it simply didn't feel right. I started to feel anxious. Is it just because of my research presentation? No, there was certainly something else going on... late October has never been a good time for me. Before I was able to stop myself, I was sucked into a new branch of research. - Pierre`),
    new BookEntry(201, "Nightfall", 2, 2, `I smelled the smell of an evil pumpkin, thus I promptly left through the back door and went looking for the source. Then I saw something truly terrifying. There were pumpkins on the sidewalk. Terrifying! Why are they here? And... why is it this dark... in the early evening? Did I oversleep? No, not today... this is not normal. Something cursed must be going on. This is not normal darkness. This is paranormal darkness. - Pierre`),
    new BookEntry(202, "Red Forest", 2, 3, `The evil pumpkins and strong darkness were not the only unusual thing. They did not want to be the only unusual thing. Things got worse. As I approached the very forest I know so well, the anxious feeling skyrocketed, and any process of forming thoughts was cancelled. The forest was painted in an extra-dark black with a red glow, and a terrifying presence. The voices of pumpkins got into my head, and footsteps were to be heard from behind. I had no choice but to run into darker and darker areas. Rational thinking died. Pure fear was born. All I knew was fright. My emotions were torn. - Pierre`),
    new BookEntry(203, "Shgabb The Witch", 2, 4, `I've been sitting alone in my hut for a while now, alone in the forest, no other soul around. Ít's so deep in the woods, visitors come rarely. There was only one in recent memory, I love her! But am I her love too? Until then, I remain sole. Well. Except for this bearded being that entered my range - a human man found my woodhidden hut! He is called Pierre, the one who runs from pumpkins. @sLet's collect some of them and make some stew@e, I offered, but he refused. It seemed that my appearance confused him. @sHave you never seen a magical Shgabb before?@e and he answered: @sI... well... you are a witch! You are Shgabb The Witch! Please let me live!@e Aww, he does not want to hear of my most powerful and destructive spells. But he seems to be alright. I'll give this dude a chance. - Ragobba`),
    new BookEntry(204, "New Night", 2, 5, `Normally, human men are not allowed in my area. But I made an exception for this one. So I asked, @sAre you okay?@e because he really looked anything but okay. @sNo. I am scared. My mind is playing tricks on me and the darkness is supernatural. Do you know what's going on?@e Luckily for him, I am a witch, so I know exactly what is going on here! @sOf course I know. It's Halloween, the spooky season where the spirits unleash their souls and homing horrors arise again.@e @sI was a kid, too. Many years ago. I know all the childish traditions. But this is not normal. That's not just kids dressing up as ghosts or stones - something weirder is happening. I've been doing research near this forest for a good while now, sometimes I go for a walk, but I haven't made it this deep into the woods yet, and I have not seen such a night before. Please tell me any details you know. It will help my research.@e I looked back and forth between the framed picture and his dirty glasses - I like being a friendly blob, though for priorities and his dull-research guts... it can't hurt more than the wait. I will help. - Ragobba`),
    new BookEntry(205, "3 Year Curse", 2, 6, `<3, the paper reads. @sYes, I haven't been here for that long. You've been here for much longer.@e @sCorrect. Every 3 years, around this time, something terrifying, dark, soul-breaking happens. Or maybe it's just an illusion.@e @sI don't want to believe it.@e @sJust watch it for long enough and you will go crazy. I'm crazy, but I know you like that, you are just like that.@e The page turns. The light goes dark. - Ragobba`),
    new BookEntry(206, "Actual Magic", 2, 7, `The man asks, @sSo you can do actual magic? It's not just make believe?@e @sCorrect, but it's not of the safe kind. It can always go wrong. There are positive spells, holy spells, negative effects and the cosmetic effects. I didn't actually buy these clothes, I created them. Do you want some?@e @sI don't think they would fit... but do any of your spells lift the dark? I really need some light.@e @sGreat minds should never give up and seek for the next chance. This spell can go wrong, but I believe it should be just what's in need. Not of that type, but regardless, a safe way home.@e I threw the rare flower components into the volcaneous pot and stirred a throbbing soup, albeit lightbug-licked candy give no sun until cracked wide open. I threw the wrenches to make the light emerge. - Ragobba`),
    new BookEntry(207, "Forest Observations", 2, 8, `Waiting as she was brewing her light, preparing to show me the way to make it back to where I belong, and return to the life I liked. My eyes noticed certain events occuring in the near distance, just a few trees off the windows. It's the pumpkins. Different types of love are possible. I took another sip of my fuming tea, taken from the knitted heater, oh what a cosmetic spell can do. The atmosphere can get uptight. Who are they chasing? The things that I have seen that night - sleep is only possible in the past. Why can I see if the sky is beyond any shade of black? Would I want to see more than that? I have seen enough. If this happens every third year, my next vacation is planned. There's no normal life outside - just the cold fog, the dark darkness, and the orange assassins. The air gets colder. - Pierre`),
    new BookEntry(208, "Glowing Spell", 2, 9, `Finally, the spell finished. And it's just what I wanted. Pierre asks, @sHow do I use this? And will it really protect me from the orange assassins?@e I take a closer look at the points, and emit audio: @sTake it and rub it against the trees. Take down as many as you can. Avoid other targets. Live will lead you your way.@e @sGreat, I trust your words that it will work. But will we ever see again?@e @sOf course, we are officially friends now!@e (now, now, now...) ... He accepted the task, took the glowing spell and left. It has been a few hours since he left. I wonder how he feels. Maybe the roles should be the other way around, but where does any way lead anyway? Witch life can be lonely - one of the three things no legendary spell can give. I will work on another spell and wait for what comes to me later this week. - Ragobba`),
    new BookEntry(209, "5000-0", 2, 10, `I thought it was a lot of work up to that point, but it only got harder. The initial shock of the darkness broke my plans, but the duration is numbing. She gave me the glowing spell, and I went out to use it. One tree and another tree. Another tree. Another tree. Soon enough, the forest was caught in my web of light, like a star you can see from space. A 5000-0 victory. Me against the forest and its spooks. I won. I was exhausted, but there was no need to run any further. It has been illuminated. I was finally able to find a clear path, but it was not the one I came from. Not the way home, not the way to the hut: down to a river, next to which I found a shrine. Covered in candles, pictures, cheese and clothes. I think I have seen these pictures before... still not so sure. But it could be the same as I saw in the hut. It wasn't among the weirdest things I saw that night, it did not deserve more of my attention. I followed the river down to a lonely town, and getting back home was not back on my mind for the next day. This town is not the best place, but I can feel safe enough here. I'm staying here until the night ends. And it's a new place to explore, which is perfect for my research work. Maybe I can meet some people... but after everything that happened tonight, I might not want to. Too exciting. I need to get back. I need to get back. But not now. Not now. Good night. - Pierre`),

    // 210 - 214: Christmas Event
    new BookEntry(210, "The Lost Gift", 3, 1, `On a cold winter night, after a lengthy prayer, a young Shgabb went to bed. High expectations for the next day. @sWhat will I get, what will I see, when I get out of bed, what'll be under the tree?@e, he wonders. One morning later, removed from the feathers, a distance from the sleep - who's the traitor? Under the tree, there is no Gift to see. No present for you, no present for me, time to weep. - Shganta`),
    new BookEntry(211, "What you've lost", 3, 3, `@sI must find the one who stole the one thing I feel excitement for, in this depressing and gray time! What's more frustrating than a loss, is to not know what you've lost. You may never know.@e - thoughtful words for a Shgabb still wearing pajamas, but maybe it's not bananas, after all, it's Christmas Eve. He gets ready, and puts on proper clothes. A really thick winter jacket that can resist any northern degree. He looks everywhere in the house, but nothing is to be found, and where's daddy's spouse? Another loss, another fight, trying to find, making the return alright. - Shganta`),
    new BookEntry(212, "Freezing Thoughts", 3, 5, `Gone outside, looking for the stolen gift and mother. Oh, the snow is so cold. He's a bit hungry, but what can you eat when your mother is not near and can't make you a sandwich? What else are you supposed to eat? Bananas? Olives? No, that is ridiculous... as he steps through the snow, an idea begins to linger. @sI should go to the mall. There's a lot of people there, and in the lower area, some criminals. I can ask them. I hope they give me a nice answer.@e says the freezing Shgabb, optimistically. Not everyone would expect criminals to know where their gift and mother are, and giving them back? Naive. - Shganta`),
    new BookEntry(213, "In The Mall", 3, 7, `@sI won't give up. I'm almost there.@e he says, and only a minute later, he arrives at the main entrance of the mall. @sI... can't... open... thissh ahh!@e he says and falls. The door is frozen. No way to open that. @sI have to get in there some other way... but how?@e he asks himself, trying to find a new way to enter the mall. Experts all around the country are unsure why he is so fixated on finding the lost things THERE, but what do you expect from someone with mediocre intelligence? He steps through the snow, every breath a breeze, not falling from the freeze. Eventually, he reaches an alternative entrance. It's not frozen. (Let's not tell him that the main entrance wasn't frozen either, it was just closed. Don't tell him.)@sI'm finally in. Lots of people here. Bananas for sale. I'll go to the criminals, down there, about 150 bananas for scale.@e he stupidly says, and who talks about criminals in public? When talking to yourself, even? Right before he reaches the stairs, someone familiar strikes his eye's glance... @sMom? Why are you here?@e - Shganta`),
    new BookEntry(214, "Peace and Love", 3, 10, `He runs to her. @sMom, why are you here? I looked for you everywhere!@e (Didn't you literally go here expecting to find her? Moron.) @sOh, my little one... it's probably best if I tell you the truth. I forgot to get you the gift. That's why I'm here.@e Realization. Reality shattered. Re-assessing the situation. The gift was not stolen. It was never there in the first place. @sBut I have the gift now. Let's go home, and open each other's gifts, and those from Santa too.@e, she says. Her son nearly in tears. They go back home, everyone is together, the entire family. Everyone gets good gifts, eats the good food, and there is something special on TV. It's all about peace and love, as it should be. The worries are forgotten, and put aside for a week - no matter if heavy or weak, this is not the time to feel bad. It's aaaaall peace and love. The gift in question... it's a new console. Merry Christmas everyone! - Shganta`),

    // 215 - 219: Anniversary Event
    new BookEntry(215, "Take Control", 4, 2, `Dear diary, tomorrow will be my birthday. I have spent a lot of time thinking about how I want it to be. My family treats me well. I can get what I want for my birthday. Last year, I failed. My birthday was bad, and it was my fault. I didn't wish for enough. I just let it happen, and it was just a normal day. This year it will be different. I will take control. The birthday will be great. - Lilly`),
    new BookEntry(216, "What I Want", 4, 4, `They know what I want. For my birthday tomorrow. Looooots of presents. I wrote a looong list. Last year I was uninspired and wrote down lots of random stuff, but this year I got my priorities straight. The issue was that some things changed in my life, and my interests changed, and the direction my desires were heading to was uncertain. But this year I know what things and objects I want. Games. Clothes. Tools. I got it. I will get it. I'm so excited for tomorrow! - Lilly`),
    new BookEntry(217, "Year Culture", 4, 6, `I have spectated the culture of this species. It seems like Shgabbs have a big culture around years. They see a new year as a new beginning, where you can leave behind plagues and miseries from the previous year, and new things are often started at the beginning of a new year. Things like moving to a new location, or buying something important. Every new year is different. They draw a strict line between years. Birthdays are quite relevant too. They celebrate them just like how humans do. But even bigger. When you are a Shgabb and it's your birthday, you get a lot of gifts, and are treated like a king, or like a princess, for one day. Of course there are limits, but it's really one day where everything is about YOU. And I think that's great. - Pierre`),
    new BookEntry(218, "Birthday: Before", 4, 8, `Today is the day. Today is MY day. Today I am the princess. It's my birthday. It's early in the morning, so the celebrations haven't started yet. But soon they will. I will report back. The others aren't awake yet, so I'll take some time and do things that make me happy. - Lilly`),
    new BookEntry(219, "Birthday: After", 4, 10, `My birthday is over, and waow, that was quite the day. I am so happy. One of the best days of the year. I got everything I wanted. Some of the stuff they gifted me... is very hard to get. I wouldn't have managed to find it on my own. I'm so grateful for my positive life and great family and friends. I wish that everyone could have it. Wait... there's still 4 minutes until the day is over. Maybe this final wish can come true? :) - Lilly`),

    // 220 - 224: Lunar New Year Event
    new BookEntry(220, "A bit poor", 5, 8, `I am Yúzé. A young Shgabboy from the East. A bit poor. Every new year, we celebrate. Our date might be different than yours. I want to buy Dragon Cake. It is sweet, but also spicy. Most cakes are not spicy. I ate it for the first time last year, and it was very delicious. This year, I want to eat it again. But I don't have enough Qian to buy it. It is not a cheap cake. - Yúzé`),
    new BookEntry(221, "Working for Qian", 5, 8, `Today, I worked very hard. I went to the bigger city and offered my strength and work, in exchange for payment. There was one store where I helped re-organize the products and update a list of how many are left. They paid me some Qian. I also helped some good men and polished their shoes. Their shoes became shiny. Some had a lot of mud under them. These good men paid me some Qian, but not much. It is not a very grateful work. But I also helped out an elder woman, who is too broken to get to the store on her own. She gave me Qian to buy these things for her, and I was allowed to keep the rest. This was very much worth it. It was a productive day. I helped people, and they helped me. A well working society. - Yúzé`),
    new BookEntry(222, "Luck", 5, 8, `Luck is a part of life. Whether you believe in it or not, sometimes you are lucky, sometimes you are unlucky. Some things that happen may be outside of your control. Qian are lucky coins. You work to get them, and you get rewarded. Or you spend them and reward yourself. Luck is invisible, but you feel the good feelings. Life can give you what you want. You just need to prove that you are worthy. - Yúzé`),
    new BookEntry(223, "Dragon Cake", 5, 8, `I have finally gathered enough Qian. I went to the Dragon Bakery. They sell lots of fancy looking food. A lot of it is spicy. But it is not normal spices. They have a secret ingredient, that tickles your tongue like no other. @sHello. I would like to buy a Dragon Cake. Medium size. Here is the Qian.@e @sWe see that you worked hard. You are a valuable member of society. Luck is with you. You are getting a 10% sale. Here is your cake. Enjoy.@e the shop owner replied. I was rewarded for my good work. I ate the cake at home, with a glass of milk in the other hand, because I don't want my tongue to burn to ashes. - Yúzé`),
    new BookEntry(224, "New Year Celebrations", 5, 8, `I took the final two slices of cake with me. In the bigger city, the new year is celebrated today. The lunar new year. I sat down on one of the long benches. Many shows. Some are funny, some are poetry, some are very traditional. Later, at night, there's fireworks. Beautiful fireworks. The sky never looks this beautiful. The moon shines bright and is happy to be here with us tonight. - Yúzé`),

    // 225 - 229: Egg Hunt Event
    new BookEntry(225, "Shgabb Spring", 6, 1, `The world of the Shgabb has strong seasonal differences and culture. The seasons consistently begin around the same time, the 21st of a month, they are reliable. The Winters are quite cold, but not too cold for a fun snowball fight. The Summers are quite hot, but you don't sweat too much. And when March comes to an end, you might find a new friend. The beginning of Spring is one of the highlights of Shgabb culture. - Penny, organizer of the local Spring celebrations`),
    new BookEntry(226, "Green Bunnies", 6, 2, `The Easter Bunny is actually real on this planet... but it's not just one, there are many of them. Or did you really expect one animal to hide millions of eggs? Also, they are green. Every year, the green bunnies energetically hide the eggs and other presents all around. The families gather and look for their loot. It's my job, every year, to help make this happen. I clean the parks, seek out hiding spots, take care of traffic, and more. Soon, it will begin. - Penny`),
    new BookEntry(227, "The Hunt Begins", 6, 3, `Spring has begun 1.5 weeks ago, now it's time. The event that many families claim their favorite, the scavenger hunt, the journey to find what will soon be yours. I do the countdown for the local park. @s3... 2... 1... GO!@e Everyone starts looking. I walk around and make sure nobody gets lost or stuck in a bush. I am eating a Sandwich while doing so. It's a chill job, I really like it. A young Shgabb has found a toy. - Penny`),
    new BookEntry(228, "The Legend of Shjassus", 6, 4, `There once was a man, in this land long ago, he was the most beloved Shgabb then, and we still praise his holy glow. His name is Shjassus. He had magic powers and healed all the sick Shgabb, the cure to everything even when he is not around. Long dead but still around, listening to our weekly sound. Shjassus, the holy Shgabb, is an inspiration to many, and helps us get along and cooperate. He had a positive mind and positive principles, follow them and your soul is pure. - Shgappope`),
    new BookEntry(229, "The Return of Shjassus", 6, 5, `They say, every year Shjassus returns to us. That is why we celebrate the beginning of every Spring. The search for eggs, and other things, is symbolic and represents the search for Shjassus. If he is somewhere out there, on this day, someone will find him. It's very unlikely, but even if you don't, you find other things that you may need... such as eggs. It's a metaphor for life. Aim high, try to find the best you can get, and be satisfied when it's just an egg. - Shgappope`),

    // 230 - 234: Pride Event
    new BookEntry(230, "Wanna Climb?", 7, 10, `Between the plants of the Fernroot Grove, in its cool and chilling atmosphere, a Shgabb named Leafi sat on the ground and stares at a tree. They were again pondering about their own being. People always ask, @sAre you a boy or a girl?@e but Leafi doesn't know. Neither feels right. They met another Shgabb called Juno, with green mossy curls and bright eyes, and they did not ask. They only asked, @sHi, wanna climb?@e They spent that whole Summer together, climbing, playing, catching bugs and having fun. One evening, Leafi whispered: @sDo you ever feel like you are not what others say you are?@e and Juno nodded. @sI'm not what they say either. But when we play, I feel like I can be myself.@e They held hands and watched the sunset together.`),
    new BookEntry(231, "Expectations", 7, 10, `Sallo got tired of the expectations and having to pretend. Pretending to crush on another Shgabb to seem normal. The expectation to fall in love and marry some guy some day. When Kerryn, one of her friends, said @sI've got a crush on you...@e she panicked, ran away, and hid in her room for the rest of the day. A few days later, Kerryn found her on the large field, grabbing apples from the trees. @sYou don't have to like me, or be with me, THAT way...@e Kerryn said, and added: @s...I like being around you... that's enough.@e The tension passed. Sallo realized that it is okay to not feel love for others, and to live differently.`),
    new BookEntry(232, "Becoming Yourself", 7, 10, `Luna, a Shgabb from the west, always knew that something is wrong, but couldn't point out what it is. Her body was born male, and forced to grow up that way, and face disgusting changes. But her mind and true self was always female. @sI am a girl!@e she shouted at age 11, which all saw as a phase, but it was just a temporary step forward, before going back and curling up into a tiny ball, hiding in a corner. Many years later, she found online spaces of what seemed to be fun people. But it turned out, they were I-am-one-of-them people. A life-changing moment. More and more changed. She told her family and friends about it, all being accepting enough. Her name changed to Luna, as the old one always caused physical pain. And while her life may still be miserable at times, and the world can be cruel, she can finally be happy with who she is, and what she looks like. @p Becoming yourself opens up lots of doors. It might close some, but change needs to be dealt with. What a Shgabb she has become. And finally, after years, she found another Shgabb to be with. She, a girl Shgabb, fell in love with another girl. Kept giving her best, and it paid off. After years and years of unrest and problems, she could finally settle down and live a peaceful life, with a perfect partner. Some might not like how she is living, but she has learned to ignore such people, or fight back with words. Love will always win.`),
    new BookEntry(233, "Every Spark", 7, 10, `Epphi had always been fascinated by all the things. A color, whether it's blue or red, yellow or green, or pink or brown. A shape, no matter if square or triangle, torus or pentagon. Anything is good. Her parents kept asking when she will find someone, and she only said @sI like sparks.@e without explaining what it means. What a spark is. @p It was never clear what she meant or wanted, until she met Ossa, and Berrilyn, and Mitch. Ossa was an energetic and bold person, not a boy nor a girl, with a clear and defined presence. Berrilyn was a soft and shy lady, always humming and keeping things peaceful. Mitch was a very creative man, but often stuck in the past and doing things others didn't like. When asked again what her "type" is, Epphi could finally find the words. @sOssa, Berrilyn, Mitch. Sparks come with everyone, in all forms. I like them all. It doesn't matter who they are. My type is every color, every shape, every spark.@e`),
    new BookEntry(234, "Pride", 7, 10, `Many years later. Juno and Leafi had grown closer, but never specified what it is between them. Leafi said @sSome days I love you like a storm ... and other days like a river. Is that okay?@e Juno grinned and replied @sI love all your weathers.@e Along their path, and on the grand parade, they met new Shgabbs. All with their own names and lives, like Sallo, Epphi or Luna. They exchanged their stories of pride, laughed, loved and lit the lights in the forest. For some their feelings are more clear, for others less, or not there. Everyone is different, and that is okay. That is good. Everyone should be able to express their personality, as long as no others are harmed, and love who they love, no matter if they are a guy or a gal or something else, or a Shgabb or a cat or something else. (Happy pride month!)`),

    // 235 - 239: Hot Hot Summer Event
    new BookEntry(235, "Summer Summoner", 8, 5, `Rere is a Shgabb of an element. A magician of the fire nation. And as the seasons come and go, their favorite time arrives. As the region gets warm, and the shines get bright, they can collect the resources to prepare for any fight. @sPotions and spells sometimes require you to collect very uncommon things, sometimes you don't find them for months. But during this time of the year, the nature is blooming, and those of my magic alike's warm nature peek out of the ground.@e With these ingredients, they are planning to perform summoning magic.`),
    new BookEntry(236, "Hot, Hot", 8, 5, `When it gets very warm, it can be difficult for Shgabbs to deal with the heat. They do not sweat. When it becomes too hot, they might just become a sticky puddle and wait until things cool down. Some can deal with the heat better than others. And, as we do, they might wear less clothes to avoid extra heat generation from those. And during my research on this topic, on a very hot day, I... uhhmm... I saw... she... hot, hot. - Pierre`),
    new BookEntry(237, "Summer Swimmer", 8, 5, `@sI never liked water, I was afraid of it. Bad things happened in the past. But only two months ago...@e Luna says as she is looking through the shop next to the pool, looking at various clothes and tools. @sNow I like water, it's an unique feeling that you don't get anywhere else. Pools, rivers, bathtubs, lakes. It doesn't matter, I swim in all of them. You can't stop me.@e She dives into the pool, which isn't too deep. Cooled water helps battle the heat... metaphorically.`),
    new BookEntry(238, "On The Road", 8, 5, `Smell the burning road, because a hot hot race is about to begin! 4 contestants are vroom'ing their automobiles, ready to go full speed and inflict literal fire on the road. It is a tradition in the South, where these rather pastcenturied means of transportation represent the common Shgabb. It's the Summer of Shorts, Sunglasses, and fast speeds. And they will go really fast. Accelerate and accelerate, and reach new speeds, new heights.`),
    new BookEntry(239, "Off The Road", 8, 5, `Rere is almost done collecting the final ingredient, some Sunflowers. @sThis one took me four days to get, but now I'm finally here. This thin, but long field by the road has the type of Sunflowers I need to summon the Sun God. What's this noise?@e they say, as the drivers are arriving with a burning speed. Rere jumps to the side before getting burnt, but the basket with all the ingredients, all the hard work, has been turned to ashes. And their shorts have a hole now, from the thorny bushes behind the field. @sThese thorns hurt... but what hurts more is what I lost. Exactly two months ago I lost what was more important. And now my work is getting hindered by these lawless madmen. I will get my revenge...@e they finally had enough, and throw the special seeds (now ash) into the burning trail on the road. The flame becomes a concentrated beam. The drivers never arrive at the finish line.`),

    // new BookEntry(100, "", 1, 10, ``),
];

// Everything Wisps and similar
function getWispType(typeID) {
    switch (typeID) {
        case 0:
            return "Free";
        case 1:
            return "Memory Wisps";
        case 2:
            return "Candles";
        case 3:
            return "Memory Snowflakes";
        case 4:
            return "Birthday Candles";
        case 5:
            return "Red Envelopes";
        case 6:
            return "Baskets";
        case 7:
            return "Sharks";
        case 8:
            return "Sunglasses";
    }
}

function getLoreReq(typeID) {
    switch (typeID) {
        case 0:
            return true;
        case 1:
            return true;
        case 2:
            return isEvent("shgabbthewitch");
        case 3:
            return isEvent("christmas");
        case 4:
            return isEvent("anniversary");
        case 5:
            return isEvent("lunar");
        case 6:
            return isEvent("egg");
        case 7:
            return isEvent("pride");
        case 8:
            return isEvent("summer");
    }
}

function getWispReq(typeID) {
    switch (typeID) {
        case 7:
            return isEvent("pride") ? shgaybbMode == true : getCooldown() >= 3;
        case 8:
            return getCooldown() <= 0.5;
        default:
            return true;
    }
}

function getWispImage(typeID) {
    switch (typeID) {
        case 1:
            return "memoryWisp";
        case 2:
            return "candle";
        case 3:
            return "memorySnowflake";
        case 4:
            return "birthdayCandle";
        case 5:
            return "redEnvelope";
        case 6:
            return "basket";
        case 7:
            return "shark";
        case 8:
            return "sunglasses";
        default:
            return "memoryWisp";
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
        case 3:
            return 1 / 1200;
        case 4:
            return 1 / 1000;
        case 5:
            return 1 / 888;
        case 6:
            return 1 / 200;
        case 7:
            return 1 / 10;
        case 8:
            return 1 / 120;
    }
}

function getWisp(multi = 1) {
    if (game.stats.hms >= 4000 && game.loreSel != 0 &&
        getWispReq(getLoreByID(game.loreSel).source) &&
        Math.random() <= getWispRarity(getLoreByID(game.loreSel).source) * multi * getArtifactsSimpleBoost("wispchance") * eventValue("shgabbthewitch", 6, 1)) {
        game.loreP += 1;

        checkCollectingLorePageCompleted();

        renderShbook(true);
    }
}

function checkCollectingLorePageCompleted() {
    // checks if the lore page you currently are collecting is done now (enough wisps)
    if (game.loreP >= getLoreByID(game.loreSel).amount) {
        game.lore.push(game.loreSel);
        game.lorepg.splice(game.lorepg.indexOf(game.loreSel), 1);
        game.loreSel = 0;
        game.loreP = 0;
        createNotification("Unlocked new lore: NAME", [["NAME", getLoreByID(game.loreSel).name]]);
    }
}

// lore page functions
function getLorePage(multi = 1) {
    if (game.stats.hms >= 4000 && game.lorepg.length < 5 &&
        Math.random() <= 
        1 / 7000 * multi * getArtifactsSimpleBoost("lorechance") * eventValue("shgabbthewitch", 6, 1)) {
        let availablePages = [];
        for (l in lore) {
            if (!lore[l].isFound() && getLoreReq(lore[l].source)) availablePages.push(lore[l].ID);
        }
        if (availablePages.length > 0) {
            let foundPage = availablePages[Math.ceil(Math.random() * (availablePages.length - 1))];

            game.lorepg.push(foundPage);
            createNotification("Found new lore page: NAME", [["NAME", getLoreByID(foundPage).name]]);
        }
        else {
            createNotification("All lore pages already found...");
        }

        renderShbook(true);
    }
}

function getLoreByID(id) {
    for (l in lore) {
        if (lore[l].ID == id) return lore[l];
    }
}

function selectLore(id) {
    game.loreSel = id;
    game.loreP = 0;
    renderLore();
}

function unselectLore(id) {
    if (confirm("Do you really want to unselect? The progress will be lost!")) {
        game.loreSel = 0;
        game.loreP = 0;
        renderLore();
    }
}

function throwLore(id) {
    if (confirm("Do you really want to get rid of this page? (Only benefit is getting space for other pages)")) {
        game.lorepg.splice(game.lorepg.indexOf(id), 1);
        if (game.loreSel == id) game.loreSel = 0;
        renderLore();
    }
}

function renderLore() {
    renderGetShbookTitle("Lore");

    // left side
    renderGetShbookLeft("lore", "Lore", lore, (s) => (lore[s].isUnlocked() ? lore[s].getName() : (lore[s].isFound() ? lore[s].getLoreLocked() : lore[s].getLockedName())));

    // right side
    let thisLore = "";
    for (s in lore) {
        if (lore[s].ID == shbookSelections.lore) thisLore = lore[s];
    }

    let render = "<div style='font-size: 40px'>" + (thisLore.isUnlocked() ? thisLore.getName() : thisLore.getLockedName()) + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisLore.isUnlocked() ? thisLore.unlockedText.replace(new RegExp('@s', 'g'), `<br>>>"`).replace(new RegExp('@e', 'g'), `"<<`).replace(new RegExp('@p', 'g'), `"<br /><br />`) : (thisLore.isFound() ? "Locked [#" + thisLore.ID + ", " + (thisLore.ID == game.loreSel ? game.loreP : "0") + "/" + thisLore.amount + "]" : "???")) + "</div>";

    if (thisLore.ID == 0) {
        // info page
        render = render + "<br /><br /><div style='font-size: " + (1.6 * shbookSizeFactor) + "px'>Current page progress:<br />" +
            cImg(getWispImage(getLoreByID(game.loreSel).name == "Info" ? 1 : getLoreByID(game.loreSel).source)) + game.loreP + (getLoreByID(game.loreSel).name == "Info" ? "" : "/" + getLoreByID(game.loreSel).amount)
            + (game.loreSel != 0 ? ("<br /><br /> Currently collecting: #" + getLoreByID(game.loreSel).ID + "<br />" + (game.loreP / getLoreByID(game.loreSel).amount * 100)) + "%" : "<br />Currently not collecting progress for any page! Select one to start collecting!")
            + "<br /><br />Lore pages currently in inventory (" + game.lorepg.length + "/5): " + game.lorepg + "."
            + "<br /><br />" + game.lore.length + "/" + (lore.length - 1) + " lore pages unlocked! Boost: x" + fn(getLoreBoost()) + " GS!</div>";
    }
    else if (!thisLore.isUnlocked() && thisLore.isFound()) {
        // found but not unlocked, add buttons
        if (thisLore.ID != game.loreSel) render = render + "<br />" + "<button class='grayButton' onclick=selectLore(" + thisLore.ID + ") style='font-size: 40px'>Start collecting</button>";
        else render = render + "<br />" + "<button class='grayButton' onclick=unselectLore(" + thisLore.ID + ") style='font-size: 40px'>Stop collecting (no refund)</button>";
        render = render + "<br />" + "<button class='grayButton' onclick=throwLore(" + thisLore.ID + ") style='font-size: 40px'>Throw page away</button>";
    }

    ui.shbookRight.innerHTML = render;
}

///////////////////////////////////
// MISSION RELATED   #7368626F6F6B
///////////////////////////////////

class Mission extends BookEntry {
    constructor(ID, name, unlock, lockedText, description, steps) {
        super(ID, name, unlock, lockedText);
        this.ID = ID;
        this.name = name;
        this.unlock = unlock;
        this.lockedText = lockedText;
        this.unlockedText = description;
        this.steps = steps;
    }

    select() {
        game.missions.selected = this.ID;
        game.missions.progress = 0;
        game.missions.steppro = 0;
    }

    isCurrent() {
        return game.missions.selected == this.ID;
    }

    isCompleted() {
        return game.missions.completed.includes(this.ID);
    }
}

class MStep {
    constructor(ID, parent, desc, condition, reward) {
        this.ID = ID;
        this.parent = parent;
        this.desc = desc;
        this.condition = condition;
        this.reward = reward;
    }

    Desc() {
        if (typeof (this.desc) == "function") return this.desc();
        return this.desc;
    }

    Condition() {
        // req step
        if (typeof (this.condition) == "function") return this.condition();
        // progress step
        if (this.condition.length > 1) return game.missions.steppro >= this.condition[1];
    }

    conditionProgress(name, amount) {
        if (name == this.condition[0] && (this.condition[3] == undefined || this.condition[3]() == true)) {
            if (this.condition[2] == true) game.missions.steppro += amount;
            else game.missions.steppro++;
        }
    }

    conditionProgressDisplay() {
        if (this.condition.length > 1) {
            return "<progress style='float: right; max-width: 200px;' min='0' max='" + this.condition[1] + "' value='" + (this.isCompleted() ? this.condition[1] : (this.isCurrent() ? game.missions.steppro : 0)) + "'/></progress>";
        }
        return "";
    }

    Reward() {
        // syntax: [currency, amount]
        if (this.reward != undefined && typeof (this.reward) == "function" && !game.missions.rewards.includes("M" + this.parent + "S" + this.ID)) {
            this.reward();
            game.missions.rewards.push("M" + this.parent + "S" + this.ID);
        }
    }

    isCurrent() {
        return this.parent == game.missions.selected && game.missions.progress == this.ID - 1;
    }

    isCompleted() {
        return this.parent == game.missions.selected && game.missions.progress >= this.ID;
    }
}

function currentMission() {
    return getMissionByID(game.missions.selected);
}

function currentMStep() {
    return currentMission().steps[game.missions.progress];
}

function checkMissionProgress() {
    if (game.stats.hms < 1000) return false;
    if (game.missions.selected < 1) return false; // nothing selected
    if (game.missions.progress >= currentMission().steps.length) {
        // completed the entire mission
        if (!game.missions.completed.includes(currentMission().ID)) {
            game.missions.completed.push(currentMission().ID);
            game.missions.selected = 0;
            game.missions.progress = 0;
        }
        renderMissionsRightSide();
        return false;
    }

    let currentStep = currentMStep();
    if (currentStep == undefined) return false;

    // current step completed?
    if (currentStep.Condition()) {
        currentMStep().Reward();
        createNotification("Step STEPNR/STEPS completed", [["STEPNR", currentStep.ID], ["STEPS", currentMission().steps.length]]);

        game.missions.progress++;
        game.missions.steppro = 0;

        renderMissionsRightSide();
        checkMissionProgress(); // recursive to complete multiple at once
    }
}

function renderMissions() {
    renderGetShbookTitle("Missions");

    // left side
    renderGetShbookLeft("missions", "Missions", missionary, (s) => (missionary[s].isUnlocked() ? (missionary[s].getName()) : "Locked [" + missionary[s].lockedText + "]"));

    // right side
    renderMissionsRightSide();
}

function renderMissionsRightSide() {
    if (selections[3] != "shbook2") return false;
    let thisMission = getMissionByID(shbookSelections.missions);
    if (thisMission == "") return false;

    let render = "<div style='font-size: 40px'>" + (thisMission.isUnlocked() ? thisMission.getName() : "Locked") + "</div><hr><br />";

    if (thisMission.isCompleted()) render = render + "<div style='background-color: gold;'>";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisMission.isUnlocked() ? thisMission.unlockedText : "Locked [" + thisMission.lockedText + "]") + "</div>";

    render = render + "<br /><h3>" + (thisMission.isCompleted() ? "Mission complete:" : "Steps:") + "</h3>";
    render = render + "<div style='text-align: left;'>";
    let counter = 1;
    for (step of thisMission.steps) {
        render = render + "<div class='missionStep' style='background-color: " + (step.isCompleted() ? "yellow" : "orange") + ";'>"
            + counter + ". " + step.Desc() + step.conditionProgressDisplay()
            + "</div>";
        counter++;
    }

    if (!thisMission.isCurrent() && !thisMission.isCompleted()) render = render + "</div><br /> <button class='grayButton' onclick='selectMission(" + thisMission.ID + ");'>Select this mission</button>";

    if (thisMission.isCompleted()) render = render + "</div>";
    ui.shbookRight.innerHTML = render;
}

function selectMission(mis) {
    getMissionByID(mis).select();
    renderMissions();
}

function getMissionByID(ID) {
    for (let m in missionary) {
        if (missionary[m].ID == ID) return missionary[m];
    }
    return missionary[0];
}

const missionary = [
    new Mission(2601, "Paroxysm", () => game.stats.hms >= 1000, "HMS 1000",
        "Welcome to the first mission. You can select one mission, completing one step at a time, giving various rewards. Requirement step: requires something once (having a certain ad boost, being at a certain number, ...). Progress step: based on stats, makes you do something a certain amount of times (can be counted as what you get or only as one, and can have an extra requirement). Selecting a different mission cancels the progress. <br /><br /> You have managed to decrease your click cooldown, however, trying to go faster makes you get dizzy... what if there is something magical to go hyperspeed? These Artifacts you've been hearing about... maybe one of them can help?", [
            new MStep(1, 2601, "Requirement step: take a look at your Artifacts", () => selections[1] == "artifacts"),
            new MStep(2, 2601, "Progress step: click 10 times", ["clicks", 10]),
            new MStep(3, 2601, "Have an Artifact equipped", () => game.aeqi.length > 0),
            new MStep(4, 2601, "Equip Artifacts 10 times.<br />Reward: high chance (4000x) for an Artifact", ["artisEquipped", 10], () => getNewArtifact(4000, true)),
            new MStep(5, 2601, "Disable Idle Mode", () => game.idleMode == false),
            new MStep(6, 2601, "Click 10 times while cooldown is 1s or faster", ["clicks", 10, false, () => getCooldown() <= 1]),
            new MStep(7, 2601, "Activate a Faster Shgabb boost", () => currentBoost == "fasterShgabb"),
            new MStep(8, 2601, "Click 500 times while cooldown is 0.5s or faster.<br />Reward: Paroxysm Artifact", ["clicks", 500, false, () => getCooldown() <= 0.5], () => awardArtifact(200)),
        ]
    ),
    new Mission(2602, "Artifact Grinder", () => game.stats.hms >= 1000, "HMS 1000",
        "Artifacts are key to progression from HMS 1000 to HMS 6000. They can boost various things. Let's get on the grind!", [
            new MStep(1, 2602, "Own the Paroxysm Artifact, which is a massive progress booster.", () => game.a.includes(200)),
            new MStep(2, 2602, "Find 5 Artifacts<br />Reward: 10 Gems", ["artisFound", 5], () => awardGems(10)),
            new MStep(3, 2602, "Have 3 Artifacts equipped at once", () => game.aeqi.length == 3),
            new MStep(4, 2602, "Get at least x10 Shgabb from Artifacts", () => getArtifactsSimpleBoost("shgabb") >= 10),
            new MStep(5, 2602, "Find 3 duplicate Artifacts", ["artiDupesFound", 3]),
            new MStep(6, 2602, "Find 10 Artifacts<br />Reward: 20 Gems", ["artisFound", 10], () => awardGems(20)),
            new MStep(7, 2602, "Get at least x3 Gem chance or x3 Artifact chance from Artifacts", () => getArtifactsSimpleBoost("gemchance") >= 3 || getArtifactsSimpleBoost("artifact") >= 3),
            new MStep(8, 2602, "Find 10 Artifacts<br />Reward: 20 Gems", ["artisFound", 10], () => awardGems(20)),
            new MStep(9, 2602, "Get at least x10 Sandwiches from Artifacts", () => getArtifactsSimpleBoost("sw") >= 10),
            new MStep(10, 2602, "Reach HMS 2000 to be able to find new Artifacts<br />Reward: high chance (6000x) for an Artifact", () => game.stats.hms >= 2000, () => getNewArtifact(6000, true))
        ]
    )
];

///////////////////////////////////
// CURRENCIARY   #7368626F6F6B
///////////////////////////////////

const currenciary = [
    new BookEntry(1, () => cImg('shgabb') + "Shgabb", () => true, "...", "Shgabb is the first main currency, and is available from the very start of the game. It is primarily earned from clicking the click button, but later on it can also be earned automatically, or immediately after a Prestige. Its first upgrade, More Shgabb, is used as the main indicator of progress. It unlocks the majority of content in the game, including the Shbook at 25, Player Profile at 100, most other Shgabb Upgrades, and more. Automatic Shgabb production becomes available with Sandwiches, the second currency."),
    new BookEntry(2, () => cImg('sandwich') + "Sandwiches", () => unlockedSandwiches(), "Sandwich Chance (Shgabb Upgrade)", "Sandwiches are the second main currency, and are unlocked through the Sandwich Chance Shgabb Upgrade. They can be earned by clicking, and are primarily used for auto Shgabb production. The first upgrade, Auto Shgabb, adds a flat amount of Shgabb that gets produced every second. It is affected by many boosts. Later, the Cheese upgrade can increase auto production by a percentage of the click production.<br /><br />It is important to note that Sandwiches are stored in the fridge. The fridge has a duration of 60 seconds, by default, until it stops cooling them. When the fridge is off, auto boosts stop working (to prevent going completely AFK for a long time). With upgrades the duration can be extended to 5 minutes. The fridge can be refreshed by most acts of clicking, including upgrading - even if the upgrade is already maxed or too expensive."),
    new BookEntry(3, () => cImg('gs') + "Golden Shgabb", () => unlockedGS(), "1M Shgabb", "Golden Shgabb is the third main currency, and it is unlocked at 1M Shgabb. It is earned from Prestiges, and can be spent on basic boosts."),
    new BookEntry(4, () => cImg('silicone') + "Silicone Shgabb", () => unlockedSilicone(), "1B Shgabb", "Silicone Shgabb, also known as Silicone, is the fourth main currency, and is unlocked at 1B Shgabb. It is automatically produced every second and can be spent on minor boosts. Silicone automatically boosts Shgabb from clicks and auto! The boost is based on current Silicone, total play time (up to 3M) and Upgrades that increase it. It is not reset when doing a Prestige."),
    new BookEntry(5, () => cImg('gem') + "Gems", () => unlockedGems(), "HMS 500", "Gems are the first side currency, unlocked at HMS 500. They can be spent on several offers, to earn Shgabb, Artifacts or more loadouts. Gems are not lost on a Prestige."),
    new BookEntry(6, () => cImg('artifactscrap') + "Artifact Scrap", () => unlockedArtifactUpgrading(), "Duplicate Artifact", "Artifact Scrap is the second side currency, unlocked after earning the first duplicate Artifact. Its sole purpose is upgrading Artifacts. It is earned from getting duplicates and destroying Artifacts. Artifact Scrap is kept on a Prestige."),
    new BookEntry(7, () => cImg('ameliorer') + "Améliorer", () => unlockedAmeliorer(), "HMS 2000", "Améliorer, also known as Amé, is the fifth main currency, and is unlocked at HMS 2000. It can be bought with any of the first four main currencies, or later also from Shgic and Gems. It can only be earned in small amounts. It can be spent on many various upgrades. It is not lost when prestiging, unless that option is enabled, which gives a full refund."),
    new BookEntry(8, () => cImg('pearl') + "Pearls", () => unlockedFishing(), "HMS 5000", "Pearls are the fourth side currency, earned from Fishgang level ups. They can be spent on minor boosts. It is possible to reset and refund all Pearls every new level up."),
    new BookEntry(9, () => cImg('chenga') + "Chengas", () => unlockedChengas(), "HMS 7000", "Chengas are the third side currency. They can be used to change the ad boost that's being offered. Doing so consumes 1 Chenga, and then the offer does not expire, and can be changed infinite times without consuming more. There is a 10% chance to get a Chenga after watching any ad."),
    new BookEntry(10, () => cImg('bag') + "Bags", () => unlockedBags(), "HMS 8000", "Bags are the sixth main currency, unlocked at HMS 8000, and can be earned from upgrading More Shgabb. They can be spent on a collection of upgrades."),
    new BookEntry(11, () => cImg('copper') + "Copper Shgabb", () => unlockedCopper(), "HMS 10 000", "Copper is the seventh main currency, unlocked at HMS 10 000. It can be earned by clicking, starting with a 1% chance. Its value inflates quickly."),
    new BookEntry(12, () => cImg('etenv') + "Etenvs", () => unlockedEtenvs(), "HMS 10 000", "Etenvs are the fifth side currency, unlocked at HMS 10 000. Every event you play, you get one Etenv. In the Events section of the Shbook, you can spend one Etenv and 10 000 Gems to summon an Event for 24 hours!"),
    new BookEntry(13, () => cImg('iron') + "Iron Shgabb", () => unlockedMine(), "HMS 12 000", "Iron is unlocked at HMS 12 000, alongside The Mine. It can be found like other ores, but takes longer to mine. Mining it rewards 1 Iron, which can be spent on four upgrades, shown below the minigame."),
    new BookEntry(14, () => cImg('banana') + "Bananas", () => unlockedBananas(), "HMS 15 000", "Bananas are the eighth main currency. Seeds can be found from Prestiges (more time -> higher chance, min. 1 minute, max. 15 minutes) and used to plant Banana Trees. Every click can make the trees grow Bananas. Every day where you log in, the trees get older, making them generate more Bananas per click, but also easier to break. You need to collect the Bananas from the trees, which has a chance of destroying the tree. Bananas can be spent on upgrades."),
];

function renderCurrenciary() {
    renderGetShbookTitle("Currenciary");

    // left side
    renderGetShbookLeft("currenciary", "Currencies", currenciary, (s) => (currenciary[s].isUnlocked() ? currenciary[s].getName() : "Locked [" + currenciary[s].lockedText + "]"));

    // right side
    let thisCurrency = "";
    for (s in currenciary) {
        if (currenciary[s].ID == shbookSelections.currenciary) thisCurrency = currenciary[s];
    }

    let render = "<div style='font-size: 40px'>" + (thisCurrency.isUnlocked() ? thisCurrency.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisCurrency.isUnlocked() ? thisCurrency.unlockedText : "Locked [" + thisCurrency.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + thisCurrency.getName(true) + "'>" + (thisCurrency.isUnlocked() ? "Learn more (Wiki)" : "Wiki (Spoilers)") + "</a></button>";

    ui.shbookRight.innerHTML = render;
}

///////////////////////////////////
// FEATURIARY   #7368626F6F6B
///////////////////////////////////

const featuriary = [
    new BookEntry(1, "Shbook", () => true, "...", "Welcome to the Shbook! Here you can find basic help for the game and explore the lore. The Shbook consists of three parts: the Currenciary, Featuriary, and the Lore (unlocked at HMS 4000). Navigate between the three parts at the top, and their individual contents with the list on the left side.<br /><br /><div style='text-align: left'>- Lore: Once unlocked, pages can be found and selected, to unlock the lore of the game.<br />- Currenciary: A list of currencies in the game with short descriptions of how to get them and what they do.<br />- Featuriary: A list of features in the game with explanations.</div><br /><br />Content in the Currenciary and Featuriary can only be read after unlocking it, but if you are too curious, the link to the corresponding wiki article at the bottom is always available!"),
    new BookEntry(2, "Unlocks", () => true, "...", "There are many features, currencies and other things that can be unlocked in this game. Most of them are unlocked by upgrading the first Shgabb Upgrade, called More Shgabb. Its unlocks often refer to it as HMS. Below you can find a list of ALL HMS unlocks, beware of the spoilers. Some things are unlocked in other ways, but they are easy to come across. Hope you enjoy unlocking new content! <br /> <br /><div style='text-align: left'>- HMS 25: Shbook<br />- HMS 100: Player Profile<br />- HMS 500: Gems<br />- HMS 1000: Artifacts, Missions<br />- HMS 2000: Events, Améliorer and Minigames (Shgic Shgac Shgoe)<br />- HMS 3000: Generators<br />- HMS 4000: Lore<br />- HMS 5000: Fishgang and Pearls<br />- HMS 6000: Challenges<br />- HMS 7000: Chengas<br />- HMS 8000: Bags<br />- HMS 10000: Copper Shgabb and Etenvs<br />- HMS 12000: The Mine and Iron Shgabb<br />- HMS 15000: Bananas</div>"),
    new BookEntry(3, "Hotkeys", () => true, "...", "On PC or with a keyboard, some keys are bound to game mechanics. <br /> <br /><div style='text-align: left'>- 1-8: Artifact loadouts<br />- P: prestige<br />- W, A, S, D, C: navigating through sections<br />- Arrow keys and space: moving in The Mine<br />- space: click button</div>"),
    new BookEntry(4, "Ads", () => unlockedAds(), "10 Sandwiches", () => "In this game, joke ads (not real ads - no money is earned with them) can be watched to get a boost for a few minutes. If you don't accept an offer, a new one will appear after a few seconds. Their audio can be toggled in settings. Here are all ads: <br /><br /><div style='text-align: left'>" + renderAllAdTexts() + "</div>"),
    new BookEntry(5, "Prestige", () => unlockedGS(), "1M Shgabb", "Prestiging is unlocked at 1M Shgabb. Prestiging sacrifices most progress, such as Shgabb, Sandwiches and Upgrades, but gives Golden Shgabb in return."),
    new BookEntry(6, "Artifacts", () => unlockedArtifacts(), "HMS 1000", "Artifacts are unlocked at HMS 1000 and can be equipped for all kinds of effects, from simple to mind-blowing complicated. By default, up to 3 Artifacts can be equipped at the same time. Artifacts of the same type are multiplicative with each other. Artifacts can be found from clicking or bought with Gems, and the further you go, the more Artifacts you can find. Loadouts can be saved and loaded at any time."),
    new BookEntry(7, "Shgic Shgac Shgoe", () => unlockedAmeliorer(), "HMS 2000", "Shgic Shgac Shgoe (whatever that means) is unlocked along Améliorer. Every day you get the chance to win 2 Améliorer here by playing your cards right. Get 3 in a row to win, classic rules. The first one to get 3 wins/points wins. You can play once per day, and after you win or lose, you have to wait until the next day to play again. It is an infinite source of Améliorer."),
    new BookEntry(8, "Generators", () => unlockedGenerators(), "HMS 3000", "Generators are unlocked at HMS 3000. They cost Golden Shgabb to upgrade, which increases their own production every second. This production gives Genpoints every second, with each Generator owned acting as a multiplier to the Genpoint production. Genpoints boost Shgabb, by ^(0.1*G) where G is the amount of Generators with at least one level."),
    new BookEntry(9, "Fishgang", () => unlockedFishing(), "HMS 5000", "Fishgang (also known as Fishing) is the second minigame, unlocked at HMS 5000. It is rather complex. The player can choose how far to throw the rod, further distances are more difficult, but also more valuable. The player can catch trash or fish, which award XP that contribute to level ups which award Pearls."),
    new BookEntry(10, "Challenges", () => unlockedChallenges(), "HMS 6000", "Challenges are unlocked at HMS 6000 and each offer a change to the gameplay. Starting a Challenge costs Gems and a Prestige. A Challenge can be beaten by reaching the required More Shgabb amount and then performing a Prestige. Each Challenge has a different reward, increasing with every tier: with every completion."),
    new BookEntry(11, "The Mine", () => unlockedMine(), "HMS 12 000", "The Mine is the third minigame, unlocked at HMS 12 000. Walk through randomly generated mines (arrow keys (space to stop moving) or clicking the arrows). You can come across Golden Shgabb, Silicone and Copper. Stand on an ore to mine it. Make progress with the normal click button, or auto. There are walls and water you can't walk through. And webs, which slow you down for 2 seconds."),
];

function renderFeaturiary() {
    renderGetShbookTitle("Featuriary");

    // left side
    renderGetShbookLeft("featuriary", "Features", featuriary, (s) => (featuriary[s].isUnlocked() ? featuriary[s].getName() : "Locked [" + featuriary[s].lockedText + "]"));

    // right side
    let thisFeature = "";
    for (s in featuriary) {
        if (featuriary[s].ID == shbookSelections.featuriary) thisFeature = featuriary[s];
    }

    let render = "<div style='font-size: 40px'>" + (thisFeature.isUnlocked() ? thisFeature.getName() : "Locked") + "</div><hr><br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>" + (thisFeature.isUnlocked() ?
        (typeof (thisFeature.unlockedText) == "function" ? thisFeature.unlockedText() : thisFeature.unlockedText)
        : "Locked [" + thisFeature.lockedText + "]") + "</div>";
    render = render + "<br /><br /><button class='grayButton' style='font-size: 40px'><a target='_blank' href='" + "https://shgabb-clicker.fandom.com/wiki/" + thisFeature.getName() + "'>" + (thisFeature.isUnlocked() ? "Learn more (Wiki)" : "Wiki (Spoilers)") + "</a></button>";

    ui.shbookRight.innerHTML = render;
}

///////////////////////////////////
// EVENTS   #7368626F6F6B
///////////////////////////////////

function renderShbookEvent() {
    renderGetShbookTitle("Event List (" + game.etenvs + " " + cImg("etenv") + ")");

    // left side
    renderGetShbookLeft("events", "Events", events, (s) => events[s].displayName);

    // right side
    let selected = "";
    for (s in events) {
        if (events[s].ID == shbookSelections.events) selected = events[s];
    }

    let render = "<div style='font-size: 40px'>" + selected.displayName + "</div><hr><br />";
    let rew;

    render = render + "Duration: " + formatDate(currentYear + "" + (selected.startDate < 999 ? "0" : "") + selected.startDate) + " - " + formatDate(currentYear + "" + (selected.endDate < 999 ? "0" : "") + selected.endDate) + "<br />";

    render = render + "<div style='font-size: " + (2 * shbookSizeFactor) + "px'>";
    render = render + selected.description + "<br />";

    // cosmetics
    for (let i = 0; i < 3; i++) {
        render = render + "<h3>" + ["PFPs", "Banners", "Frames"][i] + "</h3>";
        rew = getEventRewards(selected.name, ["pfps", "bans", "frames"][i]);
        for (let j in rew) {
            render = render
                + "#" + getCosmetic(rew[j]).ID + ": "
                + (getCosmetic(rew[j]).isUnlocked() ? getCosmetic(rew[j]).name : "??? (Locked)") + "<br />";
        }
    }

    // etenv button
    if (unlockedEtenvs() && game.stats.etenvs == 0) {
        // fwiend get 1 free etenv ^w^
        game.etenvs++;
        statIncrease("etenvs", 1);
    }
    if (unlockedEtenvs() && game.event == "" && game.etenvs > 0) render = render + "<button class='grayButton' onclick=useEtenv('" + selected.name + "') style='font-size: 40px'>Summon Event (1 " + cImg("etenv") + ", 10k " + cImg("gem") + ")</button>";

    ui.shbookRight.innerHTML = render;
}

///////////////////////////////////
// UPGRADE CALC   #7368626F6F6B
///////////////////////////////////

var allUpgrades = [
    ["Shgabb", "shgabb", shgabbUpgrades, "shgabb"],
    ["Sandwich", "sw", sandwichUpgrades, "sw"],
    ["Golden Shgabb", "gs", goldenShgabbUpgrades, "gs"],
    ["Silicone Shgabb", "si", siliconeShgabbUpgrades, "si"],
    ["Améliorer", "ame", ameliorerUpgrades, "ame"],
    ["Pearl", "pearl", pearlUpgrades, "fish"],
    ["Bag", "bag", bagUpgrades, "bags"],
    ["Copper Shgabb", "cop", copperShgabbUpgrades, "cop"],
    ["Iron", "iron", ironUpgrades, "iron"],
    ["Banana", "banana", bananaUpgrades, "bananas"],
];
var selectedCalcUpg = "";

function renderUpgradeCalculator() {
    renderGetShbookTitle("Upgrade Calculator");

    // left side
    renderGetShbookLeft("upgcalc", "Upgrades", allUpgrades, (s) => game.stats[allUpgrades[s][3]] > 0 ? (cImg(currencyFullName(allUpgrades[s][1])) + allUpgrades[s][0]) : "???");

    // right side
    let selected = allUpgrades[shbookSelections.upgcalc];

    if (!(game.stats[selected[3]] > 0)) {
        ui.shbookRight.innerHTML = "<div style='font-size: 40px'>? Upgrades" + "</div><hr />Play more to unlock these upgrades";
        return false;
    }

    let render = "<div style='font-size: 40px'>" + selected[0] + " Upgrades" + "</div><hr />";

    for (let upg in selected[2]) {
        if (selected[2][upg].isUnlocked()) render = render + "<button class='grayButton' onclick='selectedCalcUpg = `"+ upg + "`; renderUpgradeCalculator();'>" + selected[2][upg].name + "</button>";
    }
    render = render + "<hr />";

    let selUpg = selected[2][selectedCalcUpg];
    render = render + "<h3>Selected upgrade: " + (selectedCalcUpg == "" ? "-" : selUpg.name) + "</h3>"
    if (selectedCalcUpg != "") {
        // basic values
        render = render + "      Current level:  " + selUpg.currentLevel() + (selUpg.getMax() != undefined ? "/" + selUpg.getMax() : "");

        render = render + "<br />Current price:  " + fn(selUpg.currentPrice());
        if (selUpg.getMax() == undefined || selUpg.currentLevel() + 1 < selUpg.getMax()) render = render + "<br />Level+1 price:  " + fn(selUpg.getPrice(selUpg.currentLevel() + 1));
        if (selUpg.getMax() != undefined) render = render + "<br />Price to max:   " + fn(selUpg.getPriceRange(selUpg.currentLevel(), selUpg.getMax()));

        render = render + "<br />Current effect: " + selUpg.effectDisplay();
        if (selUpg.getMax() == undefined || selUpg.currentLevel() + 1 < selUpg.getMax()) render = render + "<br />Level+1 effect: " + selUpg.effectDisplay(selUpg.currentLevel() + 1);
        if (selUpg.getMax() != undefined) render = render + "<br />Effect at max:   " + selUpg.effectDisplay(selUpg.getMax());

        // from to
        render = render + "<hr />";
        render = render + "From: <input id='upgradeCalcFrom' type='number' name='From' onchange='renderCalc();' />  ";
        render = render + "To: <input id='upgradeCalcTo' type='number' name='To' onchange='renderCalc();' />";
        render = render + "<br />OR single level: <input id='upgradeCalcSingleLevel' type='number' name='SingleLevel' onchange='renderCalc();' />";

        render = render + "<span id='lvlsDisplay'></span>";
    }

    ui.shbookRight.innerHTML = render;
}

function renderCalc() {
    let render = "";
    let selected = allUpgrades[shbookSelections.upgcalc];
    let selUpg = selected[2][selectedCalcUpg];

    let input = [
        parseInt(document.getElementById("upgradeCalcFrom").value),
        parseInt(document.getElementById("upgradeCalcTo").value),
        parseInt(document.getElementById("upgradeCalcSingleLevel").value)
    ];

    if (isValid(input[2]) && !isNaN(input[2])) {
        render = render + "<br />Level: " + input[2] + (selUpg.getMax() != undefined ? "/" + selUpg.getMax() : "");

        render = render + "<br />Price to L+1:  " + fn(selUpg.getPrice(input[2]));
        render = render + "<br />Price to max:  " + fn(selUpg.getPriceRange(input[2], selUpg.getMax()));

        render = render + "<br />Effect: " + selUpg.effectDisplay(input[2]);
        render = render + "<br />Effect at L+1: " + selUpg.effectDisplay(input[2] + 1);
    }
    else if (isValid(input[0]) && isValid(input[1]) && !isNaN(input[0]) && !isNaN(input[1])) {
        render = render + "<br />Level: " + input[0] + "->" + input[1] + (selUpg.getMax() != undefined ? "/" + selUpg.getMax() : "");

        render = render + "<br />Price:  " + fn(selUpg.getPriceRange(input[0], input[1]));

        render = render + "<br />Effect at " + input[0] + ": " + selUpg.effectDisplay(input[0]);
        render = render + "<br />Effect at " + input[1] + ": " + selUpg.effectDisplay(input[1]);
    }

    document.getElementById("lvlsDisplay").innerHTML = render;
}