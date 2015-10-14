var restler = require('restler');

function SendinblueAPI_v1_0 (base_url, apiKey) {
	
	this.version     = '1.0';
	this.api_key	 = apiKey;
	this.base_url    = base_url;
	
}

module.exports = SendinblueAPI_v1_0;


SendinblueAPI_v1_0.prototype.call = function(resource , method , input){

	var called_url = this.base_url + "/" + resource;
	var content_type = "application/json";

	return restler.request(called_url,{
				method:method,
				headers:{'api-key':this.api_key,"content-type":content_type},
				data:input
	});
};


SendinblueAPI_v1_0.prototype.get_request = function(resource,input) {
	return this.call(resource,"GET",input);
};

SendinblueAPI_v1_0.prototype.post_request = function(resource,input) {
        return this.call(resource,"POST",input);
};

SendinblueAPI_v1_0.prototype.put_request = function(resource,input) {
        return this.call(resource,"PUT",input);
};

SendinblueAPI_v1_0.prototype.delete_request = function(resource,input) {
        return this.call(resource,"DELETE",input);
};

/*
Get Account
No input required
*/

SendinblueAPI_v1_0.prototype.get_account = function() {
	return this.get_request("account","");
};

/*
Get SMTP details
No input required
*/

SendinblueAPI_v1_0.prototype.get_smtp_details = function() {
	return this.get_request("account/smtpdetail","");
};

/*
Create Child Account
@param {Object} opts contains json object with key value pair
@options opts {String} child_email email address of child [Mandatory]
@options opts {String} password password of child to login [Mandatory]
@options opts {String} company_org Name of child's Company [Mandatory]
@options opts {String} first_name First Name of child [Mandatory]
@options opts {String} last_name Last Name of child [Mandatory]
@options opts {Integer} credits Number of email & sms credits respectively, which will be assigned to the child’s account [Optional]
*/

SendinblueAPI_v1_0.prototype.create_child_account = function(opts) {
    return this.post_request("account",JSON.stringify(opts));
};

/*
Update Child Account
@param {Object} opts contains json object with key value pair
@options opts {String} auth_key 16 character authorization key of child to be modified [Mandatory].
@options opts {String} company_org Name of child’s company [Optional].
@options opts {String} first_name First name of child [Optional].
@options opts {String} last_name Last Name of child [Optional].
@options opts {String} password password of child to login [Optional]
@options opts {String} associate_ip Associate dedicated IPs to reseller child. You can use commas to separate multiple IPs [Optional]
@options opts {String} disassociate_ip Disassociate dedicated IPs from reseller child. You can use commas to separate multiple IPs [Optional].
*/

SendinblueAPI_v1_0.prototype.update_child_account = function(opts) {
    return this.put_request("account",JSON.stringify(opts));
};

/*
Delete Child Account
@param {Object} opts contains json object with key value pair
@options opts {String} auth_key 16 character authorization key of Reseller child to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_child_account = function(opts) {
    return this.delete_request("account/" + opts.child_authkey,"");
};

/*
Get Reseller child Account
@param {Object} opts contains json object with key value pair
@options opts {String} auth_key 16 character authorization key of Reseller child. Example : To get the details of more than one child account, use, {“key1″:”abC01De2fGHI3jkL”,”key2″:”mnO45Pq6rSTU7vWX”} [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_reseller_child = function(opts) {
    return this.post_request("account/getchildv2",JSON.stringify(opts));
};

/*
Add/remove the Email/Sms credits of the reseller child user
@param {Object} opts contains json object with key value pair
@options opts {String} auth_key 16 character authorization key of Reseller child to modify credits [Mandatory].
@options opts {Array} add_credit Number of email & sms credits to be added. You can assign either email or sms credits, one at a time other will remain 0. [Mandatory: if rmv_credit is empty].
		- email_credit {Integer} number of email credits
		- sms_credit {Integer} Number of sms credts
@options opts {Array} rmv_credit Number of email & sms credits to be removed. You can assign either email or sms credits, one at a time other will remain 0. [Mandatory: if add_credits is empty].
		- email_credit {Integer} number of email credits
		- sms_credit {Integer} Number of sms credts

*/

SendinblueAPI_v1_0.prototype.add_remove_child_credits = function(opts) {
    return this.post_request("account/addrmvcredit",JSON.stringify(opts));
};

/*
Send a transactional SMS
@param {Object} opts contains json object with key value pair
@options opts {String} to The mobile number to send SMS to with country code [Mandatory].
@options opts {String} from The name of the sender. The number of characters is limited to 11 (alphanumeric format) [Mandatory].
@options opts {String} text The text of the message. The maximum characters used per SMS is 160, if used more than that, it will be counted as more than one SMS [Mandatory].
@options opts {String} web_url The web URL that can be called once the message is successfully delivered [Optional].
@options opts {String} tag The tag that you can associate with the message [Optional].
@options opts {String} type Type of message. Possible values – marketing (default) & transactional. You can use marketing for sending marketing SMS, & for sending transactional SMS, use transactional type [Optional].
*/

SendinblueAPI_v1_0.prototype.send_sms = function(opts) {
	return this.post_request("sms",JSON.stringify(opts));
};

