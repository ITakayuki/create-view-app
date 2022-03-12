#! /usr/bin/env node
const {Command} = require("commander");
const program = new Command();

const {copyTemplate} = require("./copyTemplateFile");

program
  .option("-t, --type", "witch type install?", "ejs")
  .option("--typescript", "select typescriptMode", false);
program.parse(process.argv);
const dirName = process.argv[2]

const AsyncFunction = (cb) => {
  cb();
}

const opts = program.opts();
if (opts.type === "ejs") {
  AsyncFunction(async () => {
    await copyTemplate(opts.type, dirName, opts.typescript)
  })
}