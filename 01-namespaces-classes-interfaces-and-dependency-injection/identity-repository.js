Fsjs = exports.Fsjs || {};
Fsjs.Repositories = Fsjs.Repositories || {};

Fsjs.Repositories.IdentityRepository = function(){}
Fsjs.Repositories.IdentityRepository.prototype.listNames = function() { throw 'listNames not implemented'; }

Fsjs.Repositories.SecretIdentityRepository = function(){
	var names = ['Mindy McCready', 
				  'Oswald Chesterfield Cobblepot',
				  'Steve Rogers',
				  'Eric Draven',
				  'Bruce Wayne'];

	this.listNames = function() { return names; }
}
Fsjs.Repositories.SecretIdentityRepository.prototype = Object.create(Fsjs.Repositories.IdentityRepository.prototype);

Fsjs.Repositories.PublicIdentityRepository = function(){
	var names = ['Hit-Girl', 
				  'The Penguin',
				  'Captain America',
				  'The Crow',
				  'Batman'];
	
	this.listNames = function() { return names; }
}
Fsjs.Repositories.PublicIdentityRepository.prototype = Object.create(Fsjs.Repositories.IdentityRepository.prototype);

exports.Fsjs = Fsjs;
