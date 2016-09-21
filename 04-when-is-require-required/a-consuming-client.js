(function(){
	var Fsjs = require('./namespaces.js').Fsjs;
	require('./factories/class-factory.js');

	var aService = Fsjs.factories.getAService();
	var aNOtherService = Fsjs.factories.getANOtherService();

  console.log(aService.who());
  console.log('==========================================');
  console.log(aNOtherService.who());

})()
