const fs = require("fs-extra");

const getWhichType = (type) => {
  console.log(type)
  try {
    switch (type) {
      case "ejs":
        return "template-ejs"
      default:
        new Error("This input type is not available ")
    }
  } catch (e) {
    console.log("create Error: ", e);
  }
}

const ignoreFile = `#node modules\nnode_modules\n# editor configs\n.idea\n.vscode\n# build file\ndist`
const ftpTemplate = `user=""\npassword=""\nhost=""\nlocalRoot=""\nremoteRoot=""\ninclude="*,**/*"\ndeleteRemote=true\nforcePasv=true`
const babelrc = `{\n  "presets": [\n    [\n      "@babel/preset-env",\n      {\n        "targets": {\n          "ie": "11"\n        },\n        "useBuiltIns": "usage",\n        "corejs": 3\n      }\n    ]\n  ]\n}`

exports.copyTemplate = async(type, dirName) => {
  const selectType = getWhichType(type);
  const dir = `./${dirName}`
  const targetDir = `${__dirname}/../${selectType}`;
  await fs.ensureDir(dir);
  await fs.copy(targetDir, dir);
  await fs.outputFile(`${dir}/.gitignore`, ignoreFile);
  await fs.outputFile(`${dir}/.node-version`,`14.15.1`);
  await fs.ensureDir(`${dir}/ftp/`);
  await fs.outputFile(`${dir}/ftp/.env.preview`, ftpTemplate);
  await fs.outputFile(`${dir}/ftp/.env.staging`, ftpTemplate);
  await fs.outputFile(`${dir}/.babelrc`, babelrc);
  console.log("Success create ViewTemplateApp!");
  console.log("Thank you!")
}