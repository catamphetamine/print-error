import path from 'path'
import fs from 'fs'

import { html } from '../index.es6'

describe(`html`, function()
{
	it(`should generate correct html markup`, function()
	{
		const markup = fs.readFileSync(path.join(__dirname, 'examples/error.html'), 'utf8')

		// console.log(html(global.error))
		html(global.error, { fontSize: '20px' }).should.equal(markup)

		// fs.writeFileSync(path.join(__dirname, 'examples/error.actual.html'), html(global.error, { fontSize: '20px' }), 'utf8')
	})
})