import parse_stack_trace from './parse.js'
import { merge, clone, tabulate, convert_from_camel_case } from './helpers.js'

const default_options = {
	font_size: '20px'
}

export default function render(error, options = {})
{
	options = merge(default_options, convert_from_camel_case(clone(options)))

	const result =
	`
		<html>
			<head>
				<title>Error</title>
				${getErrorPageStyle(options)}
				${ERROR_STACK_STYLE}
			</head>
			<body>\n${renderErrorStack(error)}
			</body>
		</html>
	`

	return tabulate(result, -2)
		.replace(/^\n/, '')
		.replace(/\n$/, '')
}

export function renderErrorStack(error)
{
	const groups = parse_stack_trace(error.stack)

	const groups_markup = groups.map((group, i) =>
	{
		const list_items_markup = group.lines.map(line =>
		{
			return '<li class="print-error-stack__entry">' + '\n' + tabulate(line_markup(line), 1) + '\n' + '</li>'
		})
		.join('\n')

		const markup =
		`
			<h1 class="print-error-stack__heading${i === 0 ? '' : '--secondary' }">${escape_html(group.title)}</h1>
			<ul class="print-error-stack">\n${tabulate(list_items_markup, 4)}
			</ul>
		`

		return tabulate(markup, -3)
	})
	.join('')
	.replace(/^\n/, '')
	.replace(/\n$/, '')

	return tabulate(groups_markup, 4)
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
		line += `<span class="print-error-stack__file-name">${line_info.file_name}</span>`
	}

	if (line_info.file_line_number)
	{
		line += `<span class="print-error-stack__colon">:</span><span class="print-error-stack__line-number">${line_info.file_line_number}</span>`
	}

	if (line_info.method_path)
	{
		if (line.length > 0)
		{
			line += ' '
		}

		line += `<span class="print-error-stack__method">${escape_html(line_info.method_path)}</span>`
	}

	if (line_info.file_path)
	{	
		line += '\n' + tabulate(
		`<div class="print-error-stack__file-path">
			${escape_html(line_info.file_path).split('/').join('<span class="print-error-stack__file-path-separator">/</span>')}
		</div>`,
		-2)
	}

	return line
}

function escape_html(text)
{
	return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

export const ERROR_STACK_STYLE = `
	<style>
		.print-error-stack__heading
		{
			font-size : 140%;
			color     : #C44100;
		}

		.print-error-stack__heading--secondary
		{
			font-weight : normal;
			color       : #7f7f7f;
		}

		.print-error-stack
		{
			margin-top : 2em;
		}

		.print-error-stack__entry
		{
			margin-bottom   : 1.5em;
			list-style-type : none;
			font-size       : 120%;
		}

		.print-error-stack__file-path
		{
			color         : #7f7f7f;
			margin-top    : 0.8em;
		}

		.print-error-stack__file-path-separator
		{
			color : #c0c0c0;
		}

		.print-error-stack__file-name
		{
			font-weight : bold;
		}

		.print-error-stack__line-number
		{
		}

		.print-error-stack__colon
		{
			color: #9f9f9f;
		}

		.print-error-stack__method
		{
			color: #0091C2;
			font-weight: bold;
		}
	</style>
`

function getErrorPageStyle(options)
{
	return `
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
		</style>
	`
}