import path from 'path'
import fs from 'fs'

import chai, { expect } from 'chai'

chai.should()
global.expect = expect

// This error is used for generating output.
global.error = new Error("Testing error")
global.error.stack = fs.readFileSync(path.join(__dirname, 'examples/error.txt'), 'utf8')
