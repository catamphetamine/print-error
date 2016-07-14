import { exists, is_object, extend, merge, clone, convert_from_camel_case, tabulate } from '../source/helpers'

describe(`helpers`, function()
{
	it('should extend JSON objects', function()
	{
		const a = 
		{
			a:
			{
				b: 1
			}
		}

		const b =
		{
			a:
			{
				c: 1
			},
			d:
			{
				e: 2
			}
		}

		const c =
		{
			d:
			{
				e: 3,
				f: 4
			}
		}

		extend(a, b, c)

		b.d.e.should.equal(2)

		const ab =
		{
			a:
			{
				b: 1,
				c: 1
			},
			d:
			{
				e: 3,
				f: 4
			}
		}

		a.should.deep.equal(ab)
	})

	it('should detect if variable exists', function()
	{
		exists(0).should.equal(true)
		exists('').should.equal(true)
		exists(null).should.equal(true)
		exists([]).should.equal(true)
		exists(undefined).should.equal(false)
	})

	it('should detect JSON objects', function()
	{
		is_object({}).should.equal(true)
		is_object(0).should.equal(false)
		is_object('').should.equal(false)
		is_object(null).should.equal(false)
		is_object([]).should.equal(false)
		is_object(undefined).should.equal(false)
	})

	it('should merge objects', function()
	{
		const a = { b: { c: 1 }}
		const b = merge(a, { b: { c: 2 }})

		a.b.c.should.equal(1)
		b.b.c.should.equal(2)
	})

	it('should clone objects', function()
	{
		const a = { b: { c: 1 }}
		const b = clone(a)

		a.b.c = 2
		b.b.c.should.equal(1)
	})

	it('should convert from camel case', function()
	{
		const camel_cased_a =
		{
			a: 1,
			
			bCdEf:
			{
				g_h: true
			}
		}

		const a = 
		{
			a: 1,

			b_cd_ef:
			{
				g_h: true
			}
		}

		convert_from_camel_case(camel_cased_a).should.deep.equal(a)

		convert_from_camel_case({ fontSize: 1 }).should.deep.equal({ font_size: 1 })
	})

	it(`should tabulate`, function()
	{
		tabulate('', 1).should.equal('\t')
	})
})