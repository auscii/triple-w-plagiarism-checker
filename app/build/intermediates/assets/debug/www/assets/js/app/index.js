CHECK_USER_SESSION();
FETCH_CONFERENCES();
FETCH_USERS();
NOTIFICATIONS();
ENROLLMENT_MODULE();
BOOKMARK_LISTS();
PAPER_LISTS();
PROFILE_LISTENERS();
FETCH_REVIEWS();
SEARCH_CONFERENCE();

$("#card-new-conference").click(function() {
  MODAL('#modal-create-conference', 'open');
});

$("#btn-save-new-conference").click(function() {
  var conferenceBanner = $('#new-conference-banner')[0].files[0];
  var conferenceTitle = $('#new-conference-title').val();
  var conferenceEventPlace = $('#new-conference-event-place').val();
  var conferenceEventDate = $('#new-conference-event-date').val();
  var conferenceEventTime = $('#new-conference-event-time').val();
  var conferenceDescription = $('#new-conference-description').val();
  var conferenceCategory = $('#new-conference-category').val();
  var conferenceAbstractSubmission = $('#new-conference-abstract-submission').val();
  var conferenceFullPaperSubmission = $('#new-conference-full-paper-submission').val();
  var conferenceAveragePercentageReport = $('#new-conference-average-percentage-report').val();
  var conferenceNumberPapersAccomodated = $('#new-conference-number-papers-accomodated').val();
  var conferenceAllowPaperApplication = $('input[name="new-conference-allow-paper-application"]:checked').val();
  var conferenceModeOfReview = $('input[name="new-conference-mode-of-review"]:checked').val();
  $('#loading-message').html('Adding new conference...');
  MODAL('#modal-progress', 'open');
  if (conferenceBanner == undefined) {
     $('#warning-message').html('Please upload document files!');
  	 MODAL('#modal-progress', 'close');
     MODAL('#modal-warning', 'open');
     return;
  } else if (!conferenceTitle || !conferenceEventPlace || !conferenceEventDate || !conferenceEventTime || !conferenceDescription ||
		   	 !conferenceCategory || !conferenceAbstractSubmission || !conferenceFullPaperSubmission || !conferenceAveragePercentageReport || 
		   	 !conferenceNumberPapersAccomodated || !conferenceAllowPaperApplication || !conferenceModeOfReview) {
     $('#warning-message').html('Please fill out input fields!');
  	 MODAL('#modal-progress', 'close');
     MODAL('#modal-warning', 'open');
  } else {
  	var uploadConferenceBanner = storageReference.child(papers + conferenceBanner.name).put(conferenceBanner);
  	uploadConferenceBanner.on('state_changed', function(snapshot) {
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload Conference Banner is paused');
          break;
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload Conference Banner is running');
          break;
      }
    }, function(error) {
        $('#warning-message').html('Failed uploading conference banner file!');
  	    MODAL('#modal-progress', 'close');
        MODAL('#modal-warning', 'open');
    }, function() {
        uploadConferenceBanner.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            let conferenceBannerUrl = downloadURL;
            INSERT_CONFERENCE(conferenceKey, conferenceBannerUrl, conferenceTitle, conferenceEventPlace, conferenceEventDate,
            				  conferenceEventTime, conferenceDescription, conferenceCategory, conferenceAbstractSubmission,
            				  conferenceFullPaperSubmission, conferenceAveragePercentageReport, conferenceNumberPapersAccomodated,
            				  conferenceAllowPaperApplication, conferenceModeOfReview);
        });
    });
  }
});

function PROFILE_LISTENERS() {
	$("#profile-history").click(function() {
		REDIRECT('history.html');
	});

	$("#profile-papers").click(function() {
		REDIRECT('papers.html');
	});
}

function INSERT_CONFERENCE(conferenceKey, conferenceBanner, conferenceTitle, conferenceEventPlace, conferenceEventDate,
        				   conferenceEventTime, conferenceDescription, conferenceCategory, conferenceAbstractSubmission,
        				   conferenceFullPaperSubmission, conferenceAveragePercentageReport, conferenceNumberPapersAccomodated,
        				   conferenceAllowPaperApplication, conferenceModeOfReview) {
    database.ref(users + userGetKey + sub + conferences + conferenceKey).set({
    	conference_key: conferenceKey,
    	conference_banner: conferenceBanner,
    	conference_title: conferenceTitle,
    	conference_event_place: conferenceEventPlace,
    	conference_event_date: conferenceEventDate,
    	conference_event_time: conferenceEventTime,
    	conference_description: conferenceDescription,
    	conference_category: conferenceCategory,
    	conference_abstract_Submission: conferenceAbstractSubmission,
    	conference_full_paper_submission: conferenceFullPaperSubmission,
    	conference_average_percentage_report: conferenceAveragePercentageReport,
    	conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
    	conference_allow_paper_application: conferenceAllowPaperApplication,
    	conference_mode_of_review: conferenceModeOfReview,
    	date_time_created: fullCurrentDateTime,
        status: 1
    });
    database.ref(programmes + conferences + conferenceKey).set({
    	conference_key: conferenceKey,
    	conference_banner: conferenceBanner,
    	conference_title: conferenceTitle,
    	conference_event_place: conferenceEventPlace,
    	conference_event_date: conferenceEventDate,
    	conference_event_time: conferenceEventTime,
    	conference_description: conferenceDescription,
    	conference_category: conferenceCategory,
    	conference_abstract_Submission: conferenceAbstractSubmission,
    	conference_full_paper_submission: conferenceFullPaperSubmission,
    	conference_average_percentage_report: conferenceAveragePercentageReport,
    	conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
    	conference_allow_paper_application: conferenceAllowPaperApplication,
    	conference_mode_of_review: conferenceModeOfReview,
    	date_time_created: fullCurrentDateTime,
        user_created_by: userEmailAddress,
        user_icon: userProfileIcon,
        status: 1
    });
    MODAL('#modal-progress', 'close');
    RELOAD_PAGE();
}

function FETCH_CONFERENCES() {
	if (userType == mobile) {
		database.ref(programmes + conferences).on('child_added', function(data) {
			var key = data.val().conference_key;
			var banner = data.val().conference_banner;
			var title = data.val().conference_title;
			var eventPlace = data.val().conference_event_place;
			var eventDate = data.val().conference_event_date;
			var eventTime = data.val().conference_event_time;
			var description = data.val().conference_description;
			var category = data.val().conference_category;
			var abstractSubmission = data.val().conference_abstract_Submission;
			var fullPaperSubmission = data.val().conference_full_paper_submission;
			var averagePercentageReport = data.val().conference_average_percentage_report;
			var numberPapersAccomodated = data.val().conference_number_papers_accomodated;
			var allowPaperApplication = data.val().conference_allow_paper_application;
			var modeOfReview = data.val().conference_mode_of_review;
			var dateTimeCreated = data.val().date_time_created;
			isConferenceAvailable = true;
			$('#list-conference-cards').append('<div class="col s12 m4"><div class="card blue-grey darken-4 bg-image-1" style="background-image: url('+banner+'); background-size: cover;"><div class="card-content white-text" style="background-color: rgba(0, 0, 0, 0.7);"><span class="card-title font-weight-400 mb-10" style="text-transform: uppercase; font-weight: bolder;">'+title+'</span><p>'+description+' <br/>online Huge selection of Apple</p><div class="border-non mt-5"><button class="waves-effect waves-light btn red border-round box-shadow" onclick="VIEW_UPDATE_CONFERENCE(this)" value="'+key+'">View</button></div></div></div></div>');
	    	$('#main-mobile-progress-spinner').css({"display":"none"}); 
			$('#warning-message').empty();
	    });
	} else {
		database.ref(users + userGetKey + sub + conferences).on('child_added', function(data) {
			var key = data.val().conference_key;
			var banner = data.val().conference_banner;
			var title = data.val().conference_title;
			var eventPlace = data.val().conference_event_place;
			var eventDate = data.val().conference_event_date;
			var eventTime = data.val().conference_event_time;
			var description = data.val().conference_description;
			var category = data.val().conference_category;
			var abstractSubmission = data.val().conference_abstract_Submission;
			var fullPaperSubmission = data.val().conference_full_paper_submission;
			var averagePercentageReport = data.val().conference_average_percentage_report;
			var numberPapersAccomodated = data.val().conference_number_papers_accomodated;
			var allowPaperApplication = data.val().conference_allow_paper_application;
			var modeOfReview = data.val().conference_mode_of_review;
			var dateTimeCreated = data.val().date_time_created;
			if (key) {
				isConferenceAvailable = true;
				$('#list-of-conferences').append('<div class="col s12 m6 l4 card-width"><div class="card card-border center-align gradient-45deg-indigo-purple" style="height: 400px;"><div class="card-content white-text"><img class="responsive-img circle z-depth-4" style="height: 100px; width: 100px;" src="'+banner+'"/><h5 class="white-text mb-1">'+title+'</h5><p class="m-0">'+eventPlace+'</p><p class="mt-8"><span style="text-transform: uppercase;">'+category+' </span><br />Category</p><button onclick="VIEW_UPDATE_CONFERENCE(this)" value="'+key+'" class="waves-effect waves-light btn gradient-45deg-deep-orange-orange border-round mt-7 z-depth-4">View</button><div class="row mt-5"></div></div></div></div>');
				$('#conference-progress-spinner').css({"display":"none"}); 
			}
	    });
	}
    POPULATE_USER_PAPERS();
	setTimeout(function() {
		CHECK_IF_DATA_EXISTS();
	}, 5000);
}

