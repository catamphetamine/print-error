# print-error

[![NPM Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Test Coverage][coveralls-badge]][coveralls]

Prints javascript error stack trace in different flavours:

 * `pretty-print` coloured terminal ([demo](https://github.com/AriaMinaei/pretty-error))
 * HTML ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.html)
 * markdown ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.md)
 * plain text ([demo](https://github.com/halt-hammerzeit/print-error/tree/master/test/examples/error.txt)

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

While actively developing, one can use (personally I don't use it)

```sh
npm run watch
```

in a terminal. This will watch the file system and run tests automatically 
whenever you save a js file.

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
[npm]: https://www.npmjs.org/package/print-error
[npm-badge]: https://img.shields.io/npm/v/print-error.svg?style=flat-square
[travis]: https://travis-ci.org/halt-hammerzeit/print-error
[travis-badge]: https://img.shields.io/travis/halt-hammerzeit/print-error/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/halt-hammerzeit/print-error?branch=master
[coveralls-badge]: https://img.shields.io/coveralls/halt-hammerzeit/print-error/master.svg?style=flat-square
