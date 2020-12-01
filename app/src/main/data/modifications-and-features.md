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

• !!! -> Allow download files using anchor href tag or View docs (docx, doc) 

• Hide keyboard when search conference

• Handle validation when no internet

• No enroll and subscribe/bookmark paper when paper review is logged in otherwise, will review the specific papers

• Adjust icons (include css/js)

• Fix error for search enter key


***PROCESS***

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