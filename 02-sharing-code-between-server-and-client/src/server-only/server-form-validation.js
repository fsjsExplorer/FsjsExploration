Fsjs = require('../common/form-validator').Fsjs || {};
Fsjs.DataServices = require('./data-services').Fsjs.DataServices || {};
Fsjs.FormValidation = Fsjs.FormValidation || {};

var ServerEmailBlacklistChecker = function(){
    this.validateEmail = function(emailAddress){
        return Fsjs.DataServices.getEmailBlacklist().indexOf(emailAddress) == -1;
    }
}
ServerEmailBlacklistChecker.prototype = Object.create(Fsjs.FormValidation.EmailBlacklistChecker.prototype);

Fsjs.FormValidation.validateForm = function(body, responseObject){
    var valid = true,
        nameValidity,
        emailAddressValidity,
        ageValidity;

    // Name cannot be blank.
    nameValidity = Fsjs.FormValidation.validateName(body.nameField);
    if (!nameValidity.isValid) {
        responseObject.nameFieldFeedbackText = nameValidity.errorMessage;
        responseObject.nameFieldFeedbackVisibility = '';
        valid = false;
    } else {
        responseObject.nameFieldFeedbackVisibility = 'visibility: hidden;';
    }

    // Email Address cannot be blank and must be the correct format.
    emailAddressValidity = Fsjs.FormValidation.validateEmailAddress(body.emailAddressField, new ServerEmailBlacklistChecker());
    if (!emailAddressValidity.isValid) {
        responseObject.emailAddressFieldFeedbackText = emailAddressValidity.errorMessage;
        responseObject.emailAddressFieldFeedbackVisibility = '';
        valid = false;
    } else {
        responseObject.emailAddressFieldFeedbackVisibility = 'visibility: hidden;';
    }

    // Age must be a number between 13 and 150.
    ageValidity = Fsjs.FormValidation.validateAge(body.ageField);
    if (!ageValidity.isValid) {
        responseObject.ageFieldFeedbackText = ageValidity.errorMessage;
        responseObject.ageFieldFeedbackVisibility = '';
        valid = false;
    } else {
        responseObject.ageFieldFeedbackVisibility = 'visibility: hidden;';
    }

    return valid;
};

exports.Fsjs = Fsjs;
