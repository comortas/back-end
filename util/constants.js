
//App Constants
module.exports = {
    Role: {
        Patient: "patient",
        Provider: "provider",
        Admin: "admin",
        MedicalAssistant: "medicalAssistant",
        SuperAdmin : "superAdmin",
        Executive : "executive",
        Director : "director",
        System : "system"
    },
    Appointment: {
        ParticipantType: {
            Patient: 'patient',
            Provider: 'provider',
            MedicalAssistant: 'medicalAssistant'
        }
    },
    ApplicationSettings:{
        PayoutInterval : 'payout_interval',
        PayoutDelayDays : 'payout_delay_days',
        PayoutAnchor : 'payout_anchor',
        ConvenienceFee : 'convenience_fee',
        CoPayFormula : 'co_pay_formula',
        SelfPayFormula : 'self_pay_formula'
    }, 
    MDToken : { 
        Name : 'MD_Telehealth_Token',
        Expiration : 86400 // 24 hours
    },
    HTTP_STATUS_CODE: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        INTERNAL_SERVER_ERROR: 500
    }
};