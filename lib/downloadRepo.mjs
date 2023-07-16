import simpleGit from "simple-git";
import fs, { copy } from "fs-extra";
import chalk from "chalk";

// loading
import Spinner from "./spinner.mjs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const BASEURL =
  "https://ghproxy.com/https://github.com/Wadehl/vue-templates.git";
const BASETEMPLATE = ["vue-vite-template", "vue-vite-ts-template"];

const CACHE = `${dirname(dirname(fileURLToPath(import.meta.url)))}/cached`;

const checkCacheFolderExists = async () => {
  const checkCacheSpinner = new Spinner("检查模板缓存目录是否存在");
  checkCacheSpinner.start();
  const isCacheExists = await fs.pathExists(CACHE);
  checkCacheSpinner.stop();
  checkCacheSpinner.destroy();
  if (!isCacheExists) {
    const createCacheSpinner = new Spinner("创建模板缓存目录");
    createCacheSpinner.start();
    await fs.mkdir(CACHE);
    const git = simpleGit();
    await git.clone(BASEURL, CACHE, (error, result) => {
      createCacheSpinner.stop();
      if (error) {
        console.log(
          `${chalk.redBright("git clone failed! error message:")}\n${error}`
        );
        console.log(
          `${chalk.greenBright(
            "if you get message like 'unable to access https://github.com/'\n you can try to set proxy by 'git config --global https.https://github.com.proxy https://ghproxy.com'"
          )}`
        );
      } else {
        console.log(`🚀 模板缓存下载成功`);
      }
      createCacheSpinner.destroy();
    });
  }
};

const updateCacheTemplate = async () => {
  await checkCacheFolderExists();

  const git = simpleGit(CACHE);

  // 检查缓存目录是否存在
  const isCacheExists = await git.checkIsRepo();

  const downloadSpinner = new Spinner("检查模板是否存在更新");
  downloadSpinner.start();
  if (isCacheExists) {
    // 更新缓存目录
    await git.pull();
    downloadSpinner.stop();
  } else {
    // 克隆缓存目录
    await git.clone(BASEURL, CACHE, (error, result) => {
      downloadSpinner.stop();
      if (error) {
        console.log(
          `${chalk.redBright("git clone failed! error message:\n" + error)}`
        );
        console.log(
          `${chalk.greenBright(
            "if you get message like 'unable to access https://github.com/'\n you can try to set proxy by 'git config --global https.https://github.com.proxy https://ghproxy.com'"
          )}`
        );
      } else {
        console.log(`🚀 模板缓存更新成功`);
      }
    });
  }
};

/*
 * @param {Array} base 技术栈数组
 * @param {String} target 目标文件夹
 * @return {Promise}
 */
const downloadBaseTemplate = async (base, target) => {
  await updateCacheTemplate();
  const templateName = base.includes("ts") ? BASETEMPLATE[1] : BASETEMPLATE[0];
  await copyTemplate2Target(templateName, target);
};

const copyTemplate2Target = async (templateName, target) => {
  const copySpinner = new Spinner("复制模板到目标文件夹");
  copySpinner.start();
  await fs.copy(`${CACHE}/${templateName}`, target);
  copySpinner.stop();
  copySpinner.destroy();
  console.log(`\n🚀 模板复制成功，请运行下面的指令启动项目\n`);
  console.log(
    chalk.greenBright(`cd ${target.split("\\")[2]}\nnpm install\nnpm run dev`)
  );
};

export default downloadBaseTemplate;
export { CACHE };
