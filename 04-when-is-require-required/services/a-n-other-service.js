(function(host){
	var Fsjs = host.Fsjs;
	if (!Fsjs){
		Fsjs = require('../namespaces.js').Fsjs;
		require('../repositories/and-yet-a-n-other-repository.js');
	}

  Fsjs.services.ANOtherService = function(andYetANOtherRepository) {
    this.who = function() {
      return [
        'ANOtherService',
        'using',
        andYetANOtherRepository.who()
      ].join(' ');
    };
  };

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
