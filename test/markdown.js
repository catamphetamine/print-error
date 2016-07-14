import path from 'path'
import fs from 'fs'

import { markdown } from '../index.es6'

describe(`markdown`, function()
{
	it(`should generate correct markdown`, function()
	{
		const markup = fs.readFileSync(path.join(__dirname, 'examples/error.md'), 'utf8')

		// console.log(markdown(global.error))
		markdown(global.error).should.equal(markup)
	})
})