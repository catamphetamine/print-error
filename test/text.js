import text from '../source/text'

describe(`plain text`, function()
{
	it(`should generate correct plain text`, function()
	{
		text(global.error).should.equal(error.stack)
	})
})