/*
Create & Schedule your SMS campaigns.
@param {Object} opts contains json object with key value pair
@options opts {String} name Name of the SMS campaign [Mandatory].
@options opts {String} sender This allows you to customize the SMS sender. The number of characters is limited to 11 ( alphanumeric format ) [Optional].
@options opts {String} content Content of the message. The maximum characters used per SMS is 160, if used more than that, it will be counted as more than one SMS [Optional].
@options opts {String} bat Mobile number with the country code to send test SMS. The mobile number defined here should belong to one of your contacts in SendinBlue account and should not be blacklisted [Optional].
@options opts {Array} listid These are the list ids to which the SMS campaign is sent [Mandatory: if scheduled_date is not empty].
@options opts {Array} exclude_list These are the list ids which will be excluded from the SMS campaign [Optional].
@options opts {String} schedule_date The day on which the SMS campaign is supposed to run [Optional].
@options opts {} (problem)
*/

SendinblueAPI_v1_0.prototype.create_sms_campaign = function(opts) {
    return this.post_request("sms",JSON.stringify(opts));
};

/*
Update your SMS campaigns.
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of the SMS campaign [Mandatory].
@options opts {String} name Name of the SMS campaign [Optional].
@options opts {String} sender This allows you to customize the SMS sender. The number of characters is limited to 11 ( alphanumeric format ) [Optional].
@options opts {String} content Content of the message. The maximum characters used per SMS is 160, if used more than that, it will be counted as more than one SMS [Optional].
@options opts {String} bat Mobile number with the country code to send test SMS. The mobile number defined here should belong to one of your contacts in SendinBlue account and should not be blacklisted [Optional].
@options opts {Array} listid hese are the list ids to which the SMS campaign is sent [Mandatory: if scheduled_date is not empty].
@options opts {Array} exclude_list These are the list ids which will be excluded from the SMS campaign [Optional].
@options opts {String} scheduled_date The day on which the SMS campaign is supposed to run [Optional].
*/

SendinblueAPI_v1_0.prototype.update_sms_campaign = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("sms/" + id,JSON.stringify(opts));
};

/*
Send a Test SMS.
@param {Object} opts contains json object with key value pair
@options opts {Integer} campid Id of the SMS campaign [Mandatory].
@options opts {String} mobilephone Mobile number with the country code to send test SMS. The mobile number defined here should belong to one of your contacts in SendinBlue account and should not be blacklisted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.send_bat_sms = function(opts) {
	var campid = opts['campid'];
	delete opts['campid'];
    return this.get_request("sms/" + campid,JSON.stringify(opts));
};

/*
@param {Object} opts contains json object with key value pair.
@options opts {String} type Type of campaign. Possible values – classic, trigger, sms, template ( case sensitive ) [Optional].
@options opts {String} status Status of campaign. Possible values – draft , sent, archive, queued, suspended, in_process, temp_active, temp_inactive ( case sensitive ) [Optional].
@options opts {Integer} page Maximum number of records per request is 500, if there are more than 500 campaigns then you can use this parameter to get next 500 results [Optional].
@options opts {Integer} page_limit This should be a valid number between 1-500 [Optional].
*/

SendinblueAPI_v1_0.prototype.get_campaigns_v2 = function(opts) {
	return this.get_request("campaign/detailsv2",JSON.stringify(opts));
};

/*
@param {Object} opts contains json object with key value pair.
@options opts {Integer} id Unique Id of the campaign [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_campaign_v2 = function(opts) {
	return this.get_request("campaign/" + opts.id + "/detailsv2","");
};

/*
Create and Schedule your campaigns. It returns the ID of the created campaign.
@param {Object} opts contains json object with key value pair.
@options opts {String} category Tag name of the campaign [Optional].
@options opts {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} name Name of the campaign [Mandatory].
@options opts {String} bat Email address for test mail [Optional].
@options opts {String} html_content Body of the content. The HTML content field must have more than 10 characters [Mandatory: if html_url is empty].
@options opts {String} html_url Url which content is the body of content [Mandatory: if html_content is empty].
@options opts {Array} listid These are the lists to which the campaign has been sent [Mandatory: if scheduled_date is not empty].
@options opts {String} scheduled_date The day on which the campaign is supposed to run[Optional].
@options opts {String} subject Subject of the campaign [Mandatory].
@options opts {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} reply_to The reply to email in the campaign emails [Optional].
@options opts {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opts {Array} exclude_list These are the lists which must be excluded from the campaign [Optional].
@options opts {String} attachment_url Provide the absolute url of the attachment [Optional].
@options opts {Integer} inline_image Status of inline image. Possible values = 0 (default) & 1. inline_image = 0 means image can’t be embedded, & inline_image = 1 means image can be embedded, in the email [Optional]. 
*/

SendinblueAPI_v1_0.prototype.create_campaign = function(opts) {
	return this.post_request("campaign",JSON.stringify(opts));
};

