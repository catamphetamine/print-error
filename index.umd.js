'use strict'

// exports = module.exports = require('./build/...')['default']
// exports['default'] = exports

exports = module.exports =
{
	html : require('./build/html'),
	text : require('./build/text'),
	markdown : require('./build/markdown'),
	terminal : require('./build/terminal')
}