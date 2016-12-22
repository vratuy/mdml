#!/usr/bin/env node
const co = require('co');
const fs = require('fs');
const marked = require('marked');
const prompt = require('co-prompt');
const program = require('commander');

const start = function(path) {
  fs.readdir(path, function (err, list) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    list.forEach(function (item) {
      show(process.argv[2] + item);
    });
  })
};

const show = function(basepath) {
  fs.stat(basepath, function (err, stats) {
    if (stats.isFile()) {
      console.log(basepath);
    } else {
      console.log(basepath + '/');
    }
  })
}

let pathName;

program
  .version('0.1.0')
  .arguments('<path>')
  .action(function (path) {
    pathName = path;
    start(path);
  })
  .parse(process.argv);

if (typeof pathName === 'undefined') {
  console.error('No argument given.');
  process.exit(1);
};