/*
Delete your campaigns.
@param {Object} opts contains json object with key value pair.
@options opts {Integer} id Id of campaign to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_campaign = function(opts) {
	return this.delete_request("campaign/" + opts.id,"");
};

/*
Update your campaigns.
@param {Object} opts contains json object with key value pair.
@options opts {Integer} id Id of campaign to be deleted [Mandatory].
@options opts {String} category Tag name of the campaign [Optional].
@options opts {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} name Name of the campaign [Optional].
@options opts {String} bat Email address for test mail [Optional].
@options opts {String} html_content Body of the content. The HTML content field must have more than 10 characters [Optional].
@options opts {String} html_url Url which content is the body of content [Optional].
@options opts {Array} listid These are the lists to which the campaign has been sent [Mandatory: if scheduled_date is not empty].
@options opts {String} scheduled_date The day on which the campaign is supposed to run[Optional].
@options opts {String} subject Subject of the campaign.
@options opts {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} reply_to The reply to email in the campaign emails [Optional].
@options opts {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opts {Array} exclude_list These are the lists which must be excluded from the campaign [Optional].
@options opts {String} attachment_url Provide the absolute url of the attachment [Optional].
@options opts {Integer} inline_image Status of inline image. Possible values = 0 (default) & 1. inline_image = 0 means image can’t be embedded, & inline_image = 1 means image can be embedded, in the email [Optional].
*/

SendinblueAPI_v1_0.prototype.update_campaign_status = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("campaign/" + id + "/updatecampstatus",JSON.stringify(opts));
};

/*
Send report of Sent and Archived campaign
@param {Object} opts contains json object with key value pair.
@options opts {Integer} id Id of campaign to send its report [Mandatory].
@options opts {String} lang Language of email content. Possible values – fr (default), en, es, it & pt [Optional].
@options opts {String} email_subject Message subject [Mandatory].
@options opts {Array} email_to Email address of the recipient(s). Example: “test@example.net”. You can use commas to separate multiple recipients [Mandatory].
@options opts {String} email_content_type Body of the message in text/HTML version. Possible values – text & html [Mandatory].
@options opts {Array} email_bcc Same as email_to but for Bcc [Optional].
@options opts {Array} email_cc Same as email_to but for Cc [Optional].
@options opts {String} email_body Body of the message [Mandatory].
*/

SendinblueAPI_v1_0.prototype.campaign_report_email = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.post_request("campaign/" + id + "/report",JSON.stringify(opts));
};

/*
Export the recipients of a specified campaign
@param {Object} opts contains json object with key value pair.
@options opts {Integer} id Id of campaign to export its recipients [Mandatory].
@options opts {String} notify_url URL that will be called once the export process is finished [Mandatory].
@options opts {String} type Type of recipients. Possible values – all, non_clicker, non_opener, clicker, opener, soft_bounces, hard_bounces & unsubscribes [Mandatory].
*/

SendinblueAPI_v1_0.prototype.campaign_recipients_export = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.post_request("campaign/" + id + "/recipients",JSON.stringify(opts));
};

/*
Send a Test Compaign.
@param {Object} opts contains json object with key value pair
@options opts {Integer} campid Id of the campaign [Mandatory].
@options opts {Array} emails Email address of recipient(s) existing in the one of the lists & should not be blacklisted. Example: “test@example.net”. You can use commas to separate multiple recipients [Mandatory].
*/

SendinblueAPI_v1_0.prototype.send_bat_email = function(opts) {
	var campid = opts['campid'];
	delete opts['campid'];
    return this.post_request("campaign/" + campid + "/test",JSON.stringify(opts));
};

/*
Create and schedule your Trigger campaigns.
@param {Object} opts contains json object with key value pair
@options opts {String} trigger_name Tag name of the campaign [Optional].
@options opts {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} name Name of the compaign [Mandatory].
@options opts {String} bat Email address for test mail [Optional].
@options opts {String} html_content Body of the content. The HTML content field must have more than 10 characters [Mandatory: if html_url is empty].
@options opts {String} html_url Url which content is the body of content [Mandatory: if html_content is empty].
@options opts {Array} listid These are the lists to which the campaign has been sent [Mandatory: if scheduled_date is not empty].
@options opts {String} scheduled_date The day on which the campaign is supposed to run[Optional].
@options opts {String} subject Subject of the campaign [Mandatory].
@options opts {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} reply_to The reply to email in the campaign emails [Optional].
@options opts {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opts {Array} exclude_list These are the lists which must be excluded from the campaign [Optional].
@options opts {Integer} recurring Type of trigger campaign. Possible values = 0 (default) & 1. recurring = 0 means contact can receive the same Trigger campaign only once, & recurring = 1 means contact can receive the same Trigger campaign several times [Optional].
@options opts {String} attachment_url Provide the absolute url of the attachment [Optional].
@options opts {Integer} inline_image Status of inline image. Possible values = 0 (default) & 1. inline_image = 0 means image can’t be embedded, & inline_image = 1 means image can be embedded, in the email [Optional].
*/

SendinblueAPI_v1_0.prototype.create_trigger_campaign = function(opts) {
    return this.post_request("campaign",JSON.stringify(opts));
};