function FETCH_USERS() {
	$('#profile-card-history').css({"display":"block"});
	if (userType == web) {
		database.ref(users).on('child_added', function(snapshot) {
			database.ref(users + snapshot.key).on('child_added', function(data) {
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
		        if (userId != undefined) {
		        	$('#user-table-list').append('<tr><td><img id="mobile-upper-user-icon" style="height: 50px; width: 50px;" src="'+userIconUrl+'"></td><td>'+userKey+'</td><td>'+userFullName+'</td><td>'+userEmailAddress+'</td><td>'+userAccountType+'</td><td>'+userDateTimeRegistered+'</td><td><button style="text-align: center;" class="btn btn-success text-center" id="btn-save-new-conference" onclick="OPEN_URL(this)" value="'+userFullPaperUrl+'">Full Paper</button><br><br><button class="btn btn-success text-center" id="btn-save-new-conference" onclick="OPEN_URL(this)" value="'+userPaperAbstractUrl+'">Abstract Paper</button></td></tr>');
		        	$('#users-management-spinner').css({"display":"none"}); 
		        }
		    });
	    });
	}
	database.ref(logs + users + userGetKey).on('child_added', function(data) {
		isMobileAvailable = true;
		if (data.val().key == userGetKey) {
			$('#profile-list-history').append('<tr><td class="mb-0 black-text">'+data.val().date_created+'</td><td class="mb-0 black-text">'+data.val().action_type+'</td></tr>');
			$('#m-profile-spinner').css({"display":"none"});
			$('#profile-card-history').css({"display":"block"});
		}
    });
    if (userAbstractUrl || userFullPaperUrl) {
		$('#profile-list-papers').append('<tr><td class="mb-0 black-text">'+userDateTimeRegistered+'</td><td class="mb-0 black-text"><a href="'+userAbstractUrl+'" class="waves-effect waves-light btn-small">Download and View</a></td><td class="mb-0 black-text"><a href="'+userFullPaperUrl+'" class="waves-effect waves-light btn-small">Download and View</a></td></tr>');
    }
	setTimeout(function() {
		if (!isMobileAvailable) {
			$('#m-profile-spinner').css({"display":"none"});
			$('#profile-card-history').css({"display":"block"});
		}
	}, 5000);
}

function OPEN_URL(input) {
	let selectedUrl = input.value;
	if (selectedUrl == "NONE") {
		MODAL('#modal-warning', 'open');
		$('#warning-message').html('Papers are available for Author users only');
		return;
	} else {
		REDIRECT(selectedUrl);
	}
}

function CHECK_IF_DATA_EXISTS() {
	var start = setInterval( function() {
		if (isConferenceAvailable) {
	  		clearInterval(start);
			return;
		} else {
			MODAL('#modal-warning', 'open');
			$('#main-mobile-progress-spinner').css({"display":"none"}); 
			$('#conference-progress-spinner').css({"display":"none"}); 
			$('#warning-message').html(noData);
			$('#conference-warning-message').html(noData);
			isConferenceAvailable = true;
		}
	}, 1000);
}

