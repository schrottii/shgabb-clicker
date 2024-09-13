// Game made by Schrottii - editing or stealing is prohibited!

// variables
var canvas = document.getElementById("minigame");
var ctx = canvas.getContext("2d");
var musicPlayer = document.getElementById("musicPlayer");

var delta = 0;
var time = Date.now();

var width = 0;
var height = 0;

// the holy quattroformaggi
var images = {
    button: "rough.png",
    empty: "empty.png",

    minigames: "minigames.png",
    minigames2: "minigames2.png",
    cd1: "cd1.png",
    cd2: "cd2.png",
    cd3: "cd3.png",
    sssx: "sss-x.png",
    ssso: "sss-o.png",
    sssn: "sss-n.png",

    waves: "waves.png",
    waves2: "waves2.png",
    water: "water.png",
    water2: "water2.png",
    fishlvl: "fishlvl.png",
    bobby: "bobby.png",
}

var scenes = {

}

var objects = {

}

var foregroundObjects = {

}

var clickables = {

}

// loading stuff
var loadingImages = 0;
var loadedImages = 0;

function loadImages() {
    for (let image in images) {
        let img = new Image();
        img.src = "images/" + images[image];
        img.onload = () => {
            loadedImages++;
            if (loadingImages == loadedImages) {
                console.log("all images loaded");
                init(); // start game
            }
        }
        images[image] = img;
        loadingImages++;
    }
}

// scene stuff
var currentScene = "none";

class Scene {
    constructor(init, loop) {
        this.init = init;
        this.loop = loop;
    }
}

function loadScene(sceneName) {
    // console.log("loading scene: " + sceneName)
    if (scenes[sceneName] == undefined) return false;

    currentScene = sceneName;

    objects = {};
    foregroundObjects = {};
    clickables = {};

    groundAnimation = 0;

    scenes[sceneName].init();
}

// event listeners and their functions
canvas.addEventListener("pointerdown", onClick);

function onClick(e) {
    let mouseX = e.clientX - canvas.getBoundingClientRect().x;
    let mouseY = e.clientY - canvas.getBoundingClientRect().y;

    for (c in clickables) {
        if (clickables[c] == undefined) return false;
        if (mouseX > clickables[c][0] * width && mouseY > clickables[c][1] * height
            && mouseX < clickables[c][0] * width + clickables[c][2] * width && mouseY < clickables[c][1] * height + clickables[c][3] * height) {
            // is in the hitbox
            clickables[c][4]();
        }
    }
}

// object functions
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(width * this.x, height * this.y, width * this.w, height * this.h);
    }
}

class Picture {
    constructor(x, y, w, h, image, quadratic) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.quadratic = quadratic;
    }

    render() {
        if (this.rotate) ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2)); ctx.rotate(this.rotate);

        if (this.snip) ctx.drawImage(images[this.image], this.snip[0], this.snip[1], this.snip[2], this.snip[3], this.quadratic ? (width * this.x) - ((height * this.w) / 2) : width * this.x, height * this.y, this.quadratic ? height * this.w : width * this.w, height * this.h);
        else ctx.drawImage(images[this.image], this.quadratic ? (width * this.x) - ((height * this.w) / 2) : width * this.x, height * this.y, this.quadratic ? height * this.w : width * this.w, height * this.h);
        if (this.rotate) ctx.translate(-this.x - (this.w / 2), -this.y - (this.h / 2)); ctx.rotate(0);
    }
}

class Text {
    constructor(x, y, text, color, fontSize, textAlign) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    render() {
        ctx.fillStyle = this.color ? this.color : "black";
        ctx.font = ((this.fontSize ? this.fontSize : 20) * (Math.pow(window.innerWidth, 0.75) / 240)) + "px Rw";
        ctx.textBaseline = "bottom";
        ctx.textAlign = this.textAlign ? this.textAlign : "center";

        ctx.fillText(this.text, width * this.x, height * this.y);
    }
}

function isMobile() {
    //if (save.settings.device == "pc") return false;
    //if (save.settings.device == "mobile") return true;
    return /Mobi/i.test(window.navigator.userAgent) || width <= 480;
}

// create functions
function createSquare(name, x, y, w, h, color) {
    if (objects[name] == undefined) objects[name] = new Square(x, y, w, h, color);
}

function createImage(name, x, y, w, h, image, quadratic = false, foreground = false) {
    if (!foreground) {
        if (objects[name] == undefined) objects[name] = new Picture(x, y, w, h, image, quadratic);
    }
    else if (foregroundObjects[name] == undefined) foregroundObjects[name] = new Picture(x, y, w, h, image, quadratic);
}

function createText(name, x, y, text, color, fontSize, textAlign = "", foreground = false) {
    if (!foreground) {
        if (objects[name] == undefined) objects[name] = new Text(x, y, text, color, fontSize, textAlign);
    }
    else if (foregroundObjects[name] == undefined) foregroundObjects[name] = new Text(x, y, text, color, fontSize, textAlign);
}

function createClickable(clickableName, x, y, w, h, onClick) {
    if (clickables[clickableName] == undefined) {
        clickables[clickableName] = [x, y, w, h, onClick];
    }
}

function createButton(clickableName, x, y, w, h, color, onClick, quadratic = false) {
    if (objects[clickableName] == undefined && clickables[clickableName] == undefined) {
        objects[clickableName] = new Picture(x, y, w, h, color, quadratic);
        if (quadratic) clickables[clickableName] = [x - (h / 2), y, h, h, onClick];
        else clickables[clickableName] = [x, y, w, h, onClick];
    }

}

// loop
function gamesLoop() {
    // The game's main loop

    // Tick time
    delta = Date.now() - time;
    time = Date.now();

    // Resize the canvas
    if (window.innerWidth <= 480) {
        // mobile
        canvas.style.width = (width = canvas.width = window.innerWidth * 0.96) + "px";
        canvas.style.height = (height = canvas.height = window.innerWidth * 0.96 / 1.7777777777777777777777777777778) + "px";
    }
    else {
        // PC
        canvas.style.width = (width = canvas.width = window.innerWidth * 0.8) + "px";
        canvas.style.height = (height = canvas.height = window.innerWidth * 0.8 / 1.7777777777777777777777777777778) + "px";
    }
    ctx.imageSmoothingEnabled = false; // praise jesus

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1 * width, 1 * height);
    ctx.fillStyle = "brown";
    ctx.fillRect(0.01 * width, 0.01 * height, 0.98 * width, 0.98 * height);

    if (currentScene != "none") {
        scenes[currentScene].loop(delta / 1000);

        for (o in objects) {
            objects[o].render();
        }
        for (o in foregroundObjects) {
            foregroundObjects[o].render();
        }
    }
    else {
        // Loading images / no scene selected
        ctx.font = "40px Times New Roman";
        ctx.fillStyle = "white";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";

        ctx.fillText("Minigames", width / 2, height * 0.15);
        if (loadedImages == loadingImages) ctx.fillText("Click to start!", width / 2, height / 2);
        else ctx.fillText("Loaded: " + loadedImages + "/" + loadingImages, width / 2, height / 2);
    }
}

// init the game
ctx.imageSmoothingEnabled = false;

loadImages();
function init() {
    // musicPlayer.loop = true;

    createClickable("startMusic", 0, 0, 1, 1, () => {
        loadScene("minigameSelection");
    });
}