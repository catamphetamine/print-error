import pretty_error from 'pretty-error'
const printer = new pretty_error()

export default function render(error)
{
	return printer.render(error)
}