var userId = localStorage.getItem('id'),
    userGetKey = localStorage.getItem('key'),
    userFullName = localStorage.getItem('full_name'),
    userEmailAddress = localStorage.getItem('email_address'),
    userPassword = localStorage.getItem('p'),
    userContactNumber = localStorage.getItem('contact_number'),
    userAddress = localStorage.getItem('address'),
    userOccupation = localStorage.getItem('occupation'),
    userAccountType = localStorage.getItem('account_type'),
    userPaperCategories = localStorage.getItem('paperCategories'),
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
    reviewPaperKey = localStorage.getItem('reviewPaperKey'),
    reviewPaperEventTitle = localStorage.getItem('reviewPaperEventTitle'),
    reviewPaperUrl = localStorage.getItem('reviewPaperUrl'),
    reviewPaperConferenceKey = localStorage.getItem('reviewPaperConferenceKey'),
    reviewPaperConferenceBanner = localStorage.getItem('reviewPaperConferenceBanner'),
    reviewAuthorUserKey = localStorage.getItem('reviewAuthorUserKey'),
    totalNumberNotifications = localStorage.getItem('totalNumberNotifications'),
    userType = localStorage.getItem('userType'),
    alUsername = localStorage.getItem('al-username'),
    alPassword = localStorage.getItem('al-password'),
    totalReviewPapers = 0,
    totalSubmittedPapers = 0,
    subscribeTypePaper = "",
    optionPaper = "",
    finalPaper = "",
    existingPaper = "EXISTING PAPER",
    anotherPaper = "ANOTHER PAPER",
    abstract = "ABSTRACT",
    fullpaper = "FULL PAPER",
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
    profilePicture = "PROFILE_PICTURE/",
    conferences = "CONFERENCES/",
    programmes = "PROGRAMMES/",
    logs = "LOGS/",
    activity = "ACTIVITY/",
    bookmarks = "BOOKMARKS/",
    review = "REVIEW/",
    notifications = "NOTIFICATIONS/",
    conferenceDetails = "CONFERENCE DETAILS/",
    loggedInUser = "LOGGED IN USER",
    loggedOutUser = "LOGGED OUT USER",
    switchUser = "SWITCH USER",
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
    returnedAccepted = "Return Accepted",
    returnedRejected = "Return Rejected",
    returnedRevisions = "Return Revisions",
    downloadPaper = "DOWNLOAD_PAPER",
    reviewPaper = "REVIEW_PAPER",
    submittedColor = "#211ee3",
    processingColor = "#e3af1e",
    returnAcceptedColor = "#18c72a",
    returnRejectedColor = "#e31e1e",
    returnRevisionsColor = "#1ac9af",
    updatePaper = "UPDATE_PAPER",
    reviewAuthorPaper = "REVIEW_AUTHOR_PAPER",
    addNewConference = "Add new conference - ",
    updateConference = "Update conference - ",
    bookmarkConference = "Bookmark conference - ",
    addNewPaper = "Add new paper - ",
    updateExistingPaper = "Update paper - ",
    sendInvitationPaper = "Send Invitation paper - ",
    downloadExistingPaper = "Download paper - ",
    newNotification = "New notification - ",
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
    isConferenceAvailable = false,
    isMobileAvailable = false,
    userKey = "",
    conferenceKey = "",
    logKey = "",
    actKey = "",
    bookmarkKey = "",
    paperKey = "",
    reviewKey = "",
    notificationKey = "",
    uniqNum = 69,
    newStatus = 1,
    defaultUserIconPlaceholder = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    noImage = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=6&m=936182806&s=612x612&w=0&h=F5sh9tAuiAtEPNE1NiFZ7mH7-7cjx0q4CXOcxiziFpw=";

setInterval( function() {
    userKey = "USER" + KEY_CODE(3) + fullDate + time,
    conferenceKey = "CONF" + KEY_CODE(3) + fullDate + time,
    logKey = "LOGS" + KEY_CODE(3) + fullDate + time,
    bookmarkKey = "BM" + KEY_CODE(3) + fullDate + time,
    paperKey = "PPRS" + KEY_CODE(3) + fullDate + time,
    reviewKey = "RVW" + KEY_CODE(3) + fullDate + time,
    notificationKey = "NTFY" + KEY_CODE(3) + fullDate + time;
    actKey = "ACT" + KEY_CODE(3) + fullDate + time;
}, 1000);

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
  // localStorage.clear();
  localStorage.removeItem("id");
  localStorage.removeItem("key");
  localStorage.removeItem("full_name");
  localStorage.removeItem("email_address");
  localStorage.removeItem("p");
  localStorage.removeItem("fullPaperUrl");
  localStorage.removeItem("paperAbstractUrl");
  localStorage.removeItem("paperCategories");
  localStorage.removeItem("account_type");
  localStorage.removeItem("date_time_registered");
  localStorage.removeItem("profile_picture");
  localStorage.removeItem("status");
  localStorage.removeItem("totalNumberNotifications");
  localStorage.removeItem("al-username");
  localStorage.removeItem("al-password");
}

