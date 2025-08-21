var currentNotifications = [];
var autoNotifications = 0; // how many times auto saved
var popupDisplayTimer = 0;

function createNotification(text) {
    currentNotifications.push(text);
    if (currentNotifications.length > 20) currentNotifications.shift();
}

function createPopup(title, text, img) {
    if (!settings.popups) return false;

    let num = settings.sidebar ? "2" : "";
    ui.popup.style.display = settings.sidebar ? "none" : "";
    ui.popup2.style.display = settings.sidebar ? "" : "none";

    ui["popupText" + num].innerHTML = title;
    ui["popupImage" + num].src = "images/" + img;
    ui["popupName" + num].innerHTML = text;
    ui["popup" + num].style.display = "block";
    popupDisplayTimer = 5;
}

function tickPopup(time) {
    popupDisplayTimer -= time;
    if (popupDisplayTimer <= 0 && ui.popup.style.display != "none") {
        ui.popup.style.display = "none";
    }
}