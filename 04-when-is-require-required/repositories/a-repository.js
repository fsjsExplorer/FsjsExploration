(function(host){
	var Fsjs = host.Fsjs;
  if (!Fsjs){
		Fsjs = require('../namespaces.js').Fsjs;
		require('../interfaces/repository-interface.js');
  }

	Fsjs.repositories.ARepository = function() {
	  this.who = function() {
			return 'ARepository';
	  };
	};
	Fsjs.repositories.ARepository.prototype = Object.create(Fsjs.iRepositories.Repository.prototype);

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
