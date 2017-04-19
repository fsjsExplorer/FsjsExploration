module.exports.identityService = function (repository) {
	this.listNames = () => repository.listNames()
}