Fsjs = this['form-validator'].Fsjs || {};

var ClientEmailBlacklistChecker = function(){
    this.validateEmail = function(emailAddress){
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: "/form/emailAddressIsBlacklisted",
                data: {
                    "emailAddress": emailAddress
                },
                cache: false,
                type: "GET",
                success: function(data){
                    resolve(!$.parseJSON(data));
                },
                error: function(xhr, ajaxOptions, thrownError){
                    reject();
                },
                dataType: "json"
            });
        });
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
    return Fsjs.FormValidation.validateName($('#nameField').val())
        .then(function(nameValidity){
            if (!nameValidity.isValid) {
                showError('#nameFieldFeedback', nameValidity.errorMessage);
                valid = false;
            } else {
                hideError('#nameFieldFeedback');
            }
            return Fsjs.FormValidation.validateEmailAddress($('#emailAddressField').val(), new ClientEmailBlacklistChecker());
        }).then(function(emailAddressValidity){
            if (!emailAddressValidity.isValid) {
                showError('#emailAddressFieldFeedback', emailAddressValidity.errorMessage);
                valid = false;
            } else {
                hideError('#emailAddressFieldFeedback');
            }
            return Fsjs.FormValidation.validateAge($('#ageField').val());
        }).then(function(ageValidity){
            if (!ageValidity.isValid) {
                showError('#ageFieldFeedback', ageValidity.errorMessage);
                valid = false;
            } else {
                hideError('#ageFieldFeedback');
            }
            return valid;
        });
};