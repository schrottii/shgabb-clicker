// Game made by Schrottii - editing or stealing is prohibited!

var game = {
    shgabb: 0,
    clickCooldown: 0,
    sw: 0,
    gs: 0,
    si: 0,
    ame: 0,
    ameUp: [0, 0, 0, 0],
    gems: 0,
    gemboost: 1,
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
        // GS
        divineShgabb: 0,
        shortCD: 0,
        gsBoost1: 0,
        gsBoost2: 0,
        unlockMax: 0,
        unlockMSW: 0,
        firstBoostsClicks: 0,
        cheese: 0,
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
        fourthArtifactSlot: 0,
    },
    stats: {
        shgabb: 0,
        clicks: 0,
        playTime: 0,
        pttp: 0,
        sw: 0,
        ads: 0,
        gs: 0,
        pr: 0,
        shgabbtp: 0,
        swtp: 0,
        ctp: 0,
        si: 0,
        ame: 0,
        hms: 0,
        hmstp: 0,
        tgems: 0,
        wads: {
            sc: 0,
            sa: 0,
            msw: 0,
            fs: 0,
            mc: 0,
            msi: 0
        }
    },
    a: [],
    aeqi: [],
    alo: [[], [], []],
    ach: [],
}

const emptyGame = Object.assign({}, game, {});

var settings = {
    music: false,
    adMusic: true,
    displayCurrent: false,
    hideMaxed: false,
}