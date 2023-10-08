// Game made by Schrottii - editing or stealing is prohibited!

// def: title - quotes - button - resources - quotes
// sel 1: shgabb - sandwiches - gs - silicone - amé
// sel 2: artifacts - shgic - stats - achievements - other (social, patch notes)

var render = {
    // def
    titleSection: document.getElementById("titleSection"),
    quoteSection: document.getElementById("quoteSection"),
    clickButtonSection: document.getElementById("clickButtonSection"),
    resourcesSection: document.getElementById("resourcesSection"),
    // sel 1

    // sel 2

    // !!!
    sandwich: document.getElementById("sandwichSection"),
    goldenShgabb: document.getElementById("goldenShgabbSection"),
    siliconeShgabb: document.getElementById("siliconeShgabbSection"),
    ameliorer: document.getElementById("ameliorerSection"),
    artifacts: document.getElementById("artifactSection"),
    gems: document.getElementById("gemSection"),
    cheats: document.getElementById("cheatSection"),
    minigameSection: document.getElementById("minigameSection"),
}

function renderSections() {
    renderTitleSection();
    renderQuoteSection();
    renderClickButtonSection();
    renderResourcesSection();
}

// def

function renderTitleSection() {
    let newTitle = "Shgabb Clicker " + gameVersion + (BETA.isBeta ? " (BETA)" : "");
    let ren = `<h2 style="color: deepskyblue; background-color: green"><span id="gametitle">` + newTitle + `</span></h2>`;

    render.titleSection.innerHTML = ren;
}

function renderQuoteSection() {
    render.quoteSection.innerHTML = "<div style='white-space: nowrap; margin-bottom: -16px'>" + currentQuote + "</div>";
}

function renderClickButtonSection() {
    render.clickButtonSection.innerHTML = `<progress min="0" max="5" value="0" id="cooldownBar" style="width: 182px"></progress><br />
    <button class="clickButton" onclick="clickButton()" id="clickButton">+1 Shgabb</button> <br />`;
}

function renderResourcesSection() {
    let ren = `<div style="background-color: lightslategray">`;
    let resNames = ["shgabb", "sw", "gs", "si", "gem", "ame"];
    let resImgs = ["shgabb", "sandwich", "gs", "silicone", "gem", "ameliorer"];

    for (res in resNames) {
        ren = ren + `<img class="currency" id="` + resNames[res] + `Image" src="images/currencies/` + resImgs[res] + `.png" /><span id="` + resNames[res] + `Amount"></span>` + ((res - 1) % 2 == 0 ? "<br />" : "    ")
    }

    ren = ren + `<span id="artifactScrapAmount"></span>
    </div>`;

    render.resourcesSection.innerHTML = ren;
}