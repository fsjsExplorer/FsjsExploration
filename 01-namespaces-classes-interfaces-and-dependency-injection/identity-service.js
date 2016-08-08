var Fsjs = require('./identity-repository').Fsjs;
Fsjs.Services = Fsjs.Services || {};

Fsjs.Services.IdentityService = function(repository){

	if (!(repository instanceof Fsjs.Repositories.IdentityRepository)){
		throw 'Injected repository is not the correct type.';
	}

	this.listNames = function(){
		return repository.listNames();
	}
}

exports.Fsjs = Fsjs;
