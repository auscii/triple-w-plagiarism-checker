$("#btn-login").click(function() {
	 AUTH_USER_ACCOUNT();
});

$("#btn-login-register").click(function() {
  window.location.href="index/register.html";
});

$("#btn-register-back").click(function() {
  window.location.href="index.html";
});

$("#btn-register-submit").click(function() {
  NEW_ACCOUNT();
});

//methods
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
  localStorage.clear();
  firebase.auth().signOut();
  window.location.href="index.html";
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
                var userContactNumber = data.val().contact_number;
                var userAddress = data.val().address;
                var userOccupation = data.val().occupation;
                var userAccountType = data.val().account_type;
                var userDateTimeRegistered = data.val().date_time_registered;
                var userIconUrl = data.val().profile_picture;
                var userStatus = data.val().status;
                if (userLoginEmailAddress == userEmailAddress) {
                   localStorage.setItem('id', userId);
                   localStorage.setItem('key', userKey);
                   localStorage.setItem('full_name', userFullName);
                   localStorage.setItem('email_address', userEmailAddress);
                   localStorage.setItem('p', p);
                   localStorage.setItem('contact_number', userContactNumber);
                   localStorage.setItem('address', userAddress);
                   localStorage.setItem('occupation', userOccupation);
                   localStorage.setItem('account_type', userAccountType);
                   localStorage.setItem('date_time_registered', userDateTimeRegistered);
                   localStorage.setItem('profile_picture', userIconUrl);
                   localStorage.setItem('status', userStatus);
                   window.location.href='main.html';
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

function NEW_ACCOUNT() {
  var registerEmailAddress = $("#register-email-address").val().trim();
  var registerPassword = $("#register-password").val().trim();
  var registerFullname = $("#register-fullname").val().trim();
  var registerAddress = $("#register-address").val().trim();
  var registerContactNumber = $("#register-contact-number").val().trim();
  var registerOccupation = $("#register-occupation").val().trim();
  var registerUserKey = registerEmailAddress.replace(/[^a-zA-Z ]/g,'').trim();
  $('#modal-register-btn').html('Close');
  $('#modal-register-btn').css({"background-color":"#eb4034"});
  if (!registerEmailAddress || !registerPassword || !registerFullname ||
      !registerAddress || !registerContactNumber || !registerOccupation) {
      MODAL('#modal-login-error', 'open');
      $('#error-message').html("Please fill-up all input fields!");
  } else {
      MODAL('#modal-progress', 'open');
      $('#loading-message').html('Saving user account...');
      firebase.auth().createUserWithEmailAndPassword(registerEmailAddress, registerPassword).then(function(user) {
          INSERT_USER(firebase.auth().currentUser.uid, registerFullname, registerEmailAddress, registerPassword, registerContactNumber, 
                      registerAddress, registerOccupation, "TESTING ACCOUNT", true);
          MODAL('#modal-progress', 'close');
          window.location.href='index.html';
      }, function(error) {
          MODAL('#modal-register', 'open');
          $('#modal-register-message').html(error.code + ": " + error.message);
          $('#modal-register-btn').html('Close');
      });
  }
}