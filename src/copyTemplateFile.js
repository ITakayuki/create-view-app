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

exports.copyTemplate = async(type, dirName) => {
  const selectType = getWhichType(type);
  const dir = `./${dirName}`
  const targetDir = `${__dirname}/../${selectType}`;
  console.log(targetDir, "to", dir)
  await fs.ensureDir(dir);
  await fs.copy(targetDir, dir);
  console.log("success!")
}