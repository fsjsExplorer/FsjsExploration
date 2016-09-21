(function(host){
  var Fsjs = {};
  Fsjs.iRepositories = {};
  Fsjs.repositories = {};
  Fsjs.services = {};
  Fsjs.factories = {};

  host.Fsjs = Fsjs;
})(typeof module !== 'undefined' && module.exports
      ? exports
      : window )
