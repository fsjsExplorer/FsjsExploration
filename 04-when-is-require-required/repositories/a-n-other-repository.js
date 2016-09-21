(function(host){
	var Fsjs = host.Fsjs;
  if (!Fsjs){
		Fsjs = require('../namespaces.js').Fsjs;
		require('../interfaces/repository-interface.js');
  }

	Fsjs.repositories.ANOtherRepository = function() {
    this.who = function() {
      return 'ANOtherRepository';
    };
  };
	Fsjs.repositories.ANOtherRepository.prototype = Object.create(Fsjs.iRepositories.Repository.prototype);

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
