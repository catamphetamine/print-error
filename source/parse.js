export default function parse_stack_trace(stack_trace)
{
	const lines = stack_trace.split('\n').map(line => line.trim())
	const groups = []
	let group

	for (let line of lines)
	{
		if (line.indexOf('at') !== 0)
		{
			line = line.replace(/^Error: /, '')
			line = line.replace(/:$/, '')

			group = { title: line, lines: [] }
			groups.push(group)
		}
		else
		{
			line = line.replace(/at /, '')

			const line_parts = line.match(/^(.*) \((.*):(\d+):(\d+)\)$/)

			if (line_parts)
			{
				const method_path      = line_parts[1]
				const file_path        = line_parts[2]
				const file_line_number = line_parts[3]

				line = 
				{
					file_path        : file_path,
					file_line_number : file_line_number,
					method_path      : method_path
				}
			}
			else
			{
				const line_parts_fallback = line.match(/^(.*) \((.*)\)$/)

				if (line_parts_fallback)
				{
					const method_path = line_parts_fallback[1]
					const file_path   = line_parts_fallback[2]

					if (file_path === 'native')
					{
						line = 
						{
							method_path : method_path
						}
					}
					else
					{

						line = 
						{
							file_path   : file_path,
							method_path : method_path
						}
					}
				}
				else
				{
					const line_parts_file_line_column = line.match(/^(.*):(\d+):(\d+)$/)

					if (line_parts_file_line_column)
					{
						const file_path        = line_parts_file_line_column[1]
						const file_line_number = line_parts_file_line_column[2]

						line = 
						{
							file_path        : file_path,
							file_line_number : file_line_number
						}
					}
				}
			}

			if (line.file_path)
			{
				line.file_name = basename(line.file_path)
				line.file_path = transform_file_path(line.file_path)
			}

			group.lines.push(line)
		}
	}

	return groups
}

function basename(path)
{
	let index = path.lastIndexOf('/')

	if (index >= 0)
	{
		return path.substring(index + 1)
	}

	index = path.lastIndexOf('\\')
	if (index >= 0)
	{
		return path.substring(index + 1)
	}

	return path
}

function transform_file_path(file_path)
{
	file_path = file_path.replace(/\\/g, '/')

	// replace "/node_modules/xxx/" with "/[xxx]/",
	// and also substitute project name
	const node_modules = file_path.indexOf('/node_modules/')
	if (node_modules >= 0)
	{
		const before = file_path.slice(0, node_modules).split('/')
		const rest = file_path.substring(node_modules + '/node_modules/'.length).split('/')
		const node_module = rest.shift()

		file_path = `[${before[before.length - 1]}]/[${node_module}]/${rest.join('/')}`
	}

	return file_path
}