function VIEW_UPDATE_CONFERENCE(input) {
	selectedKey = input.value;
    MODAL('#modal-update-conference', 'open');
	if (userType == mobile) {
		database.ref(programmes + conferences).on('child_added', function(data) {
			if (data.val().conference_key == selectedKey) {
				var conferenceKey = data.val().conference_key;
				var banner = data.val().conference_banner;
				var title = data.val().conference_title;
				var eventPlace = data.val().conference_event_place;
				var eventDate = data.val().conference_event_date;
				var eventTime = data.val().conference_event_time;
				var description = data.val().conference_description;
				var category = data.val().conference_category;
				var abstractSubmission = data.val().conference_abstract_Submission;
				var fullPaperSubmission = data.val().conference_full_paper_submission;
				var averagePercentageReport = data.val().conference_average_percentage_report;
				var numberPapersAccomodated = data.val().conference_number_papers_accomodated;
				var allowPaperApplication = data.val().conference_allow_paper_application;
				var modeOfReview = data.val().conference_mode_of_review;
				var dateTimeCreated = data.val().date_time_created;
				var conferenceUserCreatedBy = data.val().user_created_by;

		   		$("#m-view-conference-banner").attr("src", banner);
		   		$("#m-view-event-title").html(title);
		   		$("#m-view-event-place").html(eventPlace);
		   		$("#m-view-event-date").html(eventDate);
		   		$("#m-view-event-time").html(eventTime);
		   		$("#m-view-description").html(description);
		   		$("#m-view-category").html(category);
		   		$("#m-view-abstract-submission").html(abstractSubmission);
		   		$("#m-view-full-paper-submission").html(fullPaperSubmission);
		   		$("#m-view-average-percentage-report").html(averagePercentageReport);
		   		$("#m-view-no-papers-accomodated").html(numberPapersAccomodated);
		   		$("#m-view-allow-paper-application").html(allowPaperApplication);
		   		$("#m-view-mode-of-review").html(modeOfReview);
		   		$("#m-view-date-time-created").html(dateTimeCreated);

           		localStorage.setItem('conferenceEventKey', conferenceKey);
           		localStorage.setItem('conferenceBanner', banner);
           		localStorage.setItem('conferenceEventTitle', title);
           		localStorage.setItem('conferenceEventPlace', eventPlace);
           		localStorage.setItem('conferenceEventDate', eventDate);
           		localStorage.setItem('conferenceEventTime', eventTime);
           		localStorage.setItem('conferenceDescription', description);
           		localStorage.setItem('conferenceCategory', category);
           		localStorage.setItem('conferenceAbstractSubmission', abstractSubmission);
           		localStorage.setItem('conferenceFullPaperSubmission', fullPaperSubmission);
           		localStorage.setItem('conferenceAveragePercentageReport', averagePercentageReport);
           		localStorage.setItem('conferenceNumberPapersAccomodated', numberPapersAccomodated);
           		localStorage.setItem('conferenceAllowPaperApplication', allowPaperApplication);
           		localStorage.setItem('conferenceModeOfReview', modeOfReview);
           		localStorage.setItem('conferenceDateTimeCreated', dateTimeCreated);
           		localStorage.setItem('conferenceUserCreatedBy', conferenceUserCreatedBy);
			}
	    });
	}
    UPDATE_TEXT_FIELDS();
	database.ref(users + userGetKey + sub + conferences).on('child_added', function(data) {
		var key = data.val().conference_key;
		var banner = data.val().conference_banner;
		var title = data.val().conference_title;
		var eventPlace = data.val().conference_event_place;
		var eventDate = data.val().conference_event_date;
		var eventTime = data.val().conference_event_time;
		var description = data.val().conference_description;
		var category = data.val().conference_category;
		var abstractSubmission = data.val().conference_abstract_Submission;
		var fullPaperSubmission = data.val().conference_full_paper_submission;
		var averagePercentageReport = data.val().conference_average_percentage_report;
		var numberPapersAccomodated = data.val().conference_number_papers_accomodated;
		var allowPaperApplication = data.val().conference_allow_paper_application;
		var modeOfReview = data.val().conference_mode_of_review;
		var dateTimeCreated = data.val().date_time_created;

		if (selectedKey == key) {
			$('#e-conference-title').val(title);
			$('#e-conference-event-place').val(eventPlace);
			$('#e-conference-event-date').val(eventDate);
			$('#e-conference-event-time').val(eventTime);
			$('#e-conference-description').val(description);

			// $('#e-conference-category').val(category);
			// $('#e-conference-category option:selected').text(category);

			$('#e-conference-abstract-submission').val(abstractSubmission);
			$('#e-conference-full-paper-submission').val(fullPaperSubmission);
			$('#e-conference-average-percentage-report').val(averagePercentageReport);
			$('#e-conference-number-papers-accomodated').val(numberPapersAccomodated);

			if (allowPaperApplication === "Do not allow") {
			  $("#e-conference-paper-application-not-allow").prop('checked', true);
			} else {
			  $("#e-conference-paper-application-allow").prop('checked', true);
			}

			if (modeOfReview === "Blind-review") {
			  $("#e-conference-mode-of-review-blind-review").prop('checked', true);
			} else if (modeOfReview === "Single-review") {
			  $("#e-conference-mode-of-review-single-review").prop('checked', true);
			} else {
			  $("#e-conference-mode-of-review-double-review").prop('checked', true);
			}
		}
	});

	$("#btn-save-update-conference").click(function() {
		$('#loading-message').html('Updating conference...');
		MODAL('#modal-progress', 'open');
		var conferenceBanner = $('#e-conference-banner')[0].files[0];
		var conferenceTitle = $('#e-conference-title').val();
		var conferenceEventPlace = $('#e-conference-event-place').val();
		var conferenceEventDate = $('#e-conference-event-date').val();
		var conferenceEventTime = $('#e-conference-event-time').val();
		var conferenceDescription = $('#e-conference-description').val();
		var conferenceCategory = $('#e-conference-category').val();
		var conferenceAbstractSubmission = $('#e-conference-abstract-submission').val();
		var conferenceFullPaperSubmission = $('#e-conference-full-paper-submission').val();
		var conferenceAveragePercentageReport = $('#e-conference-average-percentage-report').val();
		var conferenceNumberPapersAccomodated = $('#e-conference-number-papers-accomodated').val();
		var conferenceAllowPaperApplication = $('input[name="e-conference-allow-paper-application"]:checked').val();
		var conferenceModeOfReview = $('input[name="e-conference-mode-of-review"]:checked').val();
		if (conferenceBanner == undefined) {
			$('#warning-message').html('Please upload document files!');
			MODAL('#modal-progress', 'close');
			MODAL('#modal-warning', 'open');
			return;
		} else if (!conferenceTitle || !conferenceEventPlace || !conferenceEventDate || !conferenceEventTime || !conferenceDescription ||
				   !conferenceCategory || !conferenceAbstractSubmission || !conferenceFullPaperSubmission || !conferenceAveragePercentageReport || 
				   !conferenceNumberPapersAccomodated || !conferenceAllowPaperApplication || !conferenceModeOfReview) {
		    $('#warning-message').html('Please fill out input fields!');
		  	MODAL('#modal-progress', 'close');
		    MODAL('#modal-warning', 'open');
	  	} else {
	  		var uploadConferenceBanner = storageReference.child(papers + conferenceBanner.name).put(conferenceBanner);
		  	uploadConferenceBanner.on('state_changed', function(snapshot) {
		      switch (snapshot.state) {
		        case firebase.storage.TaskState.PAUSED:
		          console.log('Upload Conference Banner is paused');
		          break;
		        case firebase.storage.TaskState.RUNNING: 
		          console.log('Upload Conference Banner is running');
		          break;
		      }
		    }, function(error) {
		        $('#warning-message').html('Failed uploading conference banner file!');
		  	    MODAL('#modal-progress', 'close');
		        MODAL('#modal-warning', 'open');
		    }, function() {
		        uploadConferenceBanner.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		            let conferenceBannerUrl = downloadURL;
		            database.ref(users + userGetKey + sub + conferences + selectedKey).update({
				    	conference_key: selectedKey,
				    	conference_banner: conferenceBannerUrl,
				    	conference_title: conferenceTitle,
				    	conference_event_place: conferenceEventPlace,
				    	conference_event_date: conferenceEventDate,
				    	conference_event_time: conferenceEventTime,
				    	conference_description: conferenceDescription,
				    	conference_category: conferenceCategory,
				    	conference_abstract_Submission: conferenceAbstractSubmission,
				    	conference_full_paper_submission: conferenceFullPaperSubmission,
				    	conference_average_percentage_report: conferenceAveragePercentageReport,
				    	conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
				    	conference_allow_paper_application: conferenceAllowPaperApplication,
				    	conference_mode_of_review: conferenceModeOfReview,
				    	date_time_created: fullCurrentDateTime,
				        status: 1
				    });
		            database.ref(programmes + conferences + selectedKey).update({
				    	conference_key: selectedKey,
				    	conference_banner: conferenceBannerUrl,
				    	conference_title: conferenceTitle,
				    	conference_event_place: conferenceEventPlace,
				    	conference_event_date: conferenceEventDate,
				    	conference_event_time: conferenceEventTime,
				    	conference_description: conferenceDescription,
				    	conference_category: conferenceCategory,
				    	conference_abstract_Submission: conferenceAbstractSubmission,
				    	conference_full_paper_submission: conferenceFullPaperSubmission,
				    	conference_average_percentage_report: conferenceAveragePercentageReport,
				    	conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
				    	conference_allow_paper_application: conferenceAllowPaperApplication,
				    	conference_mode_of_review: conferenceModeOfReview,
				    	date_time_created: fullCurrentDateTime,
				        user_created_by: userEmailAddress,
				        user_icon: userProfileIcon,
				        status: 1
				    });
			    	MODAL('#modal-update-conference', 'close');
			    	RELOAD_PAGE();
		        });
		    });
    	}
	});
}

function CHECK_USER_SESSION() {
	if (!userId || userId == "" || userId == undefined) {
		REDIRECT('index.html');
		return;
	}
}

