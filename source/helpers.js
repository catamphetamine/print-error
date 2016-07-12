// // if the variable is defined
export const exists = what => typeof what !== 'undefined'

// converts all camelCased keys of an object to lodash style
export function convert_from_camel_case(object)
{
	for (let key of Object.keys(object))
	{
		if (/[A-Z]/.test(key))
		{
			const lo_dashed_key = key.replace(/([A-Z])/g, function(match, group_1)
			{
				return '_' + group_1.toLowerCase()
			})

			if (!exists(object[lo_dashed_key]))
			{
				object[lo_dashed_key] = object[key]
				delete object[key]
			}
		}
	}

	return object
}

export function tabulate(text, tabs)
{
	return text.split('\n').map(line =>
	{
		if (tabs < 0)
		{
			let i = -tabs
			while (i > 0)
			{
				line = line.replace(/^\t/, '')
				i--
			}
			return line
		}
		return Array(tabs + 1).join('\t') + line
	})
	.join('\n')
}