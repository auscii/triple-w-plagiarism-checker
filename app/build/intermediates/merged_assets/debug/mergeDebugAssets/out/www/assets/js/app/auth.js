SET_USER_REGISTRATION_VALUE();

$("#btn-login").click(function() {
  localStorage.setItem('userType', mobile);
	AUTH_USER_ACCOUNT();
});

$("#btn-w-login").click(function() {
  localStorage.setItem('userType', web);
  AUTH_USER_ACCOUNT();
});

$("#btn-login-register").click(function() {
  REDIRECT("registration/email.html");
});

$("#btn-w-register-submit").click(function() {
  $('#loading-message').html('Saving user account...');
  MODAL('#modal-progress', 'open');
  NEW_ACCOUNT(web,'','');
});

$("#btn-register-back").click(function() {
  REDIRECT("index.html");
});

$("#btn-next-email").click(function() {
  var userRegisterEmailAddress = $('#register-email-address').val();
  if (userRegisterEmailAddress) {
    localStorage.setItem('userRegisterEmailAddress', userRegisterEmailAddress);
    REDIRECT("account-type.html");
  } else {
    $('#warning-message').html('Please fill out this field!');
    MODAL('#modal-warning', 'open');
  }
});

$("#btn-previous-email").click(function() {
  REDIRECT("../index.html");
});

$("#btn-next-account-type").click(function() {
  REDIRECT("fullname.html");
});

$("#btn-previous-account-type").click(function() {
  REDIRECT("email.html");
});

$('#account-type-author').click(function() {
  localStorage.setItem('userRegisterAccountType', author);
  REDIRECT("fullname.html");
});  

$('#account-type-paper-reviewer').click(function() {
  localStorage.setItem('userRegisterAccountType', paperReviewer);
  REDIRECT("fullname.html");
});  

$("#btn-previous-fullname").click(function() {
  REDIRECT("account-type.html");
});

$("#btn-next-fullname").click(function() {
  var userRegisterFullName = $('#register-fullname').val();
  if (userRegisterFullName) {
    localStorage.setItem('userRegisterFullName', userRegisterFullName);
    REDIRECT("password.html");
  } else {
    $('#warning-message').html('Please fill out this field!');
    MODAL('#modal-warning', 'open');
  }
});

$("#btn-next-password").click(function() {
  var userRegisterPassword = $('#register-password').val();
  var userRegisterConfirmPassword = $('#register-c-password').val();
  if (!userRegisterPassword && !userRegisterConfirmPassword) {
      $('#warning-message').html('Please fill out this field!');
    MODAL('#modal-warning', 'open');
  } else if (userRegisterPassword.length < 6) {
      $('#warning-message').html('You have to enter at least 6 characters!');
      MODAL('#modal-warning', 'open');
  } else if (userRegisterPassword != userRegisterConfirmPassword) {
    $('#warning-message').html('Password mismatched!');
      MODAL('#modal-warning', 'open');
  } else {
    localStorage.setItem('userRegisterPassword', userRegisterPassword);
    REDIRECT("preferences.html");
  }
});

$("#btn-previous-password").click(function() {
  REDIRECT("fullname.html");
});

$("#preferences-technology").click(function() {
  STORE_PREFERENCES(technology);
});

$("#preferences-science").click(function() {
  STORE_PREFERENCES(science);
});

$("#preferences-medicine").click(function() {
  STORE_PREFERENCES(medicine);
});

$("#preferences-academic").click(function() {
  STORE_PREFERENCES(academic);
});

$("#btn-previous-preferences").click(function() {
  REDIRECT("password.html");
});

