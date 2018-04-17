import
{
	html,
	htmlErrorStack,
	HTML_ERROR_STACK_STYLE,
	markdown,
	text,
	terminal,
	parse
}
from '../index'

describe('exports', () =>
{
	it('should export ES6', () =>
	{
		html.should.be.a('function')
		htmlErrorStack.should.be.a('function')
		HTML_ERROR_STACK_STYLE.should.be.a('string')
		
		markdown.should.be.a('function')
		text.should.be.a('function')
		terminal.should.be.a('function')
		parse.should.be.a('function')
	})

	it('should export CommonJS', () =>
	{
		const _ = require('../index.commonjs')
		
		_.html.should.be.a('function')
		_.htmlErrorStack.should.be.a('function')
		_.HTML_ERROR_STACK_STYLE.should.be.a('string')
		
		_.markdown.should.be.a('function')
		_.text.should.be.a('function')
		_.terminal.should.be.a('function')
		_.parse.should.be.a('function')
	})
})