/*
Update and schedule your Trigger campaigns.
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of Trigger campaign to be modified [Mandatory].
@options opts {String} category Tag name of the campaign [Optional].
@options opts {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} name Name of the compaign [Mandatory].
@options opts {String} bat Email address for test mail [Optional].
@options opts {String} html_content Body of the content. The HTML content field must have more than 10 characters [Mandatory: if html_url is empty].
@options opts {String} html_url Url which content is the body of content [Mandatory: if html_content is empty].
@options opts {Array} listid These are the lists to which the campaign has been sent [Mandatory: if scheduled_date is not empty].
@options opts {String} scheduled_date The day on which the campaign is supposed to run[Optional].
@options opts {String} subject Subject of the campaign [Mandatory].
@options opts {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients, please make sure that the sender details are defined here, and in case of no sender, you can add them also via API & for Shared IP clients, if sender exists].
@options opts {String} reply_to The reply to email in the campaign emails [Optional].
@options opts {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opts {Array} exclude_list These are the lists which must be excluded from the campaign [Optional].
@options opts {Integer} recurring Type of trigger campaign. Possible values = 0 (default) & 1. recurring = 0 means contact can receive the same Trigger campaign only once, & recurring = 1 means contact can receive the same Trigger campaign several times [Optional].
@options opts {String} attachment_url Provide the absolute url of the attachment [Optional].
@options opts {Integer} inline_image Status of inline image. Possible values = 0 (default) & 1. inline_image = 0 means image can’t be embedded, & inline_image = 1 means image can be embedded, in the email [Optional].
*/

SendinblueAPI_v1_0.prototype.update_trigger_campaign = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("campaign/" + id,JSON.stringify(opts));
};

/*
Get the Campaign name, subject and share link of the classic type campaigns only which are sent, for those which are not sent and the rest of campaign types like trigger, template & sms, will return an error message of share link not available.
@param {Object} opts contains json object with key value pair
@options opts {Array} camp_ids Id of campaign to get share link. You can use commas to separate multiple ids [Mandatory].
*/

SendinblueAPI_v1_0.prototype.share_campaign = function(opts) {
    return this.post_request("campaign/sharelinkv2",JSON.stringify(opts));
};

/*
Get all the processes information under the account.
@param {Object} opts contains json object with key value pair
@options opts {Integer} page Maximum number of records per request is 50, if there are more than 50 processes then you can use this parameter to get next 50 results [Mandatory].
@options opts {Integer} page_limit This should be a valid number between 1-50 [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_processes = function(opts) {
	return this.get_request("process",JSON.stringify(opts));
};

/*
Get the process information.
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of process to get details [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_process = function(opts) {
	return this.get_request("process/" + opts.id,"");
};

/*
Get all the list information under the account.
@param {Object} opts contains json object with key value pair
@options opts {Integer} list_parent This is the existing folder id & can be used to get all lists belonging to it [Optional].
@options opts {Integer} page Maximum number of records per request is 50, if there are more than 50 processes then you can use this parameter to get next 50 results [Mandatory].
@options opts {Integer} page_limit This should be a valid number between 1-50 [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_lists = function(opts) {
	return this.get_request("list",JSON.stringify(opts));
};

/*
Get the specific folder information
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of list to get details [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_list = function(opts) {
	return this.get_request("list/" + opts.id,"");
};

/*
Create a new list
@param {Object} opts contains json object with key value pair
@options opts {String} list_name Desired name of the list to be created [Mandatory].
@options opts {Integer} list_parent Folder ID [Mandatory].
*/

SendinblueAPI_v1_0.prototype.create_list = function(opts) {
	return this.post_request("list",JSON.stringify(opts));
};

/*
Delete a list
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of list to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_list = function(opts) {
	return this.delete_request("list/" + opts.id,"");
};

/*
Update a list
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of list to be modified [Mandatory].
@options opts {String} list_name Desired name of the list to be modified [Optional].
@options opts {Integer} list_parent Folder ID [Mandatory].
*/

SendinblueAPI_v1_0.prototype.update_list = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.put_request("list/" + id,JSON.stringify(opts));
};

/*
Display details of all users for the given lists.
@param {Object} opts contains json object with key value pair
@options opts {Array} listids These are the list ids to get their data. The ids found will display records [Mandatory].
@options opts {String} timestamp This is date-time filter to fetch modified user records >= this time. Valid format Y-m-d H:i:s. Example: “2015-05-22 14:30:00″ [Optional].
@options opts {Integer} page Maximum number of records per request is 500, if in your list there are more than 500 users then you can use this parameter to get next 500 results [Optional].
@options opts {Integer} page_limit This should be a valid number between 1-500 [Optional].
*/

SendinblueAPI_v1_0.prototype.display_list_users = function(opts) {
    return this.get_request("list/display",JSON.stringify(opts));
};

/*
Add already existing users in the SendinBlue contacts to the list.
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of list to link users in it [Mandatory].
@options opts {Array} users Email address of the already existing user(s) in the SendinBlue contacts. Example: “test@example.net”. You can use commas to separate multiple users [Mandatory].
*/

SendinblueAPI_v1_0.prototype.add_users_list = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.post_request("list/" + id + "/users",JSON.stringify(opts));
};

