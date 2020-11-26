var userId = localStorage.getItem('id'),
    userGetKey = localStorage.getItem('key'),
    userFullName = localStorage.getItem('full_name'),
    userEmailAddress = localStorage.getItem('email_address'),
    userPassword = localStorage.getItem('p'),
    userContactNumber = localStorage.getItem('contact_number'),
    userAddress = localStorage.getItem('address'),
    userOccupation = localStorage.getItem('occupation'),
    userAccountType = localStorage.getItem('account_type'),
    userDateTimeRegistered = localStorage.getItem('date_time_registered'),
    userProfileIcon = localStorage.getItem('profile_picture'),
    userAbstractUrl = localStorage.getItem('paperAbstractUrl'),
    userFullPaperUrl = localStorage.getItem('fullPaperUrl'),
    userStatus = localStorage.getItem('status'),
    userRegisterEmailAddress = localStorage.getItem('userRegisterEmailAddress'),
    userRegisterAccountType = localStorage.getItem('userRegisterAccountType'),
    userRegisterFullName = localStorage.getItem('userRegisterFullName'),
    userRegisterPassword = localStorage.getItem('userRegisterPassword'),
    userRegisterPreferences = localStorage.getItem('userRegisterPreferences'),
    userRegisterPaperAbstract = localStorage.getItem('userRegisterPaperAbstract'),
    userRegisterFullPaper = localStorage.getItem('userRegisterFullPaper'),
    userRegisterPaperCategories = localStorage.getItem('userRegisterPaperCategories'),
    conferenceBanner = localStorage.getItem('conferenceBanner'),
    conferenceEventKey = localStorage.getItem('conferenceEventKey'),
    conferenceEventTitle = localStorage.getItem('conferenceEventTitle'),
    conferenceEventPlace = localStorage.getItem('conferenceEventPlace'),
    conferenceEventDate = localStorage.getItem('conferenceEventDate'),
    conferenceEventTime = localStorage.getItem('conferenceEventTime'),
    conferenceDescription = localStorage.getItem('conferenceDescription'),
    conferenceCategory = localStorage.getItem('conferenceCategory'),
    conferenceAbstractSubmission = localStorage.getItem('conferenceAbstractSubmission'),
    conferenceFullPaperSubmission = localStorage.getItem('conferenceFullPaperSubmission'),
    conferenceAveragePercentageReport = localStorage.getItem('conferenceAveragePercentageReport'),
    conferenceNumberPapersAccomodated = localStorage.getItem('conferenceNumberPapersAccomodated'),
    conferenceAllowPaperApplication = localStorage.getItem('conferenceAllowPaperApplication'),
    conferenceModeOfReview = localStorage.getItem('conferenceModeOfReview'),
    conferenceDateTimeCreated = localStorage.getItem('conferenceDateTimeCreated'),
    conferenceUserCreatedBy = localStorage.getItem('conferenceUserCreatedBy'),
    userType = localStorage.getItem('userType'),
    technology = "TECHNOLOGY",
    science = "SCIENCE",
    medicine = "MEDICINE",
    academic = "ACADEMIC",
    author = "AUTHOR",
    paperReviewer = "PAPER REVIEWER",
    conferenceChair = "CONFERENCE CHAIR",
    mobile = "MOBILE",
    web = "WEB",
    sub = "/",
    users = "USERS/",
    credentials = "CREDENTIALS/",
    papers = "PAPERS/",
    conferences = "CONFERENCES/",
    programmes = "PROGRAMMES/",
    logs = "LOGS/",
    bookmarks = "BOOKMARKS/",
    loggedInUser = "LOGGED IN USER",
    loggedOutUser = "LOGGED OUT USER",
    registerUser = "REGISTER USER",
    none = "NONE",
    noData = "No available data",
    selectedKey = "",
    enrollment = "ENROLLMENT",
    search = "SEARCH",
    routeKey = "",
    noSubmission = "No Submission",
    submitted = "Submitted",
    processing = "Processing",
    returned = "Returned",
    provider = new firebase.auth.GoogleAuthProvider(),
    storageReference = firebase.storage().ref(),
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
    conferenceKey = "CONF" + KEY_CODE(3) + fullDate + time,
    logKey = "LOGS" + KEY_CODE(3) + fullDate + time,
    bookmarkKey = "BM" + KEY_CODE(3) + fullDate + time,
    isConferenceAvailable = false,
    isMobileAvailable = false,
    defaultUserIconPlaceholder = "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
    noImage = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=6&m=936182806&s=612x612&w=0&h=F5sh9tAuiAtEPNE1NiFZ7mH7-7cjx0q4CXOcxiziFpw=";

