function unlockedScrapyard() {
    return game.stats.hms >= 14000;
}

function getScrapyardEffect(level = game.scrapyardLevel) {
    return 1 + (0.02 * level);
}

function getScrapyardPrice(level = game.scrapyardLevel){
    // per tap, level means level from
    return Math.ceil((1 + level)
        * Math.max(1, 0.02 * (level - 99) + 1)
        * Math.max(1, 0.03 * (level - 199) + 1)
        * Math.max(1, 0.05 * (level - 299) + 1)
        * Math.max(1, 0.9 * (level - 999) + 1));
}

function renderScrapyard() {
    let render = "<img src='images/currencies/artifactscrap.png' class='scrapyard' onclick='clickScrapyard();' onmousedown='holdScrapyard();' onmouseup='leaveScrapyard();' />";

    render += "<br /><br /><div class='sectionBG'>";
    render += "Scrapyard level: " + game.scrapyardLevel;
    render += "<br />Progress to next: " + game.scrapyardTaps + "/" + game.scrapyardTapsReq;
    render += "<br />Price: " + fn(getScrapyardPrice()) + cImg("artifactscrap") + " (" + fn(getScrapyardPrice() * game.scrapyardTapsReq) + cImg("artifactscrap") + ")";
    render += "<br />Artifact Scrap: " + game.artifactScrap + cImg("artifactscrap");
    render += "<br />Current boost: x" + getScrapyardEffect().toFixed(2) + cImg("iron");
    render += "</div>"

    ui.scrapyardRender.innerHTML = render;
}

function renderScrapyardFloatingNumber() {
    if (selections[1] != "minigames") return false;
    if (scrapyardFloatingNumber > 0) {
            document.getElementById("scrapyardFloatingText").style.display = "";
        ui.scrapyardFloatingText.innerHTML = `<span style="color: lime; position: absolute; z-index: 10; font-size: 40px; transform: translateY(-`+ ((1 - scrapyardFloatingNumber) * 60) + `px); opacity: ` + scrapyardFloatingNumber + `;">-` + scrapyardFloatingNumberPrice + `</span>`;
        scrapyardFloatingNumber -= 1 / 60;
        console.log(scrapyardFloatingNumber)

        if (scrapyardFloatingNumber <= 0) {
            document.getElementById("scrapyardFloatingText").style.display = "none";
        }
    }

}

var scrapyardFloatingNumber = 0;
var scrapyardFloatingNumberPrice = 0;
var scrapyardHeld = false;
var scrapyardDown = false;

function holdScrapyard() {
    //console.log("hold");
    if (scrapyardHeld || scrapyardDown) return false;

    scrapyardHeld = true;
    setTimeout(() => { 
        if (scrapyardHeld && !scrapyardDown) {
            setTimeout(() => {
                if (scrapyardHeld && !scrapyardDown) {
                    scrapyardDown = true;
                    downScrapyard();
                }
            }, 1000);
        }
    }, 1000);
}

function downScrapyard() {
    //console.log("down");

    if (!scrapyardDown) return false;
    clickScrapyard(true);
    setTimeout(() => {
        downScrapyard();
    }, 200);
}

function leaveScrapyard() {
    //console.log("leave");

    scrapyardHeld = false;
    scrapyardDown = false;
}

function clickScrapyard(held = false) {
    //console.log("click");

    scrapyardHeld = held;
    let price = getScrapyardPrice();

    if (game.artifactScrap >= price) {
        statIncrease("scrapyardSpent", price);
        game.artifactScrap -= price;

        scrapyardFloatingNumber = 1;
        scrapyardFloatingNumberPrice = price;

        statIncrease("scrapyardTaps", 1);
        game.scrapyardTaps++;

        if (game.scrapyardTaps >= game.scrapyardTapsReq) {
            game.scrapyardTaps = 0;
            game.scrapyardTapsReq = Math.ceil(Math.random() * Math.min(10, game.scrapyardLevel + 1));

            statIncrease("scrapyardTaps", price);
            game.scrapyardLevel++;
        }
    }
    renderScrapyard();
}

function calcScrapyardCopperBoost() {
    // ie +250% becomes +2 and 50% chance for another (x2.5 -> x2 or x3)
    let boost = Math.floor(getScrapyardEffect());
    let bonusChance = getScrapyardEffect() % 1;
    console.log(boost, bonusChance);
    if (Math.random() >= bonusChance) {
        boost += 1;
    }
    console.log(boost);
    return boost;
}