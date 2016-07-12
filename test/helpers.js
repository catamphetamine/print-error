import { tabulate, convert_from_camel_case } from '../source/helpers'

describe(`helpers`, function()
{
	it(`should covert camel case to lodash case`, function()
	{
		convert_from_camel_case({ fontSize: 1 }).should.deep.equal({ font_size: 1 })
	})

	it(`should tabulate`, function()
	{
		tabulate('', 1).should.equal('\t')
	})
})