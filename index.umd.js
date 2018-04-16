'use strict'

exports = module.exports =
{
	html     : require('./build/html').default,
	htmlErrorStack : require('./build/html').renderErrorStack,
	ERROR_STACK_STYLE : require('./build/html').ERROR_STACK_STYLE,

	text     : require('./build/text').default,
	markdown : require('./build/markdown').default,
	terminal : require('./build/terminal').default,
	parse    : require('./build/parse').default
}

exports['default'] = exports