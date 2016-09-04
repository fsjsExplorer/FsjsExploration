Fsjs = exports.Fsjs || {};
Fsjs.DataServices = Fsjs.DataServices || {};

Fsjs.DataServices.defaultPageData = function(name, emailAddress, age){
    return {name: name,
            emailAddress: emailAddress,
            age: age,
            nameFieldFeedbackVisibility: 'visibility: hidden;',
            nameFieldFeedbackText: '',
            emailAddressFieldFeedbackVisibility: 'visibility: hidden;',
            emailAddressFieldFeedbackText: '',
            ageFieldFeedbackVisibility: 'visibility: hidden;',
            ageFieldFeedbackText: ''
    };
}

Fsjs.DataServices.getEmailBlacklist = function(){
    return ['root@localhost.org'];
};

exports.Fsjs = Fsjs;