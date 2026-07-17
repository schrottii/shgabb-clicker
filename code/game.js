// Game made by Schrottii - editing or stealing is prohibited!

// GAME
var game = {
    profile: {
        name: "",
        id: "",
        startVer: "",
        startDay: "",
        pfp: 100,
        banner: 100,
        frame: 100,
        bgframe: true
    },

    idleMode: false,
    idleModeTime: 0,

    // currencies
    shgabb: new Decimal(0),
    sw: new Decimal(0),
    gs: new Decimal(0),
    si: new Decimal(0),
    ame: 0,
    amess: 0,
    ameUp: [0, 0, 0, 0, 0],
    bags: 0,
    cop: new Decimal(0),
    gems: 0,
    gemboost: 0,
    gemb: 0,
    artifactScrap: 0,
    chenga: 0,
    etenvs: 0,
    etenvev: "",
    event: "", // for etenvs (temp events)
    eventd: 0, // day
    eventh: 0, // hour
    pearls: 0,
    bananas: 0,
    bananaseeds: 0,
    bananatrees: [],
    iron: 0,
    scrapyardLevel: 0,
    scrapyardTaps: 0,
    scrapyardTapsReq: 1,

    generators: [
        [],
    ],
    genpoints: new Decimal(0),

    blackTickets: 0,
    blackMarketContents: [],
    blackTicketSources: [],

    // event currencies / event stuff
    gifts: 0,
    cakeProgress: 0,
    qian: 0,
    eggs: 0,
    shorts: 0,
    witchshgabb: 0,

    // other stuff
    lore: [],
    lorepg: [],
    loreSel: 0,
    loreP: 0,
    clickCooldown: 0,
    
    // artifact stuff
    a: [],
    alvl: {},
    aeqi: [],
    alo: [[], [], []],
    al: 2,
    alnames: [""],

    // fishing
    fishxp: 0,
    fishlvl: 0,
    fish: 0,
    trash: 0,
    fishvalue: new Decimal(0),
    bfishweight: 0, // best
    bfishvalue: 0, // best

    // more other
    ach: [],
    nexgai: [0, 0, 0, 0],
    tttd: 1,
    day: 1,
    dgo: 100,

    // cosmetics
    evpfps: [],
    evbans: [],
    evframes: [],

    // challenges, daily
    clg: [],
    aclg: 0,
    dclg: [],
    dclp: 0,

    // missions
    missions: {
        selected: 0,
        progress: 0,
        rewards: [],
        completed: [],
        steppro: 0
    },

    // upgrade levels
    upgradeLevels: {
        // Shgabb
        moreShgabb: 0,
        critChance: 0,
        critBoost: 0,
        shorterCD: 0,
        goodJoke: 0,
        bomblike: 0,
        swChance: 0,
        moreSw: 0,
        deepMiner: 0,
        bomblike2: 0,

        // Sandwich
        autoShgabb: 0,
        fridge: 0,
        firstBoostsClicks: 0,
        cheese: 0,
        twoTwoFive: 0,
        meaningOfLife: 0,

        // GS
        divineShgabb: 0,
        shortCD: 0,
        gsBoost1: 0,
        gsBoost2: 0,
        unlockMax: 0,
        unlockMSW: 0,
        formaggi: 0,
        moreSilicone2: 0,

        // Silicone
        moreSilicone: 0,
        strongerSilicone: 0,
        siliconeFromClicks: 0,
        siliconeAffectsGS: 0,

        // Ame
        shgabbBoost: 0,
        AMEgsBoost1: 0,
        AMEgsBoost2: 0,
        achBExpo: 0,

        nothing: 0,
        AMEfridge: 0,
        AMEcritBoost: 0,
        unlockUnlevel: 0,

        AMEfirstBoostsClicks: 0,
        AMEsiliconeFromClicks: 0,
        AMEbomblike: 0,
        gsBoostsShgabb: 0,

        siliconeBoost: 0,
        AMEformaggi: 0,
        unlockMSW2: 0,
        fourthArtifactSlot: 0,

        sandwichBoost: 0,
        critsAffectSW: 0,
        gems2ame: 0,
        keepSWU: 0,

        amegsBoost: 0,
        loreBoost: 0,
        tiersBoostBags: 0,
        fourthArtifactLevel: 0,

        AMEmoreSw: 0,
        unlockMBU: 0,
        infiniteGems2ame: 0,
        AMECAME: 0,

        copperBoost: 0,
        tiersBoostCopper: 0,
        chainGems: 0,
        moreLoadouts: 0,

        ameBagBoost: 0,
        efficientDestruction: 0,
        challenger: 0,
        unstableAMESS: 0,

        // Bag
        challengeShgabb: 0,
        moreSilicone3: 0,
        prestigeGems: 0,
        gemsBoostShgabb: 0,
        adsWatchedBoostShgabb: 0,
        clicksBoostGS: 0,

        // Copper
        moreCopper: 0,
        copperClickChance: 0,
        copShgabbBoost: 0,
        copGSBoost: 0,

        // Pearls
        prlShgabb: 0,
        prlGS: 0,

        // Bananas
        bananaChance: 0,
        banSw: 0,
        banGS: 0,

        // Iron
        ironSpeedMiner: 0,
        ironCuFe: 0,
        ironPickaxes: 0,
        ironCopperMiner: 0,
    },

    // stats (all time)
    stats: {
        shgabb: 0,
        clicks: 0,
        idleClicks: 0,
        critClicks: 0,
        swClicks: 0,

        // play time
        playTime: 0,
        playTimeClicking: 0,
        playTimeFridge: 0,
        playTimeEvent: 0,

        playTimeShgic: 0,
        playTimeFishgang: 0,
        playTimeMine: 0,

        pr: 0, // prestiges
        hms: 0,

        sw: 0,
        gs: 0,
        tgems: 0,

        artisFound: 0,
        artiDupesFound: 0,
        artisUpgraded: 0,
        artisDestroyed: 0,
        artisEquipped: 0,
        artifactScrap: 0,

        si: 0,
        ame: 0,
        amess: 0,
        bags: 0,
        cop: 0,
        copClicks: 0,
        chenga: 0,
        etenvs: 0,
        events: 0,
        bananas: 0,
        bananaseeds: 0,
        bananatrees: 0,
        iron: 0,
        dclp: 0,
        blackTickets: 0,

        treesDead: 0,
        treesSurvived: 0,
        treesDays: 0,

        // scrapyard
        scrapyardLevel: 0,
        scrapyardTaps: 0,
        scrapyardSpent: 0,

        // events
        gifts: 0,
        cakes: 0,
        qian: 0,
        eggs: 0,
        couples: 0,
        shorts: 0,
        witchshgabb: 0,

        // fishgang
        trash: 0,
        fish: 0,
        fishweight: 0,
        fishvalue: 0,

        // the mine
        mineTiles: 0,
        mineProgress: 0,
        mineGS: 0,
        mineSI: 0,
        mineCOP: 0,
        mineIRON: 0,

        // shgic
        tttpw: 0,
        tttpl: 0,
        tttw: 0,
        tttl: 0,
        ads: 0,
        wads: {
            sc: 0,
            sa: 0,
            msw: 0,
            fs: 0,
            mc: 0,
            msi: 0,
            mg: 0,
        }
    },
    stats_prestige: {

    },
    stats_today: {

    },
    cheated: false,
    sus: 0,
    susq: 0,
    flags: {},
    red_rew: []
}

