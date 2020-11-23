var userId = localStorage.getItem('id'),
    userKey = localStorage.getItem('key'),
    userFullName = localStorage.getItem('full_name'),
    userEmailAddress = localStorage.getItem('email_address'),
    userPassword = localStorage.getItem('p'),
    userContactNumber = localStorage.getItem('contact_number'),
    userAddress = localStorage.getItem('address'),
    userOccupation = localStorage.getItem('occupation'),
    userAccountType = localStorage.getItem('account_type'),
    userDateTimeRegistered = localStorage.getItem('date_time_registered'),
    userProfileIcon = localStorage.getItem('profile_picture'),
    userStatus = localStorage.getItem('status'),
    sub = "/",
    users = "USERS/",
    credentials = "CREDENTIALS/",
    provider = new firebase.auth.GoogleAuthProvider(),
    date = new Date(),
    time = date.getHours() + date.getMinutes() + date.getSeconds(),
    dd = String(date.getDate()).padStart(2, '0'),
    mm = String(date.getMonth() + 1).padStart(2, '0'),
    yyyy = date.getFullYear(),
    fullDate = mm+dd+yyyy,
    currentDate = yyyy + '-' + mm + '-' + dd,
    currentTime = Date().slice(16,25),
    fullCurrentDateTime = currentDate + ' ' + currentTime,
    userKey = "USER" + KEY_CODE(3) + fullDate + time,
    defaultUserIconPlaceholder = "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";

function KEY_CODE(len, charSet) {
    charSet = charSet || 'ABCDFGHIJKLMNOPQRSTUVWXYZ'+'0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function RELOAD_PAGE() {
	location.reload();
}

function MODAL(id, action) {
   $(id).modal(action);
}

function TEST_USER() {
  var userId = "";
  INSERT_USER(userId, "John Doe Testing", "j@j.com", "123qwe", "09166860971", 
              "London New York City, United States of Kingdom USUK", "Developer", "Author", false);
}

function INSERT_USER(userId, userFullName, userEmailAddress, userPassword, userContactNumber, userAddress, userOccupation, userAccountType, userAction) {
    if (!userAction) {
        firebase.auth().createUserWithEmailAndPassword(userEmailAddress, userPassword).then(function(user) {
            userId = firebase.auth().currentUser.uid;
            database.ref(users + userKey + sub + credentials).set({
                id: userId,
                key: userKey,
                full_name: userFullName,
                email_address: userEmailAddress,
                password: userPassword,
                contact_number: userContactNumber,
                address: userAddress,
                occupation: userOccupation,
                account_type: userAccountType,
                date_time_registered: fullCurrentDateTime,
                profile_picture: defaultUserIconPlaceholder,
                status: userStatus
            });
        });
    } else {
        database.ref(users + userKey + sub + credentials).set({
            id: userId,
            key: userKey,
            full_name: userFullName,
            email_address: userEmailAddress,
            password: userPassword,
            contact_number: userContactNumber,
            address: userAddress,
            occupation: userOccupation,
            account_type: userAccountType,
            date_time_registered: fullCurrentDateTime,
            profile_picture: defaultUserIconPlaceholder,
            status: userStatus
        });
    }
}

function SET_USER_PROFILE() {
//    $("#view_id____________").attr("src", user____________);
}