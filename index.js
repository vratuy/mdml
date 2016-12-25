#!/usr/bin/env node
const co = require('co');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const prompt = require('co-prompt');
const program = require('commander');

const start = function (target) {
  let stats = fs.statSync(target);

  if (stats.isFile()) {
    generate(target);
  } else {
    console.log('Directory is not supported yet.');
  };
};

const generate = function (target) {
  let mdText = marked(fs.readFileSync(target, 'utf8'));
  let name = path.parse(target).name;
  let distName = './' + name + '.html';

  if (path.extname(target) === '.md') {
    fs.writeFileSync(distName, mdText);
  } else {
    console.error('Cannot find *.md file.');
    process.exit(1);
  };
}

let targetPath;

program
  .version('0.1.0')
  .arguments('<targetPath>')
  .action(function (target) {
    if (target) {
      start(target);
    };
    targetPath = target
  })
  .parse(process.argv);

if (typeof targetPath === 'undefined') {
  console.error('No argument given.');
  process.exit(1);
};
