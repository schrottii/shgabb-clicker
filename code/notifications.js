var currentNotifications = [];
var autoNotifications = 0; // how many times auto saved
var popupDisplayTimer = 0;

function createNotification(text) {
    currentNotifications.push(text);
    if (currentNotifications.length > 20) currentNotifications.shift();
}

function createPopup(title, text, img) {
    if (!settings.popups) return false;

    ui.popupText.innerHTML = title;
    ui.popupImage.src = "images/" + img;
    ui.popupName.innerHTML = text;
    ui.popup.style.display = "block";
    popupDisplayTimer = 5;
}

function tickPopup(time) {
    popupDisplayTimer -= time;
    if (popupDisplayTimer <= 0 && ui.popup.style.display != "none") {
        ui.popup.style.display = "none";
    }
}