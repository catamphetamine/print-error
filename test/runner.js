import path from 'path'
import fs from 'fs'

import chai from 'chai'
chai.should()

const stack_trace = fs.readFileSync(path.join(__dirname, 'examples/error.txt'), 'utf8')

global.error = new Error("Testing error")
global.error.stack = stack_trace

require('./helpers')
require('./parse')

require('./text')
require('./terminal')
require('./markdown')
require('./html')