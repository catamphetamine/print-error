import parse_stack_trace from '../source/parse'

describe(`stack trace parser`, function()
{
	it(`should parse error stack trace`, function()
	{
    	const parsed_stack_trace =
		[
		  {
		    "title": "Testing error",
		    "lines": [
		      {
		        "file_path": "parse.js",
		        "file_line_number": "7",
		        "method_path": "Context.<anonymous>",
		        "file_name": "parse.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runnable.js",
		        "file_line_number": "326",
		        "method_path": "callFn",
		        "file_name": "runnable.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runnable.js",
		        "file_line_number": "319",
		        "method_path": "Test.Runnable.run",
		        "file_name": "runnable.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "422",
		        "method_path": "Runner.runTest",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "528",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "342",
		        "method_path": "next",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "352",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "284",
		        "method_path": "next",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "[print-error]/[mocha]/lib/runner.js",
		        "file_line_number": "320",
		        "method_path": "Immediate._onImmediate",
		        "file_name": "runner.js"
		      },
		      {
		        "file_path": "timers.js",
		        "file_line_number": "543",
		        "method_path": "tryOnImmediate",
		        "file_name": "timers.js"
		      },
		      {
		        "file_path": "timers.js",
		        "file_line_number": "523",
		        "method_path": "processImmediate [as _immediateCallback]",
		        "file_name": "timers.js"
		      }
		    ]
		  },
		  {
		  	 "title": "From previous event",
		    "lines": [
		      {
		        "file_path": "server.js",
		        "file_line_number": "153",
		        "file_name": "server.js"
		      },
		      {
		        "file_path": "[qlean-client]/[react-router]/lib/match.js",
		        "file_line_number": "65",
		        "file_name": "match.js"
		      }
		    ]
		  }
		]

		parse_stack_trace(global.error.stack).should.deep.equal(parsed_stack_trace)
	})
})