$("#btn-done-paper").click(function() {
  if (userRegisterAccountType == author) {
    var userRegisterPaperAbstract = $('#input-paper-abstract-paper')[0].files[0];
    var userRegisterFullPaper = $('#input-paper-full-paper')[0].files[0];

    if (userRegisterPaperAbstract == undefined || userRegisterFullPaper == undefined) {
        $('#warning-message').html('Please upload document files!');
        MODAL('#modal-warning', 'open');
        return;
    }

    var userRegisterPaperCategories = $('#input-paper-categories').val();
    var uploadAbstract = storageReference.child(papers + userRegisterPaperAbstract.name).put(userRegisterPaperAbstract);
    var uploadFullPaper = storageReference.child(papers + userRegisterFullPaper.name).put(userRegisterFullPaper);

    uploadAbstract.on('state_changed', function(snapshot) {
      MODAL('#modal-progress', 'open');
      $('#loading-message').html('Saving user account...');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload abstract is paused');
          break;
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload abstract is running');
          break;
      }
    }, function(error) {
        $('#warning-message').html('Failed Uploading abstract file!');
        MODAL('#modal-warning', 'open');
    }, function() {
        uploadAbstract.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           let abstractUrl = downloadURL;
           uploadFullPaper.on('state_changed', function(snapshot) {
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('Upload Fullpaper is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: 
                  console.log('Upload Fullpaper is running');
                  break;
              }
            }, function(error) {
                $('#warning-message').html('Failed Uploading fullpaper file!');
                MODAL('#modal-warning', 'open');
            }, function() {
                uploadFullPaper.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    let fullPaperUrl = downloadURL;
                    if (userRegisterPaperAbstract && userRegisterFullPaper && userRegisterPaperCategories) {
                       localStorage.setItem('userRegisterPaperAbstract', userRegisterPaperAbstract);
                       localStorage.setItem('userRegisterFullPaper', userRegisterFullPaper);
                       localStorage.setItem('userRegisterPaperCategories', userRegisterPaperCategories);
                       NEW_ACCOUNT(mobile, abstractUrl, fullPaperUrl);
                    } else {
                       $('#warning-message').html('Please fill out this field!');
                       MODAL('#modal-warning', 'open');
                    }
                });
            });
        });
    });
  }
});

$("#btn-previous-paper").click(function() {
  REDIRECT("preferences.html");
});

function LOGIN_GOOGLE_ACCOUNT() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      AUTH_GOOGLE_ACCOUNT();
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);
        alert(error);
    });
}

function AUTH_GOOGLE_ACCOUNT() {
    firebase.auth().onAuthStateChanged((user) => {
      var user = firebase.auth().currentUser;
      var googleUserId = user.uid;
      var googleUserEmailAddress = user.email;
      var googleUserFullName = user.displayName;
      var googleUserProfilePicture = user.photoURL;
      firebase.auth().sendPasswordResetEmail(googleUserEmailAddress);
      $('#modal-google-completion-registration').modal('show');
      $('#btn_complete_google_sign_in').click(function() {
          var googleUserAddress = $("#register-address").val().trim();
          var googleUserContactNumber = $("#register-contact-number").val().trim();
          var googleUserOccupation = $("#register-occupation").val().trim();
          var googleUserKey = googleUserEmailAddress.replace(/[^a-zA-Z ]/g,'').trim();
          database.ref(users + googleUserKey + sub + userInformation).set({
              user_key: googleUserKey,
              user_id: googleUserId,
              user_full_name: googleUserFullName,
              user_icon_url: googleUserProfilePicture,
              user_position: member,
              user_email_address: googleUserEmailAddress,
              user_contact_number: googleUserContactNumber,
              user_occupation: googleUserOccupation,
              user_address: googleUserAddress,
              user_password: "NULL",
              user_status: 1,
              user_date_logged_in_date: currentDate,
              user_date_logged_in_time: currentTime
          });
      });
    });
}

function USER_LOG_OUT() {
  USER_CLEAR_LOCAL_STORAGE();
  firebase.auth().signOut();
  REDIRECT("index.html");
}

