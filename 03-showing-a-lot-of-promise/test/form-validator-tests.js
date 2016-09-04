var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var assert = chai.assert,
    expect = chai.expect;

var Fsjs = require('../src/common/form-validator').Fsjs || {};

describe('form-validator: validateName method', function() {
    it('fails for a blank name', function(){
        var nameValidity =  Fsjs.FormValidation.validateName('');
        return nameValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('passes if a name value is passed', function(){
        var nameValidity =  Fsjs.FormValidation.validateName('Fsjs Exploration');
        return nameValidity.then((validity)=>{
            expect(validity.isValid).to.equal(true);
        });
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
        var emailAddressValidity =  Fsjs.FormValidation.validateEmailAddress('', new DummyEmailBlacklistChecker(true));
        return emailAddressValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('fails for an invalid format of email address', function(){
        var emailAddressValidity =  Fsjs.FormValidation.validateEmailAddress('root@localhost', new DummyEmailBlacklistChecker(true));
        return emailAddressValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('promise rejects if second parameter is not instance of Fsjs.FormValidation.EmailBlacklistChecker', function(){
        var BadEmailBlacklistChecker = function(){}

        var emailAddressValidity =  Fsjs.FormValidation.validateEmailAddress('root@localhost.net', new BadEmailBlacklistChecker());
        return expect(emailAddressValidity).to.be.rejected;
    });

    it('fails if the emailBlacklistChecker instance returns false', function(){
        var emailAddressValidity =  Fsjs.FormValidation.validateEmailAddress('root@localhost.net', new DummyEmailBlacklistChecker(false));
        return emailAddressValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('passes valid emailAddress if the emailBlacklistChecker instance returns true', function(){
        var emailAddressValidity =  Fsjs.FormValidation.validateEmailAddress('root@localhost.net', new DummyEmailBlacklistChecker(true));
        return emailAddressValidity.then((validity)=>{
            expect(validity.isValid).to.equal(true);
        });
    });
});

describe('form-validator: validateAge method', function() {
    it('fails for < 13', function(){
        var ageValidity =  Fsjs.FormValidation.validateAge(12);
        return ageValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('fails for > 150', function(){
        var ageValidity =  Fsjs.FormValidation.validateAge(151);
        return ageValidity.then((validity)=>{
            expect(validity.isValid).to.equal(false);
        });
    });

    it('passes 13', function(){
        var ageValidity =  Fsjs.FormValidation.validateAge(13);
        return ageValidity.then((validity)=>{
            expect(validity.isValid).to.equal(true);
        });
    });
    it('passes 150', function(){
        var ageValidity =  Fsjs.FormValidation.validateAge(150);
        return ageValidity.then((validity)=>{
            expect(validity.isValid).to.equal(true);
        });
    });
    it('passes 52', function(){
        var ageValidity =  Fsjs.FormValidation.validateAge(52);
        return ageValidity.then((validity)=>{
            expect(validity.isValid).to.equal(true);
        });
    });
});

