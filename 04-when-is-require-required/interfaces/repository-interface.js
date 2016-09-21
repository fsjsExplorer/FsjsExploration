(function(host){
  var Fsjs = host.Fsjs;
  if (!Fsjs){
    Fsjs = require('../namespaces.js').Fsjs;
  }

  Fsjs.iRepositories.Repository = function(){}
  Fsjs.iRepositories.Repository.prototype.who = function() { throw 'who() not implemented'; }

})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
