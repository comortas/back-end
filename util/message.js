
//App Constants
module.exports = {
    ErrorMessage: {
        EmailAndPhoneNotExist: "Unable to process request when email and phone is empty",
        FutureAppointmentOnlyAllowed: "You can only create future appointments",
        FirstNameLastNameEmpty : "Unable to process request when first name and last name is empty",
        DateTimeEmpty: "Unable to process request when date and time is empty",
        InvalidURL: "Invalid URL",
        MissingInput: "Missing Input"
    },
    SuccessMessage: {
        CannedMessageCreatedSuccessfully : "Canned message created successfully",
        CannedMessageUpdatedSuccessfully : "Canned message updated successfully",
        CannedMessageDeletedSuccessfully : "Canned message deleted successfully",
        ConsentCreatedSuccessfully : "Consent created successfully",
        ConsentUpdatedSuccessfully : "Consent updated successfully",
        ConsentAcknowledgementCreatedSuccessfully : "Acknowledgement saved",
        ConsentAcknowledgementAlreadyAcknowledged : "Already Acknowledged",
        NoConsentAcknowledgement : "No Consent for this organization",
        EmailTemplateUpdatedSuccessfully : "Email template updated successfully",
        SmsTemplateUpdatedSuccessfully: "SMS template updated successfully"
    }
}