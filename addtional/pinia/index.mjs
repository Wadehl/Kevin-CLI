import { exec } from "child_process";
import chalk from "chalk";

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";

import Spinner from "../../lib/spinner.mjs";

const spinner = new Spinner("安装依赖中");

const PINIA_ROOT = `${dirname(dirname(fileURLToPath(import.meta.url)))}/pinia`;

const initCommands = (target) => {
  const command = `cd ${target} && npm install pinia && npm install`;
  spinner.start();

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      console.log(error, stderr);
      return;
    } else {
      spinner.stop();
      spinner.destroy();
      console.log(
        `👾 依赖安装完成, 执行指令 ${chalk.blueBright(
          "cd " + target.split("\\")[2] + " && npm run dev"
        )} 启动项目`
      );
    }
  });
};

const copyPiniaFile = async (target, env) => {
  const piniaENV = env ? `${PINIA_ROOT}\\ts` : `${PINIA_ROOT}\\js`;
  try {
    await fs.copy(piniaENV, `${target}\\src`, { overwrite: true });
    await fs.copy(`${PINIA_ROOT}\\components`, `${target}\\src\\components`, {
      overwrite: true,
    });
    initCommands(target);
  } catch (err) {
    console.error(err);
  }
};

const usePinia = async (target, env) => {
  copyPiniaFile(target, env);
};

export default usePinia;
