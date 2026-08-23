// server commands :3
// 1. /playercount
async function client_playercount() {
    // simply asks for the player count (last 30 days)
    //if (getOrigin() == "private") return;
    console.log("/playercount");

    callServer("playercount", { });
}

function client_playercount_reply(data) {
    console.log("player count: " + data.onlineLast30Days);
    ui.playercount.innerHTML = "Players in last 30 days: " + data.onlineLast30Days;
}

// 2. /logincheck
async function client_account_logincheck() {
    // checks if we are logged in
    //if (getOrigin() == "private") return;
    console.log("/logincheck");
    callServer("logincheck");
}

function client_account_logincheck_reply(data) {
    let prettyFormat = "Login info: " + (data.isLoggedIn == false ? "not " : "") + "logged in";
    console.log(prettyFormat);
    ui.server_loggedin.innerHTML = prettyFormat;
    isLoggedIn = data.isLoggedIn;
}

// 3. /register
async function client_account_register() {
    // create new cloud save account

    //if (getOrigin() == "private") return;
    console.log("/register");

    // okay, let me be clear: game is already some time old, so in case people shared their acc,
    // using the pre - existing ID for login might not be the best solution
    // also, it can be edited, so what if 2 people edit their ID to be the same? all kinds of stuff like that
    // -> the local & pre-existing "name" and "ID", are important for this game, and the local save only
    // they are still saved onto the server to quickly find players

    // structure of a player looks like:
    // server ID (1, 2, 3) ~ acc_name ~ acc_password ~ extras (including: ingame_name, ingame_id & other relevant things) ~ save
    // so, upon registering (this function), we need the user to enter a name and a password, and add it to the db

    // who do we want to be?
    let userName = document.getElementById("cloudSave-username") != null ? document.getElementById("cloudSave-username").value : "";
    let userPassword = document.getElementById("cloudSave-password") != null ? document.getElementById("cloudSave-password").value : "";
    let userEmail = document.getElementById("cloudSave-email") != null ? document.getElementById("cloudSave-email").value : "";

    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Trying to register...";

    // validation (e.g. username already exists) is done on the server
    // using the name and password provided by the user
    if (userName.length > 0 && userPassword.length > 5 && userEmail.length > 0) {
        callServer("register", { username: userName, password: userPassword, email: userEmail });
    }
    else {
        if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Username and password can't be empty!";
    }
}

function client_account_register_reply(data) {
    // data contains: success, nameValid, pwValid
    let message;
    if (data.success) {
        message = "Registering successful. Check your email for verification code."; // i love if or else ^w^
        if (document.getElementById("verifyCodeArea")) {
            document.getElementById("verifyCodeArea").style.display = "";
        }
    }
    else if (!data.nameValid) message = "Username already exists";
    else if (!data.pwValid) message = "Password is too short";
    else if (!data.emailValid) message = "Email already exists";
    else message = "Registering not successful, unknown error";

    console.log("register: " + message);

    // put it into the UI
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = message;
}

// 4. verify email
async function client_verify_email(email = "", code = "") {
    if (document.getElementById("verify-code")) {
        email = document.getElementById("cloudSave-email") ? document.getElementById("cloudSave-email").value : "";
        code = document.getElementById("verify-code").value;
    }
    console.log(email, code);
    callServer("verify_email", { email: email, code: code });
}

function client_verify_email_reply(data) {
    console.log("verify_email: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
    if (data.success) {
        client_account_logincheck();
    }
}

// 5. resend verification
async function client_resend_verification(email = "") {
    if (!email && document.getElementById("cloudSave-email")) {
        email = document.getElementById("cloudSave-email").value;
    }
    callServer("resend_verification", { email: email });
}

function client_resend_verification_reply(data) {
    console.log("resend_verification: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
}

// 6. request password reset
async function client_request_password_reset(email) {
    callServer("request_password_reset", { email: email });
}

function client_request_password_reset_reply(data) {
    console.log("request_password_reset: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
}

// 7. confirm password reset
async function client_confirm_password_reset(email, code, newPassword) {
    callServer("confirm_password_reset", { email: email, code: code, newPassword: newPassword });
}

function client_confirm_password_reset_reply(data) {
    console.log("confirm_password_reset: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
}

// 8. /login
async function client_account_login() {
    //if (getOrigin() == "private") return;
    console.log("/login");

    // who do we log in as?
    let userName = document.getElementById("cloudSave-username") != null ? document.getElementById("cloudSave-username").value : "";
    let userPassword = document.getElementById("cloudSave-password") != null ? document.getElementById("cloudSave-password").value : "";
    let userEmail = document.getElementById("cloudSave-email") != null ? document.getElementById("cloudSave-email").value : "";

    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Trying to log in...";

    // validation is done on the server
    if (userName.length > 0 && userPassword.length > 5) {
        callServer("login", { username: userName, password: userPassword, email: userEmail });
    }
    else {
        if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Username and password can't be empty!";
    }
}

function client_account_login_reply(data) {
    // data contains: success, nameValid, pwValid
    let message = "";
    if (data.success) message = "Login successful";
    else if (!data.nameValid) message = "Username is incorrect / does not exist";
    else if (!data.pwValid) message = "Password is incorrect";
    else if (!data.emailValid) message = "Email is invalid";
    else message = "Login not successful, unknown error";

    console.log("login: " + message);
    if (data.success) client_account_logincheck();

    // put it into the UI, uhh
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = message;

    // cache our login!
    if (data.success) {
        localStorage.setItem("balnoomLogin", JSON.stringify({ name: data.name, pw: data.pw, email: data.email }));

        socket.close();
        connectToServer();
    }
}

// 9. old game version (reply only)
function client_old_version_reply(data) {
    // reply only - no request
    // data contains: clientVer, serverVer

    let conq = confirm("There is an update avaialable! Do you want to refresh?\nYour version: v" + data.clientVer + " - server version: v" + data.serverVer)

    if (conq) {
        autoSave("manual");
        window.location.reload();
    }
}

// 10. upload cloud save
function client_cloud_upload() {
    //console.log("giving data: " + JSON.stringify(game));
    callServer("cloud_upload", { saveData: JSON.stringify(game) });
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Trying to upload cloud save...";
}

function client_cloud_upload_reply(data) {
    console.log("cloud save success: " + data.success);
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Uploaded save successfully!";
}

// 11. download cloud save
function client_cloud_download() {
    callServer("cloud_download");
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Trying to download your cloud save...";
}

function client_cloud_download_reply(data) {
    console.log("cloud save success: " + data.success);
    if (data.success) {
        console.log(data.savedata);
        if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Downloaded your save successfully. Length: " + data.savedata.length;

        if (confirm("Do you want to load that save?")) {
            importGame(data.savedata);
        }
        else {
            navigator.clipboard.writeText(data.savedata);
            createNotification("Game exported to clipboard");
        }
    }
    else {
        if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "There is no save or it could not be reached.";
    }
}

// 12. /logout
function client_account_logout() {
    console.log("/logout");

    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Trying to log out...";

    callServer("logout", { });
}

function client_account_logout_reply(data) {
    client_account_logincheck();

    // UI
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Logged out";

    // log out from cache
    localStorage.setItem("balnoomLogin", JSON.stringify({ name: undefined, pw: undefined, email: undefined }));
}