function SEARCH_CONFERENCE(ele) {
	var isConferenceAvailable = false;
	var totalConferenceResult = 0;
	routeKey = search;
	if (userType == mobile && event.key === 'Enter') {
		$('#search-warning-message').css({"display":"none"});
		$("#card-search-conference").empty();
		$('#m-search-spinner').css({"display":"block"});
		var searchValue = $('#input-search-conference').val();
		database.ref(programmes + conferences).on('child_added', function(data) {
			var conferenceKey = data.val().conference_key;
			var conferenceBanner = data.val().conference_banner;
			var conferenceEventTitle = data.val().conference_title;
			var conferenceEventPlace = data.val().conference_event_place;
			var conferenceEventDate = data.val().conference_event_date;
			var conferenceEventTime = data.val().conference_event_time;
			var conferenceDescription = data.val().conference_description;
			var conferenceCategory = data.val().conference_category;
			var conferenceAbstractSubmission = data.val().conference_abstract_Submission;
			var conferenceFullPaperSubmission = data.val().conference_full_paper_submission;
			var conferenceAveragePercentageReport = data.val().conference_average_percentage_report;
			var conferenceNumberPapersAccomodated = data.val().conference_number_papers_accomodated;
			var conferenceAllowPaperApplication = data.val().conference_allow_paper_application;
			var conferenceModeOfReview = data.val().conference_mode_of_review;
			var conferenceDateTimeCreated = data.val().date_time_created;
			var conferenceUserCreatedBy = data.val().user_created_by;
			var conferenceUserIcon = data.val().user_icon;
			var conferenceStatus = data.val().status;
			if (conferenceEventTitle.includes(searchValue) || 
				conferenceEventTitle.includes(searchValue.toLowerCase()) ||
				conferenceEventTitle.includes(searchValue.toUpperCase()) ||
				searchValue == conferenceEventTitle) {
				isConferenceAvailable = true
				$('#m-search-spinner').css({"display":"none"}); 
				$('#card-search-conference').css({"display":"block"});
				$('#total-search-result').html(totalConferenceResult);
				$('#search-warning-message').html('');
				$('#card-search-conference').append('<button onclick="VIEW_UPDATE_CONFERENCE(this)" value="'+conferenceKey+'" style="border: none; background: none;"><div class="row"><div class="row"><div class="col s12 m6 l3 card-width" id="profile-history"><div class="card btn-large gradient-45deg-light-red-cyan gradient-shadow white-text padding-4 mt-5" style="width: 277px; height: 100px; border-radius: 10px;"><div class="col s5 m5 left-align"><h5 class="mb-0 white-text" style="font-size: 15px; width: 150px; font-weight: bolder;">'+conferenceEventTitle+'</h5><p style="font-size: 11px; width: 90px;">'+conferenceDescription+'</p></div><div class="col s7 m5 right-align"><img src="'+conferenceBanner+'" style="width: 50px; height: 50px; margin-top: 15px;" /></div></div></div></div></div></button>');
				$("#card-search-conference").click(function() {
				  	MODAL('#modal-view-enroll-conference', 'open');
				  	if (selectedKey == conferenceKey) {
					  	$("#m-view-conference-banner").attr("src", conferenceBanner);
				   		$("#m-view-event-title").html(conferenceEventTitle);
				   		$("#m-view-event-place").html(conferenceEventPlace);
				   		$("#m-view-event-date").html(conferenceEventDate);
				   		$("#m-view-event-time").html(conferenceEventTime);
				   		$("#m-view-description").html(conferenceDescription);
				   		$("#m-view-category").html(conferenceCategory);
				   		$("#m-view-abstract-submission").html(conferenceAbstractSubmission);
				   		$("#m-view-full-paper-submission").html(conferenceFullPaperSubmission);
				   		$("#m-view-average-percentage-report").html(conferenceAveragePercentageReport);
				   		$("#m-view-no-papers-accomodated").html(conferenceNumberPapersAccomodated);
				   		$("#m-view-allow-paper-application").html(conferenceAllowPaperApplication);
				   		$("#m-view-mode-of-review").html(conferenceModeOfReview);
				   		$("#m-view-date-time-created").html(conferenceDateTimeCreated);
				   		$("#m-view-published-by").html(conferenceUserCreatedBy);
                   		localStorage.setItem('conferenceEventKey', conferenceKey);
                   		localStorage.setItem('conferenceBanner', conferenceBanner);
                   		localStorage.setItem('conferenceEventTitle', conferenceEventTitle);
                   		localStorage.setItem('conferenceEventPlace', conferenceEventPlace);
                   		localStorage.setItem('conferenceEventDate', conferenceEventDate);
                   		localStorage.setItem('conferenceEventTime', conferenceEventTime);
                   		localStorage.setItem('conferenceDescription', conferenceDescription);
                   		localStorage.setItem('conferenceCategory', conferenceCategory);
                   		localStorage.setItem('conferenceAbstractSubmission', conferenceAbstractSubmission);
                   		localStorage.setItem('conferenceFullPaperSubmission', conferenceFullPaperSubmission);
                   		localStorage.setItem('conferenceAveragePercentageReport', conferenceAveragePercentageReport);
                   		localStorage.setItem('conferenceNumberPapersAccomodated', conferenceNumberPapersAccomodated);
                   		localStorage.setItem('conferenceAllowPaperApplication', conferenceAllowPaperApplication);
                   		localStorage.setItem('conferenceModeOfReview', conferenceModeOfReview);
                   		localStorage.setItem('conferenceDateTimeCreated', conferenceDateTimeCreated);
                   		localStorage.setItem('conferenceUserCreatedBy', conferenceUserCreatedBy);
				  	}
				});
			}
		});
		if (routeKey == search) {
			setTimeout(function() {
				var start = setInterval( function() {
					if (isConferenceAvailable) {
						$('#m-search-spinner').css({"display":"none"}); 
				  		clearInterval(start);
						return;
					} else {
						$('#m-search-spinner').css({"display":"none"}); 
						$('#search-warning-message').css({"display":"block"});
						$('#search-warning-message').html(noData);
						isConferenceAvailable = true;
					}
				}, 1000);
			}, 5000);
		}
	}
}

