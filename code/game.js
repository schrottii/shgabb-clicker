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

    evpfps: [],
    evbans: [],
    evframes: [],

    clg: [],
    aclg: 0,
    dclg: [],
    dclp: 0,

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
        playTime: 0,
        pr: 0, // prestiges
        hms: 0,

        sw: 0,
        gs: 0,
        tgems: 0,
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

        gifts: 0,
        cakes: 0,
        qian: 0,
        eggs: 0,
        couples: 0,
        shorts: 0,
        witchshgabb: 0,

        trash: 0,
        fish: 0,
        fishweight: 0,
        fishvalue: 0,
        playTimeFish: 0,

        playTimeMine: 0,
        mineTiles: 0,
        mineProgress: 0,
        mineGS: 0,
        mineSI: 0,
        mineCOP: 0,
        mineIRON: 0,

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
}

const emptyGame = Object.assign({}, game, {});

// SETTINGS
var settings = {
    music: false,
    sounds: false,
    adMusic: true,
    background: false,
    displayCurrent: false,
    hideMaxed: false,
    hideUnlevel: false,
    upgradeColors: "normal",
    customColors: [[0, 0, 0, 255], [100, 100, 100, 255], [255, 255, 255, 0]],
    notation: "normal",
    topSquare: true,
    leastAdLess: true,
    eventBG: true,
    topNotifs: 1,
    artifactImages: true,
    noUpgrading: false,
    noAds: false,
    confirm: true,
    boostFilters: true,
    threeBars: true,
    preferMS: false,
    settingDesc: true,
    popups: true,
    sidebar: false,
    sidebarWidth: 19,
}

// BETA (cheating)
var BETA = {};
Object.defineProperty(BETA, 'isBeta', {
    value: false,
    writable: false,
    enumerable: true,
    configurable: false
});