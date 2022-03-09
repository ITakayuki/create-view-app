import fs from "fs-extra";

const getWhichType = (type:string) => {
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

export const copyTemplate = async(type:string, dirName: string) => {
  const selectType = getWhichType(type);
  const dir = `./${dirName}`
  const targetDir = `${__dirname}/../${selectType}`;
  console.log(targetDir, "to", dir)
  await fs.ensureDir(dir);
  await fs.copy(targetDir, dir);
  console.log("success!")
}