function ENROLLMENT_MODULE() {
	routeKey = enrollment;
	if (userType == mobile) {
		$("#conference-enrollment-image").attr("src", conferenceBanner);
		$("#conference-enrollment-event-title").html(conferenceEventTitle);
		$("#conference-enrollment-description").html(conferenceDescription);
		$("#conference-enrollment-published-on").html(conferenceDateTimeCreated);
		$("#conference-enrollment-published-by").html(conferenceUserCreatedBy);
		$("#conference-enrollment-event-place").html(conferenceEventPlace);
		$("#conference-enrollment-event-date").html(conferenceEventDate);
		$("#conference-enrollment-event-time").html(conferenceEventTime);
		$("#conference-enrollment-category").html(conferenceCategory);
		$("#conference-enrollment-abstract-submission").html(conferenceAbstractSubmission);
		$("#conference-enrollment-full-paper-submission").html(conferenceFullPaperSubmission);
		$("#conference-enrollment-average-percentage-report").html(conferenceAveragePercentageReport);
		$("#conference-enrollment-number-papers-accomodated").html(conferenceNumberPapersAccomodated);
		$("#conference-enrollment-mode-of-review").html(conferenceModeOfReview);
		$('#btn-bookmark-paper').val(conferenceDateTimeCreated);
		$('#btn-submit-bookmark').click(function() {
			database.ref(bookmarks + userGetKey + sub + conferenceEventKey).set({
		    	paper_key: paperKey,
		    	conference_banner: conferenceBanner,
		    	conference_title: conferenceEventTitle,
		    	conference_event_place: conferenceEventPlace,
		    	conference_event_date: conferenceEventDate,
		    	conference_event_time: conferenceEventTime,
		    	conference_description: conferenceDescription,
		    	conference_category: conferenceCategory,
		    	conference_abstract_Submission: conferenceAbstractSubmission,
		    	conference_full_paper_submission: conferenceFullPaperSubmission,
		    	conference_average_percentage_report: conferenceAveragePercentageReport,
		    	conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
		    	conference_allow_paper_application: conferenceAllowPaperApplication,
		    	conference_mode_of_review: conferenceModeOfReview,
		    	date_time_created: fullCurrentDateTime,
		    	user_likes: 0,
		    	paper_status: noSubmission,
		    	subscriber_name: userEmailAddress,
		    	subscriber_icon: userProfileIcon,
		    	subscriber_key: userGetKey,
		        status: 1
		    });
		    MODAL('#modal-bookmark', 'close');
		    MODAL('#modal-info', 'open');
		    $('#modal-message').html('Bookmark saved!');
		});

		$('#btn-submit-subscribe').click(function() {
		    MODAL('#modal-subscribe', 'close');
		    MODAL('#modal-choose-paper-type', 'open');
		});

		$('#conference-subscribe-fullpaper').click(function() {
		    MODAL('#modal-choose-paper-type', 'close');
		    MODAL('#modal-prompt-paper-type', 'open');
		    subscribeTypePaper = fullpaper;
		});
		
		$('#conference-subscribe-abstract').click(function() {
		    MODAL('#modal-choose-paper-type', 'close');
		    MODAL('#modal-prompt-paper-type', 'open');
		    subscribeTypePaper = abstract;
		});
		
		$('#btn-subscribe-upload-another-paper').click(function() {
			optionPaper = anotherPaper;
			$('#subscribe-input-form').css({"display":"block"}); 
			$('#subscribe-upload-paper-message').html('Upload your paper');
		    MODAL('#modal-prompt-paper-type', 'close');
		    MODAL('#modal-subscribe-upload-paper', 'open');
		});
		
		$('#btn-subscribe-existing-paper').click(function() {
			optionPaper = existingPaper;
			$('#subscribe-input-form').css({"display":"none"}); 
			$('#subscribe-upload-paper-message').html('By clicking submit, you are hereby to confirm your existing '+subscribeTypePaper+' paper to submit on the conference of ' + conferenceEventTitle);
		    MODAL('#modal-prompt-paper-type', 'close');
		    MODAL('#modal-subscribe-upload-paper', 'open');
		});
		
		$('#btn-subscribe-submit-paper').click(function() {
			$('#loading-message').html('Submitting paper...');
		    MODAL('#modal-subscribe-upload-paper', 'close');
			MODAL('#modal-progress', 'open');
			if (optionPaper == anotherPaper) {
				finalPaper = $('#subscribe-paper-submit-paper')[0].files[0];
				if (finalPaper == undefined) {
					$('#warning-message').html('Please upload document files!');
					MODAL('#modal-progress', 'close');
					MODAL('#modal-warning', 'open');
					return;
				}
				var submittingPaper = storageReference.child(papers + finalPaper.name).put(finalPaper);
			  	submittingPaper.on('state_changed', function(snapshot) {
			      switch (snapshot.state) {
			        case firebase.storage.TaskState.PAUSED:
			          console.log('Upload final paper is paused');
			          break;
			        case firebase.storage.TaskState.RUNNING: 
			          console.log('Upload final paper is running');
			          break;
			      }
			    }, function(error) {
			        $('#warning-message').html('Failed uploading final paper file!');
			  	    MODAL('#modal-progress', 'close');
			        MODAL('#modal-warning', 'open');
			    }, function() {
			        submittingPaper.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			            let finalPaperUrl = downloadURL;
						SUBMITTING_PAPER(finalPaperUrl, subscribeTypePaper);
			        });
			    });
			} else {
				if (subscribeTypePaper == fullpaper) {
					finalPaper = userFullPaperUrl;
				} else {
					finalPaper = userAbstractUrl;
				}
				SUBMITTING_PAPER(finalPaper, subscribeTypePaper);
			}
		});
	}
}

function SUBMITTING_PAPER(paperUrl, subscribeTypePaper) {
	database.ref(papers + conferenceEventKey + sub + conferenceDetails).set({
		conference_key: conferenceEventKey,
		conference_banner: conferenceBanner,
		conference_title: conferenceEventTitle,
		conference_event_place: conferenceEventPlace,
		conference_event_date: conferenceEventDate,
		conference_event_time: conferenceEventTime,
		conference_description: conferenceDescription,
		conference_category: conferenceCategory,
		conference_abstract_Submission: conferenceAbstractSubmission,
		conference_full_paper_submission: conferenceFullPaperSubmission,
		conference_average_percentage_report: conferenceAveragePercentageReport,
		conference_number_papers_accomodated: conferenceNumberPapersAccomodated,
		conference_allow_paper_application: conferenceAllowPaperApplication,
		conference_mode_of_review: conferenceModeOfReview,
		conference_published_by: conferenceUserCreatedBy,
		conference_date_time_created: conferenceDateTimeCreated,
		conference_likes: 0,
		status: 1
	});

    database.ref(papers + conferenceEventKey + sub + paperKey).set({
    	paper_key: paperKey,
    	paper_status: submitted,
    	paper_submitted_url: paperUrl,
    	paper_type: subscribeTypePaper,
    	subscriber_email: userEmailAddress,
    	subscriber_icon: userProfileIcon,
    	subscriber_key: userGetKey,
    	subscriber_position: userAccountType,
    	paper_date_time_created: fullCurrentDateTime,
        status: 1
    });

	MODAL('#modal-progress', 'close');
    MODAL('#modal-subscribe', 'close');
	MODAL('#modal-info', 'open');
    $('#modal-message').html('Congratulations! Please wait for an approval and you will receive an notification once its done');
    setTimeout(function() {
		MODAL('#modal-info', 'close');
    	MODAL('#modal-final-prompt', 'open');
	}, 3000);
}

function SUBMIT_ANOTHER_PAPER() {
	MODAL('#modal-final-prompt', 'close');
	MODAL('#modal-choose-paper-type', 'open');
}

function PREVIOUS_UPLOAD_PAPER() {
	MODAL('#modal-subscribe-upload-paper', 'close');
    MODAL('#modal-prompt-paper-type', 'open');
}

function PROMPT_BOOKMARK() {
	$('#bookmark-message').html('Do you wish to bookmark this paper?');
	MODAL('#modal-bookmark', 'open');
}

