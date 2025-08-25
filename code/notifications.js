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
    if (popupDisplayTimer <= 0 && (ui.popup.style.display != "none" || ui.popup2.style.display != "none")) {
        ui.popup.style.display = "none";
        ui.popup2.style.display = "none";
    }
}

function renderNotifications() {
    ui.notifications.innerHTML = "";
    let n2 = 15;
    for (n in currentNotifications) {
        if (n == currentNotifications.length - 1) ui.notifications.innerHTML = ui.notifications.innerHTML + "<b>" + currentNotifications[n] + "</b><br />";
        else ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n] + "<br />";
        n2 -= 1;
    }
    while (n2 > 0) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + "<br />";
        n2 -= 1;
    }

    let topNotifsRender = "";
    for (i = 1; i < settings.topNotifs + 1; i++) {
        if (currentNotifications[(Object.keys(currentNotifications).length - i)] != undefined && currentNotifications[Object.keys(currentNotifications).length - i].substr(0, 10) != "Game saved") {
            topNotifsRender = topNotifsRender + currentNotifications[Object.keys(currentNotifications).length - i] + (i != settings.topNotifs ? "<br />" : "");
        }
        else topNotifsRender = topNotifsRender + (i != settings.topNotifs ? "-<br />" : "-");
    }

    if (settings.sidebar) {
        ui.newestNotification2.innerHTML = topNotifsRender;
        ui.newestNotification.style.display = "none";
        ui.newestNotification2.style.display = "";
    }
    else {
        ui.newestNotification.innerHTML = topNotifsRender;
        ui.newestNotification.style.display = "";
        ui.newestNotification2.style.display = "none";
    }
}