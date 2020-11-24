USER_PROGRAMMES();

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
    MODAL('#modal-progress', 'close');
    RELOAD_PAGE();
}

function USER_PROGRAMMES() {
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
			$('#list-of-conferences').append('<div class="col s12 m6 l4 card-width"><div class="card card-border center-align gradient-45deg-indigo-purple"><div class="card-content white-text"><img class="responsive-img circle z-depth-4" style="height: 100px; width: 100px;" src="'+banner+'"/><h5 class="white-text mb-1">'+title+'</h5><p class="m-0">'+eventPlace+'</p><p class="mt-8"><span style="text-transform: uppercase;">'+category+' </span><br />Category</p><button onclick="VIEW_UPDATE_CONFERENCE(this)" value="'+key+'" class="waves-effect waves-light btn gradient-45deg-deep-orange-orange border-round mt-7 z-depth-4">View Conference</button><div class="row mt-5"></div></div></div></div>');
			$('#conference-progress-spinner').css({"display":"none"}); 
		}
    });
	setTimeout(function() {
		CHECK_IF_DATA_EXISTS();
	}, 5000);
}

function CHECK_IF_DATA_EXISTS() {
	var start = setInterval( function() {
		if (isConferenceAvailable) {
	  		clearInterval(start);
			return;
		} else {
			MODAL('#modal-warning', 'open');
			$('#conference-progress-spinner').css({"display":"none"}); 
			$('#warning-message').html('No available data');
			$('#conference-warning-message').html('No available data');
			isConferenceAvailable = true;
		}
	}, 1000);
}

function VIEW_UPDATE_CONFERENCE(input) {
	document.getElementById('e-conference-category').value = 'Science'

	let selectedKey = input.value;
    MODAL('#modal-update-conference', 'open');
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
			console.log('title ->', title);
			console.log('category ->', category);
			console.log('numberPapersAccomodated ->', numberPapersAccomodated);

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
			    	MODAL('#modal-update-conference', 'close');
			    	RELOAD_PAGE();
		        });
		    });
    	}
	});
}