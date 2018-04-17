import path from 'path'
import fs from 'fs'

import markdown from '../source/markdown'

describe(`markdown`, function()
{
	it(`should generate correct markdown`, function()
	{
		const markup = fs.readFileSync(path.join(__dirname, 'examples/error.md'), 'utf8')

		// console.log(markdown(global.error))
		// Convert line endings on Windows.
		markdown(global.error).should.equal(markup.replace(/\r/g, ''))
	})
})