#!/usr/bin/env node

import { readFileSync } from 'fs';
import * as program from 'commander';
import { pointer } from 'jsonref';

const meta = require(__dirname + '/../package.json');

program
  .version(meta.version)
  .description(meta.description)
  .usage('[options] <json ref path>')
  .option('-f, --file <json file>', 'Use the specified file as the data source')
  .option('-j, --json', 'Produce a json output')
  .parse(process.argv);

if (typeof program.args[0] === 'undefined') {
  program.outputHelp();
  process.exit(1);
}

async function getDataFromFile(): Promise<any> {
  return JSON.parse(readFileSync(program.file, 'utf8').toString());
}

function getDataFromStdin(): Promise<any> {
  return new Promise(function(resolve, reject) {
    const stdin = process.stdin;
    const inputChunks = [];

    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (chunk) {
      inputChunks.push(chunk);
    });

    stdin.on('end', function () {
      try {
        resolve(JSON.parse(inputChunks.join()));
      } catch (err) {
        reject(err);
      }
    });
  });
}

(async function() {
  try {
    const data = await (program.file ? getDataFromFile() : getDataFromStdin());
    const result = pointer(data, program.args[0]);
    if (typeof result === 'undefined') {
      process.exit(1);
    } else {
      process.stdout.write(program.json ? JSON.stringify(result) : result.toString());
      process.exit(0);
    }
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
})();