function BOOKMARK_LISTS() {
	var isBookmarkAvailable = false;
	if (userType == mobile) {
		database.ref(bookmarks + userGetKey).on('child_added', function(data) {
			var bookmarkKey = data.val().bookmark_key;
			var conferenceBanner = data.val().conference_banner;
			var conferenceEventTitle = data.val().conference_title;
			var conferenceEventPlace = data.val().conference_event_place;
			var conferenceEventDate = data.val().conference_event_date;
			var conferenceEventTime = data.val().conference_event_time;
			var conferenceDescription = data.val().conference_description;
			var conferenceCategory = data.val().conference_category;
			var conferenceAbstractSubmission = data.val().conference_abstract_Submission;
			var conferenceFullPaperSubmission = data.val().conference_full_paper_submission;
			var conferenceAveragePercentageReport = data.val().conference_average_percentage_report;
			var conferenceNumberPapersAccomodated = data.val().conference_number_papers_accomodated;
			var conferenceAllowPaperApplication = data.val().conference_allow_paper_application;
			var conferenceModeOfReview = data.val().conference_mode_of_review;
			var conferenceDateTimeCreated = data.val().date_time_created;
			var conferenceUserCreatedBy = data.val().user_email;
			var userLikes = data.val().user_likes;
			var paperStatus = data.val().paper_status;
			isBookmarkAvailable = true;
			$('#m-progress-spinner').css({"display":"none"}); 
			$('#list-bookmark-papers').append('<div class="col s12 m6 l4 card-width"><div class="card-panel border-radius-6 mt-10 card-animation-1"><img class="responsive-img border-radius-8 z-depth-4 image-n-margin" src="'+conferenceBanner+'"/><h6><a href="#" class="mt-5">'+conferenceEventTitle+'</a></h6><p>'+conferenceDescription+'</p></div></div>');
			// $('#list-bookmark-papers').append('<button onclick="VIEW_UPDATE_CONFERENCE(this)" value="'+bookmarkKey+'" style="border: none; background: none; text-align: left;"><div class="col s12 m6 l4 card-width"><div class="card-panel border-radius-6 mt-10 card-animation-1"><img class="responsive-img border-radius-8 z-depth-4 image-n-margin" src="'+conferenceBanner+'"/><h6><a href="#" class="mt-5">'+conferenceEventTitle+'</a></h6><p>'+conferenceDescription+'</p><div class="row mt-4"><a href="#"><div class="col s12 p-0 mt-1"><span class="pt-2" style="margin-left: 10px;">STATUS: '+paperStatus+'</span></div></a><div class="col s12 mt-1 left-align" style="margin-left: -8px;"><a href="#"><span class="material-icons">thumb_up</span></a><span class="ml-3 vertical-align-top">'+userLikes+' like(s)</span></div></div></div></div></button>');
			// $('#list-bookmark-papers').click(function() {
			// 	MODAL('#modal-view-conference', 'open');
			// 	if (selectedKey == bookmarkKey) {
			// 		$("#m-view-conference-banner").attr("src", conferenceBanner);
			//    		$("#m-view-event-title").html(conferenceEventTitle);
			//    		$("#m-view-event-place").html(conferenceEventPlace);
			//    		$("#m-view-event-date").html(conferenceEventDate);
			//    		$("#m-view-event-time").html(conferenceEventTime);
			//    		$("#m-view-description").html(conferenceDescription);
			//    		$("#m-view-category").html(conferenceCategory);
			//    		$("#m-view-abstract-submission").html(conferenceAbstractSubmission);
			//    		$("#m-view-full-paper-submission").html(conferenceFullPaperSubmission);
			//    		$("#m-view-average-percentage-report").html(conferenceAveragePercentageReport);
			//    		$("#m-view-no-papers-accomodated").html(conferenceNumberPapersAccomodated);
			//    		$("#m-view-allow-paper-application").html(conferenceAllowPaperApplication);
			//    		$("#m-view-mode-of-review").html(conferenceModeOfReview);
			//    		$("#m-view-date-time-created").html(conferenceDateTimeCreated);
			//    		$("#m-view-publish-by").html(conferenceUserCreatedBy);
			//    		$("#m-view-likes").html(userLikes);
			//    		$("#m-view-paper-status").html(paperStatus);
			// 	}
			// });
		});	
		setTimeout(function() {
			routeKey = search;
			var start = setInterval( function() {
				if (isBookmarkAvailable) {
					$('#m-progress-spinner').css({"display":"none"}); 
			  		clearInterval(start);
					return;
				} else {
					$('#m-progress-spinner').css({"display":"none"}); 
					$('#bookmark-warning-message').css({"display":"block"});
					$('#bookmark-warning-message').html(noData);
					isBookmarkAvailable = true;
				}
			}, 1000);
		}, 5000);
	}
}

function PAPER_LISTS() {
	var isPaperAvailable = false;
	$('#my-papers-header-title').empty();
	$('#my-papers-list').empty();
	// if (userType == mobile) {
	database.ref(papers).on('child_added', function(data) {
		var conferenceKey = data.val().conference_key;
		var conferenceBanner = data.val().conference_banner;
		var conferenceEventTitle = data.val().conference_title;
		var conferenceEventPlace = data.val().conference_event_place;
		var conferenceEventDate = data.val().conference_event_date;
		var conferenceEventTime = data.val().conference_event_time;
		var conferenceDescription = data.val().conference_description;
		var conferenceCategory = data.val().conference_category;
		var conferenceAbstractSubmission = data.val().conference_abstract_Submission;
		var conferenceFullPaperSubmission = data.val().conference_full_paper_submission;
		var conferenceAveragePercentageReport = data.val().conference_average_percentage_report;
		var conferenceNumberPapersAccomodated = data.val().conference_number_papers_accomodated;
		var conferenceAllowPaperApplication = data.val().conference_allow_paper_application;
		var conferenceModeOfReview = data.val().conference_mode_of_review;
		var conferenceDateTimeCreated = data.val().conference_date_time_created;
		var conferencePublishedBy = data.val().conference_published_by;
		var conferenceLikes = data.val().conference_likes;
		database.ref(papers + conferenceKey).on('child_added', function(snapshot) {	
			var paperKey = snapshot.val().paper_key,
			paperDateTimeCreated = snapshot.val().paper_date_time_created,
			paperStatus = snapshot.val().paper_status,
			paperSubmittedUrl = snapshot.val().paper_submitted_url,
			paperType = snapshot.val().paper_type,
			status = snapshot.val().status,
			subscriberEmail = snapshot.val().subscriber_email,
			subscriberKey = snapshot.val().subscriber_key,
			colorStatusValue = submittedColor,
			btnActionStatus = "enabled";
			if (paperStatus == processing) {
				colorStatusValue = processingColor;
			} else if (paperStatus == returnedAccepted) {
				colorStatusValue = returnAcceptedColor;
				btnActionStatus = "disabled";
			} else if (paperStatus == returnedRejected) {
				colorStatusValue = returnRejectedColor;
				btnActionStatus = "disabled";
			} else if (paperStatus == returnedRevisions) {
				colorStatusValue = returnRevisionsColor;
				btnActionStatus = "disabled";
			}
			if (paperKey != undefined) {
				isPaperAvailable = true;
				$('#papers-warning-message').empty();
				$('#m-papers-progress-spinner').css({"display":"none"});
				$('#papers-spinner').css({"display":"none"}); 
	        	$('#papers-table-list').append('<tr><td class="text-center"><img id="mobile-upper-user-icon" style="border-radius: 25px; height: 50px; width: 50px;" src="'+conferenceBanner+'"></td><td class="text-center">'+conferenceEventTitle+'</td><td class="text-center">'+paperKey+'</td><td class="text-center">'+subscriberEmail+'</td><td class="text-center"><span style="font-weight: bolder; text-transform: uppercase; color: '+colorStatusValue+';">'+paperStatus+'</span></td><td class="text-center">'+paperDateTimeCreated+'</td><td class="text-center"><button class="btn btn-success btn-small text-center" onclick="REDIRECT(\''+paperSubmittedUrl+'\')"><i class="material-icons">download</i></button></td><td class="text-center"><a '+btnActionStatus+' title="'+returnedAccepted+'" style="background: '+returnAcceptedColor+';" class="btn-floating mb-1 btn-small waves-effect waves-light" onclick="UPDATE_PAPER_STATUS(\''+conferenceKey+'\',\''+conferenceBanner+'\',\''+conferenceEventTitle+'\',\''+paperKey+'\',\''+returnedAccepted+'\',\''+subscriberKey+'\')"><i class="material-icons">check</i></a>&nbsp;&nbsp;&nbsp;<a '+btnActionStatus+' title="'+returnedRejected+'" style="background: '+returnRejectedColor+';" class="btn-floating mb-1 btn-small waves-effect waves-light" onclick="UPDATE_PAPER_STATUS(\''+conferenceKey+'\',\''+conferenceBanner+'\',\''+conferenceEventTitle+'\',\''+paperKey+'\',\''+returnedRejected+'\',\''+subscriberKey+'\')"><i class="material-icons">close</i></a>&nbsp;&nbsp;&nbsp;<a '+btnActionStatus+' title="'+returnedRevisions+'" style="background: '+returnRevisionsColor+';" class="btn-floating mb-1 btn-small waves-effect waves-light"  onclick="UPDATE_PAPER_STATUS(\''+conferenceKey+'\',\''+conferenceBanner+'\',\''+conferenceEventTitle+'\',\''+paperKey+'\',\''+returnedRevisions+'\',\''+subscriberKey+'\')"><i class="material-icons">update</i></a></td></tr>');
			}
		});
		if (isPaperAvailable && conferenceDescription) {
			conferenceDescription = conferenceDescription.replace(/\s/g, ' ');
			$('#my-papers-list').append('<div class="col s12 m4"><div class="card blue-grey darken-4 bg-image-1" style="background-image: url('+conferenceBanner+'); background-size: cover;"><div class="card-content white-text" style="background-color: rgba(0, 0, 0, 0.7);"><span class="card-title font-weight-400 mb-10" style="text-transform: uppercase; font-weight: bolder;">'+conferenceEventTitle+'</span><p>'+conferenceDescription+' <br/></p><div class="border-non mt-5"><button class="waves-effect waves-light btn red border-round box-shadow" onclick="VIEW_PAPER(\''+conferenceKey+'\', \''+conferenceBanner+'\', \''+conferenceEventTitle+'\', \''+conferenceEventPlace+'\', \''+conferenceEventDate+'\', \''+conferenceEventTime+'\', \''+conferenceDescription+'\', \''+conferenceCategory+'\', \''+conferenceAbstractSubmission+'\', \''+conferenceFullPaperSubmission+'\', \''+conferenceAveragePercentageReport+'\', \''+conferenceNumberPapersAccomodated+'\', \''+conferenceAllowPaperApplication+'\', \''+conferenceModeOfReview+'\', \''+conferenceDateTimeCreated+'\', \''+conferencePublishedBy+'\', \''+conferenceLikes+'\')">View</button></div></div></div></div>');
		}

	});
	setTimeout(function() {
		var start = setInterval( function() {
			if (isPaperAvailable) {
				$('#m-papers-progress-spinner').css({"display":"none"}); 
		  		clearInterval(start);
				return;
			} else {
				$('#m-papers-progress-spinner').css({"display":"none"}); 
				$('#papers-warning-message').css({"display":"block"});
				$('#papers-warning-message').html(noData);
				isPaperAvailable = true;
			}
		}, 1000);
	}, 5000);	
	// }
}

