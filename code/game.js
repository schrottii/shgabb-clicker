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
    },
    // currencies
    shgabb: new Decimal(0),
    sw: new Decimal(0),
    gs: new Decimal(0),
    si: new Decimal(0),
    ame: 0,
    ameUp: [0, 0, 0, 0, 0],
    bags: 0,
    gems: 0,
    gemboost: 0,
    artifactScrap: 0,
    // event currencies / event stuff
    gifts: 0,
    cakeProgress: 0,
    qian: 0,
    eggs: 0,
    // other stuff
    lore: [],
    lorepg: [],
    loreSel: 0,
    loreP: 0,
    clickCooldown: 0,
    a: [],
    alvl: {},
    aeqi: [],
    alo: [[], [], []],
    al: 2,
    alnames: [""],
    ach: [],
    nexgai: [0, 0, 0, 0],
    tttd: 1,
    dgo: 100,
    evpfps: [],
    evbans: [],
    clg: [],
    aclg: 0,
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
        AMEgsBoost1: 0,
        AMEgsBoost2: 0,
        shgabbBoost: 0,
        achBExpo: 0,

        AMEfridge: 0,
        AMEmoreSw: 0,
        AMEcritBoost: 0,
        unlockUnlevel: 0,

        AMEfirstBoostsClicks: 0,
        AMEsiliconeFromClicks: 0,
        AMEbomblike: 0,
        gsBoostsShgabb: 0,

        AMEformaggi: 0,
        unlockMSW2: 0,
        siliconeBoost: 0,
        fourthArtifactSlot: 0,

        sandwichBoost: 0,
        critsAffectSW: 0,
        gems2ame: 0,
        keepSWU: 0,

        amegsBoost: 0,
        tiersBoostBags: 0,
        fourthArtifactLevel: 0,

        // Bag
        challengeShgabb: 0,
        moreSilicone3: 0,
        prestigeGems: 0,
        gemsBoostShgabb: 0,
    },
    // stats (all time)
    stats: {
        shgabb: 0,
        clicks: 0,
        playTime: 0,
        pr: 0, // prestiges
        hms: 0,

        sw: 0,
        gs: 0,
        tgems: 0,
        artifactScrap: 0,
        si: 0,
        ame: 0,
        bags: 0,

        gifts: 0,
        cakes: 0,
        qian: 0,
        eggs: 0,

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
}

const emptyGame = Object.assign({}, game, {});

// SETTINGS
var settings = {
    music: false,
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
}

// BETA (cheating)
var BETA = {};
Object.defineProperty(BETA, 'isBeta', {
    value: false,
    writable: false,
    enumerable: true,
    configurable: false
});