function INSERT_USER(userId, userEmailAddress, userAccountType, userFullName, userPassword, 
                     userPreferences, userPaperAbstract, userFullPaper, userPaperCategories, type) {
    const newPassword = CryptoJS.SHA256(userPassword).toString();
    if (userAccountType == paperReviewer) {
        newStatus = 7
    }
    database.ref(users + userKey + sub + credentials).set({
        id: userId,
        key: userKey,
        full_name: userFullName,
        email_address: userEmailAddress,
        password: newPassword,
        preferences: userPreferences,
        paperAbstractUrl: userPaperAbstract,
        fullPaperUrl: userFullPaper,
        paperCategories: userPaperCategories,
        account_type: userAccountType,
        date_time_registered: fullCurrentDateTime,
        profile_picture: defaultUserIconPlaceholder,
        status: newStatus
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
   $("#user-profile-fullname").html(userFullName);
   $("#user-profile-email-address").html(userEmailAddress);
   $("#user-profile-account-type").html(userAccountType);
   $("a.user-profile-full-paper").attr("href", userAbstractUrl);
   $("a.user-profile-abstract").attr("href", userFullPaperUrl);
   $("#mobile-user-profile-icon").attr("src", userProfileIcon);
   $("#switch-user-img-user").attr("src", userProfileIcon);
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
      profile_picture: userIconUrl,
      date_created: fullCurrentDateTime,
      action_type: action,
      status: newStatus
  });
  newStatus = 1;
}

function INSERT_ACTIVITY_LOGS(userKey, userFullName, userEmailAddress, userIconUrl, action) {
  database.ref(logs + activity + userKey + sub + actKey).set({
      user_key: userKey,
      full_name: userFullName,
      email_address: userEmailAddress,
      user_icon_url: userIconUrl,
      date_created: fullCurrentDateTime,
      action_type: action,
      status: newStatus
  });
}

function FETCH_DASHBOARD_DATA() {
    database.ref(papers).on('child_added', function(data) {
        database.ref(papers + data.key).on('child_added', function(data) {
            database.ref(papers + data.val().conference_key).orderByChild("paper_status").equalTo(processing).on('value', function(snapshot) {
                if (snapshot.numChildren() != 0) {
                   totalReviewPapers = snapshot.numChildren();
                }
            });
        });
    });

    database.ref(papers).on('child_added', function(data) {
        database.ref(papers + data.key).on('child_added', function(data) {
            database.ref(papers + data.val().conference_key).orderByChild("paper_status").equalTo(submitted).on('value', function(snapshot) {
                if (snapshot.numChildren() != 0) {
                   totalSubmittedPapers = snapshot.numChildren();
                }
            });
        });
    });

    database.ref(logs + activity + userGetKey).orderByChild("date_created").limitToFirst(5).on('child_added', function(data) {
        let iconUrl = data.val().user_icon_url,
        fullname = data.val().full_name,
        actionType = data.val().action_type,
        dateCreated = data.val().date_created;
        $('#recent-activities-tbl').append('<tr><td class="text-center"><img class="responsive-img circle" style="height: 50px; width: 50px;" src="'+iconUrl+'"/></td><td class="text-center">'+fullname+'</td><td class="text-center">'+actionType+'</td><td class="text-center">'+dateCreated+'</td></tr>');
        $('#d-main-ra-spinner').css({"display":"none"});
        $('#d-main-ra-title').css({"display":"block"});
        $('#d-main-ra-tbl').css({"display":"block"});
    });

    database.ref(users).on('child_added', function(snapshot) {
        database.ref(users + snapshot.key).orderByChild("account_type").equalTo(paperReviewer).limitToFirst(3).on('child_added', function(data) {
            $('#user-list-pr').append('<li class="collection-item avatar"><img src="'+data.val().profile_picture+'" alt="" class="circle" /><p class="font-weight-600">'+data.val().full_name+'</p><p class="medium-small">'+data.val().email_address+'</p></li>');
            $('#d-main-prl-spinner').css({"display":"none"});
            $('#d-main-pr-title').css({"display":"block"});
        });
    });

}