const emptyGame = Object.assign({}, game, {});

// SETTINGS
var settings = {
    // gameplay
    notation: "normal",
    hideUnlevel: false,
    leastAdLess: true,
    noUpgrading: false,
    noAds: false,
    confirm: true,
    threeBars: true,
    preferMS: false,
    boostFilters: true,
    sidebar: false,
    sidebarWidth: 19,
    notifications: {},

    // design
    background: false,
    eventBG: true,
    topSquare: true,
    topNotifs: 1,
    hideMaxed: false,
    displayCurrent: false,
    artifactImages: true,
    settingDesc: true,
    upgradeColors: "normal",
    customColors: [[0, 0, 0, 255], [100, 100, 100, 255], [255, 255, 255, 0]],
    popups: true,
    quotes: true,

    // audio
    music: false,
    musicVolume: 0.5,
    adMusic: true,
    song: 0,
    sounds: false,
    soundVolume: 0.5,
    autoplaySongs: false
}

function report(flagName, susAmount) {
    if (game.flags[flagName] == undefined) {
        game.susq += susAmount;
        game.flags[flagName] = 0;
    }

    game.sus += susAmount;
    game.flags[flagName] += susAmount;
}

/*
function tester() {
    if (confirm("reset artis?")) {
        game.a = [];
    }
    game.dgo = 0;
    newArtifactOffers();
    updateEVERYTHING();
}
*/

function isSaveExisting() {
    return game.stats.hms >= 1 || game.shgabb.gte(1);
}



///////////////////////////////////
// save related   #6D61696E736563
///////////////////////////////////

function autoSave(manual = true) {
    autoNotifications += 1;

    artifactEvent("onAutoSave");

    // Le rare renderes
    renderAmeConvert();
    renderAllSelection(true);
    recentKeys = [];

    // Every save, check if a new day has risen
    checkNewDay()

    // Auto Save
    exportGame("cache");
    localStorage.setItem("shgabbSettings", JSON.stringify(settings));

    checkForNewAchievements();

    if (!manual) createNotification("Game saved automatically HEADACHE", [["HEADACHE", autoNotifications]]);
}