/*
Delete already existing users in the SendinBlue contacts from the list.
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of list to unlink users from it [Mandatory].
@options opts {Array} users Email address of the already existing user(s) in the SendinBlue contacts to be modified. Example: “test@example.net”. You can use commas to separate multiple users [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_users_list = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.delete_request("list/" + id + "/delusers",JSON.stringify(opts));
};

/*
Send Transactional Email.
@param {Object} opts contains json object with key value pair
@options opts {Array} to Email address of the recipient(s). It should be sent as an associative array. Example: array(“to@example.net”=>”to whom”). You can use commas to separate multiple recipients [Mandatory].
@options opts {String} subject Message subject [Mandatory].
@options opts {Array} from Email address for From header. It should be sent as an array. Example: array(“from@email.com”,”from email”) [Mandatory].
@options opts {String} html Body of the message. (HTML version) [Mandatory].
@options opts {String} text Body of the message. (text version) [Optional].
@options opts {Array} cc Same as to but for Cc. Example: array(“cc@example.net”,”cc whom”) [Optional].
@options opts {Array} bcc Same as to but for Bcc. Example: array(“bcc@example.net”,”bcc whom”) [Optional].
@options opts {Array} replyto Same as from but for Reply To. Example: array(“from@email.com”,”from email”) [Optional].
@options opts {Array} attachment Provide the absolute url of the attachment/s. Possible extension values = gif, png, bmp, cgm, jpg, jpeg, txt, css, shtml, html, htm, csv, zip, pdf, xml, doc, xls, ppt, tar, and ez. To send attachment/s generated on the fly you have to pass your attachment/s filename & its base64 encoded chunk data as an associative array. Example: array(“YourFileName.Extension”=>”Base64EncodedChunkData”). You can use commas to separate multiple attachments [Optional].
@options opts {Array} headers The headers will be sent along with the mail headers in original email. Example: array(“Content-Type”=>”text/html; charset=iso-8859-1″). You can use commas to separate multiple headers [Optional].
*/

SendinblueAPI_v1_0.prototype.send_email = function(opts) {
	return this.post_request("email",JSON.stringify(opts));
};

/*
To retrieve details of all webhooks
@param {Object} opts contains json object with key value pair
@options opts {String} is_plat Flag to get webhooks. Possible values – 0 & 1. Example: to get Transactional webhooks, use $is_plat=0, to get Marketing webhooks, use $is_plat=1, & to get all webhooks, use $is_plat=”” [Optional].
*/

SendinblueAPI_v1_0.prototype.get_webhooks = function(opts) {
	return this.get_request("webhook",JSON.stringify(opts));
};

/*
To retrieve details of any particular webhook
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of webhook to get details [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_webhook = function(opts) {
	return this.get_request("webhook/" + opts.id,"");
};

/*
Create a Webhook
@param {Object} opts contains json object with key value pair
@options opts {String} url URL that will be triggered by a webhook [Mandatory].
@options opts {String} description Webook description [Optional].
@options opts {Array} events Set of events. You can use commas to separate multiple events. Possible values for Transcational webhook – request, delivered, hard_bounce, soft_bounce, blocked, spam, invalid_email, deferred, click, & opened and Possible Values for Marketing webhook – spam, opened, click, hard_bounce, unsubscribe, soft_bounce [Mandatory].
@options opts {Integer} is_plat Flag to create webhook type. Possible values – 0 (default) & 1. Example: to create Transactional webhooks, use $is_plat=0, & to create Marketing webhooks, use $is_plat=1 [Optional].
*/

SendinblueAPI_v1_0.prototype.create_webhook = function(opts) {
	return this.post_request("webhook",JSON.stringify(opts));
};

/*
Delete a webhook
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of webhook to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_webhook = function(opts) {
	return this.delete_request("webhook/" + opts.id,"");
};

/*
Update a webhook
@param {Object} opts contains json object with key value pair
@options opts {Integer} id Id of webhook to be modified [Mandatory].
@options opts {String} url URL that will be triggered by a webhook [Mandatory].
@options opts {String} description Webook description [Optional].
@options opts {Array} events Set of events. You can use commas to separate multiple events. Possible values for Transcational webhook – request, delivered, hard_bounce, soft_bounce, blocked, spam, invalid_email, deferred, click, & opened and Possible Values for Marketing webhook – spam, opened, click, hard_bounce, unsubscribe, soft_bounce [Mandatory].
*/

SendinblueAPI_v1_0.prototype.update_webhook = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.put_request("webhook/" + id,JSON.stringify(opts));
};

/*
Aggregate / date-wise report of the SendinBlue SMTP account.
@param {Object} opts contains json object with key value pair
@options opts {Integer} aggregate This is used to indicate, you are interested in all-time totals. Possible values – 0 & 1. aggregate = 0 means it will not aggregate records, and will show stats per day/date wise [Optional].
@options opts {String} start_date The start date to look up statistics. Date must be in YYYY-MM-DD format and should be before the end_date [Optional].
@options opts {String} end_date The end date to look up statistics. Date must be in YYYY-MM-DD format and should be after the start_date [Optional].
@options opts {String} days Number of days in the past to include statistics ( Includes today ). It must be an integer greater than 0 [Optional].
@options opts {String} tag The tag you will specify to retrieve detailed stats. It must be an existing tag that has statistics [Optional].
*/

