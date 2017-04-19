var repositories = require('./identity-repository')
var services = require('./identity-service')

module.exports = {
    buildSecretIdentityService: () => new services.identityService(repositories.secretIdentityRepository),
    buildPublicIdentityService: () => new services.identityService(repositories.publicIdentityRepository)
}