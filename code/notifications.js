var currentNotifications = [];
var autoNotifications = 0; // how many times auto saved
var popupDisplayTimer = 0;
const MAX_NOTIFICATIONS = 20;

function createNotification(raw_text, values = []) {
    let date = new Date();
    let text = raw_text;
    for (let pair of values) {
        text = text.replace(pair[0], pair[1]);
    }

    // create the notification
    currentNotifications.push({
        line: text,
        base: raw_text,
        time: date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    });

    // remove oldest if full
    if (currentNotifications.length > MAX_NOTIFICATIONS) {
        notificationsConfigUpdated = 0;
        currentNotifications.shift();
    }
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

var notificationsConfigToggle = false;
var notificationsConfigUnique = [];
var notificationsConfigUpdated = 0;
var notificationsConfigUniqueList = 0;
function notificationsConfig() {
    notificationsConfigToggle = !notificationsConfigToggle; // for the renderer to know
    notificationsConfigUniqueList = 0;
    notificationsConfigUpdated = 0; // force update
    renderNotifications();
}

function updateNotificationsConfigList() {
    // don't update if already updated
    if (notificationsConfigUpdated == currentNotifications.length - 1) return false;

    if (notificationsConfigUnique.length == 0 && settings.notifications != undefined) {
        for (let n in settings.notifications) {
            notificationsConfigUnique.push(n);
        }
    }

    //notificationsConfigUnique = [];
    for (let n of currentNotifications) {
        if (!notificationsConfigUnique.includes(n.base)) notificationsConfigUnique.push(n.base);
    }
    notificationsConfigUpdated = currentNotifications.length - 1;
    return true;
}

function configureNotification(rawnotif, type) {
    settings.notifications[rawnotif] = type;
    createNotification("Notification NOTIF is now: TYPE", [["NOTIF", rawnotif], ["TYPE", type]]);
    checkAchievement(218);

    notificationsConfigUniqueList = 0;
    notificationsConfigUpdated = 0; // force update
    renderNotifications();
}

function getNotificationConfig(rawnotif) {
    if (settings.notifications[rawnotif] != undefined) return settings.notifications[rawnotif];
    return "all";
}

function renderNotifications() {
    // might seem weird to put this thing this high, but it optimizes notification rendering by not doing it if there's nothing new
    if (!updateNotificationsConfigList()) return false;

    let render = "";

    render += "<button class='grayButton' style='float:left; display: absolute;' onclick='notificationsConfig();'>Config</button>";
    render += "<h3 style='text-align: center;'>Notifications</h3>";

    // notifications area
    if (!notificationsConfigToggle) {
        // render notifications into the area
        let n2 = MAX_NOTIFICATIONS;
        let bolded = false;
        for (let n in currentNotifications) {
            if (getNotificationConfig(currentNotifications[n].base) == "all" || getNotificationConfig(currentNotifications[n].base) == "area") {
                bolded = n == currentNotifications.length - 1;
                render += (bolded ? "<b>" : "") + currentNotifications[n].line + (bolded ? "</b>" : "")
                    + " (" + currentNotifications[n].time + ")<br />";
                n2 -= 1;
            }
        }
        if (n2 > 0) render += "<br />".repeat(n2);
        ui.notifications.innerHTML = render;
    }
    else if (notificationsConfigUniqueList != notificationsConfigUnique.length) {
        // render config into the area

        for (let n of notificationsConfigUnique) {
            render += "<span style='display: block; text-align: right;' class='grayButton'><b>" + n + "</b> ~ "
                + "<button onclick='configureNotification(`" + n + "`, `all`)' " + (getNotificationConfig(n) == "all" ? "style='background-color: yellow;'" : "")
                + ">Show all</button> ~ "
                + "<button onclick='configureNotification(`" + n + "`, `hide`)' " + (getNotificationConfig(n) == "hide" ? "style='background-color: yellow;'" : "")
                + ">Hide</button> ~ "
                + "<button onclick='configureNotification(`" + n + "`, `top`)' " + (getNotificationConfig(n) == "top" ? "style='background-color: yellow;'" : "")
                + ">Top/SB only</button> ~ "
                + "<button onclick='configureNotification(`" + n + "`, `area`)' " + (getNotificationConfig(n) == "area" ? "style='background-color: yellow;'" : "")
                + ">Area only</button>"
                + "</span>";
        }
        notificationsConfigUniqueList = notificationsConfigUnique.length;
        ui.notifications.innerHTML = render;
    }



    // top / sidebar
    let topNotifsRender = "";
    let n = 0;
    let notif = "";
    for (let i = 1; n < settings.topNotifs && i < Object.keys(currentNotifications).length; i++) {
        notif = currentNotifications[(Object.keys(currentNotifications).length - i)];
        //console.log("i:" + i + ", n: " + n + ", l: " + line);
        if (notif.line != undefined) {
            if (getNotificationConfig(notif.base) == "all" || getNotificationConfig(notif.base) == "top") {
                topNotifsRender = topNotifsRender + notif.line + (n != settings.topNotifs ? "<br />" : "");
                n++;
            }
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