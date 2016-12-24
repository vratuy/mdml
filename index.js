#!/usr/bin/env node
const co = require('co');
const fs = require('fs');
const marked = require('marked');
const prompt = require('co-prompt');
const program = require('commander');

const start = function (file) {
  let text = fs.readFileSync(file, 'utf8');
  console.log(marked(text));
};

// List files and directories.
const show = function (path) {
  let basepath;

  fs.readdir(path, function (err, list) {
    if (err) {
      console.error(err);
      process.exit(1);
    };

    list.forEach(function (item) {
      basepath = process.argv[2] + item;

      fs.stat(basepath, function (err, stats) {
        if (stats.isFile()) {
          console.log(basepath);
        } else {
          console.log(basepath + '/');
        };
      });
    });
  });
};

let fileName;

program
  .version('0.1.0')
  .arguments('<file>')
  .action(function (file) {
    fileName = file;
    start(file);
  })
  .parse(process.argv);

if (typeof fileName === 'undefined') {
  console.error('No argument given.');
  process.exit(1);
};
