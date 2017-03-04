import pretty_error from 'pretty-error'
const printer = new pretty_error()

export default function render(error)
{
	// Until the bugs are fixed in `pretty-error`
	// https://github.com/AriaMinaei/pretty-error/issues/40
	// https://github.com/AriaMinaei/RenderKid/issues/7
	// return printer.render(error)

	return error.stack
}