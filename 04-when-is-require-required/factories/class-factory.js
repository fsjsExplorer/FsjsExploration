(function(host){
	var Fsjs = host.Fsjs;
  if (!Fsjs){
    Fsjs = require('../namespaces.js').Fsjs;
  }

	Fsjs.factories.getAService = function(){
		if (typeof module !== 'undefined' && module.exports){
			require('../services/a-service.js');
		}

		return new Fsjs.services.AService(
			new Fsjs.repositories.ARepository(),
			new Fsjs.repositories.ANOtherRepository(),
			new Fsjs.repositories.YetANOtherRepository());
  }

	Fsjs.factories.getANOtherService = function(){
		if (typeof module !== 'undefined' && module.exports){
			require('../services/a-n-other-service.js');
		}

    return new Fsjs.services.ANOtherService(new Fsjs.repositories.AndYetANOtherRepository());
  }

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
