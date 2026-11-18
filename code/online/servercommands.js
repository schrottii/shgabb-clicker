// server commands :3
// 1. /playercount
async function client_playercount() {
    // simply asks for the player count (last 30 days)
    //if (getOrigin() == "private") return;
    console.log("/playercount");

    callServer("playercount", {});
}

function client_playercount_reply(data) {
    //console.log("player count: " + data.onlineLast30Days);
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
    console.log("/register");
    //if (getOrigin() == "private") return;

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
    if (userName.length > 0 && userPassword.length > 5) {
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
        if (data.requiresVerification) {
            message = "Registering successful. Check your email for verification code."; // i love if or else ^w^
            if (document.getElementById("verifyCodeArea")) {
                document.getElementById("verifyCodeArea").style.display = "";
            }
        }
        else {
            message = "Registration successful! You can now log in.";
        }
    }
    else if (data.linkingEmail) {
        message = "Verification code sent! Enter code below to link email.";
        if (document.getElementById("verifyCodeArea")) {
            document.getElementById("verifyCodeArea").style.display = "";
        }
    }
    else if (data.message) message = data.message;
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
    //console.log(email, code);
    callServer("verify_email", { email: email, code: code });
}

function client_verify_email_reply(data) {
    console.log("verify_email: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
    if (data.success) {
        let userName = document.getElementById("cloudSave-username") ? document.getElementById("cloudSave-username").value : "";
        let userPassword = document.getElementById("cloudSave-password") ? document.getElementById("cloudSave-password").value : "";
        if (userName && userPassword) {
            localStorage.setItem("balnoomLogin", JSON.stringify({ name: userName, pw: userPassword, email: data.email || "" }));
            awardAchievement(241);
        }
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

var resetPasswordEmail = "";
var resetPasswordCode = "";

// 6. request password reset
async function client_request_password_reset(email = "") {
    if (!email && document.getElementById("cloudSave-email") != null) {
        email = document.getElementById("cloudSave-email").value.trim();
    }
    resetPasswordEmail = email;
    callServer("request_password_reset", { email: email });
}

function client_request_password_reset_reply(data) {
    //console.log("request_password_reset: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
}

// 7. confirm password reset
async function client_confirm_password_reset(email = "", code = "", newPassword = "") {
    if (!email) {
        if (resetPasswordEmail) {
            email = resetPasswordEmail;
        } else if (document.getElementById("cloudSave-email") != null) {
            email = document.getElementById("cloudSave-email").value.trim();
        }
    }
    if (!code) {
        if (resetPasswordCode) {
            code = resetPasswordCode;
        } else if (document.getElementById("verify-code") != null) {
            code = document.getElementById("verify-code").value.trim();
        }
    }
    if (!newPassword && document.getElementById("cloudSave-password") != null) {
        newPassword = document.getElementById("cloudSave-password").value;
    }
    resetPasswordEmail = email;
    resetPasswordCode = code;
    callServer("confirm_password_reset", { email: email, code: code, newPassword: newPassword });
}

function client_submit_new_password() {
    let p1 = document.getElementById("newpassword") ? document.getElementById("newpassword").value : "";
    let p2 = document.getElementById("newpassword2") ? document.getElementById("newpassword2").value : "";
    if (p1.length <= 5) {
        if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Password must be at least 6 characters long.";
        return;
    }
    if (p1 !== p2) {
        if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Passwords do not match!";
        return;
    }
    client_confirm_password_reset(resetPasswordEmail, resetPasswordCode, p1);
}

function client_confirm_password_reset_reply(data) {
    //console.log("confirm_password_reset: " + data.message);
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = data.message;
    if (data.success) {
        if (currentModal === "resetpassword") {
            toggleModal("resetpassword", "close");
            toggleModal("resetpassword2");
        } else if (currentModal === "resetpassword2") {
            resetPasswordEmail = "";
            resetPasswordCode = "";
        }
    }
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
    // data contains: success, nameValid, pwValid, isVerified
    let message = "";
    if (data.success) message = "Login successful";
    else if (data.message && !data.linkingEmail) message = data.message;
    else if (!data.nameValid) message = "Username is incorrect / does not exist";
    else if (!data.pwValid) message = "Password is incorrect";
    else if (!data.emailValid) message = "Email is invalid or already taken";
    else if (data.linkingEmail) message = data.message || "Verification code sent! Enter code below to link email.";
    else if (data.isVerified === false) message = "Please verify your email before logging in";
    else message = "Login not successful, unknown error";

    if ((data.isVerified === false || data.linkingEmail) && document.getElementById("verifyCodeArea") != null) {
        document.getElementById("verifyCodeArea").style.display = "";
    }
    if (data.success && data.isVerified && data.emailValid) {
        // email is verified
        awardAchievement(241);
    }

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

    let conq = confirm("There is an update available! Do you want to refresh?\nYour version: v" + data.clientVer + " - server version: v" + data.serverVer)

    if (conq) {
        autoSave("manual");
        window.location.reload();
    }
}

// 10. upload cloud save
function client_cloud_upload() {
    //console.log("giving data: " + JSON.stringify(game));
    console.log("/cloud_upload");
    callServer("cloud_upload", { saveData: JSON.stringify(game) });
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Trying to upload cloud save...";
    savedTo.cloudsave = true;
}

function client_cloud_upload_reply(data) {
    //console.log("cloud save success: " + data.success);
    if (data.success) savedTo.cloudsave = true;
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Uploaded save successfully!";
}

// 11. download cloud save
function client_cloud_download() {
    console.log("/cloud_download");
    callServer("cloud_download");
    if (document.getElementById("cloudSaveStatus")) document.getElementById("cloudSaveStatus").innerHTML = "Trying to download your cloud save...";
}

function client_cloud_download_reply(data) {
    console.log("cloud save success: " + data.success);

    if (data.success) {
        loadedCloudSave = data.savedata;
        //console.log(loadedCloudSave);
        let romantic = new Date(data.updated);
        romantic = romantic.toLocaleDateString();
        if (romantic == undefined) romantic = "Unknown";

        if (document.getElementById("cloudSaveStatus")) {
            document.getElementById("cloudSaveStatus").innerHTML = "Downloaded your save successfully.";
            document.getElementById("cloudSaveStatus2").innerHTML = "Length: " + data.savedata.length
                + "<br />Name: " + data.name
                + "<br />HMS: " + data.hms
                + "<br />Last updated: " + romantic;
            document.getElementById("loadedcloudsaveArea").style.display = "";
        }
    }
    else {
        if (document.getElementById("cloudSaveStatus")) {
            document.getElementById("cloudSaveStatus").innerHTML = "There is no save or it could not be reached.";
            document.getElementById("loadedcloudsaveArea").style.display = "none";
        }
    }
}

// 12. /logout
function client_account_logout() {
    console.log("/logout");

    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Trying to log out...";

    callServer("logout", {});
}

function client_account_logout_reply(data) {
    client_account_logincheck();

    // UI
    if (document.getElementById("accountLoginStatus")) document.getElementById("accountLoginStatus").innerHTML = "Logged out";

    // log out from cache
    localStorage.setItem("balnoomLogin", JSON.stringify({ name: undefined, pw: undefined, email: undefined }));
}

// 13. /redeem_reward_code
function client_redeem_reward_code(data) {
    // user tries a code (like FREEGEMSWOW)
    // we check if the code is real, what it has, and if you already got it
    console.log("/redeem_reward_code");
    let code = data.input;
    if (code == undefined || code == "") return false;

    callServer("redeem_reward_code", { code: code });
}

function client_redeem_reward_code_reply(data) {
    // message, success, valtype, value, code, expires, valmessage
    alert(data.message);
    if (data.valmessage) alert(data.valmessage);
    //console.log(data);

    if (data.success) {
        let value = parseInt(data.value);

        if (data.valtype == "startVer") game.profile.startVer = value;
        else if (data.valtype == "startDate") game.profile.startDate = value;
        else {
            if (typeof (game[data.valtype]) == "object") game[data.valtype] = game[data.valtype].add(value);
            else game[data.valtype] = game[data.valtype] + value;
        }

        game.red_rew.push([data.code, data.expires]); // still needed for achievement and such
    }
}