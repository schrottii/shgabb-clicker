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
    if (!settings.popups) popupDisplayTimer = 0;
    else popupDisplayTimer -= time;

    if (popupDisplayTimer <= 0 && (ui.popup.style.display != "none" || ui.popup2.style.display != "none")) {
        ui.popup.style.display = "none";
        ui.popup2.style.display = "none";
    }
}

function popupClick() {
    popupDisplayTimer = 0;
}

function renderNotifications() {
    ui.notifications.innerHTML = "";

    // notifications area
    let n2 = 15;
    for (let n in currentNotifications) {
        if (n == currentNotifications.length - 1) ui.notifications.innerHTML = ui.notifications.innerHTML + "<b>" + currentNotifications[n] + "</b><br />";
        else ui.notifications.innerHTML = ui.notifications.innerHTML + currentNotifications[n] + "<br />";
        n2 -= 1;
    }
    while (n2 > 0) {
        ui.notifications.innerHTML = ui.notifications.innerHTML + "<br />";
        n2 -= 1;
    }

    // top / sidebar
    let topNotifsRender = "";
    let n = 0;
    let line = "";
    for (let i = 1; n < settings.topNotifs && i < Object.keys(currentNotifications).length; i++) {
        line = currentNotifications[(Object.keys(currentNotifications).length - i)];
        //console.log("i:" + i + ", n: " + n + ", l: " + line);
        if (line != undefined && line.substr(0, 10) != "Game saved") {
            topNotifsRender = topNotifsRender + line + (n != settings.topNotifs ? "<br />" : "");
            n++;
        }
        else continue; // auto notifs
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