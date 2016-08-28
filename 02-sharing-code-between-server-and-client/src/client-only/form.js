Fsjs = this['form-validator'].Fsjs || {};

var ClientEmailBlacklistChecker = function(){
    this.validateEmail = function(emailAddress){
        var call = $.ajax({
            url: "/form/emailAddressIsBlacklisted",
            data: {
                "emailAddress": emailAddress
            },
            cache: false,
            async: false,
            type: "GET",
            dataType: "json"
        });
        return !$.parseJSON(call.responseText);
    }
}
ClientEmailBlacklistChecker.prototype = Object.create(Fsjs.FormValidation.EmailBlacklistChecker.prototype);

function showError(name, message){
    $(name)
        .text(message)
        .css("visibility", "");
}

function hideError(name){
    $(name).css("visibility", "hidden");
}

var validateForm = function(){
    var valid = true;

    // Name cannot be blank.
    var nameValidity = Fsjs.FormValidation.validateName($('#nameField').val());
    if (!nameValidity.isValid) {
        showError('#nameFieldFeedback', nameValidity.errorMessage);
        valid = false;
    } else {
        hideError('#nameFieldFeedback');
    }

    // Email Address cannot be blank and must be the correct format.
    var emailAddressValidity = Fsjs.FormValidation.validateEmailAddress($('#emailAddressField').val(), new ClientEmailBlacklistChecker());
    if (!emailAddressValidity.isValid) {
        showError('#emailAddressFieldFeedback', emailAddressValidity.errorMessage);
        valid = false;
    } else {
        hideError('#emailAddressFieldFeedback');
    }

    // Age must be a number between 13 and 150.
    var ageValidity = Fsjs.FormValidation.validateAge($('#ageField').val());
    if (!ageValidity.isValid) {
        showError('#ageFieldFeedback', ageValidity.errorMessage);
        valid = false;
    } else {
        hideError('#ageFieldFeedback');
    }

    return valid;
};