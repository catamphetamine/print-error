// // if the variable is defined
export const exists = what => typeof what !== 'undefined'

// used for JSON object type checking
const object_constructor = {}.constructor

// detects a JSON object
export function is_object(object)
{
	return exists(object) && (object !== null) && object.constructor === object_constructor
}

// extends the first object with 
/* istanbul ignore next: some weird transpiled code, not testable */
export function extend(...objects)
{
	objects = objects.filter(x => exists(x))

	if (objects.length === 0)
	{
		return
	}
	
	if (objects.length === 1)
	{
		return objects[0]
	}

	const to   = objects[0]
	const from = objects[1]

	if (objects.length > 2)
	{
		const last = objects.pop()
		const intermediary_result = extend.apply(this, objects)
		return extend(intermediary_result, last)
	}

	for (let key of Object.keys(from))
	{
		if (is_object(from[key]))
		{
			if (!is_object(to[key]))
			{
				to[key] = {}
			}

			extend(to[key], from[key])
		}
		else if (Array.isArray(from[key]))
		{
			if (!Array.isArray(to[key]))
			{
				to[key] = []
			}

			to[key] = to[key].concat(clone(from[key]))
		}
		else
		{
			to[key] = from[key]
		}
	}

	return to
}

export function merge()
{
	const parameters = Array.prototype.slice.call(arguments, 0)
	parameters.unshift({})
	return extend.apply(this, parameters)
}

export function clone(object)
{
	if (is_object(object))
	{
		return merge({}, object)
	}
	else if (Array.isArray(object))
	{
		return object.map(x => clone(x))
	}
	else
	{
		return object
	}
}

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