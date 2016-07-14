import parse_stack_trace from './parse.js'
import { merge, clone, tabulate, convert_from_camel_case } from './helpers.js'

const default_options =
{
	font_size: '20px'
}

export default function render(error, options = {})
{
	options = merge(default_options, convert_from_camel_case(clone(options)))

	const groups = parse_stack_trace(error.stack)

	const groups_markup = groups.map((group, i) =>
	{
		const list_items_markup = group.lines.map(line =>
		{
			return '<li>' + '\n' + tabulate(line_markup(line), 1) + '\n' + '</li>'
		})
		.join('\n')

		const markup =
		`
			<h1${i === 0 ? '' : ' class="secondary"' }>${escape_html(group.title)}</h1>
			<ul>\n${tabulate(list_items_markup, 4)}
			</ul>
		`

		return tabulate(markup, -3)
	})
	.join('')
	.replace(/^\n/, '')
	.replace(/\n$/, '')

	const result =
	`
		<html>
			<head>
				<title>Error</title>
				<style>
					html
					{
						font-family : Monospace, Arial;
						font-size   : ${options.font_size};
					}
					body
					{
						margin-top    : 1.6em;
						margin-bottom : 1.6em;
						margin-left   : 2.3em;
						margin-right  : 2.3em;
					}
					h1
					{
						font-size : 1.4rem;
						color     : #C44100;
					}
					h1.secondary
					{
						font-weight : normal;
						color       : #7f7f7f;
					}
					ul
					{
						margin-top : 2em;
					}
					ul li 
					{
						margin-bottom   : 1.5em;
						list-style-type : none;
						font-size       : 1.2rem;
					}
					.file-path
					{
						color         : #7f7f7f;
						margin-top    : 0.8em;
						font-size     : 1rem;
					}
					.file-path-separator
					{
						color : #c0c0c0;
					}
					.file-name
					{
						font-weight : bold;
					}
					.line-number
					{
					}
					.colon
					{
						color: #9f9f9f;
					}
					.method
					{
						color: #0091C2;
						font-weight: bold;
					}
				</style>
			</head>
			<body>\n${tabulate(groups_markup, 4)}
			</body>
		</html>
	`

	return tabulate(result, -2)
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
		line += `<span class="file-name">${line_info.file_name}</span>`
	}

	if (line_info.file_line_number)
	{
		line += `<span class="colon">:</span><span class="line-number">${line_info.file_line_number}</span>`
	}

	if (line_info.method_path)
	{
		if (line.length > 0)
		{
			line += ' '
		}

		line += `<span class="method">${escape_html(line_info.method_path)}</span>`
	}

	if (line_info.file_path)
	{	
		line += '\n' + tabulate(
		`<div class="file-path">
			${escape_html(line_info.file_path).split('/').join('<span class="file-path-separator">/</span>')}
		</div>`,
		-2)
	}

	return line
}

function escape_html(text)
{
	return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}