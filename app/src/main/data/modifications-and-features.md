***NOTES***
• NEED APPROVAL OF CONFERENCE CHAIR SUBMITTED OR ENROLL PAPERS OF THE AUTHOR USER(S) FOR WEB WITH OR WITHOUT REVIEW OF PAPER REVIEWER USERS

• APPROVAL OF CONFERENCE CHAIR MUST BE CREATED OF CONFERENCE USERS ONLY... ELSE NO APPROVAL JUST VIEW

• ADD FLAG/STATUS FOR LISTING ALL THE PENDING/APPROVAL PAPERS



***FEATURES***

• Android Mobile Application				
	- Enrollment module			
	- Paper Review module			
	- Push Notification using Firebase Cloud Messaging 			
	- Post Survey module			
	- Plagiarism Checker			
	- User login and registration			
				
• Web Application				
	- Programme module			
	- Promote/Endorse Programme module			
	- Certificate Editor module 			
	- Dashboard 			
	- Report Generation module			
	- User account module			


***MODIFICATIONS***

MOBILE
• Add filter for preferences on mobile conference list(s) on mobile view (example - if Technology category is the selected preferences of user logged in then full paper/abstract paper will display on mobile dashboard view)

• Add "user_created_by" for viewing conference on mobile conference list(s)

• Add complete summary of input user details before submitting the registration

• Add pagination for users management

• Add checker when choosing denied for read_external_storage

• Add prompt alert/checker when no internet available

• !!! -> Allow download files using anchor href tag or View docs (docx, doc) when android device mode

• Hide keyboard when search conference

• Handle validation when no internet

• No enroll and subscribe/bookmark paper when paper review is logged in otherwise, will review the specific papers

• Adjust icons (include css/js)

_DONE • Fix error for search enter key

• Include paper status for every pages on mobile view

• Include Reports (Return accepted, revisions, rejected, processing and submitted paper status) with Print and Download as PDF and Audit Logs (User and System Logs)

• When Download, Automatically convert as PDF the selected download doc or docx file.

• Validation for uploading doc or docx file only.

_DONE • Uploading of profile picture of individual user for mobile and web

_DONE • Filter by Preferences of Pre-register author and/or paper reviewer on conferences list for Mobile

• Slow refresh and fetch data on conference main for mobile and other pages

• Save login user credentials in order to auto login when accidentally exit the app and re-enter the mobile

• Update height of modal

_DONE • Invitation for paper reviewer to grant access on mobile from conference chair with approval on the website

_DONE • Remove 2 radio button forms for creating new conference (website)

• Total entries for every table lists

_DONE • Paper status (Return - accepted, return - rejected, return - revision, processing or submitted) on mobile

_DONE • Change password of user

_DONE • Switch user for mobile

_DONE • Dashboard for web


***PROCESS*** = DONE

submitted = "Submitted", //first status when first submit author
processing = "Processing", //paper reviewer - after feedback/comment or rate
returned = "Returned", //conference chair - Returned - accepted, Returned - rejected, Returned - Revisions (update existing paper)


Conference Chair
- Approval
- Notifications


Paper Review
- Individual approval review of papers submitted by Author
- "Processing" status after review/comment


Author
- After subscribe the conference > Submit papers such as Abstract and Fullpaper or add more paper
- One at a time for submission paper (Abstract or Fullpaper)











1. Create Conference Chair User (Website)

2. Create conference (website) 

3. Create Author User (mobile)

4. Login author user > enroll conference > subscribe and submit paper

5. Register paper reviewer user > (check if user preference is the same category on conference) > Review papers of Author

6. And so on...


NOTE:
• Guys always remember na, bago kayo mag create AUTHOR user or PAPER REVIEWER user make sure na SAME sila ng CATEGORY sa na-create nyong Conference from Conference Chair para may mag populate sa mobile > conference, para may lumabas na conference card(s) naka filter kasi by preferences 

• Pag nag update kayo sa conference at nag loloading pa rin, try nyo mag logout then login nyo yun account sa mobile

• Always remember at wag kayo malito na si PAPER REVIEWER ay makakapag-review sya sa Papers menu at kailangan approved sya ni conference chair

• Wag kayong kabahan sa defense, at i-test nyo ng mabuti kapag may nakita pa kayong bugs ulit, takpan nyo nalang at iwasan nyo nalang. pa-test at present nyo rin un validation para tumagal ng konti.