function VIEW_PAPER(conferenceKey, conferenceBanner, conferenceEventTitle, conferenceEventPlace, conferenceEventDate, conferenceEventTime, 
					conferenceDescription, conferenceCategory, conferenceAbstractSubmission, conferenceFullPaperSubmission, conferenceAveragePercentageReport,
					conferenceNumberPapersAccomodated, conferenceAllowPaperApplication, conferenceModeOfReview, conferenceDateTimeCreated, conferencePublishedBy,
					conferenceLikes) {
    MODAL('#modal-view-paper', 'open');
    $('#reviewer-lists').empty();
	$('#review-conference-title').html(conferenceEventTitle);
	$('#btn-review-paper').css({"display":"block"}); 
	$('#btn-papers-submit-check').click(function() {
		$('#list-of-paper-details').empty();
		MODAL('#modal-view-paper', 'close');
		MODAL('#modal-choose-papers', 'open');
		database.ref(papers + conferenceKey).on('child_added', function(data) {
			var paperDateTimeCreated = data.val().paper_date_time_created,
			paperKey = data.val().paper_key,
			paperStatus = data.val().paper_status,
			paperSubmittedUrl = data.val().paper_submitted_url,
			paperType = data.val().paper_type,
			status = data.val().status,
			subscriberEmail = data.val().subscriber_email,
			subscriberIcon = data.val().subscriber_icon,
			subscriberKey = data.val().subscriber_key,
			subscriberPosition = data.val().subscriber_position;
			if (paperKey != undefined && conferenceKey) {
				$('#list-of-paper-details').append('<div class="col s12 m4"><div class="card blue-grey darken-4"><div class="card-content white-text"><p>Author: <br /><span style="word-wrap: break-word;">'+subscriberEmail+'</span></p><br><p>Paper ID: <br />'+paperKey+'<br /><br />Type: <br />'+paperType+'<br /><br />Date/Time Created: <br />'+paperDateTimeCreated+'<br /><br /></p><div class="border-non mt-5"><button class="waves-effect waves-light btn red border-round box-shadow" onclick="DOWNLOAD_REVIEW_PAPER(\''+paperKey+'\', \''+paperSubmittedUrl+'\', \''+conferenceKey+'\', \''+conferenceEventTitle+'\', \''+conferenceBanner+'\', \''+downloadPaper+'\')">Download Paper</button><br><br><button id="btn-review-paper" class="waves-effect waves-light btn red border-round box-shadow" onclick="DOWNLOAD_REVIEW_PAPER(\''+paperKey+'\', \''+paperSubmittedUrl+'\', \''+conferenceKey+'\', \''+conferenceEventTitle+'\', \''+conferenceBanner+'\', \''+reviewPaper+'\')">Review Paper</button></div></div></div></div>');
				if (userAccountType == author) {
					$('#btn-review-paper').css({"display":"none"}); 
				}
			}
		});
	});
    $("#m-view-conference-banner").attr("src", conferenceBanner);
	$("#m-view-event-title").html(conferenceEventTitle);
	$("#m-view-event-place").html(conferenceEventPlace);
	$("#m-view-event-date").html(conferenceEventDate);
	$("#m-view-event-time").html(conferenceEventTime);
	$("#m-view-description").html(conferenceDescription);
	$("#m-view-category").html(conferenceCategory);
	$("#m-view-abstract-submission").html(conferenceAbstractSubmission);
	$("#m-view-full-paper-submission").html(conferenceFullPaperSubmission);
	$("#m-view-average-percentage-report").html(conferenceAveragePercentageReport);
	$("#m-view-no-papers-accomodated").html(conferenceNumberPapersAccomodated);
	$("#m-view-allow-paper-application").html(conferenceAllowPaperApplication);
	$("#m-view-mode-of-review").html(conferenceModeOfReview);
	$("#m-view-date-time-created").html(conferenceDateTimeCreated);
	$("#m-view-published-by").html(conferencePublishedBy);
	$("#m-view-total-likes").html(conferenceLikes);
}

function SUBSCRIBE_PAPER() {
	$('#subscribe-message').html('Do you wish to Subscribe this paper?');
	MODAL('#modal-final-prompt', 'close');
	MODAL('#modal-subscribe', 'open');
}

function DOWNLOAD_REVIEW_PAPER(paperKey, paperSubmittedUrl, conferenceKey, conferenceTitle, conferenceBanner, action) {
	localStorage.setItem('reviewPaperKey', paperKey);
	localStorage.setItem('reviewPaperEventTitle', conferenceTitle);
	localStorage.setItem('reviewPaperConferenceKey', conferenceKey);
	localStorage.setItem('reviewPaperConferenceBanner', conferenceBanner);
	localStorage.setItem('reviewPaperUrl', paperSubmittedUrl);
	if (action == downloadPaper) {
		REDIRECT(paperSubmittedUrl);
		return;
	}
	REDIRECT('mypapers2.html');
}

function BACK_VIEW_PAPER() {
	MODAL('#modal-choose-papers', 'close');
	MODAL('#modal-view-paper', 'open');
}

