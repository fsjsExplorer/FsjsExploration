var chai = require('chai');
var assert = chai.assert;

var Fsjs = require('../identity-repository').Fsjs;

describe('IdentityRepository', function() {
	it('throws exception if IdentityRepository does not implement listNames()', function(){
		TestIdentityRepository = function(){ }
		TestIdentityRepository.prototype = Object.create(Fsjs.Repositories.IdentityRepository.prototype);

		var dummyRepository = new TestIdentityRepository();

		chai.expect(function() { 
			var t = dummyRepository.listNames();
		}).to.throw('listNames not implemented');
	});
});
