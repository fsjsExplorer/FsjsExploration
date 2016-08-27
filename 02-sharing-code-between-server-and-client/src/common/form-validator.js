(function(exports){

	Fsjs = exports.Fsjs || {};
    Fsjs.FormValidation = Fsjs.FormValidation || {};

	Fsjs.FormValidation.EmailBlacklistChecker = function(){}
	Fsjs.FormValidation.EmailBlacklistChecker.prototype.validateEmail = function(emailAddress) { throw 'validateEmail not implemented'; }

	var validateEmail = function(email) {
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(email);
	}

	var validityResponse = function(valid, errCode, errMessage){
		if (valid)
		{
			return { isValid: true, errorCode: 0, errorMessage: '' };
		}
		return { isValid: valid, errorCode: errCode, errorMessage: errMessage };
	}

	Fsjs.FormValidation.validateName = function(name){
		// Name cannot be blank.
		if  (name.trim().length == 0) {
			return validityResponse(false, -1, 'Name cannot be blank.' );
		}
		return validityResponse(true);
	}

	Fsjs.FormValidation.validateEmailAddress = function(emailAddress, emailBlacklistChecker){
		// Email Address cannot be blank and must be the correct format.
		if (emailAddress.length == 0){
			return validityResponse(false, -1, 'Email Address cannot be blank.' );
		}
		if (!validateEmail(emailAddress)) {
			return validityResponse(false, -1, 'This is not a valid Email Address.' );
		}
		if (typeof emailBlacklistChecker !== 'undefined') {
			if (!(emailBlacklistChecker instanceof Fsjs.FormValidation.EmailBlacklistChecker)) {
				throw 'emailBlacklistChecker is not an instance of EmailBlacklistChecker';
			}
			if (!emailBlacklistChecker.validateEmail(emailAddress)){
				return validityResponse(false, -1, 'This Email Address is blacklisted.' );
			}
		}
		return validityResponse(true);
	}

	Fsjs.FormValidation.validateAge = function(age){
		// Age must be a number between 13 and 150.
		var ageIntegerValue = parseInt(age, 10);
		if (isNaN(ageIntegerValue) ||
			ageIntegerValue < 13 ||
			ageIntegerValue > 150) {
			return validityResponse(false, -1, 'Age must be a number between 13 and 150.' );
		}
		return validityResponse(true);
	}

	exports.Fsjs = Fsjs;
})(typeof exports === 'undefined' ? this['form-validator'] = {} : exports)