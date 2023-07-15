/*
 * 获取项目信息
 * @author: Kevin Kwok
 * @date: 2023-07-15
 */

import { readJson } from "fs-extra/esm";
import chalk from "chalk";

const getVersion = async () => {
  const packageObj = await readJson("./package.json");
  return packageObj.version;
};

const getAuthor = async () => {
  const packageObj = await readJson("./package.json");
  return packageObj.author;
};

const getInfo = async () => {
  const packageObj = await readJson("./package.json");
  return packageObj;
};

const greeting = async () => {
  const { author: PROJECT_AUTHOR, name: PROJECT_NAME } = await getInfo();

  console.log(
    `Hello there 👋! It's ${chalk.blue.underline.bold(
      PROJECT_AUTHOR + " 👾 "
    )} Here! This is my CLI tool ${chalk.green.underline.bold(PROJECT_NAME)}\n`
  );
};

export default greeting;
export { getVersion, getAuthor, getInfo };
