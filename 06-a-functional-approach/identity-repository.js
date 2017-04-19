var secretIdentities = ['Mindy McCready', 
				  		'Oswald Chesterfield Cobblepot',
				  		'Steve Rogers',
						'Eric Draven',
						'Bruce Wayne']

var publicIdentities = ['Hit-Girl', 
				  		'The Penguin',
				  		'Captain America',
				  		'The Crow',
				  		'Batman']

module.exports.secretIdentityRepository = {
	listNames: () => secretIdentities
}

module.exports.publicIdentityRepository = {
	listNames: () => publicIdentities
}