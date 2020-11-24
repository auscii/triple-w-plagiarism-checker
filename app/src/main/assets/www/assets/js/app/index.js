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
  } else if (!conferenceTitle && !conferenceEventPlace && !conferenceEventDate && !conferenceEventTime && !conferenceDescription
  	         && !conferenceCategory && !conferenceAbstractSubmission && !conferenceFullPaperSubmission && !conferenceAveragePercentageReport
  	         && !conferenceNumberPapersAccomodated && !conferenceAllowPaperApplication && !conferenceModeOfReview) {
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
    $('#warning-message').html('Successfully add new conference!');
  	MODAL('#modal-create-conference', 'close');
    MODAL('#modal-progress', 'close');
	MODAL('#modal-warning', 'open');
}
