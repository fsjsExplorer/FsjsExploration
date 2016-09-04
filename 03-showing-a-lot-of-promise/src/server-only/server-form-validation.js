Fsjs = require('../common/form-validator').Fsjs || {};
Fsjs.DataServices = require('./data-services').Fsjs.DataServices || {};
Fsjs.FormValidation = Fsjs.FormValidation || {};

var ServerEmailBlacklistChecker = function(){
    this.validateEmail = function(emailAddress){
        return new Promise(function(resolve, reject){
            resolve(Fsjs.DataServices.getEmailBlacklist().indexOf(emailAddress) == -1);
        });
    }
}
ServerEmailBlacklistChecker.prototype = Object.create(Fsjs.FormValidation.EmailBlacklistChecker.prototype);

Fsjs.FormValidation.validateForm = function(body, responseObject){
    var valid = true;

    return Fsjs.FormValidation.validateName(body.nameField)
        .then(function(nameValidity){
            if (!nameValidity.isValid) {
                responseObject.nameFieldFeedbackText = nameValidity.errorMessage;
                responseObject.nameFieldFeedbackVisibility = '';
                valid = false;
            } else {
                responseObject.nameFieldFeedbackVisibility = 'visibility: hidden;';
            }
            return Fsjs.FormValidation.validateEmailAddress(body.emailAddressField, new ServerEmailBlacklistChecker());
        }).then(function(emailAddressValidity){
            if (!emailAddressValidity.isValid) {
                responseObject.emailAddressFieldFeedbackText = emailAddressValidity.errorMessage;
                responseObject.emailAddressFieldFeedbackVisibility = '';
                valid = false;
            } else {
                responseObject.emailAddressFieldVisibility = 'visibility: hidden;';
            }
            return Fsjs.FormValidation.validateAge(body.ageField);
        }).then(function(ageValidity){
            if (!ageValidity.isValid) {
                responseObject.ageFieldFeedbackText = ageValidity.errorMessage;
                responseObject.ageFieldFeedbackVisibility = '';
                valid = false;
            } else {
                responseObject.ageFieldFeedbackVisibility = 'visibility: hidden;';
            }
            return valid;
        });
};

exports.Fsjs = Fsjs;