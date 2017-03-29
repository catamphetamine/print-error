# print-error

[![npm version](https://img.shields.io/npm/v/print-error.svg?style=flat-square)](https://www.npmjs.com/package/print-error)
[![npm downloads](https://img.shields.io/npm/dm/print-error.svg?style=flat-square)](https://www.npmjs.com/package/print-error)
[![coverage](https://img.shields.io/coveralls/halt-hammerzeit/print-error/master.svg?style=flat-square)](https://coveralls.io/r/halt-hammerzeit/print-error?branch=master)

Prints javascript error stack trace in different flavours:

 * `pretty-print` coloured terminal ([demo](https://github.com/AriaMinaei/pretty-error))
 * HTML ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.html))
 * markdown ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.md))
 * plain text ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.txt))

## Installation

```
npm install print-error --save
```

## Usage

```js
import { html, markdown, terminal } from 'print-error'

html(new Error(), { fontSize: '16px' })
markdown(new Error())
terminal(new Error())
```

## Terminal

This library uses [`pretty-error`](https://github.com/AriaMinaei/pretty-error) for coloured terminal error stack trace printing.

## Contributing

After cloning this repo, ensure dependencies are installed by running:

```sh
npm install
```

This module is written in ES6 and uses [Babel](http://babeljs.io/) for ES5
transpilation. Widely consumable JavaScript can be produced by running:

```sh
npm run build
```

Once `npm run build` has run, you may `import` or `require()` directly from
node.

After developing, the full test suite can be evaluated by running:

```sh
npm test
```

When you're ready to test your new functionality on a real project, you can run

```sh
npm pack
```

It will `build`, `test` and then create a `.tgz` archive which you can then install in your project folder

```sh
npm install [module name with version].tar.gz
```

## License

[MIT](LICENSE)