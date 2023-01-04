// Main JS File

var ui = {
    shgabbAmount: document.getElementById("shgabbAmount")
}

function clickButton() {
    game.shgabb += 1;
}

function updateUI() {
    ui.shgabbAmount.innerHTML = game.shgabb + " Shgabb"
}

setInterval("updateUI()", 1000 / 30); // 30 FPS