function FETCH_REVIEWS() {
	var rateStarsValue = 5;
	if (reviewPaperKey || reviewPaperKey != undefined) {
   		$("#review-conference-banner").attr("src", reviewPaperConferenceBanner);
		$('#review-star-ratings').html(5);
		$('#review-paper-id').html(reviewPaperKey);
		$('#review-conference-title').html(reviewPaperEventTitle);
		$('#btn-review-paper-url').click(function() {
			REDIRECT(reviewPaperUrl);
		});
		$('input[type="radio"]').on('click change', function(e) {
	    	rateStarsValue = document.querySelector('input[name="rate-stars"]:checked').value;
		    if ($(this).is(':checked'))  {
		        $('#review-star-ratings').html(rateStarsValue);
		    }
		});
		$('#btn-submit-review-paper').click(function() {
			var reviewFeedbackCommentValue = $('#review-paper-feedback-comment').val();
			if (!reviewFeedbackCommentValue || reviewFeedbackCommentValue == "") {
			    $('#modal-message').html('Please fill out feedback/comment field!');
			    MODAL('#modal-info', 'open');
			    return;
			}
			database.ref(papers + reviewPaperConferenceKey + sub + reviewPaperKey + sub + review + reviewKey).set({
		    	review_paper_key: reviewPaperKey,
		    	review_key: reviewKey,
		    	review_stars: rateStarsValue,
		    	review_feedback_comment: reviewFeedbackCommentValue,
		    	review_email: userEmailAddress,
		    	review_date_time_created: fullCurrentDateTime,
		        status: 1
		    });
		    database.ref(papers + reviewPaperConferenceKey + sub + reviewPaperKey).update({
		    	paper_status: processing
		    });
		    INSERT_NOTIFICATIONS(reviewPaperConferenceKey, reviewPaperConferenceBanner, reviewPaperEventTitle,
		    					 reviewPaperKey, processing, reviewAuthorPaper);
		    $('#modal-message').html('Successfully saved!');
		    MODAL('#modal-info', 'open');
		    setTimeout(function() {
		    	MODAL('#modal-info', 'close');
		    	MODAL('#modal-warning', 'open');
			}, 3000);
		});
		database.ref(papers).on('child_added', function(data) {
			database.ref(papers + data.key).on('child_added', function(snapshot) {
				database.ref(papers + data.key + sub + snapshot.val().paper_key + sub + review).on('child_added', function(data) {
					var reviewKey = data.val().review_key,
					reviewFeedBack = data.val().review_feedback_comment,
					reviewDateTimeCreated = data.val().review_date_time_created,
					reviewEmail = data.val().review_email,
					reviewStars = data.val().review_stars,
					paperKey = data.val().review_paper_key,
					rateDataStars = '<span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span>';
					if (paperKey == reviewPaperKey) {
						if (reviewStars == 4) {
							rateDataStars = '<span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span>';
						} else if (reviewStars == 3) {
							rateDataStars = '<span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span>';
						} else if (reviewStars == 2) {
							rateDataStars = '<span class="material-icons star-width vertical-align-middle">star_rate</span><span class="material-icons star-width vertical-align-middle">star_rate</span>';
						} else if (reviewStars == 1) {
							rateDataStars = '<span class="material-icons star-width vertical-align-middle">star_rate</span>';
						}
						if (reviewKey || reviewKey != undefined) {
							$('#reviewer-lists').append('<div class="row" style="margin-top: 0px;"><div class="card user-card-negative-margin z-depth-0" id="feed"><div class="card-content card-border-gray"><hr class="mt-5"><div class="row"><div class="col s12"><h5><span id="review-author-email-address" style="font-size: 15px;">'+reviewEmail+'</span><br><span id="review-author-email-address" style="font-size: 11px;">'+reviewDateTimeCreated+'</span></h5></div></div><div class="row mt-5"><div class="col s3 pr-0 circle"><a href="#"><img class="responsive-img circle" src="'+defaultUserIconPlaceholder+'"></a></div><div class="col s9"><div class="row"><div class="col s12"><div class="social-icon" style="margin-left: -8px;"><span class="amber-text">'+rateDataStars+'</span><br><span style="margin-left: 5px;"><span>'+reviewStars+'</span> stars</span><br></div><br></div></div></div><br><br><br><br><div style="width: 250px; margin-top: -5px; margin-left: 15px; width: 200px;"><span style="text-align: justify; white-space: pre-line;">'+reviewFeedBack+'</span></div></div><br><hr class="mt-5"></div></div></div>');
						}
					}
				});
			});
		});
	} 
}

function UPDATE_PAPER_STATUS(conferenceKey, conferenceBanner, conferenceTitle, paperKey, action, authorUserKey) {
	if (userType == web) {
		var actionMessage = returnedAccepted;
		if (action == returnedRejected) {
			actionMessage = returnedRejected;
		} else if (action == returnedRevisions) {
			actionMessage = returnedRevisions;
		}
		MODAL('#modal-update-paper', 'open');
		$('#update-paper-action-message').html(actionMessage);
		$('#btn-submit-update-paper-status').click(function() {
			MODAL('#modal-update-paper', 'close');
		    database.ref(papers + conferenceKey + sub + paperKey).update({
		    	paper_status: action
		    });
		    INSERT_NOTIFICATIONS(conferenceKey, conferenceBanner, conferenceTitle, 
								 paperKey, action, updatePaper, authorUserKey, 
								 userEmailAddress)
		    RELOAD_PAGE();
		});
	}
}

function NOTIFICATIONS() {
	var notifyMessage = "",
	notifyFlag = false,
	nTimer = false;
	database.ref(notifications).on('child_added', function(snapshot) {
		localStorage.setItem('totalNumberNotifications', snapshot.numChildren());
	});
	if (userType == mobile) {
		$('#m-notification-lists').empty();
		database.ref(notifications + userGetKey).limitToLast(3).on('child_added', function(data) {
			const authorUserKey = data.val().author_user_key,
			conferenceBanner = data.val().conference_banner,
			conferenceKey = data.val().conference_key,
			conferenceTitle = data.val().conference_title,
			notifyDateTimeCreated = data.val().notify_date_time_created,
			paperKey = data.val().paper_key,
			paperStatus = data.val().paper_status,
			status = data.val().status,
			updateUserEmailAddress = data.val().update_user_email_address,
			userActionType = data.val().user_action_type;
			if (userActionType == updatePaper) {
				notifyMessage = "Paper ID: "+paperKey+" has been updated into "+paperStatus+" by conference chair: "+updateUserEmailAddress+".";
			} else {
				notifyMessage = "Paper ID: "+paperKey+" is now processing and successfully review by Paper reviewer: "+updateUserEmailAddress+".";
			}
			if (totalNumberNotifications != 1 && totalNumberNotifications != 2 && totalNumberNotifications > 3) {
				totalNumberNotifications = 3;
			}
			$('#btn-submit-notification').click(function() {
				MODAL('#modal-notification', 'close');
			    database.ref(notifications + authorUserKey + sub + data.key).update({
			    	status: 1
			    });
				nTimer = true;
				RELOAD_PAGE();
			});
			var t = setInterval( function() {
				if (nTimer) {
			  		clearInterval(t);
					return;
				} else {
					if (status == 0) {
						MODAL('#modal-notification', 'open');
						$('#m-notification-message').html(notifyMessage);
						nTimer = true;
					}
				}
			}, 1000);
			if (authorUserKey != undefined || authorUserKey) {
				notifyFlag = true;
				$('#m-notification-lists').append('<li><a class="grey-text text-darken-2" href="notifications.html"><img class="responsive-img circle" style="height: 35px; width: 35px;" src="'+conferenceBanner+'"/><span style="margin-left: 20px; font-size: 15px; width: 250px;">'+notifyMessage+'</span></a><time style="margin-left: 55px;" class="media-meta" datetime="'+notifyDateTimeCreated+'">'+notifyDateTimeCreated+'</time></li><li class="divider"></li>');
				$('#user-notification-list').append('<tr><td class="text-center">'+paperKey+'</td><td class="text-center">'+paperStatus+'</td></tr>');
				$('#m-total-notifications-outer').html(totalNumberNotifications);
				$('#m-total-notifications-inner').html(totalNumberNotifications);
				$('#view-all-notifications').css({"display":"block"});
				$('#no-available-notifications').css({"display":"none"});
			}
		});
		setTimeout(function() {
			if (!notifyFlag) {
				$('#m-total-notifications-outer').html(0);
				$('#m-total-notifications-inner').html(0);
				$('#view-all-notifications').css({"display":"none"});
				$('#no-available-notifications').css({"display":"block"});
			}
		}, 5000);
	}
}

function INSERT_NOTIFICATIONS(conferenceKey, conferenceBanner, conferenceTitle, 
							  paperKey, paperStatus, actionType, authorUserKey, 
							  userUpdateByEmailAddress) {
	database.ref(notifications + authorUserKey + sub + notificationKey).set({
    	conference_key: conferenceKey,
    	conference_banner: conferenceBanner,
    	conference_title: conferenceTitle,
    	paper_key: paperKey,
    	paper_status: paperStatus,
    	notify_date_time_created: fullCurrentDateTime,
    	author_user_key: authorUserKey,
    	update_user_email_address: userUpdateByEmailAddress,
    	user_action_type: actionType,
    	status: 0
    });
}