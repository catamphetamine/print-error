'use strict'

exports = module.exports =
{
	html                   : require('./commonjs/html').default,
	htmlErrorStack         : require('./commonjs/html').renderErrorStack,
	HTML_ERROR_STACK_STYLE : require('./commonjs/html').ERROR_STACK_STYLE,

	text     : require('./commonjs/text').default,
	markdown : require('./commonjs/markdown').default,
	terminal : require('./commonjs/terminal').default,
	parse    : require('./commonjs/parse').default
}

exports['default'] = exports