var chai = require('chai');
var assert = chai.assert;

var Fsjs = require('../src/common/form-validator').Fsjs || {};

describe('form-validator: validateName method', function() {
    it('fails for a blank name', function(){
        var validity = Fsjs.FormValidation.validateName('');
        assert.isNotOk(validity.isValid, 'Did not fail a blank name');
    });

    it('passes if a name value is passed', function(){
        var validity = Fsjs.FormValidation.validateName('Fsjs Exploration');
        assert.isOk(validity.isValid, 'Failed with a name value');
    });
});

var DummyEmailBlacklistChecker = function(valid){
    var _valid = valid;
    this.validateEmail = function(emailAddress){
        return _valid;
    }
}
DummyEmailBlacklistChecker.prototype = Object.create(Fsjs.FormValidation.EmailBlacklistChecker.prototype);

describe('form-validator: validateEmailAddress method', function() {
    it('fails for a blank email address', function(){
        var validity = Fsjs.FormValidation.validateEmailAddress('', new DummyEmailBlacklistChecker(true));
        assert.isNotOk(validity.isValid, 'Did not fail a blank email address');
    });

    it('fails for an invalid format of email address', function(){
        var validity = Fsjs.FormValidation.validateEmailAddress('plonk@localhost', new DummyEmailBlacklistChecker(true));
        assert.isNotOk(validity.isValid, 'Did not fail a bad format email address');
    });

    it('throws an exception if second parameter is not instace of Fsjs.FormValidation.EmailBlacklistChecker', function(){

        var BadEmailBlacklistChecker = function(){}

        chai.expect(function() {
            var validity = Fsjs.FormValidation.validateEmailAddress('plonk@localhost.net', new BadEmailBlacklistChecker());
        }).to.throw('emailBlacklistChecker is not an instance of EmailBlacklistChecker');
    });

    it('fails if the emailBlacklistChecker instance returns false', function(){
        var validity = Fsjs.FormValidation.validateEmailAddress('plonk@localhost.net', new DummyEmailBlacklistChecker(false));
        assert.isNotOk(validity.isValid, 'Did not fail when emailBlacklistChecker returned false');
    });


    it('passes valid emailAddress if the emailBlacklistChecker instance returns true', function(){
        var validity = Fsjs.FormValidation.validateEmailAddress('plonk@localhost.net', new DummyEmailBlacklistChecker(true));
        assert.isOk(validity.isValid, 'Did not pass a valid emailAddress');
    });
});

describe('form-validator: validateAge method', function() {
    it('fails for < 13', function(){
        var validity = Fsjs.FormValidation.validateAge(12);
        assert.isNotOk(validity.isValid, 'Did not fail a low age');
    });

    it('fails for > 150', function(){
        var validity = Fsjs.FormValidation.validateAge(151);
        assert.isNotOk(validity.isValid, 'Did not fail a high age');
    });

    it('passes 13', function(){
        var validity = Fsjs.FormValidation.validateAge(13);
        assert.isOk(validity.isValid, 'Failed valid value');
    });
    it('passes 150', function(){
        var validity = Fsjs.FormValidation.validateAge(150);
        assert.isOk(validity.isValid, 'Failed valid value');
    });
    it('passes 52', function(){
        var validity = Fsjs.FormValidation.validateAge(52);
        assert.isOk(validity.isValid, 'Failed valid value');
    });
});