function createBackup() {
    if (game.cheated == true) return false;
    if (confirm("Are you sure you want to CREATE a backup?")) exportGame("backup");
}

function loadBackup() {
    if (confirm("Are you sure you want to LOAD a backup?")) importGame(localStorage.getItem("shgabbBackup"));
}

function importFromFile() {
    if (document.getElementById("myFile").value != "") {
        if (confirm("Do you really want to import from this file?")) {
            try {
                file = document.getElementById("myFile").files[0];
                reader = new FileReader();
                let filecontent;

                reader.addEventListener('load', function (e) {
                    filecontent = e.target.result;
                    if (filecontent != undefined) importGame(filecontent);
                });

                reader.readAsText(file);
            }
            catch {
                console.log("Something went wrong while loading the file");
            }
        }
    }
    // this does not work for some reason. it's meant to trigger the click on the "select file" thing and while the file selection screen does pop up, it does not set the value at all, for some reason
    //else {
    //    document.getElementById("myFile").click();
    //}
}

function exportToFile() {
    if (game.cheated != true) exportGame("file");
}

function exportGame(destination = "gimme") {
    if (game.cheated == true) {
        alert("You can't export a cheated save!");
        createNotification("Couldn't export: Cheated");
        return false;
    }
    let exporter = {};
    for (exportit in game) {
        exporter[exportit] = game[exportit];
    }

    exporter.shgabb = numberSaver(exporter.shgabb);
    exporter.sw = numberSaver(exporter.sw);
    exporter.gs = numberSaver(exporter.gs);
    exporter.si = numberSaver(exporter.si);
    exporter.fishvalue = numberSaver(exporter.fishvalue);
    exporter.genpoints = numberSaver(exporter.genpoints);
    exporter.generators = [];
    for (let g in game.generators) {
        exporter.generators[g] = [0, new Decimal(0), 0];
        exporter.generators[g][0] = game.generators[g][0];
        exporter.generators[g][1] = numberSaver(game.generators[g][1]);
        exporter.generators[g][2] = game.generators[g][2];
    }

    for (let statHandler in statTypes) {
        exporter[statTypes[statHandler]] = {};
        for (let allStats in game.stats) {
            exporter[statTypes[statHandler]][allStats] = game[statTypes[statHandler]][allStats];
        }
        for (let currHandler in statCurr) {
            exporter[statTypes[statHandler]][statCurr[currHandler]] = numberSaver(game[statTypes[statHandler]][statCurr[currHandler]]);
        }
    }
    exporter = JSON.stringify(exporter);

    exporter = btoa(exporter);
    exporter = exporter.replace(rep7, "shgabb");
    exporter = exporter.replace("x", "pppp");
    exporter = exporter.replace("D", "dpjiopjrdopjh");

    if (destination == "gimme") {
        navigator.clipboard.writeText(exporter);
        createNotification("Game exported to clipboard");
    }
    if (destination == "cache") {
        localStorage.setItem("shgabbClicker", exporter);
    }
    if (destination == "backup") {
        localStorage.setItem("shgabbBackup", exporter);
    }
    if (destination == "file") {
        var temporaryFile = document.createElement('a');
        temporaryFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exporter));
        temporaryFile.setAttribute('download', "shgabbSave-" + today() + ".txt");

        temporaryFile.style.display = 'none';
        document.body.appendChild(temporaryFile);

        temporaryFile.click();

        document.body.removeChild(temporaryFile);
    }
}

function importButton() {
    // handle the import button
    // normal imports and rescue codes
    // loading from cache is done elsewhere

    let source = prompt("Code?");

    if (source.substr(0, 6) == "faCoDe") {
        source = source.substr(10);
    }

    return importGame(source); // true or false
}

