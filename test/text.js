import { text } from '../index.es6'

describe(`plain text`, function()
{
	it(`should generate correct plain text`, function()
	{
		text(global.error).should.equal(error.stack)
	})
})