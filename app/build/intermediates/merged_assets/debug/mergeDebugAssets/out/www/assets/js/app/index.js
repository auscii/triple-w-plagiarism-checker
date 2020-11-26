CHECK_USER_SESSION();
FETCH_CONFERENCES();
FETCH_USERS();
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

$("#profile-history").click(function() {
	REDIRECT('history.html');
});

$("#profile-papers").click(function(){
	REDIRECT('papers.html');
});

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
	let selectedKey = input.value;
    MODAL('#modal-update-conference', 'open');
	if (userType == mobile) {
		database.ref(programmes + conferences).on('child_added', function(data) {
			if (data.val().conference_key == selectedKey) {
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

// document.onkeypress = enter;
// function enter(e) {
//    if (e.which == 13) { 
//       $('#modal-progress').modal('hide');
//       AUTH_USER_ACCOUNT();
//    }
// }

function SEARCH_CONFERENCE(ele) {
	var field = document.createElement('input');
	field.setAttribute('type', 'text');
	// document.body.appendChild(field);

	if (event.key === 'Enter') {
		var searchConference = $('#input-search-conference').val();
		console.log('searchConference ->', searchConference);

		// $('#m-search-spinner').css({"display":"block"}); 
		$('#card-search-conference').css({"display":"block"}); 

		setTimeout(function() {
    field.focus();
    setTimeout(function() {
        field.setAttribute('style', 'display:none;');
    }, 50);
}, 50);
	}
}