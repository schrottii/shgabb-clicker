// Game made by Schrottii - editing or stealing is prohibited!

const profileCanvas = document.getElementById("profileCanvas");
const pctx = profileCanvas.getContext("2d");

var profileCanvasWidth = 10;
var profileCanvasHeight = 10;
var profileTextSizeMulti = 1;

let pfp = new Image();
pfp.src = "images/achievements/ameliorer.png";

function calculateProfileCanvasSize() {
    profileCanvasWidth = window.innerWidth;
    profileCanvasHeight = profileCanvasWidth / 2;
    profileTextSizeMulti = Math.max(1, (window.innerWidth - 312) / 312);

    profileCanvas.width = profileCanvasWidth;
    profileCanvas.height = profileCanvasHeight;
}

function renderPlayerProfile() {
    calculateProfileCanvasSize();
    let w = profileCanvasWidth ;
    let h = profileCanvasHeight ;

    // Background
    pctx.fillStyle = "darkgray";
    pctx.fillRect(0, 0, w, h);

    // PFP
    pctx.fillStyle = "black";
    pctx.fillRect(w * 0.05, w * 0.05, w * 0.3, w * 0.3);
    pctx.drawImage(pfp, w * 0.075, w * 0.075, w * 0.25, w * 0.25);

    // Name
    pctx.font = (20 * profileTextSizeMulti) + "px Times New Roman";
    ctx.textAlign = "left";
    pctx.fillText("Max Mustermann", w * 0.4, w * 0.1)

    // Stats
    pctx.font = (16 * profileTextSizeMulti) + "px Times New Roman";
    pctx.fillText("Highest More Shgabb: 4500", w * 0.4, w * 0.2)
    pctx.fillText("Artifacts Unlocked: 20/45", w * 0.4, w * 0.25)
    pctx.fillText("Achievements: 65/70", w * 0.4, w * 0.3)
}