SendinblueAPI_v1_0.prototype.get_statistics = function(opts) {
	return this.post_request("statistics",JSON.stringify(opts));
};


/*
Get Access the specific user Information
@param {Object} opts contains json object with key value pair
@options opts {String} id Email address of the already existing user in the SendinBlue contacts [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_user = function(opts) {
	return this.get_request("user/" + opts.id, "");
};

/*
Create a new user
@param {Object} opts contains json object with key value pair
@options opts {String} email Email address of the  user [Mandatory].
@options opts {Array} attributes The name of attribute present in your SendinBlue account. It should be sent as an associative array. Example: array(“NAME”=>”name”). You can use commas to separate multiple attributes [Optional].
@options opts {Integer} blacklisted This is used to blacklist/ Unblacklist a user. Possible values – 0 & 1. blacklisted = 1 means user has been blacklisted [Optional].
@options opts {Array} listid The list id(s) to be linked from user [Optional].
@options opts {Array} listid_unlink The list id(s) to be unlinked from user [Optional].
@options opts {Array} blacklisted_sms This is used to blacklist/ Unblacklist a user’s SMS number. Possible values – 0 & 1. blacklisted_sms = 1 means user’s SMS number has been blacklisted [Optional].
*/

SendinblueAPI_v1_0.prototype.create_user = function(opts) {
	return this.post_request("user",JSON.stringify(opts));
};

/*
Delete already existing users in the SendinBlue contacts.
@param {Object} opts contains json object with key value pair
@options opts {String} email - email id of the user
*/


SendinblueAPI_v1_0.prototype.delete_user = function(opts) {	
	return this.delete_request("user/" + opts.email,"");
};

/*
Update a user
@param {Object} opts contains json object with key value pair
@options opts {String} email Email address of the already existing user in the SendinBlue contacts [Mandatory].
@options opts {Array} attributes The name of attribute present in your SendinBlue account. It should be sent as an associative array. Example: array(“NAME”=>”name”). You can use commas to separate multiple attributes [Optional].
@options opts {Integer} blacklisted This is used to blacklist/ Unblacklist a user. Possible values – 0 & 1. blacklisted = 1 means user has been blacklisted [Optional].
@options opts {Array} listid The list id(s) to be linked from user [Optional].
@options opts {Array} listid_unlink The list id(s) to be unlinked from user [Optional].
@options opts {Array} blacklisted_sms This is used to blacklist/ Unblacklist a user’s SMS number. Possible values – 0 & 1. blacklisted_sms = 1 means user’s SMS number has been blacklisted [Optional].
*/

SendinblueAPI_v1_0.prototype.update_user = function(opts) {
	var id = opts['email'];
	delete opts['email'];
	return this.put_request("user/" + id,JSON.stringify(opts));
};

/*
Import User Information
@param {Object} opts contains json object with key value pair
@options opts {String} url The URL of the file to be imported. Possible file types – .txt, .csv, .xls & .xlsx [Mandatory].
@options opts {Array} listids These are the list ids in which the the users will be imported [Mandatory: if name is empty].
@options opts {String} notify_url URL that will be called once the import process is finished [Optional]. In notify_url, we are sending the content using POST method
@options opts {String} name This is new list name which will be created first & then users will be imported in it [Mandatory: if listids is empty].
@options opts {String} list_parent This is the existing folder id & can be used with name parameter to make newly created list’s desired parent [Optional].
*/

SendinblueAPI_v1_0.prototype.import_users = function(opts) {
	return this.post_request("user/import",JSON.stringify(opts));
};

/*
Export Users Information
@param {Object} opts contains json object with key value pair
@options opts {String} export_attrib The name of attribute present in your SendinBlue account. You can use commas to separate multiple attributes. Example: “EMAIL,NAME,SMS” [Optional].
@options opts {String} filter Filter can be added to export users. Example: “{\”blacklisted\”:1}”, will export all blacklisted users [Mandatory].
@options opts {String} notify_url URL that will be called once the export process is finished [Optional].
*/

SendinblueAPI_v1_0.prototype.export_users = function(opts) {
	return this.post_request("user/export",JSON.stringify(opts));
};

/*
Create a new user if an email provided as input, doesn’t exists in the contact list of your SendinBlue account, otherwise it will update the existing user.
@param {Object} opts contains json object with key value pair
@options opts {String} email Email address of the user to be created in SendinBlue contacts. Already existing email address of user in the SendinBlue contacts to be modified [Mandatory].
@options opts {Array} attributes The name of attribute present in your SendinBlue account. It should be sent as an associative array. Example: array(“NAME”=>”name”). You can use commas to separate multiple attributes [Optional].
@options opts {Integer} blacklisted This is used to blacklist/ Unblacklist a user. Possible values – 0 & 1. blacklisted = 1 means user has been blacklisted [Optional].
@options opts {Array} listid The list id(s) to be linked from user [Optional].
@options opts {Array} listid_unlink The list id(s) to be unlinked from user [Optional].
@options opts {Array} blacklisted_sms This is used to blacklist/ Unblacklist a user’s SMS number. Possible values – 0 & 1. blacklisted_sms = 1 means user’s SMS number has been blacklisted [Optional].
*/

