import parse_stack_trace from './parse.js'
import { tabulate } from './helpers.js'

export default function render(error)
{
	const groups = parse_stack_trace(error.stack)

	const groups_markup = groups.map((group, i) =>
	{
		const list_item_markup = group.lines.map(line =>
		{
			return ' * ' + line_markup(line)
		})
		.join('\n\n')

		const markup =
		`
			${group.title}
			${Array(group.title.length + 1).join('=')}\n\n${tabulate(list_item_markup, 3)}
		`

		return tabulate(markup, -3)
	})
	.join('')

	return groups_markup
		.replace(/^\n/, '')
		.replace(/\n$/, '')
}

function line_markup(line_info)
{
	if (typeof line_info === 'string')
	{
		return line_info
	}

	let line = ''

	if (line_info.file_path)
	{
		line += `${line_info.file_name}`
	}

	if (line_info.file_line_number)
	{
		line += `:${line_info.file_line_number}`
	}

	if (line_info.method_path)
	{
		if (line.length > 0)
		{
			line += ' '
		}

		line += `${line_info.method_path}`
	}

	if (line_info.file_path)
	{	
		line += '\n\n   ' + line_info.file_path
	}

	return line
}