function AUTH_USER_ACCOUNT() {
  var userLoginEmailAddress = $("#user-email-address").val();
  var userLoginPassword = $("#user-password").val();
  MODAL('#modal-progress', 'open');
  $('#loading-message').html('Getting user details...');
  if (!userLoginEmailAddress || !userLoginPassword) {
      MODAL('#modal-progress', 'close');
      MODAL('#modal-login-error', 'open');
      $('#error-message').html("User not found!");
      return;
  }
  firebase.auth().signInWithEmailAndPassword(userLoginEmailAddress, userLoginPassword).then(function(firebaseUser) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
          var user = firebase.auth().currentUser;
          database.ref(users).on('child_added', function(snapshot) {
             firebase.database().ref(users + snapshot.key).orderByChild("user_key").on("child_added", function(data) {
                var userId = data.val().id;
                var userKey = data.val().key;
                var userFullName = data.val().full_name;
                var userEmailAddress = data.val().email_address;
                var p = data.val().password;
                var userFullPaperUrl = data.val().fullPaperUrl;
                var userPaperAbstractUrl = data.val().paperAbstractUrl;
                var userPaperCategories = data.val().paperCategories;
                var userPreferences = data.val().preferences;
                var userAccountType = data.val().account_type;
                var userDateTimeRegistered = data.val().date_time_registered;
                var userIconUrl = data.val().profile_picture;
                if (userLoginEmailAddress == userEmailAddress) {
                   if (userType == web) {
                     if (userAccountType == author || userAccountType == paperReviewer) {
                        MODAL('#modal-progress', 'close');
                        MODAL('#modal-login-error', 'open');
                        $('#error-message').html("User account must be Conference Chair only.");
                        return;
                     }
                   }
                   localStorage.setItem('id', userId);
                   localStorage.setItem('key', userKey);
                   localStorage.setItem('full_name', userFullName);
                   localStorage.setItem('email_address', userEmailAddress);
                   localStorage.setItem('p', p);
                   localStorage.setItem('fullPaperUrl', userFullPaperUrl);
                   localStorage.setItem('paperAbstractUrl', userPaperAbstractUrl);
                   localStorage.setItem('paperCategories', userPaperCategories);
                   localStorage.setItem('preferences', userPreferences);
                   localStorage.setItem('account_type', userAccountType);
                   localStorage.setItem('date_time_registered', userDateTimeRegistered);
                   localStorage.setItem('profile_picture', userIconUrl);
                   REDIRECT("main.html");
                }
            });
          });
        } else {
          MODAL('#modal-progress', 'close');
          MODAL('#modal-login-error', 'open');
          $('#error-message').html('User Not Found!');
      }
    });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        MODAL('#modal-progress', 'close');
        MODAL('#modal-login-error', 'open');
        $('#error-message').html("Error: " + errorMessage);
    });
}

function NEW_ACCOUNT(type, abstractUrl, fullPaperUrl) {
  if (type == mobile) {
    firebase.auth().createUserWithEmailAndPassword(userRegisterEmailAddress, userRegisterPassword).then(function(user) {
      INSERT_USER(firebase.auth().currentUser.uid, userRegisterEmailAddress, userRegisterAccountType, userRegisterFullName, userRegisterPassword, 
                  userRegisterPreferences, abstractUrl, fullPaperUrl, userRegisterPaperCategories);
      MODAL('#modal-progress', 'close');
      REDIRECT("../index.html");
    }, function(error) {
        MODAL('#modal-progress', 'close');
        MODAL('#modal-warning', 'open');
        $('#warning-message').html(error.code + ": " + error.message);
    });
  } else {
    var fullName = $('#w-register-fullname').val();
    var emailAddress = $('#w-register-email-address').val();
    var password = $('#w-register-password').val();
    var confirmPassword = $('#w-register-c-password').val();
    if (!fullName || !emailAddress || !password) {
        MODAL('#modal-progress', 'close');
        MODAL('#modal-warning', 'open');
        $('#warning-message').html('Please fill out all input fields!');
    } else if (password.length < 6) {
      $('#warning-message').html('You have to enter at least 6 characters!');
        MODAL('#modal-progress', 'close');
        MODAL('#modal-warning', 'open');
    } else if (password != confirmPassword) {
        MODAL('#modal-progress', 'close');
        MODAL('#modal-warning', 'open');
        $('#warning-message').html('Password mismatched!');
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailAddress, password).then(function(user) {
        INSERT_USER(firebase.auth().currentUser.uid, emailAddress, conferenceChair, 
                    fullName, password, 'NONE', 'NONE', 'NONE', 'NONE');
        MODAL('#modal-progress', 'close');
        REDIRECT("index.html");
      }, function(error) {
          MODAL('#modal-warning', 'open');
          $('#warning-message').html(error.code + ": " + error.message);
      });
    }
  }
  USER_CLEAR_LOCAL_STORAGE();
}

function STORE_PREFERENCES(type) {
  if (userRegisterAccountType == author) {
    localStorage.setItem('userRegisterPreferences', type);
    REDIRECT("paper.html");
  } else {
    $('#loading-message').html('Saving user account...');
    MODAL('#modal-progress', 'open');
    NEW_ACCOUNT(mobile,'','');
  }
}