SendinblueAPI_v1_0.prototype.create_update_user = function(opts) {
      return this.post_request("user/createdituser",JSON.stringify(opts));
};

/*
Access all the attributes information under the account.
*/

SendinblueAPI_v1_0.prototype.get_attributes = function() {
	return this.get_request("attribute","");
};

/*
Access the specific type of attribute information.
@param {Object} opts contains json object with key value pair
@options opt {String} id Type of attribute. Possible values – normal, transactional, category, calculated & global.
*/

SendinblueAPI_v1_0.prototype.get_attribute = function(opts) {
	return this.get_request("attribute/" + opts.id,"");
};

/*
Create an Attribute
@param {Object} opts contains json object with key value pair
@options opt {String} type Type of attribute. Possible values – normal, transactional, category, calculated & global.
@options opt {Array} data The name and data type of ‘normal’ & ‘transactional’ attribute to be created in your SendinBlue account. It should be sent as an associative array.
*/

SendinblueAPI_v1_0.prototype.create_attribute = function(opts) {
	return this.post_request("attribute",JSON.stringify(opts));
};

/*
Delete a specific type of attribute information.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of attribute to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_attribute = function(opts) {
	var type = opts['type'];
	delete opts['type'];
	return this.post_request("attribute/" + type,JSON.stringify(opts));
};

/*
Get Email Event report
@param {Object} opts contains json object with key value pair
@options opt {Integer} limit To limit the number of results returned. It should be an integer [Optional].
@options opt {String} start_date The start date to get report from. Date must be in YYYY-MM-DD format and should be before the end_date [Optional].
@options opt {String} end_date The end date to get report till date. Date must be in YYYY-MM-DD format and should be after the start_date [Optional].
@options opt {Integer} offset Beginning point in the list to retrieve from. It should be an integer [Optional].
@options opt {String} date Specific date to get its report. Date must be in YYYY-MM-DD format and should be earlier than todays date [Optional].
@options opt {Integer} days Number of days in the past (includes today). If specified, must be an integer greater than 0 [Optional].
@options opt {String} email Email address to search report for [Optional].
*/

SendinblueAPI_v1_0.prototype.get_report = function(opts) {
	return this.post_request("report",JSON.stringify(opts));
};

/*
Get Folders information as well as manage it.
@param {Object} opts contains json object with key value pair
@options opt {Integer} page Maximum number of records per request is 50, if there are more than 50 folders then you can use this parameter to get next 50 results [Mandatory].
@options opt {Integer} page_limit This should be a valid number between 1-50 [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_folders = function(opts) {
	return this.get_request("folder",JSON.stringify(opts));
};

/*
Get access the specific folder information.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of folder to get details [Mandatory].
*/

SendinblueAPI_v1_0.prototype.get_folder = function(opts) {
	return this.get_request("folder/" + opts.id,"");
};

/*
Create a new folder.
@param {Object} opts contains json object with key value pair
@options opt {String} name Desired name of the folder to be created [Mandatory].
*/

SendinblueAPI_v1_0.prototype.create_folder = function(opts) {
	return this.post_request("folder",JSON.stringify(opts));
};

/*
Delete a specific folder information.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of folder to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_folder = function(opts) {
	return this.delete_request("folder/" + opts.id,"");
};

/*
Update an existing folder.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of folder to be modified [Mandatory].
@options opt {String} name Desired name of the folder to be modified [Mandatory].
*/

SendinblueAPI_v1_0.prototype.update_folder = function(opts) {
	var id = opts['id'];
	delete opts['id'];
	return this.put_request("folder/" + id,JSON.stringify(opts));
};

/*
Delete any hardbounce, which actually would have been blocked due to some temporary ISP failures
@param {Object} opts contains json object with key value pair
@options opt {String} start_date The start date to get report from. Date must be in YYYY-MM-DD format and should be before the end_date [Optional].
@options opt {String} end_date The end date to get report till date. Date must be in YYYY-MM-DD format and should be after the start_date [Optional].
@options opt {String} email Email address to delete its bounces [Optional].
*/

SendinblueAPI_v1_0.prototype.delete_bounces = function(opts) {
	return this.post_request("bounces",JSON.stringify(opts));
};

/*
Send templates created on SendinBlue, through SendinBlue SMTP (transactional mails).
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of the template created on SendinBlue account [Mandatory].
@options opt {String} to Email address of the recipient(s). You can use pipe ( | ) to separate multiple recipients.
@options opt {String} cc Same as to but for Cc [Optional].
@options opt {String} bcc Same as to but for Bcc [Optional].
@options opt {Array} attr The name of attribute present in your SendinBlue account. It should be sent as an associative array. Example: array(“NAME”=>”name”). You can use commas to separate multiple attributes [Optional].
@options opt {String} attachment_url Provide the absolute url of the attachment. Url not allowed from local machine. File must be hosted somewhere [Optional].
@options opt {Array} attachment To send attachment/s generated on the fly you have to pass your attachment/s filename & its base64 encoded chunk data as an associative array [Optional].
*/

