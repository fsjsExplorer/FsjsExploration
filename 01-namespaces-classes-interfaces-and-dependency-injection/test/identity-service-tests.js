var chai = require('chai');
var assert = chai.assert;

var Fsjs = require('../identity-service').Fsjs;

describe('IdentityService', function() {
	it('returns public names if given a PublicIdentityRepository', function(){
		var publicIdentityRepository = new Fsjs.Repositories.PublicIdentityRepository();
		var identityService = new Fsjs.Services.IdentityService(publicIdentityRepository);
		assert.equal(identityService.listNames()[3], 'The Crow', 'Incorrect fourth name returned.')
	});

	it('returns secret names if given a SecretIdentityRepository', function(){
		var secretIdentityRepository = new Fsjs.Repositories.SecretIdentityRepository();
		var identityService = new Fsjs.Services.IdentityService(secretIdentityRepository);
		assert.equal(identityService.listNames()[3], 'Eric Draven', 'Incorrect fourth name returned.')
	});

	it('throws an exception if not given an IdentityRepository', function(){
		var objectThatIsNotAnIdentityRepository = {};
		chai.expect(function() { 
			new Fsjs.Services.IdentityService(objectThatIsNotAnIdentityRepository) 
		}).to.throw('Injected repository is not the correct type.');
	});

	it('returns data from listNames exactly as provided by the repository', function(){
		var expectedNames = ['Full-stack', 'JavaScript'];

		TestIdentityRepository = function(){
			var names = expectedNames;
			this.listNames = function() { return names; }
		}
		TestIdentityRepository.prototype = Object.create(Fsjs.Repositories.IdentityRepository.prototype);

		var dummyRepository = new TestIdentityRepository();
		var returnedNames = new Fsjs.Services.IdentityService(dummyRepository).listNames();

		assert.equal(returnedNames, expectedNames, 'Incorrect names list returned');
	});
});
