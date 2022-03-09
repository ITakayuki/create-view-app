import {Command} from "commander";
const program = new Command();

import {copyTemplate} from "./copyTemplateFile";

program
  .option("-t, --type", "witch type install?", "ejs")
program.parse(process.argv);
const dirName = process.argv[2]

const AsyncFunction = (cb: ()=>void) => {
  cb();
}

const opts = program.opts();
if (opts.type === "ejs") {
  AsyncFunction(async () => {
    await copyTemplate(opts.type, dirName)
  })
}