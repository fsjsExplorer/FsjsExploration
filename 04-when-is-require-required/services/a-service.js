(function(host){
	var Fsjs = host.Fsjs;
	if (!Fsjs){
		Fsjs = require('../namespaces.js').Fsjs;
		require('../repositories/a-repository.js');
		require('../repositories/a-n-other-repository.js');
		require('../repositories/yet-a-n-other-repository.js');
	}

  Fsjs.services.AService = function(aRepository, aNOtherRepository, yetANOtherRepository) {
    this.who = function() {
      return [
        'AService',
        'using',
        aRepository.who(),
        aNOtherRepository.who(),
        yetANOtherRepository.who()
      ].join(' ');
    };
  };

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
