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
		return new Promise(function(resolve, reject){
			// Name cannot be blank.
			if  (name.trim().length == 0) {
				resolve(validityResponse(false, -1, 'Name cannot be blank.'));
			}
			resolve(validityResponse(true, 0, ''));
		});
	}

	Fsjs.FormValidation.validateEmailAddress = function(emailAddress, emailBlacklistChecker){
		return new Promise(function(resolve, reject){
			// Email Address cannot be blank and must be the correct format.
			if (emailAddress.length == 0){
				resolve(validityResponse(false, -1, 'Email Address cannot be blank.'));
			}
			if (!validateEmail(emailAddress)) {
				resolve(validityResponse(false, -1, 'This is not a valid Email Address.'));
			}
			resolve(validityResponse(true, 0, ''));
		}).then(function(validity){
			if (validity.isValid && typeof emailBlacklistChecker !== 'undefined'){
				if (!(emailBlacklistChecker instanceof Fsjs.FormValidation.EmailBlacklistChecker)) {
					reject('emailBlacklistChecker is not an instance of EmailBlacklistChecker');
				}
				return emailBlacklistChecker.validateEmail(emailAddress);
			}
			return validity;
		}).then(function(validity){
			if (typeof validity == 'boolean'){
				return (validity == true)
					? validityResponse(true, 0, '')
					: validityResponse(false, -1, 'This Email Address is blacklisted.');
			};
			return validity;
		});
	}

	Fsjs.FormValidation.validateAge = function(age){
		return new Promise(function(resolve, reject){
			// Age must be a number between 13 and 150.
			var ageIntegerValue = parseInt(age, 10);
			if (isNaN(ageIntegerValue) ||
				ageIntegerValue < 13 ||
				ageIntegerValue > 150) {
				resolve(validityResponse(false, -1, 'Age must be a number between 13 and 150.'));
			}
			resolve(validityResponse(true, 0, ''));
		});
	}

	exports.Fsjs = Fsjs;
})(typeof exports === 'undefined' ? this['form-validator'] = {} : exports)