function importGame(source) {
    if (source == null || source == undefined) source = Object.assign({}, emptyGame);
    else {
        try {
            if (source.toString().substr(0, 4) == "shga") {
                source = source.replace("shgabb", rep7);
                source = source.replace("dpjiopjrdopjh", "D");
                source = source.replace("pppp", "x");
                source = atob(source);
            }
            source = JSON.parse(source);
        }
        catch (e) {
            alert("Something went wrong while unpacking the save!");
            return false;
        }
    }

    // Empty the game first. Make it completely empty
    emptyGame.a = [];
    game = {};

    // Now import. it's done this way to support old saves
    game = Object.assign({}, emptyGame, source);

    // Take care of arrays
    game.upgradeLevels = Object.assign({}, emptyGame.upgradeLevels, source.upgradeLevels);
    game.ameUp = Object.assign({}, emptyGame.ameUp, source.ameUp);
    game.profile = Object.assign({}, emptyGame.profile, source.profile);

    game.stats = Object.assign({}, emptyGame.stats, source.stats);
    game.stats_prestige = Object.assign({}, emptyGame.stats, source.stats_prestige);
    game.stats_today = Object.assign({}, emptyGame.stats, source.stats_today);

    for (let statHandler in statTypes) {
        for (let currHandler in statCurr) {
            game[statTypes[statHandler]][statCurr[currHandler]] = numberLoader(game[statTypes[statHandler]][statCurr[currHandler]]);
        }
    }

    // break infinity stuff
    game.shgabb = numberLoader(game.shgabb);
    game.sw = numberLoader(game.sw);
    game.gs = numberLoader(game.gs);
    game.si = numberLoader(game.si);
    game.fishvalue = numberLoader(game.fishvalue);
    game.genpoints = numberLoader(game.genpoints);
    game.generators = [];
    for (let g in source.generators) {
        game.generators[g] = [];
        game.generators[g][0] = source.generators[g][0];
        game.generators[g][1] = numberLoader(source.generators[g][1]);
        game.generators[g][2] = source.generators[g][2];
    }

    // Some adjustments
    shgicPointsPlayer = 0;
    shgicPointsEnemy = 0;
    canPlayTTT = false;
    shgicResetField();

    if (currentBoost != "none") {
        currentBoost = "none";
        adStatus = "loaded";
        adTime = 10;
        adMax = 10;
    }

    loadArtifactValues();
    checkNewDay();

    let allAdsZero = true;
    for (a in game.stats.wads) {
        if (game.stats.wads[a] != 0) allAdsZero = false;
    }
    if (allAdsZero) {
        allAdsZero = game.stats.ads;
        while (allAdsZero > 0) {
            allAdsZero -= 1;
            game.stats.wads[Object.keys(game.stats.wads)[Math.floor(Math.random() * Object.keys(game.stats.wads).length)]] += 1;
        }
    }

    if (game.stats.shgabb == "-Infinity") game.stats.shgabb = new Decimal(0);
    if (game.stats_prestige.shgabb == "-Infinity") game.stats_prestige.shgabb = new Decimal(0);
    if (game.stats_prestige.hms == 0) game.stats_prestige.hms = game.stats.hms;
    if (game.stats.gems != undefined) {
        game.stats.tgems += game.stats.gems;
        delete game.stats.gems;
    }

    if (game.stats.dclp == undefined || game.stats.dclp == 0) {
        game.stats.dclp = game.dclp;
    }

    /*
    if (sandwichUpgrades.autoShgabb.currentPrice() > game.stats.sw.mul(10)) {
        // Auto Shgabb was reworked
        game.sw = game.sw.add(Math.pow(game.upgradeLevels.autoShgabb, 2) / 2);
        game.upgradeLevels.autoShgabb = 0;
    } */

    // figure out the last selected loadout
    if (game.stats.hms >= 10000) selectedLoadout = -1;
    let allArtifactsSame = false;
    let loadout;
    for (let l in game.alo) {
        loadout = game.alo[l];
        // loadout is empty
        if (loadout.length == 0) {
            if (game.alo.length == 0) {
                selectedLoadout = l;
                break;
            }
            continue;
        }

        // go through all artifacts
        allArtifactsSame = true;
        for (let a in loadout) {
            if (a <= loadout.length && a <= game.aeqi.length && loadout[a] != game.aeqi[a]) allArtifactsSame = false;
        }

        // set if it's the same
        if (allArtifactsSame) {
            selectedLoadout = l;
            break;
        }
    }

    let ownedArtisList = [];
    for (let ownedArtis = 0; ownedArtis < game.a.length; ownedArtis++) {
        if (ownedArtisList.includes(game.a[ownedArtis])) {
            // duplicate detected! remove it & refund
            console.log("Duplicate Artifact detected! Loc: " + ownedArtis + ", ID: " + game.a[ownedArtis]);
            game.a.splice(ownedArtis, 1);
            game.gems += 30;
            ownedArtis -= 1;
        }
        else ownedArtisList.push(game.a[ownedArtis]);
    }

    // Execute some stuff
    //handleArtifactsFirstTime(); // it's safe to say nobody needs this anymore lol
    checkForZeroNext();

    updateEVERYTHING();

    createNotification("Save imported successfully");
    return true;
}

function deleteGame() {
    if (confirm("Do you REALLY want to do this? EVERYTHING will be gone, you gain NOTHING")) {
        if (confirm("Make sure to save your progress before doing this!!! Everything will be lost!")) {
            if (confirm("If you press Yes again, everything will be gone!")) {
                for (let currHandler in statCurr) {
                    emptyGame[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats_prestige[statCurr[currHandler]] = new Decimal(0);
                    emptyGame.stats_prestige[statCurr[currHandler]] = new Decimal(0);
                }

                game = emptyGame;
                createNotification("Game deleted successfully!");
                autoSave();
                updateEVERYTHING();
            }
        }
    }
}