SendinblueAPI_v1_0.prototype.send_transactional_template = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("template/" + id,JSON.stringify(opts));
};

/*
Create a Template.
@param {Object} opts contains json object with key value pair
@options opt {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients & for Shared IP clients, if sender exists].
@options opt {String} template_name Name of the Template [Mandatory].
@options opt {String} bat Email address for test mail [Optional].
@options opt {String} html_content Body of the content. The HTML content field must have more than 10 characters [Mandatory: if html_url is empty].
@options opt {String} html_url Url which content is the body of content [Mandatory: if html_content is empty].
@options opt {String} subject Subject of the campaign [Mandatory].
@options opt {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients & for Shared IP clients, if sender exists].
@options opt {String} reply_to The reply to email in the campaign emails [Optional].
@options opt {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opt {Integer} status Status of template. Possible values = 0 (default) & 1. status = 0 means template is inactive, & status = 1 means template is active [Optional].
@options opt {Integer} attachment Status of attachment. Possible values = 0 (default) & 1. attach = 0 means an attachment can’t be sent, & attach = 1 means an attachment can be sent, in the email [Optional].
*/

SendinblueAPI_v1_0.prototype.create_template = function(opts) {
    return this.post_request("template",JSON.stringify(opts));
};

/*
Create a Template.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of Template to be modified [Mandatory].
@options opt {String} from_name Sender name from which the campaign emails are sent [Mandatory: for Dedicated IP clients & for Shared IP clients, if sender exists].
@options opt {String} template_name Name of the Template [Mandatory].
@options opt {String} bat Email address for test mail [Optional].
@options opt {String} html_content Body of the content. The HTML content field must have more than 10 characters [Mandatory: if html_url is empty].
@options opt {String} html_url Url which content is the body of content [Mandatory: if html_content is empty].
@options opt {String} subject Subject of the campaign [Mandatory].
@options opt {String} from_email Sender email from which the campaign emails are sent [Mandatory: for Dedicated IP clients & for Shared IP clients, if sender exists].
@options opt {String} reply_to The reply to email in the campaign emails [Optional].
@options opt {String} to_feild This is to personalize the «To» Field. If you want to include the first name and last name of your recipient, add [PRENOM] [NOM]. To use the contact attributes here, these should already exist in SendinBlue account [Optional].
@options opt {Integer} status Status of template. Possible values = 0 (default) & 1. status = 0 means template is inactive, & status = 1 means template is active [Optional].
@options opt {Integer} attachment Status of attachment. Possible values = 0 (default) & 1. attach = 0 means an attachment can’t be sent, & attach = 1 means an attachment can be sent, in the email [Optional].
*/


SendinblueAPI_v1_0.prototype.update_template = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("template/" + id,JSON.stringify(opts));
};

/*
Get Access your created senders information.
@param {Object} opts contains json object with key value pair
@options opt {String} option Options to get senders. Possible options – IP-wise, & Domain-wise ( only for dedicated IP clients ). Example: to get senders with specific IP, use $option=’1.2.3.4′, to get senders with specific domain use, $option=’domain.com’, & to get all senders, use $option=” [Optional].
*/

SendinblueAPI_v1_0.prototype.get_senders = function(opts) {
    return this.get_request("advanced",JSON.stringify(opts));
};

/*
Create your Senders.
@param {Object} opts contains json object with key value pair
@options opt {String} name Name of the sender [Mandatory].
@options opt {String} email Email address of the sender [Mandatory].
@options opt {Array} ip_domain Pass pipe ( | ) separated Dedicated IP and its associated Domain. Example: “1.2.3.4|mydomain.com”. You can use commas to separate multiple ip_domain’s [Mandatory: Only for Dedicated IP clients, for Shared IP clients, it should be kept blank].
*/

SendinblueAPI_v1_0.prototype.create_sender = function(opts) {
    return this.post_request("advanced",JSON.stringify(opts));
};

/*
Update your Senders.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of sender to be modified [Mandatory].
@options opt {String} name Name of the sender [Mandatory].
@options opt {String} email Email address of the sender [Mandatory].
@options opt {Array} ip_domain Pass pipe ( | ) separated Dedicated IP and its associated Domain. Example: “1.2.3.4|mydomain.com”. You can use commas to separate multiple ip_domain’s [Mandatory: Only for Dedicated IP clients, for Shared IP clients, it should be kept blank].
*/

SendinblueAPI_v1_0.prototype.update_sender = function(opts) {
	var id = opts['id'];
	delete opts['id'];
    return this.put_request("advanced/" + id,JSON.stringify(opts));
};

/*
Delete your Sender Information.
@param {Object} opts contains json object with key value pair
@options opt {Integer} id Id of sender to be deleted [Mandatory].
*/

SendinblueAPI_v1_0.prototype.delete_sender = function(opts) {
    return this.delete_request("advanced/" + opts.id,"");
};