# jsonref-cli

Command-line tool to query a JSON document using the [JSON Pointer](http://tools.ietf.org/html/rfc6901) syntax

[![travis build](https://img.shields.io/travis/vivocha/jsonref-cli.svg)](https://travis-ci.org/vivocha/jsonref-cli)
[![coveralls coverage](https://img.shields.io/coveralls/c/github/vivocha/jsonref-cli.svg)](https://coveralls.io/gh/vivocha/jsonref-cli)
[![npm version](https://img.shields.io/npm/v/jsonref-cli.svg)](https://www.npmjs.com/package/jsonref-cli)

## Install

```bash
$ npm install -g jsonref-cli
```
## Usage

```bash
jsonref [-f file] [-j] <path> 

-f file, json file to parse (by the it read from stdin)
-j, produce a JSON output 
```

Example:

```bash
$ cat package.json | jsonref /version
```
