#!/usr/bin/env node
const co = require('co');
const marked = require('marked');
const prompt = require('co-prompt');
const program = require('commander');

let pathName;

program
  .version('0.1.0')
  .arguments('<path>')
  .action(function (path) {
    pathName = path;
    console.log('Entry point: %s', path);
  })
  .parse(process.argv);

if (typeof pathName === 'undefined') {
  console.error('No argument given.');
  process.exit(1);
}
