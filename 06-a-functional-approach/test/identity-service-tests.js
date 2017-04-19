var test = require('tape')

var classFactory = require('../class-factory')
var services = require('../identity-service')

test('IdentityService', function(assert) {
	var identityService = classFactory.buildPublicIdentityService()
	assert.equal(identityService.listNames()[3], 'The Crow', 'returns public names if given a publicIdentityRepository')
	
	identityService = classFactory.buildSecretIdentityService()
	assert.equal(identityService.listNames()[3], 'Eric Draven', 'returns secret names if given a secretIdentityRepository')

	const expectedNames = ['Full-stack', 'JavaScript']
	const testIdentityRepository = {
		names: expectedNames,
		listNames: () => testIdentityRepository.names
	}
	identityService = new services.identityService(testIdentityRepository)
	assert.equal(identityService.listNames(), expectedNames, 'returns data from listNames exactly as provided by the repository')
	assert.end()
})