function KEY_CODE(len, charSet) {
    charSet = charSet || 'ABCDFGHIJKLMNOPQRSTUVWXYZ'+'0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function REDIRECT(value) {
    window.location.href = value;
}

function RELOAD_PAGE() {
	location.reload();
}

function MODAL(id, action) {
   $(id).modal(action);
}

function USER_CLEAR_LOCAL_STORAGE() {
  localStorage.clear();
}

function INSERT_USER(userId, userEmailAddress, userAccountType, userFullName, userPassword, 
                     userPreferences, userPaperAbstract, userFullPaper, userPaperCategories, type) {
    database.ref(users + userKey + sub + credentials).set({
        id: userId,
        key: userKey,
        full_name: userFullName,
        email_address: userEmailAddress,
        password: userPassword,
        preferences: userPreferences,
        paperAbstractUrl: userPaperAbstract,
        fullPaperUrl: userFullPaper,
        paperCategories: userPaperCategories,
        account_type: userAccountType,
        date_time_registered: fullCurrentDateTime,
        profile_picture: defaultUserIconPlaceholder,
        status: 1
    });
    INSERT_USER_LOGS(userId, userKey, userFullName, userEmailAddress, userPassword, userFullPaper, userPaperAbstract,
                     userPaperCategories, userPreferences, userAccountType, fullCurrentDateTime, defaultUserIconPlaceholder,
                     registerUser);
    setTimeout(function() { 
      if (type == mobile) {
         REDIRECT("../index.html");
         return;
      } else {
         REDIRECT("index.html");
      }
      MODAL('#modal-progress', 'close');
    }, 2000);
}

function SET_USER_REGISTRATION_VALUE() {
   $("#register-email-address").val(userRegisterEmailAddress);
   $("#register-fullname").val(userRegisterFullName);
   $("div#combo-box-categories select").val(userRegisterPaperCategories);
   $("#register-password").val(userRegisterPassword);
   $("#input-paper-abstract-paper").attr("src", userRegisterPaperAbstract);
   $("#input-paper-full-paper").attr("src", userRegisterFullPaper);
   $("#mobile-upper-user-icon").attr("src", userProfileIcon);
   $("#mobile-user-profile-icon").attr("src", userProfileIcon);
   $("#user-profile-fullname").html(userFullName);
   $("#user-profile-email-address").html(userEmailAddress);
   $("#user-profile-account-type").html(userAccountType);
   $("a.user-profile-full-paper").attr("href", userAbstractUrl);
   $("a.user-profile-abstract").attr("href", userFullPaperUrl);
}

function POPULATE_USER_PAPERS() {
    database.ref(users + userGetKey + sub + conferences).on('child_added', function(data) {
        var banner = data.val().conference_banner;
        var title = data.val().conference_title;
        var description = data.val().conference_description;
        $('#user-profile-papers').append('<div class="row mt-2"><div class="col s2 mt-2 pr-0 circle"><a href="#"><img class="responsive-img circle" style="width: 250px; height: 250px;" src="'+banner+'" alt=""></a></div><div class="col s9" style="margin-top: 150px;><a href="#"><p class="m-0" style="font-weight: bolder; text-transform: uppercase;">TITLE: '+title+'</p></a><a href="#"><p class="m-0">DESCRIPTION: '+description+'</p></a></div></div>');
    });
}

function VALIDATE(evt) {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function UPDATE_TEXT_FIELDS() {
  $(function() {
      M.updateTextFields();
  });
}

function INSERT_USER_LOGS(userId, userKey, userFullName, userEmailAddress, p, userFullPaperUrl, userPaperAbstractUrl,
                          userPaperCategories, userAccountType, userDateTimeRegistered, userIconUrl, action) {
  database.ref(logs + users + userKey + sub + logKey).set({
      id: userId,
      key: userKey,
      full_name: userFullName,
      email_address: userEmailAddress,
      password: p,
      paperAbstractUrl: userPaperAbstractUrl,
      fullPaperUrl: userFullPaperUrl,
      account_type: userAccountType,
      profile_picture: defaultUserIconPlaceholder,
      date_created: fullCurrentDateTime,
      action_type: action,
      status: 1
  });
}


/*
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales nisi nec risus fringilla varius. 
Nam at est nec tellus maximus faucibus nec vel eros.
*/