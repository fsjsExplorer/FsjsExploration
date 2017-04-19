const R = require('ramda')
const l = console.log
const classFactory = require('./class-factory')
const dump = names => R.forEach(name => l(' ' + name), names)

l('Public Identities:')
var s = classFactory.buildPublicIdentityService()
dump(s.listNames())

l()

l('Secret Identities:')
s = classFactory.buildSecretIdentityService()
dump(s.listNames())
