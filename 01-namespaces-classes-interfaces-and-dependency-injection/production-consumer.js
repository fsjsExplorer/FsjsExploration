var Fsjs = require('./identity-service').Fsjs;

var ProductionConsumer = function(){
	var Dump = function(names){
		for (var i = 0; i < names.length; i++) {
		    console.log(' ' + names[i]);
		}
	}

	this.consumeIt = function() {
		console.log('Public Identities:');
		var s = new Fsjs.Services.IdentityService(new Fsjs.Repositories.PublicIdentityRepository());
		Dump(s.listNames());

		console.log();

		console.log('Secret Identities:');
		s = new Fsjs.Services.IdentityService(new Fsjs.Repositories.SecretIdentityRepository());
		Dump(s.listNames());
	}
}

new ProductionConsumer().consumeIt();
